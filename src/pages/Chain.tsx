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

const Backdrop = styled.div`
  width: 512px;
  height: 512px;
  position: absolute;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.66) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: 10;
  backdrop-filter: blur(4px);
  border-radius: 48px;
`;

const Image2 = styled.img`
  position: absolute;
  bottom: 32px;
  height: 512px;
  width: 452px;

  display: flex;
  border-radius: 48px;
  z-index: 2;
`;

const Image3 = styled.img`
  position: absolute;
  height: 512px;
  width: 404px;
  bottom: 0px;
  display: flex;
  border-radius: 48px;
  z-index: 1;
`;

const Details = styled.div`
  display: flex;
  position: relative;
  padding: 40px;
`;

const Left = styled.div`
  display: flex;
  width: 360px;
`;

const Name = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  letter-spacing: -0.01em;
  font-feature-settings: "tnum" on, "onum" on, "salt" on, "ss01" on, "ss02" on,
    "ss03" on, "ss04" on, "ss05" on;

  color: #ffffff;
`;

const Handle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  letter-spacing: -0.03em;
  font-feature-settings: "tnum" on, "onum" on, "ordn" on, "salt" on, "ss01" on,
    "ss02" on, "ss03" on, "ss04" on, "ss05" on;

  color: #ffffff;
`;

const Right = styled.div`
  display: flex;
  color: #ffffff;
`;

const User = styled.div`
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
      const pubId = (await getPublication("0x5285", 1)).data.publications
        .items[0].id;

      const commentsData = (await getCommentFeed(pubId, 10)).data.publications
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
