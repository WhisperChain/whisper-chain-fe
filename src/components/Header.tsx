import React from "react";
import styled from "styled-components";
import Logo from "../assets/Logo";
import WalletBtn from "../assets/WalletBtn";

const HeadComponent = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
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
