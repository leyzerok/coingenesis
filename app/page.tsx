"use client";

import { LaunchpadTable } from "./LaunchpadTable";

const activeLaunchpadMock = [
  {
    tokenName: "GenesisCoin",
    raised: 4,
    ath: 11.0,
    marketCap: 11278,
  },
];

const endedLaunchpadMock = [
  {
    tokenName: "BananaCoin",
    raised: 1763,
    ath: 124.0,
    marketCap: 2140956,
  },
  {
    tokenName: "HeyCoin",
    raised: 1143,
    ath: 384.1,
    marketCap: 1340839,
  },
  {
    tokenName: "YCoin",
    raised: 663,
    ath: 24.8,
    marketCap: 540114,
  },
];

export default function Home() {
  return (
    <div className="border border-red-500 flex flex-col items-center">
      <div>
        <h2 className="text-3xl text-center py-14 font-bold">
          Active Launchpads
        </h2>
        <LaunchpadTable items={activeLaunchpadMock} />
      </div>

      <div className="mt-11">
        <h2 className="text-3xl text-center py-14 font-bold">
          Ended Launchpads
        </h2>
        <LaunchpadTable items={endedLaunchpadMock} />
      </div>
    </div>
  );
}
