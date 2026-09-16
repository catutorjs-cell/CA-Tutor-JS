import fs from 'fs';
import path from 'path';

const seedPath = path.resolve('js/seedData.js');
let seedContent = fs.readFileSync(seedPath, 'utf8');

const subjectMapping = {
  foundation: {
    'accounts': 'Paper-1: Accounting',
    'accountancy': 'Paper-1: Accounting',
    'business law': 'Paper-2: Business Laws',
    'business economics': 'Paper-4: Business Economics',
    'quantitative': 'Paper-3: Quantitative Aptitude',
    'qualitative': 'Paper-3: Quantitative Aptitude',
    'quantitatative': 'Paper-3: Quantitative Aptitude'
  },
  intermediate: {
    'accounts': 'Paper-1: Advanced Accounting',
    'advance accounting': 'Paper-1: Advanced Accounting',
    'corporate and other laws': 'Paper-2: Corporate and Other Laws',
    'law': 'Paper-2: Corporate and Other Laws',
    'cost accounts': 'Paper-4: Cost and Management Accounting',
    'cost accounting': 'Paper-4: Cost and Management Accounting',
    'taxation': 'Paper-3: Taxation',
    'auditing': 'Paper-5: Auditing and Ethics',
    'fm_sm': 'Paper-6: Financial Management and Strategic Management',
    'paper 1': 'Paper-1: Advanced Accounting',
    'paper 2': 'Paper-2: Corporate and Other Laws',
    'paper 3a': 'Paper-3: Income-tax Law',
    'paper 3b': 'Paper-3: Indirect Tax Laws',
    'paper 4': 'Paper-4: Cost and Management Accounting',
    'paper 5': 'Paper-5: Auditing and Ethics',
    'paper 6a': 'Paper-6: Financial Management',
    'paper 6b': 'Paper-6: Strategic Management'
  },
  final: {
    'finacial reporting': 'Paper-1: Financial Reporting',
    'finacial management': 'Paper-2: Advanced Financial Management',
    'auditing': 'Paper-3: Advanced Auditing, Assurance and Professional Ethics',
    'direct tax': 'Paper-4: Direct Tax Laws and International Taxation',
    'indirect tax': 'Paper-5: Indirect Tax Laws',
    'intergrated business': 'Paper-6: Integrated Business Solutions',
    'paper 1': 'Paper-1: Financial Reporting',
    'paper 2': 'Paper-2: Advanced Financial Management',
    'paper 3': 'Paper-3: Advanced Auditing, Assurance and Professional Ethics',
    'paper 4': 'Paper-4: Direct Tax Laws and International Taxation',
    'paper 5': 'Paper-5: Indirect Tax Laws'
  }
};

function parseFileName(fileName, level, type) {
  if (fileName.endsWith('.md') || fileName === 'answers') return null;

  const cleanName = fileName.replace(/\.pdf$/i, '').trim();
  const lowerName = cleanName.toLowerCase();

  let year = '2025';
  if (lowerName.includes('2024') || lowerName.includes(' 24')) year = '2024';
  if (lowerName.includes('2025') || lowerName.includes(' 25')) year = '2025';
  if (lowerName.includes('2026') || lowerName.includes(' 26')) year = '2026';

  let month = 'May';
  if (lowerName.includes('jan')) month = 'Jan';
  if (lowerName.includes('jun')) month = 'Jun';
  if (lowerName.includes('may')) month = 'May';
  if (lowerName.includes('sep')) month = 'Sep';
  if (lowerName.includes('nov')) month = 'Nov';

  let subject = '';
  const levelMap = subjectMapping[level.toLowerCase()] || {};

  for (const [key, val] of Object.entries(levelMap)) {
    if (lowerName.includes(key)) {
      subject = val;
      break;
    }
  }

  if (!subject) {
    if (level === 'Foundation') subject = 'Paper-1: Accounting';
    else if (level === 'Intermediate') subject = 'Paper-1: Advanced Accounting';
    else subject = 'Paper-1: Financial Reporting';
  }

  let title = `${month} ${year} ${type} - ${subject}`;
  if (type === 'MTP') {
    const seriesMatch = cleanName.match(/mtp\s*(\d+)/i) || cleanName.match(/mtp_\s*(\d+)/i) || cleanName.match(/(\d+)$/);
    const seriesNum = seriesMatch ? seriesMatch[1] : '1';
    title = `${subject} - Mock Test Series ${seriesNum}`;
  }

  const id = `${level.toLowerCase()}_${type.toLowerCase()}_${cleanName.replace(/[^a-zA-Z0-9]/g, '_')}`;

  return {
    id,
    title,
    level,
    year,
    month,
    type,
    subject,
    pdfUrl: `./pdfs/${level.toLowerCase()}/${type === 'PYQ' ? 'pyq' : (type === 'RTP' ? 'rtpmtp/rtp' : 'rtpmtp/mtp')}/${fileName}`
  };
}

const mockPapers = {
  PYQ: [],
  RTP: [],
  MTP: []
};

const levels = ['foundation', 'intermediate', 'final'];

levels.forEach(lvl => {
  const capLevel = lvl.charAt(0).toUpperCase() + lvl.slice(1);
  
  // 1. PYQ
  const pyqDir = path.resolve(`./pdfs/${lvl}/pyq`);
  if (fs.existsSync(pyqDir)) {
    const files = fs.readdirSync(pyqDir);
    files.forEach(f => {
      if (f.endsWith('.pdf')) {
        const item = parseFileName(f, capLevel, 'PYQ');
        if (item) mockPapers.PYQ.push(item);
      }
    });
  }

  // 2. RTP
  const rtpDir = path.resolve(`./pdfs/${lvl}/rtpmtp/rtp`);
  if (fs.existsSync(rtpDir)) {
    const files = fs.readdirSync(rtpDir);
    files.forEach(f => {
      if (f.endsWith('.pdf')) {
        const item = parseFileName(f, capLevel, 'RTP');
        if (item) mockPapers.RTP.push(item);
      }
    });
  }

  // 3. MTP
  const mtpDir = path.resolve(`./pdfs/${lvl}/rtpmtp/mtp`);
  if (fs.existsSync(mtpDir)) {
    const files = fs.readdirSync(mtpDir);
    files.forEach(f => {
      if (f.endsWith('.pdf')) {
        const item = parseFileName(f, capLevel, 'MTP');
        if (item) mockPapers.MTP.push(item);
      }
    });
  }
});

console.log(`Discovered Papers Count: PYQ=${mockPapers.PYQ.length}, RTP=${mockPapers.RTP.length}, MTP=${mockPapers.MTP.length}`);

// Replace export const MOCK_PAPERS in seedData.js
const mockPapersCode = `export const MOCK_PAPERS = ${JSON.stringify(mockPapers, null, 2)};`;

const regex = /export const MOCK_PAPERS = {[\s\S]*?};/;
if (regex.test(seedContent)) {
  seedContent = seedContent.replace(regex, mockPapersCode);
  fs.writeFileSync(seedPath, seedContent, 'utf8');
  console.log('Successfully updated MOCK_PAPERS in seedData.js!');
} else {
  console.error('Could not find export const MOCK_PAPERS in seedData.js');
}
