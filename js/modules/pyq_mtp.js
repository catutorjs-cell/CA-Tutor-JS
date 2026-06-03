// CA JS PYQ, RTP & MTP Module
import { State } from '../state.js';
import { MOCK_PAPERS, SYLLABUS_DATA, MOCK_QUESTIONS } from '../seedData.js';
import { Evaluator } from './evaluator.js';
import { GeneratorModule } from './generator.js';

export const PyqMtpModule = {
  activeTab: 'PYQ', // Options: 'PYQ', 'RTP', 'MTP'
  selectedSubject: 'All',
  selectedYear: 'All',
  attemptingPaper: null, // Stores the active paper object when attempting a test
  userAnswers: {}, // Format: { questionId: selectedOption }
  testCountdown: 600, // 10 minutes in seconds
  timerInterval: null,

  getAnswerUrl(paper) {
    if (paper.answerUrl) return paper.answerUrl;
    if (!paper.pdfUrl) return '';
    
    const isFoundation = paper.pdfUrl.includes('/foundation/');
    const isFinal = paper.pdfUrl.includes('/final/');
    const isRtp = paper.pdfUrl.includes('/rtp/');
    const isMtp = paper.pdfUrl.includes('/mtp/');
    const isPyq = paper.pdfUrl.includes('/pyq/');
    
    if (!isRtp && !isMtp && !isPyq) return paper.pdfUrl;

    const basePath = paper.pdfUrl.substring(0, paper.pdfUrl.lastIndexOf('/'));
    const answersDir = basePath + '/answers/';
    
    if (isMtp) {
       const mtpNum = paper.title.split('Series ')[1] || "1";
       if (isFoundation) {
          const qName = paper.pdfUrl.substring(paper.pdfUrl.lastIndexOf('/') + 1);
          return `${answersDir}${qName.replace('_MTP', '_Answer_MTP')}`;
       } else {
          const paperMatch = paper.subject.match(/Paper-([A-Z0-9]+):/);
          const paperCode = paperMatch ? paperMatch[1] : "1";
          return `${answersDir}Paper ${paperCode}_MTP_Answer_${mtpNum}.pdf`;
       }
    }
    
    let subKey = paper.subject.split(':')[1] || paper.subject;
    subKey = subKey.split('(')[0].trim().toUpperCase();
    
    const shortYear = String(paper.year).substring(2);

    if (isFoundation) {
      let sub = subKey;
      if (sub.includes('ACCOUNTING')) sub = 'ACCOUNTS';
      if (sub.includes('BUSINESS LAWS')) sub = 'BUSINESS LAW';
      if (sub.includes('QUANTITATIVE APTITUDE')) {
         sub = isRtp ? 'QUANTITATATIVE_' : 'QUANTITATIVE';
      }
      return `${answersDir}${paper.month.toUpperCase()} ${shortYear}_${sub}_SUGGESTED ANSWER.pdf`;
    } else if (isFinal) {
      let sub = '';
      if (subKey.includes('FINANCIAL REPORTING')) sub = 'FInacial reporting';
      else if (subKey.includes('ADVANCED FINANCIAL MANAGEMENT') || subKey.includes('FINANCIAL MANAGEMENT') || subKey.includes('AFM')) sub = 'FInacial management';
      else if (subKey.includes('AUDITING')) sub = 'Auditing';
      else if (subKey.includes('DIRECT TAX')) sub = isRtp ? 'direct Tax' : 'Direct tax';
      else if (subKey.includes('INDIRECT TAX')) sub = 'Indirect Tax';
      else if (subKey.includes('INTEGRATED') || subKey.includes('INTERGRATED') || subKey.includes('BUSINESS SOLUTIONS')) sub = 'Intergrated Business';
      else sub = subKey;

      if (isRtp && paper.year === 2024 && paper.month === "May") {
        return `${answersDir}May 24_${sub}_RTP.pdf`;
      }

      const capMonth = paper.month.charAt(0).toUpperCase() + paper.month.slice(1).toLowerCase();
      return `${answersDir}${capMonth} ${shortYear}_${sub}_Suggested answer.pdf`;
    } else {
      let sub = subKey;
      if (sub.includes('ADVANCED ACCOUNTING')) sub = 'Accounts';
      else if (sub.includes('CORPORATE AND OTHER LAWS')) sub = 'Law';
      else if (sub.includes('COST AND MANAGEMENT ACCOUNTING')) sub = isRtp ? 'Cost accounting' : 'Cost accounts';
      else if (sub.includes('AUDITING AND ETHICS')) sub = 'Auditing';
      else if (sub.includes('FINANCIAL MANAGEMENT') || sub.includes('STRATEGIC MANAGEMENT')) sub = 'FM_SM';
      else sub = 'Taxation'; 

      let capMonth = paper.month.charAt(0).toUpperCase() + paper.month.slice(1).toLowerCase();
      if (capMonth === 'Jun' && paper.year === 2024) capMonth = 'May';
      
      return `${answersDir}${capMonth} ${shortYear}_${sub}_Suggested answer.pdf`;
    }
  },

  render(container) {
    const level = State.user.examLevel;
    const subjects = SYLLABUS_DATA[level] || [];
    const validSubjects = subjects.map(s => s.subject);

    // If active attempt, render the Written Exam view
    if (this.attemptingPaper) {
      this.renderWrittenExamSheet(container);
      return;
    }

    window.cajsShowSuggestedAnswer = (paperId) => {
      const customList = State.customPapers || [];
      const paper = customList.find(p => p.id === paperId);
      if (paper && paper.questions && paper.questions.length > 0) {
        // Show custom suggested answers modal
        const modalId = 'cajs-custom-answers-modal';
        let modalEl = document.getElementById(modalId);
        if (modalEl) modalEl.remove();

        modalEl = document.createElement('div');
        modalEl.id = modalId;
        modalEl.style.cssText = `
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10002;
          animation: fadeIn 0.25s ease-out;
        `;

        const questionsHtml = paper.questions.map((q, idx) => `
          <div style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px dashed rgba(0,0,0,0.06); text-align: left;">
            <h4 style="font-size: 13.5px; font-weight: 700; margin: 0 0 8px 0; color: var(--text-main); line-height: 1.45;">
              Q${idx + 1}. ${q.question} <span style="color:var(--pastel-purple-dark); font-weight:700; font-size:11px; margin-left:6px;">(${q.marks} Marks)</span>
            </h4>
            <div style="background: rgba(108,93,211,0.04); border: 1px solid rgba(108,93,211,0.08); border-radius: 12px; padding: 14px; margin-top: 8px;">
              <strong style="color: var(--pastel-purple-dark); font-size: 11px; display: block; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">🎯 Suggested Answer Key:</strong>
              <p style="font-size: 12.5px; line-height: 1.5; color: #6c5dd3; font-weight: 550; margin: 0; white-space: pre-wrap;">${q.answer}</p>
            </div>
          </div>
        `).join('');

        modalEl.innerHTML = `
          <div class="glass-card" style="width: 100%; max-width: 680px; max-height: 80vh; padding: 30px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.15); animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); background: rgba(255, 255, 255, 0.9); border: 1px solid rgba(255,255,255,0.45); display: flex; flex-direction: column;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 18px; border-bottom:1px solid rgba(0,0,0,0.06); padding-bottom:12px;">
              <div>
                <h3 class="header-branding" style="font-size: 18px; margin:0; display:flex; align-items:center; gap:8px;">💡 Suggested Answers</h3>
                <p style="font-size:11px; color:var(--text-muted); margin:2px 0 0;">${paper.title} &bull; ${paper.subject}</p>
              </div>
              <button style="background:none; border:none; font-size:24px; cursor:pointer; color:var(--text-muted); font-weight:bold;" onclick="document.getElementById('${modalId}').remove()">&times;</button>
            </div>
            <div style="flex-grow: 1; overflow-y: auto; padding-right: 8px; margin-bottom: 10px;">
              ${questionsHtml}
            </div>
            <div style="text-align: right; border-top: 1px solid rgba(0,0,0,0.06); padding-top: 14px;">
              <button class="btn btn-primary" style="padding: 10px 24px; font-size:12px; border-radius:12px;" onclick="document.getElementById('${modalId}').remove()">Close Key</button>
            </div>
          </div>
        `;

        document.body.appendChild(modalEl);
      } else {
        window.cajsShowAlert(
          "Suggested Answer Unavailable",
          "not avabilable now !!",
          "error"
        );
      }
    };

    const customList = (State.customPapers || []).filter(p => p.type === this.activeTab);
    const papersList = [...(MOCK_PAPERS[this.activeTab] || []), ...customList];

    // Filter list
    const filteredPapers = papersList.filter(paper => {
      // Ensure paper belongs to the user's selected exam level
      if (!validSubjects.includes(paper.subject)) return false;

      // Subject filter
      const matchesSubject = this.selectedSubject === 'All' || paper.subject === this.selectedSubject;
      // Year filter
      const matchesYear = this.activeTab === 'MTP' || this.selectedYear === 'All' || paper.year.toString() === this.selectedYear;
      
      return matchesSubject && matchesYear;
    });

    // Subject Filter options
    const subjectOptions = subjects.map(sub => `
      <option value="${sub.subject}" ${this.selectedSubject === sub.subject ? 'selected' : ''}>${sub.subject}</option>
    `).join('');

    // Renders the Paper Cards
    const paperCards = filteredPapers.length > 0 ? filteredPapers.map(paper => {
      const pdfBtn = paper.pdfUrl ? `
        <a href="${paper.pdfUrl}" target="_blank" class="btn btn-secondary" style="padding: 6px 12px; font-size: 11px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;" onclick="event.stopPropagation();">
          📄 View PDF
        </a>
      ` : '';

      const suggestedAnswerUrl = this.getAnswerUrl(paper);
      const hasAttempted = State.papers.some(p => p.id === paper.id);
      const isAvailable = suggestedAnswerUrl && hasAttempted && !(this.activeTab === 'PYQ' && paper.year === 2026 && paper.month === "May") && !(State.customPapers || []).some(p => p.id === paper.id);

      const suggestedBtn = `
        <a href="${isAvailable ? suggestedAnswerUrl : 'javascript:void(0)'}" 
           ${isAvailable ? 'target="_blank"' : ''} 
           class="btn btn-secondary" 
           style="padding: 6px 12px; font-size: 11px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; ${!hasAttempted ? 'opacity:0.5; cursor:not-allowed;' : ''}" 
           onclick="event.stopPropagation(); ${isAvailable ? '' : hasAttempted ? 'window.cajsShowSuggestedAnswer();' : "window.cajsShowAlert('Attempt Required', 'write the test first', 'error');"}">
          💡 Suggested Answer${!hasAttempted ? ' 🔒' : ''}
        </a>
      `;

      return `
        <div class="glass-card paper-card" style="animation: fadeIn 0.3s ease-out; display:flex; flex-direction:column; justify-content:space-between; gap:16px;">
          <div>
            <span class="badge badge-${this.activeTab === 'PYQ' ? 'high' : this.activeTab === 'RTP' ? 'medium' : 'low'}" style="font-size:11px; margin-bottom: 8px; display:inline-block;">
              ${this.activeTab}
            </span>
            <h4 class="paper-title">${paper.title}</h4>
            <p style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Subject: ${paper.subject}</p>
          </div>
          <div class="paper-meta" style="display:flex; justify-content:space-between; align-items:center; gap:8px; width:100%; flex-wrap:wrap; margin-top:auto; padding-top:10px; border-top:1px solid rgba(0,0,0,0.02);">
            ${this.activeTab === 'MTP' ? '' : `<span>Year: <strong>${paper.year}</strong></span>`}
            <div style="display:flex; gap:8px; align-items:center; ${this.activeTab === 'MTP' ? 'margin-left:auto;' : ''}">
              ${pdfBtn}
              ${suggestedBtn}
              <button class="btn btn-primary" style="padding: 6px 12px; font-size: 11px;" onclick="window.cajsAttemptPaper('${paper.id}')">
                Attempt Now
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('') : `
      <div class="glass-card" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
        No ${this.activeTab} papers found matching the chosen filters.
      </div>
    `;

    container.innerHTML = `
      <header class="app-header">
        <div class="header-title-container">
          <h1 class="header-branding">Past Papers Explorer</h1>
          <span class="header-subtitle">Attempt PYQ, RTP & MTP references with real-time interactive grading</span>
        </div>
      </header>

      <!-- Category Tabs -->
      <div class="papers-tabs">
        <button class="papers-tab-btn ${this.activeTab === 'PYQ' ? 'active' : ''}" data-tab="PYQ">Previous Year Questions (PYQ)</button>
        <button class="papers-tab-btn ${this.activeTab === 'RTP' ? 'active' : ''}" data-tab="RTP">Revision Test Papers (RTP)</button>
        <button class="papers-tab-btn ${this.activeTab === 'MTP' ? 'active' : ''}" data-tab="MTP">Mock Test Papers (MTP)</button>
      </div>

      <!-- Filters Row -->
      <div class="filters-bar" style="display:flex; gap:12px; align-items:center;">
        <div class="form-group" style="margin-bottom:0; flex-grow:1;">
          <select class="form-select" id="filter-subject" style="padding: 10px;">
            <option value="All">All Subjects</option>
            ${subjectOptions}
          </select>
        </div>
        
        ${this.activeTab === 'MTP' ? '' : `
        <div class="form-group" style="margin-bottom:0; width: 150px;">
          <select class="form-select" id="filter-year" style="padding: 10px;">
            <option value="All">All Years</option>
            <option value="2026" ${this.selectedYear === '2026' ? 'selected' : ''}>2026</option>
            <option value="2025" ${this.selectedYear === '2025' ? 'selected' : ''}>2025</option>
            <option value="2024" ${this.selectedYear === '2024' ? 'selected' : ''}>2024</option>
          </select>
        </div>
        `}


      </div>

      <!-- Result Cards -->
      <div class="papers-grid">
        ${paperCards}
      </div>
    `;

    // Bind tab clicks
    const tabBtns = container.querySelectorAll('.papers-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeTab = e.target.getAttribute('data-tab');
        this.render(container);
      });
    });

    // Bind Filters (fixed bug by using querySelector instead of getElementById on element)
    container.querySelector('#filter-subject').addEventListener('change', (e) => {
      this.selectedSubject = e.target.value;
      this.render(container);
    });

    const filterYear = container.querySelector('#filter-year');
    if (filterYear) {
      filterYear.addEventListener('change', (e) => {
        this.selectedYear = e.target.value;
        this.render(container);
      });
    }

    // Globals
    window.cajsAttemptPaper = (paperId) => {
      const customList = (State.customPapers || []).filter(p => p.type === this.activeTab);
      const papers = [...(MOCK_PAPERS[this.activeTab] || []), ...customList];
      const paper = papers.find(p => p.id === paperId);
      if (!paper) return;

      window.cajsShowConfirm(
        "Start Timed Exam",
        `Do you want to start a 3-hour written exam session for "${paper.title}"?`,
        () => {
          paper.suggestedAnswerUrl = this.getAnswerUrl(paper);
          this.attemptingPaper = paper;
          this.userAnswers = {}; // Reset answers
          this.testCountdown = 10800; // 3 hours
          this.startTimer(container);
          this.render(container);
        }
      );
    };

    window.cajsShowRegisterPaperModal = () => {
      const modalId = 'cajs-register-paper-modal';
      let modalEl = document.getElementById(modalId);
      if (modalEl) modalEl.remove();

      modalEl = document.createElement('div');
      modalEl.id = modalId;
      modalEl.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(12px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.25s ease-out;
      `;

      const subjectOptionsHtml = subjects.map(s => `
        <option value="${s.subject}">${s.subject}</option>
      `).join('');

      modalEl.innerHTML = `
        <div class="glass-card" style="width: 100%; max-width: 460px; padding: 28px; border-radius: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.15); animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); background: rgba(255, 255, 255, 0.85); border: 1px solid rgba(255,255,255,0.4);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px; border-bottom:1px solid rgba(0,0,0,0.06); padding-bottom:12px;">
            <h3 class="header-branding" style="font-size: 18px; margin:0;">📄 Register PDF Exam Paper</h3>
            <button style="background:none; border:none; font-size:22px; cursor:pointer; color:var(--text-muted); font-weight:bold;" onclick="document.getElementById('${modalId}').remove()">&times;</button>
          </div>
          
          <form id="register-paper-form" style="display:flex; flex-direction:column; gap:14px; text-align:left;">
            <div class="form-group">
              <label class="form-label" style="font-size:11px; font-weight:700; margin-bottom:4px;">Paper Type / Source</label>
              <select class="form-select" id="reg-type" required style="padding:8px 10px;">
                <option value="PYQ">Previous Year Question (PYQ)</option>
                <option value="RTP">Revision Test Paper (RTP)</option>
                <option value="MTP">Mock Test Paper (MTP)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size:11px; font-weight:700; margin-bottom:4px;">Exam Year</label>
              <input type="number" class="form-select" id="reg-year" value="${new Date().getFullYear()}" required min="2018" max="2030" style="padding:8px 10px; width:100%;">
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size:11px; font-weight:700; margin-bottom:4px;">Subject</label>
              <select class="form-select" id="reg-subject" required style="padding:8px 10px;">
                ${subjectOptionsHtml}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size:11px; font-weight:700; margin-bottom:4px;">Paper Title</label>
              <input type="text" class="form-select" id="reg-title" placeholder="e.g. Nov 2026 Mock Test Series - I" required style="padding:8px 10px; width:100%;">
            </div>

            <div class="form-group">
              <label class="form-label" style="font-size:11px; font-weight:700; margin-bottom:4px;">PDF Document Link / Upload local file</label>
              <div style="display:flex; flex-direction:column; gap:8px;">
                <input type="text" class="form-select" id="reg-pdf-url" placeholder="Paste web link (https://...) or local file path" required style="padding:8px 10px; width:100%;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <button type="button" class="btn btn-secondary" style="font-size:10px; padding:6px 10px; background:rgba(0,0,0,0.03); border:1px solid rgba(0,0,0,0.15);" onclick="document.getElementById('reg-pdf-file').click()">
                    📁 Browse Local PDF File
                  </button>
                  <span id="reg-file-name" style="font-size:10px; color:var(--text-muted); font-style:italic;">No file selected</span>
                </div>
                <input type="file" id="reg-pdf-file" accept="application/pdf" style="display:none;">
              </div>
            </div>

            <div style="display:flex; gap:12px; margin-top:10px;">
              <button type="button" class="btn btn-secondary" style="flex:1; font-size:12px;" onclick="document.getElementById('${modalId}').remove()">Cancel</button>
              <button type="submit" class="btn btn-primary" style="flex:2; font-size:12px;">Add PDF Paper</button>
            </div>
          </form>
        </div>
      `;

      document.body.appendChild(modalEl);

      // Setup file browsing listeners
      const fileInput = modalEl.querySelector('#reg-pdf-file');
      const urlInput = modalEl.querySelector('#reg-pdf-url');
      const fileNameSpan = modalEl.querySelector('#reg-file-name');

      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const localUrl = URL.createObjectURL(file);
          urlInput.value = localUrl;
          fileNameSpan.textContent = file.name + " (" + (file.size / 1024 / 1024).toFixed(2) + " MB)";
          
          const titleInput = modalEl.querySelector('#reg-title');
          if (!titleInput.value) {
            titleInput.value = file.name.replace(/\.[^/.]+$/, "");
          }
        }
      });

      const form = modalEl.querySelector('#register-paper-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = modalEl.querySelector('#reg-type').value;
        const year = modalEl.querySelector('#reg-year').value;
        const subject = modalEl.querySelector('#reg-subject').value;
        const title = modalEl.querySelector('#reg-title').value;
        const pdfUrl = modalEl.querySelector('#reg-pdf-url').value;

        State.addCustomPaper(type, year, subject, title, pdfUrl);
        modalEl.remove();
        
        window.cajsShowAlert(
          "✨ Paper Registered",
          `"${title}" was successfully registered to the CA ${State.user.examLevel} database!\n\n+50 Study points credited.`,
          "success"
        );
        
        this.render(container);
      });
    };
  },

  startTimer(container) {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (this.testCountdown <= 0) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        alert("Time is up! Grading your test paper automatically.");
        window.cajsSubmitExam();
        return;
      }
      this.testCountdown--;
      
      const hrs = Math.floor(this.testCountdown / 3600);
      const mins = Math.floor((this.testCountdown % 3600) / 60);
      const secs = this.testCountdown % 60;
      const timeStr = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      
      const timerEl = document.getElementById('cajs-test-timer');
      if (timerEl) {
        timerEl.textContent = timeStr;
        if (this.testCountdown < 60) {
          timerEl.style.color = 'var(--pastel-rose-dark)';
          timerEl.style.animation = 'pulse 1s infinite';
        }
      }
      
      const fsTimerEl = document.getElementById('cajs-fullscreen-timer');
      if (fsTimerEl) {
        fsTimerEl.textContent = timeStr;
        if (this.testCountdown < 60) {
          fsTimerEl.style.color = 'var(--pastel-rose-dark)';
          fsTimerEl.style.animation = 'pulse 1s infinite';
        }
      }
    }, 1000);
  },

  renderWrittenExamSheet(container) {
    const paper = this.attemptingPaper;
    const hrs = Math.floor(this.testCountdown / 3600);
    const mins = Math.floor((this.testCountdown % 3600) / 60);
    const secs = this.testCountdown % 60;
    const timeStr = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    if (!document.getElementById('cajs-fullscreen-style')) {
      const style = document.createElement('style');
      style.id = 'cajs-fullscreen-style';
      style.innerHTML = `
        .cajs-pdf-fullscreen {
          position: fixed !important;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100vw !important;
          height: 100vh !important;
          max-width: 100vw !important;
          max-height: 100vh !important;
          z-index: 999999;
          background: var(--bg-main, #F8FAFC);
          border-radius: 0 !important;
          display: flex;
          flex-direction: column;
          margin: 0 !important;
        }
      `;
      document.head.appendChild(style);
    }

    let examContentHtml = '';

    if (paper.questions && paper.questions.length > 0) {
      const questionsList = paper.questions.map((q, idx) => {
        const uAns = this.userAnswers[q.id] || '';
        return `
          <div class="paper-question-item" style="border-bottom: 1px dashed rgba(0,0,0,0.06); padding-bottom: 20px; margin-bottom: 20px; text-align: left;">
            <span style="font-weight:600; font-size:14px; display:block; margin-bottom:6px; line-height: 1.45;">
              Q${idx + 1}. ${q.question} <span style="color:var(--pastel-purple-dark); font-weight:700; font-size:11px; margin-left:6px;">(${q.marks} Marks - Descriptive)</span>
            </span>
            <div style="margin-top: 8px;">
              <textarea class="paper-textarea" 
                style="width: 100%; min-height: 140px; padding: 12px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.1); background: rgba(255,255,255,0.6); font-family: var(--font-body); font-size: 13px; line-height: 1.5; resize: vertical; transition: all 0.3s ease; box-sizing: border-box;"
                placeholder="Draft your detailed compliance answer here..." 
                oninput="window.cajsSaveCustomTextAnswer('${q.id}', this.value)">${uAns}</textarea>
            </div>
            
            <div class="rubric-accordion" id="rubric-accordion-${q.id}" style="margin-top: 10px;">
              <button type="button" class="btn btn-secondary rubric-toggle-btn" 
                style="font-size:11px; padding:6px 12px; background: rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.06); border-radius: 8px; color: var(--text-main); font-weight: 600; cursor: pointer; transition: all 0.2s;"
                onclick="window.cajsToggleCustomRubric('${q.id}')">
                ✨ Reveal Suggested Rubric Key
              </button>
              <div class="rubric-content glass-card" id="rubric-content-${q.id}" style="display: none; margin-top: 8px; padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.6); border: 1px solid rgba(0,0,0,0.04); font-size: 12px; line-height: 1.5;">
                <strong style="color: var(--pastel-purple-dark); display: block; margin-bottom: 4px;">🎯 Official Suggested Answer:</strong>
                <p style="color: #6c5dd3; font-weight: 550; margin: 0; white-space: pre-wrap;">${q.answer}</p>
              </div>
            </div>
          </div>
        `;
      }).join('');

      examContentHtml = `
        <div id="cajs-interactive-solver" class="glass-card" style="padding: 24px; border-radius: 16px; height: 700px; display: flex; flex-direction: column; text-align: left;">
          <div style="padding-bottom: 15px; border-bottom: 1px solid rgba(0,0,0,0.05); margin-bottom: 15px;">
            <h3 style="font-size: 16px; margin: 0; font-weight:700; color:var(--pastel-purple-dark);">Interactive Question Sheet</h3>
            <p style="font-size: 11px; color:var(--text-muted); margin: 2px 0 0;">Draft your answers directly and compare them with the official suggested answers.</p>
          </div>
          <div style="flex-grow:1; overflow-y:auto; padding-right:8px;">
            ${questionsList}
          </div>
        </div>

        <div class="glass-card" style="padding: 30px; border-radius: 16px; display: flex; flex-direction: column; justify-content: space-between; text-align: center; height: 700px; box-sizing: border-box;">
          <div>
            <h3 style="font-size: 18px; margin-bottom: 10px; font-weight:700;">Finish & Evaluation Options</h3>
            <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 30px; line-height:1.5;">You can either Self-Grade online instantly or upload a handwritten sheet for AI OCR-based evaluation.</p>
            
            <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:20px;">
              <button class="btn btn-primary" style="padding: 14px; font-size: 13px; font-weight:600; width:100%;" onclick="window.cajsSubmitCustomSelfGrade()">
                🏆 End and Self-Grade Online
              </button>
            </div>
            
            <div style="border-top:1px solid rgba(0,0,0,0.08); padding-top:20px; margin-top:20px; display:flex; flex-direction:column; gap:12px;">
              <span style="font-size:11px; font-weight:700; color:var(--text-muted); letter-spacing:0.5px; text-transform:uppercase;">— OR SUBMIT FOR AI GRADINGS —</span>
              
              <div style="border: 2px dashed rgba(0,0,0,0.15); border-radius: 12px; padding: 25px 15px; background: rgba(0,0,0,0.01);">
                <div style="font-size: 28px; margin-bottom: 8px;">📄</div>
                <p id="cajs-upload-filename" style="font-size: 12px; font-weight: 600; margin-bottom: 12px; color:var(--text-main);">No handwritten file selected</p>
                <input type="file" id="cajs-answer-upload" accept="application/pdf, image/*" style="display: none;" onchange="document.getElementById('cajs-upload-filename').textContent = this.files[0] ? this.files[0].name : 'No file selected'; document.getElementById('cajs-submit-btn').disabled = !this.files[0];">
                <button class="btn btn-secondary" style="font-size:11px; padding:6px 12px;" onclick="document.getElementById('cajs-answer-upload').click()">Browse Files</button>
              </div>
              
              <button id="cajs-submit-btn" class="btn btn-primary" style="padding: 12px; font-size: 13px;" disabled onclick="window.cajsSubmitExam()">
                🔬 AI Grade Handwritten Sheet
              </button>
            </div>
          </div>
          
          <div style="font-size:11px; color:var(--text-muted); background:rgba(0,0,0,0.02); padding:8px; border-radius:8px;">
            Evaluation is compiled based on official Suggested Answers retrieved from assets.
          </div>
        </div>
      `;
    } else {
      examContentHtml = `
        <!-- PDF Viewer -->
        <div id="cajs-pdf-container" class="glass-card" style="padding: 0; border-radius: 16px; overflow: hidden; height: 700px; display: flex; flex-direction: column;">
          <div style="padding: 15px 20px; border-bottom: 1px solid rgba(0,0,0,0.05); background: rgba(255,255,255,0.5); display: flex; justify-content: space-between; align-items: center;">
            <h3 style="font-size: 14px; margin: 0;">Question Paper</h3>
            <div style="display:flex; align-items:center; gap: 10px;">
              <div id="cajs-fullscreen-timer" style="display: none; font-family:monospace; font-weight:700; font-size:16px; color:var(--pastel-purple-dark); background: rgba(0,0,0,0.05); padding: 4px 10px; border-radius: 8px;">${timeStr}</div>
              <button id="cajs-fullscreen-btn" class="btn btn-secondary" style="padding: 4px 10px; font-size: 12px; display: flex; align-items: center; gap: 6px;" onclick="window.cajsTogglePdfFullscreen()">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                Full Screen
              </button>
            </div>
          </div>
          <iframe src="${paper.pdfUrl}" style="width:100%; height:100%; border:none; flex-grow:1;"></iframe>
        </div>

        <!-- Upload Area -->
        <div class="glass-card" style="padding: 30px; border-radius: 16px; display: flex; flex-direction: column; justify-content: center; text-align: center;">
          <h3 style="font-size: 18px; margin-bottom: 10px;">Submit Answer Sheet</h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 30px;">Scan and upload your handwritten answers as a PDF or image file.</p>
          
          <div style="border: 2px dashed rgba(0,0,0,0.15); border-radius: 12px; padding: 40px 20px; background: rgba(0,0,0,0.02); margin-bottom: 20px;">
            <div style="font-size: 32px; margin-bottom: 10px;">📄</div>
            <p id="cajs-upload-filename" style="font-size: 14px; font-weight: 600; margin-bottom: 15px;">No file selected</p>
            <input type="file" id="cajs-answer-upload" accept="application/pdf, image/*" style="display: none;" onchange="document.getElementById('cajs-upload-filename').textContent = this.files[0] ? this.files[0].name : 'No file selected'; document.getElementById('cajs-submit-btn').disabled = !this.files[0];">
            <button class="btn btn-secondary" onclick="document.getElementById('cajs-answer-upload').click()">Browse Files</button>
          </div>
          
          <button id="cajs-submit-btn" class="btn btn-primary" style="padding: 12px 24px; font-size: 14px;" disabled onclick="window.cajsSubmitExam()">
            Submit for AI Grading
          </button>
        </div>
      </div>
    `;
    }

    container.innerHTML = `
      <header class="app-header">
        <div class="header-title-container" style="display:flex; align-items:center; gap:12px;">
          <button class="btn btn-secondary" style="padding:6px 12px; font-size:11px;" onclick="window.cajsCancelExam()">
            Cancel Session
          </button>
          <div>
            <h1 class="header-branding" style="font-size:22px;">Written Exam Arena</h1>
            <span class="header-subtitle">${paper.title} &bull; ${paper.subject}</span>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="background:rgba(0,0,0,0.03); border:1px solid rgba(0,0,0,0.05); padding:6px 14px; border-radius:14px; text-align:right;">
            <div style="font-family:monospace; font-weight:700; font-size:18px; color:var(--pastel-purple-dark);" id="cajs-test-timer">${timeStr}</div>
            <span style="font-size:9px; color:var(--text-muted); font-weight:600; letter-spacing:0.5px;">REMAINING TIME</span>
          </div>
        </div>
      </header>

      <div class="exam-workspace-grid" style="max-width:1000px; margin: 0 auto; padding-bottom:30px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        ${examContentHtml}
      </div>
    `;

    // Global action links specifically for custom solver
    window.cajsSaveCustomTextAnswer = (qId, val) => {
      this.userAnswers[qId] = val;
    };

    window.cajsToggleCustomRubric = (qId) => {
      const element = document.getElementById(`rubric-content-${qId}`);
      if (element) {
        const isHidden = element.style.display === 'none';
        element.style.display = isHidden ? 'block' : 'none';
        const btn = document.querySelector(`#rubric-accordion-${qId} .rubric-toggle-btn`);
        if (btn) {
          btn.innerHTML = isHidden ? '🔒 Hide Suggested Rubric Key' : '✨ Reveal Suggested Rubric Key';
        }
      }
    };

    window.cajsSubmitCustomSelfGrade = () => {
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerInterval = null;

      const evaluations = [];
      let totalScore = 0;
      let totalMax = 0;

      paper.questions.forEach(q => {
        const userAns = this.userAnswers[q.id] || '';
        totalMax += q.marks;

        if (userAns.trim() === '') {
          evaluations.push({
            question_number: q.chapter.replace('Question ', ''),
            extracted_answer: "Not Answered",
            score: 0,
            max_marks: q.marks,
            reason: "No answer provided.",
            correct_answer: q.answer,
            low_confidence: false
          });
        } else {
          // Extract keywords
          const keywords = GeneratorModule.extractRubricKeywords(q.answer);
          const lowerAns = userAns.toLowerCase();
          const matchedKeywords = [];
          
          keywords.forEach(kw => {
            if (lowerAns.includes(kw)) matchedKeywords.push(kw);
          });

          const keywordPct = keywords.length > 0 ? (matchedKeywords.length / keywords.length) : 0;
          const wordCount = userAns.trim().split(/\s+/).length;
          const lengthPct = Math.min(1, wordCount / (q.marks * 10));
          
          let structVal = 0.3;
          if (/[\-•●]/.test(userAns)) structVal += 0.25;
          if (/\d+[.)]/.test(userAns)) structVal += 0.25;
          if (/section|act|rule|standard|provision/i.test(userAns)) structVal += 0.2;
          structVal = Math.min(1, structVal);

          const finalScore = (keywordPct * 0.5) + (lengthPct * 0.2) + (structVal * 0.3);
          const awarded = Math.round(q.marks * finalScore * 2) / 2;

          totalScore += awarded;

          let feedback = '';
          if (keywordPct < 0.2) {
            feedback = `Lacks core rubric concepts. Missed terms like "${keywords.slice(0, 3).join(', ')}".`;
          } else if (keywordPct < 0.6) {
            feedback = `Good start. Covered some concepts, but missed key terms: "${keywords.filter(k => !matchedKeywords.includes(k)).slice(0, 2).join(', ')}".`;
          } else {
            feedback = `Excellent alignment! Covered most of the official suggested answer keywords.`;
          }

          evaluations.push({
            question_number: q.chapter.replace('Question ', ''),
            extracted_answer: userAns.substring(0, 80),
            score: awarded,
            max_marks: q.marks,
            reason: feedback,
            correct_answer: q.answer,
            low_confidence: false
          });
        }
      });

      const evaluation = {
        total_score: totalScore,
        total_max: totalMax,
        overall_feedback: `Completed online graded session. Successfully attempted ${evaluations.filter(e => e.score > 0).length} of ${paper.questions.length} questions.`,
        evaluations,
        totalPages: 0,
        questionsDetected: paper.questions.length,
        ocrConfidence: 100,
        paperId: paper.id,
        paperTitle: paper.title,
        subject: paper.subject,
        date: new Date().toISOString()
      };

      State.addPaper({
        id: paper.id,
        date: new Date().toISOString(),
        subject: paper.subject,
        score: totalScore,
        total: totalMax,
        totalQuestions: paper.questions.length,
        difficulty: 'Hard',
        type: this.activeTab
      });

      State.addEvaluation({
        id: 'eval_' + Date.now(),
        date: new Date().toISOString(),
        paperId: paper.id,
        subject: paper.subject,
        score: totalScore,
        total: totalMax,
        questions: evaluations,
        ocrConfidence: 100,
        feedback: evaluation.overall_feedback
      });

      window.cajsShowAlert("✨ Exam Graded", `You successfully self-graded your exam!\n\nAwarded Score: ${totalScore}/${totalMax} Marks.`, "success");
      
      this.renderEvaluationResult(container, evaluation, paper);
    };

    window.cajsTogglePdfFullscreen = () => {
      const container = document.getElementById('cajs-pdf-container');
      const fsTimer = document.getElementById('cajs-fullscreen-timer');
      const btn = document.getElementById('cajs-fullscreen-btn');
      
      if (container.classList.contains('cajs-pdf-fullscreen')) {
        container.classList.remove('cajs-pdf-fullscreen');
        fsTimer.style.display = 'none';
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg> Full Screen`;
      } else {
        container.classList.add('cajs-pdf-fullscreen');
        fsTimer.style.display = 'block';
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3h3M21 8h-3V5M3 16h3v3M16 21v-3h3"></path></svg> Exit Full Screen`;
      }
    };

    window.cajsCancelExam = () => {
      window.cajsShowConfirm(
        "Exit Exam",
        "Are you sure you want to exit the exam? Your progress will be lost.",
        () => {
          if (this.timerInterval) clearInterval(this.timerInterval);
          this.timerInterval = null;
          this.attemptingPaper = null;
          this.render(container);
        }
      );
    };

    window.cajsSubmitExam = async () => {
      const fileInput = document.getElementById('cajs-answer-upload');
      if (!fileInput || !fileInput.files || !fileInput.files[0]) {
        alert("Please upload your answer sheet first!");
        return;
      }

      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerInterval = null;

      const uploadedFile = fileInput.files[0];
      const paper = this.attemptingPaper;

      // Render multi-step progress UI
      const renderProgress = (steps) => {
        container.innerHTML = `
          <header class="app-header">
            <div class="header-title-container">
              <h1 class="header-branding">AI Answer Evaluation</h1>
              <span class="header-subtitle">${paper.title} &bull; Processing your answer sheet</span>
            </div>
          </header>
          <div class="eval-progress-container">
            <div class="glass-card" style="padding:28px; border-radius:24px;">
              <div style="text-align:center; margin-bottom:24px;">
                <div style="font-size:32px; margin-bottom:8px;">🔬</div>
                <h3 style="font-size:18px; font-weight:700; margin-bottom:4px;">Processing Your Answer Sheet</h3>
                <p style="font-size:12px; color:var(--text-muted);">This may take 1-2 minutes depending on the number of pages.</p>
              </div>
              <div class="eval-progress-steps">
                ${steps.map(s => `
                  <div class="eval-progress-step ${s.status}" id="eval-step-${s.id}">
                    <div class="eval-step-icon">${s.status === 'done' ? '✓' : s.icon}</div>
                    <div class="eval-step-info">
                      <div class="eval-step-title">${s.title}</div>
                      <div class="eval-step-detail" id="eval-detail-${s.id}">${s.detail || ''}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      };

      const steps = [
        { id: 'pdf', icon: '📄', title: 'Converting PDF to Images', status: 'active', detail: 'Starting...' },
        { id: 'preprocess', icon: '🔧', title: 'Preprocessing Images', status: '', detail: '' },
        { id: 'ocr', icon: '👁️', title: 'Extracting Text (Handwriting OCR)', status: '', detail: '' },
        { id: 'split', icon: '✂️', title: 'Splitting Answers Question-wise', status: '', detail: '' },
        { id: 'grade', icon: '🤖', title: 'AI Grading with Gemini', status: '', detail: '' }
      ];

      renderProgress(steps);

      // Progress callback updates the step UI
      const onProgress = (stepId, detail) => {
        // Mark previous steps as done
        const stepIndex = steps.findIndex(s => s.id === stepId);
        for (let i = 0; i < steps.length; i++) {
          if (i < stepIndex) steps[i].status = 'done';
          else if (i === stepIndex) { steps[i].status = 'active'; steps[i].detail = detail; }
          else steps[i].status = '';
        }
        renderProgress(steps);
      };

      try {
        const evaluation = await Evaluator.processAndGrade(uploadedFile, paper, onProgress);

        // Mark all steps done
        steps.forEach(s => s.status = 'done');
        renderProgress(steps);

        // Save to State
        const scoreEarned = evaluation.total_score || 0;
        const totalMax = evaluation.total_max || 100;

        State.addPaper({
          id: paper.id,
          date: new Date().toISOString(),
          subject: paper.subject,
          score: scoreEarned,
          total: totalMax,
          totalQuestions: evaluation.evaluations ? evaluation.evaluations.length : 1,
          difficulty: 'Hard',
          type: this.activeTab
        });

        State.addEvaluation({
          id: 'eval_' + Date.now(),
          date: new Date().toISOString(),
          paperId: paper.id,
          subject: paper.subject,
          score: scoreEarned,
          total: totalMax,
          questions: evaluation.evaluations || [],
          ocrConfidence: evaluation.ocrConfidence || 0,
          feedback: evaluation.overall_feedback || ''
        });

        // Brief pause to show all-done state
        await new Promise(r => setTimeout(r, 800));

        // Render the detailed result UI
        this.renderEvaluationResult(container, evaluation, paper);

      } catch (err) {
        console.error('Evaluation failed:', err);
        container.innerHTML = `
          <header class="app-header">
            <div class="header-title-container">
              <h1 class="header-branding">Evaluation Error</h1>
              <span class="header-subtitle">${paper.title}</span>
            </div>
          </header>
          <div style="max-width:500px; margin:40px auto; text-align:center;">
            <div class="glass-card" style="padding:30px; border-radius:24px;">
              <div style="font-size:48px; margin-bottom:12px;">⚠️</div>
              <h3 style="font-size:18px; margin-bottom:10px;">Evaluation Could Not Complete</h3>
              <p style="font-size:13px; color:var(--text-muted); margin-bottom:20px; line-height:1.5;">${err.message || 'An unexpected error occurred during answer evaluation.'}</p>
              <div style="display:flex; gap:10px; justify-content:center;">
                <button class="btn btn-secondary" onclick="window.cajsExitTestReport()" style="padding:10px 20px;">Back to Papers</button>
                <button class="btn btn-primary" onclick="window.cajsRetryEval()" style="padding:10px 20px;">Try Again</button>
              </div>
            </div>
          </div>
        `;

        window.cajsExitTestReport = () => {
          this.attemptingPaper = null;
          this.render(container);
        };

        window.cajsRetryEval = () => {
          this.renderWrittenExamSheet(container);
        };
      }
    };
  },

  renderEvaluationResult(container, evaluation, paper) {
    const totalScore = evaluation.total_score || 0;
    const totalMax = evaluation.total_max || 100;
    const percent = Math.round((totalScore / totalMax) * 100);
    const questions = evaluation.evaluations || [];
    const lowConfQuestions = questions.filter(q => q.low_confidence);
    const normalQuestions = questions.filter(q => !q.low_confidence);

    // Score ring SVG calculation
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    const ringColor = percent >= 60 ? '#10b981' : percent >= 35 ? '#f59e0b' : '#f43f5e';

    // Determine grade label
    let gradeLabel = '';
    let gradeEmoji = '';
    if (percent >= 75) { gradeLabel = 'Distinction'; gradeEmoji = '🌟'; }
    else if (percent >= 60) { gradeLabel = 'First Class'; gradeEmoji = '🎯'; }
    else if (percent >= 50) { gradeLabel = 'Pass'; gradeEmoji = '✅'; }
    else if (percent >= 35) { gradeLabel = 'Borderline'; gradeEmoji = '⚠️'; }
    else { gradeLabel = 'Needs Improvement'; gradeEmoji = '📚'; }

    // Build question cards HTML
    const questionCardsHtml = questions.map((q, i) => {
      const scorePercent = q.max_marks > 0 ? (q.score / q.max_marks) * 100 : 0;
      const scoreClass = scorePercent >= 70 ? 'good' : scorePercent >= 40 ? 'partial' : 'poor';
      const barWidth = Math.max(2, scorePercent);

      return `
        <div class="eval-question-card glass-card" style="animation-delay: ${i * 0.08}s;">
          <div class="eval-q-header">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="eval-q-number">Q${q.question_number}</span>
              ${q.low_confidence ? '<span class="eval-low-confidence-badge">⚠️ Low OCR Confidence</span>' : ''}
            </div>
            <span class="eval-q-score ${scoreClass}">${q.score} / ${q.max_marks}</span>
          </div>
          ${q.extracted_answer ? `<div class="eval-q-answer-snippet">"${q.extracted_answer}"</div>` : ''}
          <div class="eval-q-reason">${q.reason || 'No explanation provided.'}</div>
          ${q.score < q.max_marks && q.correct_answer ? `<div class="eval-q-correct-answer" style="margin-top: 12px; padding: 10px 12px; background: rgba(16, 185, 129, 0.1); border-left: 3px solid #10b981; border-radius: 4px; font-size: 13.5px; line-height: 1.5;"><strong style="color: #10b981; display: block; margin-bottom: 4px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Correct Answer</strong><span style="opacity: 0.9;">${q.correct_answer}</span></div>` : ''}
          <div class="eval-score-bar">
            <div class="eval-score-bar-fill ${scoreClass}" style="width: ${barWidth}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    // Manual review section
    const manualReviewHtml = lowConfQuestions.length > 0 ? `
      <div class="eval-manual-review-section">
        <h4>⚠️ Questions Flagged for Manual Review (${lowConfQuestions.length})</h4>
        <p style="font-size:12px; color:#92400e; margin-bottom:12px; line-height:1.5;">
          The following questions had low OCR confidence — the handwriting could not be reliably read. 
          These have been scored as 0 marks. Please compare with the suggested answer manually.
        </p>
        ${lowConfQuestions.map(q => `
          <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:rgba(251,191,36,0.08); border-radius:8px; margin-bottom:6px;">
            <span style="font-weight:600; font-size:13px;">Question ${q.question_number}</span>
            <span style="font-size:11px; color:#b45309;">Max: ${q.max_marks} marks — Needs manual check</span>
          </div>
        `).join('')}
      </div>
    ` : '';

    container.innerHTML = `
      <header class="app-header">
        <div class="header-title-container">
          <h1 class="header-branding">AI Grading Report</h1>
          <span class="header-subtitle">${paper.title} &bull; OCR + Gemini AI Evaluated</span>
        </div>
        <button class="btn btn-primary" onclick="window.cajsExitTestReport()">
          Exit Report
        </button>
      </header>

      <div class="eval-result-container" style="padding-bottom:40px;">
        <!-- Score Hero -->
        <div class="eval-score-hero glass-card">
          <span style="font-size:11px; font-weight:700; color:var(--text-muted); letter-spacing:0.5px;">AI-EVALUATED EXAM PERFORMANCE</span>
          
          <div class="eval-score-ring">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle class="ring-bg" cx="70" cy="70" r="${radius}"/>
              <circle class="ring-fill" cx="70" cy="70" r="${radius}" 
                stroke="${ringColor}"
                stroke-dasharray="${circumference}" 
                stroke-dashoffset="${offset}"
              />
            </svg>
            <div class="eval-score-value">${percent}%</div>
            <div class="eval-score-label">${gradeEmoji} ${gradeLabel}</div>
          </div>

          <p style="font-size:16px; font-weight:700; margin-bottom:2px; position:relative;">
            ${totalScore} / ${totalMax} Marks
          </p>
          <p style="font-size:12px; color:var(--text-muted); position:relative;">
            ${questions.length} question${questions.length !== 1 ? 's' : ''} evaluated by AI
          </p>

          <div class="eval-meta-pills">
            <span class="eval-meta-pill">📄 ${evaluation.totalPages || '?'} pages scanned</span>
            <span class="eval-meta-pill">🔍 OCR Confidence: ${evaluation.ocrConfidence || 0}%</span>
            <span class="eval-meta-pill">📝 ${evaluation.questionsDetected || questions.length} answers detected</span>
            ${lowConfQuestions.length > 0 ? `<span class="eval-meta-pill" style="background:rgba(251,191,36,0.12); color:#b45309;">⚠️ ${lowConfQuestions.length} need review</span>` : ''}
          </div>

          <div style="background:rgba(217,179,255,0.15); border-left:4px solid var(--pastel-purple-dark); padding:10px 14px; border-radius:8px; font-size:11px; margin-top:16px; text-align:left; position:relative;">
            🎉 <strong>Points Synced:</strong> You earned <strong>+${totalScore * 5 + 100} points</strong> for this AI-graded written attempt!
          </div>
        </div>

        <!-- Question-by-Question Results -->
        <div class="glass-card" style="padding:24px; border-radius:24px; margin-bottom:20px;">
          <h3 class="header-branding" style="font-size:16px; margin-bottom:16px;">Question-wise Evaluation</h3>
          ${questionCardsHtml}
        </div>

        <!-- Manual Review Section -->
        ${manualReviewHtml}

        <!-- Overall Feedback -->
        ${evaluation.overall_feedback ? `
          <div class="eval-feedback-card glass-card">
            <h4>🤖 AI Examiner's Overall Assessment</h4>
            <p>${evaluation.overall_feedback}</p>
          </div>
        ` : ''}
      </div>
    `;

    window.cajsExitTestReport = () => {
      this.attemptingPaper = null;
      this.render(container);
    };
  }
};

