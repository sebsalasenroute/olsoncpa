import { formatCurrency, formatPercent } from "@/lib/calculators/format";
import { asNumber } from "@/lib/calculators/helpers";
import type { CalculatorRunner } from "@/lib/calculators/types";

export const run: CalculatorRunner = (inputs) => {
  const cash = asNumber(inputs.cash, 0);
  const investments = asNumber(inputs.investments, 0);
  const property = asNumber(inputs.property, 0);
  const mortgage = asNumber(inputs.mortgage, 0);
  const loans = asNumber(inputs.loans, 0);
  const credit = asNumber(inputs.credit, 0);

  const assets = cash + investments + property;
  const liabilities = mortgage + loans + credit;
  const netWorth = assets - liabilities;
  const leverage = assets === 0 ? 0 : liabilities / assets;

  return {
    summary: [
      { label: "Total Assets", value: formatCurrency(assets) },
      { label: "Total Liabilities", value: formatCurrency(liabilities) },
      { label: "Net Worth", value: formatCurrency(netWorth) },
      { label: "Leverage Ratio", value: formatPercent(leverage) }
    ],
    narrative: [
      "A periodic net-worth snapshot helps track long-term financial progress.",
      "High leverage can indicate debt-management priorities."
    ],
    chart: {
      type: "bar",
      xKey: "name",
      data: [
        { name: "Cash", value: Math.round(cash) },
        { name: "Investments", value: Math.round(investments) },
        { name: "Property", value: Math.round(property) },
        { name: "Liabilities", value: Math.round(liabilities) }
      ],
      series: [{ key: "value", name: "Amount", color: "#0ea5e9" }]
    }
  };
};
