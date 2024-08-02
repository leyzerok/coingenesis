"use client";

import React from 'react';
import Link from 'next/link';
import { ConnectKitButton } from 'connectkit';
// components/HeaderMenuLinks.tsx
import { useRouter } from 'next/navigation';

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
  
  const HeaderMenuLinks: React.FC = () => {
    const router = useRouter();
  
    return (
      <ul className="flex space-x-4">
        {menuLinks.map(({ label, href }) => (
          <li key={href}>
            <button
              type="button"
              onClick={() => router.push(href)}
              className="hover:bg-secondary hover:shadow-md focus:bg-secondary active:text-neutral py-1.5 px-3 text-sm rounded-full"
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    );
  };
  

  const Header: React.FC = () => {
    return (
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="w-12 h-12 mr-3" />
          <h1 className="text-2xl font-bold">My Web App</h1>
        </div>
        <nav>
          <HeaderMenuLinks />
        </nav>
        <div>
          <ConnectKitButton />
        </div>
      </header>
    );
  };
  
  export default Header;
