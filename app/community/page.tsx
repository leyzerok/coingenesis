'use client';

import Image from 'next/image';
import argentinaeth from '/public/argentinaeth.svg';
import x from '/public/x.svg';
import scroll from '/public/scroll.svg';
import question from '/public/question.svg';
import banana from '/public/banana.svg';
import frame from '/public/frame.svg';
import frame_banana from '/public/frame_banana.svg';

const Community: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#dcdee4] p-4">
            <h1 className="text-4xl font-bold mb-16 mt-8">Community</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-0 max-w-5xl">
                <div className="text-center lg:text-left order-2 lg:order-1">
                    <h1 className="text-2xl font-bold mb-4">Certified Deployer Attestation</h1>
                    <p className="text-lg mb-8">
                        Certified Deployer Attestation is an exclusive badge awarded to individuals or corporates who have successfully launched more than three tokens on the CoinGenesis Launchpad Platform. This certification signifies trust, experience, and reliability in the token deployment process, making these deployers more attractive to investors and partners. The certification not only recognizes their proven track record but also enhances their credibility within the community.
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
