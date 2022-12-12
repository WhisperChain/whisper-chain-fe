import { Constants } from "./Constants";
import {
  broadcastRequest,
  commentViaDispatcher,
  refreshAuthentication,
} from "./lensFunction";

export const resetLocalStorage = () => {
  window.localStorage.removeItem(Constants.LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(Constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY);
  window.localStorage.removeItem("profileId");
  window.localStorage.removeItem("profile");
};

export const getS3UrlfromText = async (prompt, filter = "") => {
  const resp = await fetch(
    `https://whisperchain.xyz/api/whisper/suggestions?prompt=${prompt}&filter=${filter}`,

    {
      method: "GET",
    }
  );
  const responseJSON = await resp.json();
  return responseJSON?.data?.s3_urls;
};

export const getIpfsUrl = async (url) => {
  const resp = await fetch(
    `https://whisperchain.xyz/api/whisper?s3_url=${url}`,
    {
      method: "GET",
    }
  );
  const responseJSON = await resp.json();
  const contentId = responseJSON.data.cids.metadata;
  const ipfsUrl = `ipfs://${contentId}`;
  return ipfsUrl;
};

export function convertIntoIpfsUrl(url) {
  if (url.toString().startsWith("ipfs://")) {
    const cid = url.split("ipfs://")[1];
    return `https://${cid}.ipfs.w3s.link`;
  } else if (!url.toString().startsWith("https://")) {
    return `https://${url}`;
  } else {
    return url;
  }
}

export async function getIpfsUrlandUploadPublication(url, pubId, isInTime) {
  const ipfsUrl = await getIpfsUrl(url);
  await refreshAuthentication();

  await commentViaDispatcher(
    window.localStorage.getItem("profileId"),
    pubId,
    ipfsUrl,
    isInTime
  );
}

export const broadcastData = async (id, data) => {
  return await broadcastRequest({ id, signature: data });
};

export const getTimerClock = (timeDifference) => {
  const timeRemaining = 24 * 60 - timeDifference;
  const hours = Math.floor(timeRemaining / 60);
  const minutes = timeRemaining % 60;
  return `${hours}h : ${minutes}m `;
};

export const getProfileImage = () => {
  const profile = JSON.parse(window.localStorage.getItem("profile"));
  return profile.picture
    ? convertIntoIpfsUrl(profile.picture?.original?.url)
    : `https://cdn.stamp.fyi/avatar/eth:${profile.ownedBy}?s=250`;
};
