// CA JS Doubt Decoder AI Module — Powered by Gemini API
import { State } from '../state.js';
import { CONFIG } from '../config.js';

export const DoubtDecoderModule = {
  chatHistory: [],

  // Change this if a given model ID isn't available on your API key/tier.
  GEMINI_MODEL: 'gemini-3.6-flash',

  getApiKey() {
    const localKey = localStorage.getItem('cajs_gemini_api_key') || '';
    if (localKey) return localKey;
    if (CONFIG.GEMINI_API_KEY && CONFIG.GEMINI_API_KEY.trim() !== '') {
      return CONFIG.GEMINI_API_KEY.trim();
    }
    return '';
  },

  showApiKeyModal(container) {
    const modalId = 'cajs-decoder-gemini-key-modal';
    let modal = document.getElementById(modalId);
    if (modal) modal.remove();

    const currentKey = localStorage.getItem('cajs_gemini_api_key') || '';

    modal = document.createElement('div');
    modal.id = modalId;
    modal.style.cssText = `
      position:fixed; top:0; left:0; width:100%; height:100%;
      background:rgba(10,15,30,0.5); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px);
      display:flex; align-items:center; justify-content:center;
      z-index:10005; animation:fadeIn 0.25s ease-out; padding:20px; box-sizing:border-box;
    `;
    modal.innerHTML = `
      <div class="glass-card" style="width:100%; max-width:460px; padding:28px; border-radius:24px; box-shadow:0 20px 40px rgba(0,0,0,0.18); animation:scaleUp 0.3s cubic-bezier(0.34,1.56,0.64,1); background:rgba(255,255,255,0.95); border:1.5px solid rgba(255,255,255,0.5); text-align:left;">
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px; border-bottom:1px solid rgba(0,0,0,0.07); padding-bottom:12px;">
          <div style="width:40px; height:40px; border-radius:12px; background:linear-gradient(135deg,#4285F4,#34A853); display:flex; align-items:center; justify-content:center; color:white; font-size:20px; box-shadow:0 4px 12px rgba(66,133,244,0.3);">🔑</div>
          <div>
            <h3 style="font-size:17px; font-weight:800; margin:0; font-family:var(--font-display); color:var(--text-main);">Gemini AI Key Setup</h3>
            <p style="font-size:11px; color:var(--text-muted); margin:2px 0 0;">One-time setup for AI Doubt Decoder & Paper Generator</p>
          </div>
        </div>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:14px; line-height:1.5;">
          Get a free API key from <a href="https://aistudio.google.com/apikey" target="_blank" style="color:var(--pastel-purple-dark); font-weight:700;">Google AI Studio</a>. Keep your repo private so it doesn't get auto-revoked.
        </p>
        <div class="form-group" style="margin-bottom:16px;">
          <label class="form-label" style="font-size:11.5px; font-weight:700;">Gemini API Key</label>
          <input type="text" id="cajs-decoder-key-input" value="${currentKey}" placeholder="Paste your API key (AIza...)" style="width:100%; padding:10px 14px; border:1.5px solid rgba(0,0,0,0.1); border-radius:12px; font-size:13px; font-family:var(--font-body); box-sizing:border-box; background:rgba(0,0,0,0.02);">
        </div>
        <div style="display:flex; gap:10px;">
          <button id="cajs-decoder-key-cancel" class="btn btn-secondary" style="flex:1; font-size:12px; padding:10px;">Cancel</button>
          <button id="cajs-decoder-key-save" class="btn btn-primary" style="flex:2; font-size:12px; padding:10px; font-weight:700;">Save Key & Connect</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('#cajs-decoder-key-cancel').addEventListener('click', () => modal.remove());

    modal.querySelector('#cajs-decoder-key-save').addEventListener('click', () => {
      const key = modal.querySelector('#cajs-decoder-key-input').value.trim();
      if (!key) {
        modal.querySelector('#cajs-decoder-key-input').style.borderColor = '#f87171';
        return;
      }
      localStorage.setItem('cajs_gemini_api_key', key);
      modal.remove();
      if (window.cajsShowAlert) window.cajsShowAlert("✨ API Key Saved", "Gemini AI key updated successfully! Ask your doubt again.", "success");
      if (container) this.render(container);
    });

    modal.querySelector('#cajs-decoder-key-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') modal.querySelector('#cajs-decoder-key-save').click();
    });
  },

  render(container) {
    window.cajsShowDoubtDecoderKeyModal = () => this.showApiKeyModal(container);

    if (this.chatHistory.length === 0) {
      this.chatHistory.push({
        sender: 'ai',
        text: `### 🎓 Welcome to the CA-JS Doubt Decoder!

I am your personal AI Study Mentor powered by Gemini AI. Ask me anything related to your **CA ${State.user?.examLevel || 'Intermediate'} syllabus**.

**Examples:**
*   What is income tax?
*   Explain AS-2 Valuation of Inventories.
*   How does GST Input Tax Credit work?
*   What are the rights of an Unpaid Seller?
*   Explain depreciation under Companies Act 2013.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }

    const messagesHtml = this.chatHistory.map(msg => `
      <div class="chat-bubble ${msg.sender}">
        ${this.parseMarkdown(msg.text)}
        <span style="font-size:9px;opacity:0.6;display:block;text-align:right;margin-top:6px;">
          ${msg.timestamp}
        </span>
      </div>
    `).join('');

    container.innerHTML = `
      <header class="app-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <div class="header-title-container">
          <h1 class="header-branding">Doubt Decoder</h1>
          <span class="header-subtitle">24/7 AI-powered study mentor trained on CA exam study databases</span>
        </div>
      </header>

      <div class="chat-container">
        <div class="chat-header">
          <div class="chat-avatar">AI</div>
          <div>
            <h4 style="font-size:14px;font-weight:600;">CA-JS doubt decoder</h4>
            <span style="font-size:11px;color:var(--pastel-green-dark);font-weight:500;">● Online & ready to assist</span>
          </div>
        </div>

        <div class="chat-messages" id="chat-messages-box">
          ${messagesHtml}
        </div>

        <form id="chat-input-form" class="chat-input-bar">
          <input type="text" class="chat-input" id="chat-input-field"
            placeholder="Ask a doubt (e.g. What is income tax?)..."
            required autocomplete="off">
          <button type="submit" class="btn btn-primary" style="padding:12px 20px;">Send</button>
        </form>
      </div>
    `;

    this.scrollToBottom();

    const chatForm = container.querySelector('#chat-input-form');
    const chatInput = container.querySelector('#chat-input-field');
    const messagesBox = container.querySelector('#chat-messages-box');

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const queryText = chatInput.value.trim();
      if (!queryText) return;

      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.chatHistory.push({ sender: 'user', text: queryText, timestamp: timeStr });

      chatInput.value = '';
      this.renderStream(messagesBox);
      this.showTypingIndicator(messagesBox);

      this.generateAIResponse(queryText, messagesBox, container);
    });
  },

  renderStream(box) {
    box.innerHTML = this.chatHistory.map(msg => `
      <div class="chat-bubble ${msg.sender}">
        ${this.parseMarkdown(msg.text)}
        <span style="font-size:9px;opacity:0.6;display:block;text-align:right;margin-top:6px;">
          ${msg.timestamp}
        </span>
      </div>
    `).join('');
    this.scrollToBottom();
  },

  showTypingIndicator(box) {
    const indicator = document.createElement('div');
    indicator.id = 'chat-typing-indicator';
    indicator.className = 'typing-indicator';
    indicator.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    box.appendChild(indicator);
    this.scrollToBottom();
  },

  async generateAIResponse(queryText, box, container) {
    const replyText = await this.askGemini(queryText, container);
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) indicator.remove();

    State.addPoints(5);

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.chatHistory.push({ sender: 'ai', text: replyText, timestamp: timeStr });
    this.renderStream(box);
  },

  async askGemini(queryText, container) {
    let apiKey = this.getApiKey();

    if (!apiKey) {
      setTimeout(() => this.showApiKeyModal(container), 400);
      return `### 🔑 Gemini API Key Required\n\nPlease enter a free Gemini API key to enable live AI responses.\n\n<button class="btn btn-primary" style="padding:6px 14px; font-size:11px; margin-top:8px;" onclick="window.cajsShowDoubtDecoderKeyModal()">🔑 Enter Free Gemini API Key</button>`;
    }

    const prompt = `You are an expert CA (Chartered Accountancy) study mentor for ICAI ${State.user?.examLevel || 'Intermediate'} level students in India.

Answer the following question clearly and accurately using proper accounting, law, and tax terminology.

Format your response with:
- Clear headings using ###
- Bullet points for key concepts
- Relevant section numbers and act references
- A practical exam tip at the end

Question: ${queryText}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.GEMINI_MODEL}:generateContent?key=${apiKey}`;
    const requestBody = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 4096,
        thinkingConfig: { thinkingBudget: 0 }
      }
    };

    const maxRetries = 3;
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          const status = response.status;

          if (status === 400 || status === 403) {
            setTimeout(() => this.showApiKeyModal(container), 400);
            return `### ⚠️ Gemini API Key Invalid or Restricted\n\nThe current API key was rejected (HTTP ${status}: ${errData?.error?.message || 'unknown reason'}). Please update your key.\n\n<button class="btn btn-primary" style="padding:6px 14px; font-size:11px; margin-top:8px;" onclick="window.cajsShowDoubtDecoderKeyModal()">🔑 Update Gemini API Key</button>`;
          }

          // 503 (overloaded) and 429 (rate limited) are transient — retry with backoff
          if ((status === 503 || status === 429) && attempt < maxRetries) {
            const delayMs = 800 * attempt; // 800ms, 1600ms, ...
            await new Promise(res => setTimeout(res, delayMs));
            lastError = new Error(`API error ${status}: ${errData?.error?.message || 'temporarily overloaded'}`);
            continue; // try again
          }

          throw new Error(`API error ${status}: ${errData?.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        const candidate = data.candidates?.[0];
        const answerText = candidate?.content?.parts?.[0]?.text || '';

        if (!answerText) throw new Error('Empty response from AI. The model may have blocked the response (safety settings) or the model name may be invalid.');

        const truncatedNote = candidate?.finishReason === 'MAX_TOKENS'
          ? `\n\n⚠️ *This answer was cut off (hit the token limit). Ask "continue" to get the rest, or ask a narrower question.*`
          : '';

        return `### 🤖 AI Mentor Answer\n\n${answerText}${truncatedNote}\n\n---\n*✨ Generated live by CA TUTOR JS AI Mentor.*`;

      } catch (err) {
        lastError = err;
        // Non-HTTP errors (network issues etc.) — don't retry, fail fast
        if (!err.message.startsWith('API error')) break;
      }
    }

    console.error('Gemini AI failed after retries:', lastError);
    return `### ⚠️ Couldn't reach the AI Mentor\n\n${lastError?.message || 'Unknown error'}\n\nGemini's servers may be temporarily overloaded — this usually clears up within a minute. Please try asking again.`;
  },

  scrollToBottom() {
    const box = document.getElementById('chat-messages-box');
    if (box) box.scrollTop = box.scrollHeight;
  },

  parseMarkdown(text) {
    let html = text;
    html = html.replace(/^### (.*$)/gim, '<h3 class="header-branding" style="font-size:16px;margin-bottom:8px;">$1</h3>');
    html = html.replace(/^#### (.*$)/gim, '<h4 style="font-size:14px;font-weight:bold;margin-bottom:6px;">$1</h4>');
    html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:var(--pastel-purple-dark);font-weight:600;text-decoration:underline;">$1</a>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/^[\*\-] (.*$)/gim, '<li style="margin-left:15px;font-size:13px;margin-bottom:4px;">$1</li>');
    html = html.replace(/^\d+\. (.*$)/gim, '<li style="margin-left:15px;font-size:13px;margin-bottom:4px;list-style-type:decimal;">$1</li>');
    html = html.split('\n\n').map(p => {
      if (p.trim().startsWith('<li') || p.trim().startsWith('<h') || p.trim().startsWith('<button')) return p;
      return `<p style="margin-bottom:8px;font-size:13px;line-height:1.55;">${p}</p>`;
    }).join('');
    return html;
  }
};