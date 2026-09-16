import fs from 'fs';

const seedPath = './js/seedData.js';
let content = fs.readFileSync(seedPath, 'utf8');

const ch1UnitNotes = {
  "Unit 1: Meaning and Scope of Accounting": `<strong>UNIT 1: MEANING AND SCOPE OF ACCOUNTING (ICAI STUDY MATERIAL NOTES)</strong><br><br>Accounting is the art of recording, classifying, summarizing in a significant manner and in terms of money, transactions and events which are of financial character, and interpreting the results thereof.<br><br>• <strong>Sub-fields of Accounting:</strong><br>  1. <strong>Financial Accounting:</strong> Recording and reporting overall financial performance to external users.<br>  2. <strong>Cost Accounting:</strong> Ascertainment of product cost and operational cost control.<br>  3. <strong>Management Accounting:</strong> Providing quantitative decision-making metrics for internal management.<br>  4. <strong>Social Responsibility Accounting:</strong> Accounting for social costs and corporate environmental impacts.<br>  5. <strong>Human Resource Accounting:</strong> Measuring investment in human capital.<br><br>• <strong>Primary Objectives of Accounting:</strong><br>  - Systematic recording of transactions (Journal & Ledger).<br>  - Ascertainment of net profit or loss (Trading & P&L Account).<br>  - Determination of financial position (Balance Sheet).<br>  - Communicating financial information to stakeholders.`,

  "Unit 2: Accounting Concepts, Principles and Conventions": `<strong>UNIT 2: ACCOUNTING CONCEPTS, PRINCIPLES AND CONVENTIONS (ICAI STUDY MATERIAL NOTES)</strong><br><br>• <strong>Going Concern Concept:</strong> Assumes an enterprise will continue operational existence for the foreseeable future without intention or necessity of liquidation.<br>• <strong>Accrual Concept:</strong> Revenues and expenses are recognized as they are earned or incurred, regardless of cash receipt or payment timing.<br>• <strong>Consistency Concept:</strong> Accounting policies are followed consistently period-to-period to ensure comparability.<br>• <strong>Entity Concept:</strong> Business entity is treated as a distinct legal person separate from its owners.<br>• <strong>Money Measurement Concept:</strong> Only events quantifiable in monetary terms are recorded in accounting books.<br>• <strong>Prudence (Conservatism):</strong> Anticipate all potential future losses, but do not anticipate unrealized profits.<br>• <strong>Matching Concept:</strong> Expenses incurred in an accounting period must be matched against revenues generated during that same period.`,

  "Unit 3: Capital and Revenue Expenditures and Receipts": `<strong>UNIT 3: CAPITAL AND REVENUE EXPENDITURES AND RECEIPTS (ICAI STUDY MATERIAL NOTES)</strong><br><br>• <strong>Capital Expenditure:</strong> Incurred to acquire fixed assets, increase asset capacity, or provide enduring benefits across multiple accounting periods (e.g., machinery purchase, legal fees for title deed). Carried to the Balance Sheet.<br>• <strong>Revenue Expenditure:</strong> Incurred to maintain daily business operations, preserve earning capacity, or repair existing assets (e.g., salaries, rent, routine repairs). Debited to Trading/P&L Account.<br>• <strong>Deferred Revenue Expenditure:</strong> Revenue expenditure providing benefit over multiple financial years (e.g., heavy inaugural advertising).<br>• <strong>Capital Receipt:</strong> Non-recurring receipts from owner capital contributions, borrowings, or sale of fixed assets.<br>• <strong>Revenue Receipt:</strong> Recurring operational proceeds from sale of goods, performance of services, or interest/dividends earned.`,

  "Unit 4: Contingent Assets and Contingent Liabilities": `<strong>UNIT 4: CONTINGENT ASSETS AND CONTINGENT LIABILITIES (ICAI STUDY MATERIAL NOTES)</strong><br><br>• <strong>Contingent Liability:</strong> A possible obligation from past events whose existence is confirmed only by future uncertain events (e.g., pending court lawsuits, claims against firm not acknowledged as debts, bank guarantees given). Disclosed in Notes to Accounts, NOT recognized in Balance Sheet.<br>• <strong>Provision:</strong> A present obligation arising from past events involving probable economic outflow where a reliable estimate can be made (e.g., Provision for Doubtful Debts). Recognized in Financial Statements.<br>• <strong>Contingent Asset:</strong> A possible asset from past events; disclosed in Director's report when inflow of economic benefits becomes probable.`,

  "Unit 5: Accounting Policies": `<strong>UNIT 5: ACCOUNTING POLICIES (ICAI STUDY MATERIAL NOTES)</strong><br><br>Accounting policies refer to specific accounting principles and methods of applying those principles adopted by an enterprise.<br><br>• <strong>Major Selection Criteria (AS 1):</strong><br>  1. <strong>Prudence:</strong> Making conservative provisions for all known liabilities.<br>  2. <strong>Substance over Form:</strong> Accounting treatment according to economic reality rather than mere legal form.<br>  3. <strong>Materiality:</strong> Financial statements should disclose all material items affecting user decisions.<br><br>• <strong>Permissible Policy Changes:</strong> Allowed ONLY if required by statute, for compliance with Accounting Standards, or for a more appropriate presentation of financial statements.`,

  "Unit 6: Accounting as a Measurement Discipline – Valuation Principles": `<strong>UNIT 6: VALUATION PRINCIPLES AND ACCOUNTING ESTIMATES (ICAI STUDY MATERIAL NOTES)</strong><br><br>• <strong>Valuation Bases:</strong><br>  1. <strong>Historical Cost:</strong> Assets recorded at acquisition price paid plus costs to bring asset into usable state.<br>  2. <strong>Current Cost:</strong> Asset valued at amount required to replace it currently.<br>  3. <strong>Realizable Value:</strong> Asset valued at net sale price attainable in ordinary market course.<br>  4. <strong>Present Value (PV):</strong> Asset valued at discounted net present value of expected future cash flows.<br><br>• <strong>Accounting Estimates:</strong> Approximations made in financial reporting (e.g., useful life of fixed assets, provision for warranty claims, provision for doubtful accounts).`,

  "Unit 7: Accounting Standards": `<strong>UNIT 7: ACCOUNTING STANDARDS (ICAI STUDY MATERIAL NOTES)</strong><br><br>Accounting Standards (AS) and Indian Accounting Standards (Ind AS) are authoritative statements issued by the ICAI Council to standardize accounting policies, ensure statutory transparency, eliminate non-comparability in financial reports, and comply with statutory frameworks.`
};

const ch2UnitNotes = {
  "Unit 1: Basic Accounting Procedures – Journal entries": `<strong>UNIT 1: BASIC ACCOUNTING PROCEDURES & JOURNALIZING (ICAI STUDY MATERIAL NOTES)</strong><br><br>• <strong>Traditional Golden Rules of Accounting:</strong><br>  - Personal Account: Debit the Receiver, Credit the Giver.<br>  - Real Account: Debit what Comes In, Credit what Goes Out.<br>  - Nominal Account: Debit all Expenses & Losses, Credit all Incomes & Gains.<br>• <strong>Modern Classification Approach:</strong><br>  - Assets & Expenses: Increase = Debit, Decrease = Credit.<br>  - Liabilities, Capital & Revenues: Increase = Credit, Decrease = Debit.`,

  "Unit 2: Ledgers": `<strong>UNIT 2: LEDGERS (ICAI STUDY MATERIAL NOTES)</strong><br><br>Ledger is the principal book of accounts containing summarized, classified accounts.<br><br>• <strong>Ledger Balancing:</strong> Process of finding the difference between total debits and total credits of an account at period end to extract balances for the Trial Balance.`,

  "Unit 3: Trial Balance": `<strong>UNIT 3: TRIAL BALANCE (ICAI STUDY MATERIAL NOTES)</strong><br><br>A statement listing debit and credit ledger balances on a specific date to verify arithmetical accuracy.<br><br>• <strong>Limitations:</strong> Trial Balance does NOT detect Errors of Principle, Errors of Complete Omission, or Compensating Errors.`,

  "Unit 4: Subsidiary Books": `<strong>UNIT 4: SUBSIDIARY BOOKS (ICAI STUDY MATERIAL NOTES)</strong><br><br>Special purpose journals used for recording high-volume repetitive transactions:<br>Purchases Book, Sales Book, Purchases Return Book, Sales Return Book, Bills Receivable Book, Bills Payable Book, and Journal Proper. Trade discounts are deducted directly before recording net invoice amounts.`,

  "Unit 5: Cash Book": `<strong>UNIT 5: CASH BOOK (ICAI STUDY MATERIAL NOTES)</strong><br><br>Dual-purpose book functioning as both primary journal and ledger account.<br><br>• <strong>Three-Column Cash Book:</strong> Records Cash, Bank, and Discount columns.<br>• <strong>Contra Entry:</strong> Simultaneous entry affecting both Cash and Bank columns when cash is deposited into or withdrawn from bank.`,

  "Unit 6: Rectification of Errors": `<strong>UNIT 6: RECTIFICATION OF ERRORS (ICAI STUDY MATERIAL NOTES)</strong><br><br>• <strong>Types of Errors:</strong> Errors of Omission, Commission, Principle, and Compensating Errors.<br>• <strong>Rectification Stages:</strong><br>  1. <strong>Before Trial Balance:</strong> Direct ledger correction.<br>  2. <strong>After Trial Balance but Before Final Accounts:</strong> Rectified using <strong>Suspense Account</strong>.<br>  3. <strong>After Final Accounts (Next Year):</strong> Rectified using <strong>Profit & Loss Adjustment Account</strong>.`
};

// Helper to update units array with notes field
function updateUnitsWithNotes(unitsArray, notesMap) {
  return unitsArray.map(u => {
    let matchedNotes = notesMap[u.name];
    if (!matchedNotes) {
      const uShort = u.name.split(':')[0].trim();
      const foundKey = Object.keys(notesMap).find(k => k.startsWith(uShort));
      if (foundKey) matchedNotes = notesMap[foundKey];
    }
    return {
      ...u,
      notes: matchedNotes || `<strong>${u.name.toUpperCase()} NOTES</strong><br><br>Refer to official ICAI study material module for ${u.name}.`
    };
  });
}

// Re-read file and update JSON objects
let seedObj = fs.readFileSync(seedPath, 'utf8');

// Parse and update unit objects
// Update Chapter 1 units in f_acc_c1 and f27_acc_c1
for (let chId of ['f_acc_c1', 'f27_acc_c1']) {
  const matchRegex = new RegExp(`"id": "${chId}",[\\s\\S]*?"units": (\\[[\\s\\S]*?\\]),`);
  const match = seedObj.match(matchRegex);
  if (match && match[1]) {
    try {
      const parsedUnits = JSON.parse(match[1]);
      const updatedUnits = updateUnitsWithNotes(parsedUnits, ch1UnitNotes);
      seedObj = seedObj.replace(match[1], JSON.stringify(updatedUnits, null, 10));
    } catch (e) {
      console.error('Error parsing units for', chId, e);
    }
  }
}

// Update Chapter 2 units in f_acc_c2 and f27_acc_c2
for (let chId of ['f_acc_c2', 'f27_acc_c2']) {
  const matchRegex = new RegExp(`"id": "${chId}",[\\s\\S]*?"units": (\\[[\\s\\S]*?\\]),`);
  const match = seedObj.match(matchRegex);
  if (match && match[1]) {
    try {
      const parsedUnits = JSON.parse(match[1]);
      const updatedUnits = updateUnitsWithNotes(parsedUnits, ch2UnitNotes);
      seedObj = seedObj.replace(match[1], JSON.stringify(updatedUnits, null, 10));
    } catch (e) {
      console.error('Error parsing units for', chId, e);
    }
  }
}

fs.writeFileSync(seedPath, seedObj, 'utf8');
console.log('Successfully attached individual unit notes to seedData.js!');
