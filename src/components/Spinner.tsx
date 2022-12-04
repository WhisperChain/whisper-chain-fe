import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }
`;

const LoaderDiv = styled.div<{
  size: number;
  opacity: string;
  border: number;
  borderOpacity: number;
  color: string;
}>`
  border: ${({ border }) => border}px solid
    rgba(255, 255, 255, ${({ borderOpacity }) => borderOpacity});
  border-top: ${({ border }) => border}px solid
    ${({ opacity, theme, color }) => `${color}${opacity}`};
  transform: translateY(-50%);
  border-radius: 50%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  animation: ${spin} 1s linear infinite;
  box-sizing: border-box;
`;

interface SpinnerProps {
  size?: number;
  opacity?: string;
  color?: string;
  border?: number;
  borderOpacity?: number;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 80,
  opacity = "ff",
  border = 8,
  borderOpacity = 0,
  color = "#ffffff",
}) => {
  return (
    <LoaderDiv
      color={color}
      size={size}
      opacity={opacity}
      border={border}
      borderOpacity={borderOpacity}
    />
  );
};

export default Spinner;
