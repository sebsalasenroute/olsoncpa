import type { TaxYearRules } from "@/lib/tax/types";

// Placeholder framework values only. Replace with confirmed CRA and BC data per year.
export const taxRules2026: TaxYearRules = {
  year: 2026,
  status: "placeholder",
  federal: {
    basicPersonalAmount: 15705,
    brackets: [
      { upTo: 57375, rate: 0.15 },
      { upTo: 114750, rate: 0.205 },
      { upTo: 177882, rate: 0.26 },
      { upTo: 253414, rate: 0.29 },
      { upTo: null, rate: 0.33 }
    ]
  },
  bc: {
    basicPersonalAmount: 12580,
    brackets: [
      { upTo: 49279, rate: 0.0506 },
      { upTo: 98560, rate: 0.077 },
      { upTo: 113158, rate: 0.105 },
      { upTo: 137407, rate: 0.1229 },
      { upTo: 186306, rate: 0.147 },
      { upTo: 259829, rate: 0.168 },
      { upTo: null, rate: 0.205 }
    ]
  },
  metadata: {
    notes:
      "Placeholder estimates. Confirm official CRA and BC Ministry of Finance rates, thresholds, and credits before claiming compliance.",
    sourceUrl: "https://www.canada.ca/",
    updatedAt: "2026-01-01"
  }
};
