import React from "react";
import styled from "styled-components";
import ProfileLogo from "../assets/ProfileLogo";
import { useBottomTab } from "../context/BottomTabContext";
import { usePublicationContext } from "../context/PublicationContext";
import { TabItems } from "./Main/TabItems";
import Image from 'next/image';
import styles from "./ImageStack.module.css";
import PlusIcon from "../assets/PlusIcon";
import EyeIcon from "../assets/EyeIcon";

const StackedImages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  height: 572px;
`;

const Backdrop = styled.div`
  width: 512px;
  height: 512px;
  position: absolute;
  background: rgba(255, 255, 255, 0.6);
  z-index: 10;
  backdrop-filter: blur(8px);
  border-radius: 48px;
  cursor: pointer;
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
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #000000;
  font-family: 'Satoshi Variable';
  font-weight: 700;
  font-size: 14px;
  line-height: 100%;
  font-feature-settings: 'tnum' on, 'onum' on, 'salt' on, 'ss01' on, 'ss02' on, 'ss03' on, 'ss04' on, 'ss05' on;
`;

const Handle = styled.div`
  font-style: normal;
  font-weight: 400;
  letter-spacing: -0.03em;
  font-family: 'Satoshi Variable';
  font-size: 14px;
  line-height: 100%;
  font-feature-settings: 'tnum' on, 'onum' on, 'ordn' on, 'salt' on, 'ss01' on, 'ss02' on, 'ss03' on, 'ss04' on, 'ss05' on;
  color: rgba(0, 0, 0, 0.6);
`;


const User = styled.div`
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
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
  gap: 8px;
`;

const ImagesStack = ({ imageDetails: imageDetailsArray, pub }) => {
  const [hovered, setHovered] = React.useState(false);
  const { onTabChange } = useBottomTab();
  const { setPublication } = usePublicationContext();
  const imageDetails = imageDetailsArray[0];
  console.log({ imageDetailsArray });
  return (
    <StackedImages>
      {imageDetails?.imageUrl && (
        <Image
          src={imageDetails.imageUrl}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          alt="Stack Image"
          width={512}
          height={512}
          className="relative flex z-[3] rounded-[48px]"
        />
      )}
      {hovered && (
        <Backdrop
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => {
            setPublication(pub);
            onTabChange(TabItems[1]);
          }}
        >
          <Details>
            <Left>
              <ProfileLogo profileImageUrl={imageDetails?.profileImageUrl} />
              <User>
                <Name>{imageDetails?.name || "Lewis"}</Name>
                <Handle>{"@" + imageDetails?.profileHandle || "Lewis.xyz"}</Handle>
              </User>
            </Left>
            {/* <Right>{imageDetails?.createdAt || "2:32 pm"}</Right> */}
            <button className="flex justify-center items-center gap-[6px] z-20">
              <PlusIcon />
              <div className={`not-italic font-medium text-[16px]  ${styles.FollowBtn}`}>Follow</div>
            </button>
          </Details>
          <Center>
            <a hef="/" className={`flex items-center p-[10px] w-[432px] h-[40px] justify-center  ${styles.viewOnLensBtn}`}> <EyeIcon /> <span className="ml-[10px]">View on lens</span></a>
          </Center>
        </Backdrop>
      )}
      <Image
        width={452}
        height={512}
        className="absolute bottom-[22px] rounded-[48px] flex z-[2]"
        alt="Stack Image 2"
        src={imageDetailsArray[1]?.imageUrl ? imageDetailsArray[1].imageUrl : "https://i.picsum.photos/id/193/512/512.jpg?hmac=ay70CF2_XM0GJBcUQzMN6UNHDn0-kgSIu8KcENreNgM"}
      />

      <Image
        width={404}
        height={512}
        className="absolute bottom-[0px] rounded-[48px] flex z-[1]"
        alt="Stack Image 3"
        src={imageDetailsArray[2]?.imageUrl ? imageDetailsArray[2].imageUrl : "https://i.picsum.photos/id/524/512/512.jpg?hmac=2VlA0x6Y7osphrvDzR52TVkYjcc493rqcizd8HEXphY"}
      />
    </StackedImages>
  );
};

export default ImagesStack;
