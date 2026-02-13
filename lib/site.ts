export const siteConfig = {
  name: "Olson & Company",
  legalName: "Olson & Company",
  description:
    "Accounting and tax services for families and businesses across Metro Vancouver, with a New Westminster office serving the Lower Mainland.",
  url: "https://olsonca.com",
  phoneDisplay: "604.525.9295",
  phoneHref: "+16045259295",
  address: {
    street: "105-443 Sixth Street",
    city: "New Westminster",
    region: "BC",
    postalCode: "V3L 3B1",
    country: "CA",
    full: "105-443 Sixth Street, New Westminster, BC V3L 3B1"
  },
  officeHoursCompact: [
    "Mo-Fr: 8:30-4:30P",
    "Sa: closed",
    "So: closed"
  ],
  hoursFull: [
    "Monday-Friday: 8:30-4:30p",
    "Saturday: By appointment",
    "Sunday: Closed"
  ],
  serviceAreas: [
    "Vancouver",
    "Richmond",
    "Burnaby",
    "Surrey",
    "Coquitlam",
    "Port Coquitlam",
    "Port Moody",
    "New Westminster",
    "North Vancouver",
    "West Vancouver",
    "Delta",
    "Langley",
    "Maple Ridge",
    "Pitt Meadows",
    "White Rock",
    "Tri-Cities"
  ],
  socials: {
    ogDefault: "/images/hero-office-exterior.jpg"
  }
} as const;

export const staticPaths = {
  home: "/",
  calculators: "/calculators",
  locations: "/locations",
  blog: "/blog",
  contact: "/contact",
  disclaimer: "/disclaimer",
  privacy: "/legal/privacy",
  terms: "/legal/terms"
} as const;
