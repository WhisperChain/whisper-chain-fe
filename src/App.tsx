import logo from "./logo.svg";
import "./App.css";
import Routing from "./routes";
import React, { useRef } from "react";
import "./App.css";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { getPublication } from "./utils/lensFunction";
import { AuthProvider } from "./context/AuthContext";
import { BottomTabProvider } from "./context/BottomTabContext";
import Main from "./components/Main";
import {
  commentViaDispatcher,
  getLastCommentsOfPosts,
} from "./utils/lensFunction";
import Login from "./components/Login";
import "@rainbow-me/rainbowkit/styles.css";
import { getS3UrlfromText } from "./utils/Utils";
import { PubProvider } from "./context/PublicationContext";

function App() {
  const { chains, provider } = useRef(
    configureChains(
      [
        chain.mainnet,
        chain.polygon,
        chain.optimism,
        chain.arbitrum,
        chain.polygon,
        chain.polygonMumbai,
        chain.goerli,
      ],
      [
        // alchemyProvider({ apiKey: 'CHu5o-Y1e5EoW_49i3DY_uw4WZnEpp4B' }),
        publicProvider(),
      ]
    )
  ).current;

  const { connectors } = useRef(
    getDefaultWallets({
      appName: "Whisper.Lens",
      chains,
    })
  ).current;

  const wagmiClient = useRef(
    createClient({
      autoConnect: true,
      connectors,
      provider,
    })
  ).current;

  const createComment = async () => {
    const ipfsUrl = await getS3UrlfromText("india");
    commentViaDispatcher(
      window.localStorage.getItem("profileId"),
      "0x5285-0x1a",
      ipfsUrl,
      true
    );
  };

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <AuthProvider>
          <BottomTabProvider>
            <PubProvider>
              <Main />
            </PubProvider>
          </BottomTabProvider>
        </AuthProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
