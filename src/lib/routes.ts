export type CanonicalPath = "/" | `/${string}/`;

interface SiteRoute {
  readonly navigationLabel: string;
  readonly path: CanonicalPath;
}

export const SITE_ROUTES = {
  home: { navigationLabel: "About", path: "/" },
  journey: { navigationLabel: "Journey", path: "/journey/" },
  ventures: { navigationLabel: "Ventures", path: "/ventures/" },
  experience: { navigationLabel: "Experience", path: "/experience/" },
  projects: { navigationLabel: "Projects", path: "/projects/" },
  achievements: {
    navigationLabel: "Achievements",
    path: "/achievements/",
  },
  recommendations: {
    navigationLabel: "Recommendations",
    path: "/recommendations/",
  },
  education: { navigationLabel: "Education", path: "/education/" },
} as const satisfies Readonly<Record<string, SiteRoute>>;

export type PageKey = keyof typeof SITE_ROUTES;

export const INDEXABLE_ROUTES = Object.freeze(Object.values(SITE_ROUTES));
