import React from "react";
import { useBottomTab } from "../context/BottomTabContext";
import { usePublicationContext } from "../context/PublicationContext";
import { TabItems } from "./Main/TabItems";
import styles from "./AddWhisperBtn.module.css";

const ShareBtn = ({ pageIndex, publication, height, width, text }) => {
  const { setPublication } = usePublicationContext();
  pageIndex = 1;
  const { onTabChange } = useBottomTab();
  return (
    <a
      className={`w-[${width}px] h-[${height}px] rounded-[40px] flex items-center justify-center z-10 cursor-pointer ${styles.Buttonbg}`}
      onClick={() => {
        setPublication(publication);
        onTabChange(TabItems[pageIndex]);
      }}
    >
      <div className="not-italic -tracking-[0.03em] font-extrabold text-[16px] leading-[100%] text-center text-[#FFFFFF]">
        {text}
      </div>
    </a>
  );
};

export default ShareBtn;
