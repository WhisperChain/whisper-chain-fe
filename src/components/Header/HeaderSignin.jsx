import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import { getProfileImage, resetLocalStorage } from "../../utils/Utils";
import Modal from "react-modal";
import SignOutLogo from "../../assets/SignOutLogo";
import Router from "next/router";
import CreateAccount from "../SignInModal/CreateAccount";

const HeaderSignin = ({ handleOpen }) => {

  const [open, setOpen] = React.useState(false);
  const handleModalClose = () => {
    setOpen(false);
  };
  const handleModalOpen = () => {
    setOpen(true);
  };
  const customStyles = {
    content: {
      display: "flex",
      background: "#FFFFFF",
      height: "54px",
      width: "240px",
      marginLeft: "auto",
      marginBottom: "auto",
      backdropFilter: "blur(60px)",
      borderRadius: "8px",
      padding: "0px",
      top: "88px",
      border: "1px solid rgba(0, 0, 0, 0.2)",
      boxShadow: "0px 8px 8px -8px rgba(0, 0, 0, 0.2), 0px 16px 24px rgba(0, 0, 0, 0.16)",
      cursor: "pointer",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.4)",
    },
  };

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
                <div className="flex justify-center items-center gap-[8px] z-[111] cursor-pointer">
                  <div className={` box-border flex justify-center items-center  py-[4px] px-[16px] w-auto h-[36px] bg-[#FFFFFF] rounded-[40px] not-italic font-bold text-[#6F1AFF] ${styles.HeaderSignInbtn}`} onClick={handleModalOpen}>
                    {JSON.parse(window.localStorage.getItem("profile"))?.handle}
                  </div>
                  <Image
                    src={getProfileImage() ?? "https://cdn.stamp.fyi/avatar/eth:0x3a72452af2ddc056330bbcb43898134c9adb51cf?s=250"}
                    alt="profile"
                    className="rounded-[18px]"
                    width={36}
                    height={36}
                    onClick={handleModalOpen}
                  />
                  <Modal onRequestClose={handleModalClose} isOpen={open} style={customStyles} ariaHideApp={false}>
                    <div className="flex flex-row items-center py-[15px] pl-[20px] color-red" onClick={
                      () => {
                        Router.reload();
                        handleModalClose();
                        resetLocalStorage();
                      }
                    }
                    >
                      <SignOutLogo />
                      <div className={`pl-[10px] ${styles.LogOutText}`}>Logout</div>
                    </div>
                  </Modal>
                </div>
              ) :
                    <CreateAccount
                      onRequestClose={handleModalClose}
                      isOpen={open} 
                    />
                // <button onClick={handleOpen} className={` w-[92px] h-[36px] bg-[#FFFFFF] rounded-[40px] not-italic font-bold text-[#6F1AFF] ${styles.HeaderSignInbtn}`}>
                //   Sign In
                // </button>
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default HeaderSignin;
