import React from "react";
import Logo from "../../assets/Logo";
import CustomConnectButton from "../ConnectButton";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.HeadComponent}>
      <Logo />
      <CustomConnectButton />
    </div>
  );
};

export default Header;
