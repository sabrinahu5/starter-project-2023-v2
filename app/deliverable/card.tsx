import { Button } from "@/components/ui/button";
import type { Database } from "@/lib/schema";
import Image from "next/image";
type Specie = Database["public"]["Tables"]["species"]["Row"];

export default function Card(specie: Specie) {
  return (
    <div className="flex-none m-4 w-72 min-w-72 rounded border-2 p-3 shadow">
      {specie.image && <Image src={specie.image} width={300} height={100} alt={specie.scientific_name} />}
      <h3 className="mt-3 text-2xl font-semibold">{specie.common_name}</h3>
      <h4 className="text-lg font-light italic">{specie.scientific_name}</h4>
      <p>{specie.description}</p>
      {/* Replace with detailed view */}
      <Button className="mt-3 w-full">Learn More</Button>
    </div>
  );
}
