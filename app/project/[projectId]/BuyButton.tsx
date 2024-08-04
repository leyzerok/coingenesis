"use client";

import { useReadContract, useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { abi } from "@/abis/abi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { contractAddress } from "@/app/consts";
import { FiLoader } from "react-icons/fi";

interface BuyButtonProps {
  tokenAddress: string | null;
}

export const BuyButton = ({ tokenAddress }: BuyButtonProps) => {
  const [ethValue, setEthValue] = useState("");
  const { writeContract, error, isPending, isSuccess } = useWriteContract();

  const { data: tokens, isLoading } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getAmountOut",
    args: [tokenAddress, parseEther(ethValue)],
  });

  useEffect(() => {
    if (isSuccess) setEthValue("");
  }, [isSuccess]);

  if (error) console.error(error);

  const buyToken = async () => {
    writeContract({
      address: contractAddress,
      abi,
      functionName: "buyToken",
      args: [
        tokenAddress,
        Math.floor(Date.now() / 1000) + 3600, // Deadline: 1 hour from now
      ],

      value: parseEther(ethValue), // Replace with the amount of ETH to send
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        value={ethValue}
        onChange={(e) => setEthValue(e.target.value)}
        placeholder="0.001"
        disabled={isPending}
      />
      <Button
        onClick={buyToken}
        disabled={!tokenAddress || isPending}
        className="w-full flex gap-2 items-center"
      >
        Buy{" "}
        {isLoading ? (
          <FiLoader className="animate-spin" />
        ) : tokens && typeof tokens === "bigint" ? (
          (tokens / BigInt("100000000000000000000")).toString()
        ) : (
          "0"
        )}{" "}
        tokens
        {isPending && <FiLoader className="animate-spin" />}
      </Button>
    </div>
  );
};
