'use client';

import type { BudgetResult, BudgetInput } from '@/lib/calculations/budget';
import { formatEuro } from '@/lib/calculations/budget';

interface BudgetExportProps {
  result: BudgetResult;
  input: BudgetInput;
}

export default function BudgetExport({ result, input }: BudgetExportProps) {
  const handleDownloadPDF = () => {
    // Simple HTML-to-PDF using browser print
    const content = generatePrintContent();
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up geblokkeerd. Sta pop-ups toe voor deze site.');
      return;
    }

    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    
    // Wait for content to load, then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleDownloadExcel = () => {
    // Generate CSV (Excel-compatible)
    const csv = generateCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `budget-${input.projectType}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateCSV = () => {
    const rows = [
      ['Budget Berekening - ArchiteQt Tools'],
      [''],
      ['Projectgegevens'],
      ['Projecttype', input.projectType],
      ['Oppervlakte', `${input.area} m²`],
      ['Kwaliteitsniveau', input.quality],
      ['Regio', input.region],
      [''],
      ['Kostenopbouw'],
      ['Categorie', 'Percentage', 'Bedrag'],
      ...result.breakdown.map((item) => [
        item.categorie,
        `${item.percentage}%`,
        formatEuro(item.bedrag),
      ]),
      [''],
      ['Subtotaal (excl. BTW)', '', formatEuro(result.subtotaal)],
      ['BTW (21%)', '', formatEuro(result.btw)],
      ['Totaal (incl. BTW)', '', formatEuro(result.totaal)],
      [''],
      ['Let op: Dit is een indicatieve berekening.'],
    ];

    return rows.map((row) => row.join(',')).join('\n');
  };

  const generatePrintContent = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Budget Berekening - ${input.projectType}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #333;
            }
            .header {
              text-align: center;
              margin-bottom: 40px;
              border-bottom: 3px solid #00A693;
              padding-bottom: 20px;
            }
            .header h1 {
              color: #00A693;
              margin: 0 0 10px 0;
            }
            .section {
              margin-bottom: 30px;
            }
            .section h2 {
              color: #00A693;
              border-bottom: 1px solid #ddd;
              padding-bottom: 10px;
              margin-bottom: 15px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              padding: 12px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f5f5f5;
              font-weight: bold;
            }
            .total-row {
              background-color: #00A693;
              color: white;
              font-weight: bold;
              font-size: 1.2em;
            }
            .total-row td {
              border-bottom: none;
            }
            .disclaimer {
              background-color: #fff3cd;
              border: 1px solid #ffc107;
              padding: 15px;
              border-radius: 5px;
              margin-top: 30px;
              font-size: 0.9em;
            }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Budget Berekening</h1>
            <p>ArchiteQt Tools | ${new Date().toLocaleDateString('nl-NL')}</p>
          </div>

          <div class="section">
            <h2>Projectgegevens</h2>
            <table>
              <tr>
                <th>Projecttype</th>
                <td>${input.projectType}</td>
              </tr>
              <tr>
                <th>Oppervlakte</th>
                <td>${input.area} m²</td>
              </tr>
              <tr>
                <th>Kwaliteitsniveau</th>
                <td>${input.quality}</td>
              </tr>
              <tr>
                <th>Regio</th>
                <td>${input.region}</td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h2>Kostenopbouw</h2>
            <table>
              <thead>
                <tr>
                  <th>Categorie</th>
                  <th>Percentage</th>
                  <th>Bedrag</th>
                </tr>
              </thead>
              <tbody>
                ${result.breakdown
                  .map(
                    (item) => `
                  <tr>
                    <td>${item.categorie}</td>
                    <td>${item.percentage}%</td>
                    <td>${formatEuro(item.bedrag)}</td>
                  </tr>
                `
                  )
                  .join('')}
                <tr>
                  <td colspan="2"><strong>Subtotaal (excl. BTW)</strong></td>
                  <td><strong>${formatEuro(result.subtotaal)}</strong></td>
                </tr>
                <tr>
                  <td colspan="2">BTW (21%)</td>
                  <td>${formatEuro(result.btw)}</td>
                </tr>
                <tr class="total-row">
                  <td colspan="2">Totaal (incl. BTW)</td>
                  <td>${formatEuro(result.totaal)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="disclaimer">
            <strong>⚠️ Let op:</strong> Dit is een indicatieve berekening. Werkelijke kosten kunnen afwijken 
            op basis van specifieke projecteisen, materiaalkeuzes en marktomstandigheden. 
            Vraag altijd een gedetailleerde offerte aan.
          </div>
        </body>
      </html>
    `;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleDownloadPDF}
        className="flex-1 bg-white border-2 border-primary-turquoise text-primary-turquoise py-3 px-6 rounded-lg font-semibold hover:bg-primary-turquoise hover:text-white transition-colors"
      >
        📄 Download PDF
      </button>
      <button
        onClick={handleDownloadExcel}
        className="flex-1 bg-white border-2 border-primary-turquoise text-primary-turquoise py-3 px-6 rounded-lg font-semibold hover:bg-primary-turquoise hover:text-white transition-colors"
      >
        📊 Download Excel
      </button>
    </div>
  );
}
