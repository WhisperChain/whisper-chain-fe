import React from "react";
import styled from "styled-components";
import ChainLogo from "../assets/ChainLogo";
import { PostImage } from "../components/PostImage";
import { getCommentFeed, getPublication } from "../utils/lensFunction";
import AddWhisperBtn from "../components/AddWhisperBtn";
import { convertIntoIpfsUrl } from "../utils/Utils";
import moment from "moment";
import SpinningLoader from "../components/SpinningLoader";
import style from "./Chain.module.css";
import { usePublicationContext } from "../context/PublicationContext";

const Message = styled.div`
  width: 409px;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const WhiteText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #e7d9ff;
`;

const ChainWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Chain = () => {
  const [chainData, setChainData] = React.useState();
  const [isLoading, setIsloading] = React.useState(false);
  const { publication } = usePublicationContext();

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
        if (rect.top == 10) {
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
  }
  const handleScrollLight = () => {
    let lastImageButton = document.getElementById("lastImage");
    if (lastImageButton) {
      lastImageButton.style.opacity = "0.4";
    }
  }

  return isLoading ? (
    <SpinningLoader height="80vh" width="100%" />
  ) : (
    <div>
      <div className="flex justify-center my-[30px] sticky top-[10px] z-[99]">
        <a href="#Header" id="lastImage" className={`rounded-[30px] flex items-center justify-center ${style.lastImageButton}`} ref={buttonRef}>
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7.42401L7 1.42401L13 7.42401" stroke="#FFE11A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span className="ml-[10px]">Go to Last image</span>
        </a>
      </div>
      <div
        className={`w-[512px] h-[251px] flex flex-col items-center rounded-[48px] ${style.messageBox}`}
      >
        <Message>
          <WhiteText>
            This was the last image added to the thread, try to describe this
            image in your own words as best you can, and add your generation to
            this thread.
          </WhiteText>
        </Message>

        <AddWhisperBtn pageIndex={1} publication={publication} />
      </div>
      {chainData &&
        chainData.map((comment, index) => {
          return comment.imageUrl ? (
            <div key={index}>
              <ChainWrapper>
                <ChainLogo />
              </ChainWrapper>
              <PostImage imageDetails={comment} />
            </div>
          ) : null;
        })}
    </div>
  );
};

export default Chain;
