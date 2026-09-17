import React, { useState } from 'react';
import {
  Search,
  Filter,
  Sparkles,
  Calculator,
  Crown,
  Heart,
  Globe,
  Award,
  BookOpen,
  ArrowUpDown
} from 'lucide-react';
import { NameAnalysis, NumerologyBlueprint } from '../types';

interface NameExplorerProps {
  names: NameAnalysis[];
  blueprint: NumerologyBlueprint;
  onSelectName: (name: NameAnalysis) => void;
  onTestName: (name: string) => void;
}

export const NameExplorer: React.FC<NameExplorerProps> = ({
  names,
  blueprint,
  onSelectName,
  onTestName
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedRoot, setSelectedRoot] = useState<string>('all');
  const [selectedCompat, setSelectedCompat] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'name' | 'compound'>('score');

  // Filter logic
  const filtered = names.filter(item => {
    // Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchMeaning = item.meaning.toLowerCase().includes(q);
      if (!matchName && !matchMeaning) return false;
    }

    // Gender
    if (selectedGender !== 'all' && item.gender !== selectedGender) {
      return false;
    }

    // Style tag
    if (selectedStyle !== 'all' && !item.style_tags.includes(selectedStyle)) {
      return false;
    }

    // Root Number
    if (selectedRoot !== 'all' && item.root_number !== parseInt(selectedRoot, 10)) {
      return false;
    }

    // Compatibility
    if (selectedCompat !== 'all' && item.compatibility !== selectedCompat) {
      return false;
    }

    return true;
  });

  // Sort logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'compound') return a.compound_number - b.compound_number;
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0e1738] via-[#0b132b] to-[#111a33] border border-[#c5a059]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-[#fbf8ee]">
            Authentic Baby Name Library
          </h1>
          <p className="text-xs text-[#9ca3af] mt-1">
            Browse {names.length} verified candidate names, filtered and scored against the baby&apos;s natal blueprint
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#dec477] bg-[#111a33] px-3 py-1.5 rounded-xl border border-[#c5a059]/30">
            {sorted.length} Names Found
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-5 rounded-2xl bg-[#0b132b] border border-[#c5a059]/20 space-y-4">
        
        {/* Search input & Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, meaning, or origin (e.g. Aarav, Unique, Sun)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#111a33] border border-white/10 rounded-xl text-[#fbf8ee] placeholder-gray-500 focus:border-[#c5a059] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2 text-xs bg-[#111a33] border border-white/10 rounded-xl text-[#fbf8ee] focus:border-[#c5a059] focus:outline-none"
            >
              <option value="score">Highest Score (0-100)</option>
              <option value="name">Alphabetical (A-Z)</option>
              <option value="compound">Compound Number</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/5 text-xs">
          
          {/* Gender Filter */}
          <div className="flex items-center gap-1">
            <span className="text-gray-400 mr-1">Gender:</span>
            {['all', 'boy', 'girl'].map(g => (
              <button
                key={g}
                onClick={() => setSelectedGender(g)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                  selectedGender === g
                    ? 'bg-[#dec477] text-[#080d1a] font-bold'
                    : 'bg-[#111a33] text-gray-300 hover:text-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Style Filter */}
          <div className="flex items-center gap-1">
            <span className="text-gray-400 mr-1">Style:</span>
            {['all', 'Modern', 'Traditional', 'Royal', 'Rare', 'International'].map(s => (
              <button
                key={s}
                onClick={() => setSelectedStyle(s)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedStyle === s
                    ? 'bg-[#dec477] text-[#080d1a] font-bold'
                    : 'bg-[#111a33] text-gray-300 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Compatibility Filter */}
          <div className="flex items-center gap-1">
            <span className="text-gray-400 mr-1">Harmony:</span>
            {['all', 'Highly Compatible', 'Supportive'].map(c => (
              <button
                key={c}
                onClick={() => setSelectedCompat(c)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedCompat === c
                    ? 'bg-[#dec477] text-[#080d1a] font-bold'
                    : 'bg-[#111a33] text-gray-300 hover:text-white'
                }`}
              >
                {c === 'all' ? 'All' : c.replace(' Compatible', '')}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Names Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map(item => (
          <div
            key={item.name}
            onClick={() => onSelectName(item)}
            className="p-5 rounded-2xl bg-[#0b132b] border border-white/10 hover:border-[#dec477]/50 hover:bg-[#111c3a] transition-all flex flex-col justify-between shadow-lg cursor-pointer group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-xl font-heading font-bold text-[#fbf8ee] group-hover:text-[#dec477] transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-[11px] text-[#9ca3af] font-serif italic">{item.origin}</span>
                </div>

                <div className="text-right">
                  <div className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#dec477]/15 text-[#dec477] border border-[#dec477]/30">
                    {item.compound_number}/{item.root_number}
                  </div>
                  <span className="text-xs font-bold text-[#dec477] block mt-1">
                    {item.score}<span className="text-[9px] text-gray-400">/100</span>
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#cbd5e1] line-clamp-2 leading-relaxed mb-3">
                {item.meaning}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {item.style_tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[9px] bg-[#16223f] text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                item.compatibility === 'Highly Compatible'
                  ? 'text-emerald-300 bg-emerald-950/40'
                  : 'text-blue-300 bg-blue-950/40'
              }`}>
                {item.compatibility}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onTestName(item.name);
                }}
                className="text-[#dec477] hover:underline flex items-center gap-1 text-[11px] font-semibold"
              >
                <Calculator className="w-3 h-3" /> Calculate
              </button>
            </div>
          </div>
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="p-12 text-center rounded-2xl bg-[#0b132b] border border-white/10 text-gray-400 space-y-2">
          <p className="text-base font-semibold text-white">No names match your active filter criteria.</p>
          <p className="text-xs">Try clearing the search box or broadening the gender and style filters.</p>
        </div>
      )}

    </div>
  );
};
