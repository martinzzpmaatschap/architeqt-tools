/**
 * Project Timeline Calculator - Client-side berekeningen
 * Geen API calls, alles lokaal in de browser
 */

export interface TimelineInput {
  projectType: string;
  complexity: 'eenvoudig' | 'standaard' | 'complex' | 'zeer_complex';
  area: number;
  permitRequired: boolean;
  startSeason: 'lente' | 'zomer' | 'herfst' | 'winter';
}

export interface TimelinePhase {
  name: string;
  weeks: number;
  startWeek: number;
  endWeek: number;
  color: string;
}

export interface TimelineResult {
  phases: TimelinePhase[];
  totalWeeks: number;
  totalMonths: number;
  risks: string[];
  recommendations: string[];
}

const COMPLEXITY: Record<string, number> = {
  eenvoudig: 0.7,
  standaard: 1.0,
  complex: 1.4,
  zeer_complex: 2.0,
};

const SEASON: Record<string, number> = {
  lente: 1.0,
  zomer: 0.95,
  herfst: 1.05,
  winter: 1.25,
};

const COLORS: Record<string, string> = {
  Ontwerp: '#3B82F6', // Blauw
  Vergunning: '#F59E0B', // Goud
  Aanbesteding: '#6B7280', // Grijs
  Uitvoering: '#00A693', // ArchiteQt turquoise
};

export function calculateTimeline(input: TimelineInput): TimelineResult {
  const cm = COMPLEXITY[input.complexity] ?? 1;
  const sm = SEASON[input.startSeason] ?? 1;
  const af = Math.max(1, Math.log10(input.area / 50));

  const phases: TimelinePhase[] = [];
  let week = 0;

  // Ontwerp fase
  const ontwerpWeeks = Math.round(6 * cm * af);
  phases.push({
    name: 'Ontwerp',
    weeks: ontwerpWeeks,
    startWeek: week,
    endWeek: week + ontwerpWeeks,
    color: COLORS.Ontwerp,
  });
  week += ontwerpWeeks;

  // Vergunning (optioneel)
  if (input.permitRequired) {
    const vergunningWeeks = Math.round(12 * cm);
    phases.push({
      name: 'Vergunning',
      weeks: vergunningWeeks,
      startWeek: week,
      endWeek: week + vergunningWeeks,
      color: COLORS.Vergunning,
    });
    week += vergunningWeeks;
  }

  // Aanbesteding
  const aanbestedingWeeks = Math.round(4 * cm);
  phases.push({
    name: 'Aanbesteding',
    weeks: aanbestedingWeeks,
    startWeek: week,
    endWeek: week + aanbestedingWeeks,
    color: COLORS.Aanbesteding,
  });
  week += aanbestedingWeeks;

  // Uitvoering
  const uitvoeringWeeks = Math.round(16 * cm * af * sm);
  phases.push({
    name: 'Uitvoering',
    weeks: uitvoeringWeeks,
    startWeek: week,
    endWeek: week + uitvoeringWeeks,
    color: COLORS.Uitvoering,
  });
  week += uitvoeringWeeks;

  // Risks en recommendations
  const risks: string[] = [];
  const recommendations: string[] = [];

  if (input.startSeason === 'winter') {
    risks.push('⚠️ Winterstart: +25% vertraging op uitvoeringsfase mogelijk');
    recommendations.push('Overweeg start uit te stellen tot lente voor optimale bouwcondities');
  }

  if (input.complexity === 'zeer_complex') {
    risks.push('⚠️ Zeer complex project: verhoogd risico op scope creep');
    recommendations.push('Overweeg fasering om risico\'s te spreiden');
  }

  if (input.permitRequired) {
    risks.push('⚠️ Vergunning kan vertraagd worden door gemeentelijke drukte');
    recommendations.push('Dien vergunning zo vroeg mogelijk in, idealiter 3-4 maanden voor gewenste start');
  }

  if (input.area > 1000) {
    risks.push('⚠️ Groot project: extra coördinatietijd en communicatie nodig');
    recommendations.push('Plan wekelijkse voortgangsmeetings in gedurende uitvoeringsfase');
  }

  if (input.startSeason === 'zomer') {
    recommendations.push('Zomerstart: ideaal seizoen, maar houd rekening met vakantieperiodes van aannemers');
  }

  if (input.startSeason === 'lente') {
    recommendations.push('Lentestart: optimaal voor starten bouwwerkzaamheden');
  }

  // Algemene adviezen
  recommendations.push('Plan altijd 10-15% buffer voor onvoorziene vertragingen');
  
  if (phases.length >= 3) {
    recommendations.push('Zorg voor duidelijke mijlpalen en go/no-go momenten tussen fases');
  }

  return {
    phases,
    totalWeeks: week,
    totalMonths: Math.round(week / 4.33),
    risks,
    recommendations,
  };
}

/**
 * Format weeks to readable text
 */
export function formatDuration(weeks: number): string {
  if (weeks < 4) {
    return `${weeks} ${weeks === 1 ? 'week' : 'weken'}`;
  }
  
  const months = Math.round(weeks / 4.33);
  const remainingWeeks = weeks - (months * 4.33);
  
  if (remainingWeeks < 1) {
    return `${months} ${months === 1 ? 'maand' : 'maanden'}`;
  }
  
  return `${months} ${months === 1 ? 'maand' : 'maanden'} + ${Math.round(remainingWeeks)} ${Math.round(remainingWeeks) === 1 ? 'week' : 'weken'}`;
}
