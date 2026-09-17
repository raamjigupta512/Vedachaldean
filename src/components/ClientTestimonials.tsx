import React from 'react';
import { Star, Quote, Sparkles, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

interface Testimonial {
  id: string;
  parents: string;
  location: string;
  babyName: string;
  vibrationBadge: string;
  quote: string;
  rating: number;
  dateDelivered: string;
  highlight: string;
}

interface ClientTestimonialsProps {
  onOpenOrder?: () => void;
}

export const ClientTestimonials: React.FC<ClientTestimonialsProps> = ({ onOpenOrder }) => {
  const testimonials: Testimonial[] = [
    {
      id: 'testimonial-1',
      parents: 'Dr. Vikram & Priya Sharma',
      location: 'Bengaluru, India',
      babyName: 'Aarav Sharma',
      vibrationBadge: 'Compound 24 • Love & Good Fortune',
      quote:
        'We were torn between modern phonetic names and our elders’ traditional requests. The dossier gave our family complete peace. Seeing how Aarav perfectly resonated with our surname and Rohini nakshatra made the naming ceremony effortless and deeply sacred.',
      rating: 5,
      dateDelivered: 'Delivered in 8 hrs via WhatsApp',
      highlight: 'Framed in our nursery',
    },
    {
      id: 'testimonial-2',
      parents: 'Rohan & Ananya Deshmukh',
      location: 'Mumbai, India',
      babyName: 'Vihaan Deshmukh',
      vibrationBadge: 'Compound 37 • Leadership & Nobility',
      quote:
        'What set VedaChaldea apart was the acoustic letter matrix. We discovered our initial spelling had an opposing frequency with his birth date. Harmonizing the spelling created compound 37. Truly a museum-grade heirloom document.',
      rating: 5,
      dateDelivered: 'Delivered in 12 hrs via WhatsApp',
      highlight: 'Acoustic letter matrix clarity',
    },
    {
      id: 'testimonial-3',
      parents: 'Arvind & Meera Patel',
      location: 'London & Ahmedabad',
      babyName: 'Diya Patel',
      vibrationBadge: 'Compound 19 • The Prince of Heaven',
      quote:
        'Living in the UK, we sought a name that bridges global modern living with Vedic heritage. The 4-panel analysis showed the exact compound vibration with our family surname. Our parents in Gujarat were overjoyed with the Nakshatra sound synergy.',
      rating: 5,
      dateDelivered: 'Delivered in 14 hrs via PDF',
      highlight: 'Global & Vedic balance',
    },
    {
      id: 'testimonial-4',
      parents: 'David Miller & Sunita Iyer',
      location: 'San Jose, California',
      babyName: 'Kavya Miller-Iyer',
      vibrationBadge: 'Compound 42 • Grace & Harmony',
      quote:
        'The surname synergy audit was invaluable for our cross-cultural marriage. Testing our hyphenated surname gave us total clarity. The dossier was delivered directly to our WhatsApp with flawless typography. Worth far more than the modest shagun fee.',
      rating: 5,
      dateDelivered: 'Delivered in 6 hrs via WhatsApp',
      highlight: 'Surname synergy audit',
    },
  ];

  return (
    <section
      id="testimonials"
      aria-label="Client Testimonials"
      className="py-20 sm:py-28 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E6E2DA]"
    >
      {/* Background radial gold accents */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#C5A059_0.75px,transparent_0.75px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D6CFC4] bg-[#F5F2EB] text-[11px] font-sans font-semibold tracking-[0.2em] text-[#8C6D2D] uppercase shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6D2D]" />
            <span>PARENTS' REVERENCE • CLIENT TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1917] font-normal tracking-tight">
            Cherished by Families Worldwide
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#57534E] font-sans leading-relaxed">
            Heartfelt reflections from mothers and fathers who commissioned their newborn's 4-panel Chaldean Archival Dossier for auspicious lifelong resonance.
          </p>
        </div>

        {/* 4-Item Responsive Testimonial Grid with Gold-Accent Borders */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              id={`card-${t.id}`}
              className="relative p-6 sm:p-7 rounded-2xl bg-[#F5F2EB] border-2 border-[#C5A059]/40 hover:border-[#C5A059] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Header: Stars & Quote Icon */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]"
                      />
                    ))}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#EAE5DA] border border-[#D6CFC4] flex items-center justify-center text-[#8C6D2D]">
                    <Quote className="w-3.5 h-3.5 text-[#8C6D2D]" />
                  </div>
                </div>

                {/* Baby Name & Auspicious Compound Badge */}
                <div className="mb-4">
                  <div className="text-[10px] font-sans uppercase tracking-widest text-[#78716C] font-medium">
                    Baby's Blessed Vibration
                  </div>
                  <div className="mt-0.5 text-sm font-serif font-medium text-[#1C1917]">
                    {t.babyName}
                  </div>
                  <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EAE5DA] border border-[#D6CFC4] text-[10px] font-sans font-semibold text-[#8C6D2D]">
                    <Sparkles className="w-2.5 h-2.5 text-[#8C6D2D]" />
                    <span>{t.vibrationBadge}</span>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <blockquote className="text-xs sm:text-[13px] text-[#57534E] leading-relaxed italic font-serif relative">
                  "{t.quote}"
                </blockquote>
              </div>

              {/* Card Footer: Parents, Location & Verified Receipt */}
              <div className="mt-6 pt-4 border-t border-[#E6E2DA]">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-sans font-semibold text-[#1C1917]">
                      {t.parents}
                    </h3>
                    <p className="text-[11px] text-[#78716C] font-sans">
                      {t.location}
                    </p>
                  </div>
                  <div
                    title="Verified Dossier Commission"
                    className="shrink-0 w-6 h-6 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-800 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[10px] font-sans text-[#78716C]">
                  <span className="inline-flex items-center gap-1 text-[#8C6D2D] font-medium">
                    <ShieldCheck className="w-3 h-3 text-[#8C6D2D]" />
                    {t.highlight}
                  </span>
                  <span>{t.dateDelivered}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Reassurance & Call to Action Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] border-2 border-[#C5A059]/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F2EB] border border-[#C5A059]/40 flex items-center justify-center text-[#8C6D2D] shrink-0">
              <Heart className="w-6 h-6 text-[#8C6D2D]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-medium text-[#1C1917]">
                Over 1,200+ Newborn Dossiers Handcrafted with Acoustic Precision
              </h3>
              <p className="text-xs sm:text-sm text-[#57534E] font-sans mt-0.5">
                Each dossier is individually compiled, verified for family surname synergy, and delivered directly to your WhatsApp.
              </p>
            </div>
          </div>

          {onOpenOrder && (
            <button
              id="btn-testimonials-order"
              onClick={onOpenOrder}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524] text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer shrink-0"
            >
              Order Baby's Dossier
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
