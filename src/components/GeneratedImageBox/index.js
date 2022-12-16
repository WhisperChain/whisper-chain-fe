import React from 'react';
import styles from "./generateImageBox.module.css";
import WhisperImage from '../WhisperImage';

export default function GeneratedImageBox({
  imgSrcUrl,
  clickHandler
}) {
  return (
    <div className="w-[380px] h-[380px] relative group">
      <WhisperImage
        imgSrcUrl={imgSrcUrl}
        alt="Whisper Image"
        width={380}
        height={380}
        classes="absolute rounded-[16px] border-solid border-[1px] border-[#ffffff33]"
      />
      <div className="absolute bottom-[12px] left-[calc(50%-100px)] hidden group-hover:flex"
        onClick={clickHandler}
      >
        <div className={styles.addToChainButton}>
          <div className={styles.addToChainBtnText}>+ Add to chain</div>
        </div>
      </div>
    </div>
  )
}