import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceHeroBanner } from "@/components/banners/ServiceHeroBanner";
import { CalculatorComparisonTable } from "@/components/calculators/CalculatorComparisonTable";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { calculatorBySlug } from "@/lib/calculators/catalog";
import { cityPages } from "@/lib/cities";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildServiceSchema } from "@/lib/schema";
import { services, servicesBySlug } from "@/lib/services";

type ServicePageProps = {
  params: {
    service: string;
  };
};

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps) {
  const service = servicesBySlug[params.service];
  if (!service) {
    return {};
  }

  return buildMetadata({
    title: `${service.name} in the Lower Mainland`,
    description: service.shortDescription,
    path: `/services/${service.slug}`,
    image: service.heroImage
  });
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = servicesBySlug[params.service];

  if (!service) {
    notFound();
  }

  const calculators = service.relatedCalculatorSlugs
    .map((slug) => calculatorBySlug[slug])
    .filter((value): value is NonNullable<typeof value> => Boolean(value));

  const locations = cityPages.slice(0, 8);

  return (
    <div className="space-y-6">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` }
        ])}
      />
      <JsonLd
        data={buildServiceSchema({
          name: `${service.name} - Olson & Company`,
          description: service.shortDescription,
          path: `/services/${service.slug}`,
          image: service.heroImage,
          serviceType: service.name
        })}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name, href: `/services/${service.slug}` }
        ]}
      />
      <ServiceHeroBanner title={service.name} subtitle={service.heroSubtitle} imageSrc={service.heroImage} />

      <section className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-2xl font-semibold text-slate-900">How Olson & Company Helps</h2>
          <p className="mt-3 text-sm text-slate-700">{service.shortDescription}</p>
          <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-600">Key Benefits</h3>
          <ul className="mt-2 space-y-2 text-sm text-slate-700">
            {service.benefits.map((benefit) => (
              <li key={benefit}>• {benefit}</li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Typical Engagement Flow</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            {service.process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <div className="mt-5 rounded-lg border border-sky-200 bg-sky-50 p-3">
            <p className="text-sm text-slate-800">
              Visit our New Westminster office for in-person support or schedule a virtual consultation for any Lower
              Mainland location.
            </p>
            <Link href="/contact" className="mt-2 inline-flex text-sm font-semibold text-sky-700 hover:underline">
              Contact Olson & Company
            </Link>
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Recommended Calculators</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calculator) => (
            <article key={calculator.slug} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-base font-semibold text-slate-900">{calculator.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{calculator.shortDescription}</p>
              <Link href={`/calculators/${calculator.slug}`} className="mt-3 inline-flex text-sm font-semibold text-sky-700 hover:underline">
                Open calculator
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="text-2xl font-semibold text-slate-900">Service Areas</h2>
        <p className="mt-2 text-sm text-slate-700">Olson & Company supports clients across the Lower Mainland.</p>
        <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          {locations.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/${city.slug}`}
              className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 hover:border-sky-200 hover:bg-sky-50"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </section>

      <CalculatorComparisonTable
        title={`${service.name} Calculator Matrix`}
        description="Compare the recommended tools for this service workflow and choose the right starting point."
        slugs={service.relatedCalculatorSlugs}
      />
    </div>
  );
}
