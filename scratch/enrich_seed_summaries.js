import fs from 'fs';

const seedPath = './js/seedData.js';
let content = fs.readFileSync(seedPath, 'utf8');

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

// Replace f_acc_c1 and f27_acc_c1 notes
content = content.replace(
  /"id": "f_acc_c1",[\s\S]*?"notes": ".*?",/,
  `"id": "f_acc_c1",\n        "name": "Chapter 1: Theoretical Framework",\n        "weightage": "High",\n        "notes": ${JSON.stringify(ch1Notes)},`
);

content = content.replace(
  /"id": "f27_acc_c1",[\s\S]*?"notes": ".*?",/,
  `"id": "f27_acc_c1",\n        "name": "Chapter 1: Theoretical Framework",\n        "weightage": "High",\n        "notes": ${JSON.stringify(ch1Notes)},`
);

// Replace f_acc_c2 and f27_acc_c2 notes
content = content.replace(
  /"id": "f_acc_c2",[\s\S]*?"notes": ".*?",/,
  `"id": "f_acc_c2",\n        "name": "Chapter 2: Accounting Process",\n        "weightage": "High",\n        "notes": ${JSON.stringify(ch2Notes)},`
);

content = content.replace(
  /"id": "f27_acc_c2",[\s\S]*?"notes": ".*?",/,
  `"id": "f27_acc_c2",\n        "name": "Chapter 2: Accounting Process",\n        "weightage": "High",\n        "notes": ${JSON.stringify(ch2Notes)},`
);

fs.writeFileSync(seedPath, content, 'utf8');
console.log('Successfully updated seedData.js chapter 1 and 2 notes with full study material summaries!');
