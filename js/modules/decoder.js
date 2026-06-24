// CA JS Doubt Decoder AI Module — Powered by Groq AI
import { State } from '../state.js';
import { CONFIG } from '../config.js';

export const DoubtDecoderModule = {
  chatHistory: [],

  render(container) {
    if (this.chatHistory.length === 0) {
      this.chatHistory.push({
        sender: 'ai',
        text: `### 🎓 Welcome to the CA-JS Doubt Decoder!

I am your personal AI Study Mentor powered by Groq AI. Ask me anything related to your **CA ${State.user.examLevel} syllabus**.

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
      <header class="app-header">
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

      // Call Groq AI directly
      this.generateAIResponse(queryText, messagesBox);
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

  async generateAIResponse(queryText, box) {
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) indicator.remove();

    // ✅ Groq AI is the PRIMARY and ONLY response engine
    const replyText = await this.askGroq(queryText);
    State.addPoints(5);

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.chatHistory.push({ sender: 'ai', text: replyText, timestamp: timeStr });
    this.renderStream(box);
  },

  async askGroq(queryText) {
    const apiKey = CONFIG.GROQ_API_KEY;
    if (!apiKey) {
      return `### ❌ API Key Missing\n\nGroq API key not found in **config.js**. Please add your Groq API key.`;
    }

    const prompt = `You are an expert CA (Chartered Accountancy) study mentor for ICAI ${State.user?.examLevel || 'Intermediate'} level students in India.

Answer the following question clearly and accurately using proper accounting, law, and tax terminology.

Format your response with:
- Clear headings using ###
- Bullet points for key concepts
- Relevant section numbers and act references
- A practical exam tip at the end

Question: ${queryText}`;

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1024,
          temperature: 0.4,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          return `### ❌ Invalid API Key\n\nYour Groq API key is invalid or expired. Please update **GROQ_API_KEY** in config.js.`;
        }
        const errData = await response.json().catch(() => ({}));
        throw new Error(`API error ${response.status}: ${errData?.error?.message || 'Unknown error'}`);
      }

      const data = await response.json();
      const answerText = data.choices?.[0]?.message?.content || '';

      if (!answerText) throw new Error('Empty response from AI.');

      return `### 🤖 AI Mentor Answer\n\n${answerText}\n\n---\n*✨ Generated live by CA TUTOR JS AI Mentor.*`;

    } catch (err) {
      console.error('Groq AI failed:', err);
      return `### ⚠️ AI Temporarily Unavailable\n\nCould not reach the AI Mentor. Please check your internet connection and try again.\n\n*Error: ${err.message}*`;
    }
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
      if (p.trim().startsWith('<li') || p.trim().startsWith('<h')) return p;
      return `<p style="margin-bottom:8px;font-size:13px;line-height:1.55;">${p}</p>`;
    }).join('');
    return html;
  }
};