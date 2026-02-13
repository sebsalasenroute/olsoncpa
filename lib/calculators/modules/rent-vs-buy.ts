import { buildAmortizationSchedule } from "@/lib/calculators/math";
import { formatCurrency } from "@/lib/calculators/format";
import { asNumber } from "@/lib/calculators/helpers";
import type { CalculatorRunner } from "@/lib/calculators/types";

export const run: CalculatorRunner = (inputs) => {
  const monthlyRent = asNumber(inputs.monthlyRent, 0);
  const rentIncrease = asNumber(inputs.rentIncrease, 0) / 100;
  const homePrice = asNumber(inputs.homePrice, 0);
  const downPaymentPercent = asNumber(inputs.downPaymentPercent, 20);
  const mortgageRate = asNumber(inputs.mortgageRate, 5);
  const years = Math.max(1, asNumber(inputs.years, 10));
  const annualMaintenance = asNumber(inputs.annualMaintenance, 0);
  const annualPropertyTax = asNumber(inputs.annualPropertyTax, 0);
  const investmentReturn = asNumber(inputs.investmentReturn, 0) / 100;

  const downPayment = homePrice * (downPaymentPercent / 100);
  const principal = Math.max(0, homePrice - downPayment);

  const amortizationYears = Math.max(25, years);
  const amortization = buildAmortizationSchedule({
    principal,
    annualRatePercent: mortgageRate,
    amortizationYears
  });

  let totalRentCost = 0;
  for (let yearIndex = 0; yearIndex < years; yearIndex += 1) {
    const adjustedRent = monthlyRent * (1 + rentIncrease) ** yearIndex;
    totalRentCost += adjustedRent * 12;
  }

  const ownershipCashCost = amortization.payment * 12 * years + (annualMaintenance + annualPropertyTax) * years;

  const yearsElapsed = Math.min(years, amortization.yearly.length);
  const remainingBalance = amortization.yearly[yearsElapsed - 1]?.balance ?? principal;
  const estimatedEquity = Math.max(0, homePrice - remainingBalance);

  const investedDownPayment = downPayment * (1 + investmentReturn) ** years;
  const netRentPosition = investedDownPayment - totalRentCost;
  const netBuyPosition = estimatedEquity - ownershipCashCost;

  return {
    summary: [
      { label: "Total Rent Cost", value: formatCurrency(totalRentCost) },
      { label: "Total Ownership Cash Cost", value: formatCurrency(ownershipCashCost) },
      { label: "Estimated Home Equity", value: formatCurrency(estimatedEquity) },
      { label: "Net Difference (Buy - Rent)", value: formatCurrency(netBuyPosition - netRentPosition) }
    ],
    narrative: [
      "This model compares projected cash costs and estimated equity outcomes over your selected horizon.",
      "Transaction costs, renovations, and market value changes are excluded by default."
    ],
    chart: {
      type: "line",
      xKey: "year",
      data: Array.from({ length: years }).map((_, index) => {
        const year = index + 1;
        let rentCost = 0;
        for (let i = 0; i < year; i += 1) {
          rentCost += monthlyRent * (1 + rentIncrease) ** i * 12;
        }
        const ownCost = amortization.payment * 12 * year + (annualMaintenance + annualPropertyTax) * year;
        return {
          year: `Y${year}`,
          rentCost: Math.round(rentCost),
          ownCost: Math.round(ownCost)
        };
      }),
      series: [
        { key: "rentCost", name: "Rent Cost", color: "#64748b" },
        { key: "ownCost", name: "Ownership Cost", color: "#0ea5e9" }
      ]
    }
  };
};
