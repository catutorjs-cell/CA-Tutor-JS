'use client';

import { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';
import SyllabusHub from '../components/SyllabusHub';
import PastPapers from '../components/PastPapers';
import Scheduler from '../components/Scheduler';
import MistakesTracker from '../components/MistakesTracker';
import DoubtDecoder from '../components/DoubtDecoder';
import Gamification from '../components/Gamification';
import PomodoroTimer from '../components/PomodoroTimer';
import OCREvaluator from '../components/OCREvaluator';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('syllabusHub');
  const [currentUser, setCurrentUser] = useState(null);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');

  // Registration inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLevel, setRegLevel] = useState('Intermediate');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Login inputs
  const [loginUser, setLoginUser] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Local storage DB mockup
  const [usersDb, setUsersDb] = useState([
    { id: 1, name: "Jananni Shree", email: "jananni.s@cajs.com", phone: "9876543210", user_id: "CAJS7382", exam_level: "Intermediate", points: 450, streak: 5, accuracy_pct: 92.5, revision_cycle: 1 }
  ]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      alert("Fill in all credentials!");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const randomID = `CAJS${Math.floor(1000 + Math.random() * 9000)}`;
    const newUser = {
      id: usersDb.length + 1,
      name: regName,
      email: regEmail,
      phone: regPhone,
      user_id: randomID,
      exam_level: regLevel,
      points: 100,
      streak: 1,
      accuracy_pct: 85.0
    };

    setUsersDb([...usersDb, newUser]);
    alert(`Success!\nUser Name: ${regName}\nUnique User ID: ${randomID}\nRedirecting back to login.`);
    setLoginUser(randomID);
    setShowRegister(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const found = usersDb.find(u => u.user_id === loginUser || u.email === loginUser);
    if (!found) {
      alert("Invalid user credentials! Register a new account.");
      return;
    }
    setCurrentUser(found);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (currentUser?.revision_cycle >= 2) {
      document.body.classList.add('cycle-2-active');
    } else {
      document.body.classList.remove('cycle-2-active');
    }
  }, [currentUser?.revision_cycle]);

  const handleUpdateUser = (updatedUser, triggerModal = false, modalMessage = "") => {
    setCurrentUser(updatedUser);
    setUsersDb(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (triggerModal) {
      setCelebrationMessage(modalMessage);
      setShowCelebrationModal(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-white/60">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#e3effd] text-[#3a82e9] font-bold text-2xl mb-3">JS</div>
            <h1 className="text-3xl font-extrabold text-slate-800">CA JS</h1>
            <p className="text-sm text-slate-500 font-medium">CA Success Suite Workspace</p>
          </div>

          {!showRegister ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <h2 className="text-xl font-bold text-slate-700 mb-4 text-center">Sign In to Dashboard</h2>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Email or User ID</label>
                <input 
                  type="text" 
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  placeholder="cajs_student@gmail.com" 
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-sm"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Password</label>
                <input 
                  type="password" 
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-sm"
                />
              </div>
              <button type="submit" className="w-full py-3.5 bg-[#e3effd] text-[#3a82e9] font-bold rounded-2xl hover:opacity-90 transition btn-bounce text-sm">
                Login
              </button>
              
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-200/60"></div>
                <span className="flex-shrink mx-4 text-xs text-slate-400 font-medium">or join now</span>
                <div className="flex-grow border-t border-slate-200/60"></div>
              </div>

              <button 
                type="button"
                onClick={() => setShowRegister(true)} 
                className="w-full py-3.5 border border-slate-200 bg-white/40 hover:bg-white/60 font-semibold text-slate-600 rounded-2xl transition btn-bounce text-sm"
              >
                Register New Account
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <h2 className="text-xl font-bold text-slate-700 mb-4 text-center">Create Student Profile</h2>
              <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Full Name</label>
                  <input type="text" required value={regName} onChange={(e)=>setRegName(e.target.value)} placeholder="Jananni Kumar" className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-white/70 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Email ID</label>
                  <input type="email" required value={regEmail} onChange={(e)=>setRegEmail(e.target.value)} placeholder="jananni.k@cajs.com" className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-white/70 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Phone Number</label>
                  <div className="flex gap-2">
                    <input type="text" value={regPhone} onChange={(e)=>setRegPhone(e.target.value)} placeholder="9876543210" className="flex-grow px-4 py-2.5 rounded-2xl border border-slate-200 bg-white/70 text-sm" />
                    <button type="button" onClick={() => setShowOtp(true)} className="px-3 bg-[#fde8ed] text-[#e85876] font-bold rounded-2xl text-xs whitespace-nowrap">OTP Verification</button>
                  </div>
                  {showOtp && (
                    <div className="mt-2 p-3 bg-[#fde8ed]/40 border border-[#fde8ed] rounded-2xl flex items-center gap-2">
                      <input type="text" value={otpCode} onChange={(e)=>setOtpCode(e.target.value)} placeholder="Code (1234)" className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-center font-bold tracking-widest" />
                      <button type="button" onClick={() => { alert("Verified!"); setShowOtp(false); }} className="px-3 py-1.5 bg-[#e6f6ee] text-[#12b76a] font-bold rounded-xl text-xs">Verify</button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Exam Level</label>
                  <select value={regLevel} onChange={(e)=>setRegLevel(e.target.value)} className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-white/70 text-sm">
                    <option value="Intermediate">CA Intermediate</option>
                    <option value="Final">CA Final</option>
                    <option value="Foundation">CA Foundation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Password</label>
                  <input type="password" required value={regPassword} onChange={(e)=>setRegPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-white/70 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wider">Confirm Password</label>
                  <input type="password" required value={regConfirmPassword} onChange={(e)=>setRegConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 bg-white/70 text-sm" />
                </div>
              </div>

              <div className="pt-3 space-y-2">
                <button type="submit" className="w-full py-3.5 bg-[#e6f6ee] text-[#12b76a] font-bold rounded-2xl hover:opacity-90 transition text-sm">
                  Register Account
                </button>
                <button type="button" onClick={() => setShowRegister(false)} className="w-full py-2.5 text-center text-xs font-semibold text-slate-500 hover:text-slate-700 transition">
                  Back to Login
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    );
  }

  return (
    <main className="p-4 md:p-8 max-w-6xl mx-auto w-full space-y-6">
      {/* Dynamic Header Component */}
      <Dashboard currentUser={currentUser} logout={logout} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Module Switcher Side Panel */}
        <div className="lg:col-span-1 space-y-2">
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 px-3 mb-2">Learning Hub</p>
          <button onClick={() => setActiveTab('syllabusHub')} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-left transition ${activeTab === 'syllabusHub' ? 'tab-active text-[#3a82e9]' : 'text-slate-500 hover:bg-white/40'}`}>
            <span>📚 Syllabus Hub</span>
            {activeTab === 'syllabusHub' && <span className="w-2 h-2 rounded-full bg-[#3a82e9]"></span>}
          </button>
          <button onClick={() => setActiveTab('pastPapers')} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-left transition ${activeTab === 'pastPapers' ? 'tab-active text-[#3a82e9]' : 'text-slate-500 hover:bg-white/40'}`}>
            <span>📝 Past Papers</span>
            {activeTab === 'pastPapers' && <span className="w-2 h-2 rounded-full bg-[#3a82e9]"></span>}
          </button>
          <button onClick={() => setActiveTab('scheduler')} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-left transition ${activeTab === 'scheduler' ? 'tab-active text-[#3a82e9]' : 'text-slate-500 hover:bg-white/40'}`}>
            <span>🗓️ Scheduler</span>
            {activeTab === 'scheduler' && <span className="w-2 h-2 rounded-full bg-[#3a82e9]"></span>}
          </button>
          <button onClick={() => setActiveTab('mistakes')} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-left transition ${activeTab === 'mistakes' ? 'tab-active text-[#3a82e9]' : 'text-slate-500 hover:bg-white/40'}`}>
            <span>❌ Mistakes Tracker</span>
            {activeTab === 'mistakes' && <span className="w-2 h-2 rounded-full bg-[#3a82e9]"></span>}
          </button>
          <button onClick={() => setActiveTab('doubt')} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-left transition ${activeTab === 'doubt' ? 'tab-active text-[#3a82e9]' : 'text-slate-500 hover:bg-white/40'}`}>
            <span>🤖 Doubt Decoder</span>
            {activeTab === 'doubt' && <span className="w-2 h-2 rounded-full bg-[#3a82e9]"></span>}
          </button>
          <button onClick={() => setActiveTab('gamification')} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-left transition ${activeTab === 'gamification' ? 'tab-active text-[#3a82e9]' : 'text-slate-500 hover:bg-white/40'}`}>
            <span>🏆 Leaderboard standings</span>
            {activeTab === 'gamification' && <span className="w-2 h-2 rounded-full bg-[#3a82e9]"></span>}
          </button>
          <button onClick={() => setActiveTab('pomodoro')} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-left transition ${activeTab === 'pomodoro' ? 'tab-active text-[#3a82e9]' : 'text-slate-500 hover:bg-white/40'}`}>
            <span>⏱️ Pomodoro Hall</span>
            {activeTab === 'pomodoro' && <span className="w-2 h-2 rounded-full bg-[#3a82e9]"></span>}
          </button>
          <button onClick={() => setActiveTab('ocr')} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-left transition ${activeTab === 'ocr' ? 'tab-active text-[#3a82e9]' : 'text-slate-500 hover:bg-white/40'}`}>
            <span>📝 OMR OCR Evaluator</span>
            {activeTab === 'ocr' && <span className="w-2 h-2 rounded-full bg-[#3a82e9]"></span>}
          </button>
        </div>

        {/* Dynamic content rendering frame */}
        <div className="lg:col-span-3 glass-card rounded-3xl p-6 min-h-[500px]">
          {activeTab === 'syllabusHub' && (
            <SyllabusHub currentUser={currentUser} onUpdateUser={handleUpdateUser} />
          )}
          {activeTab === 'pastPapers' && <PastPapers />}
          {activeTab === 'scheduler' && <Scheduler currentUser={currentUser} />}
          {activeTab === 'mistakes' && <MistakesTracker currentUser={currentUser} />}
          {activeTab === 'doubt' && <DoubtDecoder currentUser={currentUser} />}
          {activeTab === 'gamification' && <Gamification currentUser={currentUser} />}
          {activeTab === 'pomodoro' && <PomodoroTimer currentUser={currentUser} />}
          {activeTab === 'ocr' && <OCREvaluator currentUser={currentUser} />}
        </div>

      </div>

      {/* Celebratory Milestone Modal */}
      {showCelebrationModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white/95 rounded-[32px] max-w-md w-full p-8 border border-white/80 shadow-2xl relative overflow-hidden transform scale-up text-center">
            
            {/* Background soft pastel ambient circles */}
            <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#e6f6ee] opacity-70 blur-2xl"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-[#f3ebfd] opacity-70 blur-2xl"></div>
            
            <div className="relative space-y-5">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#e6f6ee] text-[#12b76a] text-4xl animate-bounce shadow-inner border border-[#12b76a]/10">
                🏆
              </div>
              
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                Milestone Achieved!
              </h2>
              
              <div className="p-4 bg-gradient-to-br from-[#e6f6ee]/60 to-[#f3ebfd]/60 border border-white rounded-2xl">
                <p className="text-slate-700 text-sm leading-relaxed font-semibold">
                  {celebrationMessage || "Incredible, Jananni Shree! You've cleared Round 1. Initializing high-intensity Revision Round 2 scheduler!"}
                </p>
              </div>
              
              <div className="flex justify-center gap-6 py-2">
                <div className="text-center">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">REWARDS POINTS</span>
                  <span className="text-xl font-black text-[#12b76a] font-mono">+100 Pts</span>
                </div>
                <div className="w-px bg-slate-200/80"></div>
                <div className="text-center">
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">NEXT STAGE</span>
                  <span className="text-xl font-black text-[#8c52ff]">Revision Round 2</span>
                </div>
              </div>
              
              <p className="text-xs text-slate-400 font-medium">
                A new progressive pastel green/lavender layout harmony is now unlocked. Keep learning!
              </p>
              
              <button 
                onClick={() => setShowCelebrationModal(false)}
                className="w-full py-3.5 bg-gradient-to-r from-[#12b76a] to-[#8c52ff] text-white font-extrabold rounded-2xl hover:opacity-90 transition shadow-lg shadow-purple-500/25 hover:shadow-purple-500/35 transform active:scale-[0.98] text-sm"
              >
                Let's Go! 🚀
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
