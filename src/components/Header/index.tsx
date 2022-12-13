import React from "react";
import Logo from "../../assets/Logo";
import CustomConnectButton from "../ConnectButton";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={`px-[50px] ${styles.HeadComponent}`} id="Header">
      <Logo />
      <div className="flex ml-auto gap-[16px]">
        <button className={` w-[92px] h-[36px] bg-[#FFFFFF] rounded-[40px] ${styles.DropdownBtn}`}>
            Twitter
        </button>
        <button className={` w-[92px] h-[36px] bg-[#FFFFFF] rounded-[40px] ${styles.SignInbtn}`}>
            Sign In
        </button>
        <CustomConnectButton />
      </div>
    </div>
  );
};

export default Header;
