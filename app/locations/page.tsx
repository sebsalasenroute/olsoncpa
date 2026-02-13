import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { cityPages } from "@/lib/cities";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Lower Mainland Accounting Locations",
  description:
    "Explore Olson & Company city pages for Vancouver, Burnaby, Surrey, Tri-Cities, and more across the Lower Mainland.",
  path: "/locations",
  image: "/images/office-front.jpg"
});

export default function LocationsIndexPage() {
  return (
    <div className="space-y-6">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Locations", path: "/locations" }
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" }
        ]}
      />
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-3xl font-semibold text-slate-900">Lower Mainland Service Areas</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-700 md:text-base">
          Olson & Company serves households and businesses across Metro Vancouver from our New Westminster office.
          Each location page includes localized planning guidance, calculators, and FAQs.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cityPages.map((city) => (
          <article key={city.slug} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <Image src={city.image} alt={city.name} width={1200} height={700} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-slate-900">{city.name}</h2>
              <p className="mt-2 text-sm text-slate-700">{city.intro}</p>
              <Link href={`/locations/${city.slug}`} className="mt-3 inline-flex text-sm font-semibold text-sky-700 hover:underline">
                Open city page
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
