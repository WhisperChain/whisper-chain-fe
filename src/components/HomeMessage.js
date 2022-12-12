import React from "react";
import styled from "styled-components";
import AddWhisperBtn from "./AddWhisperBtn";

const MessageBox = styled.div`
  width: 512px;
  height: 512px;
  background: radial-gradient(
    51.4% 51.4% at 48.6% 50%,
    #16082d 0%,
    #100324 100%
  );
  border: 4px solid rgba(111, 26, 255, 0.24);
  backdrop-filter: blur(48px);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 48px;
  box-sizing: border-box;
`;

const Message = styled.div`
  width: 409px;
  display: flex;
  flex-direction: column;
  margin-top: 86px;
`;

const WhiteText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #e7d9ff;
`;

const Bold = styled.span`
  font-weight: bold;
`;

const HomeMessage = ({ publication, currentSlideIndex }) => {
  return (
    <MessageBox>
      <Message>
        <WhiteText>Hey there 👋,</WhiteText>
        <WhiteText>
          Welcome to <Bold>Whisper Chain.</Bold> This is our take on chinese
          whisper. You're on the homepage where you will see daily chains that
          are started by us
        </WhiteText>
        <br />
        <WhiteText>
          Try to recreate the last whisper you see as best as you can and add it
          to the chain.
        </WhiteText>
        <br />
        <WhiteText>Go ahead, give it a try?</WhiteText>
        <br />
        <WhiteText>Current Slide Index - {currentSlideIndex}</WhiteText>
      </Message>
      <AddWhisperBtn pageIndex={1} publication={publication} />
    </MessageBox>
  );
};

export default HomeMessage;
