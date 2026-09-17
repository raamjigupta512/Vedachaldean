import React from 'react';
import { Volume2, Sparkles, Compass, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const WhyChaldeanSection: React.FC = () => {
  return (
    <section id="what-you-receive" className="py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11px] font-sans font-semibold tracking-[0.2em] text-[#8C6D2D] uppercase">
            THE SACRED ACOUSTIC SCIENCE
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-[#1C1917] font-normal">
            Why Chaldean Vibration Matters
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57534E] font-sans leading-relaxed">
            In ancient acoustic traditions, a name is not merely a social label — it is a continuous vibrational mantra spoken hundreds of times every week over a lifetime.
          </p>
        </div>

        {/* 3 Core Pillars of Value */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1 */}
          <div className="p-8 rounded-2xl bg-[#F5F2EB] border border-[#E6E2DA] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EAE5DA] border border-[#D6CFC4] flex items-center justify-center text-[#8C6D2D] mb-5">
                <Volume2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-[#1C1917] font-medium">
                Acoustic Energy, Not Arbitrary Alphabet
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                Unlike Western Pythagorean numerology which mechanically assigns numbers 1 to 9 based on modern alphabet order, Chaldean numerology originated from sound frequencies and the energetic resonance of spoken syllables.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E6E2DA] flex items-center gap-2 text-xs text-[#8C6D2D] font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Authentic 1 to 8 planetary grid</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-2xl bg-[#F5F2EB] border border-[#E6E2DA] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EAE5DA] border border-[#D6CFC4] flex items-center justify-center text-[#8C6D2D] mb-5">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-[#1C1917] font-medium">
                Vedic Nakshatra Sound Synergy
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                We synthesize the ancient Chaldean numerical matrix with your baby's Vedic lunar Nakshatra (birth star). This ensures the recommended names begin with auspicious syllables that align with the child's astrological chart.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E6E2DA] flex items-center gap-2 text-xs text-[#8C6D2D] font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Janma Nakshatra alignment</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-2xl bg-[#F5F2EB] border border-[#E6E2DA] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#EAE5DA] border border-[#D6CFC4] flex items-center justify-center text-[#8C6D2D] mb-5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-[#1C1917] font-medium">
                Full Family Surname Balance
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-[#57534E] leading-relaxed">
                A child does not carry their first name alone. Every name in your report is tested both as an individual vibration and combined with your family surname to ensure the complete name totals an auspicious compound vibration.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E6E2DA] flex items-center gap-2 text-xs text-[#8C6D2D] font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Compound harmony with family surname</span>
            </div>
          </div>

        </div>

        {/* Editorial Quote Box */}
        <div className="mt-12 p-8 rounded-2xl bg-[#FAF8F5] border border-[#E6E2DA] text-center max-w-3xl mx-auto">
          <p className="text-base sm:text-lg font-serif italic text-[#1C1917] leading-relaxed">
            "A name is a sacred mantle given by parents. When the acoustic frequencies of the name harmonize with the date of birth, the child moves through life with an innate sense of confidence, balance, and quiet strength."
          </p>
          <div className="mt-4 text-xs font-sans tracking-widest uppercase text-[#8C6D2D] font-semibold">
            ✦ VedaChaldea Atelier ✦
          </div>
        </div>

      </div>
    </section>
  );
};
