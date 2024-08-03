'use client';

import Image from 'next/image';
import frame from '/public/frame.svg';
import frame_banana from '/public/frame_banana.svg';

const Community: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#dcdee4] p-4">
            <h1 className="text-4xl font-bold mb-16 mt-8">Community</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-0 max-w-5xl">
                <div className="text-center lg:text-left order-2 lg:order-1">
                    <h1 className="text-2xl font-bold mb-4">The Level Up Hackathon by Ethereum Argentina & Scroll</h1>
                    <p className="text-lg mb-8">
                        The Level Up Hackathon by Ethereum Argentina is a community-driven event designed to foster the next generation of projects within the Scroll ecosystem. This hackathon aims to bring together enthusiasts and developers. It includes a bootcamp led by the Scroll Team and offers participants opportunities to build and pitch their projects. The event is co-hosted by notable entities such as Buidlers Tech, Scroll, PSE, Chainlink Labs, Aztec, and API3.
                    </p>
                </div>
                <div className="flex justify-center lg:justify-end order-1 lg:order-2">
                    <div className="flex space-x-2">
                        <Image src={frame} alt="Ethereum Argentina" height={500} width={500} />                   
                    </div>
                </div>

                <div className="flex flex-col items-center lg:items-start order-3 lg:order-3 space-y-2">
                    <Image src={frame_banana} alt="Banana" height={500} width={500} />                    
                </div>
                <div className="text-center lg:text-left order-4 lg:order-4 ml-4">
                    <h1 className="text-2xl font-bold mb-4">$BANANA is Coming Soon to CoinGenesis Launchpad</h1>
                    <p className="text-lg mb-8">
                        Get ready for a fruity revolution! $BANANA, the most anticipated memecoin of the season, is set to launch on CoinGenesis Launchpad.  This vibrant and fun-filled token aims to bring a fresh twist on Scroll Mainnet. $BANANA promises to deliver unique features and community-driven innovations. Stay tuned for more updates and prepare to peel away the layers of this exciting new project!
                    </p>
                </div>
            </div>
            <button className="bg-transparent border border-black text-black py-4 px-8 text-lg rounded-full hover:bg-black hover:text-white transition mt-8 mb-8">
                Stay Tuned for Updates
            </button>
        </div>
    );
};

export default Community;
