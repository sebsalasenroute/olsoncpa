import { formatCurrency } from "@/lib/calculators/format";
import { asNumber, asString } from "@/lib/calculators/helpers";
import type { CalculatorRunner } from "@/lib/calculators/types";

function periodsPerYear(frequency: string) {
  if (frequency === "monthly") {
    return 12;
  }
  if (frequency === "semimonthly") {
    return 24;
  }
  return 26;
}

export const run: CalculatorRunner = (inputs) => {
  const grossPay = asNumber(inputs.grossPay, 0);
  const payFrequency = asString(inputs.payFrequency, "biweekly");
  const cppRate = asNumber(inputs.cppRate, 5.95) / 100;
  const eiRate = asNumber(inputs.eiRate, 1.66) / 100;
  const taxWithholdingRate = asNumber(inputs.taxWithholdingRate, 18) / 100;

  const cpp = grossPay * cppRate;
  const ei = grossPay * eiRate;
  const tax = grossPay * taxWithholdingRate;
  const netPay = grossPay - cpp - ei - tax;

  const annualizedNet = netPay * periodsPerYear(payFrequency);

  return {
    summary: [
      { label: "Estimated Net Pay", value: formatCurrency(netPay) },
      { label: "CPP Deduction", value: formatCurrency(cpp) },
      { label: "EI Deduction", value: formatCurrency(ei) },
      { label: "Tax Withholding", value: formatCurrency(tax) },
      { label: "Estimated Annual Net", value: formatCurrency(annualizedNet) }
    ],
    narrative: [
      "Payroll results are placeholder estimates until official rates, limits, and formulas are configured by year.",
      "Do not use this output for finalized payroll processing."
    ],
    warnings: [
      "Tax data missing: payroll tables and limits are placeholders.",
      "Estimate only. Confirm all payroll calculations using current CRA payroll resources."
    ],
    chart: {
      type: "bar",
      xKey: "name",
      data: [
        { name: "Gross", amount: Math.round(grossPay) },
        { name: "Deductions", amount: Math.round(cpp + ei + tax) },
        { name: "Net", amount: Math.round(netPay) }
      ],
      series: [{ key: "amount", name: "Amount", color: "#0284c7" }]
    }
  };
};
