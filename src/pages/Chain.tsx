import React from "react";
import styled from "styled-components";
import ChainLogo from "../assets/ChainLogo";
import { PostImage } from "../components/PostImage";
import { getCommentFeed, getPublication } from "../utils/lensFunction";
import AddWhisperBtn from "../components/AddWhisperBtn";
import { convertIntoIpfsUrl } from "../utils/Utils";
import moment from "moment";
import SpinningLoader from "../components/SpinningLoader";

const ChainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MessageBox = styled.div`
  width: 512px;
  height: 251px;
  background: radial-gradient(
    51.4% 51.4% at 48.6% 50%,
    #16082d 0%,
    #100324 100%
  );
  border: 4px solid rgba(111, 26, 255, 0.24);
  backdrop-filter: blur(48px);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 48px;
  box-sizing: border-box;
`;

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
  const [chainData, setChainData] = React.useState<any>();
  const [isLoading, setIsloading] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const pubItem = (await getPublication("0x59cf", 1)).data.publications
        .items[0];
      const pubId = pubItem.id;

      const commentsData = (await getCommentFeed(pubId, 20)).data.publications
        .items;
      const commentArray = [];
      for (let index = 0; index < commentsData.length; index++) {
        const comment = commentsData[index];
        const commentObject = {
          imageUrl: convertIntoIpfsUrl(comment.metadata.media[0].original.url),
          profileHandle: comment.profile.handle,
          name: comment.profile.name,
          createdAt: moment(comment.createdAt).format("h:mm a"),
          lensterProfileUrl: `https://testnet.lenster.xyz/u/${comment.profile.handle}`,
          lensterPostUrl: `https://testnet.lenster.xyz/posts/${comment.id}`,
        };
        commentArray.push(commentObject);
      }
      commentArray.push({
        imageUrl: convertIntoIpfsUrl(pubItem.metadata.media[0].original.url),
        profileHandle: pubItem.profile.handle,
        name: pubItem.profile.name,
        createdAt: moment(pubItem.createdAt).format("h:mm a"),
        lensterProfileUrl: `https://testnet.lenster.xyz/u/${pubItem.profile.handle}`,
        lensterPostUrl: `https://testnet.lenster.xyz/posts/${pubItem.id}`,
      });

      setChainData(commentArray);
      setIsloading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <SpinningLoader height="80vh" width="100%" />
  ) : (
    <ChainContainer>
      <MessageBox>
        <Message>
          <WhiteText>
            This was the last image added to the thread, try to describe this
            image in your own words as best you can, and add your generation to
            this thread.
          </WhiteText>
        </Message>

        <AddWhisperBtn pageIndex={1} />
      </MessageBox>

      {chainData &&
        chainData.map((comment: any, index: any) => {
          return (
            <div key={index}>
              <ChainWrapper>
                <ChainLogo />
              </ChainWrapper>
              <PostImage imageDetails={comment} />
            </div>
          );
        })}
    </ChainContainer>
  );
};

export default Chain;
