/**
 * Vedic Nakshatra & Astrological Naming Engine
 * 27 Nakshatras, Rashis, Padas, and Traditional Starting Syllables (Nama-Aksharas)
 */

import { VedicProfile } from '../types';

export interface NakshatraDetail {
  id: number;
  name: string;
  sanskrit: string;
  rashi: string;
  rashi_english: string;
  lord: string;
  deity: string;
  symbol: string;
  padas: [string, string, string, string]; // Syllables for padas 1, 2, 3, 4
  all_syllables: string[];
}

export const NAKSHATRAS: NakshatraDetail[] = [
  {
    id: 1,
    name: 'Ashwini',
    sanskrit: 'अश्विनी',
    rashi: 'Mesha',
    rashi_english: 'Aries',
    lord: 'Ketu',
    deity: 'Ashwini Kumaras (Divine Healers)',
    symbol: "Horse's Head (Swiftness & Healing)",
    padas: ['Chu', 'Che', 'Cho', 'La'],
    all_syllables: ['Chu', 'Che', 'Cho', 'La', 'Ch']
  },
  {
    id: 2,
    name: 'Bharani',
    sanskrit: 'भरणी',
    rashi: 'Mesha',
    rashi_english: 'Aries',
    lord: 'Venus',
    deity: 'Yama (God of Righteousness & Law)',
    symbol: 'Yoni / Vessel (Nurturance & Transformation)',
    padas: ['Lee', 'Lu', 'Le', 'Lo'],
    all_syllables: ['Li', 'Lee', 'Lu', 'Le', 'Lo']
  },
  {
    id: 3,
    name: 'Krittika',
    sanskrit: 'कृत्तिका',
    rashi: 'Mesha / Vrishabha',
    rashi_english: 'Aries / Taurus',
    lord: 'Sun',
    deity: 'Agni (Fire God of Illumination)',
    symbol: 'Razor / Flame (Sharp Intellect & Purity)',
    padas: ['A', 'Ee', 'U', 'Ea'],
    all_syllables: ['A', 'Aa', 'I', 'Ee', 'U', 'E', 'Ai']
  },
  {
    id: 4,
    name: 'Rohini',
    sanskrit: 'रोहिणी',
    rashi: 'Vrishabha',
    rashi_english: 'Taurus',
    lord: 'Moon',
    deity: 'Brahma (Creator of Cosmic Beauty)',
    symbol: 'Ox Cart / Chariot (Fertility & Magnetism)',
    padas: ['O', 'Va', 'Vi', 'Vu'],
    all_syllables: ['O', 'Va', 'Vaa', 'Vi', 'Vee', 'Vu', 'Vo']
  },
  {
    id: 5,
    name: 'Mrigashira',
    sanskrit: 'मृगशिरा',
    rashi: 'Vrishabha / Mithuna',
    rashi_english: 'Taurus / Gemini',
    lord: 'Mars',
    deity: 'Soma (Nectar of Joy & Quest)',
    symbol: "Deer's Head (Searching Mind & Gentleness)",
    padas: ['Ve', 'Vo', 'Ka', 'Kee'],
    all_syllables: ['Ve', 'Vo', 'Ka', 'Kaa', 'Ki', 'Kee']
  },
  {
    id: 6,
    name: 'Ardra',
    sanskrit: 'आर्द्रा',
    rashi: 'Mithuna',
    rashi_english: 'Gemini',
    lord: 'Rahu',
    deity: 'Rudra (Storm of Transformation & Depth)',
    symbol: 'Teardrop / Jewel (Passion & Breakthrough)',
    padas: ['Ku', 'Gha', 'Nga', 'Chha'],
    all_syllables: ['Ku', 'Koo', 'Gha', 'Chha']
  },
  {
    id: 7,
    name: 'Punarvasu',
    sanskrit: 'पुनर्वसु',
    rashi: 'Mithuna / Karka',
    rashi_english: 'Gemini / Cancer',
    lord: 'Jupiter',
    deity: 'Aditi (Mother of the Gods / Infinite Abundance)',
    symbol: 'Quiver of Arrows (Return of Light & Renewal)',
    padas: ['Ke', 'Ko', 'Ha', 'Hii'],
    all_syllables: ['Ke', 'Kay', 'Ko', 'Ha', 'Haa', 'Hi', 'Hii']
  },
  {
    id: 8,
    name: 'Pushya',
    sanskrit: 'पुष्य',
    rashi: 'Karka',
    rashi_english: 'Cancer',
    lord: 'Saturn',
    deity: 'Brihaspati (Spiritual Guru of the Devas)',
    symbol: 'Flower / Udder of Cow (Nourishment & Wisdom)',
    padas: ['Hu', 'He', 'Ho', 'Da'],
    all_syllables: ['Hu', 'Hoo', 'He', 'Ho', 'Da', 'Daa']
  },
  {
    id: 9,
    name: 'Ashlesha',
    sanskrit: 'आश्लेषा',
    rashi: 'Karka',
    rashi_english: 'Cancer',
    lord: 'Mercury',
    deity: 'Nagas (Serpentine Wisdom & Deep Intuition)',
    symbol: 'Coiled Serpent (Intuition & Mystical Depth)',
    padas: ['Dee', 'Doo', 'De', 'Do'],
    all_syllables: ['Di', 'Dee', 'Du', 'Doo', 'De', 'Do']
  },
  {
    id: 10,
    name: 'Magha',
    sanskrit: 'मघा',
    rashi: 'Simha',
    rashi_english: 'Leo',
    lord: 'Ketu',
    deity: 'Pitris (Ancestors of Royal Lineage)',
    symbol: 'Royal Throne (Ancestral Honor & Sovereignty)',
    padas: ['Ma', 'Mee', 'Moo', 'Me'],
    all_syllables: ['Ma', 'Maa', 'Mi', 'Mee', 'Mu', 'Moo', 'Me']
  },
  {
    id: 11,
    name: 'Purva Phalguni',
    sanskrit: 'पूर्वा फाल्गुनी',
    rashi: 'Simha',
    rashi_english: 'Leo',
    lord: 'Venus',
    deity: 'Bhaga (God of Prosperity, Delight & Fortune)',
    symbol: 'Hammock / Couch (Joy, Aesthetics & Generosity)',
    padas: ['Mo', 'Ta', 'Tee', 'Too'],
    all_syllables: ['Mo', 'Ta', 'Taa', 'Ti', 'Tee', 'Tu', 'Too']
  },
  {
    id: 12,
    name: 'Uttara Phalguni',
    sanskrit: 'उत्तरा फाल्गुनी',
    rashi: 'Simha / Kanya',
    rashi_english: 'Leo / Virgo',
    lord: 'Sun',
    deity: 'Aryaman (God of Noble Patronage & Alliances)',
    symbol: 'Bed of Honor (Philanthropy & Enduring Friendship)',
    padas: ['Te', 'To', 'Pa', 'Pee'],
    all_syllables: ['Te', 'To', 'Pa', 'Paa', 'Pi', 'Pee']
  },
  {
    id: 13,
    name: 'Hasta',
    sanskrit: 'हस्त',
    rashi: 'Kanya',
    rashi_english: 'Virgo',
    lord: 'Moon',
    deity: 'Savitr (Sun of Creative Awakening)',
    symbol: 'Open Hand (Dexterity, Healing & Wisdom)',
    padas: ['Pu', 'Sha', 'Na', 'Tha'],
    all_syllables: ['Pu', 'Poo', 'Sha', 'Shaa', 'Na', 'Naa', 'Tha']
  },
  {
    id: 14,
    name: 'Chitra',
    sanskrit: 'चित्रा',
    rashi: 'Kanya / Tula',
    rashi_english: 'Virgo / Libra',
    lord: 'Mars',
    deity: 'Twashtar / Vishwakarma (Celestial Architect)',
    symbol: 'Bright Gem / Pearl (Artistic Brilliance & Style)',
    padas: ['Pe', 'Po', 'Ra', 'Ree'],
    all_syllables: ['Pe', 'Po', 'Ra', 'Raa', 'Ri', 'Ree']
  },
  {
    id: 15,
    name: 'Swati',
    sanskrit: 'स्वाती',
    rashi: 'Tula',
    rashi_english: 'Libra',
    lord: 'Rahu',
    deity: 'Vayu (Wind God of Freedom & Speech)',
    symbol: 'Young Plant / Coral (Independence & Eloquence)',
    padas: ['Ru', 'Re', 'Ro', 'Taa'],
    all_syllables: ['Ru', 'Roo', 'Re', 'Ro', 'Ta', 'Taa']
  },
  {
    id: 16,
    name: 'Vishakha',
    sanskrit: 'विशाखा',
    rashi: 'Tula / Vrishchika',
    rashi_english: 'Libra / Scorpio',
    lord: 'Jupiter',
    deity: 'Indra & Agni (Triumph & Divine Focus)',
    symbol: 'Triumphal Arch (Unshakable Purpose & Victory)',
    padas: ['Tee', 'Too', 'Te', 'To'],
    all_syllables: ['Ti', 'Tee', 'Tu', 'Too', 'Te', 'To']
  },
  {
    id: 17,
    name: 'Anuradha',
    sanskrit: 'अनुराधा',
    rashi: 'Vrishchika',
    rashi_english: 'Scorpio',
    lord: 'Saturn',
    deity: 'Mitra (God of Compassionate Friendship)',
    symbol: 'Lotus / Staff of Devotion (Universal Harmony)',
    padas: ['Na', 'Nee', 'Noo', 'Ne'],
    all_syllables: ['Na', 'Naa', 'Ni', 'Nee', 'Nu', 'Noo', 'Ne']
  },
  {
    id: 18,
    name: 'Jyeshtha',
    sanskrit: 'ज्येष्ठा',
    rashi: 'Vrishchika',
    rashi_english: 'Scorpio',
    lord: 'Mercury',
    deity: 'Indra (King of Devas / Elder Protector)',
    symbol: 'Circular Amulet / Talisman (Courage & Seniority)',
    padas: ['No', 'Ya', 'Yee', 'Yu'],
    all_syllables: ['No', 'Ya', 'Yaa', 'Yi', 'Yee', 'Yu', 'Yoo']
  },
  {
    id: 19,
    name: 'Mula',
    sanskrit: 'मूल',
    rashi: 'Dhanu',
    rashi_english: 'Sagittarius',
    lord: 'Ketu',
    deity: 'Nirriti (Root of Truth & Awakening)',
    symbol: 'Tied Bundle of Roots (Investigative Depth)',
    padas: ['Ye', 'Yo', 'Bha', 'Bhee'],
    all_syllables: ['Ye', 'Yo', 'Bha', 'Bhaa', 'Bhi', 'Bhee']
  },
  {
    id: 20,
    name: 'Purva Ashadha',
    sanskrit: 'पूर्वाषाढा',
    rashi: 'Dhanu',
    rashi_english: 'Sagittarius',
    lord: 'Venus',
    deity: 'Apas (Water Goddess of Cosmic Grace)',
    symbol: "Elephant's Tusk / Winnowing Basket (Invincibility)",
    padas: ['Bho', 'Dha', 'Pha', 'Dhaa'],
    all_syllables: ['Bho', 'Dha', 'Dhaa', 'Pha', 'Fa']
  },
  {
    id: 21,
    name: 'Uttara Ashadha',
    sanskrit: 'उत्तराषाढा',
    rashi: 'Dhanu / Makara',
    rashi_english: 'Sagittarius / Capricorn',
    lord: 'Sun',
    deity: 'Vishwadevas (Universal Virtues & Truth)',
    symbol: 'Small Bed / Tusk of Victory (Final Triumph)',
    padas: ['Bhe', 'Bho', 'Ja', 'Jee'],
    all_syllables: ['Bhe', 'Bho', 'Ja', 'Jaa', 'Ji', 'Jee']
  },
  {
    id: 22,
    name: 'Shravana',
    sanskrit: 'श्रवण',
    rashi: 'Makara',
    rashi_english: 'Capricorn',
    lord: 'Moon',
    deity: 'Vishnu (Preserver of Cosmic Order)',
    symbol: 'Ear / Three Footprints (Wisdom Through Listening)',
    padas: ['Khee', 'Khoo', 'Khe', 'Kho'],
    all_syllables: ['Khi', 'Khee', 'Khu', 'Khoo', 'Khe', 'Kho', 'Ju', 'Je']
  },
  {
    id: 23,
    name: 'Dhanishta',
    sanskrit: 'धनिष्ठा',
    rashi: 'Makara / Kumbha',
    rashi_english: 'Capricorn / Aquarius',
    lord: 'Mars',
    deity: 'Ashta Vasus (Deities of Splendor & Elements)',
    symbol: 'Musical Drum (Mridangam) (Rhythm & Abundance)',
    padas: ['Gaa', 'Gee', 'Goo', 'Ge'],
    all_syllables: ['Ga', 'Gaa', 'Gi', 'Gee', 'Gu', 'Goo', 'Ge']
  },
  {
    id: 24,
    name: 'Shatabhisha',
    sanskrit: 'शतभिषा',
    rashi: 'Kumbha',
    rashi_english: 'Aquarius',
    lord: 'Rahu',
    deity: 'Varuna (Cosmic Ocean of Truth & Healing)',
    symbol: 'Empty Circle / 100 Physicians (Secret Healing)',
    padas: ['Go', 'Saa', 'See', 'Soo'],
    all_syllables: ['Go', 'Sa', 'Saa', 'Si', 'See', 'Su', 'Soo']
  },
  {
    id: 25,
    name: 'Purva Bhadrapada',
    sanskrit: 'पूर्वभाद्रपदा',
    rashi: 'Kumbha / Meena',
    rashi_english: 'Aquarius / Pisces',
    lord: 'Jupiter',
    deity: 'Aja Ekapada (One-Footed Cosmic Fire of Ascendance)',
    symbol: 'Front Legs of Funeral Bed / Swords (High Aspiration)',
    padas: ['Se', 'So', 'Daa', 'Dee'],
    all_syllables: ['Se', 'Say', 'So', 'Da', 'Daa', 'Di', 'Dee']
  },
  {
    id: 26,
    name: 'Uttara Bhadrapada',
    sanskrit: 'उत्तरभाद्रपदा',
    rashi: 'Meena',
    rashi_english: 'Pisces',
    lord: 'Saturn',
    deity: 'Ahirbudhnya (Serpent of the Ocean Depths)',
    symbol: 'Twin / Back Legs of Couch (Serenity & Renown)',
    padas: ['Du', 'Tha', 'Jha', 'Na'],
    all_syllables: ['Du', 'Doo', 'Tha', 'Thaa', 'Jha', 'Na', 'Gya']
  },
  {
    id: 27,
    name: 'Revati',
    sanskrit: 'रेवती',
    rashi: 'Meena',
    rashi_english: 'Pisces',
    lord: 'Mercury',
    deity: 'Pushan (Nourishing Guide of Safe Journeys)',
    symbol: 'Fish / Pair of Fishes (Prosperity & Spiritual Completion)',
    padas: ['De', 'Do', 'Chaa', 'Chee'],
    all_syllables: ['De', 'Day', 'Do', 'Cha', 'Chaa', 'Chi', 'Chee']
  }
];

/**
 * Astronomical approximation of Moon's Nakshatra
 * Based on date, time, and longitude.
 * If time or place is missing, returns an honest approximate/unconfirmed profile.
 */
export function calculateVedicNakshatra(
  dobString: string,
  timeString?: string,
  placeString?: string
): VedicProfile {
  if (!timeString || !placeString) {
    // If birth time or place is missing, return unconfirmed profile as strictly specified in instructions
    return {
      moon_sign: undefined,
      nakshatra: undefined,
      nakshatra_pada: undefined,
      deity: undefined,
      planetary_lord: undefined,
      traditional_syllables: [],
      is_time_reliable: false
    };
  }

  // Simplified Nirayana ephemeris calculation for demonstration and consultation preview
  // Nakshatra span is 13° 20' (800 minutes of arc)
  const [year, month, day] = dobString.split('-').map(Number);
  const [hour, minute] = timeString.split(':').map(Number);

  // Approximate Julian Day calculation
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  const jd = jdn + (hour - 12) / 24 + minute / 1440;

  // Approximate mean lunar longitude (sidereal)
  const T = (jd - 2451545.0) / 36525.0;
  // Moon mean longitude in degrees
  let L = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T;
  // Ayanamsha (Lahiri approx)
  const ayanamsha = 23.85 + (year - 2000) * 0.0139;
  let siderealMoon = (L - ayanamsha) % 360;
  if (siderealMoon < 0) siderealMoon += 360;

  // 360 degrees divided by 27 Nakshatras = 13.333333 degrees per Nakshatra
  const nakshatraIndex = Math.floor(siderealMoon / (360 / 27)) % 27;
  const degreesIntoNakshatra = siderealMoon % (360 / 27);
  const pada = Math.min(4, Math.floor(degreesIntoNakshatra / (13.333333 / 4)) + 1);

  const selectedNakshatra = NAKSHATRAS[nakshatraIndex] || NAKSHATRAS[0];

  return {
    moon_sign: selectedNakshatra.rashi,
    nakshatra: selectedNakshatra.name,
    nakshatra_pada: pada,
    deity: selectedNakshatra.deity,
    planetary_lord: selectedNakshatra.lord,
    traditional_syllables: selectedNakshatra.all_syllables,
    is_time_reliable: true
  };
}

/**
 * Check if a candidate name begins with or phonetically matches any traditional Nakshatra syllable
 */
export function checkNakshatraMatch(name: string, syllables: string[]): {
  isMatch: boolean;
  matchingSyllable?: string;
} {
  if (!syllables || syllables.length === 0) {
    return { isMatch: false };
  }

  const upperName = name.toUpperCase();
  for (const syl of syllables) {
    const cleanSyl = syl.toUpperCase();
    if (upperName.startsWith(cleanSyl)) {
      return { isMatch: true, matchingSyllable: syl };
    }
  }

  // Phonetic matching for first letter
  const firstLetter = upperName.charAt(0);
  for (const syl of syllables) {
    if (syl.toUpperCase().charAt(0) === firstLetter) {
      return { isMatch: true, matchingSyllable: syl };
    }
  }

  return { isMatch: false };
}
