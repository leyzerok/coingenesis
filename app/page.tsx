import { LaunchpadTable } from "./LaunchpadTable";
import { PrismaClient, ProjectStatus } from "@prisma/client";
import intro from "/public/intro.svg";
import Image from "next/image";
import Link from "next/link";

async function getProjects(status: ProjectStatus) {
  const prisma = new PrismaClient();
  const projects = await prisma.project.findMany({ where: { status } });

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
  const deployedProjects = await getProjects("DEPLOYED");
  const pendingProjects = await getProjects("PENDING");

  return (
    <div className="border flex flex-col items-center bg-[#dcdee4]">
      <div>
        <div className="mt-12">
          <Image className="flex justify-center items-center" src={intro} alt="coingenesis" height={400} width={1000} />
        </div>

        <div className="mt-12 mb-12 flex justify-center items-center font-space-grotesk font-medium text-[20px] leading-[26px] text-black space-x-4">
          <div>Connect Wallet</div>
          <div>→</div>
          <div>Submit a Token Deploy Proposal</div>
          <div>→</div>
          <div>Become a Certified Deployer</div>
          <div>→</div>
          <div>Dive into the Pre-Market Trading</div>
        </div>

        <h2 className="mt-12 text-3xl text-center py-14 font-bold">
          Active Launchpads
        </h2>
        <LaunchpadTable items={deployedProjects} />       

        <div className="flex justify-center items-center mt-12 mb-12">
        <Link href="/launchpad">
          <button className="bg-transparent border border-black text-black py-4 px-8 text-lg rounded-full hover:bg-black hover:text-white transition">
            View More →
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
}
