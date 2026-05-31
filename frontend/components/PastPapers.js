'use client';

import { useState, useEffect } from 'react';

export default function PastPapers() {
  const [paperType, setPaperType] = useState('ALL');
  const [subject, setSubject] = useState('ALL');
  const [year, setYear] = useState('ALL');
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    // Generate standard CA papers from 2020 to 2026
    const subjects = ["Accounting", "Direct Taxation", "GST"];
    const types = ["PYQ", "RTP", "MTP"];
    const list = [];
    let counter = 1;
    for (let y = 2026; y >= 2020; y--) {
      subjects.forEach(s => {
        types.forEach(t => {
          list.push({
            id: counter++,
            title: `${t} ${s} Examination Set`,
            subject: s,
            paper_type: t,
            year: y
          });
        });
      });
    }
    setPapers(list);
  }, []);

  const filteredPapers = papers.filter(p => {
    return (paperType === 'ALL' || p.paper_type === paperType) &&
           (subject === 'ALL' || p.subject === subject) &&
           (year === 'ALL' || p.year === parseInt(year));
  });

  return (
    <div>
      <h3 className="text-lg font-bold text-slate-700 mb-1">Past Papers Library (PYQ, RTP, MTP)</h3>
      <p className="text-xs text-slate-400 mb-6">Subject and year-wise database spanning 2020 down to the current year 2026</p>

      {/* Filter panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Paper Type</label>
          <select 
            value={paperType} 
            onChange={(e) => setPaperType(e.target.value)} 
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none"
          >
            <option value="ALL">All Paper Types</option>
            <option value="PYQ">Past Papers (PYQ)</option>
            <option value="RTP">Revision Test Papers (RTP)</option>
            <option value="MTP">Mock Test Papers (MTP)</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Subject</label>
          <select 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none"
          >
            <option value="ALL">All Subjects</option>
            <option value="Accounting">Accounting</option>
            <option value="Direct Taxation">Direct Taxation</option>
            <option value="GST">GST</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Year</label>
          <select 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none"
          >
            <option value="ALL">All Years (2020-2026)</option>
            <option value="2026">2026 (Current Term)</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
      </div>

      {/* Database Results Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white/50">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-600">
              <th className="p-3">Paper Title</th>
              <th className="p-3">Subject</th>
              <th className="p-3">Type</th>
              <th class="p-3 text-center">Year</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPapers.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-slate-400">No matching library papers found.</td>
              </tr>
            ) : (
              filteredPapers.slice(0, 8).map(p => {
                let badgeStyle = "bg-[#e3effd] text-[#3a82e9]";
                if (p.paper_type === 'RTP') badgeStyle = "bg-[#f3ebfd] text-[#8c52ff]";
                if (p.paper_type === 'MTP') badgeStyle = "bg-[#e6f6ee] text-[#12b76a]";

                return (
                  <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition">
                    <td className="p-3 font-semibold text-slate-700">{p.title}</td>
                    <td className="p-3 text-slate-500">{p.subject}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold ${badgeStyle}`}>
                        {p.paper_type}
                      </span>
                    </td>
                    <td className="p-3 text-center text-slate-500">{p.year}</td>
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => alert("Downloading PDF files locally.")} 
                        className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-600 rounded-lg border text-[11px] font-bold transition"
                      >
                        Download
                      </button>
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
