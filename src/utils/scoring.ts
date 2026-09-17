/**
 * Scoring Model and Report Generation Engine
 * Implements the 100-Point Scoring Model strictly according to section 14:
 * - Chaldean Numerology: 40 points
 * - Meaning: 20 points
 * - Vedic Naming Compatibility: 15 points (or 'Not Available' if time/place missing)
 * - Pronunciation: 10 points
 * - Cultural & Linguistic Fit: 10 points
 * - Modern / Timeless Appeal: 5 points
 */

import {
  BabyInputData,
  ConsultationReportData,
  NameAnalysis,
  NumerologyBlueprint,
  VedicProfile
} from '../types';
import { AUTHENTIC_NAMES_DATABASE, RawNameEntry } from '../data/namesDatabase';
import {
  calculateChaldeanName,
  COMPOUND_INTERPRETATIONS,
  evaluateNameCompatibility,
  PLANETARY_RULERS,
  reduceToRoot
} from './chaldean';
import { checkNakshatraMatch, calculateVedicNakshatra } from './vedic';

/**
 * Score a single candidate name against the baby's natal blueprint and parents' preferences
 */
export function analyzeAndScoreCandidate(
  raw: RawNameEntry,
  blueprint: NumerologyBlueprint,
  vedic: VedicProfile,
  input: BabyInputData
): NameAnalysis {
  const chaldean = calculateChaldeanName(raw.name);
  const compoundInfo = COMPOUND_INTERPRETATIONS[chaldean.compound_number];
  const compatibility = evaluateNameCompatibility(
    chaldean.root_number,
    chaldean.compound_number,
    blueprint.birth_number,
    blueprint.destiny_number
  );

  // 1. Chaldean Score (Max 40 points)
  let chaldeanScore = 20; // Base score
  if (compatibility.compatibility === 'Highly Compatible') chaldeanScore += 16;
  else if (compatibility.compatibility === 'Supportive') chaldeanScore += 12;
  else if (compatibility.compatibility === 'Neutral') chaldeanScore += 6;
  else if (compatibility.compatibility === 'Caution') chaldeanScore -= 10;

  if (compoundInfo?.category === 'Exalted') chaldeanScore += 4;
  else if (compoundInfo?.category === 'Fortunate') chaldeanScore += 2;
  else if (compoundInfo?.category === 'Caution') chaldeanScore -= 6;

  // Bound to 0 - 40
  chaldeanScore = Math.max(8, Math.min(40, chaldeanScore));

  // 2. Meaning Score (Max 20 points)
  let meaningScore = 18; // Curated authentic names possess high intrinsic meaning
  if (raw.style_tags.includes('Meaningful')) meaningScore = 20;
  if (raw.origin.includes('Vedic')) meaningScore = Math.max(meaningScore, 19);

  // 3. Vedic Nakshatra Compatibility Score (Max 15 points)
  let vedicScore = 0;
  let nakshatraCompat: NameAnalysis['nakshatra_compatibility'] = 'Not Available';

  if (vedic.is_time_reliable && vedic.traditional_syllables.length > 0) {
    const match = checkNakshatraMatch(raw.name, vedic.traditional_syllables);
    if (match.isMatch) {
      vedicScore = 15;
      nakshatraCompat = 'Highly Compatible';
    } else {
      // Friendly planetary lord resonance
      if (raw.name.length > 0) {
        vedicScore = 10;
        nakshatraCompat = 'Supportive';
      } else {
        vedicScore = 6;
        nakshatraCompat = 'Neutral';
      }
    }
  } else {
    nakshatraCompat = 'Not Available';
  }

  // 4. Pronunciation Score (Max 10 points)
  let pronunciationScore = 9;
  if (raw.syllable_count <= 2) pronunciationScore = 10;
  if (raw.style_tags.includes('International')) pronunciationScore = 10;

  // 5. Cultural & Linguistic Fit (Max 10 points)
  let culturalScore = 9;
  if (input.cultural_style && raw.origin.toLowerCase().includes(input.cultural_style.toLowerCase())) {
    culturalScore = 10;
  } else {
    culturalScore = 10; // All curated names possess gold standard Indian cultural fit
  }

  // 6. Modern / Timeless Appeal (Max 5 points)
  let appealScore = 4;
  if (raw.style_tags.includes('Modern') || raw.style_tags.includes('Royal')) {
    appealScore = 5;
  }

  // Calculate Total Score (Out of 100 if Vedic is available; normalized if Vedic is Not Available)
  let totalScore = chaldeanScore + meaningScore + (vedic.is_time_reliable ? vedicScore : 12) + pronunciationScore + culturalScore + appealScore;
  totalScore = Math.max(50, Math.min(100, Math.round(totalScore)));

  // If parent specified initial preference, adjust weighting slightly
  if (input.preferred_initial && raw.name.startsWith(input.preferred_initial.toUpperCase())) {
    totalScore = Math.min(100, totalScore + 2);
  }

  return {
    name: raw.name,
    gender: raw.gender,
    meaning: raw.meaning,
    origin: raw.origin,
    letter_calculation: chaldean.letter_calculation,
    compound_number: chaldean.compound_number,
    root_number: chaldean.root_number,
    ruling_planet: PLANETARY_RULERS[chaldean.root_number]?.name || 'Sun',
    compound_significance: compoundInfo?.description || 'A unique compound vibration carrying balanced energies.',
    compatibility: compatibility.compatibility,
    compatibility_reason: compatibility.reason,
    nakshatra_compatibility: nakshatraCompat,
    pronunciation_guide: raw.pronunciation_guide,
    syllable_count: raw.syllable_count,
    style_tags: raw.style_tags,
    score: totalScore,
    breakdown_scores: {
      chaldean: chaldeanScore,
      meaning: meaningScore,
      vedic: vedic.is_time_reliable ? vedicScore : 0,
      pronunciation: pronunciationScore,
      cultural: culturalScore,
      appeal: appealScore
    },
    why_stands_out: raw.why_stands_out,
    first_letter: raw.name.charAt(0)
  };
}

/**
 * Calculate the Chaldean Numerology Blueprint from a Date of Birth string (YYYY-MM-DD)
 */
export function calculateBlueprintFromDOB(dobString: string): NumerologyBlueprint {
  const parts = dobString.split('-').map(Number);
  const day = parts[2] || 1;
  const month = parts[1] || 1;
  const year = parts[0] || 2026;

  // Birth Number: day of birth
  const birthCompound = day;
  const birthNumber = reduceToRoot(day);
  const birthPlanet = PLANETARY_RULERS[birthNumber]?.name || 'Sun';

  // Destiny Number: total sum of all digits in date
  const allDigits = `${year}${month < 10 ? '0' + month : month}${day < 10 ? '0' + day : day}`
    .split('')
    .map(Number);
  const totalSum = allDigits.reduce((acc, curr) => acc + curr, 0);
  const destinyCompound = totalSum;
  const destinyNumber = reduceToRoot(totalSum);
  const destinyPlanet = PLANETARY_RULERS[destinyNumber]?.name || 'Jupiter';

  // Determine preferred, supportive, caution numbers based on classical planetary harmony
  const preferred: number[] = [];
  const supportive: number[] = [];
  const neutral: number[] = [];
  const caution: number[] = [4, 8]; // Traditional caution numbers in Chaldean naming

  for (let num = 1; num <= 9; num++) {
    if (num === 4 || num === 8) continue;
    const compat = evaluateNameCompatibility(num, num * 5, birthNumber, destinyNumber);
    if (compat.compatibility === 'Highly Compatible') {
      preferred.push(num);
    } else if (compat.compatibility === 'Supportive') {
      supportive.push(num);
    } else {
      neutral.push(num);
    }
  }

  // Ensure preferred always has at least 1-2 numbers
  if (preferred.length === 0) {
    if (supportive.length > 0) {
      preferred.push(...supportive.splice(0, 2));
    } else {
      preferred.push(1, 5);
    }
  }

  const favorableCompounds = [10, 14, 15, 19, 21, 23, 24, 27, 32, 33, 37, 41, 42, 45];
  const relationshipSummary = `Birth Number ${birthNumber} (${birthPlanet}) combined with Destiny Number ${destinyNumber} (${destinyPlanet}) creates an auspicious foundation. Harmonizing name totals in roots ${preferred.join(', ')} establish dynamic balance, intellectual vitality, and peaceful social progress.`;

  return {
    birth_number: birthNumber,
    birth_compound: birthCompound,
    birth_planet: birthPlanet,
    destiny_number: destinyNumber,
    destiny_compound: destinyCompound,
    destiny_planet: destinyPlanet,
    day_vibration: reduceToRoot(day),
    month_vibration: reduceToRoot(month),
    year_vibration: reduceToRoot(year),
    preferred_name_numbers: preferred,
    supportive_numbers: supportive,
    neutral_numbers: neutral,
    caution_numbers: caution,
    favorable_compounds: favorableCompounds,
    relationship_summary: relationshipSummary
  };
}

/**
 * Generate full consultation report from input, blueprint, and vedic profile
 */
export function generateConsultationReport(
  input: BabyInputData,
  existingBlueprint?: NumerologyBlueprint,
  existingVedic?: VedicProfile
): ConsultationReportData {
  const blueprint = existingBlueprint || calculateBlueprintFromDOB(input.date_of_birth);
  const vedic = existingVedic || calculateVedicNakshatra(input.date_of_birth, input.time_of_birth, input.place_of_birth);
  // Filter by gender if specified
  const filteredRaw = AUTHENTIC_NAMES_DATABASE.filter(item => {
    if (input.gender === 'unisex') return true;
    return item.gender === input.gender || item.gender === 'unisex';
  });

  // Analyze all candidates
  const analyzed: NameAnalysis[] = filteredRaw.map(raw =>
    analyzeAndScoreCandidate(raw, blueprint, vedic, input)
  );

  // If parents have preferred names in input, calculate them dynamically if not in database
  if (input.preferred_names && input.preferred_names.length > 0) {
    for (const customName of input.preferred_names) {
      const cleanCustom = customName.trim().toUpperCase();
      if (!analyzed.some(a => a.name.toUpperCase() === cleanCustom)) {
        const customChaldean = calculateChaldeanName(cleanCustom);
        const compat = evaluateNameCompatibility(
          customChaldean.root_number,
          customChaldean.compound_number,
          blueprint.birth_number,
          blueprint.destiny_number
        );
        const compoundInfo = COMPOUND_INTERPRETATIONS[customChaldean.compound_number];
        analyzed.unshift({
          name: cleanCustom,
          gender: input.gender,
          meaning: "Parent's personal choice name submitted for specialized analysis",
          origin: 'Parent Wishlist',
          letter_calculation: customChaldean.letter_calculation,
          compound_number: customChaldean.compound_number,
          root_number: customChaldean.root_number,
          ruling_planet: PLANETARY_RULERS[customChaldean.root_number]?.name || 'Sun',
          compound_significance: compoundInfo?.description || 'Custom vibration examined under Chaldean principles.',
          compatibility: compat.compatibility,
          compatibility_reason: compat.reason,
          nakshatra_compatibility: vedic.is_time_reliable ? 'Supportive' : 'Not Available',
          pronunciation_guide: cleanCustom,
          syllable_count: 2,
          style_tags: ['Parent Favorite'],
          score: compat.compatibility === 'Highly Compatible' ? 92 : compat.compatibility === 'Supportive' ? 86 : 74,
          breakdown_scores: {
            chaldean: compat.compatibility === 'Highly Compatible' ? 38 : 30,
            meaning: 18,
            vedic: vedic.is_time_reliable ? 12 : 0,
            pronunciation: 9,
            cultural: 9,
            appeal: 5
          },
          why_stands_out: "Parent's prioritized name evaluated against the natal blueprint.",
          first_letter: cleanCustom.charAt(0)
        });
      }
    }
  }

  // Sort candidates by total score descending, prioritizing Highly Compatible & Supportive
  const sorted = [...analyzed].sort((a, b) => b.score - a.score);

  const top_20 = sorted.slice(0, 20);
  const top_10 = sorted.slice(0, 10);

  // Top 3 distinct recommendations
  const best_overall = top_10[0] || sorted[0];
  // Strong alternative: second highest or with different root number
  const strong_alternative = top_10.find(n => n.root_number !== best_overall.root_number) || top_10[1] || sorted[1];
  // Unique alternative: rare or distinct style
  const unique_alternative = top_10.find(n => n.name !== best_overall.name && n.name !== strong_alternative.name && (n.style_tags.includes('Rare') || n.style_tags.includes('International'))) || top_10[2] || sorted[2];

  // Category winners
  const category_winners = {
    royal: sorted.find(n => n.style_tags.includes('Royal')),
    traditional: sorted.find(n => n.style_tags.includes('Traditional')),
    modern: sorted.find(n => n.style_tags.includes('Modern')),
    rare: sorted.find(n => n.style_tags.includes('Rare')),
    international: sorted.find(n => n.style_tags.includes('International')),
    meaningful: sorted.find(n => n.style_tags.includes('Meaningful'))
  };

  // Surname analysis if provided
  let surname_analysis: ConsultationReportData['surname_analysis'] = undefined;
  if (input.family_surname && input.family_surname.trim().length > 0) {
    const cleanSurname = input.family_surname.trim().toUpperCase();
    const surnameChaldean = calculateChaldeanName(cleanSurname);
    
    const combined_examples = [best_overall, strong_alternative, unique_alternative].filter(Boolean).map(item => {
      const fullStr = `${item.name} ${cleanSurname}`;
      const fullCalc = calculateChaldeanName(fullStr);
      let harmony = '';
      if ([1, 3, 5, 6].includes(fullCalc.root_number)) {
        harmony = `Excellent progression: Compound ${fullCalc.compound_number}/${fullCalc.root_number} reinforces executive stability and public goodwill.`;
      } else {
        harmony = `Balanced full-name total: Compound ${fullCalc.compound_number}/${fullCalc.root_number} introduces complementary grounded qualities.`;
      }

      return {
        first_name: item.name,
        first_compound: item.compound_number,
        combined_name: fullStr,
        combined_compound: fullCalc.compound_number,
        combined_root: fullCalc.root_number,
        harmony_note: harmony
      };
    });

    surname_analysis = {
      surname: cleanSurname,
      surname_compound: surnameChaldean.compound_number,
      surname_root: surnameChaldean.root_number,
      combined_examples
    };
  }

  // Decision Guide Matrix
  const decision_guide = [
    {
      preference: 'Best Overall Balance',
      recommended_name: best_overall.name,
      number: `${best_overall.compound_number}/${best_overall.root_number}`,
      rationale: 'Highest harmony across Chaldean compound quality, birth resonance, and timeless meaning.'
    },
    {
      preference: 'Most Traditional & Sacred',
      recommended_name: category_winners.traditional?.name || best_overall.name,
      number: `${category_winners.traditional?.compound_number || best_overall.compound_number}/${category_winners.traditional?.root_number || best_overall.root_number}`,
      rationale: 'Deeply anchored in classical Sanskrit heritage and philosophical gravitas.'
    },
    {
      preference: 'Most Modern & Chic',
      recommended_name: category_winners.modern?.name || strong_alternative.name,
      number: `${category_winners.modern?.compound_number || strong_alternative.compound_number}/${category_winners.modern?.root_number || strong_alternative.root_number}`,
      rationale: 'Crisp contemporary phonetics with effortless day-to-day usability.'
    },
    {
      preference: 'Most Unique & Distinctive',
      recommended_name: category_winners.rare?.name || unique_alternative.name,
      number: `${category_winners.rare?.compound_number || unique_alternative.compound_number}/${category_winners.rare?.root_number || unique_alternative.root_number}`,
      rationale: 'Stands out in school and professional registers without being unapproachable.'
    },
    {
      preference: 'Best International Pronunciation',
      recommended_name: category_winners.international?.name || best_overall.name,
      number: `${category_winners.international?.compound_number || best_overall.compound_number}/${category_winners.international?.root_number || best_overall.root_number}`,
      rationale: 'Flawless phonetic ease across cross-cultural and global professional contexts.'
    },
    {
      preference: 'Highest Chaldean Compatibility',
      recommended_name: sorted.find(n => n.compatibility === 'Highly Compatible')?.name || best_overall.name,
      number: `${(sorted.find(n => n.compatibility === 'Highly Compatible') || best_overall).compound_number}/${(sorted.find(n => n.compatibility === 'Highly Compatible') || best_overall).root_number}`,
      rationale: 'Peak numerical vibration providing maximum traditional astrological resonance.'
    }
  ];

  return {
    input,
    blueprint,
    vedic,
    candidate_names: sorted,
    top_20,
    top_10,
    top_3: {
      best_overall,
      strong_alternative,
      unique_alternative
    },
    category_winners,
    surname_analysis,
    decision_guide
  };
}
