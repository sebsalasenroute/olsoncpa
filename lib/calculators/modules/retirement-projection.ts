import { formatCurrency } from "@/lib/calculators/format";
import { asBoolean, asNumber } from "@/lib/calculators/helpers";
import { futureValueProjection } from "@/lib/calculators/math";
import type { CalculatorRunner } from "@/lib/calculators/types";

export const run: CalculatorRunner = (inputs) => {
  const currentAge = asNumber(inputs.currentAge, 35);
  const retirementAge = asNumber(inputs.retirementAge, 65);
  const currentSavings = asNumber(inputs.currentSavings, 0);
  const monthlyContribution = asNumber(inputs.monthlyContribution, 0);
  const annualReturn = asNumber(inputs.annualReturn, 5);
  const inflationRate = asNumber(inputs.inflationRate, 2);
  const adjustForInflation = asBoolean(inputs.adjustForInflation, true);

  const years = Math.max(1, retirementAge - currentAge);
  const projection = futureValueProjection({
    initial: currentSavings,
    monthlyContribution,
    annualReturnPercent: annualReturn,
    years
  });

  const inflationFactor = (1 + inflationRate / 100) ** years;
  const inflationAdjustedBalance = projection.finalBalance / inflationFactor;

  return {
    summary: [
      { label: "Projected Balance at Retirement", value: formatCurrency(projection.finalBalance) },
      {
        label: "Inflation-Adjusted Value",
        value: formatCurrency(adjustForInflation ? inflationAdjustedBalance : projection.finalBalance)
      },
      { label: "Projection Length", value: `${years} years` },
      { label: "Monthly Contribution", value: formatCurrency(monthlyContribution) }
    ],
    narrative: [
      "Projection assumes constant contribution and return rates throughout the timeline.",
      "Use conservative ranges and compare multiple scenarios before making decisions."
    ],
    chart: {
      type: "line",
      xKey: "year",
      data: projection.byYear.map((item, index) => {
        const year = index + 1;
        const adjusted = item.balance / (1 + inflationRate / 100) ** year;
        return {
          year: `Y${year}`,
          nominal: Math.round(item.balance),
          adjusted: Math.round(adjusted)
        };
      }),
      series: [
        { key: "nominal", name: "Nominal", color: "#0284c7" },
        { key: "adjusted", name: "Inflation-Adjusted", color: "#334155" }
      ]
    }
  };
};
