"use client";
import React, { useState } from "react";
import DegradeButton from "../DegradeButton/DegradeButton";
import { connect, disconnect } from "get-starknet";

interface ConnectWalletProps {
  children: React.ReactNode;
  onClick: () => void;
}


const ConnectWallet: React.FC<ConnectWalletProps> = ({ children }: ConnectWalletProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');

  const disconnectWallet = async () => {
    try {
      await disconnect({ clearLastWallet: true });
      setAddress('');
      setIsConnected(false);
    } catch (error: any) {
      alert(error.message);
    }
  };
  
  const connectWallet = async () => {
    try {
      const starknet = await connect();
      if (!starknet) throw new Error("Failed to connect to wallet.");
      await starknet.enable({ starknetVersion: "v5" });
      setAddress(starknet.selectedAddress || '');
      setIsConnected(true);
    } catch (error: any) {
      alert(error.message);
    }
  };
  

  return (
    <div>
      {isConnected ? (
        <div>
          <DegradeButton onClick={disconnectWallet}>
            {address && `${address.slice(0, 6)}...${address.slice(-2)}`}
          </DegradeButton>
        </div>
      ) : (
        <DegradeButton onClick={connectWallet}>
          CONNECT WALLET
        </DegradeButton>
      )}
    </div>
  );
};

export default ConnectWallet;
