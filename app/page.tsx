import { LaunchpadTable } from "./LaunchpadTable";
import { PrismaClient, ProjectStatus } from "@prisma/client";
import intro from "/public/intro.svg";
import Image from "next/image";
import Link from "next/link";

async function getProjects(status: ProjectStatus, isActive: boolean) {
  const prisma = new PrismaClient();
  const projects = await prisma.project.findMany({
    where: { status, isActive },
  });

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
  const activeProjects = await getProjects("DEPLOYED", true);
  const endedProjects = await getProjects("DEPLOYED", false);

  return (
    <div className="border flex flex-col items-center bg-[#dcdee4]">
      <div>
        <div className="mt-12 flex justify-center items-center">
          <Image src={intro} alt="coingenesis" height={400} width={1000} />
        </div>

        <div className="mt-12 mb-12 flex justify-center items-center font-space-grotesk font-medium text-[20px] leading-[26px] text-black space-x-4">
          <div>Connect Wallet</div>
          <div className="font-bold text-lg">→</div>
          <div>Submit a Token Deploy Proposal</div>
          <div className="font-bold text-lg">→</div>
          <div>Become a Certified Deployer</div>
          <div className="font-bold text-lg">→</div>
          <div>Dive into the Pre-Market Trading</div>
        </div>

        <h2 className="mt-12 text-3xl text-center py-14 font-bold">
          Active Launchpads
        </h2>
        <LaunchpadTable items={activeProjects} />

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
