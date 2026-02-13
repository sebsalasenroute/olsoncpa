import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm shadow-sm">
      <ol className="flex flex-wrap items-center gap-1 text-slate-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.href}-${item.label}`} className="inline-flex items-center gap-1">
              {isLast ? (
                <span className="font-medium text-slate-900">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-sky-700 hover:underline">
                  {item.label}
                </Link>
              )}
              {!isLast ? <span aria-hidden="true">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
