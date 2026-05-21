import { NotFoundContent } from "@/components/layout/not-found-content";

export default function CompanyNotFound() {
  return (
    <NotFoundContent
      title="Company Not Found"
      description="We couldn't find a company profile matching this URL."
      showHome={false}
    />
  );
}
