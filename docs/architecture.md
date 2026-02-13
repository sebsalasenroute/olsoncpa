# MVP Architecture

## Pipeline

Client -> Engagement -> Document Upload -> Extraction -> Normalized Transactions -> AI Suggestion -> Review Queue -> Approved Export

Exports include CSV and XLSX outputs with category totals.

## AI Layers

- Layer 1 (Extraction): produces structured transaction rows only (parsed rows or scanned PDF OCR output via AWS Textract or Google Document AI)
- Layer 2 (Classification): category suggestion + confidence + explanation + tax notes

## Cost & Risk Controls

- No full-document LLM prompts
- No auto-finalization
- Monthly engagement budget cap (soft stop to `UNCATEGORIZED`)
- Vendor rule cache first; heuristics second
- Approved transactions are not reclassified

## Data Integrity

- Source traceability: each transaction links back to `sourceDocumentId`
- Auditability: before/after logs on create/edit/split/approve/export
- Deduplication: unique normalized hash per engagement

## Extensibility

- Swap extraction providers without API changes
- Swap classification providers without schema changes
- OCR providers currently integrate AWS Textract and Google Document AI behind the same interface
- Replace storage backend behind `StorageProvider`
