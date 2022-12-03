import { useBottomTab } from "../../context/BottomTabContext";
import BottomTabSelector from "../BottomTabSelector";
import Header from "../Header";

export default function Main() {
  const { currentTab } = useBottomTab();
  console.log({ currentTab });
  const { Component } = currentTab;
  return (
    <div>
      <Header />
      <Component />
      <BottomTabSelector />
    </div>
  );
}
