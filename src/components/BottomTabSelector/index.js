import { useRouter } from "next/router";
import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems } from "../Main/TabItems";
import styles from "./BottomTabSelector.module.css";

export default function BottomTabSelector() {
  const { currentTab, onTabChange } = useBottomTab();
  const router = useRouter();
  return (
    <div className={styles.container}>
      {TabItems.map((tab, index) => {
        const isSelected = tab.id === currentTab.id;
        return (
          <div
            key={index}
            onClick={() => {
              if (router.route !== "/") {
                router.push("/");
              }
              onTabChange(tab);
            }}
            id={tab.id}
            className={`${styles.tabContainer} ${
              isSelected ? styles.selectedTab : {}
            }`}
          >
            {tab.Image()}
            <div>{tab.tabName}</div>
          </div>
        );
      })}
    </div>
  );
}
