import React from "react";
import ProfileLogo from "../assets/ProfileLogo";
import { usePublicationContext } from "../context/PublicationContext";
import Image from "next/image";
import styles from "./ImageStack.module.css";
import PlusIcon from "../assets/PlusIcon";
import EyeIcon from "../assets/EyeIcon";
import SignTypedData from "./ConnectButton/SignTypedData";
import { refreshAuthentication, requestFollow } from "../utils/lensFunction";
import { useRouter } from "next/router";

const ImagesStack = ({ imageDetails: imageDetailsArray, pub }) => {
  const [hovered, setHovered] = React.useState(false);
  const { setPublication } = usePublicationContext();
  const imageDetails = imageDetailsArray[0];
  const [typedData, setTypedData] = React.useState({});
  const followRequestId = React.useRef({});
  const router = useRouter();
  const [followed, setFollowed] = React.useState();

  return (
    <div className="flex flex-col items-center relative overflow-hidden">
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
          className={`w-[512px] h-[512px] absolute z-[10] rounded-[48px]`}
        >
          <div className={`flex relative p-[40px] rounded-tr-[48px] rounded-tl-[48px]  backdrop-blur-[2px] ${styles.backdrop} `}>
            <div className={`flex w-[360px] cursor-pointer`}>
              <ProfileLogo profileImageUrl={imageDetails?.profileImageUrl} />
              <div className="ml-[5px] flex flex-col justify-center items-start">
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
            {/* <div className="">{imageDetails?.createdAt || "2:32 pm"}</div> */}
            {!imageDetails?.isFollowedByMe ? (
              <button
                className="flex justify-center items-center gap-[6px] z-20"
                onClick={async () => {
                  console.log("call Follow Function");
                  await refreshAuthentication();
                  const res = await requestFollow(imageDetails?.profileId);
                  followRequestId.current = res.data?.createFollowTypedData?.id;
                  setTypedData(res.data?.createFollowTypedData?.typedData);
                  console.log({ res });
                }}
              >
                <PlusIcon />
                <div
                  className={`not-italic font-medium text-[16px] text-[#FFFFFF] hover:text-[]  ${styles.FollowBtn}`}
                >
                  Follow
                </div>
              </button>
            ) : (
              <div
                className={`not-italic font-medium text-[16px] text-[#FFFFFF] ${styles.FollowBtn}`}
              >
                Following
              </div>
            )}
          </div>
          <div className={`flex justify-center items-center absolute top-[85%] left-[50%] text-center gap-[8px] w-[432px] h-[40px] rounded-[4px] backdrop-blur-[60px] cursor-pointer ${styles.bottomBox}`}
            onClick={() => {
              setPublication(pub);
              router.push("/chain");
            }}
          >
            <div className={`flex justify-center items-center absolute text-center text-[#000000] not-italic font-medium text-[16px] leading-[100%] gap-[8px] ${styles.bottomBoxText}`}>
              <EyeIcon />
              <div>View Chain </div>
            </div>
          </div>
        </div>
      )}
      {Object.keys(typedData)?.length > 0 ? (
        <SignTypedData
          typedData={typedData}
          id={followRequestId.current}
          onSuccess={() => { }}
        />
      ) : null}
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
