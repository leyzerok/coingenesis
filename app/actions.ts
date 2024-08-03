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

    const newProject = await prisma.project.create({
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
