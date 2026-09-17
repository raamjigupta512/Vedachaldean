import React from 'react';
import { ArrowRight, Check, Sparkles, Clock, ShieldCheck, FileText, Download } from 'lucide-react';
import babyPhoto from '../assets/images/sleeping_newborn_baby_1789326693225.jpg';

interface HeroSectionProps {
  onOpenOrder: () => void;
  onViewSample: () => void;
  currency: 'INR' | 'USD';
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenOrder,
  onViewSample,
  currency
}) => {
  const priceDisplay = currency === 'INR' ? '₹251' : '$5';

  return (
    <section id="hero" className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden bg-[#FAF8F5]">
      
      {/* Subtle architectural background grid / radial glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C5A059_0.75px,transparent_0.75px)] [background-size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E6E2DA] bg-[#F5F2EB]/90 text-[11px] font-sans font-semibold tracking-[0.16em] uppercase text-[#78716C] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B38E44]" />
            <span>Personalized Digital Consultation • Delivered in 24 Hours</span>
          </div>
        </div>

        {/* Master Editorial Headline */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#1C1917] tracking-tight leading-[1.12] font-normal">
            Discover the Meaning & Auspicious Harmony Behind <span className="italic font-light text-[#8C6D2D]">Your Child's Name.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#57534E] font-sans font-normal leading-relaxed max-w-2xl mx-auto">
            An authentic Chaldean acoustic vibration audit and Vedic Nakshatra synthesis, bound into an exquisite 4-panel archival dossier. Specially prepared for your child and delivered within 24 hours.
          </p>

          {/* Transparent Value Pill */}
          <div className="mt-7 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#F5F2EB] border border-[#E6E2DA] text-xs sm:text-sm text-[#1C1917] font-sans">
            <span className="font-semibold text-[#8C6D2D] font-heading tracking-wider">{priceDisplay}</span>
            <span className="text-[#A8A29E]">•</span>
            <span>One-time purchase</span>
            <span className="text-[#A8A29E]">•</span>
            <span>Delivered directly to WhatsApp & Email</span>
          </div>

          {/* Primary Action Button Cluster */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="btn-hero-get-report"
              onClick={onOpenOrder}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524] text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>GET MY REPORT</span>
              <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="btn-hero-view-sample"
              onClick={onViewSample}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#F5F2EB] hover:bg-[#EAE5DA] border border-[#E6E2DA] text-[#1C1917] text-xs sm:text-sm font-sans font-medium tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#78716C]" />
              <span>View Sample Dossier</span>
            </button>
          </div>

          {/* Reassurance Microcopy */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-[11px] font-sans text-[#78716C]">
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#8C6D2D]" />
              <span>Full Chaldean 1–8 Sound Math</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#8C6D2D]" />
              <span>Print-ready A4 Landscape PDF</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#8C6D2D]" />
              <span>WhatsApp & Email in 24 Hours</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#8C6D2D]" />
              <span>Instant On-Screen Consultation</span>
            </div>
          </div>
        </div>

        {/* Hero Product Visual Mockup */}
        <div className="mt-16 relative max-w-4xl mx-auto">
          
          {/* Subtle Glow Behind Dossier */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[#C5A059]/10 via-transparent to-[#C5A059]/10 rounded-3xl blur-2xl -z-10" />

          {/* The Physical Report Frame on Warm Linen */}
          <div className="relative rounded-2xl bg-[#0D1B2E] text-[#F7F1DF] border border-[#C9A227]/40 shadow-2xl p-6 sm:p-8 overflow-hidden">
            
            {/* Header Ribbon on Dossier */}
            <div className="flex items-center justify-between border-b border-[#C9A227]/30 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E7C96A]" />
                <span className="text-[11px] font-heading tracking-[0.2em] text-[#E7C96A] uppercase font-bold">
                  SAMPLE CONSULTATION DOSSIER • MASTER AARAV GUPTA
                </span>
              </div>
              <div className="text-[10px] font-sans text-[#E7C96A]/80 tracking-wider uppercase border border-[#C9A227]/30 px-2.5 py-0.5 rounded">
                Official 4-Panel A4 Report
              </div>
            </div>

            {/* The 4 Panels Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
              
              {/* Panel 1 Preview */}
              <div className="bg-[#071322] border border-[#C9A227]/25 rounded-xl p-4 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#E7C96A]">PANEL I</span>
                    <span className="text-[9px] font-sans text-gray-400">Child's Blueprint</span>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <img 
                      src={babyPhoto} 
                      alt="Baby Aarav" 
                      className="w-12 h-12 rounded-full object-cover border border-[#C9A227]/50" 
                    />
                    <div>
                      <h4 className="font-heading text-sm text-[#F7F1DF] font-bold">Aarav Gupta</h4>
                      <p className="text-[10px] text-gray-400">18 March 2026 • 04:42 AM • Bengaluru</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
                    <div className="bg-[#0D1B2E] p-2 rounded border border-[#C9A227]/15">
                      <span className="text-gray-400 text-[9px] block">Birth Number:</span>
                      <span className="font-bold text-[#E7C96A] text-xs">9 (Mars)</span>
                      <span className="text-[9px] text-gray-400 block">18 → 1+8 = 9</span>
                    </div>
                    <div className="bg-[#0D1B2E] p-2 rounded border border-[#C9A227]/15">
                      <span className="text-gray-400 text-[9px] block">Destiny Number:</span>
                      <span className="font-bold text-[#E7C96A] text-xs">4 (Rahu)</span>
                      <span className="text-[9px] text-gray-400 block">Sum = 22 → 4</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel 2 Preview */}
              <div className="bg-[#071322] border border-[#C9A227]/25 rounded-xl p-4 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#E7C96A]">PANEL II</span>
                    <span className="text-[9px] font-sans text-gray-400">Chaldean Matrix</span>
                  </div>
                  <div className="grid grid-cols-8 gap-1 text-center text-[10px] my-2 bg-[#0D1B2E] p-2 rounded border border-[#C9A227]/20">
                    <div className="border-r border-[#C9A227]/15"><span className="text-[#E7C96A] font-bold">1</span><span className="block text-[8px] text-gray-400">AIJQY</span></div>
                    <div className="border-r border-[#C9A227]/15"><span className="text-[#E7C96A] font-bold">2</span><span className="block text-[8px] text-gray-400">BKR</span></div>
                    <div className="border-r border-[#C9A227]/15"><span className="text-[#E7C96A] font-bold">3</span><span className="block text-[8px] text-gray-400">CGLS</span></div>
                    <div className="border-r border-[#C9A227]/15"><span className="text-[#E7C96A] font-bold">4</span><span className="block text-[8px] text-gray-400">DMT</span></div>
                    <div className="border-r border-[#C9A227]/15"><span className="text-[#E7C96A] font-bold">5</span><span className="block text-[8px] text-gray-400">EHNX</span></div>
                    <div className="border-r border-[#C9A227]/15"><span className="text-[#E7C96A] font-bold">6</span><span className="block text-[8px] text-gray-400">UVW</span></div>
                    <div className="border-r border-[#C9A227]/15"><span className="text-[#E7C96A] font-bold">7</span><span className="block text-[8px] text-gray-400">OZ</span></div>
                    <div><span className="text-[#E7C96A] font-bold">8</span><span className="block text-[8px] text-gray-400">FP</span></div>
                  </div>
                  <p className="text-[10px] text-gray-300 italic">
                    "Sacred Number 9 is omitted from letter values as it represents completion & divine origin."
                  </p>
                </div>
              </div>

              {/* Panel 3 Preview */}
              <div className="bg-[#071322] border border-[#C9A227]/25 rounded-xl p-4 relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#E7C96A]">PANEL III</span>
                  <span className="text-[9px] font-sans text-gray-400">Top 10 Scored Names</span>
                </div>
                <div className="space-y-1.5 text-[10px]">
                  <div className="flex items-center justify-between bg-[#0D1B2E] px-2 py-1 rounded border border-[#C9A227]/15">
                    <span className="font-bold text-[#F7F1DF]">🥇 AARAV</span>
                    <span className="text-gray-400 text-[9px]">1+1+2+1+6 = 11 → 2</span>
                    <span className="text-emerald-400 font-bold">96/100</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#0D1B2E] px-2 py-1 rounded border border-[#C9A227]/15">
                    <span className="font-bold text-[#F7F1DF]">🥈 REYANSH</span>
                    <span className="text-gray-400 text-[9px]">2+5+1+1+5+3+5 = 22 → 4</span>
                    <span className="text-emerald-400 font-bold">93/100</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#0D1B2E] px-2 py-1 rounded border border-[#C9A227]/15">
                    <span className="font-bold text-[#F7F1DF]">🥉 VIVAAN</span>
                    <span className="text-gray-400 text-[9px]">6+1+6+1+1+5 = 20 → 2</span>
                    <span className="text-emerald-400 font-bold">91/100</span>
                  </div>
                </div>
              </div>

              {/* Panel 4 Preview */}
              <div className="bg-[#071322] border border-[#C9A227]/25 rounded-xl p-4 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#E7C96A]">PANEL IV</span>
                    <span className="text-[9px] font-sans text-gray-400">3 Laureates & Certificate</span>
                  </div>
                  <div className="p-2 bg-[#0D1B2E] rounded border border-[#C9A227]/20 text-[10px]">
                    <div className="font-bold text-[#E7C96A]">Crown Laureate: AARAV</div>
                    <p className="text-[9px] text-gray-300 mt-0.5">
                      Vedic Master Number 11: Lion of Wisdom. Deep emotional resilience and harmonious family synergy.
                    </p>
                  </div>
                </div>
                <div className="mt-2 text-right">
                  <span className="text-[9px] text-[#E7C96A]/80 italic">Verified Archival Seal ✦ VedaChaldea</span>
                </div>
              </div>

            </div>

            {/* Bottom Floating Bar on Hero Mockup */}
            <div className="mt-6 pt-4 border-t border-[#C9A227]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-gray-400 text-[11px]">
                Previewing actual dossier structure generated for every client order.
              </span>
              <button
                onClick={onViewSample}
                className="text-[#E7C96A] hover:text-white font-sans font-medium text-xs underline underline-offset-4 cursor-pointer"
              >
                Inspect All 4 Panels in Detail →
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
