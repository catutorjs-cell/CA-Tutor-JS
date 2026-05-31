// CA JS Application Seed Data

export const SYLLABUS_DATA = {
  Foundation: [
    {
      subject: "Paper-1: Accounting (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/sm-foundation-p1-may2026",
      chapters: [

        {
          id: "f_acc_c1",
          name: "Chapter 1: Theoretical Framework",
          weightage: "High",
          notes: "Understand meaning, scope, concepts, principles, policies, valuation rules, and standard accounting definitions.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88093bos-aps2240-ch1u1.pdf",
            "https://resource.cdn.icai.org/88094bos-aps2240-ch1u2.pdf",
            "https://resource.cdn.icai.org/88095bos-aps2240-ch1u3.pdf",
            "https://resource.cdn.icai.org/88096bos-aps2240-ch1u4.pdf",
            "https://resource.cdn.icai.org/88097bos-aps2240-ch1u5.pdf",
            "https://resource.cdn.icai.org/88098bos-aps2240-ch1u6.pdf",
            "https://resource.cdn.icai.org/88099bos-aps2240-ch1u7.pdf"
          ],
          units: [
            { name: "Unit 1: Meaning and Scope of Accounting", url: "https://resource.cdn.icai.org/88093bos-aps2240-ch1u1.pdf" },
            { name: "Unit 2: Accounting Concepts, Principles and Conventions", url: "https://resource.cdn.icai.org/88094bos-aps2240-ch1u2.pdf" },
            { name: "Unit 3: Capital and Revenue Expenditures and Receipts", url: "https://resource.cdn.icai.org/88095bos-aps2240-ch1u3.pdf" },
            { name: "Unit 4: Contingent Assets and Contingent Liabilities", url: "https://resource.cdn.icai.org/88096bos-aps2240-ch1u4.pdf" },
            { name: "Unit 5: Accounting Policies", url: "https://resource.cdn.icai.org/88097bos-aps2240-ch1u5.pdf" },
            { name: "Unit 6: Accounting as a Measurement Discipline &ndash; Valuation Principles", url: "https://resource.cdn.icai.org/88098bos-aps2240-ch1u6.pdf" },
            { name: "Unit 7: Accounting Standards", url: "https://resource.cdn.icai.org/88099bos-aps2240-ch1u7.pdf" }
          ],
          illustrations: [
            { q: "Define the going concern concept.", a: "The assumption that the enterprise will continue in operational existence for the foreseeable future, and that it has neither the intention nor the necessity of winding up or curtailing its scale of operations." }
          ]
        },
        {
          id: "f_acc_c2",
          name: "Chapter 2: Accounting Process",
          weightage: "High",
          notes: "Master basic procedures: journalizing transactions, ledger posting, trial balance preparation, subsidiary books, cash books, and errors rectification.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88100bos-aps2240-ch2u1.pdf",
            "https://resource.cdn.icai.org/88101bos-aps2240-ch2u2.pdf",
            "https://resource.cdn.icai.org/88102bos-aps2240-ch2u3.pdf",
            "https://resource.cdn.icai.org/88103bos-aps2240-ch2u4.pdf",
            "https://resource.cdn.icai.org/88104bos-aps2240-ch2u5.pdf",
            "https://resource.cdn.icai.org/88105bos-aps2240-ch2u6.pdf"
          ],
          units: [
            { name: "Unit 1: Basic Accounting Procedures &ndash; Journal entries", url: "https://resource.cdn.icai.org/88100bos-aps2240-ch2u1.pdf" },
            { name: "Unit 2: Ledgers", url: "https://resource.cdn.icai.org/88101bos-aps2240-ch2u2.pdf" },
            { name: "Unit 3: Trial Balance", url: "https://resource.cdn.icai.org/88102bos-aps2240-ch2u3.pdf" },
            { name: "Unit 4: Subsidiary Books", url: "https://resource.cdn.icai.org/88103bos-aps2240-ch2u4.pdf" },
            { name: "Unit 5: Cash Book", url: "https://resource.cdn.icai.org/88104bos-aps2240-ch2u5.pdf" },
            { name: "Unit 6: Rectification of Errors", url: "https://resource.cdn.icai.org/88105bos-aps2240-ch2u6.pdf" }
          ],
          illustrations: [
            { q: "What is a trial balance?", a: "A statement of debit and credit ledger balances prepared at a specific date to verify the arithmetic accuracy of posting." }
          ]
        },
        {
          id: "f_acc_c3",
          name: "Chapter 3: Bank Reconciliation Statement",
          weightage: "High",
          videoTitle: "Bank Reconciliation Statement (BRS) Complete Concept Walkthrough",
          videoDuration: 1450, // 24 minutes and 10 seconds
          notes: "A Bank Reconciliation Statement (BRS) is prepared to reconcile the difference between the balance shown by the Cash Book (bank column) and the Pass Book (bank statement) on a particular date. Differences arise due to:<br><br>" +
            "1. <strong>Timing Differences:</strong> Cheques issued but not presented for payment, Cheques deposited but not cleared by the bank, Interest allowed or bank charges debited by the bank directly.<br>" +
            "2. <strong>Transactions Unknown to Business:</strong> Direct collections by bank, Direct payments made by bank (Standing Instructions), Interest & dividends collected by bank directly.<br>" +
            "3. <strong>Errors:</strong> Errors committed by the business in the Cash Book, or errors committed by the bank in the Pass Book.<br><br>" +
            "💡 <strong>EXAM TIP (Adjusted Cash Book):</strong> In practice, before preparing a BRS, the Cash Book must be adjusted. All errors in the Cash Book (e.g. wrong postings, omissions) and transactions directly recorded by the bank (e.g. bank charges, direct deposits) must be entered in the Adjusted Cash Book first. Timing differences (e.g. unpresented cheques) are <strong>never</strong> recorded in the Adjusted Cash Book and must go directly into the BRS.",
          pdfUrls: ["https://resource.cdn.icai.org/88106bos-aps2240-ch3.pdf"],
          units: [
            { name: "Chapter 3 Full PDF", url: "https://resource.cdn.icai.org/88106bos-aps2240-ch3.pdf" }
          ],
          illustrations: [
            {
              q: "Prepare a BRS on 31st March 2026 starting with Debit Balance as per Cash Book ₹24,000. Adjustments:<br>" +
                "1. Cheques issued but not presented for payment ₹13,600.<br>" +
                "2. Cheques deposited into bank but not cleared ₹9,000.<br>" +
                "3. Bank interest credited in Pass Book only ₹500.<br>" +
                "4. Bank charges debited in Pass Book only ₹350.<br>" +
                "5. Direct payment by a customer into the bank account ₹3,000.",
              a: "<strong>🚀 SUGGESTED STEP-BY-STEP RECONCILIATION:</strong><br><br>" +
                "Starting Point: <strong>Debit Balance as per Cash Book = ₹24,000 (Favorable)</strong><br><br>" +
                "1. <strong>Cheques issued but not presented (+ ₹13,600):</strong> Cash book decreased upon issue, but pass book is unchanged. We must ADD this back.<br>" +
                "2. <strong>Cheques deposited but not cleared (- ₹9,000):</strong> Cash book increased upon deposit, but bank hasn't credited yet. We must SUBTRACT this.<br>" +
                "3. <strong>Bank Interest credited by bank (+ ₹500):</strong> Pass book has increased. We must ADD this.<br>" +
                "4. <strong>Bank Charges debited by bank (- ₹350):</strong> Pass book has decreased. We must SUBTRACT this.<br>" +
                "5. <strong>Direct customer deposit (+ ₹3,000):</strong> Pass book has increased. We must ADD this.<br><br>" +
                "🛠️ <strong>RECONCILIATION STATEMENT:</strong><br>" +
                "💵 Balance as per Cash Book: ₹24,000<br>" +
                "➕ ADD:<br>" +
                "&nbsp;&nbsp;&nbsp;&bull; Cheques issued but not presented: ₹13,600<br>" +
                "&nbsp;&nbsp;&nbsp;&bull; Bank Interest: ₹500<br>" +
                "&nbsp;&nbsp;&nbsp;&bull; Direct Customer Deposit: ₹3,000<br>" +
                "&nbsp;&nbsp;&nbsp;<strong>Subtotal Additions = ₹17,100</strong><br>" +
                "➖ LESS:<br>" +
                "&nbsp;&nbsp;&nbsp;&bull; Cheques deposited but not cleared: ₹9,000<br>" +
                "&nbsp;&nbsp;&nbsp;&bull; Bank Charges: ₹350<br>" +
                "&nbsp;&nbsp;&nbsp;<strong>Subtotal Deductions = ₹9,350</strong><br><br>" +
                "🎉 <strong>Credit Balance (Favorable) as per Pass Book: ₹31,750</strong> (24,000 + 17,100 - 9,350)"
            },
            {
              q: "Reconcile starting with Overdraft (Credit Balance) as per Cash Book ₹80,000. Adjustments:<br>" +
                "1. Cheques issued but not presented ₹25,000.<br>" +
                "2. Cheques deposited but not cleared ₹38,000.<br>" +
                "3. Interest on overdraft debited by bank only ₹4,200.",
              a: "<strong>🚀 SUGGESTED STEP-BY-STEP RECONCILIATION:</strong><br><br>" +
                "Starting Point: <strong>Overdraft as per Cash Book = - ₹80,000 (Unfavorable starting point)</strong><br><br>" +
                "1. <strong>Cheques issued but not presented (+ ₹25,000):</strong> When cheques are issued, Cash Book overdraft increased (went more negative). We must ADD this to reduce the overdraft balance.<br>" +
                "2. <strong>Cheques deposited but not cleared (- ₹38,000):</strong> When deposited, Cash Book overdraft decreased (went less negative). We must SUBTRACT this as bank has not cleared them yet.<br>" +
                "3. <strong>Interest on Overdraft debited by bank (- ₹4,200):</strong> Bank has debited interest, increasing our liability. We must SUBTRACT this.<br><br>" +
                "🛠️ <strong>RECONCILIATION STATEMENT:</strong><br>" +
                "💵 Overdraft (Credit) as per Cash Book: ₹(80,000)<br>" +
                "➕ ADD:<br>" +
                "&nbsp;&nbsp;&nbsp;&bull; Cheques issued but not presented: ₹25,000<br>" +
                "➖ LESS:<br>" +
                "&nbsp;&nbsp;&nbsp;&bull; Cheques deposited but not cleared: ₹38,000<br>" +
                "&nbsp;&nbsp;&nbsp;&bull; Interest on Overdraft debited by bank: ₹4,200<br><br>" +
                "🎉 <strong>Overdraft (Debit) as per Pass Book: ₹(97,200)</strong> (-80,000 + 25,000 - 38,000 - 4,200)"
            },
            {
              q: "What is an Adjusted Cash Book? Explain when timing differences are recorded in it.",
              a: "<strong>💡 ADJUSTED CASH BOOK EXPLAINED:</strong><br><br>" +
                "An Adjusted Cash Book is a revised Cash Book prepared before BRS formulation to correct all internal errors and omissions on the part of the business.<br><br>" +
                "✅ <strong>What is entered in the Adjusted Cash Book:</strong><br>" +
                "1. All errors made in the Cash Book (e.g. overcasting/undercasting bank columns, double entries).<br>" +
                "2. All items debited/credited by the bank that are not yet recorded in the Cash Book (e.g. bank charges, direct collections, dividend dividends credited directly, standing instruction payments).<br><br>" +
                "❌ <strong>What is NEVER entered in the Adjusted Cash Book (goes directly to BRS):</strong><br>" +
                "Timing differences between the business recording and bank clearing are <strong>never</strong> recorded in the Cash Book. These include:<br>" +
                "1. Cheques issued but not yet presented for payment.<br>" +
                "2. Cheques deposited but not yet cleared/credited by the bank.<br><br>" +
                "⚠️ Preparing the Adjusted Cash Book first ensures the ledger records reflect real assets, and narrows down the BRS strictly to timing conflicts!"
            }
          ]
        },
        {
          id: "f_acc_c4",
          name: "Chapter 4: Inventories",
          weightage: "Medium",
          notes: "Focus on inventory valuation criteria. Standard formula: lower of cost or net realizable value (NRV). Covers FIFO and Weighted Average.",
          pdfUrls: ["https://resource.cdn.icai.org/88107bos-aps2240-ch4.pdf"],
          units: [
            { name: "Chapter 4 Full PDF", url: "https://resource.cdn.icai.org/88107bos-aps2240-ch4.pdf" }
          ],
          illustrations: [
            { q: "What is Net Realizable Value (NRV)?", a: "Estimated selling price in the ordinary course of business less estimated costs of completion and necessary selling expenses." }
          ]
        },
        {
          id: "f_acc_c5",
          name: "Chapter 5: Depreciation and Amortisation",
          weightage: "High",
          notes: "Review methods of allocating depreciable value of Property, Plant & Equipment (PPE) over useful assets' life.",
          pdfUrls: ["https://resource.cdn.icai.org/88108bos-aps2240-ch5.pdf"],
          units: [
            { name: "Chapter 5 Full PDF", url: "https://resource.cdn.icai.org/88108bos-aps2240-ch5.pdf" }
          ],
          illustrations: [
            { q: "Differentiate SLM and WDV methods.", a: "Straight Line Method applies a constant depreciation charge annually. Written Down Value Method applies a constant percentage charge to the decreasing asset book value." }
          ]
        },
        {
          id: "f_acc_c6",
          name: "Chapter 6: Bills of Exchange and Promissory Notes",
          weightage: "Medium",
          notes: "Learn credit transaction document entries: drawer, drawee, discounting bills, retirement, and dishonour conditions.",
          pdfUrls: ["https://resource.cdn.icai.org/88109bos-aps2240-ch6.pdf"],
          units: [
            { name: "Chapter 6 Full PDF", url: "https://resource.cdn.icai.org/88109bos-aps2240-ch6.pdf" }
          ],
          illustrations: [
            { q: "What are days of grace in bills of exchange?", a: "Three additional days allowed to the drawee for paying the bill value beyond its nominal maturity date." }
          ]
        },
        {
          id: "f_acc_c7",
          name: "Chapter 7: Preparation of Final Accounts of Sole Proprietors",
          weightage: "High",
          notes: "Build final statements: Trading Account, Profit & Loss Account, and Balance Sheet for manufacturing and non-manufacturing sole proprietorships.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88110bos-aps2240-ch7u1.pdf",
            "https://resource.cdn.icai.org/88111bos-aps2240-ch7u2.pdf",
            "https://resource.cdn.icai.org/88092bos-aps2240-annex1.pdf"
          ],
          units: [
            { name: "Unit 1: Final Accounts of Non-Manufacturing Entities", url: "https://resource.cdn.icai.org/88110bos-aps2240-ch7u1.pdf" },
            { name: "Unit 2: Final Accounts of Manufacturing Entities", url: "https://resource.cdn.icai.org/88111bos-aps2240-ch7u2.pdf" },
            { name: "Annexure-I", url: "https://resource.cdn.icai.org/88092bos-aps2240-annex1.pdf" }
          ],
          illustrations: [
            { q: "What is manufacturing cost?", a: "The total cost incurred to convert raw materials into finished items, debited to the Manufacturing Account before transferring to the Trading Account." }
          ]
        },

        {
          id: "f_acc_c8",
          name: "Chapter 8: Financial Statements of Not-for-Profit Organisations",
          weightage: "High",
          notes: "Prepare Receipts and Payments, Income and Expenditure, and Balance Sheet for charitable organisations.",
          pdfUrls: ["https://resource.cdn.icai.org/88115bos-aps2240-ch8.pdf"],
          units: [
            { name: "Chapter 8 Full PDF", url: "https://resource.cdn.icai.org/88115bos-aps2240-ch8.pdf" }
          ],
          illustrations: [
            { q: "Is Income & Expenditure prepared on cash basis?", a: "No, it is prepared on an accrual basis, matching current year expenses with current year revenues, similar to a standard P&L statement." }
          ]
        },
        {
          id: "f_acc_c9",
          name: "Chapter 9: Accounts from Incomplete Records",
          weightage: "Medium",
          notes: "Single Entry System structures. Convert incomplete records into Double Entry statements by building ledger adjustments.",
          pdfUrls: ["https://resource.cdn.icai.org/88116bos-aps2240-ch9.pdf"],
          units: [
            { name: "Chapter 9 Full PDF", url: "https://resource.cdn.icai.org/88116bos-aps2240-ch9.pdf" }
          ],
          illustrations: [
            { q: "How do you calculate missing sales from incomplete records?", a: "By preparing a Total Debtors Account and incorporating opening debtors, cash collections, sales returns, and closing debtors." }
          ]
        },
        {
          id: "f_acc_c10",
          name: "Chapter 10: Partnership and LLP Accounts",
          weightage: "High",
          notes: "Formations, treatment of goodwill, partner admission, retirement, death, dissolution, and LLPs accounts.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88117bos-aps2240-ch10u1.pdf",
            "https://resource.cdn.icai.org/88118bos-aps2240-ch10u2.pdf",
            "https://resource.cdn.icai.org/88119bos-aps2240-ch10u3.pdf",
            "https://resource.cdn.icai.org/88120bos-aps2240-ch10u4.pdf",
            "https://resource.cdn.icai.org/88121bos-aps2240-ch10u5.pdf",
            "https://resource.cdn.icai.org/88122bos-aps2240-ch10u6.pdf",
            "https://resource.cdn.icai.org/88112bos-aps2240-annex2.pdf"
          ],
          units: [
            { name: "Unit 1: Introduction to Partnership Accounts", url: "https://resource.cdn.icai.org/88117bos-aps2240-ch10u1.pdf" },
            { name: "Unit 2: Treatment of Goodwill in Partnership Accounts", url: "https://resource.cdn.icai.org/88118bos-aps2240-ch10u2.pdf" },
            { name: "Unit 3: Admission of a New Partner", url: "https://resource.cdn.icai.org/88119bos-aps2240-ch10u3.pdf" },
            { name: "Unit 4: Retirement of a Partner", url: "https://resource.cdn.icai.org/88120bos-aps2240-ch10u4.pdf" },
            { name: "Unit 5: Death of a Partner", url: "https://resource.cdn.icai.org/88121bos-aps2240-ch10u5.pdf" },
            { name: "Unit 6: Dissolution of Partnership Firms and LLPs", url: "https://resource.cdn.icai.org/88122bos-aps2240-ch10u6.pdf" },
            { name: "Annexure-II", url: "https://resource.cdn.icai.org/88112bos-aps2240-annex2.pdf" }
          ],
          illustrations: [
            { q: "What is the true test of partnership?", a: "Mutual Agency: Whether the business is carried on by all or any of them acting for all, under Section 6 of the Indian Partnership Act." }
          ]
        },
        {
          id: "f_acc_c11",
          name: "Chapter 11: Company Accounts",
          weightage: "High",
          notes: "Study share issuances, debentures, share forfeitures, re-issues, bonus/right issues, and preference share redemptions.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88134bos-aps2240-ch11u1.pdf",
            "https://resource.cdn.icai.org/88135bos-aps2240-ch11u2.pdf",
            "https://resource.cdn.icai.org/88136bos-aps2240-ch11u3.pdf",
            "https://resource.cdn.icai.org/88137bos-aps2240-ch11u4.pdf",
            "https://resource.cdn.icai.org/88138bos-aps2240-ch11u5.pdf",
            "https://resource.cdn.icai.org/88139bos-aps2240-ch11u6.pdf"
          ],
          units: [
            { name: "Unit 1: Introduction to Company Accounts", url: "https://resource.cdn.icai.org/88134bos-aps2240-ch11u1.pdf" },
            { name: "Unit 2: Issue, Forfeiture and Re-Issue of Shares", url: "https://resource.cdn.icai.org/88135bos-aps2240-ch11u2.pdf" },
            { name: "Unit 3: Issue of Debentures", url: "https://resource.cdn.icai.org/88136bos-aps2240-ch11u3.pdf" },
            { name: "Unit 4: Accounting for Bonus Issue and Right Issue", url: "https://resource.cdn.icai.org/88137bos-aps2240-ch11u4.pdf" },
            { name: "Unit 5: Redemption of Preference Shares", url: "https://resource.cdn.icai.org/88138bos-aps2240-ch11u5.pdf" },
            { name: "Unit 6: Redemption of Debentures", url: "https://resource.cdn.icai.org/88139bos-aps2240-ch11u6.pdf" }
          ],
          illustrations: [
            { q: "Can a company issue shares at discount?", a: "No, under Section 53 of the Companies Act 2013, companies are prohibited from issuing shares at discount, rendering such issues void ab initio." }
          ]
        },
        {
          id: "f_acc_c12",
          name: "Accounting Terminology Glossary",
          weightage: "Medium",
          notes: "Glossary notes defining standard accounting terms used in Board of Studies materials.",
          pdfUrls: ["https://resource.cdn.icai.org/88114bos-aps2240-gloss.pdf"],
          units: [
            { name: "Accounting Glossary Full PDF", url: "https://resource.cdn.icai.org/88114bos-aps2240-gloss.pdf" }
          ],
          illustrations: [
            { q: "Define Accrual Basis of Accounting.", a: "The method of recording transactions by which revenues, costs, assets, and liabilities are recognized in the period in which they occur rather than when cash is received or paid." }
          ]
        }
      ]
    },
    {
      subject: "Paper-2: Business Laws (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/sm-foundation-p2-may2026",
      chapters: [
        {
          id: "f_law_c1",
          name: "Chapter 1: Indian Regulatory Framework",
          weightage: "Medium",
          notes: "Understand the structure of the Indian legal system, sources of law, the process of legislative formulation, and primary regulatory bodies such as ICAI, SEBI, and RBI.",
          pdfUrls: ["https://resource.cdn.icai.org/88015bos-aps2231-ch1.pdf"],
          units: [
            { name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/88015bos-aps2231-ch1.pdf" }
          ],
          illustrations: [
            { q: "What are the primary sources of law in India?", a: "The Constitution of India, Statutes enacted by Parliament and State Legislatures, Customary Law, and Judicial Precedents (decisions of the Supreme Court and High Courts)." }
          ]
        },
        {
          id: "f_law_c2",
          name: "Chapter 2: The Indian Contract Act, 1872",
          weightage: "High",
          notes: "Master key concepts: nature of contract, offer, acceptance, consideration, free consent, capacity to contract, void/voidable agreements, performance, breach remedies, indemnity & guarantee, bailment & pledge, and agency relations.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88017bos-aps2231-ch2u1.pdf",
            "https://resource.cdn.icai.org/88018bos-aps2231-ch2u2.pdf",
            "https://resource.cdn.icai.org/88019bos-aps2231-ch2u3.pdf",
            "https://resource.cdn.icai.org/88020bos-aps2231-ch2u4.pdf",
            "https://resource.cdn.icai.org/88021bos-aps2231-ch2u5.pdf",
            "https://resource.cdn.icai.org/88022bos-aps2231-ch2u6.pdf",
            "https://resource.cdn.icai.org/88023bos-aps2231-ch2u7.pdf",
            "https://resource.cdn.icai.org/88024bos-aps2231-ch2u8.pdf",
            "https://resource.cdn.icai.org/88025bos-aps2231-ch2u9.pdf"
          ],
          units: [
            { name: "Unit 1: Nature of Contracts", url: "https://resource.cdn.icai.org/88017bos-aps2231-ch2u1.pdf" },
            { name: "Unit 2: Consideration", url: "https://resource.cdn.icai.org/88018bos-aps2231-ch2u2.pdf" },
            { name: "Unit 3: Other Essential Elements of a Contract", url: "https://resource.cdn.icai.org/88019bos-aps2231-ch2u3.pdf" },
            { name: "Unit 4: Performance of Contract", url: "https://resource.cdn.icai.org/88020bos-aps2231-ch2u4.pdf" },
            { name: "Unit 5: Breach of Contract and its Remedies", url: "https://resource.cdn.icai.org/88021bos-aps2231-ch2u5.pdf" },
            { name: "Unit 6: Contingent and Quasi Contracts", url: "https://resource.cdn.icai.org/88022bos-aps2231-ch2u6.pdf" },
            { name: "Unit 7: Contract of Indemnity and Guarantee", url: "https://resource.cdn.icai.org/88023bos-aps2231-ch2u7.pdf" },
            { name: "Unit 8: Bailment and Pledge", url: "https://resource.cdn.icai.org/88024bos-aps2231-ch2u8.pdf" },
            { name: "Unit 9: Agency", url: "https://resource.cdn.icai.org/88025bos-aps2231-ch2u9.pdf" }
          ],
          illustrations: [
            { q: "What is consideration and what are its essentials?", a: "Consideration is Quid Pro Quo (something in return), defined in Section 2(d). Essentials include: it must move at the desire of the promisor, it can move from the promisee or another person, and it may be past, present, or future." }
          ]
        },
        {
          id: "f_law_c3",
          name: "Chapter 3: The Sale of Goods Act, 1930",
          weightage: "High",
          notes: "Study contract of sale features, conditions & warranties, transfer of ownership/property, rules on delivery of goods, and personal/real rights of an unpaid seller.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88026bos-aps2231-ch3u1.pdf",
            "https://resource.cdn.icai.org/88027bos-aps2231-ch3u2.pdf",
            "https://resource.cdn.icai.org/88028bos-aps2231-ch3u3.pdf",
            "https://resource.cdn.icai.org/88029bos-aps2231-ch3u4.pdf"
          ],
          units: [
            { name: "Unit 1: Formation of the Contract of Sale", url: "https://resource.cdn.icai.org/88026bos-aps2231-ch3u1.pdf" },
            { name: "Unit 2: Conditions & Warranties", url: "https://resource.cdn.icai.org/88027bos-aps2231-ch3u2.pdf" },
            { name: "Unit 3: Transfer of Ownership and Delivery of Goods", url: "https://resource.cdn.icai.org/88028bos-aps2231-ch3u3.pdf" },
            { name: "Unit 4: Unpaid Seller", url: "https://resource.cdn.icai.org/88029bos-aps2231-ch3u4.pdf" }
          ],
          illustrations: [
            { q: "Differentiate Condition and Warranty.", a: "A condition is essential to the main purpose of the contract, breach of which gives a right to treat the contract as repudiated. A warranty is collateral, breach of which gives a claim for damages only." }
          ]
        },
        {
          id: "f_law_c4",
          name: "Chapter 4: The Indian Partnership Act, 1932",
          weightage: "Medium",
          notes: "Analyze general characteristics of partnership, relations of partners to one another and third parties, registration effects, and legal dissolution processes.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88030bos-aps2231-ch4u1.pdf",
            "https://resource.cdn.icai.org/88031bos-aps2231-ch4u2.pdf",
            "https://resource.cdn.icai.org/88032bos-aps2231-ch4u3.pdf"
          ],
          units: [
            { name: "Unit 1: General Nature of Partnership", url: "https://resource.cdn.icai.org/88030bos-aps2231-ch4u1.pdf" },
            { name: "Unit 2: Relations of Partners", url: "https://resource.cdn.icai.org/88031bos-aps2231-ch4u2.pdf" },
            { name: "Unit 3: Registration and Dissolution of a Firm", url: "https://resource.cdn.icai.org/88032bos-aps2231-ch4u3.pdf" }
          ],
          illustrations: [
            { q: "What is the true test of partnership?", a: "Mutual Agency under Section 6 of the Act. Sharing of profits is prima facie evidence but not conclusive; mutual agency (business carried on by all or any of them acting for all) is the true test." }
          ]
        },
        {
          id: "f_law_c5",
          name: "Chapter 5: The Limited Liability Partnership Act, 2008",
          weightage: "Medium",
          notes: "Learn limited liability partnership key traits, differences from partnerships and companies, incorporation process, and designated partner roles.",
          pdfUrls: ["https://resource.cdn.icai.org/88033bos-aps2231-ch5.pdf"],
          units: [
            { name: "Chapter 5 Full PDF", url: "https://resource.cdn.icai.org/88033bos-aps2231-ch5.pdf" }
          ],
          illustrations: [
            { q: "What is the minimum number of partners in an LLP?", a: "Every LLP must have at least two partners. If the number falls below two and the LLP carries on business for more than six months, the remaining partner is personally liable." }
          ]
        },
        {
          id: "f_law_c6",
          name: "Chapter 6: The Companies Act, 2013",
          weightage: "High",
          notes: "Examine corporate characteristics, separate legal entity status, lifting corporate veil, classes of companies (OPC, Private, Public, Section 8), and incorporation documents.",
          pdfUrls: ["https://resource.cdn.icai.org/88034bos-aps2231-ch6.pdf"],
          units: [
            { name: "Chapter 6 Full PDF", url: "https://resource.cdn.icai.org/88034bos-aps2231-ch6.pdf" }
          ],
          illustrations: [
            { q: "What are the rules of a Section 8 Company?", a: "A Section 8 Company is formed for promoting charitable/non-profit objectives. It must apply its profits solely to promote its objectives and is strictly prohibited from paying dividends to members." }
          ]
        },
        {
          id: "f_law_c7",
          name: "Chapter 7: The Negotiable Instruments Act, 1881",
          weightage: "High",
          notes: "Study negotiable instruments definition, promissory notes, bills of exchange, cheques characteristics, negotiation, Holder in Due Course (HIDC) privileges, and dishonour implications.",
          pdfUrls: ["https://resource.cdn.icai.org/88035bos-aps2231-ch7.pdf"],
          units: [
            { name: "Chapter 7 Full PDF", url: "https://resource.cdn.icai.org/88035bos-aps2231-ch7.pdf" }
          ],
          illustrations: [
            { q: "Who is a 'Holder in Due Course' (HIDC)?", a: "Under Section 9, an HIDC is a person who obtains a negotiable instrument for consideration, before its maturity, in good faith, and without any notice of defect in the title of the transferor." }
          ]
        }
      ]
    },
    {
      subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/sm-foundation-p3-may2026",
      chapters: [
        {
          id: "f_qa_c1",
          name: "Chapter 1: Ratio and Proportion, Indices, Logarithms",
          weightage: "High",
          notes: "Learn laws of indices, properties of logarithms, and ratio-proportion calculations essential for financial mathematics.",
          pdfUrls: ["https://resource.cdn.icai.org/88037bos-aps2232-ch1.pdf"],
          units: [
            { name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/88037bos-aps2232-ch1.pdf" }
          ],
          illustrations: [
            { q: "If a:b = 3:4 and b:c = 8:9, find a:c.", a: "a:c = (a/b) * (b/c) = (3/4) * (8/9) = 24/36 = 2:3." }
          ]
        },
        {
          id: "f_qa_c2",
          name: "Chapter 2: Equations",
          weightage: "High",
          notes: "Solve linear equations (up to three variables), quadratic equations, and cubic equations in business situations.",
          pdfUrls: ["https://resource.cdn.icai.org/88038bos-aps2232-ch2.pdf"],
          units: [
            { name: "Chapter 2 Full PDF", url: "https://resource.cdn.icai.org/88038bos-aps2232-ch2.pdf" }
          ],
          illustrations: [
            { q: "Solve for x: x^2 - 5x + 6 = 0.", a: "(x-2)(x-3) = 0 => x = 2 or x = 3." }
          ]
        },
        {
          id: "f_qa_c3",
          name: "Chapter 3: Linear Inequalities",
          weightage: "Medium",
          notes: "Analyze linear inequalities in one or two variables, objective functions, and graphical solution spaces.",
          pdfUrls: ["https://resource.cdn.icai.org/88039bos-aps2232-ch3.pdf"],
          units: [
            { name: "Chapter 3 Full PDF", url: "https://resource.cdn.icai.org/88039bos-aps2232-ch3.pdf" }
          ],
          illustrations: [
            { q: "Solve the inequality: 3x - 2 < 7.", a: "3x < 9 => x < 3." }
          ]
        },
        {
          id: "f_qa_c4",
          name: "Chapter 4: Mathematics of Finance",
          weightage: "High",
          notes: "Master key financial formulas: simple interest, compound interest, nominal and effective rates of interest, annuities, sinking funds, and net present value.",
          pdfUrls: ["https://resource.cdn.icai.org/88040bos-aps2232-ch4.pdf"],
          units: [
            { name: "Chapter 4 Full PDF", url: "https://resource.cdn.icai.org/88040bos-aps2232-ch4.pdf" }
          ],
          illustrations: [
            { q: "What is the effective rate of interest corresponding to a nominal rate of 6% compounded semi-annually?", a: "E = (1 + i/m)^m - 1 = (1 + 0.06/2)^2 - 1 = 1.03^2 - 1 = 6.09%." }
          ]
        },
        {
          id: "f_qa_c5",
          name: "Chapter 5: Basic Concepts of Permutations and Combinations",
          weightage: "High",
          notes: "Factorial notation, permutations (circular, restricted), combinations, and practical application problems.",
          pdfUrls: ["https://resource.cdn.icai.org/88041bos-aps2232-ch5.pdf"],
          units: [
            { name: "Chapter 5 Full PDF", url: "https://resource.cdn.icai.org/88041bos-aps2232-ch5.pdf" }
          ],
          illustrations: [
            { q: "Find the value of 5P2 and 5C2.", a: "5P2 = 5! / 3! = 20. 5C2 = 5! / (2! * 3!) = 10." }
          ]
        },
        {
          id: "f_qa_c6",
          name: "Chapter 6: Sequence and Series &ndash; AP & GP",
          weightage: "Medium",
          notes: "Arithmetic Progression (AP) and Geometric Progression (GP), sum of series, mean calculations.",
          pdfUrls: ["https://resource.cdn.icai.org/88042bos-aps2232-ch6.pdf"],
          units: [
            { name: "Chapter 6 Full PDF", url: "https://resource.cdn.icai.org/88042bos-aps2232-ch6.pdf" }
          ],
          illustrations: [
            { q: "Find the 10th term of the AP: 2, 5, 8, 11...", a: "a = 2, d = 3. T10 = a + 9d = 2 + 9(3) = 29." }
          ]
        },
        {
          id: "f_qa_c7",
          name: "Chapter 7: Sets, Relations and Functions, Limits & Continuity",
          weightage: "Medium",
          notes: "Set theory operations, Venn diagrams, Cartesian product, relations, domain/range of functions, limits, and continuity.",
          pdfUrls: ["https://resource.cdn.icai.org/88043bos-aps2232-ch7.pdf"],
          units: [
            { name: "Chapter 7 Full PDF", url: "https://resource.cdn.icai.org/88043bos-aps2232-ch7.pdf" }
          ],
          illustrations: [
            { q: "If A = {1, 2, 3} and B = {3, 4}, find A ∩ B.", a: "A ∩ B = {3}." }
          ]
        },
        {
          id: "f_qa_c8",
          name: "Chapter 8: Basic Applications of Differential and Integral Calculus",
          weightage: "Medium",
          notes: "Derivative rules, marginal cost/revenue applications, optimization, basic integration methods, and consumer/producer surplus.",
          pdfUrls: ["https://resource.cdn.icai.org/88045bos-aps2232-ch8u2.pdf"],
          units: [
            { name: "Chapter 8 Full PDF", url: "https://resource.cdn.icai.org/88045bos-aps2232-ch8u2.pdf" }
          ],
          illustrations: [
            { q: "Find dy/dx if y = 3x^2 + 5x.", a: "dy/dx = 6x + 5." }
          ]
        },
        {
          id: "f_qa_c9",
          name: "Chapter 9: Number Series, Coding-Decoding and Odd Man Out",
          weightage: "High",
          notes: "Logical reasoning based on finding missing series numbers, alphabetical coding systems, and identifying odd elements.",
          pdfUrls: ["https://resource.cdn.icai.org/88046bos-aps2232-ch9.pdf"],
          units: [
            { name: "Chapter 9 Full PDF", url: "https://resource.cdn.icai.org/88046bos-aps2232-ch9.pdf" }
          ],
          illustrations: [
            { q: "Find the odd man out: 4, 9, 16, 20, 25.", a: "20 is the odd man out as all other numbers are perfect squares." }
          ]
        },
        {
          id: "f_qa_c10",
          name: "Chapter 10: Direction Sense Test",
          weightage: "Medium",
          notes: "Solve relative positioning and directional path tracking questions using grid systems.",
          pdfUrls: ["https://resource.cdn.icai.org/88047bos-aps2232-ch10.pdf"],
          units: [
            { name: "Chapter 10 Full PDF", url: "https://resource.cdn.icai.org/88047bos-aps2232-ch10.pdf" }
          ],
          illustrations: [
            { q: "A man starts facing North, turns 90 degrees right, walks 5m, and turns left. Which direction is he facing?", a: "North. Turning right faces East, and subsequent left turn faces North again." }
          ]
        },
        {
          id: "f_qa_c11",
          name: "Chapter 11: Seating Arrangements",
          weightage: "Medium",
          notes: "Circular seating layouts, linear sequence constraints, and relative left/right positioning puzzles.",
          pdfUrls: ["https://resource.cdn.icai.org/88048bos-aps2232-ch11.pdf"],
          units: [
            { name: "Chapter 11 Full PDF", url: "https://resource.cdn.icai.org/88048bos-aps2232-ch11.pdf" }
          ],
          illustrations: [
            { q: "If A sits to the immediate left of B, and B sits to the left of C, arrange them from left to right.", a: "A - B - C." }
          ]
        },
        {
          id: "f_qa_c12",
          name: "Chapter 12: Blood Relations",
          weightage: "Medium",
          notes: "Family lineage tracking, relationship mappings, and decoding symbolic relative diagrams.",
          pdfUrls: ["https://resource.cdn.icai.org/88049bos-aps2232-ch12.pdf"],
          units: [
            { name: "Chapter 12 Full PDF", url: "https://resource.cdn.icai.org/88049bos-aps2232-ch12.pdf" }
          ],
          illustrations: [
            { q: "Pointing to a man, a woman said: 'His mother is the only daughter of my mother.' What is the woman to the man?", a: "Mother." }
          ]
        },
        {
          id: "f_qa_c13",
          name: "Chapter 13: Statistical Description of Data & Sampling",
          weightage: "Medium",
          notes: "Data collection methods, primary vs secondary, frequency distributions, graphics (histogram, ogive), and sampling methodologies.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88050bos-aps2232-ch13u1.pdf",
            "https://resource.cdn.icai.org/88051bos-aps2232-ch13u2.pdf"
          ],
          units: [
            { name: "Unit I: Statistical Description of Data", url: "https://resource.cdn.icai.org/88050bos-aps2232-ch13u1.pdf" },
            { name: "Unit II: Sampling", url: "https://resource.cdn.icai.org/88051bos-aps2232-ch13u2.pdf" }
          ],
          illustrations: [
            { q: "An Ogive is used to determine which measure of central tendency?", a: "Median (by plotting cumulative frequency)." }
          ]
        },
        {
          id: "f_qa_c14",
          name: "Chapter 14: Measures of Central Tendency and Dispersion",
          weightage: "High",
          notes: "Averages (Mean, Median, Mode, AM, GM, HM) and dispersion metrics (Range, Mean Deviation, Standard Deviation, Quartile Deviation).",
          pdfUrls: [
            "https://resource.cdn.icai.org/88052bos-aps2232-ch14u1.pdf",
            "https://resource.cdn.icai.org/88057bos-aps2232-ch14u2.pdf"
          ],
          units: [
            { name: "Unit I: Measures of Central Tendency", url: "https://resource.cdn.icai.org/88052bos-aps2232-ch14u1.pdf" },
            { name: "Unit II: Dispersion", url: "https://resource.cdn.icai.org/88057bos-aps2232-ch14u2.pdf" }
          ],
          illustrations: [
            { q: "If SD of a variable x is 5, find the variance.", a: "Variance = SD^2 = 5^2 = 25." }
          ]
        },
        {
          id: "f_qa_c15",
          name: "Chapter 15: Probability",
          weightage: "High",
          notes: "Independent events, conditional probability, Bayes' Theorem, and mathematical expectation.",
          pdfUrls: ["https://resource.cdn.icai.org/88053bos-aps2232-ch15.pdf"],
          units: [
            { name: "Chapter 15 Full PDF", url: "https://resource.cdn.icai.org/88053bos-aps2232-ch15.pdf" }
          ],
          illustrations: [
            { q: "Find probability of getting a sum of 7 when rolling two fair dice.", a: "Favorable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6. Total = 36. P = 6/36 = 1/6." }
          ]
        },
        {
          id: "f_qa_c16",
          name: "Chapter 16: Theoretical Distributions",
          weightage: "High",
          notes: "Binomial, Poisson, and Normal distributions, parameters, and calculation rules.",
          pdfUrls: ["https://resource.cdn.icai.org/88054bos-aps2232-ch16.pdf"],
          units: [
            { name: "Chapter 16 Full PDF", url: "https://resource.cdn.icai.org/88054bos-aps2232-ch16.pdf" }
          ],
          illustrations: [
            { q: "For a Poisson distribution, if mean is 4, what is the standard deviation?", a: "Mean = Variance = 4. SD = sqrt(Variance) = sqrt(4) = 2." }
          ]
        },
        {
          id: "f_qa_c17",
          name: "Chapter 17: Correlation and Regression",
          weightage: "High",
          notes: "Karl Pearson's correlation coefficient, Spearman's rank correlation, regression equations, and standard error.",
          pdfUrls: ["https://resource.cdn.icai.org/88055bos-aps2232-ch17.pdf"],
          units: [
            { name: "Chapter 17 Full PDF", url: "https://resource.cdn.icai.org/88055bos-aps2232-ch17.pdf" }
          ],
          illustrations: [
            { q: "If the two regression coefficients are b_yx = 0.8 and b_xy = 0.2, find the correlation coefficient r.", a: "r = sqrt(b_yx * b_xy) = sqrt(0.8 * 0.2) = sqrt(0.16) = 0.4." }
          ]
        },
        {
          id: "f_qa_c18",
          name: "Chapter 18: Index Numbers",
          weightage: "Medium",
          notes: "Price index construction (Laspeyres, Paasche, Fisher), test of adequacy, and consumer price index.",
          pdfUrls: ["https://resource.cdn.icai.org/88056bos-aps2232-ch18.pdf"],
          units: [
            { name: "Chapter 18 Full PDF", url: "https://resource.cdn.icai.org/88056bos-aps2232-ch18.pdf" }
          ],
          illustrations: [
            { q: "Why is Fisher's index called an 'Ideal Index Number'?", a: "Because it satisfies both the Time Reversal Test and the Factor Reversal Test, and is based on geometric mean of Laspeyres and Paasche indices." }
          ]
        }
      ]
    },
    {
      subject: "Paper-4: Business Economics (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/sm-foundation-p4-may2025",
      chapters: [
        {
          id: "f_eco_c1",
          name: "Chapter 1: Nature & Scope of Business Economics",
          weightage: "Medium",
          notes: "Understand micro and macro economics differences, key central problems of an economy, and price mechanism functions in different economic systems.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88059bos-aps2233-ch1u1.pdf",
            "https://resource.cdn.icai.org/88060bos-aps2233-ch1u2.pdf"
          ],
          units: [
            { name: "Unit 1: Introduction", url: "https://resource.cdn.icai.org/88059bos-aps2233-ch1u1.pdf" },
            { name: "Unit 2: Basic Problems of an Economy & Role of Price Mechanism", url: "https://resource.cdn.icai.org/88060bos-aps2233-ch1u2.pdf" }
          ],
          illustrations: [
            { q: "What is Business Economics?", a: "The integration of economic theory with business practice for the purpose of facilitating decision-making and forward planning by management." }
          ]
        },
        {
          id: "f_eco_c2",
          name: "Chapter 2: Theory of Demand and Supply",
          weightage: "High",
          notes: "Master key principles of demand (determinants, elasticity types, forecasting) and supply (determinants, elasticity), alongside consumer behavior theories (utility, indifference curves).",
          pdfUrls: [
            "https://resource.cdn.icai.org/88061bos-aps2233-ch2u1.pdf",
            "https://resource.cdn.icai.org/88062bos-aps2233-ch2u2.pdf",
            "https://resource.cdn.icai.org/88063bos-aps2233-ch2u3.pdf"
          ],
          units: [
            { name: "Unit 1: Law of Demand and Elasticity of Demand", url: "https://resource.cdn.icai.org/88061bos-aps2233-ch2u1.pdf" },
            { name: "Unit 2: Theory of Consumer Behaviour", url: "https://resource.cdn.icai.org/88062bos-aps2233-ch2u2.pdf" },
            { name: "Unit 3: Supply", url: "https://resource.cdn.icai.org/88063bos-aps2233-ch2u3.pdf" }
          ],
          illustrations: [
            { q: "What is an indifference curve?", a: "A curve showing all combinations of two goods that yield the same level of utility/satisfaction to the consumer, characterized by a downward slope and convexity to the origin." }
          ]
        },
        {
          id: "f_eco_c3",
          name: "Chapter 3: Theory of Production and Cost",
          weightage: "High",
          notes: "Examine production laws (returns to a variable factor, returns to scale), Isoquants, short-run vs long-run cost functions, and economies of scale.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88064bos-aps2233-ch3u1.pdf",
            "https://resource.cdn.icai.org/88065bos-aps2233-ch3u2.pdf"
          ],
          units: [
            { name: "Unit 1: Theory of Production", url: "https://resource.cdn.icai.org/88064bos-aps2233-ch3u1.pdf" },
            { name: "Unit 2: Theory of Cost", url: "https://resource.cdn.icai.org/88065bos-aps2233-ch3u2.pdf" }
          ],
          illustrations: [
            { q: "Explain the Law of Variable Proportions.", a: "A short-run production law stating that as more units of a variable input are added to a fixed input, total product increases at an increasing rate, then at a decreasing rate, and finally declines." }
          ]
        },
        {
          id: "f_eco_c4",
          name: "Chapter 4: Price Determination in Different Markets",
          weightage: "High",
          notes: "Analyze types of market structures: perfect competition, monopoly, monopolistic competition, and oligopoly. Study price-output equilibrium decisions.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88066bos-aps2233-ch4u1.pdf",
            "https://resource.cdn.icai.org/88067bos-aps2233-ch4u2.pdf",
            "https://resource.cdn.icai.org/88068bos-aps2233-ch4u3.pdf"
          ],
          units: [
            { name: "Unit 1: Meaning and Types of Markets", url: "https://resource.cdn.icai.org/88066bos-aps2233-ch4u1.pdf" },
            { name: "Unit 2: Determination of Prices", url: "https://resource.cdn.icai.org/88067bos-aps2233-ch4u2.pdf" },
            { name: "Unit 3: Price Output Determination under Different Market Forms", url: "https://resource.cdn.icai.org/88068bos-aps2233-ch4u3.pdf" }
          ],
          illustrations: [
            { q: "What are the characteristics of an Oligopoly?", a: "1. Few sellers. 2. Intense interdependence. 3. Group behavior. 4. Barriers to entry. 5. Kinked demand curve (price rigidity)." }
          ]
        },
        {
          id: "f_eco_c5",
          name: "Chapter 5: Business Cycles",
          weightage: "Medium",
          notes: "Study macroeconomic fluctuation phases: expansion, peak, contraction, and trough, alongside their internal/external causes.",
          pdfUrls: ["https://resource.cdn.icai.org/88069bos-aps2233-ch5.pdf"],
          units: [
            { name: "Chapter 5 Full PDF", url: "https://resource.cdn.icai.org/88069bos-aps2233-ch5.pdf" }
          ],
          illustrations: [
            { q: "What is a recession?", a: "A phase of the business cycle characterized by a general decline in economic activity, falling employment, income, and output lasting for several months." }
          ]
        },
        {
          id: "f_eco_c6",
          name: "Chapter 6: Determination of National Income",
          weightage: "High",
          notes: "National income accounting aggregates (GDP, GNP, NDP, NNP, personal income), and Keynesian 2-sector, 3-sector, and 4-sector income determination models.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88070bos-aps2233-ch6u1.pdf",
            "https://resource.cdn.icai.org/88071bos-aps2233-ch6u2.pdf"
          ],
          units: [
            { name: "Unit 1: National Income Accounting", url: "https://resource.cdn.icai.org/88070bos-aps2233-ch6u1.pdf" },
            { name: "Unit 2: Keynesian Theory of Determination of National Income", url: "https://resource.cdn.icai.org/88071bos-aps2233-ch6u2.pdf" }
          ],
          illustrations: [
            { q: "Differentiate between GDP and GNP.", a: "GDP measures output produced within the country’s borders. GNP measures output produced by the country's residents, including Net Factor Income from Abroad (NFIA)." }
          ]
        },
        {
          id: "f_eco_c7",
          name: "Chapter 7: Public Finance",
          weightage: "High",
          notes: "Study center/state fiscal roles, government intervention policies to address market failures, budget-making steps, and fiscal policies.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88072bos-aps2233-ch7u1.pdf",
            "https://resource.cdn.icai.org/88073bos-aps2233-ch7u2.pdf",
            "https://resource.cdn.icai.org/88074bos-aps2233-ch7u3.pdf",
            "https://resource.cdn.icai.org/88075bos-aps2233-ch7u4.pdf"
          ],
          units: [
            { name: "Unit 1: Fiscal Functions: An Overview, Centre and State Finance", url: "https://resource.cdn.icai.org/88072bos-aps2233-ch7u1.pdf" },
            { name: "Unit 2: Market Failure/ Government intervention to correct Market Failure", url: "https://resource.cdn.icai.org/88073bos-aps2233-ch7u2.pdf" },
            { name: "Unit 3: The Process of Budget Making: Sources of Revenue, Expenditure Management and Management of Public Debt", url: "https://resource.cdn.icai.org/88074bos-aps2233-ch7u3.pdf" },
            { name: "Unit 4: Fiscal Policy", url: "https://resource.cdn.icai.org/88075bos-aps2233-ch7u4.pdf" }
          ],
          illustrations: [
            { q: "What is an externality?", a: "A cost or benefit imposed on a third party who did not choose to incur that cost or benefit, leading to market failure (e.g. pollution as a negative externality)." }
          ]
        },
        {
          id: "f_eco_c8",
          name: "Chapter 8: Money Market",
          weightage: "High",
          notes: "Important theories of money demand (Classical, Keynesian, Friedman), components of money supply (M1, M2, M3, M4), and RBI monetary policy instruments.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88076bos-aps2233-ch8u1.pdf",
            "https://resource.cdn.icai.org/88077bos-aps2233-ch8u2.pdf",
            "https://resource.cdn.icai.org/88078bos-aps2233-ch8u3.pdf"
          ],
          units: [
            { name: "Unit 1: The Concept of Money Demand: Important Theories", url: "https://resource.cdn.icai.org/88076bos-aps2233-ch8u1.pdf" },
            { name: "Unit 2: The Concept of Money Supply", url: "https://resource.cdn.icai.org/88077bos-aps2233-ch8u2.pdf" },
            { name: "Unit 3: Monetary Policy", url: "https://resource.cdn.icai.org/88078bos-aps2233-ch8u3.pdf" }
          ],
          illustrations: [
            { q: "According to Keynes, what are the three motives for holding money?", a: "1. Transactionary motive. 2. Precautionary motive. 3. Speculative motive." }
          ]
        },
        {
          id: "f_eco_c9",
          name: "Chapter 9: International Trade",
          weightage: "High",
          notes: "Theories of trade (Mercantilism, Ricardo, Heckscher-Ohlin), trade instruments (tariffs, quotas), trade agreements, exchange rates, and international capital flows.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88079bos-aps2233-ch9u1.pdf",
            "https://resource.cdn.icai.org/88080bos-aps2233-ch9u2.pdf",
            "https://resource.cdn.icai.org/88081bos-aps2233-ch9u3.pdf",
            "https://resource.cdn.icai.org/88082bos-aps2233-ch9u4.pdf",
            "https://resource.cdn.icai.org/88083bos-aps2233-ch9u5.pdf"
          ],
          units: [
            { name: "Unit 1: Theories of International Trade", url: "https://resource.cdn.icai.org/88079bos-aps2233-ch9u1.pdf" },
            { name: "Unit 2: The Instruments of Trade Policy", url: "https://resource.cdn.icai.org/88080bos-aps2233-ch9u2.pdf" },
            { name: "Unit 3: Trade Negotiations", url: "https://resource.cdn.icai.org/88081bos-aps2233-ch9u3.pdf" },
            { name: "Unit 4: Exchange Rate and Its Economic Effects", url: "https://resource.cdn.icai.org/88082bos-aps2233-ch9u4.pdf" },
            { name: "Unit 5: International Capital Movements", url: "https://resource.cdn.icai.org/88083bos-aps2233-ch9u5.pdf" }
          ],
          illustrations: [
            { q: "What is a tariff?", a: "A tax or duty imposed by a government on imported goods, used to raise revenue and protect domestic industries from foreign competition." }
          ]
        },
        {
          id: "f_eco_c10",
          name: "Chapter 10: Indian Economy",
          weightage: "Medium",
          notes: "Overview of the structural changes in the Indian economy, sectors of growth, key government initiatives, and contemporary challenges.",
          pdfUrls: ["https://resource.cdn.icai.org/88084bos-aps2233-ch10.pdf"],
          units: [
            { name: "Chapter 10 Full PDF", url: "https://resource.cdn.icai.org/88084bos-aps2233-ch10.pdf" }
          ],
          illustrations: [
            { q: "What has been the primary structural shift in India's GDP contribution?", a: "A significant decline in the share of agriculture, with a massive increase in the share of the services (tertiary) sector, which now contributes over 50% of GDP." }
          ]
        },
        {
          id: "f_eco_c11",
          name: "Business Economics Glossary",
          weightage: "Medium",
          notes: "Glossary of high-yield economic definitions, terms, and key acronyms utilized in Board of Studies study guides.",
          pdfUrls: ["https://resource.cdn.icai.org/88085bos-aps2233-gloss.pdf"],
          units: [
            { name: "Economics Glossary Full PDF", url: "https://resource.cdn.icai.org/88085bos-aps2233-gloss.pdf" }
          ],
          illustrations: [
            { q: "Define Stagflation.", a: "An economic state characterized by slow economic growth (stagnation) coupled with relatively high unemployment and rising prices (inflation)." }
          ]
        }
      ]
    }
  ],
  Intermediate: [
    {
      subject: "Paper-1: Advanced Accounting (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/bos-int-p1-may2026-exam",
      chapters: [
        {
          id: "i_acc_c1",
          name: "Chapter 1: Introduction to Accounting Standards",
          weightage: "Medium",
          notes: "Understand the purpose and process of formulating accounting standards, their integration, and transition rules.",
          pdfUrls: ["https://resource.cdn.icai.org/87688bos-aps2158-ch1.pdf"],
          units: [
            { name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/87688bos-aps2158-ch1.pdf" }
          ],
          illustrations: [
            { q: "Why are accounting standards formulated?", a: "To harmonize diverse accounting policies and practices, thereby improving the reliability, comparability, and transparency of financial statements." }
          ]
        },
        {
          id: "i_acc_c2",
          name: "Chapter 2: Framework for Preparation and Presentation of Financial Statements",
          weightage: "Medium",
          notes: "Study qualitative characteristics, elements of financial statements, measurement bases, and capital maintenance concepts.",
          pdfUrls: ["https://resource.cdn.icai.org/87689bos-aps2158-ch2.pdf"],
          units: [
            { name: "Chapter 2 Full PDF", url: "https://resource.cdn.icai.org/87689bos-aps2158-ch2.pdf" }
          ],
          illustrations: [
            { q: "What are the elements of financial statements under the Framework?", a: "Assets, Liabilities, Equity, Income, and Expenses." }
          ]
        },
        {
          id: "i_acc_c3",
          name: "Chapter 3: Applicability of Accounting Standards",
          weightage: "Medium",
          notes: "Check applicability to corporate and non-corporate entities, criteria for classification of entities, and exemptions/relaxations.",
          pdfUrls: ["https://resource.cdn.icai.org/87690bos-aps2158-ch3.pdf"],
          units: [
            { name: "Chapter 3 Full PDF", url: "https://resource.cdn.icai.org/87690bos-aps2158-ch3.pdf" }
          ],
          illustrations: [
            { q: "How are non-corporate entities classified for Accounting Standards applicability?", a: "They are classified into Level I, Level II, Level III, and Level IV based on their turnover, borrowings, and commercial activity thresholds." }
          ]
        },
        {
          id: "i_acc_c4",
          name: "Chapter 4: Presentation & Disclosures Based Accounting Standards",
          weightage: "High",
          notes: "Covers presentation and disclosure requirements: AS-1 (Disclosure of Policies), AS-3 (Cash Flow Statements), AS-17 (Segment Reporting), AS-18 (Related Party Disclosures), AS-20 (Earnings Per Share), AS-24 (Discontinuing Operations), and AS-25 (Interim Financial Reporting).",
          pdfUrls: [
            "https://resource.cdn.icai.org/87691bos-aps2158-ch4u1.pdf",
            "https://resource.cdn.icai.org/87692bos-aps2158-ch4u2.pdf",
            "https://resource.cdn.icai.org/87693bos-aps2158-ch4u3.pdf",
            "https://resource.cdn.icai.org/87694bos-aps2158-ch4u4.pdf",
            "https://resource.cdn.icai.org/87695bos-aps2158-ch4u5.pdf",
            "https://resource.cdn.icai.org/87696bos-aps2158-ch4u6.pdf",
            "https://resource.cdn.icai.org/87697bos-aps2158-ch4u7.pdf"
          ],
          units: [
            { name: "Unit 1: AS 1 Disclosure of Accounting Policies", url: "https://resource.cdn.icai.org/87691bos-aps2158-ch4u1.pdf" },
            { name: "Unit 2: AS 3 Cash Flow Statements", url: "https://resource.cdn.icai.org/87692bos-aps2158-ch4u2.pdf" },
            { name: "Unit 3: AS 17 Segment Reporting", url: "https://resource.cdn.icai.org/87693bos-aps2158-ch4u3.pdf" },
            { name: "Unit 4: AS 18 Related Party Disclosures", url: "https://resource.cdn.icai.org/87694bos-aps2158-ch4u4.pdf" },
            { name: "Unit 5: AS 20 Earnings Per Share", url: "https://resource.cdn.icai.org/87695bos-aps2158-ch4u5.pdf" },
            { name: "Unit 6: AS 24 Discontinuing Operations", url: "https://resource.cdn.icai.org/87696bos-aps2158-ch4u6.pdf" },
            { name: "Unit 7: AS 25 Interim Financial Reporting", url: "https://resource.cdn.icai.org/87697bos-aps2158-ch4u7.pdf" }
          ],
          illustrations: [
            { q: "Under AS 20, how is basic Earnings Per Share calculated?", a: "Basic EPS = Net Profit or Loss for the period attributable to ordinary shareholders / Weighted average number of ordinary shares outstanding during the period." }
          ]
        },
        {
          id: "i_acc_c5",
          name: "Chapter 5: Assets Based Accounting Standards",
          weightage: "High",
          notes: "Examine asset valuation, recognition, and impairment: AS-2 (Inventories), AS-10 (Property, Plant and Equipment), AS-13 (Accounting for Investments), AS-16 (Borrowing Costs), AS-19 (Leases), AS-26 (Intangible Assets), and AS-28 (Impairment of Assets).",
          pdfUrls: [
            "https://resource.cdn.icai.org/87702bos-aps2158-ch5u1.pdf",
            "https://resource.cdn.icai.org/87703bos-aps2158-ch5u2.pdf",
            "https://resource.cdn.icai.org/87704bos-aps2158-ch5u3.pdf",
            "https://resource.cdn.icai.org/87705bos-aps2158-ch5u4.pdf",
            "https://resource.cdn.icai.org/87706bos-aps2158-ch5u5.pdf",
            "https://resource.cdn.icai.org/87707bos-aps2158-ch5u6.pdf",
            "https://resource.cdn.icai.org/87708bos-aps2158-ch5u7.pdf"
          ],
          units: [
            { name: "Unit 1: AS 2 Valuation of Inventories", url: "https://resource.cdn.icai.org/87702bos-aps2158-ch5u1.pdf" },
            { name: "Unit 2: AS 10 Property, Plant and Equipment", url: "https://resource.cdn.icai.org/87703bos-aps2158-ch5u2.pdf" },
            { name: "Unit 3: AS 13 Accounting for Investments", url: "https://resource.cdn.icai.org/87704bos-aps2158-ch5u3.pdf" },
            { name: "Unit 4: AS 16 Borrowing Costs", url: "https://resource.cdn.icai.org/87705bos-aps2158-ch5u4.pdf" },
            { name: "Unit 5: AS 19 Leases", url: "https://resource.cdn.icai.org/87706bos-aps2158-ch5u5.pdf" },
            { name: "Unit 6: AS 26 Intangible Assets", url: "https://resource.cdn.icai.org/87707bos-aps2158-ch5u6.pdf" },
            { name: "Unit 7: AS 28 Impairment of Assets", url: "https://resource.cdn.icai.org/87708bos-aps2158-ch5u7.pdf" }
          ],
          illustrations: [
            { q: "Under AS 16, what are qualifying assets?", a: "An asset that necessarily takes a substantial period of time to get ready for its intended use or sale." }
          ]
        },
        {
          id: "i_acc_c6",
          name: "Chapter 6: Liabilities Based Accounting Standards",
          weightage: "Medium",
          notes: "Study liabilities standards: AS-15 (Employee Benefits) and AS-29 (Provisions, Contingent Liabilities and Contingent Assets).",
          pdfUrls: [
            "https://resource.cdn.icai.org/87709bos-aps2158-ch6u1.pdf",
            "https://resource.cdn.icai.org/87710bos-aps2158-ch6u2.pdf"
          ],
          units: [
            { name: "Unit 1: AS 15 Employee Benefits", url: "https://resource.cdn.icai.org/87709bos-aps2158-ch6u1.pdf" },
            { name: "Unit 2: AS 29 Provisions, Contingent Liabilities and Contingent Assets", url: "https://resource.cdn.icai.org/87710bos-aps2158-ch6u2.pdf" }
          ],
          illustrations: [
            { q: "What is the criteria for recognizing a provision under AS 29?", a: "A provision should be recognized when: (a) an enterprise has a present obligation as a result of a past event; (b) it is probable that an outflow of resources embodying economic benefits will be required to settle the obligation; and (c) a reliable estimate can be made of the amount of the obligation." }
          ]
        },
        {
          id: "i_acc_c7",
          name: "Chapter 7: Accounting Standards Based on Items Impacting Financial Statement",
          weightage: "Medium",
          notes: "Covers AS-4 (Contingencies and Events Occurring After Balance Sheet Date), AS-5 (Net Profit or Loss, Prior Period Items and Changes in Policies), AS-11 (Effects of Changes in Foreign Exchange Rates), and AS-22 (Accounting for Taxes on Income).",
          pdfUrls: [
            "https://resource.cdn.icai.org/87711bos-aps2158-ch7u1.pdf",
            "https://resource.cdn.icai.org/87712bos-aps2158-ch7u2.pdf",
            "https://resource.cdn.icai.org/87713bos-aps2158-ch7u3.pdf",
            "https://resource.cdn.icai.org/87714bos-aps2158-ch7u4.pdf"
          ],
          units: [
            { name: "Unit 1: AS 4 Contingencies and Events Occurring After the Balance Sheet Date", url: "https://resource.cdn.icai.org/87711bos-aps2158-ch7u1.pdf" },
            { name: "Unit 2: AS 5 Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies", url: "https://resource.cdn.icai.org/87712bos-aps2158-ch7u2.pdf" },
            { name: "Unit 3: AS 11 The Effects of Changes in Foreign Exchange Rates", url: "https://resource.cdn.icai.org/87713bos-aps2158-ch7u3.pdf" },
            { name: "Unit 4: AS 22 Accounting for Taxes on Income", url: "https://resource.cdn.icai.org/87714bos-aps2158-ch7u4.pdf" }
          ],
          illustrations: [
            { q: "Explain the difference between deferred tax asset and deferred tax liability.", a: "Deferred Tax Liabilities (DTL) represent tax obligations that are postponed to future periods due to temporary timing differences. Deferred Tax Assets (DTA) represent taxes prepaid or carried forward due to differences that will reverse, subject to reasonable/virtual certainty of future taxable profits." }
          ]
        },
        {
          id: "i_acc_c8",
          name: "Chapter 8: Revenue Based Accounting Standards",
          weightage: "High",
          notes: "Study AS-7 (Construction Contracts) and AS-9 (Revenue Recognition).",
          pdfUrls: [
            "https://resource.cdn.icai.org/87715bos-aps2158-ch8u1.pdf",
            "https://resource.cdn.icai.org/87716bos-aps2158-ch8u2.pdf"
          ],
          units: [
            { name: "Unit 1: AS 7 Construction Contracts", url: "https://resource.cdn.icai.org/87715bos-aps2158-ch8u1.pdf" },
            { name: "Unit 2: AS 9 Revenue Recognition", url: "https://resource.cdn.icai.org/87716bos-aps2158-ch8u2.pdf" }
          ],
          illustrations: [
            { q: "Under AS 9, when is revenue from sale of goods recognized?", a: "Revenue from sale of goods should be recognized when the seller has transferred the significant risks and rewards of ownership to the buyer, and no significant uncertainty exists regarding the amount of consideration or its collectibility." }
          ]
        },
        {
          id: "i_acc_c9",
          name: "Chapter 9: Other Accounting Standards",
          weightage: "Medium",
          notes: "Study AS-12 (Accounting for Government Grants) and AS-14 (Accounting for Amalgamations).",
          pdfUrls: [
            "https://resource.cdn.icai.org/87717bos-aps2158-ch9u1.pdf",
            "https://resource.cdn.icai.org/87718bos-aps2158-ch9u2.pdf"
          ],
          units: [
            { name: "Unit 1: AS 12 Accounting for Government Grants", url: "https://resource.cdn.icai.org/87717bos-aps2158-ch9u1.pdf" },
            { name: "Unit 2: AS 14 Accounting for Amalgamations", url: "https://resource.cdn.icai.org/87718bos-aps2158-ch9u2.pdf" }
          ],
          illustrations: [
            { q: "What are the two types of amalgamations under AS 14?", a: "1. Amalgamation in the nature of merger (using the pooling of interest method). 2. Amalgamation in the nature of purchase (using the purchase method)." }
          ]
        },
        {
          id: "i_acc_c10",
          name: "Chapter 10: Accounting Standards for Consolidated Financial Statement",
          weightage: "High",
          notes: "Study group level financials: AS-21 (Consolidated Financial Statements), AS-23 (Accounting for Investments in Associates in CFS), and AS-27 (Financial Reporting of Interests in Joint Ventures).",
          pdfUrls: [
            "https://resource.cdn.icai.org/87719bos-aps2158-ch10u1.pdf",
            "https://resource.cdn.icai.org/87720bos-aps2158-ch10u2.pdf",
            "https://resource.cdn.icai.org/87721bos-aps2158-ch10u3.pdf"
          ],
          units: [
            { name: "Unit 1: AS 21 Consolidated Financial Statements", url: "https://resource.cdn.icai.org/87719bos-aps2158-ch10u1.pdf" },
            { name: "Unit 2: AS 23 Accounting for Investments in Associates in Consolidated Financial Statements", url: "https://resource.cdn.icai.org/87720bos-aps2158-ch10u2.pdf" },
            { name: "Unit 3: AS 27 Financial Reporting of Interests in Joint Ventures", url: "https://resource.cdn.icai.org/87721bos-aps2158-ch10u3.pdf" }
          ],
          illustrations: [
            { q: "What is Minority Interest under AS 21?", a: "Minority Interest is that part of the net results of operations and of net assets of a subsidiary attributable to interests which are not owned, directly or indirectly through subsidiaries, by the parent." }
          ]
        },
        {
          id: "i_acc_c11",
          name: "Chapter 11: Financial Statements of Companies",
          weightage: "High",
          notes: "Master the preparation of corporate financial statements under Schedule III of the Companies Act, 2013 (Balance Sheet, Statement of Profit and Loss) and Cash Flow Statements.",
          pdfUrls: [
            "https://resource.cdn.icai.org/87723bos-aps2158-ch11u1.pdf",
            "https://resource.cdn.icai.org/87724bos-aps2158-ch11u2.pdf",
            "https://resource.cdn.icai.org/87722bos-aps2158-ch11-annex.pdf"
          ],
          units: [
            { name: "Unit 1: Preparation of Financial Statements of Companies", url: "https://resource.cdn.icai.org/87723bos-aps2158-ch11u1.pdf" },
            { name: "Unit 2: Cash Flow Statement", url: "https://resource.cdn.icai.org/87724bos-aps2158-ch11u2.pdf" },
            { name: "Annexure", url: "https://resource.cdn.icai.org/87722bos-aps2158-ch11-annex.pdf" }
          ],
          illustrations: [
            { q: "Under Schedule III, how are current assets distinguished from non-current assets?", a: "Current assets are those expected to be realized or consumed within the entity's normal operating cycle, or within 12 months after the reporting date." }
          ]
        },
        {
          id: "i_acc_c12",
          name: "Chapter 12: Buyback of Securities",
          weightage: "Medium",
          notes: "Analyze conditions, limits, sources, and accounting entries for buyback of equity shares and creation of Capital Redemption Reserve (CRR).",
          pdfUrls: ["https://resource.cdn.icai.org/87725bos-aps2158-ch12.pdf"],
          units: [
            { name: "Chapter 12 Full PDF", url: "https://resource.cdn.icai.org/87725bos-aps2158-ch12.pdf" }
          ],
          illustrations: [
            { q: "What is the maximum limit of buyback under Section 68 of the Companies Act, 2013?", a: "The buyback of equity shares in any financial year cannot exceed 25% of the total paid-up equity capital and free reserves of the company." }
          ]
        },
        {
          id: "i_acc_c13",
          name: "Chapter 13: Amalgamation of Companies",
          weightage: "High",
          notes: "Perform advanced amalgamation accounting, calculate purchase consideration, journalize transferor and transferee company entries, and prepare post-amalgamation Balance Sheets.",
          pdfUrls: ["https://resource.cdn.icai.org/87726bos-aps2158-ch13.pdf"],
          units: [
            { name: "Chapter 13 Full PDF", url: "https://resource.cdn.icai.org/87726bos-aps2158-ch13.pdf" }
          ],
          illustrations: [
            { q: "How is Purchase Consideration calculated under the Net Assets Method?", a: "It is the sum of agreed values of assets taken over by the purchasing company less agreed values of liabilities taken over." }
          ]
        },
        {
          id: "i_acc_c14",
          name: "Chapter 14: Internal Reconstruction",
          weightage: "High",
          notes: "Understand capital reduction schemes, legal requirements, creation of Capital Reduction Account, and internal restructuring accounting entries.",
          pdfUrls: ["https://resource.cdn.icai.org/87727bos-aps2158-ch14.pdf"],
          units: [
            { name: "Chapter 14 Full PDF", url: "https://resource.cdn.icai.org/87727bos-aps2158-ch14.pdf" }
          ],
          illustrations: [
            { q: "What is the accounting treatment for the balance left in the Capital Reconstruction Account?", a: "Any credit balance remaining in the Capital Reduction / Reconstruction Account after writing off accumulated losses and fictitious assets is transferred to the Capital Reserve Account." }
          ]
        },
        {
          id: "i_acc_c15",
          name: "Chapter 15: Accounting for Branches including Foreign Branches",
          weightage: "High",
          notes: "Study independent and dependent branches, branch adjustments, reconciliation, and foreign branch translation techniques under AS-11.",
          pdfUrls: ["https://resource.cdn.icai.org/87728bos-aps2158-ch15.pdf"],
          units: [
            { name: "Chapter 15 Full PDF", url: "https://resource.cdn.icai.org/87728bos-aps2158-ch15.pdf" }
          ],
          illustrations: [
            { q: "How are integral and non-integral foreign branches translated under AS 11?", a: "Integral foreign operations are translated as if the transactions were carried out by the reporting enterprise itself (historical rates for fixed assets, actual rates for transactions). Non-integral foreign operations translate assets/liabilities at closing rate, and income/expenses at average rate during the period." }
          ]
        }
      ]
    },
    {
      subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/sm-inter-p2-may2026",
      chapters: [
        {
          id: "i_law_c1",
          name: "Chapter 1: Preliminary",
          weightage: "Medium",
          notes: "Study key statutory definitions under Section 2, the concept of a company, and classification of companies (public, private, one person company, small company, holding/subsidiary, associate, etc.).",
          pdfUrls: ["https://resource.cdn.icai.org/87769bos-aps2160-ch1.pdf"],
          units: [
            { name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/87769bos-aps2160-ch1.pdf" }
          ],
          illustrations: [
            { q: "Define a Small Company under the Companies Act, 2013.", a: "Under Section 2(85), a small company is a private company whose: (i) paid-up share capital does not exceed ₹4 crores, and (ii) turnover does not exceed ₹40 crores. However, holding/subsidiary companies, Section 8 companies, and companies governed by special acts cannot qualify as small companies." }
          ]
        },
        {
          id: "i_law_c2",
          name: "Chapter 2: Incorporation of Company and Matters Incidental Thereto",
          weightage: "High",
          notes: "Analyze the incorporation process, promoter liabilities, Memorandum of Association (MOA) and Articles of Association (AOA) provisions, Doctrine of Ultra Vires, Doctrine of Constructive Notice, and Doctrine of Indoor Management.",
          pdfUrls: ["https://resource.cdn.icai.org/87770bos-aps2160-ch2.pdf"],
          units: [
            { name: "Chapter 2 Full PDF", url: "https://resource.cdn.icai.org/87770bos-aps2160-ch2.pdf" }
          ],
          illustrations: [
            { q: "Explain the Doctrine of Indoor Management.", a: "It protects outsiders dealing with a company. It states that while outsiders are deemed to have constructive notice of public documents (MOA/AOA), they are not bound to inquire into the regularity of internal corporate procedures." }
          ]
        },
        {
          id: "i_law_c3",
          name: "Chapter 3: Prospectus and Allotment of Securities",
          weightage: "High",
          notes: "Deals with public offering and private placement rules, contents of prospectus, deemed prospectus, shelf prospectus, red herring prospectus, and civil/criminal liability for misstatements in a prospectus.",
          pdfUrls: ["https://resource.cdn.icai.org/87771bos-aps2160-ch3.pdf"],
          units: [
            { name: "Chapter 3 Full PDF", url: "https://resource.cdn.icai.org/87771bos-aps2160-ch3.pdf" }
          ],
          illustrations: [
            { q: "What is a Red Herring Prospectus?", a: "A prospectus which does not include complete particulars of the quantum or price of the securities included therein, typically issued during an IPO before the final price band is determined." }
          ]
        },
        {
          id: "i_law_c4",
          name: "Chapter 4: Share Capital and Debentures",
          weightage: "High",
          notes: "Master share capital concepts: equity and preference shares, voting rights, issue of shares at premium or discount, sweat equity, rights and bonus issues, reduction of share capital, and rules for issuing debentures.",
          pdfUrls: ["https://resource.cdn.icai.org/87772bos-aps2160-ch4.pdf"],
          units: [
            { name: "Chapter 4 Full PDF", url: "https://resource.cdn.icai.org/87772bos-aps2160-ch4.pdf" }
          ],
          illustrations: [
            { q: "Can a company issue shares at a discount?", a: "Under Section 53 of the Companies Act, 2013, a company is prohibited from issuing shares at a discount, rendering any such issue void ab initio. The only exception is sweat equity shares issued under Section 54." }
          ]
        },
        {
          id: "i_law_c5",
          name: "Chapter 5: Acceptance of Deposits by Companies",
          weightage: "Medium",
          notes: "Examine the conditions under Section 73 to 76 for accepting deposits from members and the public, creation of security, deposit insurance, and Deposit Repayment Reserve.",
          pdfUrls: ["https://resource.cdn.icai.org/87773bos-aps2160-ch5.pdf"],
          units: [
            { name: "Chapter 5 Full PDF", url: "https://resource.cdn.icai.org/87773bos-aps2160-ch5.pdf" }
          ],
          illustrations: [
            { q: "What is the maximum limit of deposits an eligible public company can accept from the public?", a: "An eligible public company can accept deposits from the public up to 25% of the aggregate of its paid-up share capital, free reserves, and securities premium account, in addition to 10% from its members." }
          ]
        },
        {
          id: "i_law_c6",
          name: "Chapter 6: Registration of Charges",
          weightage: "Medium",
          notes: "Understand the requirement to register charges under Section 77, consequences of non-registration, register of charges, and condonation of delay.",
          pdfUrls: ["https://resource.cdn.icai.org/87774bos-aps2160-ch6.pdf"],
          units: [
            { name: "Chapter 6 Full PDF", url: "https://resource.cdn.icai.org/87774bos-aps2160-ch6.pdf" }
          ],
          illustrations: [
            { q: "What is the time limit for registering a charge with the Registrar?", a: "A charge must be registered within 30 days of its creation under Section 77. The Registrar may allow registration within an additional 30 days on payment of additional fees." }
          ]
        },
        {
          id: "i_law_c7",
          name: "Chapter 7: Management & Administration",
          weightage: "High",
          notes: "Covers registers of members and debenture-holders, annual returns, statutory requirements for holding Annual General Meetings (AGM) and Extraordinary General Meetings (EGM), notice of meetings, quorum, proxies, voting, and resolutions.",
          pdfUrls: ["https://resource.cdn.icai.org/87776bos-aps2160-ch7.pdf"],
          units: [
            { name: "Chapter 7 Full PDF", url: "https://resource.cdn.icai.org/87776bos-aps2160-ch7.pdf" }
          ],
          illustrations: [
            { q: "What is the quorum requirement for a public company AGM?", a: "Under Section 103, the quorum for a public company AGM depends on the number of members: (i) 5 members personally present if members <= 1000, (ii) 15 members if members are between 1001 and 5000, and (iii) 30 members if members > 5000." }
          ]
        },
        {
          id: "i_law_c8",
          name: "Chapter 8: Declaration and Payment of Dividend",
          weightage: "Medium",
          notes: "Study source of dividends, declaration out of reserves, interim dividend, Unpaid Dividend Account (UDA) rules, and transfer of shares/funds to the Investor Education and Protection Fund (IEPF).",
          pdfUrls: ["https://resource.cdn.icai.org/87777bos-aps2160-ch8.pdf"],
          units: [
            { name: "Chapter 8 Full PDF", url: "https://resource.cdn.icai.org/87777bos-aps2160-ch8.pdf" }
          ],
          illustrations: [
            { q: "Within how many days of declaration must a dividend be paid?", a: "A dividend must be paid or the warrant posted within 30 days of declaration. Unpaid dividends must be transferred to the Unpaid Dividend Account within 7 days after the 30-day period." }
          ]
        },
        {
          id: "i_law_c9",
          name: "Chapter 9: Accounts of Companies",
          weightage: "High",
          notes: "Review requirements for books of accounts, financial statements, consolidation of accounts, Corporate Social Responsibility (CSR) applicability, Board's report, internal audit, and reopening of accounts.",
          pdfUrls: ["https://resource.cdn.icai.org/87778bos-aps2160-ch9.pdf"],
          units: [
            { name: "Chapter 9 Full PDF", url: "https://resource.cdn.icai.org/87778bos-aps2160-ch9.pdf" }
          ],
          illustrations: [
            { q: "Which companies are required to constitute a CSR Committee?", a: "Under Section 135(1), every company having: (i) a net worth of ₹500 crores or more, or (ii) a turnover of ₹1000 crores or more, or (iii) a net profit of ₹5 crores or more during any financial year must constitute a CSR Committee." }
          ]
        },
        {
          id: "i_law_c10",
          name: "Chapter 10: Audit and Auditors",
          weightage: "High",
          notes: "Analyze rules for appointment, rotation, removal, and resignation of auditors, qualification and disqualification criteria, powers and duties of auditors, auditing standards, and reporting of fraud.",
          pdfUrls: ["https://resource.cdn.icai.org/87779bos-aps2160-ch10.pdf"],
          units: [
            { name: "Chapter 10 Full PDF", url: "https://resource.cdn.icai.org/87779bos-aps2160-ch10.pdf" }
          ],
          illustrations: [
            { q: "What is the disqualification criteria for an auditor regarding indebtedness?", a: "Under Section 141(3)(d)(ii), a person is disqualified from being appointed as an auditor of a company if they, their partner, or relative is indebted to the company, its holding, subsidiary, or associate company, for an amount exceeding ₹5 lakhs." }
          ]
        },
        {
          id: "i_law_c11",
          name: "Chapter 11: Companies Incorporated Outside India",
          weightage: "Medium",
          notes: "Study application of Act to foreign companies, definitions, requirements as to prospectus, books of account, and service of documents.",
          pdfUrls: ["https://resource.cdn.icai.org/87780bos-aps2160-ch11.pdf"],
          units: [
            { name: "Chapter 11 Full PDF", url: "https://resource.cdn.icai.org/87780bos-aps2160-ch11.pdf" }
          ],
          illustrations: [
            { q: "Define a Foreign Company under the Companies Act, 2013.", a: "Under Section 2(42), a foreign company is any company or body corporate incorporated outside India which: (a) has a place of business in India whether by itself or through an agent, physically or electronically; and (b) conducts any business activity in India in any other manner." }
          ]
        },
        {
          id: "i_law_c12",
          name: "Chapter 12: The Limited Liability Partnership Act, 2008",
          weightage: "High",
          notes: "Master Limited Liability Partnership (LLP) features, differences from corporate and partnership entities, registration and incorporation process, partners and their relations, financial disclosures, and winding up procedures.",
          pdfUrls: ["https://resource.cdn.icai.org/87782bos-aps2160-ch12.pdf"],
          units: [
            { name: "Chapter 12 Full PDF", url: "https://resource.cdn.icai.org/87782bos-aps2160-ch12.pdf" }
          ],
          illustrations: [
            { q: "How is an LLP different from a traditional partnership firm regarding liability?", a: "In an LLP, the liability of each partner is limited to their agreed contribution except in case of fraud, and no partner is liable for the independent or unauthorized actions of other partners. In a traditional partnership, partners have unlimited joint and several liability." }
          ]
        },
        {
          id: "i_law_c13",
          name: "Chapter 13: The General Clauses Act, 1897",
          weightage: "High",
          notes: "Learn statutory interpretation definitions, general rules of construction, powers and functionaries, and provisions as to orders, rules, and bye-laws made under enactments.",
          pdfUrls: ["https://resource.cdn.icai.org/87784bos-aps2160-p2-ch1.pdf"],
          units: [
            { name: "Chapter 13 Full PDF", url: "https://resource.cdn.icai.org/87784bos-aps2160-p2-ch1.pdf" }
          ],
          illustrations: [
            { q: "What is the purpose of the General Clauses Act, 1897?", a: "To shorten the language of Central Acts, to provide standard definitions for common terms, and to establish general rules of construction and interpretation in the absence of specific provisions in an enactment." }
          ]
        },
        {
          id: "i_law_c14",
          name: "Chapter 14: Interpretation of Statutes",
          weightage: "High",
          notes: "Understand the primary rules of interpretation (literal, reasonable, harmonious construction, mischief rule, golden rule), secondary rules, internal aids to construction (preamble, definitions, headings), and external aids (dictionaries, parliamentary history).",
          pdfUrls: ["https://resource.cdn.icai.org/87785bos-aps2160-p2-ch2.pdf"],
          units: [
            { name: "Chapter 14 Full PDF", url: "https://resource.cdn.icai.org/87785bos-aps2160-p2-ch2.pdf" }
          ],
          illustrations: [
            { q: "Explain the Rule of Harmonious Construction.", a: "It states that when two or more provisions of a statute appear to conflict, they should be interpreted so that effect is given to both, and the two provisions are reconciled rather than allowing one to destroy the other." }
          ]
        },
        {
          id: "i_law_c15",
          name: "Chapter 15: The Foreign Exchange Management Act, 1999",
          weightage: "High",
          notes: "Examine FEMA objectives, definitions of resident/non-resident, current account and capital account transactions, foreign exchange holdings, and enforcement/penalties.",
          pdfUrls: ["https://resource.cdn.icai.org/87786bos-aps2160-p2-ch3.pdf"],
          units: [
            { name: "Chapter 15 Full PDF", url: "https://resource.cdn.icai.org/87786bos-aps2160-p2-ch3.pdf" }
          ],
          illustrations: [
            { q: "Differentiate between Current Account Transactions and Capital Account Transactions under FEMA.", a: "Current Account Transactions (Section 5) are those which do not alter the assets or liabilities (including contingent liabilities) outside India of a person resident in India. Capital Account Transactions (Section 6) are those which do alter such assets or liabilities outside India, or assets/liabilities in India of a person resident outside India." }
          ]
        }
      ]
    },
    {
      subject: "Paper-3A: Income-tax Law (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/bos-int-course-p3-taxation",
      chapters: [
        {
          id: "i_tax_c1",
          name: "Chapter 1: Basic Concepts",
          weightage: "Medium",
          notes: "Income tax chargeability, assessment year vs previous year, slab rates, surcharge, health and education cess.",
          pdfUrls: ["https://resource.cdn.icai.org/87284bos-aps1794-m1-ch1.pdf"],
          units: [
            { name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/87284bos-aps1794-m1-ch1.pdf" }
          ],
          illustrations: [
            { q: "Differentiate Assessment Year and Previous Year.", a: "Previous Year is the financial year in which income is earned. Assessment Year is the succeeding financial year in which that income is assessed and taxed." }
          ]
        },
        {
          id: "i_tax_c2",
          name: "Chapter 2: Residence and Scope of Total Income",
          weightage: "High",
          notes: "Determining residential status (ROR, RNOR, NR) based on physical stay (182 days or 60 days + 365 days).",
          pdfUrls: ["https://resource.cdn.icai.org/87285bos-aps1794-m1-ch2.pdf"],
          units: [
            { name: "Chapter 2 Full PDF", url: "https://resource.cdn.icai.org/87285bos-aps1794-m1-ch2.pdf" }
          ],
          illustrations: [
            { q: "What is the primary condition for an individual to become a Resident?", a: "Stay in India for 182 days or more during the relevant previous year." }
          ]
        },
        {
          id: "i_tax_c3",
          name: "Chapter 3: Heads of Income - Unit 1: Salaries",
          weightage: "High",
          notes: "Allowances, perquisites, retirement benefits (Gratuity, Pension, Leave Encashment) and deductions under Sec 16.",
          pdfUrls: ["https://resource.cdn.icai.org/87286bos-aps1794-m1-ch3u1.pdf"],
          units: [
            { name: "Unit 1: Salaries PDF", url: "https://resource.cdn.icai.org/87286bos-aps1794-m1-ch3u1.pdf" }
          ],
          illustrations: [
            { q: "What is the standard deduction allowed under Income from Salaries?", a: "A standard deduction of ₹50,000 is allowed under Section 16(ia)." }
          ]
        },
        {
          id: "i_tax_c4",
          name: "Chapter 3: Heads of Income - Unit 2: Income from House Property",
          weightage: "Medium",
          notes: "Determine annual value, self-occupied vs let out properties, deductions under Section 24 (standard deduction of 30% and interest on borrowed capital).",
          pdfUrls: ["https://resource.cdn.icai.org/87287bos-aps1794-m1-ch3u2.pdf"],
          units: [
            { name: "Unit 2: House Property PDF", url: "https://resource.cdn.icai.org/87287bos-aps1794-m1-ch3u2.pdf" }
          ],
          illustrations: [
            { q: "What is the maximum deduction allowed for interest on loan for a self-occupied property?", a: "A maximum of ₹2,00,000 is allowed under Section 24(b) if the loan is taken for acquisition or construction after 1st April 1999 and completed within 5 years." }
          ]
        },
        {
          id: "i_tax_c5",
          name: "Chapter 3: Heads of Income - Unit 3: Profits and Gains of Business or Profession",
          weightage: "High",
          notes: "Study business deductions, depreciation rules under Section 32, presumptive taxation (Sec 44AD, 44ADA, 44AE), and disallowed expenses.",
          pdfUrls: ["https://resource.cdn.icai.org/87288bos-aps1794-m1-ch3u3.pdf"],
          units: [
            { name: "Unit 3: PGBP PDF", url: "https://resource.cdn.icai.org/87288bos-aps1794-m1-ch3u3.pdf" }
          ],
          illustrations: [
            { q: "Explain the presumptive taxation scheme for professionals under Section 44ADA.", a: "It applies to resident professionals whose gross receipts do not exceed ₹50 lakhs (or ₹75 lakhs if cash receipts <= 5%). Presumptive profit is calculated at 50% of gross receipts." }
          ]
        },
        {
          id: "i_tax_c6",
          name: "Chapter 3: Heads of Income - Unit 4: Capital Gains",
          weightage: "High",
          notes: "Understand short-term and long-term capital assets, transfer definitions, cost inflation index, and exemptions under Section 54, 54EC, and 54F.",
          pdfUrls: ["https://resource.cdn.icai.org/87289bos-aps1794-m1-ch3u4.pdf"],
          units: [
            { name: "Unit 4: Capital Gains PDF", url: "https://resource.cdn.icai.org/87289bos-aps1794-m1-ch3u4.pdf" }
          ],
          illustrations: [
            { q: "What is the holding period criteria for shares to be classified as long-term capital assets?", a: "Listed equity shares are classified as long-term if held for more than 12 months. Unlisted shares and immovable property require more than 24 months." }
          ]
        },
        {
          id: "i_tax_c7",
          name: "Chapter 3: Heads of Income - Unit 5: Income from Other Sources",
          weightage: "Medium",
          notes: "Covers residual incomes: dividend income, casual incomes (lotteries, betting), gift taxation rules under Section 56(2)(x), and interest on securities.",
          pdfUrls: ["https://resource.cdn.icai.org/87290bos-aps1794-m1-ch3u5.pdf"],
          units: [
            { name: "Unit 5: Other Sources PDF", url: "https://resource.cdn.icai.org/87290bos-aps1794-m1-ch3u5.pdf" }
          ],
          illustrations: [
            { q: "What is the tax treatment of gifts received by an individual under Section 56(2)(x)?", a: "Gifts of sum of money or property without consideration are fully taxable if the aggregate fair value exceeds ₹50,000 in a financial year, subject to exemptions for relatives, marriage, etc." }
          ]
        },
        {
          id: "i_tax_c8",
          name: "Chapter 4: Income of Other Persons included in Assessee's Total Income",
          weightage: "Medium",
          notes: "Clubbing of income: transfer of income without asset transfer, revocable transfer, spouse income, minor child income, and cross transfers.",
          pdfUrls: ["https://resource.cdn.icai.org/87171bos-aps1794-ch4.pdf"],
          units: [
            { name: "Chapter 4 Full PDF", url: "https://resource.cdn.icai.org/87171bos-aps1794-ch4.pdf" }
          ],
          illustrations: [
            { q: "Whose hands is a minor child's income clubbed under?", a: "A minor's income is clubbed with the parent whose total income (before this clubbing) is higher, subject to a ₹1,500 exemption per child under Section 10(32)." }
          ]
        },
        {
          id: "i_tax_c9",
          name: "Chapter 5: Aggregation of Income, Set-Off and Carry Forward of Losses",
          weightage: "High",
          notes: "Understand intra-head and inter-head set-off of losses, speculative losses, capital losses, and rules for carrying forward unabsorbed losses.",
          pdfUrls: ["https://resource.cdn.icai.org/87172bos-aps1794-ch5.pdf"],
          units: [
            { name: "Chapter 5 Full PDF", url: "https://resource.cdn.icai.org/87172bos-aps1794-ch5.pdf" }
          ],
          illustrations: [
            { q: "Can long-term capital losses be set off against short-term capital gains?", a: "No, under Section 70/74, long-term capital losses can only be set off against long-term capital gains. However, short-term capital losses can be set off against both short-term and long-term gains." }
          ]
        },
        {
          id: "i_tax_c10",
          name: "Chapter 6: Deductions from Gross Total Income",
          weightage: "High",
          notes: "Master Chapter VI-A deductions: Section 80C, 80CCC, 80CCD, 80D (health insurance), 80DD, 80E (education loan), 80G (donations), 80TTA/TTB, and 80U.",
          pdfUrls: ["https://resource.cdn.icai.org/87173bos-aps1794-ch6.pdf"],
          units: [
            { name: "Chapter 6 Full PDF", url: "https://resource.cdn.icai.org/87173bos-aps1794-ch6.pdf" }
          ],
          illustrations: [
            { q: "What is the maximum deduction limit under Section 80D for medical insurance of parents?", a: "₹25,000 for parents who are not senior citizens, and ₹50,000 if the parents are senior citizens (aged 60 years or more)." }
          ]
        },
        {
          id: "i_tax_c11",
          name: "Chapter 7: Advance Tax, Tax Deduction at Source and Tax Collection at Source",
          weightage: "High",
          notes: "TDS rates and provisions (Sec 192, 194C, 194J, 194I), TCS provisions, and advance tax installments and interest under Sec 234A/B/C.",
          pdfUrls: ["https://resource.cdn.icai.org/87174bos-aps1794-ch7.pdf"],
          units: [
            { name: "Chapter 7 Full PDF", url: "https://resource.cdn.icai.org/87174bos-aps1794-ch7.pdf" }
          ],
          illustrations: [
            { q: "What is the threshold and rate for TDS on professional services under Section 194J?", a: "TDS is deducted at 10% (or 2% for technical services) if the aggregate fees exceed ₹30,000 in a financial year." }
          ]
        },
        {
          id: "i_tax_c12",
          name: "Chapter 8: Provisions for filing Return of Income and Self Assessment",
          weightage: "Medium",
          notes: "Due dates for filing returns under Section 139(1), permanent account number (PAN), Aadhaar linking, belated return, revised return, and tax return preparers.",
          pdfUrls: ["https://resource.cdn.icai.org/87175bos-aps1794-ch8.pdf"],
          units: [
            { name: "Chapter 8 Full PDF", url: "https://resource.cdn.icai.org/87175bos-aps1794-ch8.pdf" }
          ],
          illustrations: [
            { q: "What is the due date of filing Income Tax Return (ITR) for an individual not subject to audit?", a: "The due date is 31st July of the assessment year under Section 139(1)." }
          ]
        },
        {
          id: "i_tax_c13",
          name: "Chapter 9: Income Tax Liability - Computation and Optimisation",
          weightage: "High",
          notes: "Compute total income, calculate tax liability under default tax regime (Sec 115BAC) and optional old regime, rebate under Sec 87A, and health/education cess.",
          pdfUrls: ["https://resource.cdn.icai.org/87176bos-aps1794-ch9.pdf"],
          units: [
            { name: "Chapter 9 Full PDF", url: "https://resource.cdn.icai.org/87176bos-aps1794-ch9.pdf" }
          ],
          illustrations: [
            { q: "What is the maximum tax rebate allowed under Section 87A for individuals under the default tax regime?", a: "Under Section 115BAC, a rebate of up to ₹25,000 (tax on income up to ₹7,000,000) is allowed under the default tax regime if total income does not exceed ₹7 lakhs." }
          ]
        }
      ]
    },
    {
      subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/sm-intermediate-paper3-secb-may26",
      chapters: [
        {
          id: "i_tax_c14",
          name: "Chapter 1: GST in India - An Introduction",
          weightage: "Medium",
          notes: "Understand the concept of indirect taxes, GST origin and framework, benefits of GST, constitutional provisions, and GST Council constitution.",
          pdfUrls: ["https://resource.cdn.icai.org/87066bos-aps1530-p2b-m1-may2026-ch1.pdf"],
          units: [
            { name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/87066bos-aps1530-p2b-m1-may2026-ch1.pdf" }
          ],
          illustrations: [
            { q: "Which article of the Constitution governs the GST Council?", a: "Article 279A of the Constitution of India empowers the President to constitute a joint forum of Center and States called the GST Council." }
          ]
        },
        {
          id: "i_tax_c15",
          name: "Chapter 2: Supply under GST",
          weightage: "High",
          notes: "Master Section 7 of the CGST Act: scope of supply, supply with or without consideration (Schedule I), activities treated as supply of goods or supply of services (Schedule II), and non-supplies (Schedule III).",
          pdfUrls: ["https://resource.cdn.icai.org/87067bos-aps1530-p2b-m1-may2026-ch2.pdf"],
          units: [
            { name: "Chapter 2 Full PDF", url: "https://resource.cdn.icai.org/87067bos-aps1530-p2b-m1-may2026-ch2.pdf" }
          ],
          illustrations: [
            { q: "Is the import of services without consideration treated as supply under GST?", a: "Under Schedule I, import of services by a taxable person from a related person or from any of their other establishments outside India, in the course or furtherance of business, is treated as supply even without consideration." }
          ]
        },
        {
          id: "i_tax_c16",
          name: "Chapter 3: Charge of GST",
          weightage: "High",
          notes: "Understand levy of CGST & IGST, reverse charge mechanism (RCM) on goods and services, composition levy provisions (Sec 10), and e-commerce operators.",
          pdfUrls: ["https://resource.cdn.icai.org/87068bos-aps1530-p2b-m1-may2026-ch3.pdf"],
          units: [
            { name: "Chapter 3 Full PDF", url: "https://resource.cdn.icai.org/87068bos-aps1530-p2b-m1-may2026-ch3.pdf" }
          ],
          illustrations: [
            { q: "What is the threshold limit for composition scheme for a service supplier?", a: "Under Section 10(2A), a registered person supplying services can opt for composition scheme if aggregate turnover in the preceding FY is <= ₹50 lakhs, paying tax at 6%." }
          ]
        },
        {
          id: "i_tax_c17",
          name: "Chapter 4: Place of Supply",
          weightage: "High",
          notes: "Study place of supply of goods and services where both supplier and recipient are in India, emphasizing transport, hospitality, training, and passenger services.",
          pdfUrls: ["https://resource.cdn.icai.org/87069bos-aps1530-p2b-m1-may2026-ch4.pdf"],
          units: [
            { name: "Chapter 4 Full PDF", url: "https://resource.cdn.icai.org/87069bos-aps1530-p2b-m1-may2026-ch4.pdf" }
          ],
          illustrations: [
            { q: "What is the place of supply for passenger transportation service under GST?", a: "If the recipient is registered, the place of supply is the location of such person. If unregistered, it is the place where the passenger embarks on the continuous journey." }
          ]
        },
        {
          id: "i_tax_c18",
          name: "Chapter 5: Exemptions from GST",
          weightage: "Medium",
          notes: "Understand power to grant exemptions, charitable services, governmental services, healthcare, agricultural, and educational exemptions.",
          pdfUrls: ["https://resource.cdn.icai.org/87070bos-aps1530-p2b-m1-may2026-ch5.pdf"],
          units: [
            { name: "Chapter 5 Full PDF", url: "https://resource.cdn.icai.org/87070bos-aps1530-p2b-m1-may2026-ch5.pdf" }
          ],
          illustrations: [
            { q: "Are training/coaching services in recreational activities exempt?", a: "Yes, services provided by way of training or coaching in recreational activities relating to arts or culture, or sports by charitable entities registered under Section 12AB of the Income-tax Act are fully exempt." }
          ]
        },
        {
          id: "i_tax_c19",
          name: "Chapter 6: Time of Supply",
          weightage: "High",
          notes: "Analyze time of supply rules under Section 12 and 13: time of supply of goods under forward and reverse charge, voucher supplies, and time of supply of services.",
          pdfUrls: ["https://resource.cdn.icai.org/87071bos-aps1530-p2b-m1-may2026-ch6.pdf"],
          units: [
            { name: "Chapter 6 Full PDF", url: "https://resource.cdn.icai.org/87071bos-aps1530-p2b-m1-may2026-ch6.pdf" }
          ],
          illustrations: [
            { q: "What is the time of supply of goods under forward charge?", a: "It is the earliest of: (a) date of issue of invoice by the supplier, or (b) the last date on which the invoice is required to be issued under Section 31." }
          ]
        },
        {
          id: "i_tax_c20",
          name: "Chapter 7: Value of Supply",
          weightage: "High",
          notes: "Study valuation under Section 15: transaction value inclusion criteria, discount treatment, and basic valuation rules.",
          pdfUrls: ["https://resource.cdn.icai.org/87072bos-aps1530-p2b-m1-may2026-ch7.pdf"],
          units: [
            { name: "Chapter 7 Full PDF", url: "https://resource.cdn.icai.org/87072bos-aps1530-p2b-m1-may2026-ch7.pdf" }
          ],
          illustrations: [
            { q: "Are subsidies provided by the Central Government included in the value of supply?", a: "No, under Section 15(2)(e), subsidies directly linked to the price are included in value of supply, EXCEPT subsidies provided by the Central and State Governments." }
          ]
        },
        {
          id: "i_tax_c21",
          name: "Chapter 8: Input Tax Credit",
          weightage: "High",
          notes: "Examine Section 16 to 18 of the CGST Act: eligibility conditions, blocked credits (Sec 17(5)), apportionment, and ITC in special circumstances.",
          pdfUrls: ["https://resource.cdn.icai.org/87269bos-aps1530-p2b-m2-may2026-ch8.pdf"],
          units: [
            { name: "Chapter 8 Full PDF", url: "https://resource.cdn.icai.org/87269bos-aps1530-p2b-m2-may2026-ch8.pdf" }
          ],
          illustrations: [
            { q: "Is Input Tax Credit allowed on motor vehicles for personal use?", a: "No, under Section 17(5)(a), ITC is blocked on motor vehicles for transportation of persons having approved seating capacity of <= 13 persons, unless used for making taxable outward supplies of transportation, driving school training, or further supply." }
          ]
        },
        {
          id: "i_tax_c22",
          name: "Chapter 9: Registration",
          weightage: "High",
          notes: "Study registration thresholds, compulsory registration (Sec 24), procedure for registration (Sec 25), amendment, cancellation, and revocation.",
          pdfUrls: ["https://resource.cdn.icai.org/87270bos-aps1530-p2b-m2-may2026-ch9.pdf"],
          units: [
            { name: "Chapter 9 Full PDF", url: "https://resource.cdn.icai.org/87270bos-aps1530-p2b-m2-may2026-ch9.pdf" }
          ],
          illustrations: [
            { q: "Who is compulsorily required to register under Section 24 of CGST Act?", a: "Persons making inter-state taxable supplies, casual taxable persons, persons required to pay tax under reverse charge, non-resident taxable persons, and e-commerce operators." }
          ]
        },
        {
          id: "i_tax_c23",
          name: "Chapter 10: Tax Invoice; Credit and Debit Notes",
          weightage: "Medium",
          notes: "Review tax invoice contents, time limits, receipt voucher, payment voucher, credit notes, debit notes, and e-invoicing provisions.",
          pdfUrls: ["https://resource.cdn.icai.org/87277bos-aps1530-p2b-m2-may2026-ch10.pdf"],
          units: [
            { name: "Chapter 10 Full PDF", url: "https://resource.cdn.icai.org/87277bos-aps1530-p2b-m2-may2026-ch10.pdf" }
          ],
          illustrations: [
            { q: "When is a Credit Note issued under Section 34 of CGST Act?", a: "A Credit Note is issued by the supplier to reduce the taxable value or tax in cases of: excess tax charged in invoice, goods returned by recipient, or goods found deficient." }
          ]
        },
        {
          id: "i_tax_c24",
          name: "Chapter 11: Accounts and Records",
          weightage: "Medium",
          notes: "Understand provisions relating to maintenance of accounts, records, and period of retention under GST.",
          pdfUrls: ["https://resource.cdn.icai.org/87278bos-aps1530-p2b-m2-may2026-ch11.pdf"],
          units: [
            { name: "Chapter 11 Full PDF", url: "https://resource.cdn.icai.org/87278bos-aps1530-p2b-m2-may2026-ch11.pdf" }
          ],
          illustrations: [
            { q: "Who is required to maintain accounts and records under GST?", a: "Every registered person must keep and maintain accounts at their principal place of business." }
          ]
        },
        {
          id: "i_tax_c25",
          name: "Chapter 12: E-Way Bill",
          weightage: "High",
          notes: "Detailed review of E-Way Bill generation rules, thresholds, and cancellation rules.",
          pdfUrls: ["https://resource.cdn.icai.org/87279bos-aps1530-p2b-m2-may2026-ch12.pdf"],
          units: [
            { name: "Chapter 12 Full PDF", url: "https://resource.cdn.icai.org/87279bos-aps1530-p2b-m2-may2026-ch12.pdf" }
          ],
          illustrations: [
            { q: "What is the threshold limit of consignment value of goods for generating an E-Way Bill?", a: "An E-Way Bill must be generated before commencement of movement of goods if the consignment value of goods exceeds ₹50,000." }
          ]
        },
        {
          id: "i_tax_c26",
          name: "Chapter 13: Payment of Tax",
          weightage: "High",
          notes: "Electronic ledgers (cash, credit, liability), payment procedure, interest on delayed payment.",
          pdfUrls: ["https://resource.cdn.icai.org/87280bos-aps1530-p2b-m2-may2026-ch13.pdf"],
          units: [
            { name: "Chapter 13 Full PDF", url: "https://resource.cdn.icai.org/87280bos-aps1530-p2b-m2-may2026-ch13.pdf" }
          ],
          illustrations: [
            { q: "What is the interest rate on delayed payment of tax?", a: "Interest is charged at 18% per annum for late payment." }
          ]
        },
        {
          id: "i_tax_c27",
          name: "Chapter 14: TDS and TCS under GST",
          weightage: "Medium",
          notes: "Tax Deduction at Source and Tax Collection at Source mechanism under GST.",
          pdfUrls: ["https://resource.cdn.icai.org/87281bos-aps1530-p2b-m2-may2026-ch14.pdf"],
          units: [
            { name: "Chapter 14 Full PDF", url: "https://resource.cdn.icai.org/87281bos-aps1530-p2b-m2-may2026-ch14.pdf" }
          ],
          illustrations: [
            { q: "What is the rate of TDS under GST?", a: "TDS rate is 2% (1% CGST + 1% SGST) on taxable contract values exceeding ₹2,500,000." }
          ]
        },
        {
          id: "i_tax_c28",
          name: "Chapter 15: Returns",
          weightage: "High",
          notes: "GSTR-1, GSTR-3B, QRMP scheme, and late fee/interest on delayed filing of returns.",
          pdfUrls: ["https://resource.cdn.icai.org/87282bos-aps1530-p2b-m2-may2026-ch15.pdf"],
          units: [
            { name: "Chapter 15 Full PDF", url: "https://resource.cdn.icai.org/87282bos-aps1530-p2b-m2-may2026-ch15.pdf" }
          ],
          illustrations: [
            { q: "What is QRMP Scheme?", a: "Quarterly Return Monthly Payment scheme allows small taxpayers with aggregate turnover up to ₹5 crore to file quarterly." }
          ]
        }
      ]
    },
    {
      subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/sm-inter-p4-may2025",
      chapters: [
        {
          id: "i_cost_c1",
          name: "Chapter 1: Introduction to Cost and Management Accounting",
          weightage: "Medium",
          notes: "Cost classification, elements of cost, cost object, responsibility centers, role of management accounting.",
          pdfUrls: ["https://resource.cdn.icai.org/87789bos-aps2161-ch1.pdf"],
          units: [
            { name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/87789bos-aps2161-ch1.pdf" }
          ],
          illustrations: [
            { q: "Differentiate between Cost Accounting and Management Accounting.", a: "Cost Accounting focuses on quantitative historical cost data for internal/external users. Management Accounting provides both qualitative and quantitative data for internal decision-making." }
          ]
        },
        {
          id: "i_cost_c2",
          name: "Chapter 2: Material Cost",
          weightage: "High",
          notes: "Procurement, inventory control techniques (EOQ, ABC, VED analysis), stock levels, pricing methods (FIFO, LIFO, Weighted Average).",
          pdfUrls: ["https://resource.cdn.icai.org/87790bos-aps2161-ch2.pdf"],
          units: [
            { name: "Chapter 2 Full PDF", url: "https://resource.cdn.icai.org/87790bos-aps2161-ch2.pdf" }
          ],
          illustrations: [
            { q: "Calculate Economic Order Quantity (EOQ) given: Annual Demand = 12,000 units, Ordering Cost = ₹100 per order, Carrying Cost = 10% of unit price (unit price = ₹24).", a: "EOQ = sqrt((2 * 12000 * 100) / (0.1 * 24)) = sqrt(2400000 / 2.4) = sqrt(1000000) = 1,000 units." }
          ]
        },
        {
          id: "i_cost_c3",
          name: "Chapter 3: Employee Cost and Direct Expenses",
          weightage: "High",
          notes: "Employee turnover, idle time, overtime, incentive schemes (Halsey, Rowan plans), direct expenses treatment.",
          pdfUrls: ["https://resource.cdn.icai.org/87791bos-aps2161-ch3.pdf"],
          units: [
            { name: "Chapter 3 Full PDF", url: "https://resource.cdn.icai.org/87791bos-aps2161-ch3.pdf" }
          ],
          illustrations: [
            { q: "Explain Rowan Premium Plan incentive calculation.", a: "Incentive Bonus = (Time Saved / Time Allowed) * Time Taken * Hourly Rate." }
          ]
        },
        {
          id: "i_cost_c4",
          name: "Chapter 4: Overheads – Absorption Costing Method",
          weightage: "High",
          notes: "Allocation, apportionment, primary and secondary distribution (direct, step, reciprocal methods), under/over absorption.",
          pdfUrls: ["https://resource.cdn.icai.org/87792bos-aps2161-ch4.pdf"],
          units: [
            { name: "Chapter 4 Full PDF", url: "https://resource.cdn.icai.org/87792bos-aps2161-ch4.pdf" }
          ],
          illustrations: [
            { q: "What is under-absorption of overheads?", a: "When actual overhead expenses incurred are higher than the overheads absorbed in production based on the predetermined absorption rate." }
          ]
        },
        {
          id: "i_cost_c5",
          name: "Chapter 5: Activity Based Costing",
          weightage: "Medium",
          notes: "Resource drivers, activity drivers, cost pools, cost hierarchy, comparison with traditional absorption costing.",
          pdfUrls: ["https://resource.cdn.icai.org/87793bos-aps2161-ch5.pdf"],
          units: [
            { name: "Chapter 5 Full PDF", url: "https://resource.cdn.icai.org/87793bos-aps2161-ch5.pdf" }
          ],
          illustrations: [
            { q: "What is a Cost Driver in ABC?", a: "A factor that causes or drives the cost of an activity, such as number of setups, machine hours, or purchase orders." }
          ]
        },
        {
          id: "i_cost_c6",
          name: "Chapter 6: Cost Sheet",
          weightage: "High",
          notes: "Prime cost, factory cost, cost of production, cost of goods sold, cost of sales, components of cost statement.",
          pdfUrls: ["https://resource.cdn.icai.org/87794bos-aps2161-ch6.pdf"],
          units: [
            { name: "Chapter 6 Full PDF", url: "https://resource.cdn.icai.org/87794bos-aps2161-ch6.pdf" }
          ],
          illustrations: [
            { q: "List the components to compute Prime Cost.", a: "Direct Materials Consumed + Direct Employee (Labor) Costs + Direct Expenses." }
          ]
        },
        {
          id: "i_cost_c7",
          name: "Chapter 7: Cost Accounting Systems",
          weightage: "Medium",
          notes: "Integrated and non-integrated accounts, reconciliation of cost and financial profits, ledger structures.",
          pdfUrls: ["https://resource.cdn.icai.org/87795bos-aps2161-ch7.pdf"],
          units: [
            { name: "Chapter 7 Full PDF", url: "https://resource.cdn.icai.org/87795bos-aps2161-ch7.pdf" }
          ],
          illustrations: [
            { q: "Why do profits in cost and financial accounts differ?", a: "Due to differences in inventory valuation, items shown only in financial accounts (e.g. income tax, dividend received), or over/under absorption of overheads." }
          ]
        },
        {
          id: "i_cost_c8",
          name: "Chapter 8: Unit & Batch Costing",
          weightage: "Medium",
          notes: "Cost unit definition, batch costing application, Economic Batch Quantity (EBQ) formula.",
          pdfUrls: ["https://resource.cdn.icai.org/87797bos-aps2161-ch8.pdf"],
          units: [
            { name: "Chapter 8 Full PDF", url: "https://resource.cdn.icai.org/87797bos-aps2161-ch8.pdf" }
          ],
          illustrations: [
            { q: "Give the formula for Economic Batch Quantity (EBQ).", a: "EBQ = sqrt((2 * Annual Demand * Set-up Cost) / Carrying Cost per unit per annum)." }
          ]
        },
        {
          id: "i_cost_c9",
          name: "Chapter 9: Job Costing",
          weightage: "Medium",
          notes: "Cost accumulation for custom work, job cost sheet, treatment of losses/spoilage.",
          pdfUrls: ["https://resource.cdn.icai.org/87798bos-aps2161-ch9.pdf"],
          units: [
            { name: "Chapter 9 Full PDF", url: "https://resource.cdn.icai.org/87798bos-aps2161-ch9.pdf" }
          ],
          illustrations: [
            { q: "When is Job Costing applied?", a: "In industries where work is undertaken against client special orders and each job is unique (e.g. printing presses, ship building, repair workshops)." }
          ]
        },
        {
          id: "i_cost_c10",
          name: "Chapter 10: Process & Operation Costing",
          weightage: "High",
          notes: "Continuous mass production costing, normal/abnormal loss, abnormal gain, equivalent production (FIFO and Weighted Average).",
          pdfUrls: ["https://resource.cdn.icai.org/87799bos-aps2161-ch10.pdf"],
          units: [
            { name: "Chapter 10 Full PDF", url: "https://resource.cdn.icai.org/87799bos-aps2161-ch10.pdf" }
          ],
          illustrations: [
            { q: "How is abnormal gain treated in process accounts?", a: "Abnormal gain units are credited to the process account and debited to the Abnormal Gain Account, valued at the full cost per equivalent unit." }
          ]
        },
        {
          id: "i_cost_c11",
          name: "Chapter 11: Joint Products and By Products",
          weightage: "Medium",
          notes: "Split-off point, joint cost apportionment methods (physical units, sales value, NRV), by-product costing treatments.",
          pdfUrls: ["https://resource.cdn.icai.org/87800bos-aps2161-ch11.pdf"],
          units: [
            { name: "Chapter 11 Full PDF", url: "https://resource.cdn.icai.org/87800bos-aps2161-ch11.pdf" }
          ],
          illustrations: [
            { q: "What is split-off point?", a: "The stage in a manufacturing process where joint products become individually identifiable." }
          ]
        },
        {
          id: "i_cost_c12",
          name: "Chapter 12: Service Costing",
          weightage: "High",
          notes: "Cost unit in service sector, transport costing (passenger-km, tone-km), hospital costing (patient-day), hotel costing (room-day).",
          pdfUrls: ["https://resource.cdn.icai.org/87801bos-aps2161-ch12.pdf"],
          units: [
            { name: "Chapter 12 Full PDF", url: "https://resource.cdn.icai.org/87801bos-aps2161-ch12.pdf" }
          ],
          illustrations: [
            { q: "Define composite cost units with examples.", a: "A cost unit combining two metrics (e.g., passenger-kilometers in transport, bed-days in hospitals)." }
          ]
        },
        {
          id: "i_cost_c13",
          name: "Chapter 13: Standard Costing",
          weightage: "High",
          notes: "Standard setting, variance analysis (material cost, labor cost, variable/fixed overheads).",
          pdfUrls: ["https://resource.cdn.icai.org/87802bos-aps2161-ch13.pdf"],
          units: [
            { name: "Chapter 13 Full PDF", url: "https://resource.cdn.icai.org/87802bos-aps2161-ch13.pdf" }
          ],
          illustrations: [
            { q: "Compute Material Cost Variance if Standard Cost is ₹5,000 (100 kg @ ₹50) and Actual Cost is ₹4,800 (80 kg @ ₹60).", a: "Material Cost Variance = Standard Cost - Actual Cost = ₹5,000 - ₹4,800 = ₹200 (Favorable)." }
          ]
        },
        {
          id: "i_cost_c14",
          name: "Chapter 14: Marginal Costing",
          weightage: "High",
          notes: "CVP analysis, P/V ratio, break-even point, margin of safety, decision-making (make or buy, key factor).",
          pdfUrls: ["https://resource.cdn.icai.org/87803bos-aps2161-ch14.pdf"],
          units: [
            { name: "Chapter 14 Full PDF", url: "https://resource.cdn.icai.org/87803bos-aps2161-ch14.pdf" }
          ],
          illustrations: [
            { q: "Write the formula for Margin of Safety (MoS).", a: "MoS = Actual Sales - Break-even Sales = Profit / P/V Ratio." }
          ]
        },
        {
          id: "i_cost_c15",
          name: "Chapter 15: Budgets and Budgetary Control",
          weightage: "High",
          notes: "Functional budgets, cash budget, flexible budgets, zero-base budgeting (ZBB).",
          pdfUrls: ["https://resource.cdn.icai.org/87804bos-aps2161-ch15.pdf"],
          units: [
            { name: "Chapter 15 Full PDF", url: "https://resource.cdn.icai.org/87804bos-aps2161-ch15.pdf" }
          ],
          illustrations: [
            { q: "Differentiate between Fixed Budget and Flexible Budget.", a: "Fixed Budget remains unchanged regardless of activity level. Flexible Budget adjusts for different volumes of activity." }
          ]
        }
      ]
    },
    {
      subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/sm-inter-p5-may2026",
      chapters: [
        {
          id: "i_audit_c1",
          name: "Chapter 1: Nature, Objective and Scope of Audit",
          weightage: "Medium",
          notes: "Definition of audit, objectives (reasonable assurance, true and fair view), scope, inherent limitations of audit, ethical principles.",
          pdfUrls: ["https://resource.cdn.icai.org/87756bos280825-ch1a.pdf"],
          units: [
            { name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/87756bos280825-ch1a.pdf" }
          ],
          illustrations: [
            { q: "What are the inherent limitations of an audit?", a: "Nature of financial reporting, nature of audit procedures, and the need to balance cost and benefit within a reasonable time." }
          ]
        },
        {
          id: "i_audit_c2",
          name: "Chapter 2: Audit Strategy, Audit Planning and Audit Programme",
          weightage: "High",
          notes: "Establishing overall audit strategy, developing audit plan, audit program construction, continuous planning process.",
          pdfUrls: ["https://resource.cdn.icai.org/87757bos280825-ch2a.pdf"],
          units: [
            { name: "Chapter 2 Full PDF", url: "https://resource.cdn.icai.org/87757bos280825-ch2a.pdf" }
          ],
          illustrations: [
            { q: "Explain the relationship between audit strategy and audit planning.", a: "The audit strategy guides the development of the audit plan, which contains the detailed nature, timing, and extent of audit procedures." }
          ]
        },
        {
          id: "i_audit_c3",
          name: "Chapter 3: Risk Assessment and Internal Control",
          weightage: "High",
          notes: "Audit risk components (Inherent, Control, Detection Risk), identifying risk of material misstatement, evaluating internal control system, IT environment controls.",
          pdfUrls: ["https://resource.cdn.icai.org/87758bos280825-ch3a.pdf"],
          units: [
            { name: "Chapter 3 Full PDF", url: "https://resource.cdn.icai.org/87758bos280825-ch3a.pdf" }
          ],
          illustrations: [
            { q: "Define Audit Risk.", a: "The risk that the auditor expresses an inappropriate audit opinion when the financial statements are materially misstated." }
          ]
        },
        {
          id: "i_audit_c4",
          name: "Chapter 4: Audit Evidence",
          weightage: "High",
          notes: "Sufficiency and appropriateness of evidence, methods of obtaining evidence (inspection, observation, inquiry), audit sampling, using work of internal auditors/experts.",
          pdfUrls: ["https://resource.cdn.icai.org/87759bos280825-ch4a.pdf"],
          units: [
            { name: "Chapter 4 Full PDF", url: "https://resource.cdn.icai.org/87759bos280825-ch4a.pdf" }
          ],
          illustrations: [
            { q: "Distinguish between sufficiency and appropriateness of audit evidence.", a: "Sufficiency measures the quantity of evidence, whereas appropriateness measures the quality (relevance and reliability) of evidence." }
          ]
        },
        {
          id: "i_audit_c5",
          name: "Chapter 5: Audit of Items of Financial Statements",
          weightage: "High",
          notes: "Substantive procedures for assets, liabilities, equity, share capital, revenue, and expenses. Checking assertions (existence, completeness, valuation).",
          pdfUrls: ["https://resource.cdn.icai.org/87760bos280825-ch5a.pdf"],
          units: [
            { name: "Chapter 5 Full PDF", url: "https://resource.cdn.icai.org/87760bos280825-ch5a.pdf" }
          ],
          illustrations: [
            { q: "List three assertions checked during auditing of inventories.", a: "Existence (does stock physically exist?), Completeness (are all items recorded?), and Valuation (valued at lower of cost and NRV?)." }
          ]
        },
        {
          id: "i_audit_c6",
          name: "Chapter 6: Audit Documentation",
          weightage: "Medium",
          notes: "Nature and purpose of documentation, working papers assembly, ownership and confidentiality of audit documents (SQC 1).",
          pdfUrls: ["https://resource.cdn.icai.org/87762bos280825-ch6a.pdf"],
          units: [
            { name: "Chapter 6 Full PDF", url: "https://resource.cdn.icai.org/87762bos280825-ch6a.pdf" }
          ],
          illustrations: [
            { q: "What is the retention period for audit documentation under SQC 1?", a: "At least 7 years from the date of the auditor's report." }
          ]
        },
        {
          id: "i_audit_c7",
          name: "Chapter 7: Completion and Review",
          weightage: "High",
          notes: "Subsequent events (SA 560), going concern evaluation (SA 570), written representations (SA 580), evaluation of misstatements.",
          pdfUrls: ["https://resource.cdn.icai.org/87763bos280825-ch7a.pdf"],
          units: [
            { name: "Chapter 7 Full PDF", url: "https://resource.cdn.icai.org/87763bos280825-ch7a.pdf" }
          ],
          illustrations: [
            { q: "What is the primary purpose of obtaining a Written Representation?", a: "To confirm certain matters or support other audit evidence, though it does not provide sufficient appropriate evidence on its own." }
          ]
        },
        {
          id: "i_audit_c8",
          name: "Chapter 8: Audit Report",
          weightage: "High",
          notes: "Forming audit opinion (unmodified SA 700), modifications to opinion (qualified, adverse, disclaimer SA 705), emphasis of matter paragraphs (SA 706).",
          pdfUrls: ["https://resource.cdn.icai.org/87764bos280825-ch8a.pdf"],
          units: [
            { name: "Chapter 8 Full PDF", url: "https://resource.cdn.icai.org/87764bos280825-ch8a.pdf" }
          ],
          illustrations: [
            { q: "When should an auditor issue an Adverse Opinion?", a: "When the auditor, having obtained sufficient appropriate evidence, concludes that misstatements, individually or in aggregate, are both material and pervasive to the financial statements." }
          ]
        },
        {
          id: "i_audit_c9",
          name: "Chapter 9: Special Features of Audit of Different Type of Entities",
          weightage: "High",
          notes: "Government audit (C&AG), audit of local bodies, NGOs, partnership firms, sole proprietorships, educational institutions, and clubs.",
          pdfUrls: ["https://resource.cdn.icai.org/87765bos280825-ch9a.pdf"],
          units: [
            { name: "Chapter 9 Full PDF", url: "https://resource.cdn.icai.org/87765bos280825-ch9a.pdf" }
          ],
          illustrations: [
            { q: "What is the role of C&AG in Government Audit?", a: "The Comptroller and Auditor General audits receipts and expenditures of the Union and State governments and public sector undertakings, evaluating financial propriety." }
          ]
        },
        {
          id: "i_audit_c10",
          name: "Chapter 10: Audit of Banks",
          weightage: "Medium",
          notes: "Banking business, internal control evaluation in banks, auditing advances, non-performing assets (NPA) classification, provisioning norms.",
          pdfUrls: ["https://resource.cdn.icai.org/87766bos280825-ch10a.pdf"],
          units: [
            { name: "Chapter 10 Full PDF", url: "https://resource.cdn.icai.org/87766bos280825-ch10a.pdf" }
          ],
          illustrations: [
            { q: "What is a Non-Performing Asset (NPA) in banking terms?", a: "An asset (loan or advance) where interest and/or installment of principal remains overdue for more than 90 days." }
          ]
        },
        {
          id: "i_audit_c11",
          name: "Chapter 11: Ethics and Terms of Audit Engagements",
          weightage: "High",
          notes: "ICAI Code of Ethics, auditing standards framework, pre-conditions to an audit, agreeing audit engagement terms (SA 210).",
          pdfUrls: ["https://resource.cdn.icai.org/87767bos280825-ch11a.pdf"],
          units: [
            { name: "Chapter 11 Full PDF", url: "https://resource.cdn.icai.org/87767bos280825-ch11a.pdf" }
          ],
          illustrations: [
            { q: "List three fundamental ethical principles for professional accountants.", a: "Integrity, Objectivity, Professional Competence and Due Care, Confidentiality, and Professional Behavior." }
          ]
        }
      ]
    },
    {
      subject: "Paper-6A: Financial Management (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/sm-inter-p6a-may2026",
      chapters: [
        {
          id: "i_fm_c1",
          name: "Chapter 1: Scope and Objectives of Financial Management",
          weightage: "Medium",
          notes: "Financial decisions (investment, financing, dividend), wealth maximization vs profit maximization, role of CFO.",
          pdfUrls: ["https://resource.cdn.icai.org/87737bos280825-ch1.pdf"],
          units: [
            { name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/87737bos280825-ch1.pdf" }
          ],
          illustrations: [
            { q: "Why is Wealth Maximization superior to Profit Maximization?", a: "Because it considers the time value of money, accounts for risk and uncertainty, and focuses on the long-term value of the firm's equity." }
          ]
        },
        {
          id: "i_fm_c2",
          name: "Chapter 2: Types of Financing",
          weightage: "High",
          notes: "Equity, debt, hybrid financing, venture capital, angel investment, securitization, international financing (ADRs, GDRs).",
          pdfUrls: ["https://resource.cdn.icai.org/87738bos280825-ch2.pdf"],
          units: [
            { name: "Chapter 2 Full PDF", url: "https://resource.cdn.icai.org/87738bos280825-ch2.pdf" }
          ],
          illustrations: [
            { q: "What is the difference between ADRs and GDRs?", a: "ADRs are depository receipts issued in the United States and traded on US exchanges. GDRs are issued outside the US and traded primarily on European exchanges." }
          ]
        },
        {
          id: "i_fm_c3",
          name: "Chapter 3: Financial Analysis and Planning – Ratio Analysis",
          weightage: "High",
          notes: "Liquidity ratios, solvency ratios, activity (efficiency) ratios, profitability ratios, DuPont analysis.",
          pdfUrls: ["https://resource.cdn.icai.org/87739bos280825-ch3.pdf"],
          units: [
            { name: "Chapter 3 Full PDF", url: "https://resource.cdn.icai.org/87739bos280825-ch3.pdf" }
          ],
          illustrations: [
            { q: "Write the formula for DuPont analysis of Return on Equity (ROE).", a: "ROE = Profit Margin (Net Income / Sales) * Asset Turnover (Sales / Total Assets) * Equity Multiplier (Total Assets / Equity)." }
          ]
        },
        {
          id: "i_fm_c4",
          name: "Chapter 4: Cost of Capital",
          weightage: "High",
          notes: "Cost of debt, preference share cost, equity cost (CAPM model), retained earnings cost, Weighted Average Cost of Capital (WACC).",
          pdfUrls: ["https://resource.cdn.icai.org/87740bos-280825-ch4.pdf"],
          units: [
            { name: "Chapter 4 Full PDF", url: "https://resource.cdn.icai.org/87740bos-280825-ch4.pdf" }
          ],
          illustrations: [
            { q: "Calculate WACC given: Equity = ₹60L (Cost = 15%), Debt = ₹40L (Cost after-tax = 8%).", a: "WACC = (0.6 * 15%) + (0.4 * 8%) = 9% + 3.2% = 12.2%." }
          ]
        },
        {
          id: "i_fm_c5",
          name: "Chapter 5: Financing Decisions – Capital Structure",
          weightage: "High",
          notes: "Optimal capital structure, Net Income theory, Net Operating Income theory, MM theories (with and without taxes), trade-off theory.",
          pdfUrls: ["https://resource.cdn.icai.org/87741bos-280825-ch5.pdf"],
          units: [
            { name: "Chapter 5 Full PDF", url: "https://resource.cdn.icai.org/87741bos-280825-ch5.pdf" }
          ],
          illustrations: [
            { q: "State the core assumption of the MM Theory of Capital Structure without taxes.", a: "The value of a firm is independent of its capital structure; the Weighted Average Cost of Capital is constant regardless of leverage." }
          ]
        },
        {
          id: "i_fm_c6",
          name: "Chapter 6: Financing Decisions – Leverages",
          weightage: "High",
          notes: "Operating leverage (DOL), financial leverage (DFL), combined leverage (DCL), break-even points, EBIT-EPS analysis.",
          pdfUrls: ["https://resource.cdn.icai.org/87742bos-28082025-ch6.pdf"],
          units: [
            { name: "Chapter 6 Full PDF", url: "https://resource.cdn.icai.org/87742bos-28082025-ch6.pdf" }
          ],
          illustrations: [
            { q: "Write the formulas for DOL and DFL.", a: "DOL = Contribution / EBIT. DFL = EBIT / EBT (or EBIT / (EBIT - Interest - Preference Dividend / (1-t)))." }
          ]
        },
        {
          id: "i_fm_c7",
          name: "Chapter 7: Investment Decisions",
          weightage: "High",
          notes: "Capital budgeting techniques: Payback, NPV, IRR, Profitability Index, modified IRR, capital rationing.",
          pdfUrls: ["https://resource.cdn.icai.org/87745bos280825-ch7.pdf"],
          units: [
            { name: "Chapter 7 Full PDF", url: "https://resource.cdn.icai.org/87745bos280825-ch7.pdf" }
          ],
          illustrations: [
            { q: "State the decision rule under Net Present Value (NPV).", a: "Accept the project if NPV > 0 (adds value to shareholders); reject if NPV < 0." }
          ]
        },
        {
          id: "i_fm_c8",
          name: "Chapter 8: Dividend Decision",
          weightage: "High",
          notes: "Theories of dividend: Walter's model, Gordon's growth model, MM dividend irrelevance theory, dividend policies.",
          pdfUrls: ["https://resource.cdn.icai.org/87746bos280825-ch8.pdf"],
          units: [
            { name: "Chapter 8 Full PDF", url: "https://resource.cdn.icai.org/87746bos280825-ch8.pdf" }
          ],
          illustrations: [
            { q: "According to Walter's model, when should a growth firm (r > Ke) retain its profits?", a: "A growth firm should retain 100% of its profits (payout ratio = 0) to maximize its share price." }
          ]
        },
        {
          id: "i_fm_c9",
          name: "Chapter 9: Management of Working Capital",
          weightage: "High",
          notes: "Working capital cycle, cash management, receivables management (credit policy), inventory management, payables management, working capital financing.",
          pdfUrls: [
            "https://resource.cdn.icai.org/88440bos280825-cp9u1.pdf",
            "https://resource.cdn.icai.org/87748bos280825-cp9u2.pdf",
            "https://resource.cdn.icai.org/87749bos280825-cp9u3.pdf",
            "https://resource.cdn.icai.org/87750bos280825-cp9u4.pdf",
            "https://resource.cdn.icai.org/87751bos280825-cp9u5.pdf",
            "https://resource.cdn.icai.org/87752bos280825-cp9u6.pdf"
          ],
          units: [
            { name: "Unit I: Introduction to Working Capital Management", url: "https://resource.cdn.icai.org/88440bos280825-cp9u1.pdf" },
            { name: "Unit II: Treasury and Cash Management", url: "https://resource.cdn.icai.org/87748bos280825-cp9u2.pdf" },
            { name: "Unit III: Management of Inventory", url: "https://resource.cdn.icai.org/87749bos280825-cp9u3.pdf" },
            { name: "Unit IV: Management of Receivables", url: "https://resource.cdn.icai.org/87750bos280825-cp9u4.pdf" },
            { name: "Unit V: Management of Payables", url: "https://resource.cdn.icai.org/87751bos280825-cp9u5.pdf" },
            { name: "Unit VI: Financing of Working Capital", url: "https://resource.cdn.icai.org/87752bos280825-cp9u6.pdf" }
          ],
          illustrations: [
            { q: "Define Net Working Capital.", a: "Net Working Capital = Current Assets - Current Liabilities. It measures short-term liquidity." }
          ]
        }
      ]
    },
    {
      subject: "Paper-6B: Strategic Management (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/sm-inter-p6b-may2026",
      chapters: [
        {
          id: "i_sm_c1",
          name: "Chapter 1: Introduction to Strategic Management",
          weightage: "Medium",
          notes: "Strategy definition, levels of strategy (corporate, business, functional), strategic management process, vision and mission statements.",
          pdfUrls: ["https://resource.cdn.icai.org/87995bos-aps2213-ch1.pdf"],
          units: [
            { name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/87995bos-aps2213-ch1.pdf" }
          ],
          illustrations: [
            { q: "Distinguish between Vision and Mission.", a: "Vision describes where the organization wants to be in the future (the destination). Mission explains why the organization exists and its current business focus (the vehicle)." }
          ]
        },
        {
          id: "i_sm_c2",
          name: "Chapter 2: Strategic Analysis: External Environment",
          weightage: "High",
          notes: "Environmental scanning, PESTLE analysis, Porter's Five Forces model, industry analysis.",
          pdfUrls: ["https://resource.cdn.icai.org/87996bos-aps2213-ch2.pdf"],
          units: [
            { name: "Chapter 2 Full PDF", url: "https://resource.cdn.icai.org/87996bos-aps2213-ch2.pdf" }
          ],
          illustrations: [
            { q: "List the components of Porter's Five Forces Model.", a: "1. Threat of new entrants. 2. Bargaining power of buyers. 3. Bargaining power of suppliers. 4. Threat of substitute products. 5. Intensity of competitive rivalry." }
          ]
        },
        {
          id: "i_sm_c3",
          name: "Chapter 3: Strategic Analysis: Internal Environment",
          weightage: "High",
          notes: "Resource-based view (RBV), core competencies, value chain analysis, SWOT and TOWS analysis, portfolio analysis (BCG, Ansoff, ADL).",
          pdfUrls: ["https://resource.cdn.icai.org/87997bos-aps2213-ch3.pdf"],
          units: [
            { name: "Chapter 3 Full PDF", url: "https://resource.cdn.icai.org/87997bos-aps2213-ch3.pdf" }
          ],
          illustrations: [
            { q: "Explain the four quadrants of the BCG Matrix.", a: "1. Stars (High growth, high market share). 2. Cash Cows (Low growth, high market share). 3. Question Marks (High growth, low market share). 4. Dogs (Low growth, low market share)." }
          ]
        },
        {
          id: "i_sm_c4",
          name: "Chapter 4: Strategic Choices",
          weightage: "High",
          notes: "Corporate strategies (stability, expansion, retrenchment, combination), business level strategies (Porter's generic strategies: cost leadership, differentiation, focus).",
          pdfUrls: ["https://resource.cdn.icai.org/87998bos-aps2213-ch4.pdf"],
          units: [
            { name: "Chapter 4 Full PDF", url: "https://resource.cdn.icai.org/87998bos-aps2213-ch4.pdf" }
          ],
          illustrations: [
            { q: "What are Porter's Generic Business Level Strategies?", a: "1. Cost Leadership (low cost, broad market). 2. Differentiation (unique product, broad market). 3. Focus (low cost or differentiation, narrow market segment)." }
          ]
        },
        {
          id: "i_sm_c5",
          name: "Chapter 5: Strategy Implementation and Evaluation",
          weightage: "High",
          notes: "Strategy-structure relationship, organizational structures, strategic control, Balanced Scorecard, role of leadership.",
          pdfUrls: ["https://resource.cdn.icai.org/87999bos-aps2213-ch5.pdf"],
          units: [
            { name: "Chapter 5 Full PDF", url: "https://resource.cdn.icai.org/87999bos-aps2213-ch5.pdf" }
          ],
          illustrations: [
            { q: "What is a Balanced Scorecard?", a: "A strategic performance management tool that tracks performance across four perspectives: Financial, Customer, Internal Business Processes, and Learning & Growth." }
          ]
        }
      ]
    }
  ],
  Final: [
    {
      subject: "Paper-1: Financial Reporting (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/sm-final-p1-may2026",
      chapters: [
        {
          id: "fn_fr_c1",
          name: "Chapter 1: Introduction to Indian Accounting Standards",
          weightage: "Low",
          notes: "Understand the development, need, and transition to Indian Accounting Standards (Ind AS) in India.",
          pdfUrls: ["https://resource.cdn.icai.org/87811bos-280825-final-ch1.pdf"],
          units: [
            { name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/87811bos-280825-final-ch1.pdf" }
          ],
          illustrations: [
            { q: "What is the primary objective of introducing Ind AS in India?", a: "To achieve convergence with global financial reporting standards (IFRS), thereby enhancing comparability, transparency, and trust for international investors." }
          ]
        },
        {
          id: "fn_fr_c2",
          name: "Chapter 2: Conceptual Framework for Financial Reporting under Ind AS",
          weightage: "Medium",
          notes: "Conceptual framework: objectives, qualitative characteristics, elements, recognition, measurement, and capital maintenance concepts.",
          pdfUrls: ["https://resource.cdn.icai.org/87812bos-280825-final-ch2.pdf"],
          units: [
            { name: "Chapter 2 Full PDF", url: "https://resource.cdn.icai.org/87812bos-280825-final-ch2.pdf" }
          ],
          illustrations: [
            { q: "What are the two fundamental qualitative characteristics of financial statements?", a: "Relevance and Faithful Representation." }
          ]
        },
        {
          id: "fn_fr_c3",
          name: "Chapter 3: Ind AS on Presentation of General Purpose Financial Statements",
          weightage: "High",
          notes: "Rules for presentation of financial statements, cash flows, and interim reporting under Ind AS 1, 7, and 34.",
          pdfUrls: [
            "https://resource.cdn.icai.org/87813bos-280825-final-ch3-u1.pdf",
            "https://resource.cdn.icai.org/87814bos-280825-final-ch3-u2.pdf",
            "https://resource.cdn.icai.org/87815bos-280825-final-ch3-u3.pdf"
          ],
          units: [
            { name: "Unit 1: Ind AS 1 Presentation of Financial Statements", url: "https://resource.cdn.icai.org/87813bos-280825-final-ch3-u1.pdf" },
            { name: "Unit 2: Ind AS 34 Interim Financial Reporting", url: "https://resource.cdn.icai.org/87814bos-280825-final-ch3-u2.pdf" },
            { name: "Unit 3: Ind AS 7 Statement of Cash Flows", url: "https://resource.cdn.icai.org/87815bos-280825-final-ch3-u3.pdf" }
          ],
          illustrations: [
            { q: "List the components of financial statements under Ind AS 1.", a: "Balance Sheet, Statement of Profit and Loss, Statement of Changes in Equity (SOCE), Statement of Cash Flows, and Notes to Accounts." }
          ]
        },
        {
          id: "fn_fr_c4",
          name: "Chapter 4: Ind AS on Measurement based on Accounting Policies",
          weightage: "High",
          notes: "Criteria for choosing/changing accounting policies, estimates, errors (Ind AS 8), events after reporting period (Ind AS 10), and fair value measurement (Ind AS 113).",
          pdfUrls: [
            "https://resource.cdn.icai.org/87816bos-280825-final-ch4-u1.pdf",
            "https://resource.cdn.icai.org/87817bos-280825-final-ch4-u2.pdf",
            "https://resource.cdn.icai.org/87818bos-280825-final-ch4-u3.pdf"
          ],
          units: [
            { name: "Unit 1: Ind AS 8 Accounting Policies, Changes in Estimates & Errors", url: "https://resource.cdn.icai.org/87816bos-280825-final-ch4-u1.pdf" },
            { name: "Unit 2: Ind AS 10 Events after the Reporting Period", url: "https://resource.cdn.icai.org/87817bos-280825-final-ch4-u2.pdf" },
            { name: "Unit 3: Ind AS 113 Fair Value Measurement", url: "https://resource.cdn.icai.org/87818bos-280825-final-ch4-u3.pdf" }
          ],
          illustrations: [
            { q: "How is a change in accounting policy accounted for under Ind AS 8?", a: "It must be accounted for retrospectively by adjusting the opening balance of each affected component of equity for the earliest prior period presented." }
          ]
        },
        {
          id: "fn_fr_c5",
          name: "Chapter 5: Ind AS on Assets of the Financial Statements",
          weightage: "High",
          notes: "Study accounting standards relating to key corporate assets including PPE, inventories, leases, intangible assets, and investment property.",
          pdfUrls: [
            "https://resource.cdn.icai.org/87822bos-280825-final-ch5-u1.pdf",
            "https://resource.cdn.icai.org/87823bos-280825-final-ch5-u2.pdf",
            "https://resource.cdn.icai.org/87824bos-280825-final-ch5-u3.pdf",
            "https://resource.cdn.icai.org/87825bos-280825-final-ch5-u4.pdf",
            "https://resource.cdn.icai.org/87826bos-280825-final-ch5-u5.pdf",
            "https://resource.cdn.icai.org/87827bos-280825-final-ch5-u6.pdf",
            "https://resource.cdn.icai.org/87828bos-280825-final-ch5-u7.pdf",
            "https://resource.cdn.icai.org/87829bos-280825-final-ch5-u8.pdf"
          ],
          units: [
            { name: "Unit 1: Ind AS 2 Inventories", url: "https://resource.cdn.icai.org/87822bos-280825-final-ch5-u1.pdf" },
            { name: "Unit 2: Ind AS 16 Property, Plant & Equipment", url: "https://resource.cdn.icai.org/87823bos-280825-final-ch5-u2.pdf" },
            { name: "Unit 3: Ind AS 23 Borrowing Costs", url: "https://resource.cdn.icai.org/87824bos-280825-final-ch5-u3.pdf" },
            { name: "Unit 4: Ind AS 36 Impairment of Assets", url: "https://resource.cdn.icai.org/87825bos-280825-final-ch5-u4.pdf" },
            { name: "Unit 5: Ind AS 38 Intangible Assets", url: "https://resource.cdn.icai.org/87826bos-280825-final-ch5-u5.pdf" },
            { name: "Unit 6: Ind AS 40 Investment Property", url: "https://resource.cdn.icai.org/87827bos-280825-final-ch5-u6.pdf" },
            { name: "Unit 7: Ind AS 105 Non-current Assets Held for Sale", url: "https://resource.cdn.icai.org/87828bos-280825-final-ch5-u7.pdf" },
            { name: "Unit 8: Ind AS 116 Leases", url: "https://resource.cdn.icai.org/87829bos-280825-final-ch5-u8.pdf" }
          ],
          illustrations: [
            { q: "What is lower of cost and net realizable value under Ind AS 2?", a: "Inventories are valued at cost or NRV, whichever is lower, to ensure assets are not overstated." }
          ]
        },
        {
          id: "fn_fr_c6",
          name: "Chapter 6: Ind AS on Liabilities of the Financial Statements",
          weightage: "High",
          notes: "Examines provisions, contingent liabilities, and employee benefits (Ind AS 19 and 37).",
          pdfUrls: [
            "https://resource.cdn.icai.org/87833bos-280825-final-ch6-u1.pdf",
            "https://resource.cdn.icai.org/87834bos-280825-final-ch6-u2.pdf"
          ],
          units: [
            { name: "Unit 1: Ind AS 19 Employee Benefits", url: "https://resource.cdn.icai.org/87833bos-280825-final-ch6-u1.pdf" },
            { name: "Unit 2: Ind AS 37 Provisions, Contingent Liabilities & Contingent Assets", url: "https://resource.cdn.icai.org/87834bos-280825-final-ch6-u2.pdf" }
          ],
          illustrations: [
            { q: "What are the three criteria to recognize a provision under Ind AS 37?", a: "1. Present obligation (legal or constructive). 2. Probable outflow of resources. 3. Reliable estimate." }
          ]
        },
        {
          id: "fn_fr_c7",
          name: "Chapter 7: Ind AS on Items impacting the Financial Statements",
          weightage: "High",
          notes: "Covers accounting for income taxes (Ind AS 12) and effects of foreign exchange fluctuations (Ind AS 21).",
          pdfUrls: [
            "https://resource.cdn.icai.org/87835bos-280825-final-ch7-u1.pdf",
            "https://resource.cdn.icai.org/87836bos-280825-final-ch7-u2.pdf"
          ],
          units: [
            { name: "Unit 1: Ind AS 12 Income Taxes", url: "https://resource.cdn.icai.org/87835bos-280825-final-ch7-u1.pdf" },
            { name: "Unit 2: Ind AS 21 The Effects of Changes in Foreign Exchange Rates", url: "https://resource.cdn.icai.org/87836bos-280825-final-ch7-u2.pdf" }
          ],
          illustrations: [
            { q: "What is a temporary difference under Ind AS 12?", a: "The difference between the carrying amount of an asset/liability in the balance sheet and its tax base." }
          ]
        },
        {
          id: "fn_fr_c8",
          name: "Chapter 8: Ind AS on Disclosures in the Financial Statements",
          weightage: "Medium",
          notes: "Focuses on related party disclosures (Ind AS 24), EPS calculations (Ind AS 33), and operating segments (Ind AS 108).",
          pdfUrls: [
            "https://resource.cdn.icai.org/87837bos-280825-final-ch8-u1.pdf",
            "https://resource.cdn.icai.org/87838bos-280825-final-ch8-u2.pdf",
            "https://resource.cdn.icai.org/87839bos-280825-final-ch8-u3.pdf"
          ],
          units: [
            { name: "Unit 1: Ind AS 24 Related Party Disclosures", url: "https://resource.cdn.icai.org/87837bos-280825-final-ch8-u1.pdf" },
            { name: "Unit 2: Ind AS 33 Earnings per Share", url: "https://resource.cdn.icai.org/87838bos-280825-final-ch8-u2.pdf" },
            { name: "Unit 3: Ind AS 108 Operating Segments", url: "https://resource.cdn.icai.org/87839bos-280825-final-ch8-u3.pdf" }
          ],
          illustrations: [
            { q: "Define basic EPS formula.", a: "Basic EPS = Net Profit attributable to ordinary equity holders / Weighted average number of ordinary shares outstanding during the period." }
          ]
        },
        {
          id: "fn_fr_c9",
          name: "Chapter 9: Ind AS 115 Revenue from Contracts with Customers",
          weightage: "High",
          notes: "Detailed review of the five-step model for revenue recognition.",
          pdfUrls: ["https://resource.cdn.icai.org/87859bos-290825-final-ch9.pdf"],
          units: [
            { name: "Chapter 9 Full PDF", url: "https://resource.cdn.icai.org/87859bos-290825-final-ch9.pdf" }
          ],
          illustrations: [
            { q: "State Step 3 of Ind AS 115.", a: "Determine the transaction price, which is the amount of consideration an entity expects to be entitled to in exchange for transferring promised goods/services." }
          ]
        },
        {
          id: "fn_fr_c10",
          name: "Chapter 10: Other Indian Accounting Standards",
          weightage: "Medium",
          notes: "Review agriculture (Ind AS 41), government grants (Ind AS 20), and share-based payments (Ind AS 102).",
          pdfUrls: [
            "https://resource.cdn.icai.org/87861bos-290825-final-ch10-ui.pdf",
            "https://resource.cdn.icai.org/87862bos-290825-final-ch10-u2.pdf",
            "https://resource.cdn.icai.org/87863bos-290825-final-ch10-u3.pdf"
          ],
          units: [
            { name: "Unit 1: Ind AS 41 Agriculture", url: "https://resource.cdn.icai.org/87861bos-290825-final-ch10-ui.pdf" },
            { name: "Unit 2: Ind AS 20 Accounting for Government Grants", url: "https://resource.cdn.icai.org/87862bos-290825-final-ch10-u2.pdf" },
            { name: "Unit 3: Ind AS 102 Share Based Payment", url: "https://resource.cdn.icai.org/87863bos-290825-final-ch10-u3.pdf" }
          ],
          illustrations: [
            { q: "How is a biological asset measured under Ind AS 41?", a: "At its fair value less costs to sell at initial recognition and at each reporting date." }
          ]
        },
        {
          id: "fn_fr_c11",
          name: "Chapter 11: Accounting and Reporting of Financial Instruments",
          weightage: "High",
          notes: "Understand definitions, classifications, recognition/measurement, and hedge accounting for financial assets/liabilities (Ind AS 32 & 109).",
          pdfUrls: [
            "https://resource.cdn.icai.org/87864bos-290825-final-ch11-ui.pdf",
            "https://resource.cdn.icai.org/87865bos-290825-final-ch11-u2.pdf",
            "https://resource.cdn.icai.org/87866bos-290825-final-ch11-u3.pdf",
            "https://resource.cdn.icai.org/87867bos-290825-final-ch11-u4.pdf",
            "https://resource.cdn.icai.org/87868bos-290825-final-ch11-u5.pdf",
            "https://resource.cdn.icai.org/87869bos-290825-final-ch11-u6.pdf",
            "https://resource.cdn.icai.org/87870bos-290825-final-ch11-u7.pdf"
          ],
          units: [
            { name: "Unit 1: Financial Instruments: Scope and Definitions", url: "https://resource.cdn.icai.org/87864bos-290825-final-ch11-ui.pdf" },
            { name: "Unit 2: Classification & Measurement of Financial Assets/Liabilities", url: "https://resource.cdn.icai.org/87865bos-290825-final-ch11-u2.pdf" },
            { name: "Unit 3: Financial Instruments: Equity and Financial Liabilities", url: "https://resource.cdn.icai.org/87866bos-290825-final-ch11-u3.pdf" },
            { name: "Unit 4: Derivatives and Embedded Derivatives", url: "https://resource.cdn.icai.org/87867bos-290825-final-ch11-u4.pdf" },
            { name: "Unit 5: Recognition and Derecognition of Financial Instruments", url: "https://resource.cdn.icai.org/87868bos-290825-final-ch11-u5.pdf" },
            { name: "Unit 6: Hedge Accounting", url: "https://resource.cdn.icai.org/87869bos-290825-final-ch11-u6.pdf" },
            { name: "Unit 7: Disclosures", url: "https://resource.cdn.icai.org/87870bos-290825-final-ch11-u7.pdf" }
          ],
          illustrations: [
            { q: "What is an embedded derivative?", a: "A component of a hybrid contract that also includes a non-derivative host, causing some of the cash flows to modify." }
          ]
        },
        {
          id: "fn_fr_c12",
          name: "Chapter 12: Ind AS 103 Business Combinations",
          weightage: "High",
          notes: "Acquisition method, goodwill, bargain purchase, non-controlling interest.",
          pdfUrls: ["https://resource.cdn.icai.org/87875bos-290825-ch12-u1.pdf"],
          units: [
            { name: "Chapter 12 Full PDF", url: "https://resource.cdn.icai.org/87875bos-290825-ch12-u1.pdf" }
          ],
          illustrations: [
            { q: "What is NCI measured at under Ind AS 103?", a: "Either fair value or the NCI's proportionate share of the acquiree's identifiable net assets." }
          ]
        },
        {
          id: "fn_fr_c13",
          name: "Chapter 13: Consolidated and Separate Financial Statements of Group Entities",
          weightage: "High",
          notes: "Review control assessment, consolidation procedures, separate statements, joint arrangements, and associates (Ind AS 110, 111, 27, 28).",
          pdfUrls: [
            "https://resource.cdn.icai.org/87876bos-290825-ch13-u1.pdf",
            "https://resource.cdn.icai.org/87877bos-290825-ch13-u2.pdf",
            "https://resource.cdn.icai.org/87878bos-290825-ch13-u3.pdf",
            "https://resource.cdn.icai.org/87879bos-290825-ch13-u4.pdf",
            "https://resource.cdn.icai.org/87880bos-290825-ch13-u5.pdf",
            "https://resource.cdn.icai.org/87881bos-290825-ch13-u6.pdf",
            "https://resource.cdn.icai.org/87882bos-290825-ch13-u7.pdf",
            "https://resource.cdn.icai.org/87883bos-290825-ch13-u8.pdf"
          ],
          units: [
            { name: "Unit 1: Introduction to Consolidated & Separate Statements", url: "https://resource.cdn.icai.org/87876bos-290825-ch13-u1.pdf" },
            { name: "Unit 2: Important Definitions", url: "https://resource.cdn.icai.org/87877bos-290825-ch13-u2.pdf" },
            { name: "Unit 3: Consolidated Financial Statements", url: "https://resource.cdn.icai.org/87878bos-290825-ch13-u3.pdf" },
            { name: "Unit 4: Ind AS 110: Consolidation Procedure for Subsidiaries", url: "https://resource.cdn.icai.org/87879bos-290825-ch13-u4.pdf" },
            { name: "Unit 5: Ind AS 111 Joint Arrangements", url: "https://resource.cdn.icai.org/87880bos-290825-ch13-u5.pdf" },
            { name: "Unit 6: Ind AS 28 Investments in Associates & Joint Ventures", url: "https://resource.cdn.icai.org/87881bos-290825-ch13-u6.pdf" },
            { name: "Unit 7: Ind AS 27 Separate Financial Statements", url: "https://resource.cdn.icai.org/87882bos-290825-ch13-u7.pdf" },
            { name: "Unit 8: Disclosures", url: "https://resource.cdn.icai.org/87883bos-290825-ch13-u8.pdf" }
          ],
          illustrations: [
            { q: "What constitutes control under Ind AS 110?", a: "Exposure to variable returns and the power to direct the relevant activities of the investee." }
          ]
        },
        {
          id: "fn_fr_c14",
          name: "Chapter 14: Ind AS 101 First-time Adoption of Ind AS",
          weightage: "Medium",
          notes: "Procedures and exceptions for adopting Ind AS for the first time.",
          pdfUrls: ["https://resource.cdn.icai.org/87884bos-290825-ch14.pdf"],
          units: [
            { name: "Chapter 14 Full PDF", url: "https://resource.cdn.icai.org/87884bos-290825-ch14.pdf" }
          ],
          illustrations: [
            { q: "What is the date of transition?", a: "The beginning of the earliest period for which an entity presents full comparative information under Ind AS." }
          ]
        },
        {
          id: "fn_fr_c15",
          name: "Chapter 15: Analysis of Financial Statements",
          weightage: "Medium",
          notes: "Methods and ratios to analyze corporate financial performance.",
          pdfUrls: ["https://resource.cdn.icai.org/87885bos-290825-ch15.pdf"],
          units: [
            { name: "Chapter 15 Full PDF", url: "https://resource.cdn.icai.org/87885bos-290825-ch15.pdf" }
          ],
          illustrations: [
            { q: "State two tools of analysis.", a: "Ratio analysis and Cash Flow Statement analysis." }
          ]
        },
        {
          id: "fn_fr_c16",
          name: "Chapter 16: Professional and Ethical Duty of a Chartered Accountant",
          weightage: "High",
          notes: "Ethical standards, code of conduct, and professional responsibilities of CAs.",
          pdfUrls: ["https://resource.cdn.icai.org/87886bos-290825-ch16.pdf"],
          units: [
            { name: "Chapter 16 Full PDF", url: "https://resource.cdn.icai.org/87886bos-290825-ch16.pdf" }
          ],
          illustrations: [
            { q: "What are the fundamental principles of professional ethics?", a: "Integrity, Objectivity, Professional Competence & Due Care, Confidentiality, and Professional Behavior." }
          ]
        },
        {
          id: "fn_fr_c17",
          name: "Chapter 17: Accounting and Technology",
          weightage: "Low",
          notes: "Examines technology impact: ERP, Big Data, Blockchain, and AI in accounting.",
          pdfUrls: ["https://resource.cdn.icai.org/87887bos-290825-ch17.pdf"],
          units: [
            { name: "Chapter 17 Full PDF", url: "https://resource.cdn.icai.org/87887bos-290825-ch17.pdf" }
          ],
          illustrations: [
            { q: "Name a benefit of Blockchain in accounting.", a: "Real-time auditing, absolute data integrity, and high transparency." }
          ]
        }
      ]
    },
    {
      subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/sm-final-p2-may2026",
      chapters: [
        {
          id: "fn_sfm_c1",
          name: "Chapter 1: Financial Policy and Corporate Strategy",
          weightage: "Medium",
          notes: "Examine relationship between financial policy and corporate strategy. Covers strategic decision making framework, balancing of financial goals, and sustainable growth model.",
          pdfUrls: ["https://resource.cdn.icai.org/87842bos-aps2163-ch1.pdf"],
          units: [
            { name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/87842bos-aps2163-ch1.pdf" }
          ],
          illustrations: [
            { q: "What is Sustainable Growth Rate (SGR)?", a: "The maximum rate at which a company can grow its sales without raising additional external equity or changing its financial policies. Formula: SGR = b * ROE, where b is retention ratio and ROE is Return on Equity." }
          ]
        },
        {
          id: "fn_sfm_c2",
          name: "Chapter 2: Risk Management",
          weightage: "Medium",
          notes: "Focuses on identification, measurement, and control of risk. Covers types of risks (credit, market, operational), Value at Risk (VaR), and risk mitigation strategies.",
          pdfUrls: ["https://resource.cdn.icai.org/87843bos-aps2163-ch2.pdf"],
          units: [
            { name: "Chapter 2 Full PDF", url: "https://resource.cdn.icai.org/87843bos-aps2163-ch2.pdf" }
          ],
          illustrations: [
            { q: "Define Value at Risk (VaR).", a: "A statistical metric that measures the maximum potential loss in the value of an asset or portfolio over a specified time horizon at a given confidence level under normal market conditions." }
          ]
        },
        {
          id: "fn_sfm_c3",
          name: "Chapter 3: Advanced Capital Budgeting Decisions",
          weightage: "High",
          notes: "Analyze long-term investment projects under risk and uncertainty. Includes Adjusted Present Value (APV), replacement decisions, inflation adjustments, and real options.",
          pdfUrls: ["https://resource.cdn.icai.org/87844bos-aps2163-ch3.pdf"],
          units: [
            { name: "Chapter 3 Full PDF", url: "https://resource.cdn.icai.org/87844bos-aps2163-ch3.pdf" }
          ],
          illustrations: [
            { q: "What is Adjusted Present Value (APV)?", a: "APV = Base-case NPV (assuming all-equity finance) + Net Present Value of financing side effects (like tax shield on debt interest, issue costs)." }
          ]
        },
        {
          id: "fn_sfm_c4",
          name: "Chapter 4: Security Analysis",
          weightage: "Medium",
          notes: "Study fundamental analysis (Economic, Industry, Company analysis) and technical analysis indicators (charts, moving averages, RSI). Covers Efficient Market Hypothesis (EMH) forms.",
          pdfUrls: ["https://resource.cdn.icai.org/87845bos-aps2163-ch4.pdf"],
          units: [
            { name: "Chapter 4 Full PDF", url: "https://resource.cdn.icai.org/87845bos-aps2163-ch4.pdf" }
          ],
          illustrations: [
            { q: "Differentiate Weak, Semi-Strong, and Strong forms of EMH.", a: "Weak form: Stock prices reflect all historical price information. Semi-strong form: Reflect all public information. Strong form: Reflect all public and private/insider information." }
          ]
        },
        {
          id: "fn_sfm_c5",
          name: "Chapter 5: Security Valuation",
          weightage: "High",
          notes: "Valuation of fixed income securities (bonds, debentures) and equity shares. Includes Dividend Discount Models, Free Cash Flow models, yield measures, and bond duration/convexity.",
          pdfUrls: ["https://resource.cdn.icai.org/87846bos-aps2163-ch5.pdf"],
          units: [
            { name: "Chapter 5 Full PDF", url: "https://resource.cdn.icai.org/87846bos-aps2163-ch5.pdf" }
          ],
          illustrations: [
            { q: "What is Macauley Duration?", a: "The weighted average time to receive all cash flows from a bond, where the weights are the present values of each cash flow as a proportion of the bond's price." }
          ]
        },
        {
          id: "fn_sfm_c6",
          name: "Chapter 6: Portfolio Management",
          weightage: "High",
          notes: "Portfolio theory and asset pricing models. Covers Markowitz mean-variance optimization, Sharpe Single Index Model, Capital Asset Pricing Model (CAPM), Arbitrage Pricing Theory (APT), and portfolio evaluation (Sharpe, Treynor, Jensen).",
          pdfUrls: ["https://resource.cdn.icai.org/87847bos-aps2163-ch6.pdf"],
          units: [
            { name: "Chapter 6 Full PDF", url: "https://resource.cdn.icai.org/87847bos-aps2163-ch6.pdf" }
          ],
          illustrations: [
            { q: "Explain Sharpe Ratio vs Treynor Ratio.", a: "Sharpe Ratio measures excess return per unit of total risk (Standard Deviation): (Rp - Rf) / SD. Treynor Ratio measures excess return per unit of systematic risk (Beta): (Rp - Rf) / Beta." }
          ]
        },
        {
          id: "fn_sfm_c7",
          name: "Chapter 7: Securitization",
          weightage: "Medium",
          notes: "Securitization process, instruments, participants, pricing, and key benefits to financial intermediaries and borrowers.",
          pdfUrls: ["https://resource.cdn.icai.org/87848bos-aps2163-ch7.pdf"],
          units: [
            { name: "Chapter 7 Full PDF", url: "https://resource.cdn.icai.org/87848bos-aps2163-ch7.pdf" }
          ],
          illustrations: [
            { q: "What is a pass-through certificate in securitization?", a: "A certificate representing direct ownership in the cash flows generated by the underlying pool of assets, which are transferred directly to investors." }
          ]
        },
        {
          id: "fn_sfm_c8",
          name: "Chapter 8: Mutual Funds",
          weightage: "Medium",
          notes: "Mutual fund structures, net asset value (NAV) calculations, performance tracking, and fund selection strategies.",
          pdfUrls: ["https://resource.cdn.icai.org/87849bos-aps2163-ch8.pdf"],
          units: [
            { name: "Chapter 8 Full PDF", url: "https://resource.cdn.icai.org/87849bos-aps2163-ch8.pdf" }
          ],
          illustrations: [
            { q: "How is Mutual Fund NAV calculated?", a: "NAV = (Market Value of Assets - Liabilities & Accrued Expenses) / Total Number of Outstanding Units." }
          ]
        },
        {
          id: "fn_sfm_c9",
          name: "Chapter 9: Derivatives Analysis and Valuation",
          weightage: "High",
          notes: "Master forwards, futures, options, and swaps. Includes pricing of futures, option Greeks (Delta, Gamma, Theta, Vega), Black-Scholes model, and interest rate/currency swaps.",
          pdfUrls: ["https://resource.cdn.icai.org/87850bos-aps2163-ch9.pdf"],
          units: [
            { name: "Chapter 9 Full PDF", url: "https://resource.cdn.icai.org/87850bos-aps2163-ch9.pdf" }
          ],
          illustrations: [
            { q: "Under the Black-Scholes option pricing model, what does Delta represent?", a: "Delta measures the rate of change of the option's price with respect to changes in the underlying asset's price: dC/dS." }
          ]
        },
        {
          id: "fn_sfm_c10",
          name: "Chapter 10: Foreign Exchange Exposure and Risk Management",
          weightage: "High",
          notes: "Forex market mechanisms, exchange rate determination theories (PPP, IRP), types of exposures (transaction, translation, economic), and hedging tools (forward cover, futures, options, money market hedge).",
          pdfUrls: ["https://resource.cdn.icai.org/87851bos-aps2163-ch10.pdf"],
          units: [
            { name: "Chapter 10 Full PDF", url: "https://resource.cdn.icai.org/87851bos-aps2163-ch10.pdf" }
          ],
          illustrations: [
            { q: "State Interest Rate Parity (IRP) theory.", a: "IRP theory states that the difference in interest rates between two countries equals the premium or discount on the forward exchange rate: F = S * (1 + Rh) / (1 + Rf)." }
          ]
        },
        {
          id: "fn_sfm_c11",
          name: "Chapter 11: International Financial Management",
          weightage: "Medium",
          notes: "Focuses on multinational capital budgeting, offshore financing, global depositary receipts (GDRs), American depositary receipts (ADRs), and international cash management.",
          pdfUrls: ["https://resource.cdn.icai.org/87852bos-aps2163-ch11.pdf"],
          units: [
            { name: "Chapter 11 Full PDF", url: "https://resource.cdn.icai.org/87852bos-aps2163-ch11.pdf" }
          ],
          illustrations: [
            { q: "What is an ADR?", a: "An American Depositary Receipt is a negotiable certificate issued by a U.S. bank representing a specified number of shares in a foreign stock that is traded on a U.S. exchange." }
          ]
        },
        {
          id: "fn_sfm_c12",
          name: "Chapter 12: Interest Rate Risk Management",
          weightage: "High",
          notes: "Interest rate risk measuring and hedging. Includes Forward Rate Agreements (FRAs), Interest Rate Swaps, Caps, Floors, and Collars.",
          pdfUrls: ["https://resource.cdn.icai.org/87853bos-aps2163-ch12.pdf"],
          units: [
            { name: "Chapter 12 Full PDF", url: "https://resource.cdn.icai.org/87853bos-aps2163-ch12.pdf" }
          ],
          illustrations: [
            { q: "Explain Interest Rate Collar.", a: "An interest rate risk mitigation strategy where an investor buys an interest rate cap while simultaneously selling an interest rate floor to lock in a specific borrowing rate band." }
          ]
        },
        {
          id: "fn_sfm_c13",
          name: "Chapter 13: Business Valuation",
          weightage: "High",
          notes: "Valuation of business enterprises, assets, and liabilities using asset-based, income-based, and market-based approaches.",
          pdfUrls: ["https://resource.cdn.icai.org/87854bos-aps2163-ch13.pdf"],
          units: [
            { name: "Chapter 13 Full PDF", url: "https://resource.cdn.icai.org/87854bos-aps2163-ch13.pdf" }
          ],
          illustrations: [
            { q: "What is Economic Value Added (EVA)?", a: "EVA = Net Operating Profit After Tax (NOPAT) - (Capital Invested * Weighted Average Cost of Capital)." }
          ]
        },
        {
          id: "fn_sfm_c14",
          name: "Chapter 14: Mergers, Acquisitions and Corporate Restructuring",
          weightage: "High",
          notes: "Synergy assessment, corporate restructuring, merger exchange ratios, takeover regulations, and post-merger integration challenges.",
          pdfUrls: ["https://resource.cdn.icai.org/87855bos-aps2163-ch14.pdf"],
          units: [
            { name: "Chapter 14 Full PDF", url: "https://resource.cdn.icai.org/87855bos-aps2163-ch14.pdf" }
          ],
          illustrations: [
            { q: "What is Minimum Exchange Ratio in mergers?", a: "The exchange ratio that the target company's shareholders will accept to maintain their pre-merger wealth (typically based on target's EPS/MPS)." }
          ]
        },
        {
          id: "fn_sfm_c15",
          name: "Chapter 15: Startup Finance",
          weightage: "Medium",
          notes: "Venture capital, angel investing, crowdfunding, private equity, bootstrapping, and strategic financing/valuation models for startups.",
          pdfUrls: ["https://resource.cdn.icai.org/87856bos-aps2163-ch15.pdf"],
          units: [
            { name: "Chapter 15 Full PDF", url: "https://resource.cdn.icai.org/87856bos-aps2163-ch15.pdf" }
          ],
          illustrations: [
            { q: "What is Bootstrapping?", a: "A startup self-funding strategy where founders build and scale a business using their own personal savings and operating revenues without external venture capital." }
          ]
        }
      ]
    },
    {
      subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/sm-final-p3-may2026",
      chapters: [
        {
          id: "fn_aud_c1",
          name: "Chapter 1: Quality Control",
          weightage: "Medium",
          notes: "SQC 1 and SA 220: quality control for firms that perform audits and reviews, engagement quality control review.",
          pdfUrls: ["https://resource.cdn.icai.org/87904bos-aps2168-ch1.pdf"],
          units: [
            { name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/87904bos-aps2168-ch1.pdf" }
          ],
          illustrations: [
            { q: "State the primary objective of SQC 1.", a: "To establish standards and provide guidance regarding a firm's responsibilities for its system of quality control for audits and reviews." }
          ]
        },
        {
          id: "fn_aud_c2",
          name: "Chapter 2: General Auditing Principles and Auditors Responsibilities",
          weightage: "High",
          notes: "Audit principles and auditor's responsibilities under standard guidelines.",
          pdfUrls: ["https://resource.cdn.icai.org/87905bos-aps2168-ch2.pdf"],
          units: [
            { name: "Chapter 2 Full PDF", url: "https://resource.cdn.icai.org/87905bos-aps2168-ch2.pdf" }
          ],
          illustrations: [
            { q: "What is professional skepticism?", a: "An attitude that includes a questioning mind, being alert to conditions which may indicate possible misstatement, and a critical assessment of audit evidence." }
          ]
        },
        {
          id: "fn_aud_c3",
          name: "Chapter 3: Audit Planning, Strategy and Execution",
          weightage: "High",
          notes: "Audit plan, audit program, and overall strategy execution.",
          pdfUrls: ["https://resource.cdn.icai.org/87906bos-aps2168-ch3.pdf"],
          units: [
            { name: "Chapter 3 Full PDF", url: "https://resource.cdn.icai.org/87906bos-aps2168-ch3.pdf" }
          ],
          illustrations: [
            { q: "What does audit planning involve?", a: "Establishing the overall audit strategy for the engagement and developing an audit plan." }
          ]
        },
        {
          id: "fn_aud_c4",
          name: "Chapter 4: Materiality, Risk Assessment and Internal Control",
          weightage: "High",
          notes: "Materiality, risk assessment, and internal controls in SA 315 & SA 320.",
          pdfUrls: ["https://resource.cdn.icai.org/87907bos-aps2168-ch4.pdf"],
          units: [
            { name: "Chapter 4 Full PDF", url: "https://resource.cdn.icai.org/87907bos-aps2168-ch4.pdf" }
          ],
          illustrations: [
            { q: "Define audit risk.", a: "The risk that the auditor expresses an inappropriate audit opinion when the financial statements are materially misstated." }
          ]
        },
        {
          id: "fn_aud_c5",
          name: "Chapter 5: Audit Evidence",
          weightage: "High",
          notes: "Audit evidence procedures and methods in SA 500.",
          pdfUrls: ["https://resource.cdn.icai.org/87908bos-aps2168-ch5.pdf"],
          units: [
            { name: "Chapter 5 Full PDF", url: "https://resource.cdn.icai.org/87908bos-aps2168-ch5.pdf" }
          ],
          illustrations: [
            { q: "What are the two characteristics of audit evidence?", a: "Sufficiency (quantity) and Appropriateness (quality)." }
          ]
        },
        {
          id: "fn_aud_c6",
          name: "Chapter 6: Completion and Review",
          weightage: "Medium",
          notes: "Auditor's responsibilities for completing the audit and final review (SA 560 & SA 570).",
          pdfUrls: ["https://resource.cdn.icai.org/87909bos-aps2168-ch6.pdf"],
          units: [
            { name: "Chapter 6 Full PDF", url: "https://resource.cdn.icai.org/87909bos-aps2168-ch6.pdf" }
          ],
          illustrations: [
            { q: "What is the auditor's duty regarding going concern?", a: "To obtain sufficient appropriate audit evidence regarding the appropriateness of management's use of the going concern basis of accounting." }
          ]
        },
        {
          id: "fn_aud_c7",
          name: "Chapter 7: Reporting",
          weightage: "High",
          notes: "Auditor's report, types of opinions, emphasis of matter, key audit matters (SA 700 series).",
          pdfUrls: ["https://resource.cdn.icai.org/87910bos-aps2168-ch7.pdf"],
          units: [
            { name: "Chapter 7 Full PDF", url: "https://resource.cdn.icai.org/87910bos-aps2168-ch7.pdf" }
          ],
          illustrations: [
            { q: "What are the three types of modified opinions?", a: "Qualified opinion, Adverse opinion, and Disclaimer of opinion." }
          ]
        },
        {
          id: "fn_aud_c8",
          name: "Chapter 8: Specialised Areas",
          weightage: "Medium",
          notes: "Audit of consolidated financial statements, special considerations (SA 800 series).",
          pdfUrls: ["https://resource.cdn.icai.org/87914bos-aps2168-ch8.pdf"],
          units: [
            { name: "Chapter 8 Full PDF", url: "https://resource.cdn.icai.org/87914bos-aps2168-ch8.pdf" }
          ],
          illustrations: [
            { q: "State one special consideration in auditing specialized areas.", a: "Ensuring compliance with the specific accounting framework applicable to that specialized entity." }
          ]
        },
        {
          id: "fn_aud_c9",
          name: "Chapter 9: Related Services",
          weightage: "Low",
          notes: "SRS 4400 and SRS 4410: engagements to perform agreed-upon procedures and compilation engagements.",
          pdfUrls: ["https://resource.cdn.icai.org/87915bos-aps2168-ch9.pdf"],
          units: [
            { name: "Chapter 9 Full PDF", url: "https://resource.cdn.icai.org/87915bos-aps2168-ch9.pdf" }
          ],
          illustrations: [
            { q: "Differentiate between compilation and audit.", a: "A compilation does not provide any assurance, whereas an audit provides reasonable assurance." }
          ]
        },
        {
          id: "fn_aud_c10",
          name: "Chapter 10: Review of Financial Information",
          weightage: "Medium",
          notes: "SRE 2400 and SRE 2410: review of historical financial statements.",
          pdfUrls: ["https://resource.cdn.icai.org/87916bos-aps2168-ch10.pdf"],
          units: [
            { name: "Chapter 10 Full PDF", url: "https://resource.cdn.icai.org/87916bos-aps2168-ch10.pdf" }
          ],
          illustrations: [
            { q: "What is SRE 2400?", a: "Engagements to Review Historical Financial Statements." }
          ]
        },
        {
          id: "fn_aud_c11",
          name: "Chapter 11: Prospective Financial Information and Other Assurance Services",
          weightage: "Medium",
          notes: "SAE 3400 & SAE 3420: examination of prospective financial information.",
          pdfUrls: ["https://resource.cdn.icai.org/87917bos-aps2168-ch11.pdf"],
          units: [
            { name: "Chapter 11 Full PDF", url: "https://resource.cdn.icai.org/87917bos-aps2168-ch11.pdf" }
          ],
          illustrations: [
            { q: "What is prospective financial information?", a: "Financial information based on assumptions about events that may occur in the future." }
          ]
        },
        {
          id: "fn_aud_c12",
          name: "Chapter 12: Digital Auditing & Assurance",
          weightage: "High",
          notes: "Auditing in an automated environment, data analytics tools, cybersecurity controls.",
          pdfUrls: ["https://resource.cdn.icai.org/87918bos-aps2168-ch12.pdf"],
          units: [
            { name: "Chapter 12 Full PDF", url: "https://resource.cdn.icai.org/87918bos-aps2168-ch12.pdf" }
          ],
          illustrations: [
            { q: "What is CAAT?", a: "Computer-Assisted Audit Techniques, which help auditors test large volumes of transaction data." }
          ]
        },
        {
          id: "fn_aud_c13",
          name: "Chapter 13: Group Audits",
          weightage: "Medium",
          notes: "SA 600: using the work of another auditor, group auditor's responsibilities.",
          pdfUrls: ["https://resource.cdn.icai.org/87919bos-aps2168-ch13.pdf"],
          units: [
            { name: "Chapter 13 Full PDF", url: "https://resource.cdn.icai.org/87919bos-aps2168-ch13.pdf" }
          ],
          illustrations: [
            { q: "What is the principal auditor's main responsibility?", a: "To determine whether their own participation is sufficient to act as the principal auditor of the group." }
          ]
        },
        {
          id: "fn_aud_c14",
          name: "Chapter 14: Special Features of Audit of Banks & Non-Banking Financial Companies",
          weightage: "High",
          notes: "Special considerations in bank audits and NBFC audits under RBI regulations.",
          pdfUrls: [
            "https://resource.cdn.icai.org/87920bos-aps2168-ch14u1.pdf",
            "https://resource.cdn.icai.org/87921bos-aps2168-ch14u2.pdf"
          ],
          units: [
            { name: "Unit 1: Audit of Banks", url: "https://resource.cdn.icai.org/87920bos-aps2168-ch14u1.pdf" },
            { name: "Unit 2: Audit of NBFCs", url: "https://resource.cdn.icai.org/87921bos-aps2168-ch14u2.pdf" }
          ],
          illustrations: [
            { q: "Differentiate bank NPA rules.", a: "An asset is classified as NPA if the interest/installment remains overdue for more than 90 days." }
          ]
        },
        {
          id: "fn_aud_c15",
          name: "Chapter 15: Overview of Audit of Public Sector Undertakings",
          weightage: "Medium",
          notes: "CAG role, compliance audit, performance audit in government companies.",
          pdfUrls: ["https://resource.cdn.icai.org/87922bos-aps2168-ch15.pdf"],
          units: [
            { name: "Chapter 15 Full PDF", url: "https://resource.cdn.icai.org/87922bos-aps2168-ch15.pdf" }
          ],
          illustrations: [
            { q: "Name the three types of PSU audits.", a: "Financial Audit, Compliance Audit, and Performance Audit." }
          ]
        },
        {
          id: "fn_aud_c16",
          name: "Chapter 16: Internal Audit",
          weightage: "Medium",
          notes: "Section 138 of Companies Act, scope of internal audit, relationship with external auditor.",
          pdfUrls: ["https://resource.cdn.icai.org/87923bos-aps2168-ch16.pdf"],
          units: [
            { name: "Chapter 16 Full PDF", url: "https://resource.cdn.icai.org/87923bos-aps2168-ch16.pdf" }
          ],
          illustrations: [
            { q: "Is internal audit mandatory for all companies?", a: "No, only for specified classes of listed and unlisted public/private companies under Section 138." }
          ]
        },
        {
          id: "fn_aud_c17",
          name: "Chapter 17: Due Diligence, Investigation & Forensic Accounting",
          weightage: "High",
          notes: "Investigating corporate frauds, transaction reviews, forensic auditing tools.",
          pdfUrls: ["https://resource.cdn.icai.org/87924bos-aps2168-ch17.pdf"],
          units: [
            { name: "Chapter 17 Full PDF", url: "https://resource.cdn.icai.org/87924bos-aps2168-ch17.pdf" }
          ],
          illustrations: [
            { q: "What is due diligence?", a: "A comprehensive analysis of a business's assets and liabilities before executing mergers or acquisitions." }
          ]
        },
        {
          id: "fn_aud_c18",
          name: "Chapter 18: Sustainable Development Goals (SDG) & Environment, Social and Governance (ESG) Assurance",
          weightage: "Low",
          notes: "Auditing ESG reports, BRSR disclosures, SEBI sustainability requirements.",
          pdfUrls: ["https://resource.cdn.icai.org/87925bos-aps2168-ch18.pdf"],
          units: [
            { name: "Chapter 18 Full PDF", url: "https://resource.cdn.icai.org/87925bos-aps2168-ch18.pdf" }
          ],
          illustrations: [
            { q: "Define BRSR under SEBI.", a: "Business Responsibility and Sustainability Report, mandatory for top 1000 listed entities." }
          ]
        },
        {
          id: "fn_aud_c19",
          name: "Chapter 19: Professional Ethics & Code of Conduct",
          weightage: "High",
          notes: "Chartered Accountants Act 1949 schedules, ethical codes, member misconduct.",
          pdfUrls: ["https://resource.cdn.icai.org/87926bos-aps2168-ch19.pdf"],
          units: [
            { name: "Chapter 19 Full PDF", url: "https://resource.cdn.icai.org/87926bos-aps2168-ch19.pdf" }
          ],
          illustrations: [
            { q: "Explain First Schedule Part I Clause 6.", a: "Deems a CA guilty if they solicit professional work directly or indirectly." }
          ]
        }
      ]
    },
    {
      subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/sm-final-p4",
      chapters: [
        {
          id: "fn_dt_c1",
          name: "Chapter 1: Basic Concepts",
          weightage: "Medium",
          notes: "Income tax rates, residential status, and scope of total income.",
          pdfUrls: ["https://resource.cdn.icai.org/88211bos-aps2299-m1-ch1.pdf"],
          units: [{ name: "BoS Material: Basic Concepts", url: "https://resource.cdn.icai.org/88211bos-aps2299-m1-ch1.pdf" }],
          illustrations: [{ q: "How is residential status determined for an individual?", a: "Based on the physical stay in India during the previous year (182 days or more) and preceding years." }]
        },
        {
          id: "fn_dt_c2",
          name: "Chapter 2: Incomes which do not form part of Total Income",
          weightage: "Low",
          notes: "Exempted incomes under Section 10.",
          pdfUrls: ["https://resource.cdn.icai.org/88212bos-aps2299-m1-ch2.pdf"],
          units: [{ name: "BoS Material: Exempt Incomes", url: "https://resource.cdn.icai.org/88212bos-aps2299-m1-ch2.pdf" }],
          illustrations: [{ q: "Are agricultural incomes exempt under Income Tax?", a: "Yes, under Section 10(1) agricultural income is fully exempt from tax." }]
        },
        {
          id: "fn_dt_c3",
          name: "Chapter 3: Profits and Gains of Business or Profession",
          weightage: "High",
          notes: "Computation of PGBP, depreciation rules under Section 32, and allowable/disallowed expenditures.",
          pdfUrls: ["https://resource.cdn.icai.org/88213bos-aps2299-m1-ch3.pdf"],
          units: [{ name: "BoS Material: PGBP", url: "https://resource.cdn.icai.org/88213bos-aps2299-m1-ch3.pdf" }],
          illustrations: [{ q: "State the block of assets depreciation rule.", a: "Depreciation is calculated on the Written Down Value (WDV) of the block of assets at specified percentage rates." }]
        },
        {
          id: "fn_dt_c4",
          name: "Chapter 4: Capital Gains",
          weightage: "High",
          notes: "Transfer of capital assets, short-term vs long-term capital gains, and exemptions under Section 54 series.",
          pdfUrls: ["https://resource.cdn.icai.org/88214bos-aps2299-m1-ch4.pdf"],
          units: [{ name: "BoS Material: Capital Gains", url: "https://resource.cdn.icai.org/88214bos-aps2299-m1-ch4.pdf" }],
          illustrations: [{ q: "What is Section 54EC exemption?", a: "Exemption on investment of capital gains in specified bonds of NHAI or REC within 6 months of transfer." }]
        },
        {
          id: "fn_dt_c5",
          name: "Chapter 5: Income from Other Sources",
          weightage: "Medium",
          notes: "Gifts taxation, dividend incomes, and share premium tax under Section 56(2)(x) & 56(2)(viib).",
          pdfUrls: ["https://resource.cdn.icai.org/88215bos-aps2299-m1-ch5.pdf"],
          units: [{ name: "BoS Material: IFOS", url: "https://resource.cdn.icai.org/88215bos-aps2299-m1-ch5.pdf" }],
          illustrations: [{ q: "What is the taxability threshold for monetary gifts received from non-relatives?", a: "If the aggregate value of such gifts exceeds ₹50,000 in a financial year, the entire amount is taxable under IFOS." }]
        },
        {
          id: "fn_dt_c6",
          name: "Chapter 6: Income of Other Persons included in Assessee's Total Income",
          weightage: "Low",
          notes: "Clubbing of income provisions under Section 60 to 64.",
          pdfUrls: ["https://resource.cdn.icai.org/88216bos-aps2299-m1-ch6.pdf"],
          units: [{ name: "BoS Material: Clubbing of Income", url: "https://resource.cdn.icai.org/88216bos-aps2299-m1-ch6.pdf" }],
          illustrations: [{ q: "Is minor's income clubbed with parents?", a: "Yes, clubbed with the parent having higher income, subject to a ₹1,500 exemption per minor child under Section 10(32)." }]
        },
        {
          id: "fn_dt_c7",
          name: "Chapter 7: Aggregation of Income, Set Off or Carry Forward of Losses",
          weightage: "Medium",
          notes: "Rules for intra-head and inter-head set off of losses, and carry forward limitations.",
          pdfUrls: ["https://resource.cdn.icai.org/88217bos-aps2299-m1-ch7.pdf"],
          units: [{ name: "BoS Material: Set Off & Losses", url: "https://resource.cdn.icai.org/88217bos-aps2299-m1-ch7.pdf" }],
          illustrations: [{ q: "Can long-term capital loss be set off against short-term capital gain?", a: "No, long-term capital loss can only be set off against long-term capital gains." }]
        },
        {
          id: "fn_dt_c8",
          name: "Chapter 8: Deductions from Gross Total Income",
          weightage: "High",
          notes: "Deductions under Chapter VI-A (Section 80C to 80U).",
          pdfUrls: ["https://resource.cdn.icai.org/88218bos-aps2299-m1-ch8.pdf"],
          units: [{ name: "BoS Material: Deductions", url: "https://resource.cdn.icai.org/88218bos-aps2299-m1-ch8.pdf" }],
          illustrations: [{ q: "State the deduction limit under Section 80D for a senior citizen.", a: "Up to ₹50,000 is allowed for health insurance premium paid for senior citizens." }]
        },
        {
          id: "fn_dt_c9",
          name: "Chapter 9: Assessment of Various Entities",
          weightage: "High",
          notes: "Taxation of companies, partnership firms, LLPs, AOPs, BOIs, and business trusts.",
          pdfUrls: ["https://resource.cdn.icai.org/88276bos-aps2299-m2-ch9.pdf"],
          units: [{ name: "BoS Material: Assessment", url: "https://resource.cdn.icai.org/88276bos-aps2299-m2-ch9.pdf" }],
          illustrations: [{ q: "Explain Minimum Alternate Tax (MAT) rate.", a: "MAT is calculated at 15% of book profits under Section 115JB." }]
        },
        {
          id: "fn_dt_c10",
          name: "Chapter 10: Assessment of Trusts and Institutions, Political Parties and Other Special Entities",
          weightage: "High",
          notes: "Exemptions and taxation under Sections 11, 12, 12AB, 13, and 13A for trusts, institutions, and political parties.",
          pdfUrls: ["https://resource.cdn.icai.org/88277bos-aps2299-m2-ch10.pdf"],
          units: [{ name: "BoS Material: Trust Assessment", url: "https://resource.cdn.icai.org/88277bos-aps2299-m2-ch10.pdf" }],
          illustrations: [{ q: "What is the accumulation limit for trust income?", a: "Trusts can accumulate up to 15% of their income indefinitely, and can accumulate more for specific purposes for up to 5 years." }]
        },
        {
          id: "fn_dt_c11",
          name: "Chapter 11: Tax Planning, Tax Avoidance and Tax Evasion",
          weightage: "Medium",
          notes: "Differentiating between legitimate tax planning, avoidance (GAAR/SAAR), and illegal tax evasion.",
          pdfUrls: ["https://resource.cdn.icai.org/88278bos-aps2299-m2-ch11.pdf"],
          units: [{ name: "BoS Material: Tax Planning", url: "https://resource.cdn.icai.org/88278bos-aps2299-m2-ch11.pdf" }],
          illustrations: [{ q: "What is GAAR?", a: "General Anti-Avoidance Rules allow the tax department to declare an arrangement as an Impermissible Avoidance Arrangement (IAA)." }]
        },
        {
          id: "fn_dt_c12",
          name: "Chapter 12: Taxation of Digital Transactions",
          weightage: "High",
          notes: "Equalisation levy, Virtual Digital Assets (VDAs) under Section 115BBH, and Significant Economic Presence (SEP).",
          pdfUrls: ["https://resource.cdn.icai.org/88279bos-aps2299-m2-ch12.pdf"],
          units: [{ name: "BoS Material: Digital Transactions", url: "https://resource.cdn.icai.org/88279bos-aps2299-m2-ch12.pdf" }],
          illustrations: [{ q: "What is the tax rate on transfer of Virtual Digital Assets?", a: "Levied at flat 30% plus surcharge and cess, with no deductions allowed for expenses other than cost of acquisition." }]
        },
        {
          id: "fn_dt_c13",
          name: "Chapter 13: Deduction, Collection and Recovery of Tax",
          weightage: "High",
          notes: "TDS, TCS, and recovery procedures under Sections 192 to 206CCA.",
          pdfUrls: ["https://resource.cdn.icai.org/88894bos-aps2299-m3-ch13.pdf"],
          units: [{ name: "BoS Material: TDS/TCS", url: "https://resource.cdn.icai.org/88894bos-aps2299-m3-ch13.pdf" }],
          illustrations: [{ q: "What is the TDS rate under Section 194J for professional fees?", a: "TDS is deducted at 10% (or 2% for technical services) for fees exceeding ₹30,000." }]
        },
        {
          id: "fn_dt_c14",
          name: "Chapter 14: Income Tax Authorities",
          weightage: "Low",
          notes: "Jurisdiction, powers, control, search, and seizure powers of IT authorities.",
          pdfUrls: ["https://resource.cdn.icai.org/88895bos-aps2299-m3-ch14.pdf"],
          units: [{ name: "BoS Material: IT Authorities", url: "https://resource.cdn.icai.org/88895bos-aps2299-m3-ch14.pdf" }],
          illustrations: [{ q: "State the power of search and seizure.", a: "Authorized officers can enter premises, search, break open doors/locks, and seize books of accounts/assets under Section 132." }]
        },
        {
          id: "fn_dt_c15",
          name: "Chapter 15: Assessment Procedure",
          weightage: "High",
          notes: "Filing of returns, self-assessment, inquiry, regular assessment, and best judgment assessment.",
          pdfUrls: ["https://resource.cdn.icai.org/88896bos-aps2299-m3-ch15.pdf"],
          units: [{ name: "BoS Material: Assessment Procedure", url: "https://resource.cdn.icai.org/88896bos-aps2299-m3-ch15.pdf" }],
          illustrations: [{ q: "What is Best Judgment Assessment under Section 144?", a: "An assessment carried out by the AO when the assessee fails to file a return, comply with notices, or complete audit directions." }]
        },
        {
          id: "fn_dt_c16",
          name: "Chapter 16: Appeals and Revision",
          weightage: "High",
          notes: "Appeals to CIT(A), ITAT, High Court, Supreme Court, and revisions under Sections 263 and 264.",
          pdfUrls: ["https://resource.cdn.icai.org/88897bos-aps2299-m3-ch16.pdf"],
          units: [{ name: "BoS Material: Appeals & Revision", url: "https://resource.cdn.icai.org/88897bos-aps2299-m3-ch16.pdf" }],
          illustrations: [{ q: "Differentiate Section 263 vs 264 revision.", a: "Section 263: Revision of orders prejudicial to the interests of revenue. Section 264: Revision of other orders, typically in favor of the assessee." }]
        },
        {
          id: "fn_dt_c17",
          name: "Chapter 17: Dispute Resolution",
          weightage: "Medium",
          notes: "Dispute Resolution Committee (DRC) and Board for Advance Rulings (BAR) frameworks.",
          pdfUrls: ["https://resource.cdn.icai.org/88898bos-aps2299-m3-ch17.pdf"],
          units: [{ name: "BoS Material: Dispute Resolution", url: "https://resource.cdn.icai.org/88898bos-aps2299-m3-ch17.pdf" }],
          illustrations: [{ q: "What is the threshold to opt for DRC?", a: "Available to small assessees where returned income is up to ₹50 lakh and variation proposed is up to ₹10 lakh." }]
        },
        {
          id: "fn_dt_c18",
          name: "Chapter 18: Miscellaneous Provisions",
          weightage: "Low",
          notes: "Interest, penalties, offences, prosecutions, and other special provisions.",
          pdfUrls: ["https://resource.cdn.icai.org/88899bos-aps2299-m3-ch18.pdf"],
          units: [{ name: "BoS Material: Miscellaneous", url: "https://resource.cdn.icai.org/88899bos-aps2299-m3-ch18.pdf" }],
          illustrations: [{ q: "State the interest rate under Section 234B.", a: "Simple interest at 1% per month for default in payment of advance tax." }]
        },
        {
          id: "fn_dt_c19",
          name: "Chapter 19: Provisions to Counteract Unethical Tax Practices",
          weightage: "Medium",
          notes: "Penalties for search and seizure under Section 271AAB, and measures against cash transactions.",
          pdfUrls: ["https://resource.cdn.icai.org/88900bos-aps2299-m3-ch19.pdf"],
          units: [{ name: "BoS Material: Anti-Unethical Practices", url: "https://resource.cdn.icai.org/88900bos-aps2299-m3-ch19.pdf" }],
          illustrations: [{ q: "What is the penalty for cash loans exceeding ₹20,000 under Section 271D?", a: "A penalty equal to the amount of loan taken in cash, under Section 269SS." }]
        },
        {
          id: "fn_dt_c20",
          name: "Chapter 20: Tax Audit and Ethical Compliances",
          weightage: "Medium",
          notes: "Form 3CD audit reports, thresholds under Section 44AB, and ethical duties of CAs.",
          pdfUrls: ["https://resource.cdn.icai.org/88902bos-aps2299-m3-ch20.pdf"],
          units: [{ name: "BoS Material: Tax Audit", url: "https://resource.cdn.icai.org/88902bos-aps2299-m3-ch20.pdf" }],
          illustrations: [{ q: "What is the threshold limit for tax audit for business?", a: "₹1 crore, which increases to ₹10 crore if cash transactions (receipts & payments) do not exceed 5% of total transactions." }]
        },
        {
          id: "fn_dt_c21",
          name: "Chapter 21: Non-Resident Taxation",
          weightage: "High",
          notes: "Taxation of foreign companies, royalties, FTS, residency of shipping/aviation businesses, and foreign investment funds.",
          pdfUrls: ["https://resource.cdn.icai.org/88426bos-aps2299-m4-ch21.pdf"],
          units: [{ name: "BoS Material: Non-Resident Taxation", url: "https://resource.cdn.icai.org/88426bos-aps2299-m4-ch21.pdf" }],
          illustrations: [{ q: "What is the tax rate on Royalty and FTS for non-residents under Section 115A?", a: "Levied at a flat rate of 20% (plus surcharge and cess)." }]
        },
        {
          id: "fn_dt_c22",
          name: "Chapter 22: Double Taxation Relief",
          weightage: "High",
          notes: "Bilateral tax relief under Section 90, and unilateral tax relief under Section 91.",
          pdfUrls: ["https://resource.cdn.icai.org/88427bos-aps2299-m4-ch22.pdf"],
          units: [{ name: "BoS Material: DTAA", url: "https://resource.cdn.icai.org/88427bos-aps2299-m4-ch22.pdf" }],
          illustrations: [{ q: "Explain the formula for Section 91 unilateral relief.", a: "Unilateral relief is calculated by applying the lower of the Indian tax rate or foreign tax rate to the doubly taxed foreign income." }]
        },
        {
          id: "fn_dt_c23",
          name: "Chapter 23: Advance Rulings",
          weightage: "Low",
          notes: "Board for Advance Rulings (BAR) structure, applications, and binding nature.",
          pdfUrls: ["https://resource.cdn.icai.org/88428bos-aps2299-m4-ch23.pdf"],
          units: [{ name: "BoS Material: Advance Rulings", url: "https://resource.cdn.icai.org/88428bos-aps2299-m4-ch23.pdf" }],
          illustrations: [{ q: "Is the advance ruling binding under the new BAR scheme?", a: "Unlike the old AAR, BAR rulings are not binding, and both the assessee and department can appeal BAR orders in the High Court." }]
        },
        {
          id: "fn_dt_c24",
          name: "Chapter 24: Transfer Pricing",
          weightage: "High",
          notes: "Arm's Length Price computation, safe harbor rules, APA, secondary adjustments, and thin capitalization rules.",
          pdfUrls: ["https://resource.cdn.icai.org/88429bos-aps2299-m4-ch24.pdf"],
          units: [{ name: "BoS Material: Transfer Pricing", url: "https://resource.cdn.icai.org/88429bos-aps2299-m4-ch24.pdf" }],
          illustrations: [{ q: "Define Primary vs Secondary Adjustment under Section 92CE.", a: "Primary adjustment increases taxable income. Secondary adjustment is made to align actual cash flows with primary adjustments, treating un-repatriated cash as a loan." }]
        },
        {
          id: "fn_dt_c25",
          name: "Chapter 25: Fundamentals of BEPS",
          weightage: "Medium",
          notes: "Overview of the 15 Base Erosion and Profit Shifting (BEPS) Action Plans by OECD.",
          pdfUrls: ["https://resource.cdn.icai.org/88430bos-aps2299-m4-ch25.pdf"],
          units: [{ name: "BoS Material: BEPS Overview", url: "https://resource.cdn.icai.org/88430bos-aps2299-m4-ch25.pdf" }],
          illustrations: [{ q: "What is BEPS Action Plan 1?", a: "Addressing the tax challenges of the Digital Economy (leading to Equalisation Levy in India)." }]
        },
        {
          id: "fn_dt_c26",
          name: "Chapter 26: Application and Interpretation of Tax Treaties",
          weightage: "Medium",
          notes: "Vienna Convention rules, treaty override, and treaty abuse preventions.",
          pdfUrls: ["https://resource.cdn.icai.org/88431bos-aps2299-m4-ch26.pdf"],
          units: [{ name: "BoS Material: Treaty Interpretation", url: "https://resource.cdn.icai.org/88431bos-aps2299-m4-ch26.pdf" }],
          illustrations: [{ q: "What is Treaty Override?", a: "When domestic tax legislation is enacted to intentionally conflict with or supersede existing DTAA provisions." }]
        },
        {
          id: "fn_dt_c27",
          name: "Chapter 27: Overview of Model Tax Conventions",
          weightage: "Medium",
          notes: "Comparing OECD Model, UN Model, and US Model Tax Conventions.",
          pdfUrls: ["https://resource.cdn.icai.org/88432bos-aps2299-m4-ch27.pdf"],
          units: [{ name: "BoS Material: Model Conventions", url: "https://resource.cdn.icai.org/88432bos-aps2299-m4-ch27.pdf" }],
          illustrations: [{ q: "Differentiate OECD vs UN Model Tax Conventions.", a: "OECD Model favors residence-based taxation, while UN Model favors source-based taxation, protecting the rights of developing nations." }]
        },
        {
          id: "fn_dt_c28",
          name: "Chapter 28: Latest Developments in International Taxation",
          weightage: "Medium",
          notes: "Pillar 1 and Pillar 2 Global Minimum Tax (15%) frameworks and MLI implementation.",
          pdfUrls: ["https://resource.cdn.icai.org/88433bos-aps2299-m4-ch28.pdf"],
          units: [{ name: "BoS Material: Latest Developments", url: "https://resource.cdn.icai.org/88433bos-aps2299-m4-ch28.pdf" }],
          illustrations: [{ q: "What is the global minimum tax rate under Pillar 2?", a: "Pillar 2 establishes a global minimum corporate tax rate of 15% for multinational enterprises." }]
        }
      ]
    },
    {
      subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/sm-final-p5",
      chapters: [
        // PART I: GST (Chapters 1 to 24)
        {
          id: "fn_idt_c1",
          name: "Chapter 1: Supply under GST",
          weightage: "High",
          notes: "Scope of supply under Section 7, composite & mixed supply, and Sch I/II/III transactions.",
          pdfUrls: ["https://resource.cdn.icai.org/87619bos-aps2102-p5u1.pdf"],
          units: [{ name: "BoS: Supply under GST", url: "https://resource.cdn.icai.org/87619bos-aps2102-p5u1.pdf" }],
          illustrations: [{ q: "What is a composite supply?", a: "Naturally bundled and supplied together with one principal supply, e.g. laptop and its charger." }]
        },
        {
          id: "fn_idt_c2",
          name: "Chapter 2: Charge of GST",
          weightage: "High",
          notes: "CGST, SGST, IGST levy, Reverse Charge Mechanism (RCM) under Sec 9(3) & 9(4), and Composition Scheme.",
          pdfUrls: ["https://resource.cdn.icai.org/87620bos-aps2102-p5u2.pdf"],
          units: [{ name: "BoS: Charge of GST", url: "https://resource.cdn.icai.org/87620bos-aps2102-p5u2.pdf" }],
          illustrations: [{ q: "What is RCM?", a: "The liability to pay tax is on the recipient of goods/services rather than the supplier." }]
        },
        {
          id: "fn_idt_c3",
          name: "Chapter 3: Place of Supply",
          weightage: "High",
          notes: "Determining Place of Supply of goods and services under IGST Act (Sections 10 to 14).",
          pdfUrls: ["https://resource.cdn.icai.org/87621bos-aps2102-p5u3.pdf"],
          units: [{ name: "BoS: Place of Supply", url: "https://resource.cdn.icai.org/87621bos-aps2102-p5u3.pdf" }],
          illustrations: [{ q: "What is place of supply for goods with movement?", a: "The location where the movement of goods terminates for delivery to the recipient." }]
        },
        {
          id: "fn_idt_c4",
          name: "Chapter 4: Exemptions from GST",
          weightage: "Medium",
          notes: "Exemptions for healthcare, education, agricultural activities, governmental, and charitable services.",
          pdfUrls: ["https://resource.cdn.icai.org/87622bos-aps2102-p5u4.pdf"],
          units: [{ name: "BoS: Exemptions", url: "https://resource.cdn.icai.org/87622bos-aps2102-p5u4.pdf" }],
          illustrations: [{ q: "Are services of public libraries exempt?", a: "Yes, services provided by way of lending of books or publications by public libraries are exempt." }]
        },
        {
          id: "fn_idt_c5",
          name: "Chapter 5: Time of Supply",
          weightage: "High",
          notes: "Statutory rules to determine tax liability point under Section 12 & 13 of CGST Act.",
          pdfUrls: ["https://resource.cdn.icai.org/87623bos-aps2102-p5u5.pdf"],
          units: [{ name: "BoS: Time of Supply", url: "https://resource.cdn.icai.org/87623bos-aps2102-p5u5.pdf" }],
          illustrations: [{ q: "What is time of supply for vouchers?", a: "If supply is identifiable, date of issue of voucher; otherwise, date of redemption." }]
        },
        {
          id: "fn_idt_c6",
          name: "Chapter 6: Value of Supply",
          weightage: "High",
          notes: "Transaction value under Section 15, inclusions/exclusions, and GST Valuation Rules.",
          pdfUrls: ["https://resource.cdn.icai.org/88087bos-aps2102-ch6.pdf"],
          units: [{ name: "BoS: Value of Supply", url: "https://resource.cdn.icai.org/88087bos-aps2102-ch6.pdf" }],
          illustrations: [{ q: "Are subsidies included in value of supply?", a: " Subsidies directly linked to price are included, unless provided by Central or State governments." }]
        },
        {
          id: "fn_idt_c7",
          name: "Chapter 7: Input Tax Credit",
          weightage: "High",
          notes: "Eligibility, block credits (Sec 17(5)), and reversal of input tax credit (Rules 42 & 43).",
          pdfUrls: ["https://resource.cdn.icai.org/88886bos-aps2102-m2-p7.pdf"],
          units: [{ name: "BoS: ITC", url: "https://resource.cdn.icai.org/88886bos-aps2102-m2-p7.pdf" }],
          illustrations: [{ q: "State one blocked credit item.", a: "Works contract services for construction of an immovable property, except for plant and machinery." }]
        },
        {
          id: "fn_idt_c8",
          name: "Chapter 8: Registration",
          weightage: "High",
          notes: "Compulsory registration thresholds, procedures, amendment, and cancellation rules.",
          pdfUrls: ["https://resource.cdn.icai.org/88887bos-aps2102-m2-p8.pdf"],
          units: [{ name: "BoS: Registration", url: "https://resource.cdn.icai.org/88887bos-aps2102-m2-p8.pdf" }],
          illustrations: [{ q: "When is registration compulsory without threshold limit?", a: "Under Section 24, e.g., inter-state taxable suppliers, casual taxable persons, RCM payers." }]
        },
        {
          id: "fn_idt_c9",
          name: "Chapter 9: Tax Invoice, Credit and Debit Notes",
          weightage: "Medium",
          notes: "Rules for credit/debit notes, delivery challans, receipt vouchers, and e-invoicing compliance.",
          pdfUrls: ["https://resource.cdn.icai.org/88888bos-aps2102-m2-p9.pdf"],
          units: [{ name: "BoS: Invoicing", url: "https://resource.cdn.icai.org/88888bos-aps2102-m2-p9.pdf" }],
          illustrations: [{ q: "When is a debit note issued?", a: "When taxable value or tax charged in invoice is lower than actual tax or value." }]
        },
        {
          id: "fn_idt_c10",
          name: "Chapter 10: Accounts and Records; E-way Bill",
          weightage: "High",
          notes: "E-way bill generation rules, rules for maintaining accounts and registers under GST.",
          pdfUrls: ["https://resource.cdn.icai.org/88889bos-aps2102-m2-p10.pdf"],
          units: [{ name: "BoS: Accounts & E-way Bill", url: "https://resource.cdn.icai.org/88889bos-aps2102-m2-p10.pdf" }],
          illustrations: [{ q: "What is E-Way Bill threshold?", a: "₹50,000 for inter-state movement of goods." }]
        },
        {
          id: "fn_idt_c11",
          name: "Chapter 11: Payment of Tax",
          weightage: "Medium",
          notes: "Electronic ledger rules, payment mechanism, TDS/TCS under GST.",
          pdfUrls: ["https://resource.cdn.icai.org/88890bos-aps2102-m2-p11.pdf"],
          units: [{ name: "BoS: Payment of Tax", url: "https://resource.cdn.icai.org/88890bos-aps2102-m2-p11.pdf" }],
          illustrations: [{ q: "What is the interest on delayed payment?", a: "18% p.a. calculated from the next day of the due date." }]
        },
        {
          id: "fn_idt_c12",
          name: "Chapter 12: Electronic Commerce Transactions",
          weightage: "Medium",
          notes: "Tax Collection at Source (TCS) by e-commerce operators, and e-commerce models under Sec 9(5).",
          pdfUrls: ["https://resource.cdn.icai.org/88891bos-aps2102-m2-p12.pdf"],
          units: [{ name: "BoS: E-commerce", url: "https://resource.cdn.icai.org/88891bos-aps2102-m2-p12.pdf" }],
          illustrations: [{ q: "State TCS rate for e-commerce operator.", a: "1% of net value of taxable supplies made through it." }]
        },
        {
          id: "fn_idt_c13",
          name: "Chapter 13: Returns",
          weightage: "Medium",
          notes: "GSTR-1, GSTR-3B, GSTR-9 annual return rules, and QRMP scheme.",
          pdfUrls: ["https://resource.cdn.icai.org/88892bos-aps2102-m2-p13.pdf"],
          units: [{ name: "BoS: Returns", url: "https://resource.cdn.icai.org/88892bos-aps2102-m2-p13.pdf" }],
          illustrations: [{ q: "What is QRMP Scheme?", a: "Quarterly Return Monthly Payment scheme for taxpayers with turnover up to ₹5 crore." }]
        },
        {
          id: "fn_idt_c14",
          name: "Chapter 14: Import and Export Under GST",
          weightage: "High",
          notes: "Zero-rated supplies, LUT/bond rules, and IGST treatment of imports/exports.",
          pdfUrls: ["https://resource.cdn.icai.org/88819bos-aps2102-m3-ch14.pdf"],
          units: [{ name: "BoS: Imports & Exports", url: "https://resource.cdn.icai.org/88819bos-aps2102-m3-ch14.pdf" }],
          illustrations: [{ q: "Define Zero-rated supply.", a: "Export of goods/services or supply to a Special Economic Zone (SEZ) developer/unit." }]
        },
        {
          id: "fn_idt_c15",
          name: "Chapter 15: Refunds",
          weightage: "High",
          notes: "Refund mechanisms, inverted duty structure, and export refunds under Section 54.",
          pdfUrls: ["https://resource.cdn.icai.org/88820bos-aps2102-m3-ch15.pdf"],
          units: [{ name: "BoS: Refunds", url: "https://resource.cdn.icai.org/88820bos-aps2102-m3-ch15.pdf" }],
          illustrations: [{ q: "What is Inverted Duty Structure refund?", a: "Refund of accumulated ITC where tax rate on inputs is higher than outward tax rate." }]
        },
        {
          id: "fn_idt_c16",
          name: "Chapter 16: Job Work",
          weightage: "Medium",
          notes: "Conditions and procedures for dispatch of inputs/capital goods for job work under Section 143.",
          pdfUrls: ["https://resource.cdn.icai.org/88821bos-aps2102-m3-ch16.pdf"],
          units: [{ name: "BoS: Job Work", url: "https://resource.cdn.icai.org/88821bos-aps2102-m3-ch16.pdf" }],
          illustrations: [{ q: "What is time limit to bring back inputs from job worker?", a: "Inputs must be brought back or sold within 1 year (extendable by 1 year) of dispatch." }]
        },
        {
          id: "fn_idt_c17",
          name: "Chapter 17: Assessment and Audit",
          weightage: "Medium",
          notes: "Self-assessment, provisional assessment, scrutiny, and departmental/special audits.",
          pdfUrls: ["https://resource.cdn.icai.org/88822bos-aps2102-m3-ch17.pdf"],
          units: [{ name: "BoS: Assessment & Audit", url: "https://resource.cdn.icai.org/88822bos-aps2102-m3-ch17.pdf" }],
          illustrations: [{ q: "Who conducts Special Audit under Section 66?", a: "A CA or CMA nominated by the Commissioner." }]
        },
        {
          id: "fn_idt_c18",
          name: "Chapter 18: Inspection, Search, Seizure and Arrest",
          weightage: "High",
          notes: "Statutory powers under Section 67 to 69, search warrants, and bail provisions.",
          pdfUrls: ["https://resource.cdn.icai.org/88823bos-aps2102-m3-ch18.pdf"],
          units: [{ name: "BoS: Search & Seizure", url: "https://resource.cdn.icai.org/88823bos-aps2102-m3-ch18.pdf" }],
          illustrations: [{ q: "When can an order search?", a: "When there is reason to believe that a taxable person has suppressed transactions or keeps goods illegally." }]
        },
        {
          id: "fn_idt_c19",
          name: "Chapter 19: Demands and Recovery",
          weightage: "High",
          notes: "Show Cause Notices (SCNs) under Sections 73 and 74, penalties, and modes of recovery.",
          pdfUrls: ["https://resource.cdn.icai.org/88824bos-aps2102-m3-ch19.pdf"],
          units: [{ name: "BoS: Demands", url: "https://resource.cdn.icai.org/88824bos-aps2102-m3-ch19.pdf" }],
          illustrations: [{ q: "Differentiate Section 73 vs 74.", a: "Section 73 deals with non-fraud cases; Section 74 deals with cases involving fraud, willful misstatement, or suppression." }]
        },
        {
          id: "fn_idt_c20",
          name: "Chapter 20: Liability to Pay in Certain Cases",
          weightage: "Low",
          notes: "Transfer of business, agent/principal, mergers, liquidations, and guardians/trustees liabilities.",
          pdfUrls: ["https://resource.cdn.icai.org/88825bos-aps2102-m3-ch20.pdf"],
          units: [{ name: "BoS: Liabilities in Special Cases", url: "https://resource.cdn.icai.org/88825bos-aps2102-m3-ch20.pdf" }],
          illustrations: [{ q: "Is a principal liable for agent's tax?", a: "Yes, principal and agent are jointly and severally liable to pay tax on supplies made through agent." }]
        },
        {
          id: "fn_idt_c21",
          name: "Chapter 21: Offences and Penalties and Ethical Aspects under GST",
          weightage: "High",
          notes: "Cognizable and non-cognizable offences, prosecution limits, compounding of offences, and ethical compliances.",
          pdfUrls: ["https://resource.cdn.icai.org/88826bos-aps2102-m3-ch21.pdf"],
          units: [{ name: "BoS: Offences & Ethics", url: "https://resource.cdn.icai.org/88826bos-aps2102-m3-ch21.pdf" }],
          illustrations: [{ q: "What is compounding of offences?", a: "Settling disputes by paying compounding fees instead of facing criminal prosecution." }]
        },
        {
          id: "fn_idt_c22",
          name: "Chapter 22: Appeals and Revision",
          weightage: "High",
          notes: "Appeals to Appellate Authority, Appellate Tribunal (GSTAT), High Court, Supreme Court, and revisionary powers of Commissioner.",
          pdfUrls: ["https://resource.cdn.icai.org/88827bos-aps2102-m3-ch22.pdf"],
          units: [{ name: "BoS: Appeals & Revision", url: "https://resource.cdn.icai.org/88827bos-aps2102-m3-ch22.pdf" }],
          illustrations: [{ q: "What is the pre-deposit rate for GSTAT appeal?", a: "Generally a specific percentage of disputed tax must be paid as pre-deposit before filing appeal." }]
        },
        {
          id: "fn_idt_c23",
          name: "Chapter 23: Advance Ruling",
          weightage: "Low",
          notes: "Authority for Advance Ruling (AAR), Appellate Authority, application procedure, and binding effects.",
          pdfUrls: ["https://resource.cdn.icai.org/88828bos-aps2102-m3-ch23.pdf"],
          units: [{ name: "BoS: Advance Ruling", url: "https://resource.cdn.icai.org/88828bos-aps2102-m3-ch23.pdf" }],
          illustrations: [{ q: "On whom is the advance ruling binding?", a: "Only on the applicant who sought it and the concerned jurisdictional officer in respect of the applicant." }]
        },
        {
          id: "fn_idt_c24",
          name: "Chapter 24: Miscellaneous Provisions",
          weightage: "Low",
          notes: "Anti-profiteering measures, GST Council role, and other general provisions.",
          pdfUrls: ["https://resource.cdn.icai.org/88829bos-aps2102-m3-ch24.pdf"],
          units: [{ name: "BoS: Miscellaneous", url: "https://resource.cdn.icai.org/88829bos-aps2102-m3-ch24.pdf" }],
          illustrations: [{ q: "What is the purpose of Anti-Profiteering?", a: "To ensure that benefits of tax reduction or input tax credit are passed on to consumers by way of commensurate reduction in prices." }]
        },
        // PART II: CUSTOMS & FTP (Chapters 25 to 32)
        {
          id: "fn_idt_c25",
          name: "Chapter 25: Levy of and Exemptions from Customs Duty",
          weightage: "High",
          notes: "Levy of customs duties, taxable event, and exemptions under Section 25 of Customs Act.",
          pdfUrls: ["https://resource.cdn.icai.org/87894bos-aps2102-m4-ch1u1.pdf", "https://resource.cdn.icai.org/87895bos-aps2102-m4-ch1u2.pdf"],
          units: [
            { name: "Unit I: Intro to Customs Law", url: "https://resource.cdn.icai.org/87894bos-aps2102-m4-ch1u1.pdf" },
            { name: "Unit II: Levy and Exemptions", url: "https://resource.cdn.icai.org/87895bos-aps2102-m4-ch1u2.pdf" }
          ],
          illustrations: [{ q: "What is the taxable event for imports?", a: "When goods cross customs barriers of India and become part of the mass of goods of the country." }]
        },
        {
          id: "fn_idt_c26",
          name: "Chapter 26: Types of Duty",
          weightage: "Medium",
          notes: "Basic customs duty, IGST on imports, protective duties, anti-dumping duty, and safeguard duty.",
          pdfUrls: ["https://resource.cdn.icai.org/87896bos-aps2102-m4-ch2.pdf"],
          units: [{ name: "BoS: Types of Duty", url: "https://resource.cdn.icai.org/87896bos-aps2102-m4-ch2.pdf" }],
          illustrations: [{ q: "What is anti-dumping duty?", a: "Levied on imports sold below fair market value in India, to protect domestic industries." }]
        },
        {
          id: "fn_idt_c27",
          name: "Chapter 27: Classification of Imported and Export Goods",
          weightage: "Low",
          notes: "Customs Tariff Act, Harmonized System of Nomenclature (HSN), and Interpretative Rules.",
          pdfUrls: ["https://resource.cdn.icai.org/87897bos-aps2102-m4-ch3.pdf"],
          units: [{ name: "BoS: Classification", url: "https://resource.cdn.icai.org/87897bos-aps2102-m4-ch3.pdf" }],
          illustrations: [{ q: "How are goods classified?", a: "Using HSN codes and matching the descriptions in the Customs Tariff schedule according to classification rules." }]
        },
        {
          id: "fn_idt_c28",
          name: "Chapter 28: Valuation under the Customs Act, 1962",
          weightage: "High",
          notes: "Transaction value under Section 14, inclusions/exclusions (Rule 10), and valuation rules.",
          pdfUrls: ["https://resource.cdn.icai.org/87898bos-aps2102-m4-ch4.pdf"],
          units: [{ name: "BoS: Customs Valuation", url: "https://resource.cdn.icai.org/87898bos-aps2102-m4-ch4.pdf" }],
          illustrations: [{ q: "Are ocean freight and insurance included in customs value?", a: "Yes, under Rule 10, cost of transport up to place of importation and insurance are included." }]
        },
        {
          id: "fn_idt_c29",
          name: "Chapter 29: Importation and Exportation of Goods",
          weightage: "Medium",
          notes: "Bill of Entry, Shipping Bill, clearance procedures for home consumption/warehousing, and self-assessment.",
          pdfUrls: ["https://resource.cdn.icai.org/87899bos-aps2102-m4-ch5.pdf"],
          units: [{ name: "BoS: Import/Export Procedures", url: "https://resource.cdn.icai.org/87899bos-aps2102-m4-ch5.pdf" }],
          illustrations: [{ q: "What is Bill of Entry?", a: "A legal document filed by importer/customs broker for clearing imported goods." }]
        },
        {
          id: "fn_idt_c30",
          name: "Chapter 30: Warehousing",
          weightage: "Medium",
          notes: "Public, private, and special warehouses, warehousing bond, and manufacture in warehouse under Section 65.",
          pdfUrls: ["https://resource.cdn.icai.org/87900bos-aps2102-m4-ch6.pdf"],
          units: [{ name: "BoS: Warehousing", url: "https://resource.cdn.icai.org/87900bos-aps2102-m4-ch6.pdf" }],
          illustrations: [{ q: "State the benefit of Section 65 manufacturing in warehouse.", a: "Enables import of inputs without payment of customs duty for manufacturing export/domestic goods, deferring duty until clearance." }]
        },
        {
          id: "fn_idt_c31",
          name: "Chapter 31: Refund",
          weightage: "Low",
          notes: "Duty drawback under Section 74 & 75, refund of import duty, and provisions of unjust enrichment.",
          pdfUrls: ["https://resource.cdn.icai.org/87901bos-aps2102-m4-ch7.pdf"],
          units: [{ name: "BoS: Refunds & Drawback", url: "https://resource.cdn.icai.org/87901bos-aps2102-m4-ch7.pdf" }],
          illustrations: [{ q: "What is Section 74 Drawback?", a: "98% drawback of customs duty is refunded if imported goods are re-exported as such within 2 years." }]
        },
        {
          id: "fn_idt_c32",
          name: "Chapter 32: Foreign Trade Policy",
          weightage: "Medium",
          notes: "Basic concepts, export promotion schemes (EPCG, Advance Authorization, Duty Drawback, and RoDTEP).",
          pdfUrls: ["https://resource.cdn.icai.org/87902bos-aps2102-m4-ch8u1.pdf", "https://resource.cdn.icai.org/87903bos-aps2102-m4-ch8u2.pdf"],
          units: [
            { name: "Unit I: Intro to FTP", url: "https://resource.cdn.icai.org/87902bos-aps2102-m4-ch8u1.pdf" },
            { name: "Unit II: Export Schemes", url: "https://resource.cdn.icai.org/87903bos-aps2102-m4-ch8u2.pdf" }
          ],
          illustrations: [{ q: "What is EPCG Scheme?", a: "Export Promotion Capital Goods scheme allows import of capital goods at zero customs duty subject to an export obligation." }]
        }
      ]
    },
    {
      subject: "Paper-6: Integrated Business Solutions (May 2026 Scheme)",
      portalUrl: "https://www.icai.org/post/19442",
      chapters: [
        {
          id: "fn_ibs_c1",
          name: "IBS Case Study Digest Volume-II",
          weightage: "High",
          notes: "A comprehensive multidisciplinary case study compilation covering integration of Financial Reporting, Strategic Financial Management, Auditing, Laws, and Taxation.",
          pdfUrls: ["https://resource.cdn.icai.org/86797bos-aps1317-ibs-csd-vol-2.pdf"],
          units: [
            { name: "IBS Case Study Digest Volume-II PDF", url: "https://resource.cdn.icai.org/86797bos-aps1317-ibs-csd-vol-2.pdf" }
          ],
          illustrations: [
            {
              q: "What is the primary methodology for analyzing multidisciplinary case studies?",
              a: "Synthesize legal provisions, tax implications, financial models, and strategic options in a step-by-step manner to arrive at an optimized business solution."
            }
          ]
        },
        {
          id: "fn_ibs_c2",
          name: "IBS Case Study Digest",
          weightage: "High",
          notes: "Board of Studies multidisciplinary case studies for practical skill assessment under the CA Final curriculum.",
          pdfUrls: ["https://resource.cdn.icai.org/80945bos65122.pdf"],
          units: [
            { name: "IBS Case Study Digest PDF", url: "https://resource.cdn.icai.org/80945bos65122.pdf" }
          ],
          illustrations: [
            {
              q: "Why is the Integrated Business Solutions paper open-book?",
              a: "To simulate a real-world professional practice environment where Chartered Accountants must refer to actual tax codes, acts, and standards to solve complex client issues."
            }
          ]
        }
      ]
    }
  ]
};

export const MOCK_QUESTIONS = [
  // Foundation - Accounting
  {
    id: "q_f1",
    subject: "Paper-1: Accounting (May 2026 Scheme)",
    chapter: "Theoretical Framework",
    difficulty: "Easy",
    question: "Which accounting concept states that business will continue for an indefinite period?",
    options: ["Going Concern Concept", "Money Measurement Concept", "Business Entity Concept", "Dual Aspect Concept"],
    answer: "Going Concern Concept",
    marks: 2
  },
  {
    id: "q_f2",
    subject: "Paper-1: Accounting (May 2026 Scheme)",
    chapter: "Bank Reconciliation Statement (BRS)",
    difficulty: "Medium",
    question: "When starting with cash book overdraft balance, uncollected cheques are:",
    options: ["Added", "Subtracted", "Ignored", "Multiplied"],
    answer: "Added",
    marks: 5
  },
  // Intermediate - Advanced Accounting
  {
    id: "q_i1",
    subject: "Paper-1: Advanced Accounting (May 2026 Scheme)",
    chapter: "Chapter 5: Assets Based Accounting Standards",
    difficulty: "Medium",
    question: "If cost of inventory is ₹100,000, estimated selling price is ₹95,000, and selling expense is ₹2,000, the inventory value is:",
    options: ["₹100,000", "₹95,000", "₹93,000", "₹98,000"],
    answer: "₹93,000",
    notes: "AS-2 values at lower of Cost (100k) and NRV (95k - 2k = 93k). Therefore, 93k.",
    marks: 4
  },
  {
    id: "q_i2",
    subject: "Paper-1: Advanced Accounting (May 2026 Scheme)",
    chapter: "Chapter 5: Assets Based Accounting Standards",
    difficulty: "Hard",
    question: "Under AS-10, initial cost of PPE does NOT include:",
    options: ["Purchase price and import duties", "Delivery and handling costs", "Administration and general overheads", "Site preparation expenses"],
    answer: "Administration and general overheads",
    marks: 5
  },
  // Intermediate - Corporate Law
  {
    id: "q_i3",
    subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)",
    chapter: "Chapter 2: Incorporation of Company and Matters Incidental Thereto",
    difficulty: "Easy",
    question: "What is the minimum number of members required to incorporate a public company?",
    options: ["2 members", "7 members", "5 members", "50 members"],
    answer: "7 members",
    marks: 2
  },
  {
    id: "q_i4",
    subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)",
    chapter: "Chapter 4: Share Capital and Debentures",
    difficulty: "Medium",
    question: "Under Section 53 of the Companies Act 2013, shares issued at discount are:",
    options: ["Fully valid", "Void ab initio", "Voidable at member option", "Allowed up to 10%"],
    answer: "Void ab initio",
    marks: 4
  },
  // Intermediate - Income-tax Law
  {
    id: "q_i5",
    subject: "Paper-3A: Income-tax Law (May 2026 Scheme)",
    chapter: "Chapter 2: Residence and Scope of Total Income",
    difficulty: "Medium",
    question: "An individual is a resident in India if they stay for at least how many days during the previous year?",
    options: ["60 days", "120 days", "150 days", "182 days"],
    answer: "182 days",
    marks: 3
  },
  // Intermediate - Costing
  {
    id: "q_i6",
    subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)",
    chapter: "Chapter 2: Material Cost",
    difficulty: "Medium",
    question: "Which inventory control technique classifies items based on their critical value to the production process?",
    options: ["ABC Analysis", "VED Analysis", "FSN Analysis", "JIT System"],
    answer: "VED Analysis",
    marks: 3
  },
  // Intermediate - Auditing
  {
    id: "q_i7",
    subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)",
    chapter: "Chapter 3: Risk Assessment and Internal Control",
    difficulty: "Hard",
    question: "Audit Risk is a function of the risks of material misstatement and which of the following?",
    options: ["Inherent Risk", "Control Risk", "Detection Risk", "Business Risk"],
    answer: "Detection Risk",
    marks: 4
  },
  // Intermediate - Financial Management
  {
    id: "q_i8",
    subject: "Paper-6A: Financial Management (May 2026 Scheme)",
    chapter: "Chapter 4: Cost of Capital",
    difficulty: "Medium",
    question: "Under the Capital Asset Pricing Model (CAPM), the cost of equity is calculated as:",
    options: ["Rf + Beta * (Rm - Rf)", "Rf + Beta * Rm", "Rm + Beta * (Rm - Rf)", "Beta * (Rm - Rf)"],
    answer: "Rf + Beta * (Rm - Rf)",
    marks: 5
  },
  // Final - Financial Reporting
  {
    id: "q_fn1",
    subject: "Paper-1: Financial Reporting (May 2026 Scheme)",
    chapter: "Ind AS 115: Revenue from Contracts with Customers",
    difficulty: "Hard",
    question: "Under Ind AS 115, the transaction price is allocated to performance obligations based on relative stand-alone:",
    options: ["Selling prices", "Cost prices", "Fair market values", "Discounted cash flows"],
    answer: "Selling prices",
    marks: 6
  }
];

export const MOCK_PAPERS = {
  PYQ: [
    // Foundation - Accounts
    { id: "pyq_jun24_acc", year: 2024, month: "Jun", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Jun 2024 Accounts Exam Paper", pdfUrl: "./pdfs/foundation/pyq/JUN 24_Accounts_PYQ.pdf" },
    { id: "pyq_sep24_acc", year: 2024, month: "Sep", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Sep 2024 Accounts Exam Paper", pdfUrl: "./pdfs/foundation/pyq/SEP 24_Accouns_PYQ.pdf" },
    { id: "pyq_jan25_acc", year: 2025, month: "Jan", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Jan 2025 Accounts Exam Paper", pdfUrl: "./pdfs/foundation/pyq/JAN 25_Accouns_PYQ.pdf" },
    { id: "pyq_may25_acc", year: 2025, month: "May", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "May 2025 Accounts Exam Paper", pdfUrl: "./pdfs/foundation/pyq/MAY 25_Accouns_PYQ.pdf" },
    { id: "pyq_sep25_acc", year: 2025, month: "Sep", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Sep 2025 Accounts Exam Paper", pdfUrl: "./pdfs/foundation/pyq/SEP 25_Accouns_PYQ.pdf" },
    { id: "pyq_jan26_acc", year: 2026, month: "Jan", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Jan 2026 Accounts Exam Paper", pdfUrl: "./pdfs/foundation/pyq/JAN 26_Accouns_PYQ.pdf" },
    { id: "pyq_may26_acc", year: 2026, month: "May", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "May 2026 Accounts Exam Paper", pdfUrl: "./pdfs/foundation/pyq/MAY 26_Accouns_PYQ.pdf" },
    // Foundation - Business Law
    { id: "pyq_jun24_law", year: 2024, month: "Jun", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Jun 2024 Business Law Exam Paper", pdfUrl: "./pdfs/foundation/pyq/JUN 24_BUSINESS LAW_PYQ.pdf" },
    { id: "pyq_sep24_law", year: 2024, month: "Sep", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Sep 2024 Business Law Exam Paper", pdfUrl: "./pdfs/foundation/pyq/SEP 24 _BUSINESS LAW_PYQ.pdf" },
    { id: "pyq_jan25_law", year: 2025, month: "Jan", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Jan 2025 Business Law Exam Paper", pdfUrl: "./pdfs/foundation/pyq/JAN 25 _BUSINESS LAW_PYQ.pdf" },
    { id: "pyq_may25_law", year: 2025, month: "May", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "May 2025 Business Law Exam Paper", pdfUrl: "./pdfs/foundation/pyq/MAY 25  _BUSINESS LAW_PYQ.pdf" },
    { id: "pyq_sep25_law", year: 2025, month: "Sep", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Sep 2025 Business Law Exam Paper", pdfUrl: "./pdfs/foundation/pyq/SEP 25  _BUSINESS LAW_PYQ.pdf" },
    { id: "pyq_jan26_law", year: 2026, month: "Jan", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Jan 2026 Business Law Exam Paper", pdfUrl: "./pdfs/foundation/pyq/JAN 26 _BUSINESS LAW_PYQ.pdf" },
    { id: "pyq_may26_law", year: 2026, month: "May", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "May 2026 Business Law Exam Paper", pdfUrl: "./pdfs/foundation/pyq/MAY 26 _BUSINESS LAW_PYQ.pdf" },
    // Foundation - Quantitative Aptitude
    { id: "pyq_may25_qa", year: 2025, month: "May", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "May 2025 Quantitative Aptitude Exam Paper", pdfUrl: "./pdfs/foundation/pyq/MAY 25_QUANTITATIVE_PYQ.pdf" },
    { id: "pyq_sep25_qa", year: 2025, month: "Sep", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Sep 2025 Quantitative Aptitude Exam Paper", pdfUrl: "./pdfs/foundation/pyq/SEP 25_QUANTITATIVE_PYQ.pdf" },
    { id: "pyq_jan26_qa", year: 2026, month: "Jan", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Jan 2026 Quantitative Aptitude Exam Paper", pdfUrl: "./pdfs/foundation/pyq/JAN 26_QUANTITATIVE_PYQ.pdf" },
    // Foundation - Business Economics
    { id: "pyq_may25_be", year: 2025, month: "May", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "May 2025 Business Economics Exam Paper", pdfUrl: "./pdfs/foundation/pyq/MAY 25_BUSINESS ECONOMICS_PYQ.pdf" },
    { id: "pyq_sep25_be", year: 2025, month: "Sep", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Sep 2025 Business Economics Exam Paper", pdfUrl: "./pdfs/foundation/pyq/SEP 25_BUSINESS ECONOMICS_PYQ.pdf" },
    { id: "pyq_jan26_be", year: 2026, month: "Jan", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Jan 2026 Business Economics Exam Paper", pdfUrl: "./pdfs/foundation/pyq/JAN 26_BUSINESS ECONOMICS_PYQ.pdf" },
    // ── Intermediate ── Advanced Accounting ──
    { id: "i_pyq_may24_advacc", year: 2024, month: "May", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "May 2024 Advanced Accounting Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 24_Accounts_PYQ.pdf" },
    { id: "i_pyq_sep24_advacc", year: 2024, month: "Sep", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Sep 2024 Advanced Accounting Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 24_Accounts_PYQ.pdf" },
    { id: "i_pyq_jan25_advacc", year: 2025, month: "Jan", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Jan 2025 Advanced Accounting Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 25_Accounts_PYQ.pdf" },
    { id: "i_pyq_may25_advacc", year: 2025, month: "May", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "May 2025 Advanced Accounting Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 25_Accounts_PYQ.pdf" },
    { id: "i_pyq_sep25_advacc", year: 2025, month: "Sep", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Sep 2025 Advanced Accounting Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 25_Accounts_PYQ.pdf" },
    { id: "i_pyq_jan26_advacc", year: 2026, month: "Jan", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Jan 2026 Advanced Accounting Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 26_Accounts_PYQ.pdf" },
    { id: "i_pyq_may26_advacc", year: 2026, month: "May", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "May 2026 Advanced Accounting Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 26_Accounts_PYQ.pdf" },
    // ── Intermediate ── Corporate & Other Laws ──
    { id: "i_pyq_may24_corlaw", year: 2024, month: "May", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "May 2024 Corporate & Other Laws Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 24_Law_PYQ.pdf" },
    { id: "i_pyq_sep24_corlaw", year: 2024, month: "Sep", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Sep 2024 Corporate & Other Laws Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 24_Law_PYQ.pdf" },
    { id: "i_pyq_jan25_corlaw", year: 2025, month: "Jan", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Jan 2025 Corporate & Other Laws Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 25_Law_PYQ.pdf" },
    { id: "i_pyq_may25_corlaw", year: 2025, month: "May", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "May 2025 Corporate & Other Laws Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 25_Law_PYQ.pdf" },
    { id: "i_pyq_sep25_corlaw", year: 2025, month: "Sep", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Sep 2025 Corporate & Other Laws Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 25_Law_PYQ.pdf" },
    { id: "i_pyq_jan26_corlaw", year: 2026, month: "Jan", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Jan 2026 Corporate & Other Laws Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 26_Law_PYQ.pdf" },
    { id: "i_pyq_may26_corlaw", year: 2026, month: "May", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "May 2026 Corporate & Other Laws Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 26_Law_PYQ.pdf" },
    // ── Intermediate ── Paper 3A: Income-tax Law ──
    { id: "i_pyq_may24_it", year: 2024, month: "May", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "May 2024 Income-tax Law Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 24_Taxation_PYQ.pdf" },
    { id: "i_pyq_sep24_it", year: 2024, month: "Sep", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Sep 2024 Income-tax Law Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 24_Taxation_PYQ.pdf" },
    { id: "i_pyq_jan25_it", year: 2025, month: "Jan", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Jan 2025 Income-tax Law Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 25_Taxation_PYQ.pdf" },
    { id: "i_pyq_may25_it", year: 2025, month: "May", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "May 2025 Income-tax Law Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 25_Taxation_PYQ.pdf" },
    { id: "i_pyq_sep25_it", year: 2025, month: "Sep", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Sep 2025 Income-tax Law Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 25_Taxation_PYQ.pdf" },
    { id: "i_pyq_jan26_it", year: 2026, month: "Jan", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Jan 2026 Income-tax Law Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 26_Taxation_PYQ.pdf" },
    { id: "i_pyq_may26_it", year: 2026, month: "May", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "May 2026 Income-tax Law Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 26_Taxation_PYQ.pdf" },
    // ── Intermediate ── Paper 3B: Goods and Services Tax (GST) ──
    { id: "i_pyq_may24_gst", year: 2024, month: "May", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "May 2024 GST Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 24_Taxation_PYQ.pdf" },
    { id: "i_pyq_sep24_gst", year: 2024, month: "Sep", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "Sep 2024 GST Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 24_Taxation_PYQ.pdf" },
    { id: "i_pyq_jan25_gst", year: 2025, month: "Jan", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "Jan 2025 GST Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 25_Taxation_PYQ.pdf" },
    { id: "i_pyq_may25_gst", year: 2025, month: "May", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "May 2025 GST Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 25_Taxation_PYQ.pdf" },
    { id: "i_pyq_sep25_gst", year: 2025, month: "Sep", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "Sep 2025 GST Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 25_Taxation_PYQ.pdf" },
    { id: "i_pyq_jan26_gst", year: 2026, month: "Jan", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "Jan 2026 GST Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 26_Taxation_PYQ.pdf" },
    { id: "i_pyq_may26_gst", year: 2026, month: "May", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "May 2026 GST Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 26_Taxation_PYQ.pdf" },
    // ── Intermediate ── Cost and Management Accounting ──
    { id: "i_pyq_may24_cost", year: 2024, month: "May", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "May 2024 Cost & Management Accounting Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 24_Cost accounts_PYQ.pdf" },
    { id: "i_pyq_sep24_cost", year: 2024, month: "Sep", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Sep 2024 Cost & Management Accounting Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 24_Cost accounts_PYQ.pdf" },
    { id: "i_pyq_jan25_cost", year: 2025, month: "Jan", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Jan 2025 Cost & Management Accounting Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 25_Cost accounts_PYQ.pdf" },
    { id: "i_pyq_may25_cost", year: 2025, month: "May", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "May 2025 Cost & Management Accounting Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 25_Cost accounts_PYQ.pdf" },
    { id: "i_pyq_sep25_cost", year: 2025, month: "Sep", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Sep 2025 Cost & Management Accounting Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 25_Cost accounts_PYQ.pdf" },
    { id: "i_pyq_jan26_cost", year: 2026, month: "Jan", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Jan 2026 Cost & Management Accounting Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 26_Cost accounts_PYQ.pdf" },
    { id: "i_pyq_may26_cost", year: 2026, month: "May", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "May 2026 Cost & Management Accounting Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 26_Cost accounts_PYQ.pdf" },
    // ── Intermediate ── Auditing and Ethics ──
    { id: "i_pyq_may24_audit", year: 2024, month: "May", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "May 2024 Auditing & Ethics Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 24_Auditing_PYQ.pdf" },
    { id: "i_pyq_sep24_audit", year: 2024, month: "Sep", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Sep 2024 Auditing & Ethics Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 24_Auditing_PYQ.pdf" },
    { id: "i_pyq_jan25_audit", year: 2025, month: "Jan", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Jan 2025 Auditing & Ethics Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 25_Auditing_PYQ.pdf" },
    { id: "i_pyq_may25_audit", year: 2025, month: "May", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "May 2025 Auditing & Ethics Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 25_Auditing_PYQ.pdf" },
    { id: "i_pyq_sep25_audit", year: 2025, month: "Sep", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Sep 2025 Auditing & Ethics Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 25_Auditing_PYQ.pdf" },
    { id: "i_pyq_jan26_audit", year: 2026, month: "Jan", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Jan 2026 Auditing & Ethics Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 26_Auditing_PYQ.pdf" },
    { id: "i_pyq_may26_audit", year: 2026, month: "May", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "May 2026 Auditing & Ethics Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 26_Auditing_PYQ.pdf" },
    // ── Intermediate ── Paper 6A: Financial Management ──
    { id: "i_pyq_may24_fm", year: 2024, month: "May", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "May 2024 Financial Management Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 24_FM_SM_PYQ.pdf" },
    { id: "i_pyq_sep24_fm", year: 2024, month: "Sep", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Sep 2024 Financial Management Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 24_FM_SM_PYQ.pdf" },
    { id: "i_pyq_jan25_fm", year: 2025, month: "Jan", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Jan 2025 Financial Management Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 25_FM_SM_PYQ.pdf" },
    { id: "i_pyq_may25_fm", year: 2025, month: "May", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "May 2025 Financial Management Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 25_FM_SM_PYQ.pdf" },
    { id: "i_pyq_sep25_fm", year: 2025, month: "Sep", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Sep 2025 Financial Management Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 25_FM_SM_PYQ.pdf" },
    { id: "i_pyq_jan26_fm", year: 2026, month: "Jan", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Jan 2026 Financial Management Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 26_FM_SM_PYQ.pdf" },
    { id: "i_pyq_may26_fm", year: 2026, month: "May", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "May 2026 Financial Management Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 26_FM_SM_PYQ.pdf" },
    // ── Intermediate ── Paper 6B: Strategic Management ──
    { id: "i_pyq_may24_sm", year: 2024, month: "May", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "May 2024 Strategic Management Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 24_FM_SM_PYQ.pdf" },
    { id: "i_pyq_sep24_sm", year: 2024, month: "Sep", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Sep 2024 Strategic Management Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 24_FM_SM_PYQ.pdf" },
    { id: "i_pyq_jan25_sm", year: 2025, month: "Jan", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Jan 2025 Strategic Management Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 25_FM_SM_PYQ.pdf" },
    { id: "i_pyq_may25_sm", year: 2025, month: "May", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "May 2025 Strategic Management Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 25_FM_SM_PYQ.pdf" },
    { id: "i_pyq_sep25_sm", year: 2025, month: "Sep", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Sep 2025 Strategic Management Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Sep 25_FM_SM_PYQ.pdf" },
    { id: "i_pyq_jan26_sm", year: 2026, month: "Jan", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Jan 26 Strategic Management Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/Jan 26_FM_SM_PYQ.pdf" },
    { id: "i_pyq_may26_sm", year: 2026, month: "May", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "May 2026 Strategic Management Exam Paper", pdfUrl: "./pdfs/intermediate/pyq/May 26_FM_SM_PYQ.pdf" },
    // �� Final PYQs ��
    // Paper 1: Financial Reporting
    { id: "fn_pyq_may24_fr", year: 2024, month: "May", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "May 2024 Financial Reporting Exam Paper", pdfUrl: "./pdfs/final/pyq/May 24_FInacial reporting_PYQ.pdf" },
    { id: "fn_pyq_nov24_fr", year: 2024, month: "Nov", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "Nov 2024 Financial Reporting Exam Paper", pdfUrl: "./pdfs/final/pyq/Nov 24_FInacial reporting_PYQ.pdf" },
    { id: "fn_pyq_may25_fr", year: 2025, month: "May", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "May 2025 Financial Reporting Exam Paper", pdfUrl: "./pdfs/final/pyq/May 25_FInacial reporting_PYQ.pdf" },
    { id: "fn_pyq_sep25_fr", year: 2025, month: "Sep", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "Sep 2025 Financial Reporting Exam Paper", pdfUrl: "./pdfs/final/pyq/Sep 25_FInacial reporting_PYQ.pdf" },
    { id: "fn_pyq_jan26_fr", year: 2026, month: "Jan", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "Jan 2026 Financial Reporting Exam Paper", pdfUrl: "./pdfs/final/pyq/Jan 26_FInacial reporting_PYQ.pdf" },
    { id: "fn_pyq_may26_fr", year: 2026, month: "May", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "May 2026 Financial Reporting Exam Paper", pdfUrl: "./pdfs/final/pyq/May 26_FInacial reporting_PYQ.pdf" },
    // Paper 2: Advanced Financial Management
    { id: "fn_pyq_may24_afm", year: 2024, month: "May", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "May 2024 Advanced Financial Management Exam Paper", pdfUrl: "./pdfs/final/pyq/May 24_FInacial management_PYQ.pdf" },
    { id: "fn_pyq_nov24_afm", year: 2024, month: "Nov", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Nov 2024 Advanced Financial Management Exam Paper", pdfUrl: "./pdfs/final/pyq/Nov 24_FInacial management_PYQ.pdf" },
    { id: "fn_pyq_may25_afm", year: 2025, month: "May", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "May 2025 Advanced Financial Management Exam Paper", pdfUrl: "./pdfs/final/pyq/May 25_FInacial management_PYQ.pdf" },
    { id: "fn_pyq_sep25_afm", year: 2025, month: "Sep", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Sep 2025 Advanced Financial Management Exam Paper", pdfUrl: "./pdfs/final/pyq/Sep 25_FInacial management_PYQ.pdf" },
    { id: "fn_pyq_jan26_afm", year: 2026, month: "Jan", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Jan 2026 Advanced Financial Management Exam Paper", pdfUrl: "./pdfs/final/pyq/Jan 26_FInacial management_PYQ.pdf" },
    { id: "fn_pyq_may26_afm", year: 2026, month: "May", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "May 2026 Advanced Financial Management Exam Paper", pdfUrl: "./pdfs/final/pyq/May 26_FInacial management_PYQ.pdf" },
    // Paper 3: Advanced Auditing, Assurance and Professional Ethics
    { id: "fn_pyq_may24_aud", year: 2024, month: "May", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "May 2024 Advanced Auditing Exam Paper", pdfUrl: "./pdfs/final/pyq/May 24_Auditing_PYQ.pdf" },
    { id: "fn_pyq_nov24_aud", year: 2024, month: "Nov", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "Nov 2024 Advanced Auditing Exam Paper", pdfUrl: "./pdfs/final/pyq/Nov 24_Auditing_PYQ.pdf" },
    { id: "fn_pyq_may25_aud", year: 2025, month: "May", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "May 2025 Advanced Auditing Exam Paper", pdfUrl: "./pdfs/final/pyq/May 25_Auditing_PYQ.pdf" },
    { id: "fn_pyq_sep25_aud", year: 2025, month: "Sep", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "Sep 2025 Advanced Auditing Exam Paper", pdfUrl: "./pdfs/final/pyq/Sep 25_Auditing_PYQ.pdf" },
    { id: "fn_pyq_jan26_aud", year: 2026, month: "Jan", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "Jan 2026 Advanced Auditing Exam Paper", pdfUrl: "./pdfs/final/pyq/Jan 26_Auditing_PYQ.pdf" },
    { id: "fn_pyq_may26_aud", year: 2026, month: "May", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "May 2026 Advanced Auditing Exam Paper", pdfUrl: "./pdfs/final/pyq/May 26_Auditing_PYQ.pdf" },
    // Paper 4: Direct Tax Laws and International Taxation
    { id: "fn_pyq_may24_dt", year: 2024, month: "May", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "May 2024 Direct Tax Laws Exam Paper", pdfUrl: "./pdfs/final/pyq/May 24_Direct tax_PYQ.pdf" },
    { id: "fn_pyq_nov24_dt", year: 2024, month: "Nov", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "Nov 2024 Direct Tax Laws Exam Paper", pdfUrl: "./pdfs/final/pyq/Nov 24_Direct tax_PYQ.pdf" },
    { id: "fn_pyq_may25_dt", year: 2025, month: "May", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "May 2025 Direct Tax Laws Exam Paper", pdfUrl: "./pdfs/final/pyq/May 25_Direct tax_PYQ.pdf" },
    { id: "fn_pyq_sep25_dt", year: 2025, month: "Sep", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "Sep 2025 Direct Tax Laws Exam Paper", pdfUrl: "./pdfs/final/pyq/Sep 25_Direct tax_PYQ.pdf" },
    { id: "fn_pyq_jan26_dt", year: 2026, month: "Jan", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "Jan 2026 Direct Tax Laws Exam Paper", pdfUrl: "./pdfs/final/pyq/Jan 26_Direct tax_PYQ.pdf" },
    { id: "fn_pyq_may26_dt", year: 2026, month: "May", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "May 2026 Direct Tax Laws Exam Paper", pdfUrl: "./pdfs/final/pyq/May 26_Direct tax_PYQ.pdf" },
    // Paper 5: Indirect Tax Laws
    { id: "fn_pyq_may24_idt", year: 2024, month: "May", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "May 2024 Indirect Tax Laws Exam Paper", pdfUrl: "./pdfs/final/pyq/May 24_Indirect Tax_PYQ.pdf" },
    { id: "fn_pyq_nov24_idt", year: 2024, month: "Nov", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "Nov 2024 Indirect Tax Laws Exam Paper", pdfUrl: "./pdfs/final/pyq/Nov 24_Indirect Tax_PYQ.pdf" },
    { id: "fn_pyq_may25_idt", year: 2025, month: "May", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "May 2025 Indirect Tax Laws Exam Paper", pdfUrl: "./pdfs/final/pyq/May 25_Indirect Tax_PYQ.pdf" },
    { id: "fn_pyq_sep25_idt", year: 2025, month: "Sep", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "Sep 2025 Indirect Tax Laws Exam Paper", pdfUrl: "./pdfs/final/pyq/Sep 25_Indirect Tax_PYQ.pdf" },
    { id: "fn_pyq_jan26_idt", year: 2026, month: "Jan", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "Jan 2026 Indirect Tax Laws Exam Paper", pdfUrl: "./pdfs/final/pyq/Jan 26_Indirect Tax_PYQ.pdf" },
    { id: "fn_pyq_may26_idt", year: 2026, month: "May", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "May 2026 Indirect Tax Laws Exam Paper", pdfUrl: "./pdfs/final/pyq/May 26_Indirect Tax_PYQ.pdf" },
    // Paper 6: Integrated Business Solutions
    { id: "fn_pyq_may24_ibs", year: 2024, month: "May", subject: "Paper-6: Integrated Business Solutions (May 2026 Scheme)", title: "May 2024 Integrated Business Solutions Exam Paper", pdfUrl: "./pdfs/final/pyq/May 24_Intergrated Business_PYQ.pdf" },
    { id: "fn_pyq_nov24_ibs", year: 2024, month: "Nov", subject: "Paper-6: Integrated Business Solutions (May 2026 Scheme)", title: "Nov 2024 Integrated Business Solutions Exam Paper", pdfUrl: "./pdfs/final/pyq/Nov 24_Intergrated Business_PYQ.pdf" },
    { id: "fn_pyq_may25_ibs", year: 2025, month: "May", subject: "Paper-6: Integrated Business Solutions (May 2026 Scheme)", title: "May 2025 Integrated Business Solutions Exam Paper", pdfUrl: "./pdfs/final/pyq/May 25_Intergrated Business_PYQ.pdf" },
    { id: "fn_pyq_sep25_ibs", year: 2025, month: "Sep", subject: "Paper-6: Integrated Business Solutions (May 2026 Scheme)", title: "Sep 2025 Integrated Business Solutions Exam Paper", pdfUrl: "./pdfs/final/pyq/Sep 25_Intergrated Business_PYQ.pdf" },
    { id: "fn_pyq_jan26_ibs", year: 2026, month: "Jan", subject: "Paper-6: Integrated Business Solutions (May 2026 Scheme)", title: "Jan 2026 Integrated Business Solutions Exam Paper", pdfUrl: "./pdfs/final/pyq/Jan 26_Intergrated Business_PYQ.pdf" },
    { id: "fn_pyq_may26_ibs", year: 2026, month: "May", subject: "Paper-6: Integrated Business Solutions (May 2026 Scheme)", title: "May 2026 Integrated Business Solutions Exam Paper", pdfUrl: "./pdfs/final/pyq/May 26_Intergrated Business_PYQ.pdf" }
  ],
  RTP: [
    // Foundation - Accounts
    { id: "rtp_jun24_acc", year: 2024, month: "Jun", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Jun 2024 Accounts RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/JUN 24_ACCOUNTS_RTP.pdf" },
    { id: "rtp_may24_acc", year: 2024, month: "May", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "May 2024 Accounts RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/MAY 24_ACCOUNTS_RTP.pdf" },
    { id: "rtp_sep24_acc", year: 2024, month: "Sep", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Sep 2024 Accounts RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/SEP 24_ACCOUNTS_RTP.pdf" },
    { id: "rtp_jan25_acc", year: 2025, month: "Jan", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Jan 2025 Accounts RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/JAN 25_ACCOUNTS_RTP.pdf" },
    { id: "rtp_may25_acc", year: 2025, month: "May", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "May 2025 Accounts RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/MAY 25_ACCOUNTS_RTP.pdf" },
    { id: "rtp_sep25_acc", year: 2025, month: "Sep", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Sep 2025 Accounts RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/SEP 25_ACCOUNTS_RTP.pdf" },
    { id: "rtp_jan26_acc", year: 2026, month: "Jan", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Jan 2026 Accounts RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/JAN 26_ACCOUNTS_RTP.pdf" },
    { id: "rtp_may26_acc", year: 2026, month: "May", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "May 2026 Accounts RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/MAY 26_ACCOUNTS_RTP.pdf" },
    // Foundation - Business Law
    { id: "rtp_jun24_law", year: 2024, month: "Jun", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Jun 2024 Business Law RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/JUN 24_BUSINESS LAW_RTP.pdf" },
    { id: "rtp_may24_law", year: 2024, month: "May", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "May 2024 Business Law RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/MAY 24_BUSINESS LAW_RTP.pdf" },
    { id: "rtp_sep24_law", year: 2024, month: "Sep", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Sep 2024 Business Law RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/SEP 24_BUSINESS LAW_RTP.pdf" },
    { id: "rtp_jan25_law", year: 2025, month: "Jan", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Jan 2025 Business Law RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/JAN 25_BUSINESS LAW_RTP.pdf" },
    { id: "rtp_may25_law", year: 2025, month: "May", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "May 2025 Business Law RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/MAY 25_BUSINESS LAW_RTP.pdf" },
    { id: "rtp_sep25_law", year: 2025, month: "Sep", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Sep 2025 Business Law RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/SEP 25_BUSINESS LAW_RTP.pdf" },
    { id: "rtp_jan26_law", year: 2026, month: "Jan", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Jan 2026 Business Law RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/JAN 26_BUSINESS LAW_RTP.pdf" },
    { id: "rtp_may26_law", year: 2026, month: "May", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "May 2026 Business Law RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/MAY 26_BUSINESS LAW_RTP.pdf" },
    // Foundation - Quantitative Aptitude
    { id: "rtp_sep24_qa", year: 2024, month: "Sep", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Sep 2024 Quantitative Aptitude RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/SEP 24_QUANTITATATIVE_RTP.pdf" },
    { id: "rtp_jan25_qa", year: 2025, month: "Jan", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Jan 2025 Quantitative Aptitude RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/JAN 25_QUANTITATATIVE__RTP.pdf" },
    { id: "rtp_may25_qa", year: 2025, month: "May", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "May 2025 Quantitative Aptitude RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/MAY 25_QUANTITATATIVE__RTP.pdf" },
    { id: "rtp_sep25_qa", year: 2025, month: "Sep", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Sep 2025 Quantitative Aptitude RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/SEP 25_QUANTITATATIVE_RTP.pdf" },
    { id: "rtp_jan26_qa", year: 2026, month: "Jan", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Jan 2026 Quantitative Aptitude RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/JAN 26_QUANTITATATIVE_RTP.pdf" },
    { id: "rtp_may26_qa", year: 2026, month: "May", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "May 2026 Quantitative Aptitude RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/MAY 26_QUANTITATATIVE__RTP.pdf" },
    // Foundation - Business Economics
    { id: "rtp_sep24_be", year: 2024, month: "Sep", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Sep 2024 Business Economics RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/SEP 24_BUSINESS ECONOMICS_RTP.pdf" },
    { id: "rtp_jan25_be", year: 2025, month: "Jan", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Jan 2025 Business Economics RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/JAN 25_BUSINESS ECONOMICS_RTP.pdf" },
    { id: "rtp_may25_be", year: 2025, month: "May", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "May 2025 Business Economics RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/MAY 25_BUSINESS ECONOMICS_RTP.pdf" },
    { id: "rtp_sep25_be", year: 2025, month: "Sep", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Sep 2025 Business Economics RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/SEP 25_BUSINESS ECONOMICS_RTP.pdf" },
    { id: "rtp_jan26_be", year: 2026, month: "Jan", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Jan 2026 Business Economics RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/JAN 26_BUSINESS ECONOMICS_RTP.pdf" },
    { id: "rtp_may26_be", year: 2026, month: "May", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "May 2026 Business Economics RTP", pdfUrl: "./pdfs/foundation/rtpmtp/rtp/MAY 26_BUSINESS ECONOMICS_RTP.pdf" },
    // ── Intermediate ── Advanced Accounting RTP ──
    { id: "i_rtp_may24_advacc", year: 2024, month: "May", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "May 2024 Advanced Accounting RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 24_Accounts_RTP.pdf" },
    { id: "i_rtp_sep24_advacc", year: 2024, month: "Sep", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Sep 2024 Advanced Accounting RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 24_Accounts_RTP.pdf" },
    { id: "i_rtp_jan25_advacc", year: 2025, month: "Jan", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Jan 2025 Advanced Accounting RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 25_Accounts_RTP.pdf" },
    { id: "i_rtp_may25_advacc", year: 2025, month: "May", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "May 2025 Advanced Accounting RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 25_Accounts_RTP.pdf" },
    { id: "i_rtp_sep25_advacc", year: 2025, month: "Sep", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Sep 2025 Advanced Accounting RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 25_Accounts_RTP.pdf" },
    { id: "i_rtp_jan26_advacc", year: 2026, month: "Jan", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Jan 2026 Advanced Accounting RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 26_Accounts_RTP.pdf" },
    { id: "i_rtp_may26_advacc", year: 2026, month: "May", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "May 2026 Advanced Accounting RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 26_Accounts_RTP.pdf" },
    // ── Intermediate ── Corporate & Other Laws RTP ──
    { id: "i_rtp_may24_corlaw", year: 2024, month: "May", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "May 2024 Corporate & Other Laws RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 24_Law_RTP.pdf" },
    { id: "i_rtp_sep24_corlaw", year: 2024, month: "Sep", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Sep 2024 Corporate & Other Laws RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 24_Law_RTP.pdf" },
    { id: "i_rtp_jan25_corlaw", year: 2025, month: "Jan", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Jan 2025 Corporate & Other Laws RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 25_Law_RTP.pdf" },
    { id: "i_rtp_may25_corlaw", year: 2025, month: "May", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "May 2025 Corporate & Other Laws RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 25_Law_RTP.pdf" },
    { id: "i_rtp_sep25_corlaw", year: 2025, month: "Sep", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Sep 2025 Corporate & Other Laws RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 25_Law_RTP.pdf" },
    { id: "i_rtp_jan26_corlaw", year: 2026, month: "Jan", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Jan 2026 Corporate & Other Laws RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 26_Law_RTP.pdf" },
    { id: "i_rtp_may26_corlaw", year: 2026, month: "May", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "May 2026 Corporate & Other Laws RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 26_Law_RTP.pdf" },
    // ── Intermediate ── Income-tax Law RTP ──
    { id: "i_rtp_may24_tax", year: 2024, month: "May", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "May 2024 Income-tax Law RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 24_Taxation_RTP.pdf" },
    { id: "i_rtp_sep24_tax", year: 2024, month: "Sep", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Sep 2024 Income-tax Law RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 24_Taxation_RTP.pdf" },
    { id: "i_rtp_jan25_tax", year: 2025, month: "Jan", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Jan 2025 Income-tax Law RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 25_Taxation_RTP.pdf" },
    { id: "i_rtp_may25_tax", year: 2025, month: "May", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "May 2025 Income-tax Law RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 25_Taxation_RTP.pdf" },
    { id: "i_rtp_sep25_tax", year: 2025, month: "Sep", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Sep 2025 Income-tax Law RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 25_Taxation_RTP.pdf" },
    { id: "i_rtp_jan26_tax", year: 2026, month: "Jan", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Jan 2026 Income-tax Law RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 26_Taxation_RTP.pdf" },
    { id: "i_rtp_may26_tax", year: 2026, month: "May", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "May 2026 Income-tax Law RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 26_Taxation_RTP.pdf" },
    // ── Intermediate ── GST RTP ──
    { id: "i_rtp_may24_gst", year: 2024, month: "May", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "May 2024 GST RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 24_Taxation_RTP.pdf" },
    { id: "i_rtp_sep24_gst", year: 2024, month: "Sep", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "Sep 2024 GST RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 24_Taxation_RTP.pdf" },
    { id: "i_rtp_jan25_gst", year: 2025, month: "Jan", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "Jan 2025 GST RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 25_Taxation_RTP.pdf" },
    { id: "i_rtp_may25_gst", year: 2025, month: "May", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "May 2025 GST RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 25_Taxation_RTP.pdf" },
    { id: "i_rtp_sep25_gst", year: 2025, month: "Sep", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "Sep 2025 GST RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 25_Taxation_RTP.pdf" },
    { id: "i_rtp_jan26_gst", year: 2026, month: "Jan", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "Jan 2026 GST RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 26_Taxation_RTP.pdf" },
    { id: "i_rtp_may26_gst", year: 2026, month: "May", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "May 2026 GST RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 26_Taxation_RTP.pdf" },
    // ── Intermediate ── Cost and Management Accounting RTP ──
    { id: "i_rtp_may24_cost", year: 2024, month: "May", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "May 2024 Cost & Management Accounting RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 24_Cost accounting_RTP.pdf" },
    { id: "i_rtp_sep24_cost", year: 2024, month: "Sep", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Sep 2024 Cost & Management Accounting RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 24_Cost accounting_RTP.pdf" },
    { id: "i_rtp_jan25_cost", year: 2025, month: "Jan", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Jan 2025 Cost & Management Accounting RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 25_Cost accounting_RTP.pdf" },
    { id: "i_rtp_may25_cost", year: 2025, month: "May", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "May 2025 Cost & Management Accounting RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 25_Cost accounting_RTP.pdf" },
    { id: "i_rtp_sep25_cost", year: 2025, month: "Sep", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Sep 2025 Cost & Management Accounting RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 25_Cost accounting_RTP.pdf" },
    { id: "i_rtp_jan26_cost", year: 2026, month: "Jan", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Jan 2026 Cost & Management Accounting RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 26_Cost accounting_RTP.pdf" },
    { id: "i_rtp_may26_cost", year: 2026, month: "May", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "May 2026 Cost & Management Accounting RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 26_Cost accounting_RTP.pdf" },
    // ── Intermediate ── Auditing and Ethics RTP ──
    { id: "i_rtp_may24_audit", year: 2024, month: "May", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "May 2024 Auditing & Ethics RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 24_Auditing_RTP.pdf" },
    { id: "i_rtp_sep24_audit", year: 2024, month: "Sep", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Sep 2024 Auditing & Ethics RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 24_Auditing_RTP.pdf" },
    { id: "i_rtp_jan25_audit", year: 2025, month: "Jan", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Jan 2025 Auditing & Ethics RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 25_Auditing_RTP.pdf" },
    { id: "i_rtp_may25_audit", year: 2025, month: "May", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "May 2025 Auditing & Ethics RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 25_Auditing_RTP.pdf" },
    { id: "i_rtp_sep25_audit", year: 2025, month: "Sep", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Sep 2025 Auditing & Ethics RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 25_Auditing_RTP.pdf" },
    { id: "i_rtp_jan26_audit", year: 2026, month: "Jan", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Jan 2026 Auditing & Ethics RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 26_Auditing_RTP.pdf" },
    { id: "i_rtp_may26_audit", year: 2026, month: "May", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "May 2026 Auditing & Ethics RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 26_Auditing_RTP.pdf" },
    // ── Intermediate ── Financial Management RTP ──
    { id: "i_rtp_may24_fm", year: 2024, month: "May", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "May 2024 Financial Management RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 24_FM_SM_RTP.pdf" },
    { id: "i_rtp_sep24_fm", year: 2024, month: "Sep", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Sep 2024 Financial Management RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 24_FM_SM_RTP.pdf" },
    { id: "i_rtp_jan25_fm", year: 2025, month: "Jan", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Jan 2025 Financial Management RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 25_FM_SM_RTP.pdf" },
    { id: "i_rtp_may25_fm", year: 2025, month: "May", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "May 2025 Financial Management RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 25_FM_SM_RTP.pdf" },
    { id: "i_rtp_sep25_fm", year: 2025, month: "Sep", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Sep 2025 Financial Management RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 25_FM_SM_RTP.pdf" },
    { id: "i_rtp_jan26_fm", year: 2026, month: "Jan", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Jan 2026 Financial Management RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 26_FM_SM_RTP.pdf" },
    { id: "i_rtp_may26_fm", year: 2026, month: "May", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "May 2026 Financial Management RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 26_FM_SM_RTP.pdf" },
    // ── Intermediate ── Strategic Management RTP ──
    { id: "i_rtp_may24_sm", year: 2024, month: "May", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "May 2024 Strategic Management RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 24_FM_SM_RTP.pdf" },
    { id: "i_rtp_sep24_sm", year: 2024, month: "Sep", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Sep 2024 Strategic Management RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 24_FM_SM_RTP.pdf" },
    { id: "i_rtp_jan25_sm", year: 2025, month: "Jan", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Jan 2025 Strategic Management RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 25_FM_SM_RTP.pdf" },
    { id: "i_rtp_may25_sm", year: 2025, month: "May", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "May 2025 Strategic Management RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 25_FM_SM_RTP.pdf" },
    { id: "i_rtp_sep25_sm", year: 2025, month: "Sep", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Sep 2025 Strategic Management RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Sep 25_FM_SM_RTP.pdf" },
    { id: "i_rtp_jan26_sm", year: 2026, month: "Jan", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Jan 2026 Strategic Management RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/Jan 26_FM_SM_RTP.pdf" },
    { id: "i_rtp_may26_sm", year: 2026, month: "May", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "May 2026 Strategic Management RTP", pdfUrl: "./pdfs/intermediate/rtpmtp/rtp/May 26_FM_SM_RTP.pdf" },
    // ── Final RTPs ──
    // Paper 1: Financial Reporting
    { id: "fn_rtp_may24_fr", year: 2024, month: "May", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "May 2024 Financial Reporting RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 24_FInacial reporting_RTP.pdf" },
    { id: "fn_rtp_nov24_fr", year: 2024, month: "Nov", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "Nov 2024 Financial Reporting RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Nov 24_FInacial reporting_RTP.pdf" },
    { id: "fn_rtp_may25_fr", year: 2025, month: "May", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "May 2025 Financial Reporting RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 25_FInacial reporting_RTP.pdf" },
    { id: "fn_rtp_sep25_fr", year: 2025, month: "Sep", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "Sep 2025 Financial Reporting RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Sep 25_FInacial reporting_RTP.pdf" },
    { id: "fn_rtp_jan26_fr", year: 2026, month: "Jan", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "Jan 2026 Financial Reporting RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Jan 26_FInacial reporting_RTP.pdf" },
    { id: "fn_rtp_may26_fr", year: 2026, month: "May", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "May 2026 Financial Reporting RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 26_FInacial reporting_RTP.pdf" },
    // Paper 2: Advanced Financial Management
    { id: "fn_rtp_may24_afm", year: 2024, month: "May", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "May 2024 Advanced Financial Management RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 24_FInacial management_RTP.pdf" },
    { id: "fn_rtp_nov24_afm", year: 2024, month: "Nov", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Nov 2024 Advanced Financial Management RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Nov 24_FInacial management_RTP.pdf" },
    { id: "fn_rtp_may25_afm", year: 2025, month: "May", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "May 2025 Advanced Financial Management RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 25_FInacial management_RTP.pdf" },
    { id: "fn_rtp_sep25_afm", year: 2025, month: "Sep", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Sep 2025 Advanced Financial Management RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Sep 25_FInacial management_RTP.pdf" },
    { id: "fn_rtp_jan26_afm", year: 2026, month: "Jan", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Jan 2026 Advanced Financial Management RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Jan 26_FInacial management_RTP.pdf" },
    { id: "fn_rtp_may26_afm", year: 2026, month: "May", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "May 2026 Advanced Financial Management RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 26_FInacial management_RTP.pdf" },
    // Paper 3: Advanced Auditing, Assurance and Professional Ethics
    { id: "fn_rtp_may24_aud", year: 2024, month: "May", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "May 2024 Advanced Auditing RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 24_Auditing_RTP.pdf" },
    { id: "fn_rtp_nov24_aud", year: 2024, month: "Nov", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "Nov 2024 Advanced Auditing RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Nov 24_Auditing_RTP.pdf" },
    { id: "fn_rtp_may25_aud", year: 2025, month: "May", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "May 2025 Advanced Auditing RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 25_Auditing_RTP.pdf" },
    { id: "fn_rtp_sep25_aud", year: 2025, month: "Sep", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "Sep 2025 Advanced Auditing RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Sep 25_Auditing_RTP.pdf" },
    { id: "fn_rtp_jan26_aud", year: 2026, month: "Jan", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "Jan 2026 Advanced Auditing RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Jan 26_Auditing_RTP.pdf" },
    { id: "fn_rtp_may26_aud", year: 2026, month: "May", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "May 2026 Advanced Auditing RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 26_Auditing_RTP.pdf" },
    // Paper 4: Direct Tax Laws and International Taxation
    { id: "fn_rtp_may24_dt", year: 2024, month: "May", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "May 2024 Direct Tax Laws RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 24_direct Tax_RTP.pdf" },
    { id: "fn_rtp_nov24_dt", year: 2024, month: "Nov", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "Nov 2024 Direct Tax Laws RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Nov 24_direct Tax_RTP.pdf" },
    { id: "fn_rtp_may25_dt", year: 2025, month: "May", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "May 2025 Direct Tax Laws RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 25_direct Tax_RTP.pdf" },
    { id: "fn_rtp_sep25_dt", year: 2025, month: "Sep", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "Sep 2025 Direct Tax Laws RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Sep 25_direct Tax_RTP.pdf" },
    { id: "fn_rtp_jan26_dt", year: 2026, month: "Jan", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "Jan 2026 Direct Tax Laws RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Jan 26_direct Tax_RTP.pdf" },
    { id: "fn_rtp_may26_dt", year: 2026, month: "May", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "May 2026 Direct Tax Laws RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 26_direct Tax_RTP.pdf" },
    // Paper 5: Indirect Tax Laws
    { id: "fn_rtp_may24_idt", year: 2024, month: "May", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "May 2024 Indirect Tax Laws RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 24_Indirect Tax_RTP.pdf" },
    { id: "fn_rtp_nov24_idt", year: 2024, month: "Nov", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "Nov 2024 Indirect Tax Laws RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Nov 24_Indirect Tax_RTP.pdf" },
    { id: "fn_rtp_may25_idt", year: 2025, month: "May", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "May 2025 Indirect Tax Laws RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 25_Indirect Tax_RTP.pdf" },
    { id: "fn_rtp_sep25_idt", year: 2025, month: "Sep", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "Sep 2025 Indirect Tax Laws RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Sep 25_Indirect Tax_RTP.pdf" },
    { id: "fn_rtp_jan26_idt", year: 2026, month: "Jan", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "Jan 2026 Indirect Tax Laws RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Jan 26_Indirect Tax_RTP.pdf" },
    { id: "fn_rtp_may26_idt", year: 2026, month: "May", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "May 2026 Indirect Tax Laws RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 26_Indirect Tax_RTP.pdf" },
    // Paper 6: Integrated Business Solutions
    { id: "fn_rtp_may24_ibs", year: 2024, month: "May", subject: "Paper-6: Integrated Business Solutions (May 2026 Scheme)", title: "May 2024 Integrated Business Solutions RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 24_Intergrated Business_RTP.pdf" },
    { id: "fn_rtp_nov24_ibs", year: 2024, month: "Nov", subject: "Paper-6: Integrated Business Solutions (May 2026 Scheme)", title: "Nov 2024 Integrated Business Solutions RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Nov 24_Intergrated Business_RTP.pdf" },
    { id: "fn_rtp_may25_ibs", year: 2025, month: "May", subject: "Paper-6: Integrated Business Solutions (May 2026 Scheme)", title: "May 2025 Integrated Business Solutions RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 25_Intergrated Business_RTP.pdf" },
    { id: "fn_rtp_sep25_ibs", year: 2025, month: "Sep", subject: "Paper-6: Integrated Business Solutions (May 2026 Scheme)", title: "Sep 2025 Integrated Business Solutions RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Sep 25_Intergrated Business_RTP.pdf" },
    { id: "fn_rtp_jan26_ibs", year: 2026, month: "Jan", subject: "Paper-6: Integrated Business Solutions (May 2026 Scheme)", title: "Jan 2026 Integrated Business Solutions RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/Jan 26_Intergrated Business_RTP.pdf" },
    { id: "fn_rtp_may26_ibs", year: 2026, month: "May", subject: "Paper-6: Integrated Business Solutions (May 2026 Scheme)", title: "May 2026 Integrated Business Solutions RTP", pdfUrl: "./pdfs/final/rtpmtp/rtp/May 26_Intergrated Business_RTP.pdf" }
  ],
  MTP: [
    // Foundation - Accounts (MTP 1-10)
    { id: "mtp_acc_1", year: 2024, month: "Series 1", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Accounts MTP Series 1", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Accounts_MTP 1.pdf" },
    { id: "mtp_acc_2", year: 2024, month: "Series 2", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Accounts MTP Series 2", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Accounts_MTP 2.pdf" },
    { id: "mtp_acc_3", year: 2024, month: "Series 3", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Accounts MTP Series 3", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Accounts_MTP 3.pdf" },
    { id: "mtp_acc_4", year: 2024, month: "Series 4", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Accounts MTP Series 4", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Accounts_MTP 4.pdf" },
    { id: "mtp_acc_5", year: 2024, month: "Series 5", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Accounts MTP Series 5", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Accounts_MTP 5.pdf" },
    { id: "mtp_acc_6", year: 2025, month: "Series 6", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Accounts MTP Series 6", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Accounts_MTP 6.pdf" },
    { id: "mtp_acc_7", year: 2025, month: "Series 7", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Accounts MTP Series 7", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Accounts_MTP 7.pdf" },
    { id: "mtp_acc_8", year: 2025, month: "Series 8", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Accounts MTP Series 8", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Accounts_MTP 8.pdf" },
    { id: "mtp_acc_9", year: 2025, month: "Series 9", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Accounts MTP Series 9", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Accounts_MTP 9.pdf" },
    { id: "mtp_acc_10", year: 2026, month: "Series 10", subject: "Paper-1: Accounting (May 2026 Scheme)", title: "Accounts MTP Series 10", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Accounts_MTP 10.pdf" },
    // Foundation - Business Law (MTP 1-10)
    { id: "mtp_law_1", year: 2024, month: "Series 1", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Business Law MTP Series 1", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Bsuiness law_MTP 1.pdf" },
    { id: "mtp_law_2", year: 2024, month: "Series 2", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Business Law MTP Series 2", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Bsuiness law_MTP 2.pdf" },
    { id: "mtp_law_3", year: 2024, month: "Series 3", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Business Law MTP Series 3", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Bsuiness law_MTP 3.pdf" },
    { id: "mtp_law_4", year: 2024, month: "Series 4", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Business Law MTP Series 4", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Bsuiness law_MTP 4.pdf" },
    { id: "mtp_law_5", year: 2024, month: "Series 5", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Business Law MTP Series 5", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Bsuiness law_MTP 5.pdf" },
    { id: "mtp_law_6", year: 2025, month: "Series 6", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Business Law MTP Series 6", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Bsuiness law_MTP 6.pdf" },
    { id: "mtp_law_7", year: 2025, month: "Series 7", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Business Law MTP Series 7", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Bsuiness law_MTP 7.pdf" },
    { id: "mtp_law_8", year: 2025, month: "Series 8", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Business Law MTP Series 8", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Bsuiness law_MTP 8.pdf" },
    { id: "mtp_law_9", year: 2025, month: "Series 9", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Business Law MTP Series 9", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Bsuiness law_MTP 9.pdf" },
    { id: "mtp_law_10", year: 2026, month: "Series 10", subject: "Paper-2: Business Laws (May 2026 Scheme)", title: "Business Law MTP Series 10", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Bsuiness law_MTP 10.pdf" },
    // Foundation - Quantitative Aptitude (MTP 1-10)
    { id: "mtp_qa_1", year: 2024, month: "Series 1", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Quantitative Aptitude MTP Series 1", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Quantitative_MTP 1.pdf" },
    { id: "mtp_qa_2", year: 2024, month: "Series 2", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Quantitative Aptitude MTP Series 2", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Quantitative_MTP 2.pdf" },
    { id: "mtp_qa_3", year: 2024, month: "Series 3", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Quantitative Aptitude MTP Series 3", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Quantitative_MTP 3.pdf" },
    { id: "mtp_qa_4", year: 2024, month: "Series 4", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Quantitative Aptitude MTP Series 4", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Quantitative_MTP 4.pdf" },
    { id: "mtp_qa_5", year: 2024, month: "Series 5", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Quantitative Aptitude MTP Series 5", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Quantitative_MTP 5.pdf" },
    { id: "mtp_qa_6", year: 2025, month: "Series 6", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Quantitative Aptitude MTP Series 6", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Quantitative_MTP 6.pdf" },
    { id: "mtp_qa_7", year: 2025, month: "Series 7", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Quantitative Aptitude MTP Series 7", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Quantitative_MTP 7.pdf" },
    { id: "mtp_qa_8", year: 2025, month: "Series 8", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Quantitative Aptitude MTP Series 8", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Quantitative_MTP 8.pdf" },
    { id: "mtp_qa_9", year: 2025, month: "Series 9", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Quantitative Aptitude MTP Series 9", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Quantitative_MTP 9.pdf" },
    { id: "mtp_qa_10", year: 2026, month: "Series 10", subject: "Paper-3: Quantitative Aptitude (May 2026 Scheme)", title: "Quantitative Aptitude MTP Series 10", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Quantitative_MTP 10.pdf" },
    // Foundation - Business Economics (MTP 1-10)
    { id: "mtp_be_1", year: 2024, month: "Series 1", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Business Economics MTP Series 1", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Business economics_MTP 1.pdf" },
    { id: "mtp_be_2", year: 2024, month: "Series 2", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Business Economics MTP Series 2", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Business economics_MTP 2.pdf" },
    { id: "mtp_be_3", year: 2024, month: "Series 3", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Business Economics MTP Series 3", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Business economics_MTP 3.pdf" },
    { id: "mtp_be_4", year: 2024, month: "Series 4", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Business Economics MTP Series 4", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Business economics_MTP 4.pdf" },
    { id: "mtp_be_5", year: 2024, month: "Series 5", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Business Economics MTP Series 5", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Business economics_MTP 5.pdf" },
    { id: "mtp_be_6", year: 2025, month: "Series 6", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Business Economics MTP Series 6", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Business economics_MTP 6.pdf" },
    { id: "mtp_be_7", year: 2025, month: "Series 7", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Business Economics MTP Series 7", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Business economics_MTP 7.pdf" },
    { id: "mtp_be_8", year: 2025, month: "Series 8", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Business Economics MTP Series 8", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Business economics_MTP 8.pdf" },
    { id: "mtp_be_9", year: 2025, month: "Series 9", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Business Economics MTP Series 9", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Business economics_MTP 9.pdf" },
    { id: "mtp_be_10", year: 2026, month: "Series 10", subject: "Paper-4: Business Economics (May 2026 Scheme)", title: "Business Economics MTP Series 10", pdfUrl: "./pdfs/foundation/rtpmtp/mtp/Business economics_MTP 10.pdf" },
    // ── Intermediate ── Advanced Accounting MTP ──
    { id: "i_mtp_advacc_1", year: 2025, month: "Series 1", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Advanced Accounting MTP Series 1", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 1_MTP_1.pdf" },
    { id: "i_mtp_advacc_2", year: 2025, month: "Series 2", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Advanced Accounting MTP Series 2", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 1_MTP_2.pdf" },
    { id: "i_mtp_advacc_3", year: 2025, month: "Series 3", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Advanced Accounting MTP Series 3", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 1_MTP_3.pdf" },
    { id: "i_mtp_advacc_4", year: 2025, month: "Series 4", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Advanced Accounting MTP Series 4", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 1_MTP_4.pdf" },
    { id: "i_mtp_advacc_5", year: 2026, month: "Series 5", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Advanced Accounting MTP Series 5", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 1_MTP_5.pdf" },
    { id: "i_mtp_advacc_6", year: 2026, month: "Series 6", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Advanced Accounting MTP Series 6", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 1_MTP_6.pdf" },
    { id: "i_mtp_advacc_7", year: 2026, month: "Series 7", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Advanced Accounting MTP Series 7", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 1_MTP_7.pdf" },
    { id: "i_mtp_advacc_8", year: 2026, month: "Series 8", subject: "Paper-1: Advanced Accounting (May 2026 Scheme)", title: "Advanced Accounting MTP Series 8", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 1_MTP_8.pdf" },
    // ── Intermediate ── Corporate & Other Laws MTP ──
    { id: "i_mtp_corlaw_1", year: 2025, month: "Series 1", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Corporate & Other Laws MTP Series 1", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 2_MTP_1.pdf" },
    { id: "i_mtp_corlaw_2", year: 2025, month: "Series 2", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Corporate & Other Laws MTP Series 2", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 2_MTP_2.pdf" },
    { id: "i_mtp_corlaw_3", year: 2025, month: "Series 3", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Corporate & Other Laws MTP Series 3", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 2_MTP_3.pdf" },
    { id: "i_mtp_corlaw_4", year: 2025, month: "Series 4", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Corporate & Other Laws MTP Series 4", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 2_MTP_4.pdf" },
    { id: "i_mtp_corlaw_5", year: 2026, month: "Series 5", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Corporate & Other Laws MTP Series 5", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 2_MTP_5.pdf" },
    { id: "i_mtp_corlaw_6", year: 2026, month: "Series 6", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Corporate & Other Laws MTP Series 6", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 2_MTP_6.pdf" },
    { id: "i_mtp_corlaw_7", year: 2026, month: "Series 7", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Corporate & Other Laws MTP Series 7", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 2_MTP_7.pdf" },
    { id: "i_mtp_corlaw_8", year: 2026, month: "Series 8", subject: "Paper-2: Corporate and Other Laws (May 2026 Scheme)", title: "Corporate & Other Laws MTP Series 8", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 2_MTP_8.pdf" },
    // ── Intermediate ── Income-tax Law MTP ──
    { id: "i_mtp_tax_1", year: 2025, month: "Series 1", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Income-tax Law MTP Series 1", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3A_MTP_1.pdf" },
    { id: "i_mtp_tax_2", year: 2025, month: "Series 2", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Income-tax Law MTP Series 2", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3A_MTP_2.pdf" },
    { id: "i_mtp_tax_3", year: 2025, month: "Series 3", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Income-tax Law MTP Series 3", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3A_MTP_3.pdf" },
    { id: "i_mtp_tax_4", year: 2025, month: "Series 4", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Income-tax Law MTP Series 4", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3A_MTP_4.pdf" },
    { id: "i_mtp_tax_5", year: 2026, month: "Series 5", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Income-tax Law MTP Series 5", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3A_MTP_5.pdf" },
    { id: "i_mtp_tax_6", year: 2026, month: "Series 6", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Income-tax Law MTP Series 6", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3A_MTP_6.pdf" },
    { id: "i_mtp_tax_7", year: 2026, month: "Series 7", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Income-tax Law MTP Series 7", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3A_MTP_7.pdf" },
    { id: "i_mtp_tax_8", year: 2026, month: "Series 8", subject: "Paper-3A: Income-tax Law (May 2026 Scheme)", title: "Income-tax Law MTP Series 8", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3A_MTP_8.pdf" },
    // ── Intermediate ── GST MTP ──
    { id: "i_mtp_gst_1", year: 2025, month: "Series 1", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "GST MTP Series 1", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3B_MTP_1.pdf" },
    { id: "i_mtp_gst_2", year: 2025, month: "Series 2", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "GST MTP Series 2", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3B_MTP_2.pdf" },
    { id: "i_mtp_gst_3", year: 2025, month: "Series 3", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "GST MTP Series 3", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3B_MTP_3.pdf" },
    { id: "i_mtp_gst_4", year: 2025, month: "Series 4", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "GST MTP Series 4", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3B_MTP_4.pdf" },
    { id: "i_mtp_gst_5", year: 2026, month: "Series 5", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "GST MTP Series 5", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3B_MTP_5.pdf" },
    { id: "i_mtp_gst_6", year: 2026, month: "Series 6", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "GST MTP Series 6", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3B_MTP_6.pdf" },
    { id: "i_mtp_gst_7", year: 2026, month: "Series 7", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "GST MTP Series 7", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3B_MTP_7.pdf" },
    { id: "i_mtp_gst_8", year: 2026, month: "Series 8", subject: "Paper-3B: Goods and Services Tax (GST) (May 2026 Scheme)", title: "GST MTP Series 8", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 3B_MTP_8.pdf" },
    // ── Intermediate ── Cost and Management Accounting MTP ──
    { id: "i_mtp_cost_1", year: 2025, month: "Series 1", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Cost Accounting MTP Series 1", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 4_MTP_1.pdf" },
    { id: "i_mtp_cost_2", year: 2025, month: "Series 2", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Cost Accounting MTP Series 2", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 4_MTP_2.pdf" },
    { id: "i_mtp_cost_3", year: 2025, month: "Series 3", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Cost Accounting MTP Series 3", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 4_MTP_3.pdf" },
    { id: "i_mtp_cost_4", year: 2025, month: "Series 4", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Cost Accounting MTP Series 4", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 4_MTP_4.pdf" },
    { id: "i_mtp_cost_5", year: 2026, month: "Series 5", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Cost Accounting MTP Series 5", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 4_MTP_5.pdf" },
    { id: "i_mtp_cost_6", year: 2026, month: "Series 6", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Cost Accounting MTP Series 6", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 4_MTP_6.pdf" },
    { id: "i_mtp_cost_7", year: 2026, month: "Series 7", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Cost Accounting MTP Series 7", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 4_MTP_7.pdf" },
    { id: "i_mtp_cost_8", year: 2026, month: "Series 8", subject: "Paper-4: Cost and Management Accounting (May 2026 Scheme)", title: "Cost Accounting MTP Series 8", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 4_MTP_8.pdf" },
    // ── Intermediate ── Auditing and Ethics MTP ──
    { id: "i_mtp_audit_1", year: 2025, month: "Series 1", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Auditing & Ethics MTP Series 1", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 5_MTP_1.pdf" },
    { id: "i_mtp_audit_2", year: 2025, month: "Series 2", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Auditing & Ethics MTP Series 2", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 5_MTP_2.pdf" },
    { id: "i_mtp_audit_3", year: 2025, month: "Series 3", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Auditing & Ethics MTP Series 3", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 5_MTP_3.pdf" },
    { id: "i_mtp_audit_4", year: 2025, month: "Series 4", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Auditing & Ethics MTP Series 4", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 5_MTP_4.pdf" },
    { id: "i_mtp_audit_5", year: 2026, month: "Series 5", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Auditing & Ethics MTP Series 5", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 5_MTP_5.pdf" },
    { id: "i_mtp_audit_6", year: 2026, month: "Series 6", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Auditing & Ethics MTP Series 6", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 5_MTP_6.pdf" },
    { id: "i_mtp_audit_7", year: 2026, month: "Series 7", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Auditing & Ethics MTP Series 7", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 5_MTP_7.pdf" },
    { id: "i_mtp_audit_8", year: 2026, month: "Series 8", subject: "Paper-5: Auditing and Ethics (May 2026 Scheme)", title: "Auditing & Ethics MTP Series 8", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 5_MTP_8.pdf" },
    // ── Intermediate ── Financial Management MTP ──
    { id: "i_mtp_fm_1", year: 2025, month: "Series 1", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Financial Management MTP Series 1", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6A_MTP_1.pdf" },
    { id: "i_mtp_fm_2", year: 2025, month: "Series 2", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Financial Management MTP Series 2", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6A_MTP_2.pdf" },
    { id: "i_mtp_fm_3", year: 2025, month: "Series 3", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Financial Management MTP Series 3", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6A_MTP_3.pdf" },
    { id: "i_mtp_fm_4", year: 2025, month: "Series 4", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Financial Management MTP Series 4", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6A_MTP_4.pdf" },
    { id: "i_mtp_fm_5", year: 2026, month: "Series 5", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Financial Management MTP Series 5", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6A_MTP_5.pdf" },
    { id: "i_mtp_fm_6", year: 2026, month: "Series 6", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Financial Management MTP Series 6", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6A_MTP_6.pdf" },
    { id: "i_mtp_fm_7", year: 2026, month: "Series 7", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Financial Management MTP Series 7", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6A_MTP_7.pdf" },
    { id: "i_mtp_fm_8", year: 2026, month: "Series 8", subject: "Paper-6A: Financial Management (May 2026 Scheme)", title: "Financial Management MTP Series 8", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6A_MTP_8.pdf" },
    // ── Intermediate ── Strategic Management MTP ──
    { id: "i_mtp_sm_1", year: 2025, month: "Series 1", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Strategic Management MTP Series 1", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6B_MTP_1.pdf" },
    { id: "i_mtp_sm_2", year: 2025, month: "Series 2", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Strategic Management MTP Series 2", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6B_MTP_2.pdf" },
    { id: "i_mtp_sm_3", year: 2025, month: "Series 3", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Strategic Management MTP Series 3", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6B_MTP_3.pdf" },
    { id: "i_mtp_sm_4", year: 2025, month: "Series 4", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Strategic Management MTP Series 4", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6B_MTP_4.pdf" },
    { id: "i_mtp_sm_5", year: 2026, month: "Series 5", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Strategic Management MTP Series 5", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6B_MTP_5.pdf" },
    { id: "i_mtp_sm_6", year: 2026, month: "Series 6", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Strategic Management MTP Series 6", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6B_MTP_6.pdf" },
    { id: "i_mtp_sm_7", year: 2026, month: "Series 7", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Strategic Management MTP Series 7", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6B_MTP_7.pdf" },
    { id: "i_mtp_sm_8", year: 2026, month: "Series 8", subject: "Paper-6B: Strategic Management (May 2026 Scheme)", title: "Strategic Management MTP Series 8", pdfUrl: "./pdfs/intermediate/rtpmtp/mtp/Paper 6B_MTP_8.pdf" },
    // �� Final MTPs ��
    // Paper 1: Financial Reporting
    { id: "fn_mtp_fr_1", year: 2024, month: "Series 1", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "Financial Reporting MTP Series 1", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 1_MTP_1.pdf" },
    { id: "fn_mtp_fr_2", year: 2024, month: "Series 2", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "Financial Reporting MTP Series 2", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 1_MTP_2.pdf" },
    { id: "fn_mtp_fr_3", year: 2024, month: "Series 3", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "Financial Reporting MTP Series 3", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 1_MTP_3.pdf" },
    { id: "fn_mtp_fr_4", year: 2024, month: "Series 4", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "Financial Reporting MTP Series 4", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 1_MTP_4.pdf" },
    { id: "fn_mtp_fr_5", year: 2024, month: "Series 5", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "Financial Reporting MTP Series 5", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 1_MTP_5.pdf" },
    { id: "fn_mtp_fr_6", year: 2025, month: "Series 6", subject: "Paper-1: Financial Reporting (May 2026 Scheme)", title: "Financial Reporting MTP Series 6", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 1_MTP_6.pdf" },
    // Paper 2: Advanced Financial Management
    { id: "fn_mtp_afm_1", year: 2025, month: "Series 1", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Advanced Financial Management MTP Series 1", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 2_MTP_1.pdf" },
    { id: "fn_mtp_afm_2", year: 2025, month: "Series 2", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Advanced Financial Management MTP Series 2", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 2_MTP_2.pdf" },
    { id: "fn_mtp_afm_3", year: 2025, month: "Series 3", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Advanced Financial Management MTP Series 3", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 2_MTP_3.pdf" },
    { id: "fn_mtp_afm_4", year: 2025, month: "Series 4", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Advanced Financial Management MTP Series 4", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 2_MTP_4.pdf" },
    { id: "fn_mtp_afm_5", year: 2025, month: "Series 5", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Advanced Financial Management MTP Series 5", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 2_MTP_5.pdf" },
    { id: "fn_mtp_afm_6", year: 2025, month: "Series 6", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Advanced Financial Management MTP Series 6", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 2_MTP_6.pdf" },
    { id: "fn_mtp_afm_7", year: 2025, month: "Series 7", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Advanced Financial Management MTP Series 7", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 2_MTP_7.pdf" },
    { id: "fn_mtp_afm_8", year: 2025, month: "Series 8", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Advanced Financial Management MTP Series 8", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 2_MTP_8.pdf" },
    { id: "fn_mtp_afm_9", year: 2025, month: "Series 9", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Advanced Financial Management MTP Series 9", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 2_MTP_9.pdf" },
    { id: "fn_mtp_afm_10", year: 2026, month: "Series 10", subject: "Paper-2: Advanced Financial Management (May 2026 Scheme)", title: "Advanced Financial Management MTP Series 10", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 2_MTP_10.pdf" },
    // Paper 3: Advanced Auditing, Assurance and Professional Ethics
    { id: "fn_mtp_aud_1", year: 2024, month: "Series 1", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "Advanced Auditing MTP Series 1", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 3_MTP_1.pdf" },
    { id: "fn_mtp_aud_2", year: 2024, month: "Series 2", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "Advanced Auditing MTP Series 2", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 3_MTP_2.pdf" },
    { id: "fn_mtp_aud_3", year: 2024, month: "Series 3", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "Advanced Auditing MTP Series 3", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 3_MTP_3.pdf" },
    { id: "fn_mtp_aud_4", year: 2024, month: "Series 4", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "Advanced Auditing MTP Series 4", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 3_MTP_4.pdf" },
    { id: "fn_mtp_aud_5", year: 2024, month: "Series 5", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "Advanced Auditing MTP Series 5", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 3_MTP_5.pdf" },
    { id: "fn_mtp_aud_6", year: 2025, month: "Series 6", subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2026 Scheme)", title: "Advanced Auditing MTP Series 6", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 3_MTP_6.pdf" },
    // Paper 4: Direct Tax Laws and International Taxation
    { id: "fn_mtp_dt_1", year: 2025, month: "Series 1", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "Direct Tax Laws MTP Series 1", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 4_MTP_1.pdf" },
    { id: "fn_mtp_dt_2", year: 2025, month: "Series 2", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "Direct Tax Laws MTP Series 2", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 4_MTP_2.pdf" },
    { id: "fn_mtp_dt_3", year: 2025, month: "Series 3", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "Direct Tax Laws MTP Series 3", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 4_MTP_3.pdf" },
    { id: "fn_mtp_dt_4", year: 2025, month: "Series 4", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "Direct Tax Laws MTP Series 4", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 4_MTP_4.pdf" },
    { id: "fn_mtp_dt_5", year: 2025, month: "Series 5", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "Direct Tax Laws MTP Series 5", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 4_MTP_5.pdf" },
    { id: "fn_mtp_dt_6", year: 2025, month: "Series 6", subject: "Paper-4: Direct Tax Laws and International Taxation (May 2026 Scheme)", title: "Direct Tax Laws MTP Series 6", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 4_MTP_6.pdf" },
    // Paper 5: Indirect Tax Laws
    { id: "fn_mtp_idt_1", year: 2025, month: "Series 1", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "Indirect Tax Laws MTP Series 1", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 5_MTP_1.pdf" },
    { id: "fn_mtp_idt_2", year: 2025, month: "Series 2", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "Indirect Tax Laws MTP Series 2", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 5_MTP_2.pdf" },
    { id: "fn_mtp_idt_3", year: 2025, month: "Series 3", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "Indirect Tax Laws MTP Series 3", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 5_MTP_3.pdf" },
    { id: "fn_mtp_idt_4", year: 2025, month: "Series 4", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "Indirect Tax Laws MTP Series 4", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 5_MTP_4.pdf" },
    { id: "fn_mtp_idt_5", year: 2025, month: "Series 5", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "Indirect Tax Laws MTP Series 5", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 5_MTP_5.pdf" },
    { id: "fn_mtp_idt_6", year: 2025, month: "Series 6", subject: "Paper-5: Indirect Tax Laws (May 2026 Scheme)", title: "Indirect Tax Laws MTP Series 6", pdfUrl: "./pdfs/final/rtpmtp/mtp/Paper 5_MTP_6.pdf" }
  ]
};

export const SEED_FRIENDS = [];

export const AI_CHAT_REPLIES = [
  {
    keywords: ["section 8", "charitable company", "sec 8"],
    reply: `### �� Section 8 Companies (Companies Act, 2013)

Under **Section 8** of the Act, a company is registered for promotion of commerce, art, science, sports, education, research, social welfare, religion, charity, or protection of environment.

**Key features:**
1.  **Profit Utilization**: Profits must be applied solely for promoting the company's objectives.
2.  **No Dividend**: Payment of any dividend to members is completely prohibited.
3.  **No Suffixed Name**: Section 8 companies do not need to add 'Limited' or 'Private Limited' to their names.
4.  **License Revocation**: Central Government can revoke the license if terms are breached, leading to compulsory winding up or amalgamation.`
  },
  {
    keywords: ["as-2", "as2", "valuation of inventory", "inventory valuation", "valuation of inventories", "inventories", "inventory"],
    reply: `### �� AS-2 (Valuation of Inventories)

**Core Rule**: Inventories must be valued at the **lower of Cost and Net Realizable Value (NRV)**.

**Cost Includes:**
*   Cost of purchase (net of trade discounts/rebates).
*   Cost of conversion (direct labor, fixed & variable production overheads).
*   Other costs to bring inventories to their present location and condition.

**Exclusions from Cost (Expensed immediately):**
*   Abnormal waste of materials/labor.
*   Storage costs (unless necessary in production process).
*   Administrative overheads.
*   Selling and distribution costs.`
  },
  {
    keywords: ["depreciation", "as-10", "as10", "ppe"],
    reply: `### �� AS-10 (Property, Plant, and Equipment) - Depreciation

Depreciation is the systematic allocation of the depreciable amount of an asset over its useful life.

**Key principles under AS-10:**
1.  **Component Accounting**: Each part of an item of PPE with a cost that is significant in relation to the total cost must be depreciated separately.
2.  **Review**: Depreciable amount, residual value, and useful life must be reviewed at least at the end of each financial year. Any changes are treated as a **change in accounting estimate** (applied prospectively).
3.  **Methods**: Straight-Line (SLM), Written-Down Value (WDV), or Units of Production. The method must reflect the pattern of consumption of economic benefits.`
  },
  {
    keywords: ["gst", "input tax credit", "itc"],
    reply: `### �� Input Tax Credit (ITC) under GST

Input Tax Credit (ITC) allows a registered taxpayer to reduce tax paid on purchases (inputs) from the tax liability due on sales (outputs).

**Key conditions to claim ITC (Section 16 of CGST Act):**
1.  Possession of a tax invoice or debit note.
2.  Receipt of the underlying goods or services.
3.  The tax charged on purchases has actually been paid to the government by the supplier.
4.  The taxpayer has furnished the valid return under Section 39.`
  },
  {
    keywords: ["unpaid seller", "sale of goods"],
    reply: `### �� Rights of an Unpaid Seller (Sale of Goods Act, 1930)

Under **Section 45**, a seller is deemed unpaid if the whole of the price has not been paid or a negotiable instrument received has been dishonored.

**Rights against Goods (Where property has passed):**
1.  **Right of Lien** (Sec 47): Right to retain possession until paid.
2.  **Stoppage in Transit** (Sec 50): Right to resume possession if the buyer becomes insolvent while goods are in transit.
3.  **Right of Re-sale** (Sec 54): Restricted right to re-sell goods under specific notice conditions.

**Rights against Buyer Personally:**
1.  Suit for Price.
2.  Suit for Damages for non-acceptance.
3.  Suit for Interest.`
  },
  {
    keywords: ["stationery business", "transactions and events", "transaction vs event", "surplus of 42,000", "surplus of ₹ 42,000", "logical that he will want to know", "result of his activity"],
    reply: `### �� Transactions vs. Events (Meaning & Scope of Accounting)

This classic illustration from Chapter 1 of the **CA Foundation syllabus** demonstrates the fundamental distinction between **Transactions** and **Events** in accounting.

---

### 1. What is a Transaction?
A **transaction** is a business performance or agreement between parties that involves the transfer of money or value. It is an *action* or *input*.
In your example, the **Transactions** are:
*   **Capital Investment**: Investing ₹ 2,00,000 to start the stationery business.
*   **Purchases**: Purchasing goods worth ₹ 1,15,000 on 1st January.
*   **Sales**: Selling goods for ₹ 1,47,000 during the month.
*   **Expense Payment**: Paying shop rent of ₹ 5,000 for January.

---

### 2. What is an Event?
An **event** is the *consequence*, *result*, or *outcome* of a transaction or series of transactions. It is the *output*.
In your example, the **Events** are:
*   **Surplus (Profit) of ₹ 42,000**: This is the net result of the operations, calculated as:
    $$\\text{Surplus} = \\text{Sales} (₹ 1,47,000) + \\text{Closing Stock} (₹ 15,000) - \\text{Purchases} (₹ 1,15,000) - \\text{Rent} (₹ 5,000) = ₹ 42,000$$
*   **Closing Inventory of ₹ 15,000**: The stock remaining in hand at the end of the period is a consequence of purchasing more than what was sold.

---

### �� Key takeaway for your CA Exams:
An easy way to remember the difference is: **Transactions are what you DO; Events are the RESULTS of what you did.**
*   *Transactions* are recorded as they occur in journals.
*   *Events* (like surplus/loss, closing stock, depreciation, or financial position) are determined at the end of the accounting period during finalization.`
  },
  {
    keywords: ["capital expenditure", "revenue expenditure", "capital and revenue", "expenditure", "working expenses", "spent to reduce"],
    reply: `### �� Capital vs. Revenue Expenditures (Theoretical Framework)

In CA exams, distinguishing between **Capital** and **Revenue** items is critical for preparing correct financial statements.

---

### 1. Capital Expenditure
An expenditure incurred to **acquire a long-term asset**, improve its capacity, or extend its useful life. It results in an enduring benefit.
*   **Treatment**: Capitalized on the balance sheet as an asset.
*   **Examples**: Purchase of machinery, land, building, or money spent to reduce future revenue working expenses.

### 2. Revenue Expenditure
An expenditure incurred to **maintain the day-to-day operations** or assets of the business. It does not increase the earning capacity of the asset.
*   **Treatment**: Charged directly to the Profit & Loss Account as an expense.
*   **Examples**: Salaries, shop rent, electricity, minor repairs, insurance.

---

### ✏️ Test Question Tip (True/False):
*   **Q**: *Money spent to reduce working expenses is revenue expenditure?*
*   **Ans**: **False**. Any expenditure that results in reducing future working expenses creates a long-term benefit for the entity. Therefore, it is a **Capital Expenditure** (e.g. converting a manual system to automated to save labor costs).`
  },
  {
    keywords: ["accounting standards", "accounting standard", "as", "advantages of accounting standards", "limitations of accounting standards"],
    reply: `### �� Accounting Standards (AS) - Overview & Principles

**Accounting Standards** are written policy documents issued by expert accounting bodies (like the ICAI) or by governments covering recognition, measurement, presentation, and disclosure of transactions in financial statements.

---

### �� Advantages of Accounting Standards:
1.  **Uniformity**: Eliminates confusing variations in accounting treatments.
2.  **Comparability**: Enables horizontal and vertical financial comparisons across firms.
3.  **Qualitative Improvement**: Raises overall reliability, transparency, and trust for investors.
4.  **Extra Disclosures**: Mandates disclosures beyond the basic statutory requirements.

### ⚠️ Limitations of Accounting Standards:
1.  **Rigidity**: Restricts alternative treatments that may be more suitable in rare situations.
2.  **Statute Overrides**: Accounting standards cannot override national laws or statutes (the law always wins).
3.  **Choices Exist**: Sometimes standards still offer choices between methods (e.g., SLM vs WDV), meaning variation isn't completely eliminated.`
  }
];
