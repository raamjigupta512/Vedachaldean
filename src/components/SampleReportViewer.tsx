import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  FileText,
  CheckCircle2,
  ChevronRight,
  Eye,
  ShieldCheck,
  Download,
  Award,
  Star,
  Grid2X2,
  Maximize2,
  Layers,
  Loader2,
  Check,
  Clock,
  BookOpen,
  Info,
  ChevronDown,
  ChevronUp,
  Timer
} from 'lucide-react';
import babyPhoto from '../assets/images/sleeping_newborn_baby_1789326693225.jpg';
import { SAMPLE_DOSSIER_DATA } from '../data/sampleDossierData';
import { ArchivalDossierSheet } from './ArchivalDossierSheet';
import { generateConsultationPDF } from '../utils/pdfGenerator';
import { generateConsultationReport } from '../utils/scoring';
import { notifyPdfStarting, notifyPdfSuccess, notifyPdfError } from '../utils/notifications';
import { calculateDossierReadingTime } from '../utils/readingTime';

interface SampleReportViewerProps {
  onOpenOrder: () => void;
  currency: 'INR' | 'USD';
}

export const SampleReportViewer: React.FC<SampleReportViewerProps> = ({
  onOpenOrder,
  currency
}) => {
  const [viewMode, setViewMode] = useState<'full' | 'panels'>('full');
  const [selectedPanel, setSelectedPanel] = useState<number>(1);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showReadingBreakdown, setShowReadingBreakdown] = useState(false);

  const priceDisplay = currency === 'INR' ? '₹251' : '$5';
  const originalPriceDisplay = currency === 'INR' ? '₹499' : '$15';
  const discountDisplay = currency === 'INR' ? '₹248' : '$10';
  const sample = SAMPLE_DOSSIER_DATA;

  // Calculate dynamic reading time & document depth analytics
  const readingStats = useMemo(() => calculateDossierReadingTime(sample), [sample]);

  const handleDownloadSamplePdf = async () => {
    if (isDownloadingPdf) return;
    const toastId = notifyPdfStarting();
    try {
      setIsDownloadingPdf(true);
      const sampleBabyInput = {
        baby_name: 'Aarav',
        gender: 'boy' as const,
        date_of_birth: '2026-03-18',
        time_of_birth: '06:42',
        place_of_birth: 'Bengaluru, Karnataka, India',
        family_surname: 'Gupta',
        naming_preferences: 'Auspicious Chaldean compound, peaceful and harmonious vibration, global pronunciation'
      };
      const report = generateConsultationReport(sampleBabyInput);
      await generateConsultationPDF(report, currency);
      setDownloadSuccess(true);
      notifyPdfSuccess(toastId);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('Error generating PDF:', err);
      notifyPdfError(toastId);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <section id="sample-report" className="py-20 bg-[#F5F2EB] border-t border-b border-[#E6E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[11px] font-sans font-semibold tracking-[0.2em] text-[#8C6D2D] uppercase">
            MUSEUM-GRADE CRAFTSMANSHIP
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-[#1C1917] font-normal">
            Inside Your 4-Panel Archival Dossier
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#57534E] font-sans leading-relaxed">
            Every report is custom-compiled for your family, following authentic Chaldean letter vibrations, Vedic astrological calculations, and heirloom typography.
          </p>

          {/* Quick Action Badges */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#EAE5DA] text-[#1C1917] font-medium border border-[#D6CFC4] flex items-center gap-1.5 shadow-2xs">
              <span className="text-[#8C6D2D] font-medium text-[11px]">Sacred Shagun Offering:</span>
              <span className="line-through decoration-[#8C6D2D] decoration-1 text-[#8C827A] font-serif text-[11px]">{originalPriceDisplay}</span>
              <strong className="text-[#1C1917] font-serif font-bold text-xs">{priceDisplay}</strong>
              <span className="text-[9px] font-sans font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300/70 px-1.5 py-0.2 rounded-full uppercase">50% Off</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-[#EAE5DA] text-[#1C1917] font-medium border border-[#D6CFC4] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6D2D]" />
              Official Sample: Master Aarav Gupta
            </span>
            <span className="px-3 py-1 rounded-full bg-[#EAE5DA] text-[#57534E] font-medium border border-[#D6CFC4]">
              Print-Ready 300 DPI A4 Landscape
            </span>
            <button
              id="btn-reading-time-toggle"
              type="button"
              onClick={() => setShowReadingBreakdown(!showReadingBreakdown)}
              className="px-3 py-1 rounded-full bg-[#FAF8F5] text-[#1C1917] font-medium border border-[#C5A059] hover:bg-[#F5F2EB] transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
              title="Click to view estimated reading time and dossier depth breakdown"
            >
              <Clock className="w-3.5 h-3.5 text-[#8C6D2D]" />
              <span>
                Est. Reading Time: <strong className="text-[#8C6D2D] font-bold">{readingStats.formattedTotalTime}</strong> ({readingStats.totalWords.toLocaleString()} words)
              </span>
              {showReadingBreakdown ? (
                <ChevronUp className="w-3 h-3 text-[#78716C]" />
              ) : (
                <ChevronDown className="w-3 h-3 text-[#78716C]" />
              )}
            </button>
            <button
              onClick={handleDownloadSamplePdf}
              disabled={isDownloadingPdf}
              className="px-3 py-1 rounded-full bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524] font-medium text-[11px] transition-all cursor-pointer flex items-center gap-1.5"
            >
              {isDownloadingPdf ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin text-[#C5A059]" />
                  <span>Preparing Sample PDF...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3 h-3 text-[#C5A059]" />
                  <span>Download Sample Dossier PDF</span>
                </>
              )}
            </button>
          </div>

          {/* Collapsible Estimated Reading Time & Document Depth Breakdown */}
          {showReadingBreakdown && (
            <div 
              id="dossier-reading-breakdown-drawer"
              className="mt-6 p-5 sm:p-6 rounded-3xl bg-[#FAF8F5] border-2 border-[#C5A059]/40 text-left shadow-md max-w-4xl mx-auto transition-all animate-in fade-in duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E6E2DA]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F5F2EB] border border-[#C5A059] flex items-center justify-center text-[#8C6D2D] shadow-2xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-bold text-[#1C1917]">
                      Archival Dossier Reading Time &amp; Depth Analysis
                    </h4>
                    <p className="text-[11px] font-sans text-[#78716C]">
                      Calibrated for a rigorous numerological consultation (~{readingStats.wordsPerMinute} wpm + mathematical formula inspection).
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] font-sans uppercase tracking-wider text-[#78716C]">Full Dossier Pace</div>
                    <div className="text-xs font-bold text-[#8C6D2D] font-serif">
                      {readingStats.formattedTotalTime} • {readingStats.totalWords.toLocaleString()} words
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowReadingBreakdown(false)}
                    className="text-xs font-sans text-[#78716C] hover:text-[#1C1917] px-2.5 py-1 rounded-lg hover:bg-[#EAE5DA] transition-colors cursor-pointer border border-[#E6E2DA]"
                  >
                    Hide
                  </button>
                </div>
              </div>

              {/* 4 Panels Reading Time Grid */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {readingStats.panels.map((panel) => {
                  return (
                    <div
                      key={panel.panelId}
                      onClick={() => {
                        setSelectedPanel(panel.panelId);
                        setViewMode('panels');
                      }}
                      className="p-3.5 rounded-2xl bg-[#F5F2EB] border border-[#D6CFC4] hover:border-[#C5A059] transition-all cursor-pointer group shadow-2xs"
                    >
                      <div className="flex items-center justify-between text-[10px] font-sans text-[#8C6D2D] font-semibold mb-1">
                        <span>PANEL {panel.panelId}</span>
                        <span className="inline-flex items-center gap-1 text-[#1C1917] bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E6E2DA]">
                          <Clock className="w-2.5 h-2.5 text-[#8C6D2D]" />
                          {panel.formattedTime}
                        </span>
                      </div>
                      <div className="font-serif font-bold text-xs text-[#1C1917] group-hover:text-[#8C6D2D] transition-colors line-clamp-1">
                        {panel.title.replace(/^Panel [IVX]+:\s*/, '')}
                      </div>
                      <div className="text-[11px] text-[#57534E] font-sans mt-0.5 line-clamp-1">
                        {panel.subtitle}
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-[#E6E2DA] flex items-center justify-between text-[10px] text-[#78716C]">
                        <span>{panel.words} words</span>
                        <span className="text-[#8C6D2D] font-medium group-hover:underline flex items-center gap-0.5">
                          <span>Inspect</span>
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Depth & Scope Highlights */}
              <div className="mt-4 pt-3 border-t border-[#E6E2DA] flex flex-wrap items-center justify-between gap-3 text-xs text-[#57534E]">
                <div className="flex flex-wrap items-center gap-4 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <strong>{readingStats.depthMetrics.totalScoredNames} Acoustically Scored Names</strong> with letter sums
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <strong>8 Vibration Nodes</strong> covering the sacred Chaldean alphabet
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <strong>Vedic Janma Nakshatra</strong>, Pada, and Auspicious Syllables
                  </span>
                </div>

                <div className="text-[11px] text-[#8C6D2D] font-medium">
                  Complete archival dossier delivered within 24 hours
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View Mode Switcher: Full 4-Panel Sheet vs. Individual Panel Zoom */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between border-b border-[#E6E2DA] pb-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#78716C]">
              Viewing Mode:
            </span>
            <div className="inline-flex p-1 rounded-xl bg-[#EAE5DA] border border-[#D6CFC4]">
              <button
                id="btn-view-mode-full"
                onClick={() => setViewMode('full')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  viewMode === 'full'
                    ? 'bg-[#1C1917] text-[#FAF8F5] shadow-sm'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <Grid2X2 className="w-3.5 h-3.5" />
                <span>Complete 4-Panel Archival Sheet (As Pictured)</span>
              </button>
              <button
                id="btn-view-mode-panels"
                onClick={() => setViewMode('panels')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  viewMode === 'panels'
                    ? 'bg-[#1C1917] text-[#FAF8F5] shadow-sm'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Panel-by-Panel Deep Dive</span>
              </button>
            </div>
          </div>

          {/* Jump to Report Final Section button */}
          <button
            id="btn-jump-final-section"
            onClick={() => {
              setViewMode('panels');
              setSelectedPanel(4);
            }}
            className="flex items-center gap-1.5 text-xs font-sans font-semibold text-[#8C6D2D] hover:text-[#1C1917] transition-colors cursor-pointer"
          >
            <Star className="w-3.5 h-3.5 fill-[#8C6D2D] text-[#8C6D2D]" />
            <span>Jump to Report Final Section (Top 3 &amp; Laureate Verdict)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* MODE 1: COMPLETE 4-PANEL ARCHIVAL SHEET (AS PICTURED) */}
        {/* ======================================================== */}
        {viewMode === 'full' && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#57534E]">
              <span className="font-serif italic text-sm text-[#1C1917]">
                Authentic 4-Panel Keepsake Dossier Layout • Master Aarav Gupta
              </span>
              <span className="text-[11px] text-[#78716C]">
                Click any panel to zoom into detailed analysis
              </span>
            </div>

            {/* The Authentic 2x2 Grid Dossier Sheet matching uploaded image */}
            <ArchivalDossierSheet
              data={sample}
              currency={currency}
              onSelectPanel={(panelNum) => {
                setSelectedPanel(panelNum);
                setViewMode('panels');
              }}
            />
          </div>
        )}

        {/* ======================================================== */}
        {/* MODE 2: PANEL-BY-PANEL DEEP DIVE (PANELS 1 - 4) */}
        {/* ======================================================== */}
        {viewMode === 'panels' && (
          <div className="mt-8 space-y-6">
            
            {/* 4 Panel Tab Selector */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-2">
              {[
                { id: 1, title: 'Panel I: Child Profile & Blueprint', subtitle: 'Birth & Destiny Numbers' },
                { id: 2, title: 'Panel II: Chaldean Letter Grid', subtitle: '1–8 Vibration Matrix' },
                { id: 3, title: 'Panel III: Top 10 Scored Names', subtitle: 'Exact Letter Sums & Scores' },
                { id: 4, title: 'Panel IV: Report Final Section', subtitle: 'Top 3 & Laureate Recommendation' },
              ].map((panel) => {
                const isActive = selectedPanel === panel.id;
                const isFinal = panel.id === 4;
                const pStats = readingStats.panels.find((p) => p.panelId === panel.id);
                return (
                  <button
                    key={panel.id}
                    onClick={() => setSelectedPanel(panel.id)}
                    className={`px-4 py-3 rounded-xl text-left transition-all cursor-pointer whitespace-nowrap border ${
                      isActive
                        ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] shadow-sm'
                        : isFinal
                        ? 'bg-[#FDFBF7] text-[#8C6D2D] border-[#C5A059]/60 hover:bg-[#FAF8F5]'
                        : 'bg-[#FAF8F5] text-[#57534E] border-[#E6E2DA] hover:border-[#D6CFC4] hover:text-[#1C1917]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5">
                        {isFinal && <Star className="w-3 h-3 text-[#C5A059] fill-[#C5A059]" />}
                        <span className="text-xs font-heading font-bold uppercase tracking-wider">{panel.title}</span>
                      </div>
                      {pStats && (
                        <span className={`text-[10px] font-sans px-1.5 py-0.5 rounded border flex items-center gap-1 ${
                          isActive 
                            ? 'bg-[#292524] text-[#E7C96A] border-[#C5A059]/40' 
                            : 'bg-[#FAF8F5] text-[#8C6D2D] border-[#E6E2DA]'
                        }`}>
                          <Clock className="w-2.5 h-2.5" />
                          {pStats.formattedTime}
                        </span>
                      )}
                    </div>
                    <div className={`text-[10px] flex items-center justify-between gap-2 mt-0.5 ${isActive ? 'text-[#C5A059]' : 'text-[#78716C]'}`}>
                      <span>{panel.subtitle}</span>
                      {pStats && <span className="opacity-80">({pStats.words} words)</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Render Selected Panel using the Archival Sheet */}
            <div className="bg-[#040811] p-4 sm:p-8 rounded-3xl border border-[#C9A227]/50 shadow-2xl">
              {selectedPanel === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#E7C96A] border-b border-[#C9A227]/30 pb-2 gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold uppercase tracking-widest text-[11px]">
                        PANEL 1 OF 4 • INTAKE DOSSIER &amp; CORE VIBRATIONS
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1C1917] text-[#E7C96A] border border-[#C9A227]/40 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-[#C9A227]" />
                        {readingStats.panels[0].formattedTime} ({readingStats.panels[0].words} words)
                      </span>
                    </div>
                    <span>Candidate: Master Aarav Gupta</span>
                  </div>
                  <ArchivalDossierSheet
                    data={sample}
                    currency={currency}
                    highlightPanel={1}
                  />
                </div>
              )}

              {selectedPanel === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#E7C96A] border-b border-[#C9A227]/30 pb-2 gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold uppercase tracking-widest text-[11px]">
                        PANEL 2 OF 4 • CHALDEAN 1–8 MATRIX &amp; VEDIC JANMA NAKSHATRA
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1C1917] text-[#E7C96A] border border-[#C9A227]/40 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-[#C9A227]" />
                        {readingStats.panels[1].formattedTime} ({readingStats.panels[1].words} words)
                      </span>
                    </div>
                    <span>Planetary Analysis &amp; Compatible Numbers</span>
                  </div>
                  <ArchivalDossierSheet
                    data={sample}
                    currency={currency}
                    highlightPanel={2}
                  />
                </div>
              )}

              {selectedPanel === 3 && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#E7C96A] border-b border-[#C9A227]/30 pb-2 gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold uppercase tracking-widest text-[11px]">
                        PANEL 3 OF 4 • TOP 10 RECOMMENDED BABY NAMES WITH EXACT MATHEMATICAL PROOFS
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1C1917] text-[#E7C96A] border border-[#C9A227]/40 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-[#C9A227]" />
                        {readingStats.panels[2].formattedTime} ({readingStats.panels[2].words} words)
                      </span>
                    </div>
                    <span>10 Auspicious Names Scored 91–100</span>
                  </div>
                  <ArchivalDossierSheet
                    data={sample}
                    currency={currency}
                    highlightPanel={3}
                  />
                </div>
              )}

              {selectedPanel === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#E7C96A] border-b border-[#C9A227]/30 pb-2 gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold uppercase tracking-widest text-[11px] flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 fill-[#E7C96A]" />
                        REPORT FINAL SECTION • TOP 3 RECOMMENDATIONS &amp; OFFICIAL VERDICT
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1C1917] text-[#E7C96A] border border-[#C9A227]/40 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-[#C9A227]" />
                        {readingStats.panels[3].formattedTime} ({readingStats.panels[3].words} words)
                      </span>
                    </div>
                    <span>Crown Recommendation: DHRUV GUPTA</span>
                  </div>
                  {/* Highlighted Final Section Component */}
                  <ArchivalDossierSheet
                    data={sample}
                    currency={currency}
                    showOnlyFinalSection={true}
                    highlightPanel={4}
                  />
                </div>
              )}
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* REPORT FINAL SECTION SPOTLIGHT CALLOUT CARD */}
        {/* ======================================================== */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border-2 border-[#D6CFC4] shadow-md">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#1C1917] text-[#FAF8F5] text-[10px] font-sans font-semibold uppercase tracking-wider">
                  Report Final Section Preview
                </span>
                <span className="text-xs text-[#8C6D2D] font-serif font-semibold">
                  ✦ Definitive Auspicious Verdict ✦
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-[#EAE5DA] text-[#57534E] border border-[#D6CFC4]">
                  <Clock className="w-2.5 h-2.5 text-[#8C6D2D]" />
                  {readingStats.panels[3].formattedTime} ({readingStats.panels[3].words} words)
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-[#1C1917]">
                Crown Recommendation: <span className="text-[#8C6D2D] font-bold">DHRUV GUPTA</span> (Score 100/100)
              </h3>
              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed">
                &ldquo;Celestial symbolism of unwavering force, high ethics, and constancy amid change.&rdquo; In the final section of your personalized dossier, you receive the definitive Top 3 recommendations, category awards (Traditional, Modern, Unique, International), practical parent wisdom, and printable keepsake certificate.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              {/* Luxury Price Badge Indicator */}
              <div className="flex flex-col items-center sm:items-end justify-center px-3.5 py-2 rounded-xl bg-[#EAE5DA] border border-[#D6CFC4] text-right">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-[#8C827A] line-through decoration-[#8C6D2D] decoration-1 font-serif">{originalPriceDisplay}</span>
                  <strong className="text-[#1C1917] font-serif font-bold text-xl">{priceDisplay}</strong>
                </div>
                <span className="text-[9px] font-sans font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300/70 px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                  50% Discount Applied
                </span>
              </div>

              <button
                id="btn-sample-view-final-section"
                onClick={() => {
                  setViewMode('panels');
                  setSelectedPanel(4);
                  window.scrollTo({
                    top: document.getElementById('sample-report')?.offsetTop || 0,
                    behavior: 'smooth'
                  });
                }}
                className="px-5 py-3 rounded-xl bg-[#EAE5DA] hover:bg-[#D6CFC4] text-[#1C1917] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
              >
                Inspect Final Section
              </button>
              <button
                id="btn-sample-order-now"
                onClick={onOpenOrder}
                className="px-6 py-3 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Order for {priceDisplay}</span>
                <span className="text-xs text-[#C5A059] font-normal line-through decoration-[#C5A059] decoration-1 opacity-80 font-serif">
                  {originalPriceDisplay}
                </span>
                <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-1.5 py-0.2 rounded-full uppercase">
                  50% Off
                </span>
                <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* CTA Bar Under Sample Viewer */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-[#57534E] font-sans">
            Ready to receive your family's custom 4-panel archival dossier with 24-hour delivery?
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="btn-sample-get-report"
              onClick={onOpenOrder}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1C1917] text-[#FAF8F5] hover:bg-[#292524] text-xs sm:text-sm font-sans font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center justify-center gap-3 group"
            >
              <span>ORDER YOUR REPORT — {priceDisplay}</span>
              <span className="text-xs text-[#E7C96A] font-serif font-normal line-through decoration-[#C5A059] decoration-1 opacity-80">
                {originalPriceDisplay}
              </span>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                50% OFF
              </span>
              <ChevronRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleDownloadSamplePdf}
              disabled={isDownloadingPdf}
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#FAF8F5] text-[#1C1917] border border-[#D6CFC4] hover:bg-[#EAE5DA] text-xs font-sans font-semibold tracking-wider uppercase transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-[#8C6D2D]" />
              <span>Download Printable Sample PDF</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
