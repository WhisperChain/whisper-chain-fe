export const resetLocalStorage = () => {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
  window.localStorage.removeItem("profileId");
};

export const getS3UrlfromText = async (prompt, filter = "") => {
  console.log(prompt, filter);
  const resp = await fetch(
    `http://api.whisperchain.xyz:3000/whisper/suggestions?prompt=${prompt}&filter=${filter}`,

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
    `http://api.whisperchain.xyz:3000/whisper?s3_url=${url}`,
    {
      method: "GET",
    }
  );
  console.log({ resp });
  const responseJSON = await resp.json();
  const contentId = responseJSON.data.cids.metadata;
  const ipfsUrl = `ipfs://${contentId}`;
  console.log({ ipfsUrl });
  return ipfsUrl;
};

export function convertIntoIpfsUrl(url) {
  const cid = url.split("//")[1];
  return `https://${cid}.ipfs.w3s.link`;
}
