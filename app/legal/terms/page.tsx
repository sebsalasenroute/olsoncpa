import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: "Terms of use for Olson & Company website content and calculators.",
  path: "/legal/terms"
});

export default function TermsPage() {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h1 className="text-3xl font-semibold text-slate-900">Terms of Use</h1>
      <div className="mt-4 space-y-4 text-sm text-slate-700">
        <p>
          Website content and calculators are provided for educational and planning purposes only. They do not constitute
          accounting, tax, legal, or financial advice.
        </p>
        <p>
          Users are responsible for confirming final values and obligations with official CRA resources and qualified
          professionals.
        </p>
        <p>
          Olson & Company may revise site content, calculator formulas, and assumptions without notice.
        </p>
      </div>
    </article>
  );
}
