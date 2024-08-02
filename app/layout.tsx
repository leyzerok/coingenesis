import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "./Web3Provider";
import { ConnectKitButton } from "connectkit";
import Header from "./Header";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <Web3Provider >
        <Header />
        <body className={inter.className}>{children}</body>
        <Footer />
      </Web3Provider >
    </html>
  );
}
