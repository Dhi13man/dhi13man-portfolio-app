import { JourneyShell } from "@/components/journey/JourneyShell";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.journey.metadata;

export default function JourneyPage() {
  return <JourneyShell />;
}
