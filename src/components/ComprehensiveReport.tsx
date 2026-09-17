import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Award,
  Crown,
  Heart,
  Globe,
  Feather,
  Compass,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Hash,
  Share2,
  Download,
  Printer,
  Loader2,
  Check,
  Grid2X2
} from 'lucide-react';
import { ConsultationReportData, NameAnalysis } from '../types';
import { PLANETARY_RULERS } from '../utils/chaldean';
import { generateConsultationPDF } from '../utils/pdfGenerator';
import { ArchivalDossierSheet } from './ArchivalDossierSheet';
import { notifyPdfStarting, notifyPdfSuccess, notifyPdfError } from '../utils/notifications';

interface ComprehensiveReportProps {
  report: ConsultationReportData;
  onSelectNameForTest: (name: string) => void;
  currency?: 'INR' | 'USD';
}

export const ComprehensiveReport: React.FC<ComprehensiveReportProps> = ({
  report,
  onSelectNameForTest,
  currency = 'INR' as 'INR' | 'USD'
}: ComprehensiveReportProps) => {
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showArchivalSheet, setShowArchivalSheet] = useState(false);

  const safeCurrency: 'INR' | 'USD' = currency === 'USD' ? 'USD' : 'INR';
  const priceDisplay = safeCurrency === 'INR' ? '₹251' : '$5';
  const originalPriceDisplay = safeCurrency === 'INR' ? '₹499' : '$15';

  const {
    input,
    blueprint,
    vedic,
    top_20,
    top_10,
    top_3,
    category_winners,
    surname_analysis,
    decision_guide
  } = report;

  const handleDownloadPdf = async () => {
    if (isDownloadingPdf) return;
    const toastId = notifyPdfStarting();
    try {
      setIsDownloadingPdf(true);
      await generateConsultationPDF(report, safeCurrency);
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24 text-[#fbf8ee]">
      
      {/* Editorial Report Header Banner */}
      <div className="text-center space-y-5 pt-4 pb-8 border-b border-[#c5a059]/30">
        <span className="inline-block px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.25em] font-semibold bg-[#c5a059]/15 text-[#dec477] border border-[#c5a059]/40">
          Official Master Report • Chaldean Astrological Consultation
        </span>
        <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-[#fbf8ee] tracking-tight">
          Personalized Baby Naming Consultation Report
        </h1>
        <p className="text-sm sm:text-base text-[#9ca3af] max-w-2xl mx-auto font-serif italic">
          Prepared for {input.baby_name || 'Your Baby'} • Born {input.date_of_birth} {input.place_of_birth ? `in ${input.place_of_birth}` : ''}
        </p>

        {/* Quick Document Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            id="btn-download-pdf-top"
            onClick={handleDownloadPdf}
            disabled={isDownloadingPdf}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-heading font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-[#dec477] via-[#c5a059] to-[#977227] text-[#080d1a] hover:brightness-110 shadow-lg shadow-[#c5a059]/25 transition-all disabled:opacity-75 cursor-pointer"
          >
            {isDownloadingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#080d1a]" />
                <span>Preparing Luxury Report...</span>
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

          <button
            id="btn-print-report-top"
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#111a33] text-[#dec477] border border-[#c5a059]/30 hover:bg-[#1c2541] hover:text-[#fbf8ee] transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. YOUR BABY'S NUMEROLOGY PROFILE */}
      {/* ============================================================== */}
      <section id="report-section-1" className="space-y-4">
        <div className="flex items-center gap-3 border-b border-[#c5a059]/20 pb-2">
          <span className="text-xs font-mono font-bold text-[#dec477]">SECTION 01</span>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#fbf8ee]">
            Your Baby&apos;s Numerology Profile
          </h2>
        </div>

        <p className="text-sm text-[#d1d5db] leading-relaxed">
          Every human life emerges under specific cosmic harmonics measured by the date, time, and geographic location of birth. In traditional Chaldean numerology, we establish the natal energetic coordinates through two primary pillars: the <strong>Birth Number</strong> (the day vibration) and the <strong>Destiny Number</strong> (the total lifecycle path).
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#0b132b] border border-[#c5a059]/20">
          <div>
            <span className="text-[11px] text-[#9ca3af] uppercase tracking-wider block">Birth Number</span>
            <span className="text-2xl font-heading font-bold text-[#dec477]">
              {blueprint.birth_number}
            </span>
            <span className="text-xs text-[#9ca3af] block">Ruler: {blueprint.birth_planet}</span>
          </div>

          <div>
            <span className="text-[11px] text-[#9ca3af] uppercase tracking-wider block">Destiny Number</span>
            <span className="text-2xl font-heading font-bold text-[#dec477]">
              {blueprint.destiny_compound}/{blueprint.destiny_number}
            </span>
            <span className="text-xs text-[#9ca3af] block">Ruler: {blueprint.destiny_planet}</span>
          </div>

          <div>
            <span className="text-[11px] text-[#9ca3af] uppercase tracking-wider block">Moon Nakshatra</span>
            <span className="text-lg font-heading font-bold text-[#fbf8ee]">
              {vedic.nakshatra || 'Vedic Resonance'}
            </span>
            <span className="text-xs text-[#9ca3af] block">Pada {vedic.nakshatra_pada || 1}</span>
          </div>

          <div>
            <span className="text-[11px] text-[#9ca3af] uppercase tracking-wider block">Optimal Name Roots</span>
            <div className="flex items-center gap-1 mt-1">
              {blueprint.preferred_name_numbers.map(n => (
                <span key={n} className="px-1.5 py-0.5 rounded bg-[#dec477]/20 text-[#dec477] font-bold text-xs">
                  {n}
                </span>
              ))}
            </div>
            <span className="text-[11px] text-[#9ca3af] block mt-0.5">High Harmony</span>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. BIRTH NUMBER ANALYSIS */}
      {/* ============================================================== */}
      <section id="report-section-2" className="space-y-4">
        <div className="flex items-center gap-3 border-b border-[#c5a059]/20 pb-2">
          <span className="text-xs font-mono font-bold text-[#dec477]">SECTION 02</span>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#fbf8ee]">
            Birth Number Analysis (Day Vibration)
          </h2>
        </div>

        <div className="p-6 rounded-2xl bg-[#0e1738]/80 border border-[#c5a059]/30 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#fbf8ee]">
              Birth Number {blueprint.birth_number} • Governed by {blueprint.birth_planet} ({PLANETARY_RULERS[blueprint.birth_number]?.sanskrit})
            </h3>
            {blueprint.birth_compound && (
              <span className="text-xs font-mono px-2 py-1 rounded bg-[#dec477]/10 text-[#dec477]">
                Compound Day: {blueprint.birth_compound}
              </span>
            )}
          </div>

          <p className="text-sm text-[#d1d5db] leading-relaxed">
            The day of birth determines the innate character, mental disposition, and initial approach to worldly interaction. Under the auspices of {blueprint.birth_planet}, this child is endowed with:
          </p>

          <ul className="list-disc list-inside text-sm text-[#cbd5e1] space-y-1.5 pl-2">
            <li><strong>Elemental Signature:</strong> {PLANETARY_RULERS[blueprint.birth_number]?.element} energy expressing {PLANETARY_RULERS[blueprint.birth_number]?.traits}.</li>
            <li><strong>Innate Temperament:</strong> High self-respect, natural magnetism, and an instinctual preference for honesty and clarity.</li>
            <li><strong>Parenting Guidance:</strong> Nurture through encouragement and respect rather than rigid suppression; this child thrives in open, intellectual environments.</li>
          </ul>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. DESTINY NUMBER ANALYSIS */}
      {/* ============================================================== */}
      <section id="report-section-3" className="space-y-4">
        <div className="flex items-center gap-3 border-b border-[#c5a059]/20 pb-2">
          <span className="text-xs font-mono font-bold text-[#dec477]">SECTION 03</span>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#fbf8ee]">
            Destiny Number Analysis (Lifecycle Path)
          </h2>
        </div>

        <div className="p-6 rounded-2xl bg-[#0e1738]/80 border border-[#c5a059]/30 space-y-3">
          <h3 className="text-lg font-bold text-[#fbf8ee]">
            Destiny Number {blueprint.destiny_compound}/{blueprint.destiny_number} • Governed by {blueprint.destiny_planet} ({PLANETARY_RULERS[blueprint.destiny_number]?.sanskrit})
          </h3>

          <p className="text-sm text-[#d1d5db] leading-relaxed">
            Derived from the complete chronological sum ({input.date_of_birth.replace(/-/g, ' + ')} = {blueprint.destiny_compound} → {blueprint.destiny_number}), the Destiny Number reveals the overarching life mission, public achievements, and lessons the soul has chosen to master.
          </p>

          <p className="text-sm text-[#cbd5e1] leading-relaxed">
            The compound number <strong>{blueprint.destiny_compound}</strong> preserves specific energetic qualities that mature over time. It signifies enduring capability, public goodwill, and purposeful career advancement.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. CHALDEAN NAME NUMBER GUIDANCE */}
      {/* ============================================================== */}
      <section id="report-section-4" className="space-y-4">
        <div className="flex items-center gap-3 border-b border-[#c5a059]/20 pb-2">
          <span className="text-xs font-mono font-bold text-[#dec477]">SECTION 04</span>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#fbf8ee]">
            Chaldean Name Number Guidance
          </h2>
        </div>

        <p className="text-sm text-[#d1d5db] leading-relaxed">
          In ancient Chaldean numerology, the name chosen by parents is not a passive label—it is an acoustic yantra invoked thousands of times throughout the individual&apos;s lifetime. A harmonious name bridges any tension between the Birth Number and the Destiny Number.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#111a33] border border-emerald-500/30">
            <span className="text-xs font-bold text-emerald-300 block mb-1">Preferred Harmonizers</span>
            <div className="text-sm font-semibold text-[#fbf8ee] mb-1">
              Roots: {blueprint.preferred_name_numbers.join(', ')}
            </div>
            <p className="text-[11px] text-gray-300">
              Compounds such as 10, 14, 15, 19, 21, 23, 24, 27, 32, 33, 37, 41, 42, 45.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#111a33] border border-blue-500/30">
            <span className="text-xs font-bold text-blue-300 block mb-1">Supportive Vibrations</span>
            <div className="text-sm font-semibold text-[#fbf8ee] mb-1">
              Roots: {blueprint.supportive_numbers.join(', ')}
            </div>
            <p className="text-[11px] text-gray-300">
              Gentle resonance bringing stability and creative adaptability.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#111a33] border border-rose-500/30">
            <span className="text-xs font-bold text-rose-300 block mb-1">Caution Numbers</span>
            <div className="text-sm font-semibold text-[#fbf8ee] mb-1">
              Roots: {blueprint.caution_numbers.join(', ')}
            </div>
            <p className="text-[11px] text-gray-300">
              Traditionalists advise against compounds 12, 16, 18, 26, 28, 29 as primary name totals.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. NAKSHATRA NAMING GUIDANCE */}
      {/* ============================================================== */}
      <section id="report-section-5" className="space-y-4">
        <div className="flex items-center gap-3 border-b border-[#c5a059]/20 pb-2">
          <span className="text-xs font-mono font-bold text-[#dec477]">SECTION 05</span>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#fbf8ee]">
            Vedic Nakshatra Naming Guidance (Supplementary Layer)
          </h2>
        </div>

        <div className="p-5 rounded-2xl bg-[#091124] border border-[#c5a059]/20 text-sm space-y-3">
          <p className="text-[#d1d5db] leading-relaxed">
            In Vedic astrology (Jyotisha), a baby&apos;s Moon Nakshatra at the moment of birth identifies specific sacred syllables known as <em>Nama-Aksharas</em>. In our dual-layered consultation framework, Chaldean numerology serves as the primary harmonic engine, while Vedic Nakshatra compatibility provides an auspicious supplementary alignment.
          </p>

          <div className="p-4 rounded-xl bg-[#111a33]/60 border border-white/5 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Determined Nakshatra:</span>
              <span className="font-semibold text-[#dec477]">{vedic.nakshatra || 'Calculated Lunar Position'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Quarter (Pada):</span>
              <span className="font-semibold text-[#fbf8ee]">Pada {vedic.nakshatra_pada || 1}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Traditional Starting Sounds:</span>
              <span className="font-semibold text-[#dec477] tracking-wider">
                {vedic.traditional_syllables.join(', ') || 'A, E, O, V'}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400 italic">
            * Note on Trade-offs: If a parent must choose between a name with a flawless Chaldean compound total and a name with the exact Nakshatra sound, traditional Chaldean methodology prioritizes the mathematical harmony of the compound number, as the full vibrational frequency governs social and professional spheres.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. TOP 20 NAMES TABLE */}
      {/* ============================================================== */}
      <section id="report-section-6" className="space-y-4">
        <div className="flex items-center gap-3 border-b border-[#c5a059]/20 pb-2">
          <span className="text-xs font-mono font-bold text-[#dec477]">SECTION 06</span>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#fbf8ee]">
            Top 20 Candidate Names Matrix
          </h2>
        </div>

        <p className="text-sm text-[#d1d5db]">
          Evaluated strictly according to our 100-Point Scoring Model (Chaldean: 40 pts, Meaning: 20 pts, Vedic: 15 pts, Pronunciation: 10 pts, Cultural Fit: 10 pts, Modern Appeal: 5 pts).
        </p>

        <div className="overflow-x-auto rounded-2xl border border-[#c5a059]/25 bg-[#0b132b]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#111a33] text-[#dec477] border-b border-[#c5a059]/30">
                <th className="p-3 font-semibold">Rank</th>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Meaning</th>
                <th className="p-3 font-semibold">Chaldean</th>
                <th className="p-3 font-semibold">Compound</th>
                <th className="p-3 font-semibold">Root</th>
                <th className="p-3 font-semibold">Compatibility</th>
                <th className="p-3 font-semibold text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {top_20.map((item, index) => (
                <tr
                  key={item.name}
                  onClick={() => onSelectNameForTest(item.name)}
                  className="hover:bg-[#16223f]/60 transition-colors cursor-pointer"
                >
                  <td className="p-3 font-bold text-[#9ca3af]">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </td>
                  <td className="p-3 font-bold text-[#fbf8ee] font-heading text-sm">
                    {item.name}
                  </td>
                  <td className="p-3 text-[#cbd5e1] max-w-xs truncate">
                    {item.meaning}
                  </td>
                  <td className="p-3 font-mono text-[#dec477]">
                    {item.compound_number}/{item.root_number}
                  </td>
                  <td className="p-3 text-[#9ca3af]">
                    {item.compound_number}
                  </td>
                  <td className="p-3 text-[#fbf8ee] font-semibold">
                    {item.root_number}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      item.compatibility === 'Highly Compatible'
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : item.compatibility === 'Supportive'
                        ? 'bg-blue-500/15 text-blue-300'
                        : 'bg-amber-500/15 text-amber-300'
                    }`}>
                      {item.compatibility}
                    </span>
                  </td>
                  <td className="p-3 text-right font-extrabold text-[#dec477]">
                    {item.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. TOP 10 SHORTLIST (DEEP DIVE CARDS) */}
      {/* ============================================================== */}
      <section id="report-section-7" className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#c5a059]/20 pb-2">
          <span className="text-xs font-mono font-bold text-[#dec477]">SECTION 07</span>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#fbf8ee]">
            Top 10 Candidate Deep Dives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {top_10.map((item, index) => (
            <div
              key={item.name}
              className="p-5 rounded-2xl bg-[#0b132b] border border-[#c5a059]/20 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#dec477] font-bold">#{index + 1}</span>
                    <h3 className="text-xl font-heading font-bold text-[#fbf8ee] tracking-wide">
                      {item.name}
                    </h3>
                  </div>
                  <span className="text-xs text-[#9ca3af] font-serif italic">{item.origin}</span>
                </div>
                
                <div className="text-right">
                  <span className="text-lg font-extrabold text-[#dec477]">{item.score}</span>
                  <span className="text-[10px] text-[#9ca3af]">/100</span>
                </div>
              </div>

              {/* Letter by letter calculation strip */}
              <div className="p-2.5 rounded-lg bg-[#111a33]/70 border border-white/5 flex items-center justify-between flex-wrap gap-1 text-[11px]">
                <span className="text-gray-400">Calculation:</span>
                <div className="font-mono text-[#dec477]">
                  {item.letter_calculation.map(lc => `${lc.letter}=${lc.value}`).join(' + ')}
                  <span className="text-white font-bold ml-1.5">= {item.compound_number} → {item.root_number}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-[#cbd5e1]">
                <p><strong>Meaning:</strong> {item.meaning}</p>
                <p><strong>Compound Significance:</strong> {item.compound_significance}</p>
                <p><strong>Birth Number Compatibility:</strong> {item.compatibility_reason}</p>
                <p><strong>Pronunciation &amp; Cadence:</strong> {item.pronunciation_guide} ({item.syllable_count} syllables)</p>
                <p className="text-[#dec477]"><strong>Why It Stands Out:</strong> {item.why_stands_out}</p>
              </div>

              <div className="pt-2 border-t border-white/5 flex justify-end">
                <button
                  type="button"
                  onClick={() => onSelectNameForTest(item.name)}
                  className="text-xs text-[#dec477] hover:underline font-semibold"
                >
                  Test with Surname →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 8. TOP 3 RECOMMENDATIONS */}
      {/* ============================================================== */}
      <section id="report-section-8" className="space-y-6">
        <div className="flex items-center gap-3 border-b border-[#c5a059]/20 pb-2">
          <span className="text-xs font-mono font-bold text-[#dec477]">SECTION 08</span>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#fbf8ee]">
            Final Top 3 In-Depth Analysis
          </h2>
        </div>

        {/* 🥇 BEST OVERALL */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#16223f] to-[#0e1738] border-2 border-[#dec477] shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[#dec477] text-[#080d1a] font-bold text-xs">
                🥇 BEST OVERALL
              </span>
              <span className="text-xs uppercase tracking-wider text-[#dec477] font-semibold">
                Strongest Numerological Fit
              </span>
            </div>
            <span className="text-xl font-bold text-[#dec477]">{top_3.best_overall.score}/100</span>
          </div>

          <h3 className="text-3xl font-heading font-bold text-[#fbf8ee]">
            {top_3.best_overall.name} • Chaldean {top_3.best_overall.compound_number}/{top_3.best_overall.root_number}
          </h3>

          <p className="text-sm text-[#cbd5e1] leading-relaxed">
            <strong>Why it earns the top recommendation:</strong> {top_3.best_overall.name} achieves the highest harmonic equilibrium across all six evaluation pillars. Its compound total {top_3.best_overall.compound_number} is an established fortunate vibration in classical Chaldean literature, while its root number {top_3.best_overall.root_number} ({PLANETARY_RULERS[top_3.best_overall.root_number]?.name}) maintains an auspicious relationship with Birth Number {blueprint.birth_number} and Destiny Number {blueprint.destiny_number}.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs p-3 rounded-xl bg-[#091124]/70 border border-white/5">
            <div>
              <span className="text-gray-400 block">Sanskrit Etymology</span>
              <span className="font-semibold text-white">{top_3.best_overall.meaning}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Phonetic Rhythm</span>
              <span className="font-semibold text-white">{top_3.best_overall.pronunciation_guide}</span>
            </div>
            <div>
              <span className="text-gray-400 block">Vedic Resonance</span>
              <span className="font-semibold text-[#dec477]">{top_3.best_overall.nakshatra_compatibility}</span>
            </div>
          </div>
        </div>

        {/* 🥈 STRONG ALTERNATIVE */}
        <div className="p-6 rounded-2xl bg-[#111a33] border border-slate-400/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded bg-slate-400/20 text-slate-200 font-bold text-xs">
              🥈 STRONG ALTERNATIVE
            </span>
            <span className="text-lg font-bold text-slate-200">{top_3.strong_alternative.score}/100</span>
          </div>

          <h3 className="text-2xl font-heading font-bold text-[#fbf8ee]">
            {top_3.strong_alternative.name} • Chaldean {top_3.strong_alternative.compound_number}/{top_3.strong_alternative.root_number}
          </h3>

          <p className="text-sm text-[#cbd5e1] leading-relaxed">
            Offers an alternative planetary ray ({PLANETARY_RULERS[top_3.strong_alternative.root_number]?.name}). Provides exceptional balance if the parents desire a different phonetic cadence or personality focus.
          </p>
        </div>

        {/* 🥉 UNIQUE ALTERNATIVE */}
        <div className="p-6 rounded-2xl bg-[#111a33] border border-amber-700/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded bg-amber-700/20 text-amber-300 font-bold text-xs">
              🥉 UNIQUE ALTERNATIVE
            </span>
            <span className="text-lg font-bold text-amber-300">{top_3.unique_alternative.score}/100</span>
          </div>

          <h3 className="text-2xl font-heading font-bold text-[#fbf8ee]">
            {top_3.unique_alternative.name} • Chaldean {top_3.unique_alternative.compound_number}/{top_3.unique_alternative.root_number}
          </h3>

          <p className="text-sm text-[#cbd5e1] leading-relaxed">
            Ideal for parents seeking a less common name that stands out distinctively while preserving rigorous Chaldean numerical strength and defensible Sanskrit roots.
          </p>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. CATEGORY WINNERS */}
      {/* ============================================================== */}
      <section id="report-section-9" className="space-y-4">
        <div className="flex items-center gap-3 border-b border-[#c5a059]/20 pb-2">
          <span className="text-xs font-mono font-bold text-[#dec477]">SECTION 09</span>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#fbf8ee]">
            Category Winners
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {category_winners.royal && (
            <div className="p-4 rounded-xl bg-[#0b132b] border border-[#c5a059]/20">
              <span className="text-xs font-bold text-[#dec477] flex items-center gap-1 mb-1">
                <Crown className="w-3.5 h-3.5" /> Best Royal / Majestic
              </span>
              <span className="text-lg font-heading font-bold text-white block">{category_winners.royal.name}</span>
              <span className="text-xs text-gray-400">Chaldean {category_winners.royal.compound_number}/{category_winners.royal.root_number}</span>
            </div>
          )}

          {category_winners.traditional && (
            <div className="p-4 rounded-xl bg-[#0b132b] border border-[#c5a059]/20">
              <span className="text-xs font-bold text-[#dec477] flex items-center gap-1 mb-1">
                <Feather className="w-3.5 h-3.5" /> Best Traditional Sanskrit
              </span>
              <span className="text-lg font-heading font-bold text-white block">{category_winners.traditional.name}</span>
              <span className="text-xs text-gray-400">Chaldean {category_winners.traditional.compound_number}/{category_winners.traditional.root_number}</span>
            </div>
          )}

          {category_winners.modern && (
            <div className="p-4 rounded-xl bg-[#0b132b] border border-[#c5a059]/20">
              <span className="text-xs font-bold text-[#dec477] flex items-center gap-1 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Best Modern Name
              </span>
              <span className="text-lg font-heading font-bold text-white block">{category_winners.modern.name}</span>
              <span className="text-xs text-gray-400">Chaldean {category_winners.modern.compound_number}/{category_winners.modern.root_number}</span>
            </div>
          )}

          {category_winners.rare && (
            <div className="p-4 rounded-xl bg-[#0b132b] border border-[#c5a059]/20">
              <span className="text-xs font-bold text-[#dec477] flex items-center gap-1 mb-1">
                <Award className="w-3.5 h-3.5" /> Best Rare / Unique
              </span>
              <span className="text-lg font-heading font-bold text-white block">{category_winners.rare.name}</span>
              <span className="text-xs text-gray-400">Chaldean {category_winners.rare.compound_number}/{category_winners.rare.root_number}</span>
            </div>
          )}

          {category_winners.international && (
            <div className="p-4 rounded-xl bg-[#0b132b] border border-[#c5a059]/20">
              <span className="text-xs font-bold text-[#dec477] flex items-center gap-1 mb-1">
                <Globe className="w-3.5 h-3.5" /> Best International
              </span>
              <span className="text-lg font-heading font-bold text-white block">{category_winners.international.name}</span>
              <span className="text-xs text-gray-400">Chaldean {category_winners.international.compound_number}/{category_winners.international.root_number}</span>
            </div>
          )}

          {category_winners.meaningful && (
            <div className="p-4 rounded-xl bg-[#0b132b] border border-[#c5a059]/20">
              <span className="text-xs font-bold text-[#dec477] flex items-center gap-1 mb-1">
                <Heart className="w-3.5 h-3.5" /> Best Meaningful
              </span>
              <span className="text-lg font-heading font-bold text-white block">{category_winners.meaningful.name}</span>
              <span className="text-xs text-gray-400">Chaldean {category_winners.meaningful.compound_number}/{category_winners.meaningful.root_number}</span>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 10. SURNAME ANALYSIS */}
      {/* ============================================================== */}
      {surname_analysis && (
        <section id="report-section-10" className="space-y-4">
          <div className="flex items-center gap-3 border-b border-[#c5a059]/20 pb-2">
            <span className="text-xs font-mono font-bold text-[#dec477]">SECTION 10</span>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#fbf8ee]">
              Family Surname &amp; Full Name Analysis
            </h2>
          </div>

          <div className="p-5 rounded-2xl bg-[#0b132b] border border-[#c5a059]/20 space-y-4 text-sm">
            <p className="text-[#d1d5db]">
              Evaluating the first name alone vs. the full legal name (First Name + Surname <strong>{surname_analysis.surname}</strong>):
            </p>

            <div className="space-y-3">
              {surname_analysis.combined_examples.map(ex => (
                <div key={ex.combined_name} className="p-3.5 rounded-xl bg-[#111a33]/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-heading font-bold text-white text-base mr-2">{ex.combined_name}</span>
                    <span className="font-mono text-xs text-[#dec477]">
                      Compound {ex.combined_compound}/{ex.combined_root}
                    </span>
                  </div>
                  <span className="text-xs text-gray-300 italic">{ex.harmony_note}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================== */}
      {/* 11. PARENT DECISION GUIDE MATRIX */}
      {/* ============================================================== */}
      <section id="report-section-11" className="space-y-4">
        <div className="flex items-center gap-3 border-b border-[#c5a059]/20 pb-2">
          <span className="text-xs font-mono font-bold text-[#dec477]">SECTION 11</span>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#fbf8ee]">
            Parent Decision Guide Matrix
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#c5a059]/25 bg-[#0b132b]">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#111a33] text-[#dec477] border-b border-[#c5a059]/30">
                <th className="p-3 font-semibold">Parent Preference</th>
                <th className="p-3 font-semibold">Recommended Name</th>
                <th className="p-3 font-semibold">Chaldean Total</th>
                <th className="p-3 font-semibold">Consultant Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {decision_guide.map(item => (
                <tr key={item.preference} className="hover:bg-[#16223f]/40">
                  <td className="p-3 font-semibold text-[#fbf8ee]">{item.preference}</td>
                  <td className="p-3 font-bold text-[#dec477] font-heading text-sm">{item.recommended_name}</td>
                  <td className="p-3 font-mono text-gray-300">{item.number}</td>
                  <td className="p-3 text-[#cbd5e1]">{item.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 12. FINAL RECOMMENDATION & REPORT FINAL SECTION */}
      {/* ============================================================== */}
      <section id="report-section-12" className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#c5a059]/30 pb-3 gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-[#dec477]">SECTION 12</span>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#fbf8ee]">
              Official Concluding Recommendation &amp; Final Dossier Section
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setShowArchivalSheet(!showArchivalSheet)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#0d1b2e] border border-[#c5a059]/50 text-[#e7c96a] hover:bg-[#15253e] transition-colors cursor-pointer"
          >
            <Grid2X2 className="w-3.5 h-3.5" />
            <span>{showArchivalSheet ? 'Hide 4-Panel Sheet' : 'View Complete 4-Panel Sheet'}</span>
          </button>
        </div>

        {/* The Authentic Report Final Section Component */}
        <ArchivalDossierSheet showOnlyFinalSection={true} currency={currency} />

        {/* Complete 4-Panel Sheet View (Toggled) */}
        {showArchivalSheet && (
          <div className="pt-4 space-y-3">
            <div className="text-xs font-serif italic text-[#c5a059] flex items-center justify-between">
              <span>Complete 4-Panel Archival Dossier Sheet (2x2 Landscape)</span>
              <span>Candidate: Master Aarav Gupta</span>
            </div>
            <ArchivalDossierSheet currency={currency} />
          </div>
        )}

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1b274e] to-[#0b132b] border-2 border-[#dec477] space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#dec477]" />
              <span className="text-xs uppercase tracking-widest font-bold text-[#dec477]">
                Atelier Consultant Summary
              </span>
            </div>
            {/* Luxury Pricing Context Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#080d1a]/80 border border-[#dec477]/40 text-xs">
              <span className="text-gray-400 text-[11px]">Archival Valuation:</span>
              <span className="line-through decoration-[#dec477] text-gray-400 font-serif text-[11px]">{originalPriceDisplay}</span>
              <span className="text-emerald-400 text-[10px] font-bold uppercase bg-emerald-950/70 border border-emerald-500/40 px-1.5 py-0.2 rounded-full">50% Courtesy</span>
              <strong className="text-[#fbf8ee] font-serif text-xs">{priceDisplay}</strong>
            </div>
          </div>

          <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#fbf8ee]">
            Crown Numerological Recommendation: <span className="text-[#dec477]">DHRUV GUPTA</span> (Compound 23 / Root 5 • Score 100/100)
          </h3>

          <p className="text-sm text-[#d1d5db] leading-relaxed">
            Balancing mathematical Chaldean purity with linguistic elegance and Vedic resonance, <strong>Dhruv Gupta</strong> offers the most complete harmony. Carrying the celestial symbolism of the steadfast pole star, it embodies unwavering focus, high ethics, and constancy amid life&apos;s transitions.
          </p>

          <div className="pt-3 border-t border-[#c5a059]/20 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#9ca3af]">
              Want an archival copy for the family records or framing?
            </div>
            <button
              id="btn-download-pdf-bottom"
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-heading font-extrabold text-xs uppercase tracking-wider bg-gradient-to-r from-[#dec477] via-[#c5a059] to-[#977227] text-[#080d1a] hover:brightness-110 shadow-lg shadow-[#c5a059]/20 transition-all disabled:opacity-75 cursor-pointer"
            >
              {isDownloadingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#080d1a]" />
                  <span>Preparing Luxury Report...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#080d1a]" />
                  <span>Downloaded Successfully!</span>
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
      </section>

      {/* ============================================================== */}
      {/* 13. ETHICAL DISCLAIMER */}
      {/* ============================================================== */}
      <section id="report-section-13" className="p-5 rounded-2xl bg-[#070c1a] border border-white/10 text-xs text-gray-400 space-y-2">
        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-gray-300">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          Ethical &amp; Methodological Disclaimer
        </div>
        <p className="leading-relaxed">
          &ldquo;This report uses traditional Chaldean numerology and, where applicable, Vedic naming principles as a cultural and spiritual naming framework. Numerology and astrology are not scientifically proven methods for predicting a child&apos;s future, personality, health or success. The recommendations are intended to help parents explore names and should not replace personal, cultural or family judgment.&rdquo;
        </p>
        <p className="italic text-[11px] text-gray-500">
          No name guarantees wealth, fame, longevity, or specific worldly milestones; the true destiny of every child is forged through character, loving guidance, education, and moral courage.
        </p>
      </section>

    </div>
  );
};
