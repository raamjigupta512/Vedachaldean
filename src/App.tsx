import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SampleReportViewer } from './components/SampleReportViewer';
import { WhyChaldeanSection } from './components/WhyChaldeanSection';
import { QuickNameScoreSection } from './components/QuickNameScoreSection';
import { OurSpecialistSection } from './components/OurSpecialistSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PricingSection } from './components/PricingSection';
import { ClientTestimonials } from './components/ClientTestimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { BabyInputData, CustomerOrderDetails, ConsultationReportData } from './types';
import { generateConsultationReport } from './utils/scoring';
import { generateConsultationPDF } from './utils/pdfGenerator';
import { Download, Sparkles, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { Toaster } from 'sonner';
import { notifyPdfStarting, notifyPdfSuccess, notifyPdfError, notifyOrderPlaced } from './utils/notifications';
import { triggerOrderCelebrationConfetti } from './utils/confetti';
import { useTheme } from './context/ThemeContext';

const DEFAULT_SAMPLE_BABY: BabyInputData = {
  baby_name: 'Aarav',
  gender: 'boy',
  date_of_birth: '2026-03-18',
  time_of_birth: '04:42',
  place_of_birth: 'Bengaluru, Karnataka, India',
  family_surname: 'Gupta',
  naming_preferences: 'Auspicious Chaldean compound, peaceful and harmonious vibration, global pronunciation'
};

export default function App() {
  const { theme } = useTheme();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [modalInitialName, setModalInitialName] = useState<string>('Aarav');
  const [modalInitialPackageTier, setModalInitialPackageTier] = useState<'report' | 'consultation'>('report');
  const [activeOrder, setActiveOrder] = useState<CustomerOrderDetails | null>(null);
  const [activeReport, setActiveReport] = useState<ConsultationReportData>(() =>
    generateConsultationReport(DEFAULT_SAMPLE_BABY)
  );
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);

  const handleToggleCurrency = () => {
    setCurrency((prev) => (prev === 'INR' ? 'USD' : 'INR'));
  };

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOrderCompleted = (order: CustomerOrderDetails, report: ConsultationReportData) => {
    setActiveOrder(order);
    setActiveReport(report);
    notifyOrderPlaced(order.order_id, `${order.baby_details.baby_name} ${order.baby_details.family_surname}`);
    triggerOrderCelebrationConfetti();
  };

  const handleDownloadActivePdf = async () => {
    if (isDownloadingPdf || !activeReport) return;
    const toastId = notifyPdfStarting();
    try {
      setIsDownloadingPdf(true);
      await generateConsultationPDF(activeReport, currency);
      notifyPdfSuccess(toastId);
    } catch (err) {
      console.error('Failed to download PDF:', err);
      notifyPdfError(toastId);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C1917] font-sans selection:bg-[#C5A059]/20 selection:text-[#1C1917]">
      
      {/* Top Banner if Active Order Exists */}
      {activeOrder && (
        <aside aria-label="Order confirmation banner" className="bg-[#1C1917] text-[#FAF8F5] px-4 py-2.5 text-xs border-b border-[#292524] transition-all">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                Order <strong className="text-white">#{activeOrder.order_id}</strong> Confirmed for <strong className="text-white">{activeOrder.baby_details.baby_name} {activeOrder.baby_details.family_surname}</strong>. Scheduled delivery to WhatsApp within 24h.
              </span>
            </div>
            <button
              onClick={handleDownloadActivePdf}
              disabled={isDownloadingPdf}
              className="px-3 py-1 rounded-full bg-[#FAF8F5] text-[#1C1917] hover:bg-[#EAE5DA] text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {isDownloadingPdf ? (
                <Loader2 className="w-3 h-3 animate-spin text-[#1C1917]" />
              ) : (
                <Download className="w-3 h-3 text-[#1C1917]" />
              )}
              <span>{isDownloadingPdf ? 'Compiling PDF...' : 'Download Dossier PDF'}</span>
            </button>
          </div>
        </aside>
      )}

      {/* Main Navigation */}
      <Navbar
        onOpenOrder={() => setIsOrderModalOpen(true)}
        onNavigateSection={handleNavigateSection}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
      />

      <main>
        {/* Section 1: Hero */}
        <HeroSection
          onOpenOrder={() => setIsOrderModalOpen(true)}
          onViewSample={() => handleNavigateSection('sample-report')}
          currency={currency}
        />

        {/* Section 2: Sample Report Viewer (What's Inside the 4 Panels) */}
        <SampleReportViewer
          onOpenOrder={() => setIsOrderModalOpen(true)}
          currency={currency}
        />

        {/* Section 3: Why Chaldean Acoustic Science */}
        <WhyChaldeanSection />

        {/* Section 4: Interactive Quick Name Score Tool */}
        <QuickNameScoreSection
          currency={currency}
          onOpenOrder={(name) => {
            if (name) setModalInitialName(name);
            setIsOrderModalOpen(true);
          }}
        />

        {/* Section 5: Our Specialist (Atelier Scholar Profile & Authority) */}
        <OurSpecialistSection
          onOpenOrder={() => setIsOrderModalOpen(true)}
        />

        {/* Section 5: How It Works (3 Steps to 24h Delivery) */}
        <HowItWorksSection
          onOpenOrder={() => setIsOrderModalOpen(true)}
          currency={currency}
        />

        {/* Section 5: Transparent Pricing & What's Included */}
        <PricingSection
          onOpenOrder={(tier) => {
            if (tier) setModalInitialPackageTier(tier);
            setIsOrderModalOpen(true);
          }}
          currency={currency}
        />

        {/* Section 6: Client Testimonials */}
        <ClientTestimonials
          onOpenOrder={() => setIsOrderModalOpen(true)}
        />

        {/* Section 7: FAQ */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenOrder={() => setIsOrderModalOpen(true)}
        onNavigateSection={handleNavigateSection}
        currency={currency}
      />

      {/* Order Intake & Payment Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        currency={currency}
        initialBabyName={modalInitialName}
        initialPackageTier={modalInitialPackageTier}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Non-intrusive Sonner Toaster Notifications */}
      <Toaster 
        position="bottom-right" 
        richColors 
        closeButton
        theme={theme === 'midnight' ? 'dark' : 'light'}
        toastOptions={{
          style: {
            borderRadius: '14px',
            fontFamily: 'inherit',
            fontSize: '13px',
          }
        }}
      />

    </div>
  );
}
