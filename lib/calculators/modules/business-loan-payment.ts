import { formatCurrency } from "@/lib/calculators/format";
import { asNumber } from "@/lib/calculators/helpers";
import { annualizeMonthlyValue, mortgagePayment } from "@/lib/calculators/math";
import type { CalculatorRunner } from "@/lib/calculators/types";

export const run: CalculatorRunner = (inputs) => {
  const principal = asNumber(inputs.principal, 0);
  const rate = asNumber(inputs.rate, 0);
  const termYears = asNumber(inputs.termYears, 1);

  const payment = mortgagePayment(principal, rate, termYears);
  const totalPaid = payment * termYears * 12;
  const totalInterest = totalPaid - principal;

  return {
    summary: [
      { label: "Estimated Monthly Payment", value: formatCurrency(payment) },
      { label: "Annual Debt Service", value: formatCurrency(annualizeMonthlyValue(payment)) },
      { label: "Total Interest", value: formatCurrency(totalInterest) },
      { label: "Total Paid", value: formatCurrency(totalPaid) }
    ],
    narrative: [
      "Use this estimate to understand payment pressure before committing to financing.",
      "Model multiple terms and rates to test resilience."
    ],
    chart: {
      type: "bar",
      xKey: "name",
      data: [
        { name: "Principal", amount: Math.round(principal) },
        { name: "Interest", amount: Math.round(totalInterest) }
      ],
      series: [{ key: "amount", name: "Amount", color: "#0ea5e9" }]
    }
  };
};
