"use client";

import { useWriteContract } from "wagmi";
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

    // TODO: pick ether value
  };

  return (
    <div>
      <Input
        value={ethValue}
        onChange={(e) => setEthValue(e.target.value)}
        placeholder="0.001"
        disabled={isPending}
      />
      <Button
        onClick={buyToken}
        disabled={!tokenAddress || isPending}
        className="w-full flex gap-2"
      >
        Buy
        {isPending && <FiLoader className="animate-spin" />}
      </Button>
    </div>
  );
};
