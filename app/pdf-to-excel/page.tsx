'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import PdfUploader from './components/PdfUploader';
import type { TableData } from './components/TableDetector';
import TablePreview from './components/TablePreview';
import ConvertExport from './components/ConvertExport';

// Dynamic import to prevent SSR issues with pdfjs-dist
const TableDetector = dynamic(() => import('./components/TableDetector'), {
  ssr: false,
  loading: () => (
    <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
      <div className="text-5xl mb-4">⚙️</div>
      <p className="text-gray-600">Laden...</p>
    </div>
  ),
});
import SaveUpsellBanner from '@/components/SaveUpsellBanner';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import ArchiteqtCTA from '@/components/ArchiteqtCTA';

export default function PdfToExcelPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tables, setTables] = useState<TableData[]>([]);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setTables([]);
    setError('');
    setIsProcessing(true);
  };

  const handleTablesDetected = (detectedTables: TableData[]) => {
    setTables(detectedTables);
    setIsProcessing(false);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setIsProcessing(false);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setTables([]);
    setError('');
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary-turquoise hover:text-primary-turquoise/80 transition-colors">
              ← ArchiteQt Tools
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PDF naar Excel Converter
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Converteer PDF-tabellen naar bewerkbare Excel bestanden. 
            100% lokaal verwerkt, jouw data blijft privé.
          </p>
        </div>

        {/* Tool Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          {!selectedFile ? (
            <PdfUploader onFileSelect={handleFileSelect} />
          ) : isProcessing ? (
            <TableDetector
              file={selectedFile}
              onTablesDetected={handleTablesDetected}
              onError={handleError}
            />
          ) : error ? (
            <div className="space-y-6">
              {/* Error Message */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">❌</div>
                  <div>
                    <h4 className="font-semibold text-red-900 mb-2">Fout bij verwerken</h4>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>

              {/* Fallback */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💡</div>
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-2">Dit PDF-bestand bevat complexe tabellen</p>
                    <p>Probeer een simpeler bestand, of converteer het PDF handmatig naar een platte tabel-structuur.</p>
                    <p className="mt-2">Tips:</p>
                    <ul className="list-disc ml-5 mt-2 space-y-1">
                      <li>Gebruik PDFs met duidelijke tabelstructuren</li>
                      <li>Vermijd PDFs met geneste tabellen of complexe layouts</li>
                      <li>PDFs zonder scans werken het best</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Probeer een ander bestand
              </button>
            </div>
          ) : tables.length > 0 ? (
            <div className="space-y-8">
              {/* Success Message */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">✅</div>
                  <div>
                    <h4 className="font-semibold text-green-900">
                      {tables.length} {tables.length === 1 ? 'tabel' : 'tabellen'} gevonden!
                    </h4>
                    <p className="text-sm text-green-700">
                      Je kunt de cellen hieronder bewerken voordat je exporteert.
                    </p>
                  </div>
                </div>
              </div>

              {/* Table Preview */}
              <TablePreview tables={tables} onUpdate={setTables} />

              {/* SaveUpsellBanner */}
              <SaveUpsellBanner
                toolName="pdf-to-excel"
                message="Dit resultaat verdwijnt als je de pagina sluit"
              />

              {/* Export Options */}
              <ConvertExport tables={tables} filename={selectedFile.name} />

              {/* Lead Capture */}
              <LeadCaptureForm toolName="pdf-to-excel" />

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Nieuwe conversie
              </button>
            </div>
          ) : null}
        </div>

        {/* ArchiteQt CTA */}
        <ArchiteqtCTA />

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Hoe werkt de PDF Converter?</h3>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>1. Upload:</strong> Sleep je PDF naar de uploader (max 10MB). Geen data naar server.
            </p>
            <p>
              <strong>2. Detectie:</strong> Automatische tabel-detectie met PDF.js (JavaScript library).
            </p>
            <p>
              <strong>3. Preview:</strong> Bekijk en bewerk gedetecteerde tabellen direct in je browser.
            </p>
            <p>
              <strong>4. Export:</strong> Download als Excel (.xlsx) of CSV voor verder bewerken.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              <strong>Privacy:</strong> Alle verwerking gebeurt 100% lokaal. Je PDF verlaat nooit je apparaat.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} ArchiteQt Tools. Onderdeel van{' '}
            <a
              href="https://architeqt.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-turquoise hover:underline"
            >
              architeqt.tech
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
