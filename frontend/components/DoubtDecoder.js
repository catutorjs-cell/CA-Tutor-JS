'use client';

import { useState, useRef, useEffect } from 'react';

export default function DoubtDecoder({ currentUser }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'AI',
      text: 'Hello! I am your academic CA JS AI Tutor. Ask me anything on direct tax, partnership accounts, or GST supply values. I will cross-reference our syllabus guidelines to yield exact section entries.'
    }
  ]);
  const [query, setQuery] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Append user message
    const userMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    const currentQuery = query.toLowerCase();
    setQuery('');

    // Simulated cross-referencing and streamed response
    setTimeout(() => {
      let reference = "Syllabus General Guidelines";
      let answer = "I've cross-referenced your query. Make sure your mock paper layouts match standard ICAI scoring designs.";

      if (currentQuery.includes('goodwill') || currentQuery.includes('partnership')) {
        reference = "Partnership Valuation (Module 1 - Page 14)";
        answer = "Average profit Goodwill represents: Average Profits * Years Purchase. Premium goodwill division sacrificed during admission of new partners is recorded in capital adjustments.";
      } else if (currentQuery.includes('capital') || currentQuery.includes('gain')) {
        reference = "Direct Tax Capital Gains (Module 1 - Page 45)";
        answer = "Transfer triggers capital gains (Sec 45). Immovable property LTG rates are capped at flat 20% with indexation cost adjustments.";
      } else if (currentQuery.includes('gst') || currentQuery.includes('supply')) {
        reference = "GST Supply valuation (Module 1 - Page 88)";
        answer = "Section 15 CGST Act outlines transactions supplies valuation. It includes ancillary commissions and commissions while subtracting discounts recorded in invoices.";
      }

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'AI',
        reference,
        text: answer
      }]);

      if (currentUser) currentUser.points += 5; // Reward doubt asking!
    }, 700);
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-700 mb-1">AI Doubt Decoder Hub</h3>
      <p className="text-xs text-slate-400 mb-6">Cross-reference queries against loaded materials and stream explanations instantly</p>

      <div className="border border-slate-150 rounded-2xl overflow-hidden bg-white/50 flex flex-col h-[400px]">
        
        {/* Chat header */}
        <div className="p-4 bg-[#e3effd]/40 border-b border-slate-150 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#3a82e9] animate-pulse"></div>
          <span className="text-xs font-bold text-slate-700">CA JS Academic AI Tutor</span>
        </div>

        {/* Chat screens */}
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div 
                key={m.id} 
                className={`flex gap-2.5 items-start ${isUser ? 'justify-end' : ''}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-[#e3effd] text-[#3a82e9] font-bold flex items-center justify-center text-xs shrink-0">
                    AI
                  </div>
                )}
                
                <div className={`p-3 rounded-2xl border max-w-[80%] ${isUser ? 'bg-[#e3effd]/30 border-slate-150 text-right' : 'bg-white/80 border-slate-100'}`}>
                  {m.reference && (
                    <span className="text-[9px] uppercase font-bold text-[#3a82e9] block mb-1">
                      🔗 Reference: {m.reference}
                    </span>
                  )}
                  <p className="text-xs leading-relaxed text-slate-600">{m.text}</p>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl bg-[#e3effd] text-[#3a82e9] font-bold flex items-center justify-center text-xs shrink-0 font-mono">
                    US
                  </div>
                )}
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-slate-50 border-t border-slate-100 flex gap-2">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. How is supply valued in GST?" 
            className="flex-grow px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-200 text-xs"
          />
          <button type="submit" className="px-4 py-2 bg-[#e3effd] text-[#3a82e9] font-bold rounded-xl text-xs btn-bounce">
            Ask Tutor
          </button>
        </form>

      </div>
    </div>
  );
}
