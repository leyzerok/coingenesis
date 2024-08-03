import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "./Web3Provider";
import Header from "./Header";
import { Space_Grotesk } from "next/font/google";

const grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoinGenesis",
  description: "Launch your next token",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Web3Provider>
      <html lang="en">
        <head>
          <link rel="favicon" href="/favicon.png" />
        </head>
        <body className={grotesk.className}>
          <>
            <Header />
            {children}
          </>
        </body>
      </html>
    </Web3Provider>
  );
}
