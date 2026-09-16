import fs from 'fs';
import {
  Foundation_May2026_Data,
  Foundation_May2027_Data,
  Intermediate_May2026_Data,
  Intermediate_May2027_Data,
  Final_May2026_Data,
  Final_May2027_Data,
  MOCK_QUESTIONS
} from '../js/seedData.js';

// Filter function to remove Module 1, 2, initial pages, and module answer PDFs
const isModuleOrInitialPage = (ch) => {
  const id = ch.id.toLowerCase();
  const name = ch.name.toLowerCase();
  return (
    id.endsWith('_ip') ||
    id.endsWith('_ans') ||
    id.includes('_m1_') ||
    id.includes('_m2_') ||
    id.includes('_m3_') ||
    name.startsWith('module 1:') ||
    name.startsWith('module 2:') ||
    name.startsWith('module 3:') ||
    name.startsWith('initial pages') ||
    name.startsWith('answers to') ||
    name.includes('answers to crossword') ||
    name.includes('initial pages &')
  );
};

const cleanData = (dataArray) => {
  return dataArray.map(sub => ({
    ...sub,
    chapters: sub.chapters.filter(ch => !isModuleOrInitialPage(ch))
  }));
};

const cleanedFoundation2027 = cleanData(Foundation_May2027_Data);
const cleanedIntermediate2027 = cleanData(Intermediate_May2027_Data);
const cleanedFinal2027 = cleanData(Final_May2027_Data);

console.log('Foundation 2027 chapter count before/after:');
Foundation_May2027_Data.forEach(s => {
  const cleanSub = cleanedFoundation2027.find(cs => cs.subject === s.subject);
  console.log(`  ${s.subject}: ${s.chapters.length} -> ${cleanSub.chapters.length}`);
});

console.log('\nIntermediate 2027 chapter count before/after:');
Intermediate_May2027_Data.forEach(s => {
  const cleanSub = cleanedIntermediate2027.find(cs => cs.subject === s.subject);
  console.log(`  ${s.subject}: ${s.chapters.length} -> ${cleanSub.chapters.length}`);
});

console.log('\nFinal 2027 chapter count before/after:');
Final_May2027_Data.forEach(s => {
  const cleanSub = cleanedFinal2027.find(cs => cs.subject === s.subject);
  console.log(`  ${s.subject}: ${s.chapters.length} -> ${cleanSub.chapters.length}`);
});

// Construct new seedData.js file content
const newContent = `// CA JS Application Seed Data

export const Foundation_May2026_Data = ${JSON.stringify(Foundation_May2026_Data, null, 2)};

export const Foundation_May2027_Data = ${JSON.stringify(cleanedFoundation2027, null, 2)};

export const Intermediate_May2026_Data = ${JSON.stringify(Intermediate_May2026_Data, null, 2)};

export const Intermediate_May2027_Data = ${JSON.stringify(cleanedIntermediate2027, null, 2)};

export const Final_May2026_Data = ${JSON.stringify(Final_May2026_Data, null, 2)};

export const Final_May2027_Data = ${JSON.stringify(cleanedFinal2027, null, 2)};

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
`;

fs.writeFileSync('./js/seedData.js', newContent, 'utf8');
console.log('\nSuccessfully updated js/seedData.js!');
