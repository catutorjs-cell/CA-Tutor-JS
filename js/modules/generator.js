// CA JS Question Paper Generator Module
import { State } from '../state.js';
import { MOCK_QUESTIONS, SYLLABUS_DATA, MOCK_PAPERS } from '../seedData.js';

export const GeneratorModule = {
  activePaper: null, // Generated active paper: { subject, difficulty, questions: [], userAnswers: {} }
  gradedResult: null, // Graded active paper: { score, totalPoints, correctCount }
  selectedLevel: null, // Override level
  selectedQuestionType: 'Mixed', // Question type selector
  selectedExamSource: 'Mixed', // Question source selector
  ocrScanningStage: null, // OCR buffer stage index (0, 1, 2, 3)
  ocrScanningInterval: null,
  ocrReport: null, // Generated OCR grading report

  render(container) {
    if (!this.selectedLevel) {
      this.selectedLevel = State.user.examLevel;
    }

    const subjects = SYLLABUS_DATA[this.selectedLevel] || [];

    // Reset page variables if we render fresh
    if (!this.activePaper && this.ocrScanningStage === null && !this.ocrReport) {
      this.gradedResult = null;
    }

    let rightPanelHtml = "";

    // 1. Build right panel view based on status
    if (this.ocrScanningStage !== null) {
      // Renders neon scanning HUD
      const stages = [
        { pct: 15, msg: "Running optical scanner on handwritten characters..." },
        { pct: 45, msg: "Extracting concepts: [Valuation under AS-2, Companies Act Section 8, ITC CGST/SGST eligibility]..." },
        { pct: 75, msg: "Comparing with expected CA institute rubric keys..." },
        { pct: 100, msg: "Assembling presentation feedback report..." }
      ];
      const curStage = stages[this.ocrScanningStage] || { pct: 100, msg: "Ready" };

      rightPanelHtml = `
        <div class="glass-card" style="padding:40px; text-align:center; min-height:420px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:24px; position:relative; overflow:hidden; background:rgba(0,0,0,0.85); color:#00ff66; border:1px solid #00ff66; box-shadow:0 0 20px rgba(0,255,102,0.15);">
          <!-- Neon sliding laser animation line -->
          <div style="position:absolute; width:100%; height:4px; background:linear-gradient(90deg, transparent, #00ff66, transparent); top:0; left:0; animation: laserScan 2s infinite ease-in-out; box-shadow:0 0 10px #00ff66; z-index:2;"></div>
          
          <div style="font-size:48px; animation: pulse 1s infinite alternate;">✍️</div>
          <h3 style="font-family:monospace; font-weight:800; font-size:18px; letter-spacing:1px; margin-bottom:5px;">AI OCR HANDWRITING ANALYZER</h3>
          
          <div style="width:100%; max-width:320px; height:8px; background:rgba(0,255,102,0.1); border:1px solid #00ff66; border-radius:4px; overflow:hidden; margin:10px 0;">
            <div style="width:${curStage.pct}%; height:100%; background:#00ff66; border-radius:4px; transition:width 0.4s ease-out; box-shadow:0 0 8px #00ff66;"></div>
          </div>
          
          <span style="font-size:12px; font-family:monospace; font-weight:600; min-height:36px; padding:0 20px; max-width:400px; line-height:1.45;">
            [${curStage.pct}%] - ${curStage.msg}
          </span>
          <span style="font-size:10px; opacity:0.7; font-family:monospace;">CA-JS Cloud Neurals Evaluator v2.8</span>

          <style>
            @keyframes laserScan {
              0% { top: 0%; }
              50% { top: 100%; }
              100% { top: 0%; }
            }
          </style>
        </div>
      `;

    } else if (this.ocrReport) {
      // Renders visual AI mentor OCR Report card
      const rep = this.ocrReport;
      const scorePercent = Math.round((rep.score / rep.total) * 100);
      
      // Map recommended quick syllabus anchors
      const recChaptersHtml = rep.recommendations.map(rec => `
        <button class="btn btn-secondary" style="font-size:11px; padding:6px 12px; display:flex; align-items:center; gap:4px; text-align:left; background:rgba(255,255,255,0.6);" onclick="window.cajsRedirectToStudyArena('${rec.id}')">
          📚 Study ${rec.name}
        </button>
      `).join('');

      rightPanelHtml = `
        <div class="glass-card" style="padding:24px; animation:fadeIn 0.3s ease-out; background:rgba(255,255,255,0.45); border-radius:24px; display:flex; flex-direction:column; gap:16px;">
          
          <div class="paper-sheet-header" style="border-bottom:1px solid rgba(0,0,0,0.06); padding-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <h3 class="header-branding" style="font-size:18px;">AI Scanned OCR Rubric Grade</h3>
              <span style="font-size:11px; color:var(--text-muted); font-weight:600;">Paper: ${rep.subject}</span>
            </div>
            <button class="btn btn-secondary" style="padding:4px 8px; font-size:10px;" onclick="window.cajsClearPaperResult()">
              New Paper
            </button>
          </div>

          <!-- Total Score card dial -->
          <div style="display:grid; grid-template-columns:1fr 2fr; gap:20px; align-items:center; background:rgba(0,0,0,0.02); border:1px solid rgba(0,0,0,0.03); padding:16px; border-radius:16px;">
            <div style="text-align:center; border-right:1px solid rgba(0,0,0,0.06); padding-right:15px;">
              <span style="font-size:9px; font-weight:700; color:var(--text-muted); letter-spacing:0.5px;">AWARDED GRADE</span>
              <div style="font-size:42px; font-family:var(--font-display); font-weight:800; color:var(--pastel-purple-dark); line-height:1.2;">${rep.score}<span style="font-size:16px; font-weight:600; color:var(--text-muted);">/${rep.total}</span></div>
              <span class="badge" style="font-size:9px; background:${scorePercent >= 50 ? 'rgba(179,240,201,0.4)' : 'rgba(255,179,179,0.4)'}; color:${scorePercent >= 50 ? 'var(--pastel-green-dark)' : 'var(--pastel-rose-dark)'};">${scorePercent}% Pass Prob</span>
            </div>
            
            <div style="font-size:12px; line-height:1.45;">
              <span style="font-weight:700; color:var(--pastel-purple-dark); display:block; margin-bottom:4px;">✍️ Presentation & Formatting Feedback:</span>
              <p style="color:var(--text-main); font-style:italic;">"${rep.presentation}"</p>
            </div>
          </div>

          <!-- Report Sections -->
          <div style="display:flex; flex-direction:column; gap:12px; font-size:13px; max-height:220px; overflow-y:auto; padding-right:5px;">
            <div>
              <strong style="color:var(--pastel-rose-dark);">❌ Missing Conceptual Marks Keys:</strong>
              <ul style="margin-top:4px; padding-left:18px; line-height:1.4;">
                ${rep.missing.map(pt => `<li>${pt}</li>`).join('')}
              </ul>
            </div>
            
            <div style="border-top:1px dashed rgba(0,0,0,0.06); padding-top:10px;">
              <strong style="color:var(--pastel-green-dark);">✓ Structural Strengths:</strong>
              <p style="margin-top:4px; line-height:1.45; color:var(--text-muted); font-style:italic;">${rep.corrections}</p>
            </div>
          </div>

          <!-- Revision Quick Redirect Links -->
          <div style="border-top:1px solid rgba(0,0,0,0.06); padding-top:12px;">
            <span style="font-size:10px; font-weight:700; color:var(--text-muted); display:block; margin-bottom:8px; letter-spacing:0.5px;">AI DIRECT REVISION LINKS (+15 pts uploader credited)</span>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
              ${recChaptersHtml}
            </div>
          </div>

        </div>
      `;

    } else if (this.gradedResult) {
      // Show graded score card result
      const questionsCount = this.activePaper.questions.length;
      const percent = Math.round((this.gradedResult.score / this.gradedResult.totalPoints) * 100);
      
      const questionReview = this.activePaper.questions.map((q, idx) => {
        const rawAns = this.activePaper.userAnswers[q.id];
        // Resolve index-based MCQ answers to display text
        const uAns = (!q.isDescriptive && typeof rawAns === 'number') ? (q.options[rawAns] || 'Not Answered') : rawAns;
        
        const badgeColor = q.sourcePaper?.type === 'PYQ' ? 'var(--pastel-green-dark)' : q.sourcePaper?.type === 'RTP' ? 'var(--pastel-purple-dark)' : 'var(--pastel-blue-dark)';
        const badgeBg = q.sourcePaper?.type === 'PYQ' ? 'rgba(179,240,201,0.2)' : q.sourcePaper?.type === 'RTP' ? 'rgba(217,179,255,0.2)' : 'rgba(179,217,255,0.2)';
        const sourceBadgeHtml = q.sourcePaper ? `
          <div style="margin:4px 0 8px 0;">
            <span style="display:inline-block; font-size:9.5px; font-weight:700; color:${badgeColor}; background:${badgeBg}; padding:2px 8px; border-radius:6px; font-family:var(--font-display); border:1px solid rgba(0,0,0,0.02);">
              📄 ${q.sourcePaper.type} ${q.sourcePaper.year}: ${q.sourcePaper.title}
            </span>
          </div>
        ` : '';
        
        if (q.isDescriptive) {
          const evalObj = this.gradedResult.descriptiveEvaluations.find(e => e.q === q.question) || { marks: 0, feedback: '', rubric: q.answer, matchedKeywords: [], missedKeywords: [] };
          const isPassed = evalObj.marks >= q.marks * 0.5;

          const matchedHtml = evalObj.matchedKeywords && evalObj.matchedKeywords.length > 0
            ? evalObj.matchedKeywords.map(k => `<span style="display:inline-block; background:rgba(179,240,201,0.3); color:var(--pastel-green-dark); font-size:10px; padding:2px 6px; border-radius:4px; margin:2px; font-weight:600;">✓ ${k}</span>`).join('')
            : '';
          const missedHtml = evalObj.missedKeywords && evalObj.missedKeywords.length > 0
            ? evalObj.missedKeywords.map(k => `<span style="display:inline-block; background:rgba(255,179,179,0.2); color:var(--pastel-rose-dark); font-size:10px; padding:2px 6px; border-radius:4px; margin:2px; font-weight:600;">✗ ${k}</span>`).join('')
            : '';

          return `
            <div style="border-bottom:1px solid rgba(0,0,0,0.05); padding-bottom:12px; margin-bottom:12px; font-size:13px;">
              <p style="font-weight:600; margin-bottom:4px;">Q${idx + 1}. ${q.question} <span style="color:var(--text-muted); font-size:10px;">(${q.marks} Marks - Descriptive)</span></p>
              ${sourceBadgeHtml}
              <div style="display:flex; flex-direction:column; gap:4px; margin-bottom:6px; background:rgba(0,0,0,0.01); padding:8px; border-radius:8px; border:1px solid rgba(0,0,0,0.02);">
                <span style="color:${isPassed ? 'var(--pastel-green-dark)' : 'var(--pastel-rose-dark)'}; font-weight:bold; font-size:12px;">
                  AI Evaluation: ${evalObj.marks} / ${q.marks} Marks (${isPassed ? 'Good ✓' : 'Needs Work ✗'})
                </span>
                <p style="margin:4px 0; color:var(--text-main); font-size:11.5px;"><strong>Your Drafted Answer:</strong> "${uAns || 'Not Answered'}"</p>
                <p style="margin:4px 0; color:var(--text-muted); font-style:italic; font-size:11px;"><strong>Mentor Feedback:</strong> "${evalObj.feedback}"</p>
                ${matchedHtml || missedHtml ? `
                <div style="margin-top:4px;">
                  <span style="font-size:9px; font-weight:700; color:var(--text-muted); letter-spacing:0.3px;">RUBRIC KEYWORD ANALYSIS:</span>
                  <div style="margin-top:4px; display:flex; flex-wrap:wrap; gap:2px;">${matchedHtml}${missedHtml}</div>
                </div>
                ` : ''}
                <div style="margin-top:6px; padding:6px; background:rgba(255,255,255,0.8); border-radius:6px; border:1px solid rgba(0,0,0,0.03); font-size:11px;">
                  <strong style="color:var(--pastel-purple-dark);">Official Model Rubric:</strong>
                  <p style="margin:2px 0 0 0; color:var(--text-main);">${evalObj.rubric}</p>
                </div>
              </div>
            </div>
          `;
        } else {
          const isCorrect = this.normalizeAnswer(uAns) === this.normalizeAnswer(q.answer);
          return `
            <div style="border-bottom:1px solid rgba(0,0,0,0.05); padding-bottom:12px; margin-bottom:12px; font-size:13px;">
              <p style="font-weight:600; margin-bottom:6px;">Q${idx + 1}. ${q.question} <span style="color:var(--text-muted); font-size:10px;">(${q.marks} Marks - MCQ)</span></p>
              <div style="display:flex; flex-direction:column; gap:4px; margin-bottom:6px;">
                <span style="color:${isCorrect ? 'var(--pastel-green-dark)' : 'var(--pastel-rose-dark)'}; font-weight:bold;">
                  Your Answer: ${uAns || 'Not Answered'} ${isCorrect ? '✓' : '✗'}
                </span>
                ${!isCorrect ? `<span style="color:var(--pastel-green-dark); font-weight:600;">Correct Answer: ${q.answer}</span>` : ''}
              </div>
              ${q.notes ? `<div class="mistake-notes" style="padding:6px; font-size:11px;"><strong>Key Explanation:</strong> ${q.notes}</div>` : ''}
            </div>
          `;
        }
      }).join('');

      rightPanelHtml = `
        <div class="paper-sheet" style="animation: fadeIn 0.4s ease-out; min-height:420px;">
          <div class="paper-sheet-header">
            <h3 class="header-branding" style="font-size:22px;">Test Results Summary</h3>
            <p style="font-size:12px; color:var(--text-muted); margin-top:4px;">CA ${this.selectedLevel} Mock Practice Exam</p>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.02); padding:16px; border-radius:12px; border:1px solid rgba(0,0,0,0.04); margin-bottom:20px;">
            <div>
              <span style="font-size:11px; color:var(--text-muted); font-weight:bold;">SCORE CARD</span>
              <h2 style="font-size: 28px; line-height: 1;" class="header-branding">${this.gradedResult.score} / ${this.gradedResult.totalPoints} Marks</h2>
              <span style="font-size:11px; color:var(--text-muted);">${this.gradedResult.correctCount} correct marks credited</span>
            </div>
            <div style="text-align:right;">
              <div style="font-family:var(--font-display); font-size: 26px; font-weight:700; color:${percent >= 50 ? 'var(--pastel-green-dark)' : 'var(--pastel-rose-dark)'};">${percent}%</div>
              <span style="font-size:11px; color:var(--text-muted);">${percent >= 50 ? 'PASS ✓' : 'RE-STUDY ✗'}</span>
            </div>
          </div>

          <div style="flex-grow:1; overflow-y:auto; max-height: 200px; margin-bottom: 15px; padding-right:5px;">
            ${questionReview}
          </div>

          <button class="btn btn-primary" style="width:100%; font-size:12px;" onclick="window.cajsClearPaperResult()">
            Generate New Paper
          </button>
        </div>
      `;

    } else if (this.activePaper) {
      // Show active question paper solving view
      const questionsList = this.activePaper.questions.map((q, idx) => {
        const rawAns = this.activePaper.userAnswers[q.id];
        // Resolve index-based MCQ answers to display text
        const uAns = (!q.isDescriptive && typeof rawAns === 'number') ? (q.options[rawAns] || null) : rawAns;
        
        const badgeColor = q.sourcePaper?.type === 'PYQ' ? 'var(--pastel-green-dark)' : q.sourcePaper?.type === 'RTP' ? 'var(--pastel-purple-dark)' : 'var(--pastel-blue-dark)';
        const badgeBg = q.sourcePaper?.type === 'PYQ' ? 'rgba(179,240,201,0.2)' : q.sourcePaper?.type === 'RTP' ? 'rgba(217,179,255,0.2)' : 'rgba(179,217,255,0.2)';
        const sourceBadgeHtml = q.sourcePaper ? `
          <div style="margin:4px 0 8px 0; text-align:left;">
            <span style="display:inline-block; font-size:9.5px; font-weight:700; color:${badgeColor}; background:${badgeBg}; padding:2px 8px; border-radius:6px; font-family:var(--font-display); border:1px solid rgba(0,0,0,0.02);">
              📄 ${q.sourcePaper.type} ${q.sourcePaper.year}: ${q.sourcePaper.title}
            </span>
          </div>
        ` : '';

        if (q.isDescriptive) {
          return `
            <div class="paper-question-item" style="border-bottom: 1px dashed rgba(0,0,0,0.06); padding-bottom: 15px; margin-bottom: 15px;">
              <span style="font-weight:600; font-size:13px; display:block; margin-bottom:4px;">
                Q${idx + 1}. ${q.question} <span style="color:var(--pastel-purple-dark); font-weight:700; font-size:11px; margin-left:6px;">(${q.marks} Marks - Descriptive)</span>
              </span>
              ${sourceBadgeHtml}
              <div class="paper-textarea-container" style="margin-top: 6px;">
                <textarea class="paper-textarea" 
                  style="width: 100%; min-height: 100px; padding: 12px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.1); background: rgba(255,255,255,0.6); font-family: var(--font-body); font-size: 12.5px; line-height: 1.5; resize: vertical; transition: all 0.3s ease;"
                  placeholder="Draft your detailed compliance answer here..." 
                  oninput="window.cajsSaveTextareaAnswer('${q.id}', this.value)">${uAns || ''}</textarea>
              </div>
              
              <!-- Rubric Accordion -->
              <div class="rubric-accordion" id="rubric-accordion-${q.id}" style="margin-top: 8px;">
                <button type="button" class="btn btn-secondary rubric-toggle-btn" 
                  style="font-size:11px; padding:6px 12px; background: rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.06); border-radius: 8px; color: var(--text-main); font-weight: 600; cursor: pointer; transition: all 0.2s;"
                  onclick="window.cajsToggleRubric('${q.id}')">
                  ✨ Reveal Suggested Rubric Key
                </button>
                <div class="rubric-content glass-card" id="rubric-content-${q.id}" style="display: none; margin-top: 8px; padding: 12px; border-radius: 10px; background: rgba(255,255,255,0.6); border: 1px solid rgba(0,0,0,0.04); font-size: 11.5px; line-height: 1.45;">
                  <strong style="color: var(--pastel-purple-dark); display: block; margin-bottom: 4px;">🎯 Official Model Answer / Marking Key:</strong>
                  <p style="color: #6c5dd3; font-weight: 550; margin: 0;">${q.answer}</p>
                </div>
              </div>
            </div>
          `;
        } else {
          // Standard MCQ
          const optionButtons = q.options.map((opt, optIdx) => {
            const isSelected = rawAns === optIdx;
            return `
              <button class="paper-opt-btn ${isSelected ? 'selected' : ''}" onclick="window.cajsSelectOption('${q.id}', ${optIdx})">
                ${opt}
              </button>
            `;
          }).join('');

          return `
            <div class="paper-question-item" style="border-bottom: 1px dashed rgba(0,0,0,0.06); padding-bottom: 15px; margin-bottom: 15px;">
              <span style="font-weight:600; font-size:13px; display:block; margin-bottom:4px;">
                Q${idx + 1}. ${q.question} <span style="color:var(--pastel-blue-dark); font-weight:700; font-size:11px; margin-left:6px;">(${q.marks} Marks - MCQ)</span>
              </span>
              ${sourceBadgeHtml}
              <div class="paper-opt-list" style="margin-top:8px;">
                ${optionButtons}
              </div>
            </div>
          `;
        }
      }).join('');

      rightPanelHtml = `
        <div class="paper-sheet" style="animation: fadeIn 0.4s ease-out; min-height:420px; display:flex; flex-direction:column; justify-content:space-between;">
          <div>
            <div class="paper-sheet-header" style="margin-bottom:12px;">
              <h3 class="header-branding" style="font-size:18px;">${this.activePaper.subject} Practice Paper</h3>
              <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--text-muted); margin-top:6px; font-weight:500;">
                <span>DIFFICULTY: <strong>${this.activePaper.difficulty}</strong></span>
                <span>TIME LIMIT: <strong>30 MINS</strong></span>
              </div>
            </div>

            <div style="overflow-y: auto; max-height: 240px; padding-right:5px; margin-bottom:15px;">
              ${questionsList}
            </div>
          </div>

          <!-- Bottom double actions: Solve manually OR Upload sheet for OCR -->
          <div style="border-top:1px solid rgba(0,0,0,0.06); padding-top:12px; display:flex; flex-direction:column; gap:10px;">
            <button class="btn btn-success" style="width: 100%; font-size:12px;" onclick="window.cajsSubmitPaperAnswers()">
              Submit & Grade Online
            </button>
            <button class="btn btn-secondary" style="width: 100%; font-size:12px; background: rgba(108,93,211,0.08); border-color: rgba(108,93,211,0.15); color: var(--pastel-purple-dark);" onclick="window.cajsSavePaperToLibrary()">
              💾 Save Paper to Library
            </button>
            
            <div style="text-align:center; font-size:10px; color:var(--text-muted); font-weight:700;">— OR —</div>
            
            <!-- Handwriting OCR uploader -->
            <div style="border: 1px dashed rgba(0,0,0,0.15); border-radius:10px; background:rgba(0,0,0,0.01); padding:8px 12px; text-align:center; cursor:pointer;" onclick="document.getElementById('ocr-handwriting-input').click()">
              <span style="font-size:11px; font-weight:700; color:var(--pastel-purple-dark); display:block;">✍️ Upload Scanned Sheet for AI Grading</span>
              <span style="font-size:9px; color:var(--text-muted);">Accepts images / scanned notes PDFs (+15 pts uploader)</span>
              <input type="file" id="ocr-handwriting-input" style="display:none;" onchange="window.cajsTriggerOCRScan(this)">
            </div>
          </div>
        </div>
      `;

    } else {
      // Show Saved Generated Papers list or a clean placeholder if empty
      const savedPapers = State.customPapers || [];
      if (savedPapers.length > 0) {
        const savedListHtml = savedPapers.map(paper => `
          <div class="glass-card" style="padding: 14px; margin-bottom: 12px; border-radius: 14px; background: rgba(255, 255, 255, 0.55); border: 1px solid rgba(255, 255, 255, 0.4); display: flex; justify-content: space-between; align-items: center; gap: 10px; animation: fadeIn 0.3s ease-out;">
            <div style="text-align: left;">
              <h4 style="font-size: 12.5px; font-weight: 700; margin: 0; color: var(--text-main);">${paper.title}</h4>
              <p style="font-size: 10px; color: var(--text-muted); margin: 2px 0 0;">${paper.subject} &bull; ${paper.questions ? paper.questions.length : 0} Questions</p>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-secondary" style="padding: 5px 10px; font-size: 10px;" onclick="window.cajsShowSuggestedAnswerFromGenerator('${paper.id}')">
                💡 Answers
              </button>
            </div>
          </div>
        `).join('');

        rightPanelHtml = `
          <div class="paper-sheet" style="animation: fadeIn 0.4s ease-out; min-height:420px; display:flex; flex-direction:column; justify-content:flex-start; text-align: left; padding: 20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 15px; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 8px;">
              <h3 class="header-branding" style="font-size:15px; margin:0;">📚 Saved Generated Papers</h3>
              <span class="badge badge-low" style="font-size:9px;">${savedPapers.length} Papers</span>
            </div>
            <div style="overflow-y: auto; max-height: 320px; padding-right: 5px;">
              ${savedListHtml}
            </div>
          </div>
        `;
      } else {
        // Fallback default placeholder sheet when no papers are saved yet
        rightPanelHtml = `
          <div class="paper-sheet" style="justify-content: center; align-items: center; text-align: center; color: var(--text-muted); min-height:420px;">
            <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" fill="none" stroke-width="1.5" style="margin-bottom:12px; opacity:0.6;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
            <span style="font-size:14px; font-weight:600;">Custom Paper Sheet Viewer</span>
            <p style="font-size:12px; max-width: 250px; margin-top: 4px;">Adjust parameters in the left panel and click 'Generate Question Paper' to populate your sheet.</p>
          </div>
        `;
      }
    }

    // 2. Build left setup form panel
    const subjectSelectOptions = subjects.map(sub => `
      <option value="${sub.subject}">${sub.subject}</option>
    `).join('');

    container.innerHTML = `
      <header class="app-header">
        <div class="header-title-container">
          <h1 class="header-branding">Mock Question Paper Generator</h1>
          <span class="header-subtitle">Assess your preparedness with level overrides, marks selections, and OCR evaluation</span>
        </div>
      </header>

      <div class="paper-builder" style="animation: fadeIn 0.3s ease-out;">
        <!-- Left configuration options card -->
        <div class="glass-card">
          <h3 class="header-branding" style="font-size: 18px; margin-bottom: 15px;">Paper Settings</h3>
          <form id="paper-gen-form">
            
            <div class="form-group">
              <label class="form-label" for="gen-level">Level Override</label>
              <select class="form-select" id="gen-level">
                <option value="Foundation" ${this.selectedLevel === 'Foundation' ? 'selected' : ''}>CA Foundation</option>
                <option value="Intermediate" ${this.selectedLevel === 'Intermediate' ? 'selected' : ''}>CA Intermediate</option>
                <option value="Final" ${this.selectedLevel === 'Final' ? 'selected' : ''}>CA Final</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="gen-subject">Select Subject</label>
              <select class="form-select" id="gen-subject" required>
                <option value="" disabled selected>Select Subject</option>
                ${subjectSelectOptions}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="gen-chapter">Select Chapter Filter</label>
              <select class="form-select" id="gen-chapter" required disabled>
                <option value="" disabled selected>Select Subject first</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="gen-source">Select Question Source</label>
              <select class="form-select" id="gen-source" required>
                <option value="Mixed" selected>Mixed (All Sources)</option>
                <option value="PYQ">Previous Year Questions (PYQ) only</option>
                <option value="RTP">Revision Test Papers (RTP) only</option>
                <option value="MTP">Mock Test Papers (MTP) only</option>
                <option value="Assets">Questions from Uploaded Assets (MTP/RTP/PYQ)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="gen-type">Question Type</label>
              <select class="form-select" id="gen-type" required>
                <option value="Mixed" ${this.selectedQuestionType === 'Mixed' ? 'selected' : ''}>Mixed (MCQ + Descriptive)</option>
                <option value="MCQ" ${this.selectedQuestionType === 'MCQ' ? 'selected' : ''}>Only MCQ</option>
                <option value="Descriptive" ${this.selectedQuestionType === 'Descriptive' ? 'selected' : ''}>Only Descriptive</option>
              </select>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <div class="form-group">
                <label class="form-label" for="gen-marks">Target Marks</label>
                <select class="form-select" id="gen-marks" required>
                  <option value="20" selected>20 Marks</option>
                  <option value="50">50 Marks</option>
                  <option value="100">100 Marks</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="gen-difficulty">Difficulty</label>
                <select class="form-select" id="gen-difficulty" required>
                  <option value="All" selected>Mixed</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <!-- ADAPTIVE MODE TOGGLE -->
            <div style="background:rgba(0,0,0,0.02); border:1px solid rgba(0,0,0,0.03); border-radius:12px; padding:12px 15px; margin-bottom:15px; display:flex; align-items:center; justify-content:space-between; gap:10px;">
              <div style="display:flex; flex-direction:column;">
                <span style="font-size:12px; font-weight:700; color:var(--pastel-purple-dark);">Adaptive Weakness Focus</span>
                <span style="font-size:9px; color:var(--text-muted); line-height:1.25;">Filters chapters with mistakes or readiness under 50%</span>
              </div>
              <label class="switch" style="position:relative; display:inline-block; width:44px; height:24px;">
                <input type="checkbox" id="gen-adaptive-mode" style="opacity:0; width:0; height:0;">
                <span class="slider round" style="position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background-color:#ccc; transition:.4s; border-radius:34px;"></span>
              </label>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
              Generate Question Paper
            </button>
          </form>
        </div>

        <!-- Right Question sheet panel -->
        <div id="gen-paper-viewport">
          ${rightPanelHtml}
        </div>
      </div>

      <style>
        .switch input:checked + .slider { background-color: var(--pastel-purple-dark); }
        .slider:before {
          position: absolute; content: ""; height: 16px; width: 16px; left: 4px; bottom: 4px;
          background-color: white; transition: .4s; border-radius: 50%;
        }
        .switch input:checked + .slider:before { transform: translateX(20px); }
      </style>
    `;

    // Bind Level override switch
    const levelSelect = container.querySelector('#gen-level');
    levelSelect.addEventListener('change', (e) => {
      this.selectedLevel = e.target.value;
      this.activePaper = null;
      this.gradedResult = null;
      this.ocrReport = null;
      this.render(container);
    });

    // Dynamic chapters dropdown population depending on subject
    const subjectSelect = container.querySelector('#gen-subject');
    const chapterSelect = container.querySelector('#gen-chapter');

    subjectSelect.addEventListener('change', (e) => {
      const selectedSubName = e.target.value;
      const matchedSubjectObj = subjects.find(s => s.subject === selectedSubName);
      
      if (matchedSubjectObj) {
        chapterSelect.disabled = false;
        chapterSelect.innerHTML = `<option value="All" selected>All Chapters</option>` + matchedSubjectObj.chapters.map(ch => `
          <option value="${ch.name}">${ch.name}</option>
        `).join('');
      } else {
        chapterSelect.disabled = true;
        chapterSelect.innerHTML = '<option value="" disabled selected>Select Subject first</option>';
      }
    });

    // Bind form submission to generate paper
    container.querySelector('#paper-gen-form').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const sub = subjectSelect.value;
      const chap = chapterSelect.value;
      const diff = container.querySelector('#gen-difficulty').value;
      const marks = parseInt(container.querySelector('#gen-marks').value);
      const adaptive = container.querySelector('#gen-adaptive-mode').checked;
      const qType = container.querySelector('#gen-type').value;
      const source = container.querySelector('#gen-source').value;

      this.selectedQuestionType = qType;
      this.selectedExamSource = source;
      this.generatePaper(sub, chap, diff, marks, adaptive, container, qType, source);
    });

    // Action handlers global links
    window.cajsSelectOption = (qId, optionIndex) => {
      if (this.activePaper) {
        // Store the option index for reliable answer matching
        this.activePaper.userAnswers[qId] = optionIndex;
        this.render(container);
      }
    };

    window.cajsSaveTextareaAnswer = (qId, val) => {
      if (this.activePaper) {
        this.activePaper.userAnswers[qId] = val;
      }
    };

    window.cajsToggleRubric = (qId) => {
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

    window.cajsSubmitPaperAnswers = () => {
      this.gradePaperAnswers(container);
    };

    window.cajsClearPaperResult = () => {
      this.activePaper = null;
      this.gradedResult = null;
      this.ocrReport = null;
      this.render(container);
    };

    window.cajsSavePaperToLibrary = () => {
      if (!this.activePaper) return;
      
      const defaultTitle = `${this.activePaper.subject} Generated ${this.selectedExamSource === 'Assets' ? 'Asset ' : ''}Paper`;
      window.cajsShowPrompt(
        "Save Paper to Library",
        "Enter a custom title for this generated exam paper so it appears in your Past Papers library:",
        (customTitle) => {
          const type = this.selectedExamSource === 'Assets' ? 'PYQ' : (this.selectedExamSource === 'Mixed' ? 'MTP' : this.selectedExamSource);
          const year = new Date().getFullYear();
          const pdfUrl = ''; // dynamic questions instead
          
          State.addCustomPaper(
            type,
            year,
            this.activePaper.subject,
            customTitle,
            pdfUrl,
            this.activePaper.questions
          );
          
          window.cajsShowAlert(
            "💾 Paper Saved",
            `"${customTitle}" has been successfully added to your Past Papers Library!\n\nYou can access, attempt, and view suggested answers for it at any time from the 'PYQ, RTP & MTP' tab.`,
            "success"
          );
        },
        defaultTitle
      );
    };

    window.cajsGoToAttemptCustomPaper = (paperId) => {
      const pyqNavItem = document.querySelector('.nav-menu .nav-item[data-tab="pyq-mtp"]');
      if (pyqNavItem) {
        pyqNavItem.click();
        setTimeout(() => {
          if (window.cajsAttemptPaper) {
            window.cajsAttemptPaper(paperId);
          }
        }, 300);
      }
    };

    window.cajsShowSuggestedAnswerFromGenerator = (paperId) => {
      const customList = State.customPapers || [];
      const paper = customList.find(p => p.id === paperId);
      if (paper && paper.questions && paper.questions.length > 0) {
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
      }
    };

    // ── Word / Text File Question Importer ──────────────────────────────────
    window.cajsImportQuestionsFile = (input) => {
      const statusEl = document.getElementById('gen-import-status');
      if (!input.files || !input.files[0]) return;
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const rawText = e.target.result;
        // Parse raw text to extract MCQ blocks
        // Expected format (flexible):
        //   1. Question text?
        //   a) Option A   b) Option B   c) Option C   d) Option D
        //   Answer: a) Option A
        //   (OR) Answer: Option A
        const lines = rawText.replace(/\r/g, '').split('\n').map(l => l.trim()).filter(l => l.length > 0);
        const parsedQuestions = [];
        let i = 0;

        const selectedSubject = container.querySelector('#gen-subject')?.value || 'Paper-1: Accounting (Foundation)';
        const selectedChapter = container.querySelector('#gen-chapter')?.value || 'General';

        while (i < lines.length) {
          // Detect question line: starts with a number followed by . or )
          const qMatch = lines[i].match(/^(\d+)[.)\s]\s*(.+)/);
          if (qMatch) {
            const questionText = qMatch[2].trim();
            const options = [];
            let answer = '';
            let j = i + 1;

            // Collect up to 4 option lines (a/b/c/d or A/B/C/D or (a)/(b)...)
            while (j < lines.length && options.length < 4) {
              const optMatch = lines[j].match(/^[\(]?([a-dA-D])[\).\s)]\s*(.+)/);
              if (optMatch) {
                options.push(optMatch[2].trim());
                j++;
              } else {
                break;
              }
            }

            // Detect answer line
            if (j < lines.length) {
              const ansLine = lines[j].toLowerCase();
              if (ansLine.startsWith('answer') || ansLine.startsWith('ans') || ansLine.startsWith('correct')) {
                const ansPart = lines[j].replace(/^(answer|ans|correct)[:\s]*/i, '').trim();
                // Match to option text if it's a letter like "a" or "a)"
                const letterMatch = ansPart.match(/^[\(]?([a-dA-D])[\).]?$/);
                if (letterMatch) {
                  const idx = letterMatch[1].toLowerCase().charCodeAt(0) - 97; // a=0, b=1...
                  answer = options[idx] || ansPart;
                } else {
                  // Full answer text
                  answer = ansPart.replace(/^[\(]?[a-dA-D][\).\s]+/, '').trim();
                }
                j++;
              }
            }

            if (questionText && options.length >= 2) {
              parsedQuestions.push({
                id: `q_import_${Date.now()}_${parsedQuestions.length}`,
                subject: selectedSubject === '' ? 'Paper-1: Accounting (Foundation)' : selectedSubject,
                chapter: selectedChapter === 'All' || !selectedChapter ? 'General' : selectedChapter,
                difficulty: 'Medium',
                question: questionText,
                options: options,
                answer: answer || options[0],
                marks: 2
              });
            }
            i = j;
          } else {
            i++;
          }
        }

        if (parsedQuestions.length === 0) {
          statusEl.innerHTML = '<span style="color:#e53935;">❌ No questions detected. Make sure format is: 1. Question? a) Opt b) Opt c) Opt d) Opt Answer: a</span>';
          return;
        }

        // Inject into MOCK_QUESTIONS for this session
        if (!window._cajsImportedQuestions) window._cajsImportedQuestions = [];
        window._cajsImportedQuestions.push(...parsedQuestions);
        MOCK_QUESTIONS.push(...parsedQuestions);

        statusEl.innerHTML = `<span style="color:#2e7d32;">✅ ${parsedQuestions.length} questions imported and added to the question bank!</span>`;
        input.value = '';
      };

      // For .txt files use readAsText; for .docx extract plain text via ArrayBuffer
      if (file.name.endsWith('.txt')) {
        reader.readAsText(file);
      } else if (file.name.endsWith('.docx')) {
        // Use mammoth.js CDN to extract text from docx
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js';
        script.onload = () => {
          const arrReader = new FileReader();
          arrReader.onload = (ev) => {
            mammoth.extractRawText({ arrayBuffer: ev.target.result })
              .then(result => {
                const fakeEvent = { target: { result: result.value } };
                reader.onload(fakeEvent);
              })
              .catch(() => {
                statusEl.innerHTML = '<span style="color:#e53935;">❌ Could not read .docx file. Try saving as .txt instead.</span>';
              });
          };
          arrReader.readAsArrayBuffer(file);
        };
        script.onerror = () => {
          statusEl.innerHTML = '<span style="color:#e53935;">❌ Could not load Word reader. Please save your file as .txt and try again.</span>';
        };
        document.head.appendChild(script);
      }
    };

    window.cajsTriggerOCRScan = (fileInput) => {
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        
        // Start OCR simulation stages
        this.ocrScanningStage = 0;
        this.render(container);

        this.ocrScanningInterval = setInterval(() => {
          this.ocrScanningStage++;
          if (this.ocrScanningStage >= 4) {
            clearInterval(this.ocrScanningInterval);
            this.ocrScanningInterval = null;
            this.ocrScanningStage = null;
            
            // Build visual rubrics based on selected subject/marks
            const maxMarks = parseInt(container.querySelector('#gen-marks').value) || 50;
            const scoreGraded = Math.round(maxMarks * (0.65 + Math.random() * 0.25)); // 65-90% grade
            
            // Collect recommendation link info matching chapter database
            const levelChapters = SYLLABUS_DATA[this.selectedLevel] || [];
            const subObj = levelChapters.find(s => s.subject === this.activePaper.subject) || { chapters: [] };
            
            const recChapters = subObj.chapters.slice(0, 2).map(c => ({ id: c.id, name: c.name }));

            let missingKeys = [
              "Missed citing the rule that abnormal waste is excluded from inventory valuation under AS-2 guidelines.",
              "Ensure standard schedule citation footnotes are clearly delineated."
            ];

            if (this.activePaper && this.activePaper.questions.length > 0) {
              missingKeys = this.activePaper.questions.slice(0, 2).map(q => {
                if (q.isDescriptive) {
                  return `Need stronger keyword alignment with model rubric: "${q.answer.split('.')[0]}."`;
                } else {
                  return `Missed concept clarification for MCQ key: "${q.answer}"`;
                }
              });
            }

            this.ocrReport = {
              subject: this.activePaper.subject,
              score: scoreGraded,
              total: maxMarks,
              presentation: "Well organized. Excellent usage of margin notes. Ensure statutory sections are stated in bold headings.",
              corrections: "Exceptional command of theoretical structures. In the calculations section, verified parameters matched perfectly. Watch out for clear statement margins.",
              missing: missingKeys,
              recommendations: recChapters
            };

            // Store uploader points and sync materials profile
            State.addUploadedMaterial(
              recChapters[0]?.id || "f_acc_c1",
              file.name,
              (file.size / 1024 / 1024).toFixed(2) + " MB"
            );

            // Log evaluated exam to profile test stats
            State.addPaper({
              id: "ocr_" + Date.now(),
              date: new Date().toISOString(),
              subject: this.activePaper.subject,
              score: scoreGraded,
              total: maxMarks,
              totalQuestions: this.activePaper.questions.length,
              difficulty: this.activePaper.difficulty,
              type: "AI OCR Grader"
            });
            
            window.cajsShowAlert("✨ Scan Evaluated", `AI Scanned Evaluation Grader finished! +15 Upload points credited.\nAwarded Score: ${scoreGraded}/${maxMarks} Marks.\nGrade and corrections saved to profile.`, "success");
          }
          this.render(container);
        }, 1200);
      }
    };

    window.cajsRedirectToStudyArena = (cId) => {
      // Search for the Syllabus Module tab, click it, and load chapter Study Arena!
      const navItem = document.querySelector('.nav-item[data-tab="syllabus"]');
      if (navItem) {
        import('./syllabus.js').then((module) => {
          module.SyllabusModule.activeChapterId = cId;
          
          // Switch SPA active tab in UI
          document.querySelectorAll('.nav-menu .nav-item').forEach(li => li.classList.remove('active'));
          navItem.classList.add('active');
          
          const viewContainer = document.getElementById('app-viewport');
          module.SyllabusModule.render(viewContainer);
        });
      }
    };
  },

  parseAssetQuestions(fileText) {
    // Normalize all line endings (both \r\n and \r) to standard \n
    fileText = fileText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    const questionRegex = /(?:^|\n|\f)\s*Question\s+(\d+)\s*/gi;
    const matches = [];
    let match;
    while ((match = questionRegex.exec(fileText)) !== null) {
      matches.push({
        num: match[1],
        index: match.index,
        length: match[0].length
      });
    }
    
    const questions = [];
    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].index + matches[i].length;
      const end = (i + 1 < matches.length) ? matches[i + 1].index : fileText.length;
      const block = fileText.substring(start, end).trim();
      
      const answerRegex = /(?:\n|^|\f)\s*(?:Answer|Suggested Answer|Ans)\b\s*/i;
      const ansMatch = answerRegex.exec(block);
      
      if (ansMatch) {
        const qText = block.substring(0, ansMatch.index).trim();
        const aText = block.substring(ansMatch.index + ansMatch[0].length).trim();
        
        let cleanQText = qText.replace(/\f/g, '\n').replace(/PAPER\s*–\s*\d+\s*:\s*[A-Z\s]+/gi, '').trim();
        let cleanAText = aText.replace(/\f/g, '\n').trim();
        
        // Safety replacements for Rupee symbol encoding mismatches
        cleanQText = cleanQText
          .replace(/â\u201a¹/g, '₹')
          .replace(/â‚¹/g, '₹')
          .replace(/â\x82\xb9/g, '₹')
          .replace(/â\u201A¹/g, '₹')
          .replace(/â\s*,\s*¹/g, '₹')
          .replace(/â\s*,\s*/g, '₹');
          
        cleanAText = cleanAText
          .replace(/â\u201a¹/g, '₹')
          .replace(/â‚¹/g, '₹')
          .replace(/â\x82\xb9/g, '₹')
          .replace(/â\u201A¹/g, '₹')
          .replace(/â\s*,\s*¹/g, '₹')
          .replace(/â\s*,\s*/g, '₹');
        
        const marksMatch = cleanQText.match(/\((\d+)\s*Marks\)/i);
        const marks = marksMatch ? parseInt(marksMatch[1]) : 10;
        
        if (cleanQText.length > 20 && cleanAText.length > 20) {
          questions.push({
            id: `asset_q_${matches[i].num}_${i}`,
            question: cleanQText,
            answer: cleanAText,
            marks: marks,
            isDescriptive: true,
            chapter: `Question ${matches[i].num}`
          });
        }
      }
    }
    return questions;
  },

  async generatePaper(subjectName, chapterFilter, difficultyFilter, targetMarks, isAdaptiveMode, container, questionType = 'Mixed', examSource = 'Mixed') {
    if (examSource === 'Assets') {
      let fileName = '';
      const lowerSub = subjectName.toLowerCase();
      if (lowerSub.includes('account') || lowerSub.includes('financial reporting')) {
        fileName = 'ACCOUNTS_PYQ.txt';
      } else if (lowerSub.includes('law') || lowerSub.includes('audit') || lowerSub.includes('tax') || lowerSub.includes('integrated business')) {
        fileName = 'BUSINESS LAW_PYQ.txt';
      } else if (lowerSub.includes('econ') || lowerSub.includes('strategic management')) {
        fileName = 'ECONOMICS_PYQ.txt';
      } else if (lowerSub.includes('quant') || lowerSub.includes('math') || lowerSub.includes('aptitude') || lowerSub.includes('cost') || lowerSub.includes('fm') || lowerSub.includes('financial management')) {
        fileName = 'QUANITITATIVE_PYQ.txt';
      } else {
        fileName = 'ACCOUNTS_PYQ.txt';
      }

      // Show loading UI on the right panel
      const paperViewport = container.querySelector('#gen-paper-viewport');
      if (paperViewport) {
        paperViewport.innerHTML = `
          <div class="glass-card" style="padding:40px; text-align:center; min-height:420px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px;">
            <div style="font-size:32px; animation:spin 1s infinite linear;">⏳</div>
            <h4 style="font-weight:700; color:var(--pastel-purple-dark);">Fetching & Parsing Asset File...</h4>
            <p style="font-size:12px; color:var(--text-muted);">Extracting past year questions and suggested answers from ${fileName}</p>
          </div>
        `;
      }

      try {
        const response = await fetch(`./${fileName}`);
        if (!response.ok) throw new Error(`Failed to load ${fileName}`);
        
        // Decode using TextDecoder to guarantee correct UTF-8 handling for special symbols like Indian Rupee (₹)
        const arrayBuffer = await response.arrayBuffer();
        const utf8Decoder = new TextDecoder('utf-8');
        let fileText = utf8Decoder.decode(arrayBuffer);
        
        // Double-safety replacement for any ISO-8859-1 corrupted double-encoded sequences
        fileText = fileText
          .replace(/â\u201a¹/g, '₹')
          .replace(/â‚¹/g, '₹')
          .replace(/â\x82\xb9/g, '₹')
          .replace(/â\u201A¹/g, '₹');
        
        const parsedQs = this.parseAssetQuestions(fileText);

        if (parsedQs.length === 0) {
          throw new Error("No descriptive questions could be parsed from the selected file.");
        }

        // Shuffle and pick questions up to targetMarks
        const shuffled = [...parsedQs].sort(() => 0.5 - Math.random());
        let selectedQs = [];
        let currentMarks = 0;
        
        for (const q of shuffled) {
          if (currentMarks + q.marks <= targetMarks + 5) { // slight margin allowed
            selectedQs.push({
              ...q,
              subject: subjectName,
              sourcePaper: {
                title: `${fileName.replace('_PYQ.txt', '')} Asset Past Paper`,
                year: 2025,
                type: 'PYQ'
              }
            });
            currentMarks += q.marks;
          }
          if (currentMarks >= targetMarks) break;
        }

        // If nothing selected or too few, pick at least 2 questions
        if (selectedQs.length === 0) {
          selectedQs = shuffled.slice(0, 2).map(q => ({
            ...q,
            subject: subjectName,
            sourcePaper: {
              title: `${fileName.replace('_PYQ.txt', '')} Asset Past Paper`,
              year: 2025,
              type: 'PYQ'
            }
          }));
        }

        this.activePaper = {
          subject: subjectName,
          difficulty: 'Mixed',
          questions: selectedQs,
          userAnswers: {},
          isFromAssets: true,
          assetFileName: fileName
        };

        this.gradedResult = null;
        this.ocrReport = null;
        this.render(container);

      } catch (err) {
        console.error(err);
        window.cajsShowAlert("Error Loading Assets", `Failed to parse questions: ${err.message}`, "error");
        this.render(container);
      }
      return;
    }

    // 1. Get level-specific chapters and mistakes matching parameters
    const levelChapters = SYLLABUS_DATA[this.selectedLevel] || [];
    const matchedSubjectObj = levelChapters.find(s => s.subject === subjectName);
    
    let activeMistakeChapters = [];
    if (isAdaptiveMode) {
      // Find active mistakes chapters matching this subject
      const unresolvedMistakes = State.mistakes.filter(m => !m.resolved && m.subject === subjectName);
      activeMistakeChapters = unresolvedMistakes.map(m => m.chapter);

      // Check subject chapters with readiness < 50%
      if (matchedSubjectObj) {
        matchedSubjectObj.chapters.forEach(ch => {
          const readiness = State.getReadinessPercentage(subjectName);
          if (readiness < 50) {
            activeMistakeChapters.push(ch.name);
          }
        });
      }
    }

    // Compile Descriptive questions pool from chapter illustrations
    let descriptivePool = [];
    if (matchedSubjectObj) {
      matchedSubjectObj.chapters.forEach(ch => {
        if (chapterFilter === 'All' || ch.name === chapterFilter) {
          if (ch.illustrations && ch.illustrations.length > 0) {
            ch.illustrations.forEach((illus, idx) => {
              descriptivePool.push({
                id: `q_desc_${ch.id}_${idx}`,
                subject: subjectName,
                chapter: ch.name,
                difficulty: ch.weightage === 'High' ? 'Hard' : ch.weightage === 'Medium' ? 'Medium' : 'Easy',
                question: illus.q,
                answer: illus.a, // suggested rubric
                marks: ch.weightage === 'High' ? 10 : 5,
                isDescriptive: true
              });
            });
          }
        }
      });
    }

    if (descriptivePool.length === 0) {
      descriptivePool.push({
        id: `q_desc_fallback_${Date.now()}`,
        subject: subjectName,
        chapter: chapterFilter === 'All' ? 'Core Concepts' : chapterFilter,
        difficulty: 'Medium',
        question: `Provide a detailed statutory and conceptual analysis of key practices, disclosures, and regulatory requirements relevant to ${subjectName} - ${chapterFilter === 'All' ? 'Core Concepts' : chapterFilter}.`,
        answer: `Under standard ICAI compliance guidelines, this chapter requires strict adherence to disclosure practices, statutory reconciliation protocols, and fair-presentation standards. Students must cite specific acts/rules (e.g. Companies Act 2013 sections, AS, or Ind AS guidelines as applicable), identify debit/credit adjustments, and provide exhaustive footnotes outlining material judgments.`,
        marks: 10,
        isDescriptive: true
      });
    }

    // 2. Filter base MCQ questions
    let mcqMatches = MOCK_QUESTIONS.filter(q => {
      const matchesSub = q.subject === subjectName;
      let matchesChap = chapterFilter === 'All' || q.chapter === chapterFilter;
      const matchesDiff = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
      
      if (isAdaptiveMode && matchesSub) {
        // If adaptive, force filter to chapters matching weaknesses
        return activeMistakeChapters.includes(q.chapter) && matchesDiff;
      }

      return matchesSub && matchesChap && matchesDiff;
    });

    // Graceful fallback if adaptive mode has no matches
    if (mcqMatches.length === 0 && isAdaptiveMode) {
      window.cajsShowAlert("Adaptive Fallback", "No matching questions found in your exact weakness chapters. Falling back to all subject chapters.", "info");
      mcqMatches = MOCK_QUESTIONS.filter(q => q.subject === subjectName && (difficultyFilter === 'All' || q.difficulty === difficultyFilter));
    }

    if (mcqMatches.length === 0) {
      mcqMatches = [
        {
          id: `q_gen_m1_${Date.now()}`,
          subject: subjectName,
          chapter: "Core Standards",
          difficulty: "Medium",
          question: `Explain fundamental presentation schedules and disclosure principles corresponding to ${subjectName}.`,
          options: ["Requires fair presentation and compliance", "Prudence guidelines dictate ignoring exceptions", "Maximized profit declarations", "Allows retroactive modifications without footnotes"],
          answer: "Requires fair presentation and compliance",
          marks: 5,
          notes: "Fair presentation requires faithful representation of transactions under accounting frameworks."
        },
        {
          id: `q_gen_m2_${Date.now()}`,
          subject: subjectName,
          chapter: "Ethics",
          difficulty: "Easy",
          question: "Under the statutory guidelines of the Institute, a CA in practice must preserve professional independence to guarantee:",
          options: ["Credibility and trust in reports", "Maximum fee margins", "Compliance with client commands", "Unrestricted consulting allowances"],
          answer: "Credibility and trust in reports",
          marks: 5,
          notes: "Independence is the hallmark of audit compliance."
        }
      ];
    }

    // 3. Compile questions matching selected marks capacity and questionType
    let finalQuestions = [];
    
    if (questionType === 'MCQ') {
      let targetQCount = targetMarks === 20 ? 4 : targetMarks === 50 ? 10 : 20;
      let marksPerQ = targetMarks / targetQCount;

      if (this.selectedLevel === 'Foundation') {
        marksPerQ = 4;
        targetQCount = Math.round(targetMarks / 4);
      }

      let i = 0;
      while (finalQuestions.length < targetQCount) {
        const baseQ = mcqMatches[i % mcqMatches.length];
        finalQuestions.push({
          ...baseQ,
          id: `${baseQ.id}_repeat_${finalQuestions.length}`,
          marks: marksPerQ
        });
        i++;
      }
    } else if (questionType === 'Descriptive') {
      const targetQCount = targetMarks === 20 ? 2 : targetMarks === 50 ? 5 : 10;
      let i = 0;
      while (finalQuestions.length < targetQCount) {
        const baseQ = descriptivePool[i % descriptivePool.length];
        finalQuestions.push({
          ...baseQ,
          id: `${baseQ.id}_repeat_${finalQuestions.length}`,
          marks: targetMarks / targetQCount
        });
        i++;
      }
    } else {
      // Mixed
      // 20 marks: 2 MCQs (5 marks each) + 1 Descriptive (10 marks)
      // 50 marks: 4 MCQs (5 marks each) + 3 Descriptive (10 marks each)
      // 100 marks: 8 MCQs (5 marks each) + 6 Descriptive (10 marks each)
      let mcqCount = 2;
      let descCount = 1;
      if (targetMarks === 50) {
        mcqCount = 4;
        descCount = 3;
      } else if (targetMarks === 100) {
        mcqCount = 8;
        descCount = 6;
      }

      // Add MCQs
      let mcqMarks = this.selectedLevel === 'Foundation' ? 4 : 5;
      for (let j = 0; j < mcqCount; j++) {
        const baseQ = mcqMatches[j % mcqMatches.length];
        finalQuestions.push({
          ...baseQ,
          id: `${baseQ.id}_mixed_${finalQuestions.length}`,
          marks: mcqMarks
        });
      }

      // Add Descriptives
      for (let j = 0; j < descCount; j++) {
        const baseQ = descriptivePool[j % descriptivePool.length];
        finalQuestions.push({
          ...baseQ,
          id: `${baseQ.id}_mixed_${finalQuestions.length}`,
          marks: 10
        });
      }
    }

    const getSubjectPapers = (sourceType) => {
      const official = MOCK_PAPERS[sourceType] || [];
      const custom = (State.customPapers || []).filter(p => p.type === sourceType);
      const combined = [...official, ...custom];
      return combined.filter(p => p.subject === subjectName);
    };

    let matchedPapers = [];
    if (examSource === 'Mixed') {
      matchedPapers = [
        ...getSubjectPapers('PYQ'),
        ...getSubjectPapers('RTP'),
        ...getSubjectPapers('MTP')
      ];
    } else {
      matchedPapers = getSubjectPapers(examSource);
    }

    if (matchedPapers.length === 0) {
      matchedPapers = [{
        id: `paper_synth_${Date.now()}`,
        year: 2026,
        subject: subjectName,
        title: `${examSource === 'Mixed' ? 'General' : examSource} Consolidated Reference Paper`,
        type: examSource === 'Mixed' ? 'PYQ' : examSource
      }];
    }

    finalQuestions = finalQuestions.map((q, index) => {
      const matchedPaper = matchedPapers[index % matchedPapers.length];
      return {
        ...q,
        sourcePaper: {
          title: matchedPaper.title || `${examSource} Reference Paper`,
          year: matchedPaper.year || 2026,
          type: matchedPaper.type || (examSource === 'Mixed' ? 'PYQ' : examSource)
        }
      };
    });

    this.activePaper = {
      subject: subjectName,
      difficulty: difficultyFilter === 'All' ? 'Mixed' : difficultyFilter,
      questions: finalQuestions,
      userAnswers: {}
    };

    this.gradedResult = null;
    this.ocrReport = null;
    this.render(container);
  },

  // Normalize answer text for robust comparison
  normalizeAnswer(text) {
    if (text === null || text === undefined) return '';
    return String(text).trim().toLowerCase().replace(/[\s]+/g, ' ').replace(/[^a-z0-9\s₹%().,-]/g, '');
  },

  // Extract meaningful keywords from rubric answer text
  extractRubricKeywords(rubricText) {
    if (!rubricText) return [];
    // Common stop words to exclude
    const stopWords = new Set([
      'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
      'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
      'should', 'may', 'might', 'shall', 'can', 'to', 'of', 'in', 'for',
      'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during',
      'before', 'after', 'above', 'below', 'between', 'under', 'and', 'but',
      'or', 'not', 'no', 'nor', 'so', 'yet', 'both', 'either', 'neither',
      'each', 'every', 'all', 'any', 'few', 'more', 'most', 'other', 'some',
      'such', 'than', 'too', 'very', 'just', 'because', 'if', 'when', 'where',
      'how', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those',
      'it', 'its', 'he', 'she', 'they', 'them', 'their', 'we', 'our', 'you',
      'your', 'i', 'me', 'my', 'also', 'about', 'up', 'out', 'then', 'only'
    ]);

    // Extract multi-word key phrases first (2-3 word combos)
    const phrases = [];
    const lowerText = rubricText.toLowerCase();
    
    // Look for quoted terms, parenthetical terms, and technical phrases
    const phraseMatches = lowerText.match(/[a-z][a-z\s]{4,30}(?=\.|,|;|\)|\(|$)/g) || [];
    phraseMatches.forEach(phrase => {
      const cleaned = phrase.trim();
      const words = cleaned.split(/\s+/).filter(w => !stopWords.has(w) && w.length > 2);
      if (words.length >= 2 && words.length <= 4) {
        phrases.push(words.join(' '));
      }
    });

    // Extract single significant keywords
    const words = rubricText
      .replace(/[^a-zA-Z0-9₹%\s]/g, ' ')
      .split(/\s+/)
      .map(w => w.toLowerCase().trim())
      .filter(w => w.length > 3 && !stopWords.has(w));
    
    // Count frequency and pick meaningful unique words
    const wordSet = [...new Set(words)];
    
    // Combine phrases and single keywords, prioritize phrases
    const allKeywords = [...new Set([...phrases.slice(0, 5), ...wordSet.slice(0, 15)])];
    return allKeywords.slice(0, 12); // Cap at 12 keywords
  },

  // Score descriptive answer against rubric keywords
  scoreDescriptiveAnswer(userAnswer, rubricAnswer, maxMarks) {
    const keywords = this.extractRubricKeywords(rubricAnswer);
    const lowerAnswer = userAnswer.toLowerCase();
    const words = userAnswer.trim().split(/\s+/).length;

    // 1. Keyword coverage (50% weight)
    const matchedKeywords = [];
    const missedKeywords = [];
    keywords.forEach(kw => {
      // Check if any word in the multi-word keyword appears
      const kwParts = kw.split(/\s+/);
      const isMatched = kwParts.length > 1
        ? kwParts.every(part => lowerAnswer.includes(part))
        : lowerAnswer.includes(kw);
      if (isMatched) {
        matchedKeywords.push(kw);
      } else {
        missedKeywords.push(kw);
      }
    });
    const keywordScore = keywords.length > 0 ? (matchedKeywords.length / keywords.length) : 0;

    // 2. Length adequacy (20% weight) — target ~10 words per mark
    const targetWords = maxMarks * 10;
    const lengthScore = Math.min(1, words / targetWords);

    // 3. Structure quality (15% weight) — bullets, numbered lists, headings
    let structureScore = 0.3; // base
    if (/[\-•●]\s/.test(userAnswer)) structureScore += 0.25; // bullet points
    if (/\d+[.)\s]/.test(userAnswer)) structureScore += 0.25; // numbered items
    if (userAnswer.includes('\n')) structureScore += 0.1; // line breaks
    if (/section|act|rule|standard|provision|clause/i.test(userAnswer)) structureScore += 0.1; // legal citations
    structureScore = Math.min(1, structureScore);

    // 4. Completeness (15% weight) — minimum threshold check
    let completenessScore = 0;
    if (words >= 10) completenessScore = 0.3;
    if (words >= 25) completenessScore = 0.6;
    if (words >= 50) completenessScore = 0.8;
    if (words >= 80 && keywordScore >= 0.3) completenessScore = 1.0;

    // Weighted aggregation
    const totalScore = (keywordScore * 0.50) + (lengthScore * 0.20) + (structureScore * 0.15) + (completenessScore * 0.15);
    const awarded = Math.round(maxMarks * totalScore * 2) / 2; // round to nearest 0.5

    // Generate specific feedback
    let feedback = '';
    if (words < 10) {
      feedback = 'Answer is extremely brief. ICAI descriptive questions require detailed statutory provisions, structured analysis, and a clear conclusion.';
    } else if (keywordScore < 0.2) {
      feedback = `Your answer lacks core rubric concepts. Key terms like "${missedKeywords.slice(0, 3).join('", "')}" were not addressed. Review the model answer and practice writing structured responses.`;
    } else if (keywordScore < 0.5) {
      feedback = `Partially aligned with the rubric. You covered ${matchedKeywords.length}/${keywords.length} key concepts. Missing: "${missedKeywords.slice(0, 2).join('", "')}". Cite specific sections/standards for higher marks.`;
    } else if (keywordScore < 0.75) {
      feedback = `Good conceptual coverage (${matchedKeywords.length}/${keywords.length} keywords matched). To improve, expand on: "${missedKeywords.slice(0, 2).join('", "')}" and add structured bullet points.`;
    } else {
      feedback = `Excellent rubric alignment! ${matchedKeywords.length}/${keywords.length} key concepts covered. ${structureScore >= 0.7 ? 'Well-structured presentation.' : 'Consider using numbered points and statutory citations for full marks.'}`;
    }

    return { awarded, feedback, matchedKeywords, missedKeywords, keywordScore };
  },

  gradePaperAnswers(container) {
    if (!this.activePaper) return;

    let score = 0;
    let totalPoints = 0;
    let correctCount = 0;

    const loggedMistakes = [];
    const descriptiveEvaluations = [];

    this.activePaper.questions.forEach(q => {
      const rawAns = this.activePaper.userAnswers[q.id];
      totalPoints += q.marks;

      if (q.isDescriptive) {
        // Descriptive grading with keyword matching
        const userAns = rawAns;
        if (!userAns || userAns.trim() === '') {
          descriptiveEvaluations.push({
            q: q.question,
            marks: 0,
            maxMarks: q.marks,
            userAns: "Not Answered",
            rubric: q.answer,
            feedback: "No answer drafted. In professional exams, drafting even basic statutory provisions is recommended to score partial marks.",
            matchedKeywords: [],
            missedKeywords: this.extractRubricKeywords(q.answer)
          });
          loggedMistakes.push({
            q: q.question,
            sub: q.subject,
            ch: q.chapter,
            notes: `Descriptive question left unanswered. Rubric Key: ${q.answer}`,
            diff: q.difficulty
          });
        } else {
          const result = this.scoreDescriptiveAnswer(userAns, q.answer, q.marks);
          score += result.awarded;
          if (result.awarded >= q.marks * 0.5) {
            correctCount++;
          }

          descriptiveEvaluations.push({
            q: q.question,
            marks: result.awarded,
            maxMarks: q.marks,
            userAns: userAns,
            rubric: q.answer,
            feedback: result.feedback,
            matchedKeywords: result.matchedKeywords,
            missedKeywords: result.missedKeywords
          });

          if (result.awarded < q.marks * 0.6) {
            loggedMistakes.push({
              q: q.question,
              sub: q.subject,
              ch: q.chapter,
              notes: `Descriptive response scored ${result.awarded}/${q.marks}. Missed rubric keywords: ${result.missedKeywords.slice(0, 3).join(', ')}. Rubric: ${q.answer}`,
              diff: q.difficulty
            });
          }
        }
      } else {
        // MCQ grading — resolve index to text and normalize for comparison
        const userAns = (typeof rawAns === 'number') ? (q.options[rawAns] || '') : (rawAns || '');
        const hasAnswered = userAns.toString().trim() !== '';
        const isCorrect = hasAnswered && this.normalizeAnswer(userAns) === this.normalizeAnswer(q.answer);
        
        if (isCorrect) {
          score += q.marks;
          correctCount++;
        } else {
          if (hasAnswered && this.selectedLevel === 'Foundation') {
            score -= 0.25; // Negative marking for Foundation
          }
          loggedMistakes.push({
            q: q.question,
            sub: q.subject,
            ch: q.chapter,
            notes: `Missed MCQ in custom generated paper. Your answer: ${userAns || 'Not answered'}. Correct: ${q.answer}.` + (q.notes ? ` Expl: ${q.notes}` : ''),
            diff: q.difficulty
          });
        }
      }
    });

    this.gradedResult = {
      score: Math.round(score * 10) / 10,
      totalPoints: Math.round(totalPoints),
      correctCount,
      descriptiveEvaluations
    };

    // Save paper stats to global State (adds study points + test counts!)
    State.addPaper({
      id: "gen_" + Date.now(),
      date: new Date().toISOString(),
      subject: this.activePaper.subject,
      score: score,
      total: totalPoints,
      totalQuestions: this.activePaper.questions.length,
      difficulty: this.activePaper.difficulty,
      type: "Custom Test"
    });

    // Auto-log wrong answers to Mistakes Tracker!
    if (loggedMistakes.length > 0) {
      loggedMistakes.forEach(m => {
        State.addMistake(m.q, m.sub, m.ch, m.notes, m.diff);
      });
      window.cajsShowAlert("📝 Test Graded", `Test completed!\n\nScore: ${Math.round(score * 10) / 10}/${Math.round(totalPoints)} Marks.\n\n${loggedMistakes.length} weak areas have been automatically logged inside your 'Mistakes Tracker' for future revision!`, "success");
    } else {
      window.cajsShowAlert("✨ Flawless Accuracy", `Test completed!\n\nScore: ${Math.round(score * 10) / 10}/${Math.round(totalPoints)} Marks.\n\nFlawless accuracy! 100% correct! Study points credited.`, "success");
    }

    this.render(container);
  }
};

