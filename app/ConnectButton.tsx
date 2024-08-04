import { ConnectKitButton } from "connectkit";

export const ConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName}) => {
        return (
          <button
            onClick={show}            
            style={{
              fontSize: "18px", // Increase font size
              borderRadius: "16px",
              color: "#000000",
              backgroundColor: "#ffffff",
              boxShadow: "1px 1px 1px 1px #6262628a",
              padding: "5px 24px", // Increase padding
              transition: "all 200ms ease-in-out",
            }}
            
            className="hover:text-[#373737] hover:bg-[#F0F2F5] hover:shadow-none active:text-[#373737] active:bg-[#EAECF1] active:shadow-none mb-2"
          >
            {isConnected ? ensName ?? truncatedAddress : "Connect Wallet"}
          </button>          
        );
      }}
    </ConnectKitButton.Custom>
  );
};
