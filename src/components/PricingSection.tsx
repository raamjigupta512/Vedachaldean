import React from 'react';
import { 
  Check, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Mail, 
  Award, 
  Clock, 
  Heart, 
  BookOpen, 
  Compass, 
  Crown,
  PhoneCall,
  Calendar,
  Star,
  Users,
  MessageCircle,
  FileCheck,
  Zap
} from 'lucide-react';

interface PricingSectionProps {
  onOpenOrder: (packageTier?: 'report' | 'consultation') => void;
  currency: 'INR' | 'USD';
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onOpenOrder,
  currency
}) => {
  // Package 1: Baby Name Destiny Report
  const reportPrice = currency === 'INR' ? '₹251' : '$5';
  const reportOriginal = currency === 'INR' ? '₹499' : '$15';
  const reportSavings = currency === 'INR' ? 'Save ₹248 (50% Off)' : 'Save $10 (67% Off)';

  // Package 2: Report + Personal Consultation (High-Value Choice)
  const consultPrice = currency === 'INR' ? '₹499' : '$10';
  const consultOriginal = currency === 'INR' ? '₹999' : '$29';
  const consultSavings = currency === 'INR' ? 'Save ₹500 (50% Off)' : 'Save $19 (66% Off)';

  return (
    <section 
      id="pricing-faq" 
      className="py-20 sm:py-28 bg-[#050B17] relative overflow-hidden text-[#FAF8F5]"
    >
      {/* Luminous celestial & radial golden atmosphere */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:28px_28px]" />
      
      {/* Top and center ambient radial golden glows */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.18),transparent_70%)] pointer-events-none blur-2xl" />
      <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(231,201,106,0.1),transparent_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(140,109,45,0.12),transparent_70%)] pointer-events-none blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C5A059]/40 bg-[#0C172E]/90 text-[11px] font-sans font-semibold tracking-[0.22em] text-[#E7C96A] uppercase shadow-lg mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E7C96A]" />
            <span>Auspicious Shagun Blessing • Sacred Atelier Consultation</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#FAF8F5] font-normal tracking-tight leading-tight">
            Select Your Child&apos;s <span className="italic text-[#E7C96A] font-medium">Sacred Naming Tier</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#D1C9BE] font-sans leading-relaxed max-w-2xl mx-auto">
            Traditional Chaldean vibrational calculations and Vedic Janma Nakshatra alignment, prepared with museum-grade precision. Choose between our comprehensive standalone Archival Dossier or the complete Specialist 1-on-1 Consultation.
          </p>
        </div>

        {/* Side-by-Side Premium Package Cards */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-stretch">
          
          {/* ============================================================ */}
          {/* PACKAGE 1: Baby Name Destiny Report (₹251)                  */}
          {/* ============================================================ */}
          <div 
            id="package-card-destiny-report"
            className="rounded-3xl bg-gradient-to-b from-[#0B1528] to-[#070E1C] border border-[#C5A059]/35 hover:border-[#C5A059]/60 p-6 sm:p-8 lg:p-9 shadow-xl relative flex flex-col justify-between transition-all duration-300 group"
          >
            {/* Top Badges & Subtitle */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#162544] border border-[#C5A059]/30 text-[#E7C96A] text-[10px] font-sans font-bold uppercase tracking-wider">
                  <BookOpen className="w-3 h-3 text-[#E7C96A]" />
                  <span>The Archival Collection</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#E7C96A] text-[10px] font-sans font-bold uppercase tracking-wider">
                    SPECIAL OFFER
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-[10px] font-sans font-bold uppercase tracking-wider">
                    50% OFF
                  </span>
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] font-medium leading-snug">
                Baby Name Destiny Report
              </h3>
              
              <p className="text-xs sm:text-sm text-[#A8A29E] mt-2 font-sans leading-relaxed">
                An exhaustive 4-panel numerological dossier synthesizing authentic Chaldean acoustic science, Vedic Janma Nakshatra birth syllables, and family surname harmony into a print-ready 300 DPI heirloom keepsake.
              </p>

              {/* Striking Price Formatting */}
              <div className="mt-6 p-4 rounded-2xl bg-[#081021] border border-[#C5A059]/25 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-sans font-medium text-[#A8A29E] tracking-wider block">
                    Traditional Valuation
                  </span>
                  <span 
                    id="price-destiny-original"
                    className="text-2xl text-[#8C827A] line-through decoration-[#C5A059] decoration-2 font-serif font-light tracking-tight select-none"
                    title={`Standard private commission: ${reportOriginal}`}
                  >
                    {reportOriginal}
                  </span>
                </div>

                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-1.5">
                    <span className="text-[11px] font-sans text-[#E7C96A] uppercase font-semibold">Shagun Offering:</span>
                    <span 
                      id="price-destiny-prominent"
                      className="text-4xl sm:text-5xl font-serif font-bold text-[#FAF8F5] tracking-tight text-shadow"
                    >
                      {reportPrice}
                    </span>
                  </div>
                  <span className="text-[10px] font-sans font-semibold text-emerald-400 block mt-0.5">
                    {reportSavings} • One-time contribution
                  </span>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="mt-7 space-y-3 pt-6 border-t border-[#C5A059]/20">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-[#E7C96A] block mb-2">
                  What&apos;s Included in Your Report:
                </span>

                {[
                  'Full 4-Panel Archival Dossier (Print-ready A4 landscape PDF at 300 DPI)',
                  'Chaldean 1–8 letter-by-letter mathematical summation proofs',
                  'Vedic Lunar Nakshatra (birth star) syllable alignment audit',
                  'Top 10 curated auspicious baby names scored 90–100/100',
                  'Family surname resonance & compound acoustic synergy check',
                  'Top 3 Laureate selections with trade-off analysis & parent guidance',
                  '6 Special Category Honors (Best Traditional, Modern, Unique, Global)',
                  'Instant on-screen access & immediate download upon checkout',
                  'Archival backup sent to your WhatsApp & Email within 24 hours'
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#162544] border border-[#C5A059]/40 flex items-center justify-center shrink-0 mt-0.5 text-[#E7C96A]">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-xs text-[#D6CFC4] leading-relaxed font-sans">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA & Delivery Guarantee */}
            <div className="mt-8 pt-6 border-t border-[#C5A059]/20">
              <div className="flex items-center justify-between text-[11px] text-[#A8A29E] mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#E7C96A]" />
                  <span>24-Hour WhatsApp Dispatch</span>
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>256-Bit Encrypted</span>
                </span>
              </div>

              <button
                id="btn-pricing-select-report"
                type="button"
                onClick={() => onOpenOrder('report')}
                className="w-full py-4 rounded-2xl bg-[#121E38] hover:bg-[#1A2C52] border border-[#C5A059]/50 hover:border-[#C5A059] text-[#FAF8F5] text-xs sm:text-sm font-sans font-bold tracking-wider uppercase shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 group-hover:shadow-[0_0_20px_rgba(197,160,89,0.15)]"
              >
                <span>SELECT DESTINY REPORT — {reportPrice}</span>
                <span className="text-xs text-[#A8A29E] font-normal line-through decoration-[#C5A059] opacity-75 font-serif">
                  {reportOriginal}
                </span>
                <ArrowRight className="w-4 h-4 text-[#E7C96A] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>


          {/* ============================================================ */}
          {/* PACKAGE 2: Report + Personal Consultation (₹499)            */}
          {/* HIGHLIGHTED AS HIGH-VALUE CHOICE                             */}
          {/* ============================================================ */}
          <div 
            id="package-card-consultation"
            className="rounded-3xl bg-gradient-to-b from-[#111F3C] via-[#0E1A33] to-[#070E1C] border-2 border-[#E7C96A] shadow-[0_0_40px_rgba(197,160,89,0.22)] p-6 sm:p-8 lg:p-9 relative flex flex-col justify-between transition-all duration-300 transform lg:-translate-y-2 group"
          >
            {/* Top Most Popular Ribbon / Banner */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-auto whitespace-nowrap">
              <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-[#dec477] via-[#c5a059] to-[#977227] text-[#080D1A] font-heading font-extrabold text-[11px] uppercase tracking-widest shadow-md">
                <Crown className="w-3.5 h-3.5 fill-[#080D1A]" />
                <span>MOST POPULAR • HIGH VALUE CHOICE</span>
              </span>
            </div>

            {/* Top Badges & Subtitle */}
            <div className="pt-2">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20345E] border border-[#E7C96A]/60 text-[#E7C96A] text-[10px] font-sans font-bold uppercase tracking-wider shadow-xs">
                  <Star className="w-3 h-3 text-[#E7C96A] fill-[#E7C96A]" />
                  <span>The Grand Atelier Experience</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E7C96A]/20 border border-[#E7C96A]/60 text-[#E7C96A] text-[10px] font-sans font-bold uppercase tracking-wider">
                    SPECIAL OFFER
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-[10px] font-sans font-bold uppercase tracking-wider">
                    50% OFF
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <h3 className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] font-semibold leading-snug">
                  Report + Personal Consultation
                </h3>
              </div>
              
              <p className="text-xs sm:text-sm text-[#D1C9BE] mt-2 font-sans leading-relaxed">
                The premier heirloom package for families seeking complete certainty. Includes the full 4-panel dossier plus direct 1-on-1 audio/chat consultation with our Senior Atelier Specialist to audit family favorites and calculate auspicious ceremony timing.
              </p>

              {/* Striking Price Formatting */}
              <div className="mt-6 p-4.5 rounded-2xl bg-gradient-to-r from-[#0E1A33] to-[#0A1326] border-2 border-[#E7C96A]/45 flex items-center justify-between gap-4 shadow-inner">
                <div>
                  <span className="text-[10px] uppercase font-sans font-medium text-[#A8A29E] tracking-wider block">
                    Private Valuation
                  </span>
                  <span 
                    id="price-consult-original"
                    className="text-2xl text-[#8C827A] line-through decoration-[#E7C96A] decoration-2 font-serif font-light tracking-tight select-none"
                    title={`Standard private consultation fee: ${consultOriginal}`}
                  >
                    {consultOriginal}
                  </span>
                </div>

                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-1.5">
                    <span className="text-[11px] font-sans text-[#E7C96A] uppercase font-semibold">Special Shagun:</span>
                    <span 
                      id="price-consult-prominent"
                      className="text-4xl sm:text-5xl font-serif font-bold text-[#FAF8F5] tracking-tight"
                    >
                      {consultPrice}
                    </span>
                  </div>
                  <span className="text-[10px] font-sans font-bold text-emerald-300 block mt-0.5">
                    {consultSavings} • Best Value for New Parents
                  </span>
                </div>
              </div>

              {/* Deliverables Checklist with High-Value Highlights */}
              <div className="mt-7 space-y-3 pt-6 border-t border-[#E7C96A]/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#E7C96A]">
                    Everything in Destiny Report, Plus:
                  </span>
                  <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-md bg-[#E7C96A]/20 text-[#E7C96A] border border-[#E7C96A]/40">
                    SPECIALIST INCLUDED
                  </span>
                </div>

                {/* Exclusive Consultation Features */}
                {[
                  {
                    icon: PhoneCall,
                    title: '1-on-1 Personal WhatsApp Audio/Chat Consultation',
                    desc: 'Direct private discussion with our Senior Atelier Specialist to answer questions and resolve doubts.'
                  },
                  {
                    icon: Users,
                    title: 'Custom Family Name List Evaluation (Up to 5 Names)',
                    desc: 'Have favorite family suggestions audited for letter-by-letter compound harmony before deciding.'
                  },
                  {
                    icon: Heart,
                    title: 'Sibling & Grandparent Harmony Resonance Audit',
                    desc: 'Acoustic vibration alignment check ensuring phonetic synergy across immediate family members.'
                  },
                  {
                    icon: Calendar,
                    title: 'Auspicious Naming Ceremony Timing (Namakarana Muhurta)',
                    desc: 'Recommended astrological dates & auspicious time windows for the child’s formal naming ritual.'
                  },
                  {
                    icon: Zap,
                    title: 'Priority Concierge VIP Processing (Under 12h Dispatch)',
                    desc: 'Accelerated archival compilation with direct WhatsApp priority desk support.'
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="p-2.5 rounded-xl bg-[#16274B]/70 border border-[#E7C96A]/30 flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#dec477] text-[#080D1A] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-3 h-3" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-[#FAF8F5] block leading-snug">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-[#C5BDB2] leading-tight block mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Base Features summary */}
                <div className="pt-2 text-[11px] text-[#A8A29E] flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Includes all 4 Archival Panels, 300 DPI PDF, Top 10 Names &amp; Surname Audit</span>
                </div>
              </div>
            </div>

            {/* CTA & Delivery Guarantee */}
            <div className="mt-8 pt-6 border-t border-[#E7C96A]/30">
              <div className="flex items-center justify-between text-[11px] text-[#D1C9BE] mb-3">
                <span className="flex items-center gap-1 text-[#E7C96A] font-semibold">
                  <Zap className="w-3 h-3" />
                  <span>Priority Under 12h VIP Delivery</span>
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3 text-[#25D366]" />
                  <span>WhatsApp Audio/Chat</span>
                </span>
              </div>

              <button
                id="btn-pricing-select-consultation"
                type="button"
                onClick={() => onOpenOrder('consultation')}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F3E2B3] via-[#C5A059] to-[#977227] hover:brightness-110 text-[#080F1E] text-xs sm:text-sm font-heading font-extrabold tracking-wider uppercase shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>CLAIM REPORT + CONSULTATION — {consultPrice}</span>
                <span className="text-xs text-[#3D2C0C] font-semibold line-through decoration-[#3D2C0C] opacity-75 font-serif">
                  {consultOriginal}
                </span>
                <ArrowRight className="w-4 h-4 text-[#080F1E] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Cultural Meaning & Shagun Tradition Callout Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#0B1528]/80 border border-[#C5A059]/35 text-left shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-[#16274B] border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#E7C96A] shadow-md">
              <Heart className="w-6 h-6 text-[#E7C96A]" />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h4 className="text-sm sm:text-base font-serif font-bold text-[#FAF8F5]">
                  The Sacred Shagun Philosophy Behind {reportPrice} &amp; {consultPrice}
                </h4>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#C5A059]/20 text-[#E7C96A] border border-[#C5A059]/40">
                  Vedic Tradition
                </span>
              </div>

              <p className="mt-2 text-xs sm:text-sm text-[#D1C9BE] leading-relaxed font-sans">
                In Indian heritage, monetary blessings concluding with a sacred single unit (₹251, ₹499, ₹501) signify that the divine goodwill is perpetual and unbroken. While a zero-ending figure represents completion or a terminus, the auspicious single unit serves as an open gateway of continuous prosperity, spiritual illumination, and auspicious fortune for your newborn&apos;s journey.
              </p>
            </div>
          </div>
        </div>

        {/* 3-Pillar Confidence & Security Bar */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#A8A29E]">
          <div className="p-4 rounded-2xl bg-[#070E1C]/80 border border-[#C5A059]/20 flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#E7C96A] shrink-0" />
            <div>
              <strong className="text-[#FAF8F5] block font-medium">Guaranteed Dispatch</strong>
              <span className="text-[11px] text-[#8C827A]">24h Standard • 12h VIP Priority</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#070E1C]/80 border border-[#C5A059]/20 flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#E7C96A] shrink-0" />
            <div>
              <strong className="text-[#FAF8F5] block font-medium">Archival PDF Backup</strong>
              <span className="text-[11px] text-[#8C827A]">Print-Ready 300 DPI A4 Landscape</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#070E1C]/80 border border-[#C5A059]/20 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <strong className="text-[#FAF8F5] block font-medium">100% Confidential</strong>
              <span className="text-[11px] text-[#8C827A]">Private 256-Bit Encrypted Atelier</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
