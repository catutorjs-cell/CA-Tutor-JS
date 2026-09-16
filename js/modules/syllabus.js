// CA JS Syllabus Explorer Module
import { State } from '../state.js';
import { SYLLABUS_DATA } from '../seedData.js';

export const SyllabusModule = {
  activeSubjectIndex: 0,
  activeChapterId: null, // Holds the ID of the chapter currently being studied in the Arena
  isVideoPlaying: false,
  videoPlayInterval: null,
  videoCurrentTime: 0, // In seconds
  activeGroup: 'All', // Options: 'All', 'Group 1', 'Group 2'
  activeScheme: 'May 2027', // Options for Foundation: 'May 2027', 'May 2026'
  exemptionOnly: false, // Options: true (60+ Marks Exemption mode), false (Full syllabus)

  render(container) {
    const level = State.user.examLevel;
    let subjects = [];

    if (level === 'Foundation') {
      const schemeKey = (this.activeScheme === 'May 2026') ? 'Foundation_May2026' : 'Foundation_May2027';
      subjects = SYLLABUS_DATA[schemeKey] || SYLLABUS_DATA['Foundation'] || [];
    } else if (level === 'Intermediate') {
      const schemeKey = (this.activeScheme === 'May 2026') ? 'Intermediate_May2026' : 'Intermediate_May2027';
      subjects = SYLLABUS_DATA[schemeKey] || SYLLABUS_DATA['Intermediate'] || [];
    } else if (level === 'Final') {
      const schemeKey = (this.activeScheme === 'May 2026') ? 'Final_May2026' : 'Final_May2027';
      subjects = SYLLABUS_DATA[schemeKey] || SYLLABUS_DATA['Final'] || [];
    } else {
      subjects = SYLLABUS_DATA[level] || [];
    }

    const getSubjectGroup = (subName) => {
      if (
        subName.includes("Advanced Accounting") ||
        subName.includes("Corporate and Other Laws") ||
        subName.includes("Income-tax") ||
        subName.includes("Goods and Services Tax")
      ) {
        return "Group 1";
      }
      return "Group 2";
    };

    if (level === 'Intermediate' && this.activeGroup && this.activeGroup !== 'All') {
      subjects = subjects.filter(sub => getSubjectGroup(sub.subject) === this.activeGroup);
    }

    if (subjects.length === 0) {
      container.innerHTML = `
        <header class="app-header" style="display:flex; flex-direction:column; align-items:flex-start; gap:16px; margin-bottom:24px; padding-right:320px;">
          <div class="header-title-container">
            <h1 class="header-branding">Syllabus Explorer</h1>
            <span class="header-subtitle">CA ${level} Syllabus & Immersive Study Arenas</span>
          </div>
          ${(level === 'Intermediate' || level === 'Foundation' || level === 'Final') ? `
          <div class="header-controls-row" style="display:flex; align-items:center; gap:20px; flex-wrap:wrap; margin-top:4px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">EXAM VERSION:</span>
              <div class="scheme-segment-control" style="display:flex; background:rgba(0,0,0,0.03); border-radius:20px; padding:3px; gap:4px; border: 1px solid rgba(0,0,0,0.05);">
                <button class="scheme-btn ${this.activeScheme === 'May 2027' ? 'active' : ''}" data-scheme="May 2027" style="border:none; background:${this.activeScheme === 'May 2027' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeScheme === 'May 2027' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">May 2027 Exam</button>
                <button class="scheme-btn ${this.activeScheme === 'May 2026' ? 'active' : ''}" data-scheme="May 2026" style="border:none; background:${this.activeScheme === 'May 2026' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeScheme === 'May 2026' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">May 2026 Exam</button>
              </div>
            </div>
            ${level === 'Intermediate' ? `
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">GROUP:</span>
              <div class="group-segment-control" style="display:flex; background:rgba(0,0,0,0.03); border-radius:20px; padding:3px; gap:4px; border: 1px solid rgba(0,0,0,0.05);">
                <button class="segment-btn ${this.activeGroup === 'Group 1' ? 'active' : ''}" data-group="Group 1" style="border:none; background:${this.activeGroup === 'Group 1' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeGroup === 'Group 1' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Group 1</button>
                <button class="segment-btn ${this.activeGroup === 'Group 2' ? 'active' : ''}" data-group="Group 2" style="border:none; background:${this.activeGroup === 'Group 2' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeGroup === 'Group 2' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Group 2</button>
                <button class="segment-btn ${this.activeGroup === 'All' ? 'active' : ''}" data-group="All" style="border:none; background:${this.activeGroup === 'All' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeGroup === 'All' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Both</button>
              </div>
            </div>
            ` : ''}
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">PAPER:</span>
              <div class="paper-quick-segment-control" style="display:flex; background:rgba(0,0,0,0.03); border-radius:20px; padding:3px; gap:4px; border: 1px solid rgba(0,0,0,0.05);">
                <button class="paper-quick-btn" data-paper="Paper 1" style="border:none; background:${subjects[this.activeSubjectIndex] && subjects[this.activeSubjectIndex].subject.includes('Paper-1') ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${subjects[this.activeSubjectIndex] && subjects[this.activeSubjectIndex].subject.includes('Paper-1') ? 'white' : 'var(--text-muted)'}; padding:6px 12px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Paper 1</button>
                <button class="paper-quick-btn" data-paper="Paper 2" style="border:none; background:${subjects[this.activeSubjectIndex] && subjects[this.activeSubjectIndex].subject.includes('Paper-2') ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${subjects[this.activeSubjectIndex] && subjects[this.activeSubjectIndex].subject.includes('Paper-2') ? 'white' : 'var(--text-muted)'}; padding:6px 12px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Paper 2</button>
                <button class="paper-quick-btn" data-paper="Paper 3" style="border:none; background:${subjects[this.activeSubjectIndex] && subjects[this.activeSubjectIndex].subject.includes('Paper-3') ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${subjects[this.activeSubjectIndex] && subjects[this.activeSubjectIndex].subject.includes('Paper-3') ? 'white' : 'var(--text-muted)'}; padding:6px 12px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Paper 3</button>
                <button class="paper-quick-btn" data-paper="Paper 4" style="border:none; background:${subjects[this.activeSubjectIndex] && subjects[this.activeSubjectIndex].subject.includes('Paper-4') ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${subjects[this.activeSubjectIndex] && subjects[this.activeSubjectIndex].subject.includes('Paper-4') ? 'white' : 'var(--text-muted)'}; padding:6px 12px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Paper 4</button>
                ${(level === 'Intermediate' || level === 'Final') ? `
                  <button class="paper-quick-btn" data-paper="Paper 5" style="border:none; background:${subjects[this.activeSubjectIndex] && subjects[this.activeSubjectIndex].subject.includes('Paper-5') ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${subjects[this.activeSubjectIndex] && subjects[this.activeSubjectIndex].subject.includes('Paper-5') ? 'white' : 'var(--text-muted)'}; padding:6px 12px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Paper 5</button>
                  <button class="paper-quick-btn" data-paper="Paper 6" style="border:none; background:${subjects[this.activeSubjectIndex] && subjects[this.activeSubjectIndex].subject.includes('Paper-6') ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${subjects[this.activeSubjectIndex] && subjects[this.activeSubjectIndex].subject.includes('Paper-6') ? 'white' : 'var(--text-muted)'}; padding:6px 12px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Paper 6</button>
                ` : ''}
              </div>
            </div>
            ${(level === 'Intermediate' || level === 'Final') ? `
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">TARGET:</span>
              <button id="syllabus-exemption-btn" class="btn" style="border:none; background:${this.exemptionOnly ? 'linear-gradient(135deg, #f59e0b, #ef4444)' : 'rgba(0,0,0,0.04)'}; color:${this.exemptionOnly ? 'white' : 'var(--text-main)'}; padding:6px 14px; border-radius:18px; font-size:12px; font-weight:700; cursor:pointer; transition: all 0.2s; display:inline-flex; align-items:center; gap:6px; border:1px solid ${this.exemptionOnly ? 'transparent' : 'rgba(0,0,0,0.08)'}; box-shadow:${this.exemptionOnly ? '0 4px 12px rgba(245, 158, 11, 0.35)' : 'none'};" onclick="window.cajsToggleSyllabusExemption()">
                🎯 60+ Marks Exemption Only ${this.exemptionOnly ? '✓' : ''}
              </button>
            </div>
            ` : ''}
          </div>
          ` : ''}
        </header>
        <div class="glass-card" style="padding: 24px; text-align: center;"><p style="margin: 0; font-size: 14px; font-weight: 600; color: var(--text-muted);">No syllabus content found for level: ${level}</p></div>
      `;

      // Bind Group Filter segment buttons even if empty
      const segmentBtns = container.querySelectorAll('.group-segment-control .segment-btn');
      segmentBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.activeGroup = e.currentTarget.getAttribute('data-group');
          this.activeSubjectIndex = 0;
          this.render(container);
        });
      });
      const schemeBtns = container.querySelectorAll('.scheme-segment-control .scheme-btn');
      schemeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          this.activeScheme = e.currentTarget.getAttribute('data-scheme');
          this.activeSubjectIndex = 0;
          this.render(container);
        });
      });
      return;
    }

    // Safeguard active index
    if (this.activeSubjectIndex >= subjects.length) {
      this.activeSubjectIndex = 0;
    }

    // If a chapter is selected for study, render the Syllabus Study Arena
    if (this.activeChapterId) {
      this.renderStudyArena(container, this.activeChapterId, subjects);
      return;
    }

    const currentSubject = subjects[this.activeSubjectIndex];

    // Build Subject sidebar tabs
    const sidebarTabs = subjects.map((sub, idx) => `
      <button class="subject-tab ${idx === this.activeSubjectIndex ? 'active' : ''}" data-index="${idx}">
        ${sub.subject}
      </button>
    `).join('');

    // Build Portal Button if present
    const portalButton = currentSubject.portalUrl ? `
      <a href="${currentSubject.portalUrl}" target="_blank" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 8px; padding: 8px 14px; font-size: 12px; border-radius: 12px; background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0, 0, 0, 0.05); color: var(--text-main); text-decoration: none; font-weight: 700; margin-left: auto; transition: var(--transition-smooth);" onmouseover="this.style.background='white'; this.style.transform='translateY(-1.5px)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.05)';" onmouseout="this.style.background='rgba(255,255,255,0.45)'; this.style.transform='none'; this.style.boxShadow='none';">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" style="color: var(--pastel-purple-dark);"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>
        ICAI Official Material
      </a>
    ` : '';

    // Build Chapter list cards in natural chapter sequence
    let sortedChapters = [...currentSubject.chapters];

    if (this.exemptionOnly && level !== 'Foundation') {
      sortedChapters = sortedChapters.filter(ch => ch.weightage === 'High' || ch.weightage === 'Medium');
    }

    const chapterCards = sortedChapters.map(ch => {
      const isDone = State.completedChapters[ch.id];
      const hasPDFs = ch.pdfUrls && ch.pdfUrls.length > 0;

      // Determine click handler for the chapter card header info (opens study arena)
      const mainClickHandler = `window.cajsOpenNotes('${ch.id}')`;

      // Extract mark breakdown text if available in chapter notes or infer from guide
      let markBadgeHtml = '';
      let mText = '';
      if (ch.notes && ch.notes.includes('EXAM WEIGHTAGE BREAKDOWN:')) {
        const match = ch.notes.match(/EXAM WEIGHTAGE BREAKDOWN:<\/strong>\s*([^<]+)/i);
        if (match && match[1]) mText = match[1].trim();
      }
      if (!mText && typeof this.getChapterWeightageNote === 'function') {
        mText = this.getChapterWeightageNote(ch, currentSubject.subject, level);
      }
      if (mText) {
        markBadgeHtml = `
          <span class="badge" style="font-size: 11px; font-weight: 700; color: #b45309; background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(239, 68, 68, 0.08)); border: 1px solid rgba(245, 158, 11, 0.3); padding: 3px 10px; border-radius: 12px; display: inline-flex; align-items: center; gap: 4px;">
            📊 ${mText}
          </span>
        `;
      }

      // Build units pills HTML (only render unit pills when there are 2 or more distinct sub-unit PDFs)
      let unitsPillsHtml = '';
      const uniqueUnitUrls = new Set((ch.units || []).map(u => u.url));
      if (ch.units && ch.units.length > 1 && uniqueUnitUrls.size > 1) {
        unitsPillsHtml = `
          <div class="chapter-units-container" style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 8px;">
            ${ch.units.map(unit => `
              <div class="unit-pill-group" style="display: inline-flex; align-items: center; background: rgba(255, 255, 255, 0.5); border: 1px solid rgba(0, 0, 0, 0.06); border-radius: 20px; padding: 4px 12px; transition: var(--transition-smooth);">
                <a href="${unit.url}" target="_blank" class="unit-pill-btn" style="display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600; color: var(--text-main); text-decoration: none;" onclick="event.stopPropagation();">
                  <span style="font-size: 12px;">📄</span> ${unit.name}
                </a>
              </div>
            `).join('')}
          </div>
        `;
      }

      return `
        <div class="glass-card chapter-card" style="animation: fadeIn 0.3s ease-out; display: flex; flex-direction: column; align-items: stretch; gap: 14px; padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
            <div class="chapter-info" style="cursor: pointer; flex-grow: 1;" onclick="${mainClickHandler}">
              <span class="chapter-title" style="font-size: 16px; font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                ${ch.name}
                ${hasPDFs ? '<span style="font-size: 11px; font-weight: 600; color: var(--pastel-purple-dark); background: rgba(217, 179, 255, 0.3); padding: 2px 8px; border-radius: 10px; border: 1px solid rgba(217, 179, 255, 0.45);">PDFs Attached</span>' : ''}
              </span>
              <div class="chapter-meta" style="margin-top: 6px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <span class="badge badge-${ch.weightage.toLowerCase()}">${ch.weightage} Weightage</span>
                ${markBadgeHtml}
              </div>
            </div>
            <div class="study-btn-group" style="flex-shrink: 0; display: flex; align-items: center; gap: 10px;">
              <button class="btn btn-ai-page" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; font-size: 12px; border-radius: 12px; background: linear-gradient(135deg, #8b5cf6, #ec4899); border: none; color: white; text-decoration: none; font-weight: 700; cursor: pointer; transition: var(--transition-smooth); box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);" onclick="event.stopPropagation(); window.cajsOpenAIPage('${ch.id}')" onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-1.5px)'; this.style.boxShadow='0 6px 16px rgba(139, 92, 246, 0.45)';" onmouseout="this.style.opacity='1'; this.style.transform='none'; this.style.boxShadow='0 4px 12px rgba(139, 92, 246, 0.3)';">
                🧠 Study Arena
              </button>
              ${hasPDFs ? `
                <a href="${ch.pdfUrls[0]}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-open-pdf" style="display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; font-size: 12px; border-radius: 12px; background: var(--pastel-purple-dark); border: none; color: white; text-decoration: none; font-weight: 700; transition: var(--transition-smooth);" onclick="event.stopPropagation();" onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-1px)';" onmouseout="this.style.opacity='1'; this.style.transform='none';">
                  📖 Read PDF
                </a>
              ` : ''}
              <button class="btn ${isDone ? 'btn-success' : 'btn-secondary'}" style="padding: 8px 12px; font-size: 12px;" data-ch="${ch.id}" onclick="window.cajsToggleChapter('${ch.id}')">
                ${isDone ? 'Completed ✓' : 'Mark Read'}
              </button>
            </div>
          </div>
          ${unitsPillsHtml}
        </div>
      `;
    }).join('');

    const levelWeightageOverview = this.getLevelWeightageGuideHtml(level);

    // Build Marks Distribution Summary Card for current subject
    const marksGuideHtml = `
      <div class="glass-card" style="margin-bottom: 20px; padding: 16px 20px; border-left: 5px solid var(--pastel-purple-dark); background: linear-gradient(135deg, rgba(217, 179, 255, 0.15), rgba(179, 209, 255, 0.1)); border-radius: 16px; animation: fadeIn 0.3s ease-out;">
        <div style="display: flex; justify-content: space-between; align-items: center; cursor: pointer;" onclick="const b = document.getElementById('syllabus-marks-dist-body'); b.style.display = b.style.display === 'none' ? 'block' : 'none';">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 20px;">📊</span>
            <div>
              <h4 style="font-size: 14px; font-weight: 700; margin: 0; color: var(--text-main);">Official ICAI Marks Distribution & Weightage Breakdown</h4>
              <span style="font-size: 11px; color: var(--text-muted); font-weight: 600;">Group-wise & Chapter-wise weightages for CA ${level} (${currentSubject.subject})</span>
            </div>
          </div>
          <span style="font-size: 11px; font-weight: 700; color: var(--pastel-purple-dark); background: white; padding: 5px 12px; border-radius: 14px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 6px rgba(0,0,0,0.03); flex-shrink: 0;">
            Toggle Marks Guide ▾
          </span>
        </div>
        
        <div id="syllabus-marks-dist-body" style="display: none; margin-top: 14px; border-top: 1px dashed rgba(0,0,0,0.1); padding-top: 14px;">
          ${levelWeightageOverview}

          <div style="font-size: 12px; font-weight: 800; color: var(--pastel-purple-dark); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
            📖 Chapter Weightage Breakdown for ${currentSubject.subject}:
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 10px;">
            ${currentSubject.chapters.map(ch => {
              let mText = '';
              if (ch.notes && ch.notes.includes('EXAM WEIGHTAGE BREAKDOWN:')) {
                const match = ch.notes.match(/EXAM WEIGHTAGE BREAKDOWN:<\/strong>\s*([^<]+)/i);
                if (match && match[1]) mText = match[1].trim();
              }
              if (!mText && typeof this.getChapterWeightageNote === 'function') {
                mText = this.getChapterWeightageNote(ch, currentSubject.subject, level);
              }
              return `
                <div style="background: rgba(255,255,255,0.75); padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.05); display: flex; justify-content: space-between; align-items: center; gap: 12px;">
                  <div style="display:flex; flex-direction:column; gap:2px; flex-grow:1;">
                    <span style="font-size: 12px; font-weight: 700; color: var(--text-main); line-height: 1.3;">${ch.name}</span>
                    ${mText ? `<span style="font-size: 11px; font-weight: 600; color: #b45309;">🎯 ${mText}</span>` : ''}
                  </div>
                  <span class="badge badge-${ch.weightage.toLowerCase()}" style="font-size: 10px; flex-shrink: 0;">${ch.weightage}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    container.innerHTML = `
      <header class="app-header" style="display:flex; flex-direction:column; align-items:flex-start; gap:16px; margin-bottom:24px; padding-right:320px;">
        <div class="header-title-container">
          <h1 class="header-branding">Syllabus Explorer</h1>
          <span class="header-subtitle">CA ${level} Syllabus & Immersive Study Arenas</span>
        </div>
        
        ${(level === 'Intermediate' || level === 'Foundation' || level === 'Final') ? `
        <div class="header-controls-row" style="display:flex; align-items:center; gap:20px; flex-wrap:wrap; margin-top:4px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">EXAM VERSION:</span>
            <div class="scheme-segment-control" style="display:flex; background:rgba(0,0,0,0.03); border-radius:20px; padding:3px; gap:4px; border: 1px solid rgba(0,0,0,0.05);">
              <button class="scheme-btn ${this.activeScheme === 'May 2027' ? 'active' : ''}" data-scheme="May 2027" style="border:none; background:${this.activeScheme === 'May 2027' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeScheme === 'May 2027' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">May 2027 Exam</button>
              <button class="scheme-btn ${this.activeScheme === 'May 2026' ? 'active' : ''}" data-scheme="May 2026" style="border:none; background:${this.activeScheme === 'May 2026' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeScheme === 'May 2026' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">May 2026 Exam</button>
            </div>
          </div>
          ${level === 'Intermediate' ? `
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">GROUP:</span>
            <div class="group-segment-control" style="display:flex; background:rgba(0,0,0,0.03); border-radius:20px; padding:3px; gap:4px; border: 1px solid rgba(0,0,0,0.05);">
              <button class="segment-btn ${this.activeGroup === 'Group 1' ? 'active' : ''}" data-group="Group 1" style="border:none; background:${this.activeGroup === 'Group 1' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeGroup === 'Group 1' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Group 1</button>
              <button class="segment-btn ${this.activeGroup === 'Group 2' ? 'active' : ''}" data-group="Group 2" style="border:none; background:${this.activeGroup === 'Group 2' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeGroup === 'Group 2' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Group 2</button>
              <button class="segment-btn ${this.activeGroup === 'All' ? 'active' : ''}" data-group="All" style="border:none; background:${this.activeGroup === 'All' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeGroup === 'All' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Both</button>
            </div>
          </div>
          ` : ''}
          ${(level === 'Intermediate' || level === 'Final') ? `
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">TARGET:</span>
            <button id="syllabus-exemption-btn" class="btn" style="border:none; background:${this.exemptionOnly ? 'linear-gradient(135deg, #f59e0b, #ef4444)' : 'rgba(0,0,0,0.04)'}; color:${this.exemptionOnly ? 'white' : 'var(--text-main)'}; padding:6px 14px; border-radius:18px; font-size:12px; font-weight:700; cursor:pointer; transition: all 0.2s; display:inline-flex; align-items:center; gap:6px; border:1px solid ${this.exemptionOnly ? 'transparent' : 'rgba(0,0,0,0.08)'}; box-shadow:${this.exemptionOnly ? '0 4px 12px rgba(245, 158, 11, 0.35)' : 'none'};" onclick="window.cajsToggleSyllabusExemption()">
              🎯 60+ Marks Exemption Only ${this.exemptionOnly ? '✓' : ''}
            </button>
          </div>
          ` : ''}
        </div>
        ` : ''}
      </header>

      <div class="syllabus-container" style="animation: fadeIn 0.3s ease-out;">
        <!-- Sidebar subjects list -->
        <div class="subject-sidebar">
          <h3 style="font-size: 12px; color: var(--text-muted); font-weight:700; margin-bottom: 8px; padding-left: 5px; letter-spacing:0.5px;">SUBJECTS</h3>
          ${sidebarTabs}
        </div>

        <!-- Chapters content list -->
        <div class="chapters-list">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; flex-wrap: wrap; gap: 10px;">
            <h3 style="font-size: 18px; margin: 0;" class="header-branding">${currentSubject.subject}</h3>
            ${portalButton}
          </div>

          ${(this.exemptionOnly && level !== 'Foundation') ? `
            <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(239, 68, 68, 0.08)); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 14px; padding: 12px 16px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 13px; font-weight: 600; color: #b45309;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-size:18px;">🎯</span>
                <div>
                  <strong>60+ Marks Exemption Target Mode:</strong> Showing High & Medium Weightage chapters (~65+ Marks coverage). Low weightage chapters are hidden.
                </div>
              </div>
              <span style="font-size:11px; background:white; padding:4px 10px; border-radius:12px; font-weight:700; color:#b45309; border:1px solid rgba(245,158,11,0.3); flex-shrink:0;">${sortedChapters.length} / ${currentSubject.chapters.length} Chapters</span>
            </div>
          ` : ''}

          ${marksGuideHtml}

          ${chapterCards}
        </div>
      </div>

      <style>
        .unit-pill-btn {
          transition: var(--transition-smooth);
        }
        .unit-pill-btn:hover {
          background: rgba(255, 255, 255, 0.95) !important;
          border-color: var(--pastel-purple-dark) !important;
          color: var(--pastel-purple-dark) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(31, 38, 135, 0.08);
        }
        .btn-open-all {
          transition: var(--transition-smooth);
        }
        .btn-open-all:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(138, 43, 226, 0.25);
        }
      </style>
    `;

    // Bind subject sidebar switches
    const tabs = container.querySelectorAll('.subject-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        this.activeSubjectIndex = idx;
        this.render(container);
      });
    });

    // Bind Group Filter segment buttons
    const segmentBtns = container.querySelectorAll('.group-segment-control .segment-btn');
    segmentBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeGroup = e.currentTarget.getAttribute('data-group');
        this.activeSubjectIndex = 0; // Reset index when filter changes
        this.render(container);
      });
    });

    // Bind Quick Paper filter buttons
    const paperQuickBtns = container.querySelectorAll('.paper-quick-btn[data-paper]');
    paperQuickBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const paperStr = e.currentTarget.getAttribute('data-paper');
        const paperNum = paperStr.replace('Paper ', '');
        const foundIdx = subjects.findIndex(s => s.subject.includes(`Paper-${paperNum}`) || s.subject.includes(`Paper ${paperNum}`));
        if (foundIdx !== -1) {
          this.activeSubjectIndex = foundIdx;
          this.render(container);
        }
      });
    });

    // Bind Scheme Filter segment buttons
    const schemeBtns = container.querySelectorAll('.scheme-segment-control .scheme-btn');
    schemeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeScheme = e.currentTarget.getAttribute('data-scheme');
        this.activeSubjectIndex = 0; // Reset index when scheme changes
        this.render(container);
      });
    });

    // Make functions globally available for inline onclick handlers
    window.cajsToggleSyllabusExemption = () => {
      this.exemptionOnly = !this.exemptionOnly;
      this.render(container);
    };

    window.cajsToggleChapter = (chId) => {
      State.toggleChapter(chId);
      this.render(container);
    };

    window.cajsOpenAIPage = (chId) => {
      this.activeChapterId = chId;
      this.activeIllustrationUnit = 'All';
      this.isVideoPlaying = false;
      this.videoCurrentTime = 0;
      if (this.videoPlayInterval) {
        clearInterval(this.videoPlayInterval);
        this.videoPlayInterval = null;
      }
      this.render(container);
    };

    window.cajsOpenNotesWithUnit = (chId, unitName) => {
      this.activeChapterId = chId;
      this.activeIllustrationUnit = unitName;
      this.isVideoPlaying = false;
      this.videoCurrentTime = 0;
      if (this.videoPlayInterval) {
        clearInterval(this.videoPlayInterval);
        this.videoPlayInterval = null;
      }
      this.render(container);
    };

    window.cajsOpenNotes = (chId) => {
      this.activeChapterId = chId;
      this.isVideoPlaying = false;
      this.videoCurrentTime = 0;
      if (this.videoPlayInterval) {
        clearInterval(this.videoPlayInterval);
        this.videoPlayInterval = null;
      }

      // Automatically open the first chapter PDF in a new tab if it exists
      let foundCh = null;
      for (const sub of subjects) {
        foundCh = sub.chapters.find(ch => ch.id === chId);
        if (foundCh) break;
      }
      if (foundCh && foundCh.pdfUrls && foundCh.pdfUrls.length > 0) {
        try {
          window.open(foundCh.pdfUrls[0], '_blank');
        } catch (e) {
          console.warn("Popup blocker prevented automatic PDF opening:", e);
        }
      }

      this.render(container);
    };
  },

  getLevelWeightageGuideHtml(level) {
    if (level === 'Foundation') {
      return `
        <div style="background: rgba(255,255,255,0.85); border-radius: 14px; padding: 14px 16px; border: 1px solid rgba(124, 58, 237, 0.2); margin-bottom: 14px;">
          <h5 style="font-size: 13px; font-weight: 800; color: #7c3aed; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px;">
            🎓 CA Foundation Official Weightage Breakdown (4 Papers - 400 Marks Total)
          </h5>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px;">
            <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
              <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 1: Accounting (100 Marks)</div>
              <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                <li><strong>Final Accounts, Partnership & NPOs:</strong> 30–40% (30–40 marks).</li>
                <li><strong>Core Accounting Process:</strong> 25–30% (BRS, Inventories, Depreciation).</li>
                <li><strong>Company Accounts:</strong> 10–15% (Issue of shares & debentures).</li>
              </ul>
            </div>
            <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
              <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 2: Business Laws (100 Marks)</div>
              <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                <li><strong>Indian Contract Act 1872:</strong> 25–30% (25–30 marks).</li>
                <li><strong>Companies Act, Partnership & Sale of Goods:</strong> Statutory core framework.</li>
              </ul>
            </div>
            <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
              <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 3: Quantitative Aptitude (100 Marks)</div>
              <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                <li><strong>Business Mathematics:</strong> Time Value of Money & Ratio (40 Marks).</li>
                <li><strong>Logical Reasoning & Statistics:</strong> LR (20 Marks), Statistics (40 Marks).</li>
              </ul>
            </div>
            <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
              <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 4: Business Economics (100 Marks)</div>
              <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                <li><strong>Micro & Macro Economics:</strong> Demand, Supply & Market Structures.</li>
                <li><strong>Indian Economy & Business Cycles:</strong> Economic frameworks.</li>
              </ul>
            </div>
          </div>
        </div>
      `;
    }

    if (level === 'Intermediate') {
      return `
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 14px;">
          <!-- Group 1 -->
          <div style="background: rgba(255,255,255,0.85); border-radius: 14px; padding: 14px 16px; border: 1px solid rgba(124, 58, 237, 0.2);">
            <h5 style="font-size: 13px; font-weight: 800; color: #7c3aed; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
              <span>📚</span> Group 1 (300 Marks Total)
            </h5>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px;">
              <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
                <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 1: Advanced Accounting (100 Marks)</div>
                <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                  <li><strong>Accounting Standards (AS):</strong> 55–65% weightage (compulsory 20M opening question).</li>
                  <li><strong>Amalgamation & Reconstruction:</strong> 20–25% weightage.</li>
                  <li><strong>Consolidated Financial Statements:</strong> 10–15% weightage.</li>
                </ul>
              </div>
              <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
                <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 2: Corporate and Other Laws (100 Marks)</div>
                <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                  <li><strong>Company Law (70 Marks):</strong> Management & Admin (15–20%), Accounts (10–12%), Audit (10–12%).</li>
                  <li><strong>Other Laws (30 Marks):</strong> FEMA 1999 & General Clauses Act.</li>
                </ul>
              </div>
              <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
                <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 3: Taxation (100 Marks)</div>
                <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                  <li><strong>Income Tax Law (50 Marks):</strong> PGBP & Salaries (14M question); TDS/TCS & Advance Tax (15–20%).</li>
                  <li><strong>Goods & Services Tax (50 Marks):</strong> Input Tax Credit (ITC), Supply, Time & Value (50–80% of GST).</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Group 2 -->
          <div style="background: rgba(255,255,255,0.85); border-radius: 14px; padding: 14px 16px; border: 1px solid rgba(37, 99, 235, 0.2);">
            <h5 style="font-size: 13px; font-weight: 800; color: #2563eb; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
              <span>📊</span> Group 2 (300 Marks Total)
            </h5>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px;">
              <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
                <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 4: Cost & Management Accounting (100 Marks)</div>
                <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                  <li><strong>Cost Control & Analysis:</strong> Standard, Marginal & Budgetary Costing (25–30%).</li>
                  <li><strong>Elements of Cost:</strong> Material, Labour & Overheads (35–40%).</li>
                </ul>
              </div>
              <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
                <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 5: Auditing and Ethics (100 Marks)</div>
                <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                  <li><strong>Company Audit & Audit Report:</strong> 20–25% (predictable practical area).</li>
                  <li><strong>Standards on Auditing (SAs):</strong> Audit Evidence & Documentation (15–20%).</li>
                </ul>
              </div>
              <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
                <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 6: FM (50M) & Strategic Management (50M)</div>
                <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                  <li><strong>Financial Management (50M):</strong> Capital Budgeting (10M practical sums); Ratio Analysis & Leverages.</li>
                  <li><strong>Strategic Management (50M):</strong> Strategic Analysis & Choices (30–40%).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (level === 'Final') {
      return `
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 14px;">
          <!-- Group 1 -->
          <div style="background: rgba(255,255,255,0.85); border-radius: 14px; padding: 14px 16px; border: 1px solid rgba(124, 58, 237, 0.2);">
            <h5 style="font-size: 13px; font-weight: 800; color: #7c3aed; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
              <span>📚</span> Group 1 (300 Marks Total)
            </h5>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px;">
              <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
                <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 1: Financial Reporting (FR) (100 Marks)</div>
                <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                  <li><strong>Indian Accounting Standards (Ind AS):</strong> 65–70% weightage. Ind AS 103, 110, 109, 115, 116 (compulsory 20M question).</li>
                </ul>
              </div>
              <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
                <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 2: Advanced Financial Management (AFM) (100 Marks)</div>
                <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                  <li><strong>Advanced Capital Budgeting:</strong> 15–20 marks.</li>
                  <li><strong>Mergers, Acquisitions & Restructuring:</strong> 12–15 marks.</li>
                  <li><strong>Portfolio Management & Derivatives:</strong> 20–25 marks (formula structures).</li>
                </ul>
              </div>
              <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
                <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 3: Advanced Auditing & Professional Ethics (100 Marks)</div>
                <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                  <li><strong>Professional Ethics:</strong> Guaranteed 15–20 marks from CA Act schedules.</li>
                  <li><strong>Standards on Auditing (SAs):</strong> 40–45% weightage (SA 200, 300, 500, 700 series).</li>
                  <li><strong>Company Audit & CARO 2020:</strong> 10–12 marks predictable provisions.</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Group 2 -->
          <div style="background: rgba(255,255,255,0.85); border-radius: 14px; padding: 14px 16px; border: 1px solid rgba(37, 99, 235, 0.2);">
            <h5 style="font-size: 13px; font-weight: 800; color: #2563eb; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 0.5px; display: flex; align-items: center; gap: 6px;">
              <span>📊</span> Group 2 (300 Marks Total)
            </h5>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 10px;">
              <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
                <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 4: Direct Tax Laws & International Taxation (DT) (100 Marks)</div>
                <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                  <li><strong>PGBP:</strong> 14–16 marks cornerstone assessment question.</li>
                  <li><strong>Transfer Pricing & Non-Resident Tax:</strong> 30 marks dedicated block.</li>
                  <li><strong>Assessment Procedures, Appeals & Revisions:</strong> 12–15 marks.</li>
                </ul>
              </div>
              <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
                <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 5: Indirect Tax Laws (IDT) (100 Marks)</div>
                <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                  <li><strong>Input Tax Credit (ITC) & Supply Rules:</strong> 40–50% core GST block.</li>
                  <li><strong>Customs Law & Foreign Trade Policy (FTP):</strong> 20 marks fixed.</li>
                </ul>
              </div>
              <div style="background: white; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(0,0,0,0.06); font-size: 11.5px; line-height: 1.45;">
                <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">Paper 6: Integrated Business Solutions (IBS) (100 Marks)</div>
                <ul style="margin: 0; padding-left: 16px; color: var(--text-muted);">
                  <li><strong>Multidisciplinary Case Studies:</strong> Open-book exam covering all 5 previous subjects + Corporate Laws & SCMPE. Cross-functional GST/Tax mapping onto Ind AS.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return '';
  },

  getChapterWeightageNote(ch, subjectName, level) {
    const cName = (ch && ch.name ? ch.name : '').toLowerCase();
    const sName = (subjectName || '').toLowerCase();

    if (level === 'Intermediate') {
      if (sName.includes('accounting')) {
        if (cName.includes('amalgamation') || cName.includes('reconstruction')) return '20–25% Weightage (Major Numerical)';
        if (cName.includes('consolidated') || cName.includes('holding')) return '10–15% Weightage (Group Accounts)';
        return '55–65% Accounting Standards Block';
      }
      if (sName.includes('laws')) {
        if (cName.includes('management') || cName.includes('administration')) return '15–20% Weightage (Company Law)';
        if (cName.includes('accounts of companies')) return '10–12% Weightage';
        if (cName.includes('audit')) return '10–12% Weightage';
        if (cName.includes('fema') || cName.includes('general clauses')) return '30 Marks Other Laws Block';
        return 'Company Law Core Section';
      }
      if (sName.includes('tax') || sName.includes('gst')) {
        if (cName.includes('pgbp') || cName.includes('salar')) return '14-Mark Total Income Question';
        if (cName.includes('tds') || cName.includes('tcs') || cName.includes('advance tax')) return '15–20% Weightage';
        if (cName.includes('input tax credit') || cName.includes('itc') || cName.includes('supply')) return '50–80% GST Marks Block';
        return 'Core Tax Module';
      }
      if (sName.includes('cost')) {
        if (cName.includes('standard') || cName.includes('marginal') || cName.includes('budget')) return '25–30% Formula Scoring Zone';
        if (cName.includes('material') || cName.includes('labour') || cName.includes('overhead')) return '35–40% Elements of Cost';
        return 'Cost Accounting Module';
      }
      if (sName.includes('audit')) {
        if (cName.includes('company audit') || cName.includes('report')) return '20–25% Weightage (Predictable Area)';
        if (cName.includes('evidence') || cName.includes('documentation') || cName.includes('standard')) return '15–20% SAs Block';
        return 'Auditing Standard Module';
      }
      if (sName.includes('financial management') || sName.includes('strategic management') || sName.includes('fm')) {
        if (cName.includes('capital budgeting') || cName.includes('investment')) return '10-Mark Practical Sums (High Prob)';
        if (cName.includes('ratio') || cName.includes('leverage')) return 'High-Scoring Practical Area';
        if (cName.includes('strategic') || cName.includes('choice') || cName.includes('analysis')) return '30–40% SM Section';
        return 'FM / SM Core Module';
      }
    }

    if (level === 'Final') {
      if (sName.includes('reporting') || sName.includes('fr')) {
        if (cName.includes('103') || cName.includes('110') || cName.includes('109') || cName.includes('115') || cName.includes('116') || cName.includes('business combination') || cName.includes('consolidated')) return '65–70% Ind AS Block (Compulsory 20M)';
        return 'Ind AS Core Standards';
      }
      if (sName.includes('advanced financial management') || sName.includes('afm')) {
        if (cName.includes('capital budgeting') || cName.includes('investment')) return '15–20 Marks (Advanced Budgeting)';
        if (cName.includes('merger') || cName.includes('acquisition') || cName.includes('restructur')) return '12–15 Marks (Mergers)';
        if (cName.includes('portfolio') || cName.includes('derivative')) return '20–25 Marks (Portfolio & Derivatives)';
        return 'AFM Practical Module';
      }
      if (sName.includes('audit')) {
        if (cName.includes('ethics') || cName.includes('professional')) return 'Guaranteed 15–20 Marks (Ethics)';
        if (cName.includes('caro') || cName.includes('company audit')) return '10–12 Marks (CARO 2020)';
        if (cName.includes('standard') || cName.includes('evidence') || cName.includes('sa')) return '40–45% SAs Weightage Block';
        return 'Core Audit Framework';
      }
      if (sName.includes('direct tax') || sName.includes('dt')) {
        if (cName.includes('pgbp') || cName.includes('business')) return '14–16 Marks Assessment Question';
        if (cName.includes('transfer pricing') || cName.includes('non-resident') || cName.includes('international')) return '30 Marks Dedicated Block';
        if (cName.includes('procedure') || cName.includes('appeal') || cName.includes('revision')) return '12–15 Marks Procedural Law';
        return 'Direct Tax Module';
      }
      if (sName.includes('indirect tax') || sName.includes('idt')) {
        if (cName.includes('input tax credit') || cName.includes('itc') || cName.includes('supply')) return '40–50% Core GST Block';
        if (cName.includes('custom') || cName.includes('ftp') || cName.includes('foreign trade')) return '20 Marks Fixed (Customs & FTP)';
        return 'Indirect Tax Module';
      }
      if (sName.includes('integrated') || sName.includes('ibs')) {
        return 'Multidisciplinary Open-Book Case Study';
      }
    }

    return '';
  },

  renderStudyArena(container, chId, subjects) {
    const level = (State.user && State.user.examLevel) || State.activeLevel || 'Foundation';
    let chapter = null;
    let subjectName = "";

    for (const sub of subjects) {
      chapter = sub.chapters.find(ch => ch.id === chId);
      if (chapter) {
        subjectName = sub.subject;
        break;
      }
    }

    if (!chapter) {
      this.activeChapterId = null;
      this.render(container);
      return;
    }

    const isCompleted = State.completedChapters[chId];
    const uploadedFiles = State.uploadedMaterials[chId] || [];


    // Solved Illustrations Q&A List with Unit Filtering
    const availableUnits = chapter.units || [];
    const activeUnit = this.activeIllustrationUnit || 'All';

    let activePdfUrl = chapter.pdfUrls && chapter.pdfUrls.length > 0 ? chapter.pdfUrls[0] : null;
    let activeUnitTitle = "Full Chapter";
    let displayedNotes = chapter.notes || '';

    if (activeUnit !== 'All' && availableUnits.length > 0) {
      let unitIndex = -1;
      let selectedUnitObj = null;

      const uShort = activeUnit.split(':')[0].trim(); // e.g. "Unit 1"
      const uNumStr = uShort.replace(/unit/i, '').trim(); // e.g. "1"
      const uNum = parseInt(uNumStr, 10);

      availableUnits.forEach((u, idx) => {
        const uNameStr = typeof u === 'string' ? u : (u.name || '');
        if (uNameStr === activeUnit || uNameStr.startsWith(uShort)) {
          unitIndex = idx;
          selectedUnitObj = u;
        }
      });

      if (selectedUnitObj) {
        if (typeof selectedUnitObj === 'object') {
          if (selectedUnitObj.url) {
            activePdfUrl = selectedUnitObj.url;
          }
          if (selectedUnitObj.name) {
            activeUnitTitle = selectedUnitObj.name.split(':')[0].trim();
          }
          if (selectedUnitObj.notes) {
            displayedNotes = selectedUnitObj.notes;
          }
        } else if (typeof selectedUnitObj === 'string') {
          activeUnitTitle = selectedUnitObj.split(':')[0].trim();
        }
      } else {
        activeUnitTitle = uShort;
      }

      // Robust fallback section extraction from full chapter notes if unit object notes not found or displayedNotes is still full chapter notes
      if (displayedNotes === chapter.notes && chapter.notes) {
        const rawSections = chapter.notes.split(/(?=(?:^|<br\s*\/?>\s*<br\s*\/?>|\n\n+)\s*\d+\.\s*<)/i);
        const sections = rawSections.map(s => s.trim()).filter(s => s.length > 0);

        // Strategy A: Find section explicitly mentioning Unit N
        let matched = sections.find(s => {
          const lower = s.toLowerCase();
          return lower.includes(`unit ${uNum}`) || lower.includes(`(unit ${uNum})`) || lower.includes(`units ${uNum}`);
        });

        // Strategy B: Find section starting with N.
        if (!matched && !isNaN(uNum)) {
          matched = sections.find(s => {
            const clean = s.replace(/^<[^>]+>/g, '').trim();
            return clean.startsWith(`${uNum}.`) || s.startsWith(`${uNum}.`);
          });
        }

        // Strategy C: Match by unit index among numbered sections
        if (!matched && unitIndex >= 0) {
          const numberedSections = sections.filter(s => /^\d+\./.test(s.replace(/^<[^>]+>/g, '').trim()) || /^\d+\./.test(s));
          if (numberedSections[unitIndex]) {
            matched = numberedSections[unitIndex];
          }
        }

        if (matched) {
          let cleanNote = matched;
          if (!cleanNote.toLowerCase().includes('unit')) {
            cleanNote = `<strong>${activeUnit.toUpperCase()} SUMMARY NOTES</strong><br><br>${cleanNote}`;
          }
          displayedNotes = cleanNote;
        }
      }
    }

    // Dynamic video duration based on actual word count of displayed notes
    const cleanNotesText = (displayedNotes || chapter.notes || '')
      .replace(/<br\s*\/?>/gi, '. ')
      .replace(/<\/p>/gi, '. ')
      .replace(/<[^>]*>?/gm, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const wordCount = cleanNotesText.split(/\s+/).filter(Boolean).length;
    // Estimated speech duration: ~2.2 words per second (132 wpm). Minimum 15 seconds.
    const videoDuration = Math.max(15, Math.ceil(wordCount / 2.2));

    const formatTime = (secs) => {
      const mins = Math.floor(secs / 60);
      const remainingSecs = Math.floor(secs % 60);
      return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
    };
    
    let filteredIllustrations = chapter.illustrations || [];
    if (activeUnit !== 'All') {
      filteredIllustrations = (chapter.illustrations || []).filter(ill => {
        if (!ill.unit) return false;
        const uShort = activeUnit.split(':')[0].trim();
        return ill.unit === activeUnit || ill.unit.startsWith(uShort);
      });
    }

    const unitFilterPillsHtml = `
      <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:10px; padding:0 4px;">
        <span style="font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.5px;">SELECT MODULE UNIT:</span>
        <span style="font-size:11px; font-weight:600; color:var(--pastel-purple-dark);">${filteredIllustrations.length} Examples</span>
      </div>
      <div class="ill-unit-pills-row" style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:14px;">
        <button class="ill-unit-btn ${activeUnit === 'All' ? 'active' : ''}" style="border:none; background:${activeUnit === 'All' ? 'var(--pastel-purple-dark)' : 'rgba(0,0,0,0.05)'}; color:${activeUnit === 'All' ? 'white' : 'var(--text-main)'}; padding:5px 12px; border-radius:14px; font-size:11px; font-weight:700; cursor:pointer; transition:all 0.2s;" onclick="window.cajsSelectIllustrationUnit('All')">
          📚 All Units (${(chapter.illustrations || []).length})
        </button>
        ${availableUnits.map((u, uIdx) => {
          const uLabel = u.name.split(':')[0] || `Unit ${uIdx + 1}`;
          const isAct = activeUnit === u.name || activeUnit === uLabel;
          const count = (chapter.illustrations || []).filter(ill => ill.unit && (ill.unit === u.name || ill.unit.startsWith(uLabel))).length;
          return `
            <button class="ill-unit-btn ${isAct ? 'active' : ''}" style="border:none; background:${isAct ? 'var(--pastel-purple-dark)' : 'rgba(0,0,0,0.05)'}; color:${isAct ? 'white' : 'var(--text-main)'}; padding:5px 12px; border-radius:14px; font-size:11px; font-weight:700; cursor:pointer; transition:all 0.2s;" onclick="window.cajsSelectIllustrationUnit('${u.name.replace(/'/g, "\\'")}')">
              ${uLabel} ${count > 0 ? `(${count})` : ''}
            </button>
          `;
        }).join('')}
      </div>
    `;

    const illustrationsHtml = filteredIllustrations.length > 0 ? filteredIllustrations.map((ill, index) => `
      <div class="glass-card" style="margin-bottom:12px; padding:15px; border-radius:14px; border-left:4px solid var(--pastel-purple-dark); background:rgba(255,255,255,0.5);">
        ${ill.unit ? `<div style="font-size:10px; font-weight:700; color:var(--pastel-purple-dark); background:rgba(217,179,255,0.25); padding:2px 8px; border-radius:10px; display:inline-block; margin-bottom:8px;">📌 ${ill.unit}</div>` : ''}
        <div style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="document.getElementById('arena-ill-ans-${index}').style.display = document.getElementById('arena-ill-ans-${index}').style.display === 'none' ? 'block' : 'none'">
          <span style="font-size:13px; font-weight:700; color:var(--pastel-purple-dark); display:flex; align-items:center; gap:6px;">
            📄 ${ill.q.substring(0, 45)}...
          </span>
          <span style="font-size:11px; font-weight:600; color:var(--text-muted); background:rgba(0,0,0,0.03); padding:3px 8px; border-radius:8px;">Toggle Answer ▾</span>
        </div>
        <p style="font-size:13px; font-weight:600; margin-top:8px; margin-bottom:8px; line-height:1.5; color:var(--text-main);">${ill.q}</p>
        <div id="arena-ill-ans-${index}" style="display:none; border-top:1px dashed rgba(0,0,0,0.08); padding-top:10px; margin-top:10px; transition:var(--transition-smooth);">
          <span style="font-size:11px; font-weight:700; color:var(--pastel-green-dark); display:block; margin-bottom:4px;">OFFICIAL ICAI SUGGESTED SOLUTION:</span>
          <p style="font-size:13px; line-height:1.6; color:var(--text-main); font-family:var(--font-body); white-space:pre-wrap;">${ill.a}</p>
        </div>
      </div>
    `).join('') : `<div style="padding:15px; font-size:12px; color:var(--text-muted); text-align:center; background:rgba(255,255,255,0.3); border-radius:12px;">No illustrations added for this unit yet. Refer to the complete chapter ICAI PDF above.</div>`;

    // Curated Important Exam Questions list
    const importantQuestions = [
      {
        q: `Explain statutory compliance directives corresponding to ${chapter.name}. Cite direct sections.`,
        a: `For exams, verify standard regulatory precedents under the CA curriculum. Reference standard schedules (e.g., Schedule III for company formatting or relevant standards like Ind AS / AS frameworks). Highlight structural layouts and mark sections in **bold headings** to score maximum points.`
      },
      {
        q: `What is the most frequently tested exam pattern under this chapter?`,
        a: `Historically, the institute tests structural calculations (80% weight) and conceptual exceptions (20% weight). Ensure you review both the numerical formulas and theoretical disclosures in depth.`
      }
    ];

    const curatedQuestionsHtml = importantQuestions.map((q, idx) => `
      <div class="glass-card" style="margin-bottom:12px; padding:15px; border-radius:12px; border-left:4px solid var(--pastel-peach-dark); background:rgba(255,255,255,0.4);">
        <div style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="document.getElementById('arena-cur-ans-${idx}').style.display = document.getElementById('arena-cur-ans-${idx}').style.display === 'none' ? 'block' : 'none'">
          <span style="font-size:13px; font-weight:700; color:var(--pastel-peach-dark); display:flex; align-items:center; gap:6px;">
            🔥 Curated Exam Q&A ${idx + 1}
          </span>
          <span style="font-size:11px; font-weight:600; color:var(--text-muted);">Reveal Solved Key ▾</span>
        </div>
        <p style="font-size:13px; font-weight:600; margin-top:8px; margin-bottom:8px;">${q.q}</p>
        <div id="arena-cur-ans-${idx}" style="display:none; border-top:1px solid rgba(0,0,0,0.05); padding-top:10px; margin-top:10px;">
          <span style="font-size:11px; font-weight:700; color:var(--pastel-peach-dark); display:block; margin-bottom:4px;">EXPERT STUDY MENTOR ANSWER GUIDE:</span>
          <p style="font-size:13px; line-height:1.5; color:var(--text-main); font-family:var(--font-body);">${q.a}</p>
        </div>
      </div>
    `).join('');

    // Uploaded Materials List
    const uploadedMaterialsHtml = uploadedFiles.length > 0 ? uploadedFiles.map(file => `
      <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.4); border:1px solid rgba(0,0,0,0.03); border-radius:10px; padding:8px 12px; margin-bottom:6px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="font-size:18px;">📄</div>
          <div style="display:flex; flex-direction:column;">
            <span style="font-size:12px; font-weight:600; max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${file.name}</span>
            <span style="font-size:10px; color:var(--text-muted);">${file.size} • ${file.date}</span>
          </div>
        </div>
        <span style="font-size:10px; color:var(--pastel-green-dark); font-weight:700; background:rgba(179,240,201,0.3); padding:2px 6px; border-radius:10px;">Synced ✓</span>
      </div>
    `).join('') : `
      <div style="font-size:12px; color:var(--text-muted); font-style:italic; padding:8px; text-align:center;">No reference manuals uploaded yet.</div>
    `;

    container.innerHTML = `
      <div class="syllabus-study-arena" style="animation: fadeIn 0.3s ease-out;">
        <!-- TOP NAVIGATION & STATUS HEADER -->
        <header style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:12px; background:rgba(255,255,255,0.4); padding:16px 20px; padding-right:240px; border-radius:20px; border:1px solid rgba(255,255,255,0.6);">
          <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
            <button class="btn btn-secondary" style="padding:6px 12px; font-size:12px; display:inline-flex; align-items:center; gap:4px;" onclick="window.cajsCloseStudyArena()">
              ← Back to Syllabus
            </button>
            <div style="display:flex; flex-direction:column; gap:2px;">
              <h2 style="font-size:16px; margin:0;" class="header-branding">${chapter.name}</h2>
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-top:3px;">
                <span style="font-size:11px; color:var(--text-muted); font-weight:600;">
                  Level: ${level} | Exam Weightage: ${chapter.weightage || 'High'}
                  ${(() => {
                    if (chapter.notes && chapter.notes.includes('EXAM WEIGHTAGE BREAKDOWN:')) {
                      const m = chapter.notes.match(/EXAM WEIGHTAGE BREAKDOWN:<\/strong>\s*([^<]+)/i);
                      if (m && m[1]) return `<span style="margin-left: 6px; font-weight: 700; color: #b45309; background: rgba(245, 158, 11, 0.15); padding: 2px 8px; border-radius: 8px; border: 1px solid rgba(245, 158, 11, 0.3);">📊 ${m[1].trim()}</span>`;
                    }
                    return '';
                  })()}
                </span>
                ${availableUnits.length > 0 ? `
                  <div style="display:flex; align-items:center; gap:6px; background:rgba(255,255,255,0.6); padding:2px 8px; border-radius:10px; border:1px solid rgba(0,0,0,0.05);">
                    <span style="font-size:11px; font-weight:700; color:var(--pastel-purple-dark);">Unit Select:</span>
                    <select id="cajs-arena-header-unit-select" style="background:transparent; border:none; font-size:11px; font-weight:700; color:var(--pastel-purple-dark); outline:none; cursor:pointer;" onchange="window.cajsSelectIllustrationUnit(this.value)">
                      <option value="All" ${activeUnit === 'All' ? 'selected' : ''}>📚 All Units (Full Chapter)</option>
                      ${availableUnits.map(u => `
                        <option value="${u.name.replace(/"/g, '&quot;')}" ${activeUnit === u.name ? 'selected' : ''}>📌 ${u.name}</option>
                      `).join('')}
                    </select>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
          <button class="btn ${isCompleted ? 'btn-success' : 'btn-secondary'}" style="padding:8px 16px; font-size:12px;" onclick="window.cajsArenaToggleChapter('${chId}')">
            ${isCompleted ? 'Chapter Completed ✓' : 'Mark Completed'}
          </button>
        </header>

        <div class="arena-layout-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:24px; animation:fadeIn 0.3s ease-out;">
        
        <!-- LEFT COLUMN: Video Player & PDF Uploaders -->
        <div style="display:flex; flex-direction:column; gap:20px;">
          
          <!-- CONCEPT VIDEO PLAYER -->
          <div class="glass-card" style="padding:15px; border-radius:20px; overflow:hidden; background:rgba(255,255,255,0.35);">
            <div id="cajs-video-screen" style="position:relative; width:100%; height:240px; border-radius:14px; background:linear-gradient(135deg, #1e1e2f, #3a3a5e); display:flex; align-items:center; justify-content:center; flex-direction:column; color:white; overflow:hidden; border:1px solid rgba(255,255,255,0.1); cursor:pointer;" onclick="window.cajsToggleVideo()">
              
              <!-- Buffer loading overlay -->
              <div id="cajs-video-buffer" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); flex-direction:column; align-items:center; justify-content:center; gap:12px; z-index:10;">
                <div class="loading-spinner" style="width:36px; height:36px; border:3px solid rgba(255,255,255,0.2); border-top-color:var(--pastel-purple-dark);"></div>
                <span style="font-size:12px; font-weight:600; letter-spacing:0.5px;">Buffering secure stream...</span>
              </div>

              <!-- Static thumbnail state -->
              <div id="cajs-video-thumbnail" style="display:${this.isVideoPlaying ? 'none' : 'flex'}; flex-direction:column; align-items:center; justify-content:center; gap:8px;">
                <div style="width:56px; height:56px; border-radius:50%; background:rgba(255,255,255,0.25); display:flex; align-items:center; justify-content:center; cursor:pointer; backdrop-filter:blur(6px); border:1.5px solid rgba(255,255,255,0.4); transition:transform 0.2s; box-shadow:0 6px 20px rgba(0,0,0,0.2);" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white" style="margin-left: 3px;"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <span style="font-size:13px; font-weight:700; margin-top:5px; text-shadow:0 2px 4px rgba(0,0,0,0.3);">${chapter.videoTitle || 'AI Mentor Concept Video Lecture'}</span>
                <span style="font-size:11px; opacity:0.8; background:rgba(255,255,255,0.15); padding:2px 8px; border-radius:10px;">Duration: ${formatTime(videoDuration)} mins</span>
              </div>

              <!-- Live playing visual state -->
              <div id="cajs-video-playing-hud" style="display:${this.isVideoPlaying ? 'flex' : 'none'}; flex-direction:column; align-items:center; justify-content:center; gap:12px; text-align:center;">
                <!-- Equalizer simulation waves -->
                <div style="display:flex; gap:5px; height:32px; align-items:flex-end;">
                  <div class="eq-bar" style="width:5px; background:var(--pastel-purple); border-radius:3px; animation: eqBounce 0.8s infinite alternate ease-in-out;"></div>
                  <div class="eq-bar" style="width:5px; background:var(--pastel-blue); border-radius:3px; animation: eqBounce 1.2s infinite alternate ease-in-out; animation-delay:0.2s;"></div>
                  <div class="eq-bar" style="width:5px; background:var(--pastel-green); border-radius:3px; animation: eqBounce 0.7s infinite alternate ease-in-out; animation-delay:0.4s;"></div>
                  <div class="eq-bar" style="width:5px; background:var(--pastel-rose); border-radius:3px; animation: eqBounce 1.0s infinite alternate ease-in-out; animation-delay:0.1s;"></div>
                  <div class="eq-bar" style="width:5px; background:var(--pastel-purple); border-radius:3px; animation: eqBounce 0.9s infinite alternate ease-in-out; animation-delay:0.3s;"></div>
                </div>
                <div style="display:flex; flex-direction:column; align-items:center; gap:3px;">
                  <span style="font-size:13px; font-weight:700; color:#fff;">🗣️ AI Mentor Live Narration Active</span>
                  <span style="font-size:11px; opacity:0.85; max-width:280px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${chapter.name}</span>
                </div>
              </div>

              <!-- Top floating metadata badge -->
              <div style="position:absolute; top:12px; left:12px; font-size:10px; font-weight:700; background:rgba(0,0,0,0.6); backdrop-filter:blur(8px); padding:4px 10px; border-radius:12px; display:flex; align-items:center; gap:6px; border:1px solid rgba(255,255,255,0.1);">
                <span style="width:7px; height:7px; background:#4beb8d; border-radius:50%; box-shadow:0 0 8px #4beb8d;"></span>
                SECURE STREAM (CA-JS CLOUD)
              </div>
            </div>

            <!-- CONTROLS BAR -->
            <div style="display:flex; flex-direction:column; gap:10px; margin-top:12px; padding:0 5px;">
              <div style="display:flex; align-items:center; gap:10px; width:100%;">
                <button id="cajs-video-play-btn" class="btn" style="padding:6px 14px; font-size:11px; background:var(--pastel-purple-dark); border:none; color:white; font-weight:700; border-radius:10px;" onclick="event.stopPropagation(); window.cajsToggleVideo();">
                  ${this.isVideoPlaying ? 'Pause ❚❚' : 'Play ▶'}
                </button>
                <input type="range" id="cajs-video-slider" style="flex-grow:1; accent-color:var(--pastel-purple-dark); height:5px; cursor:pointer;" min="0" max="${videoDuration}" value="${this.videoCurrentTime}" oninput="window.cajsSeekVideo(this.value)">
                <span id="cajs-video-time-label" style="font-size:11px; font-family:monospace; color:var(--text-muted); font-weight:700;">${formatTime(this.videoCurrentTime)} / ${formatTime(videoDuration)}</span>
              </div>
              
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; border-top:1px solid rgba(0,0,0,0.05); padding-top:8px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span>🔊 Volume</span>
                  <input type="range" id="cajs-video-volume" style="width:60px; accent-color:var(--pastel-purple-dark); height:3px;" min="0" max="100" value="80">
                </div>
                <div style="display:flex; gap:8px; align-items:center;">
                  <span style="color:var(--text-muted); font-weight:600;">Speed:</span>
                  <select id="cajs-video-speed-select" style="background:transparent; border:none; font-weight:700; outline:none; cursor:pointer; color:var(--pastel-purple-dark);" onchange="window.cajsSetVideoSpeed(this.value)">
                    <option value="1" selected>1.0x (Recommended)</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2.0x</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- REFERENCE MANUALS & PDF FILE UPLOADER -->
          <div class="glass-card" style="padding:20px; border-radius:20px; background:rgba(255,255,255,0.35); display:flex; flex-direction:column; gap:12px;">
            <h4 class="header-branding" style="font-size:14px; margin-bottom:2px; display:flex; align-items:center; gap:6px;">
              📁 Supplemental Reference Manuals
            </h4>
            
            <div class="supplemental-upload-grid" style="display:grid; grid-template-columns:1.2fr 1fr; gap:16px;">
              <!-- Upload zone -->
              <div id="cajs-dropzone" style="border: 2px dashed rgba(0,0,0,0.1); border-radius:12px; padding:15px; text-align:center; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; background:rgba(0,0,0,0.01); position:relative; min-height:120px;" onclick="document.getElementById('cajs-notes-file-input').click()">
                <div id="cajs-upload-spinner" style="display:none; flex-direction:column; align-items:center; gap:8px;">
                  <div class="loading-spinner" style="width:24px; height:24px; border:2px solid rgba(0,0,0,0.1); border-top-color:var(--pastel-purple-dark);"></div>
                  <span style="font-size:10px; font-weight:600; color:var(--text-muted);">Syncing secure cloud storage...</span>
                </div>
                <div id="cajs-upload-static" style="display:flex; flex-direction:column; align-items:center; gap:4px;">
                  <div style="font-size:24px;">☁️</div>
                  <span style="font-size:11px; font-weight:700;">Upload Handouts</span>
                  <span style="font-size:9px; color:var(--text-muted);">Drag & drop or click to add PDF/Image (+15 pts)</span>
                </div>
                <input type="file" id="cajs-notes-file-input" style="display:none;" onchange="window.cajsHandleNotesUpload(this)">
              </div>

              <!-- Synced items list -->
              <div style="display:flex; flex-direction:column; gap:4px; max-height:120px; overflow-y:auto; padding-right:4px;">
                <span style="font-size:10px; font-weight:700; color:var(--text-muted); margin-bottom:4px; letter-spacing:0.5px;">YOUR SYNCED GUIDES</span>
                ${uploadedMaterialsHtml}
              </div>
            </div>
          </div>
          
        </div>

        <!-- RIGHT COLUMN: Revision Notes & QA Drawers -->
        <div style="display:flex; flex-direction:column; gap:20px;">
          
          <!-- CHAPTER NOTES CARD -->
          <div class="glass-card" style="padding:20px; border-radius:20px; background:rgba(255,255,255,0.35);">
            <h4 class="header-branding" style="font-size:14px; margin-bottom:10px; display:flex; align-items:center; justify-content:space-between; gap:6px; flex-wrap:wrap;">
              <span>💡 High-Yield Conceptual Summary (${activeUnitTitle})</span>
              ${activePdfUrl ? `
                <a href="${activePdfUrl}" target="_blank" rel="noopener noreferrer" style="color:var(--pastel-purple-dark); background:rgba(217,179,255,0.25); padding:4px 10px; border-radius:8px; text-decoration:none; font-size:11px; font-weight:700; display:inline-flex; align-items:center; gap:4px; border:1px solid rgba(138,43,226,0.2);">
                  📄 Open ${activeUnitTitle} PDF
                </a>
              ` : ''}
            </h4>
            <div style="background:rgba(255,255,255,0.6); border:1px solid rgba(0,0,0,0.05); border-radius:14px; padding:18px;">
              <div style="font-size:13px; line-height:1.7; color:var(--text-main); font-weight:500; max-height:420px; overflow-y:auto; padding-right:6px;">
                ${displayedNotes}
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-top:14px; border-top:1px dashed rgba(0,0,0,0.08); padding-top:12px; font-size:10px; font-weight:700; flex-wrap:wrap;">
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                  <span style="color:var(--pastel-purple-dark); background:rgba(217,179,255,0.25); padding:3px 8px; border-radius:12px;">🎯 EXAM RELEVANCE: HIGH</span>
                  <span style="color:var(--pastel-blue-dark); background:rgba(179,209,255,0.25); padding:3px 8px; border-radius:12px;">📚 MEMORIZATION REQUIRED</span>
                  <span style="color:#059669; background:rgba(16,185,129,0.15); padding:3px 8px; border-radius:12px;">📄 FULL ICAI PDF SYNCED</span>
                </div>
                ${activePdfUrl ? `
                  <a href="${activePdfUrl}" target="_blank" rel="noopener noreferrer" style="color:white; background:var(--pastel-purple-dark); padding:6px 14px; border-radius:10px; text-decoration:none; font-size:11px; font-weight:700; display:inline-flex; align-items:center; gap:6px; transition: var(--transition-smooth); box-shadow:0 2px 8px rgba(0,0,0,0.1);" onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-1px)';" onmouseout="this.style.opacity='1'; this.style.transform='none';">
                    📖 Open ${activeUnitTitle} PDF Material
                  </a>
                ` : ''}
              </div>
            </div>
          </div>

          <!-- ILLUSTRATIVE SOLVED EXAMPLES -->
          <div>
            <h4 class="header-branding" style="font-size:14px; margin-bottom:8px; display:flex; align-items:center; gap:6px; padding-left:4px;">
              ✍️ Illustrative Solved Examples (ICAI Board of Studies)
            </h4>
            ${unitFilterPillsHtml}
            ${illustrationsHtml}
          </div>

          <!-- CURATED IMPORTANT EXAM QUESTIONS -->
          <div>
            <h4 class="header-branding" style="font-size:14px; margin-bottom:8px; display:flex; align-items:center; gap:6px; padding-left:4px;">
              🔥 High-Frequency Exam Problems
            </h4>
            ${curatedQuestionsHtml}
          </div>
          
        </div>
      </div>

      <!-- Add keyframe animation block internally for the equalizer bounce -->
      <style>
        @keyframes eqBounce {
          0% { height: 4px; }
          100% { height: 28px; }
        }
      </style>
      </div>
    `;

    const resetVideoUIStopped = () => {
      this.isVideoPlaying = false;
      if (this.videoPlayInterval) {
        clearInterval(this.videoPlayInterval);
        this.videoPlayInterval = null;
      }
      this.videoCurrentTime = 0;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      const pBtn = document.getElementById('cajs-video-play-btn');
      const sHud = document.getElementById('cajs-video-playing-hud');
      const th = document.getElementById('cajs-video-thumbnail');
      const slider = document.getElementById('cajs-video-slider');
      const timeLabel = document.getElementById('cajs-video-time-label');
      if (pBtn) pBtn.innerHTML = 'Play ▶';
      if (sHud) sHud.style.display = 'none';
      if (th) th.style.display = 'flex';
      if (slider) slider.value = 0;
      if (timeLabel) timeLabel.textContent = `00:00 / ${formatTime(videoDuration)}`;
    };

    // Hook global handlers for Study Arena
    window.cajsCloseStudyArena = () => {
      resetVideoUIStopped();
      this.activeChapterId = null;
      this.activeIllustrationUnit = 'All';
      this.render(container);
    };

    window.cajsSelectIllustrationUnit = (uName) => {
      resetVideoUIStopped();
      this.activeIllustrationUnit = uName;
      this.renderStudyArena(container, chId, subjects);
    };

    window.cajsArenaToggleChapter = (cId) => {
      resetVideoUIStopped();
      State.toggleChapter(cId);
      this.renderStudyArena(container, cId, subjects);
    };

    window.cajsToggleVideo = () => {
      if (this.isVideoPlaying) {
        // PAUSE & STOP
        resetVideoUIStopped();
      } else {
        // PLAY
        const bufferOverlay = document.getElementById('cajs-video-buffer');
        if (bufferOverlay) bufferOverlay.style.display = 'flex';

        setTimeout(() => {
          if (!this.activeChapterId) return;
          this.isVideoPlaying = true;
          if (bufferOverlay) bufferOverlay.style.display = 'none';

          const screenHud = document.getElementById('cajs-video-playing-hud');
          const thumb = document.getElementById('cajs-video-thumbnail');
          const playBtn = document.getElementById('cajs-video-play-btn');

          if (screenHud) screenHud.style.display = 'flex';
          if (thumb) thumb.style.display = 'none';
          if (playBtn) playBtn.innerHTML = 'Pause ❚❚';

          // Speech Synthesis AI Narration (Explains ONCE cleanly)
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(cleanNotesText);
            const speedSelect = document.getElementById('cajs-video-speed-select');
            const rateVal = speedSelect ? parseFloat(speedSelect.value) : 1.0;
            utterance.rate = rateVal;
            utterance.pitch = 1.0;

            utterance.onend = () => {
              resetVideoUIStopped();
            };

            utterance.onerror = () => {
              resetVideoUIStopped();
            };

            window.speechSynthesis.speak(utterance);
          }

          // Video timer playback interval
          if (this.videoPlayInterval) clearInterval(this.videoPlayInterval);
          this.videoPlayInterval = setInterval(() => {
            if (!this.isVideoPlaying) {
              clearInterval(this.videoPlayInterval);
              this.videoPlayInterval = null;
              return;
            }

            // Keep Chrome Web Speech engine active (prevents auto-pausing mid-lecture)
            if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
              window.speechSynthesis.resume();
            }

            if (this.videoCurrentTime >= videoDuration) {
              resetVideoUIStopped();
              return;
            }

            const speedSelect = document.getElementById('cajs-video-speed-select');
            const mult = speedSelect ? parseFloat(speedSelect.value) : 1.0;
            this.videoCurrentTime += mult;
            const timeLabel = document.getElementById('cajs-video-time-label');
            const slider = document.getElementById('cajs-video-slider');
            if (timeLabel) timeLabel.textContent = `${formatTime(this.videoCurrentTime)} / ${formatTime(videoDuration)}`;
            if (slider) slider.value = this.videoCurrentTime;
          }, 1000);

        }, 300);
      }
    };

    window.cajsSeekVideo = (val) => {
      this.videoCurrentTime = parseFloat(val);
      const timeLabel = document.getElementById('cajs-video-time-label');
      if (timeLabel) timeLabel.textContent = `${formatTime(this.videoCurrentTime)} / ${formatTime(videoDuration)}`;
    };

    window.cajsSetVideoSpeed = (speedVal) => {
      if (this.isVideoPlaying && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(cleanNotesText);
        utterance.rate = parseFloat(speedVal);
        utterance.onend = () => {
          resetVideoUIStopped();
        };
        utterance.onerror = () => {
          resetVideoUIStopped();
        };
        window.speechSynthesis.speak(utterance);
      }
    };

    window.cajsHandleNotesUpload = (inputEl) => {
      if (inputEl.files && inputEl.files[0]) {
        const file = inputEl.files[0];

        // Hide static, show spinner
        document.getElementById('cajs-upload-static').style.display = 'none';
        document.getElementById('cajs-upload-spinner').style.display = 'flex';

        // Play soft simulated uploader synth chime
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
          osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.15); // E5
          gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.35);
        } catch (e) {
          // Fallback if browser audio context blocked
        }

        setTimeout(() => {
          if (!this.activeChapterId) return;
          const szMb = (file.size / 1024 / 1024).toFixed(2) + " MB";

          State.addUploadedMaterial(chId, file.name, szMb);

          // Re-render
          this.renderStudyArena(container, chId, subjects);
          alert(`Reference guide "${file.name}" uploaded and synchronized successfully. Earned +15 points!`);
        }, 1200);
      }
    };
  }
};

