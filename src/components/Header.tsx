import React from "react";
import styled from "styled-components";
import Logo from "../assets/Logo";
import WalletBtn from "../assets/WalletBtn";

const HeadComponent = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #0d041d;
  z-index: 1000000;
`;

const Header = () => {
  return (
    <HeadComponent>
      <Logo />
      <WalletBtn />
    </HeadComponent>
  );
};

export default Header;
