import { formatCurrency, formatPercent } from "@/lib/calculators/format";
import { asNumber } from "@/lib/calculators/helpers";
import type { CalculatorRunner } from "@/lib/calculators/types";

export const run: CalculatorRunner = (inputs) => {
  const cost = asNumber(inputs.cost, 0);
  const price = asNumber(inputs.price, 0);

  const grossProfit = price - cost;
  const margin = price <= 0 ? 0 : grossProfit / price;
  const markup = cost <= 0 ? 0 : grossProfit / cost;

  return {
    summary: [
      { label: "Gross Profit per Unit", value: formatCurrency(grossProfit) },
      { label: "Gross Margin", value: formatPercent(margin) },
      { label: "Markup", value: formatPercent(markup) },
      { label: "Price/Cost Ratio", value: `${(cost === 0 ? 0 : price / cost).toFixed(2)}x` }
    ],
    narrative: [
      "Margin and markup are both useful, but answer different profitability questions.",
      "Track both metrics for better pricing and purchasing decisions."
    ],
    chart: {
      type: "bar",
      xKey: "name",
      data: [
        { name: "Cost", value: Math.round(cost) },
        { name: "Price", value: Math.round(price) },
        { name: "Profit", value: Math.round(grossProfit) }
      ],
      series: [{ key: "value", name: "Amount", color: "#0ea5e9" }]
    }
  };
};
