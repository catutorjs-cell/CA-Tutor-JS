// CA JS Doubt Decoder Module — Powered by Fuse.js Local CA Knowledge Search (No API Key Required)
import Fuse from '../vendor/fuse.mjs';
import { State } from '../state.js';
import { SYLLABUS_DATA, MOCK_QUESTIONS, MOCK_PAPERS } from '../seedData.js';

const STOP_WORDS = new Set([
  'what', 'is', 'are', 'was', 'were', 'how', 'does', 'do', 'did', 'why', 'when', 'where',
  'explain', 'define', 'describe', 'tell', 'me', 'about', 'the', 'a', 'an', 'of', 'in',
  'on', 'for', 'to', 'with', 'by', 'under', 'and', 'or', 'can', 'you', 'please', 'give'
]);

const GENERIC_TOKENS = new Set([
  'accounting', 'standard', 'standards', 'act', 'law', 'laws', 'tax', 'taxation',
  'audit', 'financial', 'management', 'chapter', 'unit', 'paper', 'system', 'rules'
]);

const CA_KNOWLEDGE_CARDS = [
  {
    title: 'Overview of AS 2: Valuation of Inventories',
    level: 'Intermediate',
    subject: 'Paper-1: Advanced Accounting',
    keywords: 'as 2 as-2 valuation of inventories inventory nrv net realizable value fifo weighted average wac lifo conversion cost normal capacity raw material replacement cost disclosure',
    overview: 'Accounting Standard (AS) 2: Valuation of Inventories, issued by the Institute of Chartered Accountants of India (ICAI), prescribes the accounting treatment for inventories. The primary issue in accounting for inventories is the determination of the cost to be identified as an asset and carried forward until the related revenues are recognized.',
    sections: [
      {
        heading: 'Key Definitions & Scope',
        subgroups: [
          {
            label: 'Definition of Inventory: Inventories are assets held:',
            bullets: [
              'For sale in the ordinary course of business (**Finished Goods**).',
              'In the process of production for such sale (**Work-in-Progress / WIP**).',
              'In the form of materials or supplies to be consumed in the production process or in the rendering of services (**Raw Materials & Consumables**).'
            ]
          },
          {
            label: 'Exclusions from AS 2 Scope:',
            bullets: [
              'Work-in-progress arising under construction contracts (governed by **AS 7**).',
              'Work-in-progress arising in the ordinary course of business of service providers.',
              'Financial instruments like Shares, Debentures, Stock-in-trade held as inventory (governed by **AS 13**).',
              'Producers\' inventories of livestock, agricultural and forest products, and mineral oils, ores, and gases, to the extent that they are measured at net realizable value in accordance with established practices in those industries.'
            ]
          }
        ]
      },
      {
        heading: 'Fundamental Valuation Principle',
        intro: 'As per AS 2, inventories should be valued at the **Lower of Cost and Net Realizable Value (NRV)**, applied item-by-item (or by groups of similar items where appropriate).',
        formula: 'Inventory Value = Minimum of (Cost, NRV)',
        note: '**Net Realizable Value (NRV):** Estimated selling price in the ordinary course of business, less the estimated costs of completion and the estimated costs necessary to make the sale.'
      },
      {
        heading: 'Determination of Cost of Inventories',
        intro: 'The cost of inventories comprises all costs of purchase, costs of conversion, and other costs incurred in bringing the inventories to their present location and condition.',
        subgroups: [
          {
            label: 'Costs of Purchase:',
            bullets: [
              'Includes purchase price, duties, taxes (other than those subsequently recoverable from taxing authorities, e.g., **GST ITC**), freight inwards, and other expenditures directly attributable to the acquisition.',
              '**Deductions:** Trade discounts, rebates, duty drawbacks, and other similar items are deducted in determining the costs of purchase.'
            ]
          },
          {
            label: 'Costs of Conversion:',
            bullets: [
              'Direct costs such as **Direct Labour** and **Direct Material**.',
              '**Fixed Production Overhead Allocation:** Based on **normal capacity** of production facilities. If actual production is lower than normal capacity, allocate fixed overheads on normal capacity and charge unabsorbed overheads to P&L; if actual production is abnormally high, use actual production so inventory is not overvalued.',
              '**Variable Production Overhead Allocation:** Assigned to each unit of production based on the actual use of production facilities.'
            ]
          },
          {
            label: 'Other Costs:',
            bullets: [
              'Included only to the extent incurred in bringing the inventories to their present location and condition (e.g., cost of designing products for specific customers).'
            ]
          }
        ]
      },
      {
        heading: 'Exclusions from the Cost of Inventories',
        intro: 'The following costs are excluded from inventory cost and recognized as expenses in the period in which they are incurred:',
        bullets: [
          '**Abnormal amounts** of wasted materials, labour, or other production costs.',
          '**Storage costs**, unless those costs are necessary in the production process prior to a further production stage.',
          '**Administrative overheads** that do not contribute to bringing inventories to their present location and condition.',
          '**Selling and distribution costs**.',
          '**Interest and borrowing costs** (unless inventory takes a substantial period of time to get ready for sale, as per **AS 16**).'
        ]
      },
      {
        heading: 'Valuation Formulas (Cost Formulas)',
        intro: 'For items that are not ordinarily interchangeable or goods produced for specific projects, cost is assigned using the **Specific Identification Method**. For general interchangeable items, cost is determined using:',
        bullets: [
          '**First-In, First-Out (FIFO)**',
          '**Weighted Average Cost (WAC)**',
          '*(Note: The **LIFO** method is strictly prohibited under AS 2.)*'
        ]
      },
      {
        heading: 'Special Provision: Valuation of Raw Materials',
        bullets: [
          'Raw materials held for use in production are **not written down below cost** if the finished products in which they will be incorporated are expected to be sold at or above cost.',
          'When there is a decline in material prices and the estimated cost of finished goods exceeds NRV, raw materials are written down to NRV — in such cases, **Replacement Cost** is the best available measure of NRV.'
        ]
      },
      {
        heading: 'Disclosure Requirements in Financial Statements',
        bullets: [
          'The accounting policies adopted in measuring inventories, including the cost formula used.',
          'The total carrying amount of inventories and its classification appropriate to the enterprise (e.g., Raw Materials, Work-in-Progress, Finished Goods, Stock-in-Trade, Stores and Spares).'
        ]
      }
    ],
    tip: 'ICAI Practical Problem Insight: In Advanced Accounting problems involving allocation of Fixed Production Overheads, always compare Actual Production with Normal Capacity. If Actual < Normal, divide fixed overheads by Normal Capacity (unallocated portion goes to P&L). If Actual > Normal, divide by Actual Production to avoid valuing inventory above actual cost incurred. Always present a step-by-step working note!'
  },
  {
    title: 'Overview of Income Tax Act: Basic Concepts & Scope',
    level: 'Intermediate',
    subject: 'Paper-3A: Income-tax Law',
    keywords: 'income tax previous year assessment year direct tax sec 4 115bac default tax regime heads of income slab rates residential status 2025',
    overview: 'Income Tax is a direct tax levied by the Central Government on the total income of every person earned during the Previous Year (PY) and assessed in the Assessment Year (AY), governed by the Income-tax Act, 1961 (and the Income-tax Act, 2025 applicable from May 2027 onwards).',
    sections: [
      {
        heading: 'Charging Section & Core Definitions',
        bullets: [
          '**Charging Section (Sec. 4):** Income-tax is charged for any Assessment Year at the rate(s) prescribed by the Annual Finance Act on the total income of the Previous Year of every person.',
          '**Previous Year vs. Assessment Year (Sec. 3 & 2(9)):** Income earned in the financial year (`Previous Year`, e.g., 1st April to 31st March) is taxed in the immediately succeeding 12-month period (`Assessment Year`). Exceptions where PY and AY coincide include shipping business of non-residents, persons leaving India permanently, and discontinued business.',
          '**Definition of Person (Sec. 2(31)):** Includes Individual, HUF, Company, Firm (including LLP), AOP/BOI, Local Authority, and Artificial Juridical Person.'
        ]
      },
      {
        heading: 'Five Heads of Income & Computation Flow',
        formula: 'Total Income = Sum of 5 Heads − Losses Set-Off − Chapter VI-A Deductions',
        bullets: [
          '**1. Income from Salaries (Sec. 15–17):** Employer-employee relationship, basic salary, allowances, perquisites, less standard deduction.',
          '**2. Income from House Property (Sec. 22–27):** Annual value of building/land appurtenant thereto, less municipal taxes, 30% statutory deduction (`Sec. 24(a)`), and interest on borrowed capital (`Sec. 24(b)`).',
          '**3. Profits and Gains of Business or Profession (Sec. 28–44DB):** Net business profits adjusted for allowable/disallowable expenses (`Sec. 30–43B`) and depreciation u/s 32.',
          '**4. Capital Gains (Sec. 45–55A):** Transfer of capital asset (`STCG` vs. `LTCG`), full value of consideration minus indexed/cost of acquisition and improvement.',
          '**5. Income from Other Sources (Sec. 56–59):** Dividends, interest, winnings, gifts (`Sec. 56(2)(x)`), and residual taxable incomes.'
        ]
      },
      {
        heading: 'Tax Regimes & May 2027 Update',
        bullets: [
          '**Default Tax Regime (Sec. 115BAC):** Lower slab rates apply automatically to individuals/HUF/AOP/BOI unless they specifically opt out into the optional old regime (most Chapter VI-A deductions and exemptions like LTA/HRA are restricted under default regime).',
          '**May 2027 Syllabus Note:** From May 2027 attempts onwards, ICAI Paper 3A follows the **Income-tax Act, 2025** — verify section references with the latest applicable ICAI Study Material.'
        ]
      }
    ],
    tip: 'In total income problems, always state clearly at the top whether computation is under the Default Tax Regime (Sec. 115BAC) or Old Regime, check Residential Status (ROR / RNOR / NR) first, and show separate working notes for capital gains, clubbing, and set-off.'
  },
  {
    title: 'GST: Input Tax Credit (ITC) — Sections 16 to 18 & Rule 88A',
    level: 'Intermediate',
    subject: 'Paper-3B: Goods and Services Tax',
    keywords: 'gst input tax credit itc sec 16 sec 17 blocked credit 17(5) cgst sgst igst 180 days gstr 2b 3b rule 88a sec 49',
    overview: 'Input Tax Credit (ITC) is the core mechanism of GST that eliminates cascading of taxes ("tax on tax") by allowing a registered supplier to offset GST paid on eligible inward supplies of goods or services against output GST liability.',
    sections: [
      {
        heading: 'Eligibility & Conditions (Section 16)',
        bullets: [
          '**Business Purpose (Sec. 16(1)):** Inward supply must be used or intended to be used in the course or furtherance of business.',
          '**Four Mandatory Conditions (Sec. 16(2)):** (a) Possession of valid tax invoice/debit note, (b) Details furnished by supplier in GSTR-1 and communicated to recipient in **GSTR-2B**, (c) Actual receipt of goods or services, and (d) Tax actually paid to Government & recipient has filed **GSTR-3B**.',
          '**180-Day Payment Rule:** Recipient must pay invoice value + GST within **180 days** from invoice date; otherwise ITC must be reversed with interest (re-creditable without time limit once payment is made).',
          '**Depreciation Exclusion (Sec. 16(3)):** ITC is not allowed if depreciation is claimed on the tax component of capital goods under the Income-tax Act.'
        ]
      },
      {
        heading: 'Blocked Credits (Section 17(5))',
        bullets: [
          '**Motor Vehicles:** Vehicles for transportation of persons with seating capacity <= 13 (including driver), except when used for further supply, passenger transport, or driving training.',
          '**Personal / Employee Consumption:** Food & beverages, outdoor catering, beauty treatment, health services, club membership, health & fitness centre, travel benefits to employees on vacation (unless statutorily obligatory for employer).',
          '**Construction & Works Contract:** Works contract services and goods/services used for construction of **immovable property** on own account (except plant & machinery).'
        ]
      },
      {
        heading: 'Order of Utilisation of ITC (Sec. 49(5) & Rule 88A)',
        formula: 'IGST Credit → First IGST → Then CGST / SGST in any order',
        bullets: [
          '**Step 1:** Exhaust **IGST Credit** completely — first against IGST liability, and remaining IGST credit against CGST and/or SGST in any order/proportion.',
          '**Step 2:** Use **CGST Credit** against CGST, then IGST (cannot be used for SGST).',
          '**Step 3:** Use **SGST/UTGST Credit** against SGST/UTGST, then IGST (cannot be used for CGST).'
        ]
      }
    ],
    tip: 'Always draw a multi-column ITC Computation Table (Particulars | IGST | CGST | SGST | Reason/Section), apply Rule 88A to minimise cash outflow by matching IGST credit cleanly, and explicitly state Section 17(5) reasons for blocked items.'
  },
  {
    title: 'Rights of an Unpaid Seller (Sale of Goods Act, 1930)',
    level: 'Foundation',
    subject: 'Paper-2: Business Laws',
    keywords: 'unpaid seller sale of goods act 1930 sec 45 sec 46 lien stoppage in transit resale buyer personally remedies',
    overview: 'Under Section 45 of the Sale of Goods Act, 1930, a seller of goods is deemed to be an "unpaid seller" when the whole of the price has not been paid or tendered, or when a bill of exchange or other negotiable instrument received as conditional payment has been dishonoured.',
    sections: [
      {
        heading: 'Rights Against the Goods (Sections 46–54)',
        bullets: [
          '**1. Right of Lien (Sec. 47–49):** Right to retain possession of goods until payment/tender of price when goods were sold without credit, credit period expired, or buyer becomes insolvent. Lost when possession is delivered to carrier without reserving disposal right, or buyer/agent lawfully obtains possession, or seller waives lien.',
          '**2. Right of Stoppage in Transit (Sec. 50–52):** When seller has parted with possession to a carrier and the **buyer becomes insolvent**, seller may resume possession while goods are still in transit.',
          '**3. Right of Resale (Sec. 54):** Unpaid seller exercising lien or stoppage in transit can resell the goods if they are **perishable**, or after giving **reasonable notice** to the buyer (seller keeps profit if notice given, or recovers loss from buyer).'
        ]
      },
      {
        heading: 'Rights Against the Buyer Personally (Sections 55–61)',
        bullets: [
          '**Suit for Price (Sec. 55):** Where property has passed to buyer (or price is payable on a day certain) and buyer wrongfully neglects/refuses to pay.',
          '**Suit for Damages for Non-Acceptance (Sec. 56):** Where buyer wrongfully neglects or refuses to accept and pay for goods.',
          '**Repudiation Before Due Date (Sec. 60):** Seller may treat contract as subsisting until due date or treat it as rescinded and sue immediately for anticipatory breach.',
          '**Suit for Interest (Sec. 61):** Recover interest at agreed/reasonable rate from tender or due date.'
        ]
      }
    ],
    tip: 'Exam Distinction Question Alert: Always contrast Lien vs. Stoppage in Transit — Lien starts when possession is with seller and ends on delivery to carrier (buyer need not be insolvent); Stoppage begins where Lien ends (goods in transit with carrier) and strictly requires buyer insolvency.'
  },
  {
    title: 'Depreciation under Companies Act, 2013 (Schedule II) & AS 10',
    level: 'Foundation',
    subject: 'Paper-1: Accounting',
    keywords: 'depreciation companies act 2013 schedule ii useful life residual value 5% slm wdv component accounting as 10 block of assets',
    overview: 'Under Schedule II of the Companies Act, 2013 read with AS 10 (Property, Plant and Equipment), depreciation is the systematic allocation of the depreciable amount of an asset over its useful life.',
    sections: [
      {
        heading: 'Schedule II Core Requirements',
        formula: 'Depreciable Amount = Cost (or Revalued Amount) − Residual Value (<= 5% of Original Cost)',
        bullets: [
          '**Useful Life Concept:** Depreciation is based on the prescribed useful life of each asset in Part C of Schedule II rather than fixed statutory percentages.',
          '**Residual Value Cap:** Residual value of an asset shall not ordinarily be more than **5%** of its original cost (deviation requires technical justification disclosed in financial statements).',
          '**Component Accounting:** Where cost of a significant part of PPE is significant relative to total cost of the asset, useful life and depreciation of that significant part must be determined separately.'
        ]
      },
      {
        heading: 'Methods, Additions & Changes in Estimates',
        bullets: [
          '**Permitted Methods:** Straight Line Method (**SLM**), Written Down Value (**WDV**), or Units of Production method, reflecting expected pattern of consumption of future economic benefits.',
          '**Pro-Rata Rule:** Additions during the year are depreciated from the date the asset is **available/ready for use** (not necessarily first actual use); disposals are depreciated up to the date of derecognition.',
          '**Change in Method / Useful Life / Residual Value:** Treated prospectively as a **change in accounting estimate** (AS 10 / AS 5) — allocate remaining carrying amount over revised remaining useful life.'
        ]
      }
    ],
    tip: 'Never confuse Schedule II Company Law depreciation with Income-tax Act Sec. 32 depreciation: Schedule II uses individual assets / components on useful life (SLM or WDV), whereas Income Tax uses Block of Assets strictly on WDV with 50% rate if used < 180 days.'
  },
  {
    title: 'Indian Contract Act, 1872 — Essentials of a Valid Contract',
    level: 'Foundation',
    subject: 'Paper-2: Business Laws',
    keywords: 'indian contract act 1872 sec 2(h) sec 10 offer acceptance consideration free consent coercion undue influence fraud misrepresentation void voidable',
    overview: 'Under Section 2(h) of the Indian Contract Act, 1872, "An agreement enforceable by law is a contract." Every valid contract requires an Agreement (Offer + Acceptance) plus Legal Enforceability under Section 10.',
    sections: [
      {
        heading: 'Essential Elements of a Valid Contract (Section 10)',
        bullets: [
          '**Offer & Acceptance (`Sec. 2(a) & 2(b)`):** Lawful offer by one party and unconditional, communicated acceptance by the other leading to `consensus ad idem` (meeting of minds).',
          '**Intention to Create Legal Relations:** Social/domestic agreements (e.g., *Balfour v. Balfour*) are presumed not enforceable.',
          '**Lawful Consideration (`Sec. 2(d) & 25`):** *Quid pro quo* (something in return); "No consideration, no contract" except natural love & affection (registered), past voluntary service, or time-barred debt in writing.',
          '**Competent Parties (`Sec. 11–12`):** Major (18+), sound mind, and not disqualified by law (contracts with a minor are *void ab initio* — *Mohori Bibee v. Dharmodas Ghose*).',
          '**Free Consent (`Sec. 13–22`):** Consent not caused by Coercion (Sec. 15), Undue Influence (Sec. 16), Fraud (Sec. 17), Misrepresentation (Sec. 18), or Mistake (Sec. 20–22).',
          '**Lawful Object & Not Expressly Declared Void (`Sec. 23–30`):** Not illegal, immoral, opposed to public policy, or in restraint of trade/marriage/legal proceedings.'
        ]
      },
      {
        heading: 'Void vs. Voidable Contracts',
        bullets: [
          '**Void Agreement (`Sec. 2(g)`):** Lacks legal enforceability from the beginning (no rights or obligations created).',
          '**Voidable Contract (`Sec. 2(i)`):** Valid until rescinded at the option of the aggrieved party (e.g., consent obtained via coercion, fraud, undue influence, or misrepresentation).'
        ]
      }
    ],
    tip: 'Always cite exact Section numbers alongside landmark case laws (*Mohori Bibee*, *Carlill v. Carbolic Smoke Ball*, *Balfour v. Balfour*, *Chinnaya v. Ramayya*) and present answers in: Legal Provision -> Facts -> Analysis -> Conclusion.'
  },
  {
    title: 'Bank Reconciliation Statement (BRS)',
    level: 'Foundation',
    subject: 'Paper-1: Accounting',
    keywords: 'bank reconciliation statement brs cash book pass book bank statement overdraft adjusted cash book cheques issued unpresented',
    overview: 'A Bank Reconciliation Statement (BRS) is a statement prepared periodically to reconcile the balance shown by the bank column of the Cash Book with the balance shown by the Bank Pass Book (Bank Statement) on a given date.',
    sections: [
      {
        heading: 'Causes of Difference Between Cash Book & Pass Book',
        bullets: [
          '**Timing Differences:** Cheques issued to suppliers but not yet presented at bank; cheques deposited into bank but not yet cleared/credited.',
          '**Bank-Initiated Transactions:** Bank charges/commission debited, interest allowed/charged by bank, direct deposits by customers, standing instructions (rent/insurance paid by bank), dishonour of cheques/bills.',
          '**Errors & Omissions:** Casting/balancing mistakes or wrong entries in Cash Book or Pass Book.'
        ]
      },
      {
        heading: 'Reconciliation Rules & Adjusted Cash Book',
        bullets: [
          '**Favourable Start (Dr Cash Book / Cr Pass Book):** Add cheques issued not presented, direct customer deposits, and bank interest credited; Subtract cheques deposited not cleared and bank charges debited.',
          '**Overdraft Start (Cr Cash Book / Dr Pass Book):** Rules reverse — treat overdraft as negative or swap Add/Less carefully.',
          '**Adjusted Cash Book (Year-End):** Post all Cash Book errors, bank charges, direct credits, and dishonoured cheques into the Adjusted Cash Book first; carry only **timing differences** and bank errors to BRS.'
        ]
      }
    ],
    tip: 'Before adjusting any item, write down the starting balance polarity (`Dr` = Asset / Favourable; `Cr` in Cash Book = Overdraft) and test the effect of each transaction on Cash Book vs Pass Book before adding or subtracting.'
  },
  {
    title: 'Ind AS 110 & Ind AS 103 — Consolidation & Business Combinations',
    level: 'Final',
    subject: 'Paper-1: Financial Reporting',
    keywords: 'ind as 110 ind as 103 consolidated financial statements business combinations goodwill capital reserve nci non controlling interest control',
    overview: 'Ind AS 103 governs acquisition-date accounting for business combinations using the Acquisition Method, while Ind AS 110 prescribes principles for presenting Consolidated Financial Statements (CFS) when an investor controls one or more investees.',
    sections: [
      {
        heading: 'Control Model (Ind AS 110) & Acquisition Method (Ind AS 103)',
        formula: 'Goodwill = Consideration Transferred + NCI + Previously Held Equity − Net Identifiable Assets (FV)',
        bullets: [
          '**Three Elements of Control:** (1) Power over the investee, (2) Exposure/rights to variable returns, and (3) Ability to use power to affect the amount of returns.',
          '**NCI Measurement Choice:** At acquisition date, Non-Controlling Interest may be measured either at **Fair Value** (Full Goodwill method) or at **proportionate share** of identifiable net assets (Partial Goodwill method).',
          '**Bargain Purchase:** If Net Identifiable Assets exceed the sum of consideration + NCI, recognize **Capital Reserve** in OCI (or Equity after reassessment).'
        ]
      },
      {
        heading: 'Consolidation Adjustments & Intra-Group Eliminations',
        bullets: [
          'Eliminate 100% of intra-group receivables/payables, loans, sales, and dividends.',
          'Eliminate **unrealised profit (URP)** on closing inventory/PPE transferred between group companies (if downstream: charge 100% to parent RE; if upstream: split between parent RE & NCI).',
          'Recognize fair value uplift depreciation and deferred tax on acquisition-date revaluations.'
        ]
      }
    ],
    tip: 'Structure Financial Reporting CFS solutions cleanly into 5 Working Notes: (WN1) Group Structure & Date of Acquisition, (WN2) Analysis of Net Assets & Pre/Post Reserves, (WN3) Goodwill/Capital Reserve, (WN4) Non-Controlling Interest, and (WN5) Consolidated Other Equity.'
  },
  {
    title: 'Standard Costing & Marginal Costing — Core Concepts & Formulas',
    level: 'Intermediate',
    subject: 'Paper-4: Cost and Management Accounting',
    keywords: 'standard costing variance material labour overhead marginal costing contribution pv ratio break even bep margin of safety',
    overview: 'Marginal Costing focuses on cost behaviour (Variable vs. Fixed) for short-term profit planning and CVP decisions, whereas Standard Costing measures operational efficiency by comparing actual costs with predetermined standards.',
    sections: [
      {
        heading: 'Marginal Costing & CVP Equations',
        formula: 'Sales − Variable Cost = Contribution = Fixed Cost + Profit',
        bullets: [
          '**P/V Ratio:** `(Contribution / Sales) × 100` or `(Change in Profit / Change in Sales) × 100`.',
          '**Break-Even Point (BEP):** `BEP (Units) = Fixed Cost / Contribution per unit`; `BEP (₹) = Fixed Cost / P/V Ratio`.',
          '**Margin of Safety (MOS):** `Actual Sales − BEP Sales` or `Profit / P/V Ratio`.',
          '**Key Factor Decisions:** Rank products by **Contribution per unit of limiting factor** (e.g., machine hours, raw material kg).'
        ]
      },
      {
        heading: 'Standard Costing Variance Tree',
        bullets: [
          '**Material Cost Variance (`SQ×SP − AQ×AP`):** Splits into Price Variance (`AQ×(SP−AP)`) + Usage Variance (`SP×(SQ−AQ)`), further into Mix & Yield Variances.',
          '**Labour Cost Variance (`SH×SR − AH×AR`):** Splits into Rate Variance + Efficiency Variance (+ Idle Time Variance where applicable).',
          '**Variable & Fixed Overhead Variances:** Check Expenditure, Efficiency, Capacity, and Calendar variances for fixed overheads.'
        ]
      }
    ],
    tip: 'Always prepare a Material/Labour Cost Standard vs. Actual summary table first (`SQ, SP, AQ, AP`), label every variance `(F)` Favourable or `(A)` Adverse, and reconcile sub-variances to the total variance.'
  },
  {
    title: 'Audit Risk (SA 315) & Audit Evidence (SA 500)',
    level: 'Intermediate',
    subject: 'Paper-5: Auditing and Ethics',
    keywords: 'audit risk sa 315 sa 330 sa 500 sa 200 inherent risk control risk detection risk audit evidence sufficiency appropriateness',
    overview: 'Under SA 200 and SA 315, an auditor obtains reasonable assurance by identifying and assessing risks of material misstatement and designing audit procedures under SA 330 & SA 500 to gather sufficient appropriate audit evidence.',
    sections: [
      {
        heading: 'Audit Risk Model (SA 200 & SA 315)',
        formula: 'Audit Risk = Inherent Risk × Control Risk × Detection Risk',
        bullets: [
          '**Inherent Risk:** Susceptibility of an assertion to material misstatement before considering related controls.',
          '**Control Risk:** Risk that internal control will fail to prevent, detect, and correct a misstatement on a timely basis.',
          '**Detection Risk:** Risk that auditor\'s substantive procedures fail to detect a material misstatement (inversely related to Risk of Material Misstatement).'
        ]
      },
      {
        heading: 'Audit Evidence Principles (SA 500)',
        bullets: [
          '**Sufficiency (Quantity):** Affected by risk of misstatement and quality of evidence.',
          '**Appropriateness (Quality):** Measure of **relevance** (logical connection to assertion) and **reliability** (external > internal, written > oral, original > photocopy, auditor-obtained directly > indirect).',
          '**Procedures:** Inspection, Observation, External Confirmation (**SA 505**), Recalculation, Reperformance, Analytical Procedures (**SA 520**), and Inquiry.'
        ]
      }
    ],
    tip: 'Cite Standard numbers (`SA 200`, `SA 315`, `SA 330`, `SA 500`, `SA 505`) explicitly in bold headings and conclude every case study by stating the exact audit procedure and assertion tested (Existence, Completeness, Valuation, Rights & Obligations).'
  },
  {
    title: 'Overview of Cash Flow Statement (AS 3 & Schedule III)',
    level: 'Intermediate',
    subject: 'Paper-1: Advanced Accounting',
    keywords: 'cash flow statement cfs as 3 as-3 operating investing financing activities direct indirect method cash equivalents',
    overview: 'A Cash Flow Statement (governed by Accounting Standard AS 3 & Ind AS 7) reports the historical changes in cash and cash equivalents of an enterprise during an accounting period, classified into Operating, Investing, and Financing activities.',
    sections: [
      {
        heading: 'Key Definitions (AS 3)',
        bullets: [
          '**Cash:** Comprises cash on hand and demand deposits with banks.',
          '**Cash Equivalents:** Short-term, highly liquid investments that are readily convertible into known amounts of cash and are subject to an **insignificant risk of changes in value** (ordinarily maturing within **3 months or less** from acquisition date, e.g., treasury bills, commercial paper).',
          '**Cash Flows:** Inflows and outflows of cash and cash equivalents (movements between cash and cash equivalents are excluded as part of cash management).'
        ]
      },
      {
        heading: 'Three-Way Classification of Cash Flows',
        bullets: [
          '**1. Operating Activities:** Principal revenue-producing activities of the enterprise (e.g., cash receipts from sale of goods/services, cash payments to suppliers & employees, income tax paid unless specifically identified with investing/financing).',
          '**2. Investing Activities:** Acquisition and disposal of long-term assets (PPE, intangibles) and other investments not included in cash equivalents (e.g., purchase/sale of machinery, shares/debentures held as investments, interest & dividends received by non-financial enterprises).',
          '**3. Financing Activities:** Activities that result in changes in the size and composition of the **owners\' capital and borrowings** (e.g., issue/redemption of shares or debentures, long-term loans taken/repaid, dividends & interest paid by non-financial enterprises).'
        ]
      },
      {
        heading: 'Methods of Reporting Operating Cash Flows',
        formula: 'Net Increase/Decrease in Cash = Operating + Investing + Financing Cash Flows',
        bullets: [
          '**Direct Method:** Discloses major classes of gross cash receipts and gross cash payments (e.g., cash received from customers minus cash paid to suppliers and employees).',
          '**Indirect Method:** Starts with **Net Profit/Loss before Tax & Extraordinary Items**, adjusts for non-cash items (Depreciation, Amortisation, Provisions), non-operating items (Interest/Dividend income, Profit/Loss on sale of PPE), and changes in **Working Capital** (Current Assets & Current Liabilities), then deducts Income Taxes paid.'
        ]
      },
      {
        heading: 'Special Items & Non-Cash Disclosures',
        bullets: [
          '**Extraordinary Items:** Disclosed separately under Operating, Investing, or Financing as appropriate.',
          '**Non-Cash Transactions (Excluded):** Conversion of debt into equity, or acquisition of assets by issuing shares/lease liability are excluded from Cash Flow Statement and disclosed separately in Notes to Accounts.',
          '**Foreign Currency Cash Flows:** Translated at exchange rate on date of cash flow (or weighted average rate); unrealised exchange gains/losses are reconciled separately from Operating/Investing/Financing.'
        ]
      }
    ],
    tip: 'ICAI Exam Working Note Rule: Under AS 3 (for non-financial enterprises), always classify **Interest & Dividend Paid** under Financing Activities and **Interest & Dividend Received** under Investing Activities, and prepare separate Ledger Accounts for Fixed Assets (Cost & Accumulated Depreciation) and Provision for Tax to trace hidden cash outflows/inflows!'
  },
  {
    title: 'Partnership & LLP Accounts — Fundamentals, Admission & Retirement',
    level: 'Foundation',
    subject: 'Paper-1: Accounting',
    keywords: 'partnership llp accounts goodwill sacrificing gaining ratio revaluation partner capital fixed fluctuating dissolution garner murray',
    overview: 'Partnership accounting records mutual rights, profit-sharing, capital contributions, goodwill adjustments, and asset/liability revaluations among partners governed by the Indian Partnership Act, 1932 and Limited Liability Partnership Act, 2008.',
    sections: [
      {
        heading: 'Core Accounting Principles',
        bullets: [
          '**Absence of Partnership Deed:** Profits and losses shared **equally**, **no interest** on capital or drawings, **no salary/commission** to partners, and **6% p.a. interest** on partner\'s loan.',
          '**Fixed vs. Fluctuating Capital:** Under Fixed Capital, maintain Capital A/c (fixed) + Current A/c (drawings, profit, interest); under Fluctuating Capital, record all adjustments in one Capital A/c.'
        ]
      },
      {
        heading: 'Reconstitution (Admission, Retirement & Death)',
        formula: 'Sacrificing Ratio = Old Ratio − New Ratio  |  Gaining Ratio = New Ratio − Old Ratio',
        bullets: [
          '**Revaluation Account:** Record increase/decrease in assets & liabilities; transfer net gain/loss to old partners in their **Old PSR**.',
          '**Goodwill Treatment (AS 26):** Adjust goodwill through partners\' Capital/Current accounts (**Gaining Partners Dr. to Sacrificing Partners Cr.**) without raising permanent goodwill unless purchased.'
        ]
      }
    ],
    tip: 'Always prepare **Working Notes for New Profit Sharing Ratio & Sacrificing/Gaining Ratio** cleanly at the top, and distribute all accumulated reserves/P&L balances in Old Ratio before admitting or retiring a partner.'
  }
];

function stripHtml(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export const DoubtDecoderModule = {
  chatHistory: [],
  _fuseInstance: null,
  _indexedDocs: null,
  _pdfTextCache: new Map(),

  invalidateIndex() {
    this._fuseInstance = null;
    this._indexedDocs = null;
  },

  /**
   * Build and cache a Fuse.js search index over built-in CA concepts, uploaded handouts,
   * syllabus units, chapters, illustrations, mock questions, and past paper metadata.
   */
  getSearchEngine() {
    if (typeof window !== 'undefined') {
      window.cajsResetDecoderCache = () => this.invalidateIndex();
    }

    if (this._fuseInstance && this._indexedDocs) {
      return { fuse: this._fuseInstance, docs: this._indexedDocs };
    }

    const docs = [];
    const seenKeys = new Set();
    const chapterMetaById = new Map();

    CA_KNOWLEDGE_CARDS.forEach((card, idx) => {
      const sectionText = (card.sections || [])
        .map(s => `${s.heading} ${s.intro || ''} ${(s.bullets || []).join(' ')}`)
        .join(' ');
      docs.push({
        id: `concept_${idx}`,
        kind: 'concept',
        title: card.title,
        level: card.level,
        subject: card.subject,
        keywords: card.keywords,
        summary: `${card.overview} ${sectionText}`,
        card,
        priority: 'High'
      });
    });

    Object.entries(SYLLABUS_DATA || {}).forEach(([datasetKey, subjects]) => {
      if (!Array.isArray(subjects)) return;
      const level = datasetKey.split('_')[0];
      subjects.forEach(sub => {
        (sub.chapters || []).forEach(ch => {
          chapterMetaById.set(ch.id, { name: ch.name, subject: sub.subject, level, weightage: ch.weightage });
          const chKey = `ch::${level}::${ch.id}`;
          if (!seenKeys.has(chKey)) {
            seenKeys.add(chKey);
            const cleanNotes = stripHtml(ch.notes);
            const unitNames = (ch.units || []).map(u => u.name).filter(Boolean).join(', ');
            const illustrations = ch.illustrations || [];
            const illusText = illustrations.map(ill => `${ill.q} ${ill.a}`).join(' ');

            docs.push({
              id: chKey,
              chapterId: ch.id,
              kind: 'chapter',
              title: ch.name,
              level,
              subject: sub.subject,
              priority: ch.weightage || 'Medium',
              keywords: `${ch.name} ${unitNames} ${sub.subject}`,
              summary: cleanNotes || `Core chapter in ${sub.subject} (CA ${level}).`,
              unitNames,
              pdfUrls: ch.pdfUrls || [],
              illustrations,
              illusText
            });
          }

          (ch.units || []).forEach((unit, uIdx) => {
            const unitName = unit?.name || '';
            if (!unitName) return;
            const unitKey = `unit::${level}::${ch.id}::${uIdx}`;
            if (seenKeys.has(unitKey)) return;
            seenKeys.add(unitKey);

            const unitNotes = stripHtml(unit.notes || ch.notes);
            docs.push({
              id: unitKey,
              chapterId: ch.id,
              kind: 'unit',
              title: unitName,
              parentChapter: ch.name,
              level,
              subject: sub.subject,
              priority: ch.weightage || 'Medium',
              keywords: `${unitName} ${ch.name} ${sub.subject}`,
              summary: unitNotes || stripHtml(ch.notes),
              pdfUrls: unit.url ? [unit.url, ...(ch.pdfUrls || [])] : (ch.pdfUrls || []),
              illustrations: ch.illustrations || []
            });
          });
        });
      });
    });

    // Index any study materials uploaded by the user inside Syllabus Explorer
    Object.entries(State.uploadedMaterials || {}).forEach(([chId, files]) => {
      if (!Array.isArray(files)) return;
      const meta = chapterMetaById.get(chId) || { name: 'Uploaded Study Guide', subject: 'Syllabus Upload', level: State.user?.examLevel || 'Intermediate' };
      files.forEach((file, fIdx) => {
        const rawText = String(file?.text || '').trim();
        if (!rawText) {
          docs.push({
            id: `uploaded_${chId}_${fIdx}_meta`,
            kind: 'uploaded',
            chapterId: chId,
            title: file.name,
            parentChapter: meta.name,
            level: meta.level,
            subject: meta.subject,
            keywords: `${file.name} ${meta.name} ${meta.subject}`,
            summary: `Uploaded file "${file.name}" attached to ${meta.name}.`,
            excerpt: ''
          });
          return;
        }
        // Chunk uploaded text into ~700 char passages for accurate Fuse.js paragraph retrieval
        const chunkSize = 700;
        for (let pos = 0, cIdx = 0; pos < rawText.length && cIdx < 60; pos += chunkSize, cIdx++) {
          const slice = rawText.slice(pos, pos + chunkSize).trim();
          if (slice.length < 30) continue;
          docs.push({
            id: `uploaded_${chId}_${fIdx}_${cIdx}`,
            kind: 'uploaded',
            chapterId: chId,
            title: file.name,
            parentChapter: meta.name,
            level: meta.level,
            subject: meta.subject,
            keywords: `${file.name} ${meta.name} ${slice.slice(0, 220)}`,
            summary: slice,
            excerpt: slice
          });
        }
      });
    });

    (MOCK_QUESTIONS || []).forEach((q, idx) => {
      docs.push({
        id: q.id || `mq_${idx}`,
        kind: 'question',
        title: q.chapter || q.subject,
        level: (q.subject || '').includes('Ind AS') ? 'Final' : 'Foundation',
        subject: q.subject || 'CA Practice',
        priority: q.difficulty || 'Medium',
        keywords: `${q.subject} ${q.chapter} ${q.question}`,
        summary: q.question,
        answer: q.answer,
        notes: q.notes || ''
      });
    });

    ['PYQ', 'RTP', 'MTP'].forEach(type => {
      ((MOCK_PAPERS && MOCK_PAPERS[type]) || []).forEach(paper => {
        docs.push({
          id: paper.id,
          kind: 'paper',
          title: paper.title,
          level: paper.level,
          subject: paper.subject,
          priority: type,
          keywords: `${paper.title} ${paper.subject} ${paper.month} ${paper.year} ${type}`,
          summary: `${paper.title} (${paper.month} ${paper.year}) for CA ${paper.level}. Open the **PYQ, RTP & MTP** tab to inspect or attempt this paper.`
        });
      });
    });

    this._indexedDocs = docs;
    this._fuseInstance = new Fuse(docs, {
      includeScore: true,
      shouldSort: true,
      threshold: 0.35,
      ignoreLocation: true,
      fieldNormWeight: 0.2,
      minMatchCharLength: 2,
      keys: [
        { name: 'title', weight: 0.42 },
        { name: 'keywords', weight: 0.35 },
        { name: 'summary', weight: 0.13 },
        { name: 'illusText', weight: 0.05 },
        { name: 'subject', weight: 0.05 }
      ]
    });

    return { fuse: this._fuseInstance, docs };
  },

  extractKeywords(queryText) {
    const tokens = String(queryText || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length >= 1 && !STOP_WORDS.has(w));
    return tokens.length > 0 ? tokens.join(' ') : String(queryText || '').trim();
  },

  searchKnowledge(queryText) {
    const { fuse } = this.getSearchEngine();
    const userLevel = State.user?.examLevel || 'Intermediate';
    const cleaned = this.extractKeywords(queryText);
    const queryTokens = cleaned.split(/\s+/).filter(Boolean);
    const specificTokens = queryTokens.filter(t => !GENERIC_TOKENS.has(t));

    const candidateHits = new Map();
    const collectHits = (hits) => {
      hits.forEach(h => {
        if (!h || !h.item) return;
        const prev = candidateHits.get(h.item.id);
        if (!prev || (h.score ?? 1) < (prev.score ?? 1)) {
          candidateHits.set(h.item.id, h);
        }
      });
    };

    collectHits(fuse.search(queryText.trim(), { limit: 15 }));
    if (cleaned && cleaned !== queryText.trim().toLowerCase()) {
      collectHits(fuse.search(cleaned, { limit: 20 }));
    }
    queryTokens.filter(t => t.length >= 2).slice(0, 6).forEach(token => {
      collectHits(fuse.search(token, { limit: 10 }));
    });

    const ranked = [...candidateHits.values()].map(hit => {
      const item = hit.item;
      const titleAndKw = `${item.title || ''} ${item.keywords || ''}`.toLowerCase();
      const haystack = `${titleAndKw} ${item.summary || ''} ${item.subject || ''}`.toLowerCase();

      let matchedCount = 0;
      let titleKwMatches = 0;
      queryTokens.forEach(tok => {
        if (haystack.includes(tok)) matchedCount++;
        if (titleAndKw.includes(tok)) titleKwMatches++;
      });

      const specificMatched = specificTokens.length === 0
        ? true
        : specificTokens.some(tok => titleAndKw.includes(tok) || haystack.includes(tok));

      const coverage = queryTokens.length > 0 ? matchedCount / queryTokens.length : 0;
      const titleCoverage = queryTokens.length > 0 ? titleKwMatches / queryTokens.length : 0;
      const exactPhraseBonus = titleAndKw.includes(cleaned) ? 0.35 : 0;
      const levelBonus = item.level === userLevel ? 0.08 : 0;
      const kindBonus = item.kind === 'concept' ? 0.22 : item.kind === 'unit' ? 0.06 : item.kind === 'chapter' ? 0.03 : 0;
      const fuseSim = Math.max(0, 1 - (hit.score ?? 0.5));

      const relevance = (titleCoverage * 0.45) + (coverage * 0.25) + (fuseSim * 0.20) + exactPhraseBonus + levelBonus + kindBonus;
      return { item, relevance, specificMatched, titleCoverage };
    });

    return ranked
      .filter(r => r.specificMatched)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 8);
  },

  formatConceptCard(card) {
    const blocks = [`### 🤖 AI Mentor Answer`];
    blocks.push(`#### ${card.title}\n${card.overview}`);

    (card.sections || []).forEach(sec => {
      const secLines = [`#### ${sec.heading}`];
      if (sec.intro) secLines.push(sec.intro);
      if (sec.formula) secLines.push(`$$${sec.formula}$$`);
      if (sec.note) secLines.push(sec.note);

      if (sec.bullets?.length) {
        secLines.push(sec.bullets.map(b => `*   ${b}`).join('\n'));
      }

      if (sec.subgroups?.length) {
        sec.subgroups.forEach(sg => {
          secLines.push(`**${sg.label}**\n${sg.bullets.map(b => `*   ${b}`).join('\n')}`);
        });
      }

      blocks.push('---');
      blocks.push(secLines.join('\n\n'));
    });

    if (card.tip) {
      blocks.push('---');
      blocks.push(`#### 💡 CA Exam Tip\n> ${card.tip}`);
    }

    return blocks;
  },

  findRelevantIllustration(illustrations, queryText) {
    if (!Array.isArray(illustrations) || illustrations.length === 0) return null;
    const cleaned = this.extractKeywords(queryText);
    const tokens = cleaned.split(/\s+/).filter(t => t.length >= 3 && !GENERIC_TOKENS.has(t));
    if (tokens.length === 0) return null;

    let best = null;
    let bestHits = 0;
    illustrations.forEach(ill => {
      const hay = `${ill.q || ''} ${ill.a || ''}`.toLowerCase();
      const hits = tokens.filter(t => hay.includes(t)).length;
      if (hits > bestHits) {
        bestHits = hits;
        best = ill;
      }
    });
    return bestHits > 0 ? best : null;
  },

  searchUploadedMaterials(queryText) {
    const cleaned = this.extractKeywords(queryText);
    const tokens = cleaned.split(/\s+/).filter(t => t.length >= 2 && !GENERIC_TOKENS.has(t));
    const uploadedDocs = (this._indexedDocs || []).filter(d => d.kind === 'uploaded' && d.excerpt);
    if (uploadedDocs.length === 0) return [];

    const subFuse = new Fuse(uploadedDocs, {
      includeScore: true,
      ignoreLocation: true,
      threshold: 0.48,
      minMatchCharLength: 2,
      keys: ['title', 'parentChapter', 'excerpt']
    });
    const hits = subFuse.search(cleaned || queryText, { limit: 6 });
    return hits
      .filter(h => {
        if (!h?.item?.excerpt) return false;
        const lower = h.item.excerpt.toLowerCase();
        return tokens.length === 0 || tokens.some(t => lower.includes(t));
      })
      .slice(0, 2)
      .map(h => h.item);
  },

  async searchSameOriginPdf(primary, queryText) {
    if (typeof window === 'undefined' || !window.pdfjsLib) return [];
    const urls = (primary?.pdfUrls || []).filter(u => u && (u.startsWith('./') || u.startsWith('/')));
    if (urls.length === 0) return [];

    const url = urls[0];
    try {
      let text = this._pdfTextCache.get(url);
      if (!text) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const pdf = await window.pdfjsLib.getDocument(url).promise;
        const maxPages = Math.min(pdf.numPages, 15);
        const pages = [];
        for (let i = 1; i <= maxPages; i++) {
          const page = await pdf.getPage(i);
          const tc = await page.getTextContent();
          pages.push(tc.items.map(it => it.str).join(' '));
        }
        text = pages.join('\n').replace(/\s+/g, ' ').trim();
        this._pdfTextCache.set(url, text);
      }
      if (!text) return [];
      const chunks = [];
      for (let i = 0; i < text.length && chunks.length < 45; i += 650) {
        chunks.push({ text: text.slice(i, i + 650).trim() });
      }
      const pdfFuse = new Fuse(chunks, { includeScore: true, ignoreLocation: true, threshold: 0.45, keys: ['text'] });
      const cleaned = this.extractKeywords(queryText);
      return pdfFuse.search(cleaned || queryText, { limit: 2 }).map(h => h.item.text);
    } catch (e) {
      return [];
    }
  },

  async searchExternalReference(queryText) {
    if (typeof fetch !== 'function') return null;
    const cleaned = this.extractKeywords(queryText);
    const searchQ = encodeURIComponent(`${cleaned} accounting OR finance OR tax OR law`);
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), 3200) : null;

    try {
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${searchQ}&srlimit=3&format=json&origin=*`;
      const res = await fetch(searchUrl, controller ? { signal: controller.signal } : undefined);
      if (!res.ok) return null;
      const data = await res.json();
      const firstTitle = data?.query?.search?.[0]?.title;
      if (!firstTitle) return null;

      const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(firstTitle)}`;
      const sumRes = await fetch(summaryUrl, controller ? { signal: controller.signal } : undefined);
      if (!sumRes.ok) return null;
      const sumData = await sumRes.json();
      if (!sumData?.extract) return null;

      return {
        title: sumData.title || firstTitle,
        extract: sumData.extract
      };
    } catch (e) {
      return null;
    } finally {
      if (timer) clearTimeout(timer);
    }
  },

  async buildHybridAnswer(queryText) {
    const baseText = this.formatFuseAnswer(queryText);
    const rankedMatches = this.searchKnowledge(queryText);
    const primary = rankedMatches[0]?.item || null;

    const uploadedExcerpts = this.searchUploadedMaterials(queryText);
    const pdfExcerpts = await this.searchSameOriginPdf(primary, queryText);

    const hasRichLocalAnswer = Boolean(
      (primary && (primary.kind === 'concept' || primary.kind === 'uploaded' || primary.kind === 'question')) ||
      uploadedExcerpts.length > 0 ||
      pdfExcerpts.length > 0
    );

    const externalRef = hasRichLocalAnswer ? null : await this.searchExternalReference(queryText);

    if (rankedMatches.length === 0 && externalRef) {
      return [
        '### 🤖 AI Mentor Answer',
        `#### Overview of ${externalRef.title}\n${externalRef.extract}`,
        '---\n*✨ Generated by CA TUTOR JS AI Mentor.*'
      ].join('\n\n');
    }

    const extraBlocks = [];

    if (uploadedExcerpts.length > 0) {
      const lines = uploadedExcerpts.map(u => `*   **${u.title}** (${u.parentChapter}): ${u.excerpt}`);
      extraBlocks.push(`#### 📄 From Your Uploaded Study Material\n${lines.join('\n')}`);
    }

    if (pdfExcerpts.length > 0) {
      const lines = pdfExcerpts.map(txt => `*   ${txt}`);
      extraBlocks.push(`#### 📖 Excerpts from Attached Syllabus PDF\n${lines.join('\n')}`);
    }

    if (externalRef) {
      extraBlocks.push(`#### 📘 Detailed Explanation (${externalRef.title})\n${externalRef.extract}`);
    }

    if (extraBlocks.length === 0) return baseText;

    const footerMarker = '\n\n---\n*✨ Generated';
    const idx = baseText.lastIndexOf(footerMarker);
    if (idx !== -1) {
      return baseText.slice(0, idx) + '\n\n---\n\n' + extraBlocks.join('\n\n---\n\n') + baseText.slice(idx);
    }
    return baseText + '\n\n---\n\n' + extraBlocks.join('\n\n---\n\n');
  },

  formatFuseAnswer(queryText) {
    const userLevel = State.user?.examLevel || 'Intermediate';
    const rankedMatches = this.searchKnowledge(queryText);

    if (rankedMatches.length === 0) {
      return `### 🤖 AI Mentor Answer

#### No Exact Match Found in Local CA Database
I searched your CA ${userLevel} syllabus, uploaded study guides, units, and illustrations using **Fuse.js**, but could not find a close local match for *"${queryText}"*.

---

#### Try Asking About Specific CA Topics
*   *"What is income tax?"*
*   *"Explain AS-2 Valuation of Inventories"*
*   *"What is cash flow statement?"*
*   *"How does GST Input Tax Credit work?"*
*   *"What are the rights of an Unpaid Seller?"*`;
    }

    const primaryEntry = rankedMatches[0];
    const primary = primaryEntry.item;

    let parts;
    if (primary.kind === 'concept' && primary.card) {
      parts = this.formatConceptCard(primary.card);
    } else if (primary.kind === 'uploaded') {
      parts = [
        `### 🤖 AI Mentor Answer`,
        `#### 📄 From Your Uploaded Study Material: ${primary.title}\n**Chapter:** ${primary.parentChapter} · **Subject:** ${primary.subject}`,
        '---',
        `#### Study Material Extract\n${primary.summary}`
      ];
    } else if (primary.kind === 'unit' || primary.kind === 'chapter') {
      const priorityBadge = primary.priority === 'High' ? '🟢 High Weightage' : primary.priority === 'Low' ? '🔴 Low Weightage' : '🟡 Medium Weightage';
      parts = [
        `### 🤖 AI Mentor Answer`,
        `#### ${primary.title}${primary.parentChapter ? ` (${primary.parentChapter})` : ''}\n**Level:** CA ${primary.level} · **Subject:** ${primary.subject} · **Priority:** ${priorityBadge}`,
        '---',
        `#### Concept Overview\n${primary.summary}`
      ];
      if (primary.unitNames) {
        parts.push(`#### Syllabus Units Covered\n${primary.unitNames.split(',').map(u => `*   ${u.trim()}`).join('\n')}`);
      }
      const matchedIllus = this.findRelevantIllustration(primary.illustrations, queryText);
      if (matchedIllus) {
        parts.push('---');
        parts.push(`#### 💡 Practical Illustration\n*   **Question:** ${matchedIllus.q}\n*   **Solution:** ${matchedIllus.a}`);
      }
    } else if (primary.kind === 'question') {
      parts = [
        `### 🤖 AI Mentor Answer`,
        `#### Practice Question — ${primary.title}\n**Question:** ${primary.summary}`,
        '---',
        `#### Solution & Explanation\n*   **Correct Answer:** ${primary.answer}${primary.notes ? `\n*   **Explanation:** ${primary.notes}` : ''}`
      ];
    } else {
      parts = [
        `### 🤖 AI Mentor Answer`,
        `#### ${primary.title}\n${primary.summary}`
      ];
    }

    parts.push(`---\n*✨ Generated by CA TUTOR JS AI Mentor.*`);
    return parts.join('\n\n');
  },

  render(container) {
    if (this.chatHistory.length === 0) {
      this.chatHistory.push({
        sender: 'ai',
        text: `### 🎓 Welcome to the CA-JS Doubt Decoder!

I am your personal AI Study Mentor for your **CA ${State.user?.examLevel || 'Intermediate'} syllabus**, study materials, illustrations, and PYQs.

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
          <span class="header-subtitle">24/7 study mentor trained on your CA exam syllabus & study materials</span>
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
            placeholder="Ask a doubt (e.g. Explain AS-2 Valuation of Inventories)..."
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
    const replyText = await this.buildHybridAnswer(queryText);

    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) indicator.remove();

    State.addPoints(5);

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.chatHistory.push({ sender: 'ai', text: replyText, timestamp: timeStr });
    this.renderStream(box);
  },

  scrollToBottom() {
    const box = document.getElementById('chat-messages-box');
    if (box) box.scrollTop = box.scrollHeight;
  },

  formatInline(text) {
    return String(text || '')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:var(--pastel-purple-dark);font-weight:600;text-decoration:underline;">$1</a>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code style="background:rgba(139,92,246,0.08);padding:1px 6px;border-radius:5px;font-size:12px;">$1</code>');
  },

  parseMarkdown(text) {
    const lines = String(text || '').split('\n');
    const out = [];
    let listType = null;
    let listItems = [];

    const flushList = () => {
      if (!listType || listItems.length === 0) return;
      out.push(`<${listType} style="margin:6px 0 10px 0;padding-left:20px;line-height:1.6;">${listItems.join('')}</${listType}>`);
      listType = null;
      listItems = [];
    };

    lines.forEach(rawLine => {
      const line = rawLine.trim();
      if (!line) {
        flushList();
        return;
      }

      if (line === '---') {
        flushList();
        out.push('<hr style="border:none;border-top:1px solid rgba(0,0,0,0.08);margin:12px 0;">');
        return;
      }

      if (line.startsWith('### ')) {
        flushList();
        out.push(`<h3 class="header-branding" style="font-size:17px;margin:0 0 10px 0;">${this.formatInline(line.slice(4))}</h3>`);
        return;
      }

      if (line.startsWith('#### ')) {
        flushList();
        out.push(`<h4 style="font-size:14px;font-weight:800;color:var(--text-main);margin:10px 0 6px 0;">${this.formatInline(line.slice(5))}</h4>`);
        return;
      }

      if (line.startsWith('$$') && line.endsWith('$$')) {
        flushList();
        const expr = line.slice(2, -2).trim();
        out.push(`<div style="margin:8px 0;padding:10px 14px;border-radius:10px;background:rgba(139,92,246,0.07);border:1px solid rgba(139,92,246,0.18);font-weight:700;font-size:13.5px;text-align:center;color:var(--pastel-purple-dark);">${this.formatInline(expr)}</div>`);
        return;
      }

      if (line.startsWith('> ')) {
        flushList();
        out.push(`<blockquote style="margin:8px 0;padding:10px 14px;border-left:3.5px solid var(--pastel-purple-dark);background:rgba(139,92,246,0.06);border-radius:8px;font-size:13px;line-height:1.55;">${this.formatInline(line.slice(2))}</blockquote>`);
        return;
      }

      const ulMatch = line.match(/^[\*\-]\s+(.*)$/);
      if (ulMatch) {
        if (listType && listType !== 'ul') flushList();
        listType = 'ul';
        listItems.push(`<li style="font-size:13px;margin-bottom:5px;">${this.formatInline(ulMatch[1])}</li>`);
        return;
      }

      const olMatch = line.match(/^\d+\.\s+(.*)$/);
      if (olMatch) {
        if (listType && listType !== 'ol') flushList();
        listType = 'ol';
        listItems.push(`<li style="font-size:13px;margin-bottom:5px;">${this.formatInline(olMatch[1])}</li>`);
        return;
      }

      flushList();
      out.push(`<p style="margin:0 0 8px 0;font-size:13.5px;line-height:1.6;">${this.formatInline(line)}</p>`);
    });

    flushList();
    return out.join('');
  }
};
