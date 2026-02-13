import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { services } from "@/lib/services";

export const metadata = buildMetadata({
  title: "Accounting Services",
  description:
    "Personal tax, corporate tax, bookkeeping, payroll, GST/HST advisory, and tax planning services from Olson & Company.",
  path: "/services",
  image: "/images/banner-bookkeeping.jpg"
});

export default function ServicesIndexPage() {
  return (
    <div className="space-y-6">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" }
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" }
        ]}
      />
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-3xl font-semibold text-slate-900">Accounting Services</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-700 md:text-base">
          Olson & Company supports households and businesses across the Lower Mainland with service scopes tailored to
          practical outcomes and reliable reporting.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <article key={service.slug} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{service.name}</h2>
            <p className="mt-2 text-sm text-slate-700">{service.shortDescription}</p>
            <Link href={`/services/${service.slug}`} className="mt-4 inline-flex text-sm font-semibold text-sky-700 hover:underline">
              Open service page
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
