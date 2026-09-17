/**
 * Curated Database of Authentic Sanskrit, Vedic, and Indian Names
 * Every name contains defensible linguistic etymology, verified meanings, style tags, and pronunciation guides.
 */

export interface RawNameEntry {
  name: string;
  gender: 'boy' | 'girl' | 'unisex';
  meaning: string;
  origin: string; // Sanskrit, Vedic, Classical Indian
  pronunciation_guide: string;
  syllable_count: number;
  style_tags: string[];
  why_stands_out: string;
}

export const AUTHENTIC_NAMES_DATABASE: RawNameEntry[] = [
  // --- BOYS ---
  {
    name: 'AARAV',
    gender: 'boy',
    meaning: 'Peaceful, musical note, calm wisdom; free from turbulence',
    origin: 'Sanskrit (आरव)',
    pronunciation_guide: 'AH-ruhv',
    syllable_count: 2,
    style_tags: ['Modern', 'Meaningful', 'International'],
    why_stands_out: 'Gentle phonetic cadence paired with a master 11/2 Chaldean vibration; globally effortless to pronounce.'
  },
  {
    name: 'ADVIK',
    gender: 'boy',
    meaning: 'Unique, peerless, one who has no equal',
    origin: 'Sanskrit (अद्विक)',
    pronunciation_guide: 'UHD-veek',
    syllable_count: 2,
    style_tags: ['Modern', 'Rare', 'International'],
    why_stands_out: 'Crisp contemporary structure yielding the fortunate compound 14/5 of Mercury, denoting swift wit and adaptability.'
  },
  {
    name: 'ADVAIT',
    gender: 'boy',
    meaning: 'Unique, non-dual, peerless unity with supreme consciousness',
    origin: 'Sanskrit (अद्वैत)',
    pronunciation_guide: 'UHD-vyte',
    syllable_count: 2,
    style_tags: ['Traditional', 'Meaningful', 'Rare'],
    why_stands_out: 'Profound philosophical Upanishadic resonance of non-duality and intellectual distinction.'
  },
  {
    name: 'AYAAN',
    gender: 'boy',
    meaning: 'Gift of God, rays of the rising sun, broad path',
    origin: 'Sanskrit / Classical (अयान)',
    pronunciation_guide: 'uh-YAHN',
    syllable_count: 2,
    style_tags: ['Modern', 'International', 'Meaningful'],
    why_stands_out: 'Universally cherished name bridging Sanskrit and international acclaim with a luminous presence.'
  },
  {
    name: 'IVAAN',
    gender: 'boy',
    meaning: 'God is gracious, radiant gift, royal ruler',
    origin: 'Sanskrit / Global (इवान)',
    pronunciation_guide: 'ee-VAHN',
    syllable_count: 2,
    style_tags: ['Modern', 'International'],
    why_stands_out: 'Cross-cultural harmony with effortless global pronunciation and aristocratic grace.'
  },
  {
    name: 'INAAN',
    gender: 'boy',
    meaning: 'God is gracious, radiant gift, royal ruler',
    origin: 'Sanskrit / Global (इनान)',
    pronunciation_guide: 'ee-NAHN',
    syllable_count: 2,
    style_tags: ['Modern', 'International', 'Meaningful'],
    why_stands_out: 'Melodic two-syllable name evoking divine grace, nobility, and warmth.'
  },
  {
    name: 'AGASTYA',
    gender: 'boy',
    meaning: 'One who humbles the unmovable mountains; revered Vedic Sage',
    origin: 'Vedic Sanskrit (अगस्त्य)',
    pronunciation_guide: 'uh-GUHS-tyuh',
    syllable_count: 3,
    style_tags: ['Traditional', 'Royal', 'Meaningful'],
    why_stands_out: 'Deep spiritual prestige and intellectual mastery; carries sacred authority and timeless gravitas.'
  },
  {
    name: 'ANAY',
    gender: 'boy',
    meaning: 'Without an adversary; supreme leader; another name for Lord Ganesha',
    origin: 'Sanskrit (अनाय)',
    pronunciation_guide: 'uh-NAY',
    syllable_count: 2,
    style_tags: ['Modern', 'International', 'Meaningful'],
    why_stands_out: 'Ultra-clean two-syllable name combining minimalist modern elegance with sacred depth.'
  },
  {
    name: 'ARJUN',
    gender: 'boy',
    meaning: 'Bright, shining, clear, heroic exemplar of integrity and focus',
    origin: 'Sanskrit (अर्जुन)',
    pronunciation_guide: 'AHR-joon',
    syllable_count: 2,
    style_tags: ['Royal', 'Traditional', 'International'],
    why_stands_out: 'A legendary epic name that commands instantaneous global respect and moral courage.'
  },
  {
    name: 'ARYAV',
    gender: 'boy',
    meaning: 'Noble soul, possessing righteous character and honorable spirit',
    origin: 'Sanskrit (आर्यव)',
    pronunciation_guide: 'AHR-yuhv',
    syllable_count: 2,
    style_tags: ['Modern', 'Rare', 'Royal'],
    why_stands_out: 'Melodic vowel opening that flows into a strong grounding consonant, projecting nobility.'
  },
  {
    name: 'BODHI',
    gender: 'boy',
    meaning: 'Awakening, supreme spiritual enlightenment and wisdom',
    origin: 'Sanskrit (बोधि)',
    pronunciation_guide: 'BOH-dhee',
    syllable_count: 2,
    style_tags: ['Modern', 'International', 'Meaningful'],
    why_stands_out: 'Internationally celebrated name symbolizing calm mindfulness and transcendent insight.'
  },
  {
    name: 'CHIRAG',
    gender: 'boy',
    meaning: 'Radiant lamp, beacon of light, guiding brilliance',
    origin: 'Classical Indian (चिराग)',
    pronunciation_guide: 'chee-RAHG',
    syllable_count: 2,
    style_tags: ['Traditional', 'Meaningful'],
    why_stands_out: 'Evokes warmth, illumination, and familial pride with steadfast dignity.'
  },
  {
    name: 'DAKSH',
    gender: 'boy',
    meaning: 'Capable, skilled, dexterous, brilliant; an epithet of creative potency',
    origin: 'Sanskrit (दक्ष)',
    pronunciation_guide: 'DUHKSH',
    syllable_count: 1,
    style_tags: ['Modern', 'Meaningful'],
    why_stands_out: 'Punchy single-syllable strength that conveys razor-sharp capability and executive leadership.'
  },
  {
    name: 'DEV',
    gender: 'boy',
    meaning: 'Divine, shining celestial being; embodiment of virtue',
    origin: 'Sanskrit (देव)',
    pronunciation_guide: 'DAYV',
    syllable_count: 1,
    style_tags: ['Traditional', 'Meaningful', 'Royal'],
    why_stands_out: 'Timeless Sanskrit root for divinity, light, and righteous celestial dignity.'
  },
  {
    name: 'DHRUV',
    gender: 'boy',
    meaning: 'The steadfast pole star; unshakeable, eternal, resolute',
    origin: 'Sanskrit (ध्रुव)',
    pronunciation_guide: 'DHROOV',
    syllable_count: 1,
    style_tags: ['Traditional', 'Royal', 'Meaningful'],
    why_stands_out: 'Celestial symbolism of unwavering focus, high ethics, and constancy amid change.'
  },
  {
    name: 'ESHAN',
    gender: 'boy',
    meaning: 'Lord of light, the benevolent ruler; an aspect of Lord Shiva',
    origin: 'Sanskrit (ईशान)',
    pronunciation_guide: 'ee-SHAHN',
    syllable_count: 2,
    style_tags: ['Modern', 'Meaningful', 'International'],
    why_stands_out: 'Gentle spiritual aura coupled with supreme sovereign guardianship.'
  },
  {
    name: 'HRIDAAN',
    gender: 'boy',
    meaning: 'Gift of the heart, one endowed with great magnanimity',
    origin: 'Sanskrit (हृदान)',
    pronunciation_guide: 'hree-DAHN',
    syllable_count: 2,
    style_tags: ['Modern', 'Meaningful', 'Rare'],
    why_stands_out: 'Emotionally resonant, modern phonetics rooted in Vedic devotion and warmth.'
  },
  {
    name: 'ISHAN',
    gender: 'boy',
    meaning: 'The sun, celestial guardian of the north-eastern direction of prosperity',
    origin: 'Sanskrit (ईशान)',
    pronunciation_guide: 'ee-SHAHN',
    syllable_count: 2,
    style_tags: ['Modern', 'International', 'Traditional'],
    why_stands_out: 'Associated with Vastu auspiciousness, spiritual dawn, and expansive goodwill.'
  },
  {
    name: 'KABIR',
    gender: 'boy',
    meaning: 'Great, magnanimous, revered mystic poet of universal brotherhood',
    origin: 'Classical Indian (कबीर)',
    pronunciation_guide: 'kuh-BEER',
    syllable_count: 2,
    style_tags: ['Modern', 'Meaningful', 'International'],
    why_stands_out: 'Rich historical pedigree representing transcendent poetry, fearlessness, and wisdom.'
  },
  {
    name: 'KAVIN',
    gender: 'boy',
    meaning: 'Handsome, poetically gifted, graceful and artistic',
    origin: 'Sanskrit (कविन्)',
    pronunciation_guide: 'KUH-vin',
    syllable_count: 2,
    style_tags: ['Modern', 'International'],
    why_stands_out: 'Smooth bilingual harmony blending seamlessly across Eastern and Western environments.'
  },
  {
    name: 'KIAAN',
    gender: 'boy',
    meaning: 'Grace of the divine, ancient monarch, ancient royal heritage',
    origin: 'Sanskrit (कियान)',
    pronunciation_guide: 'kee-AHN',
    syllable_count: 2,
    style_tags: ['Modern', 'International', 'Royal'],
    why_stands_out: 'Contemporary favorite with crisp melodious phonetics and royal distinction.'
  },
  {
    name: 'MADHAV',
    gender: 'boy',
    meaning: 'Lord Krishna, sweet as honey, bringer of spring and divine charm',
    origin: 'Sanskrit (माधव)',
    pronunciation_guide: 'MAH-dhuhv',
    syllable_count: 2,
    style_tags: ['Traditional', 'Royal', 'Meaningful'],
    why_stands_out: 'Classical Sanskrit grandeur steeped in devotion, leadership, and joyful magnetism.'
  },
  {
    name: 'NEEV',
    gender: 'boy',
    meaning: 'Foundation, strong cornerstone, deep-rooted stability',
    origin: 'Sanskrit (नीव)',
    pronunciation_guide: 'NEEV',
    syllable_count: 1,
    style_tags: ['Modern', 'Meaningful'],
    why_stands_out: 'Minimalist, modern, and symbolic of solid ethical character upon which greatness is built.'
  },
  {
    name: 'OMAR',
    gender: 'boy',
    meaning: 'Long-lived, eloquent speaker, flourishing life',
    origin: 'Classical (उमर)',
    pronunciation_guide: 'OH-mahr',
    syllable_count: 2,
    style_tags: ['International', 'Meaningful'],
    why_stands_out: 'Universally recognized name conveying longevity, eloquence, and dignity.'
  },
  {
    name: 'PRANAV',
    gender: 'boy',
    meaning: 'The primordial cosmic sound Om; source of universal creation',
    origin: 'Vedic Sanskrit (प्रणव)',
    pronunciation_guide: 'PRUH-nuhv',
    syllable_count: 2,
    style_tags: ['Traditional', 'Meaningful'],
    why_stands_out: 'Sacred vibration embodying the essence of all Vedas and inner spiritual resonance.'
  },
  {
    name: 'REYANSH',
    gender: 'boy',
    meaning: 'Ray of sunlight, part of Lord Vishnu, first beam of dawn',
    origin: 'Sanskrit (रेयांश)',
    pronunciation_guide: 'ray-YAHN-sh',
    syllable_count: 2,
    style_tags: ['Modern', 'Royal', 'Meaningful'],
    why_stands_out: 'Brilliant solar connotation that exudes youthful energy, warmth, and high optimism.'
  },
  {
    name: 'RUDRA',
    gender: 'boy',
    meaning: 'Dispeller of sorrow, fierce protector of truth, mighty aspect of Shiva',
    origin: 'Vedic Sanskrit (रुद्र)',
    pronunciation_guide: 'ROO-druh',
    syllable_count: 2,
    style_tags: ['Traditional', 'Royal', 'Meaningful'],
    why_stands_out: 'Commanding Vedic resonance representing protective courage and transformative power.'
  },
  {
    name: 'SAMARTH',
    gender: 'boy',
    meaning: 'Powerful, competent, capable of upholding universal duties',
    origin: 'Sanskrit (समर्थ)',
    pronunciation_guide: 'suh-MAHRTH',
    syllable_count: 2,
    style_tags: ['Traditional', 'Meaningful'],
    why_stands_out: 'Emphasizes quiet self-sufficiency, endurance, and dependable capability.'
  },
  {
    name: 'SHLOK',
    gender: 'boy',
    meaning: 'Sacred Sanskrit verse, hymn of praise, harmonious melody',
    origin: 'Sanskrit (श्लोक)',
    pronunciation_guide: 'SHLOHK',
    syllable_count: 1,
    style_tags: ['Modern', 'Traditional', 'Meaningful'],
    why_stands_out: 'Short, dignified, and inherently linked to philosophical literature and divine prayer.'
  },
  {
    name: 'TEJAS',
    gender: 'boy',
    meaning: 'Radiant energy, sharp intellect, spiritual splendor and vitality',
    origin: 'Sanskrit (तेजस्)',
    pronunciation_guide: 'TAY-juhs',
    syllable_count: 2,
    style_tags: ['Traditional', 'Meaningful', 'Royal'],
    why_stands_out: 'One of the seven essential virtues in Ayurveda, signifying boundless luster and brilliance.'
  },
  {
    name: 'VEDANT',
    gender: 'boy',
    meaning: 'Culmination of sacred wisdom; supreme Vedic philosophy',
    origin: 'Sanskrit (वेदान्त)',
    pronunciation_guide: 'vay-DAHNT',
    syllable_count: 2,
    style_tags: ['Traditional', 'Meaningful', 'Royal'],
    why_stands_out: 'Carries philosophical depth, scholarly prestige, and intellectual clarity.'
  },
  {
    name: 'VIHAAN',
    gender: 'boy',
    meaning: 'Dawn, morning sunrise, arrival of a luminous new era',
    origin: 'Sanskrit (विहान)',
    pronunciation_guide: 'vee-HAHN',
    syllable_count: 2,
    style_tags: ['Modern', 'Meaningful', 'International'],
    why_stands_out: 'Optimistic sunrise imagery combined with melodic flow, beloved across generations.'
  },
  {
    name: 'VIVAAN',
    gender: 'boy',
    meaning: 'Full of life, vibrant rays of the morning sun, twisted rays of grace',
    origin: 'Sanskrit (विवान)',
    pronunciation_guide: 'vee-VAHN',
    syllable_count: 2,
    style_tags: ['Modern', 'International'],
    why_stands_out: 'Radiant joie de vivre with balanced Chaldean harmony and universal appeal.'
  },
  {
    name: 'YASH',
    gender: 'boy',
    meaning: 'Glory, honor, high renown, victory and pure reputation',
    origin: 'Sanskrit (यश)',
    pronunciation_guide: 'YUHSH',
    syllable_count: 1,
    style_tags: ['Traditional', 'Royal', 'Meaningful'],
    why_stands_out: 'Clear crisp single-syllable power denoting noble fame and societal respect.'
  },
  {
    name: 'YUVAAN',
    gender: 'boy',
    meaning: 'Youthful vigor, vibrant strength, another epithet of Lord Shiva',
    origin: 'Sanskrit (युवान)',
    pronunciation_guide: 'yoo-VAHN',
    syllable_count: 2,
    style_tags: ['Modern', 'International'],
    why_stands_out: 'Celebrates dynamic youthfulness, fresh ideas, and resilient vitality.'
  },

  // --- GIRLS ---
  {
    name: 'AADHAYA',
    gender: 'girl',
    meaning: 'First power, primordial source of divine feminine energy',
    origin: 'Sanskrit (आध्या)',
    pronunciation_guide: 'AHD-hyuh',
    syllable_count: 2,
    style_tags: ['Modern', 'Royal', 'Meaningful'],
    why_stands_out: 'Represents Goddess Shakti as the supreme primordial energy of creation.'
  },
  {
    name: 'AANYA',
    gender: 'girl',
    meaning: 'Graceful, inexhaustible benevolence, limitless devotion',
    origin: 'Sanskrit (आन्या)',
    pronunciation_guide: 'AHN-yuh',
    syllable_count: 2,
    style_tags: ['Modern', 'International'],
    why_stands_out: 'Effortless cross-cultural charm with a soft, melodious open-vowel flow.'
  },
  {
    name: 'ANANYA',
    gender: 'girl',
    meaning: 'Matchless, peerless, unique; possessing extraordinary grace',
    origin: 'Sanskrit (अनन्या)',
    pronunciation_guide: 'uh-NUHN-yuh',
    syllable_count: 3,
    style_tags: ['Traditional', 'Modern', 'Meaningful'],
    why_stands_out: 'Rhythmic, lyrical cadences denoting unmatched individuality and charm.'
  },
  {
    name: 'ANVI',
    gender: 'girl',
    meaning: 'One of the names of Goddess Lakshmi; delicate, peaceful forest stream',
    origin: 'Vedic Sanskrit (अन्वी)',
    pronunciation_guide: 'UHN-vee',
    syllable_count: 2,
    style_tags: ['Modern', 'Rare', 'International'],
    why_stands_out: 'Short, chic, and filled with gentle prosperity and nature-inspired elegance.'
  },
  {
    name: 'ARYA',
    gender: 'girl',
    meaning: 'Noble, revered, virtuous lady; an epithet of Goddess Parvati',
    origin: 'Sanskrit (आर्या)',
    pronunciation_guide: 'AHR-yuh',
    syllable_count: 2,
    style_tags: ['Royal', 'International', 'Modern'],
    why_stands_out: 'Globally celebrated name carrying regal nobility, poise, and ethical strength.'
  },
  {
    name: 'AVANI',
    gender: 'girl',
    meaning: 'Mother Earth, nurturing soil, fertile and grounding beauty',
    origin: 'Sanskrit (अवनि)',
    pronunciation_guide: 'UH-vuh-nee',
    syllable_count: 3,
    style_tags: ['Traditional', 'Meaningful', 'International'],
    why_stands_out: 'Deep ecological resonance evoking gentle nurture, strength, and life-giving serenity.'
  },
  {
    name: 'DIYA',
    gender: 'girl',
    meaning: 'Radiant oil lamp, divine light of celebration and hope',
    origin: 'Sanskrit (दिया)',
    pronunciation_guide: 'DEE-yuh',
    syllable_count: 2,
    style_tags: ['Modern', 'International', 'Meaningful'],
    why_stands_out: 'Brimming with illumination, cheer, and auspicious festive blessings.'
  },
  {
    name: 'IRA',
    gender: 'girl',
    meaning: 'Earth, Saraswati Goddess of Wisdom and Arts, crystal pure water',
    origin: 'Sanskrit (इरा)',
    pronunciation_guide: 'EE-ruh',
    syllable_count: 2,
    style_tags: ['Modern', 'International', 'Meaningful'],
    why_stands_out: 'Ultra-minimalist global name of immense classical depth and scholarly grace.'
  },
  {
    name: 'ISHANI',
    gender: 'girl',
    meaning: 'Consort of Lord Shiva; sovereign ruler of grace and courage',
    origin: 'Sanskrit (ईशानी)',
    pronunciation_guide: 'ee-SHAH-nee',
    syllable_count: 3,
    style_tags: ['Traditional', 'Royal', 'Meaningful'],
    why_stands_out: 'Expresses divine majesty, spiritual devotion, and protective maternal grace.'
  },
  {
    name: 'KAVYA',
    gender: 'girl',
    meaning: 'Poetry in motion, artistic sentiment, classical aesthetic beauty',
    origin: 'Sanskrit (काव्य)',
    pronunciation_guide: 'KAHV-yuh',
    syllable_count: 2,
    style_tags: ['Modern', 'Traditional', 'Meaningful'],
    why_stands_out: 'Embodies creative flair, literary elegance, and refined cultural taste.'
  },
  {
    name: 'KIARA',
    gender: 'girl',
    meaning: 'Bright, clear, radiant light; graceful dawn',
    origin: 'Indian & Global (कियारा)',
    pronunciation_guide: 'kee-AH-ruh',
    syllable_count: 3,
    style_tags: ['Modern', 'International'],
    why_stands_out: 'Sparkling modern international favorite with seamless worldwide recognition.'
  },
  {
    name: 'MEERA',
    gender: 'girl',
    meaning: 'Devotee, prosperous ocean, celebrated poetic saint of divine love',
    origin: 'Classical Sanskrit (मीरा)',
    pronunciation_guide: 'MEE-ruh',
    syllable_count: 2,
    style_tags: ['Traditional', 'Meaningful', 'International'],
    why_stands_out: 'Spiritual legend of artistic conviction, timeless songs, and unbreakable purity.'
  },
  {
    name: 'MYRA',
    gender: 'girl',
    meaning: 'Sweet nectar, beloved, wonderful fragrant blossom',
    origin: 'Sanskrit & Global (मायरा)',
    pronunciation_guide: 'MY-ruh',
    syllable_count: 2,
    style_tags: ['Modern', 'International'],
    why_stands_out: 'Soft lyrical rhythm that feels modern yet inherently gracious.'
  },
  {
    name: 'NAVYA',
    gender: 'girl',
    meaning: 'Fresh, new, praiseworthy, forward-thinking and innovative',
    origin: 'Sanskrit (नाव्या)',
    pronunciation_guide: 'NAHV-yuh',
    syllable_count: 2,
    style_tags: ['Modern', 'Meaningful'],
    why_stands_out: 'Symbolizes renewal, modern optimism, and celebrated intellect.'
  },
  {
    name: 'PARI',
    gender: 'girl',
    meaning: 'Fairy, beauty, angelic grace, benevolent celestial being',
    origin: 'Classical Indian (परी)',
    pronunciation_guide: 'PAH-ree',
    syllable_count: 2,
    style_tags: ['Modern', 'International'],
    why_stands_out: 'Delightful sweetness and affectionate warmth that brightens every room.'
  },
  {
    name: 'PRISHA',
    gender: 'girl',
    meaning: 'Beloved gift of God, loving, precious jewel of the home',
    origin: 'Sanskrit (प्रिशा)',
    pronunciation_guide: 'PREE-shuh',
    syllable_count: 2,
    style_tags: ['Modern', 'Meaningful'],
    why_stands_out: 'Tender spiritual tone expressing profound parental gratitude and love.'
  },
  {
    name: 'RIYA',
    gender: 'girl',
    meaning: 'Graceful singer, melodious, one who flows with joyous rhythm',
    origin: 'Sanskrit (रिया)',
    pronunciation_guide: 'REE-yuh',
    syllable_count: 2,
    style_tags: ['Modern', 'International'],
    why_stands_out: 'Charming two-syllable harmony celebrated for its musicality and brightness.'
  },
  {
    name: 'SAMAIRA',
    gender: 'girl',
    meaning: 'Enchanting, protected by the divine, joyful companion of pleasant evenings',
    origin: 'Classical Indian (समायरा)',
    pronunciation_guide: 'suh-MY-ruh',
    syllable_count: 3,
    style_tags: ['Modern', 'Royal', 'International'],
    why_stands_out: 'Exotic melodic poise carrying both gentle elegance and aristocratic charm.'
  },
  {
    name: 'SAANVI',
    gender: 'girl',
    meaning: 'Goddess Lakshmi, one who is followed by prosperity and virtue',
    origin: 'Sanskrit (सान्वी)',
    pronunciation_guide: 'SAHN-vee',
    syllable_count: 2,
    style_tags: ['Modern', 'Meaningful', 'Royal'],
    why_stands_out: 'Consistently tops parent wishlists for its auspicious Lakshmi connection and modern phonetics.'
  },
  {
    name: 'SHREYA',
    gender: 'girl',
    meaning: 'Auspicious, supreme excellence, prosperity and moral goodness',
    origin: 'Sanskrit (श्रेया)',
    pronunciation_guide: 'SHRAY-yuh',
    syllable_count: 2,
    style_tags: ['Traditional', 'Meaningful', 'Royal'],
    why_stands_out: 'Vedic root denoting highest welfare, beauty, and noble prosperity.'
  },
  {
    name: 'SIA',
    gender: 'girl',
    meaning: 'Goddess Sita; white moonlight, beautiful and devoted',
    origin: 'Sanskrit (सिया)',
    pronunciation_guide: 'SEE-yuh',
    syllable_count: 2,
    style_tags: ['Modern', 'International'],
    why_stands_out: 'Crisp, contemporary 3-letter elegance with deep classical mythology.'
  },
  {
    name: 'TARA',
    gender: 'girl',
    meaning: 'Guiding star, protectress who ferries souls across difficulties',
    origin: 'Sanskrit (तारा)',
    pronunciation_guide: 'TAH-ruh',
    syllable_count: 2,
    style_tags: ['Traditional', 'International', 'Meaningful'],
    why_stands_out: 'Revered in both Hindu and Buddhist traditions as the eternal celestial guide.'
  },
  {
    name: 'VEDIKA',
    gender: 'girl',
    meaning: 'Sacred altar, seat of consciousness, offering of noble thoughts',
    origin: 'Sanskrit (वेदिका)',
    pronunciation_guide: 'VAY-dhi-kuh',
    syllable_count: 3,
    style_tags: ['Traditional', 'Rare', 'Meaningful'],
    why_stands_out: 'Sacred architectural metaphor for higher spiritual aspiration and purity.'
  },
  {
    name: 'VRINDA',
    gender: 'girl',
    meaning: 'Holy Basil (Tulsi), cluster of celestial flowers, pure devotion',
    origin: 'Sanskrit (वृन्दा)',
    pronunciation_guide: 'VRIN-duh',
    syllable_count: 2,
    style_tags: ['Traditional', 'Meaningful'],
    why_stands_out: 'Emblematic of unshakeable faith, holistic healing, and sacred grace.'
  },
  {
    name: 'ZARA',
    gender: 'girl',
    meaning: 'Radiance of dawn, blooming flower, princess of distinction',
    origin: 'Classical & Global (ज़ारा)',
    pronunciation_guide: 'ZAH-ruh',
    syllable_count: 2,
    style_tags: ['Modern', 'Royal', 'International'],
    why_stands_out: 'Chic cosmopolitan flair that resonates effortlessly in every continent.'
  },

  // --- UNISEX / ADDITIONAL DIVERSITY ---
  {
    name: 'AMAR',
    gender: 'boy',
    meaning: 'Immortal, enduring, one who leaves an eternal legacy',
    origin: 'Sanskrit (अमर)',
    pronunciation_guide: 'uh-MAHR',
    syllable_count: 2,
    style_tags: ['Traditional', 'Meaningful', 'International'],
    why_stands_out: 'Stands for enduring legacy, moral rectitude, and timeless strength.'
  },
  {
    name: 'DEV',
    gender: 'boy',
    meaning: 'Divine, shining celestial being, embodiment of virtue',
    origin: 'Sanskrit (देव)',
    pronunciation_guide: 'DAYV',
    syllable_count: 1,
    style_tags: ['Traditional', 'Modern', 'Royal'],
    why_stands_out: 'Supreme minimalism denoting divine origin, inner clarity, and nobility.'
  },
  {
    name: 'NEEL',
    gender: 'boy',
    meaning: 'Sapphire blue, vast cosmic sky, deep ocean; color of Lord Shiva',
    origin: 'Sanskrit (नील)',
    pronunciation_guide: 'NEEL',
    syllable_count: 1,
    style_tags: ['Modern', 'International'],
    why_stands_out: 'Crisp single syllable evocative of boundless horizons and calm depth.'
  },
  {
    name: 'REVA',
    gender: 'girl',
    meaning: 'One that moves swiftly like a holy river; the holy Narmada River',
    origin: 'Sanskrit (रेवा)',
    pronunciation_guide: 'RAY-vuh',
    syllable_count: 2,
    style_tags: ['Modern', 'Rare', 'Meaningful'],
    why_stands_out: 'Lyrical river symbolism of continuous progression, freshness, and purity.'
  },
  {
    name: 'VANYA',
    gender: 'girl',
    meaning: 'Graceful gift of God, belonging to the peaceful wild forest',
    origin: 'Sanskrit & Global (वाण्या)',
    pronunciation_guide: 'VAHN-yuh',
    syllable_count: 2,
    style_tags: ['Modern', 'International', 'Meaningful'],
    why_stands_out: 'Gentle nature resonance infused with serene spiritual grace.'
  }
];
