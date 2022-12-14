import { useBottomTab } from "../../context/BottomTabContext";
import BottomTabSelector from "../BottomTabSelector";
import Header from "../Header";
import styles from "./Main.module.css";

export default function Main() {
  const { currentTab } = useBottomTab();
  const { Component } = currentTab;
  return (
    <div className={styles.Page}>
      <Header />
      <Component />
      <BottomTabSelector />
    </div>
  );
}
