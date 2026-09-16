import fs from 'fs';

// Read seedData.js content
let content = fs.readFileSync('./js/seedData.js', 'utf8');

// We will inspect all IDs to be removed:
const idsToRemove = [
  'f27_acc_m1_ip', 'f27_acc_m2_ip', 'f27_law_ip', 'f27_qa_ip', 'f27_eco_ip',
  'i27_acc_m1_ip', 'i27_acc_m2_ip', 'i27_acc_m3_ip',
  'i27_law_m1_ip', 'i27_law_m2_ip', 'i27_law_m3_ip',
  'i27_taxa_m1_ip', 'i27_taxa_sec12_ans', 'i27_taxa_m2_ip', 'i27_taxa_sec345_ans',
  'i27_gst_m1_ip', 'i27_gst_m1_ans', 'i27_gst_m2_ip', 'i27_gst_m2_ans',
  'i27_cma_m1_ip', 'i27_cma_m2_ip',
  'i27_audit_m1_ip', 'i27_audit_m2_ip',
  'i27_sm_ip'
];

console.log('Total items to remove:', idsToRemove.length);
console.log('IDs:', idsToRemove);
