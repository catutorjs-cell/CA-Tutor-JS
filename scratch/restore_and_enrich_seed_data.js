import fs from 'fs';

const seedPath = './js/seedData.js';

const ch1Notes = `<strong>CHAPTER 1: THEORETICAL FRAMEWORK (COMPREHENSIVE ICAI STUDY MATERIAL SUMMARY)</strong><br><br>

1. <strong>Meaning & Scope of Accounting (Unit 1):</strong><br>
Accounting is the art of recording, classifying, summarizing in a significant manner and in terms of money, transactions and events which are of financial character, and interpreting the results thereof.<br>
• <strong>Sub-fields:</strong> Financial Accounting, Cost Accounting, Management Accounting, Social Responsibility Accounting, and Human Resource Accounting.<br>
• <strong>Objectives:</strong> Systematic recording, ascertainment of financial performance (Profit & Loss Account), determination of financial position (Balance Sheet), and communicating key financial reports to internal and external stakeholders.<br><br>

2. <strong>Accounting Concepts, Principles & Conventions (Unit 2):</strong><br>
• <strong>Going Concern Concept:</strong> Assumes the enterprise will continue operational existence for the foreseeable future without intention or necessity of liquidation.<br>
• <strong>Accrual Concept:</strong> Revenues and expenses are recognized as they are earned or incurred, regardless of cash receipt or payment timing.<br>
• <strong>Consistency Concept:</strong> Accounting policies are applied consistently period-to-period to ensure comparability.<br>
• <strong>Entity Concept:</strong> Business entity is treated as a distinct legal person separate from its owners.<br>
• <strong>Money Measurement Concept:</strong> Only events quantifiable in monetary terms are recorded in accounting books.<br>
• <strong>Prudence (Conservatism):</strong> Anticipate all potential future losses, but do not anticipate unrealized profits.<br>
• <strong>Matching Concept:</strong> Expenses incurred in an accounting period must be matched against revenues generated during that same period.<br><br>

3. <strong>Capital and Revenue Expenditures & Receipts (Unit 3):</strong><br>
• <strong>Capital Expenditure:</strong> Incurred to acquire fixed assets, increase asset capacity, or provide enduring benefits across multiple accounting periods (e.g., machinery purchase, legal fees for title deed). Carried to the Balance Sheet.<br>
• <strong>Revenue Expenditure:</strong> Incurred to maintain daily business operations, preserve earning capacity, or repair existing assets (e.g., salaries, rent, routine repairs). Debited to Trading/P&L Account.<br>
• <strong>Capital Receipt:</strong> Non-recurring receipts from owner capital contributions, borrowings, or sale of fixed assets.<br>
• <strong>Revenue Receipt:</strong> Recurring operational proceeds from sale of goods, performance of services, or interest/dividends earned.<br><br>

4. <strong>Contingent Liabilities & Contingent Assets (Unit 4):</strong><br>
• <strong>Contingent Liability:</strong> A possible obligation from past events whose existence is confirmed only by future uncertain events (e.g., pending court lawsuits, claims against firm not acknowledged as debts, bank guarantees given). Disclosed in Notes to Accounts, NOT recognized in Balance Sheet.<br>
• <strong>Provision:</strong> A present obligation arising from past events involving probable economic outflow where a reliable estimate can be made (e.g., Provision for Doubtful Debts). Recognized in Financial Statements.<br>
• <strong>Contingent Asset:</strong> A possible asset from past events; disclosed in Director's report when inflow of economic benefits becomes probable.<br><br>

5. <strong>Accounting Policies & Valuation Principles (Units 5 & 6):</strong><br>
• <strong>Selection Criteria:</strong> Governed by Prudence, Substance over Form, and Materiality.<br>
• <strong>Valuation Bases:</strong> Historical Cost (acquisition price), Current Cost (replacement cost), Realizable Value (net sale proceeds), Present Value (discounted future net cash flows).<br><br>

6. <strong>Accounting Standards Framework (Unit 7):</strong><br>
Accounting Standards (AS) and Ind AS issued by the ICAI Council harmonize accounting policies, ensure statutory transparency, remove variations in financial reporting, and comply with the Companies Act, 2013.<br><br>

💡 <strong>EXAM TIP:</strong> Distinguishing Capital vs Revenue expenditure and identifying Contingent Liabilities are compulsory 2-4 mark questions in ICAI Foundation Paper 1.`;

const ch1Illustrations = [
  {
    "unit": "Unit 1: Meaning and Scope of Accounting",
    "q": "Illustration 1: State with reasons whether Financial Statements present only historical facts.",
    "a": "False. Financial statements incorporate both historical transactions (e.g. historical cost of fixed assets) as well as unrecorded estimates, future projections (e.g. provisions for doubtful debts, inventory NRV adjustments, asset useful life estimates), and going concern assumptions."
  },
  {
    "unit": "Unit 1: Meaning and Scope of Accounting",
    "q": "Illustration 2: Differentiate between Financial Accounting and Management Accounting.",
    "a": "Financial Accounting focuses on external reporting of historical performance under GAAP/AS for shareholders and regulatory authorities. Management Accounting provides internal forward-looking decision metrics and cost analyses for corporate management."
  },
  {
    "unit": "Unit 2: Accounting Concepts, Principles and Conventions",
    "q": "Illustration 1: A business purchased a machine for ₹10,00,000 having a market value of ₹15,00,000. It recorded the machine at ₹15,00,000. Is this correct?",
    "a": "Incorrect. Under the Historical Cost Concept, assets must be recorded at their actual acquisition price (cost incurred to acquire asset, i.e., ₹10,00,000) and not at current market valuation."
  },
  {
    "unit": "Unit 2: Accounting Concepts, Principles and Conventions",
    "q": "Illustration 2: Explain the Going Concern Concept and its accounting implication.",
    "a": "The Going Concern concept assumes that an enterprise will continue operational existence for the foreseeable future without intention or necessity of liquidation. Implication: Fixed assets are valued at historical cost less depreciation rather than immediate net break-up liquidation value."
  },
  {
    "unit": "Unit 2: Accounting Concepts, Principles and Conventions",
    "q": "Illustration 3: What is the impact of violating the Prudence (Conservatism) Concept?",
    "a": "Violating Prudence by anticipating unrealized future profits overstates net income and equity, misleading shareholders and violating ICAI reporting directives."
  },
  {
    "unit": "Unit 3: Capital and Revenue Expenditures and Receipts",
    "q": "Illustration 1: ₹25,000 spent on overhauling a second-hand motor truck purchased to put it in working condition. Classify as Capital or Revenue.",
    "a": "Capital Expenditure. Expenses incurred to bring a second-hand asset into usable working condition increase its initial earning capacity and must be capitalized to the Motor Truck Account."
  },
  {
    "unit": "Unit 3: Capital and Revenue Expenditures and Receipts",
    "q": "Illustration 2: ₹5,000 paid for repainting an old factory building. Classify as Capital or Revenue.",
    "a": "Revenue Expenditure. Routine repainting maintains the existing working condition of the asset without extending its total useful life or increasing earning capacity. Debited to P&L Account."
  },
  {
    "unit": "Unit 3: Capital and Revenue Expenditures and Receipts",
    "q": "Illustration 3: Legal fees of ₹12,000 paid to defend the legal title of factory land. Classify as Capital or Revenue.",
    "a": "Capital Expenditure. Defending or establishing clear legal title to a fixed asset provides enduring legal protection and is capitalized to the Land Account."
  },
  {
    "unit": "Unit 4: Contingent Assets and Contingent Liabilities",
    "q": "Illustration 1: A customer filed a legal claim for ₹50,000 against the company for defective goods. Legal counsel states the claim is likely to fail. How is this treated?",
    "a": "It is a Contingent Liability. Since the liability is possible but economic outflow is unlikely, it is disclosed as a note to the financial statements rather than creating a provision."
  },
  {
    "unit": "Unit 4: Contingent Assets and Contingent Liabilities",
    "q": "Illustration 2: Differentiate between a Provision and a Contingent Liability.",
    "a": "A Provision is a present obligation arising from past events where economic outflow is probable and can be reliably estimated (e.g., Provision for Doubtful Debts). A Contingent Liability is a possible obligation depending on uncertain future events (e.g., pending lawsuit)."
  },
  {
    "unit": "Unit 5: Accounting Policies",
    "q": "Illustration 1: Can an enterprise change its accounting policy every year to report higher profits?",
    "a": "No. Under the Consistency Concept and AS 1, accounting policies can only be changed if required by statute, for compliance with an Accounting Standard, or if the change results in a more appropriate presentation of financial statements."
  },
  {
    "unit": "Unit 6: Valuation Principles and Accounting Estimates",
    "q": "Illustration 1: An asset was bought for ₹5,00,000 3 years ago. Today its replacement cost is ₹7,00,000 and net sale proceeds are ₹4,20,000. Identify Historical Cost, Current Cost, and Realizable Value.",
    "a": "• Historical Cost = ₹5,00,000 (original purchase price)\n• Current Cost = ₹7,00,000 (current replacement price)\n• Realizable Value = ₹4,20,000 (net sale proceeds)"
  },
  {
    "unit": "Unit 7: Accounting Standards",
    "q": "Illustration 1: What is the primary objective of Accounting Standards issued by ICAI?",
    "a": "To harmonize diverse accounting policies and practices, eliminate non-comparability in financial statements, and ensure compliance with statutory frameworks across all reporting entities."
  }
];

const ch1Units = [
  {
    "name": "Unit 1: Meaning and Scope of Accounting",
    "url": "https://resource.cdn.icai.org/88093bos-aps2240-ch1u1.pdf"
  },
  {
    "name": "Unit 2: Accounting Concepts, Principles and Conventions",
    "url": "https://resource.cdn.icai.org/88094bos-aps2240-ch1u2.pdf"
  },
  {
    "name": "Unit 3: Capital and Revenue Expenditures and Receipts",
    "url": "https://resource.cdn.icai.org/88095bos-aps2240-ch1u3.pdf"
  },
  {
    "name": "Unit 4: Contingent Assets and Contingent Liabilities",
    "url": "https://resource.cdn.icai.org/88096bos-aps2240-ch1u4.pdf"
  },
  {
    "name": "Unit 5: Accounting Policies",
    "url": "https://resource.cdn.icai.org/88097bos-aps2240-ch1u5.pdf"
  },
  {
    "name": "Unit 6: Accounting as a Measurement Discipline – Valuation Principles",
    "url": "https://resource.cdn.icai.org/88098bos-aps2240-ch1u6.pdf"
  },
  {
    "name": "Unit 7: Accounting Standards",
    "url": "https://resource.cdn.icai.org/88099bos-aps2240-ch1u7.pdf"
  }
];

const ch2Notes = `<strong>CHAPTER 2: ACCOUNTING PROCESS (COMPREHENSIVE ICAI STUDY MATERIAL SUMMARY)</strong><br><br>

1. <strong>Basic Accounting Procedures & Journalizing (Unit 1):</strong><br>
• <strong>Traditional Golden Rules of Accounting:</strong><br>
  - Personal Account: Debit the Receiver, Credit the Giver.<br>
  - Real Account: Debit what Comes In, Credit what Goes Out.<br>
  - Nominal Account: Debit all Expenses & Losses, Credit all Incomes & Gains.<br>
• <strong>Modern Classification Approach:</strong><br>
  - Assets & Expenses: Increase = Debit, Decrease = Credit.<br>
  - Liabilities, Capital & Revenues: Increase = Credit, Decrease = Debit.<br><br>

2. <strong>Ledger Postings & Trial Balance (Units 2 & 3):</strong><br>
• <strong>Ledger:</strong> The principal book of accounts containing summarized, classified accounts.<br>
• <strong>Trial Balance:</strong> A statement listing debit and credit ledger balances on a specific date to verify arithmetical accuracy. Note: Trial Balance does NOT detect Errors of Principle, Omission, or Compensating Errors.<br><br>

3. <strong>Subsidiary Books & Cash Book (Units 4 & 5):</strong><br>
• Special Purpose Subsidiary Books: Purchases Book, Sales Book, Purchases Return Book, Sales Return Book, Bills Receivable Book, Bills Payable Book, and Journal Proper.<br>
• <strong>Cash Book:</strong> Dual-purpose book functioning as both primary journal and ledger account. Three-column Cash Book records Cash, Bank, and Discount columns.<br>
• <strong>Contra Entry:</strong> Simultaneous entry affecting both Cash and Bank columns when cash is deposited into or withdrawn from bank.<br><br>

4. <strong>Rectification of Errors (Unit 6):</strong><br>
• <strong>Types of Errors:</strong><br>
  - Errors of Omission: Complete or partial non-recording of transactions.<br>
  - Errors of Commission: Wrong entries, posting to wrong account, wrong side, or wrong totaling.<br>
  - Errors of Principle: Violation of fundamental accounting concepts (e.g., treating capital expenditure as revenue).<br>
  - Compensating Errors: Errors whose effects cancel each other out.<br>
• <strong>Stages of Rectification:</strong><br>
  1. <strong>Before Trial Balance:</strong> Direct ledger correction without Suspense Account.<br>
  2. <strong>After Trial Balance but Before Final Accounts:</strong> One-sided errors rectified using <strong>Suspense Account</strong>.<br>
  3. <strong>After Final Accounts (Subsequent Year):</strong> Nominal accounts rectified using <strong>Profit & Loss Adjustment Account</strong> to prevent distorting current year profits.<br><br>

💡 <strong>EXAM TIP:</strong> Rectification of Errors after Final Accounts using P&L Adjustment Account is a high-frequency 5-10 mark question in ICAI exams.`;

const ch2Illustrations = [
  {
    "unit": "Unit 1: Basic Accounting Procedures – Journal entries",
    "q": "Illustration 1: Goods worth ₹10,000 sold to Ram on credit. Pass the journal entry under traditional and modern approaches.",
    "a": "Journal Entry: Ram's A/c Dr. ₹10,000 To Sales A/c ₹10,000.\n• Traditional: Ram is Personal A/c (Debit Receiver); Sales is Nominal A/c (Credit Income).\n• Modern: Ram is Asset (Increase=Debit); Sales is Revenue (Increase=Credit)."
  },
  {
    "unit": "Unit 2: Ledgers",
    "q": "Illustration 1: What is the purpose of ledger balancing?",
    "a": "To ascertain the net position (Debit balance or Credit balance) of every account at the end of an accounting period for preparing the Trial Balance."
  },
  {
    "unit": "Unit 3: Trial Balance",
    "q": "Illustration 1: Does agreement of a Trial Balance serve as conclusive proof of accuracy?",
    "a": "No. A Trial Balance only proves arithmetical accuracy. It does not detect Errors of Principle (e.g. capital item debited to P&L), Errors of Complete Omission, or Compensating Errors."
  },
  {
    "unit": "Unit 4: Subsidiary Books",
    "q": "Illustration 1: Are trade discounts recorded in Purchase Books?",
    "a": "No. Trade discounts are deducted directly from the gross invoice price before entering net amounts in Purchase Books."
  },
  {
    "unit": "Unit 5: Cash Book",
    "q": "Illustration 1: What is a Contra Entry in a Cash Book?",
    "a": "An entry that affects both Cash and Bank columns simultaneously (e.g. cash deposited into bank or cash withdrawn from bank for office use), marked with 'C' in LF column."
  },
  {
    "unit": "Unit 6: Rectification of Errors",
    "q": "Illustration 1: Credit purchase of machinery for ₹50,000 was wrongly recorded in Purchase Book. Pass rectification entry after Trial Balance.",
    "a": "Rectification Entry:\nMachinery A/c Dr. ₹50,000\n  To Purchases A/c ₹50,000\n(Being correction of error of principle where capital asset purchase was posted to revenue purchase account)."
  }
];

const ch2Units = [
  {
    "name": "Unit 1: Basic Accounting Procedures – Journal entries",
    "url": "https://resource.cdn.icai.org/88100bos-aps2240-ch2u1.pdf"
  },
  {
    "name": "Unit 2: Ledgers",
    "url": "https://resource.cdn.icai.org/88101bos-aps2240-ch2u2.pdf"
  },
  {
    "name": "Unit 3: Trial Balance",
    "url": "https://resource.cdn.icai.org/88102bos-aps2240-ch2u3.pdf"
  },
  {
    "name": "Unit 4: Subsidiary Books",
    "url": "https://resource.cdn.icai.org/88103bos-aps2240-ch2u4.pdf"
  },
  {
    "name": "Unit 5: Cash Book",
    "url": "https://resource.cdn.icai.org/88104bos-aps2240-ch2u5.pdf"
  },
  {
    "name": "Unit 6: Rectification of Errors",
    "url": "https://resource.cdn.icai.org/88105bos-aps2240-ch2u6.pdf"
  }
];

// Read fresh file content
let code = fs.readFileSync(seedPath, 'utf8');

// Construct full replacement block for Chapter 1 and Chapter 2 in Foundation_May2026_Data
const f26_ch1 = `      {
        "id": "f_acc_c1",
        "name": "Chapter 1: Theoretical Framework",
        "weightage": "High",
        "notes": ${JSON.stringify(ch1Notes)},
        "pdfUrls": [
          "https://resource.cdn.icai.org/88093bos-aps2240-ch1u1.pdf",
          "https://resource.cdn.icai.org/88094bos-aps2240-ch1u2.pdf",
          "https://resource.cdn.icai.org/88095bos-aps2240-ch1u3.pdf",
          "https://resource.cdn.icai.org/88096bos-aps2240-ch1u4.pdf",
          "https://resource.cdn.icai.org/88097bos-aps2240-ch1u5.pdf",
          "https://resource.cdn.icai.org/88098bos-aps2240-ch1u6.pdf",
          "https://resource.cdn.icai.org/88099bos-aps2240-ch1u7.pdf"
        ],
        "units": ${JSON.stringify(ch1Units, null, 10)},
        "illustrations": ${JSON.stringify(ch1Illustrations, null, 10)}
      }`;

const f26_ch2 = `      {
        "id": "f_acc_c2",
        "name": "Chapter 2: Accounting Process",
        "weightage": "High",
        "notes": ${JSON.stringify(ch2Notes)},
        "pdfUrls": [
          "https://resource.cdn.icai.org/88100bos-aps2240-ch2u1.pdf",
          "https://resource.cdn.icai.org/88101bos-aps2240-ch2u2.pdf",
          "https://resource.cdn.icai.org/88102bos-aps2240-ch2u3.pdf",
          "https://resource.cdn.icai.org/88103bos-aps2240-ch2u4.pdf",
          "https://resource.cdn.icai.org/88104bos-aps2240-ch2u5.pdf",
          "https://resource.cdn.icai.org/88105bos-aps2240-ch2u6.pdf"
        ],
        "units": ${JSON.stringify(ch2Units, null, 10)},
        "illustrations": ${JSON.stringify(ch2Illustrations, null, 10)}
      }`;

code = code.replace(
  /\{\s*"id": "f_acc_c1",[\s\S]*?\{\s*"id": "f_acc_c3"/,
  `${f26_ch1},\n${f26_ch2},\n      {\n        "id": "f_acc_c3"`
);

// Construct full replacement block for Chapter 1 and Chapter 2 in Foundation_May2027_Data
const f27_ch1 = `      {
        "id": "f27_acc_c1",
        "name": "Chapter 1: Theoretical Framework",
        "weightage": "High",
        "notes": ${JSON.stringify(ch1Notes)},
        "pdfUrls": [
          "https://resource.cdn.icai.org/93935bos-aps6170-ch1u1.pdf",
          "https://resource.cdn.icai.org/93936bos-aps6170-ch1u2.pdf",
          "https://resource.cdn.icai.org/93937bos-aps6170-ch1u3.pdf",
          "https://resource.cdn.icai.org/93938bos-aps6170-ch1u4.pdf",
          "https://resource.cdn.icai.org/93939bos-aps6170-ch1u5.pdf",
          "https://resource.cdn.icai.org/93940bos-aps6170-ch1u6.pdf",
          "https://resource.cdn.icai.org/93941bos-aps6170-ch1u7.pdf"
        ],
        "units": ${JSON.stringify(ch1Units, null, 10)},
        "illustrations": ${JSON.stringify(ch1Illustrations, null, 10)}
      }`;

const f27_ch2 = `      {
        "id": "f27_acc_c2",
        "name": "Chapter 2: Accounting Process",
        "weightage": "High",
        "notes": ${JSON.stringify(ch2Notes)},
        "pdfUrls": [
          "https://resource.cdn.icai.org/88100bos-aps2240-ch2u1.pdf",
          "https://resource.cdn.icai.org/88101bos-aps2240-ch2u2.pdf",
          "https://resource.cdn.icai.org/88102bos-aps2240-ch2u3.pdf",
          "https://resource.cdn.icai.org/88103bos-aps2240-ch2u4.pdf",
          "https://resource.cdn.icai.org/88104bos-aps2240-ch2u5.pdf",
          "https://resource.cdn.icai.org/88105bos-aps2240-ch2u6.pdf"
        ],
        "units": ${JSON.stringify(ch2Units, null, 10)},
        "illustrations": ${JSON.stringify(ch2Illustrations, null, 10)}
      }`;

code = code.replace(
  /\{\s*"id": "f27_acc_c1",[\s\S]*?\{\s*"id": "f27_acc_c3"/,
  `${f27_ch1},\n${f27_ch2},\n      {\n        "id": "f27_acc_c3"`
);

fs.writeFileSync(seedPath, code, 'utf8');
console.log('Successfully rebuilt seedData.js with clean chapter 1 and chapter 2 objects!');
