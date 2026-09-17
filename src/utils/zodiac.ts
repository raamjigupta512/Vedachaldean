/**
 * Astrological Sun Sign & Zodiac Information Engine
 * Cross-references Tropical Zodiac Sun Signs with Vedic Rashi counterparts,
 * Ruling Planets, Classical Elements, and Astrological Acoustic Resonance.
 */

export interface ZodiacSignDetail {
  id: string;
  name: string;
  rashiSanskrit: string;
  rashiEnglish: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  elementSanskrit: string;
  rulingPlanet: string;
  planetaryLordSanskrit: string;
  dateRange: string;
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  traits: string[];
  auspiciousSounds: string;
  essence: string;
}

export const ZODIAC_SIGNS: ZodiacSignDetail[] = [
  {
    id: 'aries',
    name: 'Aries',
    rashiSanskrit: 'मेष',
    rashiEnglish: 'Mesha',
    symbol: '♈',
    element: 'Fire',
    elementSanskrit: 'Agni (अग्नि)',
    rulingPlanet: 'Mars',
    planetaryLordSanskrit: 'Mangala (मंगल)',
    dateRange: 'Mar 21 – Apr 19',
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
    traits: ['Courageous', 'Pioneering', 'Vitality', 'Leader'],
    auspiciousSounds: 'A, L, Ch, I',
    essence: 'The spark of new beginnings, boundless courage, and dynamic cosmic energy.',
  },
  {
    id: 'taurus',
    name: 'Taurus',
    rashiSanskrit: 'वृषभ',
    rashiEnglish: 'Vrishabha',
    symbol: '♉',
    element: 'Earth',
    elementSanskrit: 'Prithvi (पृथ्वी)',
    rulingPlanet: 'Venus',
    planetaryLordSanskrit: 'Shukra (शुक्र)',
    dateRange: 'Apr 20 – May 20',
    startMonth: 4,
    startDay: 20,
    endMonth: 5,
    endDay: 20,
    traits: ['Graceful', 'Steadfast', 'Loyal', 'Artistic'],
    auspiciousSounds: 'I, U, E, O, V',
    essence: 'Rooted beauty, enduring dedication, and sensual aesthetic harmony.',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    rashiSanskrit: 'मिथुन',
    rashiEnglish: 'Mithuna',
    symbol: '♊',
    element: 'Air',
    elementSanskrit: 'Vayu (वायु)',
    rulingPlanet: 'Mercury',
    planetaryLordSanskrit: 'Budha (बुध)',
    dateRange: 'May 21 – Jun 20',
    startMonth: 5,
    startDay: 21,
    endMonth: 6,
    endDay: 20,
    traits: ['Inquisitive', 'Eloquent', 'Adaptable', 'Vibrant'],
    auspiciousSounds: 'K, Chh, Gh, Ka',
    essence: 'Brilliant intellectual agility, communicative charm, and luminous curiosity.',
  },
  {
    id: 'cancer',
    name: 'Cancer',
    rashiSanskrit: 'कर्क',
    rashiEnglish: 'Karka',
    symbol: '♋',
    element: 'Water',
    elementSanskrit: 'Jala (जल)',
    rulingPlanet: 'Moon',
    planetaryLordSanskrit: 'Chandra (चन्द्र)',
    dateRange: 'Jun 21 – Jul 22',
    startMonth: 6,
    startDay: 21,
    endMonth: 7,
    endDay: 22,
    traits: ['Intuitive', 'Nurturing', 'Devoted', 'Protective'],
    auspiciousSounds: 'H, D, Da, Dee',
    essence: 'Deep emotional empathy, maternal grace, and sovereign domestic warmth.',
  },
  {
    id: 'leo',
    name: 'Leo',
    rashiSanskrit: 'सिंह',
    rashiEnglish: 'Simha',
    symbol: '♌',
    element: 'Fire',
    elementSanskrit: 'Agni (अग्नि)',
    rulingPlanet: 'Sun',
    planetaryLordSanskrit: 'Surya (सूर्य)',
    dateRange: 'Jul 23 – Aug 22',
    startMonth: 7,
    startDay: 23,
    endMonth: 8,
    endDay: 22,
    traits: ['Radiant', 'Regal', 'Generous', 'Magnanimous'],
    auspiciousSounds: 'M, T, Ta, Tee',
    essence: 'Solar majesty, natural magnetic nobility, and a deeply benevolent heart.',
  },
  {
    id: 'virgo',
    name: 'Virgo',
    rashiSanskrit: 'कन्या',
    rashiEnglish: 'Kanya',
    symbol: '♍',
    element: 'Earth',
    elementSanskrit: 'Prithvi (पृथ्वी)',
    rulingPlanet: 'Mercury',
    planetaryLordSanskrit: 'Budha (बुध)',
    dateRange: 'Aug 23 – Sep 22',
    startMonth: 8,
    startDay: 23,
    endMonth: 9,
    endDay: 22,
    traits: ['Discerning', 'Analytical', 'Pure', 'Healer'],
    auspiciousSounds: 'P, Th, N, Pa',
    essence: 'Impeccable clarity, devotion to perfection, and deep healing wisdom.',
  },
  {
    id: 'libra',
    name: 'Libra',
    rashiSanskrit: 'तुला',
    rashiEnglish: 'Tula',
    symbol: '♎',
    element: 'Air',
    elementSanskrit: 'Vayu (वायु)',
    rulingPlanet: 'Venus',
    planetaryLordSanskrit: 'Shukra (शुक्र)',
    dateRange: 'Sep 23 – Oct 22',
    startMonth: 9,
    startDay: 23,
    endMonth: 10,
    endDay: 22,
    traits: ['Harmonious', 'Diplomatic', 'Charming', 'Equitable'],
    auspiciousSounds: 'R, T, Ra, Re',
    essence: 'The poise of cosmic balance, exquisite taste, and poetic peacefulness.',
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    rashiSanskrit: 'वृश्चिक',
    rashiEnglish: 'Vrishchika',
    symbol: '♏',
    element: 'Water',
    elementSanskrit: 'Jala (जल)',
    rulingPlanet: 'Mars',
    planetaryLordSanskrit: 'Mangala / Ketu (मंगल/केतु)',
    dateRange: 'Oct 23 – Nov 21',
    startMonth: 10,
    startDay: 23,
    endMonth: 11,
    endDay: 21,
    traits: ['Profound', 'Resilient', 'Magnetic', 'Transformative'],
    auspiciousSounds: 'N, Y, Na, Noo',
    essence: 'Unfathomable psychic depth, fearless resilience, and transformative power.',
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    rashiSanskrit: 'धनु',
    rashiEnglish: 'Dhanu',
    symbol: '♐',
    element: 'Fire',
    elementSanskrit: 'Agni (अग्नि)',
    rulingPlanet: 'Jupiter',
    planetaryLordSanskrit: 'Brihaspati / Guru (गुरु)',
    dateRange: 'Nov 22 – Dec 21',
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
    traits: ['Visionary', 'Philosophical', 'Benevolent', 'Expansive'],
    auspiciousSounds: 'Bh, F, Dh, Bha',
    essence: 'The archer of truth, boundless spiritual optimism, and enlightened guidance.',
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    rashiSanskrit: 'मकर',
    rashiEnglish: 'Makara',
    symbol: '♑',
    element: 'Earth',
    elementSanskrit: 'Prithvi (पृथ्वी)',
    rulingPlanet: 'Saturn',
    planetaryLordSanskrit: 'Shani (शनि)',
    dateRange: 'Dec 22 – Jan 19',
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
    traits: ['Disciplined', 'Enduring', 'Archival', 'Patient'],
    auspiciousSounds: 'Kh, J, Kha, Jee',
    essence: 'Mastery of time and legacy, monumental patience, and noble integrity.',
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    rashiSanskrit: 'कुम्भ',
    rashiEnglish: 'Kumbha',
    symbol: '♒',
    element: 'Air',
    elementSanskrit: 'Vayu (वायु)',
    rulingPlanet: 'Saturn',
    planetaryLordSanskrit: 'Shani (शनि)',
    dateRange: 'Jan 20 – Feb 18',
    startMonth: 1,
    startDay: 20,
    endMonth: 2,
    endDay: 18,
    traits: ['Original', 'Humanitarian', 'Progressive', 'Insightful'],
    auspiciousSounds: 'G, S, Sh, Goo',
    essence: 'The cosmic water bearer, universal brotherhood, and future-forward genius.',
  },
  {
    id: 'pisces',
    name: 'Pisces',
    rashiSanskrit: 'मीन',
    rashiEnglish: 'Meena',
    symbol: '♓',
    element: 'Water',
    elementSanskrit: 'Jala (जल)',
    rulingPlanet: 'Jupiter',
    planetaryLordSanskrit: 'Brihaspati / Guru (गुरु)',
    dateRange: 'Feb 19 – Mar 20',
    startMonth: 2,
    startDay: 19,
    endMonth: 3,
    endDay: 20,
    traits: ['Compassionate', 'Mystic', 'Imaginative', 'Serene'],
    auspiciousSounds: 'D, Ch, Z, Th, Dee',
    essence: 'Boundless cosmic compassion, oceanic reverie, and spiritual transcendence.',
  },
];

/**
 * Accurately finds the Astrological Sun Sign from a YYYY-MM-DD string
 */
export function getZodiacSignFromDob(dobString: string): ZodiacSignDetail | null {
  if (!dobString || typeof dobString !== 'string') return null;

  const parts = dobString.split('-');
  if (parts.length !== 3) return null;

  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  // Find sign based on month and day
  for (const sign of ZODIAC_SIGNS) {
    if (sign.id === 'capricorn') {
      // Crosses year boundary: Dec 22 - Jan 19
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        return sign;
      }
    } else {
      if (
        (month === sign.startMonth && day >= sign.startDay) ||
        (month === sign.endMonth && day <= sign.endDay)
      ) {
        return sign;
      }
    }
  }

  return null;
}
