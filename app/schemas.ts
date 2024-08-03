import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1),
  symbol: z.string().min(1).max(5),
  description: z.string().min(1),
  // TODO: social media
  website: z.string().url(),
  whitepaper: z.string().optional(),
});
