import type { Project } from "@/types";

export const projects: Project[] = [
  {
    description:
      "Model Context Protocol server and client SDK providing AI assistants with seamless access to OOREP - a comprehensive homeopathic repertory and materia medica database.",
    details: [
      "Published on npm with TypeScript SDK and comprehensive documentation",
      "Integrates 12+ classical and contemporary homeopathic repertories with 600+ remedies",
      "Built with 94.6% test coverage (779+ tests) using Vitest, ensuring production-grade reliability",
      "Provides structured responses with remedy weights, statistics, and guided symptom analysis workflows",
      "Includes request caching and deduplication for optimal performance and API efficiency",
      "Compatible with Claude, OpenAI, Vercel AI SDK, and LangChain through MCP protocol",
    ],
    endDate: "Present",
    links: {
      primary: "https://www.npmjs.com/package/oorep-mcp",
      others: [
        "https://github.com/Dhi13man/oorep-mcp",
      ],
    },
    name: "oorep-mcp: AI-Powered Homeopathic Knowledge Integration",
    skills: [
      "TypeScript",
      "Model Context Protocol",
      "API Integration",
      "Healthcare Technology",
      "Test Driven Development",
      "SDK Development",
    ],
    startDate: "Nov 2025",
  },
  {
    description:
      "AI-powered WhatsApp bot revolutionizing operations for Kirana stores and MSMEs through vernacular language support.",
    details: [
      "National Winner of Tata Imagination Challenge, 2024",
      "National Runner-up of Build for Bharat, Next-gen Ventures Category by ONDC, 2024",
      "Enables inventory management, order generation, and receipt issuance via text/voice/image",
      "Synchronizes inventory across online marketplaces like Shopify, Amazon, with demand insights",
    ],
    endDate: "Jun 2024",
    images: {
      primary: "/assets/projects/dostana_ai.png",
      others: ["/assets/projects/dostana_ai-win.jpeg"],
    },
    links: {
      primary: "https://www.youtube.com/watch?v=WUNkzE9AdW0",
      others: [
        "https://www.linkedin.com/feed/update/urn:li:activity:7272536422304112640",
      ],
    },
    name: "Dostana.AI: Multi-modal Omni-channel Kirana Store Agent",
    skills: [
      "Artificial Intelligence",
      "Chatbot Development",
      "B2B Ideation",
      "SaaS Development",
    ],
    startDate: "Jan 2024",
  },
  {
    description:
      "Spring Boot library simplifying multi-datasource management through custom annotations. Published on Maven Central.",
    details: [
      "Created 2 custom annotations that generate required Bean-providing configuration classes and repositories during build process",
      "Published on Maven Central Repository - used by distributed computing teams implementing design patterns like CQRS",
      "Reduces boilerplate for teams managing 2+ JPA datasources in Spring Boot applications",
      "Comprehensive documentation with examples",
    ],
    endDate: "Present",
    images: {
      others: [],
      primary: "/assets/projects/spring_multi_data_source.jpeg",
    },
    links: {
      others: [
        "https://central.sonatype.com/artifact/io.github.dhi13man/spring-multi-data-source",
      ],
      primary: "https://github.com/dhi13man/spring-multi-data-source",
    },
    name: "spring-multi-data-source",
    skills: ["Java", "Databases", "Spring Boot"],
    startDate: "Jun 2023",
  },
  {
    description:
      "Automated Windows solution for dynamic proxy configuration across WiFi networks.",
    details: [
      "Auto-configures proxies based on network SSID",
      "CLI-configurable automation",
      "Integrated with Windows Event Scheduler",
    ],
    endDate: "Feb 2022",
    images: {
      primary: "/assets/projects/auto_proxy_wifi.png",
    },
    links: {
      primary: "https://github.com/Dhi13man/auto_proxy_wifi",
    },
    name: "auto_proxy_wifi: Automated Proxy Configuration",
    skills: ["Python", "Windows System", "CLI Automation"],
    startDate: "Nov 2021",
  },
  {
    description:
      "Dart/Flutter package for openrouteservice API integration. Recognized as 'Flutter Gem' with 100+ GitHub stars.",
    details: [
      "Used by 1.5K+ development teams worldwide, with 85+ likes and perfect 160/160 pub.dev points",
      "Built with 100% test coverage - encapsulates openrouteservice API with relevant data models",
      "Received commendation from the openrouteservice team, becoming a 'Flutter Gem'",
      "Supports routing, directions, isochrones, time-distance matrices, Pelias geocoding, POIs, elevation, and route optimizations",
    ],
    endDate: "Present",
    images: {
      others: [],
      primary: "/assets/projects/open_route_service.jpeg",
    },
    links: {
      others: ["http://github.com/Dhi13man/open_route_service"],
      primary: "https://pub.dev/packages/open_route_service",
    },
    name: "open_route_service: OpenRouteService API Library",
    skills: ["Flutter", "Dart", "REST APIs", "OOP", "Test Driven Development"],
    startDate: "Sep 2021",
  },
  {
    description:
      "A null-safe Dart/Flutter package for Nordigen EU PSD2 AISP Banking API Integration.",
    details: [
      "Officially recognized by Nordigen as their premier Dart/Flutter community package",
      "The account information API has been completely encapsulated",
      "50+ downloads and 10 likes with 160/160 pub.dev points",
    ],
    endDate: "Present",
    images: {
      others: [],
      primary: "/assets/projects/nordigen_integration.png",
    },
    links: {
      others: [
        "https://github.com/Dhi13man/nordigen_integration",
        "https://nordigen.com/en/account_information_documenation/integration/libraries/",
      ],
      primary: "https://pub.dev/packages/nordigen_integration",
    },
    name: "nordigen_integration: Open-Source Dart/Flutter library for Nordigen EU PSD2 AISP Banking API Integration",
    skills: ["Flutter", "Dart", "REST APIs", "OOP", "Test Driven Development"],
    startDate: "May 2021",
  },
  {
    description: "Real-time Hacker News viewer with Firebase/Hive integration.",
    details: [
      "Multiple stars on GitHub",
      "Can switch between Firebase Cloud Features or Local Hive Database",
    ],
    endDate: "Jan 2021",
    links: {
      primary: "https://github.com/Dhi13man/ycombinator_news_client",
    },
    name: "Hacker News Forum Client",
    skills: [
      "Flutter",
      "Firebase",
      "Firestore",
      "Hive",
      "BLoC",
      "Real-Time",
      "Local Database",
    ],
    startDate: "Dec 2020",
  },
  {
    description: "Open-source package for moor database to CSV conversion.",
    details: [
      "Over 100 downloads and 13 likes, with 160/160 pub.dev points",
      "Allows easy exporting of Moor databases to CSV",
    ],
    endDate: "Present",
    images: {
      primary: "/assets/projects/moor2csv.png",
    },
    links: {
      others: ["https://github.com/Dhi13man/moor2csv"],
      primary: "https://pub.dev/packages/moor2csv",
    },
    name: "moor2csv: Database Exporting Tool",
    skills: ["Flutter", "Dart", "CSV"],
    startDate: "Nov 2020",
  },
  {
    description:
      "Built a full-fledged Employee Management and IoT-driven Contact-Tracing solution.",
    details: [
      "Cross-platform IoT Flutter application for Employee Management and Contact-Tracing",
      "BLE-RSSI based proximity detection",
      "1st Prize Winner at Robomania, NIT Silchar, 2021; Projectomania, Technex, Pune, 2021",
      "2nd Runners Up at IDEATE, Chennai, 2021",
    ],
    endDate: "Apr 2021",
    images: {
      others: [],
      primary: "/assets/projects/safesync-dashboard.jpeg",
    },
    links: {
      primary: "https://github.com/Dhi13man/SafeSyncIoT",
    },
    name: "SafeSync IoT: Employee Management and Contact Tracing Solution",
    skills: [
      "Flutter",
      "ESP32",
      "IoT",
      "BLE-RSSI",
      "Cross-Platform",
      "Wi-Fi",
      "Mesh Communication",
    ],
    startDate: "Nov 2020",
  },
  {
    description:
      "Python-based real-time hand gesture PC control system using OpenCV and ML.",
    details: [
      "Trained multiple ML models for real-time hand shape detection",
      "Integrated with OpenCV for pre-processing and faster analysis",
    ],
    endDate: "May 2020",
    links: {
      primary: "https://github.com/Dhi13man/CV-HandGestureControl",
    },
    name: "Hand Gesture Control System",
    skills: ["Python", "OpenCV", "Machine Learning", "scikit-learn"],
    startDate: "Apr 2020",
  },
  {
    description:
      "Custom Open-Source keyboard shortcut system using Num Lock/Caps Lock key states.",
    details: [
      "Integrated with Electron for cross-platform compatibility",
      "Accompanied by a full HTML/CSS/JS GUI",
    ],
    endDate: "Apr 2020",
    images: {
      others: [],
      primary: "/assets/projects/numcuts-dashboard.jpeg",
    },
    links: {
      primary: "https://github.com/Dhi13man/NumCuts",
    },
    name: "NumCuts: Keyboard Shortcut System",
    skills: ["C++", "Electron", "System Programming", "NodeJS", "HTML/CSS/JS"],
    startDate: "Apr 2020",
  },
  {
    description:
      "IoT-based driver safety system with drowsiness detection by monitoring eyes and other driver cues.",
    details: [
      "1st Prize Winner at KIIT-Fest, 2019 in KIIT University and MeiTY TIDE 2020's NIT Silchar Chapter",
      "Developed a B-Plan for the prototype and pitched it across the country",
      "Works with IoT modules (ESP8266/NodeMCU), WiFi, RF Tx-Rx, and Google Apps Scripting.",
    ],
    endDate: "Dec 2019",
    images: {
      others: [],
      primary: "/assets/projects/infrawake.jpeg",
    },
    links: {
      primary: "https://youtube.com/watch?v=hqWcnQ520LQ",
    },
    name: "InfrAwake: Driver Safety System",
    skills: [
      "IoT",
      "ESP8266",
      "NodeMCU",
      "WiFi",
      "RF Tx-Rx",
      "Google Apps Scripting",
    ],
    startDate: "Oct 2019",
  },
];
