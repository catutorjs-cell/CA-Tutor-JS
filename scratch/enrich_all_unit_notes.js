import fs from 'fs';
import path from 'path';

const seedPath = path.resolve('js/seedData.js');
let code = fs.readFileSync(seedPath, 'utf8');

const unitNotesMap = {
  "Unit 1: Final Accounts of Non-Manufacturing Entities": `<strong>UNIT 1: FINAL ACCOUNTS OF NON-MANUFACTURING ENTITIES (ICAI NOTES)</strong><br><br>• <strong>Trading Account:</strong> Determines Gross Profit/Loss. Opening Stock + Net Purchases + Direct Expenses vs Net Sales + Closing Stock.<br>• <strong>Profit & Loss Account:</strong> Determines Net Profit/Loss. Gross Profit + Indirect Incomes vs Indirect Expenses.<br>• <strong>Balance Sheet:</strong> Financial position statement as on a specific date detailing Assets, Liabilities, and Owner Capital.`,
  
  "Unit 2: Final Accounts of Manufacturing Entities": `<strong>UNIT 2: FINAL ACCOUNTS OF MANUFACTURING ENTITIES (ICAI NOTES)</strong><br><br>• <strong>Manufacturing Account:</strong> Prepared to ascertain Cost of Goods Manufactured prior to Trading Account.<br>• <strong>Components:</strong> Raw Materials Consumed (Opening Raw Materials + Purchases - Closing Raw Materials) + Direct Wages + Direct Expenses + Factory Overheads + Opening WIP - Closing WIP - Sale of Scrap.`,

  "Annexure-I": `<strong>ANNEXURE-I: PREPARATION OF FINANCIAL STATEMENTS FORMAT (ICAI NOTES)</strong><br><br>Presents standard ICAI Schedule III and Sole Proprietorship formats for vertical and horizontal Financial Statements layout.`,

  "Unit 1: Introduction to Partnership Accounts": `<strong>UNIT 1: INTRODUCTION TO PARTNERSHIP ACCOUNTS (ICAI NOTES)</strong><br><br>• <strong>Partnership Deed:</strong> Written agreement defining profit sharing ratio, interest on capital/drawings, partner salaries.<br>• <strong>P&L Appropriation Account:</strong> Allocates net profit among partners after charging interest on capital, partner salary/commission, and transferring reserves.`,

  "Unit 2: Treatment of Goodwill in Partnership Accounts": `<strong>UNIT 2: TREATMENT OF GOODWILL IN PARTNERSHIP ACCOUNTS (ICAI NOTES)</strong><br><br>• <strong>Goodwill Valuation Methods:</strong> Average Profit Method, Super Profit Method, Capitalisation Method.<br>• <strong>Accounting Treatment (AS 26):</strong> Purchased goodwill is recognized; internally generated goodwill is adjusted directly through Partner Capital/Current Accounts using Gaining/Sacrificing Ratios.`,

  "Unit 2: Valuation of Goodwill": `<strong>UNIT 2: VALUATION OF GOODWILL (ICAI NOTES)</strong><br><br>• <strong>Goodwill Methods:</strong> Average Profit, Super Profit, and Capitalisation methods for evaluating firm brand equity on partner reconstitutions.`,

  "Unit 3: Admission of a New Partner": `<strong>UNIT 3: ADMISSION OF A NEW PARTNER (ICAI NOTES)</strong><br><br>• <strong>Sacrificing Ratio:</strong> Old Share - New Share.<br>• <strong>Revaluation Account:</strong> Credits increase in asset value & decrease in liabilities; debits decrease in asset value & increase in liabilities. Net profit/loss transferred to old partners in Old Profit Sharing Ratio.`,

  "Unit 4: Retirement of a Partner": `<strong>UNIT 4: RETIREMENT OF A PARTNER (ICAI NOTES)</strong><br><br>• <strong>Gaining Ratio:</strong> New Share - Old Share.<br>• <strong>Settlement of Retiring Partner:</strong> Total dues credited to Retiring Partner Capital A/c transferred to Retiring Partner Loan Account or paid in cash.`,

  "Unit 4: Retirement / Death of a Partner": `<strong>UNIT 4: RETIREMENT / DEATH OF A PARTNER (ICAI NOTES)</strong><br><br>• <strong>Retirement/Death Adjustments:</strong> Gaining ratio calculation, revaluation of assets, goodwill adjustment, and executor/loan account settlement.`,

  "Unit 5: Death of a Partner": `<strong>UNIT 5: DEATH OF A PARTNER (ICAI NOTES)</strong><br><br>• <strong>Deceased Partner Dues:</strong> Share of profit up to date of death calculated based on time or sales ratio + share of goodwill + share of revaluation reserve transferred to Executor's Account.`,

  "Unit 6: Dissolution of Partnership Firms and LLPs": `<strong>UNIT 6: DISSOLUTION OF PARTNERSHIP FIRMS AND LLPS (ICAI NOTES)</strong><br><br>• <strong>Realisation Account:</strong> Assets transferred at book values to debit side; liabilities transferred to credit side. Realised cash credited; realization expenses debited. Net profit/loss distributed among all partners in Profit Sharing Ratio.<br>• <strong>Settlement Order (Sec 48):</strong> Outside liabilities -> Partner Loans -> Partner Capital -> Balance to Partners.`,

  "Unit 5: Dissolution of Partnership Firms": `<strong>UNIT 5: DISSOLUTION OF PARTNERSHIP FIRMS (ICAI NOTES)</strong><br><br>• <strong>Realisation & Settlement:</strong> Realisation account creation, asset liquidations, liability repayments, and partner capital distributions under Section 48.`,

  "Unit 6: Limited Liability Partnerships (LLPs)": `<strong>UNIT 6: LIMITED LIABILITY PARTNERSHIPS (LLPS) (ICAI NOTES)</strong><br><br>• <strong>LLP Characteristics:</strong> Body corporate, legal entity separate from partners, limited liability, perpetual succession governed by LLP Act, 2008.`,

  "Annexure-II": `<strong>ANNEXURE-II: GARNER VS MURRAY RULE (ICAI NOTES)</strong><br><br>Deficiency of an insolvent partner's capital is borne by solvent partners in their CAPITAL RATIO (last agreed capitals before dissolution), while realization loss is brought in cash by solvent partners.`,

  "Unit 1: Introduction to Company Accounts": `<strong>UNIT 1: INTRODUCTION TO COMPANY ACCOUNTS (ICAI NOTES)</strong><br><br>• <strong>Share Capital Types:</strong> Authorised, Issued, Subscribed, Called-up, Paid-up Capital.<br>• <strong>Equity vs Preference Shares:</strong> Preference shares carry preferential rights to dividend payment and capital repayment on liquidation.`,

  "Unit 1: Introduction to Company Accounts & Issue of Shares": `<strong>UNIT 1: INTRODUCTION TO COMPANY ACCOUNTS & ISSUE OF SHARES (ICAI NOTES)</strong><br><br>• <strong>Issue of Shares:</strong> Shares issued at Par or Premium. Journal entries: Application -> Allotment -> Calls.<br>• <strong>Securities Premium (Sec 52):</strong> Can only be used for issuing fully paid bonus shares, writing off preliminary expenses/commission/issue expenses, or premium on redemption of preference shares/debentures.`,

  "Unit 2: Issue, Forfeiture and Re-Issue of Shares": `<strong>UNIT 2: ISSUE, FORFEITURE AND RE-ISSUE OF SHARES (ICAI NOTES)</strong><br><br>• <strong>Forfeiture of Shares:</strong> Shares forfeited for non-payment of calls. Share Capital A/c Dr. (Called-up amount) to Calls-in-Arrears A/c to Share Forfeiture A/c.<br>• <strong>Re-issue of Forfeited Shares:</strong> Discount on reissue debited to Share Forfeiture A/c. Net balance transferred to <strong>Capital Reserve</strong>.`,

  "Unit 2: Forfeiture and Re-issue of Shares": `<strong>UNIT 2: FORFEITURE AND RE-ISSUE OF SHARES (ICAI NOTES)</strong><br><br>• <strong>Forfeiture & Re-issue:</strong> Cancel share rights on default; discount on re-issue capped at forfeited amount; net profit transferred to Capital Reserve.`,

  "Unit 3: Issue of Debentures": `<strong>UNIT 3: ISSUE OF DEBENTURES (ICAI NOTES)</strong><br><br>• <strong>Debentures:</strong> Written instrument acknowledging debt issued under common seal.<br>• <strong>Types & Terms:</strong> Convertible/Non-convertible, Secured/Unsecured. Loss on issue of debentures written off over debenture tenure.`,

  "Unit 4: Accounting for Bonus Issue and Right Issue": `<strong>UNIT 4: ACCOUNTING FOR BONUS ISSUE AND RIGHT ISSUE (ICAI NOTES)</strong><br><br>• <strong>Bonus Shares (Sec 63):</strong> Capitalization of free reserves, Securities Premium, or Capital Redemption Reserve issued to existing shareholders free of cost.<br>• <strong>Right Issue (Sec 62):</strong> Pre-emptive offer of new shares to existing shareholders at a specified price.`,

  "Unit 5: Redemption of Preference Shares": `<strong>UNIT 5: REDEMPTION OF PREFERENCE SHARES (ICAI NOTES)</strong><br><br>• <strong>Conditions (Sec 55):</strong> Fully paid preference shares redeemed out of profits available for dividend or out of proceeds of a fresh issue of shares.<br>• <strong>Capital Redemption Reserve (CRR):</strong> Nominal value of shares redeemed out of profits transferred to CRR.`,

  "Unit 6: Redemption of Debentures": `<strong>UNIT 6: REDEMPTION OF DEBENTURES (ICAI NOTES)</strong><br><br>• <strong>Methods of Redemption:</strong> Payment in lump sum, drawings by lot, purchase in open market, or conversion into shares/new debentures.<br>• <strong>Debenture Redemption Reserve (DRR):</strong> Mandated reserve created out of profits.`
};

// Import seedData module dynamically
import { Foundation_May2026_Data, Foundation_May2027_Data } from '../js/seedData.js';

function enrichDataSet(data) {
  data.forEach(sub => {
    sub.chapters.forEach(ch => {
      if (ch.units && Array.isArray(ch.units)) {
        ch.units = ch.units.map((u, idx) => {
          const uName = typeof u === 'string' ? u : u.name;
          const pdfUrl = (typeof u === 'object' && u.url) ? u.url : (ch.pdfUrls && ch.pdfUrls[idx]) || (ch.pdfUrls && ch.pdfUrls[0]) || '';
          const existingNotes = (typeof u === 'object' && u.notes) ? u.notes : null;
          const mappedNotes = unitNotesMap[uName] || existingNotes || `<strong>${uName.toUpperCase()} NOTES</strong><br><br>Review the ICAI study module concepts and reference materials for ${uName}.`;
          
          return {
            name: uName,
            url: pdfUrl,
            notes: mappedNotes
          };
        });
      }
    });
  });
}

enrichDataSet(Foundation_May2026_Data);
enrichDataSet(Foundation_May2027_Data);

console.log('Enrichment complete in memory!');
