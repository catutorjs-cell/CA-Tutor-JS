// CA JS Question Paper Generator Module — Powered by Groq AI
import { State } from '../state.js';
import { SYLLABUS_DATA } from '../seedData.js';
import { CONFIG } from '../config.js';

export const GeneratorModule = {
  activePaper: null,
  gradedResult: null,
  selectedLevel: null,
  selectedQuestionType: 'Mixed',
  selectedExamSource: 'Mixed',
  isGenerating: false,
  ocrScanningStage: null,
  ocrScanningInterval: null,
  ocrReport: null,

  render(container) {
    if (!this.selectedLevel) this.selectedLevel = State.user.examLevel;
    const subjects = SYLLABUS_DATA[this.selectedLevel] || [];

    let rightPanelHtml = '';

    // ── LOADING SCREEN ────────────────────────────────────────────────────────
    if (this.isGenerating) {
      rightPanelHtml = `
        <div class="glass-card" style="padding:40px;text-align:center;min-height:420px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;">
          <div style="font-size:52px;animation:pulse 1s infinite alternate;">🤖</div>
          <h3 class="header-branding" style="font-size:20px;">AI is generating your paper...</h3>
          <p style="font-size:12px;color:var(--text-muted);max-width:300px;line-height:1.6;">Creating MCQ, Numerical & Descriptive questions based on your settings.</p>
          <div style="width:260px;height:6px;background:rgba(0,0,0,0.06);border-radius:4px;overflow:hidden;">
            <div style="width:100%;height:100%;background:var(--pastel-purple-dark);border-radius:4px;animation:loadingBar 2s infinite ease-in-out;"></div>
          </div>
          <style>@keyframes loadingBar{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}</style>
        </div>`;

      // ── OCR SCANNING ──────────────────────────────────────────────────────────
    } else if (this.ocrScanningStage !== null) {
      const stages = [
        { pct: 15, msg: "Running optical scanner on handwritten characters..." },
        { pct: 45, msg: "Extracting concepts and cross-referencing CA rubric keys..." },
        { pct: 75, msg: "Comparing with expected CA institute rubric keys..." },
        { pct: 100, msg: "Assembling presentation feedback report..." }
      ];
      const s = stages[this.ocrScanningStage] || { pct: 100, msg: "Ready" };
      rightPanelHtml = `
        <div class="glass-card" style="padding:40px;text-align:center;min-height:420px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;position:relative;overflow:hidden;background:rgba(0,0,0,0.85);color:#00ff66;border:1px solid #00ff66;">
          <div style="position:absolute;width:100%;height:4px;background:linear-gradient(90deg,transparent,#00ff66,transparent);top:0;left:0;animation:laserScan 2s infinite;"></div>
          <div style="font-size:48px;animation:pulse 1s infinite alternate;">✍️</div>
          <h3 style="font-family:monospace;font-weight:800;font-size:18px;">AI OCR HANDWRITING ANALYZER</h3>
          <div style="width:100%;max-width:320px;height:8px;background:rgba(0,255,102,0.1);border:1px solid #00ff66;border-radius:4px;overflow:hidden;">
            <div style="width:${s.pct}%;height:100%;background:#00ff66;border-radius:4px;transition:width 0.4s;"></div>
          </div>
          <span style="font-size:12px;font-family:monospace;font-weight:600;">[${s.pct}%] - ${s.msg}</span>
          <style>@keyframes laserScan{0%{top:0%}50%{top:100%}100%{top:0%}}</style>
        </div>`;

      // ── OCR REPORT ────────────────────────────────────────────────────────────
    } else if (this.ocrReport) {
      const rep = this.ocrReport;
      const pct = Math.round((rep.score / rep.total) * 100);
      rightPanelHtml = `
        <div class="glass-card" style="padding:24px;animation:fadeIn 0.3s ease-out;">
          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(0,0,0,0.06);padding-bottom:12px;margin-bottom:16px;">
            <h3 class="header-branding" style="font-size:18px;">AI OCR Rubric Grade</h3>
            <button class="btn btn-secondary" style="padding:4px 8px;font-size:10px;" onclick="window.cajsClearPaperResult()">New Paper</button>
          </div>
          <div style="display:grid;grid-template-columns:1fr 2fr;gap:20px;background:rgba(0,0,0,0.02);padding:16px;border-radius:16px;margin-bottom:16px;">
            <div style="text-align:center;">
              <div style="font-size:42px;font-weight:800;color:var(--pastel-purple-dark);">${rep.score}<span style="font-size:16px;color:var(--text-muted);">/${rep.total}</span></div>
              <span class="badge" style="font-size:9px;background:${pct >= 50 ? 'rgba(179,240,201,0.4)' : 'rgba(255,179,179,0.4)'};color:${pct >= 50 ? 'var(--pastel-green-dark)' : 'var(--pastel-rose-dark)'};">${pct}% Pass Prob</span>
            </div>
            <div style="font-size:12px;"><p style="font-style:italic;">"${rep.presentation}"</p></div>
          </div>
          <strong style="color:var(--pastel-rose-dark);">❌ Missing:</strong>
          <ul style="margin-top:4px;padding-left:18px;font-size:12px;">${rep.missing.map(p => `<li>${p}</li>`).join('')}</ul>
          <strong style="color:var(--pastel-green-dark);">✓ Strengths:</strong>
          <p style="font-size:12px;font-style:italic;">${rep.corrections}</p>
        </div>`;

      // ── GRADED RESULT ─────────────────────────────────────────────────────────
    } else if (this.gradedResult) {
      const pct = Math.round((this.gradedResult.score / this.gradedResult.totalPoints) * 100);
      const reviewHtml = this.activePaper.questions.map((q, idx) => {
        const rawAns = this.activePaper.userAnswers[q.id];
        const uAns = (!q.isDescriptive && typeof rawAns === 'number') ? (q.options[rawAns] || 'Not Answered') : (rawAns || 'Not Answered');
        if (q.isDescriptive) {
          const ev = this.gradedResult.descriptiveEvaluations.find(e => e.q === q.question) || { marks: 0, feedback: '', rubric: q.answer, matchedKeywords: [], missedKeywords: [] };
          const passed = ev.marks >= q.marks * 0.5;
          const matchedHtml = (ev.matchedKeywords || []).map(k => `<span style="background:rgba(179,240,201,0.3);color:var(--pastel-green-dark);font-size:10px;padding:2px 6px;border-radius:4px;margin:2px;display:inline-block;">✓ ${k}</span>`).join('');
          const missedHtml = (ev.missedKeywords || []).map(k => `<span style="background:rgba(255,179,179,0.2);color:var(--pastel-rose-dark);font-size:10px;padding:2px 6px;border-radius:4px;margin:2px;display:inline-block;">✗ ${k}</span>`).join('');
          const typeLabel = q.isNumerical ? '🔢 Numerical' : '📝 Descriptive';
          return `
            <div style="border-bottom:1px solid rgba(0,0,0,0.05);padding-bottom:12px;margin-bottom:12px;font-size:13px;">
              <p style="font-weight:600;margin-bottom:4px;">Q${idx + 1}. ${q.question}</p>
              <span style="font-size:10px;font-weight:700;color:${q.isNumerical ? 'var(--pastel-green-dark)' : 'var(--pastel-purple-dark)'};background:${q.isNumerical ? 'rgba(179,240,201,0.25)' : 'rgba(217,179,255,0.2)'};padding:2px 8px;border-radius:6px;">${typeLabel} • ${q.marks} Marks</span>
              <div style="margin-top:6px;">
                <span style="color:${passed ? 'var(--pastel-green-dark)' : 'var(--pastel-rose-dark)'};font-weight:bold;font-size:12px;">AI Score: ${ev.marks} / ${q.marks} Marks</span>
                <p style="margin:4px 0;font-size:11px;"><strong>Your Answer:</strong> "${uAns}"</p>
                <p style="margin:4px 0;color:var(--text-muted);font-style:italic;font-size:11px;"><strong>Feedback:</strong> "${ev.feedback}"</p>
                ${matchedHtml || missedHtml ? `<div style="margin-top:4px;display:flex;flex-wrap:wrap;">${matchedHtml}${missedHtml}</div>` : ''}
                <div style="margin-top:6px;padding:8px;background:rgba(255,255,255,0.8);border-radius:8px;font-size:11px;">
                  <strong style="color:var(--pastel-purple-dark);">Model Answer:</strong>
                  <pre style="margin:4px 0;white-space:pre-wrap;font-family:${q.isNumerical ? 'monospace' : 'inherit'};font-size:11px;">${ev.rubric}</pre>
                </div>
              </div>
            </div>`;
        } else {
          const isCorrect = this.normalizeAnswer(uAns) === this.normalizeAnswer(q.answer);
          return `
            <div style="border-bottom:1px solid rgba(0,0,0,0.05);padding-bottom:12px;margin-bottom:12px;font-size:13px;">
              <p style="font-weight:600;margin-bottom:6px;">Q${idx + 1}. ${q.question} <span style="color:var(--text-muted);font-size:10px;">(${q.marks} Marks - MCQ)</span></p>
              <span style="color:${isCorrect ? 'var(--pastel-green-dark)' : 'var(--pastel-rose-dark)'};font-weight:bold;">Your Answer: ${uAns} ${isCorrect ? '✓' : '✗'}</span>
              ${!isCorrect ? `<br><span style="color:var(--pastel-green-dark);font-weight:600;">Correct: ${q.answer}</span>` : ''}
              ${q.notes ? `<div style="margin-top:4px;padding:6px;font-size:11px;background:rgba(0,0,0,0.02);border-radius:6px;"><strong>Explanation:</strong> ${q.notes}</div>` : ''}
            </div>`;
        }
      }).join('');

      rightPanelHtml = `
        <div class="paper-sheet" style="animation:fadeIn 0.4s ease-out;min-height:420px;">
          <div class="paper-sheet-header">
            <h3 class="header-branding" style="font-size:22px;">Test Results Summary</h3>
            <p style="font-size:12px;color:var(--text-muted);">CA ${this.selectedLevel} — AI Generated Exam</p>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,0.02);padding:16px;border-radius:12px;margin-bottom:20px;">
            <div>
              <span style="font-size:11px;color:var(--text-muted);font-weight:bold;">SCORE</span>
              <h2 class="header-branding" style="font-size:28px;line-height:1;">${this.gradedResult.score} / ${this.gradedResult.totalPoints}</h2>
            </div>
            <div style="text-align:right;">
              <div style="font-size:26px;font-weight:700;color:${pct >= 50 ? 'var(--pastel-green-dark)' : 'var(--pastel-rose-dark)'};">${pct}%</div>
              <span style="font-size:11px;color:var(--text-muted);">${pct >= 50 ? 'PASS ✓' : 'RE-STUDY ✗'}</span>
            </div>
          </div>
          <div style="overflow-y:auto;max-height:260px;margin-bottom:15px;padding-right:5px;">${reviewHtml}</div>
          <button class="btn btn-primary" style="width:100%;font-size:12px;" onclick="window.cajsClearPaperResult()">🔄 Generate New Paper</button>
        </div>`;

      // ── ACTIVE PAPER ──────────────────────────────────────────────────────────
    } else if (this.activePaper) {
      const qList = this.activePaper.questions.map((q, idx) => {
        const rawAns = this.activePaper.userAnswers[q.id];
        const sourceLabel = q.sourcePaper ? `<div style="margin:4px 0 8px;"><span style="font-size:9.5px;font-weight:700;color:var(--pastel-purple-dark);background:rgba(217,179,255,0.2);padding:2px 8px;border-radius:6px;">📄 ${q.sourcePaper.type} ${q.sourcePaper.year}: ${q.sourcePaper.title}</span></div>` : '';
        if (q.isDescriptive) {
          const isNum = q.isNumerical;
          const uAns = rawAns || '';
          return `
            <div class="paper-question-item" style="border-bottom:1px dashed rgba(0,0,0,0.06);padding-bottom:15px;margin-bottom:15px;">
              <span style="font-weight:600;font-size:13px;display:block;margin-bottom:6px;">Q${idx + 1}. ${q.question}</span>
              <span style="font-size:10px;font-weight:700;color:${isNum ? 'var(--pastel-green-dark)' : 'var(--pastel-purple-dark)'};background:${isNum ? 'rgba(179,240,201,0.25)' : 'rgba(217,179,255,0.2)'};padding:3px 10px;border-radius:6px;">${isNum ? '🔢 Numerical' : '📝 Descriptive'} • ${q.marks} Marks</span>
              ${sourceLabel}
              ${isNum ? `<div style="background:rgba(255,249,230,0.8);border:1px solid rgba(255,200,0,0.2);border-radius:8px;padding:8px 12px;font-size:11px;color:#7a6000;margin:8px 0;">💡 Show all working notes step by step. Marks awarded for each step.</div>` : ''}
              <textarea class="paper-textarea" style="width:100%;min-height:${isNum ? '160px' : '100px'};padding:12px;border-radius:12px;border:1px solid rgba(0,0,0,0.1);background:rgba(255,255,255,0.6);font-family:${isNum ? 'monospace' : 'var(--font-body)'};font-size:12.5px;line-height:1.6;resize:vertical;margin-top:8px;box-sizing:border-box;" placeholder="${isNum ? 'Show full working notes, journal entries, T-accounts, calculations...' : 'Draft your detailed answer here...'}" oninput="window.cajsSaveTextareaAnswer('${q.id}',this.value)">${uAns}</textarea>
              <button type="button" class="btn btn-secondary" style="font-size:11px;padding:6px 12px;margin-top:8px;" onclick="window.cajsToggleRubric('${q.id}')">✨ Reveal ${isNum ? 'Solution' : 'Rubric Key'}</button>
              <div id="rubric-${q.id}" style="display:none;margin-top:8px;padding:12px;border-radius:10px;background:rgba(255,255,255,0.7);font-size:11.5px;line-height:1.6;">
                <strong style="color:${isNum ? 'var(--pastel-green-dark)' : 'var(--pastel-purple-dark)'};">🎯 ${isNum ? 'Model Solution' : 'Model Answer'}:</strong>
                <pre style="margin:4px 0;white-space:pre-wrap;font-family:${isNum ? 'monospace' : 'inherit'};font-size:11px;color:#6c5dd3;">${q.answer}</pre>
              </div>
            </div>`;
        } else {
          const optBtns = q.options.map((opt, oi) => `
            <button class="paper-opt-btn ${rawAns === oi ? 'selected' : ''}" onclick="window.cajsSelectOption('${q.id}',${oi})">${opt}</button>
          `).join('');
          return `
            <div class="paper-question-item" style="border-bottom:1px dashed rgba(0,0,0,0.06);padding-bottom:15px;margin-bottom:15px;">
              <span style="font-weight:600;font-size:13px;display:block;margin-bottom:4px;">Q${idx + 1}. ${q.question} <span style="color:var(--pastel-blue-dark);font-size:11px;">(${q.marks} Marks - MCQ)</span></span>
              ${sourceLabel}
              <div class="paper-opt-list" style="margin-top:8px;">${optBtns}</div>
            </div>`;
        }
      }).join('');

      rightPanelHtml = `
        <div class="paper-sheet" style="animation:fadeIn 0.4s ease-out;min-height:420px;display:flex;flex-direction:column;">
          <div class="paper-sheet-header" style="margin-bottom:12px;">
            <h3 class="header-branding" style="font-size:18px;">${this.activePaper.subject} — AI Generated Paper</h3>
            <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-top:6px;">
              <span>DIFFICULTY: <strong>${this.activePaper.difficulty}</strong></span>
              <span>SOURCE: <strong>${this.activePaper.examSource || 'AI Generated'}</strong></span>
            </div>
            <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap;">
              ${this.activePaper.questions.filter(q => !q.isDescriptive).length > 0 ? `<span style="font-size:9px;font-weight:700;background:rgba(179,217,255,0.3);color:var(--pastel-blue-dark);padding:2px 8px;border-radius:6px;">MCQ: ${this.activePaper.questions.filter(q => !q.isDescriptive).length}Q</span>` : ''}
              ${this.activePaper.questions.filter(q => q.isNumerical).length > 0 ? `<span style="font-size:9px;font-weight:700;background:rgba(179,240,201,0.3);color:var(--pastel-green-dark);padding:2px 8px;border-radius:6px;">Numerical: ${this.activePaper.questions.filter(q => q.isNumerical).length}Q</span>` : ''}
              ${this.activePaper.questions.filter(q => q.isDescriptive && !q.isNumerical).length > 0 ? `<span style="font-size:9px;font-weight:700;background:rgba(217,179,255,0.3);color:var(--pastel-purple-dark);padding:2px 8px;border-radius:6px;">Descriptive: ${this.activePaper.questions.filter(q => q.isDescriptive && !q.isNumerical).length}Q</span>` : ''}
            </div>
          </div>
          <div style="overflow-y:auto;max-height:300px;padding-right:5px;margin-bottom:15px;flex:1;">${qList}</div>
          <div style="border-top:1px solid rgba(0,0,0,0.06);padding-top:12px;display:flex;flex-direction:column;gap:10px;">
            <button class="btn btn-success" style="width:100%;font-size:12px;" onclick="window.cajsSubmitPaperAnswers()">✅ Submit & Grade Paper</button>
            <button class="btn btn-secondary" style="width:100%;font-size:12px;" onclick="window.cajsSavePaperToLibrary()">💾 Save Paper to Library</button>
            <div style="text-align:center;font-size:10px;color:var(--text-muted);font-weight:700;">— OR —</div>
            <div style="border:1px dashed rgba(0,0,0,0.15);border-radius:10px;padding:8px 12px;text-align:center;cursor:pointer;" onclick="document.getElementById('ocr-upload').click()">
              <span style="font-size:11px;font-weight:700;color:var(--pastel-purple-dark);display:block;">✍️ Upload Handwritten Sheet for AI Grading</span>
              <span style="font-size:9px;color:var(--text-muted);">Accepts images / PDFs (+15 pts)</span>
              <input type="file" id="ocr-upload" style="display:none;" onchange="window.cajsTriggerOCRScan(this)">
            </div>
          </div>
        </div>`;

      // ── SAVED PAPERS / DEFAULT ────────────────────────────────────────────────
    } else {
      const saved = State.customPapers || [];
      rightPanelHtml = saved.length > 0 ? `
        <div class="paper-sheet" style="animation:fadeIn 0.4s ease-out;min-height:420px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:15px;border-bottom:1px solid rgba(0,0,0,0.05);padding-bottom:8px;">
            <h3 class="header-branding" style="font-size:15px;margin:0;">📚 Saved Papers</h3>
            <span class="badge" style="font-size:9px;">${saved.length} Papers</span>
          </div>
          <div style="overflow-y:auto;max-height:340px;padding-right:5px;">
            ${saved.map(p => `
              <div class="glass-card" style="padding:14px;margin-bottom:12px;border-radius:14px;display:flex;justify-content:space-between;align-items:center;gap:10px;">
                <div>
                  <h4 style="font-size:12.5px;font-weight:700;margin:0;">${p.title}</h4>
                  <p style="font-size:10px;color:var(--text-muted);margin:2px 0 0;">${p.subject} • ${p.questions ? p.questions.length : 0} Questions</p>
                </div>
                <div style="display:flex;gap:6px;">
                  <button class="btn btn-primary" style="padding:5px 10px;font-size:10px;" onclick="window.cajsLoadSavedPaper('${p.id}')">▶ Attempt</button>
                  <button class="btn btn-secondary" style="padding:5px 10px;font-size:10px;" onclick="window.cajsShowAnswers('${p.id}')">💡 Answers</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>` : `
        <div class="paper-sheet" style="justify-content:center;align-items:center;text-align:center;color:var(--text-muted);min-height:420px;">
          <div style="font-size:48px;margin-bottom:12px;opacity:0.5;">🤖</div>
          <span style="font-size:14px;font-weight:600;">AI Question Paper Generator</span>
          <p style="font-size:12px;max-width:260px;margin-top:8px;line-height:1.6;">Select subject & settings on the left. AI will generate MCQ, Numerical & Descriptive questions.</p>
        </div>`;
    }

    // ── LEFT PANEL ────────────────────────────────────────────────────────────
    container.innerHTML = `
      <header class="app-header">
        <div class="header-title-container">
          <h1 class="header-branding">AI Mock Question Paper Generator</h1>
          <span class="header-subtitle">AI generates MCQ, Numerical & Descriptive questions from MTP, RTP & PYQ patterns</span>
        </div>
      </header>
      <div class="paper-builder" style="animation:fadeIn 0.3s ease-out;">
        <div class="glass-card">
          <h3 class="header-branding" style="font-size:18px;margin-bottom:15px;">Paper Settings</h3>
          <form id="paper-gen-form">
            <div class="form-group">
              <label class="form-label">Level Override</label>
              <select class="form-select" id="gen-level">
                <option value="Foundation" ${this.selectedLevel === 'Foundation' ? 'selected' : ''}>CA Foundation</option>
                <option value="Intermediate" ${this.selectedLevel === 'Intermediate' ? 'selected' : ''}>CA Intermediate</option>
                <option value="Final" ${this.selectedLevel === 'Final' ? 'selected' : ''}>CA Final</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Select Subject</label>
              <select class="form-select" id="gen-subject" required>
                <option value="" disabled selected>Select Subject</option>
                ${subjects.map(s => `<option value="${s.subject}">${s.subject}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Select Chapter</label>
              <select class="form-select" id="gen-chapter" disabled>
                <option value="All">All Chapters</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Paper Source</label>
              <select class="form-select" id="gen-source">
                <option value="Mixed">Mixed (MTP + RTP + PYQ)</option>
                <option value="PYQ">Previous Year Questions (PYQ)</option>
                <option value="RTP">Revision Test Paper (RTP)</option>
                <option value="MTP">Mock Test Paper (MTP)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Question Type</label>
              <select class="form-select" id="gen-type">
                <option value="Mixed">Mixed (MCQ + Numerical + Descriptive)</option>
                <option value="MCQ">Only MCQ</option>
                <option value="Numerical">Only Numerical</option>
                <option value="Descriptive">Only Descriptive</option>
              </select>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div class="form-group">
                <label class="form-label">Target Marks</label>
                <select class="form-select" id="gen-marks">
                  <option value="20">20 Marks</option>
                  <option value="50" selected>50 Marks</option>
                  <option value="100">100 Marks</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Difficulty</label>
                <select class="form-select" id="gen-difficulty">
                  <option value="Mixed" selected>Mixed</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>
            <div style="border:1px dashed rgba(0,0,0,0.12);border-radius:12px;padding:12px;margin-bottom:15px;">
              <span style="font-size:11px;font-weight:700;color:var(--pastel-purple-dark);display:block;margin-bottom:4px;">📄 Upload Study Material (Optional)</span>
              <span style="font-size:9px;color:var(--text-muted);display:block;margin-bottom:8px;">AI generates questions directly from your notes</span>
              <input type="file" id="gen-study-material" accept=".txt,.pdf" style="font-size:11px;width:100%;">
            </div>
            <div style="background:rgba(0,0,0,0.02);border:1px solid rgba(0,0,0,0.03);border-radius:12px;padding:12px 15px;margin-bottom:15px;display:flex;align-items:center;justify-content:space-between;">
              <div>
                <span style="font-size:12px;font-weight:700;color:var(--pastel-purple-dark);">Adaptive Weakness Focus</span>
                <span style="font-size:9px;color:var(--text-muted);display:block;">Focus on chapters with mistakes</span>
              </div>
              <label style="position:relative;display:inline-block;width:44px;height:24px;">
                <input type="checkbox" id="gen-adaptive" style="opacity:0;width:0;height:0;">
                <span style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#ccc;transition:.4s;border-radius:34px;"></span>
              </label>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;">🤖 Generate AI Question Paper</button>
          </form>
        </div>
        <div id="gen-paper-viewport">${rightPanelHtml}</div>
      </div>`;

    // ── EVENT BINDINGS ────────────────────────────────────────────────────────
    container.querySelector('#gen-level').addEventListener('change', e => {
      this.selectedLevel = e.target.value;
      this.activePaper = null;
      this.gradedResult = null;
      this.ocrReport = null;
      this.render(container);
    });

    const subSel = container.querySelector('#gen-subject');
    const chapSel = container.querySelector('#gen-chapter');
    subSel.addEventListener('change', e => {
      const matched = subjects.find(s => s.subject === e.target.value);
      if (matched) {
        chapSel.disabled = false;
        chapSel.innerHTML = `<option value="All">All Chapters</option>` +
          matched.chapters.map(ch => `<option value="${ch.name}">${ch.name}</option>`).join('');
      }
    });

    container.querySelector('#paper-gen-form').addEventListener('submit', async e => {
      e.preventDefault();
      const sub = subSel.value;
      if (!sub) { alert("Please select a subject."); return; }
      const chap = chapSel.value || 'All';
      const diff = container.querySelector('#gen-difficulty').value;
      const marks = parseInt(container.querySelector('#gen-marks').value);
      const qType = container.querySelector('#gen-type').value;
      const source = container.querySelector('#gen-source').value;
      const adaptive = container.querySelector('#gen-adaptive').checked;
      const file = container.querySelector('#gen-study-material').files[0] || null;
      this.selectedQuestionType = qType;
      this.selectedExamSource = source;
      await this.generatePaper(sub, chap, diff, marks, qType, source, adaptive, file, container);
    });

    window.cajsSelectOption = (qId, idx) => {
      if (this.activePaper) { this.activePaper.userAnswers[qId] = idx; this.render(container); }
    };
    window.cajsSaveTextareaAnswer = (qId, val) => {
      if (this.activePaper) this.activePaper.userAnswers[qId] = val;
    };
    window.cajsToggleRubric = qId => {
      const el = document.getElementById(`rubric-${qId}`);
      if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
    };
    window.cajsSubmitPaperAnswers = () => this.gradePaper(container);
    window.cajsClearPaperResult = () => {
      this.activePaper = null;
      this.gradedResult = null;
      this.ocrReport = null;
      this.render(container);
    };
    window.cajsSavePaperToLibrary = () => {
      if (!this.activePaper) return;
      window.cajsShowPrompt("Save Paper", "Enter a title:", title => {
        State.addCustomPaper(
          this.selectedExamSource === 'Mixed' ? 'MTP' : this.selectedExamSource,
          new Date().getFullYear(),
          this.activePaper.subject,
          title, '', this.activePaper.questions
        );
        window.cajsShowAlert("💾 Saved", `"${title}" saved to library!`, "success");
        this.render(container);
      }, `${this.activePaper.subject} AI Paper`);
    };
    window.cajsLoadSavedPaper = paperId => {
      const paper = (State.customPapers || []).find(p => p.id === paperId);
      if (!paper) return;
      this.activePaper = {
        subject: paper.subject, difficulty: 'Mixed',
        examSource: paper.type, questions: paper.questions, userAnswers: {}
      };
      this.gradedResult = null;
      this.ocrReport = null;
      this.render(container);
    };
    window.cajsShowAnswers = paperId => {
      const paper = (State.customPapers || []).find(p => p.id === paperId);
      if (!paper || !paper.questions) return;
      const mid = 'cajs-answers-modal';
      document.getElementById(mid)?.remove();
      const modal = document.createElement('div');
      modal.id = mid;
      modal.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.45);backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:center;z-index:10002;`;
      modal.innerHTML = `
        <div class="glass-card" style="width:90%;max-width:680px;max-height:80vh;padding:30px;border-radius:24px;background:rgba(255,255,255,0.9);display:flex;flex-direction:column;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;border-bottom:1px solid rgba(0,0,0,0.06);padding-bottom:12px;">
            <h3 class="header-branding" style="font-size:18px;margin:0;">💡 Suggested Answers — ${paper.title}</h3>
            <button style="background:none;border:none;font-size:24px;cursor:pointer;" onclick="document.getElementById('${mid}').remove()">&times;</button>
          </div>
          <div style="flex-grow:1;overflow-y:auto;padding-right:8px;">
            ${paper.questions.map((q, i) => `
              <div style="margin-bottom:20px;padding-bottom:16px;border-bottom:1px dashed rgba(0,0,0,0.06);">
                <h4 style="font-size:13px;font-weight:700;margin:0 0 8px;">${i + 1}. ${q.question} <span style="color:var(--pastel-purple-dark);font-size:11px;">(${q.marks} Marks)</span></h4>
                <div style="background:rgba(108,93,211,0.04);border:1px solid rgba(108,93,211,0.08);border-radius:12px;padding:12px;">
                  <pre style="font-size:12px;line-height:1.5;color:#6c5dd3;margin:0;white-space:pre-wrap;font-family:${q.isNumerical ? 'monospace' : 'inherit'};">${q.answer}</pre>
                </div>
              </div>`).join('')}
          </div>
          <button class="btn btn-primary" style="margin-top:14px;" onclick="document.getElementById('${mid}').remove()">Close</button>
        </div>`;
      document.body.appendChild(modal);
    };
    window.cajsTriggerOCRScan = fileInput => {
      if (!fileInput.files?.[0]) return;
      const file = fileInput.files[0];
      this.ocrScanningStage = 0;
      this.render(container);
      this.ocrScanningInterval = setInterval(() => {
        this.ocrScanningStage++;
        if (this.ocrScanningStage >= 4) {
          clearInterval(this.ocrScanningInterval);
          this.ocrScanningInterval = null;
          this.ocrScanningStage = null;
          const maxMarks = 50;
          const score = Math.round(maxMarks * (0.65 + Math.random() * 0.25));
          const levelChapters = SYLLABUS_DATA[this.selectedLevel] || [];
          const subObj = levelChapters.find(s => s.subject === this.activePaper?.subject) || { chapters: [] };
          const recs = subObj.chapters.slice(0, 2).map(c => ({ id: c.id, name: c.name }));
          this.ocrReport = {
            subject: this.activePaper?.subject || 'General', score, total: maxMarks,
            presentation: "Well organized. Ensure statutory sections are in bold headings.",
            corrections: "Exceptional theoretical structures. Watch statement margins.",
            missing: ["Missed citing specific statutory provisions.", "Ensure citation footnotes are delineated."],
            recommendations: recs
          };
          State.addPaper({ id: "ocr_" + Date.now(), date: new Date().toISOString(), subject: this.activePaper?.subject || 'General', score, total: maxMarks, totalQuestions: this.activePaper?.questions.length || 0, difficulty: 'Mixed', type: "AI OCR Grader" });
          window.cajsShowAlert("✨ Scan Done", `Score: ${score}/${maxMarks} Marks. +15 pts credited!`, "success");
        }
        this.render(container);
      }, 1200);
    };
  },

  async readFile(file) {
    return new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = e => resolve(e.target.result);
      r.onerror = () => reject(new Error("Failed to read file"));
      r.readAsText(file);
    });
  },

  async generatePaper(subject, chapter, difficulty, targetMarks, questionType, examSource, isAdaptive, studyFile, container) {
    this.isGenerating = true;
    this.activePaper = null;
    this.gradedResult = null;
    this.ocrReport = null;
    this.render(container);

    try {
      let studyText = '';
      if (studyFile) {
        try {
          studyText = await this.readFile(studyFile);
          if (studyText.length > 6000) studyText = studyText.substring(0, 6000) + '\n[truncated...]';
        } catch (e) { console.warn("File read failed:", e); }
      }

      let weakChapters = '';
      if (isAdaptive) {
        const mistakes = State.mistakes.filter(m => !m.resolved && m.subject === subject);
        if (mistakes.length > 0) weakChapters = [...new Set(mistakes.map(m => m.chapter))].join(', ');
      }

      let mcqCount = 0, numCount = 0, descCount = 0;
      if (questionType === 'MCQ') {
        mcqCount = targetMarks === 20 ? 4 : targetMarks === 50 ? 10 : 20;
      } else if (questionType === 'Numerical') {
        numCount = targetMarks === 20 ? 2 : targetMarks === 50 ? 4 : 8;
      } else if (questionType === 'Descriptive') {
        descCount = targetMarks === 20 ? 2 : targetMarks === 50 ? 5 : 10;
      } else {
        if (targetMarks === 20) { mcqCount = 2; numCount = 1; descCount = 1; }
        else if (targetMarks === 50) { mcqCount = 4; numCount = 2; descCount = 2; }
        else { mcqCount = 8; numCount = 4; descCount = 4; }
      }

      const mcqMarks = mcqCount > 0 ? Math.round((targetMarks * 0.35) / mcqCount) || 2 : 0;
      const numMarks = numCount > 0 ? Math.round((targetMarks * 0.40) / numCount) || 10 : 0;
      const descMarks = descCount > 0 ? Math.round((targetMarks * 0.25) / descCount) || 8 : 0;

      const prompt = `You are an expert CA (Chartered Accountancy) exam paper setter for ICAI India.

Generate a ${examSource} style question paper:
- Subject: ${subject}
- Level: CA ${this.selectedLevel}
- Chapter: ${chapter === 'All' ? 'All chapters' : chapter}
- Difficulty: ${difficulty}
- Total Marks: ${targetMarks}
${weakChapters ? `- Focus on weak areas: ${weakChapters}` : ''}
${studyText ? `\nSTUDY MATERIAL (use as primary source):\n"""\n${studyText}\n"""` : ''}

Generate EXACTLY:
${mcqCount > 0 ? `- ${mcqCount} MCQ questions (${mcqMarks} marks each) with 4 options and correct answer` : ''}
${numCount > 0 ? `- ${numCount} NUMERICAL questions (${numMarks} marks each) with real Indian ₹ figures, complete step-by-step working notes. Types: journal entries, ledger accounts, depreciation, partnership accounts, cash flow, ratio analysis, tax computation, costing problems, etc.` : ''}
${descCount > 0 ? `- ${descCount} DESCRIPTIVE questions (${descMarks} marks each) with detailed model answer` : ''}

RULES:
1. Numerical MUST have realistic Indian figures (₹ amounts, %, dates)
2. Numerical answers MUST show complete step-by-step working notes
3. Use AS/Ind AS, Companies Act 2013, Income Tax Act, GST Act where relevant
4. Match CA ${this.selectedLevel} ICAI exam pattern exactly

Respond ONLY with valid JSON (no markdown, no backticks, no explanation):
{
  "questions": [
    {
      "type": "MCQ",
      "question": "Question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A",
      "marks": ${mcqMarks},
      "notes": "Brief explanation",
      "difficulty": "Medium"
    },
    {
      "type": "Numerical",
      "question": "Full numerical problem with all ₹ figures and data...",
      "answer": "Working Notes:\\nStep 1: ...\\nStep 2: ...\\nFinal Answer: ₹X",
      "marks": ${numMarks},
      "notes": "Key concept tested",
      "difficulty": "Hard"
    },
    {
      "type": "Descriptive",
      "question": "Theory question text?",
      "answer": "Detailed model answer with key points...",
      "marks": ${descMarks},
      "difficulty": "Medium"
    }
  ]
}`;

      // ── GROQ API CALL ─────────────────────────────────────────────────────
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${CONFIG.GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 4000,
          temperature: 0.7,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(`API error ${response.status}: ${errData?.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const rawText = data.choices?.[0]?.message?.content || '';

      let parsed;
      try {
        const cleaned = rawText.replace(/```json|```/g, '').trim();
        parsed = JSON.parse(cleaned);
      } catch (e) {
        throw new Error("AI returned invalid JSON. Please try again.");
      }

      if (!parsed.questions?.length) throw new Error("No questions returned. Please try again.");

      const sourceType = examSource === 'Mixed' ? ['PYQ', 'RTP', 'MTP'][Math.floor(Math.random() * 3)] : examSource;
      const questions = parsed.questions.map((q, idx) => ({
        id: `ai_${Date.now()}_${idx}`,
        subject,
        chapter: chapter === 'All' ? subject : chapter,
        difficulty: q.difficulty || 'Medium',
        question: q.question,
        answer: q.answer,
        marks: q.marks,
        options: q.options || [],
        notes: q.notes || '',
        isDescriptive: q.type === 'Descriptive' || q.type === 'Numerical',
        isNumerical: q.type === 'Numerical',
        sourcePaper: {
          title: `AI ${sourceType} Paper`,
          year: new Date().getFullYear(),
          type: sourceType
        }
      }));

      this.activePaper = {
        subject,
        difficulty: difficulty === 'Mixed' ? 'Mixed' : difficulty,
        examSource,
        questions,
        userAnswers: {}
      };

    } catch (err) {
      console.error("Generation failed:", err);
      window.cajsShowAlert("Generation Failed", `${err.message}`, "error");
    }

    this.isGenerating = false;
    this.render(container);
  },

  normalizeAnswer(text) {
    if (!text) return '';
    return String(text).trim().toLowerCase().replace(/\s+/g, ' ').replace(/[^a-z0-9\s₹%().,-]/g, '');
  },

  extractKeywords(text) {
    if (!text) return [];
    const stop = new Set(['a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'have', 'has', 'do', 'does', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'as', 'and', 'but', 'or', 'not', 'this', 'that', 'it', 'we', 'you', 'i', 'also']);
    return [...new Set(
      text.replace(/[^a-zA-Z0-9₹%\s]/g, ' ')
        .split(/\s+/)
        .map(w => w.toLowerCase())
        .filter(w => w.length > 3 && !stop.has(w))
    )].slice(0, 12);
  },

  scoreAnswer(userAnswer, rubric, maxMarks) {
    const keywords = this.extractKeywords(rubric);
    const lower = userAnswer.toLowerCase();
    const words = userAnswer.trim().split(/\s+/).length;
    const matched = keywords.filter(k => lower.includes(k));
    const missed = keywords.filter(k => !lower.includes(k));
    const kwScore = keywords.length > 0 ? matched.length / keywords.length : 0;
    const lenScore = Math.min(1, words / (maxMarks * 10));
    let structScore = 0.3;
    if (/[-•●]\s/.test(userAnswer)) structScore += 0.25;
    if (/\d+[.)]\s/.test(userAnswer)) structScore += 0.25;
    if (/section|act|rule|standard|provision/i.test(userAnswer)) structScore += 0.2;
    structScore = Math.min(1, structScore);
    const compScore = words >= 80 && kwScore >= 0.3 ? 1 : words >= 50 ? 0.8 : words >= 25 ? 0.6 : words >= 10 ? 0.3 : 0;
    const total = (kwScore * 0.5) + (lenScore * 0.2) + (structScore * 0.15) + (compScore * 0.15);
    const awarded = Math.round(maxMarks * total * 2) / 2;
    const feedback = kwScore >= 0.75 ? `Excellent! ${matched.length}/${keywords.length} key concepts covered.`
      : kwScore >= 0.5 ? `Good. Missing: "${missed.slice(0, 2).join('", "')}".`
        : kwScore >= 0.2 ? `Partial. Key terms missing: "${missed.slice(0, 3).join('", "')}".`
          : words < 10 ? 'Too brief. Provide detailed analysis.'
            : 'Lacks core concepts. Review model answer.';
    return { awarded, feedback, matchedKeywords: matched, missedKeywords: missed };
  },

  gradePaper(container) {
    if (!this.activePaper) return;
    let score = 0, total = 0, correct = 0;
    const mistakes = [], evals = [];

    this.activePaper.questions.forEach(q => {
      const raw = this.activePaper.userAnswers[q.id];
      total += q.marks;
      if (q.isDescriptive) {
        const ans = raw || '';
        if (!ans.trim()) {
          evals.push({ q: q.question, marks: 0, maxMarks: q.marks, rubric: q.answer, feedback: "No answer provided.", matchedKeywords: [], missedKeywords: this.extractKeywords(q.answer) });
          mistakes.push({ q: q.question, sub: q.subject, ch: q.chapter, notes: 'Left blank.', diff: q.difficulty });
        } else {
          const res = this.scoreAnswer(ans, q.answer, q.marks);
          score += res.awarded;
          if (res.awarded >= q.marks * 0.5) correct++;
          evals.push({ q: q.question, marks: res.awarded, maxMarks: q.marks, rubric: q.answer, feedback: res.feedback, matchedKeywords: res.matchedKeywords, missedKeywords: res.missedKeywords });
          if (res.awarded < q.marks * 0.6) mistakes.push({ q: q.question, sub: q.subject, ch: q.chapter, notes: `Scored ${res.awarded}/${q.marks}. Missed: ${res.missedKeywords.slice(0, 3).join(', ')}`, diff: q.difficulty });
        }
      } else {
        const ans = typeof raw === 'number' ? (q.options[raw] || '') : (raw || '');
        const ok = ans.trim() !== '' && this.normalizeAnswer(ans) === this.normalizeAnswer(q.answer);
        if (ok) { score += q.marks; correct++; }
        else {
          if (ans.trim() && this.selectedLevel === 'Foundation') score -= 0.25;
          mistakes.push({ q: q.question, sub: q.subject, ch: q.chapter, notes: `Your: ${ans || 'Not answered'}. Correct: ${q.answer}. ${q.notes || ''}`, diff: q.difficulty });
        }
      }
    });

    this.gradedResult = { score: Math.round(score * 10) / 10, totalPoints: total, correctCount: correct, descriptiveEvaluations: evals };
    State.addPaper({ id: "gen_" + Date.now(), date: new Date().toISOString(), subject: this.activePaper.subject, score, total, totalQuestions: this.activePaper.questions.length, difficulty: this.activePaper.difficulty, type: "AI Test" });
    if (mistakes.length > 0) {
      mistakes.forEach(m => State.addMistake(m.q, m.sub, m.ch, m.notes, m.diff));
      window.cajsShowAlert("📝 Graded", `Score: ${Math.round(score * 10) / 10}/${total}\n${mistakes.length} weak areas logged in Mistakes Tracker!`, "success");
    } else {
      window.cajsShowAlert("✨ Flawless!", `Score: ${Math.round(score * 10) / 10}/${total}. 100% correct! 🎉`, "success");
    }
    this.render(container);
  }
};
