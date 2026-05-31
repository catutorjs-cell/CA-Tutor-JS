'use client';

import { useState, useEffect } from 'react';

export default function SyllabusHub({ currentUser, onUpdateUser }) {
  const [collapsed, setCollapsed] = useState({
    subject1: false,
    subject2: true,
    chap1: true,
    chap2: true,
    chap3: true,
  });

  const [progress, setProgress] = useState({
    chap1: false,
    chap2: false,
    chap3: false,
  });

  const [revisionCycle, setRevisionCycle] = useState(currentUser?.revision_cycle || 1);

  // Fetch progress checklist state from FastAPI backend
  useEffect(() => {
    if (!currentUser) return;
    
    fetch('/api/syllabus/progress')
      .then(res => {
        if (!res.ok) throw new Error('Backend offline');
        return res.json();
      })
      .then(data => {
        setRevisionCycle(data.revision_cycle);
        // Map backend chapters by name or id to local progress state
        const chap1Prog = data.progress?.find(p => p.chapter_id === 1 || p.chapter_name.includes("Partnership"))?.status === "Completed";
        const chap2Prog = data.progress?.find(p => p.chapter_id === 2 || p.chapter_name.includes("Amalgamation"))?.status === "Completed";
        const chap3Prog = data.progress?.find(p => p.chapter_id === 3 || p.chapter_name.includes("Capital"))?.status === "Completed";
        
        setProgress({
          chap1: !!chap1Prog,
          chap2: !!chap2Prog,
          chap3: !!chap3Prog
        });
      })
      .catch(err => {
        console.log("FastAPI backend offline, running standalone mockup for syllabus checklists:", err.message);
      });
  }, [currentUser, currentUser?.revision_cycle]);

  const toggle = (key) => {
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCheckboxChange = async (chapKey, chapId) => {
    if (!currentUser) {
      alert("Please log in first to update checklists!");
      return;
    }

    const newStatus = !progress[chapKey];
    setProgress(prev => ({ ...prev, [chapKey]: newStatus }));

    // Hits real-time FastAPI endpoints
    try {
      const response = await fetch('/api/syllabus/complete-chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapter_id: chapId,
          status: newStatus ? "Completed" : "Not Started"
        })
      });

      if (!response.ok) throw new Error("HTTP " + response.status);

      const result = await response.json();
      if (result.status === "success") {
        if (result.cycle_completed) {
          // Trigger celebratory milestone modal to parent
          if (onUpdateUser) {
            onUpdateUser({
              ...currentUser,
              points: currentUser.points + 100,
              revision_cycle: result.revision_cycle
            }, true, result.message);
          }
          setProgress({ chap1: false, chap2: false, chap3: false });
          setRevisionCycle(result.revision_cycle);
        } else {
          if (onUpdateUser) {
            onUpdateUser({
              ...currentUser,
              revision_cycle: result.revision_cycle
            });
          }
          setRevisionCycle(result.revision_cycle);
        }
      }
    } catch (error) {
      // Offline fallback state tracker
      console.log("Syllabus toggle offline fallback:", error.message);
      const updatedProgress = { ...progress, [chapKey]: newStatus };
      
      if (updatedProgress.chap1 && updatedProgress.chap2 && updatedProgress.chap3) {
        const nextCycle = (currentUser.revision_cycle || 1) + 1;
        const msg = `Incredible, Jananni Shree! You've cleared Round ${currentUser.revision_cycle || 1}. Initializing high-intensity Revision Round ${nextCycle} scheduler!`;
        
        if (onUpdateUser) {
          onUpdateUser({
            ...currentUser,
            points: currentUser.points + 100,
            revision_cycle: nextCycle
          }, true, msg);
        }
        
        setProgress({ chap1: false, chap2: false, chap3: false });
        setRevisionCycle(nextCycle);
      } else {
        if (onUpdateUser) {
          onUpdateUser({ ...currentUser });
        }
      }
    }
  };

  // Subtle dynamic pastel HSL accent transitions when cycle 2 is active
  const isCycle2 = revisionCycle >= 2;
  
  const subj1Bg = isCycle2 ? 'bg-[#e6f6ee]/40 hover:bg-[#e6f6ee]/60' : 'bg-[#e3effd]/40 hover:bg-[#e3effd]/60';
  const subj1Text = isCycle2 ? 'text-[#12b76a]' : 'text-[#3a82e9]';
  const subj1Icon = isCycle2 ? '🟢' : '📘';

  const subj2Bg = isCycle2 ? 'bg-[#f3ebfd]/45 hover:bg-[#f3ebfd]/60' : 'bg-[#fde8ed]/45 hover:bg-[#fde8ed]/60';
  const subj2Text = isCycle2 ? 'text-[#8c52ff]' : 'text-[#e85876]';
  const subj2Icon = isCycle2 ? '🟣' : '📕';

  const badgeColor = isCycle2 ? 'bg-[#f3ebfd] text-[#8c52ff]' : 'bg-[#e3effd] text-[#3a82e9]';

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
        <div>
          <h3 className="text-lg font-bold text-slate-700 mb-0.5">Syllabus Material Hub</h3>
          <p className="text-xs text-slate-400">Chapter-wise nested collapsible list tree with accounting and taxation illustrations</p>
        </div>
        <span className={`px-3 py-1 rounded-full font-bold text-xs tracking-wider animate-pulse whitespace-nowrap ${badgeColor}`}>
          {isCycle2 ? `🚀 Revision Cycle: ${revisionCycle}` : `🔥 Revision Cycle: 1`}
        </span>
      </div>

      <div className="space-y-4 mt-4">
        
        {/* Subject 1 */}
        <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white/45">
          <button 
            onClick={() => toggle('subject1')} 
            className={`w-full px-5 py-4 flex justify-between items-center text-sm font-bold text-slate-700 transition ${subj1Bg}`}
          >
            <span>{subj1Icon} Subject 1: Advanced Financial Accounting</span>
            <span>{collapsed.subject1 ? '▼' : '▲'}</span>
          </button>
          
          {!collapsed.subject1 && (
            <div className="px-5 py-3 border-t border-slate-100 bg-white/20 space-y-3">
              
              {/* Chapter 1 */}
              <div className="border border-slate-100/50 rounded-xl bg-white/70 p-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={progress.chap1}
                      onChange={() => handleCheckboxChange('chap1', 1)}
                      className={`w-4 h-4 rounded border-slate-300 focus:ring-opacity-40 focus:ring-offset-0 ${isCycle2 ? 'text-[#12b76a] focus:ring-[#12b76a]' : 'text-[#3a82e9] focus:ring-[#3a82e9]'}`}
                    />
                    <span className="text-xs font-bold text-slate-600">Chapter 1: Partnership Accounts & Valuation</span>
                  </label>
                  <button onClick={() => toggle('chap1')} className={`text-[11px] font-bold hover:underline ${subj1Text}`}>
                    Notes & PDF {collapsed.chap1 ? '▼' : '▲'}
                  </button>
                </div>
                
                {!collapsed.chap1 && (
                  <div className="mt-2 pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                    <p><strong>Notes:</strong> Goodwill valuations use average profits or super profit methods. Real sacrifices ratios must be computed upon new admissions.</p>
                    <div className="p-2.5 bg-[#fff9e6]/70 border border-[#eaaa08]/20 rounded-xl">
                      <p className="font-semibold text-slate-700 text-[11px]">📝 Tax/Accounting Illustration:</p>
                      <p className="text-[10px] mt-1 font-mono">Illustration 1: A and B hold ratios 3:2. C enters at 1/5 share bringing Rs.20,000 Goodwill premium. Calculate sacrifices ratios ledger adjustments.</p>
                    </div>
                    <span className={`cursor-pointer font-bold hover:underline ${subj1Text}`}>Download Reference Guide.pdf</span>
                  </div>
                )}
              </div>

              {/* Chapter 2 */}
              <div className="border border-slate-100/50 rounded-xl bg-white/70 p-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={progress.chap2}
                      onChange={() => handleCheckboxChange('chap2', 2)}
                      className={`w-4 h-4 rounded border-slate-300 focus:ring-opacity-40 focus:ring-offset-0 ${isCycle2 ? 'text-[#12b76a] focus:ring-[#12b76a]' : 'text-[#3a82e9] focus:ring-[#3a82e9]'}`}
                    />
                    <span className="text-xs font-bold text-slate-600">Chapter 2: Amalgamation of Partnership Firms</span>
                  </label>
                  <button onClick={() => toggle('chap2')} className={`text-[11px] font-bold hover:underline ${subj1Text}`}>
                    Notes & PDF {collapsed.chap2 ? '▼' : '▲'}
                  </button>
                </div>

                {!collapsed.chap2 && (
                  <div className="mt-2 pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                    <p><strong>Notes:</strong> Realization accounts record asset closures. Purchase consideration represents the net assets merged.</p>
                    <div className="p-2.5 bg-[#fff9e6]/70 border border-[#eaaa08]/20 rounded-xl">
                      <p className="font-semibold text-slate-700 text-[11px]">📝 Accounting Illustration:</p>
                      <p className="text-[10px] mt-1 font-mono">Illustration 2: Transfer of reserve accounts and bad debts reserves on merger calculations.</p>
                    </div>
                    <span className={`cursor-pointer font-bold hover:underline ${subj1Text}`}>Download Amalgamation Guide.pdf</span>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* Subject 2 */}
        <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white/45">
          <button 
            onClick={() => toggle('subject2')} 
            className={`w-full px-5 py-4 flex justify-between items-center text-sm font-bold text-slate-700 transition ${subj2Bg}`}
          >
            <span>{subj2Icon} Subject 2: Direct Tax Laws & GST</span>
            <span>{collapsed.subject2 ? '▼' : '▲'}</span>
          </button>
          
          {!collapsed.subject2 && (
            <div className="px-5 py-3 border-t border-slate-100 bg-white/20 space-y-3">
              
              <div className="border border-slate-100/50 rounded-xl bg-white/70 p-3">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={progress.chap3}
                      onChange={() => handleCheckboxChange('chap3', 3)}
                      className={`w-4 h-4 rounded border-slate-300 focus:ring-opacity-40 focus:ring-offset-0 ${isCycle2 ? 'text-[#8c52ff] focus:ring-[#8c52ff]' : 'text-[#e85876] focus:ring-[#e85876]'}`}
                    />
                    <span className="text-xs font-bold text-slate-600">Chapter 1: Capital Gains (Section 45 to 55)</span>
                  </label>
                  <button onClick={() => toggle('chap3')} className={`text-[11px] font-bold hover:underline ${subj2Text}`}>
                    Notes & PDF {collapsed.chap3 ? '▼' : '▲'}
                  </button>
                </div>

                {!collapsed.chap3 && (
                  <div className="mt-2 pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                    <p><strong>Notes:</strong> Short-term asset holdings are capped at 24 months for immovable properties, whereas long-term assets enjoy indexing tax rates.</p>
                    <div className="p-2.5 bg-[#fff9e6]/70 border border-[#eaaa08]/20 rounded-xl">
                      <p className="font-semibold text-slate-700 text-[11px]">📝 Tax Illustration:</p>
                      <p className="text-[10px] mt-1 font-mono">Illustration 1: Indexation calculation adjusting CII values for asset sold in fiscal year 2024.</p>
                    </div>
                    <span className={`cursor-pointer font-bold hover:underline ${subj2Text}`}>Download CapitalGains_Guide.pdf</span>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
