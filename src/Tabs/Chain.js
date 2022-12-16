import React from "react";
import ChainLogo from "../assets/ChainLogo";
import { PostImage } from "../components/PostImage";
import { getCommentFeed, getPublication } from "../utils/lensFunction";
import AddWhisperBtn from "../components/AddWhisperBtn";
import { convertIntoIpfsUrl, timer } from "../utils/Utils";
import moment from "moment";
import SpinningLoader from "../components/SpinningLoader";
import style from "./Chain.module.css";
import { usePublicationContext } from "../context/PublicationContext";
import { useBottomTab } from "../context/BottomTabContext";
import { TabItems } from "../components/Main/TabItems";
// import InfoLogo from "../assets/InfoLogo";
// import { Tooltip } from "react-tooltip";
// import "react-tooltip/dist/react-tooltip.css";

const Chain = () => {
  const [chainData, setChainData] = React.useState();
  const [isLoading, setIsloading] = React.useState(false);
  const { publication } = usePublicationContext();
  const { onTabChange } = useBottomTab();
  const [firstCreatedAt, setFirstCreatedAt] = React.useState();
  const [infoContainer, setInfoConatiner] = React.useState(true);
  // console.log(firstCreatedAt);
  const [hours, minutes] = timer("2022-12-14");
  // const handleInfoHover = (hoverstate) => {
  //   if(hoverstate){
  //     return setInfoConatiner(true);
  //   }
  //   else{
  //     return setInfoConatiner(false);
  //   }
  // }

  const [pubId, setPubId] = React.useState();

  React.useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const pubItem =
        Object.keys(publication).length > 0
          ? publication
          : (await getPublication("0x59cf", 1)).data.publications.items[0];
      const pubId = publication?.pubId || pubItem.id;
      setPubId(pubId);
      console.log("---------pub item---",pubItem);
      console.log("---------pub item id---",pubItem.id);
      const commentsData = (await getCommentFeed(pubId, 20)).data.publications
        .items;
      const commentArray = [];
      for (let index = 0; index < commentsData.length; index++) {
        const comment = commentsData[index];
        const commentObject = {
          imageUrl: comment.metadata.media[0]?.original?.url
            ? convertIntoIpfsUrl(comment.metadata.media[0]?.original?.url)
            : null,
          profileHandle: comment.profile.handle,
          name: comment.profile.name,
          createdAt: moment(comment.createdAt).format("h:mm a") || "",
          profileImageUrl: comment.profile.picture
            ? convertIntoIpfsUrl(comment.profile.picture?.original?.url)
            : `https://cdn.stamp.fyi/avatar/eth:${comment.profile.ownedBy}?s=250`,
          lensterProfileUrl: `https://testnet.lenster.xyz/u/${comment.profile.handle}`,
          lensterPostUrl: `https://testnet.lenster.xyz/posts/${comment.id}`,
        };
        commentArray.push(commentObject);
      }
      commentArray.push({
        imageUrl: pubItem.metadata.media[0]?.original?.url
          ? convertIntoIpfsUrl(pubItem.metadata.media[0]?.original?.url)
          : null,
        profileHandle: pubItem.profile.handle,
        name: pubItem.profile.name,
        createdAt: moment(pubItem?.createdAt)?.format("h:mm a") || "00:00 am",
        profileImageUrl: pubItem.profile.picture
          ? convertIntoIpfsUrl(pubItem.profile.picture?.original?.url)
          : `https://cdn.stamp.fyi/avatar/eth:${pubItem.profile.ownedBy}?s=250`,
        lensterProfileUrl: `https://testnet.lenster.xyz/u/${pubItem.profile.handle}`,
        lensterPostUrl: `https://testnet.lenster.xyz/posts/${pubItem.id}`,
      });

      setFirstCreatedAt(pubItem.createdAt);
      setChainData(commentArray);
      setIsloading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let viewLensUrl = 'https://testnet.lenster.xyz/posts';

  const buttonRef = React.useRef();
  React.useEffect(() => {
    const onScroll = () => {
      let dContainer = buttonRef.current;
      if (dContainer) {
        let rect = dContainer.getBoundingClientRect();
        console.log(rect.top);
        if (rect.top < 0) {
          handleScrollDark();
        } else {
          handleScrollLight();
        }
      }
    };
    window.addEventListener("scroll", onScroll);
  }, [buttonRef]);

  const handleScrollDark = () => {
    let lastImageButton = document.getElementById("lastImage");
    if (lastImageButton) {
      lastImageButton.style.opacity = "1";
    }
  };
  const handleScrollLight = () => {
    let lastImageButton = document.getElementById("lastImage");
    if (lastImageButton) {
      lastImageButton.style.opacity = "0";
    }
  };

  return isLoading ? (
    <SpinningLoader height="80vh" width="100%" />
  ) : (

    <div>
      <div
        onClick={() => {
          onTabChange(TabItems[0]);
        }}
        className="flex flex-row items-start not-italic font-medium text-[16px] leading-[140%] text-center text-[#0000003C] mb-[55px] cursor-pointer"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.875 10H3.125"
            stroke="black"
            stroke-opacity="0.6"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.75 4.375L3.125 10L8.75 15.625"
            stroke="black"
            stroke-opacity="0.6"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span className="ml-[12px]">Back</span>
      </div>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-col items-center sticky decoration-white">
          <div className="not-italic font-medium text-[16px] leading-[140%] tracking-[-0.03em] text-[#000000] ">
            {moment(firstCreatedAt).format("Do MMMM YYYY")}
          </div>
        </div>
        <div>
          <a href={`${viewLensUrl}/${pubId}`} className="flex">
            <span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.66289 12.512H10.1629V12.0495L9.70039 12.012L9.66289 12.512ZM2.58789 9.26202L2.93789 8.91202L2.58789 9.26202ZM2.38789 9.04952L2.76289 8.71202L2.38789 9.06202V9.04952ZM1.48789 6.59952L0.987891 6.56202L1.48789 6.59952ZM2.48789 4.44952L2.83789 4.79952L2.47539 4.44952H2.48789ZM4.56289 3.43702L4.52539 2.93702L4.56289 3.43702ZM6.80039 4.21202L6.46289 4.58702L7.21289 5.24952L7.28789 4.24952L6.78789 4.21202H6.80039ZM7.82539 2.04952L8.16289 2.42452L7.82539 2.04952ZM12.2004 2.04952L12.5254 1.67452L12.1879 2.04952H12.2004ZM13.2254 4.21202L12.7254 4.26202L12.8129 5.24952L13.5629 4.59952L13.2254 4.22452V4.21202ZM15.4504 3.43702L15.4129 3.93702L15.4504 3.43702ZM17.5504 4.44952L17.1879 4.79952L17.5504 4.44952ZM18.5379 6.59952L18.0379 6.63702L18.5379 6.59952ZM17.6379 9.06202L18.0129 9.39952L17.6379 9.06202ZM17.4379 9.26202L17.0879 8.91202L17.4379 9.26202ZM10.3129 12.512L10.2879 12.012L9.81289 12.0495V12.5245H10.3129V12.512ZM10.3129 12.6745H9.81289H10.3129ZM12.0629 15.7245L12.2754 15.2745L12.0629 15.7245ZM15.5879 15.2995L16.0004 15.012L15.7129 14.5995L15.3004 14.8995L15.5879 15.2995ZM15.9629 15.837L16.2629 16.2495L16.6629 15.962L16.3754 15.562L15.9754 15.837H15.9629ZM13.4254 16.6745V16.1745V16.6745ZM11.8754 16.3745L12.0754 15.9245L11.5254 16.737L11.8754 16.3745ZM14.6754 17.937L14.7879 17.437L14.6629 17.937H14.6754ZM18.4504 17.512L18.9129 17.2995L18.7004 16.837L18.2379 17.062L18.4504 17.512ZM18.7379 18.112L18.9504 18.562L19.3879 18.3495L19.1879 17.8995L18.7379 18.112ZM15.9629 18.737V18.237V18.737ZM14.5254 18.587L14.6504 18.087L14.5254 18.587ZM10.8879 16.237L10.4879 16.537L10.8879 16.237ZM10.8879 16.237L10.4754 16.5245L10.8754 16.237H10.8879ZM10.3129 15.312L10.7629 15.087L9.81289 15.312H10.3129ZM10.3129 18.737V19.237H10.8129V18.737H10.3129ZM9.66289 18.737H9.16289V19.237H9.66289V18.737ZM9.66289 15.2995H10.1629L9.22539 15.087L9.66289 15.2995ZM9.10039 16.2245L9.50039 16.537L9.10039 16.2245ZM9.10039 16.2245L9.50039 16.537L9.10039 16.237V16.2245ZM5.45039 18.5745L5.33789 18.087L5.46289 18.587L5.45039 18.5745ZM4.02539 18.737V18.237V18.737ZM1.25039 18.0995L0.800391 17.887L0.587891 18.337L1.03789 18.5495L1.25039 18.0995ZM1.52539 17.4995L1.73789 17.0495L1.28789 16.8245L1.07539 17.287L1.52539 17.4995ZM5.31289 17.9245L5.20039 17.4245L5.31289 17.9245ZM8.10039 16.362L8.45039 16.7245L7.90039 15.912L8.10039 16.362ZM6.56289 16.6745V16.1745V16.6745ZM4.01289 15.837L3.60039 15.5495L3.32539 15.962L3.71289 16.2495L4.01289 15.837ZM4.38789 15.2995L4.68789 14.8995L4.27539 14.587L3.97539 15.012L4.38789 15.2995ZM7.91289 15.7245L7.71289 15.2745L7.91289 15.7245ZM9.66289 12.662L10.1629 12.6745H9.66289V12.662ZM2.93789 4.92452L2.57539 4.57452L2.93789 4.92452ZM6.51289 4.84952L6.16289 5.21202L6.51289 4.84952ZM6.70039 5.03702L7.06289 4.68702L6.68789 5.03702H6.70039ZM6.83789 5.18702L6.46289 5.52452L6.83789 5.18702ZM7.46289 5.84952L7.08789 6.19952L7.98789 7.17452L7.95039 5.83702L7.45039 5.84952H7.46289ZM7.42539 4.93702L7.92539 4.92452V4.89952L7.42539 4.93702ZM7.42539 4.58702H6.92539H7.42539ZM7.42539 4.46202L6.92539 4.43702V4.46202H7.42539ZM12.5879 4.46202H12.0879V4.47452L12.5879 4.46202ZM12.5879 4.83702H13.0879H12.5879ZM12.5879 4.93702L13.0879 4.94952V4.93702H12.5879ZM12.5629 5.84952H12.0629L12.0379 7.17452L12.9379 6.19952L12.5629 5.84952ZM13.1879 5.18702L13.5629 5.52452L13.1879 5.18702ZM13.3129 5.03702L13.6879 5.38702L13.3129 5.03702ZM13.5129 4.84952L13.8629 5.21202L13.5129 4.84952ZM17.1629 8.59952L16.7879 8.26202L17.1629 8.59952ZM16.9754 8.78702L16.6254 8.44952L16.9754 8.78702ZM3.03789 8.78702L2.68789 9.13702L3.03789 8.78702ZM2.86289 8.59952L3.23789 8.26202L2.86289 8.59952ZM9.70039 12.012C7.15269 11.8168 4.75867 10.7173 2.95039 8.91202L2.22539 9.61202C4.20915 11.5967 6.83954 12.8032 9.63789 13.012L9.70039 12.012ZM2.95039 8.91202L2.75039 8.71202L2.02539 9.39952L2.22539 9.61202L2.93789 8.91202H2.95039ZM2.75039 8.71202C2.48473 8.43907 2.27954 8.11324 2.14816 7.75573C2.01679 7.39821 1.96218 7.01704 1.98789 6.63702L0.987891 6.56202C0.912891 7.61202 1.27539 8.58702 2.02539 9.39952L2.75039 8.71202ZM2.00039 6.63702C2.05039 5.97452 2.33789 5.32452 2.85039 4.79952L2.12539 4.11202C1.47644 4.77271 1.07854 5.63924 1.00039 6.56202L2.00039 6.63702ZM2.85039 4.79952C3.35039 4.28702 3.97539 3.98702 4.61289 3.92452L4.53789 2.93702C3.63789 3.01202 2.78789 3.43702 2.12539 4.11202L2.85039 4.79952ZM4.61289 3.92452C4.955 3.90246 5.298 3.951 5.62055 4.06712C5.94311 4.18325 6.23834 4.36447 6.48789 4.59952L7.13789 3.84952C6.7888 3.52942 6.37838 3.28349 5.93147 3.12664C5.48456 2.9698 5.01046 2.90529 4.53789 2.93702L4.61289 3.93702V3.92452ZM7.30039 4.26202C7.36289 3.48702 7.67539 2.86202 8.17539 2.42452L7.50039 1.67452C6.78789 2.29952 6.37539 3.17452 6.30039 4.17452L7.30039 4.26202ZM8.17539 2.42452C8.66289 1.98702 9.31289 1.74952 10.0254 1.74952V0.749524C9.07539 0.749524 8.17539 1.07452 7.50039 1.67452L8.16289 2.42452H8.17539ZM10.0254 1.74952C10.7379 1.74952 11.3879 1.99952 11.8754 2.42452L12.5379 1.67452C11.8351 1.06381 10.9314 0.734375 10.0004 0.749524V1.74952H10.0254ZM11.8754 2.42452C12.3754 2.86202 12.6754 3.48702 12.7504 4.26202L13.7504 4.17452C13.6629 3.17452 13.2504 2.29952 12.5379 1.67452L11.8754 2.42452ZM13.5629 4.59952C14.1379 4.09952 14.7754 3.88702 15.4379 3.93702L15.5129 2.93702C14.5629 2.86202 13.6629 3.18702 12.9129 3.83702L13.5629 4.58702V4.59952ZM15.4379 3.93702C16.0629 3.98702 16.6879 4.28702 17.2004 4.81202L17.9129 4.11202C17.2808 3.44364 16.4284 3.02632 15.5129 2.93702L15.4254 3.93702H15.4379ZM17.2004 4.81202C17.7004 5.31202 18.0004 5.97452 18.0504 6.63702L19.0504 6.56202C18.9733 5.63897 18.5752 4.7721 17.9254 4.11202L17.2004 4.79952V4.81202ZM18.0504 6.63702C18.1129 7.38702 17.8504 8.09952 17.2754 8.71202L18.0254 9.39952C18.7629 8.58702 19.1254 7.61202 19.0504 6.56202L18.0504 6.63702ZM17.2754 8.71202L17.1004 8.91202L17.8129 9.61202L18.0129 9.39952L17.2754 8.71202ZM17.0879 8.91202C15.2719 10.73 12.863 11.8347 10.3004 12.0245L10.3629 13.0245C11.4379 12.9495 14.9879 12.512 17.8129 9.61202L17.0879 8.91202ZM10.8379 12.662V12.5245H9.83789V12.6745H10.8379V12.662ZM12.2879 15.2745C11.4129 14.862 10.8629 13.987 10.8254 12.6495L9.82539 12.687C9.87539 14.287 10.5629 15.562 11.8629 16.187L12.2879 15.2745ZM15.3129 14.8995C14.4254 15.5495 13.2129 15.6995 12.2879 15.2745L11.8629 16.1745C13.1504 16.7745 14.7379 16.5495 15.9004 15.6995L15.3129 14.8995ZM16.3879 15.562L16.0129 15.012L15.2004 15.587L15.5754 16.1245L16.3879 15.562ZM13.4379 17.187C14.4504 17.187 15.4379 16.8495 16.2754 16.2495L15.6879 15.437C15.0254 15.9245 14.2379 16.187 13.4379 16.187V17.187ZM11.6879 16.8245C12.2504 17.062 12.8379 17.1745 13.4379 17.1745V16.1745C12.9746 16.1806 12.5151 16.0913 12.0879 15.912L11.7004 16.8245H11.6879ZM14.8004 17.437C13.8324 17.2135 12.948 16.7192 12.2504 16.012L11.5379 16.7245C12.3705 17.5628 13.4237 18.1479 14.5754 18.412L14.8004 17.437ZM18.2504 17.0495C17.1761 17.562 15.9597 17.6942 14.8004 17.4245L14.5754 18.412C15.959 18.7293 17.4094 18.5662 18.6879 17.9495L18.2504 17.0495ZM19.2004 17.887L18.9254 17.287L18.0129 17.6995L18.2879 18.312L19.2004 17.887ZM15.9754 19.237C17.0103 19.2356 18.0315 19.0006 18.9629 18.5495L18.5254 17.6495C17.7304 18.0346 16.8587 18.2354 15.9754 18.237V19.237ZM14.4254 19.0495C14.9254 19.1745 15.4504 19.237 15.9754 19.237V18.237C15.5254 18.237 15.0879 18.187 14.6504 18.087L14.4254 19.0495ZM10.5004 16.5245C11.4744 17.8004 12.8621 18.6976 14.4254 19.062L14.6504 18.087C13.3125 17.7785 12.1236 17.0139 11.2879 15.9245L10.5004 16.5245ZM10.5004 16.5245L11.3004 15.9245L10.4879 16.5245H10.5004ZM9.87539 15.5245C10.0504 15.8745 10.2504 16.1995 10.5004 16.5245L11.2879 15.9245C11.1004 15.662 10.9129 15.3745 10.7879 15.0745L9.87539 15.5245ZM10.8254 18.7245V15.2995H9.82539V18.7245H10.8254ZM9.67539 19.2245H10.3254V18.2245H9.67539V19.2245ZM9.17539 15.287V18.7245H10.1754V15.287H9.17539ZM9.51289 16.512C9.75039 16.1995 9.95039 15.862 10.1379 15.512L9.23789 15.0745C9.08789 15.3745 8.91289 15.6495 8.71289 15.9245L9.51289 16.512ZM9.51289 16.5245L8.71289 15.912L9.51289 16.537V16.5245ZM5.57539 19.0495C7.13789 18.6995 8.52539 17.7995 9.51289 16.5245L8.71289 15.912C7.87715 17.0014 6.68832 17.766 5.35039 18.0745L5.57539 19.0495ZM4.03789 19.2245C4.55039 19.2245 5.07539 19.1745 5.57539 19.0495L5.35039 18.0745C4.92539 18.1745 4.47539 18.237 4.03789 18.237V19.237V19.2245ZM1.03789 18.5495C1.9741 18.9981 2.99975 19.2289 4.03789 19.2245V18.2245C3.16289 18.2245 2.28789 18.037 1.47539 17.6495L1.05039 18.5495H1.03789ZM1.08789 17.287L0.812891 17.887L1.71289 18.2995L1.98789 17.6995L1.08789 17.287ZM5.21289 17.437C4.05039 17.6995 2.83789 17.562 1.75039 17.0495L1.32539 17.9495C2.60539 18.562 4.05572 18.7207 5.43789 18.3995L5.21289 17.437ZM7.75039 15.9995C7.03789 16.712 6.16289 17.1995 5.20039 17.4245L5.42539 18.3995C6.56289 18.137 7.61289 17.5495 8.45039 16.712L7.75039 15.9995ZM6.56289 17.162C7.15039 17.162 7.75039 17.037 8.30039 16.812L7.90039 15.8995C7.47539 16.0745 7.02539 16.162 6.56289 16.162V17.162ZM3.71289 16.2495C4.55039 16.8495 5.53789 17.1745 6.56289 17.1745V16.1745C5.75039 16.1745 4.96289 15.9245 4.31289 15.437L3.71289 16.2495ZM3.97539 15.012L3.60039 15.5495L4.42539 16.1245L4.80039 15.587L3.97539 15.012ZM7.71289 15.262C6.77539 15.6995 5.57539 15.5495 4.68789 14.887L4.08789 15.6995C5.23789 16.562 6.83789 16.7745 8.12539 16.1745L7.71289 15.2745V15.262ZM9.16289 12.6495C9.13789 13.987 8.58789 14.862 7.71289 15.2745L8.12539 16.1745C9.43789 15.5745 10.1254 14.287 10.1629 12.6745L9.16289 12.6495ZM9.16289 12.5245V12.662H10.1629V12.512H9.16289V12.5245ZM4.78789 3.59952C3.91289 3.59952 3.12539 4.01202 2.57539 4.57452L3.28789 5.27452C3.68789 4.86202 4.23789 4.59952 4.78789 4.59952V3.59952ZM6.86289 4.48702C6.59303 4.20904 6.27064 3.98744 5.91443 3.83509C5.55823 3.68274 5.1753 3.60266 4.78789 3.59952V4.59952C5.22539 4.59952 5.70039 4.76202 6.16289 5.21202L6.86289 4.48702ZM7.06289 4.68702L6.86289 4.48702L6.16289 5.21202L6.33789 5.38702L7.06289 4.68702ZM7.21289 4.84952C7.16356 4.79474 7.11356 4.74057 7.06289 4.68702L6.33789 5.38702L6.46289 5.52452L7.21289 4.84952ZM7.82539 5.51202L7.20039 4.84952L6.47539 5.52452L7.08789 6.19952L7.82539 5.51202ZM6.93789 4.94952L6.95039 5.87452L7.95039 5.83702L7.92539 4.92452L6.92539 4.94952H6.93789ZM6.93789 4.72452V4.96202L7.93789 4.89952V4.72452H6.93789ZM6.93789 4.58702V4.72452H7.93789V4.59952L6.93789 4.58702ZM6.93789 4.46202V4.58702L7.93789 4.59952V4.46202H6.93789ZM10.0004 1.41202C9.59895 1.40539 9.20021 1.47873 8.82741 1.62778C8.45461 1.77682 8.11521 1.99859 7.829 2.28015C7.54278 2.56171 7.31548 2.89743 7.16034 3.26774C7.00521 3.63805 6.92534 4.03553 6.92539 4.43702L7.92539 4.47452C7.93789 3.72452 8.22539 3.22452 8.60039 2.91202C8.97539 2.57452 9.50039 2.41202 10.0004 2.41202V1.41202ZM13.0754 4.44952C13.0798 4.01503 12.9905 3.58469 12.8136 3.1878C12.6367 2.79091 12.3764 2.43679 12.0504 2.14952C11.4754 1.6696 10.7493 1.40838 10.0004 1.41202V2.41202C10.5004 2.41202 11.0129 2.57452 11.4004 2.91202C11.7754 3.23702 12.0629 3.73702 12.0754 4.47452L13.0754 4.44952ZM13.0754 4.72452V4.43702L12.0754 4.47452V4.72452H13.0754ZM13.0754 4.72452H12.0754H13.0754ZM13.0754 4.84952V4.72452H12.0754V4.81202L13.0754 4.84952ZM13.0754 4.93702V4.84952L12.0754 4.81202V4.93702H13.0754ZM13.0504 5.87452L13.0754 4.94952L12.0754 4.92452L12.0504 5.83702L13.0504 5.87452ZM12.8004 4.84952L12.1879 5.51202L12.9254 6.19952L13.5504 5.52452L12.8004 4.84952ZM12.9504 4.68702L12.8004 4.84952L13.5504 5.52452L13.6754 5.38702L12.9504 4.68702ZM13.1504 4.48702L12.9504 4.68702L13.6754 5.38702L13.8504 5.21202L13.1504 4.48702ZM17.4379 4.57452C16.9379 4.07452 16.2504 3.68702 15.4754 3.61202C15.0472 3.57655 14.6165 3.63664 14.2145 3.78797C13.8124 3.93929 13.4489 4.17806 13.1504 4.48702L13.8504 5.21202C14.3629 4.71202 14.9004 4.56202 15.3879 4.59952C15.8879 4.64952 16.3629 4.91202 16.7129 5.27452L17.4379 4.57452ZM17.5129 8.94952C18.2004 8.19952 18.4379 7.36202 18.3754 6.57452C18.2999 5.8205 17.9692 5.11488 17.4379 4.57452L16.7129 5.27452C17.0754 5.64952 17.3379 6.14952 17.3754 6.64952C17.4254 7.16202 17.2754 7.72452 16.7879 8.26202L17.5129 8.93702V8.94952ZM17.3254 9.13702L17.5129 8.93702L16.7879 8.26202L16.6129 8.44952L17.3254 9.13702ZM10.0129 12.3745C10.0879 12.3745 14.2379 12.337 17.3379 9.14952L16.6254 8.46202C15.4135 9.67247 13.9048 10.5432 12.2504 10.987C10.9379 11.362 9.98789 11.362 10.0004 11.362V12.362L10.0129 12.3745ZM2.68789 9.13702C4.64326 11.0803 7.24726 12.2332 10.0004 12.3745V11.3745C10.0004 11.3745 9.05039 11.3745 7.75039 10.9995C6.09918 10.5501 4.59487 9.67514 3.38789 8.46202L2.67539 9.14952L2.68789 9.13702ZM2.48789 8.93702L2.68789 9.13702L3.40039 8.44952L3.22539 8.26202L2.48789 8.93702ZM2.57539 4.57452C2.07539 5.08702 1.70039 5.79952 1.63789 6.57452C1.57539 7.36202 1.81289 8.19952 2.48789 8.94952L3.23789 8.26202C2.73789 7.72452 2.58789 7.17452 2.63789 6.66202C2.68789 6.13702 2.93789 5.63702 3.28789 5.28702L2.57539 4.57452Z" fill="url(#paint0_radial_874_166)" />
                <defs>
                  <radialGradient id="paint0_radial_874_166" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9.98789 15.7155) rotate(-90) scale(19.8086 20.1429)">
                    <stop stop-color="#6F1AFF" />
                    <stop offset="1" stop-color="#C6A4FF" />
                  </radialGradient>
                </defs>
              </svg>
            </span>
            <span className="ml-[10px] text-[#a36dff]">View on lens</span>
          </a>
        </div>
      </div>
      <div className="flex justify-center sticky top-[10px] z-[1000]" ref={buttonRef}>
        <a
          onClick={() => {
            console.log("clicked");
            window.scrollTo(0, 0);
          }}
          id="lastImage"
          className={`rounded-[20px] flex z-[10000] items-center justify-center ${style.lastImageButton}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.25 13.75L10 7.5L3.75 13.75"
              stroke="black"
              stroke-opacity="0.6"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span className="ml-[10px]">Back to top</span>
        </a>
      </div>
      <div className="flex flex-col items-center justify-center overflow-scroll">
        <div
          className={`w-[512px] h-[251px] flex flex-col items-center rounded-[48px] ${style.messageBox}`}

        >
          <div className="flex flex-col w-[409px] mt-[40px]">
            <div className="not-italic text-[#e7d9ff] text-[16px] leading-[150%] font-normal">
              This was the last image added to the thread, try to describe
              this image in your own words as best you can, and add your
              generation to this thread.
            </div>
          </div>

          <AddWhisperBtn pageIndex={1} publication={publication} />
        </div>
        {chainData &&
          chainData.map((comment, index) => {
            return comment.imageUrl ? (
              <div key={index}>
                <div className="flex w-full items-center justify-center">
                  <ChainLogo />
                </div>
                <PostImage imageDetails={comment} />
              </div>
            ) : null;
          })}
      </div>
    </div>

  );
};

export default Chain;
