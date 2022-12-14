import React from "react";
import SpinningLoader from "../../components/SpinningLoader";
import { usePublicationContext } from "../../context/PublicationContext";
import { getCommentFeed, getPublication } from "../../utils/lensFunction";
import {
  convertIntoIpfsUrl,
  getIpfsUrlandUploadPublication,
  getS3UrlfromText,
} from "../../utils/Utils";
import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems } from "../../components/Main/TabItems";
import Image from "next/image";
import { FILTER_OPTIONS } from "./filterDropdownOptions";

import styles from "./generateImage.module.css";
import MagicStickIcon from "../../assets/MagicStickIcon";
import WhisperImage from "../../components/WhisperImage";
import GeneratedImageBox from "../../components/GeneratedImageBox";

function Generate() {
  const { publication } = usePublicationContext();
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

  const pageIndex = 2;
  const { onTabChange } = useBottomTab();

  const onImageClickHandler = async () => {
    setIsloading(true);
    await getIpfsUrlandUploadPublication(
      url[0],
      pubsId,
      true
    );
    setIsloading(false);
    onTabChange(TabItems[pageIndex]);
  }

  return (
    <div className="w-full h-[90vh]">
      <div className="flex gap-[16px] justify-center items-center">
        {/* Sidebar */}
        <div className={styles.sidebarContainer}>
          {/* Previos Whisper Image */}
          <div className="w-full">
            <div className="flex flex-col mb-[8px]">
              <div className={styles.mainText}>
                Previous whisper
              </div>
              <div className={styles.subText}>
                This was the last whisper added to the chain, try to describe
                this whisper as best you can.
              </div>
            </div>
            <WhisperImage
              imgSrcUrl={previousImageUrl}
              width={256}
              height={256}
              priority={true}
              alt="Whisper Image"
              classes="rounded-[8px]"
            />
          </div>
          {/* Generate Image form (prompt and filter option) */}
          <div className="w-full">
            <div className="flex flex-col items-start p-0 gap-[8px] w-auto">
              <div className={styles.mainText}>Enter prompt</div>
              <textarea
                className={styles.textareaInput}
                placeholder="Enter your prompt here to generate your very own whisper"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
              ></textarea>
            </div>
          </div>
          {/* Select filter option */}
          <div className="w-full mb-[52px]">
            <div className="box-border">
              <div className={styles.mainText}>Filter</div>
              <div className={`${styles.subText} mb-[8px]`}>
                Select different styles that you can apply to your whisper
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
          <div className="w-full">
            <div className="flex items-center cursor-pointer"
              onClick={async () => {
                if (urls.length < 5) {
                  setIsloading(true);
                  const images = await getS3UrlfromText(
                    promptText,
                    selectedFilter
                  );
                  const newUrls = [images, ...urls];

                  setUrls(newUrls);
                  setIsloading(false);
                }
              }}
            >
              <button className={styles.generateButton}>
                <div className="flex items-center justify-between">

                  <div>
                    <span className={styles.generateButtonText}>
                      Generate whisper
                    </span>
                    <span className={styles.tryCounts}> &#x2022; {5 - urls.length} tries left </span>
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
          {isLoading ? (
            <SpinningLoader height="50vw" width="831px" />
          ) : (
            <>
              <div className="text-center py-[4px] px-[8px] w-full">
                <div className={styles.mainText}>Your generations</div>
              </div>
              {urls.map((url, index) => (
                <div className={styles.imageTryOutputBox} key={url[0] + index}>
                  <div className="text-center py-[4px] px-[8px] w-full">
                    <div className={styles.mainText}>
                      Try {urls.length - index}
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-full gap-[16px]">
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
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Generate;
