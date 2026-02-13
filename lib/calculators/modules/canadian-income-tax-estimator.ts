import { formatCurrency, formatPercent } from "@/lib/calculators/format";
import { asNumber, asString } from "@/lib/calculators/helpers";
import type { CalculatorRunner } from "@/lib/calculators/types";
import { computeCanadianBcIncomeTax } from "@/lib/tax/engine";

export const run: CalculatorRunner = (inputs) => {
  const year = Number(asString(inputs.year, "2026"));
  const income = asNumber(inputs.income, 0);
  const rrspContribution = asNumber(inputs.rrspContribution, 0);
  const otherDeductions = asNumber(inputs.otherDeductions, 0);

  const result = computeCanadianBcIncomeTax({
    year,
    grossIncome: income,
    rrspContribution,
    otherDeductions
  });

  return {
    summary: [
      { label: "Estimated Total Tax", value: formatCurrency(result.totalTax) },
      { label: "Estimated Net Income", value: formatCurrency(result.netIncome) },
      { label: "Taxable Income", value: formatCurrency(result.taxableIncome) },
      { label: "Marginal Rate", value: formatPercent(result.marginalRate) },
      { label: "Average Tax Rate", value: formatPercent(result.averageRate) }
    ],
    narrative: [
      `Federal estimate: ${formatCurrency(result.federalTax)} and BC estimate: ${formatCurrency(result.bcTax)}.`,
      "Review results against official CRA/BC data before using for filing or remittance decisions."
    ],
    warnings: result.warnings,
    chart: {
      type: "bar",
      xKey: "name",
      data: [
        { name: "Federal", amount: Math.round(result.federalTax) },
        { name: "BC", amount: Math.round(result.bcTax) },
        { name: "Net Income", amount: Math.round(result.netIncome) }
      ],
      series: [{ key: "amount", name: "Amount", color: "#0ea5e9" }]
    }
  };
};
