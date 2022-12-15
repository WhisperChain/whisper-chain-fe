import React from "react";
import styled from "styled-components";
import ProfileLogo from "../assets/ProfileLogo";
import Image from 'next/image';
import styles from "./ImageStack.module.css";
import PlusIcon from "../assets/PlusIcon";
import EyeIcon from "../assets/EyeIcon";
import CollectIcon from "../assets/collectIcon";

const ImagePost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const Backdrop = styled.div`
  width: 512px;
  height: 512px;
  position: absolute;
  top: 0;
  left: 0;
  // transform: translate(50%, 50%);
  background: rgba(255, 255, 255, 0.6);
  z-index: 10;
  backdrop-filter: blur(4px);
  border-radius: 48px;
`;

const Details = styled.div`
  display: flex;
  position: relative;
  padding: 40px;
`;

const Left = styled.div`
  display: flex;
  width: 360px;
  cursor: pointer;
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

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #6F1AFF;
  font-family: 'Satoshi Variable';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.03em;
  color: #6F1AFF;
  gap: 18px;
`;

export const PostImage = ({ imageDetails }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <ImagePost>
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
        <Backdrop
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => {
            window.open(imageDetails.lensterPostUrl, "_blank");
          }}
        >
          <Details>
            <Left
              onClick={() => {
                window.open(imageDetails.lensterProfileUrl, "_blank");
              }}
            >
              <ProfileLogo profileImageUrl={imageDetails.profileImageUrl} />
              <User>
                <Name>{imageDetails.name || "Lewis"}</Name>
                <Handle>{imageDetails.profileHandle || "Lewis.xyz"}</Handle>
              </User>
            </Left>
            <Right>
              <button className="flex justify-center items-center gap-[6px] z-20">
                <PlusIcon />
                <div className={`not-italic font-medium text-[16px]  ${styles.FollowBtn}`}>Follow</div>
              </button>
            </Right>
          </Details>
          <Center>
            <a hef="/" className={`flex items-center p-[10px] w-[208px] h-[40px] justify-center  ${styles.viewOnLensBtn}`}> <EyeIcon /> <span className="ml-[10px]">View on lens</span></a>
            <a href="" className={`flex items-center p-[10px] w-[208px] h-[40px] justify-center  ${styles.viewOnLensBtn}`}> <CollectIcon /> <span className="ml-[10px]">Collect this post</span></a>
          </Center>
        </Backdrop>
      )}
    </ImagePost>
  );
};
