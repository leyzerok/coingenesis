"use client";

import React from "react";
import Image from "next/image";
import logo from "/public/logo.svg";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 py-2 text-sm">
            <div className="max-w-full container pt-2 pb-2">

                <div className="container mx-auto flex justify-between items-center text-black space-x-2">
                    <div>
                        <Link href="/">
                            <Image src={logo.src} className="" width={241} height={76} alt=""/>
                        </Link>
                        <p className="text-center text-black pl-6">© 2024 Starecore, Inc. All Rights reserved.</p>
                    </div>

                    <div className="pt-4">
                        <p className="font-bold text-lg pb-2">Socials</p>
                        <div className="flex items-center justify-center space-x-4">
                            <div className="text-left">
                                <p><Link href="https://twitter.com" target="_blank"
                                         className="text-left text-black hover:underline">X / Twitter</Link></p>
                                <p><Link href="https://github.com/leyzerok/coingenesis" target="_blank"
                                         className="text-left text-black hover:underline">Github</Link></p>
                            </div>
                            <div>
                                <p><Link href="https://medium.com/" target="_blank"
                                         className="text-left text-black hover:underline">Medium</Link></p>
                                <p><Link href="https://discord.gg" target="_blank"
                                         className="text-left text-black hover:underline">Discord</Link></p>
                            </div>
                        </div>
                    </div>

                    <div className="text-left pt-4">
                        <p className="font-bold text-lg pb-2">Company</p>
                        <div className="flex items-start justify-start space-x-4">
                            <div className="text-left">
                                <p><Link href="/community" className="text-left text-black hover:underline">Community</Link></p>
                                <p><Link href="/docs" className="text-left text-black hover:underline">Docs</Link></p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <p className="font-bold text-lg pb-2">Legal</p>
                        <div className="flex items-center justify-start space-x-4">
                            <div className="text-left">
                                <p className="text-left left-0 text-black hover:underline">Privacy Policy</p>
                                <p className="text-left text-black hover:underline">Terms of Use</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <h2 className="font-bold text-lg mb-2">Powered by</h2>
                        <div className="flex items-center">
                            <Link href="https://www.gitcoin.co/" target="_blank" className="mr-8">
                                <Image src="/scroll.svg"
                                       alt="" width={130}
                                       height={49}/>
                            </Link>
                            <Link href="https://www.gitcoin.co/" target="_blank" className="mr-6">
                                <Image src="/chainlink.svg"
                                       alt="" width={130}
                                       height={49}/>
                            </Link>
                            <Link href="https://www.gitcoin.co/" target="_blank">
                                <Image src="/gitcoin.svg"
                                       alt="" width={130}
                                       height={49}/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
