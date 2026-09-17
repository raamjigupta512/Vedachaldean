import React from 'react';
import { Sparkles, ShieldCheck, Mail, Smartphone, Heart, MessageCircle } from 'lucide-react';
import { getFooterWhatsAppUrl } from '../utils/whatsapp';
import { notifyWhatsAppOpening } from '../utils/notifications';
import { ThemeToggle } from './ThemeToggle';

interface FooterProps {
  onOpenOrder: () => void;
  onNavigateSection: (sectionId: string) => void;
  currency: 'INR' | 'USD';
}

export const Footer: React.FC<FooterProps> = ({
  onOpenOrder,
  onNavigateSection,
  currency
}) => {
  const whatsappUrl = getFooterWhatsAppUrl();

  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-12 border-t border-[#292524]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#292524]">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#C5A059]/50 bg-[#292524] flex items-center justify-center text-[#C5A059]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading tracking-[0.2em] text-sm font-semibold uppercase text-white">
                  VEDACHALDEA
                </span>
                <span className="text-[9px] font-sans tracking-[0.24em] text-[#A8A29E] uppercase">
                  BABY NAME NUMEROLOGY ATELIER
                </span>
              </div>
            </div>
            <p className="text-xs text-[#A8A29E] font-sans leading-relaxed max-w-sm">
              Preserving ancient acoustic sound sciences and Vedic lunar wisdom into museum-grade digital dossiers for families welcoming new life.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#C5A059]">
              <a
                id="footer-brand-whatsapp-link"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => notifyWhatsAppOpening()}
                className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                title="Direct to WhatsApp inquiry"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                <span className="font-medium">Direct to WhatsApp</span>
              </a>
              <span className="flex items-center gap-1 text-[#A8A29E]">
                <Smartphone className="w-3.5 h-3.5 text-[#C5A059]" />
                WhatsApp Delivery
              </span>
              <span className="flex items-center gap-1 text-[#A8A29E]">
                <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                Email Archival PDF
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-semibold uppercase tracking-wider text-[#C5A059]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A29E] font-sans">
              <li>
                <button
                  onClick={() => onNavigateSection('sample-report')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sample 4-Panel Dossier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('quick-name-score')}
                  className="hover:text-white transition-colors cursor-pointer text-[#C5A059]"
                >
                  Quick Name Score
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('what-you-receive')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  What's Included
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('quick-name-score')}
                  className="hover:text-white transition-colors cursor-pointer text-[#C5A059]"
                >
                  Quick Name Score
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('specialist')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Specialist
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('pricing-faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pricing & FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('testimonials')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Client Testimonials
                </button>
              </li>
            </ul>
          </div>

          {/* Order CTA Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-semibold uppercase tracking-wider text-[#C5A059]">
              Get Started
            </h4>
            <p className="text-xs text-[#A8A29E] font-sans">
              Order your personalized baby name dossier or inquire directly.
            </p>
            <button
              id="footer-order-report-btn"
              onClick={onOpenOrder}
              className="w-full py-2.5 px-4 rounded-full bg-[#FAF8F5] text-[#1C1917] hover:bg-[#EAE5DA] text-xs font-sans font-semibold uppercase tracking-wider transition-colors cursor-pointer mt-2"
            >
              Order Report — {currency === 'INR' ? '₹251' : '$5'}
            </button>
            <a
              id="footer-direct-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => notifyWhatsAppOpening()}
              className="w-full py-2.5 px-4 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/50 text-[#4ade80] hover:text-[#22c55e] text-xs font-sans font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] group-hover:scale-110 transition-transform" />
              <span>Direct to WhatsApp</span>
            </a>
            <div className="flex items-center gap-1.5 text-[10px] text-[#A8A29E] pt-1">
              <ShieldCheck className="w-3 h-3 text-[#C5A059]" />
              <span>Delivered within 24 Hours</span>
            </div>
          </div>

        </div>

        {/* Legal & Ethical Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#78716C] font-sans border-t border-[#292524]/60">
          <div className="flex items-center gap-4">
            <p>
              © {new Date().getFullYear()} VedaChaldea Atelier. All rights reserved. Handcrafted with reverence for newborn life.
            </p>
            <ThemeToggle variant="compact" />
          </div>
          <p className="text-center sm:text-right max-w-md">
            Ethical Note: Numerological guidance is an ancient cultural tradition and acoustic art offered for auspicious inspiration and family contemplation.
          </p>
        </div>

      </div>
    </footer>
  );
};
