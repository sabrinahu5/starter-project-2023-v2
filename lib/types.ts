import { z } from "zod";

export const kingdoms = z.enum(["Animalia", "Plantae", "Fungi", "Protista", "Archaea", "Bacteria"]);

export const speciesSchema = z.object({
  // Accept undefined, empty string, or non-whitespace character string, and trim surrounding whitespace after validation (before form submission)
  common_name: z
    .string()
    .trim()
    .min(1, "Text must contain non-whitespace characters")
    .or(z.literal(""))
    .optional()
    .transform((val) => val?.trim()),
  description: z
    .string()
    .trim()
    .min(1, "Text must contain non-whitespace characters")
    .or(z.literal(""))
    .optional()
    .transform((val) => val?.trim()),
  kingdom: kingdoms,
  scientific_name: z
    .string()
    .trim()
    .min(1)
    .transform((val) => val.trim()),
  total_population: z.number().int().positive().min(1).optional(),
  image: z
    .string()
    .url()
    .optional()
    .transform((val) => val?.trim()),
});
