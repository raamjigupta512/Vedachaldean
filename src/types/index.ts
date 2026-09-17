/**
 * Core Type Definitions for Chaldean Baby Naming Consultation
 */

export interface BabyInputData {
  baby_name?: string; // Optional if already considering a working name
  gender: 'boy' | 'girl' | 'unisex';
  date_of_birth: string; // YYYY-MM-DD
  time_of_birth?: string; // HH:MM
  place_of_birth?: string; // City, Country
  family_surname?: string;
  naming_style?: 'modern' | 'traditional' | 'royal' | 'rare' | 'international' | 'balanced';
  cultural_style?: string; // e.g., 'Sanskrit', 'Vedic', 'Pan-Indian', 'Contemporary'
  preferred_initial?: string; // e.g., 'A', 'V', 'K'
  preferred_names?: string[]; // Existing favorite names
  names_to_avoid?: string[];
  religious_or_spiritual_preference?: string;
  language_preference?: string;
  naming_preferences?: string;
}

export interface LetterCalculation {
  letter: string;
  value: number;
}

export interface NameAnalysis {
  name: string;
  gender: 'boy' | 'girl' | 'unisex';
  meaning: string;
  origin: string; // Sanskrit, Vedic, Hindi, etc.
  letter_calculation: LetterCalculation[];
  compound_number: number;
  root_number: number;
  ruling_planet: string;
  compound_significance: string;
  compatibility: 'Highly Compatible' | 'Supportive' | 'Neutral' | 'Caution';
  compatibility_reason: string;
  nakshatra_compatibility: 'Highly Compatible' | 'Supportive' | 'Neutral' | 'Not Available';
  pronunciation_guide: string;
  syllable_count: number;
  style_tags: string[]; // ['Modern', 'Sanskrit', 'Royal']
  score: number; // 0 - 100
  breakdown_scores: {
    chaldean: number; // Max 40
    meaning: number; // Max 20
    vedic: number; // Max 15
    pronunciation: number; // Max 10
    cultural: number; // Max 10
    appeal: number; // Max 5
  };
  why_stands_out?: string;
  first_letter: string;
}

export interface NumerologyBlueprint {
  birth_number: number;
  birth_compound?: number;
  birth_planet: string;
  destiny_number: number;
  destiny_compound: number;
  destiny_planet: string;
  day_vibration: number;
  month_vibration: number;
  year_vibration: number;
  relationship_summary: string;
  preferred_name_numbers: number[]; // e.g. [1, 5, 6]
  supportive_numbers: number[];
  neutral_numbers: number[];
  caution_numbers: number[];
  favorable_compounds: number[];
}

export interface VedicProfile {
  moon_sign?: string; // Rashi
  nakshatra?: string;
  nakshatra_pada?: number;
  deity?: string;
  planetary_lord?: string;
  traditional_syllables: string[];
  is_time_reliable: boolean;
}

export interface ConsultationReportData {
  input: BabyInputData;
  blueprint: NumerologyBlueprint;
  vedic: VedicProfile;
  candidate_names: NameAnalysis[];
  top_20: NameAnalysis[];
  top_10: NameAnalysis[];
  top_3: {
    best_overall: NameAnalysis;
    strong_alternative: NameAnalysis;
    unique_alternative: NameAnalysis;
  };
  category_winners: {
    royal?: NameAnalysis;
    traditional?: NameAnalysis;
    modern?: NameAnalysis;
    rare?: NameAnalysis;
    international?: NameAnalysis;
    meaningful?: NameAnalysis;
  };
  surname_analysis?: {
    surname: string;
    surname_compound: number;
    surname_root: number;
    combined_examples: Array<{
      first_name: string;
      first_compound: number;
      combined_name: string;
      combined_compound: number;
      combined_root: number;
      harmony_note: string;
    }>;
  };
  decision_guide: Array<{
    preference: string;
    recommended_name: string;
    number: string;
    rationale: string;
  }>;
}

export interface CustomerOrderDetails {
  order_id: string;
  order_date: string;
  parent_name: string;
  whatsapp_number: string;
  country_code: string;
  email: string;
  amount_inr: number;
  amount_usd: number;
  currency: 'INR' | 'USD';
  payment_method: 'UPI' | 'Card' | 'NetBanking' | 'ApplePay';
  baby_details: BabyInputData;
  package_tier?: 'report' | 'consultation';
  package_name?: string;
  status: 'confirmed' | 'delivered';
  delivery_promised_hours: number;
}

