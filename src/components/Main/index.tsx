import { useBottomTab } from "../../context/BottomTabContext";
import BottomTabSelector from "../BottomTabSelector";
import Header from "../Header";
import styled from "styled-components";

const Page = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
`;

export default function Main() {
  const { currentTab } = useBottomTab();
  const { Component } = currentTab;
  return (
    <Page>
      <Header />
      <Component />
      <BottomTabSelector />
    </Page>
  );
}
