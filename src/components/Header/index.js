import React from "react";
import Logo from "../../assets/Logo";
import CustomConnectButton from "../ConnectButton";
import styles from "./Header.module.css";
import Modal from "react-modal";
import CheckedCircle from "../../assets/CheckedCircle";
import HearderSignin from "./HeaderSignin";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const customStyles = {
    content: {
      background: "#FFFFFF",
      height: "fit-content",
      width: 314,
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
    <div
      className={
        "px-[50px] flex-row flex justify-between relative top-[15px] items-center  w-full"
      }
      id="Header"
    >
      <Logo />
      <div className="flex ml-auto gap-[16px]">
        {/* <button className={` w-[92px] h-[36px] bg-[#FFFFFF] rounded-[40px] ${styles.DropdownBtn}`}>
            Twitter
        </button> */}
        <HearderSignin handleOpen={handleOpen} />
      </div>

      <Modal onRequestClose={handleClose} isOpen={open} style={customStyles}>
        <div
          className={`flex flex-col justify-start items-start bg-[#FFFFFF] rounded-[16px] backdrop-blur-3xl gap-[16px] p-[40px] ${styles.ModalContainer}`}
        >
          <CustomConnectButton onSignInComplete={handleClose} />
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
    </div>
  );
};

export default Header;
