import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import ReactFullpage from "@fullpage/react-fullpage";

import HomeMessage from "../components/HomeMessage";
import PostImage from "../components/PostImage";
import Link from "../assets/Link";

const Page = styled.div`
  width: 100vw;
`;
const HomeSection = styled.div`
  position: relative;
  display: flex;
`;

const LeftSection = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
`;

const Date = styled.div`
  position: absolute;
  top: 0px;
  height: 22px;
  left: 50%;
  transform: translateX(-50%);
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
  top: 40px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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
  return (
    <Page>
      <Header />
      <HomeSection>
        <LeftSection>
          <ReactFullpage
            debug /* Debug logging */
            licenseKey={"YOUR_KEY_HERE"} // Get one from https://alvarotrigo.com/fullPage/pricing/
            sectionSelector={SECTION_SEL}
            render={(comp) => (
              <ReactFullpage.Wrapper>
                {fullPages.map(({ text }) => (
                  <Posts key={text} className={SEL}>
                    <ImageSlider className="slide">
                      <Date>24th November 2022</Date>
                      <Status>Ended</Status>
                      <PostImage />
                    </ImageSlider>
                  </Posts>
                ))}
              </ReactFullpage.Wrapper>
            )}
          />
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
