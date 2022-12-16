import InfoLogo from "../../assets/InfoLogo";
import { useRouter } from "next/router";
import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems } from "../Main/TabItems";
import styles from "./BottomTabSelector.module.css";

export default function BottomTabSelector() {
  const { currentTab, onTabChange } = useBottomTab();
  const handleClick = () => {
    const plgURL = "https://plgworks.com/?ref=WhisperChain";
    window.open(plgURL, "_blank");
  };
  const router = useRouter();
  return (
    <>
      <div
        className={`flex relative not-italic font-medium text-[16px] ${styles.infoTab}`}
      >
        <div className="flex w-full relative justify-start items-center gap-[8.5px] left-[32px]">
          <InfoLogo />
          <button className={`hover:text-[#000000]`}>How it works</button>
        </div>
        <div className="flex w-full relative justify-end right-[32px] gap-1">
          <div className="hover:text-[#000000]">
            Made with 🧡 by <button onClick={handleClick}>PLG</button>
          </div>
        </div>
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
    </>
  );
}
