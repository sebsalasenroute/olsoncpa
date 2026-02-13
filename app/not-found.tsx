import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm md:p-8">
      <h1 className="text-3xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-3 text-sm text-slate-700">The page you requested does not exist.</p>
      <Link href="/" className="mt-4 inline-flex rounded-md bg-sky-700 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-800">
        Return home
      </Link>
    </section>
  );
}
