import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { calculatorCatalog } from "@/lib/calculators/catalog";
import { cityPages } from "@/lib/cities";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildLocalBusinessSchema } from "@/lib/schema";
import { services } from "@/lib/services";

export const metadata = buildMetadata({
  title: "Accounting Firm in New Westminster, BC",
  description:
    "Olson & Company provides personal tax, corporate tax, bookkeeping, payroll, and practical calculator tools for Metro Vancouver and the Lower Mainland.",
  path: "/",
  image: "/images/hero-office-exterior.jpg"
});

const featuredCalculators = calculatorCatalog.slice(0, 6);

export default function HomePage() {
  return (
    <div className="space-y-10">
      <JsonLd data={buildLocalBusinessSchema({ urlPath: "/" })} />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Lower Mainland Accounting</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">
            Accounting and tax planning that stays practical.
          </h1>
          <p className="mt-4 text-base text-slate-700">
            Olson & Company supports households and businesses across BC&apos;s Lower Mainland from our New Westminster office,
            combining professional accounting services with interactive planning calculators.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800">
              Book Consultation
            </Link>
            <Link href="/calculators" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Explore Calculators
            </Link>
          </div>
          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-slate-50 p-3">
              <dt className="text-xs uppercase text-slate-500">Focus</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">BC / Lower Mainland</dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <dt className="text-xs uppercase text-slate-500">Engagement</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">Partner-led planning and compliance</dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <dt className="text-xs uppercase text-slate-500">Client Profile</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">Families, founders, and growing firms</dd>
            </div>
          </dl>
        </div>

        <div className="space-y-4">
          <Image
            src="/images/hero-office-exterior.jpg"
            alt="Olson & Company office exterior"
            width={1200}
            height={650}
            priority
            className="h-56 w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
          />
          <Image
            src="/images/banner-bookkeeping.jpg"
            alt="Tax planning documents and bookkeeping worksheet"
            width={1200}
            height={650}
            className="h-56 w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Featured Calculators</h2>
            <p className="mt-2 text-sm text-slate-700">Estimate outcomes instantly, share scenarios, and copy planning summaries.</p>
          </div>
          <Link href="/calculators" className="text-sm font-semibold text-sky-700 hover:underline">
            View all calculators
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredCalculators.map((calculator) => (
            <article key={calculator.slug} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">{calculator.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{calculator.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{calculator.shortDescription}</p>
              <Link href={`/calculators/${calculator.slug}`} className="mt-3 inline-flex text-sm font-semibold text-sky-700 hover:underline">
                Open calculator
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Core Services</h2>
          <ul className="mt-4 space-y-4">
            {services.map((service) => (
              <li key={service.slug} className="rounded-lg border border-slate-200 p-3">
                <h3 className="text-base font-semibold text-slate-900">{service.name}</h3>
                <p className="mt-1 text-sm text-slate-700">{service.shortDescription}</p>
                <Link href={`/services/${service.slug}`} className="mt-2 inline-flex text-sm font-semibold text-sky-700 hover:underline">
                  Explore service
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Lower Mainland Locations</h2>
          <p className="mt-2 text-sm text-slate-700">Dedicated city pages with localized guidance and calculator recommendations.</p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-slate-700 md:grid-cols-3">
            {cityPages.map((city) => (
              <Link
                key={city.slug}
                href={`/locations/${city.slug}`}
                className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-2 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
