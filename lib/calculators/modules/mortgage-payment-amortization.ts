import { buildAmortizationSchedule } from "@/lib/calculators/math";
import { formatCurrency } from "@/lib/calculators/format";
import { asNumber } from "@/lib/calculators/helpers";
import type { CalculatorRunner } from "@/lib/calculators/types";

export const run: CalculatorRunner = (inputs) => {
  const homePrice = asNumber(inputs.homePrice, 0);
  const downPaymentPercent = asNumber(inputs.downPaymentPercent, 20);
  const interestRate = asNumber(inputs.interestRate, 5);
  const amortizationYears = asNumber(inputs.amortizationYears, 25);

  const downPayment = homePrice * (downPaymentPercent / 100);
  const principal = Math.max(0, homePrice - downPayment);

  const amortization = buildAmortizationSchedule({
    principal,
    annualRatePercent: interestRate,
    amortizationYears
  });

  return {
    summary: [
      { label: "Estimated Monthly Payment", value: formatCurrency(amortization.payment) },
      { label: "Mortgage Principal", value: formatCurrency(principal) },
      { label: "Total Interest", value: formatCurrency(amortization.totalInterest) },
      { label: "Total Paid", value: formatCurrency(amortization.totalPaid) }
    ],
    narrative: [
      "Payment assumes a fixed interest rate across the full amortization period.",
      "Use this estimate for planning; lender qualification and terms can differ."
    ],
    chart: {
      type: "line",
      xKey: "year",
      data: amortization.yearly.map((item) => ({
        year: item.year,
        balance: Math.round(item.balance),
        interestPaid: Math.round(item.interestPaid)
      })),
      series: [
        { key: "balance", name: "Remaining Balance", color: "#0ea5e9" },
        { key: "interestPaid", name: "Yearly Interest", color: "#64748b" }
      ]
    }
  };
};
