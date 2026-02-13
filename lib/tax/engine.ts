import { taxRulesByYear } from "@/lib/tax/rules";
import type { TaxBracket, TaxComputationInput, TaxComputationResult, TaxYearRules } from "@/lib/tax/types";

export function calculateBracketTax(income: number, brackets: TaxBracket[]): number {
  if (income <= 0) {
    return 0;
  }

  let remaining = income;
  let previousCap = 0;
  let totalTax = 0;

  for (const bracket of brackets) {
    if (remaining <= 0) {
      break;
    }

    const cap = bracket.upTo ?? Number.POSITIVE_INFINITY;
    const taxableInBracket = Math.max(0, Math.min(remaining, cap - previousCap));

    totalTax += taxableInBracket * bracket.rate;
    remaining -= taxableInBracket;
    previousCap = cap;
  }

  return totalTax;
}

export function marginalRateForIncome(income: number, brackets: TaxBracket[]): number {
  if (income <= 0) {
    return 0;
  }

  let previousCap = 0;

  for (const bracket of brackets) {
    const cap = bracket.upTo ?? Number.POSITIVE_INFINITY;
    if (income <= cap) {
      return bracket.rate;
    }
    previousCap = cap;
  }

  return brackets[brackets.length - 1]?.rate ?? 0;
}

function nonRefundableCredit(amount: number, rate: number) {
  return Math.max(0, amount) * rate;
}

function ruleForYear(year: number): TaxYearRules | null {
  return taxRulesByYear[year] ?? null;
}

export function computeCanadianBcIncomeTax(input: TaxComputationInput): TaxComputationResult {
  const rules = ruleForYear(input.year);
  const warnings: string[] = [];

  if (!rules) {
    return {
      year: input.year,
      taxableIncome: 0,
      federalTax: 0,
      bcTax: 0,
      totalTax: 0,
      netIncome: 0,
      marginalRate: 0,
      averageRate: 0,
      warnings: [
        `Tax data missing for ${input.year}. Add a tax rules module before relying on this estimate.`
      ]
    };
  }

  const taxableIncome = Math.max(0, input.grossIncome - input.rrspContribution - input.otherDeductions);

  const federalGrossTax = calculateBracketTax(taxableIncome, rules.federal.brackets);
  const bcGrossTax = calculateBracketTax(taxableIncome, rules.bc.brackets);

  const federalCredit = nonRefundableCredit(rules.federal.basicPersonalAmount, rules.federal.brackets[0].rate);
  const bcCredit = nonRefundableCredit(rules.bc.basicPersonalAmount, rules.bc.brackets[0].rate);

  const federalTax = Math.max(0, federalGrossTax - federalCredit);
  const bcTax = Math.max(0, bcGrossTax - bcCredit);

  const totalTax = federalTax + bcTax;
  const netIncome = Math.max(0, input.grossIncome - totalTax);

  const federalMarginal = marginalRateForIncome(taxableIncome, rules.federal.brackets);
  const bcMarginal = marginalRateForIncome(taxableIncome, rules.bc.brackets);
  const marginalRate = federalMarginal + bcMarginal;
  const averageRate = input.grossIncome <= 0 ? 0 : totalTax / input.grossIncome;

  if (rules.status !== "verified") {
    warnings.push(
      `Tax data for ${input.year} is placeholder only. Confirm rates and credits with CRA and BC official sources.`
    );
  }

  warnings.push("Estimate only. This tool is not tax advice.");

  return {
    year: input.year,
    taxableIncome,
    federalTax,
    bcTax,
    totalTax,
    netIncome,
    marginalRate,
    averageRate,
    warnings
  };
}
