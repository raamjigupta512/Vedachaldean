import React from 'react';
import { Award, ShieldCheck, CheckCircle2, Sparkles, GraduationCap, Feather, ArrowRight } from 'lucide-react';

interface OurSpecialistSectionProps {
  onOpenOrder?: () => void;
}

export const OurSpecialistSection: React.FC<OurSpecialistSectionProps> = ({ onOpenOrder }) => {
  return (
    <section
      id="specialist"
      aria-label="Our Specialist"
      className="py-20 sm:py-28 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E6E2DA]"
    >
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#C5A059_0.75px,transparent_0.75px)] [background-size:28px_28px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D6CFC4] bg-[#F5F2EB] text-[11px] font-sans font-semibold tracking-[0.2em] text-[#8C6D2D] uppercase shadow-xs mb-3">
            <Feather className="w-3.5 h-3.5 text-[#8C6D2D]" />
            <span>THE ATELIER SCHOLAR • HUMAN CRAFTSMANSHIP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] font-normal tracking-tight">
            Meet Our Master Numerologist
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#57534E] font-sans leading-relaxed">
            Every newborn dossier is hand-reviewed, calibrated for phonetic acoustic resonance, and personally certified by our principal scholar before delivery.
          </p>
        </div>

        {/* Profile Card Layout */}
        <div className="max-w-5xl mx-auto bg-[#F5F2EB] rounded-3xl border-2 border-[#C5A059]/40 p-8 sm:p-12 lg:p-14 shadow-md relative overflow-hidden">
          {/* Subtle top gold accent line */}
          <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-75" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Portrait Frame & Credential Badges */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              {/* Portrait Frame with Gold Inset */}
              <div className="relative p-2 rounded-2xl bg-[#FAF8F5] border-2 border-[#C5A059]/60 shadow-lg group">
                <div className="w-56 h-64 sm:w-64 sm:h-72 rounded-xl overflow-hidden relative bg-[#EAE5DA] flex flex-col items-center justify-center">
                  {/* Stylized Portrait Visual / Monogram Atelier Avatar */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#EAE5DA] to-[#D6CFC4] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-24 h-24 rounded-full border-2 border-[#C5A059] bg-[#FAF8F5] flex items-center justify-center text-[#8C6D2D] shadow-inner mb-4">
                      <GraduationCap className="w-12 h-12 text-[#8C6D2D]" />
                    </div>
                    <span className="font-serif text-2xl font-bold tracking-wider text-[#1C1917]">
                      A. D. SHASTRI
                    </span>
                    <span className="text-[11px] font-sans uppercase tracking-widest text-[#78716C] mt-1 font-medium">
                      Epigraphist & Acoustic Scholar
                    </span>
                    <div className="mt-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF8F5] border border-[#C5A059]/50 text-[10px] font-sans font-semibold text-[#8C6D2D]">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>22+ Years Lineage</span>
                    </div>
                  </div>

                  {/* Corner Atelier Mark */}
                  <div className="absolute top-2 left-2 text-[9px] font-serif tracking-widest text-[#8C6D2D]/60 uppercase font-semibold">
                    EST. 2003
                  </div>
                  <div className="absolute bottom-2 right-2 text-[9px] font-serif tracking-widest text-[#8C6D2D]/60 uppercase font-semibold">
                    BENGALURU
                  </div>
                </div>

                {/* Verified Master Badge */}
                <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 rounded-full bg-[#1C1917] text-[#FAF8F5] text-[11px] font-sans font-semibold flex items-center gap-1.5 shadow-md border border-[#C5A059]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Principal Analyst</span>
                </div>
              </div>

              {/* Verified Authority Badges */}
              <div className="mt-8 grid grid-cols-2 gap-3 w-full max-w-xs">
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E6E2DA] text-center">
                  <div className="font-serif text-lg font-bold text-[#1C1917]">1,200+</div>
                  <div className="text-[10px] font-sans text-[#78716C] uppercase tracking-wider">
                    Dossiers Verified
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E6E2DA] text-center">
                  <div className="font-serif text-lg font-bold text-[#1C1917]">100%</div>
                  <div className="text-[10px] font-sans text-[#78716C] uppercase tracking-wider">
                    Human Oversight
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio, Philosophy, Credentials & Hand-Drawn Signature */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-sans font-semibold tracking-wider text-[#8C6D2D] uppercase mb-1.5">
                  <Award className="w-4 h-4 text-[#C5A059]" />
                  <span>Senior Epigraphist & Master of Sound Harmonics</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#1C1917]">
                  Acharya Devratan V. Shastri
                </h3>
                <p className="text-xs font-sans text-[#78716C] mt-0.5">
                  M.A. Sanskrit Epigraphy & Vedic Phonetics (Mysuru) • Fellow, International Chaldean Acoustic Guild
                </p>

                {/* Editorial Bio */}
                <div className="mt-5 space-y-3.5 text-xs sm:text-sm text-[#57534E] font-sans leading-relaxed">
                  <p>
                    For over two decades, Acharya Shastri has dedicated his life to the intersection of ancient Chaldean vibrational science and Sanskrit phonetic acoustic principles (<em>Shiksha & Nada Brahma</em>). Having advised three generations of families across India, the United Kingdom, and the United States, he views naming not as a decorative label, but as a lifelong acoustic tuning fork.
                  </p>
                  <p>
                    "A child's name is spoken tens of thousands of times throughout their existence. If that acoustic frequency opposes the planetary chord struck on the day of birth, unnecessary friction emerges. When attuned to compound numbers like 19, 24, or 37, it becomes a reservoir of subtle grace and unshakeable confidence."
                  </p>
                </div>

                {/* 3 Core Commitments */}
                <div className="mt-6 pt-5 border-t border-[#E6E2DA] grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#8C6D2D] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-sans font-semibold text-[#1C1917]">No Automated Guesswork</h4>
                      <p className="text-[11px] text-[#78716C] leading-snug mt-0.5">Each surname combination is manually audited.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#8C6D2D] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-sans font-semibold text-[#1C1917]">Sanskrit Sound Matrix</h4>
                      <p className="text-[11px] text-[#78716C] leading-snug mt-0.5">Cross-checked with birth Nakshatra syllables.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#8C6D2D] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-sans font-semibold text-[#1C1917]">Direct Clarification</h4>
                      <p className="text-[11px] text-[#78716C] leading-snug mt-0.5">Parents can ask questions directly via WhatsApp.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Signature & Seal Block */}
              <div className="mt-8 pt-6 border-t border-[#E6E2DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <div className="text-[10px] font-sans uppercase tracking-widest text-[#78716C] font-medium mb-1">
                    Certified & Sealed in Bengaluru Atelier
                  </div>

                  {/* Elegant Calligraphic Signature SVG */}
                  <div className="relative py-1">
                    <svg
                      aria-label="Acharya D. V. Shastri signature"
                      className="w-48 h-12 text-[#1C1917]"
                      viewBox="0 0 240 60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {/* Flowing artistic signature strokes */}
                      <path d="M12 42 C 20 18, 30 10, 42 22 C 50 32, 45 48, 56 36 C 68 22, 75 14, 88 28 C 96 36, 110 32, 125 24" />
                      <path d="M38 28 L 65 24" />
                      <path d="M130 20 C 135 15, 142 12, 148 18 C 154 26, 145 42, 160 30 C 172 20, 185 15, 205 28 C 218 36, 228 32, 235 24" />
                      <path d="M140 38 C 160 48, 195 44, 228 40" strokeWidth="1.5" />
                      <circle cx="236" cy="38" r="1.5" fill="currentColor" />
                    </svg>
                  </div>

                  <div className="text-xs font-serif font-bold text-[#1C1917]">
                    Acharya Devratan V. Shastri
                  </div>
                  <div className="text-[11px] font-sans text-[#78716C]">
                    Lead Numerologist, VedaChaldea Atelier
                  </div>
                </div>

                {/* Certified Digital Atelier Seal & Consultation Button */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Official circular seal */}
                  <div 
                    title="VedaChaldea Seal of Acoustic Integrity"
                    className="w-14 h-14 rounded-full border-2 border-dashed border-[#C5A059] p-1 flex items-center justify-center shrink-0 bg-[#FAF8F5] shadow-xs"
                  >
                    <div className="w-full h-full rounded-full border border-[#C5A059] flex flex-col items-center justify-center text-[7px] font-serif uppercase tracking-widest text-[#8C6D2D] text-center leading-none">
                      <span>SEAL OF</span>
                      <span className="font-bold text-[8px] my-0.5">VEDA</span>
                      <span>CHALDEA</span>
                    </div>
                  </div>

                  {onOpenOrder && (
                    <button
                      id="btn-specialist-order"
                      type="button"
                      onClick={onOpenOrder}
                      className="px-5 py-2.5 rounded-full bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524] text-xs font-sans font-semibold tracking-wider uppercase transition-all shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      <span>Order Dossier</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
