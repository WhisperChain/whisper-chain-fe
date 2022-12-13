import React from "react";
import styled from "styled-components";
import AddWhisperBtn from "./AddWhisperBtn";
import styles from "./HomeMessage.module.css";
import Image from 'next/image';

const HomeMessage = ({ publication, currentSlideIndex }) => {
  return (
    <div className={`${styles.MessageBox}`}>
      <div className={`w-[512px] flex justify-center text-center rounded-[48px]`}>
        <div className={`${styles.Message}`}>
          <div className="text-black font-bold text-[16px] leading-[160%] ">Welcome to Whisper chain</div>
          <div className="text-black text-[16px] leading-[160%] w-[432px]">A new fun take on age old game some of you might know as Chinese whisper or Telephone. But with a twist of A.I,</div>
        </div>
      </div>
      <div className="flex justify-evenly mt-[50px]">
        <Image
          width={80}
          height={80}
          className=""
          alt="Stack Image 2"
          src="/../public/Rectangle-1.png"
        />
        <Image
          width={80}
          height={80}
          className=""
          alt="Stack Image 2"
          src="/../public/Rectangle-2.png"
        />
        <Image
          width={80}
          height={80}
          className=""
          alt="Stack Image 2"
          src="/../public/Rectangle-3.png"
        />
        <Image
          width={80}
          height={80}
          className=""
          alt="Stack Image 2"
          src="/../public/Rectangle-4.png"
        />
      </div>
      <div className="flex justify-evenly mt-[50px]">
        <Image
          width={80}
          height={80}
          className=""
          alt="Stack Image 2"
          src="/../public/Rectangle-5.png"
        />
        <Image
          width={80}
          height={80}
          className=""
          alt="Stack Image 2"
          src="/../public/Rectangle-6-1.png"
        />
        <Image
          width={80}
          height={80}
          className=""
          alt="Stack Image 2"
          src="/../public/Rectangle-7.png"
        />
        <Image
          width={80}
          height={80}
          className=""
          alt="Stack Image 2"
          src="/../public/Rectangle-4.png"
        />
      </div>
      <div className="flex justify-center">
      <AddWhisperBtn pageIndex={1} publication={publication} />
      </div>
    </div>
  );
};

export default HomeMessage;
