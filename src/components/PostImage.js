import React from "react";
import ProfileLogo from "../assets/ProfileLogo";
import Image from "next/image";
import styles from "./ImageStack.module.css";
import PlusIcon from "../assets/PlusIcon";
import EyeIcon from "../assets/EyeIcon";
import CollectIcon from "../assets/CollectIcon";


export const PostImage = ({ imageDetails }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div className="flex flex-col items-center relative overflow-hidden">
      <Image
        src={imageDetails.imageUrl}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        alt="Chain Image"
        width={512}
        height={512}
        className="relative flex z-[3] rounded-[48px]"
      />
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
                  className={`not-italic font-medium text-[16px] text-[#FFFFFF] ${styles.FollowBtn}`}
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
          <div className={`flex justify-center items-center absolute top-[85%] left-[50%] text-center gap-[8px] w-[432px] -translate-x-[50%]`}>
              <button
              onClick={() => {
              window.open(imageDetails.lensterPostUrl, "_blank");
              }}
              className={`flex items-center p-[10px] w-[208px] h-[40px] justify-center rounded-[4px] backdrop-blur-[60px] ${styles.viewOnLensBtn}`}
            >
              {" "}
              <EyeIcon /> <span className="ml-[10px]">View on lens</span>
            </button>
            <a
              href=""
              className={`flex items-center p-[10px] w-[208px] h-[40px] justify-center rounded-[4px] backdrop-blur-[60px] ${styles.viewOnLensBtn}`}
            >
              {" "}
              <CollectIcon />{" "}
              <span className="ml-[10px]">Collect this post</span>
            </a>
          </div>
          </div>
      )}
    </div>
  );
};
