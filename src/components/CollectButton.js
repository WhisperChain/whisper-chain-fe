import React from "react";
import styles from "./AddWhisperBtn.module.css";


const CollectButton = ({text, onCollectPress}) => {

  return (
    <div
      className={`w-full min-w-[156px] h-[40px] rounded-[40px] flex items-center justify-center z-10 cursor-pointer gap-[8px] ${styles.Buttonbg}`}
      onClick={() => {
        onCollectPress()
      }}
    >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.19922 5.20003H4.44922C4.44922 5.61425 4.78501 5.95003 5.19922 5.95003V5.20003ZM14.7992 5.20003V5.95003C15.2134 5.95003 15.5492 5.61425 15.5492 5.20003H14.7992ZM5.94922 3.2C5.94922 2.95147 6.15069 2.75 6.39922 2.75V1.25C5.32226 1.25 4.44922 2.12304 4.44922 3.2H5.94922ZM5.94922 5.20003V3.2H4.44922V5.20003H5.94922ZM5.19922 5.95003H14.7992V4.45003H5.19922V5.95003ZM14.0492 3.2V5.20003H15.5492V3.2H14.0492ZM13.5992 2.75C13.8477 2.75 14.0492 2.95147 14.0492 3.2H15.5492C15.5492 2.12305 14.6762 1.25 13.5992 1.25V2.75ZM6.39922 2.75H13.5992V1.25H6.39922V2.75Z" fill="white"/>
            <rect x="2" y="10" width="16" height="8" rx="1.2" stroke="white" stroke-width="1.5"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.79961 4.4502C3.72265 4.4502 2.84961 5.32324 2.84961 6.4002V10.052C2.96034 10.0183 3.07786 10.0002 3.19961 10.0002H4.34961V6.4002C4.34961 6.15167 4.55108 5.9502 4.79961 5.9502H15.1996C15.4481 5.9502 15.6496 6.15167 15.6496 6.4002V10.0002H16.7996C16.9214 10.0002 17.0389 10.0183 17.1496 10.052V6.4002C17.1496 5.32324 16.2766 4.4502 15.1996 4.4502H4.79961Z" fill="white"/>
        </svg>
      <div className={`not-italic font-bold text-[16px] leading-[160%] text-center text-[#FFFFFF] py-[7px]${styles.ButtonText}`}>
        {text}
      </div>
    </div>
  );
};

export default CollectButton;