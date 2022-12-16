import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import { getProfileImage } from "../../utils/Utils";


const HearderSignin = ({handleOpen}) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
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
          // console.log("connected" + connected);
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
                   <button onClick={handleOpen} className={` w-[92px] h-[36px] bg-[#FFFFFF] rounded-[40px] not-italic font-bold text-[#6F1AFF] ${styles.HeaderSignInbtn}`}>
                      Sign In
                  </button>
                );
              }
          
              return window?.localStorage.getItem("profileId") ? (
                    <Image
                      src={getProfileImage() ?? "https://cdn.stamp.fyi/avatar/eth:0x3a72452af2ddc056330bbcb43898134c9adb51cf?s=250"}
                      alt="profile"
                      className="rounded-[18px]"
                      width={36}
                      height={36}
                    />
                  ) : 
                null
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default HearderSignin;
