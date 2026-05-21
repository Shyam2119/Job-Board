import { StaticPage } from "@/components/layout/static-page";
import { createMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Contact Us",
  description: "Get in touch with the TalentFlow team.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <StaticPage title="Contact Us">
      <p>
        Have questions about listings, partnerships, or your account? We&apos;d
        love to hear from you.
      </p>
      <h2>General Inquiries</h2>
      <p>
        Email us at{" "}
        <a
          href="mailto:hello@talentflow.jobs"
          className="text-accent hover:underline"
        >
          hello@talentflow.jobs
        </a>
      </p>
      <h2>Employers</h2>
      <p>
        Ready to post a role?{" "}
        <Link href="/post-job" className="text-accent hover:underline">
          Post a job
        </Link>{" "}
        for free or reach our sales team at{" "}
        <a
          href="mailto:employers@talentflow.jobs"
          className="text-accent hover:underline"
        >
          employers@talentflow.jobs
        </a>
        .
      </p>
      <h2>Support Hours</h2>
      <p>Monday – Friday, 9:00 AM – 6:00 PM (EST). We typically respond within one business day.</p>
    </StaticPage>
  );
}
