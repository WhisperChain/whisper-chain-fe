import React from "react";
import styled from "styled-components";

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
`;

const Image = styled.img`
  width: 512px;
  height: 512px;
  display: flex;
  border-radius: 48px;
`;

const PostImage = () => {
  return (
    <Image src="https://static.plgworks.com/assets/images/hon/vespa.jpg"></Image>
  );
};

export default PostImage;
