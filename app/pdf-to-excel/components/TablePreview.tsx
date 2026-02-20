'use client';

import { useState } from 'react';
import type { TableData } from './TableDetector';

interface TablePreviewProps {
  tables: TableData[];
  onUpdate: (tables: TableData[]) => void;
}

export default function TablePreview({ tables, onUpdate }: TablePreviewProps) {
  const [selectedTable, setSelectedTable] = useState(0);

  const handleCellEdit = (tableIndex: number, rowIndex: number, colIndex: number, value: string) => {
    const newTables = [...tables];
    newTables[tableIndex].rows[rowIndex][colIndex] = value;
    onUpdate(newTables);
  };

  if (tables.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Table Selector */}
      {tables.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {tables.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedTable(index)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTable === index
                  ? 'bg-architeqt text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tabel {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Table Preview */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">
              Preview {tables.length > 1 ? `- Tabel ${selectedTable + 1}` : ''}
            </h3>
            <div className="text-sm text-gray-600">
              {tables[selectedTable].rows.length} rijen × {tables[selectedTable].rows[0]?.length || 0} kolommen
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Headers */}
            {tables[selectedTable].headers && (
              <thead className="bg-architeqt/10">
                <tr>
                  {tables[selectedTable].headers!.map((header, colIndex) => (
                    <th
                      key={colIndex}
                      className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-200"
                    >
                      <input
                        type="text"
                        value={header}
                        onChange={(e) =>
                          handleCellEdit(selectedTable, 0, colIndex, e.target.value)
                        }
                        className="w-full bg-transparent border-none outline-none focus:ring-2 focus:ring-architeqt rounded px-2 py-1"
                      />
                    </th>
                  ))}
                </tr>
              </thead>
            )}

            {/* Body */}
            <tbody>
              {tables[selectedTable].rows
                .slice(tables[selectedTable].headers ? 1 : 0) // Skip first row if it's a header
                .slice(0, 50) // Limit to 50 rows for performance
                .map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    {row.map((cell, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100"
                      >
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) =>
                            handleCellEdit(
                              selectedTable,
                              rowIndex + (tables[selectedTable].headers ? 1 : 0),
                              colIndex,
                              e.target.value
                            )
                          }
                          className="w-full bg-transparent border-none outline-none focus:ring-2 focus:ring-architeqt rounded px-2 py-1"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {tables[selectedTable].rows.length > 51 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-600">
            Nog {tables[selectedTable].rows.length - 50} rijen... (worden meegenomen in export)
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="text-xl">💡</div>
          <div className="text-sm text-blue-800">
            <p><strong>Tip:</strong> Je kunt de cellen direct bewerken als er fouten zijn gedetecteerd. 
            Alle wijzigingen worden meegenomen in de export.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
