import React from "react";
import styled from "styled-components";
import { getS3UrlfromText } from "../utils/Utils";

const Page = styled.div`
  width: 100%;
`;

const PageLayout = styled.div`
  display: flex;
  gap: 20px;
  color: white;
  height: 100vh;
`;

const SideBar = styled.div`
  width: 344px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px;
  box-sizing: border-box;
`;

const PreviousWhisper = styled.div`
  padding: 0px 16px;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -0.03em;
  color: #ffffff;
  opacity: 0.8;
  margin-bottom: 5px;
`;

const Description = styled.div`
  font-family: "PP Telegraf";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 140%;
  letter-spacing: -0.03em;
  color: #ffffff;
  opacity: 0.5;
`;

const WhisperImage = styled.div`
  width: 256px;
  height: 256px;
  filter: drop-shadow(0px 11.52px 14.4px rgba(25, 30, 0, 0.16))
    drop-shadow(0px 1.44248px 1.8031px rgba(44, 52, 0, 0.08));
`;

const Image = styled.img`
  border-radius: 48px;
  width: 256px;
  height: 256px;
`;

const PromptSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
`;

const Label = styled.div`
  padding: 4px 16px;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -0.03em;
  color: #ffffff;
  opacity: 0.8;
`;

const InputTextArea = styled.input`
  padding: 16px;
  background: rgba(221, 221, 221, 0.1);
  border: 1px solid #000000;
  backdrop-filter: blur(12px);
  border-radius: 20px;
  width: 100%;
  height: 96px;
  color: #ffffff;
`;

const SelectBox = styled.select`
  padding: 16px;
  width: 100%;
  height: 48px;
  background: rgba(221, 221, 221, 0.1);
  backdrop-filter: blur(12px);
  border-radius: 20px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -0.03em;
  color: #ffffff;
  opacity: 0.5;
`;

const FilterSection = styled.div`
  box-sizing: border-box;
`;

const FilterDescription = styled(Description)`
  padding: 4px 16px;
`;

const GenerateBtn = styled.div`
  display: flex;
  align-items: flex-end;
  height: 128px;
  cursor: pointer;
`;

const Button = styled.button`
  width: 320px;
  height: 48px;
  background: radial-gradient(
    107.14% 107.14% at 50% 80.95%,
    #ffe431 0%,
    #ffe11a 100%
  );
  box-shadow: 0px 8px 32px rgba(254, 233, 45, 0.32),
    inset 0px -4px 8px rgba(119, 103, 0, 0.6), inset 0px -8px 16px #ffbe16;
  border-radius: 40px;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.03em;
  color: #353000;
`;

const BtnSpan = styled.span`
  padding-left: 30px;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.03em;
  color: #262200;
  opacity: 0.5;
`;

const ImageGallery = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  gap: 8px;
  background: rgba(111, 26, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 64px 64px 0px 0px;
  overflow: scroll;
`;

const ImageGalleryTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 8px;
  gap: 4px;
  width: 832px;
  height: 43px;
`;

const ImageTryOutputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 8px 0px;
  width: 100%;
  background: radial-gradient(
    51.4% 51.4% at 48.6% 50%,
    #1b1b1b 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  border: 2px dashed rgba(111, 26, 255, 0.5);
  backdrop-filter: blur(49.152px);
  border-radius: 56px;
  margin-bottom: 32px;
`;

const ImageTryOutputTitle = styled(Title)`
  width: 100%;
  text-align: center;
`;

const OutputImageBoxWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const OutputImageBox = styled.div`
  position: relative;
  width: 396px;
  height: 396px;
`;

const OutputImage = styled.img`
  width: 396px;
  height: 396px;
  box-sizing: border-box;
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 56px;
`;

const AddToChainBtnWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  left: calc(50% - 100px);
  z-index: 111;
`;

const AddToChainBtn = styled.div`
  background: radial-gradient(
    107.14% 107.14% at 50% 80.95%,
    #000000 0%,
    #232323 100%
  );
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.32),
    inset 0px -4px 8px rgba(75, 75, 75, 0.6), inset 0px -8px 16px #000000;
  border-radius: 20px;
  width: 204.8px;
  height: 49.15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnText = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 100%;
  text-align: center;
  letter-spacing: -0.03em;
  color: #ffe11a;
  text-shadow: 0px 65.536px 84.992px #000000,
    0px 14.6383px 18.9841px rgba(0, 0, 0, 0.596107),
    0px 4.35821px 5.65205px rgba(0, 0, 0, 0.403893);
`;

const filterOptions = [
  {
    label: "CINEMATIC",
    value:
      "sharp focus, emitting diodes, smoke, artillery, sparks, racks, system unit, motherboard, by pascal blanche rutkowski repin artstation hyperrealism painting concept art of detailed character design matte painting, 4 k resolution blade runner",
  },
  {
    label: "LUSH ILLUMINATION",
    value:
      "unreal engine, greg rutkowski, loish, rhads, beeple, makoto shinkai and lois van baarle, ilya kuvshinov, rossdraws, tom bagshaw, alphonse mucha, global illumination, detailed and intricate environment",
  },
  {
    label: "ROYALISTIC",
    value:
      "epic royal background, big royal uncropped crown, royal jewelry, robotic, nature, full shot, symmetrical, Greg Rutkowski, Charlie Bowater, Beeple, Unreal 5, hyperrealistic, dynamic lighting, fantasy art",
  },
  {
    label: "RADIANT SYMMETRY",
    value:
      "centered, symmetry, painted, intricate, volumetric lighting, beautiful, rich deep colors masterpiece, sharp focus, ultra detailed, in the style of dan mumford and marc simonetti, astrophotography",
  },
  {
    label: "MASTERPIECE",
    value:
      "sf, intricate artwork masterpiece, ominous, matte painting movie poster, golden ratio, trending on cgsociety, intricate, epic, trending on artstation, by artgerm, h. r. giger and beksinski, highly detailed, vibrant, production cinematic character render, ultra high quality model",
  },
];

function Generate() {
  const [promptText, setPromptText] = React.useState("");
  const [urls, setUrls] = React.useState<any>([]);
  const [selectedFilter, setSelectedFilter] = React.useState(
    filterOptions[0].value
  );
  console.log({ urls });
  return (
    <Page>
      <PageLayout>
        <SideBar>
          <PreviousWhisper>
            <Summary>
              <Title>Previous whisper</Title>
              <Description>
                This was the last whisper added to the chain, try to describe
                this whisper as best you can.
              </Description>
            </Summary>
            <WhisperImage>
              <Image
                src="https://static.plgworks.com/assets/images/hon/vespa.jpg"
                alt="Whisper Image"
              />
            </WhisperImage>
          </PreviousWhisper>
          <PromptSection>
            <Label>Enter prompt</Label>
            <InputTextArea
              placeholder="Enter your prompt here to generate your very own whisper"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
            ></InputTextArea>
          </PromptSection>
          <FilterSection>
            <Label>Filter</Label>
            <FilterDescription>
              Select different styles that you can apply to your whisper
            </FilterDescription>
            <SelectBox
              value={selectedFilter}
              onChange={(e) => {
                setSelectedFilter(e.target.value);
              }}
            >
              {filterOptions.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </SelectBox>
          </FilterSection>
          <GenerateBtn
            onClick={async () => {
              const images = await getS3UrlfromText(promptText, selectedFilter);

              setUrls(urls.push(images));
            }}
          >
            <Button>
              Generate
              <BtnSpan> {5 - urls.length} tries left </BtnSpan>
            </Button>
          </GenerateBtn>
        </SideBar>
        <ImageGallery>
          <ImageGalleryTitleBox>
            <Title>Your generations</Title>
            <Description>
              To add a whisper to the chain, hover over it.
            </Description>
          </ImageGalleryTitleBox>
          {urls.map((url: any, index: any) => (
            <ImageTryOutputBox key={url[0] + index}>
              <ImageTryOutputTitle>Try {index}</ImageTryOutputTitle>
              <OutputImageBoxWrapper>
                <OutputImageBox>
                  <OutputImage src={url[0]} alt="Whisper Image" />
                  <AddToChainBtnWrapper>
                    <AddToChainBtn>
                      <BtnText>+ Add to chain</BtnText>
                    </AddToChainBtn>
                  </AddToChainBtnWrapper>
                </OutputImageBox>
                <OutputImageBox>
                  <OutputImage src={url[1]} alt="Whisper Image" />
                  <AddToChainBtnWrapper>
                    <AddToChainBtn>
                      <BtnText> + Add to chain</BtnText>
                    </AddToChainBtn>
                  </AddToChainBtnWrapper>
                </OutputImageBox>
              </OutputImageBoxWrapper>
            </ImageTryOutputBox>
          ))}
        </ImageGallery>
      </PageLayout>
    </Page>
  );
}

export default Generate;
