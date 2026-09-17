import React, { useState } from 'react';
import { 
  Sparkles, Sun, Compass, X, Check, Calendar, ChevronRight, Info, ShieldCheck, Flame, Droplets, Wind, Mountain
} from 'lucide-react';
import { ZODIAC_SIGNS, ZodiacSignDetail, getZodiacSignFromDob } from '../utils/zodiac';

interface ZodiacFinderTooltipProps {
  dob: string;
  onSelectDate?: (dateStr: string) => void;
  babyStatus?: 'born' | 'expecting';
  className?: string;
}

export const ZodiacFinderTooltip: React.FC<ZodiacFinderTooltipProps> = ({
  dob,
  onSelectDate,
  babyStatus = 'born',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSignId, setSelectedSignId] = useState<string | null>(null);
  const [elementFilter, setElementFilter] = useState<'All' | 'Fire' | 'Earth' | 'Air' | 'Water'>('All');

  const currentSign = getZodiacSignFromDob(dob);

  // When modal opens or currentSign changes, default selectedSign to currentSign
  const activeSign = selectedSignId 
    ? ZODIAC_SIGNS.find((s) => s.id === selectedSignId) || currentSign || ZODIAC_SIGNS[0]
    : currentSign || ZODIAC_SIGNS[0];

  const filteredSigns = elementFilter === 'All'
    ? ZODIAC_SIGNS
    : ZODIAC_SIGNS.filter((s) => s.element === elementFilter);

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'Fire':
        return <Flame className="w-3 h-3 text-amber-600" />;
      case 'Water':
        return <Droplets className="w-3 h-3 text-blue-500" />;
      case 'Air':
        return <Wind className="w-3 h-3 text-teal-600" />;
      case 'Earth':
        return <Mountain className="w-3 h-3 text-emerald-600" />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Trigger Button & Status Badge near DOB Input */}
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        <button
          type="button"
          id="btn-zodiac-finder-trigger"
          onClick={() => {
            if (currentSign) {
              setSelectedSignId(currentSign.id);
            }
            setIsOpen(true);
          }}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-sans font-medium text-[#8C6D2D] bg-[#F5F2EB] hover:bg-[#EAE5DA] border border-[#D6CFC4] hover:border-[#C5A059] transition-all cursor-pointer shadow-2xs group"
          title="Open Astrological Zodiac Sun Sign Finder"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A059] group-hover:rotate-12 transition-transform" />
          <span className="font-semibold">Zodiac Finder</span>
        </button>

        {currentSign ? (
          <button
            type="button"
            onClick={() => {
              setSelectedSignId(currentSign.id);
              setIsOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-sans font-medium text-[#1C1917] bg-[#FAF8F5] border border-[#C5A059]/50 hover:border-[#C5A059] transition-all cursor-pointer"
            title="Click to view full astrological & acoustic harmony details"
          >
            <span className="text-xs">{currentSign.symbol}</span>
            <span className="font-serif font-semibold">{currentSign.name}</span>
            <span className="text-[10px] text-[#78716C]">({currentSign.rashiEnglish})</span>
            <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
            <span className="text-[10px] text-[#8C6D2D] font-medium">{currentSign.element}</span>
          </button>
        ) : (
          <span className="text-[11px] text-[#78716C] font-sans italic">
            Select birth date to verify sign
          </span>
        )}
      </div>

      {/* Zodiac Modal / Popover Overlay */}
      {isOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="zodiac-finder-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF8F5] rounded-2xl border-2 border-[#C5A059]/40 shadow-2xl p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E6E2DA]">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F5F2EB] border border-[#D6CFC4] text-[10px] font-sans font-semibold uppercase tracking-widest text-[#8C6D2D]">
                  <Compass className="w-3 h-3 text-[#C5A059]" />
                  <span>Astrological Sun Sign Guide</span>
                </div>
                <h3 
                  id="zodiac-finder-title"
                  className="mt-1.5 text-xl sm:text-2xl font-serif font-medium text-[#1C1917]"
                >
                  Child's Zodiac & Vedic Rashi Harmony
                </h3>
                <p className="mt-1 text-xs text-[#57534E] font-sans">
                  {babyStatus === 'born' 
                    ? "Confirm your child's celestial sun sign and acoustic planetary ruler based on date of birth."
                    : "Explore expected zodiac signs around your due date to preview ruling celestial energies."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-[#78716C] hover:text-[#1C1917] hover:bg-[#F5F2EB] transition-colors cursor-pointer"
                aria-label="Close Zodiac Finder"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Active / Detected Sign Highlight Card */}
            {activeSign && (
              <div className="mt-5 p-5 sm:p-6 rounded-xl bg-[#F5F2EB] border-2 border-[#C5A059]/50 relative overflow-hidden shadow-xs">
                <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-10 flex items-center justify-center font-serif text-9xl select-none">
                  {activeSign.symbol}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#C5A059] flex items-center justify-center text-2xl shadow-xs shrink-0">
                      {activeSign.symbol}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl sm:text-2xl font-serif font-medium text-[#1C1917]">
                          {activeSign.name}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#D6CFC4] font-serif text-[#8C6D2D]">
                          {activeSign.rashiSanskrit} ({activeSign.rashiEnglish})
                        </span>
                      </div>
                      <div className="text-xs font-sans text-[#78716C] mt-0.5 flex items-center gap-2">
                        <span className="font-semibold text-[#1C1917]">{activeSign.dateRange}</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          {getElementIcon(activeSign.element)}
                          {activeSign.element} Element
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Planet & Status Tag */}
                  <div className="text-left sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-[#E6E2DA]">
                    <div className="text-[10px] font-sans uppercase tracking-widest text-[#78716C]">
                      Ruling Celestial Body
                    </div>
                    <div className="text-xs sm:text-sm font-sans font-semibold text-[#1C1917] mt-0.5">
                      {activeSign.rulingPlanet}
                    </div>
                    <div className="text-[10px] text-[#8C6D2D] font-serif">
                      {activeSign.planetaryLordSanskrit}
                    </div>
                  </div>
                </div>

                {/* Essence & Auspicious Sounds */}
                <div className="mt-4 pt-4 border-t border-[#E6E2DA] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-[#1C1917] font-sans">Auspicious Acoustic Sounds: </span>
                    <span className="text-[#8C6D2D] font-serif font-semibold">{activeSign.auspiciousSounds}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-[#1C1917] font-sans">Core Archetype: </span>
                    <span className="text-[#57534E]">{activeSign.traits.join(', ')}</span>
                  </div>
                </div>
                
                <p className="mt-2.5 text-xs text-[#57534E] leading-relaxed italic font-serif">
                  "{activeSign.essence}"
                </p>

                {currentSign && currentSign.id === activeSign.id && (
                  <div className="mt-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-[11px] font-sans font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Exact Sun Sign Confirmed for your entered date: {dob}</span>
                  </div>
                )}
              </div>
            )}

            {/* 12-Sign Directory & Element Filter */}
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#57534E]">
                  Browse All 12 Signs & Date Spans
                </span>

                {/* Element Filter Pills */}
                <div className="flex items-center gap-1 bg-[#F5F2EB] p-1 rounded-lg border border-[#E6E2DA]">
                  {(['All', 'Fire', 'Earth', 'Air', 'Water'] as const).map((elem) => (
                    <button
                      key={elem}
                      type="button"
                      onClick={() => setElementFilter(elem)}
                      className={`px-2 py-0.5 text-[10px] font-sans font-medium rounded-md transition-all cursor-pointer ${
                        elementFilter === elem
                          ? 'bg-[#1C1917] text-[#FAF8F5] shadow-xs'
                          : 'text-[#78716C] hover:text-[#1C1917]'
                      }`}
                    >
                      {elem}
                    </button>
                  ))}
                </div>
              </div>

              {/* 12 Signs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {filteredSigns.map((sign) => {
                  const isSelected = activeSign.id === sign.id;
                  const isBabySign = currentSign?.id === sign.id;

                  return (
                    <button
                      key={sign.id}
                      type="button"
                      onClick={() => setSelectedSignId(sign.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                        isSelected
                          ? 'bg-[#FAF8F5] border-2 border-[#C5A059] shadow-xs'
                          : 'bg-[#F5F2EB] border-[#E6E2DA] hover:border-[#D6CFC4] hover:bg-[#EAE5DA]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base">{sign.symbol}</span>
                        {isBabySign && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Your Child's Sign" />
                        )}
                      </div>
                      <div className="mt-1 font-serif text-xs font-semibold text-[#1C1917]">
                        {sign.name}
                      </div>
                      <div className="text-[10px] font-sans text-[#78716C] truncate">
                        {sign.dateRange}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="mt-6 pt-4 border-t border-[#E6E2DA] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-[#78716C] font-sans flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#8C6D2D]" />
                <span>The Chaldean Dossier harmonizes both Western Sun sign and Vedic Nakshatra acoustics.</span>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl border border-[#D6CFC4] bg-[#FAF8F5] text-xs font-sans font-semibold text-[#1C1917] hover:bg-[#F5F2EB] transition-colors cursor-pointer"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
