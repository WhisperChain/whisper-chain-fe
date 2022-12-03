import React from "react";
import styled from "styled-components";
import { PostImage } from "./PostImage";

const StackedImages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  height: 572px;
`;

const Image2 = styled.img`
  position: absolute;
  bottom: 32px;
  width: 452px;

  display: flex;
  border-radius: 48px;
  z-index: 2;
`;

const Image3 = styled.img`
  position: absolute;
  width: 404px;
  bottom: 0px;
  display: flex;
  border-radius: 48px;
  z-index: 1;
`;

const ImagesStack = () => {
  return (
    <StackedImages>
      <PostImage imgSrc="https://static.plgworks.com/assets/images/hon/vespa.jpg"></PostImage>
      <Image2 src="https://i.picsum.photos/id/193/512/512.jpg?hmac=ay70CF2_XM0GJBcUQzMN6UNHDn0-kgSIu8KcENreNgM"></Image2>
      <Image3 src="https://i.picsum.photos/id/524/512/512.jpg?hmac=2VlA0x6Y7osphrvDzR52TVkYjcc493rqcizd8HEXphY"></Image3>
    </StackedImages>
  );
};

export default ImagesStack;
