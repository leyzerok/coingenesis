"use client";

import Link from "next/link";

const TokenDeploy = () => {
    return (
        <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl text-center py-14 font-bold">
                Token Deploy Proposal
            </h2>
            <div className="flex justify-center items-stretch text-2xl space-x-20 w-full">
                {/* first frame */}
                <div className="flex flex-col justify-between text-2xl w-1/3 border border-black rounded-xl p-5">
                    <div className="flex flex-col h-full">
                        <div className="flex justify-center items-center text-2xl mb-4">
                            Individual Deploy Proposal
                        </div>
                        <h1 className="text-lg mb-2 ml-2">Required:</h1>
                        <ul className="list-disc text-left text-lg mb-8 ml-8 space-y-4">
                            <li>Name</li>
                            <li>Symbol</li>
                            <li>Description</li>
                            <li>Website</li>
                            <li>Social Media</li>
                            <li>Contact Details</li>
                        </ul>
                        <h1 className="text-lg mb-4 ml-8">Optional:</h1>
                        <ul className="list-disc text-left text-lg mb-8 ml-8 space-y-4">
                            <li>Whitepaper</li>
                            <li>Additional information</li>
                        </ul>
                        <h1 className="text-lg mb-4 ml-8">Essential:</h1>
                        <ul className="list-disc text-left text-lg mb-8 ml-8 space-y-4">
                            <li>KYC</li>
                            <div>or</div>
                            <li>Gitcoin passport score over 40</li>
                        </ul>
                    </div>
                    <div className="flex justify-center mt-8 mb-8">
                        <Link href="/ind_deploy">
                            <button className="bg-transparent border border-black text-black py-4 px-8 text-lg rounded-full hover:bg-black hover:text-white transition">
                                I am an individual
                            </button>
                        </Link>
                    </div>
                </div>

                {/* second frame */}
                <div className="flex flex-col justify-between text-2xl w-1/3 border border-black rounded-xl p-5">
                    <div className="flex flex-col h-full">
                        <div className="flex justify-center items-center text-2xl mb-8">
                            Corporate Deploy Proposal
                        </div>
                        <h1 className="text-lg mb-4 ml-8">Required:</h1>
                        <ul className="list-disc text-left text-lg mb-8 ml-8 space-y-4">
                            <li>Name</li>
                            <li>Symbol</li>
                            <li>Description</li>
                            <li>Website</li>
                            <li>Social Media</li>
                            <li>Contact Details</li>
                            <li>Whitepaper</li>
                            <li>Contact details</li>
                            <li>Team disclosure</li>
                        </ul>
                        <h1 className="text-lg mb-4 ml-8">Optional:</h1>
                        <ul className="list-disc text-left text-lg mb-8 ml-8 space-y-4">
                            <li>Roadmap</li>
                            <li>Additional information</li>
                        </ul>
                        <h1 className="text-lg mb-4 ml-8">Essential:</h1>
                        <ul className="list-disc text-left text-lg mb-8 ml-8 space-y-4">
                            <li>KYC</li>
                        </ul>
                    </div>
                    <div className="flex justify-center mt-8 mb-8">
                        <Link href="/corp_deploy">
                            <button className="bg-transparent border border-black text-black py-4 px-8 text-lg rounded-full hover:bg-black hover:text-white transition">
                                I am a Corporate Representative
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenDeploy;
