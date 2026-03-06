import { siteConfig } from "@/lib/site";

const organizationId = `${siteConfig.url}#organization`;
const localBusinessId = `${siteConfig.url}#local-business`;

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logoPath}`,
    image: `${siteConfig.url}${siteConfig.officeMapImagePath}`,
    telephone: siteConfig.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country
    }
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": organizationId
    },
    inLanguage: "en-CA"
  };
}

export function buildLocalBusinessSchema(overrides?: { areaServed?: string[]; urlPath?: string; imagePath?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": localBusinessId,
    name: siteConfig.name,
    url: `${siteConfig.url}${overrides?.urlPath ?? "/"}`,
    image: `${siteConfig.url}${overrides?.imagePath ?? siteConfig.officeMapImagePath}`,
    logo: `${siteConfig.url}${siteConfig.logoPath}`,
    telephone: siteConfig.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "16:30"
      }
    ],
    areaServed: (overrides?.areaServed ?? siteConfig.serviceAreas).map((area) => ({
      "@type": "City",
      name: area
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phoneDisplay,
      contactType: "customer support",
      areaServed: "CA-BC",
      availableLanguage: ["en"]
    },
    parentOrganization: {
      "@id": organizationId
    },
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
      "@id": localBusinessId
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
    isAccessibleForFree: true,
    creator: {
      "@id": organizationId
    },
    url: `${siteConfig.url}/calculators/${args.slug}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CAD"
    },
    featureList: [
      "Instant estimate results",
      "Shareable URL parameters",
      "Copyable summary",
      "Interactive chart"
    ],
    keywords: `${args.category}, accounting calculator, BC tax planning`,
    inLanguage: "en-CA"
  };
}

export function buildCollectionPageSchema(args: {
  name: string;
  description: string;
  path: string;
  items: Array<{ name: string; path: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: args.name,
    description: args.description,
    url: `${siteConfig.url}${args.path}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: args.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: `${siteConfig.url}${item.path}`
      }))
    }
  };
}

export function buildArticleSchema(args: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  image?: string;
}) {
  const articleUrl = `${siteConfig.url}${args.path}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: args.headline,
    description: args.description,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    datePublished: args.datePublished,
    dateModified: args.datePublished,
    image: `${siteConfig.url}${args.image ?? siteConfig.socialImagePath}`,
    author: {
      "@id": organizationId
    },
    publisher: {
      "@id": organizationId
    },
    inLanguage: "en-CA"
  };
}
