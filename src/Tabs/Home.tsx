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

// import required modules
import { Mousewheel, EffectCreative } from "swiper";
import styles from "./Home.module.css";

const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;

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
    <div className="w-full">
      <div id="home-section" className="flex h-[781px] relative">
        <div className="flex flex-col justify-end w-2/4">
          <Swiper
            freeMode
            followFinger
            spaceBetween={50}
            slidesPerView={1}
            direction={"vertical"}
            mousewheel={{
              eventsTarget: "#home-section",
              releaseOnEdges: true,
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
                    <div className={`${SEL} w-full left-[16em] absolute top-0`}>
                      <div className="slide w-full mt-[128px] flex justify-start relative">
                        <div className="absolute top-[-50px] left-[0%]">
                          <div
                            className={`h-[22px] text-[16px] not-italic font-medium leading-[140%] ${styles.Date}`}
                          >
                            {moment(pub?.createdAt).format("Do MMMM YYYY")}
                          </div>
                          {/* <div className={`h-[16px] not-italic font-normal font-[16px] leading-[100%] ${styles.status}`}>
                            {pub?.timeDifference < 24 * 60
                              ? getTimerClock(pub?.timeDifference)
                              : "Ended"}
                          </div> */}
                        </div>

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
        <div className="fixed top-[220px] -translate-x-2/4 right-[0px] z-[2]">
          <div className="fixed top-[-40px] right-[-135px] -translate-x-[70%]">
            <Link />
          </div>
          <HomeMessage publication={publicationData[currentSlideIndex]} />
        </div>
      </div>
    </div>
  );
};

export default Home;
