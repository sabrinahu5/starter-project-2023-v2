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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, type BaseSyntheticEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import type { FormData } from "../../lib/types";
import { continentOptions, kingdomOptions, oceanOptions, speciesSchema } from "../../lib/types";
import { addEntry } from "../mutations";

export default function AddEntry({ userId }: { userId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(speciesSchema),
  });

  const onSubmit = async (input: FormData) => {
    await addEntry({ ...input, author: userId }).then(() => {
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              <Label htmlFor="scientific_name">Scientific Name <span className="text-red-500 italic text-sm">* {errors.scientific_name && "Required"}</span></Label>
              <Input id="scientific_name" placeholder="Cavia porcellus" {...register("scientific_name")} />
              {/*errors.scientific_name && (
                <span className="mt-2 block text-red-500">{errors.scientific_name?.message}</span>
              )*/}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="common_name">Common Name</Label>
              <Input id="common_name" placeholder="Guinea Pig" {...register("common_name")} />
              {errors.common_name && <span className="mt-2 block text-red-500">{errors.common_name?.message}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="kingdom">Kingdom <span className="text-red-500 italic text-sm">* {errors.kingdom && "Required"}</span></Label>
              <Controller
                control={control}
                name="kingdom"
                defaultValue={kingdomOptions[0]?.value}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    className="text-sm"
                    ref={ref}
                    value={kingdomOptions.find((c) => c.value === value)}
                    onChange={(val) => {
                      if (val) {
                        onChange(val.value);
                      }
                    }}
                    options={kingdomOptions}
                  />
                )}
              />
              {errors.kingdom && <span className="mt-2 block text-red-500">{errors.kingdom?.message}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="continents">Continent</Label>
              <Controller
                control={control}
                name="continents"
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    className="text-sm"
                    ref={ref}
                    value={continentOptions.filter((c) => value?.includes(c.value))}
                    onChange={(val) => onChange(val.map((c) => c.value))}
                    options={continentOptions}
                    isMulti
                  />
                )}
              />
              {errors.continents && <span className="mt-2 block text-red-500">{errors.continents?.message}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="oceans">Ocean</Label>
              <Controller
                control={control}
                name="oceans"
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    className="text-sm"
                    ref={ref}
                    value={oceanOptions.filter((c) => value?.includes(c.value))}
                    onChange={(val) => onChange(val.map((c) => c.value))}
                    options={oceanOptions}
                    isMulti
                  />
                )}
              />
              {errors.oceans && <span className="mt-2 block text-red-500">{errors.oceans?.message}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="total_population">Total Population</Label>
              <Input
                id="total_population"
                placeholder="300000"
                type="number"
                {...register("total_population", {
                  setValueAs: (value: string) => (value === "" ? undefined : parseInt(value) ?? undefined),
                })}
              />
              {errors.total_population && (
                <span className="mt-2 block text-red-500">{errors.total_population?.message}</span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                placeholder="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/George_the_amazing_guinea_pig.jpg/440px-George_the_amazing_guinea_pig.jpg"
                {...register("image")}
              />
              {errors.image && <span className="mt-2 block text-red-500">{errors.image?.message}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="The guinea pig or domestic guinea pig, also known as the cavy or domestic cavy, is a species of rodent belonging to the genus Cavia in the family Caviidae."
                {...register("description")}
              />
              {errors.description && <span className="mt-2 block text-red-500">{errors.description?.message}</span>}
            </div>
          </div>
          <Button type="submit" className="float-right m-3">
            Add Entry
          </Button>
          <Button type="button" className="float-right m-3" variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
