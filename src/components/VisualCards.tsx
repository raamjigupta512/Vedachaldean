import React, { useState } from 'react';
import { notifyCopied } from '../utils/notifications';
import {
  Sparkles,
  Award,
  Crown,
  Share2,
  Check,
  Star,
  Download,
  Loader2,
  ArrowRight,
  Maximize2,
  Grid2X2,
  Heart,
  Info,
  Globe,
  User,
  Calendar,
  Clock,
  MapPin,
  FileSignature,
  Infinity,
  Leaf,
  Moon,
  Shield,
  Gem,
  Compass
} from 'lucide-react';
import { ConsultationReportData, NameAnalysis } from '../types';
import { PLANETARY_RULERS, CHALDEAN_MAP } from '../utils/chaldean';
import babyPhoto from '../assets/images/sleeping_newborn_baby_1789326693225.jpg';
import parentsPhoto from '../assets/images/parents_holding_baby_1789326710506.jpg';

interface VisualCardsProps {
  report: ConsultationReportData;
  onSelectName: (name: NameAnalysis) => void;
  onSwitchToWrittenReport: () => void;
  onSwitchToTesterWith: (name: string) => void;
  onDownloadPdf?: () => void;
  isDownloadingPdf?: boolean;
}

// Ornate Corner Flourish (Victorian / Celestial L-bracket)
const OrnateCorner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const rotationClass = {
    tl: '',
    tr: 'rotate-90',
    br: 'rotate-180',
    bl: '-rotate-90'
  }[position];

  const posClass = {
    tl: 'top-1.5 left-1.5',
    tr: 'top-1.5 right-1.5',
    br: 'bottom-1.5 right-1.5',
    bl: 'bottom-1.5 left-1.5'
  }[position];

  return (
    <div className={`absolute ${posClass} pointer-events-none z-10 ${rotationClass}`}>
      <svg className="w-5 h-5 sm:w-7 sm:h-7 text-[#c5a059]" viewBox="0 0 40 40" fill="none">
        <path d="M3 37V12C3 7.02944 7.02944 3 12 3H37" stroke="currentColor" strokeWidth="1.75" />
        <path d="M7 37V14C7 10.134 10.134 7 14 7H37" stroke="currentColor" strokeWidth="0.75" strokeDasharray="1.5 2" />
        <path d="M12 3C12 7.97056 7.97056 12 3 12" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <circle cx="3" cy="3" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};

// Lotus Icon SVG for Spiritual Harmony
const LotusIcon = ({ className = 'w-8 h-8 text-[#dec477]' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none">
    <path
      d="M24 6C24 6 18 16 18 26C18 31 21 36 24 38C27 36 30 31 30 26C30 16 24 6 24 6Z"
      fill="currentColor"
      fillOpacity="0.3"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M24 16C24 16 11 22 10 32C9 37 13 40 17 40C21 40 24 36 24 36"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M24 16C24 16 37 22 38 32C39 37 35 40 31 40C27 40 24 36 24 36"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M24 24C24 24 14 30 13 36C12 40 16 42 20 42C23 42 24 39 24 39"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeOpacity="0.7"
    />
    <path
      d="M24 24C24 24 34 30 35 36C36 40 32 42 28 42C25 42 24 39 24 39"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeOpacity="0.7"
    />
    <circle cx="24" cy="40" r="2" fill="currentColor" />
  </svg>
);

// Calculation string helper: e.g. "1+1+2+1+6 = 11"
const formatCalculation = (name: string, fallbackCompound?: number): string => {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '');
  const vals: number[] = [];
  for (let i = 0; i < clean.length; i++) {
    vals.push(CHALDEAN_MAP[clean[i]] || 1);
  }
  const sum = vals.reduce((a, b) => a + b, 0);
  return `${vals.join('+')} = ${fallbackCompound || sum}`;
};

export const VisualCards: React.FC<VisualCardsProps> = ({
  report,
  onSelectName,
  onSwitchToWrittenReport,
  onSwitchToTesterWith,
  onDownloadPdf,
  isDownloadingPdf = false
}) => {
  // 'poster' shows the exact 2x2 multi-panel layout from the uploaded reference image
  const [viewMode, setViewMode] = useState<'poster' | 'card1' | 'card2' | 'card3' | 'card4'>('poster');
  const [copiedText, setCopiedText] = useState(false);

  const { input, blueprint, vedic, top_10, top_3, category_winners } = report;

  // Format date nicely e.g. "18 March 2026"
  const formattedDob = React.useMemo(() => {
    if (!input.date_of_birth) return '18 March 2026';
    try {
      const parts = input.date_of_birth.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      }
      return input.date_of_birth;
    } catch {
      return input.date_of_birth;
    }
  }, [input.date_of_birth]);

  // Format time nicely e.g. "04:42 AM"
  const formattedTime = React.useMemo(() => {
    if (!input.time_of_birth) return '04:42 AM';
    try {
      const [h, m] = input.time_of_birth.split(':').map(Number);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      return `${hour12 < 10 ? '0' + hour12 : hour12}:${m < 10 ? '0' + m : m} ${ampm}`;
    } catch {
      return input.time_of_birth;
    }
  }, [input.time_of_birth]);

  const babyFullName = `${input.baby_name || top_3.best_overall?.name || 'Aarav'} ${input.family_surname || 'Gupta'}`.toUpperCase();

  // Helper to copy structured text for WhatsApp / Social sharing
  const handleCopyShareText = () => {
    const text = `🌟 *BABY NAMING CONSULTATION REPORT* 🌟
Baby: ${babyFullName} (${input.gender.toUpperCase()})
Date of Birth: ${formattedDob} at ${formattedTime}
Place: ${input.place_of_birth || 'Bengaluru, Karnataka, India'}
Birth Number: ${blueprint.birth_number} (${blueprint.birth_planet})
Destiny Number: ${blueprint.destiny_compound}/${blueprint.destiny_number} (${blueprint.destiny_planet})
Nakshatra: ${vedic.nakshatra || 'Revati'} (Pada ${vedic.nakshatra_pada || 4})

🥇 *1 BEST OVERALL NAME: ${top_3.best_overall.name}*
Meaning: ${top_3.best_overall.meaning}
Chaldean: ${top_3.best_overall.compound_number}/${top_3.best_overall.root_number} | Score: ${top_3.best_overall.score}/100

🥈 *STRONG ALTERNATIVE: ${top_3.strong_alternative.name}*
Meaning: ${top_3.strong_alternative.meaning}
Chaldean: ${top_3.strong_alternative.compound_number}/${top_3.strong_alternative.root_number} | Score: ${top_3.strong_alternative.score}/100

🥉 *UNIQUE ALTERNATIVE: ${top_3.unique_alternative.name}*
Meaning: ${top_3.unique_alternative.meaning}
Chaldean: ${top_3.unique_alternative.compound_number}/${top_3.unique_alternative.root_number} | Score: ${top_3.unique_alternative.score}/100

Generated via VedaChaldea AI Astrological Master Agent.`;

    navigator.clipboard.writeText(text);
    setCopiedText(true);
    notifyCopied('Formatted report summary copied for WhatsApp & social sharing.');
    setTimeout(() => setCopiedText(false), 3000);
  };

  // =========================================================================
  // SUB-PANEL 1: BABY DETAILS & REPORT COVER (Top-Left)
  // =========================================================================
  const renderCard1 = (isSingleView = false) => (
    <div
      id="poster-card-1"
      className={`relative rounded-2xl bg-gradient-to-b from-[#0a122c] via-[#070d1e] to-[#040814] border-2 border-[#c5a059]/40 p-4 sm:p-6 shadow-2xl shadow-black/80 flex flex-col justify-between overflow-hidden ${
        isSingleView ? 'max-w-4xl mx-auto min-h-[620px]' : 'min-h-[580px]'
      }`}
    >
      {/* Ornate Corner Accents */}
      <OrnateCorner position="tl" />
      <OrnateCorner position="tr" />
      <OrnateCorner position="bl" />
      <OrnateCorner position="br" />

      {/* Subtle Starry / Celestial Radial Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#dec477]/10 via-transparent to-transparent pointer-events-none" />

      {/* Card 1 Header */}
      <div className="relative text-center pt-1 pb-3">
        <div className="flex items-center justify-center gap-2">
          <span className="text-[#dec477] text-xs">✦</span>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold uppercase tracking-[0.18em] text-[#fbf8ee] drop-shadow-sm">
            {babyFullName}
          </h1>
          <span className="text-[#dec477] text-xs">✦</span>
        </div>
        
        <h2 className="text-[11px] sm:text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#dec477] mt-1">
          Chaldean Baby Name Numerology Report
        </h2>

        <div className="flex items-center justify-center gap-2 mt-1">
          <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#c5a059]/60" />
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#9ca3af]">
            A Beautiful Name for a Brighter Tomorrow
          </span>
          <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#c5a059]/60" />
        </div>

        {/* Top Right Floating Quote */}
        <p className="text-[10px] sm:text-[11px] font-serif italic text-[#d4af37]/90 mt-2 max-w-lg mx-auto text-center px-4 leading-relaxed">
          &ldquo;A name is the first gift you give your child. Let it be meaningful, harmonious and powerful.&rdquo;
        </p>
      </div>

      {/* Card 1 Body: Photo + Details + Lotus Aspirations */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center my-auto py-2">
        
        {/* Left: Sleeping Baby Photo */}
        <div className="md:col-span-4 flex flex-col items-center justify-center">
          <div className="relative p-1 rounded-full bg-gradient-to-br from-[#dec477] via-[#b59033] to-[#785621] shadow-xl shadow-black/60">
            <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 border-[#070d1e] bg-[#070d1e]">
              <img
                src={babyPhoto}
                alt="Newborn sleeping baby portrait"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* Outer delicate ring */}
            <div className="absolute -inset-1 rounded-full border border-[#dec477]/30 pointer-events-none" />
          </div>
        </div>

        {/* Center: Baby Details Card */}
        <div className="md:col-span-5 rounded-xl bg-[#091126]/80 border border-[#c5a059]/30 p-3 sm:p-4 shadow-inner">
          <div className="text-[11px] font-heading font-bold uppercase tracking-[0.2em] text-[#dec477] border-b border-[#c5a059]/20 pb-1.5 mb-2.5 flex items-center justify-between">
            <span>Baby Details</span>
            <span className="text-[9px] text-[#9ca3af] font-normal lowercase tracking-normal">natal dossier</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2.5">
              <User className="w-3.5 h-3.5 text-[#dec477] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-[#9ca3af] block leading-none">Name (Suggested)</span>
                <span className="font-semibold text-[#fbf8ee]">{input.baby_name || top_3.best_overall?.name || 'Aarav'}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full border border-[#dec477] flex items-center justify-center text-[9px] font-bold text-[#dec477] shrink-0 mt-0.5">
                {input.gender === 'boy' ? '♂' : '♀'}
              </div>
              <div>
                <span className="text-[10px] text-[#9ca3af] block leading-none">Gender</span>
                <span className="font-semibold text-[#fbf8ee] capitalize">{input.gender}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Calendar className="w-3.5 h-3.5 text-[#dec477] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-[#9ca3af] block leading-none">Date of Birth</span>
                <span className="font-semibold text-[#fbf8ee]">{formattedDob}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-3.5 h-3.5 text-[#dec477] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-[#9ca3af] block leading-none">Time of Birth</span>
                <span className="font-semibold text-[#fbf8ee]">{formattedTime}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-3.5 h-3.5 text-[#dec477] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-[#9ca3af] block leading-none">Place of Birth</span>
                <span className="font-semibold text-[#fbf8ee] truncate max-w-[150px] sm:max-w-none">
                  {input.place_of_birth || 'Bengaluru, Karnataka, India'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <FileSignature className="w-3.5 h-3.5 text-[#dec477] shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-[#9ca3af] block leading-none">Surname</span>
                <span className="font-semibold text-[#fbf8ee]">{input.family_surname || 'Gupta'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Small Name Big Possibilities & Lotus */}
        <div className="md:col-span-3 flex flex-col items-center text-center space-y-2">
          <div className="font-['Alex_Brush',_cursive] text-2xl sm:text-3xl text-[#dec477] leading-tight drop-shadow-sm">
            Small Name,<br />Big Possibilities
          </div>

          <div className="py-1">
            <LotusIcon className="w-9 h-9 text-[#dec477]" />
          </div>

          <div className="space-y-1.5 text-left text-[11px] text-[#fbf8ee]">
            <div className="flex items-center gap-1.5">
              <span className="text-[#dec477] text-xs">★</span>
              <span>Positive Vibrations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#dec477] text-xs">★</span>
              <span>Harmonious Beginnings</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#dec477] text-xs">★</span>
              <span>Meaningful Life</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#dec477] text-xs">★</span>
              <span>Aligned with Purpose</span>
            </div>
          </div>
        </div>

      </div>

      {/* Card 1 Bottom: 4 Pillars of Good Fortune */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-[#c5a059]/20">
        <div className="p-2.5 rounded-xl bg-[#091126]/60 border border-[#c5a059]/20 flex flex-col items-center text-center">
          <Infinity className="w-4 h-4 text-[#dec477] mb-1" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#dec477]">Good Karma</span>
          <span className="text-[9px] text-[#9ca3af]">Bright Future</span>
        </div>

        <div className="p-2.5 rounded-xl bg-[#091126]/60 border border-[#c5a059]/20 flex flex-col items-center text-center">
          <Leaf className="w-4 h-4 text-[#dec477] mb-1" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#dec477]">Strong Values</span>
          <span className="text-[9px] text-[#9ca3af]">Successful Life</span>
        </div>

        <div className="p-2.5 rounded-xl bg-[#091126]/60 border border-[#c5a059]/20 flex flex-col items-center text-center">
          <Star className="w-4 h-4 text-[#dec477] mb-1" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#dec477]">Happiness</span>
          <span className="text-[9px] text-[#9ca3af]">And Well-Being</span>
        </div>

        <div className="p-2.5 rounded-xl bg-[#091126]/60 border border-[#c5a059]/20 flex flex-col items-center text-center">
          <Award className="w-4 h-4 text-[#dec477] mb-1" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-[#dec477]">A Meaningful</span>
          <span className="text-[9px] text-[#9ca3af]">Legacy</span>
        </div>
      </div>
    </div>
  );

  // =========================================================================
  // SUB-PANEL 2: BABY'S NUMEROLOGY BLUEPRINT (Top-Right)
  // =========================================================================
  const renderCard2 = (isSingleView = false) => (
    <div
      id="poster-card-2"
      className={`relative rounded-2xl bg-gradient-to-b from-[#0a122c] via-[#070d1e] to-[#040814] border-2 border-[#c5a059]/40 p-4 sm:p-6 shadow-2xl shadow-black/80 flex flex-col justify-between overflow-hidden ${
        isSingleView ? 'max-w-4xl mx-auto min-h-[620px]' : 'min-h-[580px]'
      }`}
    >
      <OrnateCorner position="tl" />
      <OrnateCorner position="tr" />
      <OrnateCorner position="bl" />
      <OrnateCorner position="br" />

      {/* Card 2 Header */}
      <div className="relative text-center pt-1 pb-3">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-heading font-bold uppercase tracking-[0.15em] text-[#fbf8ee]">
          Your Baby&apos;s Numerology Blueprint
        </h2>
        <h3 className="text-[10px] sm:text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#dec477] mt-0.5">
          Chaldean Numerology Analysis
        </h3>
        
        {/* Top Right Floating Quote */}
        <div className="flex items-center justify-center gap-1 text-[10px] font-serif italic text-[#d4af37]/90 mt-1">
          <span>&ldquo;Numbers are the language of the universe.&rdquo;</span>
          <Moon className="w-3 h-3 text-[#dec477]" />
        </div>
      </div>

      {/* Top Row: Birth Numbers + Chaldean Letter-Number System */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 my-auto py-1">
        
        {/* Left: Birth Numbers 3-Column Box */}
        <div className="lg:col-span-7 rounded-xl bg-[#091126]/80 border border-[#c5a059]/30 p-3">
          <div className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#dec477] mb-2 text-center">
            Birth Numbers
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Birth Number */}
            <div className="p-2 rounded-lg bg-[#0d1736] border border-white/5 flex flex-col justify-between">
              <span className="text-[9px] uppercase tracking-wider text-[#9ca3af] font-medium leading-tight">
                Birth Number<br />(Day)
              </span>
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[#dec477] my-1">
                {blueprint.birth_number}
              </div>
              <div className="text-[9px] font-mono text-[#9ca3af] mb-1">
                {blueprint.birth_compound !== blueprint.birth_number ? `${blueprint.birth_compound} → ` : ''}1 + 8 = {blueprint.birth_number}
              </div>
              <div className="text-[8.5px] text-[#fbf8ee] leading-tight">
                Compassionate<br />Humanitarian<br />Wise
              </div>
            </div>

            {/* Destiny Number */}
            <div className="p-2 rounded-lg bg-[#0d1736] border border-white/5 flex flex-col justify-between">
              <span className="text-[9px] uppercase tracking-wider text-[#9ca3af] font-medium leading-tight">
                Destiny Number<br />(Full Date)
              </span>
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[#dec477] my-1">
                {blueprint.destiny_compound}/{blueprint.destiny_number}
              </div>
              <div className="text-[8px] font-mono text-[#9ca3af] mb-1 truncate" title="Total Date Vibration Calculation">
                2+8+0+3+2+0+2+6 = 22
              </div>
              <div className="text-[8.5px] text-[#fbf8ee] leading-tight">
                Leadership<br />Independence<br />New Beginnings
              </div>
            </div>

            {/* Year Vibration */}
            <div className="p-2 rounded-lg bg-[#0d1736] border border-white/5 flex flex-col justify-between">
              <span className="text-[9px] uppercase tracking-wider text-[#9ca3af] font-medium leading-tight">
                Year Vibration<br />(2026)
              </span>
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-[#dec477] my-1">
                {blueprint.year_vibration}
              </div>
              <div className="text-[8.5px] font-mono text-[#9ca3af] mb-1">
                2+0+2+6 = 10 → 1+0 = {blueprint.year_vibration}
              </div>
              <div className="text-[8.5px] text-[#fbf8ee] leading-tight">
                New Opportunities<br />Initiative<br />Progress
              </div>
            </div>
          </div>
        </div>

        {/* Right: Chaldean Letter-Number System */}
        <div className="lg:col-span-5 rounded-xl bg-[#091126]/80 border border-[#c5a059]/30 p-2.5 flex flex-col justify-between">
          <div className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#dec477] text-center mb-1">
            Chaldean Letter-Number System
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px]">
            {[
              { num: 1, letters: 'A, I, J, Q, Y' },
              { num: 2, letters: 'B, K, R' },
              { num: 3, letters: 'C, G, L, S' },
              { num: 4, letters: 'D, M, T' },
              { num: 5, letters: 'E, H, N, X' },
              { num: 6, letters: 'U, V, W' },
              { num: 7, letters: 'O, Z' },
              { num: 8, letters: 'F, P' }
            ].map(item => (
              <div key={item.num} className="flex items-center justify-between px-2 py-0.5 rounded bg-[#0d1736]/60 border border-white/5">
                <span className="font-bold text-[#dec477] text-xs">{item.num}</span>
                <span className="font-mono text-[9.5px] text-[#fbf8ee]">{item.letters}</span>
              </div>
            ))}
          </div>

          <p className="text-[8.5px] text-[#9ca3af] italic leading-tight mt-1.5 border-t border-white/5 pt-1">
            <strong className="text-[#dec477]">Note:</strong> Number 9 is sacred &amp; not assigned to letters. We preserve compound vibrations before reducing.
          </p>
        </div>

      </div>

      {/* Middle-Bottom Row: Nakshatra Details + Compatible Numbers + Key Strengths */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
        
        {/* Nakshatra Details (Vedic Reference) */}
        <div className="md:col-span-4 rounded-xl bg-[#091126]/80 border border-[#c5a059]/30 p-2.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-[9.5px] font-heading font-bold uppercase tracking-wider text-[#dec477] mb-1.5">
              <Moon className="w-3 h-3 text-[#dec477]" />
              <span>Nakshatra Details</span>
            </div>
            <span className="text-[8.5px] text-[#9ca3af] block -mt-1 mb-2">(Vedic Reference - Optional)</span>

            <div className="space-y-1 text-[10px]">
              <div className="flex justify-between border-b border-white/5 pb-0.5">
                <span className="text-[#9ca3af]">Moon Sign (Rashi):</span>
                <span className="font-semibold text-[#fbf8ee]">{vedic.moon_sign || 'Pisces (Meena)'}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-0.5">
                <span className="text-[#9ca3af]">Nakshatra:</span>
                <span className="font-semibold text-[#dec477]">{vedic.nakshatra || 'Revati'}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-0.5">
                <span className="text-[#9ca3af]">Pada:</span>
                <span className="font-semibold text-[#fbf8ee]">{vedic.nakshatra_pada || 4}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9ca3af]">Starting Sounds:</span>
                <span className="font-semibold text-[#dec477] tracking-wide">
                  {vedic.traditional_syllables?.slice(0, 4).join(', ') || 'De, Do, Cha, Chi'}
                </span>
              </div>
            </div>
          </div>

          <p className="text-[8px] text-[#9ca3af] italic mt-2 leading-tight">
            *Based on birth details provided. For exact Nakshatra, please verify with a Vedic astrologer.
          </p>
        </div>

        {/* Compatible Name Numbers */}
        <div className="md:col-span-4 rounded-xl bg-[#091126]/80 border border-[#c5a059]/30 p-2.5 flex flex-col justify-between">
          <div className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#dec477] text-center mb-2">
            Compatible Name Numbers
          </div>

          <div className="space-y-2 text-[10px]">
            <div>
              <span className="text-[8.5px] text-[#9ca3af] uppercase tracking-wider block mb-1">Highly Compatible</span>
              <div className="flex items-center gap-1.5">
                {[1, 3, 6].map(n => (
                  <span key={n} className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400 font-bold text-xs flex items-center justify-center">
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[8.5px] text-[#9ca3af] uppercase tracking-wider block mb-1">Supportive</span>
              <div className="flex items-center gap-1.5">
                {[2, 5].map(n => (
                  <span key={n} className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400 font-bold text-xs flex items-center justify-center">
                    {n}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-[8.5px] text-[#9ca3af] uppercase tracking-wider block mb-1">Neutral</span>
                <div className="flex items-center gap-1.5">
                  {[4, 8].map(n => (
                    <span key={n} className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400 font-bold text-xs flex items-center justify-center">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[8.5px] text-[#9ca3af] uppercase tracking-wider block mb-1">Caution</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-6 h-6 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400 font-bold text-xs flex items-center justify-center">
                    7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Strengths */}
        <div className="md:col-span-4 rounded-xl bg-[#091126]/80 border border-[#c5a059]/30 p-2.5">
          <div className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#dec477] mb-2 text-center">
            Key Strengths
          </div>

          <div className="space-y-1 text-[9.5px] text-[#fbf8ee]">
            <div className="flex items-center gap-1.5">
              <span className="text-[#dec477]">✦</span>
              <span>Strong intuitive mind</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#dec477]">✦</span>
              <span>Natural leadership potential</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#dec477]">✦</span>
              <span>Creative and imaginative</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#dec477]">✦</span>
              <span>Compassionate and helpful</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#dec477]">✦</span>
              <span>Ability to inspire others</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#dec477]">✦</span>
              <span>Good for international exposure</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  // =========================================================================
  // SUB-PANEL 3: TOP 10 RECOMMENDED BABY NAMES (Bottom-Left)
  // =========================================================================
  const renderCard3 = (isSingleView = false) => {
    // Standard names displayed in the poster reference image
    const displayTop10 = top_10.slice(0, 10);

    return (
      <div
        id="poster-card-3"
        className={`relative rounded-2xl bg-gradient-to-b from-[#0a122c] via-[#070d1e] to-[#040814] border-2 border-[#c5a059]/40 p-4 sm:p-6 shadow-2xl shadow-black/80 flex flex-col justify-between overflow-hidden ${
          isSingleView ? 'max-w-4xl mx-auto min-h-[620px]' : 'min-h-[580px]'
        }`}
      >
        <OrnateCorner position="tl" />
        <OrnateCorner position="tr" />
        <OrnateCorner position="bl" />
        <OrnateCorner position="br" />

        {/* Card 3 Header */}
        <div className="relative text-center pt-1 pb-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#dec477] text-sm">✦</span>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-heading font-bold uppercase tracking-[0.15em] text-[#fbf8ee]">
              Top 10 Recommended Baby Names
            </h2>
            <span className="text-[#dec477] text-sm">✦</span>
          </div>

          <h3 className="text-[10px] sm:text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#dec477] mt-0.5">
            Beautiful Names • Positive Vibrations • Brighter Future
          </h3>

          <p className="text-[10px] font-serif italic text-[#d4af37]/90 mt-1">
            &ldquo;A good name resonates with the soul and supports the journey of life.&rdquo;
          </p>
        </div>

        {/* Top 10 Names Table */}
        <div className="overflow-x-auto rounded-xl border border-[#c5a059]/30 my-2">
          <table className="w-full text-left text-[10.5px] sm:text-[11px] border-collapse">
            <thead>
              <tr className="bg-[#111c38] text-[#dec477] uppercase text-[9px] tracking-wider border-b border-[#c5a059]/30">
                <th className="py-1.5 px-2 text-center w-8">#</th>
                <th className="py-1.5 px-2">Name</th>
                <th className="py-1.5 px-2">Meaning</th>
                <th className="py-1.5 px-2 font-mono">Chaldean Calculation</th>
                <th className="py-1.5 px-2 text-center">Compound</th>
                <th className="py-1.5 px-2 text-center">Root</th>
                <th className="py-1.5 px-2 text-center">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {displayTop10.map((candidate, idx) => (
                <tr
                  key={candidate.name}
                  onClick={() => onSelectName(candidate)}
                  className={`hover:bg-[#162447]/60 cursor-pointer transition-colors ${
                    idx % 2 === 0 ? 'bg-[#091126]/60' : 'bg-[#0c1630]/40'
                  }`}
                >
                  <td className="py-1.5 px-2 text-center text-[#9ca3af] font-semibold">{idx + 1}</td>
                  <td className="py-1.5 px-2 font-bold text-[#fbf8ee] flex items-center gap-1.5">
                    <span>{candidate.name}</span>
                    {idx === 0 && <Crown className="w-3 h-3 text-[#dec477]" />}
                  </td>
                  <td className="py-1.5 px-2 text-[#d1d5db] truncate max-w-[140px] sm:max-w-[200px]" title={candidate.meaning}>
                    {candidate.meaning}
                  </td>
                  <td className="py-1.5 px-2 font-mono text-[10px] text-[#dec477]/90 whitespace-nowrap">
                    {formatCalculation(candidate.name, candidate.compound_number)}
                  </td>
                  <td className="py-1.5 px-2 text-center font-bold text-[#fbf8ee]">{candidate.compound_number}</td>
                  <td className="py-1.5 px-2 text-center font-semibold text-[#dec477]">{candidate.root_number}</td>
                  <td className="py-1.5 px-2 text-center font-extrabold text-[#dec477]">{candidate.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card 3 Bottom Row: Why These Names & Parents Silhouette */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 items-center">
          {/* Why These Names List */}
          <div className="md:col-span-7 rounded-xl bg-[#091126]/80 border border-[#c5a059]/20 p-2.5">
            <div className="flex items-center gap-1 text-[10px] font-heading font-bold uppercase tracking-wider text-[#dec477] mb-1.5">
              <Star className="w-3.5 h-3.5 text-[#dec477]" />
              <span>Why these names?</span>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[9.5px] text-[#fbf8ee]">
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Aligned with your baby&apos;s birth numbers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Easy to pronounce</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Positive and meaningful vibrations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Suitable for global use</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Blend of tradition and modern appeal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>Support a bright and harmonious future</span>
              </div>
            </div>
          </div>

          {/* Parents Holding Baby Silhouette */}
          <div className="md:col-span-5 flex items-center justify-center gap-3 p-1">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#dec477]/50 shadow-md bg-[#070d1e] shrink-0">
              <img
                src={parentsPhoto}
                alt="Parents lovingly holding baby silhouette under moon"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="font-['Alex_Brush',_cursive] text-xl sm:text-2xl text-[#dec477] leading-tight drop-shadow-sm">
              A name today,<br />a brighter tomorrow.
            </div>
          </div>
        </div>

      </div>
    );
  };

  // =========================================================================
  // SUB-PANEL 4: TOP 3 NAME RECOMMENDATIONS (Bottom-Right)
  // =========================================================================
  const renderCard4 = (isSingleView = false) => {
    const { best_overall, strong_alternative, unique_alternative } = top_3;

    return (
      <div
        id="poster-card-4"
        className={`relative rounded-2xl bg-gradient-to-b from-[#0a122c] via-[#070d1e] to-[#040814] border-2 border-[#c5a059]/40 p-4 sm:p-6 shadow-2xl shadow-black/80 flex flex-col justify-between overflow-hidden ${
          isSingleView ? 'max-w-4xl mx-auto min-h-[620px]' : 'min-h-[580px]'
        }`}
      >
        <OrnateCorner position="tl" />
        <OrnateCorner position="tr" />
        <OrnateCorner position="bl" />
        <OrnateCorner position="br" />

        {/* Card 4 Header */}
        <div className="relative text-center pt-1 pb-2">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-heading font-bold uppercase tracking-[0.15em] text-[#fbf8ee]">
            Your Top 3 Name Recommendations
          </h2>
          <h3 className="text-[10px] sm:text-xs font-heading font-semibold uppercase tracking-[0.25em] text-[#dec477] mt-0.5">
            Personalized • Meaningful • Numerologically Aligned
          </h3>

          <p className="text-[10px] font-serif italic text-[#d4af37]/90 mt-1">
            &ldquo;The right name today can support a brighter, more harmonious tomorrow.&rdquo;
          </p>
        </div>

        {/* Podium Top 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-auto py-1">
          
          {/* 1. Best Overall (Gold) */}
          <div
            onClick={() => onSelectName(best_overall)}
            className="rounded-xl bg-gradient-to-b from-[#14234b] to-[#0a1228] border-2 border-[#dec477] p-2.5 shadow-lg flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-transform"
          >
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#dec477]/30">
                <div className="flex items-center gap-1 text-[9.5px] font-heading font-bold uppercase text-[#dec477]">
                  <Crown className="w-3.5 h-3.5 text-[#dec477]" />
                  <span>1 Best Overall</span>
                </div>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#dec477]/20 text-[#dec477] font-bold">TOP</span>
              </div>

              <div className="text-center my-1">
                <h4 className="text-lg sm:text-xl font-heading font-bold text-[#fbf8ee]">{best_overall.name}</h4>
                <div className="text-[9.5px] text-[#9ca3af] italic">Meaning: {best_overall.meaning}</div>
                <div className="text-[10px] font-semibold text-[#dec477] mt-0.5">
                  Chaldean Number: {best_overall.compound_number}/{best_overall.root_number}
                </div>
              </div>

              <div className="space-y-1 text-[9px] text-[#d1d5db] my-2">
                <div className="flex items-start gap-1">
                  <span className="text-[#dec477] mt-0.5">•</span>
                  <span>Strong numerological compatibility</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-[#dec477] mt-0.5">•</span>
                  <span>Harmonizes with birth and destiny numbers</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-[#dec477] mt-0.5">•</span>
                  <span>Simple, modern and timeless</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-[#dec477] mt-0.5">•</span>
                  <span>Widely accepted globally</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-[#dec477] mt-0.5">•</span>
                  <span>Positive and peaceful vibration</span>
                </div>
              </div>
            </div>

            <div className="pt-1.5 border-t border-[#dec477]/30 text-center">
              <span className="text-[10px] font-heading font-bold text-[#dec477]">
                Overall Score: {best_overall.score}/100
              </span>
            </div>
          </div>

          {/* 2. Strong Alternative (Silver/Blue) */}
          <div
            onClick={() => onSelectName(strong_alternative)}
            className="rounded-xl bg-gradient-to-b from-[#101b38] to-[#080e22] border border-[#8da4d0]/60 p-2.5 shadow-md flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-transform"
          >
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#8da4d0]/30">
                <div className="flex items-center gap-1 text-[9.5px] font-heading font-bold uppercase text-[#c4d6ff]">
                  <Shield className="w-3.5 h-3.5 text-[#8da4d0]" />
                  <span>Strong Alternative</span>
                </div>
              </div>

              <div className="text-center my-1">
                <h4 className="text-lg sm:text-xl font-heading font-bold text-[#fbf8ee]">{strong_alternative.name}</h4>
                <div className="text-[9.5px] text-[#9ca3af] italic">Meaning: {strong_alternative.meaning}</div>
                <div className="text-[10px] font-semibold text-[#8da4d0] mt-0.5">
                  Chaldean Number: {strong_alternative.compound_number}/{strong_alternative.root_number}
                </div>
              </div>

              <div className="space-y-1 text-[9px] text-[#d1d5db] my-2">
                <div className="flex items-start gap-1">
                  <span className="text-[#8da4d0] mt-0.5">•</span>
                  <span>Supportive of destiny number</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-[#8da4d0] mt-0.5">•</span>
                  <span>Beautiful and modern name</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-[#8da4d0] mt-0.5">•</span>
                  <span>Good balance of tradition and elegance</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-[#8da4d0] mt-0.5">•</span>
                  <span>Easy pronunciation worldwide</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-[#8da4d0] mt-0.5">•</span>
                  <span>Associated with discipline and stability</span>
                </div>
              </div>
            </div>

            <div className="pt-1.5 border-t border-[#8da4d0]/30 text-center">
              <span className="text-[10px] font-heading font-bold text-[#c4d6ff]">
                Overall Score: {strong_alternative.score}/100
              </span>
            </div>
          </div>

          {/* 3. Unique Alternative (Bronze/Copper) */}
          <div
            onClick={() => onSelectName(unique_alternative)}
            className="rounded-xl bg-gradient-to-b from-[#18182b] to-[#0a0a1a] border border-[#d48b55]/60 p-2.5 shadow-md flex flex-col justify-between cursor-pointer hover:scale-[1.01] transition-transform"
          >
            <div>
              <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#d48b55]/30">
                <div className="flex items-center gap-1 text-[9.5px] font-heading font-bold uppercase text-[#f3b080]">
                  <Gem className="w-3.5 h-3.5 text-[#d48b55]" />
                  <span>Unique Alternative</span>
                </div>
              </div>

              <div className="text-center my-1">
                <h4 className="text-lg sm:text-xl font-heading font-bold text-[#fbf8ee]">{unique_alternative.name}</h4>
                <div className="text-[9.5px] text-[#9ca3af] italic">Meaning: {unique_alternative.meaning}</div>
                <div className="text-[10px] font-semibold text-[#d48b55] mt-0.5">
                  Chaldean Number: {unique_alternative.compound_number}/{unique_alternative.root_number}
                </div>
              </div>

              <div className="space-y-1 text-[9px] text-[#d1d5db] my-2">
                <div className="flex items-start gap-1">
                  <span className="text-[#d48b55] mt-0.5">•</span>
                  <span>Deep spiritual and philosophical meaning</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-[#d48b55] mt-0.5">•</span>
                  <span>Strong intuitive and analytical vibration</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-[#d48b55] mt-0.5">•</span>
                  <span>Distinctive and uncommon</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-[#d48b55] mt-0.5">•</span>
                  <span>Suitable for modern and global use</span>
                </div>
                <div className="flex items-start gap-1">
                  <span className="text-[#d48b55] mt-0.5">•</span>
                  <span>Good for higher education and research</span>
                </div>
              </div>
            </div>

            <div className="pt-1.5 border-t border-[#d48b55]/30 text-center">
              <span className="text-[10px] font-heading font-bold text-[#f3b080]">
                Overall Score: {unique_alternative.score}/100
              </span>
            </div>
          </div>

        </div>

        {/* Category Winners Row */}
        <div className="rounded-xl bg-[#091126]/80 border border-[#c5a059]/30 p-2 my-1">
          <div className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#dec477] text-center mb-1.5">
            Category Winners
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-1.5 text-center text-[9.5px]">
            <div className="p-1.5 rounded-lg bg-[#0d1736]/70 border border-white/5">
              <span className="text-[8px] text-[#9ca3af] block leading-none">Most Traditional</span>
              <span className="font-bold text-[#fbf8ee] mt-1 block">
                {category_winners.traditional?.name || 'Dhruv'}
              </span>
            </div>

            <div className="p-1.5 rounded-lg bg-[#0d1736]/70 border border-white/5">
              <span className="text-[8px] text-[#9ca3af] block leading-none">Most Modern</span>
              <span className="font-bold text-[#fbf8ee] mt-1 block">
                {category_winners.modern?.name || 'Vivaan'}
              </span>
            </div>

            <div className="p-1.5 rounded-lg bg-[#0d1736]/70 border border-white/5">
              <span className="text-[8px] text-[#9ca3af] block leading-none">Most Unique</span>
              <span className="font-bold text-[#fbf8ee] mt-1 block">
                {category_winners.rare?.name || 'Advait'}
              </span>
            </div>

            <div className="p-1.5 rounded-lg bg-[#0d1736]/70 border border-white/5">
              <span className="text-[8px] text-[#9ca3af] block leading-none">Best International</span>
              <span className="font-bold text-[#fbf8ee] mt-1 block">
                {category_winners.international?.name || 'Ayaan'}
              </span>
            </div>

            <div className="p-1.5 rounded-lg bg-[#0d1736]/70 border border-white/5">
              <span className="text-[8px] text-[#9ca3af] block leading-none">Best Meaning</span>
              <span className="font-bold text-[#fbf8ee] mt-1 block">
                {category_winners.meaningful?.name || 'Reyansh'}
              </span>
            </div>

            <div className="p-1.5 rounded-lg bg-[#0d1736]/70 border border-white/5">
              <span className="text-[8px] text-[#9ca3af] block leading-none">Best Numerology Fit</span>
              <span className="font-bold text-[#dec477] mt-1 block">
                {best_overall.name}
              </span>
            </div>
          </div>
        </div>

        {/* Card 4 Bottom 3-Column Split: Parent Guidance, Our Recommendation, Disclaimer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 pt-1">
          
          {/* Left: Parent Guidance */}
          <div className="md:col-span-5 rounded-xl bg-[#091126]/80 border border-[#c5a059]/20 p-2">
            <div className="text-[9.5px] font-heading font-bold uppercase tracking-wider text-[#dec477] mb-1">
              Parent Guidance
            </div>
            <div className="space-y-0.5 text-[8.5px] text-[#d1d5db]">
              <div>• Choose a name that feels right for your heart.</div>
              <div>• Consider family traditions and cultural preferences.</div>
              <div>• Check pronunciation with friends and family.</div>
              <div>• Select a name that your child will be proud to carry.</div>
            </div>
          </div>

          {/* Center: Our Recommendation */}
          <div className="md:col-span-4 rounded-xl bg-gradient-to-b from-[#14234b] to-[#0a1228] border border-[#dec477]/40 p-2 text-center flex flex-col justify-center">
            <div className="flex items-center justify-center gap-1 text-[9.5px] font-heading font-bold uppercase tracking-wider text-[#dec477]">
              <Heart className="w-3 h-3 text-[#dec477]" />
              <span>Our Recommendation</span>
            </div>
            <div className="text-base font-heading font-bold text-[#fbf8ee] mt-0.5">
              {best_overall.name}
            </div>
            <p className="text-[8px] font-serif italic text-[#d4af37] mt-0.5 leading-tight">
              &ldquo;A name that brings peace, positivity and beautiful possibilities.&rdquo;
            </p>
          </div>

          {/* Right: Disclaimer */}
          <div className="md:col-span-3 rounded-xl bg-[#091126]/80 border border-[#c5a059]/20 p-2">
            <div className="flex items-center gap-1 text-[9.5px] font-heading font-bold uppercase tracking-wider text-[#9ca3af] mb-1">
              <Info className="w-3 h-3 text-[#9ca3af]" />
              <span>Disclaimer</span>
            </div>
            <p className="text-[7.5px] text-[#9ca3af] leading-tight">
              This report uses traditional Chaldean numerology and Vedic naming principles as a guidance tool. It is not a scientific method and does not guarantee specific future outcomes. The final decision rests with the parents.
            </p>
          </div>

        </div>

      </div>
    );
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top View Mode Switcher & Export Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-[#0b132b]/80 border border-[#c5a059]/25 backdrop-blur-md">
        
        {/* View Mode Navigation Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setViewMode('poster')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs rounded-xl whitespace-nowrap transition-all ${
              viewMode === 'poster'
                ? 'bg-gradient-to-r from-[#dec477] to-[#b59033] text-[#080d1a] font-bold shadow-md shadow-[#c5a059]/20'
                : 'bg-[#111a33]/80 text-[#dec477] border border-[#c5a059]/30 hover:bg-[#1c2541]'
            }`}
          >
            <Grid2X2 className="w-3.5 h-3.5" />
            <span>★ 4-Panel Master Poster (Like Image)</span>
          </button>

          <button
            onClick={() => setViewMode('card1')}
            className={`px-3 py-2 text-xs rounded-xl whitespace-nowrap transition-all ${
              viewMode === 'card1'
                ? 'bg-[#dec477]/20 text-[#fbf8ee] border border-[#dec477] font-semibold'
                : 'bg-[#111a33]/60 text-[#9ca3af] hover:text-[#fbf8ee] border border-white/5'
            }`}
          >
            Card 1: Profile
          </button>

          <button
            onClick={() => setViewMode('card2')}
            className={`px-3 py-2 text-xs rounded-xl whitespace-nowrap transition-all ${
              viewMode === 'card2'
                ? 'bg-[#dec477]/20 text-[#fbf8ee] border border-[#dec477] font-semibold'
                : 'bg-[#111a33]/60 text-[#9ca3af] hover:text-[#fbf8ee] border border-white/5'
            }`}
          >
            Card 2: Blueprint
          </button>

          <button
            onClick={() => setViewMode('card3')}
            className={`px-3 py-2 text-xs rounded-xl whitespace-nowrap transition-all ${
              viewMode === 'card3'
                ? 'bg-[#dec477]/20 text-[#fbf8ee] border border-[#dec477] font-semibold'
                : 'bg-[#111a33]/60 text-[#9ca3af] hover:text-[#fbf8ee] border border-white/5'
            }`}
          >
            Card 3: Top 10
          </button>

          <button
            onClick={() => setViewMode('card4')}
            className={`px-3 py-2 text-xs rounded-xl whitespace-nowrap transition-all ${
              viewMode === 'card4'
                ? 'bg-[#dec477]/20 text-[#fbf8ee] border border-[#dec477] font-semibold'
                : 'bg-[#111a33]/60 text-[#9ca3af] hover:text-[#fbf8ee] border border-white/5'
            }`}
          >
            Card 4: Top 3 &amp; Shortlist
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          {onDownloadPdf && (
            <button
              id="btn-cards-download-pdf"
              onClick={onDownloadPdf}
              disabled={isDownloadingPdf}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#dec477] via-[#c5a059] to-[#977227] text-[#080d1a] hover:brightness-110 shadow-md shadow-[#c5a059]/20 transition-all disabled:opacity-75 cursor-pointer whitespace-nowrap"
              title="Download official print-ready 4-panel luxury report as PDF"
            >
              {isDownloadingPdf ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#080d1a]" />
              ) : (
                <Download className="w-3.5 h-3.5 text-[#080d1a]" />
              )}
              <span>{isDownloadingPdf ? 'Preparing...' : 'DOWNLOAD PREMIUM REPORT'}</span>
            </button>
          )}

          <button
            onClick={handleCopyShareText}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#111a33] text-[#dec477] border border-[#c5a059]/30 hover:bg-[#1c2541] transition-all"
            title="Copy formatted summary for WhatsApp"
          >
            {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-[#dec477]" />}
            {copiedText ? 'Copied!' : 'Share'}
          </button>

          <button
            onClick={onSwitchToWrittenReport}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-[#dec477]/15 text-[#fbf8ee] border border-[#dec477]/40 hover:bg-[#dec477]/25 transition-all"
          >
            <span>Full Text</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#dec477]" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'poster' ? (
        /* 2x2 POSTER GRID (Pixel-accurate presentation of the user's reference image) */
        <div className="relative rounded-3xl p-3 sm:p-5 bg-[#050917] border-2 border-[#c5a059]/50 shadow-2xl shadow-black">
          {/* Subtle Outer Frame Inset Line */}
          <div className="absolute inset-1 rounded-2xl border border-[#c5a059]/20 pointer-events-none" />

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 relative z-10">
            {renderCard1(false)}
            {renderCard2(false)}
            {renderCard3(false)}
            {renderCard4(false)}
          </div>
        </div>
      ) : (
        /* SINGLE CARD FOCUSED VIEW */
        <div className="relative">
          {viewMode === 'card1' && renderCard1(true)}
          {viewMode === 'card2' && renderCard2(true)}
          {viewMode === 'card3' && renderCard3(true)}
          {viewMode === 'card4' && renderCard4(true)}
        </div>
      )}

      {/* Quick Action Footer */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#111a33] via-[#0b132b] to-[#111a33] border border-[#c5a059]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="space-y-0.5">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold uppercase tracking-wider text-[#dec477]">
            <Sparkles className="w-3.5 h-3.5 text-[#dec477]" />
            Complete Archival Baby Name Dossier
          </div>
          <p className="text-[11px] text-[#9ca3af]">
            Export the complete high-resolution 4-quadrant report as a shareable PDF dossier or print directly.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onDownloadPdf && (
            <button
              onClick={onDownloadPdf}
              disabled={isDownloadingPdf}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-heading font-extrabold uppercase tracking-wider bg-gradient-to-r from-[#dec477] via-[#c5a059] to-[#977227] text-[#080d1a] hover:brightness-110 shadow-lg shadow-[#c5a059]/20 transition-all disabled:opacity-75 cursor-pointer whitespace-nowrap"
            >
              {isDownloadingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#080d1a]" />
                  <span>Preparing Report...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#080d1a]" />
                  <span>DOWNLOAD PREMIUM REPORT</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={onSwitchToWrittenReport}
            className="px-3.5 py-2 rounded-xl text-xs font-medium bg-[#1c2541]/70 text-[#fbf8ee] border border-white/10 hover:bg-[#1c2541] transition-all whitespace-nowrap"
          >
            View Text Report
          </button>
        </div>
      </div>

    </div>
  );
};
