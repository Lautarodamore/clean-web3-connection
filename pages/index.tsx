import type { NextPage } from 'next';
import styled from 'styled-components';
import { useState } from 'react';
import Web3Modal from "web3modal"
import { ethers } from 'ethers';

const Home: NextPage = () => {
    const [status, setStatus] = useState('Disconnected');
    const [wallet, setWallet] = useState('Unknown');
    const [network, setNetwork] = useState('Unknown');
    const [balance, setBalance] = useState('Unknown');

    async function connect() {
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const network = await provider.getNetwork();
        const balance = await signer.getBalance();
        setStatus('Connected');
        setWallet(address);
        setNetwork(network.name);
        setBalance(ethers.utils.formatUnits(balance, 'ether').substring(0, 5));
    }

    return (
        <ContentContainer>
            <Button onClick={() => connect()}>Connect</Button>
            <p><span>Status:</span> {status}</p>
            <p><span>Wallet Address:</span> {wallet}</p>
            <p><span>Network:</span> {network}</p>
            <p><span>Balance:</span> {balance}</p>
        </ContentContainer>
    )
}

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
  
  p {
    color: white;
    font-size: 18px;
    margin: 5px;
    
    span {
      color: darkorange;
    }
  }
`

const Button = styled.button`
  display: block;
  padding: 15px 50px;
  background-color: #20232a;
  border-radius: 5px;
  border: 1px solid white;
  color: white;
  font-size: 18px;
  cursor: pointer;
  letter-spacing: 2px;
  
  &:hover {
    opacity: 0.5;
  }
`;

export default Home
