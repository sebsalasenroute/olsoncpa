import Link from "next/link";
import { notFound } from "next/navigation";
import { CityHeroBanner } from "@/components/banners/CityHeroBanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { FAQSection } from "@/components/shared/FAQSection";
import { VisitOfficeCta } from "@/components/shared/VisitOfficeCta";
import { calculatorBySlug } from "@/lib/calculators/catalog";
import { cityBySlug, cityPages } from "@/lib/cities";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildLocalBusinessSchema } from "@/lib/schema";

const fallbackCalculatorSlugs = [
  "canadian-income-tax-estimator",
  "gst-hst-calculator",
  "break-even-calculator",
  "cash-flow-forecast",
  "mortgage-payment-amortization",
  "rrsp-contribution-impact"
];

type CityPageProps = {
  params: {
    city: string;
  };
};

export function generateStaticParams() {
  return cityPages.map((city) => ({ city: city.slug }));
}

export function generateMetadata({ params }: CityPageProps) {
  const city = cityBySlug[params.city];
  if (!city) {
    return {};
  }

  return buildMetadata({
    title: `Accounting Services in ${city.name}, BC`,
    description: city.intro,
    path: `/locations/${city.slug}`,
    image: city.image
  });
}

export default function CityPage({ params }: CityPageProps) {
  const city = cityBySlug[params.city];

  if (!city) {
    notFound();
  }

  const calculators = (city.featuredCalculatorSlugs.length ? city.featuredCalculatorSlugs : fallbackCalculatorSlugs)
    .map((slug) => calculatorBySlug[slug])
    .filter((value): value is NonNullable<typeof value> => Boolean(value));

  return (
    <div className="space-y-6">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" },
          { name: city.name, path: `/locations/${city.slug}` }
        ])}
      />
      <JsonLd data={buildLocalBusinessSchema({ areaServed: [city.name], urlPath: `/locations/${city.slug}` })} />
      <JsonLd data={buildFaqSchema(city.faqs)} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: city.name, href: `/locations/${city.slug}` }
        ]}
      />

      <CityHeroBanner title={city.name} subtitle={city.intro} imageSrc={city.image} />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Local Accounting Focus</h2>
          <p className="mt-3 text-sm text-slate-700">{city.intro}</p>

          <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-600">Industries and client types</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {city.localFocus.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>

          <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-600">Common planning challenges</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {city.localChallenges.map((challenge) => (
              <li key={challenge}>• {challenge}</li>
            ))}
          </ul>
        </article>

        <VisitOfficeCta />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Recommended Calculators for {city.name}</h2>
        <p className="mt-2 text-sm text-slate-700">
          Use these tools to estimate personal and business scenarios, then validate assumptions with Olson & Company.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calculator) => (
            <article key={calculator.slug} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase text-slate-500">{calculator.category}</p>
              <h3 className="mt-1 text-base font-semibold text-slate-900">{calculator.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{calculator.shortDescription}</p>
              <Link href={`/calculators/${calculator.slug}`} className="mt-3 inline-flex text-sm font-semibold text-sky-700 hover:underline">
                Open calculator
              </Link>
            </article>
          ))}
        </div>
      </section>

      <FAQSection title={`${city.name} FAQs`} items={city.faqs} />
    </div>
  );
}
