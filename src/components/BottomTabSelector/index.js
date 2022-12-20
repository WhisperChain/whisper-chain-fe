import InfoLogo from "../../assets/InfoLogo";
import { useRouter } from "next/router";
import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems } from "../Main/TabItems";
import styles from "./BottomTabSelector.module.css";

export default function BottomTabSelector() {
  const { currentTab, onTabChange } = useBottomTab();
  const handlePLGClick = () => {
    const plgURL = "https://plgworks.com/";
    window.open(plgURL, "_blank");
  };
  const handleNotionClick = () => {
    const plgURL = "https://plgworks.notion.site/Whisper-Chain-fc95cbdc8f9a4a41b87747a190477a61";
    window.open(plgURL, "_blank");
  };
  const router = useRouter();
  return (
    <div  className={`flex w-full justify-between items-center ${styles.mainContainer}`}>
        <div onClick={handleNotionClick} className={`flex relative not-italic font-medium text-[16px] ${styles.infoTab}`}>
          <button className={`flex justify-center gap-[8.5px] items-center hover:text-[#000000]`}> <InfoLogo /> How it works</button>
        </div>

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

        <div className={`flex relative not-italic justify-end font-medium text-[16px] ${styles.infoTab}`}>
          <div className="hover:text-[#000000]">
            <button onClick={handlePLGClick}>Made with 🧡 by PLG</button>
          </div>
        </div>
    </div>
  );
}
