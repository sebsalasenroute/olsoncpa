import Link from "next/link";
import { cityPages } from "@/lib/cities";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Olson & Company</h2>
          <p className="mt-3 text-sm text-slate-600">{siteConfig.address.full}</p>
          <p className="mt-2 text-sm text-slate-600">
            Phone:{" "}
            <a href={`tel:${siteConfig.phoneHref}`} className="font-medium text-sky-700 hover:underline">
              {siteConfig.phoneDisplay}
            </a>
          </p>
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-slate-800">Hours</h3>
            {siteConfig.hoursFull.map((hour) => (
              <p key={hour} className="text-sm text-slate-600">
                {hour}
              </p>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Services</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="hover:text-sky-700 hover:underline">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Popular Locations</h3>
          <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-600">
            {cityPages.slice(0, 8).map((city) => (
              <li key={city.slug}>
                <Link href={`/locations/${city.slug}`} className="hover:text-sky-700 hover:underline">
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Legal</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <Link href="/disclaimer" className="hover:text-sky-700 hover:underline">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/legal/privacy" className="hover:text-sky-700 hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className="hover:text-sky-700 hover:underline">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-sky-700 hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 bg-white py-4">
        <p className="mx-auto max-w-7xl px-4 text-xs text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} {siteConfig.name}. All calculator outputs are estimates only.
        </p>
      </div>
    </footer>
  );
}
