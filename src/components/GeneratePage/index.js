import Generate from "../../Tabs/GenerateImage/Generate";
import BottomTabSelector from "../BottomTabSelector";
import Header from "../Header";
import styles from "./GeneratePage.module.css";

export default function GeneratePage({ chainId }) {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.componentWrapper}>
        <Generate chainId={chainId} />
      </div>
      <BottomTabSelector />
    </div>
  );
}
