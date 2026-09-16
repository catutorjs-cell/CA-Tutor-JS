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

const cleanTitle = (str) => {
  if (!str) return '';
  return str
    .replace(/^Unit \d+:\s*/i, '')
    .replace(/^(Part [IVX\d]+ - )?Chapter \d+[:\s]*/i, '')
    .replace(/^Part [IVX\d]+ -\s*/i, '')
    .replace(/\s*Full PDF$/i, '')
    .replace(/\s*PDF$/i, '')
    .trim();
};

const formatUnitsForDataset = (dataArray) => {
  return dataArray.map(sub => ({
    ...sub,
    chapters: sub.chapters.map(ch => {
      let units = (ch.units || []).slice();
      const topicName = cleanTitle(ch.name) || ch.name;

      if (units.length === 0 && ch.pdfUrls && ch.pdfUrls.length > 0) {
        units = ch.pdfUrls.map((url, idx) => ({
          name: `Unit ${idx + 1}: ${topicName}`,
          url: url
        }));
      } else {
        units = units.map((u, idx) => {
          let uName = u.name;

          // If unit name is already a detailed unit like "Unit 1: Meaning and Scope of Accounting", keep it
          let unitTopic = cleanTitle(uName);

          if (!unitTopic || /^Chapter \d+$/i.test(unitTopic) || /^Full$/i.test(unitTopic) || /^Unit \d+$/i.test(unitTopic)) {
            unitTopic = topicName;
          }

          let finalName = `Unit ${idx + 1}: ${unitTopic}`;
          if (/^Annexure/i.test(uName)) {
            finalName = uName;
          }

          return {
            name: finalName,
            url: u.url
          };
        });
      }

      return {
        ...ch,
        units: units
      };
    })
  }));
};

const formattedFoundation2027 = formatUnitsForDataset(Foundation_May2027_Data);
const formattedIntermediate2027 = formatUnitsForDataset(Intermediate_May2027_Data);
const formattedFinal2027 = formatUnitsForDataset(Final_May2027_Data);

const formattedFoundation2026 = formatUnitsForDataset(Foundation_May2026_Data);
const formattedIntermediate2026 = formatUnitsForDataset(Intermediate_May2026_Data);
const formattedFinal2026 = formatUnitsForDataset(Final_May2026_Data);

console.log('Sample Formatted Units for Intermediate 2027 GST:');
formattedIntermediate2027.find(s => s.subject.includes('Goods and Services Tax')).chapters.forEach(ch => {
  console.log(`  [${ch.id}] ${ch.name} => ${ch.units.map(u => u.name).join(' | ')}`);
});

console.log('\nSample Formatted Units for Final 2027 DT:');
formattedFinal2027.find(s => s.subject.includes('Direct Tax')).chapters.forEach(ch => {
  console.log(`  [${ch.id}] ${ch.name} => ${ch.units.map(u => u.name).join(' | ')}`);
});

// Construct new seedData.js file content
const newContent = `// CA JS Application Seed Data

export const Foundation_May2026_Data = ${JSON.stringify(formattedFoundation2026, null, 2)};

export const Foundation_May2027_Data = ${JSON.stringify(formattedFoundation2027, null, 2)};

export const Intermediate_May2026_Data = ${JSON.stringify(formattedIntermediate2026, null, 2)};

export const Intermediate_May2027_Data = ${JSON.stringify(formattedIntermediate2027, null, 2)};

export const Final_May2026_Data = ${JSON.stringify(formattedFinal2026, null, 2)};

export const Final_May2027_Data = ${JSON.stringify(formattedFinal2027, null, 2)};

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
console.log('\nSuccessfully updated js/seedData.js with topic-specific Unit 1, Unit 2, Unit 3 labels!');
