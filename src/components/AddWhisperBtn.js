import React from "react";
import { useBottomTab } from "../context/BottomTabContext";
import { usePublicationContext } from "../context/PublicationContext";
import { TabItems } from "./Main/TabItems";
import styles from "./AddWhisperBtn.module.css";


const AddWhisperBtn = ({ pageIndex, publication }) => {
  const { setPublication } = usePublicationContext();
  pageIndex = 2;
  const { onTabChange } = useBottomTab();
  return (
    <div className={`w-[200px] h-[48px] rounded-[40px] mt-[50px] flex items-center justify-center z-10 cursor-pointer ${styles.Buttonbg}`}
      onClick={() => {
        setPublication(publication);
        onTabChange(TabItems[pageIndex]);
      }}
    >
      <div className="not-italic -tracking-[0.03em] font-extrabold text-[16px] leading-[100%] text-center text-[#FFFFFF]"> Add whisper to chain </div>
    </div>
  );
};

export default AddWhisperBtn;
