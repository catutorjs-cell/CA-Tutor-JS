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
    const subjectsList = SYLLABUS_DATA[State.user.examLevel] || [];
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
      <header class="app-header" style="display:flex; justify-content:space-between; align-items:center; width:100%; gap: 15px; flex-wrap: wrap;">
        <div class="header-title-container">
          <h1 class="header-branding">CA TUTOR JS</h1>
          <span class="header-subtitle">Welcome back, <strong>${user.fullName}</strong>! Let's crush your studies today.</span>
        </div>
        <button class="btn btn-secondary" style="font-size:11px; padding:6px 12px; border-radius:8px; display:inline-flex; align-items:center; gap:6px; cursor:pointer;" onclick="window.cajsStartOnboardingTour(true)">
          📖 Platform Tour
        </button>
      </header>

      <!-- Smart Suggestions Alert Box -->
      <div class="suggestion-box">
        <div class="suggestion-header">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="var(--pastel-purple-dark)" fill="none" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <h3>AI Revision Alert System</h3>
        </div>
        <div class="suggestion-content" id="suggestion-alert-body">
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
              <div class="flip-card-back glass-card stat-card" style="margin: 0; background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 245, 240, 0.96)) !important; border: var(--glass-border); justify-content: center; align-items: center; text-align: center; padding: 15px;">
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
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div style="background: rgba(255,255,255,0.3); border: var(--glass-border); border-radius: 14px; padding: 16px; text-align: center;">
              <div style="font-size: 32px;">🔥</div>
              <div style="font-family: var(--font-display); font-weight: 700; font-size: 20px;">${State.studyStats.streak} Days</div>
              <div style="font-size: 11px; color: var(--text-muted);">Current Study Streak</div>
            </div>

            <div style="background: rgba(255,255,255,0.3); border: var(--glass-border); border-radius: 14px; padding: 16px; text-align: center;">
              <div style="font-size: 32px;">✨</div>
              <div style="font-family: var(--font-display); font-weight: 700; font-size: 20px;">${State.studyStats.points} PTS</div>
              <div style="font-size: 11px; color: var(--text-muted);">Total Study Points</div>
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

    // Auto-trigger onboarding tour for first-time logged-in students
    setTimeout(() => {
      if (window.cajsStartOnboardingTour) {
        window.cajsStartOnboardingTour();
      }
    }, 450);
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
    const subjects = SYLLABUS_DATA[State.user.examLevel] || [];
    let done = 0;
    subjects.forEach(sub => {
      sub.chapters.forEach(ch => {
        if (State.completedChapters[ch.id]) done++;
      });
    });
    return done;
  },

  calculateSyllabusProgress() {
    const subjects = SYLLABUS_DATA[State.user.examLevel] || [];
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
    const subjects = SYLLABUS_DATA[State.user.examLevel] || [];
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
    const subjects = SYLLABUS_DATA[State.user.examLevel] || [];
    let totalChapters = 0;
    subjects.forEach(sub => totalChapters += sub.chapters.length);
    return totalChapters * 3;
  },

  getSmartSuggestions() {
    const level = State.user.examLevel;
    const mistakes = State.mistakes.filter(m => !m.resolved);
    const completed = State.completedChapters;
    const calendar = State.calendar;

    let alertItems = [];

    // 1. Check for Active Mistakes (Weak Areas)
    if (mistakes.length > 0) {
      const firstMistake = mistakes[0];
      alertItems.push(`📘 <strong>Revise Weak Area:</strong> You have an unresolved mistake in <strong>${firstMistake.subject} (${firstMistake.chapter})</strong>. Click on the <em>Mistakes Tracker</em> module to review it!`);
    }

    // 2. Check for Pending Chapters
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

    if (pendingChapter) {
      alertItems.push(`📚 <strong>Syllabus Progress:</strong> Keep the momentum going! Study <strong>${pendingChapter.ch}</strong> in <strong>${pendingChapter.sub}</strong> next.`);
    }

    // 3. Proximity to Exam Date
    if (calendar && calendar.examDate) {
      const today = new Date();
      const examDate = new Date(calendar.examDate);
      const diffTime = examDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        if (diffDays <= 30) {
          alertItems.push(`🚨 <strong>Critical Exam Proximity:</strong> Only <strong>${diffDays} days</strong> left until your CA ${level} exams! Focus entirely on mock test generators and solving PYQs.`);
        } else {
          alertItems.push(`📅 <strong>Exam Proximity:</strong> <strong>${diffDays} days</strong> remaining until your CA ${level} exams. Stay consistent with your daily revision calendar tasks.`);
        }
      }
    } else {
      alertItems.push(`📅 <strong>Get a Revision Plan:</strong> Set your exam target date in the <em>Revision Timetable</em> module to receive an auto-generated, daily study calendar!`);
    }

    if (alertItems.length === 0) {
      return "🎉 You are fully up to date with your studies! Challenge yourself with a new generated Mock Question Paper.";
    }

    return alertItems.map(item => `<div style="margin-bottom: 10px;">${item}</div>`).join('');
  },

  getLeaderboardSnippet() {
    // Merge user inside leaderboard
    const allUsers = [...State.friends];
    const userInList = allUsers.find(u => u.id === State.user.userId);
    if (!userInList) {
      allUsers.push({
        id: State.user.userId,
        name: State.user.fullName + " (You)",
        points: State.studyStats.points,
        level: State.user.examLevel
      });
    } else {
      userInList.points = State.studyStats.points;
      userInList.name = State.user.fullName + " (You)";
    }

    // Sort by points
    allUsers.sort((a,b) => b.points - a.points);
    const top3 = allUsers.slice(0, 3);

    return top3.map((u, idx) => {
      const medals = ["🥇", "🥈", "🥉"];
      const isMe = u.id === State.user.userId;
      return `
        <div class="leaderboard-row ${isMe ? 'me' : ''}" style="padding: 8px 12px; font-size: 13px; gap: 8px;">
          <span style="font-size: 14px;">${medals[idx]}</span>
          <div class="leaderboard-details">
            <span class="leaderboard-name">${u.name}</span>
            <span class="leaderboard-points">${u.points} pts</span>
          </div>
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
    title: "📚 Syllabus Tracker",
    desc: "Manage every single chapter of your CA Level. Click on chapters to read summaries, download official ICAI textbook PDFs, and log your **3 Revision Passes (R1, R2, R3)** to guarantee full exam readiness!",
    badge: "SYLLABUS",
    tab: "syllabus"
  },
  {
    title: "📝 Timed Written Exam Solver",
    desc: "Simulate real exam pressures inside our **Written Exam Arena**. Attempt official PYQs, MTPs, and RTPs with active countdown timers, enter draft answers directly, and view suggested answers instantly!",
    badge: "PAST PAPERS",
    tab: "pyq-mtp"
  },
  {
    title: "⚙️ Custom Question Generator",
    desc: "Need custom tests? Generate custom practice papers from preloaded MTP/RTP/PYQ assets tailored to specific subjects and marks! View saved generated papers and their answer keys directly in the panel.",
    badge: "GENERATOR",
    tab: "generator"
  },
  {
    title: "🔍 AI Doubt Decoder",
    desc: "Stuck on a tricky ledger adjustment or tax provision? Paste it or upload a scanned sheet, and our **AI Doubt Decoder** will break it down into simple, step-by-step concepts in seconds!",
    badge: "DOUBT DECODER",
    tab: "doubt-decoder"
  },
  {
    title: "⚠️ Mistakes Tracker",
    desc: "Every mistake is a stepping stone to success! Automatically log and flag wrong illustrations, classify errors by severity, and get custom revisions to turn weak chapters into your strongest areas.",
    badge: "MISTAKES",
    tab: "mistakes"
  },
  {
    title: "⏳ Pomodoro Study Hall",
    desc: "Supercharge your productivity! Set session goals, study alongside customizable focus timers, and listen to immersive, premium ambient soundscapes (like Rainy Library, Lofi Cafe, and Deep Focus).",
    badge: "STUDY HALL",
    tab: "pomodoro"
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

    // Switch corresponding sidebar tab in background to show where the feature is used
    if (step.tab) {
      const navItem = document.querySelector(`.nav-menu .nav-item[data-tab="${step.tab}"]`);
      if (navItem) {
        navItem.click();
        // Highlight active nav item programmatically
        if (currentStep > 0) {
          navItem.classList.add('cajs-tour-highlight');
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
          <button class="btn btn-secondary" id="ob-skip-btn" style="padding: 8px 14px; font-size: 11.5px; border-radius: 10px; border-color: transparent; background: transparent; color: var(--text-muted); cursor: pointer;">
            Skip Tour
          </button>
          
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary" id="ob-back-btn" style="padding: 8px 16px; font-size: 11.5px; border-radius: 10px; cursor: pointer; ${isFirst ? 'opacity: 0.4; cursor: not-allowed;' : ''}" ${isFirst ? 'disabled' : ''}>
              Back
            </button>
            <button class="btn btn-primary" id="ob-next-btn" style="padding: 8px 20px; font-size: 11.5px; border-radius: 10px; cursor: pointer;">
              ${isLast ? 'Finish Tour 🎉' : 'Next Step ➡️'}
            </button>
          </div>
        </div>
      </div>
    `;

    // Position Card Wrapper and Arrow Mark dynamically based on target sidebar nav item coordinates
    const navItem = document.querySelector(`.nav-menu .nav-item[data-tab="${step.tab}"]`);
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
        
        const cardHeight = 280; // approximate height
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
      modalEl.remove();
    });

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

