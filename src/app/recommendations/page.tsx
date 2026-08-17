import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/section";
import { RecommendationCard } from "@/components/domain/RecommendationCard";
import { recommendations } from "@/data/recommendations";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.recommendations.metadata;

export default function RecommendationsPage() {
  return (
    <Section noDivider className="py-16">
      <SectionHeader>
        <SectionTitle as="h1">Recommendations</SectionTitle>
        <SectionDescription>
          Testimonials and endorsements from clients, colleagues, and partners
          who have worked with me.
        </SectionDescription>
      </SectionHeader>

      <div className="space-y-4 mt-8">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.from}
            recommendation={recommendation}
          />
        ))}
      </div>
    </Section>
  );
}
