import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  User,
  Bot,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { BabyInputData, NumerologyBlueprint, VedicProfile } from '../types';
import { PLANETARY_RULERS } from '../utils/chaldean';

interface ConsultationAssistantProps {
  blueprint: NumerologyBlueprint;
  input: BabyInputData;
  vedic: VedicProfile;
  onSelectCandidateName: (name: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const ConsultationAssistant: React.FC<ConsultationAssistantProps> = ({
  blueprint,
  input,
  vedic,
  onSelectCandidateName
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Namaste! I am your Senior Chaldean & Vedic Baby Naming Consultant. I have analyzed your baby's natal blueprint: Birth Number ${blueprint.birth_number} (${blueprint.birth_planet}) and Destiny Number ${blueprint.destiny_compound}/${blueprint.destiny_number} (${blueprint.destiny_planet}). You may ask me any question about compound numbers, spelling adjustments, surname combinations, or Vedic Nakshatra trade-offs.`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sampleQuestions = [
    `Why is compound 24/6 or 14/5 so favorable for our baby?`,
    `How does our surname ${input.family_surname || 'Sharma'} influence the total vibration?`,
    `Why is Chaldean numerology preferred over Pythagorean for baby naming?`,
    `What if the Nakshatra starting sound conflicts with the best Chaldean number?`,
    `Is modifying spelling (e.g., adding an extra vowel) recommended?`
  ];

  const handleSend = (textToSend?: string) => {
    const question = (textToSend || inputText).trim();
    if (!question) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let answer = '';
      const qLower = question.toLowerCase();

      if (qLower.includes('24') || qLower.includes('14') || qLower.includes('compound')) {
        answer = `In classical Chaldean numerology, the compound numbers 14 and 24 are regarded as jewels:
• Compound 14 (Mercury) is known as the vibration of "Magnetic Adaptation & Commerce"—it imparts swift mental agility, multilingual ease, and social resilience.
• Compound 24 (Venus) represents "Love & Fortunate Association"—it brings harmonious partnerships, artistic appreciation, and domestic happiness.
For a baby with Birth Number ${blueprint.birth_number} and Destiny Number ${blueprint.destiny_number}, these compound totals provide high stability without the volatile trial periods associated with compound 12 or 16.`;
      } else if (qLower.includes('surname') || qLower.includes('full name')) {
        answer = `In traditional Chaldean consultation, we examine two primary frequencies:
1. The First Name Alone: This is the child's active daily acoustic vibration, invoked by family, friends, teachers, and colleagues. It directly shapes their personality and confidence.
2. First Name + Surname: This represents the legal and societal vibration used on passports, degrees, and corporate contracts.
If the first name alone has a pristine compound (like 14, 19, 21, or 24), it establishes a strong personal core. The addition of the family surname should ideally create a supportive root (such as 1, 3, 5, or 6), which ensures smooth professional transactions.`;
      } else if (qLower.includes('pythagorean') || qLower.includes('difference')) {
        answer = `This is one of the most critical questions in naming science!
• Pythagorean Numerology is an artificial Western system that assigns letters sequentially from 1 to 9 (A=1, B=2, ... I=9, J=1). It ignores the acoustic and vibrational frequency of ancient alphabets.
• Traditional Chaldean Numerology originated in ancient Babylon and was preserved through Vedic and Semitic scholars. It assigns numerical values (1–8 only) based on the exact sound vibration and planetary ray of each consonant and vowel. The sacred number 9 is never assigned to common letters.
That is why professional Indian naming consultants strictly use the Chaldean system—it reflects the child's genuine sonic resonance.`;
      } else if (qLower.includes('conflict') || qLower.includes('nakshatra') || qLower.includes('sound')) {
        answer = `When a parent encounters a trade-off between the Vedic Nakshatra sound and the Chaldean compound number:
Priority Hierarchy:
1. The Chaldean compound number must never be a cautionary vibration (such as 16, 18, 26, or 28), because a child cannot change their name's mathematical frequency once registered.
2. If an authentic Sanskrit name satisfies both the Nakshatra sound AND an auspicious Chaldean compound (e.g. 14, 19, 24), that is the ideal crown jewel!
3. If an exact phonetic match is unavailable, we choose an auspicious Chaldean name whose first letter is ruled by a planet friendly to the Moon Nakshatra lord (${vedic.planetary_lord || 'auspicious planet'}).`;
      } else if (qLower.includes('spelling') || qLower.includes('extra') || qLower.includes('modify')) {
        answer = `As an ethical Chaldean specialist, my policy is: Never sacrifice authentic linguistic pronunciation purely for numerological manipulation.
If an alternate spelling has verified linguistic precedent (such as 'I' vs 'EE', or 'U' vs 'OO'), that is acceptable. However, unnatural spellings (such as adding awkward double consonants like 'Aarravv' or 'Vihaann') create lifelong administrative confusion on passports, visas, and school records. It is always superior to pick a naturally auspicious Sanskrit name than to disfigure an incompatible one.`;
      } else {
        answer = `Based on your baby's natal blueprint (Birth Number ${blueprint.birth_number} and Destiny Number ${blueprint.destiny_compound}/${blueprint.destiny_number}):
We recommend selecting candidate names that yield roots ${blueprint.preferred_name_numbers.join(', ')} or ${blueprint.supportive_numbers.slice(0, 2).join(', ')}. These numbers establish a serene, uplifting energetic bridge. If you have a specific custom name in mind, feel free to enter it into our Name Calculator tab to view the letter-by-letter assignment!`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: answer,
        timestamp: 'Just now'
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0e1738] via-[#0b132b] to-[#111a33] border border-[#c5a059]/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#c5a059] to-[#977227] p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#0b132b] rounded-2xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-[#dec477]" />
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-heading font-bold text-[#fbf8ee]">
              Ask the Master Chaldean Numerologist
            </h1>
            <p className="text-xs text-[#9ca3af]">
              Interactive Expert Consultation for In-Depth Astrological &amp; Harmonic Guidance
            </p>
          </div>
        </div>

        <div className="hidden sm:block text-right text-xs">
          <span className="text-[#9ca3af] block">Consultation Status</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1 justify-end">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active Session
          </span>
        </div>
      </div>

      {/* Suggested Consultation Topics */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-[#dec477] uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5" /> Frequently Consulted Dilemmas:
        </span>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              className="text-left px-3 py-1.5 rounded-xl text-xs bg-[#111a33] text-[#d1d5db] border border-white/10 hover:border-[#c5a059]/40 hover:bg-[#16223f] transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Transcript Stage */}
      <div className="p-6 rounded-3xl bg-[#0b132b] border border-[#c5a059]/20 space-y-4 min-h-[420px] max-h-[580px] overflow-y-auto">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-[#dec477]/15 border border-[#dec477]/30 flex items-center justify-center shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-[#dec477]" />
              </div>
            )}

            <div
              className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#dec477] to-[#b59033] text-[#080d1a] font-medium shadow-md'
                  : 'bg-[#111a33] text-[#fbf8ee] border border-white/10 shadow-inner'
              }`}
            >
              {msg.text}
              <div
                className={`text-[10px] mt-1.5 text-right ${
                  msg.sender === 'user' ? 'text-black/60' : 'text-[#9ca3af]'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#9ca3af] italic">
            <Sparkles className="w-3.5 h-3.5 text-[#dec477] animate-spin" />
            Acharya is analyzing the ancient Chaldean tables...
          </div>
        )}
      </div>

      {/* Message Input Box */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask a question (e.g. 'Can you explain compound 19?', 'Is Vihaan suitable?')..."
          className="flex-1 px-4 py-3 text-xs sm:text-sm bg-[#0b132b] border border-[#c5a059]/30 rounded-2xl text-[#fbf8ee] placeholder-gray-500 focus:border-[#c5a059] focus:outline-none"
        />
        <button
          onClick={() => handleSend()}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#dec477] to-[#b59033] text-[#080d1a] font-bold text-xs sm:text-sm shadow-md hover:brightness-110 flex items-center gap-1.5"
        >
          <Send className="w-4 h-4" />
          <span>Ask</span>
        </button>
      </div>

    </div>
  );
};
