import React, { useState, useEffect } from 'react';
import { 
  X, Check, ShieldCheck, ArrowRight, ArrowLeft, Sparkles, 
  Smartphone, Mail, CreditCard, QrCode, Lock, Download, 
  CheckCircle2, Clock, Calendar, MapPin, User, FileText, Loader2, Star,
  Grid2X2, Eye, MessageCircle, Crown
} from 'lucide-react';
import { BabyInputData, CustomerOrderDetails, ConsultationReportData } from '../types';
import { generateConsultationReport } from '../utils/scoring';
import { generateConsultationPDF } from '../utils/pdfGenerator';
import { ArchivalDossierSheet } from './ArchivalDossierSheet';
import { getOrderModalWhatsAppUrl } from '../utils/whatsapp';
import { notifyPdfStarting, notifyPdfSuccess, notifyPdfError, notifyWhatsAppOpening } from '../utils/notifications';
import { ZodiacFinderTooltip } from './ZodiacFinderTooltip';
import { getZodiacSignFromDob } from '../utils/zodiac';
import { triggerOrderCelebrationConfetti } from '../utils/confetti';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'INR' | 'USD';
  initialBabyName?: string;
  initialPackageTier?: 'report' | 'consultation';
  onOrderCompleted?: (order: CustomerOrderDetails, report: ConsultationReportData) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  currency,
  initialBabyName,
  initialPackageTier = 'report',
  onOrderCompleted
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [packageTier, setPackageTier] = useState<'report' | 'consultation'>(initialPackageTier);

  useEffect(() => {
    if (isOpen && initialPackageTier) {
      setPackageTier(initialPackageTier);
    }
  }, [isOpen, initialPackageTier]);
  
  // Step 1: Baby & Birth Data
  const [babyStatus, setBabyStatus] = useState<'born' | 'expecting'>('born');
  const [babyName, setBabyName] = useState<string>('Aarav');
  const [gender, setGender] = useState<'boy' | 'girl' | 'unisex'>('boy');

  useEffect(() => {
    if (isOpen && initialBabyName && initialBabyName.trim()) {
      setBabyName(initialBabyName.trim());
    }
  }, [isOpen, initialBabyName]);
  const [dob, setDob] = useState<string>('2026-03-18');
  const [timeOfBirth, setTimeOfBirth] = useState<string>('04:42');
  const [placeOfBirth, setPlaceOfBirth] = useState<string>('Bengaluru, Karnataka, India');
  const [surname, setSurname] = useState<string>('Gupta');
  const [preferences, setPreferences] = useState<string>('Modern Sanskrit roots, high emotional intelligence, global pronunciation');

  // Step 2: Parent Delivery Details
  const [parentName, setParentName] = useState<string>('Vikram Gupta');
  const [countryCode, setCountryCode] = useState<string>('+91');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('9876543210');
  const [email, setEmail] = useState<string>('vikram.gupta@example.com');

  // Step 3: Payment
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'ApplePay'>('UPI');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [upiId, setUpiId] = useState<string>('vikram@okaxis');
  const [cardNumber, setCardNumber] = useState<string>('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvc, setCardCvc] = useState<string>('888');

  // Step 4: Completed Order & Report Generation
  const [completedOrder, setCompletedOrder] = useState<CustomerOrderDetails | null>(null);
  const [generatedReport, setGeneratedReport] = useState<ConsultationReportData | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [step4ViewMode, setStep4ViewMode] = useState<'final_section' | 'full_sheet' | 'receipt'>('final_section');

  const isConsultation = packageTier === 'consultation';
  const packageName = isConsultation 
    ? 'Report + Personal Consultation' 
    : 'Baby Name Destiny Report';

  const originalPriceAmount = isConsultation
    ? (currency === 'INR' ? 999 : 29)
    : (currency === 'INR' ? 499 : 15);
  const originalPriceDisplay = isConsultation
    ? (currency === 'INR' ? '₹999' : '$29')
    : (currency === 'INR' ? '₹499' : '$15');

  const priceAmount = isConsultation
    ? (currency === 'INR' ? 499 : 10)
    : (currency === 'INR' ? 251 : 5);
  const priceDisplay = isConsultation
    ? (currency === 'INR' ? '₹499' : '$10')
    : (currency === 'INR' ? '₹251' : '$5');

  const discountDisplay = isConsultation
    ? (currency === 'INR' ? '₹500' : '$19')
    : (currency === 'INR' ? '₹248' : '$10');

  const detectedSign = getZodiacSignFromDob(dob);

  const handleSetQuickDate = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const iso = d.toISOString().split('T')[0];
    setDob(iso);
  };

  const whatsappInquiryUrl = getOrderModalWhatsAppUrl({
    babyName,
    surname,
    dob,
    orderId: completedOrder?.order_id,
    parentName,
    currency,
    step
  });

  if (!isOpen) return null;

  const handleProceedToDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob) {
      alert('Please provide the date of birth or expected due date.');
      return;
    }
    setStep(2);
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappNumber || whatsappNumber.length < 7) {
      alert('Please provide a valid WhatsApp number for report delivery.');
      return;
    }
    if (!email || !email.includes('@')) {
      alert('Please provide a valid email address.');
      return;
    }
    setStep(3);
  };

  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      // Generate Order details
      const orderId = `VDA-${Math.floor(10000 + Math.random() * 90000)}`;
      const babyData: BabyInputData = {
        baby_name: babyName || (gender === 'boy' ? 'Aarav' : 'Ananya'),
        gender,
        date_of_birth: dob,
        time_of_birth: timeOfBirth,
        place_of_birth: placeOfBirth,
        family_surname: surname,
        naming_preferences: preferences
      };

      const report = generateConsultationReport(babyData);

      const order: CustomerOrderDetails = {
        order_id: orderId,
        order_date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        parent_name: parentName,
        whatsapp_number: `${countryCode} ${whatsappNumber}`,
        country_code: countryCode,
        email,
        amount_inr: isConsultation ? 499 : 251,
        amount_usd: isConsultation ? 10 : 5,
        currency,
        payment_method: paymentMethod,
        baby_details: babyData,
        package_tier: packageTier,
        package_name: packageName,
        status: 'confirmed',
        delivery_promised_hours: isConsultation ? 12 : 24
      };

      setCompletedOrder(order);
      setGeneratedReport(report);
      setIsProcessingPayment(false);
      setStep(4);
      triggerOrderCelebrationConfetti();

      if (onOrderCompleted) {
        onOrderCompleted(order, report);
      }
    }, 1400);
  };

  const handleDownloadPdf = async () => {
    if (!generatedReport || isDownloadingPdf) return;
    const toastId = notifyPdfStarting();
    try {
      setIsDownloadingPdf(true);
      await generateConsultationPDF(generatedReport, currency);
      setDownloadSuccess(true);
      notifyPdfSuccess(toastId);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to download PDF:', err);
      notifyPdfError(toastId);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C1917]/70 backdrop-blur-sm overflow-y-auto">
      
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] border border-[#E6E2DA] rounded-3xl shadow-2xl overflow-hidden my-auto">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#E6E2DA] bg-[#F5F2EB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#C5A059]/40 flex items-center justify-center text-[#8C6D2D]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg font-medium text-[#1C1917]">
                  {step === 4 ? 'Order Confirmed' : 'Personalized Baby Dossier Intake'}
                </h3>
                {step < 4 && (
                  <div className="flex items-center gap-1.5 bg-[#EAE5DA] border border-[#D6CFC4] px-2.5 py-1 rounded-full shadow-xs">
                    <strong className="text-[#1C1917] font-serif text-xs font-bold">{priceDisplay}</strong>
                    <span className="line-through decoration-[#8C6D2D] decoration-1 text-[#8C827A] font-serif text-[11px] font-normal">{originalPriceDisplay}</span>
                    <span className="text-[9px] font-sans font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300/70 px-1.5 py-0.2 rounded-full uppercase tracking-wider">50% Off</span>
                  </div>
                )}
              </div>
              <p className="text-[11px] font-sans text-[#78716C]">
                {step === 1 && 'Step 1 of 3: Child Profile & Birth Coordinates'}
                {step === 2 && 'Step 2 of 3: Delivery Coordinates (WhatsApp & Email)'}
                {step === 3 && 'Step 3 of 3: Order Review & Secure Payment'}
                {step === 4 && 'Scheduled for 24h delivery • Instant Preview Ready'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              id="modal-header-whatsapp-btn"
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => notifyWhatsAppOpening({ babyName, orderId: completedOrder?.order_id })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#15803d] hover:text-[#166534] text-xs font-sans font-semibold transition-all cursor-pointer shadow-xs"
              title="Open WhatsApp conversation with an atelier consultant"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden sm:inline">Direct to WhatsApp</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 text-[#78716C] hover:text-[#1C1917] hover:bg-[#EAE5DA] rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          
          {/* STEP 1: Baby & Birth Details */}
          {step === 1 && (
            <form onSubmit={handleProceedToDelivery} className="space-y-5">
              
              {/* Status & Gender Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                    Baby's Status
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setBabyStatus('born')}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        babyStatus === 'born'
                          ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917]'
                          : 'bg-[#F5F2EB] text-[#57534E] border-[#E6E2DA] hover:border-[#D6CFC4]'
                      }`}
                    >
                      Already Born
                    </button>
                    <button
                      type="button"
                      onClick={() => setBabyStatus('expecting')}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        babyStatus === 'expecting'
                          ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917]'
                          : 'bg-[#F5F2EB] text-[#57534E] border-[#E6E2DA] hover:border-[#D6CFC4]'
                      }`}
                    >
                      Expecting
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                    Gender
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['boy', 'girl', 'unisex'] as const).map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        className={`py-2 px-2 rounded-xl text-xs font-medium capitalize border transition-all cursor-pointer ${
                          gender === g
                            ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917]'
                            : 'bg-[#F5F2EB] text-[#57534E] border-[#E6E2DA] hover:border-[#D6CFC4]'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Working Name & Surname */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                    {babyStatus === 'born' ? "Child's First Name (or Working Name)" : "Candidate Name (Optional)"}
                  </label>
                  <input
                    type="text"
                    value={babyName}
                    onChange={(e) => setBabyName(e.target.value)}
                    placeholder={gender === 'boy' ? 'e.g. Aarav' : 'e.g. Ananya'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2DA] bg-[#F5F2EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#8C6D2D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                    Family Surname *
                  </label>
                  <input
                    type="text"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    placeholder="e.g. Gupta, Sharma, Iyer"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2DA] bg-[#F5F2EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#8C6D2D]"
                  />
                </div>
              </div>

              {/* DOB, Time & Place */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#57534E]">
                      {babyStatus === 'born' ? 'Date of Birth *' : 'Expected Due Date *'}
                    </label>
                    <ZodiacFinderTooltip
                      dob={dob}
                      babyStatus={babyStatus}
                      onSelectDate={(newDate) => setDob(newDate)}
                    />
                  </div>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2DA] bg-[#F5F2EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#8C6D2D]"
                  />

                  {/* Quick Date Presets */}
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="text-[10px] text-[#78716C] font-sans">Quick:</span>
                    <button
                      type="button"
                      onClick={() => handleSetQuickDate(0)}
                      className="px-1.5 py-0.5 text-[10px] rounded bg-[#FAF8F5] border border-[#E6E2DA] text-[#57534E] hover:text-[#1C1917] hover:border-[#C5A059] transition-colors cursor-pointer"
                    >
                      Today
                    </button>
                    {babyStatus === 'born' ? (
                      <button
                        type="button"
                        onClick={() => handleSetQuickDate(-1)}
                        className="px-1.5 py-0.5 text-[10px] rounded bg-[#FAF8F5] border border-[#E6E2DA] text-[#57534E] hover:text-[#1C1917] hover:border-[#C5A059] transition-colors cursor-pointer"
                      >
                        Yesterday
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => handleSetQuickDate(14)}
                          className="px-1.5 py-0.5 text-[10px] rounded bg-[#FAF8F5] border border-[#E6E2DA] text-[#57534E] hover:text-[#1C1917] hover:border-[#C5A059] transition-colors cursor-pointer"
                        >
                          +2 Wks
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSetQuickDate(30)}
                          className="px-1.5 py-0.5 text-[10px] rounded bg-[#FAF8F5] border border-[#E6E2DA] text-[#57534E] hover:text-[#1C1917] hover:border-[#C5A059] transition-colors cursor-pointer"
                        >
                          +1 Mo
                        </button>
                      </>
                    )}
                  </div>

                  {/* Live Astrological Sun Sign Pill */}
                  {detectedSign ? (
                    <div className="mt-1.5 p-2 rounded-lg bg-[#FAF8F5] border border-[#C5A059]/50 flex items-center justify-between gap-1.5 text-[11px] font-sans shadow-2xs">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-xs" title={detectedSign.name}>{detectedSign.symbol}</span>
                        <strong className="font-serif font-semibold text-[#1C1917]">{detectedSign.name}</strong>
                        <span className="text-[10px] text-[#78716C]">({detectedSign.rashiEnglish})</span>
                        <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                        <span className="text-[10px] text-[#8C6D2D] font-medium">{detectedSign.element}</span>
                      </div>
                      <span className="text-[10px] text-[#78716C] font-sans shrink-0 truncate">
                        Ruled by {detectedSign.rulingPlanet}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-1 text-[10px] text-[#78716C] font-sans">
                      Select date to verify child's Sun sign.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                    Time of Birth
                  </label>
                  <input
                    type="time"
                    value={timeOfBirth}
                    onChange={(e) => setTimeOfBirth(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2DA] bg-[#F5F2EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#8C6D2D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                    Birth Place / City
                  </label>
                  <input
                    type="text"
                    value={placeOfBirth}
                    onChange={(e) => setPlaceOfBirth(e.target.value)}
                    placeholder="e.g. Bengaluru, India"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2DA] bg-[#F5F2EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#8C6D2D]"
                  />
                </div>
              </div>

              {/* Naming Wishes / Candidate Names */}
              <div>
                <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                  Family Preferences or Candidate Names
                </label>
                <textarea
                  rows={2}
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  placeholder="e.g. Modern Sanskrit, starts with A or V, auspicious compound 11 or 19..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2DA] bg-[#F5F2EB] text-xs sm:text-sm text-[#1C1917] focus:outline-none focus:border-[#8C6D2D]"
                />
              </div>

              {/* Step 1 Footer */}
              <div className="pt-4 border-t border-[#E6E2DA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs">
                  <span className="text-[#78716C] font-medium">Investment:</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm text-[#8C827A] line-through decoration-[#8C6D2D] decoration-1 font-serif">{originalPriceDisplay}</span>
                    <strong className="text-[#1C1917] font-serif font-bold text-base">{priceDisplay}</strong>
                  </div>
                  <span className="text-[10px] font-sans font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300/60 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    50% Discount • Save {discountDisplay}
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524] text-xs font-sans font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Continue to Delivery Details</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                </button>
              </div>

              {/* Step 1 WhatsApp Inquiry note */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-[#78716C]">
                <span>Need assistance with Nakshatra or phonetic syllables?</span>
                <a
                  id="order-modal-step1-whatsapp-btn"
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => notifyWhatsAppOpening({ babyName })}
                  className="inline-flex items-center gap-1 text-[#15803d] hover:text-[#166534] font-medium transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Direct to WhatsApp</span>
                </a>
              </div>

            </form>
          )}

          {/* STEP 2: Delivery Coordinates (WhatsApp & Email) */}
          {step === 2 && (
            <form onSubmit={handleProceedToReview} className="space-y-5">
              
              <div className="p-4 rounded-2xl bg-[#F5F2EB] border border-[#E6E2DA] text-xs text-[#57534E] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-[#8C6D2D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1C1917] block mb-0.5">24-Hour Digital Delivery Guarantee</strong>
                    Your official 4-panel A4 landscape dossier will be sent directly as a document to your WhatsApp and backed up to your Email within 24 hours.
                  </div>
                </div>
                <a
                  id="order-modal-step2-whatsapp-btn"
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => notifyWhatsAppOpening({ babyName })}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/50 text-[#15803d] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Direct to WhatsApp</span>
                </a>
              </div>

              <div>
                <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                  Parent / Orderer Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g. Vikram & Ananya Gupta"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2DA] bg-[#F5F2EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#8C6D2D]"
                />
              </div>

              {/* WhatsApp Number with Country Code */}
              <div>
                <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                  WhatsApp Mobile Number (For Document Delivery) *
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-[#E6E2DA] bg-[#F5F2EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#8C6D2D]"
                  >
                    <option value="+91">+91 (India)</option>
                    <option value="+1">+1 (USA / Canada)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+971">+971 (UAE)</option>
                    <option value="+65">+65 (Singapore)</option>
                    <option value="+61">+61 (Australia)</option>
                  </select>
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="9876543210"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#E6E2DA] bg-[#F5F2EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#8C6D2D]"
                  />
                </div>
                <span className="text-[10px] text-[#78716C] mt-1 block">
                  We will send the ready PDF directly to this WhatsApp chat.
                </span>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#57534E] mb-1.5">
                  Email Address (For Archival Backup) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E2DA] bg-[#F5F2EB] text-sm text-[#1C1917] focus:outline-none focus:border-[#8C6D2D]"
                />
              </div>

              {/* Step 2 Footer */}
              <div className="pt-4 border-t border-[#E6E2DA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-[#78716C] hover:text-[#1C1917] flex items-center gap-1 cursor-pointer order-2 sm:order-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Birth Details</span>
                </button>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 order-1 sm:order-2">
                  <div className="flex items-center gap-2.5 text-xs">
                    <span className="text-[#78716C] font-medium">Total:</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm text-[#8C827A] line-through decoration-[#8C6D2D] decoration-1 font-serif">{originalPriceDisplay}</span>
                      <strong className="text-[#1C1917] font-serif font-bold text-base">{priceDisplay}</strong>
                    </div>
                    <span className="text-[10px] font-sans font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300/60 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      50% Discount • Save {discountDisplay}
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524] text-xs font-sans font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Review Order & Pay</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                  </button>
                </div>
              </div>

            </form>
          )}

          {/* STEP 3: Order Review & Payment */}
          {step === 3 && (
            <div className="space-y-6">
              
              {/* Luxury Atelier Checkout Summary & Itemized Breakdown Receipt */}
              <div className="p-6 rounded-2xl bg-[#F5F2EB] border-2 border-[#D6CFC4] space-y-4 text-xs shadow-xs relative overflow-hidden">
                {/* Atelier Header Ribbon */}
                <div className="flex items-center justify-between border-b border-[#E6E2DA] pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#8C6D2D]" />
                    <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#8C6D2D]">
                      Atelier Specification & Ledger
                    </span>
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#78716C] bg-[#EAE5DA] px-2 py-0.5 rounded-full border border-[#D6CFC4]">
                    Consultation Ref • {currency === 'INR' ? 'Shagun Series' : 'Intl Series'}
                  </span>
                </div>

                {/* Package Tier Selection Toggle in Step 3 */}
                <div className="space-y-2 border-b border-[#E6E2DA] pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#57534E]">
                      Selected Package Tier
                    </span>
                    <span className="text-[10px] text-[#8C6D2D] font-medium">Click to switch tier</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPackageTier('report')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        packageTier === 'report'
                          ? 'bg-[#FAF8F5] border-2 border-[#8C6D2D] shadow-sm'
                          : 'bg-[#F5F2EB] border-[#E6E2DA] hover:border-[#D6CFC4] opacity-80'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#1C1917]">
                        <span>Baby Name Destiny Report</span>
                        <span className="text-[#8C6D2D] font-serif">{currency === 'INR' ? '₹251' : '$5'}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#78716C] mt-1">
                        <span>4-Panel 300 DPI Dossier</span>
                        <span className="line-through">{currency === 'INR' ? '₹499' : '$15'}</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPackageTier('consultation')}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative ${
                        packageTier === 'consultation'
                          ? 'bg-[#FAF8F5] border-2 border-[#8C6D2D] shadow-sm'
                          : 'bg-[#F5F2EB] border-[#E6E2DA] hover:border-[#D6CFC4] opacity-80'
                      }`}
                    >
                      <span className="absolute -top-2 right-3 px-2 py-0.2 rounded-full bg-[#1C1917] text-[#E7C96A] text-[9px] font-bold uppercase tracking-wider">
                        Most Popular
                      </span>
                      <div className="flex items-center justify-between text-xs font-bold text-[#1C1917]">
                        <span>Report + Personal Consultation</span>
                        <span className="text-[#8C6D2D] font-serif">{currency === 'INR' ? '₹499' : '$10'}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#78716C] mt-1">
                        <span>Dossier + 1-on-1 Specialist Audio</span>
                        <span className="line-through">{currency === 'INR' ? '₹999' : '$29'}</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Consultation Title & Baseline */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6E2DA] pb-3">
                  <div>
                    <h4 className="text-base font-serif font-medium text-[#1C1917]">
                      {packageName}
                    </h4>
                    <p className="text-[11px] text-[#78716C] mt-0.5 font-sans">
                      {isConsultation 
                        ? 'Complete 4-panel archival dossier plus 1-on-1 WhatsApp audio/chat consultation with Senior Specialist.' 
                        : 'Acoustic vibration audit, lunar Nakshatra synthesis & family surname harmony.'}
                    </p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <div className="flex items-baseline sm:justify-end gap-2">
                      <span className="text-sm sm:text-base text-[#8C827A] line-through decoration-[#8C6D2D] decoration-1 font-serif">{originalPriceDisplay}</span>
                      <span className="font-serif font-bold text-[#1C1917] text-xl sm:text-2xl">{priceDisplay}</span>
                    </div>
                    <span className="text-[10px] font-sans font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300/60 px-2 py-0.5 rounded-full inline-block mt-0.5 uppercase tracking-wider">
                      50% Discount • Save {discountDisplay}
                    </span>
                  </div>
                </div>

                {/* Child & Delivery Particulars Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-1 text-xs text-[#57534E]">
                  <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E6E2DA]">
                    <span className="text-[10px] uppercase font-semibold text-[#8C6D2D] block tracking-wider">Candidate</span>
                    <strong className="text-[#1C1917] truncate block">{babyName || 'Baby'} {surname}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E6E2DA]">
                    <span className="text-[10px] uppercase font-semibold text-[#8C6D2D] block tracking-wider">Gender</span>
                    <strong className="text-[#1C1917] capitalize block">{gender}</strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E6E2DA]">
                    <span className="text-[10px] uppercase font-semibold text-[#8C6D2D] block tracking-wider">Date & Sun Sign</span>
                    <strong className="text-[#1C1917] block truncate" title={`${dob}${detectedSign ? ` • ${detectedSign.name} ${detectedSign.symbol}` : ''}`}>
                      {dob}{detectedSign ? ` • ${detectedSign.name} ${detectedSign.symbol}` : ''}
                    </strong>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E6E2DA]">
                    <span className="text-[10px] uppercase font-semibold text-[#8C6D2D] block tracking-wider">Delivery Time</span>
                    <strong className="text-emerald-700 block font-medium">
                      {isConsultation ? 'Within 12 Hours (VIP)' : 'Within 24 Hours'}
                    </strong>
                  </div>
                </div>

                {/* Itemized Price Ledger: Original, Discount, Final Total */}
                <div className="pt-2 border-t border-[#E6E2DA] space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-[#57534E]">
                    <span className="font-medium">Standard Consultation Valuation</span>
                    <span className="line-through decoration-[#8C6D2D] decoration-2 text-[#8C827A] font-serif text-sm font-normal">{originalPriceDisplay}</span>
                  </div>

                  <div className="flex justify-between items-center text-emerald-800 bg-emerald-50/90 p-2.5 rounded-xl border border-emerald-200/80">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                      <span className="font-semibold">Auspicious Shagun Blessing Courtesy</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 shadow-xs">
                        50% Discount
                      </span>
                    </div>
                    <span className="font-bold font-sans text-sm">-{discountDisplay}</span>
                  </div>

                  <div className="flex justify-between items-center text-[#57534E]">
                    <span>{isConsultation ? '12-Hour VIP Priority WhatsApp & Email Dispatch' : '24-Hour WhatsApp & Email Archival Dispatch'}</span>
                    <span className="font-medium text-emerald-700">Complimentary (₹0)</span>
                  </div>

                  {/* Final Total Row */}
                  <div className="pt-3.5 border-t-2 border-[#D6CFC4] bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E2DA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-xs uppercase tracking-widest text-[#1C1917] block">
                          Final Total Payable
                        </span>
                        <span className="text-[10px] font-sans font-semibold text-[#8C6D2D] bg-[#EAE5DA] border border-[#D6CFC4] px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Sacred Shagun Total
                        </span>
                      </div>
                      <span className="text-[10px] text-[#78716C] mt-0.5 block">
                        All-inclusive one-time contribution • Zero recurring charges • {isConsultation ? '300 DPI Dossier + 1-on-1 Specialist Audio' : '300 DPI Dossier included'}
                      </span>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <div className="flex items-baseline sm:justify-end gap-3">
                        <div className="flex flex-col items-start sm:items-end">
                          <span className="text-[9px] uppercase font-sans text-[#8C827A] font-medium tracking-wider">Original</span>
                          <span 
                            id="modal-checkout-original-price" 
                            className="text-lg sm:text-xl text-[#8C827A] line-through decoration-[#8C6D2D] decoration-2 font-serif font-light tracking-tight select-none"
                            title="Original consultation value"
                          >
                            {originalPriceDisplay}
                          </span>
                        </div>
                        <span 
                          id="modal-checkout-final-price" 
                          className="text-3xl sm:text-4xl font-serif font-bold text-[#1C1917] tracking-tight"
                        >
                          {priceDisplay}
                        </span>
                      </div>
                      <div className="text-[10px] font-sans font-bold text-emerald-800 block mt-1">
                        50% Discount Applied • Save {discountDisplay}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-[#E6E2DA] text-[11px] text-[#78716C] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span>Dispatching to: <strong className="text-[#1C1917]">{countryCode} {whatsappNumber}</strong> &amp; <strong className="text-[#1C1917]">{email}</strong></span>
                  <span className="text-[#8C6D2D] font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {isConsultation ? '12h VIP Priority' : '24h Guaranteed'}
                  </span>
                </div>
              </div>

              {/* Payment Methods Selector */}
              <div>
                <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#57534E] mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['UPI', 'Card', 'NetBanking'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`py-3 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        paymentMethod === method
                          ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] shadow-sm'
                          : 'bg-[#F5F2EB] text-[#57534E] border-[#E6E2DA] hover:border-[#D6CFC4]'
                      }`}
                    >
                      {method === 'UPI' && <QrCode className="w-3.5 h-3.5 text-[#C5A059]" />}
                      {method === 'Card' && <CreditCard className="w-3.5 h-3.5 text-[#C5A059]" />}
                      {method === 'NetBanking' && <Lock className="w-3.5 h-3.5 text-[#C5A059]" />}
                      <span>{method}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* UPI Tab */}
              {paymentMethod === 'UPI' && (
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6E2DA] space-y-3 text-xs">
                  <div className="flex items-center justify-between text-[#57534E]">
                    <span>
                      Instant transfer of <strong className="text-[#1C1917]">{priceDisplay}</strong>{' '}
                      <span className="line-through decoration-[#8C6D2D] text-[#8C827A] font-serif text-[11px]">({originalPriceDisplay})</span>{' '}
                      <span className="text-emerald-800 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">50% Off</span> via GPay, PhonePe, Paytm, BHIM
                    </span>
                    <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">Zero Fee</span>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#78716C] mb-1">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="mobile@upi or yourname@okaxis"
                      className="w-full px-3 py-2.5 rounded-lg border border-[#E6E2DA] bg-[#F5F2EB] text-xs text-[#1C1917] focus:outline-none focus:border-[#8C6D2D]"
                    />
                  </div>
                </div>
              )}

              {/* Card Tab */}
              {paymentMethod === 'Card' && (
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6E2DA] space-y-3 text-xs">
                  <div className="text-[#57534E] flex items-center justify-between">
                    <span>
                      Pay <strong className="text-[#1C1917]">{priceDisplay}</strong>{' '}
                      <span className="line-through decoration-[#8C6D2D] text-[#8C827A] font-serif text-[11px]">({originalPriceDisplay})</span>{' '}
                      <span className="text-emerald-800 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">50% Off</span> securely with Credit or Debit card
                    </span>
                    <span className="text-xs text-[#78716C]">Visa, Mastercard, RuPay</span>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-semibold text-[#78716C] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 •••• •••• ••••"
                      className="w-full px-3 py-2 rounded-lg border border-[#E6E2DA] bg-[#F5F2EB] text-xs text-[#1C1917] focus:outline-none focus:border-[#8C6D2D]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-[#78716C] mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 rounded-lg border border-[#E6E2DA] bg-[#F5F2EB] text-xs text-[#1C1917] focus:outline-none focus:border-[#8C6D2D]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-semibold text-[#78716C] mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="•••"
                        className="w-full px-3 py-2 rounded-lg border border-[#E6E2DA] bg-[#F5F2EB] text-xs text-[#1C1917] focus:outline-none focus:border-[#8C6D2D]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* NetBanking Tab */}
              {paymentMethod === 'NetBanking' && (
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6E2DA] text-xs text-[#57534E] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span>
                      Direct Bank Transfer: <strong className="text-[#1C1917]">{priceDisplay}</strong>{' '}
                      <span className="line-through decoration-[#8C6D2D] text-[#8C827A] font-serif text-[11px]">({originalPriceDisplay})</span>{' '}
                      <span className="text-emerald-800 font-bold text-[10px] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">50% Off</span>
                    </span>
                    <span className="text-emerald-700 font-semibold text-[10px]">Instant Authorization</span>
                  </div>
                  <p className="text-[#78716C]">Supported Banks: HDFC, ICICI, SBI, Axis, Kotak, Standard Chartered, and all major international banking portals.</p>
                </div>
              )}

              {/* Security Seal & WhatsApp Help */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 rounded-xl bg-[#FAF8F5] border border-[#E6E2DA] text-[11px] text-[#78716C]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8C6D2D] shrink-0" />
                  <span>256-Bit SSL Encrypted • Instant Access Unlocked Upon Checkout</span>
                </div>
                <a
                  id="order-modal-step3-whatsapp-btn"
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => notifyWhatsAppOpening({ babyName })}
                  className="inline-flex items-center gap-1.5 text-xs text-[#15803d] hover:text-[#166534] font-semibold transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Direct to WhatsApp</span>
                </a>
              </div>

              {/* Step 3 Footer */}
              <div className="pt-4 border-t border-[#E6E2DA] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-[#78716C] hover:text-[#1C1917] flex items-center gap-1 cursor-pointer order-2 sm:order-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Contact</span>
                </button>

                <div className="flex flex-col items-center sm:items-end w-full sm:w-auto order-1 sm:order-2">
                  <button
                    type="button"
                    onClick={handleSimulatePayment}
                    disabled={isProcessingPayment}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524] text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase transition-all cursor-pointer flex items-center justify-center gap-3 shadow-md hover:shadow-lg disabled:opacity-75 group"
                  >
                    {isProcessingPayment ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#C5A059]" />
                        <span>Verifying Payment...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Pay {priceDisplay} & Receive Dossier</span>
                        <span className="text-xs text-[#E7C96A] font-normal line-through decoration-[#C5A059] decoration-1 opacity-80 font-serif">
                          {originalPriceDisplay}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          50% OFF
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  <div className="text-[11px] text-[#78716C] mt-2 text-center sm:text-right flex flex-wrap items-center justify-center sm:justify-end gap-1.5">
                    <span>Final payable:</span>
                    <span className="line-through decoration-[#8C6D2D] decoration-1 text-[#8C827A] font-serif">{originalPriceDisplay}</span>
                    <strong className="text-[#1C1917] font-serif font-bold text-sm">{priceDisplay}</strong>
                    <span className="text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px]">
                      50% Discount Applied • Save {discountDisplay}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* STEP 4: Order Confirmation & Immediate Value Unlock */}
          {step === 4 && completedOrder && generatedReport && (
            <div className="space-y-6 text-center">
              
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8C6D2D]">
                  PAYMENT SUCCESSFUL • ORDER ID: {completedOrder.order_id}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1917] mt-1 font-normal">
                  Thank You, {completedOrder.parent_name}!
                </h3>
                <p className="text-xs sm:text-sm text-[#57534E] mt-2 max-w-md mx-auto leading-relaxed">
                  Your personalized 4-panel dossier is in preparation. It will be sent directly to your WhatsApp at <strong className="text-[#1C1917]">{completedOrder.whatsapp_number}</strong> and Email within 24 hours.
                </p>
                <div className="mt-3 flex justify-center">
                  <button
                    type="button"
                    onClick={triggerOrderCelebrationConfetti}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-sans font-semibold rounded-full bg-[#FAF8F5] border border-[#C5A059] text-[#8C6D2D] hover:bg-[#F5F2EB] transition-all cursor-pointer shadow-xs"
                    title="Celebrate with confetti"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Celebrate</span>
                  </button>
                </div>
              </div>

              {/* Step 4 Navigation Tabs */}
              <div className="flex items-center justify-center gap-2 max-w-lg mx-auto">
                <button
                  type="button"
                  onClick={() => setStep4ViewMode('final_section')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    step4ViewMode === 'final_section'
                      ? 'bg-[#1C1917] text-[#FAF8F5] shadow-sm'
                      : 'bg-[#EAE5DA] text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  <Star className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]" />
                  <span>Report Final Section</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep4ViewMode('full_sheet')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    step4ViewMode === 'full_sheet'
                      ? 'bg-[#1C1917] text-[#FAF8F5] shadow-sm'
                      : 'bg-[#EAE5DA] text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  <Grid2X2 className="w-3.5 h-3.5" />
                  <span>4-Panel Dossier</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep4ViewMode('receipt')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    step4ViewMode === 'receipt'
                      ? 'bg-[#1C1917] text-[#FAF8F5] shadow-sm'
                      : 'bg-[#EAE5DA] text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Payment Receipt</span>
                </button>
              </div>

              {/* View 1: Report Final Section (Verdict, Top 3 & Laureate) */}
              {step4ViewMode === 'final_section' && (
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between px-2 text-xs text-[#78716C]">
                    <span className="font-heading font-bold uppercase tracking-wider text-[#1C1917] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#8C6D2D]" />
                      REPORT FINAL SECTION • TOP 3 SELECTIONS &amp; CROWN RECOMMENDATION
                    </span>
                    <span className="text-[11px] text-[#8C6D2D] font-medium">Official Dossier Excerpt</span>
                  </div>
                  <ArchivalDossierSheet showOnlyFinalSection={true} currency={currency} />
                </div>
              )}

              {/* View 2: Complete 4-Panel Archival Dossier Sheet */}
              {step4ViewMode === 'full_sheet' && (
                <div className="space-y-4 text-left">
                  <div className="flex items-center justify-between px-2 text-xs text-[#78716C]">
                    <span className="font-heading font-bold uppercase tracking-wider text-[#1C1917] flex items-center gap-1.5">
                      <Grid2X2 className="w-3.5 h-3.5 text-[#8C6D2D]" />
                      FULL 4-PANEL ARCHIVAL DOSSIER SHEET (2X2 LANDSCAPE)
                    </span>
                    <span className="text-[11px] text-[#8C6D2D] font-medium">Master Aarav Gupta</span>
                  </div>
                  <ArchivalDossierSheet currency={currency} />
                </div>
              )}

              {/* View 3: Confirmed Payment Receipt Summary */}
              {step4ViewMode === 'receipt' && (
                <div className="p-5 rounded-2xl bg-[#F5F2EB] border-2 border-[#D6CFC4] max-w-lg mx-auto text-xs text-left space-y-3">
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#E6E2DA]">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#8C6D2D]" />
                      <span className="font-sans font-semibold uppercase tracking-wider text-[11px] text-[#1C1917]">
                        Official Payment Receipt
                      </span>
                    </div>
                    <span className="text-emerald-800 bg-emerald-100/90 border border-emerald-300/60 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 text-[10px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                      Paid &amp; Confirmed
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[#1C1917] pb-2 border-b border-[#E6E2DA]">
                      <span className="font-semibold text-xs">Commissioned Package:</span>
                      <span className="font-serif font-bold text-[#8C6D2D]">{completedOrder.package_name || packageName}</span>
                    </div>

                    <div className="flex items-center justify-between text-[#57534E]">
                      <span className="font-medium">Standard Consultation Fee</span>
                      <span className="line-through decoration-[#8C6D2D] decoration-2 text-[#8C827A] font-serif text-sm font-normal">{originalPriceDisplay}</span>
                    </div>
                    <div className="flex items-center justify-between text-emerald-800 bg-emerald-50/90 p-2.5 rounded-xl border border-emerald-200/80">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                        <span className="font-semibold">Auspicious Shagun Blessing Courtesy</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 font-bold uppercase tracking-wider">50% Discount</span>
                      </span>
                      <span className="font-bold font-sans text-sm">-{discountDisplay}</span>
                    </div>

                    {completedOrder.package_tier === 'consultation' && (
                      <div className="p-3 rounded-xl bg-gradient-to-r from-[#FAF8F5] to-[#F5F2EB] border border-[#C5A059] space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1C1917]">
                          <Crown className="w-3.5 h-3.5 text-[#8C6D2D]" />
                          <span>1-on-1 WhatsApp Audio Consultation Included</span>
                        </div>
                        <p className="text-[11px] text-[#78716C]">
                          Our Senior Atelier Specialist will reach out directly on WhatsApp at {completedOrder.whatsapp_number} within 12 hours for the 1-on-1 audio consultation &amp; custom family names audit.
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between font-medium text-[#1C1917] pt-2.5 border-t border-[#D6CFC4]">
                      <div>
                        <span className="font-heading font-bold text-xs uppercase tracking-wider block">Final Total Paid</span>
                        <span className="text-[10px] text-[#78716C] font-normal">
                          {completedOrder.package_tier === 'consultation'
                            ? 'Complete 4-panel dossier + 1-on-1 Specialist Audio Guidance'
                            : 'Includes complete 4-panel dossier + 24h WhatsApp dispatch'}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="flex items-baseline justify-end gap-2">
                          <span className="text-sm text-[#8C827A] line-through decoration-[#8C6D2D] decoration-1 font-serif">{originalPriceDisplay}</span>
                          <span className="font-serif font-bold text-2xl text-[#1C1917]">{priceDisplay}</span>
                        </div>
                        <span className="text-[10px] font-sans font-bold text-emerald-800 block mt-0.5">
                          50% Discount Applied • Saved {discountDisplay}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#78716C] pt-2 border-t border-[#E6E2DA] flex items-center justify-between">
                    <span>Payment via: <strong className="text-[#1C1917]">{completedOrder.payment_method}</strong></span>
                    <span>Transaction ID: <strong className="font-mono text-[#1C1917]">TXN-{completedOrder.order_id}</strong></span>
                  </div>
                </div>
              )}

              {/* Instant Access Highlight Card */}
              <div className="p-6 rounded-2xl bg-[#0D1B2E] border border-[#C9A227]/40 text-[#F7F1DF] text-left shadow-lg">
                <div className="flex items-center justify-between border-b border-[#C9A227]/30 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#E7C96A]" />
                    <span className="text-xs font-heading font-bold text-[#E7C96A] tracking-wider uppercase">
                      IMMEDIATE VALUE UNLOCKED: LIVE DOSSIER READY
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40">
                    Instant Access
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Calculated Birth Number:</span>
                    <span className="font-bold text-[#E7C96A]">
                      {generatedReport.blueprint.birth_number} ({generatedReport.blueprint.birth_planet})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Calculated Destiny Number:</span>
                    <span className="font-bold text-[#E7C96A]">
                      {generatedReport.blueprint.destiny_number} ({generatedReport.blueprint.destiny_planet})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Vedic Janma Nakshatra:</span>
                    <span className="font-semibold text-white">
                      {generatedReport.vedic.nakshatra || 'Auspicious Lunar Alignment'}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#C9A227]/20">
                    <span className="text-gray-400">Crown Recommended Name:</span>
                    <span className="font-heading font-bold text-[#E7C96A] text-sm">
                      {generatedReport.top_3.best_overall.name} ({generatedReport.top_3.best_overall.compound_number})
                    </span>
                  </div>
                </div>

                {/* Direct High-Res PDF Download Button */}
                <div className="mt-5 pt-4 border-t border-[#C9A227]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-gray-300">
                    Download your print-ready A4 landscape PDF right now:
                  </div>

                  <button
                    id="btn-order-download-pdf"
                    onClick={handleDownloadPdf}
                    disabled={isDownloadingPdf}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#dec477] via-[#c5a059] to-[#977227] text-[#080d1a] hover:brightness-110 font-heading font-extrabold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isDownloadingPdf ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#080d1a]" />
                        <span>Compiling Dossier...</span>
                      </>
                    ) : downloadSuccess ? (
                      <>
                        <Check className="w-4 h-4 text-[#080d1a]" />
                        <span>Report Downloaded!</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-[#080d1a]" />
                        <span>DOWNLOAD PREMIUM REPORT</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Priority Concierge Support & Order Inquiries */}
              <div className="p-4 rounded-2xl bg-[#F5F2EB] border border-[#E6E2DA] max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#57534E]">
                <div className="text-left">
                  <strong className="text-[#1C1917] block">Priority Concierge Support</strong>
                  <span className="text-[11px] text-[#78716C]">Questions regarding dossier delivery or custom family additions?</span>
                </div>
                <a
                  id="order-modal-step4-whatsapp-btn"
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => notifyWhatsAppOpening({ babyName, orderId: completedOrder?.order_id })}
                  className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/50 text-[#15803d] font-semibold text-xs tracking-wider transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Direct to WhatsApp</span>
                </a>
              </div>

              {/* Close / Return Button */}
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full border border-[#E6E2DA] bg-[#F5F2EB] text-[#57534E] hover:text-[#1C1917] text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Return to Storefront
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
