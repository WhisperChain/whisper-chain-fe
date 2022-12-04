import React from "react";
import styled from "styled-components";
import Cross from "../assets/Cross";

const Container = styled.div<{ backgroundColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: "white";
`;

const Icon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 12px;
`;

const Message = styled.div<{ color?: string }>`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 16px;
  line-height: 160%;
  color: "#b2bcc6";
`;

const CrossButton = styled.div`
  width: 24px;
  height: 26px;
  margin-left: 12px;
  border-left: 2px solid "#b2bcc6";
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-end;
  color: "#b2bcc6";
`;

const ToastMessage: React.FC<{
  message: string;
  icon?: JSX.Element;
  color?: string;
  backgroundColor?: string;
  showCloseBtn?: boolean;
}> = ({ message, icon, color, backgroundColor, showCloseBtn = false }) => {
  return (
    <Container backgroundColor={backgroundColor}>
      {icon && <Icon>{icon}</Icon>}
      <Message color={color}>{message}</Message>
      {showCloseBtn && (
        <CrossButton>
          <Cross type={"small"} stroke="#b2bcc6" />
        </CrossButton>
      )}
    </Container>
  );
};

export default ToastMessage;
