'use client';

import type { BudgetResult } from '@/lib/calculations/budget';
import { formatEuro } from '@/lib/calculations/budget';

interface BudgetResultsProps {
  result: BudgetResult;
}

export default function BudgetResults({ result }: BudgetResultsProps) {
  return (
    <div className="space-y-6">
      {/* Total - Prominent */}
      <div className="bg-primary-turquoise text-white rounded-xl p-8 text-center">
        <div className="text-sm font-medium uppercase tracking-wide opacity-90 mb-2">
          Totaal Budget (incl. BTW)
        </div>
        <div className="text-5xl font-bold">{formatEuro(result.totaal)}</div>
      </div>

      {/* Breakdown Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Kostenopbouw</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {result.breakdown.map((item) => (
            <div key={item.categorie} className="px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="text-gray-900 font-medium">{item.categorie}</div>
                <div className="text-xs text-gray-500">({item.percentage}%)</div>
              </div>
              <div className="text-gray-900 font-semibold">{formatEuro(item.bedrag)}</div>
            </div>
          ))}

          {/* Subtotaal */}
          <div className="px-6 py-4 flex justify-between items-center bg-gray-50">
            <div className="text-gray-900 font-semibold">Subtotaal (excl. BTW)</div>
            <div className="text-gray-900 font-bold">{formatEuro(result.subtotaal)}</div>
          </div>

          {/* BTW */}
          <div className="px-6 py-4 flex justify-between items-center">
            <div className="text-gray-700 font-medium">BTW (21%)</div>
            <div className="text-gray-700 font-semibold">{formatEuro(result.btw)}</div>
          </div>

          {/* Totaal */}
          <div className="px-6 py-4 flex justify-between items-center bg-primary-turquoise/5">
            <div className="text-primary-turquoise font-bold text-lg">Totaal (incl. BTW)</div>
            <div className="text-primary-turquoise font-bold text-xl">{formatEuro(result.totaal)}</div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex gap-3">
          <div className="text-yellow-600 text-xl">⚠️</div>
          <div className="text-sm text-yellow-800">
            <strong>Let op:</strong> Dit is een indicatieve berekening. Werkelijke kosten kunnen
            afwijken op basis van specifieke projecteisen, materiaalkeuzes en marktomstandigheden.
            Vraag altijd een gedetailleerde offerte aan.
          </div>
        </div>
      </div>
    </div>
  );
}
