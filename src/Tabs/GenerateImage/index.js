import React from "react";
import { usePublicationContext } from "../../context/PublicationContext";
import { getCommentFeed, getPublication } from "../../utils/lensFunction";
import {
  convertIntoIpfsUrl,
  getIpfsUrlandUploadPublication,
  getImagesFromPrompt,
  postWhisperResponse,
} from "../../utils/Utils";
import { FILTER_OPTIONS } from "./filterDropdownOptions";

import styles from "./generateImage.module.css";
import MagicStickIcon from "../../assets/MagicStickIcon";
import WhisperImage from "../../components/WhisperImage";
import GeneratedImageBox from "../../components/GeneratedImageBox";
import { useRouter } from "next/router";

function Generate() {
  const { publication } = usePublicationContext();
  const router = useRouter();
  const [promptText, setPromptText] = React.useState("");
  const [urls, setUrls] = React.useState([]);
  const [pubsId, setPubsId] = React.useState();
  const [isLoading, setIsloading] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState(
    FILTER_OPTIONS[0].value
  );

  const [previousImageUrl, setPreviousImageUrl] = React.useState();
  React.useEffect(() => {
    const fetchData = async () => {
      const pub = (await getPublication("0x59cf", 1)).data.publications
        .items[0];
      const pubId = pub.id;

      const comment = await (
        await getCommentFeed(pubId, 1)
      ).data.publications.items[0];
      setPubsId(pubId);
      setPreviousImageUrl(
        convertIntoIpfsUrl(
          comment.metadata.media[0].original.url ??
          pub.metadata.media[0].original.url
        )
      );
    };
    if (publication?.pubId) {
      setPubsId(publication?.pubId);
      setPreviousImageUrl(publication?.comments?.[0].imageUrl);
    } else {
      fetchData();
    }
  }, []);

  const onImageClickHandler = async (url) => {
    setIsloading(true);
    const txHash = await getIpfsUrlandUploadPublication(url, pubsId, true);
    console.log({ txHash });
    await postWhisperResponse(url, txHash);
    setIsloading(false);
    router.push("/chain");
  };

  const generateImageClickHandler = async () => {
    if (urls.length < 5) {
      setUrls([1, ...urls]);
      setIsloading(true);
      const response = await getImagesFromPrompt(promptText, selectedFilter);
      const suggestionIds = response.suggestions_ids;
      const suggestions = response.suggestions;
      const images = [];
      {
        suggestionIds.map((id) => {
          const suggestion = suggestions[id];
          images.push(suggestion?.image_url);
        });
      }
      const newUrls = [images, ...urls];

      setUrls(newUrls);
      setIsloading(false);
    }
  };

  return (
    <div className="w-full mt-[20px]">
      <div className="flex gap-[16px] justify-center items-center">
        {/* Sidebar */}
        <div className={styles.sidebarContainer}>
          {/* Previos Whisper Image */}
          <div className="w-full">
            <div className="flex flex-col mb-[8px]">
              <div className={styles.mainText}>Last whisper of {`December 13th`} chain</div>
              <div className={styles.subText}>
                Try to describe this whisper as best you can.
              </div>
            </div>
            <div className="w-[256px] h-[256px]">
              <WhisperImage
                imgSrcUrl={previousImageUrl}
                width={256}
                height={256}
                priority={true}
                alt="Whisper Image"
                classes="rounded-[8px]"
              />
            </div>
          </div>
          {/* Generate Image form (prompt and filter option) */}
          <div className="w-full">
            <div className="flex flex-col items-start p-0 gap-[8px] w-auto">
              <div className={styles.mainText}>Enter prompt</div>
              <textarea
                className={`${styles.promptInput} text-sm shadow-sm placeholder-[#1d0545b8]
                  focus:outline-none focus:border-[#6f1aff3d] focus:ring-1 focus:ring-[#6f1aff3d]
                `}
                placeholder="Enter your prompt here to generate your very own whisper"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
              ></textarea>
            </div>
          </div>
          {/* Select filter option */}
          <div className="w-full">
            <div className="box-border">
              <div className={styles.mainText}>Filter</div>
              <div className={`${styles.subText} mb-[8px]`}>
                Select a style to create more refined whispers
              </div>
              <select
                className={styles.selectBoxInput}
                value={selectedFilter}
                onChange={(e) => {
                  setSelectedFilter(e.target.value);
                }}
              >
                {FILTER_OPTIONS.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Generate Image Button */}
          <div className={`w-full absolute bottom-[16px] ${promptText === "" ? 'opacity-50 cursor-not-allowed	pointer-events-none' : ''}`}>
            <div className="flex items-center cursor-pointer"
              onClick={generateImageClickHandler}
            >
              <button className={styles.generateButton}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[5px]">
                    <span className={styles.generateButtonText}>
                      Generate whisper
                    </span>
                    <span className={styles.tryCounts}>
                      &#x2022;
                    </span>
                    <span className={styles.tryCounts}>
                      {5 - urls.length} tries left
                    </span>
                  </div>
                  <div>
                    <MagicStickIcon />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* Image Gallery */}
        <div className={styles.imageGalleryContainer}>
          <div className={styles.galleryMainText}>Your generations</div>
          {
            urls.map((url, index) => (
              <div className={styles.imageTryOutputBox} key={index}>
                <div className="flex items-center justify-center w-full gap-[12px]">
                  <GeneratedImageBox
                    imgSrcUrl={url[0]}
                    clickHandler={onImageClickHandler}
                  />
                  <GeneratedImageBox
                    imgSrcUrl={url[1]}
                    clickHandler={onImageClickHandler}
                  />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Generate;
