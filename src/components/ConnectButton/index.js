import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import WalletBtn from "../../assets/WalletBtn";
import { resetLocalStorage } from "../../utils/Utils";
import SignAuthentication from "./SignAuthentication";
import LensIcon from "../../assets/LensIcon";

const CustomConnectButton = ({ onSignInComplete, setCreateProfileModal, btnText }) => {

  const connectref = React.useRef(false);
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
                if (btnText === "Create an account") {
                  return (
                    <span
                      className="underline text-[#00501E] cursor-pointer ml-[5px]"
                      onClick={() => {
                        resetLocalStorage();
                        openConnectModal();
                        connectref.current = true;
                      }}
                    >
                      Create an account
                    </span>
                  )
                }
                else {
                  return (
                    <div
                      onClick={() => {
                        resetLocalStorage();
                        openConnectModal();
                        connectref.current = true;
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
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return connectref.current && <SignAuthentication onSignInComplete={onSignInComplete} setCreateProfileModal={setCreateProfileModal} createAccount={btnText === "Create an account" ? true : false} />
            }
            )()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
