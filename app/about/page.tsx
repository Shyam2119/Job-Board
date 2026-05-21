import { StaticPage } from "@/components/layout/static-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "About TalentFlow",
  description:
    "Learn about TalentFlow — connecting job seekers with top employers worldwide.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <StaticPage title="About TalentFlow">
      <p>
        TalentFlow is a modern job board built to help professionals discover
        meaningful careers and help employers find exceptional talent.
      </p>
      <h2>Our Mission</h2>
      <p>
        We believe everyone deserves access to transparent job listings, fair
        compensation data, and tools that make the job search simpler — whether
        you&apos;re hiring locally or building a remote-first team.
      </p>
      <h2>What We Offer</h2>
      <p>
        Browse roles across tech, design, marketing, finance, healthcare, and
        remote categories. Save jobs, set alerts, and apply with confidence.
      </p>
    </StaticPage>
  );
}
