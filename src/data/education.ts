import type { Education } from "@/types";

export const education: Education[] = [
  {
    about:
      "One of India's premier engineering institutions, established in 1967 as a Regional Engineering College and elevated to NIT status in 2002. Renowned for rigorous academic standards and research contributions, consistently ranked among India's top technical institutions.",
    courses: [
      {
        degree: "Bachelor of Technology - BTech",
        description:
          "Pursued an unconventional academic path filled with accolades, solving real-world problems through technology while leading multiple startups and organizations.",
        details: [
          "Specialized in Electronics and Communications Engineering",
          "Won national-level accolades in Robotics, IoT, and business plan competitions",
          "Founded and led multiple early-stage ventures including Eminence Robotics and TechEngio",
        ],
        endDate: "2022",
        field: "Electrical, Electronics and Communications Engineering",
        gpa: "8.43",
        startDate: "2018",
      },
    ],
    images: {
      others: ["/assets/education/nits-achievements.png"],
      primary: "/assets/education/nits-banner.jpeg",
    },
    links: {
      others: [
        "https://linkedin.com/school/national-institute-of-technology-silchar/",
      ],
      primary: "http://www.nits.ac.in/achievements/cultural.php",
    },
    name: "National Institute of Technology (NIT), Silchar",
  },
  {
    about:
      "Prestigious CBSE-affiliated institution known for academic excellence and holistic development. Consistently produces top performers in board examinations and competitive tests.",
    courses: [
      {
        degree: "High School",
        description:
          "Completed Higher Secondary education with distinction in Science (Physics, Chemistry, Mathematics). Ranked among institution's top performers consistently.",
        endDate: "2018",
        field: "Science",
        percentage: "95",
        startDate: "2016",
      },
      {
        degree: "Early-Middle School",
        description:
          "Maintained perfect 10.0 GPA throughout middle school, demonstrating academic excellence across all subjects.",
        endDate: "2016",
        field: "General Studies",
        gpa: "10.0",
        startDate: "2006",
      },
    ],
    links: {
      primary: "https://gurukulgrammarschool.in/",
    },
    name: "Gurukul Grammar Senior Secondary School",
  },
];
