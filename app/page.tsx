"use client";

import Image from "next/image";
import { Web3Provider } from "./Web3Provider";
import { ConnectKitButton } from "connectkit";

export default function Home() {
  return (
    <Web3Provider >
      <ConnectKitButton />
      </Web3Provider >
  );
}
