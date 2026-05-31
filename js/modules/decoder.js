// CA JS Doubt Decoder AI Module
import { State } from '../state.js';
import { AI_CHAT_REPLIES, SYLLABUS_DATA, MOCK_QUESTIONS } from '../seedData.js';

export const DoubtDecoderModule = {
  chatHistory: [],
  studyMaterialCache: null,

  render(container) {
    this.loadStudyMaterials();
    // If history is empty, populate initial AI welcome message
    if (this.chatHistory.length === 0) {
      this.chatHistory.push({
        sender: 'ai',
        text: `### 🎓 Welcome to the CA-JS Doubt Decoder!

I am your personal AI Study Mentor. I am fully integrated with your **CA ${State.user.examLevel} syllabus, notes, illustrations, and past exam provisions**.

**How can I help you today?** Feel free to ask me technical doubts on popular concepts like:
*   *What is a Section 8 Company?*
*   *Explain AS-2 Valuation of Inventories.*
*   *How does GST Input Tax Credit (ITC) work?*
*   *What are the rights of an Unpaid Seller?*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }

    const messagesHtml = this.chatHistory.map(msg => `
      <div class="chat-bubble ${msg.sender}">
        ${this.parseMarkdown(msg.text)}
        <span style="font-size: 9px; opacity: 0.6; display: block; text-align: right; margin-top: 6px;">
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
        <!-- Chat header info -->
        <div class="chat-header">
          <div class="chat-avatar">AI</div>
          <div>
            <h4 style="font-size: 14px; font-weight:600;">CA-JS doubt decoder</h4>
            <span style="font-size: 11px; color: var(--pastel-green-dark); font-weight: 500;">● Online & ready to assist</span>
          </div>
        </div>

        <!-- Chat messages stream -->
        <div class="chat-messages" id="chat-messages-box">
          ${messagesHtml}
        </div>

        <!-- Inputs panel -->
        <form id="chat-input-form" class="chat-input-bar">
          <input type="text" class="chat-input" id="chat-input-field" placeholder="Ask a doubt (e.g. What are the rules of AS-2?)..." required autocomplete="off">
          <button type="submit" class="btn btn-primary" style="padding: 12px 20px;">
            Send
          </button>
        </form>
      </div>
    `;

    // Scroll chat stream to bottom immediately
    this.scrollToBottom();

    // Bind chat form submit
    const chatForm = container.querySelector('#chat-input-form');
    const chatInput = container.querySelector('#chat-input-field');
    const messagesBox = container.querySelector('#chat-messages-box');

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const queryText = chatInput.value.trim();
      if (!queryText) return;

      // 1. Add user message to history
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.chatHistory.push({
        sender: 'user',
        text: queryText,
        timestamp: timeStr
      });

      // Clear input & refresh stream
      chatInput.value = '';
      this.renderStream(messagesBox);

      // 2. Show typing indicator
      this.showTypingIndicator(messagesBox);

      // 3. Trigger mock AI response after a short delay
      setTimeout(() => {
        this.generateAIResponse(queryText, messagesBox);
      }, 1500);
    });
  },

  renderStream(box) {
    box.innerHTML = this.chatHistory.map(msg => `
      <div class="chat-bubble ${msg.sender}">
        ${this.parseMarkdown(msg.text)}
        <span style="font-size: 9px; opacity: 0.6; display: block; text-align: right; margin-top: 6px;">
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

  async loadStudyMaterials() {
    if (this.studyMaterialCache) return;

    const files = [
      { name: 'ACCOUNTS_PYQ.txt', subject: 'Accounting' },
      { name: 'BUSINESS LAW_PYQ.txt', subject: 'Business Laws' },
      { name: 'ECONOMICS_PYQ.txt', subject: 'Business Economics' },
      { name: 'QUANITITATIVE_PYQ.txt', subject: 'Quantitative Aptitude' }
    ];

    this.studyMaterialCache = [];

    for (const file of files) {
      try {
        const response = await fetch(`./${file.name}`);
        if (!response.ok) continue;
        
        // Decode using TextDecoder to guarantee correct UTF-8 handling for special symbols like Indian Rupee (₹)
        const arrayBuffer = await response.arrayBuffer();
        const utf8Decoder = new TextDecoder('utf-8');
        let text = utf8Decoder.decode(arrayBuffer);
        
        // Safety replacements for Rupee symbol encoding mismatches
        text = text
          .replace(/â\u201a¹/g, '₹')
          .replace(/â‚¹/g, '₹')
          .replace(/â\x82\xb9/g, '₹')
          .replace(/â\u201A¹/g, '₹')
          .replace(/â\s*,\s*¹/g, '₹')
          .replace(/â\s*,\s*/g, '₹');

        // Split text by page breaks (form feeds) or paragraph blocks
        const chunks = text.split(/[\f]/).map(c => c.trim()).filter(c => c.length > 50);
        
        let finalChunks = chunks;
        if (chunks.length < 5) {
          finalChunks = text.split(/\n\s*\n/).map(c => c.trim()).filter(c => c.length > 50);
        }

        for (const chunk of finalChunks) {
          this.studyMaterialCache.push({
            text: chunk,
            subject: file.subject,
            fileName: file.name
          });
        }
      } catch (err) {
        console.warn(`Could not preload study material ${file.name}:`, err);
      }
    }
  },

  searchCachedMaterials(queryText) {
    if (!this.studyMaterialCache || this.studyMaterialCache.length === 0) return null;

    const lowerQuery = queryText.toLowerCase();
    
    // Stop words to filter out
    const stopWords = new Set([
      "what", "is", "a", "an", "the", "of", "and", "in", "on", "for", "to", "with", 
      "about", "how", "does", "explain", "define", "give", "me", "show", "is it", "is there", "are", "some", "many", "mistake"
    ]);

    // Tokenize query words
    const queryTokens = lowerQuery.split(/[^a-zA-Z0-9\u0900-\u097F]+/).filter(w => w.length > 2 && !stopWords.has(w));
    if (queryTokens.length === 0) return null;

    // Plural/singular stem mapping helper
    const getStems = (token) => {
      const stems = [token];
      if (token.endsWith('ies')) {
        stems.push(token.slice(0, -3) + 'y');
      } else if (token.endsWith('y')) {
        stems.push(token.slice(0, -1) + 'ies');
      } else if (token.endsWith('s') && !token.endsWith('ss')) {
        stems.push(token.slice(0, -1));
      } else {
        stems.push(token + 's');
      }
      return stems;
    };

    let bestChunk = null;
    let maxScore = 0;

    for (const chunk of this.studyMaterialCache) {
      const chunkLower = chunk.text.toLowerCase();
      let score = 0;
      let matchedCount = 0;

      for (const token of queryTokens) {
        const stems = getStems(token);
        const matchedStem = stems.find(stem => chunkLower.includes(stem));
        
        if (matchedStem) {
          matchedCount++;
          
          // Give higher score for exact word boundaries on any stem
          const isExact = stems.some(stem => {
            const wordRegex = new RegExp('\\b' + stem + '\\b');
            return wordRegex.test(chunkLower);
          });
          
          if (isExact) {
            score += 15;
          } else {
            score += 8;
          }
          
          // Bonus for proximity of query keywords
          const idx = chunkLower.indexOf(matchedStem);
          for (const otherToken of queryTokens) {
            if (otherToken !== token) {
              const otherStems = getStems(otherToken);
              const otherMatchedStem = otherStems.find(stem => chunkLower.includes(stem));
              
              if (otherMatchedStem) {
                const otherIdx = chunkLower.indexOf(otherMatchedStem);
                if (Math.abs(idx - otherIdx) < 120) {
                  score += 12; // Proximity bonus!
                }
              }
            }
          }
        }
      }

      const minMatched = queryTokens.length === 1 ? 1 : 2;
      if (matchedCount >= minMatched) {
        // Normalize score by length to favor concise exact matches
        const lengthPenalty = Math.log(chunk.text.length);
        const finalScore = score / lengthPenalty;

        if (finalScore > maxScore) {
          maxScore = finalScore;
          bestChunk = chunk;
        }
      }
    }

    if (maxScore > 5.0 && bestChunk) {
      return bestChunk;
    }
    return null;
  },

  getGenerativeCAResponse(queryText) {
    const lower = queryText.toLowerCase();

    // Comprehensive CA Topic Reference Database
    const caTopics = [
      {
        keys: ["consignment", "consignee", "consignor", "del credere"],
        title: "Consignment Accounts (Special Accounting Transactions)",
        provisions: "Accounting treatment of goods sent by Consignor (owner) to Consignee (agent) for sale on commission basis under Chapter 6 of CA Foundation Accounting.",
        rules: [
          "**Ownership vs Possession**: Ownership of goods remains with the Consignor until sold. Possession is transferred to the Consignee.",
          "**Consignment Account**: A nominal account prepared to ascertain the profit or loss on consignment. Debited with cost of goods and expenses; credited with sales and closing stock.",
          "**Types of Commission**:\n  1. *Ordinary Commission*: Calculated as a fixed percentage on total sales.\n  2. *Del Credere Commission*: Extra commission paid to the consignee to bear the risk of bad debts. Once paid, the consignor does not bear bad debt losses.\n  3. *Overriding Commission*: Extra incentive commission for selling goods above specified prices.",
          "**Valuation of Unsold Stock**: Valued at cost price or Net Realizable Value (NRV), whichever is lower, plus proportionate non-recurring expenses incurred by both consignor and consignee to bring the goods to the consignee's godown."
        ],
        tip: "In exam problems, always adjust for 'Goods in Transit' and 'Normal vs. Abnormal Loss'. Abnormal loss is credited to Consignment A/c and debited to Profit & Loss A/c to find the true operating profit."
      },
      {
        keys: ["capital and revenue", "capital expenditure", "revenue expenditure", "working expenses"],
        title: "Capital vs. Revenue Expenditures (Theoretical Framework)",
        provisions: "Distinguishing criteria under Chapter 1 of the CA Foundation syllabus to prepare correct Trading, P&L, and Balance Sheet statements.",
        rules: [
          "**Capital Expenditure**: Incurred to acquire long-term assets, improve asset capacity, or reduce working expenses. Extends the earning capacity of the business. Treated as an asset.",
          "**Revenue Expenditure**: Incurred to maintain day-to-day operations or keep assets in working condition. Charged directly to the P&L Account as an expense.",
          "**Deferred Revenue Expenditure**: Revenue expenditure that provides a benefit over multiple accounting periods (e.g. heavy initial advertising campaign)."
        ],
        tip: "A common exam question is: 'Is money spent to reduce working expenses capital or revenue?' It is **Capital** because it increases the long-term profitability of the business."
      },
      {
        keys: ["condition", "warranty", "conditions and warranties", "caveat emptor"],
        title: "Conditions & Warranties (Sale of Goods Act, 1930)",
        provisions: "Provisions of Section 12 of the Sale of Goods Act, 1930 governing merchantable contracts and breach remedies.",
        rules: [
          "**Condition (Sec 12(2))**: A stipulation essential to the main purpose of the contract. Breach of a condition gives the buyer the right to repudiate the contract and claim damages.",
          "**Warranty (Sec 12(3))**: A stipulation collateral to the main purpose. Breach of a warranty only gives the right to claim damages, not to reject the goods.",
          "**Caveat Emptor (Sec 16)**: 'Let the buyer beware.' The buyer must check quality and suitability. Exceptions include: buyer relying on seller's skill, sales by description, or merchantable quality."
        ],
        tip: "Remember for your law exam: Under Section 13, a breach of condition can be treated as a breach of warranty by the buyer, but a breach of warranty can never be treated as a breach of condition."
      },
      {
        keys: ["corporate veil", "salomon", "separate legal entity"],
        title: "Corporate Veil & Separate Legal Entity (Companies Act, 2013)",
        provisions: "The foundational company law doctrine established in Salomon v. Salomon & Co. Ltd. and codified under the Companies Act, 2013.",
        rules: [
          "**Separate Legal Entity**: A company is a distinct legal person separate from its members, capable of holding property, entering contracts, and suing or being sued.",
          "**Corporate Veil**: The legal barrier that protects shareholders and directors from personal liability for the company's debts.",
          "**Lifting of corporate veil**: The judicial or statutory exception where courts disregard the veil to hold individuals personally liable (e.g., in cases of fraud, tax evasion, shell companies, or trading with enemy countries)."
        ],
        tip: "Always cite landmark case laws like *Salomon v. Salomon* and *Daimler Co. Ltd. v. Continental Tyre & Rubber Co.* when answering corporate veil questions in your business law paper."
      },
      {
        keys: ["mutual agency", "partnership deed", "partnership act"],
        title: "Partnership Essentials & Mutual Agency (Indian Partnership Act, 1932)",
        provisions: "The core legal parameters of a partnership governed by Section 4 and Section 6 of the Indian Partnership Act, 1932.",
        rules: [
          "**Mutual Agency (Sec 6)**: The cardinal principle of partnership. Every partner is both an agent (binds others by their acts) and a principal (bound by others' acts) of the firm.",
          "**Partnership Deed**: The written agreement containing terms of partnership. In its absence: profits shared equally, no salary/remuneration, no interest on capital, and interest on partner's loan allowed @ 6% p.a.",
          "**Sharing of Profits**: Essential, but not conclusive test of partnership (creditors or servants receiving profit shares are not partners)."
        ],
        tip: "If asked to determine if a partnership exists, mutual agency is the **true test** of partnership, not just profit-sharing or joint ownership."
      },
      {
        keys: ["direct tax", "indirect tax", "gst", "supply", "itc"],
        title: "GST, Supply, & Input Tax Credit (Indirect Taxation)",
        provisions: "Codified regulations under the CGST Act, 2017 governing levy, taxable events, and tax credits in India.",
        rules: [
          "**Taxable Event (Supply)**: Under Section 7, tax is levied on all forms of supply of goods or services made for a consideration in the course or furtherance of business.",
          "**Input Tax Credit (Sec 16)**: Taxpayers can offset tax paid on inputs against output tax liability if: in possession of tax invoice, received the goods, tax paid to government, and return filed.",
          "**Blocked Credits (Sec 17(5))**: ITC cannot be claimed on specific purchases, such as motor vehicles (with exceptions), food and beverages, outdoor catering, beauty treatment, and membership of clubs."
        ],
        tip: "In taxation numeric problems, always check if the purchaser is registered. An unregistered buyer cannot claim ITC, and block credits under Section 17(5) must be excluded from credit calculations."
      },
      {
        keys: ["audit evidence", "sa 500", "audit documentation", "sa 230", "audit report"],
        title: "Audit Evidence & Documentation (Standards on Auditing - SA)",
        provisions: "Regulatory standards issued by the ICAI under SA 500 (Audit Evidence), SA 230 (Audit Documentation), and SA 700 series (Audit Opinions).",
        rules: [
          "**Sufficient Appropriate Evidence (SA 500)**: Audit evidence must be sufficient (quantity - influenced by risk of misstatement) and appropriate (quality - relevance and reliability).",
          "**Audit Documentation (SA 230)**: The written record of procedures performed, evidence obtained, and conclusions reached. Must be retained for at least 7 years from the date of the audit report.",
          "**Audit Opinion (SA 700/705)**: The opinion formed on whether financial statements reflect a true and fair view. Can be unmodified or modified (qualified, adverse, or disclaimer)."
        ],
        tip: "Always use standard audit terminology in your paper, such as 'professional skepticism', 'material misstatement', and 'reasonable assurance' to secure full marks."
      },
      {
        keys: ["cost of capital", "wacc", "capm", "leverage", "operating leverage", "financial leverage"],
        title: "Cost of Capital & Financial Leverages (Financial Management)",
        provisions: "Mathematical frameworks in corporate finance for capital structuring and risk evaluation under CA Intermediate Paper 6A.",
        rules: [
          "**Weighted Average Cost of Capital (WACC)**: The average cost of financing resources, calculated as: $WACC = (K_e \\times W_e) + (K_d \\times W_d)$",
          "**CAPM Model for Cost of Equity ($K_e$)**: $K_e = R_f + \\beta \\times (R_m - R_f)$ where $R_f$ is risk-free rate, $\\beta$ is beta coefficient, and $R_m$ is market return.",
          "**Leverages (DOL, DFL, DCL)**:\n  *   *Degree of Operating Leverage (DOL)* = Contribution / EBIT (measures business risk).\n  *   *Degree of Financial Leverage (DFL)* = EBIT / EBT (measures financial risk).\n  *   *Degree of Combined Leverage (DCL)* = Contribution / EBT = DOL $\\times$ DFL."
        ],
        tip: "A standard FM exam trap is forgetting to calculate the tax shield on debt interest. Always compute after-tax cost of debt: $K_d = I \\times (1 - t)$ where $t$ is the corporate tax rate."
      },
      {
        keys: ["porter", "bcg", "generic strategies", "strategic management", "vision", "mission"],
        title: "Strategic Analysis & Generic Choices (Strategic Management)",
        provisions: "Frameworks for evaluating corporate strategy, competitive environments, and portfolio positions under CA Intermediate Paper 6B.",
        rules: [
          "**Porter's Generic Strategies**: Companies gain competitive advantage through:\n  1. *Cost Leadership* (lowest production costs, broad market).\n  2. *Differentiation* (unique product/brand, broad market).\n  3. *Focus* (niche segment, utilizing low-cost or differentiation).",
          "**BCG Growth-Share Matrix**: Classifies business units into four categories based on market share and growth rate: Stars (High, High), Cash Cows (High, Low), Question Marks (Low, High), and Dogs (Low, Low).",
          "**Vision vs Mission**: Vision describes the future aspiration ('Where do we want to go?'); Mission defines the current business purpose ('Who are we and what do we do?')."
        ],
        tip: "When drawing a BCG or SWOT matrix in exam answers, label the axes and quadrants clearly. Visual diagrams coupled with structured descriptions score exceptionally high."
      }
    ];

    // Find direct matching topic
    const queryWords = lower.split(/\s+/).filter(w => w.length > 2);
    let matchedTopic = null;
    let maxCount = 0;

    for (const topic of caTopics) {
      const matchCount = queryWords.filter(w => topic.keys.some(k => k.includes(w) || w.includes(k))).length;
      if (matchCount > maxCount) {
        maxCount = matchCount;
        matchedTopic = topic;
      }
    }

    if (maxCount >= 1 && matchedTopic) {
      return `### 📚 ${matchedTopic.title}

Here is a comprehensive study guide detailing this technical concept under your **CA Syllabus**:

---

#### ⚖️ Regulatory Context & ICAI Provisions:
${matchedTopic.provisions}

---

#### 🔑 Core Technical Concepts & Rules:
${matchedTopic.rules.map(r => `*   ${r}`).join('\n')}

---

#### 🎯 Expert Exam Strategy & Score Guide:
> **ICAI EXAM GUIDELINES:**
> ${matchedTopic.tip}`;
    }

    // Dynamic Fallback Generator for any other CA question
    let nounPhrase = queryText
      .replace(/what is|explain|define|how does|what are|describe|about/gi, "")
      .trim();
    if (!nounPhrase) nounPhrase = "Chartered Accountancy Principles";
    
    const capitalizedNoun = nounPhrase.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");

    return `### 📚 Concept Guide: ${capitalizedNoun}

Here is a professional textbook-grade guide compiled by your **AI Study Mentor** regarding **${capitalizedNoun}**:

---

#### ⚖️ Executive Definition & Syllabus Context:
**${capitalizedNoun}** represents a key concept within the professional Chartered Accountancy curriculum. In business accounting, audit compliance, and corporate finance, understanding this concept is essential for correct financial presentation and adherence to established regulatory standards.

---

#### 🔑 Core Guidelines & Principles:
1.  **General Principle**: This concept is treated in accordance with generally accepted accounting principles (GAAP), standards on auditing (SAs), or standard legal acts (such as the Companies Act or Partnership Act).
2.  **Valuation & Treatment Rules**: Transactions or disclosures relating to **${capitalizedNoun}** must follow consistency, materiality, prudence, and accrual conventions.
3.  **Core Application**:
    *   Ensure all transaction entries are verified using robust documentation.
    *   Compare cost metrics, present values, or legal obligations systematically before finalization.
    *   Maintain distinct ledgers or regulatory records as required by the ICAI guidelines.

---

#### 🎯 Expert Exam Strategy & Score Guide:
> **ICAI EXAM GUIDELINES:**
> *   When writing answers for **${capitalizedNoun}**, always divide your answer into three clear sections: **(1) Provision/Definition, (2) Analysis/Working Notes, and (3) Conclusion/Effect**.
> *   Underline key regulatory sections, standards, or formulas to make your paper highly scannable for the evaluator.
> *   Provide numerical illustrations or case law citations wherever applicable to secure maximum scoring points.`;
  },

  async generateAIResponse(queryText, box) {
    // Remove indicator
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) indicator.remove();

    const lowerQuery = queryText.toLowerCase();
    let replyText = "";

    // Stop words to filter out
    const stopWords = new Set(["what", "is", "a", "an", "the", "of", "and", "in", "on", "for", "to", "with", "about", "how", "does", "explain", "define", "give", "me", "show"]);
    const queryTokens = lowerQuery.split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));

    // 1. Try token-based keyword overlap matching on AI_CHAT_REPLIES
    let bestMatchedReply = null;
    let maxOverlap = 0;

    for (const entry of AI_CHAT_REPLIES) {
      let overlapCount = 0;
      for (const keyword of entry.keywords) {
        const kwTokens = keyword.toLowerCase().split(/\s+/);
        // Compute overlap score
        const matchedTokens = queryTokens.filter(t => kwTokens.some(kt => kt.includes(t) || t.includes(kt)));
        overlapCount += matchedTokens.length;
      }
      
      if (overlapCount > maxOverlap) {
        maxOverlap = overlapCount;
        bestMatchedReply = entry;
      }
    }

    if (maxOverlap >= 1 && bestMatchedReply) {
      replyText = bestMatchedReply.reply;
      State.addPoints(5);
    } else {
      // 2. Try searching in active syllabus level illustrations
      const level = State.user.examLevel;
      const subjects = SYLLABUS_DATA[level] || [];
      let foundIllustration = null;
      let foundChapter = null;
      let foundSubject = null;

      for (const sub of subjects) {
        for (const ch of sub.chapters) {
          if (ch.illustrations) {
            const matchedIll = ch.illustrations.find(ill => {
              const qText = ill.q.toLowerCase();
              return qText.includes(lowerQuery) || lowerQuery.includes(qText) ||
                     (queryTokens.length > 0 && queryTokens.every(t => qText.includes(t)));
            });
            if (matchedIll) {
              foundIllustration = matchedIll;
              foundChapter = ch;
              foundSubject = sub;
              break;
            }
          }
        }
        if (foundIllustration) break;
      }

      if (foundIllustration) {
        replyText = `### 🔍 Match Found in Syllabus Illustrations
  
I found a direct concept match in **${foundSubject.subject}** &bull; **${foundChapter.name}**!

---

**Illustration:**
${foundIllustration.q}

---

**Suggested Solution:**
${foundIllustration.a}`;
        State.addPoints(10); // Reward more points for syllabus lookup
      } else {
        // 3. Try to do a dynamic full-text search on pre-loaded study material TXT files!
        let fileMatch = null;
        try {
          fileMatch = this.searchCachedMaterials(queryText);
        } catch (e) {
          console.error("In-memory corpus search failed:", e);
        }

        if (fileMatch) {
          // Format text perfectly (truncate if excessively long)
          let cleanText = fileMatch.text;
          if (cleanText.length > 1400) {
            cleanText = cleanText.substring(0, 1400) + "... *(truncated for readability)*";
          }

          replyText = `### 🔍 Match Found in Study Material (${fileMatch.subject})

I scanned your official **CA study papers and past year manuals (${fileMatch.fileName})** and extracted this highly relevant section:

---

${cleanText}

---
*💡 This excerpt is retrieved directly from past exam guidelines and official suggested answers.*`;
          State.addPoints(12); // Extra reward for paper research!
        } else {
          // 4. Try searching in active syllabus level chapter notes/conceptual summaries
          let foundChapterNote = null;
          for (const sub of subjects) {
            const matchedCh = sub.chapters.find(ch => {
              const chName = ch.name.toLowerCase();
              const chNotes = ch.notes.toLowerCase();
              return lowerQuery.includes(chName) || chNotes.includes(lowerQuery) ||
                     (queryTokens.length > 0 && queryTokens.every(t => chNotes.includes(t)));
            });
            if (matchedCh) {
              foundChapterNote = matchedCh;
              foundSubject = sub;
              break;
            }
          }

          if (foundChapterNote) {
            replyText = `### 📚 Syllabus Concept Lookup
  
I found a match for your query under **${foundSubject.subject}** &bull; **${foundChapterNote.name}**:

**High-Yield Conceptual Summary:**
${foundChapterNote.notes}

---
*💡 You can open the **Syllabus Explorer** to view full solved illustrations, video lectures, and practice problems for this chapter!*`;
            State.addPoints(8);
          } else {
            // 5. Try searching Mock Questions database
            const foundQ = MOCK_QUESTIONS.find(q => {
              const qText = q.question.toLowerCase();
              return qText.includes(lowerQuery) || lowerQuery.includes(qText) ||
                     (queryTokens.length > 0 && queryTokens.every(t => qText.includes(t)));
            });

            if (foundQ) {
              replyText = `### 📝 Practice Question Found
  
I found a matching study/practice question in our exam database under **${foundQ.subject}**:

**Question:**
${foundQ.question}

**Options:**
${foundQ.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}

---

**Suggested Answer:**
* **Correct Answer:** **${foundQ.answer}**
${foundQ.notes ? `* **Explanation:** ${foundQ.notes}` : ''}`;
              State.addPoints(8);
            } else {
              // 6. Not found in local DB — call Gemini AI for a real answer
              replyText = await this.askGemini(queryText);
              State.addPoints(5);
            }
          }
        }
      }
    }

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.chatHistory.push({
      sender: 'ai',
      text: replyText,
      timestamp: timeStr
    });

    this.renderStream(box);
  },

  // ── Gemini API fallback — called when local DB has no answer ──
  async askGemini(queryText) {
    const GEMINI_KEY_STORAGE = 'cajs_gemini_api_key';
    const DEFAULT_KEY = 'AIzaSyCIUkVYZPW_3GHj21OqZklXpqwFKYgzxqw';

    // 1. Get saved key or prompt user
    let apiKey = DEFAULT_KEY || localStorage.getItem(GEMINI_KEY_STORAGE) || '';
    if (!apiKey) {
      apiKey = await new Promise((resolve) => {
        const modalId = 'cajs-gemini-key-modal-dd';
        let modal = document.getElementById(modalId);
        if (modal) modal.remove();
        modal = document.createElement('div');
        modal.id = modalId;
        modal.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);backdrop-filter:blur(14px);display:flex;align-items:center;justify-content:center;z-index:10001;`;
        modal.innerHTML = `
          <div style="background:rgba(255,255,255,0.96);border-radius:24px;padding:28px;max-width:420px;width:90%;box-shadow:0 20px 50px rgba(0,0,0,0.15);">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
              <div style="width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,#7c3aed,#3b82f6);display:flex;align-items:center;justify-content:center;color:white;font-size:18px;">🔑</div>
              <div>
                <h3 style="margin:0;font-size:16px;font-weight:700;">AI Mentor Key Required</h3>
                <p style="margin:2px 0 0;font-size:11px;color:#888;">One-time setup to enable live AI answers</p>
              </div>
            </div>
            <p style="font-size:12px;color:#666;margin-bottom:14px;line-height:1.5;">
              Get a free API key from <a href="https://aistudio.google.com/apikey" target="_blank" style="color:#7c3aed;font-weight:600;">Google AI Studio ↗</a>. Stored only in your browser.
            </p>
            <input type="text" id="dd-gemini-key-input" placeholder="Paste your API key here..." style="width:100%;padding:10px 14px;border:1.5px solid rgba(0,0,0,0.1);border-radius:12px;font-size:13px;box-sizing:border-box;margin-bottom:14px;">
            <div style="display:flex;gap:10px;">
              <button id="dd-key-cancel" style="flex:1;padding:10px;border-radius:10px;border:1px solid #ddd;background:#f8f8f8;cursor:pointer;font-size:13px;">Cancel</button>
              <button id="dd-key-save" style="flex:2;padding:10px;border-radius:10px;border:none;background:linear-gradient(135deg,#7c3aed,#3b82f6);color:white;cursor:pointer;font-size:13px;font-weight:600;">Save & Search</button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('#dd-key-cancel').onclick = () => { modal.remove(); resolve(null); };
        modal.querySelector('#dd-key-save').onclick = () => {
          const k = modal.querySelector('#dd-gemini-key-input').value.trim();
          if (!k) { modal.querySelector('#dd-gemini-key-input').style.borderColor = '#f87171'; return; }
          localStorage.setItem(GEMINI_KEY_STORAGE, k);
          modal.remove();
          resolve(k);
        };
        modal.querySelector('#dd-gemini-key-input').onkeydown = (e) => {
          if (e.key === 'Enter') modal.querySelector('#dd-key-save').click();
        };
      });
    }

    if (!apiKey) {
      return `### ⚠️ API Key Required\n\nTo get live AI answers, please set up your **free API key**:\n1. Visit [Google AI Studio ↗](https://aistudio.google.com/apikey)\n2. Click **Create API Key**\n3. Paste it when prompted above\n\n*Your key is saved in your browser and never shared.*`;
    }

    // 2. Call Gemini API — try 2.0-flash first, fall back to 1.5-flash on rate limit
    const prompt = `You are an expert CA (Chartered Accountancy) study mentor for ICAI ${State.user ? State.user.examLevel : ''} level students in India. Answer the following question clearly and concisely, using proper accounting/law/tax terminology. Format your answer with headings, bullet points, and examples where relevant.\n\nQuestion: ${queryText}`;

    // Use available flash models
    const models = ['gemini-2.5-flash', 'gemini-2.0-flash'];

    for (const model of models) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.4, maxOutputTokens: 1024 }
          })
        });

        if (!response.ok) {
          if (response.status === 400 || response.status === 403) {
            localStorage.removeItem(GEMINI_KEY_STORAGE);
            return `### ❌ Invalid API Key\n\nYour API key appears to be invalid or expired. Please ask your next question to re-enter your key.\n\n*Get a free key at [Google AI Studio ↗](https://aistudio.google.com/apikey)*`;
          }
          if (response.status === 429) {
            // Rate limited — try next model
            console.warn(`Rate limit hit on ${model}, trying next model...`);
            continue; 
          }
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const answerText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (!answerText) throw new Error('Empty response from AI Mentor.');

        return `### 🤖 AI Mentor Answer\n\n${answerText}\n\n---\n*✨ This answer was generated live by CA TUTOR JS AI Mentor.*`;

      } catch (err) {
        console.error(`AI Model failed:`, err);
        return `### ⚠️ AI Search Failed\n\nCould not reach the AI Mentor right now. Please check your internet connection and try again.\n\n*Error: ${err.message}*`;
      }
    }

    // If loop finishes without returning, both models hit 429 Rate Limit
    return `### ⏳ Rate Limit Reached\n\nYou've sent too many questions too quickly. The AI free tier has a limit of requests per minute.\n\n**Please wait 30–60 seconds and try again.**\n\n*Tip: Your API key is still valid — this is a temporary limit.*`;
  },

  scrollToBottom() {
    const box = document.getElementById('chat-messages-box');
    if (box) {
      box.scrollTop = box.scrollHeight;
    }
  },

  // Premium basic markdown parser to clean HTML outputs
  parseMarkdown(text) {
    let html = text;
    
    // Headings (e.g. ### Title)
    html = html.replace(/^### (.*$)/gim, '<h3 class="header-branding" style="font-size:16px; margin-bottom:8px;">$1</h3>');
    html = html.replace(/^#### (.*$)/gim, '<h4 style="font-size:14px; font-weight:bold; margin-bottom:6px;">$1</h4>');

    // Markdown links [text](url) — must come BEFORE bold/italic to avoid conflicts
    html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:var(--pastel-purple-dark);font-weight:600;text-decoration:underline;">$1</a>');

    // Bold text (**text**)
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic text (*text*)
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Bullet lists
    html = html.replace(/^\* (.*$)/gim, '<li style="margin-left: 15px; font-size:13px; margin-bottom:4px;">$1</li>');
    html = html.replace(/^\d+\. (.*$)/gim, '<li style="margin-left: 15px; font-size:13px; margin-bottom:4px; list-style-type: decimal;">$1</li>');

    // Replace linebreaks with p spacing
    html = html.split('\n\n').map(p => {
      if (p.trim().startsWith('<li') || p.trim().startsWith('<h')) {
        return p;
      }
      return `<p style="margin-bottom: 8px; font-size: 13px; line-height: 1.55;">${p}</p>`;
    }).join('');

    return html;
  }
};
