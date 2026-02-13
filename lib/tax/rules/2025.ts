import type { TaxYearRules } from "@/lib/tax/types";

// Placeholder framework values only. Replace with confirmed CRA and BC data per year.
export const taxRules2025: TaxYearRules = {
  year: 2025,
  status: "placeholder",
  federal: {
    basicPersonalAmount: 15705,
    brackets: [
      { upTo: 55867, rate: 0.15 },
      { upTo: 111733, rate: 0.205 },
      { upTo: 173205, rate: 0.26 },
      { upTo: 246752, rate: 0.29 },
      { upTo: null, rate: 0.33 }
    ]
  },
  bc: {
    basicPersonalAmount: 12580,
    brackets: [
      { upTo: 47937, rate: 0.0506 },
      { upTo: 95875, rate: 0.077 },
      { upTo: 110076, rate: 0.105 },
      { upTo: 133664, rate: 0.1229 },
      { upTo: 181232, rate: 0.147 },
      { upTo: 252752, rate: 0.168 },
      { upTo: null, rate: 0.205 }
    ]
  },
  metadata: {
    notes:
      "Placeholder estimates. Confirm official CRA and BC Ministry of Finance rates, thresholds, and credits before claiming compliance.",
    sourceUrl: "https://www.canada.ca/",
    updatedAt: "2025-01-01"
  }
};
