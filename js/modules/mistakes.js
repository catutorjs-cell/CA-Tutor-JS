// CA JS Mistakes Tracker Module
import { State } from '../state.js';
import { SYLLABUS_DATA } from '../seedData.js';

export const MistakesModule = {
  activeTab: 'active', // Options: 'active', 'resolved'

  render(container) {
    const level = State.user.examLevel;
    const subjects = SYLLABUS_DATA[level] || [];
    
    // Sort mistakes
    const activeMistakes = State.mistakes.filter(m => !m.resolved);
    const resolvedMistakes = State.mistakes.filter(m => m.resolved);
    const list = this.activeTab === 'active' ? activeMistakes : resolvedMistakes;

    // Renders the Mistakes list rows
    const mistakeItems = list.length > 0 ? list.map(m => `
      <div class="glass-card mistake-item ${m.resolved ? 'resolved-mistake' : 'active-mistake'}">
        <div class="mistake-header">
          <div>
            <h4 style="font-size: 15px; font-weight:600; line-height: 1.4;">${m.question}</h4>
            <div class="mistake-meta" style="margin-top: 6px;">
              <span class="badge badge-medium" style="font-size:10px;">${m.subject}</span>
              <span style="color:var(--text-muted); font-size:11px;">Chapter: ${m.chapter}</span>
              <span class="badge badge-${m.difficulty.toLowerCase()}" style="font-size:10px;">${m.difficulty}</span>
            </div>
          </div>
          <button class="btn ${m.resolved ? 'btn-secondary' : 'btn-success'}" style="padding: 6px 12px; font-size: 11px; flex-shrink: 0;" onclick="window.cajsToggleMistake('${m.id}')">
            ${m.resolved ? 'Re-open' : 'Mark Resolved ✓'}
          </button>
        </div>
        ${m.notes ? `<div class="mistake-notes"><strong>Self-note:</strong> ${m.notes}</div>` : ''}
        <span style="font-size:10px; color:var(--text-muted); text-align:right; display:block;">Added on ${new Date(m.addedDate).toLocaleDateString('en-US')}</span>
      </div>
    `).join('') : `
      <div class="glass-card" style="text-align: center; padding: 40px; color: var(--text-muted);">
        No ${this.activeTab} mistakes logged. Add one below to track your weak areas!
      </div>
    `;

    // Subject dropdown selector option lists
    const subjectDropdownOptions = subjects.map(sub => `
      <option value="${sub.subject}">${sub.subject}</option>
    `).join('');

    container.innerHTML = `
      <header class="app-header">
        <div class="header-title-container">
          <h1 class="header-branding">Mistakes Tracker</h1>
          <span class="header-subtitle">Analyze, log, and iron out weak concepts to boost your score</span>
        </div>
      </header>

      <div style="display:grid; grid-template-columns: 1.5fr 1fr; gap: 24px; align-items: start;">
        <!-- Left: List panel -->
        <div>
          <!-- Tab toggles -->
          <div class="papers-tabs">
            <button class="papers-tab-btn ${this.activeTab === 'active' ? 'active' : ''}" data-tab="active">Active Weak Areas (${activeMistakes.length})</button>
            <button class="papers-tab-btn ${this.activeTab === 'resolved' ? 'active' : ''}" data-tab="resolved">Resolved Items (${resolvedMistakes.length})</button>
          </div>

          <!-- Mistakes List container -->
          <div class="mistakes-list">
            ${mistakeItems}
          </div>
        </div>

        <!-- Right: Add Form Panel -->
        <div class="glass-card">
          <h3 class="header-branding" style="font-size: 18px; margin-bottom: 15px;">Log New Mistake</h3>
          <form id="add-mistake-form">
            <div class="form-group">
              <label class="form-label" for="mistake-subject">Subject</label>
              <select class="form-select" id="mistake-subject" required>
                <option value="" disabled selected>Select Subject</option>
                ${subjectDropdownOptions}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="mistake-chapter">Chapter Name</label>
              <select class="form-select" id="mistake-chapter" required disabled>
                <option value="" disabled selected>Select Subject first</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="mistake-q">Question / Weak Concept</label>
              <textarea class="form-input" id="mistake-q" required rows="3" placeholder="What question did you get wrong or what concept is confusing?" style="resize:none; font-family:var(--font-body);"></textarea>
            </div>

            <div class="form-group">
              <label class="form-label" for="mistake-notes">Self-Revision Notes</label>
              <textarea class="form-input" id="mistake-notes" rows="2" placeholder="Write steps to solve correctly next time..." style="resize:none; font-family:var(--font-body);"></textarea>
            </div>

            <div class="form-group">
              <label class="form-label" for="mistake-diff">Difficulty Level</label>
              <select class="form-select" id="mistake-diff" required>
                <option value="Medium" selected>Medium</option>
                <option value="Easy">Easy</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
              Save to Tracker
            </button>
          </form>
        </div>
      </div>
    `;

    // Dynamic chapters dropdown population depending on subject
    const subjectSelect = container.querySelector('#mistake-subject');
    const chapterSelect = container.querySelector('#mistake-chapter');

    subjectSelect.addEventListener('change', (e) => {
      const selectedSubName = e.target.value;
      const matchedSubjectObj = subjects.find(s => s.subject === selectedSubName);
      
      if (matchedSubjectObj) {
        chapterSelect.disabled = false;
        chapterSelect.innerHTML = matchedSubjectObj.chapters.map(ch => `
          <option value="${ch.name}">${ch.name}</option>
        `).join('');
      } else {
        chapterSelect.disabled = true;
        chapterSelect.innerHTML = '<option value="" disabled selected>Select Subject first</option>';
      }
    });

    // Form submission handler
    document.getElementById('add-mistake-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const sub = subjectSelect.value;
      const chap = chapterSelect.value;
      const q = document.getElementById('mistake-q').value.trim();
      const notes = document.getElementById('mistake-notes').value.trim();
      const diff = document.getElementById('mistake-diff').value;

      State.addMistake(q, sub, chap, notes, diff);
      alert("Mistake logged successfully!");
      
      this.render(container);
    });

    // Bind tab clicks
    const tabBtns = container.querySelectorAll('.papers-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeTab = e.target.getAttribute('data-tab');
        this.render(container);
      });
    });

    // Globals
    window.cajsToggleMistake = (mId) => {
      State.resolveMistake(mId);
      this.render(container);
    };
  }
};
