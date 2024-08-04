"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import tokenPlaceholder from "/public/token-logo-placeholder.png";
import Image from "next/image";
import { deployProject, rejectProject } from "./actions";
import { Button } from "@/components/ui/button";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { abi } from "@/abis/abi";
import { useAccount, useSimulateContract, useWriteContract } from "wagmi";
import { useEffect } from "react";

const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

interface ProjectData extends Project {
  raised: number;
  ath: number;
  marketCap: number;
}

const Row = ({
  id,
  symbol,
  status,
  website,
  name,
  raised,
  ath,
  marketCap,
  discord,
  telegram,
  twitter,
}: ProjectData) => {
  const router = useRouter();
  const { address } = useAccount();
  const {
    data: hash,
    writeContract,
    isPending,
    error,
    isSuccess,
  } = useWriteContract();

  useEffect(() => {
    if (isSuccess) {
      console.log("deployed!");
    }
  });

  // TODO: show toast when submitted or error

  console.log("🚀 ~ error:", error);

  const result = useSimulateContract({
    address: "0x271ce2a8bfc78b5408c689fb2b51a9fa8ab49990",
    abi,
    functionName: "createToken",
    args: [
      {
        name,
        symbol,
        twitterURL: twitter,
        discordURL: discord,
        websiteURL: website,
        telegramURL: telegram,
        imageURL: "image", // TODO
        tokenCreator: address,
        // this values are hardcoded for now, but will be configurable in the future
        totalSupply: BigInt("1000000000000000000000000000"),
        availableSupply: BigInt("800000000000000000000000000"),
        ethTarget: BigInt("100000000000000000000"),
      },
    ],
  });

  const handleDeploy = async () => {
    if (!address) {
      console.error("no address");
      return;
    }

    // @ts-ignore
    const tokenAddress = result.data?.result;
    if (!tokenAddress) {
      console.log(result.queryKey);
      return;
    }

    await deployProject({ id, address: tokenAddress }); // TODO: move this to be executed after approving the transaction

    console.log("starting deploy...");
    writeContract({
      address: "0x271ce2a8bfc78b5408c689fb2b51a9fa8ab49990",
      abi,
      functionName: "createToken",
      args: [
        {
          name,
          symbol,
          twitterURL: twitter,
          discordURL: discord,
          websiteURL: website,
          telegramURL: telegram,
          imageURL: "image", // TODO
          tokenCreator: address,
          // this values are hardcoded for now, but will be configurable in the future
          totalSupply: BigInt("1000000000000000000000000000"),
          availableSupply: BigInt("800000000000000000000000000"),
          ethTarget: BigInt("100000000000000000000"),
        },
      ],
    });

    console.log("finished?");

    router.refresh();
  };
  const handleReject = async () => {
    await rejectProject(id);
    router.refresh();
  };

  return (
    <TableRow className="border-none">
      <TableCell className="font-medium">
        <Link href={`/project/${id}`}>
          <div className="flex flex-col gap-2 items-center">
            <Image
              src={tokenPlaceholder.src}
              alt="token logo"
              height={63}
              width={63}
            />
            {name}
          </div>
        </Link>
      </TableCell>

      <TableCell className="text-right text-lg">
        {formatNumber(raised)} ETH
      </TableCell>

      <TableCell className="text-lg">{ath} x</TableCell>

      <TableCell className="text-right text-lg">
        {formatNumber(marketCap)} USD
      </TableCell>

      {status === "PENDING" && (
        <TableCell>
          <div className="flex gap-1">
            <Button onClick={handleDeploy}>Deploy</Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject
            </Button>
          </div>
        </TableCell>
      )}
    </TableRow>
    // TODO: add some loading indicator or something
  );
};

interface LaunchPadTableProps {
  items: ProjectData[];
  showActions?: boolean;
}

export const LaunchpadTable = ({
  items,
  showActions = false,
}: LaunchPadTableProps) => {
  return (
    <div>
      <Table className="border border-black">
        <TableHeader>
          <TableRow className="border border-black">
            <TableHead>Token</TableHead>
            <TableHead>Raised</TableHead>
            <TableHead>ATH</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
            {showActions && <TableHead>Admin</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((row) => (
            <Row {...row} key={row.id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
