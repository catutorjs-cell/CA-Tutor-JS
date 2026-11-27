// CA JS Answer Evaluator — Tesseract OCR + Fuse.js Rubric Grading Engine (No API Key Required)
// Handles: PDF→Image, Preprocessing, Tesseract OCR, Question Splitting, Fuse.js Rubric Grading

import Fuse from '../vendor/fuse.mjs';
import { State } from '../state.js';
import { SYLLABUS_DATA } from '../seedData.js';

const RUBRIC_STOP_WORDS = new Set([
  'about', 'after', 'also', 'been', 'being', 'between', 'both', 'could', 'does', 'each',
  'from', 'have', 'into', 'more', 'most', 'only', 'other', 'same', 'should', 'such',
  'than', 'that', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those',
  'through', 'under', 'very', 'were', 'what', 'when', 'where', 'which', 'while', 'with', 'would'
]);

export const Evaluator = {

  // ──────────────────────────────────────────────
  // 1. PDF → IMAGE CONVERSION
  // ──────────────────────────────────────────────

  async pdfToImages(file, onProgress) {
    const arrayBuffer = await file.arrayBuffer();

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
  // 2. IMAGE PREPROCESSING
  // ──────────────────────────────────────────────

  preprocessImage(canvas) {
    const ctx = canvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }

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
  // 3. OCR TEXT EXTRACTION (TESSERACT.JS)
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
        logger: () => {}
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
  // 4. QUESTION-WISE ANSWER SPLITTING
  // ──────────────────────────────────────────────

  splitAnswers(fullText) {
    const cleanText = String(fullText || '').replace(/---\s*PAGE BREAK\s*---/g, '\n').trim();
    if (!cleanText) return [];

    const patterns = [
      /(?:^|\n)\s*Q\.?\s*(\d+)\s*[\.\)\:]?\s*/gi,
      /(?:^|\n)\s*Question\s+(\d+)\s*[\.\)\:]?\s*/gi,
      /(?:^|\n)\s*Ans(?:wer)?\.?\s*(\d+)\s*[\.\)\:]?\s*/gi,
      /(?:^|\n)\s*(\d{1,2})\s*[\.\)]\s+/g
    ];

    let bestSplit = null;
    let maxQuestions = 0;

    for (const pattern of patterns) {
      const splits = [];
      let match;
      const positions = [];
      pattern.lastIndex = 0;

      while ((match = pattern.exec(cleanText)) !== null) {
        const qNum = match[1];
        if (parseInt(qNum, 10) > 30) continue;
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
          splits.push({
            question_number: positions[i].qNum,
            answer_text: cleanText.substring(start, end).trim()
          });
        }
        bestSplit = splits;
      }
    }

    if (!bestSplit || bestSplit.length === 0) {
      const paragraphs = cleanText.split(/\n\s*\n/).filter(p => p.trim().length > 20);
      bestSplit = (paragraphs.length > 0 ? paragraphs : [cleanText]).map((p, i) => ({
        question_number: String(i + 1),
        answer_text: p.trim()
      }));
    }

    return bestSplit;
  },

  // ──────────────────────────────────────────────
  // 5. FUSE.JS RUBRIC BUILDING & GRADING
  // ──────────────────────────────────────────────

  buildRubricDocs(paper, saText = '') {
    const level = State.user?.examLevel || paper?.level || 'Intermediate';
    const subjects = SYLLABUS_DATA[level] || [];
    const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const targetSub = norm(paper?.subject);
    const subjectData = subjects.find(s => norm(s.subject) === targetSub) || subjects[0];

    const docs = [];

    if (subjectData) {
      (subjectData.chapters || []).forEach(ch => {
        const cleanNotes = String(ch.notes || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        const illusText = (ch.illustrations || []).map(ill => `${ill.q} ${ill.a}`).join(' ');
        const combined = `${cleanNotes} ${illusText}`.trim();
        docs.push({
          title: ch.name,
          text: combined || ch.name,
          keywords: `${subjectData.subject} ${ch.name} ${cleanNotes}`,
          modelAnswer: (ch.illustrations?.[0]?.a || cleanNotes || ch.name).slice(0, 260)
        });
      });
    }

    if (saText && saText.trim().length > 30) {
      const saChunks = this.splitAnswers(saText);
      saChunks.forEach(chunk => {
        docs.push({
          title: `Suggested Answer Q${chunk.question_number}`,
          text: chunk.answer_text,
          keywords: chunk.answer_text.slice(0, 400),
          modelAnswer: chunk.answer_text.slice(0, 260)
        });
      });
    }

    if (docs.length === 0) {
      docs.push({
        title: paper?.subject || 'General CA Standards',
        text: 'Statutory provisions, accounting standards, working notes, calculation accuracy, conclusion.',
        keywords: 'section act provision working notes conclusion calculation journal entry',
        modelAnswer: 'Cite relevant sections/standards, show step-by-step workings, and state a clear conclusion.'
      });
    }

    return docs;
  },

  extractDistinctKeywords(text) {
    return [...new Set(
      String(text || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(w => w.length >= 4 && !RUBRIC_STOP_WORDS.has(w))
    )].slice(0, 18);
  },

  evaluateWithFuse(ocrResult, paper, saText = '') {
    const splits = this.splitAnswers(ocrResult.fullText);
    const rubricDocs = this.buildRubricDocs(paper, saText);
    const fuse = new Fuse(rubricDocs, {
      includeScore: true,
      ignoreLocation: true,
      threshold: 0.65,
      minMatchCharLength: 3,
      keys: [
        { name: 'text', weight: 0.5 },
        { name: 'keywords', weight: 0.3 },
        { name: 'title', weight: 0.2 }
      ]
    });

    const totalMax = 100;
    const perQuestionMax = splits.length > 0 ? Math.max(5, Math.round(totalMax / splits.length)) : totalMax;
    const evaluations = [];
    let totalScore = 0;

    splits.forEach((item, idx) => {
      const qMax = idx === splits.length - 1
        ? Math.max(5, totalMax - perQuestionMax * (splits.length - 1))
        : perQuestionMax;

      const ansText = (item.answer_text || '').trim();
      const snippet = ansText.slice(0, 80) + (ansText.length > 80 ? '...' : '');
      const words = ansText.split(/\s+/).filter(Boolean).length;
      const lowConfidence = ocrResult.avgConfidence < 35 || words < 3;

      if (lowConfidence) {
        evaluations.push({
          question_number: item.question_number,
          extracted_answer: snippet || '(unreadable)',
          score: 0,
          max_marks: qMax,
          reason: 'OCR confidence or extracted text length was too low to grade reliably.',
          correct_answer: rubricDocs[idx % rubricDocs.length]?.modelAnswer || 'Review ICAI suggested answer.',
          low_confidence: true
        });
        return;
      }

      const fuseHits = fuse.search(ansText.slice(0, 350), { limit: 1 });
      const bestMatch = fuseHits[0]?.item || rubricDocs[idx % rubricDocs.length];
      const fuseSimilarity = fuseHits[0] ? Math.max(0, 1 - (fuseHits[0].score ?? 0.6)) : 0.35;

      const expectedKeys = this.extractDistinctKeywords(`${bestMatch.title} ${bestMatch.text}`);
      const lowerAns = ansText.toLowerCase();
      const matchedKeys = expectedKeys.filter(k => lowerAns.includes(k));
      const kwRatio = expectedKeys.length > 0 ? matchedKeys.length / expectedKeys.length : 0.4;

      const lengthRatio = Math.min(1, words / Math.max(25, qMax * 7));
      const hasCitation = /\b(sec(?:tion)?|act|as\s*\d+|ind\s*as|sa\s*\d+|rule|schedule|working\s*note)\b/i.test(ansText) ? 1 : 0.3;

      const combinedRatio = Math.min(0.95, (fuseSimilarity * 0.35) + (kwRatio * 0.35) + (lengthRatio * 0.2) + (hasCitation * 0.1));
      const score = Math.round(qMax * combinedRatio * 2) / 2;

      totalScore += score;

      evaluations.push({
        question_number: item.question_number,
        extracted_answer: snippet,
        score,
        max_marks: qMax,
        reason: `Matched topic "${bestMatch.title}" via Fuse.js (${matchedKeys.length}/${expectedKeys.length} key concepts found, ${words} words extracted).`,
        correct_answer: bestMatch.modelAnswer,
        low_confidence: false
      });
    });

    if (evaluations.length === 0) {
      evaluations.push({
        question_number: '1',
        extracted_answer: '(no readable text extracted)',
        score: 0,
        max_marks: totalMax,
        reason: 'Could not extract readable answers from the uploaded file.',
        correct_answer: rubricDocs[0]?.modelAnswer || 'Please upload a clearer scan or PDF.',
        low_confidence: true
      });
    }

    totalScore = Math.round(totalScore * 2) / 2;
    const pct = Math.round((totalScore / totalMax) * 100);

    return {
      evaluations,
      total_score: totalScore,
      total_max: totalMax,
      overall_feedback: `Evaluated ${evaluations.length} answer(s) locally using Tesseract OCR (${ocrResult.avgConfidence}% confidence) and Fuse.js syllabus/rubric matching (${pct}% overall).`
    };
  },

  // ──────────────────────────────────────────────
  // 6. MAIN ORCHESTRATOR (ZERO API KEY NEEDED)
  // ──────────────────────────────────────────────

  async processAndGrade(file, paper, onProgress) {
    let canvases = [];
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    if (isPdf) {
      if (onProgress) onProgress('pdf', 'Converting PDF pages to images...');
      canvases = await this.pdfToImages(file, (msg) => {
        if (onProgress) onProgress('pdf', msg);
      });
    } else {
      if (onProgress) onProgress('pdf', 'Loading image...');
      const canvas = await this.imageFileToCanvas(file);
      canvases = [canvas];
    }

    if (canvases.length === 0) throw new Error('No pages found in the uploaded file.');

    if (onProgress) onProgress('preprocess', 'Preprocessing answer sheet images...');

    if (onProgress) onProgress('ocr', 'Running Tesseract OCR on answer sheet...');
    const ocrResult = await this.extractText(canvases, (msg) => {
      if (onProgress) onProgress('ocr', msg);
    });

    if (onProgress) onProgress('split', 'Splitting answers question-wise...');

    let saText = '';
    if (paper.suggestedAnswerUrl) {
      if (onProgress) onProgress('grade', 'Reading suggested answer PDF for rubric...');
      saText = await this.extractTextFromPdfUrl(paper.suggestedAnswerUrl);
    }

    if (onProgress) onProgress('grade', 'Grading with Fuse.js syllabus rubric...');
    const evaluation = this.evaluateWithFuse(ocrResult, paper, saText);

    evaluation.ocrConfidence = ocrResult.avgConfidence;
    evaluation.totalPages = canvases.length;
    evaluation.questionsDetected = evaluation.evaluations.length;
    evaluation.paperId = paper.id;
    evaluation.paperTitle = paper.title;
    evaluation.subject = paper.subject;
    evaluation.date = new Date().toISOString();

    return evaluation;
  },

  // ──────────────────────────────────────────────
  // UTILITY: Image file → Canvas & PDF text
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
