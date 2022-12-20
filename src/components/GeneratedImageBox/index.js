import React from 'react';
import styles from "./generateImageBox.module.css";
import WhisperImage from '../WhisperImage';
import { motion } from "framer-motion"

export default function GeneratedImageBox({
  imgSrcUrl,
  clickHandler
}) {
  const [isHover, setIsHover] = React.useState(false);
  const [isImageLoaded, setIsImageloaded] = React.useState(false);

  return (
    <div
      className="tablet:w-[380px] tablet:h-[380px] w-[404px] h-[404px] relative"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <WhisperImage
        imgSrcUrl={imgSrcUrl}
        alt="Whisper Image"
        width={404}
        height={404}
        onLoadingCompleteHandler={() => setIsImageloaded(true)}
        classes="absolute rounded-[16px] border-solid border-[1px] border-[#ffffff33]"
      />
      {isImageLoaded && (
        <div className="absolute bottom-0 w-[calc(100%-32px)] left-[16px] flex cursor-pointer"
          onClick={clickHandler}
        >
          <motion.div
            className="w-full"
            transition={{
              type: "spring",
              damping: 100,
              stiffness: 500,
              easing: "easeIn"
            }}
            initial={{
              y: "0%"
            }}
            animate={{
              y: !isHover ? "0%" : "-50%"
            }}
          >
            {isHover &&
              <div className={styles.addToChainButton}>
                <div className={styles.addToChainBtnText}>+ Add to chain</div>
              </div>
            }
          </motion.div>
        </div>
      )}
    </div>
  )
}