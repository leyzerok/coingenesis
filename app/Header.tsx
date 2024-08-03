"use client";

import React from "react";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";
import logo from "/public/logo.svg";
import Image from "next/image";
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAccount } from "wagmi";
import { adminAddresses } from "./consts";

const Header: React.FC = () => {
    const { address } = useAccount();

    return (
        <header className="flex justify-between items-center p-4 bg-gray-100">
            <Link href="/" className="flex items-center">
                <Image
                    src={logo.src}
                    alt="Logo"
                    className=""
                    height={113}
                    width={356}
                />
            </Link>

            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/launchpad" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Launchpad
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <Link href="/deploy" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Token Deploy Proposal
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Learn more</NavigationMenuTrigger>
                        <NavigationMenuContent className="ml-auto">
                            <ul className="flex flex-col w-[200px] gap-3 p-4 md:w-[300px] lg:w-[300px]">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex flex-col">
                <ConnectKitButton />
                {address && adminAddresses.includes(address) && (
                    <Link href="/admin">Admin</Link>
                )}
            </div>
        </header>
    );
};

export default Header;

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Certified Deployer Attestation",
        href: "/attestation",
        description: "Certify your deployer status",
    },
    {
        title: "Community",
        href: "/community",
        description: "Join the community",
    },
    {
        title: "Documentation",
        href: "/docs",
        description: "Read the docs",
    },
]

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

