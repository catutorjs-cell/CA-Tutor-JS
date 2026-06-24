// CA JS MCQ Practice Module
import { State } from '../state.js';
import { SYLLABUS_DATA } from '../seedData.js';
import { CONFIG } from '../config.js';

const LOCAL_MCQ_BANK = {
  "Paper-1: Accounting (May 2026 Scheme)": [
    {
      question: "Under which accounting concept is it assumed that a business enterprise will continue in operational existence for the foreseeable future?",
      options: ["Going Concern Concept", "Money Measurement Concept", "Accounting Period Concept", "Dual Aspect Concept"],
      answer: "Going Concern Concept",
      notes: "The Going Concern Concept assumes that the business will continue its operations for an indefinite period and will not be liquidated in the near future."
    },
    {
      question: "Which of the following is a capital expenditure?",
      options: ["Repair of machinery", "Wages paid for installation of new machinery", "Office rent paid", "Purchase of raw materials"],
      answer: "Wages paid for installation of new machinery",
      notes: "Wages paid for the installation of a new asset are capitalized as part of the asset cost because it is necessary to bring the asset to its working condition."
    },
    {
      question: "When preparing a Bank Reconciliation Statement starting with Cash Book balance, cheques issued but not yet presented are:",
      options: ["Added", "Subtracted", "Ignored", "Multiplied"],
      answer: "Added",
      notes: "Cheques issued reduce the Cash Book balance immediately. Since they haven't been presented to the bank, the Pass Book balance is higher. Thus, they must be added back to reconcile."
    },
    {
      question: "Inventory should be valued at:",
      options: ["Cost Price", "Net Realizable Value", "Lower of Cost or Net Realizable Value", "Higher of Cost or Net Realizable Value"],
      answer: "Lower of Cost or Net Realizable Value",
      notes: "According to AS 2 (Valuation of Inventories), inventory must be valued at the lower of cost and net realizable value, reflecting the conservatism principle."
    },
    {
      question: "Under the Written Down Value (WDV) method, depreciation is calculated on:",
      options: ["Original Cost", "Scrap Value", "Book Value (Written Down Value)", "Market Value"],
      answer: "Book Value (Written Down Value)",
      notes: "The WDV method applies a fixed percentage to the reducing book value of the asset at the beginning of each year."
    }
  ],
  "Paper-2: Business Laws (May 2026 Scheme)": [
    {
      question: "An agreement enforceable by law is a:",
      options: ["Promise", "Contract", "Proposal", "Acceptance"],
      answer: "Contract",
      notes: "According to Section 2(h) of the Indian Contract Act, 1872, an agreement enforceable by law is a contract."
    },
    {
      question: "Which of the following is NOT an essential element of a valid contract?",
      options: ["Free Consent", "Competent Parties", "Written Agreement", "Lawful Consideration"],
      answer: "Written Agreement",
      notes: "Contracts can be oral or written unless a specific law requires a written format. Hence, a written agreement is not universally required."
    },
    {
      question: "Sharing of profits is a ________ evidence of partnership, while mutual agency is the ________ evidence.",
      options: ["Conclusive, Prima Facie", "Prima Facie, Conclusive", "Invalid, Valid", "Temporary, Permanent"],
      answer: "Prima Facie, Conclusive",
      notes: "Profit sharing is prima facie (on the face of it) evidence, but the true test of partnership is mutual agency (business carried on by all or any of them acting for all)."
    },
    {
      question: "A company is considered a separate legal entity. Which famous case established this principle?",
      options: ["Salomon v. Salomon & Co. Ltd.", "Carlill v. Carbolic Smoke Ball Co.", "Derry v. Peek", "Balfour v. Balfour"],
      answer: "Salomon v. Salomon & Co. Ltd.",
      notes: "Salomon v. Salomon & Co. Ltd. is the landmark English case that established the principle of corporate personality and separate legal entity."
    },
    {
      question: "In an LLP (Limited Liability Partnership), the liability of partners is:",
      options: ["Unlimited", "Limited to their agreed contribution", "Joint and several", "Zero"],
      answer: "Limited to their agreed contribution",
      notes: "Under the LLP Act, 2008, partners have limited liability, which is confined to their agreed contribution in the partnership."
    }
  ],
  "default": [
    {
      question: "Which index number satisfies both the Time Reversal Test and the Factor Reversal Test?",
      options: ["Laspeyres Index", "Paasche Index", "Fisher's Ideal Index", "Bowley's Index"],
      answer: "Fisher's Ideal Index",
      notes: "Fisher's Ideal Index is the geometric mean of Laspeyres and Paasche indices, and mathematically satisfies both reversal tests."
    },
    {
      question: "The probability of drawing a red card from a standard deck of 52 cards is:",
      options: ["1/4", "1/2", "13/52", "1/13"],
      answer: "1/2",
      notes: "A standard deck has 26 red cards and 26 black cards. The probability is 26/52 = 1/2."
    },
    {
      question: "Which of the following is a measure of central tendency?",
      options: ["Standard Deviation", "Range", "Mean", "Mean Deviation"],
      answer: "Mean",
      notes: "Mean, Median, and Mode are measures of central tendency, while Standard Deviation, Range, and Mean Deviation are measures of dispersion."
    }
  ]
};

export const McqPracticeModule = {
  selectedLevel: null,
  selectedSubject: '',
  selectedChapter: 'All',
  selectedCount: 5,
  isGenerating: false,
  questions: [],
  currentIndex: 0,
  selectedOption: null,
  score: 0,
  quizFinished: false,
  timeStarted: null,
  elapsedTime: 0,
  timerInterval: null,

  render(container) {
    if (!this.selectedLevel) this.selectedLevel = State.user.examLevel;
    const subjects = SYLLABUS_DATA[this.selectedLevel] || [];

    let activeViewHtml = '';

    if (this.isGenerating) {
      activeViewHtml = `
        <div class="glass-card" style="padding:40px; text-align:center; min-height:400px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:24px;">
          <div style="font-size:52px; animation:pulse 1s infinite alternate;">🎯</div>
          <h3 class="header-branding" style="font-size:20px;">Fetching Practice Questions...</h3>
          <p style="font-size:12px; color:var(--text-muted); max-width:280px; line-height:1.6;">Preparing ${this.selectedCount} high-yield multiple-choice questions for your self-assessment.</p>
          <div style="width:200px; height:6px; background:rgba(0,0,0,0.06); border-radius:4px; overflow:hidden;">
            <div style="width:100%; height:100%; background:var(--pastel-purple-dark); border-radius:4px; animation:loadingBar 2s infinite ease-in-out;"></div>
          </div>
          <style>@keyframes loadingBar{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}</style>
        </div>`;
    } else if (this.quizFinished) {
      const pct = Math.round((this.score / this.questions.length) * 100);
      const pointsEarned = this.score * 10;
      activeViewHtml = `
        <div class="glass-card" style="padding:32px; text-align:center; animation:fadeIn 0.4s ease-out; min-height:400px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px;">
          <div style="font-size:48px;">🏆</div>
          <h3 class="header-branding" style="font-size:24px;">Practice Session Complete!</h3>
          <p style="font-size:13px; color:var(--text-muted); margin-bottom:8px;">${this.selectedSubject} — ${this.selectedChapter}</p>
          
          <div style="display:flex; gap:24px; margin-bottom:12px; align-items:center;">
            <div style="text-align:center;">
              <span style="font-size:10px; color:var(--text-muted); font-weight:bold; display:block; text-transform:uppercase;">Score</span>
              <span style="font-size:28px; font-weight:800; color:var(--pastel-purple-dark);">${this.score} / ${this.questions.length}</span>
            </div>
            <div style="text-align:center;">
              <span style="font-size:10px; color:var(--text-muted); font-weight:bold; display:block; text-transform:uppercase;">Accuracy</span>
              <span style="font-size:28px; font-weight:800; color:${pct >= 60 ? 'var(--pastel-green-dark)' : 'var(--pastel-rose-dark)'};">${pct}%</span>
            </div>
            <div style="text-align:center;">
              <span style="font-size:10px; color:var(--text-muted); font-weight:bold; display:block; text-transform:uppercase;">Time Spent</span>
              <span style="font-size:28px; font-weight:800; color:var(--pastel-blue-dark);">${this.formatElapsedTime()}</span>
            </div>
          </div>

          <div style="background:rgba(124, 58, 237, 0.08); padding:12px 24px; border-radius:16px; border:1px solid rgba(124, 58, 237, 0.12); font-weight:700; color:var(--pastel-purple-dark); font-size:14px; margin-bottom:12px;">
            🎉 Credited +${pointsEarned} Points to Profile!
          </div>

          <button class="btn btn-primary" style="width:100%; max-width:240px; font-size:13px;" onclick="window.cajsResetMcqPractice()">
            🔄 Practice Another Topic
          </button>
        </div>`;
    } else if (this.questions.length > 0) {
      const q = this.questions[this.currentIndex];
      const answered = this.selectedOption !== null;
      
      const optionButtons = q.options.map((opt, oIdx) => {
        let stateClass = '';
        let icon = '';
        if (answered) {
          const isCorrectOption = opt === q.answer;
          const isUserSelected = oIdx === this.selectedOption;
          if (isCorrectOption) {
            stateClass = 'option-correct';
            icon = ' ✓';
          } else if (isUserSelected) {
            stateClass = 'option-incorrect';
            icon = ' ✗';
          } else {
            stateClass = 'option-disabled';
          }
        }
        return `
          <button class="mcq-option-btn ${stateClass}" ${answered ? 'disabled' : ''} onclick="window.cajsSelectMcqOption(${oIdx})" style="width:100%; padding:14px 18px; border-radius:12px; margin-bottom:8px; border:1.5px solid rgba(0,0,0,0.06); background:rgba(255,255,255,0.55); font-family:var(--font-body); font-size:13px; font-weight:600; text-align:left; cursor:pointer; transition:var(--transition-smooth); display:flex; justify-content:space-between; align-items:center;">
            <span>${opt}</span>
            <span style="font-weight:bold;">${icon}</span>
          </button>
        `;
      }).join('');

      const totalQs = this.questions.length;
      const progressPercent = Math.round(((this.currentIndex) / totalQs) * 100);

      activeViewHtml = `
        <div class="glass-card" style="padding:24px; animation:fadeIn 0.3s ease-out; min-height:400px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <span style="font-size:11px; font-weight:700; color:var(--pastel-purple-dark); text-transform:uppercase; letter-spacing:0.5px;">Question ${this.currentIndex + 1} of ${totalQs}</span>
              <span style="font-size:11px; font-family:monospace; color:var(--text-muted); font-weight:600;">⏱️ ${this.formatElapsedTime()}</span>
            </div>
            
            <div style="width:100%; height:4px; background:rgba(0,0,0,0.04); border-radius:2px; overflow:hidden; margin-bottom:20px;">
              <div style="width:${progressPercent}%; height:100%; background:var(--pastel-purple-dark); border-radius:2px; transition:width 0.4s;"></div>
            </div>

            <h3 style="font-size:16px; font-weight:700; color:var(--text-main); margin-bottom:20px; line-height:1.5;">${q.question}</h3>
            
            <div class="mcq-options-container" style="margin-bottom:15px;">
              ${optionButtons}
            </div>
          </div>

          ${answered ? `
            <div style="animation:fadeIn 0.3s ease-out; margin-top:10px; padding:15px; border-radius:12px; background:rgba(124, 58, 237, 0.04); border:1px dashed rgba(124, 58, 237, 0.12); margin-bottom:15px;">
              <strong style="font-size:12px; color:var(--pastel-purple-dark); display:block; margin-bottom:4px;">💡 Explanation:</strong>
              <p style="font-size:12px; color:var(--text-main); line-height:1.5; margin:0;">${q.notes || 'No explanation provided.'}</p>
            </div>
            <button class="btn btn-primary" style="width:100%; font-size:12px; padding:10px;" onclick="window.cajsNextMcqQuestion()">
              ${this.currentIndex + 1 === totalQs ? 'Finish Quiz 🏁' : 'Next Question →'}
            </button>
          ` : ''}
        </div>`;
    } else {
      activeViewHtml = `
        <div class="glass-card" style="display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; color:var(--text-muted); min-height:400px; padding:30px;">
          <div style="font-size:52px; margin-bottom:16px; opacity:0.65;">🎯</div>
          <span style="font-size:16px; font-weight:700; color:var(--text-main); margin-bottom:8px;">Test Your Knowledge</span>
          <p style="font-size:12.5px; max-width:280px; line-height:1.6; margin:0;">Select a subject and chapter on the left to start practicing MCQs. Correct answers earn +10 points!</p>
        </div>`;
    }

    container.innerHTML = `
      <header class="app-header">
        <div class="header-title-container">
          <h1 class="header-branding">Syllabus MCQ Practice</h1>
          <span class="header-subtitle">Interactive multiple choice practice with instant feedback and analytical guidance</span>
        </div>
      </header>
      <div class="mcq-practice-layout" style="display:grid; grid-template-columns:1fr 1.6fr; gap:24px; animation:fadeIn 0.3s ease-out; align-items:start;">
        <div class="glass-card">
          <h3 class="header-branding" style="font-size:18px; margin-bottom:15px;">Practice Config</h3>
          <form id="mcq-config-form">
            <div class="form-group">
              <label class="form-label">Level Override</label>
              <select class="form-select" id="mcq-level">
                <option value="Foundation" ${this.selectedLevel === 'Foundation' ? 'selected' : ''}>CA Foundation</option>
                <option value="Intermediate" ${this.selectedLevel === 'Intermediate' ? 'selected' : ''}>CA Intermediate</option>
                <option value="Final" ${this.selectedLevel === 'Final' ? 'selected' : ''}>CA Final</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Select Subject</label>
              <select class="form-select" id="mcq-subject" required>
                <option value="" disabled selected>Select Subject</option>
                ${subjects.map(s => `<option value="${s.subject}" ${s.subject === this.selectedSubject ? 'selected' : ''}>${s.subject}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Select Chapter</label>
              <select class="form-select" id="mcq-chapter" ${this.selectedSubject ? '' : 'disabled'}>
                <option value="All">All Chapters</option>
                ${this.selectedSubject ? (subjects.find(s => s.subject === this.selectedSubject)?.chapters || []).map(ch => `<option value="${ch.name}" ${ch.name === this.selectedChapter ? 'selected' : ''}>${ch.name}</option>`).join('') : ''}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Number of Questions</label>
              <select class="form-select" id="mcq-count">
                <option value="5" ${this.selectedCount === 5 ? 'selected' : ''}>5 Questions</option>
                <option value="10" ${this.selectedCount === 10 ? 'selected' : ''}>10 Questions</option>
                <option value="15" ${this.selectedCount === 15 ? 'selected' : ''}>15 Questions</option>
                <option value="20" ${this.selectedCount === 20 ? 'selected' : ''}>20 Questions</option>
              </select>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%; margin-top:5px;" ${this.questions.length > 0 && !this.quizFinished ? 'disabled' : ''}>
              🚀 Start Practice Quiz
            </button>
          </form>
        </div>
        <div id="mcq-active-viewport">${activeViewHtml}</div>
      </div>
      
      <style>
        .mcq-option-btn:hover:not([disabled]) {
          background: rgba(124, 58, 237, 0.08) !important;
          border-color: var(--pastel-purple-dark) !important;
          transform: translateX(4px);
        }
        .option-correct {
          background: rgba(74, 222, 128, 0.15) !important;
          border-color: var(--pastel-green-dark) !important;
          color: var(--pastel-green-dark) !important;
        }
        .option-incorrect {
          background: rgba(244, 114, 182, 0.15) !important;
          border-color: var(--pastel-rose-dark) !important;
          color: var(--pastel-rose-dark) !important;
        }
        .option-disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }
      </style>
    `;

    // ── EVENT BINDINGS ────────────────────────────────────────────────────────
    container.querySelector('#mcq-level').addEventListener('change', e => {
      this.selectedLevel = e.target.value;
      this.selectedSubject = '';
      this.selectedChapter = 'All';
      this.resetQuiz();
      this.render(container);
    });

    const subSel = container.querySelector('#mcq-subject');
    const chapSel = container.querySelector('#mcq-chapter');
    subSel.addEventListener('change', e => {
      this.selectedSubject = e.target.value;
      const matched = subjects.find(s => s.subject === e.target.value);
      if (matched) {
        chapSel.disabled = false;
        chapSel.innerHTML = `<option value="All">All Chapters</option>` +
          matched.chapters.map(ch => `<option value="${ch.name}">${ch.name}</option>`).join('');
      }
    });

    chapSel.addEventListener('change', e => {
      this.selectedChapter = e.target.value;
    });

    container.querySelector('#mcq-config-form').addEventListener('submit', async e => {
      e.preventDefault();
      if (!this.selectedSubject) { alert("Please select a subject."); return; }
      this.selectedCount = parseInt(container.querySelector('#mcq-count').value) || 5;
      await this.startQuiz(container);
    });

    window.cajsSelectMcqOption = (oIdx) => {
      this.selectedOption = oIdx;
      const q = this.questions[this.currentIndex];
      const optText = q.options[oIdx];
      if (optText === q.answer) {
        this.score++;
        // Play success chime
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain); gain.connect(audioCtx.destination);
          osc.type = 'sine'; osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
          osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.12); // E5
          osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.24); // G5
          gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
          osc.start(); osc.stop(audioCtx.currentTime + 0.5);
        } catch (e) {}
      } else {
        // Add to Mistakes Tracker directly!
        State.addMistake(
          `MCQ Practice: ${q.question}`,
          this.selectedSubject,
          this.selectedChapter === 'All' ? this.selectedSubject : this.selectedChapter,
          `Answer selected: "${optText}". Correct: "${q.answer}". ${q.notes || ''}`,
          'Medium'
        );
        // Play error sound
        try {
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain); gain.connect(audioCtx.destination);
          osc.type = 'triangle'; osc.frequency.setValueAtTime(220, audioCtx.currentTime); // A3
          osc.frequency.setValueAtTime(147, audioCtx.currentTime + 0.15); // D3
          gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
          osc.start(); osc.stop(audioCtx.currentTime + 0.4);
        } catch (e) {}
      }
      this.render(container);
    };

    window.cajsNextMcqQuestion = () => {
      if (this.currentIndex + 1 < this.questions.length) {
        this.currentIndex++;
        this.selectedOption = null;
        this.render(container);
      } else {
        this.finishQuiz(container);
      }
    };

    window.cajsResetMcqPractice = () => {
      this.resetQuiz();
      this.render(container);
    };
  },

  resetQuiz() {
    this.questions = [];
    this.currentIndex = 0;
    this.selectedOption = null;
    this.score = 0;
    this.quizFinished = false;
    this.elapsedTime = 0;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  },

  async startQuiz(container) {
    this.resetQuiz();
    this.isGenerating = true;
    this.render(container);

    const apiKey = CONFIG.GROQ_API_KEY;
    const level = this.selectedLevel;
    const subject = this.selectedSubject;
    const chapter = this.selectedChapter;
    const count = this.selectedCount || 5;

    let loadedQuestions = [];

    // 1. Try to fetch from Groq AI if key is present
    if (apiKey && apiKey.trim() !== '') {
      try {
        const prompt = `You are an expert Chartered Accountancy (CA) exam setter for ICAI.
        Generate EXACTLY ${count} high-yield Multiple Choice Questions (MCQs) for CA ${level} students.
        Subject: ${subject}
        Chapter: ${chapter === 'All' ? 'All topics' : chapter}

        RULES:
        1. Each question must have exactly 4 plausible options (A, B, C, D)
        2. The answer key must EXACTLY match one of the option strings
        3. Provide a brief, helpful explanation (notes) for the answer
        4. Focus on exam topics, provisions, Acts (like Companies Act 2013, GST, Income Tax), or AS/Ind AS where relevant

        Respond ONLY with a valid JSON object (do not include markdown backticks or explanations):
        {
          "questions": [
            {
              "question": "Question text...",
              "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
              "answer": "Option 1",
              "notes": "Explanation of the correct answer..."
            }
          ]
        }`;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            max_tokens: 2500,
            temperature: 0.6,
            messages: [{ role: "user", content: prompt }]
          })
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices?.[0]?.message?.content || '';
          const cleaned = content.replace(/```json|```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          if (parsed && Array.isArray(parsed.questions)) {
            loadedQuestions = parsed.questions;
          }
        }
      } catch (e) {
        console.warn("Groq MCQ fetch failed, falling back to local question set:", e);
      }
    }

    // 2. Fallback to local question set if Groq failed or wasn't configured
    if (loadedQuestions.length === 0) {
      const subjectKey = Object.keys(LOCAL_MCQ_BANK).find(k => subject.toLowerCase().includes(k.split(':')[1]?.split('(')[0]?.trim().toLowerCase() || ''));
      const set = LOCAL_MCQ_BANK[subjectKey] || LOCAL_MCQ_BANK["default"];
      // Randomize or select count questions (pad if set is smaller)
      let rawQs = [...set];
      while (rawQs.length < count) {
        rawQs = rawQs.concat([...set]);
      }
      loadedQuestions = rawQs.sort(() => 0.5 - Math.random()).slice(0, count);
    }

    this.questions = loadedQuestions;
    this.isGenerating = false;
    this.timeStarted = Date.now();
    
    // Start timer
    this.timerInterval = setInterval(() => {
      if (this.timeStarted && !this.quizFinished) {
        this.elapsedTime = Math.floor((Date.now() - this.timeStarted) / 1000);
        const label = document.getElementById('mcq-active-viewport')?.querySelector('span[style*="font-family:monospace"]');
        if (label) {
          label.textContent = `⏱️ ${this.formatElapsedTime()}`;
        }
      }
    }, 1000);

    this.render(container);
  },

  formatElapsedTime() {
    const mins = Math.floor(this.elapsedTime / 60);
    const secs = this.elapsedTime % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  finishQuiz(container) {
    this.quizFinished = true;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    // Credit points: 10 points per correct answer
    const points = this.score * 10;
    if (points > 0) {
      State.addPoints(points);
      State.saveUserData();
      State.notifyStateChange();
    }

    this.render(container);
  }
};
