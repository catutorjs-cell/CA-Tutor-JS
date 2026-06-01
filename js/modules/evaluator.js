// CA JS Answer Evaluator — OCR + AI Grading Engine
// Handles: PDF→Image, Preprocessing, Tesseract OCR, Question Splitting, Gemini AI Grading

import { State } from '../state.js';
import { SYLLABUS_DATA } from '../seedData.js';

const GEMINI_STORAGE_KEY = 'cajs_gemini_api_key';

// If you want all your users to share a master key (so they are not prompted),
// paste your Gemini API key inside the quotes below:
const DEFAULT_GEMINI_API_KEY = 'AQ.Ab8RN6JkiTQZ75EmMJqTL6gLI2xo4PEY2XTE3NO__FUnUxmiYA';

export const Evaluator = {

  // ──────────────────────────────────────────────
  // 1. API KEY MANAGEMENT
  // ──────────────────────────────────────────────

  getApiKey() {
    if (DEFAULT_GEMINI_API_KEY && DEFAULT_GEMINI_API_KEY.trim() !== '') {
      return DEFAULT_GEMINI_API_KEY.trim();
    }
    return localStorage.getItem(GEMINI_STORAGE_KEY) || '';
  },

  setApiKey(key) {
    localStorage.setItem(GEMINI_STORAGE_KEY, key);
  },

  showApiKeyModal() {
    return new Promise((resolve) => {
      const existing = this.getApiKey();
      if (existing) { resolve(existing); return; }

      const modalId = 'cajs-gemini-key-modal';
      let modal = document.getElementById(modalId);
      if (modal) modal.remove();

      modal = document.createElement('div');
      modal.id = modalId;
      modal.style.cssText = `
        position:fixed; top:0; left:0; width:100%; height:100%;
        background:rgba(0,0,0,0.45); backdrop-filter:blur(14px);
        display:flex; align-items:center; justify-content:center;
        z-index:10001; animation:fadeIn 0.25s ease-out;
      `;
      modal.innerHTML = `
        <div class="glass-card" style="width:100%; max-width:440px; padding:28px; border-radius:24px; box-shadow:0 20px 40px rgba(0,0,0,0.15); animation:scaleUp 0.3s cubic-bezier(0.34,1.56,0.64,1); background:rgba(255,255,255,0.92); border:1px solid rgba(255,255,255,0.4);">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px; border-bottom:1px solid rgba(0,0,0,0.06); padding-bottom:12px;">
            <div style="width:36px; height:36px; border-radius:12px; background:linear-gradient(135deg,#7c3aed,#3b82f6); display:flex; align-items:center; justify-content:center; color:white; font-size:18px;">🔑</div>
            <div>
              <h3 style="font-size:16px; font-weight:700; margin:0; font-family:var(--font-display);">Gemini API Key Required</h3>
              <p style="font-size:11px; color:var(--text-muted); margin:2px 0 0;">One-time setup for AI-powered answer grading</p>
            </div>
          </div>
          <p style="font-size:12px; color:var(--text-muted); margin-bottom:14px; line-height:1.5;">
            Get a free API key from <a href="https://aistudio.google.com/apikey" target="_blank" style="color:var(--pastel-purple-dark); font-weight:600;">Google AI Studio</a>. Your key is stored locally in your browser and never sent to any third party.
          </p>
          <input type="text" id="cajs-gemini-key-input" placeholder="Paste your Gemini API key here..." style="width:100%; padding:10px 14px; border:1.5px solid rgba(0,0,0,0.1); border-radius:12px; font-size:13px; font-family:var(--font-body); box-sizing:border-box; margin-bottom:14px; background:rgba(0,0,0,0.02);">
          <div style="display:flex; gap:10px;">
            <button id="cajs-key-cancel" class="btn btn-secondary" style="flex:1; font-size:12px; padding:10px;">Cancel</button>
            <button id="cajs-key-save" class="btn btn-primary" style="flex:2; font-size:12px; padding:10px;">Save & Continue</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.querySelector('#cajs-key-cancel').addEventListener('click', () => {
        modal.remove();
        resolve(null);
      });

      modal.querySelector('#cajs-key-save').addEventListener('click', () => {
        const key = modal.querySelector('#cajs-gemini-key-input').value.trim();
        if (!key) {
          modal.querySelector('#cajs-gemini-key-input').style.borderColor = '#f87171';
          return;
        }
        this.setApiKey(key);
        modal.remove();
        resolve(key);
      });

      modal.querySelector('#cajs-gemini-key-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') modal.querySelector('#cajs-key-save').click();
      });
    });
  },

  // ──────────────────────────────────────────────
  // 2. PDF → IMAGE CONVERSION
  // ──────────────────────────────────────────────

  async pdfToImages(file, onProgress) {
    const arrayBuffer = await file.arrayBuffer();

    // pdf.js is loaded via CDN as a global
    const pdfjsLib = window.pdfjsLib;
    if (!pdfjsLib) throw new Error('pdf.js library not loaded. Please check your internet connection.');

    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const totalPages = pdf.numPages;
    const images = [];

    for (let i = 1; i <= totalPages; i++) {
      if (onProgress) onProgress(`Converting page ${i}/${totalPages}...`);

      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2.0 }); // High-res for OCR
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;
      images.push(canvas);
    }

    return images;
  },

  // ──────────────────────────────────────────────
  // 3. IMAGE PREPROCESSING
  // ──────────────────────────────────────────────

  preprocessImage(canvas) {
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Step 1: Grayscale conversion
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }

    // Step 2: Contrast enhancement (adaptive stretch)
    let min = 255, max = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] < min) min = data[i];
      if (data[i] > max) max = data[i];
    }
    const range = max - min || 1;
    for (let i = 0; i < data.length; i += 4) {
      const stretched = ((data[i] - min) / range) * 255;
      const val = Math.min(255, Math.max(0, stretched));
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
    }

    // Step 3: Simple noise reduction (threshold-based denoising)
    // Pixels very close to white get pushed to white, very dark get pushed to black
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] > 200) {
        data[i] = 255; data[i + 1] = 255; data[i + 2] = 255;
      } else if (data[i] < 60) {
        data[i] = 0; data[i + 1] = 0; data[i + 2] = 0;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    return canvas;
  },

  // ──────────────────────────────────────────────
  // 4. OCR TEXT EXTRACTION (TESSERACT.JS)
  // ──────────────────────────────────────────────

  async extractText(canvases, onProgress) {
    const Tesseract = window.Tesseract;
    if (!Tesseract) throw new Error('Tesseract.js library not loaded. Please check your internet connection.');

    let fullText = '';
    let totalConfidence = 0;
    const pageResults = [];

    for (let i = 0; i < canvases.length; i++) {
      if (onProgress) onProgress(`OCR processing page ${i + 1}/${canvases.length}...`);

      const preprocessed = this.preprocessImage(canvases[i]);

      const result = await Tesseract.recognize(preprocessed, 'eng', {
        logger: () => {} // Suppress verbose logging
      });

      const pageText = result.data.text || '';
      const pageConf = result.data.confidence || 0;

      pageResults.push({
        page: i + 1,
        text: pageText,
        confidence: pageConf
      });

      fullText += pageText + '\n\n--- PAGE BREAK ---\n\n';
      totalConfidence += pageConf;
    }

    const avgConfidence = canvases.length > 0 ? totalConfidence / canvases.length : 0;

    return {
      fullText: fullText.trim(),
      avgConfidence: Math.round(avgConfidence),
      pageResults
    };
  },

  // ──────────────────────────────────────────────
  // 5. QUESTION-WISE ANSWER SPLITTING
  // ──────────────────────────────────────────────

  splitAnswers(fullText) {
    // Remove page break markers for splitting
    const cleanText = fullText.replace(/---\s*PAGE BREAK\s*---/g, '\n');

    // Try multiple question patterns
    const patterns = [
      // Q1. / Q.1 / Q1) / Q 1. / Q. 1.
      /(?:^|\n)\s*Q\.?\s*(\d+)\s*[\.\)\:]?\s*/gi,
      // Question 1 / Question 1. / Question 1:
      /(?:^|\n)\s*Question\s+(\d+)\s*[\.\)\:]?\s*/gi,
      // Ans 1 / Answer 1 / Ans. 1
      /(?:^|\n)\s*Ans(?:wer)?\.?\s*(\d+)\s*[\.\)\:]?\s*/gi,
      // Standalone number: 1. / 1) at line start (only if number ≤ 30)
      /(?:^|\n)\s*(\d{1,2})\s*[\.\)]\s+/g
    ];

    let bestSplit = null;
    let maxQuestions = 0;

    for (const pattern of patterns) {
      const splits = [];
      let match;
      const positions = [];

      // Reset regex
      pattern.lastIndex = 0;

      while ((match = pattern.exec(cleanText)) !== null) {
        const qNum = match[1];
        if (parseInt(qNum) > 30) continue; // Skip unrealistic question numbers
        positions.push({
          qNum,
          index: match.index,
          matchLength: match[0].length
        });
      }

      if (positions.length > maxQuestions) {
        maxQuestions = positions.length;

        for (let i = 0; i < positions.length; i++) {
          const start = positions[i].index + positions[i].matchLength;
          const end = i + 1 < positions.length ? positions[i + 1].index : cleanText.length;
          const answerText = cleanText.substring(start, end).trim();

          splits.push({
            question_number: positions[i].qNum,
            answer_text: answerText
          });
        }

        bestSplit = splits;
      }
    }

    // Fallback: split by double newlines into paragraphs
    if (!bestSplit || bestSplit.length === 0) {
      const paragraphs = cleanText.split(/\n\s*\n/).filter(p => p.trim().length > 20);
      bestSplit = paragraphs.map((p, i) => ({
        question_number: String(i + 1),
        answer_text: p.trim()
      }));
    }

    return bestSplit;
  },

  // ──────────────────────────────────────────────
  // 6. BUILD MODEL ANSWER CONTEXT
  // ──────────────────────────────────────────────

  getModelAnswerContext(paper) {
    const level = State.user.examLevel;
    const subjects = SYLLABUS_DATA[level] || [];

    let context = '';

    // Find matching subject
    const subjectData = subjects.find(s => s.subject === paper.subject);
    if (subjectData) {
      context += `**Subject: ${subjectData.subject}**\n\n`;

      for (const ch of subjectData.chapters) {
        context += `### ${ch.name}\n`;
        context += `Weightage: ${ch.weightage}\n`;
        context += `Key Concepts: ${ch.notes}\n`;

        if (ch.illustrations && ch.illustrations.length > 0) {
          context += `\nModel Q&A Examples:\n`;
          for (const ill of ch.illustrations) {
            context += `- Q: ${ill.q}\n  A: ${ill.a}\n`;
          }
        }
        context += '\n';
      }
    }

    return context || 'No specific model answer available. Grade based on general CA exam standards and marking conventions.';
  },

  // ──────────────────────────────────────────────
  // 7. AI GRADING VIA GEMINI API
  // ──────────────────────────────────────────────

  async gradeWithAI(base64Images, paper, apiKey, onProgress, qpText = '', saText = '') {
    if (onProgress) onProgress('AI is evaluating your answers...');

    const modelContext = this.getModelAnswerContext(paper);

    const prompt = `You are a strict but fair CA (Chartered Accountancy) exam evaluator for the ICAI ${State.user.examLevel} level.
You have been provided with images of a student's handwritten answer sheet.

## Paper Information
- Paper: ${paper.title}
- Subject: ${paper.subject}
- Type: ${paper.type || 'PYQ'}
- Total Maximum Marks: 100

## Model Answer Reference & Marking Scheme
${modelContext}

${qpText ? `## Question Paper Content (for reference):\n${qpText}\n` : ''}
${saText ? `## Suggested Answer Content (for reference):\n${saText}\n` : ''}

## Evaluation Instructions
1. Read the student's handwritten answers directly from the provided images.
2. Identify which question each part corresponds to (the student will write things like Q1, Ans 1, etc.).
3. Grade each question answer STRICTLY based on CA exam standards.
4. Award PARTIAL MARKS where the student has partially correct concepts, workings, or conclusions.
5. For each question, provide a SHORT reason (1-2 sentences) explaining the score.
6. Extract a brief snippet of the student's answer (up to 80 chars) to show what you evaluated. If the handwriting is completely illegible, set "low_confidence" to true and give 0 marks.
7. Distribute marks realistically across questions (typical CA papers have questions worth 4-20 marks each).
8. If the student's answer is incorrect or partially incorrect, provide a brief summary of the correct answer in the "correct_answer" field.

## REQUIRED OUTPUT FORMAT (strict JSON only)
{
  "evaluations": [
    {
      "question_number": "1",
      "extracted_answer": "Brief snippet of what student wrote (max 80 chars)",
      "score": 0,
      "max_marks": 0,
      "reason": "Short explanation",
      "correct_answer": "Brief summary of the correct answer",
      "low_confidence": false
    }
  ],
  "total_score": 0,
  "total_max": 100,
  "overall_feedback": "2-3 sentence overall assessment"
}`;

    const imageParts = base64Images.map(base64 => ({
      inline_data: {
        mime_type: 'image/jpeg',
        data: base64
      }
    }));

    const contents = [{
      parts: [
        { text: prompt },
        ...imageParts
      ]
    }];

    const models = [
      'gemini-2.5-flash',
      'gemini-3.5-flash',
      'gemini-2.5-flash-lite',
      'gemini-3.1-flash-lite'
    ];
    let lastError = null;

    for (const model of models) {
      try {
        if (onProgress) onProgress(`AI is evaluating your answers using ${model}...`);
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: contents,
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 8192,
              responseMimeType: "application/json"
            }
          })
        });

        if (!response.ok) {
          const errBody = await response.text();
          if (response.status === 400 || response.status === 403) {
            // Invalid API key — clear it so user is prompted again
            localStorage.removeItem(GEMINI_STORAGE_KEY);
            throw new Error('Invalid or expired API key. Please try again with a valid Gemini API key.');
          }
          console.warn(`Gemini API error for model ${model}:`, errBody);
          lastError = new Error(`Gemini API error (${response.status}): ${errBody}`);
          continue;
        }

        const data = await response.json();

        // Extract text from Gemini response
        const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // Parse JSON — handle possible markdown fences
        let jsonStr = rawText.trim();
        if (jsonStr.startsWith('```')) {
          jsonStr = jsonStr.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
        }

        let evaluation;
        try {
          evaluation = JSON.parse(jsonStr);
        } catch (parseErr) {
          console.error(`Failed to parse Gemini response for model ${model}:`, rawText);
          lastError = new Error('AI returned an invalid response format. Please try again.');
          continue;
        }

        // Validate structure
        if (!evaluation.evaluations || !Array.isArray(evaluation.evaluations)) {
          lastError = new Error('AI response missing evaluations array.');
          continue;
        }

        return evaluation;
      } catch (err) {
        if (err.message.includes('Invalid or expired API key')) {
          throw err;
        }
        console.error(`Model ${model} failed:`, err);
        lastError = err;
      }
    }

    throw lastError || new Error('All AI models failed to evaluate the paper. Please try again.');
  },

  // ──────────────────────────────────────────────
  // 8. MAIN ORCHESTRATOR
  // ──────────────────────────────────────────────

  async processAndGrade(file, paper, onProgress) {
    // Step 1: Get API key
    const apiKey = await this.showApiKeyModal();
    if (!apiKey) throw new Error('API key is required for AI grading.');

    // Step 2: Convert to images
    let canvases = [];
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (isPdf) {
      if (onProgress) onProgress('step-pdf', 'Converting PDF pages to images...');
      canvases = await this.pdfToImages(file, (msg) => {
        if (onProgress) onProgress('step-pdf', msg);
      });
    } else {
      // Single image file
      if (onProgress) onProgress('step-pdf', 'Loading image...');
      const canvas = await this.imageFileToCanvas(file);
      canvases = [canvas];
    }

    if (canvases.length === 0) throw new Error('No pages found in the uploaded file.');

    // Step 3: Convert canvases to base64 images
    if (onProgress) onProgress('step-preprocess', 'Preparing images for AI vision...');
    const base64Images = canvases.map(c => c.toDataURL("image/jpeg", 0.8).split(',')[1]);

    // Step 5.5: Extract text from Question Paper and Suggested Answer PDFs if available
    let qpText = '';
    let saText = '';
    if (paper.pdfUrl) {
      if (onProgress) onProgress('step-grade', 'Extracting question paper text...');
      qpText = await this.extractTextFromPdfUrl(paper.pdfUrl);
    }
    if (paper.suggestedAnswerUrl) {
      if (onProgress) onProgress('step-grade', 'Extracting suggested answer text...');
      saText = await this.extractTextFromPdfUrl(paper.suggestedAnswerUrl);
    }

    // Step 6: AI grading
    if (onProgress) onProgress('step-grade', 'AI is reading and evaluating your handwriting...');
    const evaluation = await this.gradeWithAI(
      base64Images, paper, apiKey,
      (msg) => { if (onProgress) onProgress('step-grade', msg); },
      qpText, saText
    );

    // Attach metadata
    evaluation.ocrConfidence = 100; // Legacy UI support
    evaluation.totalPages = canvases.length;
    evaluation.questionsDetected = evaluation.evaluations ? evaluation.evaluations.length : 0;
    evaluation.paperId = paper.id;
    evaluation.paperTitle = paper.title;
    evaluation.subject = paper.subject;
    evaluation.date = new Date().toISOString();

    return evaluation;
  },

  // ──────────────────────────────────────────────
  // UTILITY: Image file → Canvas
  // ──────────────────────────────────────────────

  imageFileToCanvas(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          resolve(canvas);
        };
        img.onerror = () => reject(new Error('Failed to load image file.'));
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read file.'));
      reader.readAsDataURL(file);
    });
  },

  async extractTextFromPdfUrl(url) {
    try {
      const pdfjsLib = window.pdfjsLib;
      if (!pdfjsLib) return '';
      const loadingTask = pdfjsLib.getDocument(url);
      const pdf = await loadingTask.promise;
      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        text += textContent.items.map(item => item.str).join(' ') + '\n';
      }
      return text;
    } catch (err) {
      console.warn('Failed to extract text from PDF URL:', url, err);
      return '';
    }
  }
};
