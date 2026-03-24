import type { Metadata } from "next";
import { JourneyShell } from "@/components/journey/JourneyShell";

const siteUrl = "https://dhimanseal.com";

export const metadata: Metadata = {
  title: "The Journey - Dhiman Seal",
  description:
    "4+ years building payment systems at Groww (300K+ daily transactions, 13M+ users). Startup founder (1 acquisition). Open-source creator (150+ GitHub stars). The full story.",
  openGraph: {
    title: "The Journey - Dhiman Seal",
    description:
      "From college robotics to 300K+ daily UPI transactions. The career story of a builder.",
    url: `${siteUrl}/journey`,
    type: "website",
    images: [
      {
        url: `${siteUrl}/assets/me.webp`,
        width: 800,
        height: 800,
        alt: "Dhiman Seal - The Journey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Journey - Dhiman Seal",
    description:
      "From college robotics to 300K+ daily UPI transactions. The career story of a builder.",
    creator: "@Dhi13man",
  },
};

export default function JourneyPage() {
  return <JourneyShell />;
}
