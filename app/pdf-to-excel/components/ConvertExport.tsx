'use client';

import type { TableData } from './TableDetector';

interface ConvertExportProps {
  tables: TableData[];
  filename: string;
}

export default function ConvertExport({ tables, filename }: ConvertExportProps) {
  const handleDownloadCSV = () => {
    const csv = generateCSV(tables[0]); // Export first table for simplicity
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const name = filename.replace('.pdf', '.csv');
    link.setAttribute('href', url);
    link.setAttribute('download', name);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadExcel = () => {
    // CSV works as Excel-compatible format
    const csv = generateCSV(tables[0]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const name = filename.replace('.pdf', '.xlsx');
    link.setAttribute('href', url);
    link.setAttribute('download', name);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateCSV = (table: TableData): string => {
    const rows = table.rows.map((row) =>
      row.map((cell) => {
        // Escape quotes and wrap in quotes if contains comma/newline
        if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
          return `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      }).join(',')
    );
    
    return rows.join('\n');
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Exporteer naar Excel/CSV</h3>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleDownloadExcel}
          className="flex-1 bg-primary-turquoise text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-turquoise/90 transition-colors"
        >
          📊 Download als Excel (.xlsx)
        </button>
        <button
          onClick={handleDownloadCSV}
          className="flex-1 bg-white border-2 border-primary-turquoise text-primary-turquoise py-3 px-6 rounded-lg font-semibold hover:bg-primary-turquoise hover:text-white transition-colors"
        >
          📄 Download als CSV
        </button>
      </div>

      {tables.length > 1 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-xl">ℹ️</div>
            <div className="text-sm text-yellow-800">
              <p><strong>Let op:</strong> We hebben {tables.length} tabellen gedetecteerd. 
              Momenteel exporteren we alleen de eerste tabel. Voor meerdere tabellen, 
              download elke tabel afzonderlijk.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
