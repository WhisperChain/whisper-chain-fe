import React from "react";
import ChainLogo from "../assets/ChainLogo";
import { PostImage } from "../components/PostImage";
import AddWhisperBtn from "../components/AddWhisperBtn";
import ShareBtn from "../components/ShareBtn";
import { timer } from "../utils/Utils";
import moment from "moment";
import SpinningLoader from "../components/SpinningLoader";
import style from "./Chain.module.css";
import { useRouter } from "next/router";
import ViewLensIcon from "../assets/ViewLensIcon";
import { getChainWhispersData } from "../utils/ViewData";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowLeft from "../assets/ArrowLeft";

const PAGE_LIMIT = 2;

const Chain = () => {
  const [chainData, setChainData] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(true);
  const router = useRouter();
  const [firstCreatedAt, setFirstCreatedAt] = React.useState();
  const [infoContainer, setInfoConatiner] = React.useState(true);
  const [hours, minutes] = timer("2022-12-14");
  const [hoverBackBtn, setHoverBackBtn] = React.useState(false);
  const messageBoxData = {
    onChain: {
      text: "This was the last image added to the thread, try to describe this image in your own words as best you can, and add your generation to this thread. ",
    },
    OnGenerate: {
      h1: "Your generation has been successfully added to the chain",
      text: "To keep it interesting, please wait for another user to add to chain before you can add a whisper again.",
    },
  };
  const [publication, setPublication] = React.useState();

  const routerPath = router.query;
  const [isGenerated, setIsGenerated] = React.useState();
  const [chainId, setChainId] = React.useState();
  const [hasMore, setHasMore] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const paginationParams = React.useRef({
    page: 1,
    limit: PAGE_LIMIT,
  });

  React.useEffect(() => {
    setChainId(routerPath.chainId);

    if (routerPath?.isGenerated == "true") {
      setIsGenerated(true);
    } else {
      setIsGenerated(false);
    }
  }, [routerPath]);

  const fetchData = async (chainId, paginationParams) => {
    const { pubItem, commentArray, hasMore } = await getChainWhispersData(
      chainId,
      paginationParams
    );
    setFirstCreatedAt(pubItem.createdAt);
    setHasMore(hasMore);
    setPublication(pubItem);
    setChainData([...chainData, ...commentArray]);
  };

  React.useEffect(() => {
    if (chainId) {
      fetchData(chainId, paginationParams.current);
      setIsloading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  let viewLensUrl = "https://testnet.lenster.xyz/posts";

  const buttonRef = React.useRef();
  let dContainer = buttonRef.current;
  const onScroll = () => {
    console.log(buttonRef.current?.scrollTop)
    if (buttonRef.current?.scrollTop > 100) {
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
      viewlensContainer.style.left = "0px";
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

  const fetchNextData = () => {
     paginationParams.current = {
      page: paginationParams.current.page + 1,
      limit: PAGE_LIMIT,
    };
    fetchData(chainId, paginationParams.current);
  };

  return isLoading ? (
    <SpinningLoader height="80vh" width="100%" />
  ) : (
    <div className="w-fit m-auto h-[calc(100vh-160px)]">
      <div className="flex justify-between items-center h-[50px]">
        <div
          onClick={() => {
            router.push("/");
          }}
          className={`flex flex-row items-center justify-center not-italic font-medium text-[16px] leading-[140%] cursor-pointer text-[#000000] opacity-60 hover:opacity-80`}
          onMouseEnter={() => setHoverBackBtn(true)}
          onMouseLeave={() => setHoverBackBtn(false)}
        >
          <ArrowLeft hoverBackBtn={hoverBackBtn} />
          <span className="ml-[6px]">Back</span>
        </div>
        <div className="flex flex-col items-center sticky ml-[-32px] decoration-white">
          <div className="not-italic font-medium text-[16px] leading-[140%] tracking-[-0.03em] text-[#000000] opacity-80">
            {moment(firstCreatedAt).format("Do MMMM YYYY")}
          </div>
        </div>
        <div className="relative h-[20px]">
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
                className="relative ml-[-20px]"
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

      <InfiniteScroll
        dataLength={chainData?.length}
        next={fetchNextData}
        hasMore={hasMore}
        loader={<SpinningLoader height="100px" width="100%" />}
        height={"calc(100vh - 190px)"}
        endMessage={<div></div>}
      >
        <div
          id="demmoId"
          className={style.chainContainer}
          ref={buttonRef}
          onScroll={onScroll}
        >

          <div className="flex justify-center sticky top-[5px] z-[1000]">
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
            chainData.map((comment) => {
              return comment.imageUrl ? (
                <div key={comment.id}>
                  <div className="flex w-full items-center justify-center">
                    <ChainLogo />
                  </div>
                  <PostImage imageDetails={comment} />
                </div>
              ) : null;
            })}

        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Chain;
