import React, { useState } from 'react';
import { Sparkles, Menu, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenOrder: () => void;
  onNavigateSection: (sectionId: string) => void;
  currency: 'INR' | 'USD';
  onToggleCurrency: () => void;
  activeOrderCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenOrder,
  onNavigateSection,
  currency,
  onToggleCurrency
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E6E2DA] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Editorial Crest */}
        <div 
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-full border border-[#C5A059]/40 bg-[#F5F2EB] flex items-center justify-center text-[#B38E44] transition-all group-hover:border-[#C5A059] group-hover:bg-[#EAE5DA]">
            <Sparkles className="w-4 h-4 text-[#B38E44]" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading tracking-[0.18em] text-sm sm:text-base font-semibold text-[#1C1917] uppercase">
              VEDACHALDEA
            </span>
            <span className="text-[10px] font-sans tracking-[0.24em] text-[#78716C] uppercase font-medium">
              BABY NAME NUMEROLOGY ATELIER
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-sans font-medium tracking-wider uppercase text-[#57534E]">
          <button 
            onClick={() => handleNavClick('sample-report')}
            className="hover:text-[#1C1917] transition-colors cursor-pointer py-1"
          >
            Sample Report
          </button>
          <button 
            onClick={() => handleNavClick('quick-name-score')}
            className="hover:text-[#1C1917] transition-colors cursor-pointer py-1 text-[#8C6D2D] font-medium"
          >
            Quick Score
          </button>
          <button 
            onClick={() => handleNavClick('how-it-works')}
            className="hover:text-[#1C1917] transition-colors cursor-pointer py-1"
          >
            How It Works
          </button>
          <button 
            onClick={() => handleNavClick('specialist')}
            className="hover:text-[#1C1917] transition-colors cursor-pointer py-1"
          >
            Our Specialist
          </button>
          <button 
            onClick={() => handleNavClick('pricing-faq')}
            className="hover:text-[#1C1917] transition-colors cursor-pointer py-1"
          >
            Pricing
          </button>
          <button 
            onClick={() => handleNavClick('testimonials')}
            className="hover:text-[#1C1917] transition-colors cursor-pointer py-1"
          >
            Testimonials
          </button>
        </nav>

        {/* Right CTA & Currency Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={onToggleCurrency}
            className="px-2.5 py-1 text-[11px] font-sans font-medium uppercase tracking-wider rounded-md border border-[#E6E2DA] bg-[#F5F2EB] text-[#57534E] hover:text-[#1C1917] hover:border-[#D6CFC4] transition-colors cursor-pointer"
            title="Switch between INR (₹) and USD ($)"
          >
            {currency === 'INR' ? '₹ INR' : '$ USD'}
          </button>

          <button
            id="btn-nav-get-report"
            onClick={onOpenOrder}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524] text-xs font-sans font-semibold tracking-wider uppercase shadow-sm transition-all duration-200 cursor-pointer"
          >
            <span>GET MY REPORT</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle variant="compact" />
          <button
            onClick={onToggleCurrency}
            className="px-2 py-1 text-[10px] font-sans font-medium uppercase tracking-wider rounded border border-[#E6E2DA] bg-[#F5F2EB] text-[#57534E]"
          >
            {currency === 'INR' ? '₹' : '$'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1C1917] rounded-lg hover:bg-[#F5F2EB] transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#E6E2DA] bg-[#FAF8F5] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-[#E6E2DA]/50">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#78716C]">Theme Palette</span>
            <ThemeToggle />
          </div>

          <button
            onClick={() => handleNavClick('sample-report')}
            className="w-full text-left py-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#1C1917] border-b border-[#E6E2DA]/50"
          >
            Sample Report
          </button>
          <button
            onClick={() => handleNavClick('quick-name-score')}
            className="w-full text-left py-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#8C6D2D] border-b border-[#E6E2DA]/50"
          >
            ✦ Quick Name Score
          </button>
          <button
            onClick={() => handleNavClick('how-it-works')}
            className="w-full text-left py-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#1C1917] border-b border-[#E6E2DA]/50"
          >
            How It Works
          </button>
          <button
            onClick={() => handleNavClick('specialist')}
            className="w-full text-left py-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#1C1917] border-b border-[#E6E2DA]/50"
          >
            Our Specialist
          </button>
          <button
            onClick={() => handleNavClick('pricing-faq')}
            className="w-full text-left py-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#1C1917] border-b border-[#E6E2DA]/50"
          >
            Pricing & FAQ
          </button>
          <button
            onClick={() => handleNavClick('testimonials')}
            className="w-full text-left py-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#1C1917] border-b border-[#E6E2DA]/50"
          >
            Client Testimonials
          </button>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrder();
              }}
              className="w-full py-3 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-sans font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <span>GET MY REPORT — {currency === 'INR' ? '₹251' : '$5'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
