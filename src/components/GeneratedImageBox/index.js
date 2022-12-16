import React from 'react';
import styles from "./generateImageBox.module.css";
import WhisperImage from '../WhisperImage';

export default function GeneratedImageBox({
  imgSrcUrl,
  clickHandler
}) {
  return (
    <div className="w-[404px] h-[404px] relative group">
      <WhisperImage
        imgSrcUrl={imgSrcUrl}
        alt="Whisper Image"
        width={404}
        height={404}
        priority={true}
        classes="absolute rounded-[16px] border-solid border-[1px] border-[#ffffff33]"
      />
      <div className="absolute bottom-[16px] w-[calc(100%-32px)] left-[16px] hidden group-hover:flex"
        onClick={clickHandler}
      >
        <div className={styles.addToChainButton}>
          <div className={styles.addToChainBtnText}>+ Add to chain</div>
        </div>
      </div>
    </div>
  )
}