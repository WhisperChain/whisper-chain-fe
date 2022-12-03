import React from "react";
import styled from "styled-components";
import ReactFullpage from "@fullpage/react-fullpage";

import HomeMessage from "../components/HomeMessage";
import ImagesStack from "../components/ImagesStack";
import Link from "../assets/Link";
import { getLastCommentsOfPosts } from "../utils/lensFunction";

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
`;
const LinkWrapper = styled.div`
  position: fixed;
  top: -40px;
  right: 0;
  transform: translateX(-70%);
`;
const SEL = "custom-section";
const SECTION_SEL = `.${SEL}`;

const Posts = styled.div`
  width: 100%;
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
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 140%;
  /* or 22px */

  letter-spacing: -0.03em;
  color: #dddddd;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Status = styled.div`
  height: 16px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -0.03em;
  color: #dddddd;
`;

const Home = () => {
  const [fullPages, setFullPages] = React.useState([
    {
      text: "Section 1",
    },
    {
      text: "Section 2",
    },
    {
      text: "Section 3",
    },
  ]);

  const [publicationData, setPublicationData] = React.useState<any>([]);

  React.useEffect(() => {
    async function fetchData() {
      const data = await getLastCommentsOfPosts("0x5285");
      console.log("Useeffect", data);
      setPublicationData(data);
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    console.log("Useeffect Data", publicationData.length);
  }, [publicationData]);

  return (
    <Page>
      <HomeSection>
        <LeftSection>
          {publicationData.length > 0 && (
            <ReactFullpage
              licenseKey={"YOUR_KEY_HERE"} // Get one from https://alvarotrigo.com/fullPage/pricing/
              sectionSelector={SECTION_SEL}
              render={(comp) => (
                <ReactFullpage.Wrapper>
                  {console.log("Render")}
                  {publicationData.map(
                    (
                      pub: { pubId: any; comments: { imageUrl: any }[] },
                      index: any
                    ) => (
                      <Posts key={pub?.pubId + index} className={SEL}>
                        <ImageSlider className="slide">
                          <PostDetail>
                            <Date>24th November 2022</Date>
                            <Status>Ended</Status>
                          </PostDetail>
                          <ImagesStack imageSrc={pub?.comments[0]?.imageUrl} />
                        </ImageSlider>
                      </Posts>
                    )
                  )}
                </ReactFullpage.Wrapper>
              )}
            />
          )}
        </LeftSection>
        <RightSection>
          <LinkWrapper>
            <Link />
          </LinkWrapper>
          <HomeMessage />
        </RightSection>
      </HomeSection>
    </Page>
  );
};

export default Home;
