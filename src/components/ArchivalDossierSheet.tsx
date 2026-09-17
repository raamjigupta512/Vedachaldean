import React from 'react';
import { Sparkles, Star, Award, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import babyPhoto from '../assets/images/sleeping_newborn_baby_1789326693225.jpg';
import { SAMPLE_DOSSIER_DATA, SampleDossier } from '../data/sampleDossierData';

interface ArchivalDossierSheetProps {
  data?: SampleDossier;
  highlightPanel?: 1 | 2 | 3 | 4 | null;
  onSelectPanel?: (panel: 1 | 2 | 3 | 4) => void;
  showOnlyFinalSection?: boolean;
  currency?: 'INR' | 'USD';
}

// Ornate Corner SVG Flourish
const OrnateCorner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const rotationClass = {
    tl: '',
    tr: 'rotate-90',
    br: 'rotate-180',
    bl: '-rotate-90'
  }[position];

  const posClass = {
    tl: 'top-2 left-2',
    tr: 'top-2 right-2',
    br: 'bottom-2 right-2',
    bl: 'bottom-2 left-2'
  }[position];

  return (
    <div className={`absolute ${posClass} pointer-events-none z-10 ${rotationClass}`}>
      <svg className="w-5 h-5 text-[#C9A227]/70" viewBox="0 0 40 40" fill="none">
        <path d="M2 38V12C2 6.47715 6.47715 2 12 2H38" stroke="currentColor" strokeWidth="1.75" />
        <path d="M7 38V14C7 10.134 10.134 7 14 7H38" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1.5 2" />
        <path d="M12 2C12 7.5 7.5 12 2 12" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        <circle cx="2" cy="38" r="1.5" fill="currentColor" />
        <circle cx="38" cy="2" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};

export const ArchivalDossierSheet: React.FC<ArchivalDossierSheetProps> = ({
  data = SAMPLE_DOSSIER_DATA,
  highlightPanel = null,
  onSelectPanel,
  showOnlyFinalSection = false,
  currency = 'INR'
}) => {
  const { profile, vibrations, pillars, letterMatrix, compatibility, vedic, constitutionalStrengths, top10Names, top3, specialCategories, parentGuidance, topRecommendation, disclaimer } = data;

  const priceDisplay = currency === 'INR' ? '₹251' : '$5';
  const originalPriceDisplay = currency === 'INR' ? '₹499' : '$15';

  // PANEL 1: Baby Profile Dossier & Spiritual Keys
  const renderPanel1 = () => (
    <div
      onClick={() => onSelectPanel && onSelectPanel(1)}
      className={`relative bg-[#091526] border-2 border-[#C9A227] rounded-2xl p-5 sm:p-6 text-[#F7F1DF] flex flex-col justify-between shadow-2xl transition-all ${
        onSelectPanel ? 'cursor-pointer hover:border-[#F3E6C5] hover:shadow-[#C9A227]/20' : ''
      } ${highlightPanel === 1 ? 'ring-2 ring-[#E7C96A]' : ''}`}
    >
      <div className="absolute inset-1.5 border border-[#C9A227]/30 rounded-xl pointer-events-none" />
      <OrnateCorner position="tl" />
      <OrnateCorner position="tr" />
      <OrnateCorner position="bl" />
      <OrnateCorner position="br" />

      {/* Header */}
      <div className="text-center relative z-10 pt-1">
        <div className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#E7C96A] font-semibold">
          ✦ CHALDEAN BABY NAME NUMEROLOGY REPORT ✦
        </div>
        <h3 className="mt-1 text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
          {profile.fullName}
        </h3>
        <p className="text-xs font-serif italic text-[#C9A227] mt-0.5">
          &ldquo;{profile.tagline}&rdquo;
        </p>
        <div className="w-28 h-px bg-gradient-to-r from-transparent via-[#C9A227] to-transparent mx-auto mt-2" />
      </div>

      {/* Middle Grid: Profile - Photo - Core Vibrations */}
      <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-3.5 items-center relative z-10">
        
        {/* Baby Profile Dossier */}
        <div className="bg-[#071322]/90 border border-[#C9A227]/40 rounded-xl p-3.5 text-xs space-y-2">
          <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#E7C96A] border-b border-[#C9A227]/30 pb-1.5 flex items-center justify-between">
            <span>BABY PROFILE DOSSIER</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E7C96A]" />
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between">
              <span className="text-gray-400">Name:</span>
              <strong className="text-white font-medium">{profile.name}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Gender:</span>
              <strong className="text-[#F7F1DF] font-medium">{profile.gender}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date of Birth:</span>
              <strong className="text-[#E7C96A] font-medium">{profile.dateOfBirth}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Time of Birth:</span>
              <strong className="text-white font-medium">{profile.timeOfBirth}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Place of Birth:</span>
              <strong className="text-white font-medium text-right truncate max-w-[130px]">{profile.placeOfBirth}</strong>
            </div>
            <div className="flex justify-between pt-1 border-t border-[#C9A227]/20">
              <span className="text-gray-400">Surname:</span>
              <strong className="text-[#E7C96A] font-bold">{profile.surname}</strong>
            </div>
          </div>
        </div>

        {/* Center Newborn Photo Centerpiece */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#E7C96A] via-[#8C6D2D] to-[#E7C96A] shadow-lg shadow-[#C9A227]/30">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#091526]">
              <img
                src={babyPhoto}
                alt="Auspicious Newborn Baby"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full border border-dashed border-[#E7C96A]/60 pointer-events-none" />
          </div>
          <div className="mt-2 text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#E7C96A]">
            ✦ AUSPICIOUS NEWBORN ✦
          </div>
        </div>

        {/* Core Vibrational Keys */}
        <div className="bg-[#071322]/90 border border-[#C9A227]/40 rounded-xl p-3.5 text-xs space-y-2">
          <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#E7C96A] border-b border-[#C9A227]/30 pb-1.5 flex items-center justify-between">
            <span>CORE VIBRATIONAL KEYS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E7C96A]" />
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Birth Number:</span>
              <strong className="text-lg font-serif font-bold text-[#E7C96A] leading-none">{vibrations.birthNumber}</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Destiny Number:</span>
              <strong className="text-lg font-serif font-bold text-[#E7C96A] leading-none">{vibrations.destinyNumber}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Ruling Planet:</span>
              <strong className="text-white font-medium">{vibrations.rulingPlanet}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Ideal Vibrations:</span>
              <strong className="text-emerald-400 font-bold">{vibrations.idealVibrations.join(', ')}</strong>
            </div>
            <div className="flex justify-between pt-1 border-t border-[#C9A227]/20">
              <span className="text-gray-400">Year Vibration:</span>
              <strong className="text-white font-medium">{vibrations.yearVibration}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* 4 Feature Pill Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-10">
        {pillars.map((pill, i) => (
          <div key={i} className="bg-[#071322]/80 border border-[#C9A227]/30 rounded-lg p-2 text-center">
            <div className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#E7C96A]">{pill.title}</div>
            <div className="text-[8.5px] text-gray-300 mt-0.5 leading-tight">{pill.subtitle}</div>
          </div>
        ))}
      </div>

      {/* Panel 1 Footer Quote */}
      <div className="mt-3 pt-2 border-t border-[#C9A227]/25 text-center text-[10px] font-serif italic text-[#E7C96A] relative z-10">
        &ldquo;{data.bottomQuote}&rdquo;
      </div>
    </div>
  );

  // PANEL 2: Chaldean Numerology Analysis / Blueprint
  const renderPanel2 = () => (
    <div
      onClick={() => onSelectPanel && onSelectPanel(2)}
      className={`relative bg-[#091526] border-2 border-[#C9A227] rounded-2xl p-5 sm:p-6 text-[#F7F1DF] flex flex-col justify-between shadow-2xl transition-all ${
        onSelectPanel ? 'cursor-pointer hover:border-[#F3E6C5] hover:shadow-[#C9A227]/20' : ''
      } ${highlightPanel === 2 ? 'ring-2 ring-[#E7C96A]' : ''}`}
    >
      <div className="absolute inset-1.5 border border-[#C9A227]/30 rounded-xl pointer-events-none" />
      <OrnateCorner position="tl" />
      <OrnateCorner position="tr" />
      <OrnateCorner position="bl" />
      <OrnateCorner position="br" />

      {/* Header */}
      <div className="text-center relative z-10 pt-1">
        <div className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#E7C96A] font-semibold">
          ✦ CHALDEAN NUMEROLOGY ANALYSIS ✦
        </div>
        <h3 className="mt-1 text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide uppercase">
          YOUR BABY'S NUMEROLOGY BLUEPRINT
        </h3>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#C9A227] to-transparent mx-auto mt-2" />
      </div>

      {/* Top 3 Metric Boxes */}
      <div className="my-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 relative z-10">
        
        {/* Birth Number */}
        <div className="bg-[#071322]/90 border border-[#C9A227]/40 rounded-xl p-3 text-center">
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#E7C96A] block">
            BIRTH NUMBER
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#E7C96A] my-0.5">
            {vibrations.birthNumber}
          </div>
          <div className="text-[10px] font-mono text-white font-semibold">{vibrations.birthFormula}</div>
          <p className="text-[9.5px] text-gray-300 mt-1 leading-snug">{vibrations.birthDetails}</p>
        </div>

        {/* Destiny Number */}
        <div className="bg-[#071322]/90 border border-[#C9A227]/40 rounded-xl p-3 text-center">
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#E7C96A] block">
            DESTINY NUMBER
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#E7C96A] my-0.5">
            {vibrations.destinyNumber}
          </div>
          <div className="text-[10px] font-mono text-white font-semibold">{vibrations.destinyFormula}</div>
          <p className="text-[9.5px] text-gray-300 mt-1 leading-snug">{vibrations.destinyDetails}</p>
        </div>

        {/* Year Vibration */}
        <div className="bg-[#071322]/90 border border-[#C9A227]/40 rounded-xl p-3 text-center">
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#E7C96A] block">
            YEAR VIBRATION
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#E7C96A] my-0.5">
            {vibrations.yearVibration}
          </div>
          <div className="text-[10px] font-mono text-white font-semibold">{vibrations.yearFormula}</div>
          <p className="text-[9.5px] text-gray-300 mt-1 leading-snug">{vibrations.yearDetails}</p>
        </div>

      </div>

      {/* Chaldean 1-8 System Matrix */}
      <div className="bg-[#071322]/90 border border-[#C9A227]/40 rounded-xl p-3 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-[#C9A227]/30 pb-1.5 mb-2 text-center sm:text-left gap-1">
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#E7C96A]">
            CHALDEAN LETTER-NUMBER SYSTEM
          </span>
          <span className="text-[9px] text-gray-400 italic">
            (Number 9 is sacred &amp; unassigned to individual letters)
          </span>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 text-center">
          {letterMatrix.map((item) => (
            <div key={item.number} className="bg-[#091526] border border-[#C9A227]/30 rounded-lg py-1.5 px-1">
              <div className="text-xs font-serif font-bold text-[#E7C96A]">{item.number}</div>
              <div className="text-[9.5px] font-sans font-semibold text-white tracking-wider mt-0.5">{item.letters}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Compatible Numbers Bar */}
      <div className="my-2.5 bg-[#071322]/90 border border-[#C9A227]/40 rounded-xl p-2.5 text-xs relative z-10">
        <div className="text-[9.5px] font-sans font-bold uppercase tracking-wider text-[#E7C96A] mb-1.5 text-center sm:text-left">
          COMPATIBLE NAME NUMBERS (BASED ON BIRTH PROFILE)
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 text-[9px] uppercase">Highly Compatible:</span>
            <div className="flex gap-1">
              {compatibility.highlyCompatible.map(n => (
                <span key={n} className="w-5 h-5 rounded bg-emerald-950 border border-emerald-500/60 text-emerald-300 font-bold flex items-center justify-center text-[10px]">
                  {n}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 text-[9px] uppercase">Supportive:</span>
            <div className="flex gap-1">
              {compatibility.supportive.map(n => (
                <span key={n} className="w-5 h-5 rounded bg-[#8C6D2D]/30 border border-[#C9A227]/50 text-[#E7C96A] font-bold flex items-center justify-center text-[10px]">
                  {n}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 text-[9px] uppercase">Neutral:</span>
            <div className="flex gap-1">
              {compatibility.neutral.map((n, idx) => (
                <span key={idx} className="w-5 h-5 rounded bg-blue-950/60 border border-blue-500/40 text-blue-300 font-bold flex items-center justify-center text-[10px]">
                  {n}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 text-[9px] uppercase">Use with Caution:</span>
            <div className="flex gap-1">
              {compatibility.caution.map((n, idx) => (
                <span key={idx} className="w-5 h-5 rounded bg-rose-950/60 border border-rose-500/40 text-rose-300 font-bold flex items-center justify-center text-[10px]">
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Vedic Nakshatra & Constitutional Strengths */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 relative z-10 text-xs">
        {/* Vedic Nakshatra */}
        <div className="bg-[#071322]/90 border border-[#C9A227]/40 rounded-xl p-3 space-y-1.5">
          <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#E7C96A] border-b border-[#C9A227]/30 pb-1 flex items-center justify-between">
            <span>VEDIC NAKSHATRA NAMING ALIGNMENT</span>
            <span className="text-[9px] text-[#C9A227] font-serif">Janma Kundli</span>
          </div>
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between"><span className="text-gray-400">Rashi:</span><strong className="text-white">{vedic.rashi}</strong></div>
            <div className="flex justify-between"><span className="text-gray-400">Nakshatra:</span><strong className="text-[#E7C96A]">{vedic.nakshatra}</strong></div>
            <div className="flex justify-between"><span className="text-gray-400">Pada:</span><strong className="text-white">{vedic.pada}</strong></div>
            <div className="flex justify-between"><span className="text-gray-400">Starting Sounds:</span><strong className="text-emerald-400 font-bold">{vedic.startingSounds}</strong></div>
          </div>
        </div>

        {/* Constitutional Strengths */}
        <div className="bg-[#071322]/90 border border-[#C9A227]/40 rounded-xl p-3 space-y-1.5">
          <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#E7C96A] border-b border-[#C9A227]/30 pb-1">
            KEY CONSTITUTIONAL STRENGTHS
          </div>
          <ul className="space-y-1 text-[9.5px] text-gray-300">
            {constitutionalStrengths.map((str, i) => (
              <li key={i} className="flex items-start gap-1.5 leading-snug">
                <span className="text-[#E7C96A] mt-0.5">✦</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // PANEL 3: Top 10 Recommended Baby Names
  const renderPanel3 = () => (
    <div
      onClick={() => onSelectPanel && onSelectPanel(3)}
      className={`relative bg-[#091526] border-2 border-[#C9A227] rounded-2xl p-5 sm:p-6 text-[#F7F1DF] flex flex-col justify-between shadow-2xl transition-all ${
        onSelectPanel ? 'cursor-pointer hover:border-[#F3E6C5] hover:shadow-[#C9A227]/20' : ''
      } ${highlightPanel === 3 ? 'ring-2 ring-[#E7C96A]' : ''}`}
    >
      <div className="absolute inset-1.5 border border-[#C9A227]/30 rounded-xl pointer-events-none" />
      <OrnateCorner position="tl" />
      <OrnateCorner position="tr" />
      <OrnateCorner position="bl" />
      <OrnateCorner position="br" />

      {/* Header */}
      <div className="text-center relative z-10 pt-1">
        <div className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#E7C96A] font-semibold">
          ✦ BEAUTIFUL NAMES • POSITIVE VIBRATIONS • MEANINGFUL CHOICES ✦
        </div>
        <h3 className="mt-1 text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide uppercase">
          TOP 10 RECOMMENDED BABY NAMES
        </h3>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#C9A227] to-transparent mx-auto mt-2" />
      </div>

      {/* Table of 10 Names */}
      <div className="my-3 overflow-x-auto relative z-10">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[#C9A227]/40 text-[#E7C96A] text-[9.5px] font-sans uppercase tracking-wider">
              <th className="py-1.5 px-2 text-center w-8">#</th>
              <th className="py-1.5 px-2">NAME</th>
              <th className="py-1.5 px-2">MEANING</th>
              <th className="py-1.5 px-2 font-mono">CHALDEAN CALCULATION</th>
              <th className="py-1.5 px-2 text-center">COMPOUND</th>
              <th className="py-1.5 px-2 text-center">ROOT</th>
              <th className="py-1.5 px-2 text-right">SCORE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C9A227]/15 text-[10.5px]">
            {top10Names.map((n) => {
              const isFirst = n.rank === 1;
              const isSecond = n.rank === 2;
              const isThird = n.rank === 3;
              return (
                <tr
                  key={n.rank}
                  className={`hover:bg-[#071322]/80 transition-colors ${
                    isFirst ? 'bg-[#E7C96A]/10 font-medium' : ''
                  }`}
                >
                  <td className="py-1.5 px-2 text-center font-bold">
                    {isFirst && <span className="text-amber-300">🥇 1</span>}
                    {isSecond && <span className="text-gray-300">🥈 2</span>}
                    {isThird && <span className="text-amber-500">🥉 3</span>}
                    {!isFirst && !isSecond && !isThird && (
                      <span className="text-gray-400 font-mono">{String(n.rank).padStart(2, '0')}</span>
                    )}
                  </td>
                  <td className="py-1.5 px-2 font-serif font-bold tracking-wide text-white">
                    {n.name}
                  </td>
                  <td className="py-1.5 px-2 text-gray-300 text-[10px] max-w-[220px] truncate leading-tight">
                    {n.meaning}
                  </td>
                  <td className="py-1.5 px-2 font-mono text-[#E7C96A] text-[10px] whitespace-nowrap">
                    {n.calculation}
                  </td>
                  <td className="py-1.5 px-2 text-center font-semibold text-white">
                    {n.compound}
                  </td>
                  <td className="py-1.5 px-2 text-center font-bold text-[#E7C96A]">
                    {n.root}
                  </td>
                  <td className="py-1.5 px-2 text-right font-serif font-bold text-emerald-400 text-xs">
                    {n.score}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Panel 3 Footer Bar */}
      <div className="pt-2 border-t border-[#C9A227]/25 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] relative z-10">
        <div>
          <div className="text-[9.5px] font-sans font-bold uppercase tracking-wider text-[#E7C96A] mb-1">
            WHY THESE NAMES?
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-gray-300 text-[9.5px]">
            <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Numerologically aligned</span>
            <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Meaningful &amp; auspicious</span>
            <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Easy to pronounce globally</span>
            <span className="flex items-center gap-1"><span className="text-emerald-400">✓</span> Suitable for long-term use</span>
          </div>
        </div>

        <div className="px-3 py-1.5 rounded-lg bg-[#071322] border border-[#C9A227]/30 text-center sm:text-right">
          <div className="font-serif italic text-[#E7C96A] text-[10px]">&ldquo;A name today, a brighter tomorrow.&rdquo;</div>
          <div className="text-[8.5px] text-gray-400 uppercase tracking-wider">Cherished for a lifetime of honor</div>
        </div>
      </div>
    </div>
  );

  // PANEL 4: Your Top 3 Recommendations (THE REPORT FINAL SECTION)
  const renderPanel4 = () => (
    <div
      onClick={() => onSelectPanel && onSelectPanel(4)}
      className={`relative bg-[#091526] border-2 border-[#C9A227] rounded-2xl p-5 sm:p-6 text-[#F7F1DF] flex flex-col justify-between shadow-2xl transition-all ${
        onSelectPanel ? 'cursor-pointer hover:border-[#F3E6C5] hover:shadow-[#C9A227]/20' : ''
      } ${highlightPanel === 4 ? 'ring-2 ring-[#E7C96A]' : ''}`}
    >
      <div className="absolute inset-1.5 border border-[#C9A227]/30 rounded-xl pointer-events-none" />
      <OrnateCorner position="tl" />
      <OrnateCorner position="tr" />
      <OrnateCorner position="bl" />
      <OrnateCorner position="br" />

      {/* Header */}
      <div className="text-center relative z-10 pt-1">
        <div className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#E7C96A] font-semibold">
          ✦ PERSONALIZED • MEANINGFUL • NUMEROLOGICALLY ALIGNED ✦
        </div>
        <h3 className="mt-1 text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide uppercase">
          YOUR TOP 3 NAME RECOMMENDATIONS
        </h3>
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#C9A227] to-transparent mx-auto mt-2" />
      </div>

      {/* Top 3 Recommendation Cards */}
      <div className="my-3 grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10">
        
        {/* Card 1: DHRUV (Best Overall) */}
        <div className="bg-[#071322] border-2 border-[#E7C96A] rounded-xl p-3.5 flex flex-col justify-between shadow-lg relative">
          <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-400 text-[9px] font-sans font-bold uppercase tracking-wider text-emerald-300">
            BEST OVERALL • 100/100
          </div>
          <div>
            <div className="flex items-baseline justify-between mt-1">
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#E7C96A] tracking-wider">
                {top3.bestOverall.name}
              </h4>
              <span className="text-[10px] font-mono text-[#E7C96A]">
                Chaldean: {top3.bestOverall.compound} / Root: {top3.bestOverall.root}
              </span>
            </div>
            <p className="text-[10.5px] text-gray-300 italic mt-1 leading-snug">
              {top3.bestOverall.meaning}
            </p>
            <div className="mt-2.5 pt-2 border-t border-[#C9A227]/25 text-[10px]">
              <span className="font-sans font-bold uppercase tracking-wider text-[#E7C96A] block text-[9px]">
                WHY IT STANDS OUT:
              </span>
              <p className="text-gray-300 leading-tight mt-0.5">
                {top3.bestOverall.whyStandsOut}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: DAKSH (Strong Alternative) */}
        <div className="bg-[#071322] border border-[#C9A227]/50 rounded-xl p-3.5 flex flex-col justify-between shadow-md relative">
          <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-blue-950 border border-blue-400 text-[9px] font-sans font-bold uppercase tracking-wider text-blue-300">
            STRONG ALTERNATIVE • 94/100
          </div>
          <div>
            <div className="flex items-baseline justify-between mt-1">
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wider">
                {top3.strongAlternative.name}
              </h4>
              <span className="text-[10px] font-mono text-[#E7C96A]">
                Chaldean: {top3.strongAlternative.compound} / Root: {top3.strongAlternative.root}
              </span>
            </div>
            <p className="text-[10.5px] text-gray-300 italic mt-1 leading-snug">
              {top3.strongAlternative.meaning}
            </p>
            <div className="mt-2.5 pt-2 border-t border-[#C9A227]/25 text-[10px]">
              <span className="font-sans font-bold uppercase tracking-wider text-[#E7C96A] block text-[9px]">
                WHY IT STANDS OUT:
              </span>
              <p className="text-gray-300 leading-tight mt-0.5">
                {top3.strongAlternative.whyStandsOut}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: OMAR (Unique Alternative) */}
        <div className="bg-[#071322] border border-[#C9A227]/50 rounded-xl p-3.5 flex flex-col justify-between shadow-md relative">
          <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full bg-amber-950 border border-amber-400 text-[9px] font-sans font-bold uppercase tracking-wider text-amber-300">
            UNIQUE ALTERNATIVE • 92/100
          </div>
          <div>
            <div className="flex items-baseline justify-between mt-1">
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wider">
                {top3.uniqueAlternative.name}
              </h4>
              <span className="text-[10px] font-mono text-[#E7C96A]">
                Chaldean: {top3.uniqueAlternative.compound} / Root: {top3.uniqueAlternative.root}
              </span>
            </div>
            <p className="text-[10.5px] text-gray-300 italic mt-1 leading-snug">
              {top3.uniqueAlternative.meaning}
            </p>
            <div className="mt-2.5 pt-2 border-t border-[#C9A227]/25 text-[10px]">
              <span className="font-sans font-bold uppercase tracking-wider text-[#E7C96A] block text-[9px]">
                WHY IT STANDS OUT:
              </span>
              <p className="text-gray-300 leading-tight mt-0.5">
                {top3.uniqueAlternative.whyStandsOut}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Special Category Recognitions */}
      <div className="my-1.5 bg-[#071322]/80 border border-[#C9A227]/30 rounded-xl p-2.5 relative z-10">
        <div className="text-[9.5px] font-sans font-bold uppercase tracking-wider text-[#E7C96A] mb-1.5 text-center">
          SPECIAL CATEGORY RECOGNITIONS
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
          {specialCategories.map((cat, idx) => (
            <div key={idx} className="bg-[#091526] border border-[#C9A227]/25 rounded-lg p-1.5">
              <div className="text-[8px] font-sans font-bold text-gray-400 uppercase tracking-wider">{cat.category}</div>
              <div className="text-xs font-serif font-bold text-[#E7C96A] mt-0.5">{cat.name}</div>
              <div className="text-[8px] text-emerald-400 font-mono">Score: {cat.score}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row: Parent Guidance + Top Recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 my-2 relative z-10 text-xs">
        
        {/* Parent Guidance */}
        <div className="bg-[#071322]/90 border border-[#C9A227]/40 rounded-xl p-3 space-y-1.5">
          <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#E7C96A] border-b border-[#C9A227]/30 pb-1">
            PARENT GUIDANCE &amp; PRACTICAL WISDOM
          </div>
          <ul className="space-y-1 text-[9.5px] text-gray-300">
            {parentGuidance.map((tip, i) => (
              <li key={i} className="flex items-start gap-1.5 leading-snug">
                <span className="text-[#E7C96A] mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Top Recommendation (REPORT FINAL VERDICT) */}
        <div className="bg-gradient-to-br from-[#0c1b33] to-[#071322] border-2 border-[#E7C96A] rounded-xl p-3 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center justify-between border-b border-[#C9A227]/30 pb-1">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#E7C96A]">
                OUR TOP RECOMMENDATION
              </span>
              <span className="text-xs text-amber-300 font-serif">✦ Crown Fit ✦</span>
            </div>
            <h4 className="text-2xl font-serif font-bold text-white mt-1.5 tracking-wider">
              {topRecommendation.fullName}
            </h4>
            <p className="text-[10.5px] text-[#E7C96A] font-serif italic mt-1 leading-snug">
              &ldquo;{topRecommendation.description}&rdquo;
            </p>
          </div>
          <div className="mt-2 text-[8.5px] text-gray-400 italic">
            Evaluated against the Gupta family surname for lifelong auspicious acoustic resonance.
          </div>
        </div>

      </div>

      {/* Atelier Archival Commission & Provenance Seal */}
      <div className="my-2 p-2.5 rounded-xl bg-[#071322]/95 border border-[#C9A227]/40 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-[#E7C96A] bg-[#0c1b33] border border-[#C9A227]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#E7C96A]" />
            Atelier Commission
          </span>
          <span className="text-[10px] text-gray-300">
            Standard Valuation: <span className="line-through decoration-[#C9A227] decoration-1 text-gray-400 font-serif">{originalPriceDisplay}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-500/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
            50% Courtesy Blessing
          </span>
          <span className="text-[10px] text-[#F7F1DF]">
            Sacred Shagun Offering: <strong className="text-[#E7C96A] font-serif text-sm font-bold">{priceDisplay}</strong>
          </span>
        </div>
      </div>

      {/* Specialist Certification & Archival Signature */}
      <div className="my-1.5 pt-1.5 border-t border-[#C9A227]/30 flex items-center justify-between relative z-10 px-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border border-[#E7C96A]/60 flex items-center justify-center text-[8px] font-serif text-[#E7C96A] bg-[#071322]">
            ✦
          </div>
          <div className="text-left">
            <span className="text-[8.5px] uppercase tracking-wider text-[#E7C96A] font-sans font-bold block">
              Certified by Acharya D. V. Shastri
            </span>
            <span className="text-[7.5px] text-gray-400 font-serif italic block">
              Lead Epigraphist • VedaChaldea Atelier
            </span>
          </div>
        </div>
        <div className="text-right">
          <svg
            aria-label="Acharya D. V. Shastri signature"
            className="w-24 h-6 text-[#E7C96A] inline-block opacity-90"
            viewBox="0 0 240 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 42 C 20 18, 30 10, 42 22 C 50 32, 45 48, 56 36 C 68 22, 75 14, 88 28 C 96 36, 110 32, 125 24" />
            <path d="M38 28 L 65 24" />
            <path d="M130 20 C 135 15, 142 12, 148 18 C 154 26, 145 42, 160 30 C 172 20, 185 15, 205 28 C 218 36, 228 32, 235 24" />
            <path d="M140 38 C 160 48, 195 44, 228 40" strokeWidth="1.5" />
            <circle cx="236" cy="38" r="1.5" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Legal & Methodological Disclaimer */}
      <div className="pt-2 border-t border-[#C9A227]/25 text-[8.5px] text-gray-400 text-center leading-tight relative z-10">
        {disclaimer}
      </div>
    </div>
  );

  if (showOnlyFinalSection) {
    return renderPanel4();
  }

  return (
    <div className="space-y-4">
      {/* 2x2 Complete 4-Panel Archival Sheet Grid (As Pictured) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#040811] p-4 sm:p-6 rounded-3xl border border-[#C9A227]/50 shadow-2xl">
        {/* Panel 1 (Top-Left) */}
        <div>{renderPanel1()}</div>

        {/* Panel 2 (Top-Right) */}
        <div>{renderPanel2()}</div>

        {/* Panel 3 (Bottom-Left) */}
        <div>{renderPanel3()}</div>

        {/* Panel 4 (Bottom-Right) - Report Final Section */}
        <div>{renderPanel4()}</div>
      </div>

      {/* Archival Sheet Valuation & Provenance Strip */}
      <div className="p-3.5 rounded-2xl bg-[#091526] border border-[#C9A227]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F7F1DF] shadow-lg">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#E7C96A]" />
          <span className="text-xs font-serif italic text-[#C9A227]">
            Complete 4-Panel Archival Dossier (300 DPI Heirloom Edition)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-gray-400">
            Standard Valuation: <span className="line-through decoration-[#C9A227] decoration-1 font-serif text-gray-400">{originalPriceDisplay}</span>
          </span>
          <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-500/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
            50% Courtesy
          </span>
          <span className="text-xs text-white">
            Sacred Shagun Offering: <strong className="text-[#E7C96A] font-serif text-base font-bold">{priceDisplay}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
