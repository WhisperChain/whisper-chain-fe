import React from "react";
import styles from "./BottomTabSelector.module.css";
import InfoLogo from "../../assets/InfoLogo";

const BottomInfo = () => {

    const handlePLGClick = () => {
    const plgURL = "https://plgworks.com/";
    window.open(plgURL, "_blank");
  };
  const handleNotionClick = () => {
    const plgURL = "https://plgworks.notion.site/Whisper-Chain-fc95cbdc8f9a4a41b87747a190477a61";
    window.open(plgURL, "_blank");
  };
  
  return (
    <div
      className={
        "px-[50px] flex justify-between sticky bottom-[15px] items-center  w-full"
      }
      id="BottomInfo"
    >
         <div onClick={handleNotionClick} className={`flex not-italic font-medium text-[16px] ${styles.infoTab}`}>
          <button className={`flex justify-center gap-[8.5px] items-center hover:text-[#000000]`}> <InfoLogo /> How it works</button>
        </div>

         <div className={`flex not-italic justify-end font-medium text-[16px] ${styles.infoTab}`}>
          <div className="hover:text-[#000000]">
            <button onClick={handlePLGClick}>Made with 🧡 by PLG</button>
          </div>
        </div>
      
    </div>
  );
};

export default BottomInfo;
