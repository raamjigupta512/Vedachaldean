import React from 'react';
import {
  X,
  Sparkles,
  Calculator,
  ShieldCheck,
  Award,
  CheckCircle,
  Clock,
  BookOpen,
  Share2
} from 'lucide-react';
import { NameAnalysis, NumerologyBlueprint } from '../types';
import { PLANETARY_RULERS } from '../utils/chaldean';

interface NameDetailModalProps {
  name: NameAnalysis | null;
  blueprint: NumerologyBlueprint;
  onClose: () => void;
  onTestWithSurname: (name: string) => void;
}

export const NameDetailModal: React.FC<NameDetailModalProps> = ({
  name,
  blueprint,
  onClose,
  onTestWithSurname
}) => {
  if (!name) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl my-8 rounded-3xl bg-gradient-to-b from-[#0e1738] via-[#0b132b] to-[#070c1b] border-2 border-[#c5a059]/60 shadow-2xl p-6 sm:p-8 space-y-6 text-[#fbf8ee]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#111a33] text-[#9ca3af] hover:text-white border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#c5a059]/20 text-[#dec477] border border-[#c5a059]/40">
              {name.gender} Name • {name.origin}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
              name.compatibility === 'Highly Compatible'
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-blue-500/20 text-blue-300'
            }`}>
              {name.compatibility}
            </span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#fbf8ee] tracking-wide">
              {name.name}
            </h2>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-[#dec477]">{name.score}</span>
              <span className="text-xs text-[#9ca3af]">/100</span>
            </div>
          </div>

          <p className="text-sm font-serif italic text-[#d1d5db]">
            &ldquo;{name.meaning}&rdquo;
          </p>
        </div>

        {/* Letter by Letter Breakdown */}
        <div className="p-4 rounded-2xl bg-[#091124] border border-[#c5a059]/30 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#dec477] block">
            Chaldean Letter-by-Letter Acoustic Matrix:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {name.letter_calculation.map((lc, idx) => (
              <div
                key={idx}
                className="w-10 h-12 rounded-lg bg-[#111a33] border border-white/10 flex flex-col items-center justify-center"
              >
                <span className="font-heading font-bold text-sm text-[#fbf8ee]">{lc.letter}</span>
                <span className="text-[11px] font-mono text-[#dec477]">{lc.value}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 text-xs text-[#cbd5e1] font-mono">
            Sum: {name.letter_calculation.map(l => l.value).join(' + ')} = <strong className="text-[#dec477]">{name.compound_number}</strong> → Root <strong className="text-white">{name.root_number}</strong> ({PLANETARY_RULERS[name.root_number]?.name})
          </div>
        </div>

        {/* Compound & Planetary Insights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#111a33] border border-white/5 space-y-1">
            <span className="text-[#9ca3af] block uppercase text-[10px]">Compound Number {name.compound_number}</span>
            <p className="text-[#fbf8ee] font-semibold leading-snug">
              {name.compound_significance}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#111a33] border border-white/5 space-y-1">
            <span className="text-[#9ca3af] block uppercase text-[10px]">Phonetic Cadence</span>
            <p className="text-[#fbf8ee] font-semibold">
              {name.pronunciation_guide} ({name.syllable_count} Syllables)
            </p>
            <span className="text-[10px] text-[#9ca3af]">Vedic Match: {name.nakshatra_compatibility}</span>
          </div>
        </div>

        {/* 100-Point Model Breakdown */}
        <div className="p-4 rounded-2xl bg-[#111a33]/60 border border-white/10 space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#dec477] block">
            100-Point Consultation Scoring Pillar Breakdown:
          </span>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Chaldean Compatibility (Max 40)</span>
              <span className="font-mono font-bold text-[#dec477]">{name.breakdown_scores.chaldean} / 40</span>
            </div>
            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"
                style={{ width: `${(name.breakdown_scores.chaldean / 40) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-gray-300">Meaning &amp; Significance (Max 20)</span>
              <span className="font-mono font-bold text-[#dec477]">{name.breakdown_scores.meaning} / 20</span>
            </div>
            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"
                style={{ width: `${(name.breakdown_scores.meaning / 20) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-gray-300">Vedic Nakshatra Harmony (Max 15)</span>
              <span className="font-mono font-bold text-[#dec477]">{name.breakdown_scores.vedic} / 15</span>
            </div>
            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 rounded-full"
                style={{ width: `${(name.breakdown_scores.vedic / 15) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={() => {
              onClose();
              onTestWithSurname(name.name);
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#111a33] text-[#dec477] border border-[#c5a059]/40 hover:bg-[#1c2954] flex items-center justify-center gap-1.5"
          >
            <Calculator className="w-4 h-4" /> Calculate with Surname
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#dec477] to-[#b59033] text-[#080d1a] hover:brightness-110"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
