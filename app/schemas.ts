import { LaunchType } from "@prisma/client";
import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1),
  symbol: z.string().min(1).max(5),
  description: z.string().min(1),
  website: z.string().url(),
  twitter: z.string().url(),
  discord: z.string().url(),
  telegram: z.string(),
  proposer: z.string(),
  humanityScore: z.string(),
  whitepaper: z.string().optional(),
  launchType: z.nativeEnum(LaunchType),
  team: z.string().optional(),
  roadmap: z.string().optional(),
  tokenAddress: z.string().optional(),
  imageURL: z.string().optional(),
});
