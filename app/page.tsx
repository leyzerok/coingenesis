import { LaunchpadTable } from "./LaunchpadTable";
import { PrismaClient, ProjectStatus } from "@prisma/client";

async function getProjects(status: ProjectStatus) {
  const prisma = new PrismaClient();
  const projects = await prisma.project.findMany({ where: { status } });

  const mockProjects = projects.map((project) => {
    return {
      tokenName: project.name,
      raised: 1763,
      ath: 124.0,
      marketCap: 2140956,
    };
  });

  return mockProjects;
}

export default async function Home() {
  const deployedProjects = await getProjects("DEPLOYED");
  const pendingProjects = await getProjects("PENDING");

  return (
    <div className="border flex flex-col items-center">
      <div>
        <h2 className="text-3xl text-center py-14 font-bold">
          Active Launchpads
        </h2>
        <LaunchpadTable items={deployedProjects} />
      </div>

      <div className="mt-11">
        <h2 className="text-3xl text-center py-14 font-bold">
          Ended Launchpads
        </h2>
        <LaunchpadTable items={pendingProjects} />
      </div>
    </div>
  );
}
