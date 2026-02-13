import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Website and Calculator Disclaimer",
  description: "Estimate-only disclaimer for Olson & Company calculator tools and content.",
  path: "/disclaimer"
});

export default function DisclaimerPage() {
  return (
    <article className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm md:p-8">
      <h1 className="text-3xl font-semibold text-amber-950">Disclaimer</h1>
      <div className="mt-4 space-y-4 text-sm text-amber-900">
        <p>
          All calculator outputs on this site are estimates only and are provided for informational planning purposes.
        </p>
        <p>
          Olson & Company does not guarantee accuracy, completeness, or suitability for any specific filing, remittance,
          payroll, or investment decision.
        </p>
        <p>
          Always validate calculations against official CRA publications and provincial guidance, and consult a qualified
          professional before acting on estimates.
        </p>
      </div>
    </article>
  );
}
