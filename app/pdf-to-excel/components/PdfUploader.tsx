'use client';

import { useCallback, useState } from 'react';

interface PdfUploaderProps {
  onFileSelect: (file: File) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function PdfUploader({ onFileSelect }: PdfUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const validateFile = (file: File): boolean => {
    setError('');

    if (file.type !== 'application/pdf') {
      setError('Alleen PDF bestanden zijn toegestaan');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError(`Bestand te groot. Maximum is ${MAX_FILE_SIZE / 1024 / 1024}MB`);
      return false;
    }

    return true;
  };

  const handleFile = useCallback((file: File) => {
    if (validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  return (
    <div className="space-y-4">
      {/* Privacy Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl">🔒</div>
          <div className="flex-1">
            <h4 className="font-semibold text-green-900 mb-1">100% Privacy Gegarandeerd</h4>
            <p className="text-sm text-green-700">
              Alle verwerking gebeurt lokaal in je browser. Je PDF wordt NIET naar een server gestuurd. 
              Je data blijft volledig privé.
            </p>
          </div>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer
          ${isDragging 
            ? 'border-primary-turquoise bg-primary-turquoise/5 scale-[1.02]' 
            : 'border-gray-300 hover:border-primary-turquoise hover:bg-gray-50'
          }
        `}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileInput}
          className="hidden"
        />

        <div className="text-6xl mb-4">📄</div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Sleep je PDF hier naartoe
        </h3>
        
        <p className="text-gray-600 mb-4">
          of klik om een bestand te selecteren
        </p>

        <div className="text-sm text-gray-500">
          <p>Maximum 10MB • PDF formaat</p>
          <p className="mt-1">Werkt het best met simpele tabel-PDFs</p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-red-600 text-xl">⚠️</span>
            <span className="text-red-800 font-medium">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}
