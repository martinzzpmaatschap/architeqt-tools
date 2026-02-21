'use client';

import type { TimelineResult } from '@/lib/calculations/timeline';
import { formatDuration } from '@/lib/calculations/timeline';

interface TimelineResultsProps {
  result: TimelineResult;
}

export default function TimelineResults({ result }: TimelineResultsProps) {
  return (
    <div className="space-y-6">
      {/* Total Duration - Prominent */}
      <div className="bg-primary-turquoise text-white rounded-xl p-8 text-center">
        <div className="text-sm font-medium uppercase tracking-wide opacity-90 mb-2">
          Totale Projectduur
        </div>
        <div className="text-5xl font-bold mb-2">
          {result.totalMonths} {result.totalMonths === 1 ? 'maand' : 'maanden'}
        </div>
        <div className="text-lg opacity-90">
          ({result.totalWeeks} weken)
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-6">Timeline Overzicht</h3>
        
        <div className="space-y-3">
          {result.phases.map((phase) => (
            <div key={phase.name} className="flex items-center gap-4">
              {/* Phase Name */}
              <div className="w-32 text-sm font-medium text-gray-700">
                {phase.name}
              </div>

              {/* Gantt Bar */}
              <div className="flex-1 bg-gray-100 rounded-full h-10 relative overflow-hidden">
                <div
                  className="absolute h-10 rounded-full flex items-center px-4 transition-all"
                  style={{
                    backgroundColor: phase.color,
                    width: `${(phase.weeks / result.totalWeeks) * 100}%`,
                    left: `${(phase.startWeek / result.totalWeeks) * 100}%`,
                  }}
                >
                  <span className="text-white text-sm font-medium whitespace-nowrap">
                    {formatDuration(phase.weeks)}
                  </span>
                </div>
              </div>

              {/* Weeks */}
              <div className="w-20 text-right text-sm text-gray-600">
                {phase.weeks}w
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex flex-wrap gap-4 text-sm">
            {result.phases.map((phase) => (
              <div key={phase.name} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: phase.color }}
                />
                <span className="text-gray-700">{phase.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phase Breakdown Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Fase Details</h3>
        </div>

        <div className="divide-y divide-gray-200">
          {result.phases.map((phase) => (
            <div key={phase.name} className="px-6 py-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: phase.color }}
                  />
                  <span className="font-medium text-gray-900">{phase.name}</span>
                </div>
                <span className="text-gray-700 font-semibold">
                  {formatDuration(phase.weeks)}
                </span>
              </div>
              <div className="text-sm text-gray-600 ml-6">
                Week {phase.startWeek + 1} t/m week {phase.endWeek}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
