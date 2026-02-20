'use client';

interface RiskAnalysisProps {
  risks: string[];
  recommendations: string[];
}

export default function RiskAnalysis({ risks, recommendations }: RiskAnalysisProps) {
  return (
    <div className="space-y-4">
      {/* Risks */}
      {risks.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h4 className="font-semibold text-yellow-900 mb-4 flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            Risico's & Waarschuwingen
          </h4>
          <ul className="space-y-2">
            {risks.map((risk, index) => (
              <li key={index} className="text-sm text-yellow-800 flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <span className="text-xl">💡</span>
            Aanbevelingen
          </h4>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-blue-800 flex items-start gap-2">
                <span className="mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
