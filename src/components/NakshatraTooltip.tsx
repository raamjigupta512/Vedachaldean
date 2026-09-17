import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Moon, Clock, Compass, Info, X } from 'lucide-react';

interface NakshatraTooltipProps {
  className?: string;
  align?: 'left' | 'right' | 'center';
}

export const NakshatraTooltip: React.FC<NakshatraTooltipProps> = ({
  className = '',
  align = 'right'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const alignmentClasses = {
    left: 'left-0 origin-top-left',
    right: 'right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 origin-top',
    center: 'left-1/2 -translate-x-1/2 origin-top'
  };

  return (
    <div 
      ref={tooltipRef} 
      className={`relative inline-flex items-center ${className}`}
    >
      <button
        type="button"
        id="btn-nakshatra-tooltip"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        aria-label="Why exact birth time and Nakshatra precision matter"
        aria-expanded={isOpen}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#FAF8F5] hover:bg-[#EAE5DA] text-[#8C6D2D] hover:text-[#1C1917] border border-[#C5A059]/60 hover:border-[#8C6D2D] transition-all cursor-pointer shadow-2xs group focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
        title="Click to learn why birth time & Nakshatra precision matter"
      >
        <Info className="w-2.5 h-2.5 group-hover:scale-110 transition-transform" />
      </button>

      {isOpen && (
        <div
          role="tooltip"
          id="nakshatra-precision-popover"
          className={`absolute z-50 top-6 w-80 sm:w-96 max-w-[90vw] p-4.5 rounded-2xl bg-[#0B1528] text-[#FAF8F5] border border-[#C5A059] shadow-2xl transition-all animate-in fade-in duration-150 text-left ${alignmentClasses[align]}`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#C5A059]/30">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#16274B] border border-[#C5A059]/50 flex items-center justify-center text-[#E7C96A] shrink-0">
                <Moon className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-serif font-bold text-[#E7C96A] leading-tight">
                  Nakshatra &amp; Birth Time Precision
                </h4>
                <p className="text-[10px] text-[#A8A29E] font-sans">
                  The Sacred Moon Mansions in Chaldean Alignment
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#A8A29E] hover:text-[#FAF8F5] p-1 rounded-md hover:bg-white/5 transition-colors"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Explanation Body */}
          <div className="mt-3 space-y-2.5 text-xs text-[#D1C9BE] font-sans leading-relaxed">
            <p>
              While your child&apos;s <strong className="text-[#FAF8F5]">Date of Birth</strong> sets the fundamental Sun/Day vibration (1–9) in Chaldean numerology, the <strong className="text-[#E7C96A]">exact time of birth</strong> determines the precise <strong className="text-[#FAF8F5]">Janma Nakshatra</strong> (lunar birth star) and its specific <em>Pada</em> (quarter).
            </p>

            <div className="p-2.5 rounded-xl bg-[#111F3C] border border-[#C5A059]/30 space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2 text-[#E7C96A] font-semibold">
                <Clock className="w-3 h-3 text-[#E7C96A]" />
                <span>Why Birth Minutes Matter:</span>
              </div>
              <ul className="space-y-1 text-[#A8A29E] list-disc list-inside pl-0.5">
                <li>The Moon transitions between Nakshatras every ~24 hours and shifts <em>Padas</em> every ~6 hours.</li>
                <li>The specific Pada yields the traditional <strong className="text-[#FAF8F5]">Janma Akshara</strong> (recommended sacred initial syllables, e.g., <em>Chu, Che, Cho, La</em>).</li>
                <li>Chaldean acoustic summation calculates harmonious resonance between these syllables and the family surname.</li>
              </ul>
            </div>

            <p className="text-[11px] text-[#A8A29E]">
              <strong className="text-[#FAF8F5]">Parent Guidance:</strong> If the exact birth minute is unknown, providing the hospital hour or time of day (morning/night) enables our Atelier to calculate the lunar trajectory with high mathematical fidelity.
            </p>
          </div>

          {/* Footer badge */}
          <div className="mt-3 pt-2.5 border-t border-[#C5A059]/20 flex items-center justify-between text-[10px] text-[#C5A059]">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#E7C96A]" />
              <span>Chaldean + Vedic Synthesis</span>
            </span>
            <span className="text-[#8C827A]">300 DPI Archival Fidelity</span>
          </div>
        </div>
      )}
    </div>
  );
};
