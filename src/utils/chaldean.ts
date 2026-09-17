/**
 * Chaldean Numerology Calculation Engine
 * 
 * Strict traditional Chaldean values:
 * 1: A, I, J, Q, Y
 * 2: B, K, R
 * 3: C, G, L, S
 * 4: D, M, T
 * 5: E, H, N, X
 * 6: U, V, W
 * 7: O, Z
 * 8: F, P
 * (9 has no standard letter equivalent; considered sacred)
 */

import { LetterCalculation, NumerologyBlueprint } from '../types';

export const CHALDEAN_MAP: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  F: 8, P: 8,
  O: 7, Z: 7,
  U: 6, V: 6, W: 6,
};

export const PLANETARY_RULERS: Record<number, { name: string; sanskrit: string; element: string; traits: string }> = {
  1: { name: 'Sun', sanskrit: 'Surya', element: 'Fire', traits: 'Leadership, Vitality, Radiance & Noble Ambition' },
  2: { name: 'Moon', sanskrit: 'Chandra', element: 'Water', traits: 'Intuition, Emotional Depth, Nurturing & Artistry' },
  3: { name: 'Jupiter', sanskrit: 'Guru / Brihaspati', element: 'Ether', traits: 'Wisdom, Expansion, Ethics & High Intellect' },
  4: { name: 'Rahu / Uranus', sanskrit: 'Rahu', element: 'Earth/Air', traits: 'Innovation, Originality, Analytical Mind & Distinct Identity' },
  5: { name: 'Mercury', sanskrit: 'Budha', element: 'Air', traits: 'Communication, Quick Intellect, Adaptability & Diplomacy' },
  6: { name: 'Venus', sanskrit: 'Shukra', element: 'Water', traits: 'Beauty, Harmony, Grace, Magnetism & Creative Excellence' },
  7: { name: 'Ketu / Neptune', sanskrit: 'Ketu', element: 'Ether', traits: 'Spiritual Insight, Research, Introspection & Mystical Depth' },
  8: { name: 'Saturn', sanskrit: 'Shani', element: 'Earth', traits: 'Patience, Discipline, Tenacity, Duty & Material Mastery' },
  9: { name: 'Mars', sanskrit: 'Mangala', element: 'Fire', traits: 'Courage, Fearlessness, Dynamic Action & Compassionate Strength' }
};

// Traditional Chaldean Compound Number Interpretations
export const COMPOUND_INTERPRETATIONS: Record<number, { title: string; category: 'Exalted' | 'Fortunate' | 'Dual/Testing' | 'Caution'; description: string }> = {
  10: {
    title: 'The Wheel of Fortune',
    category: 'Exalted',
    description: 'A symbol of honor, self-confidence, and rising fortune. It is considered a harbinger of victory where thoughts and plans crystallize into reality.'
  },
  11: {
    title: 'Clairvoyance & High Intuition',
    category: 'Dual/Testing',
    description: 'A master vibration carrying great psychic sensitivity, ideals, and vision. It encourages quiet inner strength to navigate complex emotional landscapes.'
  },
  12: {
    title: 'The Devoted Mind',
    category: 'Dual/Testing',
    description: 'Denotes intellect and deep focus, but carries a cautionary note against over-sacrificing self-interest for others. Needs grounded assertiveness.'
  },
  13: {
    title: 'Renewal & Transformation',
    category: 'Dual/Testing',
    description: 'A powerful vibration of metamorphosis, breaking past barriers and reinventing destiny. Demands wisdom and self-control to harness properly.'
  },
  14: {
    title: 'Magnetic Adaptation & Commerce',
    category: 'Fortunate',
    description: 'Vibration of swift mental agility, versatile communication, and trade. Imparts extraordinary diplomacy, resilience, and popularity.'
  },
  15: {
    title: 'The Magician & Eloquence',
    category: 'Fortunate',
    description: 'Endowed with personal magnetism, dramatic eloquence, artistic charm, and the power to draw goodwill and patronage from high places.'
  },
  16: {
    title: 'The Shattered Citadel',
    category: 'Caution',
    description: 'A cautionary number warning against arrogance and sudden unexpected events. Traditional Chaldean practitioners generally advise modifying names with this compound.'
  },
  17: {
    title: 'The Star of the Magi',
    category: 'Exalted',
    description: 'A celestial number representing peace, immortality, spiritual illumination, and rising above trials. Highly auspicious for public renown.'
  },
  18: {
    title: 'Internal Conflict',
    category: 'Caution',
    description: 'Carries conflict between spiritual and material realms, warning against false friendships or deceit. Traditional advice is to avoid for primary baby names.'
  },
  19: {
    title: 'The Prince of Heaven',
    category: 'Exalted',
    description: 'Among the most fortunate numbers in Chaldean numerology. Represents the Sun at its zenith, promising honor, joy, success, and high social esteem.'
  },
  20: {
    title: 'The Awakening',
    category: 'Dual/Testing',
    description: 'Symbolizes a spiritual call to higher purpose. Demands clear worldly grounding to translate lofty ideals into practical success.'
  },
  21: {
    title: 'The Crown of the Magi',
    category: 'Exalted',
    description: 'Promises advancement, high honors, global achievement, and ultimate triumph after patient effort. Highly supportive for modern careers.'
  },
  22: {
    title: 'The Master Builder',
    category: 'Dual/Testing',
    description: 'Possesses magnificent architectural vision and high ideals. Can achieve world-class projects if emotional balance is consciously maintained.'
  },
  23: {
    title: 'The Royal Star of the Lion',
    category: 'Exalted',
    description: 'The supreme royal number of ancient Chaldea. Bestows commanding presence, protection, favor from persons in power, and smooth worldly success.'
  },
  24: {
    title: 'Love & Fortunate Association',
    category: 'Fortunate',
    description: 'Brings harmonious partnerships, affectionate domestic bliss, artistic patronage, and steady financial stability through cooperation.'
  },
  25: {
    title: 'Wisdom Through Observation',
    category: 'Fortunate',
    description: 'A deeply analytical, contemplative vibration that garners mastery through quiet research, spiritual study, and patient maturity.'
  },
  26: {
    title: 'Caution in Speculation',
    category: 'Caution',
    description: 'A number of immense earthly responsibility that warns against reckless financial speculation or burdensome entanglements.'
  },
  27: {
    title: 'The Sceptre',
    category: 'Exalted',
    description: 'Signifies executive authority, supreme intellect, philosophical command, and deep humanitarian influence. Highly prized for boys and girls alike.'
  },
  28: {
    title: 'Promise with Caveat',
    category: 'Caution',
    description: 'Possesses great promise, yet warns of legal disputes or trust misplaced in unreliable associates. Traditionalists advise balancing this vibration.'
  },
  29: {
    title: 'The Contemplative Cross',
    category: 'Caution',
    description: 'Carries intense emotional sensitivity and sudden unexpected challenges from competitors. Cautioned against in primary baby name selection.'
  },
  30: {
    title: 'The Intellectual Solitary',
    category: 'Fortunate',
    description: 'Represents mental superiority, philosophical literature, artistic gifts, and independent thought free from conventional dogma.'
  },
  31: {
    title: 'The Reflective Thinker',
    category: 'Fortunate',
    description: 'Intellectual and proud, often focused on self-cultivation. Tends toward thoughtful seclusion unless energized by active social circles.'
  },
  32: {
    title: 'Magnetic Alliances & Public Voice',
    category: 'Fortunate',
    description: 'A magical communication vibration where alliances, media, public speaking, and community networking flourish effortlessly.'
  },
  33: {
    title: 'The Sacred Double Venus',
    category: 'Exalted',
    description: 'Deeply fortunate for artistic creation, humanitarian leadership, universal love, healing, and universal goodwill.'
  },
  34: {
    title: 'Practical Diligence',
    category: 'Fortunate',
    description: 'Denotes methodical progress, scientific thoroughness, dependable character, and enduring generational wealth through patient labor.'
  },
  35: {
    title: 'Versatile Enterprise',
    category: 'Fortunate',
    description: 'Dynamic commercial acumen, multifaceted talents, traveling spirit, and ease in turning ideas into profitable social ventures.'
  },
  36: {
    title: 'Creative Authority & Mastery',
    category: 'Exalted',
    description: 'Combines the wisdom of Jupiter (3) with the artistic harmony of Venus (6) to produce Mars (9) mastery, authority, and creative prestige.'
  },
  37: {
    title: 'Good Fortune in Love & Friendship',
    category: 'Exalted',
    description: 'Exceptional auspiciousness in romance, creative partnerships, international goodwill, and joyous communal appreciation.'
  },
  38: {
    title: 'The Peacemaker',
    category: 'Fortunate',
    description: 'Cultured, gentle, and artistically gifted. Excels in diplomacy, dispute resolution, counseling, and high aesthetics.'
  },
  39: {
    title: 'Literary & Public Magnetism',
    category: 'Fortunate',
    description: 'Gift of the written and spoken word. Attracts wide public followings, inspiring enthusiasm and humanitarian empathy.'
  },
  40: {
    title: 'Enduring Architecture',
    category: 'Fortunate',
    description: 'Steadfast integrity, structural organization, executive administration, and generational legacy-building.'
  },
  41: {
    title: 'Dynamic Enterprise & Quick Ascent',
    category: 'Exalted',
    description: 'Swift enterprise, sharp intellect, and fearless execution. Blessed with good fortune in competitive or innovative environments.'
  },
  42: {
    title: 'Harmonious Service & Domestic Grace',
    category: 'Fortunate',
    description: 'Devoted service to family, medicine, education, or community welfare. Highly protective and cherished by colleagues.'
  },
  43: {
    title: 'The Testing Mountain',
    category: 'Caution',
    description: 'A vibration that experiences delays or stubborn obstacles if undertakings are rushed. Requires steadfast patience and spiritual calm.'
  },
  44: {
    title: 'Master Concentration & Precision',
    category: 'Fortunate',
    description: 'Tremendous mental concentration, methodical execution, engineering brilliance, and unwavering ethical discipline.'
  },
  45: {
    title: 'Leader of Men & Humanitarian Vision',
    category: 'Exalted',
    description: 'Combines the stability of 4 with the quickness of 5 to create 9 humanitarian authority. Inspires large movements and broad social good.'
  },
  46: {
    title: 'Popular Esteem & Grace',
    category: 'Fortunate',
    description: 'Generates affectionate admiration in society, artistic excellence, social ease, and generous patronage.'
  },
  47: {
    title: 'Philosophical Mastery',
    category: 'Fortunate',
    description: 'Rigorous scientific inquiry, spiritual scholarship, academic distinction, and reflective depth.'
  },
  48: {
    title: 'Methodical Prosperity',
    category: 'Fortunate',
    description: 'Gradual, steady, and unshakeable accumulation of respect, material wealth, and institutional trust.'
  },
  49: {
    title: 'The Searching Soul',
    category: 'Dual/Testing',
    description: 'A restlessness for deeper spiritual truth. Excels when channels for creative or philosophical expression are opened early.'
  },
  50: {
    title: 'Clear Intellect & Eloquent Versatility',
    category: 'Fortunate',
    description: 'Brilliant communication, multilingual versatility, media aptitude, and quick problem-solving abilities.'
  },
  51: {
    title: 'The Royal Warrior',
    category: 'Exalted',
    description: 'Immense courage, pioneering determination, leadership in crisis, and victorious protection of others.'
  }
};

/**
 * Reduce any positive number to its single digit root (1-9)
 */
export function reduceToRoot(num: number): number {
  if (num <= 0) return 0;
  let current = num;
  while (current > 9) {
    let sum = 0;
    const str = current.toString();
    for (let i = 0; i < str.length; i++) {
      sum += parseInt(str[i], 10);
    }
    current = sum;
  }
  return current;
}

/**
 * Calculate Chaldean name value, preserving letter-by-letter calculation
 */
export function calculateChaldeanName(name: string): {
  letter_calculation: LetterCalculation[];
  compound_number: number;
  root_number: number;
} {
  const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
  const letter_calculation: LetterCalculation[] = [];
  let compound_number = 0;

  for (let i = 0; i < cleanName.length; i++) {
    const char = cleanName[i];
    const val = CHALDEAN_MAP[char] || 0;
    letter_calculation.push({ letter: char, value: val });
    compound_number += val;
  }

  const root_number = reduceToRoot(compound_number);

  return {
    letter_calculation,
    compound_number,
    root_number
  };
}

/**
 * Calculate Birth Number (Day of Birth)
 * e.g., 15th -> 1+5 = 6 (Compound 15)
 */
export function calculateBirthNumber(dobString: string): {
  birth_number: number;
  birth_compound: number;
} {
  // dobString expected format: YYYY-MM-DD
  const parts = dobString.split('-');
  const day = parseInt(parts[2] || '1', 10);
  const root = reduceToRoot(day);
  return {
    birth_number: root,
    birth_compound: day
  };
}

/**
 * Calculate Destiny Number (Full date of birth sum)
 * e.g., 15-08-2026 -> 1+5+0+8+2+0+2+6 = 24 -> 24/6
 */
export function calculateDestinyNumber(dobString: string): {
  destiny_number: number;
  destiny_compound: number;
} {
  const digits = dobString.replace(/[^0-9]/g, '');
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    sum += parseInt(digits[i], 10);
  }
  const root = reduceToRoot(sum);
  return {
    destiny_number: root,
    destiny_compound: sum
  };
}

/**
 * Generate full Numerology Blueprint for a birth date
 */
export function generateNumerologyBlueprint(dobString: string): NumerologyBlueprint {
  const { birth_number, birth_compound } = calculateBirthNumber(dobString);
  const { destiny_number, destiny_compound } = calculateDestinyNumber(dobString);

  const parts = dobString.split('-');
  const dayVal = parseInt(parts[2] || '1', 10);
  const monthVal = parseInt(parts[1] || '1', 10);
  const yearVal = parseInt(parts[0] || '2026', 10);

  const day_vibration = reduceToRoot(dayVal);
  const month_vibration = reduceToRoot(monthVal);
  const year_vibration = reduceToRoot(yearVal);

  const birth_planet = PLANETARY_RULERS[birth_number]?.name || 'Sun';
  const destiny_planet = PLANETARY_RULERS[destiny_number]?.name || 'Sun';

  // Determine preferred name roots based on traditional Chaldean & Vedic planetary friendships
  const preferred_name_numbers: number[] = [];
  const supportive_numbers: number[] = [];
  const neutral_numbers: number[] = [];
  const caution_numbers: number[] = [];

  // Compatibility matrix based on classical planetary affinities
  // Key: [Birth / Destiny roots]
  for (let r = 1; r <= 9; r++) {
    const isPreferred = isIdealRootFor(r, birth_number, destiny_number);
    const isSupportive = isSupportiveRootFor(r, birth_number, destiny_number);
    const isCaution = isCautionRootFor(r, birth_number, destiny_number);

    if (isPreferred) {
      preferred_name_numbers.push(r);
    } else if (isSupportive) {
      supportive_numbers.push(r);
    } else if (isCaution) {
      caution_numbers.push(r);
    } else {
      neutral_numbers.push(r);
    }
  }

  // Favorable traditional Chaldean compound numbers (auspicious master totals)
  const favorable_compounds = [10, 14, 15, 17, 19, 21, 23, 24, 27, 32, 33, 37, 41, 42, 45, 51];

  let relationship_summary = '';
  if (birth_number === destiny_number) {
    relationship_summary = `Harmonious Unified Vibration (${birth_number} & ${destiny_number}). The child's natural instincts and worldly destiny resonate in the same ray of ${birth_planet}. A single focused name vibration creates extraordinary alignment.`;
  } else if (areFriendlyPlanets(birth_number, destiny_number)) {
    relationship_summary = `Harmonious Sympathetic Resonance between Birth Number ${birth_number} (${birth_planet}) and Destiny Number ${destiny_number} (${destiny_planet}). Natural talents easily flow toward life goals.`;
  } else {
    relationship_summary = `Dynamic Complementary Axis between Birth Number ${birth_number} (${birth_planet}) and Destiny Number ${destiny_number} (${destiny_planet}). An expertly balanced name number acts as an energetic bridge, synthesizing inner temperament with outer destiny.`;
  }

  return {
    birth_number,
    birth_compound,
    birth_planet,
    destiny_number,
    destiny_compound,
    destiny_planet,
    day_vibration,
    month_vibration,
    year_vibration,
    relationship_summary,
    preferred_name_numbers,
    supportive_numbers,
    neutral_numbers,
    caution_numbers,
    favorable_compounds
  };
}

/**
 * Planetary friendship evaluator
 */
export function areFriendlyPlanets(p1: number, p2: number): boolean {
  if (p1 === p2) return true;
  // Group 1 (Sun, Moon, Mars, Jupiter): 1, 2, 3, 9
  // Group 2 (Mercury, Venus, Saturn, Rahu): 5, 6, 8, 4
  // 7 (Ketu) is friendly with 1, 2, 7
  // 5 (Mercury) is friendly with almost all, especially 1, 5, 6
  const g1 = [1, 2, 3, 9];
  const g2 = [5, 6, 8];
  if (g1.includes(p1) && g1.includes(p2)) return true;
  if (g2.includes(p1) && g2.includes(p2)) return true;
  if (p1 === 5 || p2 === 5) return true; // Mercury friendly
  if ((p1 === 1 && p2 === 5) || (p1 === 5 && p2 === 1)) return true;
  if ((p1 === 6 && p2 === 1) || (p1 === 1 && p2 === 6)) return true;
  return false;
}

function isIdealRootFor(root: number, birth: number, destiny: number): boolean {
  // Auspicious harmonious roots: 1, 3, 5, 6 are universally praised in Chaldean
  // plus direct match with birth or destiny if not 4 or 8
  if ([1, 3, 5, 6].includes(root) && (root === birth || root === destiny || areFriendlyPlanets(root, birth) && areFriendlyPlanets(root, destiny))) {
    return true;
  }
  // 5 and 6 are universally auspicious harmonizers
  if (root === 5 || root === 6) return true;
  if (root === 1 && (birth !== 8 && destiny !== 8)) return true;
  return false;
}

function isSupportiveRootFor(root: number, birth: number, destiny: number): boolean {
  if (root === 2 || root === 7 || root === 3 || root === 9) {
    if (areFriendlyPlanets(root, birth) || areFriendlyPlanets(root, destiny)) {
      return true;
    }
  }
  return false;
}

function isCautionRootFor(root: number, birth: number, destiny: number): boolean {
  // In traditional Chaldean naming, 4 and 8 are recommended with great caution for baby name totals,
  // especially if birth or destiny is 4 or 8, to prevent heavy karmic burdens.
  if (root === 4 || root === 8) {
    return true;
  }
  // If root clashes directly with both
  if (!areFriendlyPlanets(root, birth) && !areFriendlyPlanets(root, destiny) && root !== birth && root !== destiny) {
    return true;
  }
  return false;
}

/**
 * Evaluate name compatibility level and descriptive explanation
 */
export function evaluateNameCompatibility(
  nameRoot: number,
  compoundNum: number,
  birthNum: number,
  destinyNum: number
): {
  compatibility: 'Highly Compatible' | 'Supportive' | 'Neutral' | 'Caution';
  reason: string;
} {
  const compoundData = COMPOUND_INTERPRETATIONS[compoundNum];
  const isCompoundExalted = compoundData?.category === 'Exalted';
  const isCompoundFortunate = compoundData?.category === 'Fortunate';
  const isCompoundCaution = compoundData?.category === 'Caution';

  if (isCompoundCaution || nameRoot === 4 || nameRoot === 8) {
    return {
      compatibility: 'Caution',
      reason: `Compound ${compoundNum}/${nameRoot} contains testing karmic vibrations. Traditional Chaldean practitioners advise selecting a more uplifting, light-bearing compound number for a newborn.`
    };
  }

  const birthMatch = areFriendlyPlanets(nameRoot, birthNum) || nameRoot === birthNum;
  const destinyMatch = areFriendlyPlanets(nameRoot, destinyNum) || nameRoot === destinyNum;

  if (birthMatch && destinyMatch && (isCompoundExalted || isCompoundFortunate)) {
    return {
      compatibility: 'Highly Compatible',
      reason: `Superior harmony: Root ${nameRoot} (${PLANETARY_RULERS[nameRoot]?.name}) resonates with both Birth Number ${birthNum} and Destiny Number ${destinyNum}, reinforced by the ${compoundData?.title || 'fortunate compound vibration'}.`
    };
  }

  if (birthMatch || destinyMatch || isCompoundExalted || isCompoundFortunate) {
    return {
      compatibility: 'Supportive',
      reason: `Harmonious support: Provides uplifting energy aligning well with the ${birthMatch ? 'Birth Number' : 'Destiny Number'}, carrying positive social and intellectual momentum.`
    };
  }

  return {
    compatibility: 'Neutral',
    reason: `Balanced equilibrium: While free of negative traits, it maintains a tranquil rather than active resonant drive with the natal blueprint.`
  };
}
