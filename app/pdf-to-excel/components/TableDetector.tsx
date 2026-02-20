'use client';

import { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure worker
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export interface TableData {
  rows: string[][];
  headers?: string[];
}

interface TableDetectorProps {
  file: File;
  onTablesDetected: (tables: TableData[]) => void;
  onError: (error: string) => void;
}

export default function TableDetector({ file, onTablesDetected, onError }: TableDetectorProps) {
  const [isProcessing, setIsProcessing] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    processPdf();
  }, [file]);

  const processPdf = async () => {
    try {
      setIsProcessing(true);
      setProgress(10);

      // Read file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      setProgress(20);

      // Load PDF document
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setProgress(40);

      const tables: TableData[] = [];

      // Process each page
      for (let pageNum = 1; pageNum <= Math.min(pdf.numPages, 10); pageNum++) {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();

        // Extract text items
        const textItems = textContent.items
          .filter((item: any) => 'str' in item)
          .map((item: any) => ({
            text: item.str.trim(),
            x: item.transform[4],
            y: item.transform[5],
            width: item.width,
            height: item.height,
          }))
          .filter((item) => item.text.length > 0);

        // Group items into rows based on y-coordinate
        const rows = groupIntoRows(textItems);

        if (rows.length > 0) {
          // Detect if first row is header (typically bold or different formatting)
          const hasHeader = rows.length > 1 && rows[0].length > 1;
          
          tables.push({
            rows: rows,
            headers: hasHeader ? rows[0] : undefined,
          });
        }

        setProgress(40 + (pageNum / pdf.numPages) * 50);
      }

      setProgress(100);

      if (tables.length === 0) {
        onError('Geen tabellen gevonden in dit PDF. Probeer een ander bestand.');
      } else {
        onTablesDetected(tables);
      }

    } catch (err) {
      console.error('PDF processing error:', err);
      onError('Fout bij verwerken van PDF. Dit bestand bevat mogelijk complexe tabellen. Probeer een simpeler PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const groupIntoRows = (items: any[]): string[][] => {
    if (items.length === 0) return [];

    // Sort by Y coordinate (top to bottom)
    items.sort((a, b) => b.y - a.y);

    const rows: string[][] = [];
    let currentRow: any[] = [];
    let lastY = items[0].y;
    const yThreshold = 5; // Pixels threshold for same row

    items.forEach((item) => {
      if (Math.abs(item.y - lastY) > yThreshold) {
        // New row
        if (currentRow.length > 0) {
          // Sort current row by X coordinate (left to right)
          currentRow.sort((a, b) => a.x - b.x);
          rows.push(currentRow.map((r) => r.text));
        }
        currentRow = [item];
        lastY = item.y;
      } else {
        // Same row
        currentRow.push(item);
      }
    });

    // Add last row
    if (currentRow.length > 0) {
      currentRow.sort((a, b) => a.x - b.x);
      rows.push(currentRow.map((r) => r.text));
    }

    return rows;
  };

  if (!isProcessing) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      <div className="text-center">
        <div className="text-5xl mb-4">⚙️</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          PDF verwerken...
        </h3>
        <p className="text-gray-600 mb-6">
          Tabellen detecteren en converteren
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-architeqt h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-500 mt-3">
          {progress}% voltooid
        </p>
      </div>
    </div>
  );
}
