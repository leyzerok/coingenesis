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

  return projects;
}

const Admin = async () => {
  const pendingProjects = await getProjects();

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
      <h2 className="text-3xl text-center py-14 font-bold">Pending review</h2>
      <LaunchpadTable items={pendingProjects} />
    </div>
  );
};

export default Admin;
