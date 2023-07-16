"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Database } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState, type BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function AddEntry() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<null | string>(null);

  useEffect(() => {
    async function getSession() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) return;
      setUserId(data.session.user.id);
    }
    void getSession();
  }, [supabase.auth]);

  const speciesSchema = z.object({
    commonName: z.string().optional(),
    continents: z
      .enum(["North America", "South America", "Europe", "Africa", "Asia", "Australia", "Antarctica"])
      .optional(),
    description: z.string().optional(),
    kingdom: z.enum(["Animalia", "Plantae", "Fungi", "Protista", "Archaea", "Bacteria"]),
    oceans: z.enum(["Pacific", "Atlantic", "Indian", "Arctic", "Southern"]).optional(),
    scientificName: z.string(),
    totalPopulation: z.number().optional(),
    imageUrl: z.string().optional(),
  });
  type FormData = z.infer<typeof speciesSchema>;

  const defaultValues: FormData = {
    commonName: "",
    continents: undefined,
    description: "",
    kingdom: "Animalia",
    oceans: undefined,
    scientificName: "",
    totalPopulation: 0,
    imageUrl: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(speciesSchema),
    defaultValues,
  });

  const onSubmit = async (input: FormData) => {
    if (!userId) return;
    await supabase
      .from("species")
      .insert([
        {
          author: userId,
          common_name: input.commonName,
          continents: input.continents,
          description: input.description,
          kingdom: input.kingdom,
          oceans: input.oceans,
          scientific_name: input.scientificName,
          total_population: input.totalPopulation,
          image: input.imageUrl,
        },
      ])
      .then(() => {
        setOpen(false);
        router.refresh();
      });
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button variant="secondary" onClick={() => setOpen(true)}>
          <Icons.add className="mr-3 h-5 w-5" />
          Add Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-scroll sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Species</DialogTitle>
          <DialogDescription>
            Add a new species here. Click &quot;Add Entry&quot; below when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e: BaseSyntheticEvent) => void handleSubmit(onSubmit)(e)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="scientificName">Scientific Name</Label>
              <Input id="scientificName" placeholder="Cavia porcellus" {...register("scientificName")} />
              {errors.scientificName && (
                <span className="mt-2 block text-red-800">{errors.scientificName?.message}</span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="commonName">Common Name</Label>
              <Input id="commonName" placeholder="Guinea Pig" {...register("commonName")} />
              {errors.commonName && <span className="mt-2 block text-red-800">{errors.commonName?.message}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="kingdom">Kingdom</Label>
              <select
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="kingdom"
                {...register("kingdom")}
              >
                <option value="Animalia">Animalia</option>
                <option value="Plantae">Plantae</option>
                <option value="Fungi">Fungi</option>
                <option value="Protista">Protista</option>
                <option value="Archaea">Archaea</option>
                <option value="Bacteria">Bacteria</option>
              </select>
              {errors.kingdom && <span className="mt-2 block text-red-800">{errors.kingdom?.message}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="continents">Continent</Label>
              <select
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="continents"
                {...register("continents")}
              >
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Europe">Europe</option>
                <option value="Africa">Africa</option>
                <option value="Asia">Asia</option>
                <option value="Australia">Australia</option>
                <option value="Antarctica">Antarctica</option>
              </select>
              {errors.continents && <span className="mt-2 block text-red-800">{errors.continents?.message}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="oceans">Ocean</Label>
              <select
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                id="oceans"
                {...register("oceans")}
              >
                <option value="Pacific">Pacific</option>
                <option value="Atlantic">Atlantic</option>
                <option value="Indian">Indian</option>
                <option value="Arctic">Arctic</option>
                <option value="Southern">Southern</option>
              </select>
              {errors.oceans && <span className="mt-2 block text-red-800">{errors.oceans?.message}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="totalPopulation">Total Population</Label>
              <Input
                id="totalPopulation"
                placeholder="300000"
                type="number"
                {...register("totalPopulation", { valueAsNumber: true })}
              />
              {errors.totalPopulation && (
                <span className="mt-2 block text-red-800">{errors.totalPopulation?.message}</span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/George_the_amazing_guinea_pig.jpg/440px-George_the_amazing_guinea_pig.jpg"
                {...register("imageUrl")}
              />
              {errors.imageUrl && <span className="mt-2 block text-red-800">{errors.imageUrl?.message}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="The guinea pig or domestic guinea pig, also known as the cavy or domestic cavy, is a species of rodent belonging to the genus Cavia in the family Caviidae."
                {...register("description")}
              />
              {errors.description && <span className="mt-2 block text-red-800">{errors.description?.message}</span>}
            </div>
          </div>
          <Button type="submit" className="float-right m-3">
            Add Entry
          </Button>
          <Button className="float-right m-3" variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
