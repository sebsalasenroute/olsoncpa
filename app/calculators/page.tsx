import type { Metadata } from "next";
import { CalculatorComparisonTable } from "@/components/calculators/CalculatorComparisonTable";
import { CalculatorIndexClient } from "@/components/calculators/CalculatorIndexClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Accounting Calculators for BC Households and Businesses",
  description:
    "Interactive accounting calculators for tax, payroll, cash flow, debt, and planning scenarios across BC and the Lower Mainland.",
  path: "/calculators",
  image: "/images/banner-tax-season.jpg"
});

export default function CalculatorsPage() {
  return (
    <div className="space-y-6">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Calculators", path: "/calculators" }
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" }
        ]}
      />
      <CalculatorIndexClient />
      <CalculatorComparisonTable
        title="Which Calculator Should You Use?"
        description="Choose the right tool quickly by comparing use case, complexity, and output format."
      />
    </div>
  );
}
