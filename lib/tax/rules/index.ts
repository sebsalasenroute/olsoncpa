import { taxRules2025 } from "@/lib/tax/rules/2025";
import { taxRules2026 } from "@/lib/tax/rules/2026";
import type { TaxYearRules } from "@/lib/tax/types";

export const taxRulesByYear: Record<number, TaxYearRules> = {
  2025: taxRules2025,
  2026: taxRules2026
};

export function availableTaxYears() {
  return Object.keys(taxRulesByYear)
    .map((value) => Number(value))
    .sort((a, b) => b - a);
}
