export interface SampleBabyProfile {
  name: string;
  fullName: string;
  gender: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  surname: string;
  tagline: string;
}

export interface SampleCoreVibrations {
  birthNumber: number;
  birthFormula: string;
  birthDetails: string;
  destinyNumber: string;
  destinyCompound: number;
  destinyRoot: number;
  destinyFormula: string;
  destinyDetails: string;
  rulingPlanet: string;
  idealVibrations: number[];
  yearVibration: number;
  yearFormula: string;
  yearDetails: string;
}

export interface SampleNameRecommendation {
  rank: number;
  name: string;
  meaning: string;
  calculation: string;
  compound: number;
  root: number;
  score: number;
  badge?: string;
  categoryTag?: string;
  whyStandsOut?: string;
}

export interface SampleDossier {
  profile: SampleBabyProfile;
  vibrations: SampleCoreVibrations;
  pillars: Array<{ title: string; subtitle: string }>;
  bottomQuote: string;
  letterMatrix: Array<{ number: number; letters: string }>;
  compatibility: {
    highlyCompatible: number[];
    supportive: number[];
    neutral: number[];
    caution: number[];
  };
  vedic: {
    rashi: string;
    nakshatra: string;
    pada: string;
    startingSounds: string;
  };
  constitutionalStrengths: string[];
  top10Names: SampleNameRecommendation[];
  top3: {
    bestOverall: SampleNameRecommendation;
    strongAlternative: SampleNameRecommendation;
    uniqueAlternative: SampleNameRecommendation;
  };
  specialCategories: Array<{ category: string; name: string; score: number }>;
  parentGuidance: string[];
  topRecommendation: {
    fullName: string;
    description: string;
  };
  disclaimer: string;
}

export const SAMPLE_DOSSIER_DATA: SampleDossier = {
  profile: {
    name: 'Aarav',
    fullName: 'AARAV GUPTA',
    gender: 'Boy',
    dateOfBirth: 'March 18, 2026',
    timeOfBirth: '06:42',
    placeOfBirth: 'Bengaluru, Karnataka, India',
    surname: 'Gupta',
    tagline: 'Beautiful, Meaningful, Numerologically Aligned.'
  },
  vibrations: {
    birthNumber: 9,
    birthFormula: '18 → 1 + 8 = 9',
    birthDetails: 'Ruled by Mars. Leadership, vitality & inner strength.',
    destinyNumber: '22 / 4',
    destinyCompound: 22,
    destinyRoot: 4,
    destinyFormula: '2 + 0 + 2 + 6 + 0 + 3 + 1 + 8 = 22 → 4',
    destinyDetails: 'Governs life path, vocational resonance & destiny milestones.',
    rulingPlanet: 'Mars',
    idealVibrations: [5],
    yearVibration: 1,
    yearFormula: '2026: 2 + 0 + 2 + 6 = 10 → 1',
    yearDetails: 'Universal cycle of fresh beginnings & noble vitality.'
  },
  pillars: [
    { title: 'POSITIVE VIBRATION', subtitle: 'Harmonious Chaldean resonance' },
    { title: 'STRONG VALUES', subtitle: 'Noble character & wisdom' },
    { title: 'HAPPINESS & HEALTH', subtitle: 'Cosmic protection & peace' },
    { title: 'MEANINGFUL LEGACY', subtitle: 'A timeless family gift' }
  ],
  bottomQuote: 'A name is one of the first gifts a parent gives a child.',
  letterMatrix: [
    { number: 1, letters: 'A I J Q Y' },
    { number: 2, letters: 'B K R' },
    { number: 3, letters: 'C G L S' },
    { number: 4, letters: 'D M T' },
    { number: 5, letters: 'E H N X' },
    { number: 6, letters: 'U V W' },
    { number: 7, letters: 'O Z' },
    { number: 8, letters: 'F P' }
  ],
  compatibility: {
    highlyCompatible: [5],
    supportive: [1, 2, 3, 6, 7, 9],
    neutral: [4, 8],
    caution: [4, 8]
  },
  vedic: {
    rashi: 'Kumbha / Meena',
    nakshatra: 'Purva Bhadrapada',
    pada: 'Pada 3',
    startingSounds: 'Se, So, Da, Di'
  },
  constitutionalStrengths: [
    'High natural conviction: courage and indomitable acumen',
    'Warm charisma, creative magnetism & harmonious speech',
    'Resilience under pressure: strong protective family bonds'
  ],
  top10Names: [
    {
      rank: 1,
      name: 'DHRUV',
      meaning: 'The steadfast pole star; unshakeable, eternal, resolute',
      calculation: '4+5+2+6+6 = 23',
      compound: 23,
      root: 5,
      score: 100,
      badge: 'BEST OVERALL',
      whyStandsOut: 'Celestial symbolism of unwavering force, high ethics, and constancy amid change.'
    },
    {
      rank: 2,
      name: 'DAKSH',
      meaning: 'Capable, skilled; dexterous, brilliant; an epithet of creative potency',
      calculation: '4+1+2+5+3 = 15',
      compound: 15,
      root: 6,
      score: 94,
      badge: 'STRONG ALTERNATIVE',
      whyStandsOut: 'Punchy single syllable strength that conveys razor sharp capability and executive leadership.'
    },
    {
      rank: 3,
      name: 'PRANAV',
      meaning: 'The primordial cosmic sound Om; source of universal creation',
      calculation: '8+2+1+5+1+6 = 23',
      compound: 23,
      root: 5,
      score: 94,
      badge: 'AUSPICIOUS VEDIC'
    },
    {
      rank: 4,
      name: 'TEJAS',
      meaning: 'Radiant energy, sharp intellect, spiritual splendor and vitality',
      calculation: '4+5+1+1+3 = 14',
      compound: 14,
      root: 5,
      score: 93
    },
    {
      rank: 5,
      name: 'AGASTYA',
      meaning: 'Sacred Sanskrit verse, hymn of praise, harmonious melody',
      calculation: '1+3+1+3+4+1+1 = 14',
      compound: 14,
      root: 5,
      score: 92
    },
    {
      rank: 6,
      name: 'OMAR',
      meaning: 'Long-lived, eloquent speaker, flourishing life',
      calculation: '7+4+1+2 = 14',
      compound: 14,
      root: 5,
      score: 92,
      badge: 'UNIQUE ALTERNATIVE',
      whyStandsOut: 'Universally recognized name conveying longevity, eloquence, and dignity.'
    },
    {
      rank: 7,
      name: 'SHLOK',
      meaning: 'One who humbles the unmovable mountains; revered Vedic Sage',
      calculation: '3+5+3+7+2 = 20',
      compound: 20,
      root: 2,
      score: 92
    },
    {
      rank: 8,
      name: 'DEV',
      meaning: 'Divine, shining celestial being; embodiment of virtue',
      calculation: '4+5+6 = 15',
      compound: 15,
      root: 6,
      score: 92
    },
    {
      rank: 9,
      name: 'ADVIK',
      meaning: 'Unique, peerless; one who has no equal',
      calculation: '1+4+6+1+2 = 14',
      compound: 14,
      root: 5,
      score: 91
    },
    {
      rank: 10,
      name: 'INAAN',
      meaning: 'God is gracious, radiant gift, royal ruler',
      calculation: '1+5+1+5+2 = 14',
      compound: 14,
      root: 5,
      score: 91
    }
  ],
  top3: {
    bestOverall: {
      rank: 1,
      name: 'DHRUV',
      meaning: 'The steadfast pole star; unshakeable, eternal, resolute',
      calculation: '4+5+2+6+6 = 23',
      compound: 23,
      root: 5,
      score: 100,
      badge: 'BEST OVERALL',
      whyStandsOut: 'Celestial symbolism of unwavering force, high ethics, and constancy amid change.'
    },
    strongAlternative: {
      rank: 2,
      name: 'DAKSH',
      meaning: 'Capable, skilled; dexterous, brilliant; an epithet of creative potency',
      calculation: '4+1+2+5+3 = 15',
      compound: 15,
      root: 6,
      score: 94,
      badge: 'STRONG ALTERNATIVE',
      whyStandsOut: 'Punchy single syllable strength that conveys razor sharp capability and executive leadership.'
    },
    uniqueAlternative: {
      rank: 3,
      name: 'OMAR',
      meaning: 'Long-lived, eloquent speaker, flourishing life',
      calculation: '7+4+1+2 = 14',
      compound: 14,
      root: 5,
      score: 92,
      badge: 'UNIQUE ALTERNATIVE',
      whyStandsOut: 'Universally recognized name conveying longevity, eloquence, and dignity.'
    }
  },
  specialCategories: [
    { category: 'BEST TRADITIONAL', name: 'DHRUV', score: 100 },
    { category: 'BEST MODERN', name: 'DAKSH', score: 94 },
    { category: 'BEST UNIQUE', name: 'ADVIK', score: 91 },
    { category: 'BEST INTERNATIONAL', name: 'OMAR', score: 92 },
    { category: 'BEST MEANING', name: 'DHRUV', score: 100 },
    { category: 'BEST NUMEROLOGY FIT', name: 'DHRUV', score: 100 }
  ],
  parentGuidance: [
    'Choose the name that feels intuitive, joyful and right to your family',
    'Consider both traditional heritage and effortless global pronunciation',
    'Check how the name flows naturally with your family surname',
    'Test how the name will age gracefully from childhood to adulthood'
  ],
  topRecommendation: {
    fullName: 'DHRUV GUPTA',
    description: 'Celestial symbolism of unwavering force, high ethics, and constancy amid change.'
  },
  disclaimer:
    "This report uses traditional Chaldean numerology and, where applicable, Vedic naming principles as a cultural and spiritual learning framework. Numerology and astrology are not scientifically proven methods for predicting a child's future, personality, health or success. The recommendations are intended to help parents explore names and should not replace personal, maternal or family judgment."
};
