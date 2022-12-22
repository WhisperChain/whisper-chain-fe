import Chain from "../../Tabs/Chain";
import BottomTabSelector from "../BottomTabSelector";
import Header from "../Header";
import styles from "./ChainPage.module.css";

export default function ChainPage({ chainId }) {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.componentWrapper}>
        <Chain chainId={chainId} />
      </div>
      <BottomTabSelector />
    </div>
  );
}
