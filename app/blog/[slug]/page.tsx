import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { blogBySlug, blogPosts } from "@/lib/blog";
import { calculatorBySlug } from "@/lib/calculators/catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/schema";

type BlogPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BlogPageProps) {
  const post = blogBySlug[params.slug];
  if (!post) {
    return {};
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: "/images/hero-team-working.jpg"
  });
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const post = blogBySlug[params.slug];

  if (!post) {
    notFound();
  }

  const relatedCalculators = post.relatedCalculatorSlugs
    .map((slug) => calculatorBySlug[slug])
    .filter((value): value is NonNullable<typeof value> => Boolean(value));

  return (
    <article className="space-y-6">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` }
        ])}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title, href: `/blog/${post.slug}` }
        ]}
      />
      <header className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {post.publishedAt} • {post.readMinutes} min read
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">{post.title}</h1>
        <p className="mt-3 text-sm text-slate-700">{post.excerpt}</p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="space-y-4 text-sm leading-7 text-slate-800">
          {post.content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          Educational content only. Confirm tax positions with CRA resources and professional review.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-semibold text-slate-900">Related Calculators</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {relatedCalculators.map((calculator) => (
            <article key={calculator.slug} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-base font-semibold text-slate-900">{calculator.title}</h3>
              <p className="mt-2 text-sm text-slate-700">{calculator.shortDescription}</p>
              <Link href={`/calculators/${calculator.slug}`} className="mt-2 inline-flex text-sm font-semibold text-sky-700 hover:underline">
                Open calculator
              </Link>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
