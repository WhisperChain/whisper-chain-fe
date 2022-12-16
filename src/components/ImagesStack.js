import React from "react";
import ProfileLogo from "../assets/ProfileLogo";
import { useBottomTab } from "../context/BottomTabContext";
import { usePublicationContext } from "../context/PublicationContext";
import { TabItems } from "./Main/TabItems";
import Image from "next/image";
import styles from "./ImageStack.module.css";
import PlusIcon from "../assets/PlusIcon";
import EyeIcon from "../assets/EyeIcon";

const ImagesStack = ({ imageDetails: imageDetailsArray, pub }) => {
  const [hovered, setHovered] = React.useState(false);
  const { onTabChange } = useBottomTab();
  const { setPublication } = usePublicationContext();
  const imageDetails = imageDetailsArray[0];
  console.log({ imageDetailsArray });
  return (
    <div className="flex flex-col items-center relative overflow-hidden h-[572px]">
      {imageDetails?.imageUrl && (
        <Image
          src={imageDetails.imageUrl}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          alt="Stack Image"
          width={512}
          height={512}
          className="relative flex z-[3] rounded-[48px]"
        />
      )}
      {hovered && (
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => {
            setPublication(pub);
            onTabChange(TabItems[1]);
          }}
          className={`w-[512px] h-[512px] absolute z-[10] backdrop-blur rounded-[48px] cursor-pointer ${styles.Backdrop}`}
        >
          <div className="flex relative p-[40px]">
            <div className="flex w-[360px] cursor-pointer">
              <ProfileLogo profileImageUrl={imageDetails?.profileImageUrl} />
              <div className="ml-[5px] flex flex-col justify-center items-start">
                <div
                  className={`not-italic leading-[100%] text-[#000000] font-bold text-[14px] ${styles.name}`}
                >
                  {imageDetails?.name || "Lewis"}
                </div>
                <div
                  className={`not-italic font-normal text-[14px] leading-[100%] ${styles.Handle}`}
                >
                  {"@" + imageDetails?.profileHandle || "Lewis.xyz"}
                </div>
              </div>
            </div>
            {/* <Right>{imageDetails?.createdAt || "2:32 pm"}</Right> */}
            <button className="flex justify-center items-center gap-[6px] z-20">
              <PlusIcon />
              <div
                className={`not-italic font-medium text-[16px]  ${styles.FollowBtn}`}
              >
                Follow
              </div>
            </button>
          </div>
          <div
            className={`flex justify-center items-center absolute top-[50%] left-[50%] -translate-x-[50%] text-center text-[#6F1AFF] not-italic font-medium text-[16px] leading-[100%] gap-[8px] ${styles.center}`}
          >
            <EyeIcon />
            View Chain
          </div>
        </div>
      )}
      <Image
        width={452}
        height={512}
        className="absolute bottom-[22px] rounded-[48px] flex z-[2]"
        alt="Stack Image 2"
        src={
          imageDetailsArray[1]?.imageUrl
            ? imageDetailsArray[1].imageUrl
            : "https://i.picsum.photos/id/193/512/512.jpg?hmac=ay70CF2_XM0GJBcUQzMN6UNHDn0-kgSIu8KcENreNgM"
        }
      />

      <Image
        width={404}
        height={512}
        className="absolute bottom-[0px] rounded-[48px] flex z-[1]"
        alt="Stack Image 3"
        src={
          imageDetailsArray[2]?.imageUrl
            ? imageDetailsArray[2].imageUrl
            : "https://i.picsum.photos/id/524/512/512.jpg?hmac=2VlA0x6Y7osphrvDzR52TVkYjcc493rqcizd8HEXphY"
        }
      />
    </div>
  );
};

export default ImagesStack;
