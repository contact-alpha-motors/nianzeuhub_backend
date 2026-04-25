import ProfileForm from "@/components/talent/ProfileForm";
import { talentProfiles } from "@/lib/data";

export default function EditProfilePage() {
  // In a real app, you would fetch the currently logged-in user's profile
  const userProfile = talentProfiles[0];

  return (
    <div>
      <ProfileForm profile={userProfile} />
    </div>
  );
}
