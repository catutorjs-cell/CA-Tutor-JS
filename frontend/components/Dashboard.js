'use client';

export default function Dashboard({ currentUser, logout, activeTab }) {
  const isCycle2 = currentUser?.revision_cycle >= 2;
  const syllabusVal = isCycle2 ? 0 : 62;
  const mockVal = isCycle2 ? 55 : 45;
  const revisionVal = isCycle2 ? 90 : 80;

  // Mock circular progress offsets
  const syllabusOffset = 220 - (220 * syllabusVal / 100);
  const mockOffset = 220 - (220 * mockVal / 100);
  const revisionOffset = 220 - (220 * revisionVal / 100);

  const cardBorder1 = isCycle2 ? 'border-t-4 border-t-[#12b76a]' : '';
  const cardBorder2 = isCycle2 ? 'border-t-4 border-t-[#8c52ff]' : '';
  const cardBorder3 = isCycle2 ? 'border-t-4 border-t-[#e85876]' : '';

  const recBg1 = isCycle2 ? 'bg-[#e6f6ee]/80 border-[#12b76a]/20' : 'bg-[#fde8ed] border-white/50';
  const recBg2 = isCycle2 ? 'bg-[#f3ebfd]/80 border-[#8c52ff]/20' : 'bg-[#f3ebfd] border-white/50';
  const recBg3 = isCycle2 ? 'bg-[#fff9e6]/80 border-[#eaaa08]/20' : 'bg-[#e6f6ee] border-white/50';

  return (
    <div className="space-y-6">
      
      {/* Dynamic Branding & Account Header */}
      <header className="w-full flex flex-col md:flex-row justify-between items-center glass-card rounded-3xl p-6 gap-4 border border-white/60">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center transition-all duration-500 ${isCycle2 ? 'bg-[#e6f6ee] text-[#12b76a]' : 'bg-[#e3effd] text-[#3a82e9]'}`}>JS</div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">CA JS Success Suite</h1>
            <p className="text-[10px] uppercase font-semibold tracking-widest text-slate-400">Pastel React Edition</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <div className="text-center font-bold text-lg text-slate-700 uppercase tracking-widest hidden md:block">
            CA JS
          </div>
          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] tracking-wider whitespace-nowrap transition-all duration-500 border ${
            isCycle2 ? 'bg-[#f3ebfd] text-[#8c52ff] border-[#8c52ff]/20 animate-pulse' : 'bg-[#e3effd] text-[#3a82e9] border-[#3a82e9]/20'
          }`}>
            {isCycle2 ? `🚀 Revision Cycle: ${currentUser?.revision_cycle}` : `🔥 Revision Cycle: 1`}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <h3 className="text-sm font-bold text-slate-700">{currentUser?.name || "Student"}</h3>
            <p className="text-xs text-slate-400 font-medium">User ID: <span className="text-[#8c52ff] font-bold font-mono">{currentUser?.user_id || "CAJS0000"}</span></p>
          </div>
          <div className={`w-10 h-10 rounded-full font-extrabold flex items-center justify-center transition-all duration-500 ${isCycle2 ? 'bg-[#e6f6ee] text-[#12b76a]' : 'bg-[#f3ebfd] text-[#8c52ff]'}`}>
            {currentUser?.name ? currentUser.name.split(' ').map(n=>n[0]).join('') : "ST"}
          </div>
          <button onClick={logout} className="px-3 py-2 bg-[#fef0e6] text-[#f04438] font-bold text-xs rounded-xl hover:opacity-90 transition">
            Logout
          </button>
        </div>
      </header>

      {/* Analytics Gauges */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Syllabus Progress Card */}
        <div className={`glass-card rounded-3xl p-6 flex items-center justify-between transition-all duration-500 ${cardBorder1}`}>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Syllabus Progress %</p>
            <h2 className="text-3xl font-extrabold text-slate-700">{syllabusVal}%</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">{isCycle2 ? 'Checklist reset for Round 2' : 'Direct reading progress'}</p>
          </div>
          <div className="progress-gauge">
            <svg>
              <circle className="bg-circle" cx="45" cy="45" r="35"></circle>
              <circle className={`progress-circle transition-all duration-1000 ${isCycle2 ? 'stroke-[#12b76a]' : 'stroke-[#3a82e9]'}`} cx="45" cy="45" r="35" strokeDasharray="220" strokeDashoffset={syllabusOffset}></circle>
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold font-mono transition-colors duration-500 ${isCycle2 ? 'text-[#12b76a]' : 'text-[#3a82e9]'}`}>SYL</div>
          </div>
        </div>

        {/* Mock Test Card */}
        <div className={`glass-card rounded-3xl p-6 flex items-center justify-between transition-all duration-500 ${cardBorder2}`}>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Mock Test Completion %</p>
            <h2 className="text-3xl font-extrabold text-slate-700">{mockVal}%</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">{isCycle2 ? 'Increased target scope' : 'Mock papers completed'}</p>
          </div>
          <div className="progress-gauge">
            <svg>
              <circle className="bg-circle" cx="45" cy="45" r="35"></circle>
              <circle className={`progress-circle transition-all duration-1000 ${isCycle2 ? 'stroke-[#8c52ff]' : 'stroke-[#12b76a]'}`} cx="45" cy="45" r="35" strokeDasharray="220" strokeDashoffset={mockOffset}></circle>
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold font-mono transition-colors duration-500 ${isCycle2 ? 'text-[#8c52ff]' : 'text-[#12b76a]'}`}>MOCK</div>
          </div>
        </div>

        {/* Revision Card */}
        <div className={`glass-card rounded-3xl p-6 flex items-center justify-between transition-all duration-500 ${cardBorder3}`}>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Revision Completion %</p>
            <h2 className="text-3xl font-extrabold text-slate-700">{revisionVal}%</h2>
            <p className="text-xs text-slate-500 font-medium mt-1">{isCycle2 ? 'Cycle 2 high intensity load' : 'Mistakes resolved ledger'}</p>
          </div>
          <div className="progress-gauge">
            <svg>
              <circle className="bg-circle" cx="45" cy="45" r="35"></circle>
              <circle className={`progress-circle transition-all duration-1000 ${isCycle2 ? 'stroke-[#e85876]' : 'stroke-[#8c52ff]'}`} cx="45" cy="45" r="35" strokeDasharray="220" strokeDashoffset={revisionOffset}></circle>
            </svg>
            <div className={`absolute inset-0 flex items-center justify-center text-[10px] font-bold font-mono transition-colors duration-500 ${isCycle2 ? 'text-[#e85876]' : 'text-[#8c52ff]'}`}>REV</div>
          </div>
        </div>

      </section>

      {/* Revision Alerts recommendations */}
      <section className={`glass-card rounded-3xl p-6 border-l-4 bg-white/45 transition-all duration-500 ${isCycle2 ? 'border-l-[#12b76a]' : 'border-l-orange-300'}`}>
        <h3 className="text-md font-bold text-slate-700 mb-3 flex items-center gap-2">
          <span>{isCycle2 ? '🚀' : '💡'}</span> {isCycle2 ? 'High-Intensity Revision Round 2 Active Recommendations' : 'What to Revise Today (Smart Recommendations)'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`rounded-2xl p-4 border transition-all duration-500 space-y-1 ${recBg1}`}>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white text-slate-600">{isCycle2 ? 'SUPERCHARGED' : 'HIGH PRIORITY'}</span>
            <h4 className="text-xs font-bold text-slate-800 mt-2">Goodwill Calculation Issues</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">Flagged weak topics inside Mistakes ledger. Revise sacrifices division ratios.</p>
          </div>
          <div className={`rounded-2xl p-4 border transition-all duration-500 space-y-1 ${recBg2}`}>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white text-slate-600">{isCycle2 ? 'HIGH INTENSITY' : 'PENDING CHAPTER'}</span>
            <h4 className="text-xs font-bold text-slate-800 mt-2">Capital Gains (Sec 45)</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">Highly trending topic in past exam papers. Revise indexations before exam dates.</p>
          </div>
          <div className={`rounded-2xl p-4 border transition-all duration-500 space-y-1 ${recBg3}`}>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-white text-slate-600">STREAK BOOST</span>
            <h4 className="text-xs font-bold text-slate-800 mt-2">Solo Pomodoro Session</h4>
            <p className="text-[11px] text-slate-600 leading-relaxed">Practice 25 minutes of focus to earn reward points and maintain streak streaks.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

