"use client";

import React from "react";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";
import logo from "/public/logo.svg";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Launchpad
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Token Deploy Proposal
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          {/* 
              // TODO: this position is broken
          */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Learn more</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul>
                <li className="flex flex-nowrap">
                  <NavigationMenuLink asChild>
                    <Link href="/attestation">
                      Certified Deployer Attestation
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/community">Community</Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/docs">Documentation</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div>
        <ConnectKitButton />
      </div>
    </header>
  );
};

export default Header;
