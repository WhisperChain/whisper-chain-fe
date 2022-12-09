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

  return isLoading ? (
    <SpinningLoader height="80vh" width="100%" />
  ) : (
    <div>
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

        <AddWhisperBtn pageIndex={1} />
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
