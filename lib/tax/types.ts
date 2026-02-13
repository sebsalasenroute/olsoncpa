export type TaxBracket = {
  upTo: number | null;
  rate: number;
};

export type TaxYearRules = {
  year: number;
  status: "placeholder" | "verified";
  federal: {
    brackets: TaxBracket[];
    basicPersonalAmount: number;
  };
  bc: {
    brackets: TaxBracket[];
    basicPersonalAmount: number;
  };
  metadata: {
    notes: string;
    sourceUrl?: string;
    updatedAt?: string;
  };
};

export type TaxComputationInput = {
  year: number;
  grossIncome: number;
  rrspContribution: number;
  otherDeductions: number;
};

export type TaxComputationResult = {
  year: number;
  taxableIncome: number;
  federalTax: number;
  bcTax: number;
  totalTax: number;
  netIncome: number;
  marginalRate: number;
  averageRate: number;
  warnings: string[];
};
