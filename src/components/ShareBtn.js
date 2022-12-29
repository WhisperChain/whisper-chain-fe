import React, { useState } from "react";
import { useBottomTab } from "../context/BottomTabContext";
import { usePublicationContext } from "../context/PublicationContext";
import { TabItems } from "./Main/TabItems";
import styles from "./AddWhisperBtn.module.css";

const ShareBtn = ({ pageIndex, publication, height, width, text }) => {
  const [ulrCopy, setUrlCopy] = useState(false);
  const copyLink = () => {
    const tempInut = document.createElement('input');
    tempInut.value = window.location.href;
    document.body.appendChild(tempInut);
    tempInut.select();
    document.execCommand('copy');
    document.body.removeChild(tempInut); 
    setUrlCopy(true);
    setTimeout(() => {
      setUrlCopy(false);
    }, 3000);
  };
  return (
    <a
      className={`w-[${width}px] h-[${height}px] rounded-[40px] flex items-center justify-center z-10 cursor-pointer ${styles.Buttonbg}`}
      target="_blank"
      onClick={copyLink}
    >
      <div className="not-italic -tracking-[0.03em] font-extrabold text-[16px] leading-[100%] text-center text-[#FFFFFF]">
      {!ulrCopy ? "Share" : "Url Copied!"}
      </div>
    </a>
  );
};

export default ShareBtn;
