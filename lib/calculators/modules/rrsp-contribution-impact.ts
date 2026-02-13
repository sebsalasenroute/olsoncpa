import { formatCurrency } from "@/lib/calculators/format";
import { asNumber, asString } from "@/lib/calculators/helpers";
import type { CalculatorRunner } from "@/lib/calculators/types";
import { computeCanadianBcIncomeTax } from "@/lib/tax/engine";

export const run: CalculatorRunner = (inputs) => {
  const year = Number(asString(inputs.year, "2026"));
  const income = asNumber(inputs.income, 0);
  const rrspContribution = asNumber(inputs.rrspContribution, 0);

  const noContribution = computeCanadianBcIncomeTax({
    year,
    grossIncome: income,
    rrspContribution: 0,
    otherDeductions: 0
  });

  const withContribution = computeCanadianBcIncomeTax({
    year,
    grossIncome: income,
    rrspContribution,
    otherDeductions: 0
  });

  const savings = noContribution.totalTax - withContribution.totalTax;

  return {
    summary: [
      { label: "Estimated Tax Savings", value: formatCurrency(savings) },
      { label: "Tax Without RRSP", value: formatCurrency(noContribution.totalTax) },
      { label: "Tax With RRSP", value: formatCurrency(withContribution.totalTax) },
      { label: "Contribution Amount", value: formatCurrency(rrspContribution) }
    ],
    narrative: [
      "Tax savings are estimated by running two scenarios with the same income assumptions.",
      "Validate RRSP contribution room and deduction timing with CRA records."
    ],
    warnings: withContribution.warnings,
    chart: {
      type: "bar",
      xKey: "scenario",
      data: [
        { scenario: "No RRSP", tax: Math.round(noContribution.totalTax) },
        { scenario: "With RRSP", tax: Math.round(withContribution.totalTax) }
      ],
      series: [{ key: "tax", name: "Estimated Tax", color: "#0369a1" }]
    }
  };
};
