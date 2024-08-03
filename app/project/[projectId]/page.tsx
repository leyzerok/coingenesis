import { PrismaClient } from "@prisma/client";
import Image from "next/image";
import React from "react";
import tokenPlaceholder from "/public/token-logo-placeholder.png";
import { Button } from "@/components/ui/button";
import { TbWorld } from "react-icons/tb";
import Link from "next/link";

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
  return (
    <div className="flex gap-5 mx-auto items-start justify-center pt-6 ">
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <Image
            src={tokenPlaceholder.src}
            height={120}
            width={120}
            alt="Token logo"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold">{project.name}</span>
            <span className="text-gray-700 font-semibold">
              ${project.symbol}
            </span>
          </div>
        </div>
        <div className="flex gap-1">
          <Button>Buy</Button>
          <Button>Sell</Button>
        </div>
        <Link href={project.website}>
          <div className="flex items-center mt-2">
            <TbWorld />
            {project.website}
          </div>
        </Link>
      </div>

      <div className="max-w-[600px] whitespace-pre-wrap">
        {project.description}
      </div>
    </div>
  );
};

export default Project;
