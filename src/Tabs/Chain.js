import React from "react";
import styled from "styled-components";
import ChainLogo from "../assets/ChainLogo";
import { PostImage } from "../components/PostImage";
import { getCommentFeed, getPublication } from "../utils/lensFunction";
import AddWhisperBtn from "../components/AddWhisperBtn";
import { convertIntoIpfsUrl, timer } from "../utils/Utils";
import moment from "moment";
import SpinningLoader from "../components/SpinningLoader";
import style from "./Chain.module.css";
import { usePublicationContext } from "../context/PublicationContext";
import InfoLogo from "../assets/InfoLogo";


const Chain = () => {
  const [chainData, setChainData] = React.useState();
  const [isLoading, setIsloading] = React.useState(false);
  const { publication } = usePublicationContext();
  const [firstCreatedAt,setFirstCreatedAt] = React.useState();
  // console.log(firstCreatedAt);
   const [hours, minutes] = timer("2022-12-13");
  

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

  return isLoading ? (
    <SpinningLoader height="80vh" width="100%" />
  ) : (
    <div>
      <div className="flex flex-col items-start absolute left-[10%] decoration-white">
        <div className="h-[22px] not-italic font-extrabold text-[16px] leading-[140%] tracking-wide text-[#dddddd] mb-[7px]">
          {moment(firstCreatedAt).format("Do MMMM YYYY")}
        </div>
        <div className="h-[16px] not-italic font-normal text-[16px] leading-[100%] tracking-wide text-[#dddddd]">
          {(hours+ minutes) < 0
            ? "Ended"
            : 
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center w-[40px] h-[20px] bg-violet-700 rounded-[4.92188px] backdrop-blur-sm font-mono text-[11px] mr-[5px]">{hours} h</div>
              :
              <div className="flex justify-center items-center w-[40px] h-[20px] bg-violet-700 rounded-[4.92188px] backdrop-blur-sm font-mono text-[11px] mx-[5px]">{minutes} m</div>
              <InfoLogo />
            </div>
          }
        </div>
      </div>
      <div
        className={`w-[512px] h-[251px] flex flex-col items-center rounded-[48px] ${style.messageBox}`}
      >
        <div className="flex flex-col w-[409px] mt-[40px]">
          <div className="not-italic text-[#e7d9ff] text-[16px] leading-[150%] font-normal">
            This was the last image added to the thread, try to describe this
            image in your own words as best you can, and add your generation to
            this thread.
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
  );
};

export default Chain;
