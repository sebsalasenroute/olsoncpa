export type CalculatorCategory = "personal" | "business" | "payroll" | "tax";

export type CalculatorBannerType =
  | "tax"
  | "bookkeeping"
  | "payroll"
  | "corporate-tax"
  | "general";

export type CalculatorFieldType = "number" | "select" | "boolean" | "monthGrid";

export type CalculatorFieldOption = {
  label: string;
  value: string;
};

export type MonthGridValue = Record<string, number>;

export type CalculatorInputValue = number | string | boolean | MonthGridValue;

export type CalculatorField = {
  key: string;
  label: string;
  type: CalculatorFieldType;
  defaultValue: CalculatorInputValue;
  min?: number;
  max?: number;
  step?: number;
  slider?: boolean;
  prefix?: string;
  suffix?: string;
  helpText?: string;
  options?: CalculatorFieldOption[];
};

export type SummaryItem = {
  label: string;
  value: string;
};

export type CalculatorChartSeries = {
  key: string;
  name: string;
  color: string;
};

export type CalculatorChart = {
  type: "line" | "bar" | "area";
  xKey: string;
  data: Array<Record<string, number | string>>;
  series: CalculatorChartSeries[];
};

export type CalculatorOutput = {
  summary: SummaryItem[];
  narrative: string[];
  chart?: CalculatorChart;
  warnings?: string[];
  details?: Array<Record<string, string | number>>;
};

export type CalculatorFaq = {
  question: string;
  answer: string;
};

export type CalculatorCatalogItem = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: CalculatorCategory;
  bannerType: CalculatorBannerType;
  fields: CalculatorField[];
  howItWorks: string[];
  faqs: CalculatorFaq[];
  relatedServiceSlugs: string[];
  relatedCitySlugs: string[];
  disclaimers: string[];
};

export type CalculatorRunner = (inputs: Record<string, CalculatorInputValue>) => CalculatorOutput;
