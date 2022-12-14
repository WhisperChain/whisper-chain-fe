import React from "react";
import Logo from "../../assets/Logo";
import CustomConnectButton from "../ConnectButton";
import styles from "./Header.module.css";
import Modal from "react-modal";

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
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.6)",
    },
  };

  return (
    <div
      className={
        "px-[50px] flex-row flex justify-between items-center sticky z-[1000000] h-[88px] w-full top-0"
      }
      id="Header"
    >
      <Logo />
      <div className="flex ml-auto gap-[16px]">
        <button
          className={` w-[92px] h-[36px] bg-[#FFFFFF] rounded-[40px] ${styles.DropdownBtn}`}
        >
          Twitter
        </button>
        <button
          onClick={handleOpen}
          className={` w-[92px] h-[36px] bg-[#FFFFFF] rounded-[40px] ${styles.SignInbtn}`}
        >
          Sign In
        </button>
        <CustomConnectButton />
      </div>
      <Modal onRequestClose={handleClose} isOpen={open} style={customStyles}>
        <div
          className={`flex flex-col justify-center items-center bg-[#FFFFFF] rounded-[16px] backdrop-blur-3xl gap-[16px] p-[19px] ${styles.ModalContainer}`}
        >
          <div className="flex ">Sign In</div>
          <button
            className={`flex justify-center box-border items-center w-[234px] h-[40px] backdrop-blur rounded-[4px] ${styles.TwitterContainer}`}
          >
            Sign in with Twitter
          </button>
          <button
            className={`flex justify-center box-border items-center w-[234px] h-[40px] backdrop-blur rounded-[4px] ${styles.LensContainer}`}
          >
            Sign in with Lens
          </button>
          <button
            className={`flex justify-center box-border items-center w-[234px] h-[40px] backdrop-blur rounded-[4px] ${styles.FarcasterContainer}`}
          >
            Sign in with farcaster
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Header;
