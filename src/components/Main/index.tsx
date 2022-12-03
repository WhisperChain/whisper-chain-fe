import { useBottomTab } from "../../context/BottomTabContext";
import BottomTabSelector from "../BottomTabSelector";
import Header from "../Header";
import styled from "styled-components";

const Page = styled.div`
  width: 80%;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
`;

export default function Main() {
  const { currentTab } = useBottomTab();
  console.log({ currentTab });
  const { Component } = currentTab;
  return (
    <Page>
      <Header />
      <Component />
      <BottomTabSelector />
    </Page>
  );
}
