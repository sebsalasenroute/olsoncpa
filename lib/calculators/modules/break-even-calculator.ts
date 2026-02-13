import { formatCurrency, formatNumber } from "@/lib/calculators/format";
import { asNumber } from "@/lib/calculators/helpers";
import { breakEvenUnits } from "@/lib/calculators/math";
import type { CalculatorRunner } from "@/lib/calculators/types";

export const run: CalculatorRunner = (inputs) => {
  const fixedCosts = asNumber(inputs.fixedCosts, 0);
  const pricePerUnit = asNumber(inputs.pricePerUnit, 0);
  const variableCostPerUnit = asNumber(inputs.variableCostPerUnit, 0);
  const targetProfit = asNumber(inputs.targetProfit, 0);

  const units = breakEvenUnits(fixedCosts, pricePerUnit, variableCostPerUnit);
  const targetUnits = breakEvenUnits(fixedCosts + targetProfit, pricePerUnit, variableCostPerUnit);
  const contribution = pricePerUnit - variableCostPerUnit;

  const warnings: string[] = [];
  if (!Number.isFinite(units)) {
    warnings.push("Contribution margin is zero or negative. Increase price or reduce variable cost.");
  }

  return {
    summary: [
      { label: "Break-even Units", value: Number.isFinite(units) ? formatNumber(Math.ceil(units)) : "N/A" },
      {
        label: "Break-even Revenue",
        value: Number.isFinite(units) ? formatCurrency(Math.ceil(units) * pricePerUnit) : "N/A"
      },
      {
        label: "Units for Target Profit",
        value: Number.isFinite(targetUnits) ? formatNumber(Math.ceil(targetUnits)) : "N/A"
      },
      { label: "Contribution per Unit", value: formatCurrency(contribution) }
    ],
    narrative: [
      "Break-even analysis is sensitive to pricing and variable cost assumptions.",
      "Revisit this model whenever costs or pricing strategy change."
    ],
    warnings,
    chart: {
      type: "line",
      xKey: "units",
      data: Array.from({ length: 8 }, (_, index) => {
        const unitCount = Math.max(1, Math.ceil((units || 100) * ((index + 1) / 4)));
        const revenue = unitCount * pricePerUnit;
        const cost = fixedCosts + unitCount * variableCostPerUnit;
        return {
          units: formatNumber(unitCount),
          revenue: Math.round(revenue),
          cost: Math.round(cost)
        };
      }),
      series: [
        { key: "revenue", name: "Revenue", color: "#0284c7" },
        { key: "cost", name: "Total Cost", color: "#64748b" }
      ]
    }
  };
};
