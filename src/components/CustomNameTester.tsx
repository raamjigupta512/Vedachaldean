import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calculator,
  Plus,
  Check,
  Info,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  BookmarkPlus
} from 'lucide-react';
import {
  calculateChaldeanName,
  COMPOUND_INTERPRETATIONS,
  evaluateNameCompatibility,
  PLANETARY_RULERS,
  CHALDEAN_MAP
} from '../utils/chaldean';
import { BabyInputData, NumerologyBlueprint } from '../types';

interface CustomNameTesterProps {
  blueprint: NumerologyBlueprint;
  input: BabyInputData;
  initialName?: string;
  onAddPreferredName: (name: string) => void;
}

export const CustomNameTester: React.FC<CustomNameTesterProps> = ({
  blueprint,
  input,
  initialName = '',
  onAddPreferredName
}) => {
  const [testFirstName, setTestFirstName] = useState(initialName || 'AARAV');
  const [testSurname, setTestSurname] = useState(input.family_surname || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (initialName) {
      setTestFirstName(initialName.toUpperCase());
    }
  }, [initialName]);

  // Calculations
  const firstCalc = calculateChaldeanName(testFirstName);
  const surnameCalc = calculateChaldeanName(testSurname);
  const fullString = `${testFirstName.trim()} ${testSurname.trim()}`.trim();
  const fullCalc = calculateChaldeanName(fullString);

  const firstCompatibility = evaluateNameCompatibility(
    firstCalc.root_number,
    firstCalc.compound_number,
    blueprint.birth_number,
    blueprint.destiny_number
  );

  const fullCompatibility = evaluateNameCompatibility(
    fullCalc.root_number,
    fullCalc.compound_number,
    blueprint.birth_number,
    blueprint.destiny_number
  );

  const firstCompoundInfo = COMPOUND_INTERPRETATIONS[firstCalc.compound_number];
  const fullCompoundInfo = COMPOUND_INTERPRETATIONS[fullCalc.compound_number];

  // Spelling variations engine
  const getVariants = (name: string) => {
    const upper = name.toUpperCase().replace(/[^A-Z]/g, '');
    const variants: { variant: string; note: string }[] = [];

    // Common linguistic vowel variations in Indian names
    if (upper.includes('EE')) {
      variants.push({ variant: upper.replace(/EE/g, 'I'), note: 'Double E → I variation' });
    } else if (upper.includes('I')) {
      variants.push({ variant: upper.replace(/I/g, 'EE'), note: 'I → Double E variation' });
    }

    if (upper.includes('OO')) {
      variants.push({ variant: upper.replace(/OO/g, 'U'), note: 'Double O → U variation' });
    } else if (upper.includes('U')) {
      variants.push({ variant: upper.replace(/U/g, 'OO'), note: 'U → Double O variation' });
    }

    if (upper.endsWith('AN') && !upper.endsWith('ANN')) {
      variants.push({ variant: upper + 'N', note: 'Soft nasal extension (+N)' });
    }

    if (upper.startsWith('V')) {
      variants.push({ variant: 'W' + upper.slice(1), note: 'V → W variant (Same Chaldean value 6)' });
    }

    return variants.slice(0, 3);
  };

  const variants = getVariants(testFirstName);

  const handleSaveToFavorites = () => {
    if (testFirstName.trim()) {
      onAddPreferredName(testFirstName.trim());
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0e1738] via-[#0b132b] to-[#111a33] border border-[#c5a059]/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/30">
            <Calculator className="w-5 h-5 text-[#dec477]" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[#fbf8ee]">
              Live Chaldean Name Calculator &amp; Tester
            </h1>
            <p className="text-xs text-[#9ca3af]">
              Real-Time Letter Breakdown, Compound Interpretation &amp; Surname Harmonic Resonance
            </p>
          </div>
        </div>
      </div>

      {/* Input Stage */}
      <div className="p-6 rounded-2xl bg-[#0b132b] border border-[#c5a059]/20 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-xs font-semibold text-[#dec477] uppercase tracking-wider mb-1.5">
              Candidate First Name
            </label>
            <input
              type="text"
              value={testFirstName}
              onChange={e => setTestFirstName(e.target.value.toUpperCase())}
              placeholder="e.g. AARAV, ADVIK, DIYA"
              className="w-full px-4 py-3 text-base font-heading font-bold tracking-wider bg-[#111a33] border border-white/10 rounded-xl text-[#fbf8ee] focus:border-[#c5a059] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#dec477] uppercase tracking-wider mb-1.5">
              Family Surname (Optional)
            </label>
            <input
              type="text"
              value={testSurname}
              onChange={e => setTestSurname(e.target.value.toUpperCase())}
              placeholder="e.g. SHARMA, PATEL, IYER"
              className="w-full px-4 py-3 text-base font-heading font-bold tracking-wider bg-[#111a33] border border-white/10 rounded-xl text-[#fbf8ee] focus:border-[#c5a059] focus:outline-none"
            />
          </div>

        </div>

        {/* Quick Quick-Picks */}
        <div className="flex items-center gap-2 flex-wrap pt-2 text-xs">
          <span className="text-[#9ca3af]">Try Popular Classics:</span>
          {['AARAV', 'ADVIK', 'VIHAAN', 'VEDANT', 'AANYA', 'VEDIKA', 'SAANVI'].map(name => (
            <button
              key={name}
              type="button"
              onClick={() => setTestFirstName(name)}
              className="px-2.5 py-1 rounded-md bg-[#16223f] text-[#dec477] border border-[#c5a059]/20 hover:bg-[#1c2954] transition-colors"
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* First Name Calculation Breakdown Card */}
      <div className="p-6 rounded-3xl bg-[#0e1738] border-2 border-[#c5a059]/40 shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#dec477] font-semibold">
              First Name Vibration
            </span>
            <h2 className="text-3xl font-heading font-extrabold text-[#fbf8ee] mt-0.5">
              {testFirstName || 'ENTER A NAME'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveToFavorites}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-[#dec477]/15 text-[#dec477] border border-[#dec477]/40 hover:bg-[#dec477]/25 transition-all"
            >
              {savedSuccess ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
              {savedSuccess ? 'Added to Wishlist!' : 'Add to Baby Wishlist'}
            </button>
          </div>
        </div>

        {/* Interactive Letter Blocks */}
        <div>
          <span className="text-xs font-semibold text-[#9ca3af] block mb-2">
            Letter-by-Letter Chaldean Value Assignment:
          </span>
          <div className="flex flex-wrap gap-2">
            {firstCalc.letter_calculation.map((item, idx) => (
              <div
                key={idx}
                className="w-12 h-16 rounded-xl bg-[#111a33] border border-[#c5a059]/30 flex flex-col items-center justify-center text-center shadow-inner"
              >
                <span className="font-heading font-bold text-base text-[#fbf8ee]">{item.letter}</span>
                <span className="text-xs font-mono font-bold text-[#dec477] mt-1 bg-[#dec477]/10 px-2 py-0.5 rounded">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Compound & Root Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          
          <div className="p-4 rounded-xl bg-[#111a33]/80 border border-white/10">
            <span className="text-[10px] uppercase text-[#9ca3af] block">Compound Total</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-heading font-extrabold text-[#dec477]">
                {firstCalc.compound_number}
              </span>
              <span className="text-xs text-[#9ca3af]">
                (Sum of all letters)
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#111a33]/80 border border-white/10">
            <span className="text-[10px] uppercase text-[#9ca3af] block">Root Number</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-heading font-extrabold text-[#fbf8ee]">
                {firstCalc.root_number}
              </span>
              <span className="text-xs text-[#9ca3af]">
                ({PLANETARY_RULERS[firstCalc.root_number]?.name})
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#111a33]/80 border border-white/10">
            <span className="text-[10px] uppercase text-[#9ca3af] block">Compatibility Level</span>
            <div className="mt-1">
              <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold ${
                firstCompatibility.compatibility === 'Highly Compatible'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : firstCompatibility.compatibility === 'Supportive'
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                {firstCompatibility.compatibility}
              </span>
            </div>
          </div>

        </div>

        {/* Compound Meaning Deep Dive */}
        {firstCompoundInfo && (
          <div className="p-4 rounded-xl bg-[#091124] border border-[#c5a059]/20 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#dec477]/15 text-[#dec477]">
                Compound {firstCalc.compound_number}: {firstCompoundInfo.title}
              </span>
              <span className="text-[10px] text-gray-400">
                Classification: <strong>{firstCompoundInfo.category}</strong>
              </span>
            </div>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              {firstCompoundInfo.description}
            </p>
          </div>
        )}

        {/* Natal Compatibility Rationale */}
        <div className="p-4 rounded-xl bg-[#111a33]/50 border border-white/5 text-xs text-[#cbd5e1] leading-relaxed">
          <span className="font-bold text-[#dec477] block mb-1">
            Resonance with Baby&apos;s Blueprint (Birth {blueprint.birth_number} / Destiny {blueprint.destiny_number}):
          </span>
          {firstCompatibility.reason}
        </div>

      </div>

      {/* Combined Full Name Analysis (If Surname Provided) */}
      {testSurname.trim() && (
        <div className="p-6 rounded-3xl bg-[#0b132b] border border-[#c5a059]/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#dec477] font-semibold">
                Full Legal Name Vibration
              </span>
              <h3 className="text-xl font-heading font-bold text-[#fbf8ee]">
                {fullString}
              </h3>
            </div>
            <span className="text-sm font-mono font-bold text-[#dec477] px-3 py-1 rounded bg-[#dec477]/10">
              Total {fullCalc.compound_number} → Root {fullCalc.root_number} ({PLANETARY_RULERS[fullCalc.root_number]?.name})
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#111a33]/60 border border-white/5 text-xs text-[#d1d5db] space-y-2">
            <p>
              First Name alone contributes <strong>{firstCalc.compound_number}/{firstCalc.root_number}</strong>. Family surname contributes <strong>{surnameCalc.compound_number}/{surnameCalc.root_number}</strong>.
            </p>
            <p>
              When combined, the full name resonates to <strong>{fullCalc.compound_number}/{fullCalc.root_number}</strong>. {fullCompoundInfo?.description || 'Maintains balanced vibration for legal and official registry.'}
            </p>
          </div>
        </div>
      )}

      {/* Spelling Variants Explorer */}
      {variants.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#091124] border border-[#c5a059]/20 space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#dec477]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#dec477]">
              Linguistically Defensible Spelling Variations:
            </h4>
          </div>
          <p className="text-xs text-gray-400">
            Evaluating subtle spelling adjustments that preserve natural pronunciation while shifting the Chaldean compound total:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {variants.map(v => {
              const vCalc = calculateChaldeanName(v.variant);
              return (
                <div
                  key={v.variant}
                  onClick={() => setTestFirstName(v.variant)}
                  className="p-3 rounded-xl bg-[#111a33] border border-white/10 hover:border-[#c5a059]/40 transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-heading font-bold text-white text-sm">{v.variant}</span>
                    <span className="font-mono text-xs text-[#dec477]">{vCalc.compound_number}/{vCalc.root_number}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 block">{v.note}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
