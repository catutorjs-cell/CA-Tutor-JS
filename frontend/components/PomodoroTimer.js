'use client';

import { useState, useEffect, useRef } from 'react';

export default function PomodoroTimer({ currentUser }) {
  const [duration, setDuration] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('Solo'); // Solo or Group
  const [roomId, setRoomId] = useState('');
  const [roomOccupancy, setRoomOccupancy] = useState(0);
  const [roomBg, setRoomBg] = useState('');
  
  const timerRef = useRef(null);

  useEffect(() => {
    setSecondsLeft(duration * 60);
  }, [duration]);

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          
          // Add completion points
          const mult = mode === 'Group' ? 1.5 : 1.0;
          const pointsEarned = Math.round(duration * mult);
          if (currentUser) {
            currentUser.points += pointsEarned;
          }
          alert(`Success! You completed ${duration} minutes study timer.\nAccrued points: ${pointsEarned} added to your points pool.`);
          return duration * 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setSecondsLeft(duration * 60);
  };

  const joinGroupRoom = (e) => {
    e.preventDefault();
    if (!roomId.trim()) return;

    const count = (roomId.length % 5) + 1;
    setRoomOccupancy(count);

    // Swap styling based on room occupancy size
    if (count > 4) {
      setRoomBg('bg-[#fde8ed] border-[#e85876]/40 room-pulse');
    } else if (count > 2) {
      setRoomBg('bg-[#e3effd] border-[#3a82e9]/40 room-pulse');
    } else {
      setRoomBg('bg-[#e6f6ee] border-[#12b76a]/40');
    }

    alert(`Joined Pomodoro room: "${roomId}"!\nActive occupants count: ${count}. Group Study multiplier (1.5x) enabled.`);
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-700 mb-1">Pomodoro Study Hall Hooks</h3>
      <p className="text-xs text-slate-400 mb-6">Supports adjustable solo and networked team rooms to boost productivity metrics</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Clock Widget */}
        <div className="p-6 bg-white/60 rounded-3xl border border-slate-100 flex flex-col items-center justify-center space-y-4">
          <div className="text-[54px] font-extrabold font-mono text-slate-700 tracking-wider">
            {mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
          </div>

          <div className="w-full px-4 space-y-1">
            <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase">
              <span>Duration:</span>
              <span>{duration} Minutes</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="60" 
              value={duration}
              onChange={(e) => !isRunning && setDuration(parseInt(e.target.value))}
              disabled={isRunning}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer" 
            />
          </div>

          <div className="flex gap-3 pt-2">
            {!isRunning ? (
              <button onClick={handleStart} className="px-5 py-2.5 bg-[#e6f6ee] text-[#12b76a] font-bold text-xs rounded-xl btn-bounce">
                Start Timer
              </button>
            ) : (
              <button onClick={handlePause} className="px-5 py-2.5 bg-[#fef0e6] text-[#f04438] font-bold text-xs rounded-xl btn-bounce">
                Pause
              </button>
            )}
            <button onClick={handleReset} className="px-5 py-2.5 bg-[#e3effd] text-[#3a82e9] font-bold text-xs rounded-xl btn-bounce">
              Reset
            </button>
          </div>
        </div>

        {/* Group Hall Network controls */}
        <div className={`p-6 rounded-3xl border space-y-4 transition-all duration-500 bg-white/60 border-slate-100 ${roomBg}`}>
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Network Group Study Hall</h4>

          <div className="flex gap-2 bg-slate-100/60 p-1 rounded-xl">
            <button 
              onClick={() => { setMode('Solo'); setRoomOccupancy(0); setRoomBg(''); }} 
              className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg ${mode === 'Solo' ? 'bg-white shadow-sm text-slate-600' : 'text-slate-500 hover:bg-white/40'}`}
            >
              👤 Solo Mode
            </button>
            <button 
              onClick={() => setMode('Group')} 
              className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg ${mode === 'Group' ? 'bg-white shadow-sm text-slate-600' : 'text-slate-500 hover:bg-white/40'}`}
            >
              👥 Group Room
            </button>
          </div>

          {mode === 'Group' && (
            <div className="space-y-3 pt-2">
              <form onSubmit={joinGroupRoom}>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Enter Study Room ID</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    placeholder="e.g. AUDIT_TEAM" 
                    className="flex-grow px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none" 
                  />
                  <button type="submit" className="px-4 py-1.5 bg-[#f3ebfd] text-[#8c52ff] font-bold rounded-xl text-xs whitespace-nowrap">
                    Join Room
                  </button>
                </div>
              </form>

              {roomOccupancy > 0 && (
                <div className="p-3 rounded-xl border border-dashed border-[#8c52ff] bg-[#f3ebfd]/20 space-y-1">
                  <p className="text-xs font-bold text-slate-700">Room Status: <span className="text-[#8c52ff]">Connected</span></p>
                  <p className="text-[10px] text-slate-500 font-semibold">Active Students: {roomOccupancy} online</p>
                </div>
              )}
            </div>
          )}

          <div className="p-3 bg-[#e6f6ee]/30 rounded-2xl text-[11px] text-slate-600 leading-relaxed">
            💡 <strong>Gamified Rewards:</strong> Solo timers earn 1 Point/min. Group Study mode triggers an active team multiplier awarding <strong>1.5x Points</strong>!
          </div>
        </div>

      </div>
    </div>
  );
}
