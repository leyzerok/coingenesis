"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
import { createProjectSchema } from "./schemas";

export const createProject = async (formData: FormData) => {
  try {
    console.log("🚀 ~ createProject ~ formData:", formData);

    const data = Object.fromEntries(formData.entries());

    const prisma = new PrismaClient();
    const { name, symbol, description, website, whitepaper } =
      createProjectSchema.parse(data);

    await prisma.project.create({
      data: {
        name,
        symbol,
        description,
        website,
        whitepaper,
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
    data: { status: "DEPLOYED" },
  });
};

export const rejectProject = async (id: string) => {
  const prisma = new PrismaClient();
  await prisma.project.update({
    where: { id },
    data: { status: "REJECTED" },
  });
};