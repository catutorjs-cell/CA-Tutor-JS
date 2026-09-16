import fs from 'fs';

const seedPath = './js/seedData.js';
let content = fs.readFileSync(seedPath, 'utf8');

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

// Fix f_acc_c1 units array
content = content.replace(
  /"id": "f_acc_c1",[\s\S]*?"units": \[[\s\S]*?\],/,
  (match) => match.replace(/"units": \[[\s\S]*?\],/, `"units": ${JSON.stringify(ch1Units, null, 2)},`)
);

fs.writeFileSync(seedPath, content, 'utf8');
console.log('Successfully fixed f_acc_c1 units array!');
