import { formatCurrency } from "@/lib/calculators/format";
import { asNumber } from "@/lib/calculators/helpers";
import type { CalculatorRunner } from "@/lib/calculators/types";

export const run: CalculatorRunner = (inputs) => {
  const annualProfit = asNumber(inputs.annualProfit, 0);
  const salaryDraw = asNumber(inputs.salaryDraw, 0);
  const corpTaxRate = asNumber(inputs.corpTaxRate, 12) / 100;
  const personalTaxRate = asNumber(inputs.personalTaxRate, 30) / 100;

  const solePropTax = annualProfit * personalTaxRate;
  const solePropNet = annualProfit - solePropTax;

  const corpTax = annualProfit * corpTaxRate;
  const retainedInCorp = annualProfit - corpTax - salaryDraw;
  const personalTaxOnDraw = salaryDraw * personalTaxRate;
  const ownerNetFromCorp = salaryDraw - personalTaxOnDraw;
  const totalCorpStructureNet = ownerNetFromCorp + retainedInCorp;

  return {
    summary: [
      { label: "Sole Prop Net (Estimate)", value: formatCurrency(solePropNet) },
      { label: "Incorporated Structure Net", value: formatCurrency(totalCorpStructureNet) },
      { label: "Retained Corporate Cash", value: formatCurrency(retainedInCorp) },
      { label: "Estimated Difference", value: formatCurrency(totalCorpStructureNet - solePropNet) }
    ],
    narrative: [
      "This is a high-level estimate and does not include complete integration, deductions, or legal considerations.",
      "Use this output as a planning discussion starter with your accountant."
    ],
    chart: {
      type: "bar",
      xKey: "scenario",
      data: [
        { scenario: "Sole Prop", net: Math.round(solePropNet) },
        { scenario: "Incorporated", net: Math.round(totalCorpStructureNet) }
      ],
      series: [{ key: "net", name: "Estimated Net", color: "#0284c7" }]
    }
  };
};
