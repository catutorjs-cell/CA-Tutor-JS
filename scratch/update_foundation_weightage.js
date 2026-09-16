const fs = require('fs');
const path = require('path');

const seedPath = path.join(__dirname, '../js/seedData.js');
let fileContent = fs.readFileSync(seedPath, 'utf8');

// Require the exported arrays
const { Foundation_May2026_Data, Foundation_May2027_Data } = require('../js/seedData.js');

const markNotesMap = {
  // Paper 1
  "Final Accounts": "30–40% (30–40 Marks) Primary Subjective Numerical Block",
  "Not-for-Profit": "30–40% (30–40 Marks) Primary Subjective Numerical Block",
  "Partnership": "30–40% (30–40 Marks) Primary Subjective Numerical Block",
  "Accounting Process": "25–30% (25–30 Marks) Core Accounting Process Block",
  "Bank Reconciliation": "25–30% (25–30 Marks) Core Accounting Process Block",
  "Inventories": "25–30% (25–30 Marks) Core Accounting Process Block",
  "Depreciation": "25–30% (25–30 Marks) Core Accounting Process Block",
  "Property, Plant": "25–30% (25–30 Marks) Core Accounting Process Block",
  "Company Accounts": "10–15% (10–15 Marks) Shares & Debentures Focus",

  // Paper 2
  "Indian Contract Act": "25–30% (25–30 Marks) Most Vital Direct & Case Study Chapter",
  "Sale of Goods Act": "20–25% (20–25 Marks) Key Core Law Chapter",
  "Indian Partnership Act": "20–25% (20–25 Marks) Key Core Law Chapter",
  "Companies Act": "15–20% (15–20 Marks) Corporate Framework Focus",

  // Paper 3
  "Mathematics of Finance": "14–16 Marks (Up to 40% of Math Section)",
  "Number Series": "Logical Reasoning Section (5 Marks Equal Weightage)",
  "Direction": "Logical Reasoning Section (5 Marks Equal Weightage)",
  "Seating Arrangements": "Logical Reasoning Section (5 Marks Equal Weightage)",
  "Blood Relations": "Logical Reasoning Section (5 Marks Equal Weightage)",
  "Measures of Central Tendency": "10–12 Marks (Core Statistics Module)",
  "Probability": "11–12 Marks Combined Statistics Block",
  "Theoretical Distributions": "11–12 Marks Combined Statistics Block",

  // Paper 4
  "Demand": "35–40% (35–40 Marks) Microeconomics Core",
  "Production": "35–40% (35–40 Marks) Microeconomics Core",
  "Price Determination": "25–30% (25–30 Marks) Market Forms & Pricing",
  "National Income": "15 Marks Macroeconomics Core",
  "Public Finance": "15 Marks Macroeconomics Core"
};

function updateDataset(dataset) {
  dataset.forEach(sub => {
    sub.chapters.forEach(ch => {
      for (const [key, noteText] of Object.entries(markNotesMap)) {
        if (ch.name.includes(key)) {
          ch.weightage = "High";
          if (ch.notes && !ch.notes.includes('EXAM WEIGHTAGE BREAKDOWN:')) {
            ch.notes = `🔥 <strong>EXAM WEIGHTAGE BREAKDOWN:</strong> ${noteText}<br><br>` + ch.notes;
          }
          break;
        }
      }
    });
  });
}

updateDataset(Foundation_May2026_Data);
updateDataset(Foundation_May2027_Data);

// Now re-serialize Foundation_May2026_Data and Foundation_May2027_Data back into fileContent
const new2026DataStr = 'export const Foundation_May2026_Data = ' + JSON.stringify(Foundation_May2026_Data, null, 2) + ';';
const new2027DataStr = 'export const Foundation_May2027_Data = ' + JSON.stringify(Foundation_May2027_Data, null, 2) + ';';

// Replace Foundation_May2026_Data in file
fileContent = fileContent.replace(
  /export const Foundation_May2026_Data = \[\s*[\s\S]*?\n\];/m,
  new2026DataStr
);

// Replace Foundation_May2027_Data in file
fileContent = fileContent.replace(
  /export const Foundation_May2027_Data = \[\s*[\s\S]*?\n\];/m,
  new2027DataStr
);

fs.writeFileSync(seedPath, fileContent, 'utf8');
console.log("Successfully updated Foundation High Weightage data in seedData.js!");
