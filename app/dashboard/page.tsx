import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { type Database } from "@/lib/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  const userEmail = session.user.email;

  return (
    <>
      <TypographyH2>Dashboard</TypographyH2>
      <TypographyP>This is a protected route accessible only to signed-in users.</TypographyP>
      {userEmail && <TypographyP>{`Your email is ${userEmail}`}</TypographyP>}
    </>
  );
}
