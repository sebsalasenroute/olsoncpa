import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function MobileQuickActions() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
        <a
          href={`tel:${siteConfig.phoneHref}`}
          className="tap-target rounded-md border border-slate-300 px-3 py-2.5 text-center text-sm font-semibold text-slate-700"
        >
          Call {siteConfig.phoneDisplay}
        </a>
        <Link
          href="/contact"
          className="tap-target rounded-md bg-sky-700 px-3 py-2.5 text-center text-sm font-semibold text-white"
        >
          Book Consultation
        </Link>
      </div>
    </div>
  );
}
