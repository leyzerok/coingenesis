import { LaunchpadTable } from "../LaunchpadTable";
import { PrismaClient, ProjectStatus } from "@prisma/client";
import intro from "/public/intro.svg";
import Image from "next/image";

async function getProjects(status: ProjectStatus) {
  const prisma = new PrismaClient();
  const projects = await prisma.project.findMany({ where: { status } });

  const mockProjects = projects.map((project) => {
    return {
      raised: 1763,
      ath: 124.0,
      marketCap: 2140956,
      ...project,
    };
  });

  return mockProjects;
}

export default async function Home() {
  const deployedProjects = await getProjects("DEPLOYED");
  const pendingProjects = await getProjects("ACCEPTED");

  return (
    <div className="border flex flex-col items-center w-full">
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl text-center py-14 font-bold">
          Active Launchpads
        </h2>
        <LaunchpadTable items={deployedProjects} />
      </div>

      <div className="mt-11  mb-12 w-full max-w-5xl">
        <h2 className="text-3xl text-center py-14 font-bold">
          Ended Launchpads
        </h2>
        <LaunchpadTable items={pendingProjects} />
      </div>
    </div>
  );
}
