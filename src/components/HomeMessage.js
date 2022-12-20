import React from "react";
import AddWhisperBtn from "./AddWhisperBtn";
import styles from "./HomeMessage.module.css";
import ImageLinkTop from "../assets/ImageLinkTop";
import ImageLinkBottom from "../assets/ImageLinkBottom";
import WhisperImage from "./WhisperImage";

const HomeMessage = ({ publication }) => {
  const array1 = [1, 2, 3];
  const array2 = [4, 5, 6, 7];
  return (
    <div className={`tablet:w-[400px] tablet:h-[400px] w-[512px] h-[512px] ${styles.MessageBox}`}>
      <div
        className="tablet:w-[400px] w-[512px] flex justify-center text-center rounded-[48px]"
      >
        <div className={`${styles.Message}`}>
          <div className="text-black font-bold text-[16px] leading-[160%] ">
            Welcome to Whisper chain
          </div>
          <div className="text-black text-[16px] leading-[160%] w-full px-[24px] tablet:text-[14px]">
            A new fun take on age old game some of you might know as Chinese
            whisper or Telephone. But with a twist of A.I,
          </div>
        </div>
      </div>
      <div className="flex relative justify-evenly mt-[50px] z-10 tablet:mt-[5px] tablet:scale-90">
        <div
          className={`flex justify-center items-center w-[80px] h-[80px] rounded-[8px] ${styles.ImageDiv} z-10`}
        >
          <div
            className={`w-[53px] h-[34px] text-[#6F1AFF] ${styles.ImageDivText}`}
          >
            A.I. starts a thread
          </div>
        </div>
        {array1.map((index) => {
          return (
            <div className="h-[80px] w-[80px] relative" key={index}>
              <WhisperImage
                width={80}
                height={80}
                classes="z-10"
                alt={`image${index}`}
                imgSrcUrl={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/whisperHomePage/Rectangle${index}.png`}
              />
            </div>
          )
        })}
        <div className="absolute top-2/4 left-[40px] z-0">
          <ImageLinkTop />
        </div>
      </div>

      <div className="flex relative justify-evenly mt-[50px] z-10 tablet:scale-90 tablet:mt-[5px]">
        {array2.map((index) => {
          return (
            <div className="h-[80px] w-[80px] relative" key={index}>
              <WhisperImage
                width={80}
                height={80}
                classes="z-10"
                alt={`image${index}`}
                imgSrcUrl={`${process.env.NEXT_PUBLIC_AWS_CDN_URL}/whisperHomePage/Rectangle${index}.png`}
              />
            </div>
          )
        })}
        <div className="absolute top-[30%] left-[75px] z-0">
          <ImageLinkBottom />
        </div>
      </div>
      <div className="flex justify-center mt-[50px] tablet:mt-[20px] w-full">
        <AddWhisperBtn pageIndex={1} publication={publication} height={40} width={200} text={"Add a whisper"} />
      </div>
    </div>
  );
};

export default HomeMessage;
