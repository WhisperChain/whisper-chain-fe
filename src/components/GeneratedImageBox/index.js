import React from 'react';
import styles from "./generateImageBox.module.css";
import WhisperImage from '../WhisperImage';
import { motion } from "framer-motion"
import Modal from "react-modal";
import MessageLogo from '../../assets/addWhisperLogos/MessageLogo';
import CollectLogo from '../../assets/addWhisperLogos/CollectLogo';
import WalletLogo from '../../assets/addWhisperLogos/WalletLogo';

export default function GeneratedImageBox({
  imgSrcUrl,
  clickHandler
}) {
  const [isHover, setIsHover] = React.useState(false);
  const [isImageLoaded, setIsImageloaded] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const customStyles = {
    content: {
      background: "#FFFFFF",
      height: "fit-content",
      width: 384,
      margin: "auto",
      backdropFilter: "blur(60px)",
      borderRadius: "16px",
      padding: "0px",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.6)",
    },
  };

  return (
    <div
      className="tablet:w-[320px] tablet:h-[320px] w-[404px] h-[404px] relative"
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
      {isImageLoaded && imgSrcUrl && (
        <div className="absolute bottom-0 w-[calc(100%-32px)] left-[16px] flex cursor-pointer"
          onClick={handleOpen}
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

      <Modal onRequestClose={handleClose} isOpen={open} style={customStyles}>
        <div
          className={`flex flex-col justify-start items-start bg-[#FFFFFF] rounded-[16px] backdrop-blur-3xl gap-[16px] p-[12px] ${styles.ModalContainer}`}
        >
          <div className='text-[20px]'>Adding a whisper to the chain</div>
          <div className='flex flex-col gap-[24px] py-[10px] text-start not-italic text-[16px] leading-[140%] -tracking-[0.02em] text-[#000000] font-medium'>
            <div className='flex flex-col gap-[11px]'>
              <MessageLogo />
              <span className={`flex  ${styles.MessageText}`}> When you add a whisper to the chain, a comment is created on our lenster thread</span>
            </div>
            <div className='flex flex-col gap-[11px]'>
              <CollectLogo />
              <span className={`flex ${styles.MessageText}`}> People can collect your comment on Whisperchain and lenster</span>
            </div>
            <div className='flex flex-col gap-[11px]'>
              <WalletLogo />
              <span className={`flex ${styles.MessageText}`}> Proceeds from all collects will go to your wallet</span>
            </div>
          </div>
          <div className="flex gap-[8px] w-full justify-start items-center"
            onClick={clickHandler}
          >
            <div className={styles.addToChainButton}>
              <div className={styles.addToChainBtnText}>+ Add to chain</div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}