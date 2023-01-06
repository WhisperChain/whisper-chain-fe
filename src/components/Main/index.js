import Home from "../../Tabs/Home";
import BottomTabSelector from "../BottomTabSelector";
import Header from "../Header";
import styles from "./Main.module.css";

export default function Main() {
  return (
    <div className={styles.pageWrapper} id="home-section">
      <Header />
      <div className={styles.componentWrapper}>
        <Home />
      </div>
      <BottomTabSelector />
    </div>
  );
}
