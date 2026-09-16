import fs from 'fs';

const seedPath = './js/seedData.js';
let content = fs.readFileSync(seedPath, 'utf8');

const chSummaries = {
  c1: `<strong>CHAPTER 1: THEORETICAL FRAMEWORK (COMPREHENSIVE ICAI STUDY MATERIAL SUMMARY)</strong><br><br>

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

💡 <strong>EXAM TIP:</strong> Distinguishing Capital vs Revenue expenditure and identifying Contingent Liabilities are compulsory 2-4 mark questions in ICAI Foundation Paper 1.`,

  c2: `<strong>CHAPTER 2: ACCOUNTING PROCESS (COMPREHENSIVE ICAI STUDY MATERIAL SUMMARY)</strong><br><br>

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

💡 <strong>EXAM TIP:</strong> Rectification of Errors after Final Accounts using P&L Adjustment Account is a high-frequency 5-10 mark question in ICAI exams.`,

  c3: `A Bank Reconciliation Statement (BRS) is prepared to reconcile the difference between the balance shown by the Cash Book (bank column) and the Pass Book (bank statement) on a particular date. Differences arise due to:<br><br>1. <strong>Timing Differences:</strong> Cheques issued but not presented for payment, Cheques deposited but not cleared by the bank, Interest allowed or bank charges debited by the bank directly.<br>2. <strong>Transactions Unknown to Business:</strong> Direct collections by bank, Direct payments made by bank (Standing Instructions), Interest & dividends collected by bank directly.<br>3. <strong>Errors:</strong> Errors committed by the business in the Cash Book, or errors committed by the bank in the Pass Book.<br><br>💡 <strong>EXAM TIP (Adjusted Cash Book):</strong> In practice, before preparing a BRS, the Cash Book must be adjusted. All errors in the Cash Book (e.g. wrong postings, omissions) and transactions directly recorded by the bank (e.g. bank charges, direct deposits) must be entered in the Adjusted Cash Book first. Timing differences (e.g. unpresented cheques) are <strong>never</strong> recorded in the Adjusted Cash Book and must go directly into the BRS.`,

  c4: `<strong>CHAPTER 4: INVENTORIES (COMPREHENSIVE ICAI STUDY MATERIAL SUMMARY)</strong><br><br>

1. <strong>Definition & Valuation Standard (AS 2 / Ind AS 2):</strong><br>
Inventories are assets held for sale in ordinary course of business, in process of production (WIP), or materials/supplies to be consumed.<br>
• <strong>Core Rule:</strong> Inventories are valued at the <strong>Lower of Cost or Net Realizable Value (NRV)</strong>.<br>
• <strong>Cost of Inventory:</strong> Purchase price + Duties/Taxes (non-refundable) + Freight inward + Direct labor & manufacturing overheads - Trade discounts/rebates.<br>
• <strong>NRV Definition:</strong> Estimated selling price in ordinary course of business less estimated cost of completion and estimated selling costs.<br><br>

2. <strong>Inventory Valuation Methods:</strong><br>
• <strong>FIFO (First-In, First-Out):</strong> Assumes items purchased first are issued first. Closing inventory reflects latest market prices.<br>
• <strong>Weighted Average Cost:</strong> Computes average cost per unit after every new purchase receipt.<br><br>

3. <strong>Inventory Systems:</strong><br>
• <strong>Periodic Inventory System:</strong> Physical stocktaking done at period end. Cost of Goods Sold = Opening Stock + Purchases - Closing Stock.<br>
• <strong>Perpetual Inventory System:</strong> Continuous recording of stock movements using Store Ledgers and Bin Cards.<br><br>

💡 <strong>EXAM TIP:</strong> Abnormal waste is EXCLUDED from inventory cost and charged directly to Profit & Loss Account.`,

  c5: `<strong>CHAPTER 5: DEPRECIATION AND AMORTISATION (COMPREHENSIVE ICAI STUDY MATERIAL SUMMARY)</strong><br><br>

1. <strong>Concepts & AS 10 (PPE Framework):</strong><br>
Depreciation is a systematic allocation of the depreciable amount of Property, Plant & Equipment (PPE) over its estimated useful life.<br>
• <strong>Depreciable Amount:</strong> Historical Cost - Estimated Residual (Scrap) Value.<br><br>

2. <strong>Depreciation Computation Methods:</strong><br>
• <strong>Straight Line Method (SLM):</strong> Equal annual depreciation charge. Annual Depreciation = (Cost - Scrap Value) / Useful Life.<br>
• <strong>Written Down Value Method (WDV):</strong> Decreasing depreciation charge calculated at a fixed percentage on opening book value each year.<br>
• <strong>Units of Production / Sum-of-Years'-Digits Methods:</strong> Allocates cost based on actual asset output or accelerated early usage.<br><br>

3. <strong>Accounting & Method Changes:</strong><br>
• <strong>Change in Method/Useful Life:</strong> Treated as a change in accounting estimate (prospectively under AS 10) by allocating remaining WDV over revised useful life.<br>
• <strong>Revaluation of PPE:</strong> Increase credited to Revaluation Reserve; decrease charged to P&L Account.<br><br>

💡 <strong>EXAM TIP:</strong> Profit or loss on sale of PPE = Net Sale Proceeds - WDV on date of sale.`,

  c6: `<strong>CHAPTER 6: BILLS OF EXCHANGE & PROMISSORY NOTES (COMPREHENSIVE ICAI STUDY MATERIAL SUMMARY)</strong><br><br>

1. <strong>Key Definitions & Legal Essentials:</strong><br>
• <strong>Bill of Exchange:</strong> Unconditional written order signed by drawer directing drawee to pay a specified sum to payee.<br>
• <strong>Promissory Note:</strong> Unconditional written undertaking signed by maker to pay a specified sum to payee.<br>
• <strong>Maturity Date & Grace Days:</strong> 3 days of grace are added to nominal due date to calculate legal maturity.<br><br>

2. <strong>Accounting Treatment for Bills:</strong><br>
• <strong>Retaining till Maturity:</strong> Cash/Bank A/c Dr. to Bills Receivable A/c.<br>
• <strong>Discounting with Bank:</strong> Bank A/c Dr., Discount A/c Dr. to Bills Receivable A/c.<br>
• <strong>Endorsing to Creditor:</strong> Creditor A/c Dr. to Bills Receivable A/c.<br>
• <strong>Dishonour of Bill:</strong> Reverse original entry, add <strong>Noting Charges</strong> paid to Notary Public to Drawee's account.<br>
• <strong>Renewal of Bill:</strong> Cancel old bill, charge interest for extended period, draw new bill.<br>
• <strong>Accommodation Bills:</strong> Drawn without trade consideration for mutual financial assistance.<br><br>

💡 <strong>EXAM TIP:</strong> Accommodation bill discount sharing calculations are high-yielding 5-mark exam questions.`
};

// Update 2026 scheme
for (let key of ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']) {
  const idMatch = `f_acc_${key}`;
  const notesStr = chSummaries[key];
  const regex = new RegExp(`"id": "${idMatch}",[\\s\\S]*?"notes": ".*?",`);
  content = content.replace(regex, (match) => {
    return match.replace(/"notes": ".*?",/, `"notes": ${JSON.stringify(notesStr)},`);
  });
}

// Update 2027 scheme
for (let key of ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']) {
  const idMatch = `f27_acc_${key}`;
  const notesStr = chSummaries[key];
  const regex = new RegExp(`"id": "${idMatch}",[\\s\\S]*?"notes": ".*?",`);
  content = content.replace(regex, (match) => {
    return match.replace(/"notes": ".*?",/, `"notes": ${JSON.stringify(notesStr)},`);
  });
}

fs.writeFileSync(seedPath, content, 'utf8');
console.log('Successfully updated seedData.js with full study material summaries across all Foundation chapters!');
