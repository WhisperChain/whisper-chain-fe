import React from "react";
import { useBottomTab } from "../context/BottomTabContext";
import { usePublicationContext } from "../context/PublicationContext";
import { TabItems } from "./Main/TabItems";
import styles from "./AddWhisperBtn.module.css";
import { useRouter } from "next/router";

const AddWhisperBtn = ({ pageIndex, publication, height, width, text }) => {
  const { setPublication } = usePublicationContext();
  pageIndex = 1;
  const router = useRouter();
  const { onTabChange } = useBottomTab();
  return (
    <div
      className={`w-[${width}px] min-w-[156px] h-[${height}px] rounded-[40px] flex items-center justify-center z-10 cursor-pointer ${styles.Buttonbg}`}
      onClick={() => {
        setPublication(publication);
        onTabChange(TabItems[pageIndex]);
        router.push(`/generate/${publication?.chainId}`);
      }}
    >
      <div
        className={`not-italic font-bold text-[16px] leading-[160%] text-center text-[#FFFFFF] ${styles.ButtonText}`}
      >
        {text}
      </div>
    </div>
  );
};

export default AddWhisperBtn;
