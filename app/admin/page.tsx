import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { adminAddresses } from "../consts";
import { LaunchpadTable } from "../LaunchpadTable";
import { PrismaClient, ProjectStatus } from "@prisma/client";

async function getProjects() {
  const prisma = new PrismaClient();
  const projects = await prisma.project.findMany({
    where: { status: "PENDING" },
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

const Admin = async () => {
  const pendingProjects = await getProjects();

  return (
    <div className="border flex flex-col items-center">
      <h2 className="text-3xl text-center py-14 font-bold">Pending review</h2>
      <LaunchpadTable items={pendingProjects} />
    </div>
  );
};

export default Admin;
