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

// URL fixes mapping for known mismatched unit URLs
const fixUnitsForChapter = (ch) => {
  if (!ch.units) return ch;

  let newUnits = ch.units.map((u, idx) => {
    let newUrl = u.url;

    // Foundation Accounting Chapter 2 (Accounting Process)
    if (ch.id === 'f27_acc_c2' || ch.id === 'f_acc_c2') {
      const urls = [
        "https://resource.cdn.icai.org/88100bos-aps2240-ch2u1.pdf",
        "https://resource.cdn.icai.org/88101bos-aps2240-ch2u2.pdf",
        "https://resource.cdn.icai.org/88102bos-aps2240-ch2u3.pdf",
        "https://resource.cdn.icai.org/88103bos-aps2240-ch2u4.pdf",
        "https://resource.cdn.icai.org/88104bos-aps2240-ch2u5.pdf",
        "https://resource.cdn.icai.org/88105bos-aps2240-ch2u6.pdf"
      ];
      if (urls[idx]) newUrl = urls[idx];
    }

    // Foundation Accounting Chapter 10 (Partnership Accounts)
    if (ch.id === 'f27_acc_c10' || ch.id === 'f_acc_c10') {
      const urls = [
        "https://resource.cdn.icai.org/88117bos-aps2240-ch10u1.pdf",
        "https://resource.cdn.icai.org/88118bos-aps2240-ch10u2.pdf",
        "https://resource.cdn.icai.org/88119bos-aps2240-ch10u3.pdf",
        "https://resource.cdn.icai.org/88120bos-aps2240-ch10u4.pdf",
        "https://resource.cdn.icai.org/88121bos-aps2240-ch10u5.pdf",
        "https://resource.cdn.icai.org/88122bos-aps2240-ch10u6.pdf"
      ];
      if (urls[idx]) newUrl = urls[idx];
    }

    // Foundation Accounting Chapter 11 (Company Accounts)
    if (ch.id === 'f27_acc_c11' || ch.id === 'f_acc_c11') {
      const urls = [
        "https://resource.cdn.icai.org/88134bos-aps2240-ch11u1.pdf",
        "https://resource.cdn.icai.org/88135bos-aps2240-ch11u2.pdf",
        "https://resource.cdn.icai.org/88136bos-aps2240-ch11u3.pdf"
      ];
      if (urls[idx]) newUrl = urls[idx];
    }

    // Foundation Economics Chapter 6 (National Income)
    if (ch.id === 'f27_eco_c6' || ch.id === 'f_eco_c6') {
      const urls = [
        "https://resource.cdn.icai.org/88070bos-aps2233-ch6u1.pdf",
        "https://resource.cdn.icai.org/88071bos-aps2233-ch6u2.pdf",
        "https://resource.cdn.icai.org/88071bos-aps2233-ch6u2.pdf"
      ];
      if (urls[idx]) newUrl = urls[idx];
    }

    return {
      ...u,
      url: newUrl
    };
  });

  return {
    ...ch,
    pdfUrls: newUnits.map(u => u.url),
    units: newUnits
  };
};

const fixDataset = (dataset) => {
  return dataset.map(sub => ({
    ...sub,
    chapters: sub.chapters.map(fixUnitsForChapter)
  }));
};

const fixedF2027 = fixDataset(Foundation_May2027_Data);
const fixedF2026 = fixDataset(Foundation_May2026_Data);
const fixedI2027 = fixDataset(Intermediate_May2027_Data);
const fixedI2026 = fixDataset(Intermediate_May2026_Data);
const fixedFn2027 = fixDataset(Final_May2027_Data);
const fixedFn2026 = fixDataset(Final_May2026_Data);

console.log('Fixed Chapter 2 Units in Foundation May 2027 Accounting:');
fixedF2027.find(s => s.subject.includes('Accounting')).chapters.find(c => c.name.includes('Chapter 2')).units.forEach(u => {
  console.log(`  ${u.name} => ${u.url}`);
});

console.log('\nFixed Chapter 10 Units in Foundation May 2027 Accounting:');
fixedF2027.find(s => s.subject.includes('Accounting')).chapters.find(c => c.name.includes('Chapter 10')).units.forEach(u => {
  console.log(`  ${u.name} => ${u.url}`);
});

console.log('\nFixed Chapter 11 Units in Foundation May 2027 Accounting:');
fixedF2027.find(s => s.subject.includes('Accounting')).chapters.find(c => c.name.includes('Chapter 11')).units.forEach(u => {
  console.log(`  ${u.name} => ${u.url}`);
});

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
console.log('\nSuccessfully fixed all unit URLs in js/seedData.js!');
