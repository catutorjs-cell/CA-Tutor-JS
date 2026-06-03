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

  render(container) {
    const level = State.user.examLevel;
    let subjects = SYLLABUS_DATA[level] || [];

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
        <header class="app-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div class="header-title-container">
            <h1 class="header-branding">Syllabus Explorer</h1>
            <span class="header-subtitle">CA ${level} Syllabus & Immersive Study Arenas</span>
          </div>
          ${level === 'Intermediate' ? `
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:12px; font-weight:600; color:var(--text-muted);">GROUP:</span>
            <div class="group-segment-control" style="display:flex; background:rgba(0,0,0,0.03); border-radius:20px; padding:3px; gap:4px; border: 1px solid rgba(0,0,0,0.05);">
              <button class="segment-btn ${this.activeGroup === 'Group 1' ? 'active' : ''}" data-group="Group 1" style="border:none; background:${this.activeGroup === 'Group 1' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeGroup === 'Group 1' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Group 1</button>
              <button class="segment-btn ${this.activeGroup === 'Group 2' ? 'active' : ''}" data-group="Group 2" style="border:none; background:${this.activeGroup === 'Group 2' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeGroup === 'Group 2' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Group 2</button>
              <button class="segment-btn ${this.activeGroup === 'All' ? 'active' : ''}" data-group="All" style="border:none; background:${this.activeGroup === 'All' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeGroup === 'All' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Both</button>
            </div>
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

    // Build Chapter list cards
    const chapterCards = currentSubject.chapters.map(ch => {
      const isDone = State.completedChapters[ch.id];
      const hasPDFs = ch.pdfUrls && ch.pdfUrls.length > 0;
      
      // Determine click handler for the chapter card header info (opens study arena)
      const mainClickHandler = `window.cajsOpenNotes('${ch.id}')`;
        
      // Build units pills HTML
      let unitsPillsHtml = '';
      if (ch.units && ch.units.length > 0) {
        unitsPillsHtml = `
          <div class="chapter-units-container" style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 8px;">
            ${ch.units.map(unit => `
              <a href="${unit.url}" target="_blank" class="unit-pill-btn" style="display: inline-flex; align-items: center; gap: 6px; padding: 5px 12px; background: rgba(255, 255, 255, 0.45); border: 1px solid rgba(0, 0, 0, 0.05); border-radius: 20px; font-size: 11px; font-weight: 600; color: var(--text-main); text-decoration: none;" onclick="event.stopPropagation();">
                <span style="font-size: 12px;">📄</span> ${unit.name}
              </a>
            `).join('')}
          </div>
        `;
      }

      return `
        <div class="glass-card chapter-card" style="animation: fadeIn 0.3s ease-out; display: flex; flex-direction: column; align-items: stretch; gap: 14px; padding: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 20px;">
            <div class="chapter-info" style="cursor: pointer; flex-grow: 1;" onclick="${mainClickHandler}">
              <span class="chapter-title" style="font-size: 16px; font-weight: 700; color: var(--text-main); display: flex; align-items: center; gap: 8px;">
                ${ch.name}
                ${hasPDFs ? '<span style="font-size: 11px; font-weight: 600; color: var(--pastel-purple-dark); background: rgba(217, 179, 255, 0.3); padding: 2px 8px; border-radius: 10px; border: 1px solid rgba(217, 179, 255, 0.45);">PDFs Attached</span>' : ''}
              </span>
              <div class="chapter-meta" style="margin-top: 6px;">
                <span class="badge badge-${ch.weightage.toLowerCase()}">${ch.weightage} Weightage</span>
              </div>
            </div>
            <div class="study-btn-group" style="flex-shrink: 0; display: flex; align-items: center; gap: 10px;">
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

    container.innerHTML = `
      <header class="app-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div class="header-title-container">
          <h1 class="header-branding">Syllabus Explorer</h1>
          <span class="header-subtitle">CA ${level} Syllabus & Immersive Study Arenas</span>
        </div>
        
        ${level === 'Intermediate' ? `
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px; font-weight:600; color:var(--text-muted);">GROUP:</span>
          <div class="group-segment-control" style="display:flex; background:rgba(0,0,0,0.03); border-radius:20px; padding:3px; gap:4px; border: 1px solid rgba(0,0,0,0.05);">
            <button class="segment-btn ${this.activeGroup === 'Group 1' ? 'active' : ''}" data-group="Group 1" style="border:none; background:${this.activeGroup === 'Group 1' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeGroup === 'Group 1' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Group 1</button>
            <button class="segment-btn ${this.activeGroup === 'Group 2' ? 'active' : ''}" data-group="Group 2" style="border:none; background:${this.activeGroup === 'Group 2' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeGroup === 'Group 2' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Group 2</button>
            <button class="segment-btn ${this.activeGroup === 'All' ? 'active' : ''}" data-group="All" style="border:none; background:${this.activeGroup === 'All' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeGroup === 'All' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Both</button>
          </div>
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

    // Make functions globally available for inline onclick handlers
    window.cajsToggleChapter = (chId) => {
      State.toggleChapter(chId);
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

  renderStudyArena(container, chId, subjects) {
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

    // Formatted duration: e.g. 15:40
    const videoDuration = chapter.videoDuration || 940; // 15 mins 40 seconds
    const formatTime = (secs) => {
      const mins = Math.floor(secs / 60);
      const remainingSecs = Math.floor(secs % 60);
      return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
    };

    // Solved Illustrations Q&A List
    const illustrationsHtml = chapter.illustrations.map((ill, index) => `
      <div class="glass-card" style="margin-bottom:12px; padding:15px; border-radius:12px; border-left:4px solid var(--pastel-purple-dark); background:rgba(255,255,255,0.4);">
        <div style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="document.getElementById('arena-ill-ans-${index}').style.display = document.getElementById('arena-ill-ans-${index}').style.display === 'none' ? 'block' : 'none'">
          <span style="font-size:13px; font-weight:700; color:var(--pastel-purple-dark); display:flex; align-items:center; gap:6px;">
            📄 Illustration ${index + 1}: ${ill.q.substring(0, 40)}...
          </span>
          <span style="font-size:11px; font-weight:600; color:var(--text-muted);">Toggle Answer ▾</span>
        </div>
        <p style="font-size:13px; font-weight:600; margin-top:8px; margin-bottom:8px;">${ill.q}</p>
        <div id="arena-ill-ans-${index}" style="display:none; border-top:1px solid rgba(0,0,0,0.05); padding-top:10px; margin-top:10px; transition:var(--transition-smooth);">
          <span style="font-size:11px; font-weight:700; color:var(--pastel-green-dark); display:block; margin-bottom:4px;">OFFICIAL ICAI SUGGESTED SOLUTION:</span>
          <p style="font-size:13px; line-height:1.5; color:var(--text-main); font-family:var(--font-body);">${ill.a}</p>
        </div>
      </div>
    `).join('');

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
      <header class="app-header">
        <div class="header-title-container" style="display:flex; align-items:center; gap:12px;">
          <button class="btn btn-secondary" style="padding:6px 12px; font-size:11px; display:flex; align-items:center; gap:4px;" onclick="window.cajsCloseStudyArena()">
            ← Back to Syllabus
          </button>
          <div>
            <h1 class="header-branding" style="font-size:22px; line-height:1.2;">Syllabus Study Arena</h1>
            <span class="header-subtitle">${subjectName} &bull; ${chapter.name}</span>
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
            <div id="cajs-video-screen" style="position:relative; width:100%; height:240px; border-radius:14px; background:linear-gradient(135deg, #1e1e2f, #3a3a5e); display:flex; align-items:center; justify-content:center; flex-direction:column; color:white; overflow:hidden; border:1px solid rgba(255,255,255,0.1);">
              
              <!-- Buffer loading overlay -->
              <div id="cajs-video-buffer" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); flex-direction:column; align-items:center; justify-content:center; gap:12px; z-index:10;">
                <div class="loading-spinner" style="width:36px; height:36px; border:3px solid rgba(255,255,255,0.2); border-top-color:var(--pastel-purple-dark);"></div>
                <span style="font-size:12px; font-weight:600; letter-spacing:0.5px;">Buffering secure stream...</span>
              </div>

              <!-- Static thumbnail state -->
              <div id="cajs-video-thumbnail" style="display:${this.isVideoPlaying ? 'none' : 'flex'}; flex-direction:column; align-items:center; justify-content:center; gap:8px;">
                <div style="width:56px; height:56px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; cursor:pointer; backdrop-filter:blur(5px); border:1px solid rgba(255,255,255,0.3); transition:transform 0.2s;" onclick="window.cajsToggleVideo()" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <span style="font-size:13px; font-weight:600; margin-top:5px;">${chapter.videoTitle || 'AI Mentor Concept Video Lecture'}</span>
                <span style="font-size:11px; opacity:0.7;">Duration: ${formatTime(videoDuration)} mins</span>
              </div>

              <!-- Live playing visual state -->
              <div id="cajs-video-playing-hud" style="display:${this.isVideoPlaying ? 'flex' : 'none'}; flex-direction:column; align-items:center; justify-content:center; gap:10px;">
                <!-- Equalizer simulation waves -->
                <div style="display:flex; gap:4px; height:30px; align-items:flex-end;">
                  <div class="eq-bar" style="width:4px; background:var(--pastel-purple); animation: eqBounce 0.8s infinite alternate ease-in-out;"></div>
                  <div class="eq-bar" style="width:4px; background:var(--pastel-blue); animation: eqBounce 1.2s infinite alternate ease-in-out; animation-delay:0.2s;"></div>
                  <div class="eq-bar" style="width:4px; background:var(--pastel-green); animation: eqBounce 0.7s infinite alternate ease-in-out; animation-delay:0.4s;"></div>
                  <div class="eq-bar" style="width:4px; background:var(--pastel-rose); animation: eqBounce 1.0s infinite alternate ease-in-out; animation-delay:0.1s;"></div>
                  <div class="eq-bar" style="width:4px; background:var(--pastel-purple); animation: eqBounce 0.9s infinite alternate ease-in-out; animation-delay:0.3s;"></div>
                </div>
                <span style="font-size:12px; font-weight:600; opacity:0.85;">Streaming ${chapter.videoTitle || 'Concept Lecture'}...</span>
              </div>

              <!-- Top floating metadata badge -->
              <div style="position:absolute; top:12px; left:12px; font-size:10px; font-weight:700; background:rgba(0,0,0,0.5); padding:3px 8px; border-radius:10px; display:flex; align-items:center; gap:4px;">
                <span style="width:6px; height:6px; background:#4beb8d; border-radius:50%;"></span>
                SECURE STREAM (CA-JS CLOUD)
              </div>
            </div>

            <!-- CONTROLS BAR -->
            <div style="display:flex; flex-direction:column; gap:10px; margin-top:12px; padding:0 5px;">
              <div style="display:flex; align-items:center; gap:10px; width:100%;">
                <button id="cajs-video-play-btn" class="btn" style="padding:6px 12px; font-size:11px; background:rgba(0,0,0,0.05); border:1px solid rgba(0,0,0,0.05);" onclick="window.cajsToggleVideo()">
                  ${this.isVideoPlaying ? 'Pause ||' : 'Play ▶'}
                </button>
                <input type="range" id="cajs-video-slider" style="flex-grow:1; accent-color:var(--pastel-purple-dark); height:4px; cursor:pointer;" min="0" max="${videoDuration}" value="${this.videoCurrentTime}" oninput="window.cajsSeekVideo(this.value)">
                <span id="cajs-video-time-label" style="font-size:11px; font-family:monospace; color:var(--text-muted); font-weight:600;">${formatTime(this.videoCurrentTime)} / ${formatTime(videoDuration)}</span>
              </div>
              
              <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; border-top:1px solid rgba(0,0,0,0.05); padding-top:8px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span>🔊 Volume</span>
                  <input type="range" style="width:60px; accent-color:var(--pastel-purple-dark); height:3px;" min="0" max="100" value="80">
                </div>
                <div style="display:flex; gap:8px;">
                  <span style="color:var(--text-muted);">Speed:</span>
                  <select style="background:transparent; border:none; font-weight:600; outline:none; cursor:pointer;">
                    <option value="1">1.0x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5" selected>1.5x (Recommended)</option>
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
            <h4 class="header-branding" style="font-size:14px; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
              💡 High-Yield Conceptual Summary
            </h4>
            <div style="background:rgba(255,255,255,0.5); border:1px solid rgba(0,0,0,0.03); border-radius:14px; padding:16px;">
              <p style="font-size:13px; line-height:1.6; color:var(--text-main); font-weight:500;">
                ${chapter.notes}
              </p>
              <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-top:12px; border-top:1px dashed rgba(0,0,0,0.06); padding-top:10px; font-size:10px; font-weight:700; flex-wrap:wrap;">
                <div style="display:flex; gap:8px;">
                  <span style="color:var(--pastel-purple-dark); background:rgba(217,179,255,0.25); padding:3px 8px; border-radius:12px;">🎯 EXAM RELEVANCE: HIGH</span>
                  <span style="color:var(--pastel-blue-dark); background:rgba(179,209,255,0.25); padding:3px 8px; border-radius:12px;">📚 MEMORIZATION REQUIRED</span>
                </div>
                ${chapter.pdfUrls && chapter.pdfUrls.length > 0 ? `
                  <a href="${chapter.pdfUrls[0]}" target="_blank" rel="noopener noreferrer" style="color:white; background:var(--pastel-purple-dark); padding:6px 12px; border-radius:10px; text-decoration:none; font-size:11px; font-weight:700; display:inline-flex; align-items:center; gap:4px; transition: var(--transition-smooth);" onmouseover="this.style.opacity='0.9'; this.style.transform='translateY(-1px)';" onmouseout="this.style.opacity='1'; this.style.transform='none';">
                    📖 Open Chapter PDF
                  </a>
                ` : ''}
              </div>
            </div>
          </div>

          <!-- ILLUSTRATIVE SOLVED EXAMPLES -->
          <div>
            <h4 class="header-branding" style="font-size:14px; margin-bottom:8px; display:flex; align-items:center; gap:6px; padding-left:4px;">
              ✍️ Illustrative Solved Examples
            </h4>
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
    `;

    // Hook global handlers for Study Arena
    window.cajsCloseStudyArena = () => {
      this.activeChapterId = null;
      this.isVideoPlaying = false;
      if (this.videoPlayInterval) {
        clearInterval(this.videoPlayInterval);
        this.videoPlayInterval = null;
      }
      this.render(container);
    };

    window.cajsArenaToggleChapter = (cId) => {
      State.toggleChapter(cId);
      this.renderStudyArena(container, cId, subjects);
    };

    window.cajsToggleVideo = () => {
      if (this.isVideoPlaying) {
        // Pause
        this.isVideoPlaying = false;
        clearInterval(this.videoPlayInterval);
        this.videoPlayInterval = null;
        this.renderStudyArena(container, chId, subjects);
      } else {
        // Buffer simulation
        const bufferOverlay = document.getElementById('cajs-video-buffer');
        if (bufferOverlay) bufferOverlay.style.display = 'flex';
        
        setTimeout(() => {
          if (!this.activeChapterId) return; // Safeguard if navigated away
          this.isVideoPlaying = true;
          
          if (bufferOverlay) bufferOverlay.style.display = 'none';
          
          const screenHud = document.getElementById('cajs-video-playing-hud');
          const thumb = document.getElementById('cajs-video-thumbnail');
          const playBtn = document.getElementById('cajs-video-play-btn');
          
          if (screenHud) screenHud.style.display = 'flex';
          if (thumb) thumb.style.display = 'none';
          if (playBtn) playBtn.textContent = 'Pause ||';

          this.videoPlayInterval = setInterval(() => {
            if (this.videoCurrentTime >= videoDuration) {
              clearInterval(this.videoPlayInterval);
              this.videoPlayInterval = null;
              this.isVideoPlaying = false;
              this.videoCurrentTime = 0;
              this.renderStudyArena(container, chId, subjects);
              return;
            }
            this.videoCurrentTime += 1.5; // Simulate 1.5x speed increase
            const timeLabel = document.getElementById('cajs-video-time-label');
            const slider = document.getElementById('cajs-video-slider');
            if (timeLabel) timeLabel.textContent = `${formatTime(this.videoCurrentTime)} / ${formatTime(videoDuration)}`;
            if (slider) slider.value = this.videoCurrentTime;
          }, 1000);
          
        }, 800);
      }
    };

    window.cajsSeekVideo = (val) => {
      this.videoCurrentTime = parseFloat(val);
      const timeLabel = document.getElementById('cajs-video-time-label');
      if (timeLabel) timeLabel.textContent = `${formatTime(this.videoCurrentTime)} / ${formatTime(videoDuration)}`;
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

