import { NotFoundContent } from "@/components/layout/not-found-content";

export default function JobNotFound() {
  return (
    <NotFoundContent
      title="Job Not Found"
      description="This job listing may have been removed or doesn't exist."
      showHome={false}
    />
  );
}
