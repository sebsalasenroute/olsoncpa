import { calculatorBySlug, calculatorCatalog } from "@/lib/calculators/catalog";

const useCaseBySlug: Record<string, { bestFor: string; primaryOutcome: string }> = {
  "canadian-income-tax-estimator": {
    bestFor: "Personal tax planning before filing or installments",
    primaryOutcome: "Estimated federal + BC tax and net income"
  },
  "rrsp-contribution-impact": {
    bestFor: "RRSP contribution timing and impact checks",
    primaryOutcome: "Estimated tax savings from contribution"
  },
  "tfsa-tracker": {
    bestFor: "Contribution-room tracking and annual TFSA planning",
    primaryOutcome: "Estimated remaining room snapshot"
  },
  "mortgage-payment-amortization": {
    bestFor: "Home affordability and payment planning",
    primaryOutcome: "Monthly payment and amortization trend"
  },
  "rent-vs-buy": {
    bestFor: "Housing decision comparisons over time",
    primaryOutcome: "Estimated cost/equity difference"
  },
  "debt-payoff-planner": {
    bestFor: "Debt prioritization and payoff strategy",
    primaryOutcome: "Estimated payoff timeline"
  },
  "retirement-projection": {
    bestFor: "Long-term savings and retirement pacing",
    primaryOutcome: "Projected retirement balance"
  },
  "net-worth-snapshot": {
    bestFor: "Personal balance-sheet check-ins",
    primaryOutcome: "Net worth and leverage snapshot"
  },
  "incorporation-vs-sole-prop": {
    bestFor: "Business structure scenario planning",
    primaryOutcome: "Estimated net outcome comparison"
  },
  "gst-hst-calculator": {
    bestFor: "GST/HST period-end remittance planning",
    primaryOutcome: "Collected tax, ITCs, and remittance"
  },
  "payroll-gross-to-net": {
    bestFor: "Payroll estimate planning",
    primaryOutcome: "Estimated gross-to-net breakdown"
  },
  "business-loan-payment": {
    bestFor: "Financing affordability checks",
    primaryOutcome: "Payment and total interest estimate"
  },
  "break-even-calculator": {
    bestFor: "Pricing and cost viability analysis",
    primaryOutcome: "Break-even units and revenue"
  },
  "cash-flow-forecast": {
    bestFor: "12-month operating cash planning",
    primaryOutcome: "Projected month-by-month cash balance"
  },
  "margin-markup-calculator": {
    bestFor: "Fast pricing quality checks",
    primaryOutcome: "Margin and markup percentages"
  },
  "contractor-vs-employee-cost": {
    bestFor: "Workforce model budgeting",
    primaryOutcome: "Estimated annual cost delta"
  }
};

function hasMonthGridInput(slug: string) {
  const calculator = calculatorBySlug[slug];
  if (!calculator) {
    return false;
  }

  return calculator.fields.some((field) => field.type === "monthGrid");
}

function depthLabel(slug: string) {
  const calculator = calculatorBySlug[slug];
  if (!calculator) {
    return "Standard";
  }

  const fieldCount = calculator.fields.length;
  const weight = fieldCount + (hasMonthGridInput(slug) ? 4 : 0);

  if (weight <= 3) {
    return "Light";
  }
  if (weight <= 6) {
    return "Standard";
  }
  return "Advanced";
}

function estimatedTimeLabel(slug: string) {
  if (hasMonthGridInput(slug)) {
    return "5-8 min";
  }

  const depth = depthLabel(slug);
  if (depth === "Light") {
    return "1-2 min";
  }
  if (depth === "Standard") {
    return "2-4 min";
  }
  return "4-6 min";
}

export function calculatorComparisonRows(slugs?: string[]) {
  const activeSlugs = slugs && slugs.length > 0 ? slugs : calculatorCatalog.map((item) => item.slug);

  return activeSlugs
    .map((slug) => calculatorBySlug[slug])
    .filter((calculator): calculator is NonNullable<typeof calculator> => Boolean(calculator))
    .map((calculator) => {
      const mapped = useCaseBySlug[calculator.slug];
      return {
        slug: calculator.slug,
        title: calculator.title,
        category: calculator.category,
        bestFor: mapped?.bestFor ?? calculator.shortDescription,
        primaryOutcome: mapped?.primaryOutcome ?? "Scenario estimate",
        inputDepth: depthLabel(calculator.slug),
        estimatedTime: estimatedTimeLabel(calculator.slug)
      };
    });
}
