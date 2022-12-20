import React from "react";
import ProfileLogo from "../assets/ProfileLogo";
import { usePublicationContext } from "../context/PublicationContext";
import Image from "next/image";
import styles from "./ImageStack.module.css";
import PlusIcon from "../assets/PlusIcon";
import EyeIcon from "../assets/EyeIcon";
import SignTypedData from "./ConnectButton/SignTypedData";
import {
  getApprovedModuleAllowance,
  refreshAuthentication,
  requestFollow,
} from "../utils/lensFunction";
import { useRouter } from "next/router";
import { useSigner } from "wagmi";
import { Constants } from "../utils/Constants";
import SignInModal from "./SignInModal";

const ImagesStack = ({ imageDetails: imageDetailsArray, pub }) => {
  const [hovered, setHovered] = React.useState(false);
  const { setPublication } = usePublicationContext();
  const { data: signer } = useSigner();
  const imageDetails = imageDetailsArray[0];
  const [typedData, setTypedData] = React.useState({});
  const followRequestId = React.useRef({});
  const router = useRouter();
  const [followed, setFollowed] = React.useState();
  const [isOpen, setIsOpen] = React.useState(false);

  const onFollowPress = async () => {
    if (
      window.localStorage.getItem(Constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY)
    ) {
      await refreshAuthentication();
      if (imageDetails?.followModule) {
        await getApprovedModuleAllowance(imageDetails?.followModule, signer);
      }
      const res = await requestFollow(
        imageDetails?.profileId,
        imageDetails?.followModule ?? null
      );
      followRequestId.current = res.data?.createFollowTypedData?.id;
      setTypedData(res.data?.createFollowTypedData?.typedData);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      {imageDetails?.imageUrl && (
        <div className="tablet:w-[400px] tablet:h-[400px] w-[512px] h-[512px] relative">
          <Image
            src={imageDetails.imageUrl}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            alt="Stack Image"
            fill
            priority
            className="relative flex z-[3] rounded-[48px]"
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
                onClick={onFollowPress}
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
            <SignInModal
              onRequestClose={() => {
                setIsOpen(false);
              }}
              isOpen={isOpen}
              onSignInComplete={onFollowPress}
            />
          </div>
          <div
            className={`flex justify-center items-center absolute top-[85%] left-[50%] text-center gap-[8px] tablet:w-[340px] w-[432px] h-[40px] rounded-[4px] backdrop-blur-[60px] cursor-pointer ${styles.bottomBox}`}
            onClick={() => {
              setPublication(pub);
              router.push("/chain");
            }}
          >
            <div
              className={`flex justify-center items-center absolute text-center text-[#000000] not-italic font-medium text-[16px] leading-[100%] gap-[8px] ${styles.bottomBoxText}`}
            >
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
          onSuccess={() => {}}
        />
      ) : null}
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
          />
        </div>
      </div>
    </div>
  );
};

export default ImagesStack;
