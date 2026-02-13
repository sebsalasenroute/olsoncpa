import type { CalculatorRunner } from "@/lib/calculators/types";

const runnerLoaders = {
  "canadian-income-tax-estimator": () => import("@/lib/calculators/modules/canadian-income-tax-estimator"),
  "rrsp-contribution-impact": () => import("@/lib/calculators/modules/rrsp-contribution-impact"),
  "tfsa-tracker": () => import("@/lib/calculators/modules/tfsa-tracker"),
  "mortgage-payment-amortization": () => import("@/lib/calculators/modules/mortgage-payment-amortization"),
  "rent-vs-buy": () => import("@/lib/calculators/modules/rent-vs-buy"),
  "debt-payoff-planner": () => import("@/lib/calculators/modules/debt-payoff-planner"),
  "retirement-projection": () => import("@/lib/calculators/modules/retirement-projection"),
  "net-worth-snapshot": () => import("@/lib/calculators/modules/net-worth-snapshot"),
  "incorporation-vs-sole-prop": () => import("@/lib/calculators/modules/incorporation-vs-sole-prop"),
  "gst-hst-calculator": () => import("@/lib/calculators/modules/gst-hst-calculator"),
  "payroll-gross-to-net": () => import("@/lib/calculators/modules/payroll-gross-to-net"),
  "business-loan-payment": () => import("@/lib/calculators/modules/business-loan-payment"),
  "break-even-calculator": () => import("@/lib/calculators/modules/break-even-calculator"),
  "cash-flow-forecast": () => import("@/lib/calculators/modules/cash-flow-forecast"),
  "margin-markup-calculator": () => import("@/lib/calculators/modules/margin-markup-calculator"),
  "contractor-vs-employee-cost": () => import("@/lib/calculators/modules/contractor-vs-employee-cost")
} as const;

export type CalculatorSlug = keyof typeof runnerLoaders;

export async function loadCalculatorRunner(slug: string): Promise<CalculatorRunner | null> {
  const loader = runnerLoaders[slug as CalculatorSlug];
  if (!loader) {
    return null;
  }

  const module = await loader();
  return module.run;
}
