'use client';

import { useState } from 'react';
import type { TimelineInput } from '@/lib/calculations/timeline';

interface TimelineFormProps {
  onCalculate: (input: TimelineInput) => void;
  isCalculating?: boolean;
}

const PROJECT_TYPES = [
  { value: 'woning_verbouwing', label: 'Woning verbouwing' },
  { value: 'nieuwbouw_woning', label: 'Nieuwbouw woning' },
  { value: 'kantoor_renovatie', label: 'Kantoor renovatie' },
  { value: 'winkel_inrichting', label: 'Winkel inrichting' },
  { value: 'restaurant_horeca', label: 'Restaurant / Horeca' },
  { value: 'monumentaal_pand', label: 'Monumentaal pand' },
  { value: 'zorginstelling', label: 'Zorginstelling' },
  { value: 'schoolgebouw', label: 'Schoolgebouw' },
];

export default function TimelineForm({ onCalculate, isCalculating = false }: TimelineFormProps) {
  const [projectType, setProjectType] = useState('');
  const [area, setArea] = useState('');
  const [complexity, setComplexity] = useState<'eenvoudig' | 'standaard' | 'complex' | 'zeer_complex'>('standaard');
  const [permitRequired, setPermitRequired] = useState(true);
  const [startSeason, setStartSeason] = useState<'lente' | 'zomer' | 'herfst' | 'winter'>('lente');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectType || !area) {
      alert('Vul alle verplichte velden in');
      return;
    }

    const areaNum = parseFloat(area);
    if (isNaN(areaNum) || areaNum <= 0) {
      alert('Vul een geldig oppervlak in');
      return;
    }

    onCalculate({
      projectType,
      area: areaNum,
      complexity,
      permitRequired,
      startSeason,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
          Projecttype *
        </label>
        <select
          id="projectType"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-architeqt focus:border-transparent"
          required
        >
          <option value="">Selecteer een type</option>
          {PROJECT_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Area */}
      <div>
        <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-2">
          Oppervlakte (m²) *
        </label>
        <input
          id="area"
          type="number"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Bijv. 150"
          min="1"
          step="0.1"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-architeqt focus:border-transparent"
          required
        />
      </div>

      {/* Complexity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Complexiteit *</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 'eenvoudig', label: 'Eenvoudig' },
            { value: 'standaard', label: 'Standaard' },
            { value: 'complex', label: 'Complex' },
            { value: 'zeer_complex', label: 'Zeer Complex' },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setComplexity(opt.value as typeof complexity)}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                complexity === opt.value
                  ? 'border-architeqt bg-architeqt/5 text-architeqt font-semibold'
                  : 'border-gray-300 hover:border-architeqt/50'
              }`}
            >
              <div className="font-medium text-sm">{opt.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Permit Required */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Vergunning vereist? *
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setPermitRequired(true)}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              permitRequired
                ? 'border-architeqt bg-architeqt/5 text-architeqt font-semibold'
                : 'border-gray-300 hover:border-architeqt/50'
            }`}
          >
            Ja
          </button>
          <button
            type="button"
            onClick={() => setPermitRequired(false)}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              !permitRequired
                ? 'border-architeqt bg-architeqt/5 text-architeqt font-semibold'
                : 'border-gray-300 hover:border-architeqt/50'
            }`}
          >
            Nee
          </button>
        </div>
      </div>

      {/* Start Season */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Start seizoen *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: 'lente', label: '🌸 Lente', desc: 'Mrt-Mei' },
            { value: 'zomer', label: '☀️ Zomer', desc: 'Jun-Aug' },
            { value: 'herfst', label: '🍂 Herfst', desc: 'Sep-Nov' },
            { value: 'winter', label: '❄️ Winter', desc: 'Dec-Feb' },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setStartSeason(opt.value as typeof startSeason)}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                startSeason === opt.value
                  ? 'border-architeqt bg-architeqt/5 text-architeqt font-semibold'
                  : 'border-gray-300 hover:border-architeqt/50'
              }`}
            >
              <div className="font-medium mb-1">{opt.label}</div>
              <div className="text-xs text-gray-500">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isCalculating}
        className="w-full bg-architeqt text-white py-4 rounded-lg font-semibold hover:bg-architeqt/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isCalculating ? 'Berekenen...' : 'Bereken Timeline'}
      </button>
    </form>
  );
}
