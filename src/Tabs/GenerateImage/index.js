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
import EmptyStateLogo from "../../assets/EmptyStateLogo";
import { useAccount } from "wagmi";
import ChevronIcon from "../../assets/ChevronIcon";

function Generate() {
  const { address } = useAccount();
  const { publication } = usePublicationContext();
  const router = useRouter();
  const [promptText, setPromptText] = React.useState("");
  const [promtEmpty, setPromtEmpty] = React.useState(false);
  const [specialCharacter, setSpecialCharacter] = React.useState();
  const [urls, setUrls] = React.useState([]);
  const limit = 5 - urls.length;
  const [pubsId, setPubsId] = React.useState();
  const [isLoading, setIsloading] = React.useState(false);
  const [selectedFilter, setSelectedFilter] = React.useState(
    FILTER_OPTIONS[0].value
  );
  const [emptyState, setEmptyState] = React.useState(true);
  const [disableGeneration, setDisableGeneration] = React.useState(false);

  var regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|<>\/?~]/;

  const [previousImageUrl, setPreviousImageUrl] = React.useState();
  React.useEffect(() => {
    const fetchData = async () => {
      const pub = (await getPublication("0x59cf", 1)).data.publications
        .items[0];
      const pubId = pub.id;

      const comment = await (
        await getCommentFeed(pubId, 1)
      ).data.publications.items[0];
      if (comment) {
        const porfileIdForGeneratedPost = comment.profile.id;
        const loggedInUserProfileId = localStorage.getItem("profileId");
        if (porfileIdForGeneratedPost === loggedInUserProfileId) {
          setDisableGeneration(true);
        }
      }
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
    const txHash = await getIpfsUrlandUploadPublication(url, pubsId, address);
    console.log({ txHash });
    await postWhisperResponse(url, txHash);
    setIsloading(false);
    router.push("/chain?isGenerated=true", "/chain");
  };

  const generateImageClickHandler = async () => {
    if (regex.test(promptText)) {
      setSpecialCharacter(true)
    }
    else {
      if (urls.length < 5) {
        setUrls([1, ...urls]);
        setEmptyState(false);
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
    }
  };

  const generateImageContainerRef = React.useRef(null);
  const [btnPosition, setBtnPosition] = React.useState("absolute");

  const onScroll = () => {
    if (generateImageContainerRef.current?.scrollTop > 0) {
      setBtnPosition("absolute");
    } else {
      setBtnPosition("static");
    }
  };

  React.useEffect(() => {
    const { innerHeight: height } = window;

    if (height <= 900) {
      setBtnPosition("static");
    }
  }, []);

  return (
    <div
      className={styles.mainContainer}
      onScroll={onScroll}
      ref={generateImageContainerRef}
    >
      <div className="flex gap-[16px] justify-center items-center">
        {/* Sidebar */}
        <div className={styles.sidebarContainer}>
          {/* Previos Whisper Image */}
          <div className="w-full">
            <div className="flex flex-col mb-[8px]">
              <div className={styles.mainText}>
                Last whisper of {`December 13th`} chain
              </div>
              <div className={styles.subText}>
                Try to describe this whisper as best you can.
              </div>
            </div>
            <div className="relative">
              <div className={`w-[256px] h-[256px] relative flex justify-center items-center ${disableGeneration ? 'opacity-25' : ''}`}>
                <WhisperImage
                  imgSrcUrl={previousImageUrl}
                  width={256}
                  height={256}
                  priority={true}
                  alt="Whisper Image"
                  classes="rounded-[8px]"
                />
              </div>
              {/* Disabled state when User cannot post(if last post by same user) */}
              {disableGeneration &&
                <div className={`flex justify-center items-center w-[200px] h-[82px] relative bg-[#FFFFFF] rounded-[8px] text-center ${styles.errorStateBox}`}>
                  <span className="not-italic text-[14px] font-medium m-[8px]">Previous whisper was added by you. Please come back later to add a whisper again</span>
                </div>
              }
            </div>
          </div>
          {/* Generate Image form (prompt and filter option) */}
          <div className={`w-full  ${disableGeneration ? 'opacity-25' : ''}`}>
            <div className="flex flex-col items-start p-0 gap-[8px] w-auto">
              <div className={styles.mainText}>Enter prompt</div>
              <textarea
                className={`${styles.promptInput} text-sm shadow-sm 
                  focus:outline-none focus:border-[#6f1aff3d] focus:ring-1 
                  ${promtEmpty ? "focus:ring-[red]" : "focus:ring-[#6f1aff3d]"}
                  ${disableGeneration ? "cursor-not-allowed	pointer-events-none" : ""}
                `}
                placeholder="Enter your prompt here to generate your very own whisper"
                value={promptText}
                onChange={(e) => {
                  setPromptText(e.target.value)
                  setSpecialCharacter(false)
                  if (!e.target.value.replace(/\s/g, '').length) {
                    setPromtEmpty(true)
                  }
                  else {
                    setPromtEmpty(false)
                  }
                }}
              ></textarea>
              {specialCharacter &&
                <span className="text-[#cf3838] text-[12px]">Prompt can not contain special characters</span>
              }
            </div>
          </div>
          {/* Select filter option */}
          <div className={`w-full  ${disableGeneration ? 'opacity-25' : ''}`}>
            <div className="box-border">
              <div className={styles.mainText}>Filter</div>
              <div className={`${styles.subText} mb-[8px]`}>
                Select a style to create more refined whispers
              </div>
              <div className="flex justify-center items-center">
                <select
                  className={`${styles.selectBoxInput} ${disableGeneration ? "cursor-not-allowed	pointer-events-none" : ""}`}
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
                <div className="relative right-[25px] pointer-events-none"><ChevronIcon /></div>
              </div>
            </div>
          </div>
          {/* Generate Image Button */}
          <div
            className={`w-full bottom-[16px] ${promptText === "" || promtEmpty || limit == 0
              ? "opacity-50 cursor-not-allowed	pointer-events-none"
              : ""
              } ${btnPosition}
              ${disableGeneration ? 'opacity-25 cursor-not-allowed pointer-events-none' : ''}`
            }
          >
            <div
              className="flex items-center cursor-pointer"
              onClick={generateImageClickHandler}
            >
              <button className={styles.generateButton}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[5px]">
                    <span className={styles.generateButtonText}>
                      Generate whisper
                    </span>
                    <span className={styles.tryCounts}>&#x2022;</span>
                    <span className={styles.tryCounts}>
                      {limit} tries left
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
                    key={index}
                    clickHandler={() => onImageClickHandler(url[0])}
                  />
                  <GeneratedImageBox
                    imgSrcUrl={url[1]}
                    key={index}
                    clickHandler={() => onImageClickHandler(url[1])}
                  />
                </div>
              </div>
            ))
          }
          {emptyState &&
            <div className="overflow-hidden w-full">{
              [...Array(2)].map((index) => (
                <div className={styles.imageTryOutputBox} key={index}>
                  <div className="flex items-start justify-start gap-[12px] w-full">
                    {
                      [...Array(2)].map((index) => (
                        <div key={index} className={`flex items-center justify-center w-[402px] h-[402px] relative group ${styles.defaultState}`}>
                          <EmptyStateLogo />
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
            }</div>
          }
        </div>
      </div>
    </div>
  );
}

export default Generate;
