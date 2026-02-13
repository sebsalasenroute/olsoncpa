import { defaultMonthGrid } from "@/lib/calculators/constants";
import type { CalculatorCatalogItem } from "@/lib/calculators/types";

const estimateDisclaimer =
  "Estimate only. This calculator is for planning and does not replace advice from Olson & Company or CRA guidance.";

const taxDisclaimer =
  "Tax estimates use placeholder framework data until verified rates are entered. Confirm with CRA resources and professional review.";

export const calculatorCatalog: CalculatorCatalogItem[] = [
  {
    slug: "canadian-income-tax-estimator",
    title: "Canadian Income Tax Estimator (Federal + BC)",
    shortDescription: "Estimate personal income tax with BC + federal bracket logic by tax year.",
    longDescription:
      "Plan your tax year by estimating federal and BC personal income tax using a year-based rules engine with clear warnings when data is placeholder.",
    category: "tax",
    bannerType: "tax",
    fields: [
      {
        key: "year",
        label: "Tax Year",
        type: "select",
        defaultValue: "2026",
        helpText: "Select the tax-year module to apply.",
        options: [
          { label: "2026", value: "2026" },
          { label: "2025", value: "2025" }
        ]
      },
      {
        key: "income",
        label: "Gross Annual Income",
        type: "number",
        defaultValue: 90000,
        min: 0,
        step: 500,
        slider: true,
        prefix: "$",
        helpText: "Total employment and other taxable income before deductions."
      },
      {
        key: "rrspContribution",
        label: "RRSP Contribution",
        type: "number",
        defaultValue: 4000,
        min: 0,
        step: 100,
        slider: true,
        prefix: "$",
        helpText: "Contribution amount assumed deductible in the selected year."
      },
      {
        key: "otherDeductions",
        label: "Other Deductions",
        type: "number",
        defaultValue: 0,
        min: 0,
        step: 100,
        prefix: "$",
        helpText: "High-level placeholder for additional deductions."
      }
    ],
    howItWorks: [
      "Taxable income is estimated as gross income minus RRSP and other deductions.",
      "Federal and BC bracket tax are calculated progressively and reduced by basic personal amount credits.",
      "The result shows estimated total tax, average rate, marginal rate, and net income."
    ],
    faqs: [
      {
        question: "Is this calculator CRA-certified?",
        answer:
          "No. This is an estimate framework. Confirm final calculations against official CRA and BC tax resources."
      },
      {
        question: "Can I use this for installment planning?",
        answer: "Yes, as a planning estimate. Review assumptions with a tax professional before acting."
      }
    ],
    relatedServiceSlugs: ["personal-tax", "tax-planning", "corporate-tax"],
    relatedCitySlugs: ["new-westminster", "vancouver", "burnaby"],
    disclaimers: [estimateDisclaimer, taxDisclaimer]
  },
  {
    slug: "rrsp-contribution-impact",
    title: "RRSP Contribution Impact",
    shortDescription: "Estimate how RRSP contributions may affect taxable income and approximate tax.",
    longDescription:
      "Model the estimated impact of RRSP contributions on your taxable income and projected tax outcome in BC.",
    category: "personal",
    bannerType: "tax",
    fields: [
      {
        key: "year",
        label: "Tax Year",
        type: "select",
        defaultValue: "2026",
        options: [
          { label: "2026", value: "2026" },
          { label: "2025", value: "2025" }
        ]
      },
      {
        key: "income",
        label: "Gross Annual Income",
        type: "number",
        defaultValue: 85000,
        min: 0,
        step: 500,
        slider: true,
        prefix: "$"
      },
      {
        key: "rrspContribution",
        label: "Proposed RRSP Contribution",
        type: "number",
        defaultValue: 5000,
        min: 0,
        step: 100,
        slider: true,
        prefix: "$"
      }
    ],
    howItWorks: [
      "The tool runs tax estimate scenarios with and without the RRSP contribution.",
      "Tax savings are the difference between the two estimated outcomes.",
      "Use this for planning only and confirm contribution room and deductibility separately."
    ],
    faqs: [
      {
        question: "Does this include RRSP room validation?",
        answer: "No. Confirm your available room from CRA records before making contributions."
      },
      {
        question: "Can this replace tax advice?",
        answer: "No. This is an estimate tool intended for planning conversations."
      }
    ],
    relatedServiceSlugs: ["personal-tax", "tax-planning"],
    relatedCitySlugs: ["new-westminster", "coquitlam", "white-rock"],
    disclaimers: [estimateDisclaimer, taxDisclaimer]
  },
  {
    slug: "tfsa-tracker",
    title: "TFSA Tracker (Simple)",
    shortDescription: "Track current-year TFSA contribution assumptions and estimated remaining room.",
    longDescription:
      "Use a simple planning tracker for TFSA contributions with annual room assumptions and a remaining-room estimate.",
    category: "personal",
    bannerType: "general",
    fields: [
      {
        key: "startingRoom",
        label: "Estimated Starting TFSA Room",
        type: "number",
        defaultValue: 35000,
        min: 0,
        step: 500,
        slider: true,
        prefix: "$"
      },
      {
        key: "yearlyLimit",
        label: "Current Year TFSA Limit",
        type: "number",
        defaultValue: 7000,
        min: 0,
        step: 100,
        prefix: "$"
      },
      {
        key: "contributionsThisYear",
        label: "Contributions This Year",
        type: "number",
        defaultValue: 3000,
        min: 0,
        step: 100,
        prefix: "$"
      },
      {
        key: "withdrawalsThisYear",
        label: "Withdrawals This Year",
        type: "number",
        defaultValue: 0,
        min: 0,
        step: 100,
        prefix: "$"
      }
    ],
    howItWorks: [
      "Estimated available room equals starting room plus current year limit minus this year contributions.",
      "Withdrawals are shown separately to avoid confusion with next-year recontribution rules.",
      "Always validate your exact room with CRA before contributing."
    ],
    faqs: [
      {
        question: "Are TFSA withdrawal recontribution rules included?",
        answer: "Partially. This tracker highlights withdrawals but does not model every timing nuance."
      },
      {
        question: "What should I do before contributing?",
        answer: "Confirm exact room on CRA records or with your advisor."
      }
    ],
    relatedServiceSlugs: ["personal-tax", "tax-planning"],
    relatedCitySlugs: ["north-vancouver", "west-vancouver", "new-westminster"],
    disclaimers: [estimateDisclaimer]
  },
  {
    slug: "mortgage-payment-amortization",
    title: "Mortgage Payment + Amortization",
    shortDescription: "Estimate mortgage payments and view yearly amortization balances.",
    longDescription:
      "Compare payment amounts and principal reduction over time with an interactive amortization schedule and chart.",
    category: "personal",
    bannerType: "general",
    fields: [
      {
        key: "homePrice",
        label: "Home Price",
        type: "number",
        defaultValue: 850000,
        min: 0,
        step: 1000,
        slider: true,
        prefix: "$"
      },
      {
        key: "downPaymentPercent",
        label: "Down Payment",
        type: "number",
        defaultValue: 20,
        min: 5,
        max: 80,
        step: 1,
        slider: true,
        suffix: "%"
      },
      {
        key: "interestRate",
        label: "Mortgage Interest Rate",
        type: "number",
        defaultValue: 4.9,
        min: 0,
        max: 15,
        step: 0.1,
        slider: true,
        suffix: "%"
      },
      {
        key: "amortizationYears",
        label: "Amortization (Years)",
        type: "number",
        defaultValue: 25,
        min: 5,
        max: 35,
        step: 1,
        slider: true
      }
    ],
    howItWorks: [
      "The mortgage principal is home price minus down payment.",
      "Payments are calculated with a standard fixed-rate amortization formula.",
      "The yearly schedule shows projected balance, principal paid, and interest paid."
    ],
    faqs: [
      {
        question: "Does this include mortgage insurance?",
        answer: "No. Add insurance and closing costs separately for full budgeting."
      },
      {
        question: "Can I compare fixed and variable rates?",
        answer: "Yes. Adjust the rate field to model alternate scenarios."
      }
    ],
    relatedServiceSlugs: ["personal-tax", "tax-planning"],
    relatedCitySlugs: ["vancouver", "coquitlam", "new-westminster"],
    disclaimers: [estimateDisclaimer]
  },
  {
    slug: "rent-vs-buy",
    title: "Rent vs Buy",
    shortDescription: "Compare long-term estimated housing cost outcomes for renting versus buying.",
    longDescription:
      "Model monthly cash impact and long-term wealth difference between renting and buying under your assumptions.",
    category: "personal",
    bannerType: "general",
    fields: [
      {
        key: "monthlyRent",
        label: "Monthly Rent",
        type: "number",
        defaultValue: 2800,
        min: 0,
        step: 50,
        slider: true,
        prefix: "$"
      },
      {
        key: "rentIncrease",
        label: "Annual Rent Increase",
        type: "number",
        defaultValue: 3,
        min: 0,
        max: 12,
        step: 0.1,
        suffix: "%"
      },
      {
        key: "homePrice",
        label: "Home Price",
        type: "number",
        defaultValue: 850000,
        min: 0,
        step: 1000,
        prefix: "$"
      },
      {
        key: "downPaymentPercent",
        label: "Down Payment",
        type: "number",
        defaultValue: 20,
        min: 5,
        max: 80,
        step: 1,
        suffix: "%"
      },
      {
        key: "mortgageRate",
        label: "Mortgage Rate",
        type: "number",
        defaultValue: 4.9,
        min: 0,
        max: 15,
        step: 0.1,
        suffix: "%"
      },
      {
        key: "years",
        label: "Comparison Horizon",
        type: "number",
        defaultValue: 10,
        min: 1,
        max: 30,
        step: 1,
        slider: true,
        suffix: "years"
      },
      {
        key: "annualMaintenance",
        label: "Annual Maintenance",
        type: "number",
        defaultValue: 5000,
        min: 0,
        step: 100,
        prefix: "$"
      },
      {
        key: "annualPropertyTax",
        label: "Annual Property Tax",
        type: "number",
        defaultValue: 3200,
        min: 0,
        step: 100,
        prefix: "$"
      },
      {
        key: "investmentReturn",
        label: "Investment Return Assumption",
        type: "number",
        defaultValue: 5,
        min: 0,
        max: 15,
        step: 0.1,
        suffix: "%"
      }
    ],
    howItWorks: [
      "Renting cost is projected over time with annual rent growth.",
      "Buying cost combines mortgage payments, maintenance, and property tax.",
      "The tool estimates home equity and compares net position at the chosen horizon."
    ],
    faqs: [
      {
        question: "Does this include transaction costs?",
        answer: "No. Add legal fees, transfer taxes, and selling costs separately when deciding."
      },
      {
        question: "Is this a recommendation to buy or rent?",
        answer: "No. It is a scenario model to support informed planning."
      }
    ],
    relatedServiceSlugs: ["personal-tax", "tax-planning"],
    relatedCitySlugs: ["vancouver", "burnaby", "new-westminster"],
    disclaimers: [estimateDisclaimer]
  },
  {
    slug: "debt-payoff-planner",
    title: "Debt Payoff Planner (Avalanche/Snowball)",
    shortDescription: "Compare payoff strategy timelines with avalanche or snowball methods.",
    longDescription:
      "Prioritize debt repayment using selectable methods and visualize month-by-month total balance reduction.",
    category: "personal",
    bannerType: "general",
    fields: [
      { key: "debtA", label: "Debt A Balance", type: "number", defaultValue: 8000, min: 0, step: 100, prefix: "$" },
      { key: "debtAApr", label: "Debt A APR", type: "number", defaultValue: 19.99, min: 0, max: 60, step: 0.1, suffix: "%" },
      { key: "debtAMin", label: "Debt A Minimum", type: "number", defaultValue: 220, min: 0, step: 10, prefix: "$" },
      { key: "debtB", label: "Debt B Balance", type: "number", defaultValue: 15000, min: 0, step: 100, prefix: "$" },
      { key: "debtBApr", label: "Debt B APR", type: "number", defaultValue: 8.5, min: 0, max: 60, step: 0.1, suffix: "%" },
      { key: "debtBMin", label: "Debt B Minimum", type: "number", defaultValue: 300, min: 0, step: 10, prefix: "$" },
      { key: "monthlyBudget", label: "Total Monthly Payment Budget", type: "number", defaultValue: 900, min: 0, step: 25, slider: true, prefix: "$" },
      {
        key: "method",
        label: "Payoff Method",
        type: "select",
        defaultValue: "avalanche",
        options: [
          { label: "Avalanche (highest interest first)", value: "avalanche" },
          { label: "Snowball (smallest balance first)", value: "snowball" }
        ]
      }
    ],
    howItWorks: [
      "Monthly interest is added per debt APR.",
      "Minimum payments are applied, then remaining budget is routed by selected method.",
      "Chart output tracks projected total balance until payoff."
    ],
    faqs: [
      {
        question: "Which method is mathematically faster?",
        answer: "Avalanche typically reduces interest cost, while snowball may improve behavioural consistency."
      },
      {
        question: "Can I model more than two debts?",
        answer: "This version models two core debts for fast planning."
      }
    ],
    relatedServiceSlugs: ["personal-tax", "tax-planning"],
    relatedCitySlugs: ["maple-ridge", "white-rock", "surrey"],
    disclaimers: [estimateDisclaimer]
  },
  {
    slug: "retirement-projection",
    title: "Retirement Projection",
    shortDescription: "Project retirement savings with optional inflation-adjusted outcome.",
    longDescription:
      "Model long-term retirement balance growth with flexible assumptions for contributions, return, and inflation.",
    category: "personal",
    bannerType: "general",
    fields: [
      { key: "currentAge", label: "Current Age", type: "number", defaultValue: 35, min: 18, max: 75, step: 1, slider: true },
      { key: "retirementAge", label: "Retirement Age", type: "number", defaultValue: 65, min: 40, max: 80, step: 1, slider: true },
      { key: "currentSavings", label: "Current Savings", type: "number", defaultValue: 120000, min: 0, step: 1000, prefix: "$" },
      { key: "monthlyContribution", label: "Monthly Contribution", type: "number", defaultValue: 1200, min: 0, step: 50, slider: true, prefix: "$" },
      { key: "annualReturn", label: "Annual Return", type: "number", defaultValue: 5.5, min: 0, max: 12, step: 0.1, suffix: "%" },
      { key: "inflationRate", label: "Inflation Rate", type: "number", defaultValue: 2.2, min: 0, max: 10, step: 0.1, suffix: "%" },
      { key: "adjustForInflation", label: "Show inflation-adjusted value", type: "boolean", defaultValue: true }
    ],
    howItWorks: [
      "Savings are projected with monthly compounding and monthly contributions.",
      "If inflation adjustment is enabled, ending value is converted to today's dollars.",
      "Use conservative assumptions and review results regularly."
    ],
    faqs: [
      {
        question: "Does this include CPP/OAS?",
        answer: "No. Add government benefits separately for a full retirement income plan."
      },
      {
        question: "How often should assumptions be updated?",
        answer: "At least annually and after major market or income changes."
      }
    ],
    relatedServiceSlugs: ["personal-tax", "tax-planning"],
    relatedCitySlugs: ["west-vancouver", "white-rock", "new-westminster"],
    disclaimers: [estimateDisclaimer]
  },
  {
    slug: "net-worth-snapshot",
    title: "Net Worth Snapshot",
    shortDescription: "Create a fast personal balance-sheet estimate of assets and liabilities.",
    longDescription:
      "Build a simple net worth view to track progress and identify leverage risk areas.",
    category: "personal",
    bannerType: "general",
    fields: [
      { key: "cash", label: "Cash", type: "number", defaultValue: 15000, min: 0, step: 100, prefix: "$" },
      { key: "investments", label: "Investments", type: "number", defaultValue: 80000, min: 0, step: 500, prefix: "$" },
      { key: "property", label: "Property Value", type: "number", defaultValue: 750000, min: 0, step: 1000, prefix: "$" },
      { key: "mortgage", label: "Mortgage Balance", type: "number", defaultValue: 460000, min: 0, step: 1000, prefix: "$" },
      { key: "loans", label: "Other Loans", type: "number", defaultValue: 12000, min: 0, step: 100, prefix: "$" },
      { key: "credit", label: "Credit Card Balances", type: "number", defaultValue: 2500, min: 0, step: 100, prefix: "$" }
    ],
    howItWorks: [
      "Assets and liabilities are totaled separately.",
      "Net worth equals total assets minus total liabilities.",
      "Use recurring snapshots to monitor trend direction."
    ],
    faqs: [
      {
        question: "Should I include market-value estimates?",
        answer: "Yes. Use realistic current values and update periodically."
      },
      {
        question: "Can this help with debt planning?",
        answer: "Yes. Liability ratios can highlight where to prioritize repayment."
      }
    ],
    relatedServiceSlugs: ["personal-tax", "bookkeeping"],
    relatedCitySlugs: ["new-westminster", "burnaby", "maple-ridge"],
    disclaimers: [estimateDisclaimer]
  },
  {
    slug: "incorporation-vs-sole-prop",
    title: "Incorporation vs Sole Prop",
    shortDescription: "High-level estimate of after-tax outcomes for incorporated versus sole proprietor structures.",
    longDescription:
      "Compare owner-level estimate outcomes using simplified tax assumptions to support planning discussions.",
    category: "business",
    bannerType: "corporate-tax",
    fields: [
      { key: "annualProfit", label: "Annual Business Profit", type: "number", defaultValue: 180000, min: 0, step: 1000, slider: true, prefix: "$" },
      { key: "salaryDraw", label: "Owner Salary/Draw", type: "number", defaultValue: 90000, min: 0, step: 1000, prefix: "$" },
      { key: "corpTaxRate", label: "Corporate Tax Rate", type: "number", defaultValue: 11, min: 0, max: 35, step: 0.1, suffix: "%" },
      { key: "personalTaxRate", label: "Personal Tax Rate (Estimate)", type: "number", defaultValue: 30, min: 0, max: 55, step: 0.1, suffix: "%" }
    ],
    howItWorks: [
      "Sole prop scenario applies a personal tax estimate to all profit.",
      "Incorporated scenario applies corporate tax, then personal tax to owner draw.",
      "The output highlights retained corporate cash and estimated owner net cash."
    ],
    faqs: [
      {
        question: "Is this enough to decide incorporation?",
        answer: "No. Legal, payroll, and long-term planning factors should be reviewed with a professional."
      },
      {
        question: "Can salary/dividend choices be modeled?",
        answer: "This version provides a high-level structure; detailed planning should be reviewed directly."
      }
    ],
    relatedServiceSlugs: ["corporate-tax", "bookkeeping"],
    relatedCitySlugs: ["richmond", "surrey", "langley"],
    disclaimers: [estimateDisclaimer]
  },
  {
    slug: "gst-hst-calculator",
    title: "GST/HST Calculator",
    shortDescription: "Estimate GST/HST collected, input tax credits, and net remittance.",
    longDescription:
      "Get a period-end estimate of GST/HST position with BC-focused defaults and clear remittance output.",
    category: "business",
    bannerType: "bookkeeping",
    fields: [
      { key: "taxableSales", label: "Taxable Sales", type: "number", defaultValue: 90000, min: 0, step: 100, prefix: "$" },
      { key: "taxableExpenses", label: "Taxable Expenses", type: "number", defaultValue: 45000, min: 0, step: 100, prefix: "$" },
      { key: "rate", label: "GST/HST Rate", type: "number", defaultValue: 5, min: 0, max: 15, step: 0.1, suffix: "%", helpText: "BC default GST is 5% unless HST context applies." }
    ],
    howItWorks: [
      "GST/HST collected is taxable sales multiplied by tax rate.",
      "Input tax credits are taxable expenses multiplied by tax rate.",
      "Net remittance equals collected tax minus eligible credits."
    ],
    faqs: [
      {
        question: "Does this handle every GST/HST edge case?",
        answer: "No. Use this for planning estimates and confirm treatment for special transactions."
      },
      {
        question: "Can this be used monthly or quarterly?",
        answer: "Yes. Enter figures for your chosen reporting period."
      }
    ],
    relatedServiceSlugs: ["gst-hst-advisory", "bookkeeping", "corporate-tax"],
    relatedCitySlugs: ["richmond", "surrey", "delta"],
    disclaimers: [estimateDisclaimer]
  },
  {
    slug: "payroll-gross-to-net",
    title: "Payroll Gross-to-Net (Estimate)",
    shortDescription: "Placeholder payroll estimate architecture with warning banner until current tables are entered.",
    longDescription:
      "Estimate payroll deductions with explicit placeholders and warnings until official payroll tables and rates are populated.",
    category: "payroll",
    bannerType: "payroll",
    fields: [
      { key: "grossPay", label: "Gross Pay (Per Period)", type: "number", defaultValue: 3500, min: 0, step: 50, slider: true, prefix: "$" },
      {
        key: "payFrequency",
        label: "Pay Frequency",
        type: "select",
        defaultValue: "biweekly",
        options: [
          { label: "Bi-weekly", value: "biweekly" },
          { label: "Semi-monthly", value: "semimonthly" },
          { label: "Monthly", value: "monthly" }
        ]
      },
      { key: "cppRate", label: "CPP Rate (placeholder)", type: "number", defaultValue: 5.95, min: 0, max: 15, step: 0.01, suffix: "%" },
      { key: "eiRate", label: "EI Rate (placeholder)", type: "number", defaultValue: 1.66, min: 0, max: 10, step: 0.01, suffix: "%" },
      { key: "taxWithholdingRate", label: "Tax Withholding (placeholder)", type: "number", defaultValue: 18, min: 0, max: 60, step: 0.1, suffix: "%" }
    ],
    howItWorks: [
      "Gross pay is reduced by estimated CPP, EI, and withholding amounts.",
      "Rates are placeholders by design and must be replaced with current official payroll data.",
      "Use results for rough planning only, not production payroll calculations."
    ],
    faqs: [
      {
        question: "Can I use this for employee paystubs?",
        answer: "No. This is a planning placeholder and not a payroll processing tool."
      },
      {
        question: "How do I make this compliant?",
        answer: "Populate verified annual payroll rates, limits, and formulas for each tax year."
      }
    ],
    relatedServiceSlugs: ["payroll", "bookkeeping"],
    relatedCitySlugs: ["surrey", "langley", "tri-cities"],
    disclaimers: [estimateDisclaimer, taxDisclaimer]
  },
  {
    slug: "business-loan-payment",
    title: "Business Loan Payment",
    shortDescription: "Estimate monthly payments and annual debt load for business financing.",
    longDescription:
      "Model business financing payments to plan debt service, margin resilience, and monthly cash requirements.",
    category: "business",
    bannerType: "corporate-tax",
    fields: [
      { key: "principal", label: "Loan Principal", type: "number", defaultValue: 120000, min: 0, step: 1000, prefix: "$" },
      { key: "rate", label: "Annual Interest Rate", type: "number", defaultValue: 8.2, min: 0, max: 30, step: 0.1, suffix: "%" },
      { key: "termYears", label: "Term (Years)", type: "number", defaultValue: 7, min: 1, max: 30, step: 1, slider: true }
    ],
    howItWorks: [
      "Monthly payment uses standard amortizing loan math.",
      "Results include annual debt load and total payment projection.",
      "Use this for scenario planning alongside cash flow forecasting."
    ],
    faqs: [
      {
        question: "Does this include lender fees?",
        answer: "No. Add setup fees and covenants separately for complete analysis."
      },
      {
        question: "Can I compare multiple loans?",
        answer: "Yes. Run several scenarios and copy summaries for side-by-side review."
      }
    ],
    relatedServiceSlugs: ["bookkeeping", "corporate-tax"],
    relatedCitySlugs: ["burnaby", "delta", "port-coquitlam"],
    disclaimers: [estimateDisclaimer]
  },
  {
    slug: "break-even-calculator",
    title: "Break-even Calculator",
    shortDescription: "Calculate unit and revenue break-even points with optional target profit.",
    longDescription:
      "Estimate required sales volume to break even and to reach a target profit level.",
    category: "business",
    bannerType: "bookkeeping",
    fields: [
      { key: "fixedCosts", label: "Monthly Fixed Costs", type: "number", defaultValue: 28000, min: 0, step: 100, prefix: "$" },
      { key: "pricePerUnit", label: "Price per Unit", type: "number", defaultValue: 220, min: 0, step: 1, prefix: "$" },
      { key: "variableCostPerUnit", label: "Variable Cost per Unit", type: "number", defaultValue: 95, min: 0, step: 1, prefix: "$" },
      { key: "targetProfit", label: "Target Monthly Profit", type: "number", defaultValue: 15000, min: 0, step: 100, prefix: "$" }
    ],
    howItWorks: [
      "Contribution margin equals selling price minus variable cost.",
      "Break-even units are fixed costs divided by contribution margin.",
      "Target-profit units add desired profit to fixed costs before dividing."
    ],
    faqs: [
      {
        question: "What if variable cost exceeds price?",
        answer: "The business cannot break even at that pricing structure; adjust assumptions first."
      },
      {
        question: "Can this support pricing decisions?",
        answer: "Yes. Compare alternate pricing and cost scenarios quickly."
      }
    ],
    relatedServiceSlugs: ["bookkeeping", "corporate-tax"],
    relatedCitySlugs: ["surrey", "richmond", "tri-cities"],
    disclaimers: [estimateDisclaimer]
  },
  {
    slug: "cash-flow-forecast",
    title: "Cash Flow Forecast",
    shortDescription: "Monthly 12-period cash forecast with trend chart and ending cash visibility.",
    longDescription:
      "Build a monthly cash projection using revenue and expense inputs across twelve periods.",
    category: "business",
    bannerType: "bookkeeping",
    fields: [
      { key: "openingCash", label: "Opening Cash", type: "number", defaultValue: 50000, min: 0, step: 100, prefix: "$" },
      {
        key: "monthlyRevenue",
        label: "Monthly Revenue Inputs",
        type: "monthGrid",
        defaultValue: defaultMonthGrid(38000),
        helpText: "Enter monthly revenue assumptions for each month."
      },
      {
        key: "monthlyExpenses",
        label: "Monthly Expense Inputs",
        type: "monthGrid",
        defaultValue: defaultMonthGrid(29000),
        helpText: "Enter monthly expense assumptions for each month."
      }
    ],
    howItWorks: [
      "Each month applies net cash flow (revenue minus expenses) to opening cash.",
      "The chart shows ending cash balance and monthly net movement.",
      "Use conservative assumptions for collections and irregular expenses."
    ],
    faqs: [
      {
        question: "Can I model seasonal business swings?",
        answer: "Yes. Enter different monthly values to represent seasonal patterns."
      },
      {
        question: "Does this replace a full forecast model?",
        answer: "No. It is a lightweight planning view designed for speed."
      }
    ],
    relatedServiceSlugs: ["bookkeeping", "payroll", "gst-hst-advisory"],
    relatedCitySlugs: ["richmond", "surrey", "new-westminster"],
    disclaimers: [estimateDisclaimer]
  },
  {
    slug: "margin-markup-calculator",
    title: "Margin / Markup Calculator",
    shortDescription: "Instantly compare gross margin and markup percentages from cost and price.",
    longDescription:
      "Understand profitability structure quickly by calculating both gross margin and markup.",
    category: "business",
    bannerType: "bookkeeping",
    fields: [
      { key: "cost", label: "Unit Cost", type: "number", defaultValue: 45, min: 0, step: 0.5, prefix: "$" },
      { key: "price", label: "Selling Price", type: "number", defaultValue: 75, min: 0, step: 0.5, prefix: "$" }
    ],
    howItWorks: [
      "Gross margin is calculated as (price - cost) divided by price.",
      "Markup is calculated as (price - cost) divided by cost.",
      "Both metrics are shown because they answer different pricing questions."
    ],
    faqs: [
      {
        question: "Why are margin and markup different?",
        answer: "They use different denominators. Margin uses selling price; markup uses cost."
      },
      {
        question: "What if price is below cost?",
        answer: "Both metrics show an unprofitable result and should trigger repricing review."
      }
    ],
    relatedServiceSlugs: ["bookkeeping", "corporate-tax"],
    relatedCitySlugs: ["burnaby", "port-coquitlam", "langley"],
    disclaimers: [estimateDisclaimer]
  },
  {
    slug: "contractor-vs-employee-cost",
    title: "Contractor vs Employee Cost",
    shortDescription: "Estimate annual cost differences between contractor and employee engagement models.",
    longDescription:
      "Compare total annual workforce cost using salary/fees plus payroll burden and benefits assumptions.",
    category: "business",
    bannerType: "payroll",
    fields: [
      { key: "baseComp", label: "Base Annual Compensation", type: "number", defaultValue: 80000, min: 0, step: 500, prefix: "$" },
      { key: "payrollBurdenPct", label: "Payroll Burden", type: "number", defaultValue: 8, min: 0, max: 30, step: 0.1, suffix: "%" },
      { key: "benefitsPct", label: "Benefits Cost", type: "number", defaultValue: 12, min: 0, max: 40, step: 0.1, suffix: "%" },
      { key: "contractorMultiplier", label: "Contractor Rate Multiplier", type: "number", defaultValue: 1.25, min: 0.5, max: 3, step: 0.01, suffix: "x" }
    ],
    howItWorks: [
      "Employee cost includes base compensation plus payroll burden and benefits assumptions.",
      "Contractor cost multiplies base compensation by the contractor rate factor.",
      "The calculator highlights annual cost delta for planning conversations."
    ],
    faqs: [
      {
        question: "Does this determine legal worker classification?",
        answer: "No. Classification rules depend on legal and tax criteria outside this estimate."
      },
      {
        question: "Can this include overhead allocations?",
        answer: "Not in this version. Add overhead separately when making final decisions."
      }
    ],
    relatedServiceSlugs: ["payroll", "bookkeeping"],
    relatedCitySlugs: ["surrey", "langley", "tri-cities"],
    disclaimers: [estimateDisclaimer]
  }
];

export const calculatorBySlug = Object.fromEntries(
  calculatorCatalog.map((calculator) => [calculator.slug, calculator])
);

export const calculatorCategories = [
  { value: "all", label: "All" },
  { value: "personal", label: "Personal" },
  { value: "business", label: "Business" },
  { value: "payroll", label: "Payroll" },
  { value: "tax", label: "Tax" }
] as const;
