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
  getPublicationCollectData,
  getChainWhispers,
} from "../utils/lensFunction";
import { useSigner } from "wagmi";
import SignTypedData from "./ConnectButton/SignTypedData";
// import FollowButton from "./FollowButton";
import SignInModal from "./SignInModal";
import { Constants } from "../utils/Constants";
import Cross from "../assets/Cross";
import PolygonLogo from "../assets/PolygonLogo";
import CollectorLogo from "../assets/CollectorLogo";
import CollectButton from "./CollectButton";
import AlertIcon from "../assets/AlertIcon";
import SpinningLoader from "./SpinningLoader";
import Loader from "./Loader";
import { useRouter } from "next/router";

export const PostImage = ({ imageDetails }) => {
  const [hovered, setHovered] = React.useState(false);
  const { data: signer } = useSigner();
  const [typedData, setTypedData] = React.useState({});
  const transactionId = React.useRef({});
  const [isOpen, setIsOpen] = React.useState(false);
  const [onClickCollect, setOnClickCollect] = React.useState(false);
  const [collectError, setCollectError] = React.useState(false);
  const router = useRouter();
  const routerPath = router.query;
  const paginationParams = React.useRef({
    page: 1,
    limit: 1,
  });
  const chainId = routerPath.chainId;
  const [collectLoaderStarted, setCollectLoaderStarted] = React.useState(false);

  const onCollectPress = async () => {
    if (
      window.localStorage.getItem(Constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY)
    ) {
      setIsOpen(false);
      try {
        await refreshAuthentication();
        await getApprovedModuleAllowance(imageDetails?.collectModule, signer);
        const res = await collectPost(imageDetails?.publicationId);
        transactionId.current = res.data?.createCollectTypedData?.id;
        setTypedData(res.data?.createCollectTypedData?.typedData);
        setCollectLoaderStarted(true);
      } catch (error) {
        setCollectError(true);
        setCollectLoaderStarted(false);
      }
      setOnClickCollect(false);
    } else {
      setIsOpen(true);
      setOnClickCollect(true);
    }
  };

  // polling for processing state
  // let timeout = 0;
  // const hasWhisperProcessed = async () => {
  //   console.log("router", router);
  //   console.log("chain id", chainId);
  //   const whisperRes = await getChainWhispers(chainId, paginationParams);
  //   console.log("-------------", whisperRes);
  //   const whisperIds = whisperRes?.whisper_ids;
  //   const whisper = whisperRes?.whispers[whisperIds[0]];
  //   console.log(whisper);
  //   return whisper;
  // };

  // if (
  //   routerPath?.isGenerated == "true" &&
  //   imageDetails.status === "PROCESSING"
  // ) {
  //   timeout = setInterval(async () => {
  //     const whisper = hasWhisperProcessed();
  //     if (whisper?.status === "ACTIVE") {
  //       clearInterval(timeout);
  //       imageDetails.status = whisper?.status;
  //       imageDetails.publicationId = whisper?.platform_chain_id;
  //       const res = await getPublicationCollectData([
  //         whisper?.platform_chain_id,
  //       ]);
  //       imageDetails.hasCollectedByMe =
  //         res[whisper?.platform_chain_id]?.hasCollectedByMe;
  //       imageDetails.totalAmountOfCollects =
  //         res[whisper?.platform_chain_id]?.stats?.totalAmountOfCollects;
  //       imageDetails.lensterPostUrl = `https://testnet.lenster.xyz/posts/${whisper.platform_chain_id}`;
  //     }
  //   }, 5000);
  // }

  // console.log("imageDetails", imageDetails);

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
              className={`not-italic leading-[100%] text-[#FFFFFF] font-bold text-[17px] ${styles.name}`}
            >
              {imageDetails?.createdAt || "2:32 pm"}
            </div> */}

            {/* <FollowButton data={imageDetails} /> */}
          </div>

          {/* collector modal */}
          {onClickCollect && (
            <div
              className={`box-border flex flex-col p-[24px] gap-[14px] absolute rounded-[8px] backdrop-blur-[60px] ${styles.collectModal}`}
            >
              <div className="flex justify-center items-center">
                <div className="flex gap-[8px] justify-center items-center">
                  <CollectIcon />
                  <span className="w-[360px] text-[16px] leading-[160%] font-bold">
                    Fee Collect
                  </span>
                </div>
                <div
                  onClick={() => setOnClickCollect(false)}
                  className="cursor-pointer"
                >
                  <Cross type={"large"} stroke="#000000" />
                </div>
              </div>
              <div
                className={`font-medium text-[16px] leading-[160%] ${styles.collectInfo}`}
              >
                Proceeds from the Collect will go to
                <span className="text-[#000000]">
                  {" "}
                  @{imageDetails?.profileHandle}
                </span>
              </div>
              <div
                className={`flex box-border px-[12px] py-[7px] gap-[8px] rounded-[4px] text-[16px] font-bold leading-[160%] text-[#000000] ${styles.collectAmount}`}
              >
                {/* <PolygonLogo /> */}
                <Image src="/../public/polygon.png" width={26} height={26} />1
                WMATIC
              </div>
              <div
                className={`flex box-border px-[12px] py-[7px] gap-[8px] rounded-[4px] items-center ${styles.totalCollector}`}
              >
                <CollectorLogo />
                {imageDetails?.totalAmountOfCollects} Collectors
              </div>
              <CollectButton onCollectPress={onCollectPress} text={"Collect"} />
            </div>
          )}
          {/* collector error modal */}
          {collectError && (
            <div
              className={`p-[24px] gap-[14px] w-[464px] absolute rounded-[8px] backdrop-blur-[60px] ${styles.collectModal}`}
            >
              <div className="flex gap-[8px] items-center">
                <AlertIcon />
                <span className="w-[360px] text-[20px] leading-[160%] font-bold text-[#260707]">
                  Couldn’t Collect post
                </span>
              </div>
              <div
                className={`font-medium text-[16px] leading-[160%] pb-[106px] text-[#390808]`}
              >
                The message signature was denied.
              </div>
              <div
                className={`w-full min-w-[156px] h-[40px] rounded-[40px] flex items-center justify-center z-10 cursor-pointer gap-[8px] ${styles.Buttonbg}`}
                onClick={() => {
                  setCollectError(false);
                }}
              >
                <div
                  className={`not-italic font-bold text-[16px] leading-[160%] text-center text-[#FFFFFF] py-[7px]${styles.ButtonText}`}
                >
                  Ok. Got it.
                </div>
              </div>
            </div>
          )}
          {imageDetails.status === "PROCESSING" && (
            <div
              className={`flex justify-center items-center absolute top-[85%] left-[50%] text-center gap-[8px] w-[432px] -translate-x-[50%]`}
            >
              <div
                className={`flex items-center p-[10px] w-[208px] h-[40px] justify-center rounded-[4px] backdrop-blur-[60px] ${styles.viewOnLensBtn}`}
              >
                <Loader />
              </div>
              <div
                className={`flex items-center p-[10px] w-[208px] h-[40px] justify-center rounded-[4px] backdrop-blur-[60px] ${styles.viewOnLensBtn}`}
              >
                <Loader />
              </div>
            </div>
          )}
          {imageDetails.status === "ACTIVE" && (
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
                  className={`flex items-center p-[10px] w-[208px] h-[40px] justify-center rounded-[4px] backdrop-blur-[60px]  ${styles.collectedBtn}`}
                >
                  Collected
                </button>
              ) : (
                <button
                  onClick={() => setOnClickCollect(true)}
                  className={`flex items-center p-[10px] w-[208px] h-[40px] justify-center rounded-[4px] backdrop-blur-[60px] cursor-pointer ${
                    styles.viewOnLensBtn
                  }
                  ${
                    collectLoaderStarted
                      ? "cursor-auto pointer-events-none"
                      : null
                  }
                  `}
                >
                  {collectLoaderStarted ? (
                    <Loader />
                  ) : (
                    <>
                      <CollectIcon />
                      <span className="ml-[10px]">Collect this post</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      )}
      <SignInModal
        onRequestClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
        onSignInComplete={() => {
          onCollectPress();
        }}
      />
      {Object.keys(typedData)?.length > 0 ? (
        <SignTypedData
          typedData={typedData}
          id={transactionId.current}
          onSuccess={async () => {
            setCollectLoaderStarted(false);
            const res = await getPublicationCollectData([
              imageDetails?.publicationId,
            ]);
            imageDetails.hasCollectedByMe =
              res[imageDetails?.publicationId]?.hasCollectedByMe;
            imageDetails.totalAmountOfCollects =
              res[imageDetails?.publicationId]?.stats?.totalAmountOfCollects;
          }}
          pollIndexing={true}
        />
      ) : null}
    </div>
  );
};
