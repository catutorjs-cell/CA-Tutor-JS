import fs from 'fs';
import {
  Foundation_May2026_Data,
  Foundation_May2027_Data,
  Intermediate_May2026_Data,
  Intermediate_May2027_Data,
  Final_May2026_Data,
  Final_May2027_Data,
  MOCK_QUESTIONS,
  MOCK_PAPERS,
  SEED_FRIENDS
} from '../js/seedData.js';

const dedupeChapterUnits = (ch) => {
  if (ch.id === 'f27_acc_c5' || ch.id === 'f_acc_c5') {
    return {
      ...ch,
      pdfUrls: ["https://resource.cdn.icai.org/88108bos-aps2240-ch5.pdf"],
      units: [
        {
          name: "Unit 1: Property, Plant and Equipment and Depreciable Assets",
          url: "https://resource.cdn.icai.org/88108bos-aps2240-ch5.pdf"
        }
      ]
    };
  }

  // Deduplicate units if all units share exact same URL
  if (ch.units && ch.units.length > 1) {
    const urls = new Set(ch.units.map(u => u.url));
    if (urls.size === 1) {
      const singleUrl = ch.units[0].url;
      const cleanName = ch.name.replace(/^(Part [IVX\d]+ - )?Chapter \d+[:\s]*/i, '').trim();
      return {
        ...ch,
        pdfUrls: [singleUrl],
        units: [
          {
            name: `Unit 1: ${cleanName}`,
            url: singleUrl
          }
        ]
      };
    }
  }

  return ch;
};

const cleanDataset = (dataset) => {
  return dataset.map(sub => ({
    ...sub,
    chapters: sub.chapters.map(dedupeChapterUnits)
  }));
};

const fixedF2027 = cleanDataset(Foundation_May2027_Data);
const fixedF2026 = cleanDataset(Foundation_May2026_Data);
const fixedI2027 = cleanDataset(Intermediate_May2027_Data);
const fixedI2026 = cleanDataset(Intermediate_May2026_Data);
const fixedFn2027 = cleanDataset(Final_May2027_Data);
const fixedFn2026 = cleanDataset(Final_May2026_Data);

console.log('F2027 Chapter 5 updated units:', fixedF2027.find(s=>s.subject.includes('Accounting')).chapters.find(c=>c.id==='f27_acc_c5').units);

// Construct new seedData.js file content
const newContent = `// CA JS Application Seed Data

export const Foundation_May2026_Data = ${JSON.stringify(fixedF2026, null, 2)};

export const Foundation_May2027_Data = ${JSON.stringify(fixedF2027, null, 2)};

export const Intermediate_May2026_Data = ${JSON.stringify(fixedI2026, null, 2)};

export const Intermediate_May2027_Data = ${JSON.stringify(fixedI2027, null, 2)};

export const Final_May2026_Data = ${JSON.stringify(fixedFn2026, null, 2)};

export const Final_May2027_Data = ${JSON.stringify(fixedFn2027, null, 2)};

export const SYLLABUS_DATA = {
  Foundation_May2027: Foundation_May2027_Data,
  Foundation_May2026: Foundation_May2026_Data,
  Foundation: Foundation_May2027_Data,
  Intermediate_May2027: Intermediate_May2027_Data,
  Intermediate_May2026: Intermediate_May2026_Data,
  Intermediate: Intermediate_May2027_Data,
  Final_May2027: Final_May2027_Data,
  Final_May2026: Final_May2026_Data,
  Final: Final_May2027_Data
};

export const MOCK_QUESTIONS = ${JSON.stringify(MOCK_QUESTIONS, null, 2)};

export const MOCK_PAPERS = ${JSON.stringify(MOCK_PAPERS, null, 2)};

export const SEED_FRIENDS = ${JSON.stringify(SEED_FRIENDS, null, 2)};
`;

fs.writeFileSync('./js/seedData.js', newContent, 'utf8');
console.log('\nSuccessfully updated js/seedData.js!');
