import Link from "next/link";
import { notFound } from "next/navigation";
import { CalculatorHeroBanner } from "@/components/banners/CalculatorHeroBanner";
import { CalculatorComparisonTable } from "@/components/calculators/CalculatorComparisonTable";
import { CalculatorRuntime } from "@/components/calculators/CalculatorRuntime";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQSection } from "@/components/shared/FAQSection";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { calculatorBySlug, calculatorCatalog } from "@/lib/calculators/catalog";
import { cityBySlug } from "@/lib/cities";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebApplicationSchema } from "@/lib/schema";
import { servicesBySlug } from "@/lib/services";

const bannerByType = {
  tax: "/images/banner-tax-season.jpg",
  bookkeeping: "/images/banner-bookkeeping.jpg",
  payroll: "/images/banner-payroll.jpg",
  "corporate-tax": "/images/banner-corporate-tax.jpg",
  general: "/images/banner-personal-tax.jpg"
} as const;

type CalculatorPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return calculatorCatalog.map((calculator) => ({ slug: calculator.slug }));
}

export function generateMetadata({ params }: CalculatorPageProps) {
  const calculator = calculatorBySlug[params.slug];
  if (!calculator) {
    return {};
  }

  return buildMetadata({
    title: `${calculator.title} | BC Calculator`,
    description: calculator.longDescription,
    path: `/calculators/${calculator.slug}`,
    image: bannerByType[calculator.bannerType]
  });
}

export default function CalculatorPage({ params }: CalculatorPageProps) {
  const calculator = calculatorBySlug[params.slug];

  if (!calculator) {
    notFound();
  }

  const relatedServices = calculator.relatedServiceSlugs
    .map((slug) => servicesBySlug[slug])
    .filter((value): value is NonNullable<typeof value> => Boolean(value));

  const relatedCities = calculator.relatedCitySlugs
    .map((slug) => cityBySlug[slug])
    .filter((value): value is NonNullable<typeof value> => Boolean(value));
  const comparisonSlugs = [calculator.slug, ...calculator.relatedServiceSlugs.flatMap((serviceSlug) => {
    const service = servicesBySlug[serviceSlug];
    return service ? service.relatedCalculatorSlugs : [];
  })].filter((slug, index, all) => all.indexOf(slug) === index).slice(0, 6);

  return (
    <div className="space-y-6">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Calculators", path: "/calculators" },
          { name: calculator.title, path: `/calculators/${calculator.slug}` }
        ])}
      />
      <JsonLd data={buildFaqSchema(calculator.faqs)} />
      <JsonLd
        data={buildWebApplicationSchema({
          name: calculator.title,
          description: calculator.longDescription,
          slug: calculator.slug,
          category: calculator.category
        })}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Calculators", href: "/calculators" },
          { label: calculator.title, href: `/calculators/${calculator.slug}` }
        ]}
      />

      <CalculatorHeroBanner
        title={calculator.title}
        subtitle={calculator.longDescription}
        imageSrc={bannerByType[calculator.bannerType]}
      />

      <CalculatorRuntime slug={calculator.slug} />

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="text-2xl font-semibold text-slate-900">How This Works</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          {calculator.howItWorks.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Related Services and Locations</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Services</h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {relatedServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="font-medium text-sky-700 hover:underline">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">City Pages</h3>
            <ul className="mt-2 space-y-2 text-sm text-slate-700">
              {relatedCities.map((city) => (
                <li key={city.slug}>
                  <Link href={`/locations/${city.slug}`} className="font-medium text-sky-700 hover:underline">
                    Accounting in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 shadow-sm md:p-6">
        <h2 className="text-lg font-semibold">Important Disclaimer</h2>
        <ul className="mt-2 space-y-1">
          {calculator.disclaimers.map((disclaimer) => (
            <li key={disclaimer}>{disclaimer}</li>
          ))}
        </ul>
      </section>

      <CalculatorComparisonTable
        title="Compare Related Calculators"
        description="Review adjacent tools before finalizing your planning scenario."
        slugs={comparisonSlugs}
      />

      <FAQSection title="Calculator FAQs" items={calculator.faqs} />
    </div>
  );
}
