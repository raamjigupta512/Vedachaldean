import React, { useState } from 'react';
import { X, Sparkles, Calendar, Clock, MapPin, Bookmark, Check, ShieldAlert, Heart } from 'lucide-react';
import { BabyInputData } from '../types';

interface BabyInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentInput?: BabyInputData;
  initialData?: BabyInputData;
  onSave?: (data: BabyInputData) => void;
  onSubmit?: (data: BabyInputData) => void;
}

export const PRESET_PROFILES: { id: string; label: string; desc: string; data: BabyInputData }[] = [
  {
    id: 'preset-1',
    label: 'Baby Boy Sharma (15 Aug 2026)',
    desc: 'Day 15 (Root 6 / Venus), Destiny 24/6, Mumbai',
    data: {
      baby_name: 'Sharma Baby',
      gender: 'boy',
      date_of_birth: '2026-08-15',
      time_of_birth: '09:30',
      place_of_birth: 'Mumbai, India',
      family_surname: 'Sharma',
      naming_style: 'balanced',
      cultural_style: 'Sanskrit',
      preferred_initial: '',
      preferred_names: ['Aarav', 'Advik'],
      names_to_avoid: [],
      religious_or_spiritual_preference: 'Vedic / Universal',
      language_preference: 'Sanskrit / English'
    }
  },
  {
    id: 'preset-2',
    label: 'Baby Girl Patel (24 Oct 2026)',
    desc: 'Day 24 (Root 6 / Venus), Destiny 26/8, London',
    data: {
      baby_name: 'Patel Baby',
      gender: 'girl',
      date_of_birth: '2026-10-24',
      time_of_birth: '14:15',
      place_of_birth: 'London, United Kingdom',
      family_surname: 'Patel',
      naming_style: 'modern',
      cultural_style: 'Contemporary Sanskrit',
      preferred_initial: 'A',
      preferred_names: ['Aanya', 'Diya', 'Anvi'],
      names_to_avoid: [],
      religious_or_spiritual_preference: 'Lakshmi / Prosperity',
      language_preference: 'Gujarati / English'
    }
  },
  {
    id: 'preset-3',
    label: 'Baby Boy Iyer (03 Dec 2026)',
    desc: 'Day 3 (Root 3 / Jupiter), Destiny 16/7, Bengaluru',
    data: {
      baby_name: 'Iyer Baby',
      gender: 'boy',
      date_of_birth: '2026-12-03',
      time_of_birth: '23:45',
      place_of_birth: 'Bengaluru, India',
      family_surname: 'Iyer',
      naming_style: 'traditional',
      cultural_style: 'Vedic',
      preferred_initial: '',
      preferred_names: ['Agastya', 'Pranav', 'Samarth'],
      names_to_avoid: [],
      religious_or_spiritual_preference: 'Shiva / Wisdom',
      language_preference: 'Sanskrit / Tamil'
    }
  },
  {
    id: 'preset-4',
    label: 'Baby Girl Kapoor (09 Jan 2027)',
    desc: 'Day 9 (Root 9 / Mars), Destiny 12/3, New York',
    data: {
      baby_name: 'Kapoor Baby',
      gender: 'girl',
      date_of_birth: '2027-01-09',
      time_of_birth: '07:10',
      place_of_birth: 'New York, USA',
      family_surname: 'Kapoor',
      naming_style: 'international',
      cultural_style: 'Modern Indian',
      preferred_initial: 'S',
      preferred_names: ['Sia', 'Samaira', 'Myra'],
      names_to_avoid: [],
      religious_or_spiritual_preference: 'Universal Grace',
      language_preference: 'Hindi / English'
    }
  }
];

export const BabyInputModal: React.FC<BabyInputModalProps> = ({
  isOpen,
  onClose,
  currentInput,
  initialData,
  onSave,
  onSubmit
}) => {
  const activeInput = currentInput || initialData || PRESET_PROFILES[0].data;
  const [formData, setFormData] = useState<BabyInputData>(activeInput);
  const [preferredNameInput, setPreferredNameInput] = useState('');
  const [avoidNameInput, setAvoidNameInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setFormData(currentInput || initialData || PRESET_PROFILES[0].data);
      setErrorMsg('');
    }
  }, [isOpen, currentInput, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !formData.date_of_birth) {
      setErrorMsg('Please select a valid Date of Birth.');
      return;
    }
    setErrorMsg('');
    const saveFn = onSave || onSubmit;
    if (saveFn) {
      saveFn(formData);
    }
    onClose();
  };

  const addPreferredName = () => {
    if (preferredNameInput.trim()) {
      const names = formData.preferred_names || [];
      if (!names.includes(preferredNameInput.trim())) {
        setFormData({ ...formData, preferred_names: [...names, preferredNameInput.trim()] });
      }
      setPreferredNameInput('');
    }
  };

  const removePreferredName = (index: number) => {
    const names = [...(formData.preferred_names || [])];
    names.splice(index, 1);
    setFormData({ ...formData, preferred_names: names });
  };

  const addAvoidName = () => {
    if (avoidNameInput.trim()) {
      const names = formData.names_to_avoid || [];
      if (!names.includes(avoidNameInput.trim())) {
        setFormData({ ...formData, names_to_avoid: [...names, avoidNameInput.trim()] });
      }
      setAvoidNameInput('');
    }
  };

  const removeAvoidName = (index: number) => {
    const names = [...(formData.names_to_avoid || [])];
    names.splice(index, 1);
    setFormData({ ...formData, names_to_avoid: names });
  };

  const loadPreset = (preset: typeof PRESET_PROFILES[0]) => {
    setFormData({ ...preset.data });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0b132b] border border-[#c5a059]/40 rounded-2xl shadow-2xl shadow-black/80 my-8 overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#c5a059]/20 bg-gradient-to-r from-[#0d1838] to-[#111f44]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#c5a059]/15 border border-[#c5a059]/30">
              <Sparkles className="w-5 h-5 text-[#dec477]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-heading font-semibold text-[#fbf8ee]">
                Baby Birth & Preference Details
              </h2>
              <p className="text-xs text-[#9ca3af]">
                Traditional Chaldean Numerology & Vedic Astrological Intake Form
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#9ca3af] hover:text-[#fbf8ee] hover:bg-[#1c2541] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div className="px-6 py-3 bg-[#080d1a]/80 border-b border-[#c5a059]/10">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-semibold text-[#dec477] tracking-wider uppercase flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5" /> Quick Case Studies:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_PROFILES.map(preset => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => loadPreset(preset)}
                  className="px-2.5 py-1 text-[11px] rounded-md bg-[#16223f] text-[#fbf8ee] border border-[#c5a059]/20 hover:border-[#c5a059]/50 hover:bg-[#1c2a4f] transition-all"
                >
                  {preset.label.split('(')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-900/30 border border-red-500/40 text-red-200 text-xs">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Section: Core Birth Details */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#dec477] mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> 1. Essential Birth Details (Required for Numerology)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#d1d5db] mb-1.5">
                  Gender <span className="text-[#dec477]">*</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['boy', 'girl', 'unisex'] as const).map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={`py-2 text-xs font-medium rounded-lg border capitalize transition-all ${
                        formData.gender === g
                          ? 'bg-[#c5a059]/25 border-[#c5a059] text-[#fbf8ee] shadow-sm'
                          : 'bg-[#111a33] border-white/10 text-[#9ca3af] hover:text-[#fbf8ee]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#d1d5db] mb-1.5">
                  Date of Birth <span className="text-[#dec477]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.date_of_birth}
                  onChange={e => setFormData({ ...formData, date_of_birth: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#111a33] border border-white/10 rounded-lg text-[#fbf8ee] focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#d1d5db] mb-1.5">
                  Family Surname
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sharma, Patel, Kapoor"
                  value={formData.family_surname || ''}
                  onChange={e => setFormData({ ...formData, family_surname: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#111a33] border border-white/10 rounded-lg text-[#fbf8ee] placeholder-gray-500 focus:border-[#c5a059] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Astrological Context */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#dec477] mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" /> 2. Vedic Astrological Details (For Nakshatra &amp; Pada)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#d1d5db] mb-1.5">
                  Time of Birth (Exact or Approximate)
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={formData.time_of_birth || ''}
                    onChange={e => setFormData({ ...formData, time_of_birth: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#111a33] border border-white/10 rounded-lg text-[#fbf8ee] focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
                <p className="text-[10px] text-[#9ca3af] mt-1">
                  Enables precise Moon Nakshatra &amp; Pada starting sound calculation.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#d1d5db] mb-1.5">
                  Place of Birth (City, Country)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Mumbai, India or London, UK"
                    value={formData.place_of_birth || ''}
                    onChange={e => setFormData({ ...formData, place_of_birth: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-[#111a33] border border-white/10 rounded-lg text-[#fbf8ee] placeholder-gray-500 focus:border-[#c5a059] focus:outline-none"
                  />
                </div>
                <p className="text-[10px] text-[#9ca3af] mt-1">
                  Used for astronomical lunar coordinates and local planetary positions.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Naming Aesthetics & Preferences */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-widest text-[#dec477] mb-3 flex items-center gap-2">
              <Heart className="w-4 h-4" /> 3. Parents&apos; Naming Style &amp; Cultural Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#d1d5db] mb-1.5">
                  Naming Style
                </label>
                <select
                  value={formData.naming_style || 'balanced'}
                  onChange={e => setFormData({ ...formData, naming_style: e.target.value as any })}
                  className="w-full px-3 py-2 text-xs bg-[#111a33] border border-white/10 rounded-lg text-[#fbf8ee] focus:border-[#c5a059] focus:outline-none"
                >
                  <option value="balanced">Balanced (Tradition &amp; Modernity)</option>
                  <option value="modern">Modern &amp; Minimalist</option>
                  <option value="traditional">Traditional Sanskrit / Vedic</option>
                  <option value="royal">Royal &amp; Majestic</option>
                  <option value="rare">Rare &amp; Unique</option>
                  <option value="international">Global / International Friendly</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#d1d5db] mb-1.5">
                  Preferred First Letter (Optional)
                </label>
                <input
                  type="text"
                  maxLength={2}
                  placeholder="e.g. A, V, S, K"
                  value={formData.preferred_initial || ''}
                  onChange={e => setFormData({ ...formData, preferred_initial: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 text-xs bg-[#111a33] border border-white/10 rounded-lg text-[#fbf8ee] placeholder-gray-500 uppercase focus:border-[#c5a059] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#d1d5db] mb-1.5">
                  Cultural / Spiritual Tradition
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sanskrit, Vedic, Universal"
                  value={formData.cultural_style || ''}
                  onChange={e => setFormData({ ...formData, cultural_style: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#111a33] border border-white/10 rounded-lg text-[#fbf8ee] placeholder-gray-500 focus:border-[#c5a059] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section: Favorite Names & Avoid List */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#d1d5db] mb-1.5">
                  Parents&apos; Existing Favorite Names
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Type name &amp; press Add"
                    value={preferredNameInput}
                    onChange={e => setPreferredNameInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addPreferredName(); } }}
                    className="flex-1 px-3 py-1.5 text-xs bg-[#111a33] border border-white/10 rounded-lg text-[#fbf8ee] focus:border-[#c5a059] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addPreferredName}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#c5a059]/20 text-[#dec477] border border-[#c5a059]/40 hover:bg-[#c5a059]/30"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                  {(formData.preferred_names || []).map((name, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-[#dec477]/10 text-[#fbf8ee] border border-[#dec477]/30"
                    >
                      {name}
                      <button
                        type="button"
                        onClick={() => removePreferredName(i)}
                        className="text-gray-400 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#d1d5db] mb-1.5">
                  Names or Sounds to Avoid
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="e.g. Overused names"
                    value={avoidNameInput}
                    onChange={e => setAvoidNameInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addAvoidName(); } }}
                    className="flex-1 px-3 py-1.5 text-xs bg-[#111a33] border border-white/10 rounded-lg text-[#fbf8ee] focus:border-[#c5a059] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addAvoidName}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#111a33] text-gray-300 border border-white/10 hover:border-white/30"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[28px]">
                  {(formData.names_to_avoid || []).map((name, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-red-900/20 text-red-200 border border-red-500/30"
                    >
                      {name}
                      <button
                        type="button"
                        onClick={() => removeAvoidName(i)}
                        className="text-red-300 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#c5a059]/20 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium rounded-lg bg-[#111a33] text-[#9ca3af] hover:text-[#fbf8ee] border border-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-[#dec477] via-[#b59033] to-[#977227] text-[#080d1a] shadow-lg shadow-[#c5a059]/20 hover:brightness-110 transition-all"
            >
              <Check className="w-4 h-4" />
              Generate Consultation Report
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
