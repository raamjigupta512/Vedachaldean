import React from 'react';
import { ArrowRight, FileText, Send, Clock, CheckCircle2, Sparkles, Smartphone, Mail } from 'lucide-react';

interface HowItWorksSectionProps {
  onOpenOrder: () => void;
  currency: 'INR' | 'USD';
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onOpenOrder,
  currency
}) => {
  const priceDisplay = currency === 'INR' ? '₹251' : '$5';

  return (
    <section id="how-it-works" className="py-20 bg-[#F5F2EB] border-t border-[#E6E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11px] font-sans font-semibold tracking-[0.2em] text-[#8C6D2D] uppercase">
            A SEAMLESS 24-HOUR EXPERIENCE
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-[#1C1917] font-normal">
            How Your Dossier is Prepared & Delivered
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57534E] font-sans leading-relaxed">
            From the moment you place your order, our master calculation engine and senior numerology consultants prepare your custom 4-panel dossier with meticulous attention to detail.
          </p>
        </div>

        {/* 3 Step Timeline */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="relative p-8 rounded-2xl bg-[#FAF8F5] border border-[#E6E2DA] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-light text-[#8C6D2D]">01</span>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5F2EB] text-[#78716C] border border-[#E6E2DA]">
                  Step 1 • 2 Minutes
                </span>
              </div>
              <h3 className="text-lg font-serif text-[#1C1917] font-medium">
                Share Birth Coordinates
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Provide your baby's date of birth, time, birthplace, and family surname. If you already have candidate names your family loves, you can enter them for direct evaluation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E6E2DA] text-xs text-[#78716C] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D2D]" />
              <span>Expecting parents can provide estimated due dates.</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative p-8 rounded-2xl bg-[#FAF8F5] border border-[#E6E2DA] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-light text-[#8C6D2D]">02</span>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5F2EB] text-[#78716C] border border-[#E6E2DA]">
                  Step 2 • In Atelier
                </span>
              </div>
              <h3 className="text-lg font-serif text-[#1C1917] font-medium">
                Deep Acoustic & Vedic Audit
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Thousands of phonetic permutations are calculated against the baby's Birth Number, Destiny Number, and Janma Nakshatra. Each name receives exact letter addition proofs and compound meanings.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E6E2DA] text-xs text-[#78716C] flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#8C6D2D]" />
              <span>Full mathematical verification & surname balance.</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative p-8 rounded-2xl bg-[#FAF8F5] border border-[#E6E2DA] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-light text-[#8C6D2D]">03</span>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5F2EB] text-[#78716C] border border-[#E6E2DA]">
                  Step 3 • Delivered in 24h
                </span>
              </div>
              <h3 className="text-lg font-serif text-[#1C1917] font-medium">
                Delivered to WhatsApp & Email
              </h3>
              <p className="mt-2.5 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Within 24 hours, your high-resolution, print-ready 4-panel A4 landscape PDF is delivered directly to your WhatsApp and Email. Plus, you receive instant on-screen access immediately after checkout!
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E6E2DA] text-xs text-[#78716C] flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#8C6D2D]">
                <Smartphone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </div>
              <div className="flex items-center gap-1 text-[#8C6D2D]">
                <Mail className="w-3.5 h-3.5" />
                <span>Email PDF</span>
              </div>
            </div>
          </div>

        </div>

        {/* CTA Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenOrder}
            className="px-8 py-4 rounded-full bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524] text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>GET MY REPORT — {priceDisplay}</span>
            <ArrowRight className="w-4 h-4 text-[#C5A059]" />
          </button>
        </div>

      </div>
    </section>
  );
};
