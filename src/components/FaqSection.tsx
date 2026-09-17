import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How is Chaldean numerology different from modern Pythagorean numerology?',
      a: 'Western Pythagorean numerology simply numbers the alphabet 1 to 9 sequentially (A=1, B=2... I=9). Chaldean numerology, however, is based on ancient acoustic sound frequencies and the planetary vibrations of spoken phonetics. Furthermore, Chaldean omits the sacred number 9 from individual letters, reserving it as the divine root of completion. It is widely considered by traditional scholars to be the most accurate system for human names.'
    },
    {
      q: 'When and how will I receive my report?',
      a: 'Your report is delivered directly as a high-resolution, print-ready PDF file via WhatsApp to your phone number and to your Email address within 24 hours. Additionally, as soon as your order is confirmed, you receive instant on-screen access to your baby\'s calculation breakdown and immediate PDF download.'
    },
    {
      q: 'What if our baby has not been born yet?',
      a: 'Many parents consult us before delivery! You can enter your expected due date. We calculate the primary vibration windows surrounding your due date and identify names that carry universal auspicious harmony across those dates. If the birth date shifts, simply reply to your WhatsApp confirmation and we will re-run the final calculation at no extra charge.'
    },
    {
      q: 'Can we submit candidate names our family is already considering?',
      a: 'Yes, absolutely. During checkout, you can input candidate names your family loves. Our calculation engine will audit their exact Chaldean letter vibrations, compound meanings, and surname synergy in addition to providing the top recommended names.'
    },
    {
      q: 'Can I print and frame this report?',
      a: 'Yes. The dossier is engineered to exact international A4 Landscape dimensions at 300 DPI vector clarity. It looks stunning when printed on archival paper, parchment, or framed as a lifelong nursery keepsake.'
    },
    {
      q: 'How do you handle family privacy?',
      a: 'We treat your family data with utmost confidentiality and reverence. Your child\'s birth details and contact information are used solely to prepare and deliver your personalized report, protected by 256-bit SSL encryption, and never shared or sold.'
    }
  ];

  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-[#E6E2DA]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] font-sans font-semibold tracking-[0.2em] text-[#8C6D2D] uppercase">
            CLEAR ANSWERS
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-[#1C1917] font-normal">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-[#57534E] font-sans">
            Everything you need to know about our personalized numerology consultation.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#E6E2DA] bg-[#F5F2EB] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#EAE5DA]/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-serif font-medium text-[#1C1917]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8C6D2D] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#57534E] font-sans leading-relaxed border-t border-[#E6E2DA]/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Contact Help */}
        <div className="mt-12 p-5 rounded-2xl bg-[#FAF8F5] border border-[#E6E2DA] text-center text-xs text-[#78716C] flex items-center justify-center gap-2">
          <MessageCircle className="w-4 h-4 text-[#8C6D2D]" />
          <span>Have a specific naming question? Reach our concierge at </span>
          <span className="font-semibold text-[#1C1917]">concierge@vedachaldea.com</span>
        </div>

      </div>
    </section>
  );
};
