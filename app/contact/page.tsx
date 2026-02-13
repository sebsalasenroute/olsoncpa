import Image from "next/image";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildLocalBusinessSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact Olson & Company",
  description:
    "Contact Olson & Company at 105-443 Sixth Street, New Westminster, BC V3L 3B1 or call 604.525.9295.",
  path: "/contact",
  image: "/images/map-new-westminster.jpg"
});

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" }
        ])}
      />
      <JsonLd data={buildLocalBusinessSchema({ urlPath: "/contact" })} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact" }
        ]}
      />

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-3xl font-semibold text-slate-900">Contact Olson & Company</h1>
        <p className="mt-3 text-sm text-slate-700 md:text-base">
          Book a consultation for personal tax, corporate tax, bookkeeping, payroll, and planning support across the
          Lower Mainland.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-2xl font-semibold text-slate-900">Office Details</h2>
          <p className="mt-3 text-sm text-slate-700">
            <strong>{siteConfig.name}</strong>
            <br />
            {siteConfig.address.full}
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Phone:{" "}
            <a href={`tel:${siteConfig.phoneHref}`} className="font-semibold text-sky-700 hover:underline">
              {siteConfig.phoneDisplay}
            </a>
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <h3 className="text-sm font-semibold text-slate-800">Hours</h3>
              {siteConfig.hoursFull.map((hour) => (
                <p key={hour} className="text-sm text-slate-700">
                  {hour}
                </p>
              ))}
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <h3 className="text-sm font-semibold text-slate-800">Office Hours</h3>
              {siteConfig.officeHoursCompact.map((hour) => (
                <p key={hour} className="text-sm text-slate-700">
                  {hour}
                </p>
              ))}
            </div>
          </div>

          <ContactForm />
        </article>

        <aside className="space-y-4">
          <Image
            src="/images/map-new-westminster.jpg"
            alt="Map to Olson & Company in New Westminster"
            width={1200}
            height={800}
            className="h-64 w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
          />
          <Image
            src="/images/office-front.jpg"
            alt="Olson & Company office front"
            width={1200}
            height={800}
            className="h-64 w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
          />
        </aside>
      </section>
    </div>
  );
}
