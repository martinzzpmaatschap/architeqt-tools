'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateBudget, type BudgetInput, type BudgetResult } from '@/lib/calculations/budget';
import BudgetForm from './components/BudgetForm';
import BudgetResults from './components/BudgetResults';
import BudgetExport from './components/BudgetExport';
import SaveUpsellBanner from '@/components/SaveUpsellBanner';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import ArchiteqtCTA from '@/components/ArchiteqtCTA';

export default function BudgetCalculatorPage() {
  const [input, setInput] = useState<BudgetInput | null>(null);
  const [result, setResult] = useState<BudgetResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = (newInput: BudgetInput) => {
    setIsCalculating(true);
    setInput(newInput);

    // Simulate brief loading for UX
    setTimeout(() => {
      const calculatedResult = calculateBudget(newInput);
      setResult(calculatedResult);
      setIsCalculating(false);
    }, 300);
  };

  const handleReset = () => {
    setInput(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-architeqt hover:text-architeqt/80 transition-colors">
              ← ArchiteQt Tools
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Budget Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bereken snel een indicatief budget voor jouw interieurproject. 
            Gebaseerd op vierkante meters, kwaliteitsniveau en regio.
          </p>
        </div>

        {/* Tool Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          {!result ? (
            <BudgetForm onCalculate={handleCalculate} isCalculating={isCalculating} />
          ) : (
            <div className="space-y-8">
              {/* Results */}
              <BudgetResults result={result} />

              {/* SaveUpsellBanner */}
              <SaveUpsellBanner
                toolName="budget-calculator"
                message="Dit resultaat verdwijnt als je de pagina sluit"
              />

              {/* Export Options */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Exporteer je budget</h3>
                <BudgetExport result={result} input={input!} />
              </div>

              {/* Lead Capture */}
              <LeadCaptureForm toolName="budget-calculator" />

              {/* New Calculation Button */}
              <button
                onClick={handleReset}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Nieuwe berekening
              </button>
            </div>
          )}
        </div>

        {/* ArchiteQt CTA */}
        <ArchiteqtCTA />

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Hoe werkt de Budget Calculator?</h3>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>1. Projecttype:</strong> Verschillende projecten hebben verschillende 
              basis kostprijzen per vierkante meter.
            </p>
            <p>
              <strong>2. Kwaliteitsniveau:</strong> Budget (70% van basis), Midden (100%), 
              Premium (150%).
            </p>
            <p>
              <strong>3. Regio:</strong> Regionale verschillen in materiaal- en arbeidsprijzen.
            </p>
            <p>
              <strong>4. Kostenopbouw:</strong> Materiaal (45%), Arbeid (35%), Overhead (12%), 
              Onvoorzien (8%).
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
              className="text-architeqt hover:underline"
            >
              architeqt.tech
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
