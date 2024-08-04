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
      imageURL,
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
        imageURL,
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
  } catch (error) {
    console.log("🚀 ~ createProject ~ error:", error);
  } finally {
    redirect("/");
  }
};

interface DeployProjectArgs {
  id: string;
  address: string;
  txHash: string;
}

export const deployProject = async ({
  id,
  address,
  txHash,
}: DeployProjectArgs) => {
  const prisma = new PrismaClient();
  await prisma.project.update({
    where: { id },
    data: { status: "DEPLOYED", isActive: true, tokenAddress: address, txHash },
  });
};

export const rejectProject = async (id: string) => {
  const prisma = new PrismaClient();
  await prisma.project.update({
    where: { id },
    data: { status: "REJECTED" },
  });
};
