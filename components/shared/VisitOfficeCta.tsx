import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function VisitOfficeCta() {
  return (
    <section className="rounded-2xl border border-sky-200 bg-sky-50 p-5 md:p-6">
      <h2 className="text-xl font-semibold text-slate-900">Visit our office in New Westminster</h2>
      <p className="mt-2 text-sm text-slate-700">{siteConfig.address.full}</p>
      <p className="mt-1 text-sm text-slate-700">
        Call: <a href={`tel:${siteConfig.phoneHref}`} className="font-semibold text-sky-700 hover:underline">{siteConfig.phoneDisplay}</a>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href="/contact" className="rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-800">
          Contact Olson & Company
        </Link>
        <Link href="/locations/new-westminster" className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white">
          New Westminster Page
        </Link>
      </div>
    </section>
  );
}
