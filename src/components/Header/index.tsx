import React from "react";
import Logo from "../../assets/Logo";
import CustomConnectButton from "../ConnectButton";
import SignIn from "../ConnectButton/SignIn";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.HeadComponent}>
      <Logo />
      <SignIn/>
      <CustomConnectButton />
    </div>
  );
};

export default Header;
