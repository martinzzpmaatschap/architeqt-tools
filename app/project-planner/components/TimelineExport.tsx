'use client';

import type { TimelineResult, TimelineInput } from '@/lib/calculations/timeline';
import { formatDuration } from '@/lib/calculations/timeline';

interface TimelineExportProps {
  result: TimelineResult;
  input: TimelineInput;
}

export default function TimelineExport({ result, input }: TimelineExportProps) {
  const handleDownloadPDF = () => {
    const content = generatePrintContent();
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Pop-up geblokkeerd. Sta pop-ups toe voor deze site.');
      return;
    }

    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleDownloadExcel = () => {
    const csv = generateCSV();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `timeline-${input.projectType}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateCSV = () => {
    const rows = [
      ['Project Timeline - ArchiteQt Tools'],
      [''],
      ['Projectgegevens'],
      ['Projecttype', input.projectType],
      ['Oppervlakte', `${input.area} m²`],
      ['Complexiteit', input.complexity],
      ['Vergunning vereist', input.permitRequired ? 'Ja' : 'Nee'],
      ['Start seizoen', input.startSeason],
      [''],
      ['Timeline Overzicht'],
      ['Totale duur', `${result.totalWeeks} weken (${result.totalMonths} maanden)`],
      [''],
      ['Fases'],
      ['Fase', 'Start Week', 'Duur (weken)', 'Eind Week'],
      ...result.phases.map((phase) => [
        phase.name,
        `Week ${phase.startWeek + 1}`,
        phase.weeks,
        `Week ${phase.endWeek}`,
      ]),
      [''],
      ['Risico\'s'],
      ...result.risks.map((risk) => [risk]),
      [''],
      ['Aanbevelingen'],
      ...result.recommendations.map((rec) => [rec]),
    ];

    return rows.map((row) => row.join(',')).join('\n');
  };

  const generatePrintContent = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Project Timeline - ${input.projectType}</title>
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
            .gantt-bar {
              height: 30px;
              border-radius: 5px;
              display: inline-block;
              color: white;
              padding: 5px 10px;
              font-size: 0.85em;
            }
            .warning-box, .info-box {
              padding: 15px;
              border-radius: 5px;
              margin: 15px 0;
            }
            .warning-box {
              background-color: #fff3cd;
              border: 1px solid #ffc107;
            }
            .info-box {
              background-color: #cfe2ff;
              border: 1px solid #0d6efd;
            }
            ul {
              margin: 10px 0;
              padding-left: 20px;
            }
            li {
              margin: 8px 0;
            }
            @media print {
              body { padding: 20px; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Project Timeline</h1>
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
                <th>Complexiteit</th>
                <td>${input.complexity}</td>
              </tr>
              <tr>
                <th>Vergunning vereist</th>
                <td>${input.permitRequired ? 'Ja' : 'Nee'}</td>
              </tr>
              <tr>
                <th>Start seizoen</th>
                <td>${input.startSeason}</td>
              </tr>
              <tr class="total-row">
                <td>Totale duur</td>
                <td>${result.totalMonths} maanden (${result.totalWeeks} weken)</td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h2>Fases</h2>
            <table>
              <thead>
                <tr>
                  <th>Fase</th>
                  <th>Start</th>
                  <th>Duur</th>
                  <th>Eind</th>
                </tr>
              </thead>
              <tbody>
                ${result.phases
                  .map(
                    (phase) => `
                  <tr>
                    <td style="border-left: 4px solid ${phase.color}; padding-left: 12px;">
                      <strong>${phase.name}</strong>
                    </td>
                    <td>Week ${phase.startWeek + 1}</td>
                    <td>${formatDuration(phase.weeks)}</td>
                    <td>Week ${phase.endWeek}</td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>

          ${
            result.risks.length > 0
              ? `
          <div class="section">
            <h2>Risico's & Waarschuwingen</h2>
            <div class="warning-box">
              <ul>
                ${result.risks.map((risk) => `<li>${risk}</li>`).join('')}
              </ul>
            </div>
          </div>
          `
              : ''
          }

          ${
            result.recommendations.length > 0
              ? `
          <div class="section">
            <h2>Aanbevelingen</h2>
            <div class="info-box">
              <ul>
                ${result.recommendations.map((rec) => `<li>${rec}</li>`).join('')}
              </ul>
            </div>
          </div>
          `
              : ''
          }
        </body>
      </html>
    `;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleDownloadPDF}
        className="flex-1 bg-white border-2 border-architeqt text-architeqt py-3 px-6 rounded-lg font-semibold hover:bg-architeqt hover:text-white transition-colors"
      >
        📄 Download PDF
      </button>
      <button
        onClick={handleDownloadExcel}
        className="flex-1 bg-white border-2 border-architeqt text-architeqt py-3 px-6 rounded-lg font-semibold hover:bg-architeqt hover:text-white transition-colors"
      >
        📊 Download Excel
      </button>
    </div>
  );
}
