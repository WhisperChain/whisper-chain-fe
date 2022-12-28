import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import WalletBtn from "../../assets/WalletBtn";
import { resetLocalStorage } from "../../utils/Utils";
import SignAuthentication from "./SignAuthentication";
import LensIcon from "../../assets/LensIcon";

const CustomConnectButton = ({ onSignInComplete, setOpenDispatcherModal, notify }) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <div
                    onClick={() => {
                      resetLocalStorage();
                      openConnectModal();
                    }}
                  >
                    <div
                      className={`flex justify-center box-border items-center w-[234px] h-[40px] bg-[#ABFE2C] text-[#00501E] backdrop-blur rounded-[4px] gap-[8px] cursor-pointer border-[1px] border-solid border-black/20`}
                    >
                      <LensIcon />
                      Sign in with Lens
                    </div>
                  </div>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <SignAuthentication
                  onSignInComplete={onSignInComplete}
                  setOpenDispatcherModal={setOpenDispatcherModal}
                  notify={notify}
                />
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
