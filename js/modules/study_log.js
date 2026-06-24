// CA JS Study Log Module
import { State } from '../state.js';
import { SYLLABUS_DATA } from '../seedData.js';

export const StudyLogModule = {
  isModalOpen: false,

  render(container) {
    const user = State.user;
    if (!user) return;
    const level = user.examLevel;
    const subjects = SYLLABUS_DATA[level] || [];
    const logs = State.studyLogs || [];
    const stats = State.studyStats || { totalMinutes: 0, streak: 0, points: 100 };

    // Format total time beautifully
    const formatMinutes = (totalMin) => {
      const hrs = Math.floor(totalMin / 60);
      const mins = totalMin % 60;
      if (hrs > 0) {
        return `${hrs}h ${mins}m`;
      }
      return `${mins} mins`;
    };

    // Calculate weekly study progress
    const weeklyTarget = 600; // 10 hours target
    const currentWeekMinutes = logs
      .filter(l => {
        const logDate = new Date(l.date);
        const now = new Date();
        const diffTime = Math.abs(now - logDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      })
      .reduce((sum, l) => sum + l.duration, 0);

    const progressPct = Math.min(100, Math.round((currentWeekMinutes / weeklyTarget) * 100));

    // Category emoji mapping
    const getCategoryEmoji = (cat) => {
      switch (cat) {
        case 'Reading Notes': return '📚';
        case 'Practicing MCQs': return '🎯';
        case 'Writing Descriptive Answers': return '✍️';
        case 'Watching Video Lectures': return '🎥';
        case 'Revision': return '🔄';
        default: return '📖';
      }
    };

    // Build timeline items list
    const sortedLogs = [...logs].sort((a, b) => new Date(b.date + 'T' + (b.loggedAt?.split('T')[1] || '00:00:00')) - new Date(a.date + 'T' + (a.loggedAt?.split('T')[1] || '00:00:00')));
    
    const timelineHtml = sortedLogs.length > 0 ? sortedLogs.map(l => `
      <div class="glass-card timeline-item" style="padding:16px; margin-bottom:12px; border-radius:16px; display:flex; gap:16px; align-items:start; position:relative; background:rgba(255,255,255,0.45); animation:fadeIn 0.3s ease-out;">
        <div style="font-size:24px; padding:10px; background:white; border-radius:12px; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 10px rgba(0,0,0,0.03); border:1px solid rgba(0,0,0,0.05);">
          ${getCategoryEmoji(l.category)}
        </div>
        <div style="flex-grow:1; text-align:left;">
          <div style="display:flex; justify-content:space-between; align-items:start; flex-wrap:wrap; gap:8px;">
            <div>
              <h4 style="font-size:13px; font-weight:700; margin:0; color:var(--text-main);">${l.subject}</h4>
              <span style="font-size:11px; font-weight:600; color:var(--text-muted);">${l.chapter || 'General Chapter'} &bull; ${l.category}</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="badge" style="font-size:10px; background:rgba(124, 58, 237, 0.08); color:var(--pastel-purple-dark); padding:3px 10px; font-weight:700; border-radius:10px;">⏱️ ${l.duration} mins</span>
              <button class="delete-log-btn" style="background:none; border:none; cursor:pointer; font-size:14px; color:var(--pastel-rose-dark); padding:4px; border-radius:50%; transition:var(--transition-smooth); display:flex; align-items:center; justify-content:center;" onclick="window.cajsDeleteStudyLog('${l.id}')" title="Delete Log">🗑️</button>
            </div>
          </div>
          ${l.notes ? `<p style="font-size:12px; font-style:italic; color:var(--text-muted); margin-top:8px; border-top:1px dashed rgba(0,0,0,0.04); padding-top:6px;">"${l.notes}"</p>` : ''}
          <span style="font-size:9.5px; color:var(--text-muted); display:block; margin-top:8px; font-weight:700; text-transform:uppercase;">📅 ${new Date(l.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    `).join('') : `
      <div style="text-align:center; padding:40px 20px; color:var(--text-muted); font-size:13px;" class="glass-card">
        <span style="font-size:36px; display:block; margin-bottom:12px; opacity:0.5;">📅</span>
        <strong>No Study Sessions Logged Yet</strong>
        <p style="max-width:260px; margin:6px auto 0; line-height:1.5;">Start logging your study hours manually, earn bonus points, and maintain your streak!</p>
      </div>
    `;

    // Modal popup HTML
    const modalHtml = this.isModalOpen ? `
      <div id="cajs-log-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.45); backdrop-filter:blur(14px); display:flex; align-items:center; justify-content:center; z-index:10006; animation:fadeIn 0.25s ease-out;">
        <div class="glass-card" style="width:90%; max-width:480px; padding:28px; border-radius:24px; background:rgba(255, 255, 255, 0.92); border:1px solid rgba(255, 255, 255, 0.45); animation:scaleUp 0.3s cubic-bezier(0.34,1.56,0.64,1); box-sizing:border-box;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(0,0,0,0.06); padding-bottom:12px; margin-bottom:18px;">
            <h3 class="header-branding" style="font-size:18px; margin:0;">Log Study Session</h3>
            <button style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--text-muted);" onclick="window.cajsCloseLogModal()">&times;</button>
          </div>
          <form id="study-log-form" style="display:flex; flex-direction:column; gap:12px;">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Date</label>
              <input type="date" class="form-input" id="log-date" required value="${new Date().toISOString().split('T')[0]}">
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Subject</label>
              <select class="form-select" id="log-subject" required>
                <option value="" disabled selected>Select Subject</option>
                ${subjects.map(s => `<option value="${s.subject}">${s.subject}</option>`).join('')}
              </select>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Topic / Chapter</label>
              <input type="text" class="form-input" id="log-chapter" placeholder="e.g. Partnership Dissolution, Companies Act Section 8">
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">Duration (Mins)</label>
                <input type="number" class="form-input" id="log-duration" required min="5" placeholder="e.g. 45" style="box-sizing:border-box; width:100%;">
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">Study Category</label>
                <select class="form-select" id="log-category" required>
                  <option value="Reading Notes" selected>Reading Notes</option>
                  <option value="Practicing MCQs">Practicing MCQs</option>
                  <option value="Writing Descriptive Answers">Writing Answers</option>
                  <option value="Watching Video Lectures">Video Lecture</option>
                  <option value="Revision">Revision</option>
                </select>
              </div>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Reflections / Key Takeaways</label>
              <textarea class="form-input" id="log-notes" placeholder="What key concepts did you master? Note any topics needing revision..." style="resize:none; height:80px; font-family:var(--font-body); font-size:12.5px;"></textarea>
            </div>
            <div style="display:flex; gap:10px; margin-top:10px;">
              <button type="button" class="btn btn-secondary" style="flex:1; font-size:12px; padding:10px;" onclick="window.cajsCloseLogModal()">Cancel</button>
              <button type="submit" class="btn btn-primary" style="flex:1.5; font-size:12px; padding:10px;">Save Session 💾</button>
            </div>
          </form>
        </div>
      </div>` : '';

    container.innerHTML = `
      <header class="app-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div class="header-title-container">
          <h1 class="header-branding">Study Log & Analytics</h1>
          <span class="header-subtitle">Manually record study increments, track goals, and build consistent habits</span>
        </div>
        <button class="btn btn-primary" onclick="window.cajsOpenLogModal()" style="font-size:12.5px; padding:10px 18px;">
          ➕ Log Study Session
        </button>
      </header>

      <!-- METRIC DASHBOARD CARD -->
      <div style="display:grid; grid-template-columns:1fr 1fr 1.2fr; gap:20px; margin-bottom:24px; animation:fadeIn 0.3s ease-out;">
        <div class="glass-card" style="padding:20px; display:flex; align-items:center; gap:14px;">
          <div style="font-size:28px; width:48px; height:48px; border-radius:12px; background:rgba(236,72,153,0.1); display:flex; align-items:center; justify-content:center; color:#ec4899;">⏱️</div>
          <div style="text-align:left;">
            <span style="font-size:10px; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Total Study Time</span>
            <h3 style="font-size:20px; font-weight:800; color:var(--text-main); margin-top:2px;">${formatMinutes(stats.totalMinutes)}</h3>
          </div>
        </div>
        <div class="glass-card" style="padding:20px; display:flex; align-items:center; gap:14px;">
          <div style="font-size:28px; width:48px; height:48px; border-radius:12px; background:rgba(245,158,11,0.1); display:flex; align-items:center; justify-content:center; color:#f59e0b;">🔥</div>
          <div style="text-align:left;">
            <span style="font-size:10px; color:var(--text-muted); font-weight:700; text-transform:uppercase;">Current Streak</span>
            <h3 style="font-size:20px; font-weight:800; color:var(--text-main); margin-top:2px;">${stats.streak} Days</h3>
          </div>
        </div>
        <div class="glass-card" style="padding:20px 24px; display:flex; flex-direction:column; justify-content:center; gap:6px;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px;">
            <strong style="color:var(--text-muted); text-transform:uppercase;">Weekly Goal</strong>
            <span style="font-weight:700; color:var(--pastel-purple-dark);">${currentWeekMinutes} / ${weeklyTarget} mins (${progressPct}%)</span>
          </div>
          <div style="width:100%; height:8px; background:rgba(0,0,0,0.05); border-radius:4px; overflow:hidden;">
            <div style="width:${progressPct}%; height:100%; background:linear-gradient(90deg, var(--pastel-purple-dark), var(--pastel-blue-dark)); border-radius:4px; transition:width 0.4s;"></div>
          </div>
        </div>
      </div>

      <!-- TIMELINE LOGS -->
      <div style="animation:fadeIn 0.3s ease-out;">
        <h3 class="header-branding" style="font-size:16px; margin-bottom:12px; text-align:left; padding-left:4px;">Study History Timeline</h3>
        <div class="timeline-container">
          ${timelineHtml}
        </div>
      </div>

      <!-- Log Modal -->
      ${modalHtml}
      
      <style>
        .timeline-item {
          transition: var(--transition-smooth);
        }
        .timeline-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(31, 38, 135, 0.05);
        }
        .delete-log-btn:hover {
          background: rgba(244, 114, 182, 0.15) !important;
          transform: scale(1.1);
        }
      </style>
    `;

    // ── FORM BINDINGS ─────────────────────────────────────────────────────────
    if (this.isModalOpen) {
      const form = container.querySelector('#study-log-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const date = container.querySelector('#log-date').value;
          const subject = container.querySelector('#log-subject').value;
          const chapter = container.querySelector('#log-chapter').value.trim() || 'General Practice';
          const duration = container.querySelector('#log-duration').value;
          const category = container.querySelector('#log-category').value;
          const notes = container.querySelector('#log-notes').value.trim();

          State.addStudyLog(date, subject, chapter, duration, category, notes);
          
          this.isModalOpen = false;
          alert(`Successfully logged ${duration} study minutes. Earned +${duration * 2} points!`);
          this.render(container);
        });
      }
    }

    // Expose helpers globally
    window.cajsOpenLogModal = () => {
      this.isModalOpen = true;
      this.render(container);
    };

    window.cajsCloseLogModal = () => {
      this.isModalOpen = false;
      this.render(container);
    };

    window.cajsDeleteStudyLog = (logId) => {
      if (confirm("Are you sure you want to delete this study log entry? This will also deduct the logged study minutes and points from your profile.")) {
        State.deleteStudyLog(logId);
        this.render(container);
      }
    };
  }
};
