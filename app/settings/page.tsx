import { Separator } from "@/components/ui/separator";
import { getProfile } from "./profile/get-profile";
import { ProfileForm } from "./profile/profile-form";

export default async function Settings() {
  const profileData = await getProfile();
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">This is how others will see you on the site.</p>
        </div>
        <Separator />
        <ProfileForm profile={profileData} />
      </div>
    </>
  );
}
