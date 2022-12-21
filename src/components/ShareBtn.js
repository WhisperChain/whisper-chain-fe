import React from "react";
import styles from "./AddWhisperBtn.module.css";

const ShareBtn = ({ pageIndex, height, width, text }) => {
  pageIndex = 1;
  return (
    <a
      className={`w-[${width}px] h-[${height}px] rounded-[40px] flex items-center justify-center z-10 cursor-pointer ${styles.Buttonbg}`}
      href="https://whisperchain.quick-poc.com/chain"
      target="_blank"
    >
      <div className="not-italic -tracking-[0.03em] font-extrabold text-[16px] leading-[100%] text-center text-[#FFFFFF]">
        {text}
      </div>
    </a>
  );
};

export default ShareBtn;
