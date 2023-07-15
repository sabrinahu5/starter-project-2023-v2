import { type Database } from "@/lib/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type NewEntry = Database["public"]["Tables"]["species"]["Insert"];

export async function addEntry(input: NewEntry) {
  const supabase = createClientComponentClient<Database>();
  await supabase.from("species").insert([
    {
      author: input.author,
      common_name: input.common_name,
      continents: input.continents,
      description: input.description,
      kingdom: input.kingdom,
      oceans: input.oceans,
      scientific_name: input.scientific_name,
      total_population: input.total_population,
      image: input.image,
    },
  ]);
}
