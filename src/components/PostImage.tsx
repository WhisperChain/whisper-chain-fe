import React from "react";
import styled from "styled-components";

const Image = styled.img`
  position: relative;
  width: 512px;
  height: 512px;
  display: flex;
  border-radius: 48px;
  z-index: 3;
`;

interface Props {
  imgSrc: string;
}

export const PostImage: React.FC<Props> = ({ imgSrc }) => {
  return <Image src={imgSrc}></Image>;
};
