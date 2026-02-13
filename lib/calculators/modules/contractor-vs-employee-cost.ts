import { formatCurrency } from "@/lib/calculators/format";
import { asNumber } from "@/lib/calculators/helpers";
import type { CalculatorRunner } from "@/lib/calculators/types";

export const run: CalculatorRunner = (inputs) => {
  const baseComp = asNumber(inputs.baseComp, 0);
  const payrollBurdenPct = asNumber(inputs.payrollBurdenPct, 0) / 100;
  const benefitsPct = asNumber(inputs.benefitsPct, 0) / 100;
  const contractorMultiplier = asNumber(inputs.contractorMultiplier, 1);

  const employeeTotal = baseComp * (1 + payrollBurdenPct + benefitsPct);
  const contractorTotal = baseComp * contractorMultiplier;
  const difference = contractorTotal - employeeTotal;

  return {
    summary: [
      { label: "Estimated Employee Annual Cost", value: formatCurrency(employeeTotal) },
      { label: "Estimated Contractor Annual Cost", value: formatCurrency(contractorTotal) },
      { label: "Cost Difference", value: formatCurrency(difference) },
      { label: "Base Compensation", value: formatCurrency(baseComp) }
    ],
    narrative: [
      "Classification has legal and tax implications beyond cost comparisons.",
      "Use this estimate with policy, compliance, and workload considerations."
    ],
    chart: {
      type: "bar",
      xKey: "model",
      data: [
        { model: "Employee", amount: Math.round(employeeTotal) },
        { model: "Contractor", amount: Math.round(contractorTotal) }
      ],
      series: [{ key: "amount", name: "Annual Cost", color: "#0284c7" }]
    }
  };
};
