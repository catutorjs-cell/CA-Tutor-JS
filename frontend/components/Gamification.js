'use client';

import { useState } from 'react';

export default function Gamification({ currentUser }) {
  const [friendId, setFriendId] = useState('');
  const [followedFriends, setFollowedFriends] = useState([]);
  const [leaderboardTab, setLeaderboardTab] = useState('global');

  // Peer Mock Db
  const peerDb = {
    "CAJS1023": { name: "Rahul Sharma", exam_level: "Intermediate", points: 890, streak: 12, accuracy: 94.0 },
    "CAJS4829": { name: "Priya Patel", exam_level: "Intermediate", points: 740, streak: 8, accuracy: 88.5 },
    "CAJS9012": { name: "Ananya Iyer", exam_level: "Final", points: 340, streak: 4, accuracy: 91.0 }
  };

  const handleFollow = (e) => {
    e.preventDefault();
    if (!friendId.trim()) return;

    if (friendId === currentUser?.user_id) {
      alert("You cannot follow your own profile ID.");
      return;
    }

    const peer = peerDb[friendId];
    if (!peer) {
      alert("User ID not found in system registers. Try CAJS1023 or CAJS4829.");
      return;
    }

    if (followedFriends.some(f => f.user_id === friendId)) {
      setFollowedFriends(followedFriends.filter(f => f.user_id !== friendId));
      alert(`Unfollowed ${peer.name}.`);
    } else {
      setFollowedFriends([...followedFriends, { ...peer, user_id: friendId }]);
      alert(`Successfully followed ${peer.name}!`);
    }
    setFriendId('');
  };

  const leaderboardList = [
    { name: "Rahul Sharma", user_id: "CAJS1023", points: 890, streak: 12 },
    { name: "Priya Patel", user_id: "CAJS4829", points: 740, streak: 8 },
    { name: currentUser?.name || "Jananni Kumar", user_id: currentUser?.user_id || "CAJS7382", points: currentUser?.points || 450, streak: currentUser?.streak || 5 },
    { name: "Ananya Iyer", user_id: "CAJS9012", points: 340, streak: 4 }
  ];

  const sortedLeaderboard = leaderboardTab === 'global' 
    ? [...leaderboardList].sort((a,b) => b.points - a.points)
    : [...leaderboardList].sort((a,b) => b.streak - a.streak);

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-700 mb-1">Performance Gamification & Peers</h3>
      <p className="text-xs text-slate-400 mb-6">Track streaks, look up friends via User ID, and check global leaderboard rankings</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Stats Summary Panel */}
        <div className="md:col-span-1 p-5 bg-white/60 rounded-2xl border border-slate-100 space-y-4">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Your Standings</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2.5 bg-[#e3effd]/30 rounded-xl">
              <span className="text-xs font-semibold text-slate-500">Streak Streak</span>
              <span className="text-xs font-bold text-[#3a82e9]">{currentUser?.streak || 5} Days</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-[#e6f6ee]/30 rounded-xl">
              <span className="text-xs font-semibold text-slate-500">Total Points</span>
              <span className="text-xs font-bold text-[#12b76a]">{currentUser?.points || 450} Pts</span>
            </div>
            <div className="flex justify-between items-center p-2.5 bg-[#f3ebfd]/30 rounded-xl">
              <span className="text-xs font-semibold text-slate-500">Accuracy %</span>
              <span className="text-xs font-bold text-[#8c52ff]">{currentUser?.accuracy_pct || 92.5}%</span>
            </div>
          </div>
        </div>

        {/* Peer Search & Social List */}
        <div className="md:col-span-2 p-5 bg-white/60 rounded-2xl border border-slate-100 space-y-4">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Social Lookup & Follows</h4>
          <form onSubmit={handleFollow} className="flex gap-2">
            <input 
              type="text" 
              value={friendId}
              onChange={(e) => setFriendId(e.target.value)}
              placeholder="Search User ID (e.g. CAJS1023)" 
              className="flex-grow px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
            />
            <button type="submit" className="px-4 py-2 bg-[#f3ebfd] text-[#8c52ff] font-bold rounded-xl text-xs btn-bounce">
              Follow Student
            </button>
          </form>

          <h5 className="text-[11px] font-bold uppercase text-slate-400 mt-3">Connected Friends</h5>
          <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
            {followedFriends.length === 0 ? (
              <p className="text-[11px] text-slate-400">Search student User ID (e.g. CAJS1023) to follow and compare scores.</p>
            ) : (
              followedFriends.map(f => (
                <div key={f.user_id} className="flex justify-between items-center p-3 rounded-2xl bg-white/70 border border-slate-100">
                  <div>
                    <h5 className="text-xs font-bold text-slate-700">{f.name}</h5>
                    <p className="text-[10px] text-slate-400 font-semibold font-mono">ID: {f.user_id} | {f.exam_level}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-700">{f.points} Pts</p>
                    <p className="text-[9px] text-[#8c52ff]">{f.accuracy}% Acc</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Leaderboard Dual Tab Matrices */}
      <div className="border border-slate-100 rounded-2xl overflow-hidden bg-white/40">
        
        {/* Tab switch bar */}
        <div className="bg-slate-50 border-b border-slate-100 flex p-1 gap-1">
          <button 
            onClick={() => setLeaderboardTab('global')}
            className={`flex-grow py-2 text-center text-xs font-bold rounded-xl ${leaderboardTab === 'global' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-500 hover:bg-white/40'}`}
          >
            🌎 Global Standings
          </button>
          <button 
            onClick={() => setLeaderboardTab('weekly')}
            className={`flex-grow py-2 text-center text-xs font-bold rounded-xl ${leaderboardTab === 'weekly' ? 'bg-white shadow-sm text-slate-700' : 'text-slate-500 hover:bg-white/40'}`}
          >
            🗓️ Weekly Leaderboard
          </button>
        </div>

        <div className="p-3">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="text-slate-400 font-bold border-b border-slate-100">
                <th className="p-3 w-16 text-center">Rank</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">User ID</th>
                <th className="p-3 text-center">Points</th>
                <th className="p-3 text-center">Streak</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeaderboard.map((entry, idx) => {
                const isSelf = entry.user_id === currentUser?.user_id;
                return (
                  <tr key={entry.user_id} className={`${isSelf ? 'bg-[#e3effd]/20 font-bold border-l-2 border-l-[#3a82e9]' : 'border-b border-slate-100 hover:bg-slate-50/50 transition'}`}>
                    <td className="p-3 text-center font-bold text-slate-500">{idx + 1}</td>
                    <td className="p-3 text-slate-700">{entry.name} {isSelf && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#e3effd] text-[#3a82e9] ml-2">YOU</span>}</td>
                    <td className="p-3 text-slate-400 font-semibold font-mono">{entry.user_id}</td>
                    <td className="p-3 text-center text-slate-700 font-bold">{entry.points}</td>
                    <td className="p-3 text-center text-slate-500 font-semibold font-mono">{entry.streak} Days</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
