import React, { useState, useMemo } from 'react';
import { 
  Sparkles, Calculator, Hash, ArrowRight, ShieldCheck, 
  AlertTriangle, CheckCircle2, RotateCcw, Info, Flame, 
  Droplets, Wind, Mountain, Sun, Star, Compass
} from 'lucide-react';
import { 
  CHALDEAN_MAP, 
  PLANETARY_RULERS, 
  COMPOUND_INTERPRETATIONS, 
  calculateChaldeanName, 
  reduceToRoot 
} from '../utils/chaldean';

interface QuickNameScoreSectionProps {
  onOpenOrder?: (name?: string) => void;
  currency?: 'INR' | 'USD';
}

const PRESET_NAMES = [
  'Aarav', 'Ananya', 'Dev', 'Mira', 'Rohan', 'Isha', 'Siddharth', 'Kavya', 'Leo', 'Eleanor'
];

export const QuickNameScoreSection: React.FC<QuickNameScoreSectionProps> = ({ 
  onOpenOrder,
  currency = 'INR'
}) => {
  const [inputName, setInputName] = useState<string>('Aarav');
  const [showKeypadReference, setShowKeypadReference] = useState<boolean>(false);

  // Compute Chaldean calculation using the authentic character-to-number mapping
  const calculation = useMemo(() => {
    const trimmed = inputName.trim();
    if (!trimmed) {
      return null;
    }
    return calculateChaldeanName(trimmed);
  }, [inputName]);

  // Derive score and interpretation
  const scoreData = useMemo(() => {
    if (!calculation || calculation.letter_calculation.length === 0) {
      return null;
    }

    const { compound_number, root_number } = calculation;
    const compoundInfo = COMPOUND_INTERPRETATIONS[compound_number];
    const planetInfo = PLANETARY_RULERS[root_number] || {
      name: 'Cosmic Ruler',
      sanskrit: 'Graha',
      element: 'Ether',
      traits: 'Unique celestial vibration'
    };

    // Baseline score based on compound classification
    let baseScore = 80;
    let tier: 'Exalted' | 'Fortunate' | 'Dual' | 'Caution' = 'Fortunate';
    let tierBadgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    let barColor = 'bg-emerald-600';

    if (compoundInfo) {
      if (compoundInfo.category === 'Exalted') {
        baseScore = 95;
        tier = 'Exalted';
        tierBadgeClass = 'bg-amber-100 text-amber-900 border-amber-300';
        barColor = 'bg-[#C5A059]';
      } else if (compoundInfo.category === 'Fortunate') {
        baseScore = 88;
        tier = 'Fortunate';
        tierBadgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300';
        barColor = 'bg-emerald-600';
      } else if (compoundInfo.category === 'Dual/Testing') {
        baseScore = 74;
        tier = 'Dual';
        tierBadgeClass = 'bg-blue-100 text-blue-800 border-blue-300';
        barColor = 'bg-blue-600';
      } else if (compoundInfo.category === 'Caution') {
        baseScore = 58;
        tier = 'Caution';
        tierBadgeClass = 'bg-rose-100 text-rose-800 border-rose-300';
        barColor = 'bg-rose-600';
      }
    } else {
      // Default fallback for numbers beyond the mapped 10-51
      if ([1, 3, 5, 6].includes(root_number)) {
        baseScore = 86;
        tier = 'Fortunate';
      } else if ([4, 8].includes(root_number)) {
        baseScore = 65;
        tier = 'Dual';
        tierBadgeClass = 'bg-amber-100 text-amber-900 border-amber-300';
      } else {
        baseScore = 78;
        tier = 'Dual';
      }
    }

    // Minor harmonizer adjustments based on root number
    if ([1, 5, 6].includes(root_number)) {
      baseScore = Math.min(99, baseScore + 2);
    }

    return {
      score: baseScore,
      tier,
      tierBadgeClass,
      barColor,
      compoundInfo,
      planetInfo
    };
  }, [calculation]);

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'Fire':
        return <Flame className="w-3.5 h-3.5 text-amber-600" />;
      case 'Water':
        return <Droplets className="w-3.5 h-3.5 text-blue-500" />;
      case 'Air':
        return <Wind className="w-3.5 h-3.5 text-teal-600" />;
      case 'Earth':
      case 'Earth/Air':
        return <Mountain className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Sun className="w-3.5 h-3.5 text-[#C5A059]" />;
    }
  };

  const handlePresetClick = (name: string) => {
    setInputName(name);
  };

  const handleOrderWithCurrentName = () => {
    if (onOpenOrder) {
      onOpenOrder(inputName.trim() || undefined);
    }
  };

  return (
    <section 
      id="quick-name-score"
      aria-label="Quick Name Score Tool"
      className="py-20 sm:py-28 bg-[#F5F2EB] relative overflow-hidden border-t border-[#E6E2DA]"
    >
      {/* Subtle geometric background motif */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#C5A059_0.75px,transparent_0.75px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D6CFC4] bg-[#FAF8F5] text-[11px] font-sans font-semibold tracking-[0.2em] text-[#8C6D2D] uppercase shadow-xs mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#8C6D2D]" />
            <span>INTERACTIVE VIBRATION CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] font-normal tracking-tight">
            Quick Name Score
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#57534E] font-sans leading-relaxed">
            Test any candidate first name or surname below. Experience the ancient Chaldean character-to-number mapping and discover its preliminary vibrational resonance score.
          </p>
        </div>

        {/* Calculator Main Container */}
        <div className="max-w-4xl mx-auto bg-[#FAF8F5] rounded-3xl border-2 border-[#C5A059]/40 p-6 sm:p-10 shadow-lg">
          {/* Input & Presets Bar */}
          <div>
            <label 
              htmlFor="quick-name-input"
              className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#57534E] mb-2"
            >
              Enter Baby or Candidate Name
            </label>
            <div className="relative flex items-center">
              <input
                id="quick-name-input"
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Type a name, e.g. Aarav, Maya, Siddharth..."
                maxLength={30}
                className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl border-2 border-[#D6CFC4] bg-[#F5F2EB] text-[#1C1917] font-serif text-lg sm:text-2xl placeholder:font-sans placeholder:text-sm placeholder:text-[#A8A29E] focus:outline-none focus:border-[#C5A059] transition-colors pr-24 shadow-inner"
              />
              {inputName && (
                <button
                  type="button"
                  onClick={() => setInputName('')}
                  className="absolute right-3.5 px-2.5 py-1.5 rounded-lg text-xs font-sans text-[#78716C] hover:text-[#1C1917] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  title="Clear input"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Presets Pills */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-sans text-[#78716C] mr-1">Quick Try:</span>
              {PRESET_NAMES.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handlePresetClick(name)}
                  className={`px-2.5 py-1 rounded-full text-xs font-sans font-medium transition-all cursor-pointer ${
                    inputName.trim().toLowerCase() === name.toLowerCase()
                      ? 'bg-[#1C1917] text-[#FAF8F5] shadow-xs'
                      : 'bg-[#F5F2EB] text-[#57534E] border border-[#E6E2DA] hover:border-[#C5A059] hover:text-[#1C1917]'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Real-Time Calculation Results Display */}
          {calculation && calculation.letter_calculation.length > 0 && scoreData ? (
            <div className="mt-8 pt-8 border-t border-[#E6E2DA]">
              {/* Step 1: Character-to-Number Mapping Chips */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#8C6D2D] flex items-center gap-1.5">
                    <Hash className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Chaldean Letter-by-Letter Acoustic Breakdown</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowKeypadReference(!showKeypadReference)}
                    className="text-[11px] font-sans text-[#8C6D2D] hover:text-[#1C1917] underline cursor-pointer flex items-center gap-1"
                  >
                    <Info className="w-3 h-3" />
                    <span>{showKeypadReference ? 'Hide Keypad Reference' : 'View Chaldean Keypad'}</span>
                  </button>
                </div>

                {/* Interactive Letter Blocks */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  {calculation.letter_calculation.map((item, idx) => (
                    <div 
                      key={`${item.letter}-${idx}`}
                      className="flex flex-col items-center bg-[#F5F2EB] border border-[#D6CFC4] rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-2xs hover:border-[#C5A059] transition-colors min-w-[44px]"
                    >
                      <span className="font-serif text-base sm:text-lg font-bold text-[#1C1917]">
                        {item.letter}
                      </span>
                      <span className="mt-0.5 text-[11px] font-sans font-semibold text-[#8C6D2D] bg-[#FAF8F5] px-1.5 py-0.2 rounded border border-[#E6E2DA]">
                        {item.value}
                      </span>
                    </div>
                  ))}

                  {/* Equal & Sum Formula Badge */}
                  <div className="flex items-center gap-2 pl-1 sm:pl-2">
                    <span className="text-lg font-serif text-[#78716C] font-semibold">=</span>
                    <div className="bg-[#FAF8F5] border-2 border-[#C5A059] rounded-xl px-4 py-2 text-center shadow-xs">
                      <div className="text-[10px] font-sans uppercase tracking-widest text-[#78716C] font-medium">
                        Compound Total
                      </div>
                      <div className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917]">
                        {calculation.compound_number}
                      </div>
                    </div>
                    <span className="text-lg font-serif text-[#78716C] font-semibold">→</span>
                    <div className="bg-[#1C1917] text-[#FAF8F5] rounded-xl px-4 py-2 text-center shadow-sm">
                      <div className="text-[10px] font-sans uppercase tracking-widest text-[#C5A059] font-medium">
                        Single Root
                      </div>
                      <div className="font-serif text-xl sm:text-2xl font-bold text-[#FAF8F5]">
                        {calculation.root_number}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optional Chaldean Letter Map Table / Reference Drawer */}
              {showKeypadReference && (
                <div className="mt-4 p-4 rounded-2xl bg-[#F5F2EB] border border-[#D6CFC4] animate-in fade-in duration-200">
                  <div className="text-xs font-sans font-semibold text-[#1C1917] mb-2 flex items-center justify-between">
                    <span>Authentic Chaldean Alphabet Frequency Table:</span>
                    <span className="text-[10px] text-[#78716C] font-normal italic">(9 is sacred and omitted from standard alphabets)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-center text-xs">
                    {[
                      { num: 1, letters: 'A, I, J, Q, Y' },
                      { num: 2, letters: 'B, K, R' },
                      { num: 3, letters: 'C, G, L, S' },
                      { num: 4, letters: 'D, M, T' },
                      { num: 5, letters: 'E, H, N, X' },
                      { num: 6, letters: 'U, V, W' },
                      { num: 7, letters: 'O, Z' },
                      { num: 8, letters: 'F, P' }
                    ].map((row) => (
                      <div key={row.num} className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E6E2DA]">
                        <div className="font-serif font-bold text-[#8C6D2D] text-sm">Value {row.num}</div>
                        <div className="font-sans text-[11px] text-[#57534E] mt-0.5">{row.letters}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Score Card & Vibrational Resonance Breakdown */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
                {/* Score Dial / Pillar Card */}
                <div className="md:col-span-4 bg-[#F5F2EB] rounded-2xl border-2 border-[#C5A059]/40 p-5 sm:p-6 flex flex-col justify-between text-center relative overflow-hidden shadow-xs">
                  <div>
                    <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#78716C] font-semibold">
                      Chaldean Vibration Index
                    </div>
                    <div className="mt-3 flex items-baseline justify-center gap-1">
                      <span className="font-serif text-5xl sm:text-6xl font-bold text-[#1C1917] tracking-tight">
                        {scoreData.score}
                      </span>
                      <span className="text-lg font-serif text-[#78716C]">/100</span>
                    </div>

                    {/* Vibration Tier Tag */}
                    <div className="mt-3 flex justify-center">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-sans font-semibold border ${scoreData.tierBadgeClass}`}>
                        {scoreData.tier === 'Exalted' && <Sparkles className="w-3.5 h-3.5 text-amber-700" />}
                        {scoreData.tier === 'Fortunate' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                        {scoreData.tier === 'Dual' && <Star className="w-3.5 h-3.5 text-blue-700" />}
                        {scoreData.tier === 'Caution' && <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />}
                        <span>{scoreData.tier} Resonance</span>
                      </span>
                    </div>
                  </div>

                  {/* Progress Meter */}
                  <div className="mt-5 pt-4 border-t border-[#E6E2DA]">
                    <div className="w-full bg-[#EAE5DA] rounded-full h-2.5 overflow-hidden">
                      <div 
                        className={`h-2.5 rounded-full transition-all duration-500 ${scoreData.barColor}`}
                        style={{ width: `${scoreData.score}%` }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-[10px] font-sans text-[#78716C]">
                      <span>Caution (50)</span>
                      <span>Harmonious (80)</span>
                      <span>Exalted (95+)</span>
                    </div>
                  </div>
                </div>

                {/* Ruling Planet & Compound Insights */}
                <div className="md:col-span-8 bg-[#F5F2EB] rounded-2xl border border-[#D6CFC4] p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    {/* Planet & Sanskrit Lord Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E6E2DA]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#C5A059] flex items-center justify-center text-base shadow-xs text-[#8C6D2D]">
                          {calculation.root_number}
                        </div>
                        <div>
                          <div className="text-xs font-sans text-[#78716C]">
                            Ruling Celestial Archetype:
                          </div>
                          <div className="font-serif text-lg font-bold text-[#1C1917] flex items-center gap-2">
                            <span>{scoreData.planetInfo.name}</span>
                            <span className="text-xs font-sans font-medium text-[#8C6D2D] px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#D6CFC4]">
                              {scoreData.planetInfo.sanskrit}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#D6CFC4] text-xs font-sans text-[#57534E]">
                        {getElementIcon(scoreData.planetInfo.element)}
                        <span>{scoreData.planetInfo.element} Element</span>
                      </div>
                    </div>

                    {/* Compound Title & Meaning */}
                    <div className="mt-4">
                      <div className="text-[11px] font-sans uppercase tracking-wider text-[#8C6D2D] font-semibold">
                        Compound Number {calculation.compound_number} Significance
                      </div>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-[#1C1917] mt-0.5">
                        {scoreData.compoundInfo ? scoreData.compoundInfo.title : `Vibration ${calculation.compound_number}/${calculation.root_number}`}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#57534E] font-sans leading-relaxed mt-1.5">
                        {scoreData.compoundInfo 
                          ? scoreData.compoundInfo.description
                          : `Carries the singular influence of root number ${calculation.root_number} (${scoreData.planetInfo.name}), fostering ${scoreData.planetInfo.traits.toLowerCase()}.`}
                      </p>
                    </div>

                    {/* Archetypal Traits Tag */}
                    <div className="mt-3.5 pt-3 border-t border-[#E6E2DA] flex items-center gap-2 text-xs font-sans">
                      <span className="font-semibold text-[#1C1917]">Key Traits:</span>
                      <span className="text-[#57534E] italic">{scoreData.planetInfo.traits}</span>
                    </div>
                  </div>

                  {/* Atelier Notice & Order CTA */}
                  <div className="mt-5 pt-4 border-t border-[#E6E2DA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#C5A059]/40">
                    <div className="text-xs text-[#57534E] font-sans flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#8C6D2D] shrink-0 mt-0.5" />
                      <span>
                        Want to test <strong>{inputName.trim()}</strong> against baby's exact birth date, Nakshatra, and full surname?
                      </span>
                    </div>

                    <button
                      type="button"
                      id="btn-quick-score-order"
                      onClick={handleOrderWithCurrentName}
                      className="px-4 py-2 rounded-xl bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524] text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <span>Analyze with Birth Date</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-8 py-10 text-center text-[#78716C] font-sans text-sm border-t border-[#E6E2DA]">
              Please type a name above to calculate its Chaldean frequency.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
