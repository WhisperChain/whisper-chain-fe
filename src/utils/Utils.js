import {
  commentViaDispatcher,
  refreshAuthentication,
  verifyAuthentication,
} from "./lensFunction";

export const resetLocalStorage = () => {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
  window.localStorage.removeItem("profileId");
};

export const getS3UrlfromText = async (prompt, filter = "") => {
  const resp = await fetch(
    `https://whisperchain.xyz/api/whisper/suggestions?prompt=${prompt}&filter=${filter}`,

    {
      method: "GET",
    }
  );
  console.log({ resp });
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
  console.log({ resp });
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

// export const getRandomName = () => {
//   const names = ["A", "B", "C", "D", "E"];
//   Math.random();
// };
