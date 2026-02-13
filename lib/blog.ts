export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readMinutes: number;
  content: string[];
  relatedCalculatorSlugs: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "bc-tax-season-checklist-for-families",
    title: "BC Tax Season Checklist for Families in the Lower Mainland",
    excerpt:
      "A practical checklist to get organized before filing, including common slips, credits, and planning decisions.",
    publishedAt: "2026-01-12",
    readMinutes: 6,
    content: [
      "A clean filing process starts with one checklist and one place to store documents. Families usually benefit from gathering slips in early February and scheduling a pre-filing review before deadlines become crowded.",
      "If your year included child care costs, tuition, rental income, or a move, put those items into a separate notes section with dates and dollar ranges so preparation is faster and questions are easier to answer.",
      "Run an estimate before filing. It helps avoid refund surprises and can highlight whether RRSP timing or installment planning needs attention for the next year."
    ],
    relatedCalculatorSlugs: ["canadian-income-tax-estimator", "rrsp-contribution-impact", "tfsa-tracker"]
  },
  {
    slug: "cash-flow-planning-for-growing-bc-businesses",
    title: "Cash Flow Planning for Growing BC Businesses",
    excerpt:
      "How to turn monthly inflow/outflow assumptions into a working forecast that improves operating decisions.",
    publishedAt: "2025-11-06",
    readMinutes: 7,
    content: [
      "Growth can hide risk when revenue rises but payment timing slips. A monthly cash view makes that visible and helps owners decide when to hire, finance, or delay spending.",
      "Start with conservative collection assumptions and realistic expense timing. If you receive seasonal spikes, model best case and base case so decision-making is grounded.",
      "Revisit the forecast monthly, not annually. A short monthly review often catches issues before they become a tax, payroll, or vendor problem."
    ],
    relatedCalculatorSlugs: ["cash-flow-forecast", "break-even-calculator", "business-loan-payment"]
  },
  {
    slug: "gst-hst-basics-for-service-businesses-in-bc",
    title: "GST/HST Basics for Service Businesses in BC",
    excerpt:
      "A simple framework for understanding collections, credits, and remittances for BC service operators.",
    publishedAt: "2025-10-01",
    readMinutes: 5,
    content: [
      "GST/HST management is mostly a process problem, not a math problem. Businesses that track taxable sales and eligible inputs monthly usually avoid year-end stress.",
      "Use a consistent close checklist and reconcile GST/HST accounts every period. This prevents double counting and reduces filing corrections later.",
      "When in doubt, isolate unusual transactions and review them before filing. Edge cases are where expensive errors usually happen."
    ],
    relatedCalculatorSlugs: ["gst-hst-calculator", "cash-flow-forecast", "margin-markup-calculator"]
  },
  {
    slug: "salary-vs-dividends-for-owner-managers",
    title: "Salary vs Dividends for Owner-Managers: Planning Framework",
    excerpt:
      "A high-level way to evaluate compensation choices while coordinating personal and corporate priorities.",
    publishedAt: "2025-08-20",
    readMinutes: 8,
    content: [
      "Compensation decisions affect both current cash and long-term tax posture. The right mix depends on profitability, reinvestment plans, and personal income requirements.",
      "Estimate both scenarios with assumptions documented in writing. That makes year-over-year planning easier and simplifies conversations with your accountant.",
      "A structured estimate should never replace professional advice, but it can significantly improve the quality of planning discussions."
    ],
    relatedCalculatorSlugs: ["incorporation-vs-sole-prop", "canadian-income-tax-estimator", "retirement-projection"]
  },
  {
    slug: "mortgage-vs-rent-in-metro-vancouver",
    title: "Mortgage vs Rent in Metro Vancouver: What to Model First",
    excerpt:
      "A practical planning approach for comparing monthly cash impact and long-term equity outcomes.",
    publishedAt: "2025-06-14",
    readMinutes: 7,
    content: [
      "Housing decisions are often made with partial numbers. A side-by-side model should include mortgage payments, ownership costs, expected rent growth, and investment return assumptions.",
      "Run conservative assumptions first. If the decision still works in a conservative scenario, confidence is higher.",
      "Recalculate after interest-rate changes and major life events. The best decision can change with market and household conditions."
    ],
    relatedCalculatorSlugs: ["mortgage-payment-amortization", "rent-vs-buy", "net-worth-snapshot"]
  }
];

export const blogBySlug = Object.fromEntries(blogPosts.map((post) => [post.slug, post]));
