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
                <div className="flex justify-center items-center gap-[8px]">  
                    <div className="box-border flex justify-center items-center py-[4px] px-[8px]  w-auto h-[30px] bg-[255,255,255/60] border-[1px] border-solid border-[0,0,0/5] rounded-[4px] backdrop-blur">
                      <div className={`not-italic text-[14px] leading-[160%] text-[#000000] text-center font-medium ${styles.HandlerName}`}>{JSON.parse(window.localStorage.getItem("profile"))?.handle}</div>
                    </div>
                    <Image
                      src={getProfileImage() ?? "https://cdn.stamp.fyi/avatar/eth:0x3a72452af2ddc056330bbcb43898134c9adb51cf?s=250"}
                      alt="profile"
                      className="rounded-[18px]"
                      width={36}
                      height={36}
                    />
                </div>
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
