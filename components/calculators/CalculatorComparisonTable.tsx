import Link from "next/link";
import { calculatorComparisonRows } from "@/lib/calculators/comparison";

type CalculatorComparisonTableProps = {
  title?: string;
  description?: string;
  slugs?: string[];
};

export function CalculatorComparisonTable({
  title = "Calculator Comparison Table",
  description = "Compare planning tools by use case, depth, and expected output.",
  slugs
}: CalculatorComparisonTableProps) {
  const rows = calculatorComparisonRows(slugs);

  return (
    <section className="reveal-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-700">{description}</p>

      <div className="mt-4 space-y-3 md:hidden">
        {rows.map((row) => (
          <article key={row.slug} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-semibold text-slate-900">{row.title}</h3>
              <span className="inline-flex rounded bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                {row.category}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-700">
              <strong>Best for:</strong> {row.bestFor}
            </p>
            <p className="mt-1 text-xs text-slate-700">
              <strong>Primary output:</strong> {row.primaryOutcome}
            </p>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-700">
              <span>
                <strong>Depth:</strong> {row.inputDepth}
              </span>
              <span>
                <strong>Time:</strong> {row.estimatedTime}
              </span>
            </div>
            <Link
              href={`/calculators/${row.slug}`}
              className="tap-target mt-3 inline-flex rounded-md bg-sky-700 px-3 py-2 text-xs font-semibold text-white"
            >
              Open Calculator
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-4 hidden overflow-x-auto md:block">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-600">
              <th className="px-3 py-2">Calculator</th>
              <th className="px-3 py-2">Best For</th>
              <th className="px-3 py-2">Input Depth</th>
              <th className="px-3 py-2">Time</th>
              <th className="px-3 py-2">Primary Output</th>
              <th className="px-3 py-2">Open</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.slug} className="border-b border-slate-200 align-top text-slate-700">
                <td className="px-3 py-2 font-medium text-slate-900">
                  <span className="block">{row.title}</span>
                  <span className="mt-0.5 inline-flex rounded bg-slate-100 px-2 py-0.5 text-xs uppercase text-slate-600">
                    {row.category}
                  </span>
                </td>
                <td className="px-3 py-2">{row.bestFor}</td>
                <td className="px-3 py-2">{row.inputDepth}</td>
                <td className="px-3 py-2">{row.estimatedTime}</td>
                <td className="px-3 py-2">{row.primaryOutcome}</td>
                <td className="px-3 py-2">
                  <Link href={`/calculators/${row.slug}`} className="font-semibold text-sky-700 hover:underline">
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
