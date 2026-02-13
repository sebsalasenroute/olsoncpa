"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { calculatorBySlug } from "@/lib/calculators/catalog";
import { monthKeys, monthLabels } from "@/lib/calculators/constants";
import { loadCalculatorRunner } from "@/lib/calculators/engine";
import type {
  CalculatorField,
  CalculatorInputValue,
  CalculatorOutput,
  MonthGridValue
} from "@/lib/calculators/types";

const LazyCalculatorChart = dynamic(
  () => import("@/components/calculators/CalculatorChart").then((mod) => mod.CalculatorChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 w-full animate-pulse rounded-lg border border-slate-200 bg-slate-100" aria-hidden="true" />
    )
  }
);

type CalculatorRuntimeProps = {
  slug: string;
};

function defaultValuesForFields(fields: CalculatorField[]) {
  return fields.reduce<Record<string, CalculatorInputValue>>((acc, field) => {
    if (field.type === "monthGrid") {
      acc[field.key] = { ...(field.defaultValue as MonthGridValue) };
      return acc;
    }
    acc[field.key] = field.defaultValue;
    return acc;
  }, {});
}

function encodeFieldValue(field: CalculatorField, value: CalculatorInputValue) {
  if (field.type === "monthGrid") {
    const grid = value as MonthGridValue;
    return monthKeys.map((key) => String(grid[key] ?? 0)).join(",");
  }
  return String(value);
}

function parseFieldValue(field: CalculatorField, rawValue: string): CalculatorInputValue {
  if (field.type === "number") {
    const parsed = Number(rawValue);
    return Number.isFinite(parsed) ? parsed : field.defaultValue;
  }

  if (field.type === "boolean") {
    return rawValue === "true";
  }

  if (field.type === "monthGrid") {
    const values = rawValue.split(",").map((entry) => Number(entry));
    return monthKeys.reduce<Record<string, number>>((acc, key, index) => {
      const value = values[index];
      acc[key] = Number.isFinite(value) ? value : Number((field.defaultValue as MonthGridValue)[key] ?? 0);
      return acc;
    }, {});
  }

  return rawValue;
}

function validateField(field: CalculatorField, value: CalculatorInputValue) {
  if (field.type === "number") {
    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) {
      return "Enter a valid number.";
    }

    if (typeof field.min === "number" && numericValue < field.min) {
      return `Minimum value is ${field.min}.`;
    }

    if (typeof field.max === "number" && numericValue > field.max) {
      return `Maximum value is ${field.max}.`;
    }
  }

  if (field.type === "monthGrid") {
    const grid = value as MonthGridValue;
    for (const key of monthKeys) {
      if (!Number.isFinite(Number(grid[key]))) {
        return "Each month requires a valid number.";
      }
    }
  }

  return "";
}

export function CalculatorRuntime({ slug }: CalculatorRuntimeProps) {
  const calculator = calculatorBySlug[slug];
  const pathname = usePathname();
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const [runner, setRunner] = useState<null | ((values: Record<string, CalculatorInputValue>) => CalculatorOutput)>(
    null
  );
  const [values, setValues] = useState<Record<string, CalculatorInputValue>>(() =>
    defaultValuesForFields(calculator.fields)
  );
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    let active = true;
    loadCalculatorRunner(slug).then((loaded) => {
      if (active) {
        setRunner(() => loaded);
      }
    });

    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    setShowChart(isDesktop);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.size === 0) {
      return;
    }

    setValues((current) => {
      const next = { ...current };
      calculator.fields.forEach((field) => {
        const raw = params.get(field.key);
        if (raw === null) {
          return;
        }
        next[field.key] = parseFieldValue(field, raw);
      });
      return next;
    });
  }, [calculator.fields]);

  const errors = useMemo(() => {
    return calculator.fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.key] = validateField(field, values[field.key]);
      return acc;
    }, {});
  }, [calculator.fields, values]);

  const hasErrors = Object.values(errors).some((error) => Boolean(error));

  const output = useMemo(() => {
    if (!runner || hasErrors) {
      return null;
    }
    return runner(values);
  }, [runner, hasErrors, values]);

  const hasTaxDataWarning = output?.warnings?.some(
    (warning) => warning.toLowerCase().includes("placeholder") || warning.toLowerCase().includes("tax data missing")
  );

  const onShare = async () => {
    const params = new URLSearchParams();
    calculator.fields.forEach((field) => {
      params.set(field.key, encodeFieldValue(field, values[field.key]));
    });

    const shareUrl = `${window.location.origin}${pathname}?${params.toString()}`;
    window.history.replaceState({}, "", `${pathname}?${params.toString()}`);

    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareCopied(true);
      window.setTimeout(() => setShareCopied(false), 1800);
    } catch {
      setShareCopied(false);
    }
  };

  const onCopySummary = async () => {
    if (!output) {
      return;
    }

    const summary = output.summary.map((item) => `${item.label}: ${item.value}`).join("\n");
    const narrative = output.narrative.join("\n");
    const text = `${calculator.title}\n\n${summary}\n\n${narrative}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const onReset = () => {
    setValues(defaultValuesForFields(calculator.fields));
    window.history.replaceState({}, "", pathname);
  };

  const jumpToResults = () => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="reveal-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-semibold text-slate-900">Inputs</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="tap-target rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              onClick={onShare}
            >
              {shareCopied ? "Link Copied" : "Share"}
            </button>
            <button
              type="button"
              className="tap-target rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              onClick={onReset}
            >
              Reset
            </button>
            <button
              type="button"
              className="tap-target rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800 lg:hidden"
              onClick={jumpToResults}
            >
              Jump to Results
            </button>
          </div>
        </div>

        <div aria-live="polite" className="sr-only">
          {shareCopied ? "Share link copied." : ""}
          {copied ? "Summary copied." : ""}
        </div>

        <div className="space-y-4">
          {calculator.fields.map((field) => {
            const value = values[field.key];
            const error = errors[field.key];
            const fieldId = `${calculator.slug}-${field.key}`;

            if (field.type === "select") {
              return (
                <label key={field.key} className="block" htmlFor={fieldId}>
                  <span className="mb-1 inline-flex items-center text-sm font-medium text-slate-800">
                    {field.label}
                    {field.helpText ? (
                      <span className="ml-1 cursor-help text-slate-400" title={field.helpText}>
                        ?
                      </span>
                    ) : null}
                  </span>
                  <select
                    id={fieldId}
                    className="tap-target w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    value={String(value)}
                    onChange={(event) => {
                      const nextValue = event.target.value;
                      setValues((current) => ({ ...current, [field.key]: nextValue }));
                    }}
                  >
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }

            if (field.type === "boolean") {
              return (
                <label
                  key={field.key}
                  htmlFor={fieldId}
                  className="tap-target flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2"
                >
                  <input
                    id={fieldId}
                    type="checkbox"
                    checked={Boolean(value)}
                    onChange={(event) => {
                      setValues((current) => ({ ...current, [field.key]: event.target.checked }));
                    }}
                  />
                  <span className="text-sm font-medium text-slate-800">{field.label}</span>
                </label>
              );
            }

            if (field.type === "monthGrid") {
              const grid = value as MonthGridValue;
              return (
                <div key={field.key} className="rounded-lg border border-slate-300 p-3">
                  <div className="mb-2 inline-flex items-center text-sm font-medium text-slate-800">
                    {field.label}
                    {field.helpText ? (
                      <span className="ml-1 cursor-help text-slate-400" title={field.helpText}>
                        ?
                      </span>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {monthKeys.map((monthKey, index) => (
                      <label key={monthKey} className="text-xs">
                        <span className="mb-1 block text-slate-600">{monthLabels[index]}</span>
                        <input
                          type="number"
                          inputMode="decimal"
                          className="tap-target w-full rounded border border-slate-300 px-2 py-1.5 text-sm"
                          value={grid[monthKey]}
                          onChange={(event) => {
                            const nextValue = Number(event.target.value);
                            setValues((current) => ({
                              ...current,
                              [field.key]: {
                                ...(current[field.key] as MonthGridValue),
                                [monthKey]: Number.isFinite(nextValue) ? nextValue : 0
                              }
                            }));
                          }}
                        />
                      </label>
                    ))}
                  </div>
                  {error ? <p className="mt-2 text-xs text-rose-600">{error}</p> : null}
                </div>
              );
            }

            return (
              <div key={field.key}>
                <label className="mb-1 inline-flex items-center text-sm font-medium text-slate-800" htmlFor={fieldId}>
                  {field.label}
                  {field.helpText ? (
                    <span className="ml-1 cursor-help text-slate-400" title={field.helpText}>
                      ?
                    </span>
                  ) : null}
                </label>
                <div className="flex items-center gap-2">
                  {field.prefix ? <span className="text-sm text-slate-500">{field.prefix}</span> : null}
                  <input
                    id={fieldId}
                    type="number"
                    inputMode="decimal"
                    className="tap-target w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    value={Number(value)}
                    step={field.step ?? 1}
                    min={field.min}
                    max={field.max}
                    onChange={(event) => {
                      const numericValue = Number(event.target.value);
                      setValues((current) => ({
                        ...current,
                        [field.key]: Number.isFinite(numericValue) ? numericValue : 0
                      }));
                    }}
                  />
                  {field.suffix ? <span className="text-sm text-slate-500">{field.suffix}</span> : null}
                </div>
                {field.slider ? (
                  <input
                    type="range"
                    className="mt-2 w-full"
                    value={Number(value)}
                    min={field.min ?? 0}
                    max={field.max ?? Math.max(Number(value) * 2, Number(value) + 100)}
                    step={field.step ?? 1}
                    onChange={(event) => {
                      const numericValue = Number(event.target.value);
                      setValues((current) => ({
                        ...current,
                        [field.key]: Number.isFinite(numericValue) ? numericValue : 0
                      }));
                    }}
                  />
                ) : null}
                {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-6" ref={resultsRef} id="calculator-results">
        <div className="reveal-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-slate-900">Results</h2>
            <button
              type="button"
              className="tap-target rounded-md bg-sky-700 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-800 disabled:opacity-50"
              onClick={onCopySummary}
              disabled={!output}
            >
              {copied ? "Copied" : "Copy Summary"}
            </button>
          </div>

          {!runner ? <p className="text-sm text-slate-600">Loading calculator...</p> : null}
          {runner && hasErrors ? (
            <p className="text-sm text-rose-600">Resolve validation errors to view results.</p>
          ) : null}

          {output ? (
            <>
              {hasTaxDataWarning ? (
                <div className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                  Tax data missing or placeholder values detected. Results are estimates only until verified tax-year data
                  is entered.
                </div>
              ) : null}

              <dl className="grid gap-3 sm:grid-cols-2">
                {output.summary.map((item) => (
                  <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <dt className="text-xs uppercase tracking-wide text-slate-500">{item.label}</dt>
                    <dd className="mt-1 text-base font-semibold text-slate-900">{item.value}</dd>
                  </div>
                ))}
              </dl>

              {output.narrative.length > 0 ? (
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {output.narrative.map((line) => (
                    <li key={line}>• {line}</li>
                  ))}
                </ul>
              ) : null}

              {output.warnings && output.warnings.length > 0 ? (
                <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                  {output.warnings.map((warning) => (
                    <p key={warning}>{warning}</p>
                  ))}
                </div>
              ) : null}
            </>
          ) : null}
        </div>

        {output?.chart ? (
          <div className="reveal-up space-y-3">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
              <h3 className="text-sm font-semibold text-slate-900">Chart</h3>
              <button
                type="button"
                className="tap-target rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                onClick={() => setShowChart((current) => !current)}
              >
                {showChart ? "Hide Chart" : "Show Chart"}
              </button>
            </div>
            {showChart ? <LazyCalculatorChart chart={output.chart} /> : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
