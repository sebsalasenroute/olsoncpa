import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Olson & Company",
    short_name: "Olson & Co",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f1f5f9",
    theme_color: "#0369a1",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any"
      }
    ]
  };
}
