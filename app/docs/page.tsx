'use client';

import React from "react";

const Attestation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#dcdee4] p-4">
      <div className="my-16 max-w-6xl">
        <h1 className="text-4xl font-bold mb-16 text-center">
          Documentation (beta v. 1.0.0)
        </h1>
        <div className="pl-4">
          <h1 className="text-3xl font-bold mb-4 ml-8">
            Introduction to CoinGenesis
          </h1>
          <p className="list-disc text-left text-lg mb-8 ml-8 space-y-4">
            CoinGenesis is a Web3 Launchpad Platform built on the Scroll Layer-2 Blockchain.<br />
            <br />
            CoinGenesis stands out by offering unique features and a robust verification process for token deployment, ensuring a secure and efficient launch experience for developers and users alike.<br />
            <br />
            CoinGenesis combines several key components to create an all-in-one solution for launching and trading tokens.
          </p>
          <h1 className="text-3xl font-bold mb-4 ml-8 my-6">Key features</h1>
          <h1 className="text-2xl font-bold mb-4 ml-8">Token Deploy Proposal</h1>
          <ul className="list-disc text-left text-lg mb-8 ml-8 space-y-4">
            <p>
              The Token Deploy Proposal is a critical part of the CoinGenesis Launchpad. It ensures that all tokens listed on our platform meet high standards of quality and compliance.
            </p>
            <p>
              The TDP process involves submitting detailed information about the token, including its name, symbol, description, social media links, website, and contact details.
            </p>
            <p>
              For individual deployers, an essential requirement is either KYC or a Gitcoin Passport Score of at least 40. For corporate deployers, KYC is mandatory. Optional information such as a whitepaper for individuals and a roadmap for corporates can also be submitted to provide a comprehensive overview of the project.
            </p>
          </ul>
          <h1 className="text-3xl font-bold mb-4 ml-8">Certified Deployer Attestation</h1>
          <ul className="list-disc text-left text-lg mb-8 ml-8 space-y-4">
            <p>
              The Certified Deployer Attestation is an exclusive recognition given to developers who have demonstrated consistent success in launching tokens on the CoinGenesis platform. To qualify, a deployer must have launched at least three tokens, all of which must comply with CoinGenesis’s guidelines and regulatory requirements.
            </p>
            <p>
              Certified deployers benefit from increased visibility, priority support from the CoinGenesis Team, and access to exclusive networking events. This badge of distinction not only highlights their reliability and experience but also enhances their attractiveness to potential investors and partners.
            </p>
          </ul>
          <h1 className="text-3xl font-bold mb-4 ml-8">Pre-Market Trading</h1>
          <ul className="list-disc text-left text-lg mb-8 ml-8 space-y-4">
            <p>
              Pre-Market Trading feature allows tokens to be traded before their official market release. This unique offering provides early liquidity and access for investors, setting CoinGenesis apart from other launchpad platforms. It allows token deployers to gauge market interest and secure early investments, contributing to a more successful token launch.
            </p>
          </ul>
          <h1 className="text-4xl font-bold mb-4 ml-8">Mission and Vision</h1>
          <ul className="list-disc text-left text-lg mb-8 ml-8 space-y-4">
            <p>
              CoinGenesis is dedicated to providing a secure, efficient, and innovative platform for project launch. Robust verification process, Certified Deployer Attestation, and unique Pre-Market Trading features in ONE.
              <br />
              At CoinGenesis, our mission is to empower developers and entrepreneurs to launch their projects with confidence and success. We aim to create a trustworthy ecosystem that fosters innovation, transparency, and growth within the Web3 Community. Our vision is to become the leading launchpad platform, setting new standards for quality, security, and investor protection.
            </p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Attestation;
