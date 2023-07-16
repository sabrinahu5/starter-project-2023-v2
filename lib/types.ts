import { z } from "zod";

export const continents = [
  "Africa",
  "Antarctica",
  "Asia",
  "Australia",
  "Europe",
  "North America",
  "South America",
] as const;
export const kingdoms = ["Animalia", "Plantae", "Fungi", "Protista", "Archaea", "Bacteria"] as const;
export const oceans = ["Pacific", "Atlantic", "Indian", "Arctic", "Southern"] as const;

export const continentOptions = continents.map((val) => ({ value: val, label: val }));
export const oceanOptions = oceans.map((val) => ({ value: val, label: val }));
export const kingdomOptions = kingdoms.map((val) => ({ value: val, label: val }));

export const speciesSchema = z.object({
  common_name: z.string().optional(),
  continents: z.array(z.enum(continents)).optional(),
  description: z.string().optional(),
  kingdom: z.enum(kingdoms),
  oceans: z.array(z.enum(oceans)).optional(),
  scientific_name: z.string().min(1),
  total_population: z.number().int().positive().min(1).optional(),
  image: z.string().url().optional().or(z.literal("")),
});
