"use client";

import { useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { abi } from "@/abis/abi";
import { Button } from "@/components/ui/button";

interface BuyButtonProps {
  tokenAddress: string | null;
}

export const BuyButton = ({ tokenAddress }: BuyButtonProps) => {
  const { writeContract, error } = useWriteContract();
  console.log("🚀 ~ BuyButton ~ error:", error);

  const buyToken = async () => {
    console.log("inside buy token");
    writeContract({
      address: "0x271ce2a8bfc78b5408c689fb2b51a9fa8ab49990",
      abi,
      functionName: "buyToken",
      args: [
        tokenAddress,
        Math.floor(Date.now() / 1000) + 3600, // Deadline: 1 hour from now
      ],

      value: parseEther("0.0001"), // Replace with the amount of ETH to send
    });

    // TODO: pick ether value
  };

  return (
    <Button onClick={buyToken} disabled={!tokenAddress}>
      Buy
    </Button>
  );
};
