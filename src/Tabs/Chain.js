import React from "react";
import ChainLogo from "../assets/ChainLogo";
import { PostImage } from "../components/PostImage";
import { getCommentFeed, getPublication } from "../utils/lensFunction";
import AddWhisperBtn from "../components/AddWhisperBtn";
import ShareBtn from "../components/ShareBtn";
import { convertIntoIpfsUrl, timer } from "../utils/Utils";
import moment from "moment";
import SpinningLoader from "../components/SpinningLoader";
import style from "./Chain.module.css";
import { usePublicationContext } from "../context/PublicationContext";
import { useRouter } from "next/router";
import ViewLensIcon from "../assets/ViewLensIcon";
// import InfoLogo from "../assets/InfoLogo";
// import { Tooltip } from "react-tooltip";
// import "react-tooltip/dist/react-tooltip.css";

const Chain = () => {
  const [chainData, setChainData] = React.useState();
  const [isLoading, setIsloading] = React.useState(false);
  const { publication } = usePublicationContext();
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
  const messageBoxData = {
    onChain: {
      text: 'This was the last image added to the thread, try to describe this image in your own words as best you can, and add your generation to this thread. ',
    },
    OnGenerate: {
      h1: 'Your generation has been successfully added to the chain',
      text: 'To keep it interesting, please wait for another user to add to chain before you can add a whisper again.',
    }
  }

  const routerPath = router.query;
  const [isGenerated, setIsGenerated] = React.useState();

  React.useEffect(() => {
    if (routerPath?.isGenerated == 'true') {
      setIsGenerated(true);
    } else {
      setIsGenerated(false);
    }
  }, [routerPath]);

  const [pubId, setPubId] = React.useState();
  const [hovered, setHovered] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const pubItem =
        Object.keys(publication).length > 0
          ? publication
          : (await getPublication("0x59cf", 1)).data.publications.items[0];
      const pubId = publication?.pubId || pubItem.id;
      setPubId(pubId);
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
          profileId: comment.profile.id,
          isFollowedByMe: comment.profile.isFollowedByMe,
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
        profileId: pubItem.profile.id,
        isFollowedByMe: pubItem.profile.isFollowedByMe,
      });

      setFirstCreatedAt(pubItem.createdAt);
      setChainData(commentArray);
      setIsloading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let viewLensUrl = "https://testnet.lenster.xyz/posts";

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

  const onViewLensHover = () => {
    let viewlensContainer = document.getElementById('viewlensContainer');
    if (viewlensContainer) {
      viewlensContainer.style.left = '-70px';
    }
  }

  const onViewLensHoverOff = () => {
    let viewlensContainer = document.getElementById('viewlensContainer');
    if (viewlensContainer) {
      viewlensContainer.style.left = '0';
    }
  }

  const handleScrollDark = () => {
    let lastImageButton = document.getElementById("lastImage");
    let bottomButton = document.getElementById("gopToTop");
    if (lastImageButton || gopToTopButton) {
      lastImageButton.style.opacity = "1";
      bottomButton.style.opacity = "1"
    }
  };
  const handleScrollLight = () => {
    let lastImageButton = document.getElementById("lastImage");
    let bottomButton = document.getElementById("gopToTop");
    if (lastImageButton || gopToTopButton) {
      lastImageButton.style.opacity = "0";
      bottomButton.style.opacity = "0"
    }
  };



  return isLoading ? (
    <SpinningLoader height="80vh" width="100%" />
  ) : (
    <div>
      <div className="flex justify-between w-full sticky top-[30px] z-[10000]">
        <div
          onClick={() => {
            router.push('/');
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
        <div className="flex flex-col items-center sticky decoration-white">
          <div className="not-italic font-medium text-[16px] leading-[140%] tracking-[-0.03em] text-[#000000] ">
            {moment(firstCreatedAt).format("Do MMMM YYYY")}
          </div>
        </div>
        <div className="relative">
          <span onMouseEnter={() => onViewLensHover()} onMouseLeave={() => onViewLensHoverOff()} id="viewlensContainer" className={`absolute flex ${style.viewOnLensContainer}`}>
            <a href={`${viewLensUrl}/${pubId}`} className="flex" target="_blank">
              <span className="viewOnLens"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                <ViewLensIcon />
              </span>
              <span
                className={`ml-[10px] w-[95px] text-[#a36dff] text-[#00501E] ${style.viewOnLens}`}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >View on lens</span>
            </a>
          </span>
        </div>
      </div>
      <div className="flex justify-center sticky top-[70px] z-[1000]">
        <a
          onClick={() => {
            console.log("clicked");
            window.scrollTo(0, 10000);
          }}
          id="gopToTop"
          className={`rounded-[20px] flex z-[10000] items-center justify-center ${style.bottomButton}`}
        >
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.75 7.5L10.5 13.75L4.25 7.5" stroke="black" stroke-opacity="0.6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span className="ml-[10px]">Go to bottom</span>
        </a>
        <a
          onClick={() => {
            console.log("clicked");
            window.scrollTo(0, 0);
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
              stroke-opacity="0.6"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span className="ml-[10px]">Back to top</span>
        </a>
      </div>
      <div
        className={`overflow-scroll ${style.chainContainer}`}
        ref={buttonRef}
      >
        <div
          className={`w-[512px] h-[222px] flex flex-col items-center rounded-[32px] box-border ${style.messageBox}`}
        >
          <div className=" w-full pt-[38px] px-[40px] pb-[24px]">
            <h1 className={`not-italic text-[16px] leading-[160%] font-bold ${style.messageText}`}>
            {isGenerated ? messageBoxData.OnGenerate.h1 : ''}
            </h1>
            <div className={`not-italic text-[16px] leading-[160%] font-medium ${style.messageText}`}>
              {isGenerated ? messageBoxData.OnGenerate.text : messageBoxData.onChain.text}
            </div>
          </div>
          <div>
            {
              isGenerated ? <AddWhisperBtn pageIndex={1} publication={publication} height={40} width={432} text="Share" /> :
              <ShareBtn pageIndex={1} publication={publication} height={40} width={432} text="Add to Chain" />
            }
          
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
