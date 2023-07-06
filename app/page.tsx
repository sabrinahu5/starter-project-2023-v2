import { TypographyH2, TypographyP } from "@/components/ui/typography";
import { type Database } from "@/lib/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return <TypographyH2>Not logged in!</TypographyH2>;
  }

  return (
    <>
      <TypographyH2>Welcome to the T4SG starter project!</TypographyH2>
      <TypographyP>
        This starter project is styled with Tailwind CSS and uses shadcn/ui as a component library. Feel free to add
        your own components!
      </TypographyP>
    </>
  );
}
