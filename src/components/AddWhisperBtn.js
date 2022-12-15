import React from "react";
import styled from "styled-components";
import { useBottomTab } from "../context/BottomTabContext";
import { usePublicationContext } from "../context/PublicationContext";
import { TabItems } from "./Main/TabItems";

const ButtonBg = styled.div`
  width: 200px;
  height: 48px;
  background: radial-gradient(
    107.14% 107.14% at 50% 80.95%,
    #6f1aff 0%,
    #c6a4ff 100%
  );
  box-shadow: 0px 8px 32px rgba(111, 26, 255, 0.32),
    inset 0px -4px 8px rgba(185, 143, 255, 0.6), inset 0px -8px 16px #4700c0;
  border-radius: 40px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  cursor: pointer;
`;

const ButtonText = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.03em;
  color: #ffffff;
`;

const AddWhisperBtn = ({ pageIndex, publication }) => {
  const { setPublication } = usePublicationContext();
  pageIndex = 1;
  const { onTabChange } = useBottomTab();
  return (
    <ButtonBg
      onClick={() => {
        setPublication(publication);
        onTabChange(TabItems[pageIndex]);
      }}
    >
      <ButtonText> Add whisper to chain </ButtonText>
    </ButtonBg>
  );
};

export default AddWhisperBtn;
