import { formatCurrency } from "@/lib/calculators/format";
import { asNumber } from "@/lib/calculators/helpers";
import type { CalculatorRunner } from "@/lib/calculators/types";

export const run: CalculatorRunner = (inputs) => {
  const startingRoom = asNumber(inputs.startingRoom, 0);
  const yearlyLimit = asNumber(inputs.yearlyLimit, 0);
  const contributionsThisYear = asNumber(inputs.contributionsThisYear, 0);
  const withdrawalsThisYear = asNumber(inputs.withdrawalsThisYear, 0);

  const currentEstimatedRoom = Math.max(0, startingRoom + yearlyLimit - contributionsThisYear);
  const nextYearRecontributionCapacity = Math.max(0, withdrawalsThisYear);

  return {
    summary: [
      { label: "Estimated Remaining Room", value: formatCurrency(currentEstimatedRoom) },
      { label: "Current-Year Contributions", value: formatCurrency(contributionsThisYear) },
      { label: "Current-Year Withdrawals", value: formatCurrency(withdrawalsThisYear) },
      {
        label: "Potential Next-Year Recontribution",
        value: formatCurrency(nextYearRecontributionCapacity)
      }
    ],
    narrative: [
      "This tracker is intentionally simple and should be validated with CRA contribution-room records.",
      "Withdrawals are shown as potential recontribution room for the next calendar year."
    ],
    warnings: ["Estimate only. Confirm exact TFSA room directly with CRA records."],
    chart: {
      type: "bar",
      xKey: "name",
      data: [
        { name: "Starting Room", amount: Math.round(startingRoom) },
        { name: "This Year Limit", amount: Math.round(yearlyLimit) },
        { name: "Remaining", amount: Math.round(currentEstimatedRoom) }
      ],
      series: [{ key: "amount", name: "Amount", color: "#0284c7" }]
    }
  };
};
