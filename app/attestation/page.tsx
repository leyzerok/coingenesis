"use client";

const Attestation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#dcdee4] p-4">
      <div className="text-center my-16 max-w-5xl">
        <h1 className="text-4xl font-bold mb-4">
          Certified Deployer Attestation
        </h1>
        <p className="text-lg mb-8">
          Certified Deployer Attestation is an exclusive badge awarded to
          individuals or corporates who have successfully launched more than
          three tokens on the CoinGenesis Launchpad Platform. This certification
          signifies trust, experience, and reliability in the token deployment
          process, making these deployers more attractive to investors and
          partners. The certification not only recognizes their proven track
          record but also enhances their credibility within the community.
        </p>
        <h1 className="text-4xl font-bold mb-4">Eligibility Criteria</h1>
        <ul className="list-disc text-left text-lg mb-8 ml-6 space-y-4">
          <li>
            Deployer must have successfully launched at least three tokens on
            the CoinGenesis Launchpad Platform, each deployment must be fully
            completed and meet all platform standards.
          </li>
          <li>
            All tokens deployed must adhere to CoinGenesis&apos;s guidelines and
            regulatory requirements, including KYC processes and any additional
            legal requirements.
          </li>
          <li>
            Deployer should maintain a positive track record with no significant
            complaints or issues reported against any of the deployed tokens.
          </li>
        </ul>
        <h1 className="text-4xl font-bold mb-4">Benefits of Certification</h1>
        <ul className="list-disc text-left text-lg mb-8 ml-6 space-y-4">
          <li>
            Badge acts as a mark of distinction, indicating that the deployer
            has a successful history of launching tokens, which can instill
            greater confidence among potential investors and partners.
          </li>
          <li>
            Certified Deployers receive priority support from the CoinGenesis
            Team, ensuring that any issues or queries are addressed promptly.
          </li>
          <li>
            Tokens launched by Certified Deployers may receive increased
            visibility on the CoinGenesis Platform, including featured listings
            and promotional opportunities.
          </li>
          <li>
            Access to exclusive networking events and opportunities within the
            CoinGenesis Community, allowing for collaboration with other
            successful deployers and key industry players.
          </li>
        </ul>
        <h1 className="text-4xl font-bold mb-4">Application Process</h1>
        <ul className="list-disc text-left text-lg mb-8 ml-6 space-y-4">
          <li>
            Deployer submits an application through the CoinGenesis Launchpad
            Platform, providing details of the tokens previously deployed,
            including links to the token listings and any relevant
            documentation.
          </li>
          <li>
            CoinGenesis Team verifies the deployment history and compliance with
            platform standards. This may include reviewing the KYC processes,
            token performance, and any feedback from investors.
          </li>
          <li>
            Once verified, the deployer is awarded the Certified Deployer
            Attestation badge, which is prominently displayed on their
            CoinGenesis Profile and associated with all future token
            deployments.
          </li>
        </ul>
        <button className="bg-transparent border border-black text-black py-4 px-8 text-lg rounded-full hover:bg-black hover:text-white transition">
          Become a Certified Deployer
        </button>
      </div>
    </div>
  );
};

export default Attestation;
