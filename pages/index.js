import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { useRef } from "react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import Main from "../src/components/Main";
import { AuthProvider } from "../src/context/AuthContext";
import { BottomTabProvider } from "../src/context/BottomTabContext";
import { PubProvider } from "../src/context/PublicationContext";
import { publicProvider } from "wagmi/providers/public";

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
