import { z } from "zod";

export const kingdoms = z.enum(["Animalia", "Plantae", "Fungi", "Protista", "Archaea", "Bacteria"]);

export const speciesSchema = z.object({
  common_name: z.string().optional(),
  description: z.string().optional(),
  kingdom: kingdoms,
  scientific_name: z.string().min(1),
  total_population: z.number().int().positive().min(1).optional(),
  image: z.string().url().optional().or(z.literal("")),
});
