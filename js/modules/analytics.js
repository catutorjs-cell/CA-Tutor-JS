// CA JS Performance Analytics Module — Premium Redesign
import { State } from '../state.js';
import { SYLLABUS_DATA } from '../seedData.js';

export const AnalyticsModule = {
  render(container) {
    const accuracy = this.calculateAccuracy();
    const mockAverage = this.calculateMockAverage();
    const consistencyGridHtml = this.generateConsistencyGrid();
    const examReadiness = State.getReadinessPercentage();

    const level = State.user?.examLevel || 'Intermediate';

    // Calculate Exam Revision Progress percentage
    let examPercent = 0;
    let examCompleted = 0;
    let examTotal = 0;
    if (State.calendar && State.calendar.schedule.length > 0) {
      examTotal = State.calendar.schedule.length;
      examCompleted = State.calendar.schedule.filter(item => item.done).length;
      examPercent = Math.round((examCompleted / examTotal) * 100);
    }

    // Calculate Total Revision Completion checklist percentage
    const subjectsList = SYLLABUS_DATA[level] || [];
    let totalChapters = 0;
    let checkedRevs = 0;
    let r1Count = 0, r2Count = 0, r3Count = 0;
    subjectsList.forEach(sub => {
      sub.chapters.forEach(ch => {
        totalChapters++;
        const rev = State.revisions[ch.id];
        if (rev) {
          if (rev.r1) { checkedRevs++; r1Count++; }
          if (rev.r2) { checkedRevs++; r2Count++; }
          if (rev.r3) { checkedRevs++; r3Count++; }
        }
      });
    });
    const checklistPercent = totalChapters > 0 ? Math.round((checkedRevs / (totalChapters * 3)) * 100) : 0;

    // Calculate syllabus completion
    let completedChapCount = 0;
    subjectsList.forEach(sub => {
      sub.chapters.forEach(ch => {
        if (State.completedChapters[ch.id]) completedChapCount++;
      });
    });
    const syllabusPercent = totalChapters > 0 ? Math.round((completedChapCount / totalChapters) * 100) : 0;

    // Subjects database mapping
    const subjects = {
      Foundation: [
        "Paper-1: Accounting (May 2026 Scheme)",
        "Paper-2: Business Laws (May 2026 Scheme)",
        "Paper-3: Quantitative Aptitude (May 2026 Scheme)",
        "Paper-4: Business Economics (May 2026 Scheme)"
      ],
      Intermediate: [
        "Paper-1: Advanced Accounting (May 2026 Scheme)",
        "Paper-2: Corporate and Other Laws (May 2026 Scheme)",
        "Paper-3A: Income-tax Law (May 2026 Scheme)",
        "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)",
        "Paper-4: Cost and Management Accounting (May 2026 Scheme)",
        "Paper-5: Auditing and Ethics (May 2026 Scheme)",
        "Paper-6A: Financial Management (May 2026 Scheme)",
        "Paper-6B: Strategic Management (May 2026 Scheme)"
      ],
      Final: [
        "Paper-1: Financial Reporting (May 2026 Scheme)",
        "Paper-2: Advanced Financial Management (May 2026 Scheme)",
        "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)",
        "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)",
        "Paper-5: Indirect Tax Laws (May 2026 Scheme)",
        "Paper-6: Integrated Business Solutions (May 2026 Scheme)"
      ]
    }[level] || [];

    // Helper to get short subject display name
    const getShortSubjectName = (name) => {
      if (name.includes("Advanced Accounting")) return "Adv Acc";
      if (name.includes("Accounting")) return "Accounting";
      if (name.includes("Quantitative Aptitude")) return "Quant Apt";
      if (name.includes("Business Economics")) return "Biz Eco";
      if (name.includes("Laws") || name.includes("Law")) return "Business Law";
      if (name.includes("Income-tax")) return "Income Tax";
      if (name.includes("GST") || name.includes("Goods and Services Tax")) return "GST";
      if (name.includes("Cost")) return "Costing";
      if (name.includes("Auditing")) return "Auditing";
      if (name.includes("Financial Management") && name.includes("6A")) return "FM";
      if (name.includes("Strategic Management") && name.includes("6B")) return "SM";
      if (name.includes("Financial Reporting")) return "FR";
      if (name.includes("Advanced Financial Management") || name.includes("Financial Management")) return "AFM";
      if (name.includes("Auditing")) return "Audit";
      if (name.includes("Direct Tax")) return "DT";
      if (name.includes("Indirect Tax")) return "IDT";
      if (name.includes("Integrated Business")) return "IBS";
      return name;
    };

    // Dynamic readiness probability indicators
    let probabilityText = '';
    let probabilityEmoji = '';
    let probabilityColor = '';
    let probabilityBg = '';
    if (examReadiness >= 65) {
      probabilityText = 'High Probability of Success';
      probabilityEmoji = '🟢';
      probabilityColor = 'var(--pastel-green-dark, hsl(142, 50%, 45%))';
      probabilityBg = 'linear-gradient(135deg, hsl(142, 60%, 92%), hsl(160, 50%, 90%))';
    } else if (examReadiness >= 40) {
      probabilityText = 'Moderate Probability';
      probabilityEmoji = '🟡';
      probabilityColor = 'var(--pastel-peach-dark, hsl(40, 60%, 45%))';
      probabilityBg = 'linear-gradient(135deg, hsl(40, 70%, 92%), hsl(30, 60%, 90%))';
    } else {
      probabilityText = 'Focus Required';
      probabilityEmoji = '🔴';
      probabilityColor = 'var(--pastel-rose-dark, hsl(355, 60%, 45%))';
      probabilityBg = 'linear-gradient(135deg, hsl(355, 65%, 93%), hsl(340, 50%, 91%))';
    }

    // ═══════════════════════════════════════════════
    // 1. HERO STAT CARDS — Bento-Grid KPI Row
    // ═══════════════════════════════════════════════
    const heroStats = [
      {
        label: 'Exam Readiness',
        value: `${examReadiness}%`,
        sub: probabilityText,
        icon: '🎯',
        gradient: 'linear-gradient(135deg, hsl(268, 55%, 52%), hsl(212, 55%, 50%))',
        lightBg: 'linear-gradient(135deg, hsl(268, 70%, 95%), hsl(212, 70%, 94%))',
        accent: 'var(--pastel-purple-dark)'
      },
      {
        label: 'Accuracy Rate',
        value: `${accuracy}%`,
        sub: `${State.mistakes.filter(m => m.resolved).length} / ${State.mistakes.length} Resolved`,
        icon: '✅',
        gradient: 'linear-gradient(135deg, hsl(142, 50%, 42%), hsl(160, 55%, 48%))',
        lightBg: 'linear-gradient(135deg, hsl(142, 55%, 94%), hsl(160, 50%, 92%))',
        accent: 'var(--pastel-green-dark)'
      },
      {
        label: 'Mock Average',
        value: `${mockAverage}%`,
        sub: `${State.papers.length} Papers Solved`,
        icon: '📝',
        gradient: 'linear-gradient(135deg, hsl(212, 55%, 48%), hsl(230, 50%, 55%))',
        lightBg: 'linear-gradient(135deg, hsl(212, 65%, 94%), hsl(230, 55%, 93%))',
        accent: 'var(--pastel-blue-dark)'
      },
      {
        label: 'Study Streak',
        value: `${State.studyStats.streak}`,
        sub: `${State.studyStats.totalMinutes} Mins Total`,
        icon: '🔥',
        gradient: 'linear-gradient(135deg, hsl(24, 70%, 50%), hsl(350, 55%, 52%))',
        lightBg: 'linear-gradient(135deg, hsl(24, 75%, 93%), hsl(350, 60%, 93%))',
        accent: 'var(--pastel-peach-dark)'
      }
    ];

    const heroCardsHtml = heroStats.map((stat, idx) => `
      <div class="ana-hero-card" style="--card-gradient: ${stat.gradient}; --card-bg: ${stat.lightBg}; --card-accent: ${stat.accent}; animation-delay: ${idx * 80}ms;">
        <div class="ana-hero-icon">${stat.icon}</div>
        <div class="ana-hero-content">
          <span class="ana-hero-label">${stat.label}</span>
          <span class="ana-hero-value">${stat.value}</span>
          <span class="ana-hero-sub">${stat.sub}</span>
        </div>
        <div class="ana-hero-bar">
          <div class="ana-hero-bar-fill" style="width: ${parseInt(stat.value) || 0}%; background: ${stat.gradient};"></div>
        </div>
      </div>
    `).join('');

    // ═══════════════════════════════════════════════
    // 2. RADIAL GAUGE — Exam Readiness Center Piece
    // ═══════════════════════════════════════════════
    const gaugeRadius = 80;
    const gaugeCircumference = 2 * Math.PI * gaugeRadius;
    const gaugeOffset = gaugeCircumference - (examReadiness / 100) * gaugeCircumference;

    const readinessGaugeHtml = `
      <div class="ana-gauge-container">
        <svg width="200" height="200" viewBox="0 0 200 200" class="ana-gauge-svg">
          <defs>
            <linearGradient id="ana-gauge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="hsl(268, 65%, 58%)" />
              <stop offset="50%" stop-color="hsl(212, 60%, 52%)" />
              <stop offset="100%" stop-color="hsl(160, 55%, 48%)" />
            </linearGradient>
            <filter id="ana-gauge-glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="100" cy="100" r="${gaugeRadius}" stroke="rgba(0,0,0,0.04)" stroke-width="12" fill="transparent"/>
          <circle id="ana-main-gauge" cx="100" cy="100" r="${gaugeRadius}" stroke="url(#ana-gauge-grad)" stroke-width="12" fill="transparent"
            stroke-linecap="round" filter="url(#ana-gauge-glow)"
            style="transform: rotate(-90deg); transform-origin: 50% 50%; stroke-dasharray: ${gaugeCircumference}; stroke-dashoffset: ${gaugeCircumference}; transition: stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1);" />
        </svg>
        <div class="ana-gauge-center">
          <span class="ana-gauge-value">${examReadiness}%</span>
          <span class="ana-gauge-label">Readiness</span>
        </div>
      </div>
    `;

    // ═══════════════════════════════════════════════
    // 3. SUBJECT RADAR CHART — Spider Graph
    // ═══════════════════════════════════════════════
    const radarSize = 240;
    const radarCenter = radarSize / 2;
    const radarRadius = 90;
    const subjectReadiness = subjects.map(sub => ({
      name: getShortSubjectName(sub),
      fullName: sub,
      value: State.getReadinessPercentage(sub)
    }));

    let radarHtml = '';
    if (subjectReadiness.length >= 3) {
      const angleStep = (2 * Math.PI) / subjectReadiness.length;

      // Grid rings
      const gridRings = [0.25, 0.5, 0.75, 1.0].map(scale => {
        const r = radarRadius * scale;
        const pts = subjectReadiness.map((_, i) => {
          const angle = -Math.PI / 2 + i * angleStep;
          return `${radarCenter + r * Math.cos(angle)},${radarCenter + r * Math.sin(angle)}`;
        }).join(' ');
        return `<polygon points="${pts}" fill="none" stroke="rgba(0,0,0,0.06)" stroke-width="1" />`;
      }).join('');

      // Axis lines
      const axisLines = subjectReadiness.map((_, i) => {
        const angle = -Math.PI / 2 + i * angleStep;
        const x = radarCenter + radarRadius * Math.cos(angle);
        const y = radarCenter + radarRadius * Math.sin(angle);
        return `<line x1="${radarCenter}" y1="${radarCenter}" x2="${x}" y2="${y}" stroke="rgba(0,0,0,0.06)" stroke-width="1" />`;
      }).join('');

      // Data polygon
      const dataPts = subjectReadiness.map((sub, i) => {
        const angle = -Math.PI / 2 + i * angleStep;
        const r = radarRadius * (sub.value / 100);
        return `${radarCenter + r * Math.cos(angle)},${radarCenter + r * Math.sin(angle)}`;
      }).join(' ');

      // Data dots and labels
      const dataDots = subjectReadiness.map((sub, i) => {
        const angle = -Math.PI / 2 + i * angleStep;
        const r = radarRadius * (sub.value / 100);
        const cx = radarCenter + r * Math.cos(angle);
        const cy = radarCenter + r * Math.sin(angle);
        const lx = radarCenter + (radarRadius + 18) * Math.cos(angle);
        const ly = radarCenter + (radarRadius + 18) * Math.sin(angle);
        const anchor = Math.abs(Math.cos(angle)) < 0.1 ? 'middle' : Math.cos(angle) > 0 ? 'start' : 'end';
        return `
          <circle cx="${cx}" cy="${cy}" r="4" fill="white" stroke="hsl(268, 55%, 52%)" stroke-width="2.5" />
          <text x="${lx}" y="${ly}" text-anchor="${anchor}" dominant-baseline="middle" font-size="9" font-weight="700" fill="var(--text-muted)">${sub.name}</text>
        `;
      }).join('');

      radarHtml = `
        <svg width="100%" height="100%" viewBox="0 0 ${radarSize} ${radarSize}" style="overflow: visible;">
          <defs>
            <linearGradient id="radar-fill-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="hsl(268, 65%, 65%)" stop-opacity="0.25" />
              <stop offset="100%" stop-color="hsl(212, 65%, 60%)" stop-opacity="0.15" />
            </linearGradient>
            <linearGradient id="radar-stroke-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="hsl(268, 55%, 52%)" />
              <stop offset="100%" stop-color="hsl(212, 55%, 50%)" />
            </linearGradient>
          </defs>
          ${gridRings}
          ${axisLines}
          <polygon points="${dataPts}" fill="url(#radar-fill-grad)" stroke="url(#radar-stroke-grad)" stroke-width="2.5" stroke-linejoin="round" />
          ${dataDots}
        </svg>
      `;
    }

    // ═══════════════════════════════════════════════
    // 4. TREND LINE CHART — Mock Test Score Trend
    // ═══════════════════════════════════════════════
    const sortedPapers = [...State.papers].sort((a, b) => new Date(a.date) - new Date(b.date));
    let points = [];
    let chartWarningHtml = '';
    let isSimulated = false;

    if (sortedPapers.length === 0) {
      isSimulated = true;
      chartWarningHtml = `
        <div class="ana-chart-badge">
          <span class="ana-chart-badge-dot"></span>
          <span>Diagnostic Guide Trend</span>
        </div>
      `;
      points = [
        { label: "Diagnostic A", percent: 45, dateStr: "Yesterday" },
        { label: "Diagnostic B", percent: 58, dateStr: "Today" },
        { label: "Diagnostic C", percent: 62, dateStr: "Scheduled" },
        { label: "Diagnostic D", percent: 78, dateStr: "Target" }
      ];
    } else {
      points = sortedPapers.map((paper) => {
        const percent = Math.round((paper.score / paper.total) * 100);
        const dateStr = new Date(paper.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return { label: paper.type || "Mock", percent, dateStr };
      });
    }

    const svgWidth = 520;
    const svgHeight = 200;
    const paddingLeft = 45;
    const paddingRight = 25;
    const paddingTop = 30;
    const paddingBottom = 45;
    const graphWidth = svgWidth - paddingLeft - paddingRight;
    const graphHeight = svgHeight - paddingTop - paddingBottom;

    const gridLinesHtml = [0, 25, 50, 75, 100].map(score => {
      const y = svgHeight - paddingBottom - (score / 100) * graphHeight;
      return `
        <line x1="${paddingLeft}" y1="${y}" x2="${svgWidth - paddingRight}" y2="${y}" stroke="rgba(0,0,0,0.05)" stroke-dasharray="5 5" stroke-width="0.8" />
        <text x="${paddingLeft - 12}" y="${y + 3}" font-size="9" font-weight="600" fill="var(--text-muted)" text-anchor="end" opacity="0.7">${score}</text>
      `;
    }).join('');

    const coords = points.map((p, idx) => {
      const x = paddingLeft + (points.length > 1 ? (idx / (points.length - 1)) * graphWidth : graphWidth / 2);
      const y = svgHeight - paddingBottom - (p.percent / 100) * graphHeight;
      return { ...p, x, y };
    });

    // Smooth curve path using catmull-rom spline approximation
    let curvePath = '';
    if (coords.length > 1) {
      curvePath = `M ${coords[0].x},${coords[0].y}`;
      for (let i = 0; i < coords.length - 1; i++) {
        const p0 = coords[Math.max(0, i - 1)];
        const p1 = coords[i];
        const p2 = coords[i + 1];
        const p3 = coords[Math.min(coords.length - 1, i + 2)];
        const cp1x = p1.x + (p2.x - p0.x) / 6;
        const cp1y = p1.y + (p2.y - p0.y) / 6;
        const cp2x = p2.x - (p3.x - p1.x) / 6;
        const cp2y = p2.y - (p3.y - p1.y) / 6;
        curvePath += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
      }
    }

    let areaPath = '';
    if (coords.length > 0) {
      const first = coords[0];
      const last = coords[coords.length - 1];
      areaPath = `${curvePath} L ${last.x},${svgHeight - paddingBottom} L ${first.x},${svgHeight - paddingBottom} Z`;
    }

    const nodesHtml = coords.map((c) => {
      const clickAction = isSimulated
        ? `alert('Diagnostic Guide: ${c.label} (${c.percent}%). Attempt interactive past papers in PYQ explorer to plot actual points live!')`
        : `alert('Exam Attempt: ${c.label} solved on ${c.dateStr}. Score: ${c.percent}%')`;

      return `
        <circle cx="${c.x}" cy="${c.y}" r="5" fill="white" stroke="url(#trend-line-grad)" stroke-width="2.5" class="ana-trend-dot" style="cursor:pointer;" onclick="${clickAction}">
          <title>${c.label}: ${c.percent}% (${c.dateStr})</title>
        </circle>
        <text x="${c.x}" y="${c.y - 12}" font-size="10" font-weight="800" fill="var(--pastel-purple-dark)" text-anchor="middle">${c.percent}%</text>
        <text x="${c.x}" y="${svgHeight - 26}" font-size="8.5" font-weight="600" fill="var(--text-muted)" text-anchor="middle">${c.label}</text>
        <text x="${c.x}" y="${svgHeight - 14}" font-size="7.5" fill="var(--text-muted)" opacity="0.65" text-anchor="middle">${c.dateStr}</text>
      `;
    }).join('');

    const trendChartSvg = `
      <svg viewBox="0 0 ${svgWidth} ${svgHeight}" width="100%" height="100%" style="overflow:visible;">
        <defs>
          <linearGradient id="trend-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="hsl(268, 65%, 65%)" stop-opacity="0.20"/>
            <stop offset="100%" stop-color="hsl(268, 65%, 65%)" stop-opacity="0.0"/>
          </linearGradient>
          <linearGradient id="trend-line-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="hsl(268, 55%, 52%)"/>
            <stop offset="100%" stop-color="hsl(212, 55%, 50%)"/>
          </linearGradient>
        </defs>
        
        <line x1="${paddingLeft}" y1="${paddingTop}" x2="${paddingLeft}" y2="${svgHeight - paddingBottom}" stroke="rgba(0,0,0,0.06)" stroke-width="1" />
        <line x1="${paddingLeft}" y1="${svgHeight - paddingBottom}" x2="${svgWidth - paddingRight}" y2="${svgHeight - paddingBottom}" stroke="rgba(0,0,0,0.06)" stroke-width="1" />
        
        ${gridLinesHtml}
        ${coords.length > 0 ? `<path d="M ${coords[0].x},${svgHeight - paddingBottom} ${curvePath.replace('M ' + coords[0].x + ',' + coords[0].y, 'L ' + coords[0].x + ',' + coords[0].y)} L ${coords[coords.length-1].x},${svgHeight - paddingBottom} Z" fill="url(#trend-area-grad)" />` : ''}
        ${coords.length > 1 ? `<path d="${curvePath}" fill="none" stroke="url(#trend-line-grad)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />` : ''}
        ${nodesHtml}
      </svg>
    `;

    // ═══════════════════════════════════════════════
    // 5. SUBJECT HORIZONTAL BARS — Modern bar chart
    // ═══════════════════════════════════════════════
    const subjectBarsHtml = subjectReadiness.map((sub, idx) => {
      let barColor = '';
      if (sub.value >= 70) barColor = 'linear-gradient(90deg, hsl(142, 55%, 52%), hsl(160, 50%, 55%))';
      else if (sub.value >= 50) barColor = 'linear-gradient(90deg, hsl(40, 70%, 55%), hsl(30, 65%, 58%))';
      else barColor = 'linear-gradient(90deg, hsl(355, 60%, 60%), hsl(340, 55%, 62%))';

      return `
        <div class="ana-subbar-row" style="animation-delay: ${idx * 60}ms;">
          <div class="ana-subbar-label">${sub.name}</div>
          <div class="ana-subbar-track">
            <div class="ana-subbar-fill" style="width: 0%; background: ${barColor};" data-target-width="${sub.value}%"></div>
          </div>
          <div class="ana-subbar-value" style="color: ${sub.value >= 70 ? 'var(--pastel-green-dark)' : sub.value >= 50 ? 'var(--pastel-peach-dark)' : 'var(--pastel-rose-dark)'};">${sub.value}%</div>
        </div>
      `;
    }).join('');

    // ═══════════════════════════════════════════════
    // 6. REVISION BREAKDOWN — Mini donut
    // ═══════════════════════════════════════════════
    const totalRevSlots = totalChapters * 3;
    const revPercent = totalRevSlots > 0 ? Math.round((checkedRevs / totalRevSlots) * 100) : 0;
    const donutR = 36;
    const donutCirc = 2 * Math.PI * donutR;

    // ═══════════════════════════════════════════════
    // 7. STUDY INSIGHTS — Smart AI summary
    // ═══════════════════════════════════════════════
    const insights = this.generateInsights(examReadiness, accuracy, mockAverage, syllabusPercent, checklistPercent, examPercent);

    // ═══════════════════════════════════════════════
    // RENDER COMPLETE HTML
    // ═══════════════════════════════════════════════
    container.innerHTML = `
      <style>
        /* ═══ Analytics Premium Styles ═══ */
        .ana-page { animation: fadeIn 0.4s ease-out; }

        /* Hero KPI Cards */
        .ana-hero-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        .ana-hero-card {
          background: var(--card-bg);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 18px;
          padding: 18px 16px 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          animation: anaCardSlideUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) both;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease;
        }
        .ana-hero-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.07);
        }
        .ana-hero-icon {
          font-size: 28px;
          line-height: 1;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }
        .ana-hero-content {
          display: flex;
          flex-direction: column;
        }
        .ana-hero-label {
          font-size: 10.5px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }
        .ana-hero-value {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 26px;
          background: var(--card-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.15;
        }
        .ana-hero-sub {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 500;
        }
        .ana-hero-bar {
          height: 4px;
          background: rgba(0,0,0,0.04);
          border-radius: 4px;
          overflow: hidden;
          margin-top: 4px;
        }
        .ana-hero-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes anaCardSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Bento Grid Main */
        .ana-bento-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          grid-template-rows: auto auto;
          gap: 20px;
        }

        /* Gauge Card */
        .ana-gauge-card {
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          border: var(--glass-border);
          border-radius: 22px;
          box-shadow: var(--glass-shadow);
          padding: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: var(--transition-bounce);
        }
        .ana-gauge-card:hover { transform: translateY(-4px); background: var(--glass-bg-hover); }

        .ana-gauge-container {
          position: relative;
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ana-gauge-svg { position: absolute; top: 0; left: 0; }
        .ana-gauge-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .ana-gauge-value {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 38px;
          background: linear-gradient(135deg, hsl(268, 55%, 52%), hsl(212, 55%, 50%));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ana-gauge-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .ana-gauge-status {
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ana-gauge-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          width: 100%;
        }
        .ana-gauge-meta-item {
          text-align: center;
          padding: 10px;
          background: rgba(0,0,0,0.02);
          border-radius: 12px;
        }
        .ana-gauge-meta-val {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 16px;
          display: block;
        }
        .ana-gauge-meta-lbl {
          font-size: 9.5px;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        /* Trend Chart Card */
        .ana-trend-card {
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          border: var(--glass-border);
          border-radius: 22px;
          box-shadow: var(--glass-shadow);
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: var(--transition-bounce);
        }
        .ana-trend-card:hover { transform: translateY(-4px); background: var(--glass-bg-hover); }

        .ana-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ana-section-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 16px;
          background: linear-gradient(135deg, var(--pastel-purple-dark), var(--pastel-blue-dark));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .ana-section-subtitle {
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .ana-chart-badge {
          background: rgba(217, 179, 255, 0.15);
          border: 1px dashed var(--pastel-purple);
          padding: 4px 12px;
          border-radius: 10px;
          font-size: 10px;
          color: var(--pastel-purple-dark);
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
        }
        .ana-chart-badge-dot {
          width: 6px;
          height: 6px;
          background: var(--pastel-purple-dark);
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .ana-trend-svg-wrap {
          width: 100%;
          height: 200px;
          background: rgba(255,255,255,0.25);
          border: 1px solid rgba(0,0,0,0.02);
          border-radius: 14px;
          padding: 8px 12px;
          box-sizing: border-box;
        }
        .ana-trend-dot {
          transition: r 0.2s ease, fill 0.2s ease;
        }
        .ana-trend-dot:hover {
          r: 8px;
          fill: var(--pastel-purple-dark) !important;
        }

        /* Radar Card */
        .ana-radar-card {
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          border: var(--glass-border);
          border-radius: 22px;
          box-shadow: var(--glass-shadow);
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: var(--transition-bounce);
        }
        .ana-radar-card:hover { transform: translateY(-4px); background: var(--glass-bg-hover); }

        .ana-radar-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }

        /* Subject Bars Card */
        .ana-bars-card {
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          border: var(--glass-border);
          border-radius: 22px;
          box-shadow: var(--glass-shadow);
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: var(--transition-bounce);
        }
        .ana-bars-card:hover { transform: translateY(-4px); background: var(--glass-bg-hover); }

        .ana-subbar-row {
          display: flex;
          align-items: center;
          gap: 12px;
          animation: anaCardSlideUp 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) both;
        }
        .ana-subbar-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-main);
          min-width: 80px;
          text-align: right;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ana-subbar-track {
          flex: 1;
          height: 8px;
          background: rgba(0,0,0,0.04);
          border-radius: 8px;
          overflow: hidden;
        }
        .ana-subbar-fill {
          height: 100%;
          border-radius: 8px;
          transition: width 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        .ana-subbar-value {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 12px;
          min-width: 36px;
          text-align: right;
        }

        /* Bottom Row: Calendar + Stats + Insights */
        .ana-bottom-row {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          margin-top: 20px;
        }

        .ana-calendar-card {
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          border: var(--glass-border);
          border-radius: 22px;
          box-shadow: var(--glass-shadow);
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: var(--transition-bounce);
        }
        .ana-calendar-card:hover { transform: translateY(-4px); background: var(--glass-bg-hover); }

        /* Stats mini cards grid */
        .ana-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          border-top: 1px solid rgba(0,0,0,0.04);
          padding-top: 14px;
        }
        .ana-stat-mini {
          text-align: center;
          padding: 8px 4px;
        }
        .ana-stat-mini-val {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 18px;
          background: linear-gradient(135deg, var(--pastel-purple-dark), var(--pastel-blue-dark));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: block;
        }
        .ana-stat-mini-lbl {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
          margin-top: 2px;
        }

        /* Insights Card */
        .ana-insights-card {
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          border: var(--glass-border);
          border-radius: 22px;
          box-shadow: var(--glass-shadow);
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: var(--transition-bounce);
        }
        .ana-insights-card:hover { transform: translateY(-4px); background: var(--glass-bg-hover); }

        .ana-insight-item {
          padding: 10px 14px;
          background: rgba(0,0,0,0.015);
          border-radius: 12px;
          border-left: 3px solid;
          font-size: 12.5px;
          line-height: 1.5;
          color: var(--text-main);
          transition: background 0.2s ease;
        }
        .ana-insight-item:hover {
          background: rgba(0,0,0,0.03);
        }
        .ana-insight-item strong {
          font-weight: 700;
        }

        /* Revision donut */
        .ana-donut-section {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 14px 0;
        }
        .ana-donut-wrap {
          position: relative;
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ana-donut-center {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ana-donut-pct {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 18px;
          color: var(--pastel-green-dark);
        }
        .ana-donut-lbl {
          font-size: 8px;
          color: var(--text-muted);
          font-weight: 700;
          text-transform: uppercase;
        }
        .ana-donut-legend {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .ana-donut-legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-main);
        }
        .ana-donut-legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 3px;
          flex-shrink: 0;
        }

        /* Grid Legend */
        .ana-grid-legend {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10px;
          color: var(--text-muted);
          padding: 0 10px;
        }
        .ana-grid-legend-levels {
          display: flex;
          gap: 3px;
          align-items: center;
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .ana-hero-grid { grid-template-columns: repeat(2, 1fr); }
          .ana-bento-grid { grid-template-columns: 1fr; }
          .ana-bottom-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 700px) {
          .ana-hero-grid { grid-template-columns: 1fr; }
        }
      </style>

      <div class="ana-page">
        <!-- Header -->
        <header class="app-header">
          <div class="header-title-container">
            <h1 class="header-branding">Study Performance Analytics</h1>
            <span class="header-subtitle">Deep insights into your study habits, consistency, and exam readiness</span>
          </div>
        </header>

        <!-- Hero KPI Row -->
        <div class="ana-hero-grid">
          ${heroCardsHtml}
        </div>

        <!-- Bento Main Grid -->
        <div class="ana-bento-grid">
          <!-- Left: Readiness Gauge + Revision Donut -->
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <!-- Readiness Gauge -->
            <div class="ana-gauge-card">
              ${readinessGaugeHtml}
              <div class="ana-gauge-status" style="background: ${probabilityBg}; color: ${probabilityColor};">
                ${probabilityEmoji} ${probabilityText}
              </div>
              <div class="ana-gauge-meta">
                <div class="ana-gauge-meta-item">
                  <span class="ana-gauge-meta-val" style="color: var(--pastel-purple-dark);">${syllabusPercent}%</span>
                  <span class="ana-gauge-meta-lbl">Syllabus</span>
                </div>
                <div class="ana-gauge-meta-item">
                  <span class="ana-gauge-meta-val" style="color: var(--pastel-peach-dark);">${examPercent}%</span>
                  <span class="ana-gauge-meta-lbl">Calendar</span>
                </div>
              </div>
            </div>

            <!-- Revision Donut -->
            <div class="ana-bars-card">
              <div class="ana-section-header">
                <div>
                  <div class="ana-section-title">Revision Progress</div>
                  <div class="ana-section-subtitle">R1, R2 & R3 completion breakdown</div>
                </div>
              </div>
              <div class="ana-donut-section">
                <div class="ana-donut-wrap">
                  <svg width="90" height="90" viewBox="0 0 90 90">
                    <defs>
                      <linearGradient id="donut-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="hsl(142, 50%, 45%)" />
                        <stop offset="100%" stop-color="hsl(160, 60%, 50%)" />
                      </linearGradient>
                    </defs>
                    <circle cx="45" cy="45" r="${donutR}" stroke="rgba(0,0,0,0.04)" stroke-width="10" fill="transparent"/>
                    <circle id="ana-rev-donut" cx="45" cy="45" r="${donutR}" stroke="url(#donut-grad)" stroke-width="10" fill="transparent"
                      stroke-linecap="round"
                      style="transform: rotate(-90deg); transform-origin: 50% 50%; stroke-dasharray: ${donutCirc}; stroke-dashoffset: ${donutCirc}; transition: stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1);" />
                  </svg>
                  <div class="ana-donut-center">
                    <span class="ana-donut-pct">${revPercent}%</span>
                    <span class="ana-donut-lbl">Complete</span>
                  </div>
                </div>
                <div class="ana-donut-legend">
                  <div class="ana-donut-legend-item">
                    <span class="ana-donut-legend-dot" style="background: hsl(268, 55%, 65%);"></span>
                    R1: ${r1Count} / ${totalChapters}
                  </div>
                  <div class="ana-donut-legend-item">
                    <span class="ana-donut-legend-dot" style="background: hsl(212, 55%, 55%);"></span>
                    R2: ${r2Count} / ${totalChapters}
                  </div>
                  <div class="ana-donut-legend-item">
                    <span class="ana-donut-legend-dot" style="background: hsl(160, 50%, 50%);"></span>
                    R3: ${r3Count} / ${totalChapters}
                  </div>
                  <div class="ana-donut-legend-item" style="margin-top: 4px; font-weight: 800; color: var(--pastel-green-dark);">
                    <span class="ana-donut-legend-dot" style="background: var(--pastel-green-dark);"></span>
                    Total: ${checkedRevs} / ${totalRevSlots}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Trend + Radar/Bars -->
          <div style="display: flex; flex-direction: column; gap: 20px;">
            <!-- Trend Chart -->
            <div class="ana-trend-card">
              <div class="ana-section-header">
                <div>
                  <div class="ana-section-title">Mock Test Score Trend</div>
                  <div class="ana-section-subtitle">Chronological performance curve across exam papers</div>
                </div>
                ${chartWarningHtml}
              </div>
              <div class="ana-trend-svg-wrap">
                ${trendChartSvg}
              </div>
            </div>

            <!-- Radar + Subject Bars Side by Side -->
            <div style="display: grid; grid-template-columns: ${subjectReadiness.length >= 3 ? '1fr 1fr' : '1fr'}; gap: 20px;">
              ${subjectReadiness.length >= 3 ? `
              <!-- Radar Chart -->
              <div class="ana-radar-card">
                <div class="ana-section-header">
                  <div>
                    <div class="ana-section-title">Subject Mastery</div>
                    <div class="ana-section-subtitle">Radar view of balanced preparation</div>
                  </div>
                </div>
                <div class="ana-radar-wrap">
                  ${radarHtml}
                </div>
              </div>
              ` : ''}

              <!-- Subject Bars -->
              <div class="ana-bars-card">
                <div class="ana-section-header">
                  <div>
                    <div class="ana-section-title">Subject Readiness</div>
                    <div class="ana-section-subtitle">Weighted completion & revision stats</div>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  ${subjectBarsHtml}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Row: Calendar Heatmap + Insights -->
        <div class="ana-bottom-row">
          <!-- Calendar Heatmap -->
          <div class="ana-calendar-card">
            <div class="ana-section-header">
              <div>
                <div class="ana-section-title">Study Consistency Calendar</div>
                <div class="ana-section-subtitle">Tracked hours of daily Pomodoro and syllabus studying. Darker blocks = higher volume.</div>
              </div>
            </div>

            <div class="grid-container">
              <div class="calendar-grid-svg">
                ${consistencyGridHtml}
              </div>
              <div class="ana-grid-legend">
                <span>84 Days study log</span>
                <div class="ana-grid-legend-levels">
                  <span>Less</span>
                  <span class="grid-cell" style="width:10px; height:10px;" data-level="0"></span>
                  <span class="grid-cell" style="width:10px; height:10px;" data-level="1"></span>
                  <span class="grid-cell" style="width:10px; height:10px;" data-level="2"></span>
                  <span class="grid-cell" style="width:10px; height:10px;" data-level="3"></span>
                  <span class="grid-cell" style="width:10px; height:10px;" data-level="4"></span>
                  <span>More</span>
                </div>
              </div>
            </div>

            <div class="ana-stats-grid">
              <div class="ana-stat-mini">
                <span class="ana-stat-mini-val">${State.studyStats.totalMinutes} Min</span>
                <div class="ana-stat-mini-lbl">Total Study Volume</div>
              </div>
              <div class="ana-stat-mini">
                <span class="ana-stat-mini-val">${Object.keys(State.studyStats.dailyMinutes).length} Days</span>
                <div class="ana-stat-mini-lbl">Active Study Days</div>
              </div>
              <div class="ana-stat-mini">
                <span class="ana-stat-mini-val">${State.studyStats.streak} Days</span>
                <div class="ana-stat-mini-lbl">Consistency Streak</div>
              </div>
            </div>
          </div>

          <!-- Insights Panel -->
          <div class="ana-insights-card">
            <div class="ana-section-header">
              <div>
                <div class="ana-section-title">📊 Study Insights</div>
                <div class="ana-section-subtitle">AI-powered observations</div>
              </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${insights}
            </div>
          </div>
        </div>
      </div>
    `;

    // ═══════════════════════════════════════════════
    // POST-RENDER ANIMATIONS
    // ═══════════════════════════════════════════════
    setTimeout(() => {
      // Animate main gauge
      const mainGauge = container.querySelector('#ana-main-gauge');
      if (mainGauge) {
        mainGauge.style.strokeDashoffset = gaugeOffset;
      }

      // Animate revision donut
      const revDonut = container.querySelector('#ana-rev-donut');
      if (revDonut) {
        const offset = donutCirc - (revPercent / 100) * donutCirc;
        revDonut.style.strokeDashoffset = offset;
      }

      // Animate subject bars
      const bars = container.querySelectorAll('.ana-subbar-fill');
      bars.forEach(bar => {
        const target = bar.getAttribute('data-target-width');
        bar.style.width = target;
      });
    }, 80);
  },

  calculateAccuracy() {
    const totalMistakes = State.mistakes.length;
    if (totalMistakes === 0) return 100; // Flawless start default
    const resolved = State.mistakes.filter(m => m.resolved).length;
    return Math.round((resolved / totalMistakes) * 100);
  },

  calculateMockAverage() {
    if (State.papers.length === 0) return 0;
    
    let totalScorePercent = 0;
    State.papers.forEach(p => {
      totalScorePercent += (p.score / p.total) * 100;
    });

    return Math.round(totalScorePercent / State.papers.length);
  },

  generateConsistencyGrid() {
    const dailyMinutes = State.studyStats.dailyMinutes || {};
    const cells = [];
    const dateCursor = new Date();
    
    dateCursor.setDate(dateCursor.getDate() - 83);

    for (let day = 0; day < 84; day++) {
      const dateStr = dateCursor.toISOString().split('T')[0];
      const minutes = dailyMinutes[dateStr] || 0;
      
      let level = 0;
      if (minutes > 0 && minutes <= 15) level = 1;
      else if (minutes > 15 && minutes <= 30) level = 2;
      else if (minutes > 30 && minutes <= 45) level = 3;
      else if (minutes > 45) level = 4;

      const dateLabel = dateCursor.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const tooltip = `${dateLabel}: ${minutes} study minutes logged`;

      cells.push(`
        <span class="grid-cell" data-level="${level}" data-tooltip="${tooltip}" onclick="alert('${tooltip}')"></span>
      `);

      dateCursor.setDate(dateCursor.getDate() + 1);
    }

    return cells.join('');
  },

  generateInsights(readiness, accuracy, mockAvg, syllabusPercent, revPercent, examRevPercent) {
    const items = [];

    // Readiness insight
    if (readiness >= 65) {
      items.push({ color: 'var(--pastel-green-dark)', emoji: '🎯', text: `<strong>Strong readiness at ${readiness}%.</strong> You're well-positioned for exam success. Keep maintaining your revision streak.` });
    } else if (readiness >= 40) {
      items.push({ color: 'var(--pastel-peach-dark)', emoji: '⚡', text: `<strong>Readiness at ${readiness}%</strong> — solid progress but room for improvement. Focus on weaker subjects and increase mock paper practice.` });
    } else {
      items.push({ color: 'var(--pastel-rose-dark)', emoji: '🚨', text: `<strong>Readiness at ${readiness}% needs attention.</strong> Prioritize completing syllabus chapters and starting revision cycles immediately.` });
    }

    // Accuracy insight
    if (accuracy < 100 && State.mistakes.length > 0) {
      const unresolved = State.mistakes.filter(m => !m.resolved).length;
      items.push({ color: 'var(--pastel-purple-dark)', emoji: '🔍', text: `<strong>${unresolved} unresolved mistakes</strong> detected. Review them in the Mistakes Tracker to prevent repeated errors in exams.` });
    }

    // Syllabus insight
    if (syllabusPercent < 50) {
      items.push({ color: 'hsl(212, 55%, 48%)', emoji: '📚', text: `<strong>Syllabus ${syllabusPercent}% complete.</strong> Accelerate chapter reading to build a stronger foundation before revisions.` });
    } else if (syllabusPercent >= 80) {
      items.push({ color: 'var(--pastel-green-dark)', emoji: '✨', text: `<strong>Excellent!</strong> Syllabus is ${syllabusPercent}% complete. Transition fully to revision cycles and mock test practice.` });
    }

    // Study consistency
    const streak = State.studyStats.streak;
    if (streak >= 5) {
      items.push({ color: 'hsl(24, 60%, 45%)', emoji: '🔥', text: `<strong>${streak}-day streak!</strong> Outstanding consistency. This level of discipline directly correlates with exam success.` });
    } else if (streak === 0) {
      items.push({ color: 'var(--pastel-rose-dark)', emoji: '⏰', text: `<strong>No active study streak.</strong> Start a Pomodoro session today to build momentum and earn study points.` });
    }

    // Mock papers insight
    if (State.papers.length === 0) {
      items.push({ color: 'hsl(268, 45%, 48%)', emoji: '📝', text: `<strong>No mock papers attempted yet.</strong> Generate your first paper in the Paper Generator to establish a performance baseline.` });
    } else if (mockAvg < 50) {
      items.push({ color: 'var(--pastel-peach-dark)', emoji: '📈', text: `<strong>Mock average at ${mockAvg}%.</strong> Focus on high-weightage topics and review incorrect answers systematically.` });
    }

    if (items.length === 0) {
      items.push({ color: 'var(--pastel-green-dark)', emoji: '🎉', text: `<strong>You're doing amazing!</strong> All metrics look healthy. Challenge yourself with harder mock papers to push your scores higher.` });
    }

    return items.map(item => `
      <div class="ana-insight-item" style="border-left-color: ${item.color};">
        ${item.emoji} ${item.text}
      </div>
    `).join('');
  }
};
