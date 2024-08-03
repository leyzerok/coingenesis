"use client";

import React from "react";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";
import logo from "/public/logo.svg";
import Image from "next/image";

type HeaderMenuLink = {
  label: string;
  href: string;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Debug Contracts",
    href: "/debug",
  },
];

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <div className="flex items-center">
        <Image
          src={logo.src}
          alt="Logo"
          className=""
          height={113}
          width={353}
        />
      </div>
      <nav>
        <Link
          href="/"
          className="hover:bg-secondary hover:shadow-md focus:bg-secondary active:text-neutral py-1.5 px-3 text-sm rounded-full text-black"
        >
          Launchpad
        </Link>
        <Link
          href="/deploy"
          className="hover:bg-secondary hover:shadow-md focus:bg-secondary active:text-neutral py-1.5 px-3 text-sm rounded-full text-black"
        >
          Token Deploy Proposal
        </Link>
      </nav>
      <div>
        <ConnectKitButton />
      </div>
    </header>
  );
};

export default Header;
