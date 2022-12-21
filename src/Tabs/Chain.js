import React from "react";
import ChainLogo from "../assets/ChainLogo";
import { PostImage } from "../components/PostImage";
import { getPublication } from "../utils/lensFunction";
import AddWhisperBtn from "../components/AddWhisperBtn";
import ShareBtn from "../components/ShareBtn";
import { timer } from "../utils/Utils";
import moment from "moment";
import SpinningLoader from "../components/SpinningLoader";
import style from "./Chain.module.css";
import { useRouter } from "next/router";
import ViewLensIcon from "../assets/ViewLensIcon";
import { getChainPageData, getChainWhispersData } from "../utils/ViewData";

const Chain = ({ chainId }) => {
  const [chainData, setChainData] = React.useState();
  const [isLoading, setIsloading] = React.useState(false);
  const router = useRouter();
  const [firstCreatedAt, setFirstCreatedAt] = React.useState();
  const [infoContainer, setInfoConatiner] = React.useState(true);
  const [hours, minutes] = timer("2022-12-14");
  const [publication, setPublication] = React.useState();
  const messageBoxData = {
    onChain: {
      text: "This was the last image added to the thread, try to describe this image in your own words as best you can, and add your generation to this thread. ",
    },
    OnGenerate: {
      h1: "Your generation has been successfully added to the chain",
      text: "To keep it interesting, please wait for another user to add to chain before you can add a whisper again.",
    },
  };

  const routerPath = router.query;
  const [isGenerated, setIsGenerated] = React.useState();

  React.useEffect(() => {
    if (routerPath?.isGenerated == "true") {
      setIsGenerated(true);
    } else {
      setIsGenerated(false);
    }
  }, [routerPath]);

  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const { pubItem, commentArray } = await getChainWhispersData(chainId);
      // const {commentArray, pubItem} = await getChainPageData();

      setFirstCreatedAt(pubItem.createdAt);
      setPublication(pubItem);
      setChainData(commentArray);
      setIsloading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let viewLensUrl = "https://testnet.lenster.xyz/posts";

  const buttonRef = React.useRef();
  let dContainer = buttonRef.current;
  const onScroll = () => {
    if (buttonRef.current?.scrollTop > 0) {
      increaseOpacity();
    } else {
      decreaseOpacity();
    }
  };

  const onViewLensHover = () => {
    let viewlensContainer = document.getElementById("viewlensContainer");
    if (viewlensContainer) {
      viewlensContainer.style.left = "-70px";
    }
  };

  const onViewLensHoverOff = () => {
    let viewlensContainer = document.getElementById("viewlensContainer");
    if (viewlensContainer) {
      viewlensContainer.style.left = "0";
    }
  };

  const increaseOpacity = () => {
    let lastImageButton = document.getElementById("lastImage");
    let bottomButton = document.getElementById("gopToTop");
    if (lastImageButton || gopToTopButton) {
      lastImageButton.style.opacity = "1";
      bottomButton.style.opacity = "1";
    }
  };
  const decreaseOpacity = () => {
    let lastImageButton = document.getElementById("lastImage");
    let bottomButton = document.getElementById("gopToTop");
    if (lastImageButton || gopToTopButton) {
      lastImageButton.style.opacity = "0";
      bottomButton.style.opacity = "0";
    }
  };

  return isLoading ? (
    <SpinningLoader height="80vh" width="100%" />
  ) : (
    <div>
      <div className="flex justify-between relative top-[20px]">
        <div
          onClick={() => {
            router.push("/");
          }}
          className="flex flex-row items-start not-italic font-medium text-[16px] leading-[140%] text-center text-[#0000003C] mb-[10px] cursor-pointer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.875 10H3.125"
              stroke="black"
              strokeOpacity="0.6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.75 4.375L3.125 10L8.75 15.625"
              stroke="black"
              strokeOpacity="0.6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ml-[12px] hover:text-[#000000]">Back</span>
        </div>
        <div className="flex flex-col items-center sticky decoration-white">
          <div className="not-italic font-medium text-[16px] leading-[140%] tracking-[-0.03em] text-[#000000] ">
            {moment(firstCreatedAt).format("Do MMMM YYYY")}
          </div>
        </div>
        <div className="relative">
          <span
            onMouseEnter={() => onViewLensHover()}
            onMouseLeave={() => onViewLensHoverOff()}
            id="viewlensContainer"
            className={`absolute flex ${style.viewOnLensContainer}`}
          >
            <a
              href={`${viewLensUrl}/${publication?.id}`}
              className="flex"
              target="_blank"
            >
              <span
                className="viewOnLens"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <ViewLensIcon />
              </span>
              <span
                className={`ml-[10px] w-[95px] text-[#00501E] ${style.viewOnLens}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                View on lens
              </span>
            </a>
          </span>
        </div>
      </div>
      <div className="flex justify-center sticky top-[150px] z-[1000]">
        <a
          onClick={() => {
            console.log("clicked");
            dContainer.scrollTo(0, 100000);
          }}
          id="gopToTop"
          className={`rounded-[20px] flex z-[10000] items-center justify-center ${style.bottomButton}`}
        >
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.75 7.5L10.5 13.75L4.25 7.5"
              stroke="black"
              strokeOpacity="0.6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ml-[10px]">Go to bottom</span>
        </a>
        <a
          onClick={() => {
            console.log("clicked");
            dContainer.scrollTo(0, 0);
          }}
          id="lastImage"
          className={`rounded-[20px] ml-[20px] flex z-[10000] items-center justify-center ${style.lastImageButton}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.25 13.75L10 7.5L3.75 13.75"
              stroke="black"
              strokeOpacity="0.6"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ml-[10px]">Back to top</span>
        </a>
      </div>
      <div
        id="demmoId"
        onScroll={onScroll}
        className={`overflow-scroll ${style.chainContainer}`}
        ref={buttonRef}
      >
        <div
          className={`w-[512px] h-[222px] flex flex-col items-center rounded-[32px] box-border ${style.messageBox}`}
        >
          <div className=" w-full pt-[38px] px-[40px] pb-[24px]">
            <h1
              className={`not-italic text-[16px] leading-[160%] font-bold ${style.messageText}`}
            >
              {isGenerated ? messageBoxData.OnGenerate.h1 : ""}
            </h1>
            <div
              className={`not-italic text-[16px] leading-[160%] font-medium ${style.messageText}`}
            >
              {isGenerated
                ? messageBoxData.OnGenerate.text
                : messageBoxData.onChain.text}
            </div>
          </div>
          <div>
            {isGenerated ? (
              <ShareBtn pageIndex={1} height={40} width={432} text="Share" />
            ) : (
              <AddWhisperBtn
                pageIndex={1}
                publication={publication}
                height={40}
                width={432}
                text="Add to Chain"
              />
            )}
          </div>
        </div>
        {chainData &&
          chainData.map((comment, index) => {
            return comment.imageUrl ? (
              <div key={index}>
                <div className="flex w-full items-center justify-center">
                  <ChainLogo />
                </div>
                <PostImage imageDetails={comment} />
              </div>
            ) : null;
          })}
      </div>
    </div>
  );
};

export default Chain;
