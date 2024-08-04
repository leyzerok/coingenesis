"use client";

import { useWriteContract } from "wagmi";
import { parseEther } from "viem";
import { abi } from "@/abis/abi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface BuyButtonProps {
  tokenAddress: string | null;
}

export const BuyButton = ({ tokenAddress }: BuyButtonProps) => {
  const [ethValue, setEthValue] = useState("");
  const { writeContract, error } = useWriteContract();

  if (error) console.error(error);

  const buyToken = async () => {
    writeContract({
      address: "0x271ce2a8bfc78b5408c689fb2b51a9fa8ab49990",
      abi,
      functionName: "buyToken",
      args: [
        tokenAddress,
        Math.floor(Date.now() / 1000) + 3600, // Deadline: 1 hour from now
      ],

      value: parseEther(ethValue), // Replace with the amount of ETH to send
    });

    // TODO: pick ether value
  };

  return (
    <div>
      <Input
        value={ethValue}
        onChange={(e) => setEthValue(e.target.value)}
        placeholder="0.001"
      />
      <Button onClick={buyToken} disabled={!tokenAddress} className="w-full">
        Buy
      </Button>
    </div>
  );
};
