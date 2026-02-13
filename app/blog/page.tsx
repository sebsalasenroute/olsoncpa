import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { blogPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Accounting Insights Blog",
  description:
    "Practical articles on BC tax planning, bookkeeping workflows, payroll, and cash management for Lower Mainland clients.",
  path: "/blog",
  image: "/images/hero-team-working.jpg"
});

export default function BlogIndexPage() {
  return (
    <div className="space-y-6">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" }
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" }
        ]}
      />
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h1 className="text-3xl font-semibold text-slate-900">Accounting Insights</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-700 md:text-base">
          Practical guidance for households and businesses in BC. Content is educational and should be validated for
          your specific situation.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {post.publishedAt} • {post.readMinutes} min read
            </p>
            <h2 className="mt-2 text-xl font-semibold text-slate-900">{post.title}</h2>
            <p className="mt-2 text-sm text-slate-700">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="mt-3 inline-flex text-sm font-semibold text-sky-700 hover:underline">
              Read article
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
