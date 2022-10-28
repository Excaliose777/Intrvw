import Head from "next/head";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers, providers } from "ethers";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();
  const [ens, setENS] = useState("");
  const [address, setAddress] = useState("");

  const setENSOrAddress = async (address, web3Provider) => {
    var _ens = await web3Provider.lookupAddress(address);
    if (_ens) {
      setENS(_ens);
    } else {
      setAddress(address);
    }
  };

  const getProviderOrSigner = async () => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }
    const signer = web3Provider.getSigner();
    const address = await signer.getAddress();
    await setENSOrAddress(address, web3Provider);
    return signer;
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner(true);
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  const renderButton = () => {
    if (walletConnected) {
      <div>Wallet connected</div>;
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "71f2f5d55f4447498c2cd84f8934c165"
      }
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions,
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <div>
      <Head>
        <title>ENS Dapp</title>
        <meta name="description" content="Interview Test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>
            Welcome Back {ens ? ens : address}!
            <a href="https://app.ens.domains/"><h5>Register for an ENS domain name</h5></a>
          </h1>
          <div className={styles.description}>
            Interview Practical Question
          </div>
          {renderButton()}
        </div>

        <h4>
          <a href="https://mumbai.polygonscan.com/address/0x4B5c8EaEf9a13C0fBC23ea4Ac88BD0d9861c8461">Token Etherscan Address (TSTK Token)</a>
        </h4>
        <img src="token.png"></img>
      </div>
    </div>
  );
}
