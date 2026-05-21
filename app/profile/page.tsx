import { ProfilePage } from "@/components/profile/profile-page";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "My Profile",
  description: "Manage your TalentFlow job seeker profile.",
  path: "/profile",
  noIndex: true,
});

export default function ProfileRoute() {
  return <ProfilePage />;
}
