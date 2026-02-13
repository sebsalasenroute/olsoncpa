import { formatCurrency, formatPercent } from "@/lib/calculators/format";
import { asNumber } from "@/lib/calculators/helpers";
import { gstRemittance } from "@/lib/calculators/math";
import type { CalculatorRunner } from "@/lib/calculators/types";

export const run: CalculatorRunner = (inputs) => {
  const taxableSales = asNumber(inputs.taxableSales, 0);
  const taxableExpenses = asNumber(inputs.taxableExpenses, 0);
  const rate = asNumber(inputs.rate, 5) / 100;

  const result = gstRemittance(taxableSales, taxableExpenses, rate);

  return {
    summary: [
      { label: "GST/HST Collected", value: formatCurrency(result.collected) },
      { label: "Estimated ITCs", value: formatCurrency(result.itc) },
      { label: "Net Remittance", value: formatCurrency(result.remittance) },
      { label: "Rate Used", value: formatPercent(rate) }
    ],
    narrative: [
      "Use this estimate to plan remittance cash impact before filing.",
      "Special supplies, zero-rated items, and exemptions require transaction-level review."
    ],
    chart: {
      type: "bar",
      xKey: "name",
      data: [
        { name: "Collected", amount: Math.round(result.collected) },
        { name: "ITCs", amount: Math.round(result.itc) },
        { name: "Remittance", amount: Math.round(result.remittance) }
      ],
      series: [{ key: "amount", name: "Amount", color: "#0369a1" }]
    }
  };
};
