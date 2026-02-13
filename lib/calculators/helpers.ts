import { defaultMonthGrid, monthKeys, monthLabels } from "@/lib/calculators/constants";
import type { CalculatorInputValue, MonthGridValue } from "@/lib/calculators/types";

export function asNumber(value: CalculatorInputValue, fallback = 0) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : fallback;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
}

export function asString(value: CalculatorInputValue, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export function asBoolean(value: CalculatorInputValue, fallback = false) {
  return typeof value === "boolean" ? value : fallback;
}

export function asMonthGrid(value: CalculatorInputValue): MonthGridValue {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return defaultMonthGrid(0);
  }

  return monthKeys.reduce<Record<string, number>>((acc, key) => {
    const parsed = Number((value as Record<string, unknown>)[key] ?? 0);
    acc[key] = Number.isFinite(parsed) ? parsed : 0;
    return acc;
  }, {});
}

export function monthGridToRows(args: {
  revenueGrid: MonthGridValue;
  expenseGrid: MonthGridValue;
  openingCash: number;
}) {
  let runningCash = args.openingCash;

  return monthKeys.map((key, index) => {
    const revenue = Number(args.revenueGrid[key] ?? 0);
    const expense = Number(args.expenseGrid[key] ?? 0);
    const net = revenue - expense;
    runningCash += net;

    return {
      month: monthLabels[index],
      revenue,
      expense,
      net,
      cash: runningCash
    };
  });
}
