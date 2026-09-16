# CA Intermediate – PDF Files Guide

Place all CA **Intermediate** level PDF papers in the appropriate subfolder below.

---

## 📁 Folder Structure

```
pdfs/
└── intermediate/
    ├── pyq/                    ← Previous Year Question Papers
    │   └── answers/            ← Answer/Solution PDFs
    ├── rtpmtp/
    │   ├── rtp/                ← Revision Test Papers
    │   │   └── answers/
    │   └── mtp/                ← Mock Test Papers
    │       └── answers/
    └── README.md               ← This file
```

---

## 📄 Naming Convention

Use consistent naming so the app can auto-detect files. Recommended format:

### PYQ Files (`pyq/` folder)
```
[MONTH] [YEAR]_[SUBJECT]_PYQ.pdf

Examples:
  MAY 25_ADVANCED ACCOUNTING_PYQ.pdf
  JAN 26_CORPORATE LAW_PYQ.pdf
  SEP 25_INCOME TAX_PYQ.pdf
  MAY 26_GST_PYQ.pdf
  JAN 25_COST ACCOUNTING_PYQ.pdf
  MAY 25_AUDITING_PYQ.pdf
  SEP 25_FINANCIAL MANAGEMENT_PYQ.pdf
  JAN 26_STRATEGIC MANAGEMENT_PYQ.pdf
```

### RTP Files (`rtpmtp/rtp/` folder)
```
[MONTH] [YEAR]_[SUBJECT]_RTP.pdf

Examples:
  MAY 25_ADVANCED ACCOUNTING_RTP.pdf
  JAN 26_CORPORATE LAW_RTP.pdf
```

### MTP Files (`rtpmtp/mtp/` folder)
```
[SUBJECT]_MTP [NUMBER].pdf

Examples:
  Advanced Accounting_MTP 1.pdf
  Corporate Law_MTP 1.pdf
  Income Tax_MTP 1.pdf
  GST_MTP 1.pdf
  Cost Accounting_MTP 1.pdf
  Auditing_MTP 1.pdf
  Financial Management_MTP 1.pdf
  Strategic Management_MTP 1.pdf
```

---

## 📚 CA Intermediate Subjects

| Paper | Subject |
|-------|---------|
| Paper 1 | Advanced Accounting |
| Paper 2 | Corporate and Other Laws |
| Paper 3A | Income-tax Law |
| Paper 3B | Goods and Services Tax (GST) |
| Paper 4 | Cost and Management Accounting |
| Paper 5 | Auditing and Ethics |
| Paper 6A | Financial Management |
| Paper 6B | Strategic Management |

---

> After adding PDFs, update `js/seedData.js` → `MOCK_PAPERS` section to register the new file paths.
