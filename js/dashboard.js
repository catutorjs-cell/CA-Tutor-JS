// CA JS Dashboard Controller
import { State } from './state.js';
import { SYLLABUS_DATA } from './seedData.js';

export const Dashboard = {
  render(container) {
    const user = State.user;
    if (!user) return;

    // Calculate Metrics
    const syllabusPercent = this.calculateSyllabusProgress();
    const mockPercent = this.calculateMockProgress();
    const calendarPercent = this.calculateCalendarProgress();
    const checklistPercent = this.calculateChecklistProgress();

    // Calculate Revisions Breakdown for the checklist card
    const subjectsList = SYLLABUS_DATA[State.user?.examLevel || 'Foundation'] || [];
    let r1Count = 0;
    let r2Count = 0;
    let r3Count = 0;
    let totalChapsCount = 0;
    
    subjectsList.forEach(sub => {
      sub.chapters.forEach(ch => {
        totalChapsCount++;
        const rev = State.revisions[ch.id];
        if (rev) {
          if (rev.r1) r1Count++;
          if (rev.r2) r2Count++;
          if (rev.r3) r3Count++;
        }
      });
    });

    const suggestion = this.getSmartSuggestions();
    const leaderboardRows = this.getLeaderboardSnippet();
    
    // Check if revision timetable calendar schedule is generated & active
    const isCalendarActive = State.calendar && State.calendar.schedule.length > 0;

    container.innerHTML = `
      <!-- Header -->
      <header class="app-header">
        <div class="header-title-container">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 4px; flex-wrap: wrap;">
            <h1 class="header-branding" style="margin: 0; line-height: 1.2;">CA TUTOR JS</h1>
            <button class="btn btn-secondary" style="font-size:11px; padding:4px 10px; border-radius:8px; display:inline-flex; align-items:center; gap:4px; cursor:pointer; height:fit-content;" onclick="window.cajsStartOnboardingTour(true)">
              📖 Platform Tour
            </button>
          </div>
          <span class="header-subtitle">Welcome back, <strong>${user.fullName}</strong>! Let's crush your studies today.</span>
        </div>
      </header>

      <!-- Smart Suggestions Alert Box -->
      <div class="suggestion-box">
        <div class="suggestion-header" style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="var(--pastel-purple-dark)" fill="none" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <h3 style="margin: 0;">AI Revision Alert System</h3>
          </div>
          <button class="btn btn-secondary" id="btn-open-alert-popup" style="font-size: 11.5px; padding: 5px 12px; border-radius: 10px; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-weight: 700; color: var(--pastel-purple-dark); border-color: rgba(124, 58, 237, 0.2); background: rgba(124, 58, 237, 0.08);">
            🔔 Pop-up View
          </button>
        </div>
        <div class="suggestion-content" id="suggestion-alert-body" style="margin-top: 10px;">
          ${suggestion}
        </div>
      </div>


      <!-- 3 Progress Analytics Cards (with 3D Flippable Revision Card) -->
      <div class="dashboard-grid" style="grid-template-columns: repeat(3, 1fr);">
        <!-- Card 1: Syllabus -->
        <div class="glass-card stat-card">
          <div class="progress-ring-container">
            <svg width="70" height="70">
              <circle cx="35" cy="35" r="28" stroke="rgba(0,0,0,0.03)" stroke-width="6" fill="transparent"/>
              <circle id="ring-syllabus" cx="35" cy="35" r="28" stroke="var(--pastel-purple-dark)" stroke-width="6" fill="transparent"
                class="progress-ring-circle" />
            </svg>
            <span class="progress-percent-label">${syllabusPercent}%</span>
          </div>
          <div class="stat-info">
            <span class="stat-value">${this.getActiveLevelCompletedCount()} Chapters</span>
            <span class="stat-label">Syllabus Completed</span>
          </div>
        </div>

        <!-- Card 2: Mock Papers -->
        <div class="glass-card stat-card">
          <div class="progress-ring-container">
            <svg width="70" height="70">
              <circle cx="35" cy="35" r="28" stroke="rgba(0,0,0,0.03)" stroke-width="6" fill="transparent"/>
              <circle id="ring-mock" cx="35" cy="35" r="28" stroke="var(--pastel-blue-dark)" stroke-width="6" fill="transparent"
                class="progress-ring-circle" />
            </svg>
            <span class="progress-percent-label">${mockPercent}%</span>
          </div>
          <div class="stat-info">
            <span class="stat-value">${State.papers ? State.papers.length : 0} Tests</span>
            <span class="stat-label">Mock Papers Solved</span>
          </div>
        </div>

        <!-- Card 3: 3D Flippable Revision Progress Card (Total front, Exam back) -->
        <div class="dashboard-flip-card" id="dashboard-rev-flip-card">
          <div class="flip-card-inner">

            <!-- FRONT (always): Total Revision Completion -->
            <div class="flip-card-front glass-card stat-card" style="margin: 0; display: flex !important; flex-direction: row !important; align-items: center; gap: 16px; justify-content: flex-start; width: 100%;">
              <div class="progress-ring-container">
                <svg width="70" height="70">
                  <circle cx="35" cy="35" r="28" stroke="rgba(0,0,0,0.03)" stroke-width="6" fill="transparent"/>
                  <circle id="ring-checklist" cx="35" cy="35" r="28" stroke="var(--pastel-green-dark)" stroke-width="6" fill="transparent"
                    class="progress-ring-circle" />
                </svg>
                <span class="progress-percent-label">${checklistPercent}%</span>
              </div>
              <div class="stat-info" style="text-align: left;">
                <span class="stat-value">${r1Count + r2Count + r3Count} / ${totalChapsCount * 3} Revisions</span>
                <span class="stat-label">Total Revision Completion</span>
                <div style="font-size: 8.5px; color: var(--text-muted); font-weight: 700; margin-top: 2px; letter-spacing: 0.1px; margin-bottom: 2px;">
                  R1:<strong>${r1Count}</strong> | R2:<strong>${r2Count}</strong> | R3:<strong>${r3Count}</strong>
                </div>
                <div class="flip-trigger" style="font-size: 8px; color: var(--pastel-green-dark); font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; cursor: pointer; display: inline-block;">
                  ${isCalendarActive ? 'Exam Progress 📅' : 'Planner Inactive 📅'} • Click to Flip 🔄
                </div>
              </div>
            </div>

            <!-- BACK: Exam Revision Progress (if active) OR Planner Inactive reminder -->
            ${isCalendarActive ? `
              <div class="flip-card-back glass-card stat-card" style="margin: 0; display: flex !important; flex-direction: row !important; align-items: center; gap: 16px; justify-content: flex-start; width: 100%; background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 245, 240, 0.96)) !important; border: var(--glass-border); padding: 15px 20px;">
                <div class="progress-ring-container">
                  <svg width="70" height="70">
                    <circle cx="35" cy="35" r="28" stroke="rgba(0,0,0,0.03)" stroke-width="6" fill="transparent"/>
                    <circle id="ring-calendar" cx="35" cy="35" r="28" stroke="var(--pastel-peach-dark)" stroke-width="6" fill="transparent"
                      class="progress-ring-circle" />
                  </svg>
                  <span class="progress-percent-label">${calendarPercent}%</span>
                </div>
                <div class="stat-info" style="text-align: left;">
                  <span class="stat-value">${this.getCalendarCompletedCount()} / ${this.getCalendarTotalCount()} Tasks</span>
                  <span class="stat-label">Exam Revision Progress</span>
                  <div class="flip-trigger" style="font-size: 8px; color: var(--pastel-peach-dark); font-weight: bold; margin-top: 3px; letter-spacing: 0.5px; text-transform: uppercase; cursor: pointer; display: inline-block;">
                    Active Planner 📅 • Click to Flip 🔄
                  </div>
                </div>
              </div>
            ` : `
               <div class="flip-card-back glass-card stat-card" style="margin: 0; display: flex !important; flex-direction: column !important; gap: 2px !important; background: ...; justify-content: center; align-items: center; text-align: center; padding: 15px;">
                <div style="font-size: 20px; margin-bottom: 2px;">📅</div>
                <span style="font-size: 10px; font-weight: 800; color: var(--pastel-peach-dark); text-transform: uppercase; letter-spacing: 0.5px;">Planner Inactive</span>
                <span style="font-size: 9px; color: var(--text-muted); line-height: 1.3; margin-top: 2px; display: block;">
                  Generate revision schedule in <strong>Revision Timetable</strong> planner!
                </span>
                <div class="flip-trigger" style="font-size: 8px; color: var(--pastel-peach-dark); font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 4px; cursor: pointer; display: inline-block;">
                  Planner Inactive • Click to Flip 🔄
                </div>
              </div>
            `}

          </div>
        </div>
      </div>


      <!-- Split Layout: Streak/Badges & Leaderboard Preview -->
      <div class="dashboard-split">
        <!-- Left Side: Consistency Streak & Quick Stats -->
        <div class="glass-card" style="display: flex; flex-direction: column; gap: 20px;">
          <h3 class="header-branding" style="font-size: 18px; margin-bottom: 5px;">Study Performance & Streaks</h3>
          
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
            <div style="background: rgba(255,255,255,0.3); border: var(--glass-border); border-radius: 14px; padding: 14px; text-align: center;">
              <div style="font-size: 28px;">🔥</div>
              <div style="font-family: var(--font-display); font-weight: 800; font-size: 18px;">${State.studyStats.streak} Days</div>
              <div style="font-size: 10.5px; color: var(--text-muted); font-weight:600;">Daily Streak</div>
            </div>

            <div style="background: rgba(255,255,255,0.3); border: var(--glass-border); border-radius: 14px; padding: 14px; text-align: center;">
              <div style="font-size: 28px;">🎁</div>
              <div style="font-family: var(--font-display); font-weight: 800; font-size: 18px; color: var(--pastel-purple-dark);">+${State.getTodayPoints()} PTS</div>
              <div style="font-size: 10.5px; color: var(--text-muted); font-weight:600;">Daily Points Today</div>
            </div>

            <div style="background: rgba(255,255,255,0.3); border: var(--glass-border); border-radius: 14px; padding: 14px; text-align: center;">
              <div style="font-size: 28px;">⏱️</div>
              <div style="font-family: var(--font-display); font-weight: 800; font-size: 18px;">${State.getTodayMinutes()} Mins</div>
              <div style="font-size: 10.5px; color: var(--text-muted); font-weight:600;">Studied Today</div>
            </div>
          </div>

          <div>
            <h4 style="font-size: 14px; font-weight: bold; margin-bottom: 10px;">Badges Earned</h4>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="badges-container">
              ${this.renderBadges()}
            </div>
          </div>
        </div>

        <!-- Right Side: Leaderboard Quick Glance -->
        <div class="glass-card">
          <h3 class="header-branding" style="font-size: 18px; margin-bottom: 12px;">Top Rankers</h3>
          <div class="leaderboard-list">
            ${leaderboardRows}
          </div>
          <button class="btn btn-secondary" style="width: 100%; margin-top: 15px; font-size: 12px; padding: 8px;" id="btn-goto-leaderboard">
            View Complete Leaderboard
          </button>
        </div>
      </div>
    `;

    // Trigger ring offset updates
    setTimeout(() => {
      this.updateProgressRing('ring-syllabus', syllabusPercent);
      this.updateProgressRing('ring-mock', mockPercent);
      this.updateProgressRing('ring-calendar', calendarPercent);
      this.updateProgressRing('ring-checklist', checklistPercent);
    }, 50);

    // Bind navigation to complete leaderboard
    document.getElementById('btn-goto-leaderboard').addEventListener('click', () => {
      const activeNav = document.querySelector('.nav-item[data-tab="social"]');
      if (activeNav) activeNav.click();
    });

    // Bind click trigger to flip revision card
    const flipCard = document.getElementById('dashboard-rev-flip-card');
    if (flipCard) {
      // Always start on the front face (reset any leftover flipped state)
      flipCard.classList.remove('flipped');
      flipCard.addEventListener('click', (e) => {
        if (e.target.closest('.flip-trigger')) {
          flipCard.classList.toggle('flipped');
        }
      });
    }

    // Bind click to open AI Revision Alert Popup modal
    const btnOpenAlertPopup = container.querySelector('#btn-open-alert-popup');
    if (btnOpenAlertPopup) {
      btnOpenAlertPopup.addEventListener('click', () => {
        this.showLoginAlertModal(true);
      });
    }

    // Auto-trigger AI Revision Alert Popup on login / dashboard load
    setTimeout(() => {
      this.showLoginAlertModal(false);
    }, 550);

    // Auto-trigger onboarding tour for first-time logged-in students
    setTimeout(() => {
      if (window.cajsStartOnboardingTour) {
        window.cajsStartOnboardingTour();
      }
    }, 850);
  },

  updateProgressRing(ringId, percent) {
    const ring = document.getElementById(ringId);
    if (!ring) return;
    const circumference = 2 * Math.PI * 28;
    ring.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (percent / 100) * circumference;
    ring.style.strokeDashoffset = offset;
  },

  getActiveLevelCompletedCount() {
    const subjects = SYLLABUS_DATA[State.user?.examLevel || 'Foundation'] || [];
    let done = 0;
    subjects.forEach(sub => {
      sub.chapters.forEach(ch => {
        if (State.completedChapters[ch.id]) done++;
      });
    });
    return done;
  },

  calculateSyllabusProgress() {
    const subjects = SYLLABUS_DATA[State.user?.examLevel || 'Foundation'] || [];
    let totalChapters = 0;
    subjects.forEach(sub => totalChapters += sub.chapters.length);

    if (totalChapters === 0) return 0;
    const done = this.getActiveLevelCompletedCount();
    return Math.round((done / totalChapters) * 100);
  },

  calculateMockProgress() {
    const level = State.user?.examLevel || 'Intermediate';
    const subjects = SYLLABUS_DATA[level] || [];
    if (subjects.length === 0) return 0;

    let activeMockCount = 0;
    subjects.forEach(sub => {
      const solvedForSub = State.papers.filter(p => p.subject === sub.subject).length;
      activeMockCount += Math.min(solvedForSub, 3);
    });

    const totalTarget = subjects.length * 3;
    return Math.round((activeMockCount / totalTarget) * 100);
  },

  calculateCalendarProgress() {
    if (!State.calendar || State.calendar.schedule.length === 0) return 0;
    const schedule = State.calendar.schedule;
    const completed = schedule.filter(item => item.done).length;
    return Math.round((completed / schedule.length) * 100);
  },

  getCalendarCompletedCount() {
    if (!State.calendar) return 0;
    return State.calendar.schedule.filter(item => item.done).length;
  },

  getCalendarTotalCount() {
    if (!State.calendar) return 0;
    return State.calendar.schedule.length;
  },

  calculateChecklistProgress() {
    const subjects = SYLLABUS_DATA[State.user?.examLevel || 'Foundation'] || [];
    let totalChapters = 0;
    let checkedRevs = 0;
    
    subjects.forEach(sub => {
      sub.chapters.forEach(ch => {
        totalChapters++;
        const rev = State.revisions[ch.id];
        if (rev) {
          if (rev.r1) checkedRevs++;
          if (rev.r2) checkedRevs++;
          if (rev.r3) checkedRevs++;
        }
      });
    });

    if (totalChapters === 0) return 0;
    return Math.round((checkedRevs / (totalChapters * 3)) * 100);
  },

  getChecklistCompletedCount() {
    let checkedRevs = 0;
    Object.values(State.revisions).forEach(rev => {
      if (rev.r1) checkedRevs++;
      if (rev.r2) checkedRevs++;
      if (rev.r3) checkedRevs++;
    });
    return checkedRevs;
  },

  getChecklistTotalCount() {
    const subjects = SYLLABUS_DATA[State.user?.examLevel || 'Foundation'] || [];
    let totalChapters = 0;
    subjects.forEach(sub => totalChapters += sub.chapters.length);
    return totalChapters * 3;
  },

  getSmartSuggestionsData() {
    const level = State.user?.examLevel || 'Foundation';
    const mistakes = State.mistakes.filter(m => !m.resolved);
    const completed = State.completedChapters;
    const calendar = State.calendar;

    // 1. Exact Mistake Alert (Bold text, no background mark pill)
    let mistakeAlert = null;
    if (mistakes.length > 0) {
      const firstMistake = mistakes[0];
      const detailStr = `${firstMistake.subject} (${firstMistake.chapter}) — "${firstMistake.question || firstMistake.notes || 'Unresolved Question'}"`;
      mistakeAlert = {
        title: "Revise Weak Area",
        text: `You have an unresolved mistake in <strong>${detailStr}</strong>. Click on the <em>Mistakes Tracker</em> module to review it!`,
        highlight: detailStr,
        rawMistake: firstMistake,
        hasMistake: true
      };
    } else {
      mistakeAlert = {
        title: "Revise Weak Area",
        text: `You have no unresolved mistakes logged in your tracker! Great job maintaining 100% accuracy.`,
        highlight: "No unresolved mistakes logged!",
        hasMistake: false
      };
    }

    // 2. Exact Syllabus Progress & Next Chapter Alert (Bold text, no background mark pill)
    const syllabusPercent = this.calculateSyllabusProgress();
    const subjects = SYLLABUS_DATA[level] || [];
    let pendingChapter = null;
    for (const sub of subjects) {
      for (const ch of sub.chapters) {
        if (!completed[ch.id]) {
          pendingChapter = { sub: sub.subject, ch: ch.name };
          break;
        }
      }
      if (pendingChapter) break;
    }

    let syllabusAlert = null;
    if (pendingChapter) {
      syllabusAlert = {
        title: "Syllabus Progress",
        text: `Keep the momentum going! Study <strong>${pendingChapter.ch}</strong> in <strong>${pendingChapter.sub}</strong> next.`,
        percent: syllabusPercent,
        nextChap: `${pendingChapter.ch} in ${pendingChapter.sub}`
      };
    } else {
      syllabusAlert = {
        title: "Syllabus Progress",
        text: `100% Full Syllabus Done! 🎉 Challenge yourself with a generated mock paper.`,
        percent: 100,
        nextChap: "All Chapters Completed"
      };
    }

    // 3. Exact Days to Go for Exam Alert (ONLY THIS ITEM HAS THE HIGHLIGHTED BADGE)
    let examAlert = null;
    if (calendar && calendar.examDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const examDate = new Date(calendar.examDate);
      examDate.setHours(0, 0, 0, 0);
      const diffTime = examDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const formattedExamDate = examDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      if (diffDays > 0) {
        examAlert = {
          title: "Days to Go for Exam",
          text: `<mark style="background: rgba(245, 158, 11, 0.18); color: #d97706; font-weight: 800; padding: 3px 10px; border-radius: 6px; border: 1px solid rgba(245, 158, 11, 0.4); font-size: 1.02em; display: inline-block;">⏳ ${diffDays} Days Remaining</mark> until your CA ${level} exams (${formattedExamDate}). Stay consistent with your daily study goals!`,
          days: diffDays,
          hasDate: true
        };
      } else if (diffDays === 0) {
        examAlert = {
          title: "Days to Go for Exam",
          text: `<mark style="background: rgba(239, 68, 68, 0.2); color: #dc2626; font-weight: 800; padding: 3px 10px; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.4);">🔥 TODAY IS EXAM DAY!</mark> All the best for your CA ${level} paper today!`,
          days: 0,
          hasDate: true
        };
      } else {
        examAlert = {
          title: "Days to Go for Exam",
          text: `<mark style="background: rgba(239, 68, 68, 0.15); color: #dc2626; font-weight: 800; padding: 3px 10px; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.35);">Target Exam Date Passed</mark>. Update your target date in the <em>Revision Timetable</em> module.`,
          days: diffDays,
          hasDate: true
        };
      }
    } else {
      examAlert = {
        title: "Days to Go for Exam",
        text: `<mark style="background: rgba(245, 158, 11, 0.18); color: #d97706; font-weight: 800; padding: 3px 10px; border-radius: 6px; border: 1px solid rgba(245, 158, 11, 0.4);">Set Target Exam Date in Revision Timetable</mark> to receive an auto-generated daily study calendar & countdown timer!`,
        days: null,
        hasDate: false
      };
    }

    return { mistakeAlert, syllabusAlert, examAlert };
  },

  getSmartSuggestions() {
    const { mistakeAlert, syllabusAlert, examAlert } = this.getSmartSuggestionsData();

    return `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <div style="font-size: 13.5px; line-height: 1.55;">
          📘 <strong>${mistakeAlert.title}:</strong> ${mistakeAlert.text}
        </div>
        <div style="font-size: 13.5px; line-height: 1.55;">
          📚 <strong>${syllabusAlert.title}:</strong> ${syllabusAlert.text}
        </div>
        <div style="font-size: 13.5px; line-height: 1.55;">
          📅 <strong>${examAlert.title}:</strong> ${examAlert.text}
        </div>
      </div>
    `;
  },

  showLoginAlertModal(force = false) {
    // Only show pop-up modal if the user has set their Revision Timetable (examDate configured)
    const isTimetableSet = !!(State.calendar && State.calendar.examDate);
    if (!isTimetableSet && !force) return;

    const sessionKey = `cajs_login_alert_shown_${State.user?.userId || 'guest'}`;
    if (sessionStorage.getItem(sessionKey) && !force) return;

    const modalId = 'cajs-login-alert-modal';
    let existingModal = document.getElementById(modalId);
    if (existingModal) existingModal.remove();

    const { examAlert } = this.getSmartSuggestionsData();
    const user = State.user;
    const level = user?.examLevel || 'Foundation';

    const modal = document.createElement('div');
    modal.id = modalId;
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(10, 15, 30, 0.5); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      display: flex; align-items: center; justify-content: center;
      z-index: 10009; animation: fadeIn 0.3s ease-out; padding: 20px; box-sizing: border-box;
    `;

    modal.innerHTML = `
      <div class="glass-card" style="width: 100%; max-width: 500px; padding: 30px; border-radius: 24px; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3); background: rgba(255, 255, 255, 0.95); border: 1.5px solid rgba(255, 255, 255, 0.6); display: flex; flex-direction: column; gap: 22px; animation: scaleUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); box-sizing: border-box;">
        
        <!-- Modal Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(0,0,0,0.07); padding-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="width: 50px; height: 50px; border-radius: 16px; background: linear-gradient(135deg, #f59e0b, #d97706); display: flex; align-items: center; justify-content: center; font-size: 26px; color: white; box-shadow: 0 6px 18px rgba(245, 158, 11, 0.35); flex-shrink: 0;">
              ⏳
            </div>
            <div>
              <span style="font-size: 10.5px; font-weight: 800; color: #d97706; text-transform: uppercase; letter-spacing: 1px; background: rgba(245, 158, 11, 0.12); padding: 3px 10px; border-radius: 12px; display: inline-block;">
                EXAM COUNTDOWN ALERT
              </span>
              <h2 style="font-size: 20px; font-weight: 800; margin: 4px 0 0 0; color: var(--text-main); font-family: var(--font-display);">
                Welcome back, ${user?.fullName || 'Student'}! 👋
              </h2>
            </div>
          </div>
          <button id="close-login-alert-modal" style="background: none; border: none; font-size: 24px; cursor: pointer; color: var(--text-muted); line-height: 1; padding: 4px;">&times;</button>
        </div>

        <!-- Highlighted Exam Days Remaining Card -->
        <div style="background: linear-gradient(135deg, rgba(255, 251, 235, 0.95), rgba(254, 243, 199, 0.95)); border: 2px solid rgba(251, 191, 36, 0.5); border-radius: 20px; padding: 22px 20px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; box-shadow: 0 8px 24px rgba(245, 158, 11, 0.08);">
          <div style="font-size: 13px; font-weight: 800; color: #d97706; text-transform: uppercase; letter-spacing: 0.8px;">
            📅 CA ${level} Exam Countdown
          </div>
          
          <div style="font-size: 14px; color: var(--text-main); line-height: 1.6; text-align: center;">
            ${examAlert.text}
          </div>
        </div>

        <!-- Footer / Action Buttons -->
        <div style="display: flex; gap: 12px; justify-content: center; align-items: center; margin-top: 4px; border-top: 1px solid rgba(0,0,0,0.06); padding-top: 16px;">
          <button id="alert-modal-goto-planner" class="btn btn-secondary" style="padding: 11px 18px; font-size: 12.5px; border-radius: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px;">
            📅 Revision Timetable
          </button>
          <button id="alert-modal-dismiss" class="btn btn-primary" style="padding: 11px 26px; font-size: 13px; border-radius: 12px; font-weight: 800; cursor: pointer; background: linear-gradient(135deg, #f59e0b, #d97706); border: none; color: white; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.35);">
            Let's Study! 🚀
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => {
      sessionStorage.setItem(sessionKey, 'true');
      modal.remove();
    };

    modal.querySelector('#close-login-alert-modal').addEventListener('click', closeModal);
    modal.querySelector('#alert-modal-dismiss').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    const btnPlanner = modal.querySelector('#alert-modal-goto-planner');
    if (btnPlanner) {
      btnPlanner.addEventListener('click', () => {
        closeModal();
        const navItem = document.querySelector('.nav-menu .nav-item[data-tab="revision"]');
        if (navItem) navItem.click();
      });
    }
  },

  getLeaderboardSnippet() {
    const allUsers = State.getAllLeaderboardUsers();
    allUsers.sort((a,b) => b.points - a.points);
    const top3 = allUsers.slice(0, 3);

    return top3.map((u, idx) => {
      const medals = ["🥇", "🥈", "🥉"];
      const isMe = u.isMe;
      return `
        <div class="leaderboard-row ${isMe ? 'me' : ''}" style="padding: 8px 12px; font-size: 13px; gap: 8px; display:flex; align-items:center; justify-content:space-between;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size: 14px;">${medals[idx]}</span>
            <div class="leaderboard-details">
              <span class="leaderboard-name" style="font-weight:700;">${u.name}</span>
              <span class="badge badge-low" style="font-size:9.5px; padding:2px 6px; border-radius:8px; font-family:monospace; margin-left:4px;">${u.id}</span>
            </div>
          </div>
          <span class="leaderboard-points" style="font-weight:800; color:var(--pastel-purple-dark);">${u.points} pts</span>
        </div>
      `;
    }).join('');
  },

  renderBadges() {
    const points = State.studyStats.points;
    const streak = State.studyStats.streak;
    const solvedPapers = State.papers.length;

    let badges = [];
    if (points >= 100) badges.push({ text: "🎓 CA Rookie", color: "var(--pastel-blue)", textCol: "var(--pastel-blue-dark)" });
    if (points >= 1500) badges.push({ text: "⭐ Elite Scholar", color: "var(--pastel-purple)", textCol: "var(--pastel-purple-dark)" });
    if (streak >= 3) badges.push({ text: "🔥 Streak King", color: "var(--pastel-peach)", textCol: "var(--pastel-peach-dark)" });
    if (solvedPapers >= 1) badges.push({ text: "📝 Paper Solver", color: "var(--pastel-green)", textCol: "var(--pastel-green-dark)" });
    if (State.mistakes.filter(m => m.resolved).length >= 2) badges.push({ text: "🛠️ Mistake Fixer", color: "var(--pastel-rose)", textCol: "var(--pastel-rose-dark)" });

    if (badges.length === 0) {
      return `<span style="font-size: 12px; color: var(--text-muted); font-style: italic;">No badges earned yet. Complete your first Pomodoro or Syllabus chapter!</span>`;
    }

    return badges.map(b => `<span class="badge" style="background: ${b.color}; color: ${b.textCol}; padding: 6px 12px; font-size: 12px; border-radius: 12px;">${b.text}</span>`).join('');
  }
};

const onboardingSteps = [
  {
    title: "🚀 Welcome to CA TUTOR JS!",
    desc: "Welcome to your intelligent, beautifully-designed study companion built specifically to help you master the CA Foundation, Intermediate, and Final exams! Let's take a quick 1-minute tour of your core capabilities.",
    badge: "GET STARTED",
    tab: "dashboard"
  },
  {
    title: "📊 Intelligent Dashboard",
    desc: "Track your active **Syllabus Progress**, **Mock Tests solved**, and **Revisions completed** in real-time. View smart AI suggestions, consistency streaks, study badges, and check your rank on the student leaderboard!",
    badge: "DASHBOARD",
    tab: "dashboard"
  },
  {
    title: "📚 Syllabus Explorer",
    desc: "Manage every single chapter of your CA Level. Click on chapters to read summaries, download official ICAI textbook PDFs, and log your study progress to stay on track!",
    badge: "SYLLABUS",
    tab: "syllabus"
  },
  {
    title: "📝 Past Papers & Mock Exams",
    desc: "Simulate real exam pressures inside our **Written Exam Arena**. Attempt official PYQs, MTPs, and RTPs with active countdown timers, enter draft answers directly, and view suggested answers instantly!",
    badge: "PAST PAPERS",
    tab: "pyq-mtp"
  },
  {
    title: "📅 Revision Timetable Planner",
    desc: "Generate a dynamic study schedule based on your target exam date. Include custom subjects, mix chapter topics to prevent monotony, and track your checklist progress over 3 distinct revision passes (R1, R2, R3)!",
    badge: "REVISION PLANNER",
    tab: "revision"
  },
  {
    title: "🚨 Mistakes Tracker",
    desc: "Every mistake is a stepping stone to success! Automatically log and flag wrong illustrations, classify errors by severity, and get custom revisions to turn weak chapters into your strongest areas.",
    badge: "MISTAKES",
    tab: "mistakes"
  },
  {
    title: "🔍 AI Doubt Decoder",
    desc: "Stuck on a tricky ledger adjustment or tax provision? Paste it or upload a scanned sheet, and our **AI Doubt Decoder** will break it down into simple, step-by-step concepts in seconds!",
    badge: "DOUBT DECODER",
    tab: "doubt-decoder"
  },
  {
    title: "⏳ Pomodoro Study Hall",
    desc: "Supercharge your productivity! Set session goals, study alongside customizable focus timers, and listen to immersive, premium ambient soundscapes (like Rainy Library, Lofi Cafe, and Deep Focus).",
    badge: "STUDY HALL",
    tab: "pomodoro"
  },
  {
    title: "🏆 Leaderboard & Community",
    desc: "Connect with fellow CA aspirants! Search and follow peers by their Student IDs, compare study stats (progress, tests, streak, points), and climb the leaderboard rank to stay motivated.",
    badge: "LEADERBOARD",
    tab: "social"
  },
  {
    title: "⚡ Custom Question Generator",
    desc: "Need custom tests? Generate custom practice papers from preloaded MTP/RTP/PYQ assets tailored to specific subjects and marks! View saved generated papers and their answer keys directly in the panel.",
    badge: "GENERATOR",
    tab: "generator"
  },
  {
    title: "📈 Performance Analytics",
    desc: "Gain deep insights into your study habits. Review your diagnostic exam readiness, mock test score trends, consistency grids, and detailed subject strength ratios calculated from your activity.",
    badge: "ANALYTICS",
    tab: "analytics"
  },
  {
    title: "🎯 Syllabus MCQ Practice",
    desc: "Test your knowledge with chapter-wise multiple choice questions. Correct answers award points to your profile, while wrong selections are automatically logged into your Mistakes Tracker for future review.",
    badge: "MCQ PRACTICE",
    tab: "mcq-practice"
  },
  {
    title: "📝 Manual Study Log",
    desc: "Keep an accurate daily timeline of your manual study sessions. Specify date, subject, category (like reading notes or writing answers), and duration to build a complete learning history.",
    badge: "STUDY LOG",
    tab: "study-log"
  },
  {
    title: "✍️ Profile & Student Feedback",
    desc: "Customize your profile avatar, view your official dynamic Student ID card, and share your suggestions, feature requests, or bug reports with us at any time directly in the panel!",
    badge: "PROFILE & FEEDBACK",
    tab: "profile"
  }
];

window.cajsStartOnboardingTour = (force = false) => {
  const onboardingKey = `cajs_onboarding_completed_${State.user.email}`;
  if (localStorage.getItem(onboardingKey) && !force) return;

  const modalId = 'cajs-onboarding-modal';
  let modalEl = document.getElementById(modalId);
  
  // If the onboarding tour is already active, prevent re-initialization loops during tab switches
  if (modalEl && !force) return;
  
  if (modalEl) modalEl.remove();

  // Inject CSS for bouncing arrow and premium item highlighting if not already present
  if (!document.getElementById('cajs-onboarding-styles')) {
    const style = document.createElement('style');
    style.id = 'cajs-onboarding-styles';
    style.innerHTML = `
      @keyframes ob-bounce {
        0% { transform: translateX(0) scale(1); }
        50% { transform: translateX(-10px) scale(1.08); }
        100% { transform: translateX(0) scale(1); }
      }
      .ob-arrow-bounce {
        animation: ob-bounce 0.8s infinite ease-in-out;
      }
      .cajs-tour-highlight {
        position: relative;
        z-index: 10007 !important;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
      }
      .cajs-tour-highlight a {
        background: rgba(255, 255, 255, 0.96) !important;
        box-shadow: 0 0 0 3.5px #ff2d55, 0 10px 30px rgba(255, 45, 85, 0.3) !important;
        color: var(--text-main) !important;
        transform: scale(1.06) translateX(10px) !important;
      }
      .cajs-tour-highlight .nav-icon-emoji {
        transform: scale(1.3) !important;
      }
      .user-widget.cajs-tour-highlight {
        background: rgba(255, 255, 255, 0.96) !important;
        box-shadow: 0 0 0 3.5px #ff2d55, 0 10px 30px rgba(255, 45, 85, 0.3) !important;
        transform: scale(1.04) translateX(10px) !important;
        border-radius: 16px;
      }
    `;
    document.head.appendChild(style);
  }

  let currentStep = 0;
  modalEl = document.createElement('div');
  modalEl.id = modalId;
  modalEl.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(10, 10, 20, 0.15); backdrop-filter: blur(1px);
    z-index: 10005; pointer-events: none;
  `;

  // Render container structure (High-contrast, glowing left-pointing arrow)
  modalEl.innerHTML = `
    <div id="ob-arrow" class="ob-arrow-bounce" style="position: absolute; display: none; z-index: 10006; pointer-events: none; filter: drop-shadow(0 4px 12px rgba(255, 45, 85, 0.6)) drop-shadow(0 2px 4px rgba(255, 159, 10, 0.4)); transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1); width: 54px; height: 54px;">
      <svg width="54" height="54" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="arrow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ff2d55" />
            <stop offset="100%" stop-color="#ff9f0a" />
          </linearGradient>
        </defs>
        <!-- Outer white shadow/outline stroke for perfect visibility on any background color -->
        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#ffffff" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Inner glowing gradient stroke -->
        <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="url(#arrow-grad)" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div id="ob-card-wrapper" style="pointer-events: auto;"></div>
  `;

  document.body.appendChild(modalEl);

  const renderStep = () => {
    const step = onboardingSteps[currentStep];
    const isFirst = currentStep === 0;
    const isLast = currentStep === onboardingSteps.length - 1;

    // Clear any previous tour highlighting
    document.querySelectorAll('.nav-menu .nav-item').forEach(item => {
      item.classList.remove('cajs-tour-highlight');
    });
    const userWidget = document.querySelector('.user-widget');
    if (userWidget) userWidget.classList.remove('cajs-tour-highlight');

    // Switch corresponding sidebar tab in background to show where the feature is used
    if (step.tab) {
      if (step.tab === 'profile') {
        if (window.cajsGoToProfile) {
          window.cajsGoToProfile();
        }
        if (userWidget && currentStep > 0) {
          userWidget.classList.add('cajs-tour-highlight');
        }
      } else {
        const navItem = document.querySelector(`.nav-menu .nav-item[data-tab="${step.tab}"]`);
        if (navItem) {
          navItem.click();
          // Highlight active nav item programmatically
          if (currentStep > 0) {
            navItem.classList.add('cajs-tour-highlight');
          }
        }
      }
    }

    // Bullets Indicator
    const bullets = onboardingSteps.map((_, idx) => `
      <div style="width: 8px; height: 8px; border-radius: 50%; background: ${idx === currentStep ? 'var(--pastel-purple-dark)' : 'rgba(0,0,0,0.1)'}; transition: all 0.2s;"></div>
    `).join('');

    const cardWrapper = modalEl.querySelector('#ob-card-wrapper');
    cardWrapper.innerHTML = `
      <div class="glass-card" style="width: 100%; padding: 30px; border-radius: 24px; box-shadow: 0 25px 60px rgba(0,0,0,0.15); background: rgba(255, 255, 255, 0.94); border: 1px solid rgba(255,255,255,0.5); text-align: center; display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.06); padding-bottom: 10px; margin-bottom: 4px;">
          <span style="font-size: 9.5px; font-weight: 800; color: var(--pastel-purple-dark); letter-spacing: 1px; text-transform: uppercase; background: rgba(108,93,211,0.08); padding: 4px 10px; border-radius: 20px;">
            ${step.badge}
          </span>
          <span style="font-size: 10.5px; color: var(--text-muted); font-weight: 700;">
            Step ${currentStep + 1} of ${onboardingSteps.length}
          </span>
        </div>

        <div>
          <h2 class="header-branding" style="font-size: 20px; margin: 0 0 8px 0; background: linear-gradient(135deg, #7c3aed, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            ${step.title}
          </h2>
          <p style="font-size: 13px; color: var(--text-main); line-height: 1.55; margin: 0; font-family: var(--font-body); text-align: left;">
            ${step.desc}
          </p>
        </div>

        <!-- Bullet Indicator dots -->
        <div style="display: flex; gap: 8px; justify-content: center; margin: 6px 0;">
          ${bullets}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; border-top: 1px solid rgba(0,0,0,0.06); padding-top: 14px;">
          <div style="display: flex; gap: 8px; align-items: center;">
            <button class="btn btn-secondary" id="ob-skip-btn" style="padding: 8px 10px; font-size: 11.5px; border-radius: 10px; border-color: transparent; background: transparent; color: var(--text-muted); cursor: pointer;">
              Skip
            </button>
            <button class="btn btn-secondary" id="ob-feedback-btn" style="padding: 8px 10px; font-size: 11.5px; border-radius: 10px; border-color: transparent; background: transparent; color: var(--pastel-purple-dark); cursor: pointer; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
              ✍️ Feedback
            </button>
          </div>
          
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-secondary" id="ob-back-btn" style="padding: 8px 14px; font-size: 11.5px; border-radius: 10px; cursor: pointer; ${isFirst ? 'opacity: 0.4; cursor: not-allowed;' : ''}" ${isFirst ? 'disabled' : ''}>
              Back
            </button>
            <button class="btn btn-primary" id="ob-next-btn" style="padding: 8px 18px; font-size: 11.5px; border-radius: 10px; cursor: pointer;">
              ${isLast ? 'Finish 🎉' : 'Next ➡️'}
            </button>
          </div>
        </div>
      </div>
    `;

    // Position Card Wrapper and Arrow Mark dynamically based on target sidebar nav item coordinates
    const navItem = step.tab === 'profile'
      ? document.querySelector('.user-widget')
      : document.querySelector(`.nav-menu .nav-item[data-tab="${step.tab}"]`);
    const arrowEl = modalEl.querySelector('#ob-arrow');

    if (currentStep === 0 || !navItem) {
      // Welcome Step: Center of screen, hide arrow
      cardWrapper.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%; max-width: 480px;
        transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        pointer-events: auto;
      `;
      arrowEl.style.display = 'none';
    } else {
      // Check if mobile or desktop layout
      if (window.innerWidth <= 768) {
        // Mobile view: card floats at bottom above bottom-nav, hide horizontal arrow to avoid clutter
        cardWrapper.style.cssText = `
          position: absolute;
          left: 50%;
          bottom: 90px;
          transform: translateX(-50%);
          width: calc(100% - 32px); max-width: 420px;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          pointer-events: auto;
        `;
        arrowEl.style.display = 'none';
      } else {
        // Desktop Step: Dock next to active sidebar element, show arrow pointing at it
        const rect = navItem.getBoundingClientRect();
        const sidebarRight = rect.right || 240;
        const itemCenterY = rect.top + (rect.height / 2);
        
        const cardHeight = 360; // accurate height to keep buttons visible within viewport
        const cardTop = Math.max(20, Math.min(window.innerHeight - cardHeight - 20, itemCenterY - (cardHeight / 2)));
        const cardLeft = sidebarRight + 55; // Account for 10px translation in highlight mode

        const arrowTop = itemCenterY - 27; // Centered vertically for 54px SVG height
        const arrowLeft = sidebarRight + 8;

        cardWrapper.style.cssText = `
          position: absolute;
          left: ${cardLeft}px;
          top: ${cardTop}px;
          width: 100%; max-width: 380px;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          pointer-events: auto;
        `;

        arrowEl.style.display = 'block';
        arrowEl.style.left = `${arrowLeft}px`;
        arrowEl.style.top = `${arrowTop}px`;
      }
    }

    // Bind events
    cardWrapper.querySelector('#ob-skip-btn').addEventListener('click', () => {
      localStorage.setItem(onboardingKey, 'true');
      document.querySelectorAll('.nav-menu .nav-item').forEach(item => {
        item.classList.remove('cajs-tour-highlight');
      });
      const userWidget = document.querySelector('.user-widget');
      if (userWidget) userWidget.classList.remove('cajs-tour-highlight');
      modalEl.remove();
    });

    const feedbackBtn = cardWrapper.querySelector('#ob-feedback-btn');
    if (feedbackBtn) {
      feedbackBtn.addEventListener('click', () => {
        if (window.cajsOpenFeedbackModal) {
          window.cajsOpenFeedbackModal();
        }
      });
    }

    cardWrapper.querySelector('#ob-back-btn').addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        renderStep();
      }
    });

    cardWrapper.querySelector('#ob-next-btn').addEventListener('click', () => {
      if (isLast) {
        localStorage.setItem(onboardingKey, 'true');
        document.querySelectorAll('.nav-menu .nav-item').forEach(item => {
          item.classList.remove('cajs-tour-highlight');
        });
        const userWidget = document.querySelector('.user-widget');
        if (userWidget) userWidget.classList.remove('cajs-tour-highlight');
        window.cajsShowAlert("✨ Onboarding Completed", "You are now fully briefed and ready to conquer your CA exams! Click on any module in the sidebar to get started.", "success");
        modalEl.remove();
      } else {
        currentStep++;
        renderStep();
      }
    });
  };

  renderStep();
};

