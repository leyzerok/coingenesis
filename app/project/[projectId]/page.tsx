import { PrismaClient } from "@prisma/client";
import React from "react";

const getProject = async (id: string) => {
  const prisma = new PrismaClient();
  const project = await prisma.project.findUnique({
    where: { id },
  });
  return project;
};

interface Params {
  params: {
    projectId: string;
  };
}

const Project = async ({ params }: Params) => {
  if (!params.projectId) {
    return <div>Error. No project selected</div>;
  }
  const project = await getProject(params.projectId);
  if (!project) {
    return <div>Project {params.projectId} not found</div>;
  }

  console.log(params);
  return <div>Project {params.projectId}</div>;
};

export default Project;
