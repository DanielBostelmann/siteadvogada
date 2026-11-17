import type { MetadataRoute } from "next";

import { site } from "@/config/site";
import { areas } from "@/content/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...areas.map((area) => ({
      url: `${site.url}/areas/${area.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${site.url}/politica-de-privacidade`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
