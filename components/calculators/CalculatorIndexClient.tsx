"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { calculatorCategories, calculatorCatalog } from "@/lib/calculators/catalog";

export function CalculatorIndexClient() {
  const [categoryFilter, setCategoryFilter] = useState<(typeof calculatorCategories)[number]["value"]>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return calculatorCatalog.filter((calculator) => {
      const categoryMatch = categoryFilter === "all" || calculator.category === categoryFilter;
      const queryMatch =
        query.trim().length === 0 ||
        `${calculator.title} ${calculator.shortDescription}`.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && queryMatch;
    });
  }, [categoryFilter, query]);

  return (
    <div className="space-y-6">
      <section className="reveal-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h1 className="text-3xl font-semibold text-slate-900">Accounting Calculators</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-700 md:text-base">
          Instant estimate tools for personal and business planning in BC. Every calculator includes shareable scenarios,
          summary copy, FAQs, and clear estimate disclaimers.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            type="search"
            placeholder="Search calculators"
            className="tap-target rounded-md border border-slate-300 px-3 py-2 text-sm"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {calculatorCategories.map((category) => (
              <button
                key={category.value}
                type="button"
                onClick={() => setCategoryFilter(category.value)}
                className={`rounded-md px-3 py-2 text-xs font-semibold transition ${
                  categoryFilter === category.value
                    ? "bg-sky-700 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-600">
          Showing <strong>{filtered.length}</strong> calculator{filtered.length === 1 ? "" : "s"}.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((calculator) => (
          <article key={calculator.slug} className="reveal-up flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{calculator.category}</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900">{calculator.title}</h2>
            <p className="mt-2 flex-1 text-sm text-slate-700">{calculator.shortDescription}</p>
            <Link
              href={`/calculators/${calculator.slug}`}
              className="tap-target mt-4 inline-flex rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-800"
            >
              Open Calculator
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
