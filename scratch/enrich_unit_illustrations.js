import fs from 'fs';

const seedPath = './js/seedData.js';
let content = fs.readFileSync(seedPath, 'utf8');

const ch1Illustrations = [
  // Unit 1
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
  // Unit 2
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
  // Unit 3
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
  // Unit 4
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
  // Unit 5
  {
    "unit": "Unit 5: Accounting Policies",
    "q": "Illustration 1: Can an enterprise change its accounting policy every year to report higher profits?",
    "a": "No. Under the Consistency Concept and AS 1, accounting policies can only be changed if required by statute, for compliance with an Accounting Standard, or if the change results in a more appropriate presentation of financial statements."
  },
  // Unit 6
  {
    "unit": "Unit 6: Valuation Principles and Accounting Estimates",
    "q": "Illustration 1: An asset was bought for ₹5,00,000 3 years ago. Today its replacement cost is ₹7,00,000 and net sale proceeds are ₹4,20,000. Identify Historical Cost, Current Cost, and Realizable Value.",
    "a": "• Historical Cost = ₹5,00,000 (original purchase price)\n• Current Cost = ₹7,00,000 (current replacement price)\n• Realizable Value = ₹4,20,000 (net sale proceeds)"
  },
  // Unit 7
  {
    "unit": "Unit 7: Accounting Standards",
    "q": "Illustration 1: What is the primary objective of Accounting Standards issued by ICAI?",
    "a": "To harmonize diverse accounting policies and practices, eliminate non-comparability in financial statements, and ensure compliance with statutory frameworks across all reporting entities."
  }
];

const ch2Illustrations = [
  // Unit 1
  {
    "unit": "Unit 1: Basic Accounting Procedures – Journal entries",
    "q": "Illustration 1: Goods worth ₹10,000 sold to Ram on credit. Pass the journal entry under traditional and modern approaches.",
    "a": "Journal Entry: Ram's A/c Dr. ₹10,000 To Sales A/c ₹10,000.\n• Traditional: Ram is Personal A/c (Debit Receiver); Sales is Nominal A/c (Credit Income).\n• Modern: Ram is Asset (Increase=Debit); Sales is Revenue (Increase=Credit)."
  },
  // Unit 2
  {
    "unit": "Unit 2: Ledgers",
    "q": "Illustration 1: What is the purpose of ledger balancing?",
    "a": "To ascertain the net position (Debit balance or Credit balance) of every account at the end of an accounting period for preparing the Trial Balance."
  },
  // Unit 3
  {
    "unit": "Unit 3: Trial Balance",
    "q": "Illustration 1: Does agreement of a Trial Balance serve as conclusive proof of accuracy?",
    "a": "No. A Trial Balance only proves arithmetical accuracy. It does not detect Errors of Principle (e.g. capital item debited to P&L), Errors of Complete Omission, or Compensating Errors."
  },
  // Unit 4
  {
    "unit": "Unit 4: Subsidiary Books",
    "q": "Illustration 1: Are trade discounts recorded in Purchase Books?",
    "a": "No. Trade discounts are deducted directly from the gross invoice price before entering net amounts in Purchase Books."
  },
  // Unit 5
  {
    "unit": "Unit 5: Cash Book",
    "q": "Illustration 1: What is a Contra Entry in a Cash Book?",
    "a": "An entry that affects both Cash and Bank columns simultaneously (e.g. cash deposited into bank or cash withdrawn from bank for office use), marked with 'C' in LF column."
  },
  // Unit 6
  {
    "unit": "Unit 6: Rectification of Errors",
    "q": "Illustration 1: Credit purchase of machinery for ₹50,000 was wrongly recorded in Purchase Book. Pass rectification entry after Trial Balance.",
    "a": "Rectification Entry:\nMachinery A/c Dr. ₹50,000\n  To Purchases A/c ₹50,000\n(Being correction of error of principle where capital asset purchase was posted to revenue purchase account)."
  }
];

// Update f_acc_c1 and f27_acc_c1 illustrations
content = content.replace(
  /"id": "f_acc_c1",[\s\S]*?"illustrations": \[[\s\S]*?\],/,
  (match) => match.replace(/"illustrations": \[[\s\S]*?\],/, `"illustrations": ${JSON.stringify(ch1Illustrations, null, 2)},`)
);
content = content.replace(
  /"id": "f27_acc_c1",[\s\S]*?"illustrations": \[[\s\S]*?\],/,
  (match) => match.replace(/"illustrations": \[[\s\S]*?\],/, `"illustrations": ${JSON.stringify(ch1Illustrations, null, 2)},`)
);

// Update f_acc_c2 and f27_acc_c2 illustrations
content = content.replace(
  /"id": "f_acc_c2",[\s\S]*?"illustrations": \[[\s\S]*?\],/,
  (match) => match.replace(/"illustrations": \[[\s\S]*?\],/, `"illustrations": ${JSON.stringify(ch2Illustrations, null, 2)},`)
);
content = content.replace(
  /"id": "f27_acc_c2",[\s\S]*?"illustrations": \[[\s\S]*?\],/,
  (match) => match.replace(/"illustrations": \[[\s\S]*?\],/, `"illustrations": ${JSON.stringify(ch2Illustrations, null, 2)},`)
);

fs.writeFileSync(seedPath, content, 'utf8');
console.log('Successfully updated seedData.js with unit-wise illustrations!');
