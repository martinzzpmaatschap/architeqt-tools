'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateTimeline, type TimelineInput, type TimelineResult } from '@/lib/calculations/timeline';
import TimelineForm from './components/TimelineForm';
import TimelineResults from './components/TimelineResults';
import RiskAnalysis from './components/RiskAnalysis';
import TimelineExport from './components/TimelineExport';
import SaveUpsellBanner from '@/components/SaveUpsellBanner';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import ArchiteqtCTA from '@/components/ArchiteqtCTA';

export default function ProjectPlannerPage() {
  const [input, setInput] = useState<TimelineInput | null>(null);
  const [result, setResult] = useState<TimelineResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = (newInput: TimelineInput) => {
    setIsCalculating(true);
    setInput(newInput);

    // Simulate brief loading for UX
    setTimeout(() => {
      const calculatedResult = calculateTimeline(newInput);
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Project Planner
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Bereken een realistische timeline voor jouw project. Inclusief vergunningsperiode, 
            seizoensinvloeden en risico-analyse.
          </p>
        </div>

        {/* Tool Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
          {!result ? (
            <TimelineForm onCalculate={handleCalculate} isCalculating={isCalculating} />
          ) : (
            <div className="space-y-8">
              {/* Results */}
              <TimelineResults result={result} />

              {/* Risk Analysis */}
              <RiskAnalysis risks={result.risks} recommendations={result.recommendations} />

              {/* SaveUpsellBanner */}
              <SaveUpsellBanner
                toolName="project-planner"
                message="Deze planning verdwijnt als je de pagina sluit"
              />

              {/* Export Options */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Exporteer je planning</h3>
                <TimelineExport result={result} input={input!} />
              </div>

              {/* Lead Capture */}
              <LeadCaptureForm toolName="project-planner" />

              {/* New Calculation Button */}
              <button
                onClick={handleReset}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Nieuwe planning
              </button>
            </div>
          )}
        </div>

        {/* ArchiteQt CTA */}
        <ArchiteqtCTA />

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Hoe werkt de Project Planner?</h3>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>1. Complexiteit:</strong> Eenvoudige projecten (70% basis), Standaard (100%), 
              Complex (140%), Zeer Complex (200% tijd).
            </p>
            <p>
              <strong>2. Seizoensinvloeden:</strong> Winter +25% op uitvoeringsfase, Zomer -5%, 
              Herfst +5%, Lente optimaal.
            </p>
            <p>
              <strong>3. Vergunning:</strong> Gemiddeld 12 weken, afhankelijk van complexiteit 
              en gemeentelijke drukte.
            </p>
            <p>
              <strong>4. Risico-analyse:</strong> Automatische waarschuwingen voor seizoen, 
              complexiteit, oppervlakte en vergunningen.
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
