"use client";
import React, { useState } from "react";
import DegradeButton from "../DegradeButton/DegradeButton";
import { connect, disconnect } from "get-starknet";

const ButtonToggle = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');

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

  const disconnectWallet = async () => {
    try {
      await disconnect({ clearLastWallet: true });
      setAddress('');
      setIsConnected(false);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      {isConnected ? (
        <DegradeButton onClick={disconnectWallet}>
          {address && `${address.slice(0, 6)}...${address.slice(-4)}`}
        </DegradeButton>
      ) : (
        <DegradeButton onClick={connectWallet}>
          CONNECT WALLET
        </DegradeButton>
      )}
    </div>
  );
};

export default ButtonToggle;
