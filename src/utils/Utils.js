export const resetLocalStorage = () => {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
  window.localStorage.removeItem("profileId");
};

export const getS3UrlfromText = async (prompt, filter) => {
  const data = { prompt };
  if (filter) {
    data.filter = filter;
  }

  const resp = await fetch(
    `http://whisperchain.xyz:3000/whisper/suggestions?prompt=${prompt}`,
    {
      method: "GET",
    }
  );
  console.log({ resp });
  const responseJSON = await resp.json();
  const s3Url = responseJSON?.data?.s3_urls?.[0];
  const ipfsUrl = await getIpfsUrl(s3Url);
  console.log({ ipfsUrl });
  return ipfsUrl;
};

export const getIpfsUrl = async (url) => {
  const resp = await fetch(
    `http://whisperchain.xyz:3000/whisper?s3_url=${url}`,
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
