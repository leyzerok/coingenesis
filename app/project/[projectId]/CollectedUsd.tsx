"use client";

import React from "react";
import { useReadContract } from "wagmi";
import { abi } from "@/abis/abi";
import { contractAddress } from "@/app/consts";
import { FiLoader } from "react-icons/fi";
import chainlinkLogo from "@/public/chainlink.svg";
import Image from "next/image";

interface CollectedUsdProps {
  tokenAddress: string | null;
}

export const CollectedUsd = ({ tokenAddress }: CollectedUsdProps) => {
  const { data: collectedUsd, isLoading } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getCollectedUSD",
    args: [tokenAddress],
  });

  return (
    <div className="flex flex-col ">
      <div className="flex gap-1 items-center">
        Collected:{" "}
        {isLoading ? (
          <FiLoader className="animate-spin" />
        ) : collectedUsd && typeof collectedUsd === "bigint" && collectedUsd > 0 ? (
          (collectedUsd).toString()
        ) : (
          "0"
        )}{" "}
        USD
      </div>

      <div className="flex gap-1 items-center">
        <span className="text-xs text-gray-600 font-semibold">powered by</span>
        <Image src={chainlinkLogo.src} alt="chainlink" height={20} width={90} />
      </div>
    </div>
  );
};
