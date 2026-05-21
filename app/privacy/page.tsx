import { StaticPage } from "@/components/layout/static-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description: "How TalentFlow collects, uses, and protects your data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy">
      <p>Last updated: May 2026</p>
      <h2>Information We Collect</h2>
      <p>
        When you browse listings, save jobs, or submit applications, we may store
        data locally in your browser (such as saved jobs and recently viewed
        listings) and process form submissions you provide.
      </p>
      <h2>How We Use Your Data</h2>
      <p>
        We use collected information to improve search results, personalize your
        experience, and deliver job alerts you subscribe to.
      </p>
      <h2>Data Security</h2>
      <p>
        We implement industry-standard safeguards. No method of transmission over
        the internet is 100% secure, but we work continuously to protect your
        information.
      </p>
      <h2>Your Rights</h2>
      <p>
        You may clear browser storage at any time to remove locally saved
        preferences. Contact us for questions about your data.
      </p>
    </StaticPage>
  );
}
