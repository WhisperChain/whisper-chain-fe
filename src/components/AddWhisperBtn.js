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
    #ffe431 0%,
    #ffe11a 100%
  );
  box-shadow: 0px 8px 32px rgba(254, 233, 45, 0.32),
    inset 0px -4px 8px rgba(119, 103, 0, 0.6), inset 0px -8px 16px #ffbe16;
  border-radius: 40px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 100%;

  text-align: center;
  letter-spacing: -0.03em;

  color: #111111;
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
