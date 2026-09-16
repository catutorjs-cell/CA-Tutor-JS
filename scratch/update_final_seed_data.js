import fs from 'fs';

let content = fs.readFileSync('./js/seedData.js', 'utf8');

// Rename Final_Data to Final_May2026_Data
content = content.replace('export const Final_Data = [', 'export const Final_May2026_Data = [');

// Build Final_May2027_Data
const final2027Data = `
export const Final_May2027_Data = [
  {
    subject: "Paper-1: Financial Reporting (May 2027 Scheme)",
    portalUrl: "https://www.icai.org/post/sm-final-p1-may2026",
    chapters: [
      {
        id: "fn27_fr_c1",
        name: "Chapter 1: Introduction to Indian Accounting Standards",
        weightage: "Low",
        notes: "Understand the development, need, and transition to Indian Accounting Standards (Ind AS) in India.",
        pdfUrls: ["https://resource.cdn.icai.org/87811bos-280825-final-ch1.pdf"],
        units: [{ name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/87811bos-280825-final-ch1.pdf" }],
        illustrations: [{ q: "What is the primary objective of Ind AS?", a: "To harmonize Indian accounting rules with IFRS for international comparability and transparency." }]
      },
      {
        id: "fn27_fr_c2",
        name: "Chapter 2: Conceptual Framework for Financial Reporting under Ind AS",
        weightage: "Medium",
        notes: "Objectives of financial reporting, qualitative characteristics, elements of financial statements, measurement bases.",
        pdfUrls: ["https://resource.cdn.icai.org/87812bos-280825-final-ch2.pdf"],
        units: [{ name: "Chapter 2 Full PDF", url: "https://resource.cdn.icai.org/87812bos-280825-final-ch2.pdf" }],
        illustrations: [{ q: "What are the fundamental qualitative characteristics under the Conceptual Framework?", a: "Relevance and Faithful Representation." }]
      }
    ]
  },
  {
    subject: "Paper-2: Advanced Financial Management (May 2027 Scheme)",
    portalUrl: "https://www.icai.org/post/sm-final-p2-may2026",
    chapters: [
      {
        id: "fn27_afm_c1",
        name: "Chapter 1: Financial Policy and Corporate Strategy",
        weightage: "Medium",
        notes: "Strategic financial planning, interface of financial policy and strategy, balancing risk and return.",
        pdfUrls: ["https://resource.cdn.icai.org/87834bos-280825-final-p2ch1.pdf"],
        units: [{ name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/87834bos-280825-final-p2ch1.pdf" }],
        illustrations: [{ q: "How does financial policy support corporate strategy?", a: "By ensuring optimal capital structure, efficient resource allocation, and maintaining sufficient liquidity." }]
      }
    ]
  },
  {
    subject: "Paper-3: Advanced Auditing, Assurance and Professional Ethics (May 2027 Scheme)",
    portalUrl: "https://www.icai.org/post/sm-final-p3-may2026",
    chapters: [
      {
        id: "fn27_aud_c1",
        name: "Chapter 1: Quality Control and Engagement Standards",
        weightage: "High",
        notes: "SQC 1, SA 220, leadership responsibilities, ethical requirements, client acceptance and continuance.",
        pdfUrls: ["https://resource.cdn.icai.org/87848bos-280825-final-p3ch1.pdf"],
        units: [{ name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/87848bos-280825-final-p3ch1.pdf" }],
        illustrations: [{ q: "What is the objective of SQC 1?", a: "To establish a system of quality control providing reasonable assurance that the firm complies with professional standards." }]
      }
    ]
  },
  {
    subject: "Paper-4: Direct Tax Laws and International Taxation (May 2027 Scheme)",
    portalUrl: "https://www.icai.org/post/sm-final-p4-may-nov2027",
    chapters: [
      {
        id: "fn27_dt_c1",
        name: "Chapter 1: Basic Concepts",
        weightage: "Medium",
        notes: "Basic concepts of income-tax law, charge of income-tax, rates of tax, slab rates, surcharge, and health & education cess for May/Nov 2027 exam.",
        pdfUrls: ["https://resource.cdn.icai.org/93464bos-aps5939-ch1.pdf"],
        units: [{ name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/93464bos-aps5939-ch1.pdf" }],
        illustrations: [{ q: "What is the charge of income-tax under Section 4?", a: "Tax is charged for any assessment year at rates enacted by Central Act on total income of previous year of every person." }]
      },
      {
        id: "fn27_dt_c2",
        name: "Chapter 2: Incomes which do not form part of Total Income",
        weightage: "Medium",
        notes: "Exempted incomes under Section 10: agricultural income, SEZ unit profits, partnership firm share, political party income.",
        pdfUrls: ["https://resource.cdn.icai.org/93463bos-aps5939-ch2.pdf"],
        units: [{ name: "Chapter 2 Full PDF", url: "https://resource.cdn.icai.org/93463bos-aps5939-ch2.pdf" }],
        illustrations: [{ q: "Is agricultural income exempt under Section 10(1)?", a: "Yes, agricultural income derived from land situated in India is fully exempt from income-tax." }]
      },
      {
        id: "fn27_dt_c3",
        name: "Chapter 3: Profits and Gains of Business or Profession",
        weightage: "High",
        notes: "Computation of PGBP, allowable deductions (Sec 30 to 37), disallowed expenses (Sec 40, 40A, 43B), presumptive taxation (Sec 44AD, 44ADA, 44AE).",
        pdfUrls: ["https://resource.cdn.icai.org/93539bos-aps5939-ch3.pdf"],
        units: [{ name: "Chapter 3 Full PDF", url: "https://resource.cdn.icai.org/93539bos-aps5939-ch3.pdf" }],
        illustrations: [{ q: "What is the deduction rule under Section 43B?", a: "Certain statutory payments (taxes, interest, provident fund) are allowed only on actual payment basis on or before due date of filing return." }]
      },
      {
        id: "fn27_dt_c4",
        name: "Chapter 4: Capital Gains",
        weightage: "High",
        notes: "Short-term vs long-term capital assets, full value of consideration, indexation rules, exemptions under Section 54, 54EC, 54F.",
        pdfUrls: ["https://resource.cdn.icai.org/93724bos-aps5939-ch4.pdf"],
        units: [{ name: "Chapter 4 Full PDF", url: "https://resource.cdn.icai.org/93724bos-aps5939-ch4.pdf" }],
        illustrations: [{ q: "What is the requirement for Section 54EC exemption?", a: "Investment in specified bonds (NHAI/RECL) within 6 months of transfer, up to a maximum limit of ₹50 Lakhs." }]
      },
      {
        id: "fn27_dt_c5",
        name: "Chapter 5: Income from Other Sources",
        weightage: "Medium",
        notes: "Taxation of gifts (Sec 56(2)(x)), dividend income, interest on securities, casual winnings.",
        pdfUrls: ["https://resource.cdn.icai.org/94025bos-aps5939-ch5.pdf"],
        units: [{ name: "Chapter 5 Full PDF", url: "https://resource.cdn.icai.org/94025bos-aps5939-ch5.pdf" }],
        illustrations: [{ q: "When are gifts received by an individual taxable under Section 56(2)(x)?", a: "When sum of money or property without consideration exceeds ₹50,000 from non-relatives during the financial year." }]
      },
      {
        id: "fn27_dt_c6",
        name: "Chapter 6: Income of Other Persons included in Assessee’s Total Income",
        weightage: "Medium",
        notes: "Clubbing of income provisions (Sec 60 to 64), transfer of income without transfer of asset, spouse/minor child clubbing rules.",
        pdfUrls: ["https://resource.cdn.icai.org/94130bos-aps5939-ch6.pdf"],
        units: [{ name: "Chapter 6 Full PDF", url: "https://resource.cdn.icai.org/94130bos-aps5939-ch6.pdf" }],
        illustrations: [{ q: "Are income from assets transferred to spouse without adequate consideration clubbed?", a: "Yes, income generated from such transferred asset is clubbed in hands of transferor spouse." }]
      },
      {
        id: "fn27_dt_c7",
        name: "Chapter 7: Set Off or Carry Forward",
        weightage: "Medium",
        notes: "Inter-source and inter-head set off, carry forward and set off of business losses, capital losses, house property loss rules.",
        pdfUrls: ["https://resource.cdn.icai.org/94194bos-aps5939-ch7.pdf"],
        units: [{ name: "Chapter 7 Full PDF", url: "https://resource.cdn.icai.org/94194bos-aps5939-ch7.pdf" }],
        illustrations: [{ q: "How many years can unabsorbed business loss be carried forward?", a: "Up to 8 assessment years immediately succeeding the assessment year for which loss was first computed." }]
      },
      {
        id: "fn27_dt_c8",
        name: "Chapter 8: Deductions from Gross Total Income",
        weightage: "High",
        notes: "Chapter VI-A deductions: Sec 80C, 80D (health insurance), 80E (education loan interest), 80G (donations), 80JJAA, 80TTA/80TTB.",
        pdfUrls: ["https://resource.cdn.icai.org/94202CHP-8 Deduction from Gross Total Income.pdf"],
        units: [{ name: "Chapter 8 Full PDF", url: "https://resource.cdn.icai.org/94202CHP-8 Deduction from Gross Total Income.pdf" }],
        illustrations: [{ q: "What is the maximum deduction under Section 80D for senior citizens?", a: "Up to ₹50,000 for health insurance premium paid for senior citizen self/parents." }]
      }
    ]
  },
  {
    subject: "Paper-5: Indirect Tax Laws (May 2027 Scheme)",
    portalUrl: "https://www.icai.org/post/sm-final-p5-may2026",
    chapters: [
      {
        id: "fn27_idt_c1",
        name: "Chapter 1: Supply under GST",
        weightage: "High",
        notes: "Concept of supply, Schedule I (without consideration), Schedule II (goods vs services), Schedule III (neither goods nor services).",
        pdfUrls: ["https://resource.cdn.icai.org/87884bos-280825-final-p5ch1.pdf"],
        units: [{ name: "Chapter 1 Full PDF", url: "https://resource.cdn.icai.org/87884bos-280825-final-p5ch1.pdf" }],
        illustrations: [{ q: "What constitutes supply under Section 7 of CGST Act?", a: "All forms of supply of goods or services made for consideration by a person in course or furtherance of business." }]
      }
    ]
  },
  {
    subject: "Paper-6: Integrated Business Solutions (May 2027 Scheme)",
    portalUrl: "https://www.icai.org/post/sm-final-p6-may2026",
    chapters: [
      {
        id: "fn27_ibs_c1",
        name: "IBS Case Study Digest",
        weightage: "High",
        notes: "Board of Studies multidisciplinary case studies for practical skill assessment under the CA Final curriculum.",
        pdfUrls: ["https://resource.cdn.icai.org/80945bos65122.pdf"],
        units: [{ name: "IBS Case Study Digest PDF", url: "https://resource.cdn.icai.org/80945bos65122.pdf" }],
        illustrations: [{ q: "Why is Integrated Business Solutions open-book?", a: "To simulate real-world advisory practice requiring reference to tax codes, acts, and standards." }]
      }
    ]
  }
];
`;

// Insert Final_May2027_Data before export const SYLLABUS_DATA
content = content.replace('export const SYLLABUS_DATA = {', final2027Data + '\nexport const SYLLABUS_DATA = {');

// Update SYLLABUS_DATA object
const oldSyllabusData = `export const SYLLABUS_DATA = {
  Foundation_May2027: Foundation_May2027_Data,
  Foundation_May2026: Foundation_May2026_Data,
  Foundation: Foundation_May2027_Data,
  Intermediate_May2027: Intermediate_May2027_Data,
  Intermediate_May2026: Intermediate_May2026_Data,
  Intermediate: Intermediate_May2027_Data,
  Final: Final_Data
};`;

const newSyllabusData = `export const SYLLABUS_DATA = {
  Foundation_May2027: Foundation_May2027_Data,
  Foundation_May2026: Foundation_May2026_Data,
  Foundation: Foundation_May2027_Data,
  Intermediate_May2027: Intermediate_May2027_Data,
  Intermediate_May2026: Intermediate_May2026_Data,
  Intermediate: Intermediate_May2027_Data,
  Final_May2027: Final_May2027_Data,
  Final_May2026: Final_May2026_Data,
  Final: Final_May2027_Data
};`;

content = content.replace(oldSyllabusData, newSyllabusData);

fs.writeFileSync('./js/seedData.js', content, 'utf8');
console.log('Successfully updated seedData.js with Final_May2027_Data and Final_May2026_Data!');
