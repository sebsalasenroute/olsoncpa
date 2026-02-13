import { formatCurrency, formatNumber } from "@/lib/calculators/format";
import { asNumber, asString } from "@/lib/calculators/helpers";
import { debtPayoffSchedule } from "@/lib/calculators/math";
import type { CalculatorRunner } from "@/lib/calculators/types";

export const run: CalculatorRunner = (inputs) => {
  const debtA = asNumber(inputs.debtA, 0);
  const debtAApr = asNumber(inputs.debtAApr, 0);
  const debtAMin = asNumber(inputs.debtAMin, 0);
  const debtB = asNumber(inputs.debtB, 0);
  const debtBApr = asNumber(inputs.debtBApr, 0);
  const debtBMin = asNumber(inputs.debtBMin, 0);
  const monthlyBudget = asNumber(inputs.monthlyBudget, debtAMin + debtBMin);
  const method = asString(inputs.method, "avalanche") as "avalanche" | "snowball";

  const schedule = debtPayoffSchedule({
    debts: [
      { name: "Debt A", balance: debtA, apr: debtAApr, minimumPayment: debtAMin },
      { name: "Debt B", balance: debtB, apr: debtBApr, minimumPayment: debtBMin }
    ],
    monthlyBudget,
    method
  });

  const initialBalance = debtA + debtB;
  const endingBalance = schedule.history[schedule.history.length - 1]?.totalBalance ?? 0;

  return {
    summary: [
      { label: "Months to Debt Free (Estimate)", value: formatNumber(schedule.monthsToDebtFree) },
      { label: "Starting Balance", value: formatCurrency(initialBalance) },
      { label: "Ending Balance", value: formatCurrency(endingBalance) },
      { label: "Method", value: method === "avalanche" ? "Avalanche" : "Snowball" }
    ],
    narrative: [
      "Avalanche prioritizes highest interest, while snowball prioritizes smallest balance.",
      "Real payoff timing will vary with changing rates, fees, and payment behaviour."
    ],
    chart: {
      type: "line",
      xKey: "month",
      data: schedule.history.map((point) => ({
        month: point.month,
        balance: Math.round(point.totalBalance)
      })),
      series: [{ key: "balance", name: "Total Balance", color: "#0284c7" }]
    }
  };
};
