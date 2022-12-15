// eslint-disable-next-line
import "symbol-observable";

import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { useRef } from "react";
import {
  configureChains,
  createClient,
  goerli,
  mainnet,
  WagmiConfig,
} from "wagmi";
import { arbitrum, optimism, polygon, polygonMumbai } from "wagmi/chains";

import { AuthProvider } from "../src/context/AuthContext";
import { BottomTabProvider } from "../src/context/BottomTabContext";
import { PubProvider } from "../src/context/PublicationContext";
import { publicProvider } from "wagmi/providers/public";

// store imports
import { Provider } from "react-redux";
import { reduxWrapper } from "../store/store";

function MyApp({ Component, pageProps, ...rest }) {
  const { store } = reduxWrapper.useWrappedStore(rest);
  const { chains, provider } = useRef(
    configureChains(
      [mainnet, polygon, optimism, arbitrum, polygon, polygonMumbai, goerli],
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
    <Provider store={store}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <AuthProvider>
            <BottomTabProvider>
              <PubProvider>
                <Component {...pageProps} />
              </PubProvider>
            </BottomTabProvider>
          </AuthProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  );
}

export default MyApp;
