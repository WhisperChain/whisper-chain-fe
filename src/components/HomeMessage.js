import React from "react";
import AddWhisperBtn from "./AddWhisperBtn";
import styles from "./HomeMessage.module.css";
import Image from "next/image";
import ImageLinkTop from "../assets/ImageLinkTop";
import ImageLinkBottom from "../assets/ImageLinkBottom";
import WhisperImage from "./WhisperImage";

const HomeMessage = ({ publication }) => {
  const array1 =[1,2,3];
  const array2 =[4,5,6,7];
  return (
    <div className={`${styles.MessageBox}`}>
      <div
        className={`w-[512px] flex justify-center text-center rounded-[48px]`}
      >
        <div className={`${styles.Message}`}>
          <div className="text-black font-bold text-[16px] leading-[160%] ">
            Welcome to Whisper chain
          </div>
          <div className="text-black text-[16px] leading-[160%] w-[432px]">
            A new fun take on age old game some of you might know as Chinese
            whisper or Telephone. But with a twist of A.I,
          </div>
        </div>
      </div>
      <div className="fixed top-[209px] left-[90px] z-0">
        <ImageLinkTop />
      </div>
      <div className="flex relative justify-evenly mt-[50px] z-10">
        <div
          className={`flex justify-center items-center w-[80px] h-[80px] rounded-[8px] ${styles.ImageDiv}`}
        >
          <div
            className={`w-[53px] h-[34px] text-[#6F1AFF] ${styles.ImageDivText}`}
          >
            A.I. starts a thread
          </div>
        </div>
         {array1.map((index) => {
          return (
            <WhisperImage
              key={index}
              width={80}
              height={80}
              classes=""
              alt={`image${index}`}
              imgSrcUrl={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/whisperHomePage/Rectangle${index}.png`}
            />
          )
         })}
      </div>
      <div className="fixed top-[326px] left-[73px] z-0">
        <ImageLinkBottom />
      </div>
      <div className="flex relative justify-evenly mt-[50px] z-10">
        {array2.map((index) => {
          return (
            <WhisperImage
              key={index}
              width={80}
              height={80}
              classes=""
              alt={`image${index}`}
              imgSrcUrl={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/whisperHomePage/Rectangle${index}.png`}
            />
          )
         })}
      </div>
      <div className="flex justify-center mt-[50px]">
        <AddWhisperBtn pageIndex={1} publication={publication} height={40} width={200} text={"Add a whisper"}/>
      </div>
    </div>
  );
};

export default HomeMessage;
