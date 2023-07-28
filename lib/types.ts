import { z } from "zod";

export const kingdoms = ["Animalia", "Plantae", "Fungi", "Protista", "Archaea", "Bacteria"] as const;
export const kingdomOptions = kingdoms.map((val) => ({ value: val, label: val }));

export const speciesSchema = z.object({
  common_name: z.string().optional(),
  description: z.string().optional(),
  kingdom: z.enum(kingdoms),
  scientific_name: z.string().min(1),
  total_population: z.number().int().positive().min(1).optional(),
  image: z.string().url().optional().or(z.literal("")),
});
