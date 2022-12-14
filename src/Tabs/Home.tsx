import React from "react";
import styled from "styled-components";

import HomeMessage from "../components/HomeMessage";
import ImagesStack from "../components/ImagesStack";
import Link from "../assets/Link";
import { getLastCommentsOfPosts } from "../utils/lensFunction";
import SpinningLoader from "../components/SpinningLoader";
import moment from "moment";
import { getTimerClock } from "../utils/Utils";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";

// import required modules
import { Mousewheel, EffectCreative } from "swiper";

const Page = styled.div`
  width: 100%;
`;
const HomeSection = styled.div`
  position: relative;
  display: flex;
`;

const LeftSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const RightSection = styled.div`
  position: fixed;
  top: 220px;
  right: 0;
  transform: translateX(-50%);
  z-index: 2;
`;
const LinkWrapper = styled.div`
  position: fixed;
  top: -40px;
  right: -135px;
  transform: translateX(-70%);
`;
const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;

const Posts = styled.div`
  width: 100%;
  left: 16em;
  position: absolute;
  top: 0;
`;

const ImageSlider = styled.div`
  width: 100%;
  margin-top: 128px;
  display: flex;
  justify-content: flex-start;
  position: relative;
`;

const PostDetail = styled.div`
  position: absolute;
  top: -50px;
  left: 0%;
  // transform: translateX(-50%);
`;

const Date = styled.div`
  height: 22px;
  font-size: 16px;
  line-height: 140%;
  letter-spacing: -0.03em;
  color: rgba(0, 0, 0, 0.8);
  font-family: 'Satoshi Variable';
  font-style: normal;
  font-weight: 500;
  font-feature-settings: 'pnum' on, 'onum' on, 'zero' on, 'salt' on, 'ss01' on, 'ss02' on, 'ss03' on, 'ss05' on, 'ss04' on;
`;

const Status = styled.div`
  height: 16px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -0.03em;
  color: rgba(0, 0, 0, 0.8);;
`;

const Home = () => {
  const [publicationData, setPublicationData] = React.useState<any>([]);
  const [isLoading, setIsloading] = React.useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      setIsloading(true);
      const data = await getLastCommentsOfPosts("0x59cf");
      setPublicationData(data);
      setIsloading(false);
    }
    fetchData();
  }, []);

  return isLoading ? (
    <SpinningLoader height="80vh" width="80%" />
  ) : (
    <Page>
      <HomeSection id="home-section" className="h-[781px]">
        <LeftSection>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            direction={"vertical"}
            mousewheel={{
              eventsTarget: "#home-section",
            }}
            effect={"creative"}
            creativeEffect={{
              prev: {
                translate: [0, "-100%", 0],
              },
              next: {
                translate: [0, "100%", 0],
              },
            }}
            modules={[Mousewheel, EffectCreative]}
            onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
          >
            {publicationData &&
              publicationData.map(
                (
                  pub: {
                    pubId: any;
                    comments: { imageUrl: any }[];
                    createdAt: any;
                    timeDifference: any;
                    metadata: any;
                  },
                  index: any
                ) => (
                  <SwiperSlide key={pub?.pubId + index}>
                    <Posts className={SEL}>
                      <ImageSlider className="slide">
                        <PostDetail>
                          <Date>
                            {moment(pub?.createdAt).format("Do MMMM YYYY")}
                          </Date>
                          {/* <Status>
                            {pub?.timeDifference < 24 * 60
                              ? getTimerClock(pub?.timeDifference)
                              : "Ended"}
                          </Status> */}
                        </PostDetail>

                        {pub?.comments[0] ? (
                          <ImagesStack
                            imageDetails={pub?.comments}
                            pub={pub}
                          />
                        ) : null}
                      </ImageSlider>
                    </Posts>
                  </SwiperSlide>
                )
              )}
          </Swiper>
        </LeftSection>
        <RightSection>
          <LinkWrapper>
            <Link />
          </LinkWrapper>
          <HomeMessage
            publication={publicationData[currentSlideIndex]}
            currentSlideIndex={currentSlideIndex}
          />
        </RightSection>
      </HomeSection>
    </Page>
  );
};

export default Home;
