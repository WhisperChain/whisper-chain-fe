import React from "react";
import styles from "./SignInModal.module.css";
import Modal from "react-modal";
import CustomConnectButton from "../ConnectButton";
import CheckedCircle from "../../assets/CheckedCircle";

const SignInModal = ({ onRequestClose, isOpen, onSignInComplete }) => {
  const customStyles = {
    content: {
      background: "#FFFFFF",
      height: "fit-content",
      width: 384,
      margin: "auto",
      backdropFilter: "blur(60px)",
      borderRadius: "16px",
      padding: "0px",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.6)",
    },
  };

  return (
    <Modal onRequestClose={onRequestClose} isOpen={isOpen} style={customStyles}>
      <div
        className={`flex flex-col justify-start items-start bg-[#FFFFFF] rounded-[16px] backdrop-blur-3xl gap-[16px] p-[40px] ${styles.ModalContainer}`}
      >
        <CustomConnectButton onSignInComplete={onSignInComplete} />
        <div
          className={`flex justify-start flex-col gap-[12px] not-italic text-[12px] font-medium ${styles.LensInfo}`}
        >
          <div className="flex gap-[8px] justify-start items-center">
            <CheckedCircle />
            Play with Lens frens
          </div>
          <div className="flex gap-[8px] justify-start items-center">
            <CheckedCircle />
            Post your whispers
          </div>
          <div className="flex gap-[8px] justify-start items-center">
            <CheckedCircle />
            Like and collect other whispers
          </div>
        </div>
        {/* <button className={`flex justify-center box-border items-center w-[234px] h-[40px] backdrop-blur rounded-[4px] ${styles.TwitterContainer}`}>Sign in with Twitter</button>
        <button className={`flex justify-center box-border items-center w-[234px] h-[40px] backdrop-blur rounded-[4px] ${styles.FarcasterContainer}`}>Sign in with farcaster</button> */}
      </div>
    </Modal>
  );
};

export default SignInModal;