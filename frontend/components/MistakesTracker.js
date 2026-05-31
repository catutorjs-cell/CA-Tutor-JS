'use client';

import { useState } from 'react';

export default function MistakesTracker({ currentUser }) {
  const [mistakes, setMistakes] = useState([
    { id: 1, concept: "Premium for Goodwill division ratio errors", issue_type: "Calculation Issue", created_at: "2026-05-18", status: "Pending" },
    { id: 2, concept: "Transfer values section inclusions (CGST Act Sec 15)", issue_type: "Concept Mistake", created_at: "2026-05-19", status: "Pending" }
  ]);
  const [concept, setConcept] = useState('');
  const [issueType, setIssueType] = useState('Concept Mistake');

  const addMistake = (e) => {
    e.preventDefault();
    if (!concept) return;

    const newMistake = {
      id: mistakes.length + 1,
      concept,
      issue_type: issueType,
      created_at: new Date().toISOString().split('T')[0],
      status: "Pending"
    };

    setMistakes([...mistakes, newMistake]);
    setConcept('');
    if (currentUser) {
      currentUser.accuracy_pct = Math.max(50, currentUser.accuracy_pct - 1);
    }
  };

  const resolveMistake = (id) => {
    setMistakes(mistakes.map(m => {
      if (m.id === id) {
        if (currentUser) {
          currentUser.points += 15;
          currentUser.accuracy_pct = Math.min(100, currentUser.accuracy_pct + 2);
        }
        return { ...m, status: 'Resolved' };
      }
      return m;
    }));
  };

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-700 mb-1">Mistakes Tracker Ledger</h3>
      <p className="text-xs text-slate-400 mb-6">Logs numerical calculation errors or conceptual issues to avoid repeating them in examinations</p>

      {/* Log Form */}
      <form onSubmit={addMistake} className="p-4 bg-white/60 rounded-2xl border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Concept Topic</label>
          <input 
            type="text" 
            value={concept} 
            onChange={(e) => setConcept(e.target.value)} 
            placeholder="e.g. Sacrifice Ratio division" 
            className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none" 
          />
        </div>
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Issue Category</label>
          <select 
            value={issueType} 
            onChange={(e) => setIssueType(e.target.value)} 
            className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none"
          >
            <option value="Concept Mistake">Concept Mistake</option>
            <option value="Calculation Issue">Calculation Issue</option>
            <option value="Incorrect Answer">Incorrect Answer</option>
          </select>
        </div>
        <div className="flex items-end">
          <button type="submit" className="w-full py-2 bg-[#fef0e6] text-[#f04438] hover:opacity-90 font-bold rounded-xl btn-bounce text-xs">
            ⚠️ Add to Mistakes Ledger
          </button>
        </div>
      </form>

      {/* Ledger Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white/50">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-600">
              <th className="p-3">Concept</th>
              <th className="p-3">Issue Category</th>
              <th className="p-3 text-center">Logged On</th>
              <th className="p-3 text-center">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {mistakes.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-slate-400">All cleared! Congrats on great study tracks.</td>
              </tr>
            ) : (
              mistakes.map(m => {
                const resolved = m.status === 'Resolved';
                const statusColor = resolved ? 'bg-[#e6f6ee] text-[#12b76a]' : 'bg-[#fde8ed] text-[#e85876]';
                return (
                  <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50/55 transition">
                    <td className="p-3 font-semibold text-slate-700">{m.concept}</td>
                    <td className="p-3 text-slate-500">{m.issue_type}</td>
                    <td className="p-3 text-center text-slate-400 font-mono">{m.created_at}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${statusColor}`}>
                        {m.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {!resolved ? (
                        <button 
                          onClick={() => resolveMistake(m.id)} 
                          className="px-3 py-1 bg-[#e6f6ee] text-[#12b76a] font-bold rounded-lg text-[10px] transition"
                        >
                          Mark Resolved
                        </button>
                      ) : '-'}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
