import React from "react";
import ProfileLogo from "../assets/ProfileLogo";
import { usePublicationContext } from "../context/PublicationContext";
import Image from "next/image";
import styles from "./ImageStack.module.css";
import { useRouter } from "next/router";
import BlackEyeIcon from "../assets/BlackEyeIcon";
// import FollowButton from "./FollowButton";

const ImagesStack = ({ imageDetails: imageDetailsArray, pub }) => {
  const [hovered, setHovered] = React.useState(false);
  const { setPublication } = usePublicationContext();
  const imageDetails = imageDetailsArray[0];
  const router = useRouter();

  return (
    <div className="flex flex-col items-center relative">
      {imageDetails?.imageUrl && (
        <div
          className="tablet:w-[400px] tablet:h-[400px] w-[512px] h-[512px] relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Image
            src={imageDetails.imageUrl}
            alt="Stack Image"
            fill
            priority
            className="relative flex z-[3] rounded-[48px]"
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
      )}
      {hovered && (
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`tablet:w-[400px] tablet:h-[400px] w-[512px] h-[512px] absolute z-[10] rounded-[48px] `}
        >
          <div
            className={`flex relative p-[40px] rounded-tr-[48px] rounded-tl-[48px]  backdrop-blur-[2px] ${styles.backdrop} `}
          >
            <div className={`flex w-[360px] cursor-pointer`}>
              <ProfileLogo profileImageUrl={imageDetails?.profileImageUrl} />
              <div className="ml-[5px] flex flex-col justify-center items-start gap-[4px]">
                <div
                  className={`not-italic leading-[100%] text-[#FFFFFF] font-bold text-[14px] ${styles.name}`}
                >
                  {imageDetails?.name || "Lewis"}
                </div>
                <div
                  className={`not-italic font-normal text-[14px] leading-[100%] text-[#FFFFFF] ${styles.Handle}`}
                >
                  {"@" + imageDetails?.profileHandle || "Lewis.xyz"}
                </div>
              </div>
            </div>
            {/* <div
              className={`not-italic text-[16px] leading-[100%] text-[#FFFFFF] font-medium ${styles.createdAt}`}
            >
              {imageDetails?.createdAt || "2:32 pm"}
            </div> */}

            {/* <FollowButton data={imageDetails} /> */}
          </div>
          <div
            className={`flex justify-center items-center absolute top-[85%] left-[50%] text-center gap-[8px] tablet:w-[340px] w-[432px] h-[40px] rounded-[4px] backdrop-blur-[60px] cursor-pointer ${styles.bottomBox}`}
            onClick={() => {
              setPublication(pub);
              router.push(`/chain/${pub?.chainId}`);
            }}
          >
            <div
              className={`flex justify-center items-center absolute text-center text-[#000000] not-italic font-medium text-[16px] leading-[100%] gap-[8px] ${styles.bottomBoxText}`}
            >
              <BlackEyeIcon />
              <div>View Chain </div>
            </div>
          </div>
        </div>
      )}
      <div className="absolute bottom-[-26px] z-[2]">
        <div className="tablet:w-[350px] tablet:h-[400px] w-[452px] h-[512px] relative">
          <Image
            alt="Stack Image 2"
            className="rounded-[48px]"
            fill
            src={
              imageDetailsArray[1]?.imageUrl
                ? imageDetailsArray[1].imageUrl
                : "https://i.picsum.photos/id/193/512/512.jpg?hmac=ay70CF2_XM0GJBcUQzMN6UNHDn0-kgSIu8KcENreNgM"
            }
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
      </div>
      <div className="absolute bottom-[-44px] z-[1]">
        <div className="tablet:w-[300px] tablet:h-[400px] w-[404px] h-[512px] relative">
          <Image
            alt="Stack Image 3"
            className="rounded-[48px]"
            fill
            src={
              imageDetailsArray[2]?.imageUrl
                ? imageDetailsArray[2].imageUrl
                : "https://i.picsum.photos/id/524/512/512.jpg?hmac=2VlA0x6Y7osphrvDzR52TVkYjcc493rqcizd8HEXphY"
            }
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
      </div>
    </div>
  );
};

export default ImagesStack;
