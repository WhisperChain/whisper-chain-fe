import { useBottomTab } from "../../context/BottomTabContext";
import BottomTabSelector from "../BottomTabSelector";
import BottomInfo from "../BottomTabSelector/BottomInfo";
import Header from "../Header";
import styles from "./Main.module.css";

export default function Main() {
  const { currentTab } = useBottomTab();
  const { Component } = currentTab;
  return (
    <div className={styles.Page} id="home-section">
      <Header />
      <Component />
      <BottomTabSelector />
      <BottomInfo/>
    </div>
  );
}
