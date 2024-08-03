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

const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

interface Projects {
  tokenLogo?: string;
  tokenName: string;
  raised: number;
  ath: number;
  marketCap: number;
}

const Row = ({ tokenLogo, tokenName, raised, ath, marketCap }: Projects) => {
  return (
    <TableRow className="border-none">
      <TableCell className="font-medium">
        <div className="flex flex-col gap-2 items-center">
          <Image
            src={tokenLogo || tokenPlaceholder.src}
            alt="token logo"
            height={63}
            width={63}
          />
          {tokenName}
        </div>
      </TableCell>
      <TableCell className="text-right text-lg">
        {formatNumber(raised)} ETH
      </TableCell>
      <TableCell className="text-lg">{ath} x</TableCell>
      <TableCell className="text-right text-lg">
        {formatNumber(marketCap)} USD
      </TableCell>
    </TableRow>
  );
};

interface LaunchPadTableProps {
  items: Projects[];
}

export const LaunchpadTable = ({ items }: LaunchPadTableProps) => {
  return (
    <div>
      <Table className="border border-black">
        <TableHeader>
          <TableRow className="border border-black">
            <TableHead>Token</TableHead>
            <TableHead>Raised</TableHead>
            <TableHead>ATH</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((row) => (
            <Row {...row} key={row.tokenName} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
