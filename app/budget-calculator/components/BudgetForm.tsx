'use client';

import { useState } from 'react';
import type { BudgetInput } from '@/lib/calculations/budget';

interface BudgetFormProps {
  onCalculate: (input: BudgetInput) => void;
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
  { value: 'appartementencomplex', label: 'Appartementencomplex' },
];

const REGIONS = [
  { value: 'amsterdam', label: 'Amsterdam' },
  { value: 'rotterdam', label: 'Rotterdam' },
  { value: 'utrecht', label: 'Utrecht' },
  { value: 'den_haag', label: 'Den Haag' },
  { value: 'noord_holland', label: 'Noord-Holland (overig)' },
  { value: 'zuid_holland', label: 'Zuid-Holland (overig)' },
  { value: 'overig_randstad', label: 'Overige Randstad' },
  { value: 'buiten_randstad', label: 'Buiten Randstad' },
];

export default function BudgetForm({ onCalculate, isCalculating = false }: BudgetFormProps) {
  const [projectType, setProjectType] = useState('');
  const [area, setArea] = useState('');
  const [quality, setQuality] = useState<'budget' | 'midden' | 'premium'>('midden');
  const [region, setRegion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectType || !area || !region) {
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
      quality,
      region,
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

      {/* Quality Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Kwaliteitsniveau *</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'budget', label: 'Budget', desc: 'Eenvoudig' },
            { value: 'midden', label: 'Midden', desc: 'Standaard' },
            { value: 'premium', label: 'Premium', desc: 'Luxe' },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setQuality(opt.value as 'budget' | 'midden' | 'premium')}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                quality === opt.value
                  ? 'border-architeqt bg-architeqt/5 text-architeqt font-semibold'
                  : 'border-gray-300 hover:border-architeqt/50'
              }`}
            >
              <div className="font-medium">{opt.label}</div>
              <div className="text-xs text-gray-500 mt-1">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Region */}
      <div>
        <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
          Regio *
        </label>
        <select
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-architeqt focus:border-transparent"
          required
        >
          <option value="">Selecteer een regio</option>
          {REGIONS.map((reg) => (
            <option key={reg.value} value={reg.value}>
              {reg.label}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isCalculating}
        className="w-full bg-architeqt text-white py-4 rounded-lg font-semibold hover:bg-architeqt/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isCalculating ? 'Berekenen...' : 'Bereken Budget'}
      </button>
    </form>
  );
}
