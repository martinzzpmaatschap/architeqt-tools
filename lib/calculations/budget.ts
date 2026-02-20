/**
 * Budget Calculator - Client-side berekeningen
 * Geen API calls, alles lokaal in de browser
 */

export interface BudgetInput {
  projectType: string;
  area: number;
  quality: 'budget' | 'midden' | 'premium';
  region: string;
}

export interface BudgetResult {
  materiaal: number;
  arbeid: number;
  overhead: number;
  onvoorzien: number;
  subtotaal: number;
  btw: number;
  totaal: number;
  breakdown: {
    categorie: string;
    bedrag: number;
    percentage: number;
  }[];
}

const BASE_PRICES: Record<string, number> = {
  woning_verbouwing: 1200,
  nieuwbouw_woning: 1800,
  kantoor_renovatie: 900,
  winkel_inrichting: 1100,
  restaurant_horeca: 1400,
  monumentaal_pand: 2200,
  zorginstelling: 1600,
  schoolgebouw: 1300,
  appartementencomplex: 1500,
};

const QUALITY_MULTIPLIERS: Record<string, number> = {
  budget: 0.7,
  midden: 1.0,
  premium: 1.5,
};

const REGION_MULTIPLIERS: Record<string, number> = {
  amsterdam: 1.15,
  rotterdam: 1.08,
  utrecht: 1.10,
  den_haag: 1.05,
  noord_holland: 1.05,
  zuid_holland: 1.03,
  overig_randstad: 1.00,
  buiten_randstad: 0.90,
};

export function calculateBudget(input: BudgetInput): BudgetResult {
  const base = BASE_PRICES[input.projectType] ?? 1200;
  const subtotaal =
    base *
    input.area *
    (QUALITY_MULTIPLIERS[input.quality] ?? 1) *
    (REGION_MULTIPLIERS[input.region] ?? 1);

  const materiaal = subtotaal * 0.45;
  const arbeid = subtotaal * 0.35;
  const overhead = subtotaal * 0.12;
  const onvoorzien = subtotaal * 0.08;
  const btw = subtotaal * 0.21;

  return {
    materiaal: Math.round(materiaal),
    arbeid: Math.round(arbeid),
    overhead: Math.round(overhead),
    onvoorzien: Math.round(onvoorzien),
    subtotaal: Math.round(subtotaal),
    btw: Math.round(btw),
    totaal: Math.round(subtotaal + btw),
    breakdown: [
      { categorie: 'Materiaal', bedrag: Math.round(materiaal), percentage: 45 },
      { categorie: 'Arbeid', bedrag: Math.round(arbeid), percentage: 35 },
      { categorie: 'Overhead', bedrag: Math.round(overhead), percentage: 12 },
      { categorie: 'Onvoorzien', bedrag: Math.round(onvoorzien), percentage: 8 },
    ],
  };
}

/**
 * Format bedrag als EUR (€ 1.234,56)
 */
export function formatEuro(amount: number): string {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
