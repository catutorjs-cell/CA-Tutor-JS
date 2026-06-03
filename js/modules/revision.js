// CA JS Revision Hub (Timetable Planner & Smart Revision Checklist Tracker)
import { State } from '../state.js';
import { SYLLABUS_DATA } from '../seedData.js';

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

const subjectColors = {
  "Paper-1: Advanced Accounting (May 2026 Scheme)": {
    bg: "rgba(33, 150, 243, 0.04)",
    text: "#0d47a1",
    accent: "#2196f3",
    border: "rgba(33, 150, 243, 0.15)"
  },
  "Paper-2: Corporate and Other Laws (May 2026 Scheme)": {
    bg: "rgba(156, 39, 176, 0.04)",
    text: "#4a148c",
    accent: "#9c27b0",
    border: "rgba(156, 39, 176, 0.15)"
  },
  "Paper-3A: Income-tax Law (May 2026 Scheme)": {
    bg: "rgba(76, 175, 80, 0.04)",
    text: "#1b5e20",
    accent: "#4caf50",
    border: "rgba(76, 175, 80, 0.15)"
  },
  "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)": {
    bg: "rgba(0, 150, 136, 0.04)",
    text: "#004d40",
    accent: "#009688",
    border: "rgba(0, 150, 136, 0.15)"
  },
  "Paper-4: Cost and Management Accounting (May 2026 Scheme)": {
    bg: "rgba(255, 152, 0, 0.04)",
    text: "#e65100",
    accent: "#ff9800",
    border: "rgba(255, 152, 0, 0.15)"
  },
  "Paper-5: Auditing and Ethics (May 2026 Scheme)": {
    bg: "rgba(244, 67, 54, 0.04)",
    text: "#b71c1c",
    accent: "#f44336",
    border: "rgba(244, 67, 54, 0.15)"
  },
  "Paper-6A: Financial Management (May 2026 Scheme)": {
    bg: "rgba(233, 30, 99, 0.04)",
    text: "#880e4f",
    accent: "#e91e63",
    border: "rgba(233, 30, 99, 0.15)"
  },
  "Paper-6B: Strategic Management (May 2026 Scheme)": {
    bg: "rgba(0, 188, 212, 0.04)",
    text: "#006064",
    accent: "#00bcd4",
    border: "rgba(0, 188, 212, 0.15)"
  }
};

const getSubjectColors = (subjectName) => {
  return subjectColors[subjectName] || {
    bg: "rgba(103, 58, 183, 0.04)",
    text: "#311b92",
    accent: "#673ab7",
    border: "rgba(103, 58, 183, 0.15)"
  };
};

export const RevisionModule = {
  activeHubTab: 'tracker', // Options: 'tracker', 'timetable'
  selectedSubject: 'All',
  activeGroup: 'All', // Options: 'All', 'Group 1', 'Group 2'

  render(container) {
    const level = State.user.examLevel;
    let subjects = SYLLABUS_DATA[level] || [];

    if (level === 'Intermediate' && this.activeGroup && this.activeGroup !== 'All') {
      subjects = subjects.filter(sub => getSubjectGroup(sub.subject) === this.activeGroup);
    }

    // Hub Header tabs & Group selector
    const headerTabs = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
        <div class="papers-tabs" style="margin-bottom: 0;">
          <button class="papers-tab-btn ${this.activeHubTab === 'tracker' ? 'active' : ''}" data-hubtab="tracker">Smart Revision Tracker</button>
          <button class="papers-tab-btn ${this.activeHubTab === 'timetable' ? 'active' : ''}" data-hubtab="timetable">Revision Timetable Planner</button>
        </div>
        
        ${level === 'Intermediate' ? `
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:12px; font-weight:600; color:var(--text-muted);">GROUP FILTER:</span>
          <div class="group-segment-control" style="display:flex; background:rgba(0,0,0,0.03); border-radius:20px; padding:3px; gap:4px; border: 1px solid rgba(0,0,0,0.05);">
            <button class="segment-btn ${this.activeGroup === 'Group 1' ? 'active' : ''}" data-group="Group 1" style="border:none; background:${this.activeGroup === 'Group 1' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeGroup === 'Group 1' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Group 1</button>
            <button class="segment-btn ${this.activeGroup === 'Group 2' ? 'active' : ''}" data-group="Group 2" style="border:none; background:${this.activeGroup === 'Group 2' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeGroup === 'Group 2' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Group 2</button>
            <button class="segment-btn ${this.activeGroup === 'All' ? 'active' : ''}" data-group="All" style="border:none; background:${this.activeGroup === 'All' ? 'var(--pastel-purple-dark)' : 'transparent'}; color:${this.activeGroup === 'All' ? 'white' : 'var(--text-muted)'}; padding:6px 16px; border-radius:18px; font-size:12px; font-weight:600; cursor:pointer; transition: all 0.2s;">Both</button>
          </div>
        </div>
        ` : ''}
      </div>
    `;

    if (this.activeHubTab === 'timetable') {
      // 1. TIMETABLE TAB VIEWS
      if (State.calendar) {
        this.renderSchedule(container, headerTabs);
      } else {
        this.renderScheduleSetup(container, headerTabs, subjects);
      }
    } else {
      // 2. REVISION CHECKLIST TRACKER TAB VIEWS
      this.renderChecklistTracker(container, headerTabs, subjects, level);
    }

    // Bind Hub Tab switches
    const tabBtns = container.querySelectorAll('.papers-tab-btn[data-hubtab]');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeHubTab = e.target.getAttribute('data-hubtab');
        this.render(container);
      });
    });

    // Bind Group Filter segment buttons
    const segmentBtns = container.querySelectorAll('.group-segment-control .segment-btn');
    segmentBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeGroup = e.currentTarget.getAttribute('data-group');
        this.render(container);
      });
    });
  },

  renderScheduleSetup(container, headerTabs, subjects) {
    const subjectCheckboxes = subjects.map(sub => `
      <label class="preset-sub-checkbox-label" style="display:flex; align-items:center; gap:8px; margin-bottom: 8px; font-size:14px; cursor:pointer;" data-subgroup="${getSubjectGroup(sub.subject)}">
        <input type="checkbox" name="rev-subjects" value="${sub.subject}" checked style="width:16px; height:16px; accent-color:var(--pastel-purple-dark);">
        <span>${sub.subject}</span>
      </label>
    `).join('');

    container.innerHTML = `
      <header class="app-header">
        <div class="header-title-container">
          <h1 class="header-branding">Revision Hub</h1>
          <span class="header-subtitle">Dynamic revision timetables and smart checklists</span>
        </div>
      </header>

      ${headerTabs}

      <div class="glass-card schedule-setup" style="animation: fadeIn 0.3s ease-out;">
        <h3 class="header-branding" style="font-size:18px; margin-bottom: 15px;">Timetable Parameters</h3>
        <form id="schedule-form">
          <div class="form-group">
            <label class="form-label" for="exam-date">Target Exam Date</label>
            <input class="form-input" type="date" id="exam-date" required>
          </div>

          <div class="form-group">
            <label class="form-label">Subjects to Include</label>
            <div style="display:flex; gap:8px; margin-bottom: 12px; flex-wrap:wrap;">
              <button type="button" class="btn btn-secondary preset-btn-select" data-preset="Group 1" style="padding: 6px 12px; font-size:11px; border-radius: 20px; font-weight: 600;">Select Group 1 Only</button>
              <button type="button" class="btn btn-secondary preset-btn-select" data-preset="Group 2" style="padding: 6px 12px; font-size:11px; border-radius: 20px; font-weight: 600;">Select Group 2 Only</button>
              <button type="button" class="btn btn-secondary preset-btn-select" data-preset="Both" style="padding: 6px 12px; font-size:11px; border-radius: 20px; font-weight: 600;">Select Both Groups</button>
            </div>
            <div style="background: rgba(0,0,0,0.02); border-radius: 12px; padding: 15px; border: 1px solid rgba(0,0,0,0.03);">
              ${subjectCheckboxes}
            </div>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
            Generate Study Timetable
          </button>
        </form>
      </div>
    `;

    // Set min date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    document.getElementById('exam-date').min = tomorrowStr;

    // Bind preset select buttons
    const presetBtns = container.querySelectorAll('.preset-btn-select');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const preset = e.currentTarget.getAttribute('data-preset');
        const checkboxes = container.querySelectorAll('input[name="rev-subjects"]');
        checkboxes.forEach(cb => {
          const parentLabel = cb.closest('label');
          const group = parentLabel.getAttribute('data-subgroup');
          if (preset === 'Both') {
            cb.checked = true;
          } else if (preset === 'Group 1') {
            cb.checked = (group === 'Group 1');
          } else if (preset === 'Group 2') {
            cb.checked = (group === 'Group 2');
          }
        });
      });
    });

    // Bind form submit
    document.getElementById('schedule-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const examDateVal = document.getElementById('exam-date').value;
      const checkedBoxes = container.querySelectorAll('input[name="rev-subjects"]:checked');
      
      if (checkedBoxes.length === 0) {
        alert("Please select at least one subject to generate the schedule.");
        return;
      }

      const selectedSubjects = Array.from(checkedBoxes).map(box => box.value);
      this.generateTimetable(examDateVal, selectedSubjects, container);
    });
  },

  generateTimetable(examDateVal, selectedSubjects, container) {
    const level = State.user.examLevel;
    const subjectsData = SYLLABUS_DATA[level] || [];
    
    // Extract chapters
    let chapterPool = [];
    subjectsData.forEach(sub => {
      if (selectedSubjects.includes(sub.subject)) {
        sub.chapters.forEach(ch => {
          chapterPool.push({
            subject: sub.subject,
            chapterId: ch.id,
            chapterName: ch.name,
            weightage: ch.weightage
          });
        });
      }
    });

    if (chapterPool.length === 0) {
      alert("No chapters found in selected subjects.");
      return;
    }

    // 1. Group chapters by weightage tier
    const highTier = [];
    const mediumTier = [];
    const lowTier = [];

    chapterPool.forEach(ch => {
      if (ch.weightage === 'High') {
        highTier.push(ch);
      } else if (ch.weightage === 'Medium') {
        mediumTier.push(ch);
      } else {
        lowTier.push(ch);
      }
    });

    // 2. Mix subjects within each tier to prevent studying the same subject consecutively
    const mixTier = (tierChapters) => {
      const bySubject = {};
      tierChapters.forEach(ch => {
        if (!bySubject[ch.subject]) {
          bySubject[ch.subject] = [];
        }
        bySubject[ch.subject].push(ch);
      });

      const subjectsList = Object.keys(bySubject);
      const mixed = [];
      let hasMore = true;

      while (hasMore) {
        hasMore = false;
        subjectsList.forEach(sub => {
          if (bySubject[sub].length > 0) {
            mixed.push(bySubject[sub].shift());
            hasMore = true;
          }
        });
      }
      return mixed;
    };

    const sortedMixedPool = [
      ...mixTier(highTier),
      ...mixTier(mediumTier),
      ...mixTier(lowTier)
    ];

    const schedule = [];
    const startDate = new Date();
    
    // Generate daily slots for all chapters in priority/mix pool
    sortedMixedPool.forEach((chInfo, index) => {
      const day = index + 1;
      const dayDate = new Date(startDate);
      dayDate.setDate(startDate.getDate() + day);
      const dayDateStr = dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      schedule.push({
        day,
        date: dayDateStr,
        subject: chInfo.subject,
        chapterId: chInfo.chapterId,
        chapterName: chInfo.chapterName,
        weightage: chInfo.weightage,
        done: false
      });
    });

    State.setCalendar(examDateVal, selectedSubjects, schedule);
    this.render(container);
  },

  renderSchedule(container, headerTabs) {
    const calendar = State.calendar;
    const total = calendar.schedule.length;
    const completed = calendar.schedule.filter(item => item.done).length;
    const progressPercent = Math.round((completed / total) * 100);

    const scheduleRows = calendar.schedule.map((item, idx) => {
      const colors = getSubjectColors(item.subject);
      return `
        <div class="calendar-day-card ${item.done ? 'done' : ''}" style="padding:12px 16px; border-left: 5px solid ${colors.accent}; background: ${colors.bg}; border-color: ${colors.border}; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-2px)';" onmouseout="this.style.transform='none';">
          <div class="day-number" style="background: ${colors.accent}; color: white; width: 28px; height: 28px; font-size: 11px;">D${item.day}</div>
          <div class="day-details">
            <span class="day-subject" style="font-size:13px; font-weight:700; color:${colors.text};">${item.subject}</span>
            <span class="day-chapter" style="font-size:12px; font-weight:600; margin-top: 2px;">${item.chapterName}</span>
            <div style="display:flex; gap: 8px; align-items:center; margin-top:4px;">
              <span class="badge badge-${item.weightage.toLowerCase()}" style="font-size:9px;">${item.weightage} Weightage</span>
              <span style="font-size:9px; color:var(--text-muted);">${item.date}</span>
            </div>
          </div>
          <button class="btn ${item.done ? 'btn-success' : 'btn-secondary'}" style="padding: 5px 10px; font-size:10px; border-color:${colors.accent}; color:${item.done ? 'white' : colors.text}; background:${item.done ? 'var(--pastel-green-dark)' : 'white'};" onclick="window.cajsToggleCalendarItem(${idx})">
            ${item.done ? 'Done ✓' : 'Mark Done'}
          </button>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <header class="app-header">
        <div class="header-title-container">
          <h1 class="header-branding">Revision Hub</h1>
          <span class="header-subtitle">Daily revision scheduler checklist</span>
        </div>
        <button class="btn btn-danger" style="padding: 8px 16px; font-size:11px;" id="btn-reset-schedule">
          Reset Schedule
        </button>
      </header>

      ${headerTabs}

      <!-- Calendar Status Card -->
      <div class="glass-card" style="margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; gap:20px; padding:18px;">
        <div>
          <h3 class="header-branding" style="font-size:16px;">Target Exam: ${new Date(calendar.examDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h3>
          <p style="font-size:12px; color:var(--text-muted); margin-top: 2px;">Tracked subjects: ${calendar.subjects.join(', ')}</p>
        </div>
        <div style="text-align: right;">
          <div style="font-family:var(--font-display); font-size: 24px; font-weight:700;">${progressPercent}%</div>
          <span style="font-size: 10px; color:var(--text-muted);">TIMETABLE PROGRESS</span>
        </div>
      </div>

      <div class="calendar-grid">
        ${scheduleRows}
      </div>
    `;

    // Reset button
    document.getElementById('btn-reset-schedule').addEventListener('click', () => {
      window.cajsShowConfirm(
        "Reset Schedule",
        "Are you sure you want to delete this revision study schedule? This cannot be undone.",
        () => {
          State.calendar = null;
          State.saveUserData();
          this.render(container);
        }
      );
    });

    window.cajsToggleCalendarItem = (idx) => {
      State.toggleCalendarItem(idx);
      this.renderSchedule(container, headerTabs);
    };
  },

  renderChecklistTracker(container, headerTabs, subjects, level) {
    // Calculate preparation percentages
    const syllabusComp = this.calculateSyllabusProgress(subjects);
    const mockComp = this.calculateMockProgress();
    const revComp = this.calculateRevisionProgress(subjects);

    // Calculate Exam Revision Progress percentage & checklist variables
    const isCalendarActive = State.calendar && State.calendar.schedule && State.calendar.schedule.length > 0;
    let examPercent = 0;
    let examCompleted = 0;
    let examTotal = 0;
    if (isCalendarActive) {
      examTotal = State.calendar.schedule.length;
      examCompleted = State.calendar.schedule.filter(item => item.done).length;
      examPercent = Math.round((examCompleted / examTotal) * 100);
    }

    let r1Count = 0;
    let r2Count = 0;
    let r3Count = 0;
    let totalChapters = 0;
    let checkedRevs = 0;

    subjects.forEach(sub => {
      sub.chapters.forEach(ch => {
        totalChapters++;
        const rev = State.revisions[ch.id];
        if (rev) {
          if (rev.r1) { r1Count++; checkedRevs++; }
          if (rev.r2) { r2Count++; checkedRevs++; }
          if (rev.r3) { r3Count++; checkedRevs++; }
        }
      });
    });

    // Subject readiness bars
    const subjectBars = subjects.map(sub => {
      const readiness = State.getReadinessPercentage(sub.subject);
      const colors = getSubjectColors(sub.subject);
      
      // Determine pastel bar color depending on readiness
      let barCol = colors.accent;
      let fillCol = colors.bg;
      if (readiness >= 75) {
        barCol = "var(--pastel-green-dark)";
        fillCol = "var(--pastel-green)";
      } else if (readiness >= 45) {
        barCol = "var(--pastel-peach-dark)";
        fillCol = "var(--pastel-peach)";
      }

      return `
        <div style="margin-bottom:12px;">
          <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px;">
            <span style="font-weight:600; color:${colors.text};">${sub.subject}</span>
            <strong style="color:${barCol};">${readiness}% Readiness</strong>
          </div>
          <div style="width:100%; height:8px; background:rgba(0,0,0,0.03); border-radius:4px; overflow:hidden; border: 1px solid ${colors.border};">
            <div style="width:${readiness}%; height:100%; background:${colors.accent}; border-radius:4px; transition:var(--transition-smooth);"></div>
          </div>
        </div>
      `;
    }).join('');

    const pendingRevisionsList = [];
    const weakChaptersList = [];

    // Mistakes check
    const activeMistakes = State.mistakes.filter(m => !m.resolved);

    // 1. Calculate statistics
    subjects.forEach(sub => {
      sub.chapters.forEach(ch => {
        const isRead = State.completedChapters[ch.id];
        const revData = State.revisions[ch.id] || { r1: false, r2: false, r3: false };

        const isWeak = activeMistakes.some(m => m.chapter === ch.name);
        if (isWeak) {
          weakChaptersList.push({ name: ch.name, sub: sub.subject });
        }

        // Reminders for incomplete revisions: read but less than 3 revisions
        const totalRevsDone = (revData.r1 ? 1 : 0) + (revData.r2 ? 1 : 0) + (revData.r3 ? 1 : 0);
        if (isRead && totalRevsDone < 3) {
          pendingRevisionsList.push({ name: ch.name, sub: sub.subject, pending: 3 - totalRevsDone });
        }
      });
    });

    // 2. Group chapters by subject into beautiful custom cards
    const subjectCardsHtml = subjects.map(sub => {
      const colors = getSubjectColors(sub.subject);
      const readiness = State.getReadinessPercentage(sub.subject);
      
      const rowsHtml = sub.chapters.map(ch => {
        const isRead = State.completedChapters[ch.id];
        const revData = State.revisions[ch.id] || { r1: false, r2: false, r3: false };
        
        return `
          <tr style="border-bottom:1px solid rgba(0,0,0,0.03); font-size:13px; transition: background 0.15s;" onmouseover="this.style.background='${colors.border}'" onmouseout="this.style.background='transparent'">
            <td style="padding:10px 12px; font-weight:600; color:var(--text-dark);">${ch.name}</td>
            <td style="padding:10px 12px; text-align:center; width: 100px;">
              <span class="badge badge-${isRead ? 'high' : 'low'}" style="font-size:10px;">${isRead ? 'Read ✓' : 'Unread'}</span>
            </td>
            <td style="padding:10px 12px; text-align:center; width: 80px;">
              <input type="checkbox" ${revData.r1 ? 'checked' : ''} onclick="window.cajsToggleRev('${ch.id}', 'r1')" style="width:18px; height:18px; cursor:pointer; accent-color:${colors.accent};">
            </td>
            <td style="padding:10px 12px; text-align:center; width: 80px;">
              <input type="checkbox" ${revData.r2 ? 'checked' : ''} onclick="window.cajsToggleRev('${ch.id}', 'r2')" style="width:18px; height:18px; cursor:pointer; accent-color:${colors.accent};">
            </td>
            <td style="padding:10px 12px; text-align:center; width: 80px;">
              <input type="checkbox" ${revData.r3 ? 'checked' : ''} onclick="window.cajsToggleRev('${ch.id}', 'r3')" style="width:18px; height:18px; cursor:pointer; accent-color:${colors.accent};">
            </td>
          </tr>
        `;
      }).join('');

      return `
        <div class="glass-card" style="margin-bottom: 24px; padding: 20px; border-left: 6px solid ${colors.accent}; background: ${colors.bg}; border-color: ${colors.border}; transition: transform 0.2s, box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 24px rgba(0,0,0,0.06)';" onmouseout="this.style.transform='none'; this.style.boxShadow='none';">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
            <div>
              <h3 class="header-branding" style="font-size:16px; color:${colors.text}; margin: 0;">${sub.subject}</h3>
              <span style="font-size:11px; color:var(--text-muted); font-weight: 600;">${getSubjectGroup(sub.subject).toUpperCase()} • ${sub.chapters.length} Chapters</span>
            </div>
            <div style="background: white; padding: 4px 12px; border-radius: 20px; border: 1px solid ${colors.border}; font-size:12px; font-weight:700; color:${colors.text}; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
              ${readiness}% Readiness
            </div>
          </div>
          <div style="overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; text-align:left;">
              <thead>
                <tr style="border-bottom:2px solid ${colors.border}; font-size:11px; color:var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">
                  <th style="padding:8px 12px;">Chapter Name</th>
                  <th style="padding:8px 12px; text-align:center;">Study Status</th>
                  <th style="padding:8px 12px; text-align:center;">Revision 1</th>
                  <th style="padding:8px 12px; text-align:center;">Revision 2</th>
                  <th style="padding:8px 12px; text-align:center;">Revision 3</th>
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }).join('');

    // Renders incomplete warnings list
    const remindersBoxHtml = pendingRevisionsList.length > 0 ? pendingRevisionsList.slice(0, 3).map(rem => `
      <div style="background:rgba(255, 179, 179, 0.15); border-left: 4px solid var(--pastel-rose-dark); padding: 8px 12px; border-radius: 8px; font-size: 11px; margin-bottom: 8px;">
        ⚠️ <strong>Revision Pending:</strong> ${rem.name} (${rem.sub.split(':')[0]}) requires <strong>${rem.pending} more</strong> revisions to complete checklist!
      </div>
    `).join('') : `
      <div style="font-size:12px; color:var(--text-muted); font-style:italic;">All read chapters have completed their 3-revision checks! Excellent consistency.</div>
    `;

    // Renders weak list
    const weakBoxHtml = weakChaptersList.length > 0 ? weakChaptersList.slice(0, 3).map(wk => `
      <div style="background:rgba(255, 224, 179, 0.15); border-left: 4px solid var(--pastel-peach-dark); padding: 8px 12px; border-radius: 8px; font-size: 11px; margin-bottom: 8px;">
        🔍 <strong>Weak Topic:</strong> Mistakes logged in chapter <strong>${wk.name}</strong>. Revise notes and solve MCQs again!
      </div>
    `).join('') : `
      <div style="font-size:12px; color:var(--text-muted); font-style:italic;">No active weaknesses in current subjects. Good accuracy!</div>
    `;

    container.innerHTML = `
      <header class="app-header">
        <div class="header-title-container">
          <h1 class="header-branding">Revision Hub</h1>
          <span class="header-subtitle">Smart 3-revision checklist and exam readiness analytics</span>
        </div>
      </header>

      ${headerTabs}

      <!-- Top stats cards dashboard section -->
      <div class="revision-layout-grid" style="display:grid; grid-template-columns: 2fr 1fr; gap:20px; margin-bottom:24px; align-items:stretch;">
        <!-- Left: Overall revision status & subject readiness bars -->
        <div class="glass-card revision-detail-grid" style="display:grid; grid-template-columns: 1.2fr 1.8fr; gap:24px; padding:24px;">
          <!-- Dial readiness preview -->
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; border-right: 1px solid rgba(0,0,0,0.06); padding-right:20px; text-align:center;">
            <span style="font-size:11px; font-weight:bold; color:var(--text-muted); letter-spacing:0.5px; margin-bottom:8px;">OVERALL READINESS</span>
            <div style="font-size: 48px; font-family:var(--font-display); font-weight:800; color:var(--pastel-purple-dark);">${State.getReadinessPercentage()}%</div>
            <p style="font-size:10px; color:var(--text-muted); margin-top:5px; line-height:1.35; margin-bottom:12px;">Aggregated syllabus read progress, 3-revisions done, mock tests, and focus minutes</p>
            
            <!-- Flippable Mini Revision Card -->
            <div class="revision-hub-mini-flip-card" id="revision-hub-mini-flip-card">
              <div class="flip-card-inner">

                <!-- FRONT (always): Total Revision Completion -->
                <div class="flip-card-front" style="display: flex !important; flex-direction: row !important; align-items: center; gap: 10px; width: 100%;">
                  <div class="progress-ring-container" style="width:44px; height:44px; flex-shrink:0; background:rgba(0,0,0,0.01); border-radius:50%;">
                    <svg width="44" height="44">
                      <circle cx="22" cy="22" r="18" stroke="rgba(0,0,0,0.03)" stroke-width="4" fill="transparent"/>
                      <circle id="ring-mini-total" cx="22" cy="22" r="18" stroke="var(--pastel-green-dark)" stroke-width="4" fill="transparent"
                        class="progress-ring-circle" />
                    </svg>
                    <span class="progress-percent-label" style="font-size:10px; font-weight:700;">${revComp}%</span>
                  </div>
                  <div style="display:flex; flex-direction:column; text-align:left;">
                    <span style="font-size:12px; font-weight:700; color:var(--text-main); line-height:1.2;">
                      ${checkedRevs} / ${totalChapters * 3} Revisions
                    </span>
                    <span style="font-size:10px; font-weight:600; color:var(--text-muted); display:block; line-height:1.1;">Total Revision Completion</span>
                    <div style="font-size: 8px; color: var(--text-muted); font-weight: 700; margin-top: 1px; letter-spacing: 0.1px; margin-bottom:1px;">
                      R1:<strong>${r1Count}</strong> | R2:<strong>${r2Count}</strong> | R3:<strong>${r3Count}</strong>
                    </div>
                    <span class="flip-trigger" style="font-size:7px; color:var(--pastel-green-dark); font-weight:800; text-transform:uppercase; letter-spacing:0.3px; margin-top:1px; display:block; cursor:pointer;">
                      ${isCalendarActive ? 'Exam Progress 📅' : 'Planner Inactive 📅'} • Click to Flip 🔄
                    </span>
                  </div>
                </div>

                <!-- BACK: Exam Revision (if active) OR Planner Inactive -->
                ${isCalendarActive ? `
                  <div class="flip-card-back" style="display: flex !important; flex-direction: row !important; align-items: center; gap: 10px; width: 100%;">
                    <div class="progress-ring-container" style="width:44px; height:44px; flex-shrink:0; background:rgba(0,0,0,0.01); border-radius:50%;">
                      <svg width="44" height="44">
                        <circle cx="22" cy="22" r="18" stroke="rgba(0,0,0,0.03)" stroke-width="4" fill="transparent"/>
                        <circle id="ring-mini-exam" cx="22" cy="22" r="18" stroke="var(--pastel-peach-dark)" stroke-width="4" fill="transparent"
                          class="progress-ring-circle" />
                      </svg>
                      <span class="progress-percent-label" style="font-size:10px; font-weight:700;">${examPercent}%</span>
                    </div>
                    <div style="display:flex; flex-direction:column; text-align:left;">
                      <span style="font-size:12px; font-weight:700; color:var(--text-main); line-height:1.2;">
                        ${examCompleted} / ${examTotal} Tasks
                      </span>
                      <span style="font-size:10px; font-weight:600; color:var(--text-muted);">Exam Revision Progress</span>
                      <span class="flip-trigger" style="font-size:7px; color:var(--pastel-peach-dark); font-weight:800; text-transform:uppercase; letter-spacing:0.3px; margin-top:1px; cursor:pointer; display:inline-block;">Active Planner 📅 • Click to Flip 🔄</span>
                    </div>
                  </div>
                ` : `
                  <div class="flip-card-back" style="display: flex !important; flex-direction: row !important; align-items: center; gap: 10px; width: 100%;">
                    <div class="progress-ring-container" style="width:44px; height:44px; flex-shrink:0; background:rgba(0,0,0,0.01); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px;">
                      📅
                    </div>
                    <div style="display:flex; flex-direction:column; text-align:left; max-width:180px;">
                      <span style="font-size:10px; font-weight:800; color:var(--pastel-peach-dark); text-transform:uppercase; letter-spacing:0.3px;">Planner Inactive</span>
                      <span style="font-size:8.5px; color:var(--text-muted); line-height:1.2; display:block; margin-top:1px;">
                        Set target date in <strong>Planner</strong> tab to start!
                      </span>
                      <span class="flip-trigger" style="font-size:7px; color:var(--pastel-peach-dark); font-weight:800; text-transform:uppercase; letter-spacing:0.3px; margin-top:3px; display:block; cursor:pointer;">Planner Inactive • Click to Flip 🔄</span>
                    </div>
                  </div>
                `}

              </div>
            </div>
          </div>
          <!-- Subject Bars -->
          <div>
            <h4 style="font-size:13px; font-weight:bold; margin-bottom:12px;" class="header-branding">Subject Strength Ratios</h4>
            ${subjectBars}
          </div>
        </div>

        <!-- Right: AI Alerts and checklists reminders -->
        <div class="glass-card" style="display:flex; flex-direction:column; gap:12px; padding:20px; justify-content:center;">
          <div>
            <h4 style="font-size:13px; font-weight:bold;" class="header-branding">Revision Reminders</h4>
            <div style="margin-top:6px;">
              ${remindersBoxHtml}
            </div>
          </div>
          <div style="border-top:1px solid rgba(0,0,0,0.05); padding-top:10px; margin-top:4px;">
            <h4 style="font-size:13px; font-weight:bold;" class="header-branding">Weak Chapters Alerts</h4>
            <div style="margin-top:6px;">
              ${weakBoxHtml}
            </div>
          </div>
        </div>
      </div>

      <!-- Revision Checklist Matrix Grouped Sections -->
      <div style="margin-bottom: 15px;">
        <h2 class="header-branding" style="font-size:18px; margin-bottom:16px; display:flex; align-items:center; gap:8px;">
          <span>📋</span> Mandatory 3-Revision Checklist Tracker
        </h2>
        ${subjectCardsHtml}
      </div>
    `;

    // Trigger mini circular progress rings offset animation
    setTimeout(() => {
      const examRing = container.querySelector('#ring-mini-exam');
      if (examRing) {
        const circumference = 2 * Math.PI * 18;
        examRing.style.strokeDasharray = `${circumference} ${circumference}`;
        const offset = circumference - (examPercent / 100) * circumference;
        examRing.style.strokeDashoffset = offset;
      }

      const totalRing = container.querySelector('#ring-mini-total');
      if (totalRing) {
        const circumference = 2 * Math.PI * 18;
        totalRing.style.strokeDasharray = `${circumference} ${circumference}`;
        const offset = circumference - (revComp / 100) * circumference;
        totalRing.style.strokeDashoffset = offset;
      }
    }, 50);

    // Globals
    const miniFlip = container.querySelector('#revision-hub-mini-flip-card');
    if (miniFlip) {
      // Always start on the front face (reset any leftover flipped state)
      miniFlip.classList.remove('flipped');
      miniFlip.addEventListener('click', (e) => {
        if (e.target.closest('.flip-trigger')) {
          miniFlip.classList.toggle('flipped');
        }
      });
    }

    window.cajsToggleRev = (chId, revKey) => {
      State.toggleRevisionCheck(chId, revKey);
      this.renderChecklistTracker(container, headerTabs, subjects, level);
    };
  },

  calculateSyllabusProgress(subjects) {
    let total = 0;
    subjects.forEach(sub => total += sub.chapters.length);
    if (total === 0) return 0;
    return Math.round((Object.keys(State.completedChapters).length / total) * 100);
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

  calculateRevisionProgress(subjects) {
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
  }
};
