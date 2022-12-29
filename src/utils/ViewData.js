import moment from "moment";
import { getCommentFeed, getPublication } from "./lensFunction";
import { convertIntoIpfsUrl, getChains, getChainWhispers } from "./Utils";

export const getLastCommentsOfPosts = async (profileId) => {
  const dataObject = [];
  const resp = await getPublication(profileId, 5);
  const publicationItems = resp.data.publications.items;
  for (let i = 0; i < publicationItems.length; i++) {
    const item = publicationItems[i];
    const comments = await getCommentFeed(item.id, 3);
    const commentsArray = [];
    if (comments.data.publications.items.length >= 1) {
      comments.data.publications.items.map(async (comment) => {
        const commentData = {
          imageUrl: convertIntoIpfsUrl(comment.metadata.media[0].original.url),
          profileHandle: comment.profile.handle,
          name: comment.profile.name,
          createdAt: moment(comment.createdAt).format("h:mm a"),
          profileImageUrl: comment.profile.picture
            ? convertIntoIpfsUrl(comment.profile.picture?.original?.url)
            : `https://cdn.stamp.fyi/avatar/eth:${comment.profile.ownedBy}?s=250`,
          lensterProfileUrl: `https://testnet.lenster.xyz/u/${comment.profile.handle}`,
          lensterPostUrl: `https://testnet.lenster.xyz/posts/${comment.id}`,
          profileId: comment.profile.id,
          isFollowedByMe: comment.profile.isFollowedByMe,
          followModule: comment.profile.followModule,
        };

        commentsArray.push(commentData);
      });
    } else {
      commentsArray.push({
        imageUrl: convertIntoIpfsUrl(item.metadata.media[0].original.url),
        profileHandle: item.profile.handle,
        name: item.profile.name,
        createdAt: moment(item.createdAt).format("h:mm a"),
        lensterProfileUrl: `https://testnet.lenster.xyz/u/${item.profile.handle}`,
        lensterPostUrl: `https://testnet.lenster.xyz/posts/${item.id}`,
        profileImageUrl: item.profile.picture
          ? convertIntoIpfsUrl(item.profile.picture?.original?.url)
          : `https://cdn.stamp.fyi/avatar/eth:${item.profile.ownedBy}?s=250`,
        profileId: item.profile.id,
        isFollowedByMe: item.profile.isFollowedByMe,
        followModule: item.profile.followModule,
      });
    }

    var a = moment(item.createdAt);
    var b = moment();
    dataObject.push({
      pubId: item.id,
      profile: item.profile,
      createdAt: item.createdAt,
      comments: commentsArray,
      timeDifference: b.diff(a, "minutes"),
      metadata: item.metadata,
    });
  }
  return dataObject;
};

export const getChainData = async (paginationParams) => {
  const dataObject = [];
  const data = await getChains(paginationParams);
  const chainIds = data?.chain_ids;
  chainIds.map((chainId) => {
    const chain = data?.chains[chainId];
    const commentArray = [];
    const resentWhisperIds = chain?.recent_whisper_ids;
    resentWhisperIds?.map((whisperId) => {
      const whisper = data?.whispers[whisperId];
      const image = data?.images[whisper?.image_id];
      const user = data?.users[whisper?.user_id];
      console.log("user", user);
      console.log("data?.images", data?.images);
      const profileImage = data?.images[user?.platform_profile_image_id];
      const whisperData = {
        imageUrl: image.url,
        profileHandle: user?.platform_username,
        name: user?.platform_display_name,
        createdAt: moment(whisper?.uts).format("h:mm a"),
        profileImageUrl: profileImage
          ? profileImage?.url
          : "https://cdn.stamp.fyi/avatar/eth:1234?s=250",
        lensterProfileUrl: `https://testnet.lenster.xyz/u/${user?.platform_username}`,
        lensterPostUrl: `https://testnet.lenster.xyz/posts/${whisper.platform_chain_id}`,
        profileId: user?.platform_user_id,
      };
      commentArray.push(whisperData);
    });

    var a = moment(chain.start_ts);
    var b = moment();
    dataObject.push({
      chainId: chain.id,
      pubId: chain.platform_chain_id,
      lensterPostUrl: chain.platform_chain_url,
      comments: commentArray,
      createdAt: chain.start_ts,
      timeDifference: b.diff(a, "minutes"),
      metadata: null,
    });
  });
  return dataObject;
};

export const getChainPageData = async () => {
  const pubItem = (await getPublication("0x59cf", 1)).data.publications
    .items[0];
  const pubId = pubItem.id;
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
      profileId: comment.profile.id,
      isFollowedByMe: comment.profile.isFollowedByMe,
      followModule: comment.profile.followModule,
      collectModule: comment.collectModule,
      hasCollectedByMe: comment.hasCollectedByMe,
      publicationId: comment.id,
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
    profileId: pubItem.profile.id,
    isFollowedByMe: pubItem.profile.isFollowedByMe,
    followModule: pubItem.profile.followModule,
    collectModule: pubItem.collectModule,
    hasCollectedByMe: pubItem.hasCollectedByMe,
    publicationId: pubItem.id,
  });
  return { commentArray, pubItem };
};

export const getChainWhispersData = async (chainId, paginationParams) => {
  const data = await getChainWhispers(chainId, paginationParams);
  const whisperIds = data?.whisper_ids;
  const hasMore = whisperIds?.length >= paginationParams.limit;
  const commentArray = [];
  let pubItem = {};
  pubItem.hasMore = hasMore;
  whisperIds?.map((whisperId) => {
    const whisper = data?.whispers[whisperId];
    if (Object.keys(pubItem).length === 0) {
      const chain = data?.chains[whisper?.chain_id];
      const image = data?.images[chain?.image_id];
      const user = data?.users[whisper?.user_id];
      const postData = {
        pubId: chain.platform_chain_id,
        createdAt: chain.start_ts,
        imageUrl: image.url,
        profileHandle: user?.platform_username,
        name: user?.platform_display_name,
      };
      pubItem = postData;
    }
    const image = data?.images[whisper?.image_id];
    const user = data?.users[whisper?.user_id];
    const profileImage = data?.images[user?.platform_profile_image_id];
    const whisperData = {
      imageUrl: image.url,
      profileHandle: user?.platform_username,
      name: user?.platform_display_name,
      createdAt: moment(whisper?.uts).format("h:mm a"),
      id: whisperId,
      profileImageUrl: profileImage
        ? profileImage?.url
        : "https://cdn.stamp.fyi/avatar/eth:1234?s=250",
      lensterProfileUrl: `https://testnet.lenster.xyz/u/${user?.platform_username}`,
      lensterPostUrl: `https://testnet.lenster.xyz/posts/${whisper.platform_chain_id}`,
      profileId: user?.platform_user_id,
    };
    commentArray.push(whisperData);
  });
  pubItem.comments = commentArray;
  return { pubItem, hasMore, commentArray };
};
