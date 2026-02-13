import Link from "next/link";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Calculators" },
  { href: "/services", label: "Services" },
  { href: "/locations", label: "Locations" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
        <div className="hidden items-center justify-between gap-3 border-b border-slate-200 pb-2 text-xs text-slate-600 md:flex">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium text-slate-900">{siteConfig.name}</span>
            <span>•</span>
            <span>{siteConfig.address.full}</span>
            <span>•</span>
            <a href={`tel:${siteConfig.phoneHref}`} className="font-medium text-sky-700 hover:underline">
              {siteConfig.phoneDisplay}
            </a>
          </div>
          <details className="relative">
            <summary className="tap-target cursor-pointer list-none rounded-md px-2 py-1 font-medium text-slate-700 hover:bg-slate-100">
              Office Hours
            </summary>
            <div className="absolute right-0 mt-2 w-44 rounded-lg border border-slate-200 bg-white p-3 text-xs shadow-lg">
              {siteConfig.officeHoursCompact.map((hour) => (
                <p key={hour}>{hour}</p>
              ))}
            </div>
          </details>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2 md:pt-3">
          <Link
            href="/"
            className="tap-target inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-3 py-2"
            aria-label="Olson & Company Home"
          >
            <span className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
              Olson & Co, CA, CPA
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-5 text-sm font-medium text-slate-700 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="tap-target hover:text-sky-700">
                {link.label}
              </Link>
            ))}
          </nav>

          <details className="relative md:hidden">
            <summary className="tap-target cursor-pointer list-none rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700">
              Menu
            </summary>
            <div className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
              <div className="mb-2 rounded-lg border border-sky-200 bg-sky-50 p-2.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Office Hours</p>
                {siteConfig.officeHoursCompact.map((hour) => (
                  <p key={hour} className="text-xs text-slate-700">
                    {hour}
                  </p>
                ))}
              </div>

              <nav aria-label="Primary mobile" className="grid grid-cols-2 gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="tap-target rounded-md border border-slate-200 px-2.5 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="tap-target inline-flex items-center justify-center rounded-md border border-slate-300 px-2.5 py-2 text-center text-sm font-semibold text-slate-700"
                >
                  Call
                </a>
                <Link
                  href="/contact"
                  className="tap-target inline-flex items-center justify-center rounded-md bg-sky-700 px-2.5 py-2 text-center text-sm font-semibold text-white"
                >
                  Book
                </Link>
              </div>
            </div>
          </details>
        </div>

        <div className="hidden border-t border-slate-200 pt-2 md:block">
          <div className="mx-auto flex w-full max-w-md items-center justify-center gap-2">
            <a
              href={`tel:${siteConfig.phoneHref}`}
              className="tap-target inline-flex flex-1 items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-center text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Call {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="tap-target inline-flex flex-1 items-center justify-center rounded-md bg-sky-700 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-sky-800"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
