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
import {
  useAccount,
  useReadContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useEffect, useState } from "react";
import { contractAddress } from "./consts";
import { FiLoader } from "react-icons/fi";

const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const Row = ({
  id,
  symbol,
  status,
  website,
  name,
  discord,
  telegram,
  twitter,
  imageURL,
  tokenAddress,
}: Project) => {
  const router = useRouter();
  const { address } = useAccount();
  const {
    data: hash,
    writeContract,
    isPending,
    error,
    isSuccess,
  } = useWriteContract();
  const [isLoadingReject, setIsLoadingReject] = useState(false);

  // TODO: show toast when submitted or error

  if (error) {
    console.log("🚀 ~ error:", error);
  }

  const { data: tokenData, isLoading: isLoadingTokenData } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "tokens",
    args: [tokenAddress],
  });

  const formatRaisedEth = (value: bigint | undefined): string => {
    if (typeof value !== "bigint" || value <= 0) {
      return "0.0000";
    }

    // Use 10^18 as the divisor since ETH has 18 decimal places
    const divisor = BigInt("1000000000000000000"); // 10^18
    const fractionalPart = (value * BigInt(10000)) / divisor; // Multiply by 10000 to get 4 decimal places

    // Format to 4 decimal places
    const formattedValue = fractionalPart.toString().padStart(5, "0");
    const integerPart = formattedValue.slice(0, -4);
    const decimalPart = formattedValue.slice(-4);

    // Combine and remove trailing zeros, but always show at least one decimal place
    return `${integerPart || "0"}.${decimalPart}`.replace(/\.?0+$/, (match) =>
      match.includes(".") ? ".0" : ""
    );
  };

  const { data: collectedUsd, isLoading: isLoadingCollectedUsd } =
    useReadContract({
      abi,
      address: contractAddress,
      functionName: "getCollectedUSD",
      args: [tokenAddress],
    });

  const result = useSimulateContract({
    address: contractAddress,
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
        imageURL: imageURL,
        tokenCreator: address,
        // this values are hardcoded for now, but will be configurable in the future
        totalSupply: BigInt("1000000000000000000000000000"),
        availableSupply: BigInt("800000000000000000000000000"),
        ethTarget: BigInt("1000000000000000000"),
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

    console.log("starting deploy...");
    writeContract({
      address: contractAddress,
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
          imageURL: imageURL,
          tokenCreator: address,
          // this values are hardcoded for now, but will be configurable in the future
          totalSupply: BigInt("1000000000000000000000000000"),
          availableSupply: BigInt("800000000000000000000000000"),
          ethTarget: BigInt("1000000000000000000"),
        },
      ],
    });

    console.log("finished?");

    router.refresh();
  };

  const handleReject = async () => {
    setIsLoadingReject(true);
    await rejectProject(id);
    router.refresh();
  };

  useEffect(() => {
    if (isSuccess) {
      // @ts-ignore
      const tokenAddress = result.data?.result;
      if (!tokenAddress) {
        console.error("no token address!!");
        return;
      }
      deployProject({ id, address: tokenAddress, txHash: hash });
    }
  }, [id, isSuccess, result.data?.result, hash]);

  return (
    <TableRow className="border-none">
      <TableCell className="font-medium text-center">
        <Link href={`/project/${id}`}>
          <div className="flex flex-col gap-2 items-center">
            <Image
              src={imageURL || tokenPlaceholder.src}
              alt="token logo"
              height={63}
              width={63}
            />
            {name}
          </div>
        </Link>
      </TableCell>

      <TableCell className="text-lg">
        <div className="flex gap-1 items-center justify-end">
          {isLoadingTokenData ? (
            <FiLoader className="animate-spin" />
          ) : (tokenData as unknown[]) &&
            // @ts-ignore
            tokenData[0] > 0 ? (
            // @ts-ignore
            formatRaisedEth(tokenData[0])
          ) : (
            "0"
          )}{" "}
          ETH
        </div>
      </TableCell>

      <TableCell className="text-center text-lg">Coming soon...</TableCell>

      <TableCell className="text-lg">
        <div className="flex gap-1 items-center justify-end">
          {isLoadingCollectedUsd ? (
            <FiLoader className="animate-spin" />
          ) : collectedUsd &&
            typeof collectedUsd === "bigint" &&
            collectedUsd > 0 ? (
            collectedUsd.toString()
          ) : (
            "0"
          )}{" "}
          USD
        </div>
      </TableCell>

      {status === "PENDING" && (
        <TableCell>
          <div className="flex gap-1">
            <Button
              onClick={handleDeploy}
              disabled={isPending || isLoadingReject}
              className="flex gap-2"
            >
              Deploy
              {isPending && <FiLoader className="animate-spin" />}
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={isPending || isLoadingReject}
              className="flex gap-2"
            >
              Reject
              {isLoadingReject && <FiLoader className="animate-spin" />}
            </Button>
          </div>
        </TableCell>
      )}
    </TableRow>
    // TODO: add some loading indicator or something
  );
};

interface LaunchPadTableProps {
  items: Project[];
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
            <TableHead className="text-center">Token</TableHead>
            <TableHead className="text-right">Raised</TableHead>
            <TableHead className="text-center">Market Cap</TableHead>
            <TableHead className="text-right">Collected</TableHead>
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
