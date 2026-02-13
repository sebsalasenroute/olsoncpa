import { siteConfig } from "@/lib/site";

export function buildLocalBusinessSchema(overrides?: { areaServed?: string[]; urlPath?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: siteConfig.name,
    url: `${siteConfig.url}${overrides?.urlPath ?? "/"}`,
    image: `${siteConfig.url}/images/hero-office-exterior.jpg`,
    telephone: siteConfig.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country
    },
    areaServed: (overrides?.areaServed ?? siteConfig.serviceAreas).map((area) => ({
      "@type": "City",
      name: area
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "16:30"
      }
    ],
    priceRange: "$$"
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`
    }))
  };
}

export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function buildServiceSchema(args: {
  name: string;
  description: string;
  path: string;
  image?: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    serviceType: args.serviceType ?? "Accounting Service",
    url: `${siteConfig.url}${args.path}`,
    image: `${siteConfig.url}${args.image ?? "/images/banner-tax-season.jpg"}`,
    provider: {
      "@type": "AccountingService",
      name: siteConfig.name,
      url: siteConfig.url,
      telephone: siteConfig.phoneDisplay,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.country
      }
    },
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "City",
      name: area
    }))
  };
}

export function buildWebApplicationSchema(args: {
  name: string;
  description: string;
  slug: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: args.name,
    description: args.description,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    creator: {
      "@type": "Organization",
      name: siteConfig.name
    },
    url: `${siteConfig.url}/calculators/${args.slug}`,
    featureList: [
      "Instant estimate results",
      "Shareable URL parameters",
      "Copyable summary",
      "Interactive chart"
    ],
    keywords: `${args.category}, accounting calculator, BC tax planning`
  };
}
