import { LaunchpadTable } from "./LaunchpadTable";
import { PrismaClient, ProjectStatus } from "@prisma/client";

async function getProjects(status: ProjectStatus, isActive: boolean) {
  const prisma = new PrismaClient();
  const projects = await prisma.project.findMany({
    where: { status, isActive },
  });

  const mockProjects = projects.map((project) => {
    return {
      id: project.id,
      status: project.status,
      tokenName: project.name,
      raised: 1763,
      ath: 124.0,
      marketCap: 2140956,
    };
  });

  return mockProjects;
}

export default async function Home() {
  const activeProjects = await getProjects("DEPLOYED", true);
  const endedProjects = await getProjects("DEPLOYED", false);

  return (
    <div className="border flex flex-col items-center">
      <div>
        <h2 className="text-3xl text-center py-14 font-bold">
          Active Launchpads
        </h2>
        <LaunchpadTable items={activeProjects} />
      </div>

      <div className="mt-11">
        <h2 className="text-3xl text-center py-14 font-bold">
          Ended Launchpads
        </h2>
        <LaunchpadTable items={endedProjects} />
      </div>
    </div>
  );
}
