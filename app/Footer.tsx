'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import logo from "/public/logo.svg";

const Footer: React.FC = () => {
    const router = useRouter();

    return (
        <footer className="bg-gray-100 py-4 px-8 text-sm">
            <div className="container mx-auto flex flex-wrap justify-between items-center text-black">
                <div className="w-full lg:w-1/3 mb-4 lg:mb-0 text-left items-start">
                    <Image
                        src={logo.src}
                        alt="Logo"
                        className=""
                        height={20}
                        width={150}
                    />
                    <p>© 2024 Starecore, Inc. All Rights Reserved.</p>
                </div>
                <div className="w-full lg:w-3/5 flex justify-between space-x-4">
                    <div className="flex flex-col items-start">
                        <h2 className="font-bold text-lg mb-1">Socials</h2>
                        <ul>
                            <li><a href="https://twitter.com" target="_blank" className="hover:underline">X / Twitter</a></li>
                            <li><a href="https://github.com" target="_blank" className="hover:underline">Github</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start">
                        <h2 className="font-bold text-lg mb-1">Company</h2>
                        <ul>
                            <li><a href="/community" className="hover:underline">Community</a></li>
                            <li><a href="/docs" className="hover:underline">Docs</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-start">
                        <h2 className="font-bold text-lg mb-1">Legal</h2>
                        <ul>
                            <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="/terms-of-use" className="hover:underline">Terms of Use</a></li>
                        </ul>
                    </div>
                    <div className="flex flex-col items-center mb-16 lg:mb-0">
                        <h2 className="font-bold text-lg mb-2">Powered by</h2>
                        <div className="flex gap-4">
                            <img src="/scroll.svg" alt="Scroll" className="h-16 w-16" />
                            <img src="/chainlink.svg" alt="Chainlink" className="h-16 w-16" />
                            <img src="/gitcoin.svg" alt="Gitcoin" className="h-16 w-16" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
