import React from "react";

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
import "swiper/css/effect-creative"


// import required modules
import { Mousewheel, EffectCreative } from "swiper";
import styles from "./Home.module.css";

const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;

const Home = () => {
  const [publicationData, setPublicationData] = React.useState([]);
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
    <SpinningLoader height="80vh" width="100%" />
  ) : (
    <div className="w-full">
      <div className="flex h-[780px] relative w-fit gap-[40px] m-auto tablet:h-[650px] tablet:gap-0">
        <div className="flex w-full	flex-col items-center justify-center">
          <div className="w-[512px] h-fit mt-[calc(100vh-512px)] tablet:mt-[calc(100vh-404px)]">
            <div className="absolute top-[10%] left-[0%]">
              <div
                className={`h-[22px] text-[16px] not-italic font-medium leading-[140%] ${styles.Date}`}
              >
                {moment(publicationData[currentSlideIndex]?.createdAt).format("Do MMMM YYYY")}
              </div>
            </div>
            <Swiper
              freeMode
              followFinger
              spaceBetween={1}
              slidesPerView="auto"
              direction={"vertical"}
              mousewheel={{
                eventsTarget: "#home-section",
                releaseOnEdges: true,
                sensitivity: 0.5,
                thresholdDelta: 10,
                thresholdTime: 1000
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
                    pub,
                    index
                  ) => (
                    <SwiperSlide key={pub?.pubId + index}>
                      <div className={`${SEL} absolute top-0`}>
                        <div className="slide w-full flex justify-start relative">
                          {pub?.comments[0] ? (
                            <ImagesStack imageDetails={pub?.comments} pub={pub} />
                          ) : null}
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                )}
            </Swiper>
          </div>
        </div>
        <div className="w-full flex items-center justify-center	right-[0px] z-[2]">
          <div className="absolute left-[calc(50%-296px)] top-[12%] tablet:top-[13%]">
            <Link />
          </div>
          <HomeMessage publication={publicationData[currentSlideIndex]} />
        </div>
      </div>
    </div>
  );
};

export default Home;
