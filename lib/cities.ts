export type CityPage = {
  slug: string;
  name: string;
  image: string;
  intro: string;
  localFocus: string[];
  localChallenges: string[];
  faqs: { question: string; answer: string }[];
  featuredCalculatorSlugs: string[];
};

export const cityPages: CityPage[] = [
  {
    slug: "vancouver",
    name: "Vancouver",
    image: "/images/city-vancouver.jpg",
    intro:
      "Vancouver clients often need tax planning that coordinates salary income, investment activity, and high housing costs. Olson & Company supports individuals and businesses with practical, year-round planning from our New Westminster office.",
    localFocus: ["Professional services", "Real estate investors", "Independent consultants"],
    localChallenges: ["Complex personal income mixes", "Cash-flow pressure from operating costs", "Frequent GST/HST questions"],
    faqs: [
      {
        question: "Do you work with Vancouver clients remotely?",
        answer: "Yes. We support secure document exchange and virtual planning meetings for Vancouver individuals and businesses."
      },
      {
        question: "Can you help with rental income planning?",
        answer: "Yes. We provide planning support for recordkeeping and estimate scenarios so year-end filing is more predictable."
      }
    ],
    featuredCalculatorSlugs: [
      "canadian-income-tax-estimator",
      "rrsp-contribution-impact",
      "mortgage-payment-amortization",
      "rent-vs-buy",
      "gst-hst-calculator",
      "cash-flow-forecast"
    ]
  },
  {
    slug: "richmond",
    name: "Richmond",
    image: "/images/city-richmond.jpg",
    intro:
      "Richmond business owners and families often juggle growth planning with tax deadlines. Olson & Company helps simplify bookkeeping, GST/HST, and tax estimate workflows so decisions stay proactive.",
    localFocus: ["Import/export operations", "Hospitality", "Family-owned enterprises"],
    localChallenges: ["Inventory and margin visibility", "Cross-period cash management", "Payroll consistency"],
    faqs: [
      {
        question: "Do you support incorporated Richmond businesses?",
        answer: "Yes. Corporate tax, bookkeeping, and planning support are available for owner-managed companies."
      },
      {
        question: "Can you help build a monthly cash routine?",
        answer: "Yes. We can set a recurring close process with forecast updates and tax estimate checkpoints."
      }
    ],
    featuredCalculatorSlugs: [
      "incorporation-vs-sole-prop",
      "gst-hst-calculator",
      "payroll-gross-to-net",
      "cash-flow-forecast",
      "margin-markup-calculator",
      "break-even-calculator"
    ]
  },
  {
    slug: "burnaby",
    name: "Burnaby",
    image: "/images/city-burnaby.jpg",
    intro:
      "Burnaby clients often seek clearer forecasting and tax planning while scaling operations. Olson & Company provides practical financial workflows aligned with your reporting cadence.",
    localFocus: ["Technology services", "Retail", "Trades"],
    localChallenges: ["Hiring and payroll transitions", "Loan-backed expansion", "Owner compensation planning"],
    faqs: [
      {
        question: "Can you support both business and personal planning?",
        answer: "Yes. We often coordinate corporate and personal tax planning to reduce surprises at filing time."
      },
      {
        question: "Do you provide monthly bookkeeping support?",
        answer: "Yes. Monthly bookkeeping with management-ready reporting is a core service."
      }
    ],
    featuredCalculatorSlugs: [
      "business-loan-payment",
      "break-even-calculator",
      "contractor-vs-employee-cost",
      "canadian-income-tax-estimator",
      "net-worth-snapshot",
      "cash-flow-forecast"
    ]
  },
  {
    slug: "surrey",
    name: "Surrey",
    image: "/images/city-surrey.jpg",
    intro:
      "Surrey businesses frequently manage rapid growth, staffing changes, and remittance timelines. Olson & Company helps establish dependable accounting routines that support expansion.",
    localFocus: ["Construction and trades", "Health services", "Professional firms"],
    localChallenges: ["Variable monthly revenue", "Project-based costing", "Payroll compliance risk"],
    faqs: [
      {
        question: "Do you support project-based businesses?",
        answer: "Yes. We help set up systems for margin tracking and cash forecasting by month."
      },
      {
        question: "Can you assist with payroll estimate planning?",
        answer: "Yes. We provide a planning framework and warning checks for payroll estimate workflows."
      }
    ],
    featuredCalculatorSlugs: [
      "break-even-calculator",
      "margin-markup-calculator",
      "cash-flow-forecast",
      "payroll-gross-to-net",
      "gst-hst-calculator",
      "debt-payoff-planner"
    ]
  },
  {
    slug: "coquitlam",
    name: "Coquitlam",
    image: "/images/city-coquitlam.jpg",
    intro:
      "Coquitlam households and owner-managed businesses use Olson & Company for practical planning that balances tax efficiency with day-to-day clarity.",
    localFocus: ["Family businesses", "Consulting", "Property owners"],
    localChallenges: ["Personal/business cash overlap", "Mortgage pressure", "Tax installment planning"],
    faqs: [
      {
        question: "Do you help with rent vs buy planning?",
        answer: "Yes. We provide model-based comparisons and planning assumptions you can adjust over time."
      },
      {
        question: "Can I visit your office from Coquitlam?",
        answer: "Yes. Our New Westminster office is available for in-person appointments."
      }
    ],
    featuredCalculatorSlugs: [
      "rent-vs-buy",
      "mortgage-payment-amortization",
      "rrsp-contribution-impact",
      "canadian-income-tax-estimator",
      "retirement-projection",
      "net-worth-snapshot"
    ]
  },
  {
    slug: "port-coquitlam",
    name: "Port Coquitlam",
    image: "/images/city-port-coquitlam.jpg",
    intro:
      "Port Coquitlam clients rely on Olson & Company for clear tax estimates and business reporting habits that stay manageable during busy operating cycles.",
    localFocus: ["Local retail", "Trades", "Small logistics operations"],
    localChallenges: ["Working capital swings", "Pricing discipline", "Owner draw planning"],
    faqs: [
      {
        question: "Can you help improve profitability visibility?",
        answer: "Yes. Margin, markup, and break-even planning are integrated into our advisory workflow."
      },
      {
        question: "Do you offer GST/HST guidance?",
        answer: "Yes. We help clarify collection, input credits, and remittance planning."
      }
    ],
    featuredCalculatorSlugs: [
      "margin-markup-calculator",
      "break-even-calculator",
      "gst-hst-calculator",
      "cash-flow-forecast",
      "business-loan-payment",
      "incorporation-vs-sole-prop"
    ]
  },
  {
    slug: "port-moody",
    name: "Port Moody",
    image: "/images/city-port-moody.jpg",
    intro:
      "Port Moody clients often need integrated planning for personal tax and long-term household decisions. Olson & Company offers straightforward estimate tools and professional support.",
    localFocus: ["Salaried households", "Independent professionals", "Growing families"],
    localChallenges: ["Retirement contribution timing", "Housing decision uncertainty", "Debt prioritization"],
    faqs: [
      {
        question: "Are calculator results exact tax advice?",
        answer: "No. Calculator outputs are estimates and should be validated with CRA information and a professional review."
      },
      {
        question: "Can you support retirement planning conversations?",
        answer: "Yes. We provide estimate-based planning with conservative and base-case scenarios."
      }
    ],
    featuredCalculatorSlugs: [
      "canadian-income-tax-estimator",
      "rrsp-contribution-impact",
      "tfsa-tracker",
      "retirement-projection",
      "debt-payoff-planner",
      "net-worth-snapshot"
    ]
  },
  {
    slug: "new-westminster",
    name: "New Westminster",
    image: "/images/city-new-westminster.jpg",
    intro:
      "Olson & Company is based in New Westminster and serves clients throughout the Lower Mainland. Our local office supports in-person and remote accounting engagements.",
    localFocus: ["Small business accounting", "Personal tax planning", "Monthly bookkeeping"],
    localChallenges: ["Coordinating multiple deadlines", "Interpreting tax estimates", "Maintaining clean records"],
    faqs: [
      {
        question: "Where is your office located?",
        answer: "We are located at 105-443 Sixth Street, New Westminster, BC V3L 3B1."
      },
      {
        question: "Do you support nearby city clients?",
        answer: "Yes. We serve clients across Metro Vancouver and the broader Lower Mainland."
      }
    ],
    featuredCalculatorSlugs: [
      "canadian-income-tax-estimator",
      "gst-hst-calculator",
      "break-even-calculator",
      "cash-flow-forecast",
      "mortgage-payment-amortization",
      "net-worth-snapshot"
    ]
  },
  {
    slug: "north-vancouver",
    name: "North Vancouver",
    image: "/images/city-north-vancouver.jpg",
    intro:
      "North Vancouver clients frequently combine employment income, investments, and business activity. Olson & Company helps simplify those moving parts with practical workflows.",
    localFocus: ["Professional households", "Consultants", "Small incorporated firms"],
    localChallenges: ["Multi-source income reporting", "Cash planning for tax periods", "Contribution strategy"],
    faqs: [
      {
        question: "Can you help estimate taxes for mixed income sources?",
        answer: "Yes. Our planning process considers multiple income categories at a high level for estimate scenarios."
      },
      {
        question: "Do you offer virtual appointments?",
        answer: "Yes. Virtual and in-office meetings are both available."
      }
    ],
    featuredCalculatorSlugs: [
      "canadian-income-tax-estimator",
      "rrsp-contribution-impact",
      "tfsa-tracker",
      "retirement-projection",
      "incorporation-vs-sole-prop",
      "cash-flow-forecast"
    ]
  },
  {
    slug: "west-vancouver",
    name: "West Vancouver",
    image: "/images/city-west-vancouver.jpg",
    intro:
      "West Vancouver households often prioritize long-term planning around retirement, investments, and tax efficiency. Olson & Company supports those goals with practical estimate tools and advisory support.",
    localFocus: ["Retirement planning", "Investment-focused households", "Family tax coordination"],
    localChallenges: ["Contribution optimization", "Withdrawal planning", "Forecasting lifestyle costs"],
    faqs: [
      {
        question: "Do your calculators include inflation assumptions?",
        answer: "Yes. The retirement projection calculator includes an inflation toggle and adjustable rates."
      },
      {
        question: "Can you assist with annual planning reviews?",
        answer: "Yes. We support recurring review sessions to update assumptions and tax projections."
      }
    ],
    featuredCalculatorSlugs: [
      "retirement-projection",
      "rrsp-contribution-impact",
      "tfsa-tracker",
      "net-worth-snapshot",
      "canadian-income-tax-estimator",
      "rent-vs-buy"
    ]
  },
  {
    slug: "delta",
    name: "Delta",
    image: "/images/city-delta.jpg",
    intro:
      "Delta businesses and households use Olson & Company for clear accounting systems and estimate-led planning that supports confident decisions throughout the year.",
    localFocus: ["Local services", "Distribution and trade", "Household tax planning"],
    localChallenges: ["Margin pressure", "Debt and financing decisions", "Tax timing"],
    faqs: [
      {
        question: "Can you help compare financing options?",
        answer: "Yes. We use loan and cash-flow scenario tools to support decision-making discussions."
      },
      {
        question: "Do you support small business owners personally too?",
        answer: "Yes. We can coordinate personal and business planning in one workflow."
      }
    ],
    featuredCalculatorSlugs: [
      "business-loan-payment",
      "cash-flow-forecast",
      "break-even-calculator",
      "debt-payoff-planner",
      "canadian-income-tax-estimator",
      "contractor-vs-employee-cost"
    ]
  },
  {
    slug: "langley",
    name: "Langley",
    image: "/images/city-langley.jpg",
    intro:
      "Langley business operators often need practical financial controls while scaling teams and operations. Olson & Company provides accounting and payroll support anchored in usable monthly reporting.",
    localFocus: ["Construction", "Retail", "Professional services"],
    localChallenges: ["Hiring decisions", "Variable gross margins", "Remittance discipline"],
    faqs: [
      {
        question: "Can you help with contractor vs employee analysis?",
        answer: "Yes. We provide estimate tools and advisory context for workforce cost comparisons."
      },
      {
        question: "Is payroll calculator output final payroll advice?",
        answer: "No. Payroll outputs are structured estimates with clear warnings until current tables are populated."
      }
    ],
    featuredCalculatorSlugs: [
      "contractor-vs-employee-cost",
      "payroll-gross-to-net",
      "margin-markup-calculator",
      "break-even-calculator",
      "gst-hst-calculator",
      "cash-flow-forecast"
    ]
  },
  {
    slug: "maple-ridge",
    name: "Maple Ridge",
    image: "/images/city-maple-ridge.jpg",
    intro:
      "Maple Ridge households and owner-managers turn to Olson & Company for straightforward tax support and planning clarity around housing, debt, and savings priorities.",
    localFocus: ["Family tax planning", "Owner-managed businesses", "Long-term savings"],
    localChallenges: ["Debt prioritization", "Retirement pacing", "Household cash allocation"],
    faqs: [
      {
        question: "Do you provide debt payoff planning support?",
        answer: "Yes. We help model payoff scenarios and discuss practical tradeoffs."
      },
      {
        question: "Can you help with RRSP timing decisions?",
        answer: "Yes. We model estimate impacts and align contribution timing to your cash flow."
      }
    ],
    featuredCalculatorSlugs: [
      "debt-payoff-planner",
      "rrsp-contribution-impact",
      "retirement-projection",
      "mortgage-payment-amortization",
      "canadian-income-tax-estimator",
      "net-worth-snapshot"
    ]
  },
  {
    slug: "pitt-meadows",
    name: "Pitt Meadows",
    image: "/images/city-pitt-meadows.jpg",
    intro:
      "Pitt Meadows clients typically value practical, concise reporting and tax planning that supports both household and business decisions. Olson & Company delivers that with a clear process.",
    localFocus: ["Small business operations", "Family budgeting", "Owner compensation"],
    localChallenges: ["Cash visibility", "Tax estimate confidence", "Planning consistency"],
    faqs: [
      {
        question: "Do you offer annual and monthly support options?",
        answer: "Yes. Engagements can be scoped for annual filings or recurring monthly accounting support."
      },
      {
        question: "Can we use calculators during planning calls?",
        answer: "Yes. Calculators are useful for scenario setup before and during advisory discussions."
      }
    ],
    featuredCalculatorSlugs: [
      "net-worth-snapshot",
      "cash-flow-forecast",
      "gst-hst-calculator",
      "incorporation-vs-sole-prop",
      "business-loan-payment",
      "break-even-calculator"
    ]
  },
  {
    slug: "white-rock",
    name: "White Rock",
    image: "/images/city-white-rock.jpg",
    intro:
      "White Rock households often need reliable tax estimates and retirement-oriented planning tools. Olson & Company supports those decisions with practical guidance and transparent assumptions.",
    localFocus: ["Retirees", "Pre-retirement households", "Investment income planning"],
    localChallenges: ["Income timing choices", "Withdrawal planning", "Long-term inflation impact"],
    faqs: [
      {
        question: "Do you work with retirement-focused clients?",
        answer: "Yes. Retirement projection and tax estimate planning are common parts of our advisory work."
      },
      {
        question: "Can I get in-person support from White Rock?",
        answer: "Yes. Appointments can be scheduled at our New Westminster office."
      }
    ],
    featuredCalculatorSlugs: [
      "retirement-projection",
      "tfsa-tracker",
      "rrsp-contribution-impact",
      "canadian-income-tax-estimator",
      "debt-payoff-planner",
      "net-worth-snapshot"
    ]
  },
  {
    slug: "tri-cities",
    name: "Tri-Cities",
    image: "/images/city-tri-cities.jpg",
    intro:
      "Tri-Cities clients in Coquitlam, Port Coquitlam, and Port Moody choose Olson & Company for dependable accounting support with practical estimate tools for households and businesses.",
    localFocus: ["Multi-city family businesses", "Growing owner-operated companies", "Household financial planning"],
    localChallenges: ["Coordinating personal and business tax", "Cash planning across seasonal periods", "Workforce cost decisions"],
    faqs: [
      {
        question: "Do you serve all three Tri-Cities communities?",
        answer: "Yes. We support clients in Coquitlam, Port Coquitlam, and Port Moody."
      },
      {
        question: "What calculators are most useful for Tri-Cities businesses?",
        answer: "Cash flow, break-even, payroll, and GST/HST tools are often the highest-impact starting point."
      }
    ],
    featuredCalculatorSlugs: [
      "cash-flow-forecast",
      "break-even-calculator",
      "payroll-gross-to-net",
      "gst-hst-calculator",
      "contractor-vs-employee-cost",
      "canadian-income-tax-estimator"
    ]
  }
];

export const cityBySlug = Object.fromEntries(cityPages.map((city) => [city.slug, city]));
