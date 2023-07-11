import { type Database } from "@/lib/schema";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Card from "./card";
import AddEntry from "./add-entry";

export default async function Deliverable() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  const { data: species } = await supabase.from("species").select("*");

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-3xl font-semibold">
          T4SG <span className="text-green-400">Biodiversity Hub</span>
        </h2>
      < AddEntry />
      </div>
      <div className="flex flex-wrap">{species && species.map((specie) => <Card key={specie.id} {...specie} />)}</div>
    </>
  );
}
