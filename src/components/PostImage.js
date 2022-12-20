import React from "react";
import ProfileLogo from "../assets/ProfileLogo";
import Image from "next/image";
import styles from "./ImageStack.module.css";
import EyeIcon from "../assets/EyeIcon";
import CollectIcon from "../assets/CollectIcon";
import {
  collectPost,
  getApprovedModuleAllowance,
  refreshAuthentication,
} from "../utils/lensFunction";
import { useSigner } from "wagmi";
import SignTypedData from "./ConnectButton/SignTypedData";
import FollowButton from "./FollowButton";

export const PostImage = ({ imageDetails }) => {
  const [hovered, setHovered] = React.useState(false);
  const { data: signer } = useSigner();
  const [typedData, setTypedData] = React.useState({});
  const transactionId = React.useRef({});


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

            <FollowButton
              data={imageDetails}
            />

          </div>
          <div
            className={`flex justify-center items-center absolute top-[85%] left-[50%] text-center gap-[8px] w-[432px] -translate-x-[50%]`}
          >
            <button
              onClick={() => {
                window.open(imageDetails.lensterPostUrl, "_blank");
              }}
              className={`flex items-center p-[10px] w-[208px] h-[40px] justify-center rounded-[4px] backdrop-blur-[60px] ${styles.viewOnLensBtn}`}
            >
              <EyeIcon /> <span className="ml-[10px]">View on lens</span>
            </button>
            {imageDetails?.hasCollectedByMe ? (
              <button
                className={`flex items-center p-[10px] w-[208px] h-[40px] justify-center rounded-[4px] backdrop-blur-[60px] ${styles.viewOnLensBtn}`}
              >
                Collected
              </button>
            ) : (
              <button
                onClick={async () => {
                  await refreshAuthentication();
                  await getApprovedModuleAllowance(
                    imageDetails?.collectModule,
                    signer
                  );
                  const res = await collectPost(imageDetails?.publicationId);
                  transactionId.current = res.data?.createCollectTypedData?.id;
                  setTypedData(res.data?.createCollectTypedData?.typedData);
                }}
                className={`flex items-center p-[10px] w-[208px] h-[40px] justify-center rounded-[4px] backdrop-blur-[60px] ${styles.viewOnLensBtn}`}
              >
                <CollectIcon />
                <span className="ml-[10px]">Collect this post</span>
              </button>
            )}
          </div>
        </div>
      )}
      {Object.keys(typedData)?.length > 0 ? (
        <SignTypedData
          typedData={typedData}
          id={transactionId.current}
          onSuccess={() => { }}
        />
      ) : null}
    </div>
  );
};
