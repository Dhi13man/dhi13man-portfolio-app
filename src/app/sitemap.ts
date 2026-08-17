import type { MetadataRoute } from "next";
import { INDEXABLE_ROUTES } from "@/lib/routes";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map(({ path }) => ({
    url: new URL(path, SITE_URL).toString(),
  }));
}
