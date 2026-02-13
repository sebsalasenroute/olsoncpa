export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  heroSubtitle: string;
  heroImage: string;
  benefits: string[];
  process: string[];
  relatedCalculatorSlugs: string[];
};

export const services: Service[] = [
  {
    slug: "personal-tax",
    name: "Personal Tax",
    shortDescription:
      "Personal tax planning and filing support for BC residents, including salaried, self-employed, and retirees.",
    heroSubtitle:
      "Reduce surprises and file with confidence through organized records, scenario planning, and practical guidance.",
    heroImage: "/images/banner-personal-tax.jpg",
    benefits: [
      "Year-round planning for employment, investment, and rental income",
      "RRSP and TFSA optimization conversations before filing season",
      "Support for life events including family changes and property decisions"
    ],
    process: [
      "Intake and document checklist",
      "Return preparation and issue review",
      "Scenario options for next tax year"
    ],
    relatedCalculatorSlugs: [
      "canadian-income-tax-estimator",
      "rrsp-contribution-impact",
      "tfsa-tracker",
      "retirement-projection",
      "rent-vs-buy"
    ]
  },
  {
    slug: "tax-planning",
    name: "Tax Planning",
    shortDescription:
      "Forward-looking planning for personal and business tax decisions with scenario reviews and practical timing guidance.",
    heroSubtitle:
      "Plan before deadlines with estimate-driven tax scenarios and action lists that are easy to execute.",
    heroImage: "/images/banner-tax-season.jpg",
    benefits: [
      "Scenario-based planning before major income or spending decisions",
      "Annual and mid-year review cadence",
      "Clear assumptions and documented action points"
    ],
    process: [
      "Current position estimate and assumptions",
      "What-if scenario comparisons",
      "Recommended next actions and timeline"
    ],
    relatedCalculatorSlugs: [
      "canadian-income-tax-estimator",
      "rrsp-contribution-impact",
      "retirement-projection",
      "incorporation-vs-sole-prop",
      "cash-flow-forecast"
    ]
  },
  {
    slug: "corporate-tax",
    name: "Corporate Tax",
    shortDescription:
      "Corporate tax compliance and planning for BC owner-managed companies and growing operating businesses.",
    heroSubtitle:
      "Build a predictable tax workflow with clear year-end preparation, filing support, and planning checkpoints.",
    heroImage: "/images/banner-corporate-tax.jpg",
    benefits: [
      "Year-end file readiness and review",
      "Tax planning touchpoints before major spending or dividend decisions",
      "Clear communication for owner compensation strategy"
    ],
    process: [
      "Financial review and tax-sensitive adjustments",
      "Corporate return preparation",
      "Post-filing planning summary"
    ],
    relatedCalculatorSlugs: [
      "incorporation-vs-sole-prop",
      "gst-hst-calculator",
      "break-even-calculator",
      "margin-markup-calculator",
      "cash-flow-forecast"
    ]
  },
  {
    slug: "bookkeeping",
    name: "Bookkeeping",
    shortDescription:
      "Monthly bookkeeping workflows that keep records clean and decision-ready for Lower Mainland businesses.",
    heroSubtitle:
      "Timely reconciliations and reports that help owners understand profitability and cash movement month to month.",
    heroImage: "/images/banner-bookkeeping.jpg",
    benefits: [
      "Monthly transaction coding and reconciliation",
      "Management-ready financial statements",
      "Coordination for GST/HST and payroll reporting"
    ],
    process: [
      "Chart-of-accounts setup or cleanup",
      "Recurring monthly close cycle",
      "Owner reporting and action items"
    ],
    relatedCalculatorSlugs: [
      "cash-flow-forecast",
      "break-even-calculator",
      "margin-markup-calculator",
      "net-worth-snapshot",
      "business-loan-payment"
    ]
  },
  {
    slug: "payroll",
    name: "Payroll",
    shortDescription:
      "Payroll administration support with practical controls and reporting cadence for small and mid-size employers.",
    heroSubtitle:
      "Set clear payroll routines, reduce filing stress, and maintain records needed for year-end reporting.",
    heroImage: "/images/banner-payroll.jpg",
    benefits: [
      "Recurring payroll run support",
      "Remittance and filing calendar",
      "T4 season preparation workflow"
    ],
    process: [
      "Employee/pay code setup review",
      "Payroll run and exception handling",
      "Remittance and reporting support"
    ],
    relatedCalculatorSlugs: [
      "payroll-gross-to-net",
      "contractor-vs-employee-cost",
      "cash-flow-forecast",
      "break-even-calculator",
      "business-loan-payment"
    ]
  },
  {
    slug: "gst-hst-advisory",
    name: "GST/HST Advisory",
    shortDescription:
      "Support with GST/HST setup, filing cadence, and estimate planning for BC businesses handling taxable supplies.",
    heroSubtitle:
      "Understand what to collect, what you can claim, and how remittances affect cash planning through the year.",
    heroImage: "/images/banner-tax-season.jpg",
    benefits: [
      "Filing frequency and remittance planning",
      "Input tax credit tracking guidance",
      "Audit-ready recordkeeping habits"
    ],
    process: [
      "Registration and workflow review",
      "Period-end GST/HST estimate",
      "Submission-ready package"
    ],
    relatedCalculatorSlugs: [
      "gst-hst-calculator",
      "cash-flow-forecast",
      "break-even-calculator",
      "margin-markup-calculator",
      "incorporation-vs-sole-prop"
    ]
  }
];

export const servicesBySlug = Object.fromEntries(services.map((service) => [service.slug, service]));
