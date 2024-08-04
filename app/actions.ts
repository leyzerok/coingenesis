"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { createProjectSchema } from "./schemas";

export const createProject = async (formData: FormData) => {
  try {
    console.log("🚀 ~ createProject ~ formData:", formData);

    const data = Object.fromEntries(formData.entries());

    const prisma = new PrismaClient();
    const {
      name,
      symbol,
      description,
      website,
      whitepaper,
      twitter,
      discord,
      telegram,
      proposer,
      roadmap,
      team,
      launchType,
      humanityScore,
    } = createProjectSchema.parse(data);

    await prisma.project.create({
      data: {
        name,
        symbol,
        description,
        website,
        whitepaper,
        twitter,
        discord,
        telegram,
        proposer,
        roadmap,
        team,
        launchType,
        humanityScore: parseFloat(humanityScore),
      },
    });

    redirect("/"); // TODO: redirect to the new project... and it isn't working
  } catch (error) {
    console.log("🚀 ~ createProject ~ error:", error);
  }
};

export const deployProject = async (id: string) => {
  // deploy the token
  // TODO: deployment
  // if successful, mark it as "DEPLOYED"
  const prisma = new PrismaClient();
  await prisma.project.update({
    where: { id },
    data: { status: "DEPLOYED", isActive: true },
  });
};

export const rejectProject = async (id: string) => {
  const prisma = new PrismaClient();
  await prisma.project.update({
    where: { id },
    data: { status: "REJECTED" },
  });
};
