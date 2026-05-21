import { StaticPage } from "@/components/layout/static-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Terms of Service",
  description: "Terms and conditions for using TalentFlow.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Service">
      <p>Last updated: May 2026</p>
      <h2>Acceptance of Terms</h2>
      <p>
        By accessing TalentFlow, you agree to these terms. If you do not agree,
        please discontinue use of the platform.
      </p>
      <h2>Job Listings</h2>
      <p>
        Employers are responsible for the accuracy of postings. TalentFlow does
        not guarantee employment outcomes from any listing or application.
      </p>
      <h2>User Conduct</h2>
      <p>
        You agree not to misuse the platform, post fraudulent listings, or
        interfere with other users&apos; experience.
      </p>
      <h2>Limitation of Liability</h2>
      <p>
        TalentFlow is provided &quot;as is.&quot; We are not liable for indirect
        damages arising from use of the service.
      </p>
    </StaticPage>
  );
}
