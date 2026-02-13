import { describe, expect, it } from "vitest";
import { calculateBracketTax, computeCanadianBcIncomeTax } from "@/lib/tax/engine";

describe("tax bracket engine", () => {
  it("calculates progressive bracket tax correctly", () => {
    const tax = calculateBracketTax(60000, [
      { upTo: 10000, rate: 0.1 },
      { upTo: 50000, rate: 0.2 },
      { upTo: null, rate: 0.3 }
    ]);

    expect(Math.round(tax)).toBe(12000);
  });

  it("returns warnings when tax-year data is placeholder", () => {
    const result = computeCanadianBcIncomeTax({
      year: 2026,
      grossIncome: 95000,
      rrspContribution: 5000,
      otherDeductions: 0
    });

    expect(result.totalTax).toBeGreaterThan(0);
    expect(result.warnings.some((warning) => warning.toLowerCase().includes("placeholder"))).toBe(true);
  });

  it("returns missing-data warning when year module does not exist", () => {
    const result = computeCanadianBcIncomeTax({
      year: 2030,
      grossIncome: 90000,
      rrspContribution: 0,
      otherDeductions: 0
    });

    expect(result.totalTax).toBe(0);
    expect(result.warnings[0].toLowerCase()).toContain("tax data missing");
  });
});
