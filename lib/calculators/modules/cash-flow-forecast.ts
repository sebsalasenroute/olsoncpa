import { formatCurrency } from "@/lib/calculators/format";
import { asMonthGrid, asNumber, monthGridToRows } from "@/lib/calculators/helpers";
import type { CalculatorRunner } from "@/lib/calculators/types";

export const run: CalculatorRunner = (inputs) => {
  const openingCash = asNumber(inputs.openingCash, 0);
  const monthlyRevenue = asMonthGrid(inputs.monthlyRevenue);
  const monthlyExpenses = asMonthGrid(inputs.monthlyExpenses);

  const rows = monthGridToRows({
    revenueGrid: monthlyRevenue,
    expenseGrid: monthlyExpenses,
    openingCash
  });

  const totalRevenue = rows.reduce((sum, row) => sum + row.revenue, 0);
  const totalExpenses = rows.reduce((sum, row) => sum + row.expense, 0);
  const endingCash = rows[rows.length - 1]?.cash ?? openingCash;

  return {
    summary: [
      { label: "Opening Cash", value: formatCurrency(openingCash) },
      { label: "12-Month Revenue", value: formatCurrency(totalRevenue) },
      { label: "12-Month Expenses", value: formatCurrency(totalExpenses) },
      { label: "Projected Ending Cash", value: formatCurrency(endingCash) }
    ],
    narrative: [
      "Monthly cash view helps identify pressure months before they become operational risk.",
      "Update this forecast after each period close for better decision quality."
    ],
    chart: {
      type: "line",
      xKey: "month",
      data: rows.map((row) => ({
        month: row.month,
        cash: Math.round(row.cash),
        net: Math.round(row.net)
      })),
      series: [
        { key: "cash", name: "Ending Cash", color: "#0284c7" },
        { key: "net", name: "Monthly Net", color: "#334155" }
      ]
    }
  };
};
