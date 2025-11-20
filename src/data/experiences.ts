import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    about:
      "India's leading investment platform serving millions of users with a mission to democratize financial services. Offers seamless digital access to stocks, mutual funds, and financial products.",
    images: {
      others: ["/assets/work_experiences/growwin-cert.jpg"],
      primary: "/assets/work_experiences/growwin-logo.png",
    },
    links: {
      others: ["https://linkedin.com/company/groww"],
      primary: "https://groww.in",
    },
    name: "Groww, India",
    roles: [
      {
        description:
          "Building payment systems processing 300K+ daily UPI transactions and real-time market data infrastructure serving 13M+ active users with <10ms latency.",
        details: [
          "Architected UPI payment system from scratch, now handling 300,000+ successful transactions per day across Groww's 13M+ user base",
          "Built real-time market data streaming using Kafka Streams and Redis with <10ms latency for price triggers and Option Greeks - critical for live trading",
          "Created centralized response code management system handling 20,000+ error mappings, used across the team's microservices",
          "Owned observability for the payments pod - learned PromQL and Grafana, built dashboards tracking every useful metric across services",
          "Single-handedly built backend-driven home page serving personalized content to millions of users, enabling 3 product teams to run experiments",
        ],
        endDate: "Present",
        location: "Bengaluru, Karnataka, India",
        startDate: "Jul 2023",
        title: "Software Engineer 2 - Backend",
      },
      {
        description:
          "Built payment backend infrastructure with Java Spring Boot, Apache Kafka, and Redis. Created custom annotations adopted across 95% of team's microservices.",
        details: [
          "Delivered payment processing solutions using Java Spring Boot, Apache Kafka, and Redis for consumer-facing features",
          "Pitched and built custom Spring Boot annotations for multi-datasource management - now used across 95% of team's microservices, implementing patterns like CQRS",
          "Owned development of internal SDKs and services, implementing scalable design patterns for distributed systems",
        ],
        endDate: "Jun 2023",
        location: "Bengaluru, Karnataka, India",
        startDate: "Jul 2022",
        title: "Software Engineer - Backend",
      },
      {
        description:
          "Optimized high-performance backend systems for Payments team, focusing on merchant/consumer services.",
        details: [
          "Earned pre-placement offer through exceptional contributions to high-scale microservices",
          "Impacted full lifecycle of payment services from development to deployment",
          "Pioneered documentation standards enhancing team knowledge transfer",
        ],
        endDate: "Jun 2022",
        location: "Bengaluru, Karnataka, India | Remote",
        startDate: "Jan 2022",
        title: "Software Engineer Intern - Backend",
      },
    ],
  },
  {
    about:
      "Global freelance services marketplace connecting businesses with skilled professionals across industries.",
    images: {
      others: [],
      primary: "/assets/work_experiences/fiverr-profile.png",
    },
    links: {
      primary: "https://fiverr.com/dhiman13",
    },
    name: "Fiverr",
    roles: [
      {
        description:
          "Delivered premium software development services to international clients.",
        details: [
          "Maintained perfect 5-star rating across all client engagements",
          "Developed custom solutions spanning multiple industries",
        ],
        endDate: "Dec 2021",
        location: "Remote",
        startDate: "Jan 2021",
        title: "Software Development Freelancer",
      },
    ],
  },
  {
    about:
      "Pioneered peer-to-peer ATM cash network solution in Hungary through innovative mobile application connecting cash seekers with providers.",
    images: {
      others: [],
      primary: "/assets/work_experiences/cashtic.webp",
    },
    links: {
      primary: "https://cashtic.com",
    },
    name: "Cashtic",
    roles: [
      {
        description:
          "Built peer-to-peer ATM cash network connecting cash seekers with providers through mobile app. Firebase backend with Flutter frontend.",
        details: [
          "Designed and built complete systems from scratch: Dynamic-linking-based user referral system, dual-sided rating system, CRON-scheduled data processing pipeline handling 300,000+ daily records",
          "Encapsulated Openrouteservice and Nordigen APIs with data models and unit tests, adding location-based cash matching and EU banking connectivity",
          "Built serverless cloud function models for trigger-based database operations with authentication",
        ],
        endDate: "Nov 2021",
        location: "Budapest, Hungary | Remote",
        startDate: "May 2021",
        title: "Cloud Engineer and Application Developer",
      },
    ],
  },
  {
    about:
      "Sustainable technology company developing IoT-integrated systems for environmental monitoring and smart agriculture.",
    name: "GreenLine World",
    roles: [
      {
        description:
          "Led IoT-integrated cross-platform application development.",
        details: [
          "Designed system architecture and microcontroller units",
          "Developed backend and cross-platform interface for custom IoT devices",
        ],
        endDate: "Jul 2021",
        location: "Remote",
        startDate: "Apr 2021",
        title: "System Design and Cross-Platform Application Development",
      },
    ],
  },
];
