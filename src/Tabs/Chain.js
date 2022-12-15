import React from "react";
import ChainLogo from "../assets/ChainLogo";
import ViewOnLensLogo from "../assets/ViewOnLensLogo";
import { PostImage } from "../components/PostImage";
import { getCommentFeed, getPublication } from "../utils/lensFunction";
import AddWhisperBtn from "../components/AddWhisperBtn";
import { convertIntoIpfsUrl, timer } from "../utils/Utils";
import moment from "moment";
import SpinningLoader from "../components/SpinningLoader";
import style from "./Chain.module.css";
import { usePublicationContext } from "../context/PublicationContext";
import { useBottomTab } from "../context/BottomTabContext";
import { useRouter } from "next/router";
// import InfoLogo from "../assets/InfoLogo";
// import { Tooltip } from "react-tooltip";
// import "react-tooltip/dist/react-tooltip.css";

const Chain = () => {
  const [chainData, setChainData] = React.useState();
  const [isLoading, setIsloading] = React.useState(false);
  const { publication } = usePublicationContext();
  const { onTabChange } = useBottomTab();
  const router = useRouter();
  const [firstCreatedAt, setFirstCreatedAt] = React.useState();
  const [infoContainer, setInfoConatiner] = React.useState(true);
  // console.log(firstCreatedAt);
  const [hours, minutes] = timer("2022-12-14");
  // const handleInfoHover = (hoverstate) => {
  //   if(hoverstate){
  //     return setInfoConatiner(true);
  //   }
  //   else{
  //     return setInfoConatiner(false);
  //   }
  // }

  React.useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const pubItem =
        Object.keys(publication).length > 0
          ? publication
          : (await getPublication("0x59cf", 1)).data.publications.items[0];
      const pubId = publication?.pubId || pubItem.id;

      const commentsData = (await getCommentFeed(pubId, 20)).data.publications
        .items;
      const commentArray = [];
      for (let index = 0; index < commentsData.length; index++) {
        const comment = commentsData[index];
        const commentObject = {
          imageUrl: comment.metadata.media[0]?.original?.url
            ? convertIntoIpfsUrl(comment.metadata.media[0]?.original?.url)
            : null,
          profileHandle: comment.profile.handle,
          name: comment.profile.name,
          createdAt: moment(comment.createdAt).format("h:mm a") || "",
          profileImageUrl: comment.profile.picture
            ? convertIntoIpfsUrl(comment.profile.picture?.original?.url)
            : `https://cdn.stamp.fyi/avatar/eth:${comment.profile.ownedBy}?s=250`,
          lensterProfileUrl: `https://testnet.lenster.xyz/u/${comment.profile.handle}`,
          lensterPostUrl: `https://testnet.lenster.xyz/posts/${comment.id}`,
        };
        commentArray.push(commentObject);
      }
      commentArray.push({
        imageUrl: pubItem.metadata.media[0]?.original?.url
          ? convertIntoIpfsUrl(pubItem.metadata.media[0]?.original?.url)
          : null,
        profileHandle: pubItem.profile.handle,
        name: pubItem.profile.name,
        createdAt: moment(pubItem?.createdAt)?.format("h:mm a") || "00:00 am",
        profileImageUrl: pubItem.profile.picture
          ? convertIntoIpfsUrl(pubItem.profile.picture?.original?.url)
          : `https://cdn.stamp.fyi/avatar/eth:${pubItem.profile.ownedBy}?s=250`,
        lensterProfileUrl: `https://testnet.lenster.xyz/u/${pubItem.profile.handle}`,
        lensterPostUrl: `https://testnet.lenster.xyz/posts/${pubItem.id}`,
      });

      setFirstCreatedAt(pubItem.createdAt);
      setChainData(commentArray);
      setIsloading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buttonRef = React.useRef();
  React.useEffect(() => {
    const onScroll = () => {
      let dContainer = buttonRef.current;
      if (dContainer) {
        let rect = dContainer.getBoundingClientRect();
        console.log(rect.top);
        if (rect.top < 0) {
          handleScrollDark();
        } else {
          handleScrollLight();
        }
      }
    };
    window.addEventListener("scroll", onScroll);
  }, [buttonRef]);

  const handleScrollDark = () => {
    let lastImageButton = document.getElementById("lastImage");
    if (lastImageButton) {
      lastImageButton.style.opacity = "1";
    }
  };
  const handleScrollLight = () => {
    let lastImageButton = document.getElementById("lastImage");
    if (lastImageButton) {
      lastImageButton.style.opacity = "0";
    }
  };

  return isLoading ? (
    <SpinningLoader height="80vh" width="100%" />
  ) : (
    <div>
      <div>
        <div className="flex flex-col w-full mb-[0px] sticky top-[10px] z-[1000]">
          <div
            onClick={() => {
              router.push("/");
            }}
            className="flex flex-row items-start not-italic font-medium text-[16px] leading-[140%] text-center text-[#0000003C] mb-[55px] cursor-pointer"
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
                stroke-opacity="0.6"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.75 4.375L3.125 10L8.75 15.625"
                stroke="black"
                stroke-opacity="0.6"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="ml-[12px]">Back</span>
          </div>
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col items-center sticky decoration-white">
              <div className="not-italic font-medium text-[16px] leading-[140%] tracking-[-0.03em] text-[#000000] ">
                {moment(firstCreatedAt).format("Do MMMM YYYY")}
              </div>
              {/*
  <div className="flex justify-center items-center h-[16px] not-italic font-normal text-[16px] leading-[100%] tracking-wide text-[#dddddd]">
            {hours + minutes < 0 ? (
              "Ended"
            ) : (
              <div className="flex justify-center items-center">
                <div
                  className={`flex justify-center items-center w-[40px] h-[20px] bg-[#6F1AFF] rounded-[4.92188px] backdrop-blur-sm ${style.timerText} text-[11px] mr-[5px]`}
                >
                  {hours} h
                </div>
                :
                <div
                  className={`flex justify-center items-center w-[40px] h-[20px] bg-[#6F1AFF] rounded-[4.92188px] backdrop-blur-sm ${style.timerText} text-[11px] mx-[5px]`}
                >
                  {minutes} m
                </div>
              </div>
            )}
            <div id="custom-inline-styles">
              <InfoLogo />
            </div>
            <Tooltip
              anchorId="custom-inline-styles"
              events={["hover"]}
              style={{
                display: "flex",
                position: "relative",
                backgroundColor: "rgba(19, 9, 36, 0.5)",
                color: "#222",
                alignItems: "flex-start",
                backdropFilter: "blur(12px)",
                width: "343px",
                height: "120px",
                zIndex: 10,
                gap: "16px",
                padding: "12px",
                borderRadius: "24px",
                top: "43px",
                left: "-19px",
              }}
              // className="flex items-start z-10 p-[12px] gap-[16px] relative w-fit h-[120px] rounded-[24px] backdrop-blur-sm left-[-16px] top-[41px]"
              content={
                <div className="flex items-start z-10 p-[12px] gap-[16px] relative decoration-white ">
                  <InfoLogo />
                  <p>
                    Proceeds from all collects, within 24 hours from the
                    begining, will be distributed equally to all the
                    participants of this chain.
                  </p>
                </div>
              }
            />
          </div> */}
            </div>
            <a
              onClick={() => {
                console.log("clicked");
                window.scrollTo(0, 0);
              }}
              id="lastImage"
              className={`rounded-[20px] flex z-[10000] items-center justify-center ${style.lastImageButton}`}
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
                  stroke-opacity="0.6"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="ml-[10px]">Back to top</span>
            </a>
            <div>
              <ViewOnLensLogo />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center overflow-scroll">
          <div
            className={`w-[512px] h-[251px] flex flex-col items-center rounded-[48px] ${style.messageBox}`}
            ref={buttonRef}
          >
            <div className="flex flex-col w-[409px] mt-[40px]">
              <div className="not-italic text-[#e7d9ff] text-[16px] leading-[150%] font-normal">
                This was the last image added to the thread, try to describe
                this image in your own words as best you can, and add your
                generation to this thread.
              </div>
            </div>

            <AddWhisperBtn pageIndex={1} publication={publication} />
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
    </div>
  );
};

export default Chain;
