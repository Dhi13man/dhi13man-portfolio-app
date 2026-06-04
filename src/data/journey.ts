export interface JourneyMetric {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

export interface JourneyChapter {
  id: string;
  label: string;
  title: string;
  navLabel: string;
}

export interface FoundationCard {
  title: string;
  date: string;
  description: string;
  details?: string[];
  image?: string;
  link?: string;
}

export interface GrowwRole {
  title: string;
  date: string;
  description: string;
  pills: string[];
  details: string[];
}

export interface VentureEntry {
  name: string;
  status: "acquired" | "closed" | "active" | "recognition";
  badge: string;
  badges?: string[];
  subtitle: string;
  description: string;
  details?: string[];
  image?: string;
  link?: string;
}

export interface OSSProject {
  name: string;
  description: string;
  metric?: string;
  link?: string;
}

// --- Hero Metrics ---

export const heroMetrics: JourneyMetric[] = [
  { value: 300, suffix: "K+", label: "transactions/day" },
  { value: 13, suffix: "M+", label: "users served" },
  { value: 4, suffix: "+", label: "years experience" },
  { value: 1, suffix: "", label: "startup acquired" },
  { value: 6, suffix: "x", label: "1st place wins" },
  { value: 5, suffix: "", label: "paying customers" },
];

// --- Chapters ---

export const chapters: JourneyChapter[] = [
  {
    id: "hero",
    label: "01 - THE NUMBERS",
    title: "Dhiman Seal",
    navLabel: "The Numbers",
  },
  {
    id: "foundation",
    label: "02 - THE FOUNDATION",
    title: "Every builder has a beginning",
    navLabel: "Foundation",
  },
  {
    id: "groww",
    label: "03 - THE GROWW YEARS",
    title: "Building at scale",
    navLabel: "Groww",
  },
  {
    id: "ventures",
    label: "04 - THE VENTURES",
    title: "Building from zero, in parallel",
    navLabel: "Ventures",
  },
  {
    id: "current",
    label: "05 - SHIPPING SOLO",
    title: "From idea to paying customers",
    navLabel: "Recent",
  },
  {
    id: "rippling",
    label: "06 - THE NEXT CHAPTER",
    title: "A new chapter at Rippling",
    navLabel: "Rippling",
  },
  {
    id: "cta",
    label: "07 - WHAT'S NEXT",
    title: "What's next?",
    navLabel: "Next",
  },
];

// --- Hero ---

export const heroSubtitle = "Software Engineer  /  Entrepreneur  /  Builder";
export const heroNarrative =
  "I build systems that scale. Sometimes they succeed. Sometimes they teach. Here's the story.";

// --- Foundation Chapter ---

export const foundationNarrative = {
  lead: "Before I wrote my first line of production code, I was soldering circuits, building robots, and teaching kids how to code in Northeast India. NIT Silchar gave me the theory, but I was already building.",
  quote:
    "I didn't study engineering to get a job. I studied it to build things.",
};

export const foundationCards: FoundationCard[] = [
  {
    title: "NIT Silchar",
    date: "2018 - 2022",
    description:
      "B.Tech in Electronics & Communication Engineering. CGPA 8.32/10.",
    details: [
      "Deep Learning Specialization (deeplearning.ai)",
      "GAN Specialization (deeplearning.ai)",
      "Machine Learning course at IIT Guwahati",
    ],
    link: "https://www.nits.ac.in/",
  },
  {
    title: "Founded TechEngio: Volunteering Tech Education",
    date: "2018 - 2020",
    description:
      "Volunteered to teach robotics and coding workshops across Northeast India. Reached students who had never seen a microcontroller before.",
    details: [
      "On-site workshops at local institutions",
      "Created educational content and demo projects",
    ],
    image: "/assets/ventures/techengio-workshop.jpeg",
    link: "https://facebook.com/TechEngio/",
  },
  {
    title: "Early Hackathon Wins",
    date: "2019 - 2021",
    description:
      "Won 6 national-level hackathons and innovation challenges before graduating.",
    details: [
      "1st Prize, KIIT-Fest Innovation Challenge, KIIT University (Rs.1 Lakh)",
      "1st Prize, E-Hackathon by ASTEC & Startup Assam (Rs.25K)",
      "1st Prize, Robomania, NIT Silchar",
      "1st Prize, RTU TEQIP-III Poornima Hackathon",
      "1st Prize, Technex Projectomania",
      "1st Position, AgriHacks e-Ideathon, Jorhat Engineering College",
    ],
    image: "/assets/ventures/eminence_robotics-accolades.jpeg",
    link: "https://eminencerobotics.org",
  },
  {
    title: "Freelancing: Cashtic",
    date: "May - Nov 2021",
    description:
      "Freelanced for a Hungarian fintech startup building a peer-to-peer ATM cash network. Built core systems from scratch remotely from college.",
    details: [
      "Dynamic-link referral system and dual-sided user rating system",
      "CRON-scheduled data processing pipeline handling 300,000+ daily records",
      "Encapsulated Openrouteservice and Nordigen (EU PSD2) APIs with typed models and unit tests",
    ],
    image: "/assets/work_experiences/cashtic.webp",
    link: "https://cashtic.com",
  },
];

// --- Groww Chapter ---

export const growwNarrative = {
  lead: "I joined Groww as an intern in January 2022. Within six months I had a pre-placement offer. Within eighteen months I was building payment systems handling 300K+ daily transactions for 13M+ users. Four incredible years later, I wrapped up my last day on 20 May 2026.",
  companyAbout:
    "India's leading investment platform, democratizing financial services for millions.",
  logo: "/assets/work_experiences/growwin-logo.png",
  link: "https://groww.in",
};

export const growwRoles: GrowwRole[] = [
  {
    title: "Software Engineer Intern",
    date: "Jan 2022 - Jun 2022",
    description:
      "Optimized high-performance backend systems for the Payments team. Performance led to a pre-placement offer.",
    pills: ["Pre-placement offer", "Documentation standards"],
    details: [
      "Worked across the full payment service lifecycle",
      "Started the team's documentation practice",
    ],
  },
  {
    title: "Software Engineer 1",
    date: "Jul 2022 - Jun 2023",
    description:
      "Identified a gap in how the team managed multiple datasources, pitched a solution, built it, got it adopted across 95% of microservices, and open-sourced it.",
    pills: ["95% adoption", "Maven Central", "CQRS", "Internal SDKs"],
    details: [
      "Spotted repeated boilerplate across services managing 2+ datasources, proposed custom Spring Boot annotations to eliminate it",
      "Built and shipped multi-datasource annotations that the team adopted across 95% of microservices, enabling CQRS patterns",
      "Published spring-multi-data-source on Maven Central, turning internal tooling into open-source used by external teams",
      "Owned internal SDKs and payment service modules for consumer-facing features on the Payments team",
    ],
  },
  {
    title: "Software Engineer 2",
    date: "Jul 2023 - May 2026",
    description:
      "Architected UPI payments (300K+ daily txns), real-time market data (<10ms), and 3 greenfield trading platform projects.",
    pills: [
      "300K+ daily txns",
      "< 10ms latency",
      "~90% TAT reduction",
      "3 greenfield projects",
    ],
    details: [
      "UPI payment system from scratch: 300K+ successful transactions/day across 13M+ users",
      "Real-time market data with Kafka Streams + Redis at <10ms for price triggers and Option Greeks",
      "Stabilized credit collections end-to-end, reduced ticket TAT by ~90%, wrote 48-page KB",
      "3 greenfield trading projects: Strategy Marketplace, ~500GB Historical Data, Smart Orders GTT/OCO",
      "20K+ response code mappings, custom gRPC wrapper, backend-driven home page for millions",
    ],
  },
];

// --- Ventures Chapter ---

export const venturesNarrative = {
  lead: "While building at scale during the day, I was building from zero at night. Some of these worked. Some didn't. All of them taught me something.",
};

export const ventures: VentureEntry[] = [
  {
    name: "AgriJod",
    status: "acquired",
    badge: "ACQUIRED",
    subtitle: "Acquired by another Assam-based agritech, Sep 2025",
    description:
      "Architected the entire technical infrastructure for an agritech startup transforming agriculture in Northeast India. The tech became the core value proposition that led to acquisition.",
    details: [
      "Built the full tech stack across all product lines",
      "Scalable AWS infrastructure with multi-profile CI/CD pipelines",
      "Strategic partnerships: Startup India, IIT Guwahati Innovation Hub, NEEDP",
      "Ran the tech transfer to the acquirer",
    ],
    image: "/assets/work_experiences/agrijod-cover.webp",
    link: "https://agrijod.in",
  },
  {
    name: "Banalo",
    status: "closed",
    badge: "Closed",
    subtitle: "Aug 2022 - Mar 2023",
    description:
      "I tried to build Blue Apron for India. Got VC mentorship, pitched in competitions, built the mockups. Then I did the math: unit economics didn't work for daily fresh ingredient delivery in Indian metros at our target price point. I closed it. That decision taught me more about business viability than any success.",
    image: "/assets/ventures/banalo-value_proposition.webp",
    link: "https://www.eminencerobotics.org/banalo",
  },
  {
    name: "OnlyForms",
    status: "closed",
    badge: "Closed",
    subtitle: "Dec 2023 - Aug 2025",
    description:
      "MBA survey platform with instant rewards. Served 121 students with 8-minute average response time per 50 responses. Ran as a passive income experiment before winding down.",
    image: "/assets/ventures/onlyforms-delight.webp",
  },
  {
    name: "Dostana.AI",
    status: "recognition",
    badge: "National Runner-up",
    badges: ["National Runner-up, Build for Bharat (ONDC)", "National Winner, Tata Imagination Challenge"],
    subtitle: "May 2024",
    description:
      "AI-powered kirana store management system. Top 2 finalists in the Next-gen Ventures category at ONDC Build for Bharat, presented to Google, Antler, and ONDC leadership. Also won the Tata Imagination Challenge 2024 nationally. Ranked Top 2% globally in Product Strategy (Upraised Embark Program).",
  },
];

export const coreTechStack = {
  primary: ["Java", "Spring Boot", "Apache Kafka", "Redis", "PostgreSQL", "gRPC"],
  secondary: ["Python", "Go", "TypeScript", "Node.js", "Kubernetes", "Docker", "GCP", "AWS", "Prometheus", "Grafana"],
};

// --- Current Chapter ---

export const currentNarrative = {
  lead: "I built AI-powered tools for homeopathic practitioners: audio transcription, a 4-stage AI analysis pipeline, and interactive case editing. Real doctors, real patients, real impact. I shipped it to 5 paying customers and proved the concept works.",
  ezhomeo: {
    name: "EzHomeo",
    link: "https://www.ezhomeo.com",
    metrics: [
      "5 paying customers",
      "775+ unit tests",
      "4-stage AI pipeline",
    ],
    techStack: [
      "Node.js",
      "Express",
      "TypeScript",
      "PostgreSQL",
      "Google Gemini",
      "Supabase",
      "Google Cloud Run",
      "Pulumi",
      "OpenTelemetry",
    ],
    description:
      "B2B SaaS for homeopathic institutions. Transcribed patient consultations, extracted symptoms, matched rubrics from OOREP (Open Online Repertory), and generated comprehensive case reports with remedy recommendations.",
  },
};

export const ossHighlights: OSSProject[] = [
  {
    name: "spring-multi-data-source",
    description:
      "Simplifies managing 2+ JPA datasources via custom annotations. Published on Maven Central.",
    metric: "95% team adoption",
    link: "https://github.com/Dhi13man/spring-multi-data-source",
  },
  {
    name: "open_route_service",
    description:
      "Dart/Flutter client for openrouteservice API. Flutter Gem commendation.",
    metric: "85+ likes, 160/160 score",
    link: "https://pub.dev/packages/open_route_service",
  },
  {
    name: "oorep-mcp",
    description:
      "AI-powered homeopathic knowledge integration via Model Context Protocol.",
    link: "https://github.com/Dhi13man/oorep-mcp",
  },
];

export const ossSummary = {
  projects: "45+",
  stars: "150+",
  label: "open-source projects with combined GitHub stars",
};

// --- Rippling Chapter ---

export const ripplingNarrative = {
  lead: "After four amazing years at Groww - from intern to Software Engineer 2 building payments at scale - I closed that chapter on 20 May 2026. Five days later, on 25 May 2026, the next one began: I joined Rippling as a Software Engineer 2.",
  company: {
    name: "Rippling",
    about:
      "The all-in-one workforce platform unifying HR, IT, and finance - payroll, benefits, device management, and app provisioning in a single system.",
    link: "https://www.rippling.com",
    role: "Full-Stack Software Engineer (SE2)",
    date: "May 2026 - Present",
  },
  pills: ["Full-Stack", "PEO Team", "Underwriting", "Workers' Comp"],
  details: [
    "Full-stack engineer on the PEO (Professional Employer Organization) team within B2B HR Services",
    "Improving Underwriting and Workers' Compensation flows end-to-end",
  ],
  closing:
    "Same obsession with systems that scale. New canvas. The story continues.",
};

// --- CTA Chapter ---

export const ctaNarrative =
  "I've spent four years building payment infrastructure that millions depend on. In parallel, I've built companies, shipped open-source tools, and competed nationally. If you're building the next big thing, I want to hear about it.";

export const ctaLinks = {
  email: "mailto:dhiman.seal@hotmail.com",
  github: "https://github.com/Dhi13man",
  linkedin: "https://www.linkedin.com/in/dhi13man/",
  medium: "https://medium.com/@dhi13man",
  twitter: "https://twitter.com/Dhi13man",
};
