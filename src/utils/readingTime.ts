import { SampleDossier } from '../data/sampleDossierData';

export interface PanelReadingStats {
  panelId: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  words: number;
  readingTimeMinutes: number;
  formattedTime: string;
}

export interface DossierReadingTimeSummary {
  totalWords: number;
  totalReadingTimeMinutes: number;
  formattedTotalTime: string;
  wordsPerMinute: number;
  panels: PanelReadingStats[];
  depthMetrics: {
    totalScoredNames: number;
    matrixValuesMapped: number;
    astrologicalAlignments: number;
    guidanceCheckpoints: number;
  };
}

/**
 * Counts words in a raw string, ignoring excessive punctuation and whitespace.
 */
function countWordsInString(text?: string | null): number {
  if (!text) return 0;
  const cleaned = text.replace(/[^\w\s]/g, ' ').trim();
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).filter(Boolean).length;
}

/**
 * Extracts and calculates comprehensive reading time statistics for a dossier.
 * Standard analytical reading speed is calibrated to 200 words per minute, 
 * with a modest adjustment for analytical tables and equations.
 */
export function calculateDossierReadingTime(dossier: SampleDossier): DossierReadingTimeSummary {
  const WORDS_PER_MINUTE = 200;

  // Panel 1: Profile & Core Vibrations
  let p1Words = 0;
  p1Words += countWordsInString(dossier.profile.name);
  p1Words += countWordsInString(dossier.profile.fullName);
  p1Words += countWordsInString(dossier.profile.tagline);
  p1Words += countWordsInString(dossier.profile.placeOfBirth);
  p1Words += countWordsInString(dossier.vibrations.birthDetails);
  p1Words += countWordsInString(dossier.vibrations.birthFormula);
  p1Words += countWordsInString(dossier.vibrations.destinyDetails);
  p1Words += countWordsInString(dossier.vibrations.destinyFormula);
  p1Words += countWordsInString(dossier.vibrations.yearDetails);
  p1Words += countWordsInString(dossier.vibrations.rulingPlanet);
  dossier.pillars.forEach((p) => {
    p1Words += countWordsInString(p.title) + countWordsInString(p.subtitle);
  });
  dossier.constitutionalStrengths.forEach((s) => {
    p1Words += countWordsInString(s);
  });
  p1Words += countWordsInString(dossier.bottomQuote);
  // Add weight for mathematical chart visual inspection (~60 words equivalent)
  p1Words += 60;

  // Panel 2: Chaldean Letter Matrix & Compatibility
  let p2Words = 0;
  dossier.letterMatrix.forEach((m) => {
    p2Words += countWordsInString(m.letters);
  });
  p2Words += countWordsInString(dossier.vedic.rashi);
  p2Words += countWordsInString(dossier.vedic.nakshatra);
  p2Words += countWordsInString(dossier.vedic.pada);
  p2Words += countWordsInString(dossier.vedic.startingSounds);
  // Explanatory annotations and matrix comprehension (~120 words equivalent)
  p2Words += 140;

  // Panel 3: Top 10 Scored Names & Formulas
  let p3Words = 0;
  dossier.top10Names.forEach((item) => {
    p3Words += countWordsInString(item.name);
    p3Words += countWordsInString(item.meaning);
    p3Words += countWordsInString(item.calculation);
    p3Words += countWordsInString(item.badge);
    p3Words += countWordsInString(item.whyStandsOut);
  });
  // Formulas and comparative analysis table weight (~80 words equivalent)
  p3Words += 80;

  // Panel 4: Final Section (Top 3 & Laureate Recommendation)
  let p4Words = 0;
  p4Words += countWordsInString(dossier.topRecommendation.fullName);
  p4Words += countWordsInString(dossier.topRecommendation.description);
  p4Words += countWordsInString(dossier.top3.bestOverall.meaning);
  p4Words += countWordsInString(dossier.top3.bestOverall.whyStandsOut);
  p4Words += countWordsInString(dossier.top3.strongAlternative.meaning);
  p4Words += countWordsInString(dossier.top3.strongAlternative.whyStandsOut);
  p4Words += countWordsInString(dossier.top3.uniqueAlternative.meaning);
  p4Words += countWordsInString(dossier.top3.uniqueAlternative.whyStandsOut);
  dossier.specialCategories.forEach((sc) => {
    p4Words += countWordsInString(sc.category) + countWordsInString(sc.name);
  });
  dossier.parentGuidance.forEach((g) => {
    p4Words += countWordsInString(g);
  });
  p4Words += countWordsInString(dossier.disclaimer);

  const calculateMinutes = (words: number) => {
    return Math.max(1, Math.round((words / WORDS_PER_MINUTE) * 10) / 10);
  };

  const formatTime = (minutes: number) => {
    if (minutes < 1.5) return '~1 min read';
    const rounded = Math.round(minutes);
    return `~${rounded} min read`;
  };

  const p1Minutes = calculateMinutes(p1Words);
  const p2Minutes = calculateMinutes(p2Words);
  const p3Minutes = calculateMinutes(p3Words);
  const p4Minutes = calculateMinutes(p4Words);

  const totalWords = p1Words + p2Words + p3Words + p4Words;
  const totalMinutes = Math.round((totalWords / WORDS_PER_MINUTE) * 10) / 10;
  const roundedTotal = Math.max(4, Math.round(totalMinutes));

  const panels: PanelReadingStats[] = [
    {
      panelId: 1,
      title: 'Panel I: Child Profile & Core Vibrations',
      subtitle: 'Birth & Destiny Blueprint',
      words: p1Words,
      readingTimeMinutes: p1Minutes,
      formattedTime: formatTime(p1Minutes)
    },
    {
      panelId: 2,
      title: 'Panel II: Chaldean Letter Grid & Vedic Matrix',
      subtitle: '1–8 Vibrational Frequencies',
      words: p2Words,
      readingTimeMinutes: p2Minutes,
      formattedTime: formatTime(p2Minutes)
    },
    {
      panelId: 3,
      title: 'Panel III: Top 10 Scored Names & Formulas',
      subtitle: 'Complete Letter-by-Letter Sums',
      words: p3Words,
      readingTimeMinutes: p3Minutes,
      formattedTime: formatTime(p3Minutes)
    },
    {
      panelId: 4,
      title: 'Panel IV: Report Final Section',
      subtitle: 'Top 3 & Laureate Verdict',
      words: p4Words,
      readingTimeMinutes: p4Minutes,
      formattedTime: formatTime(p4Minutes)
    }
  ];

  return {
    totalWords,
    totalReadingTimeMinutes: roundedTotal,
    formattedTotalTime: `~${roundedTotal} min read`,
    wordsPerMinute: WORDS_PER_MINUTE,
    panels,
    depthMetrics: {
      totalScoredNames: dossier.top10Names.length,
      matrixValuesMapped: 8,
      astrologicalAlignments: 4,
      guidanceCheckpoints: dossier.parentGuidance.length
    }
  };
}
