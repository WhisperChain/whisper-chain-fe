import Chain from "../../Tabs/Chain";
import BottomTabSelector from "../BottomTabSelector";
import BottomInfo from "../BottomTabSelector/BottomInfo";
import Header from "../Header";
import styles from "./ChainPage.module.css";

export default function ChainPage() {
  return (
    <div className={styles.Page}>
      <Header />
      <Chain />
      <BottomTabSelector />
      <BottomInfo/>
    </div>
  );
}
