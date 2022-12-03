import {
  ApolloClient,
  ApolloLink,
  gql,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  AUTHENTICATION,
  CREATE_COLLECT,
  CREATE_COMMENT_VIA_DISPATCHER,
  GET_CHALLENGE,
  GET_PROFILE,
  GET_PUBLICATIONS,
  REFRESH_AUTHENTICATION,
  SET_DISPATCHER,
  TRANSACTION_INDEXED,
  VERIFY_AUTHENTICATION,
} from "./gqlqueries";
import moment from "moment";
import { convertIntoIpfsUrl } from "./Utils";

const API_URL = "https://api-mumbai.lens.dev";
const httpLink = new HttpLink({ uri: API_URL });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("accessToken");

  operation.setContext({
    headers: {
      "x-access-token": token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const getChallengeText = async (address) => {
  return await apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address,
      },
    },
  });
};

export const getAuthentication = async (address, signature) => {
  return await apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature,
      },
    },
  });
};

export const getProfile = async (address) => {
  return await apolloClient.query({
    query: gql(GET_PROFILE),
    variables: {
      request: {
        ownedBy: [`${address}`],
        limit: 5,
      },
    },
  });
};

export const getPublication = async (profileId, limit = 10) => {
  return await apolloClient.query({
    query: gql(GET_PUBLICATIONS),
    variables: {
      request: {
        profileId: profileId,
        publicationTypes: ["POST"],
        limit,
        metadata: {
          mainContentFocus: "IMAGE",
        },
      },
    },
  });
};

export const getCommentFeed = async (publicationId, limit = 10) => {
  return await apolloClient.query({
    query: gql(GET_PUBLICATIONS),
    variables: {
      request: {
        commentsOf: publicationId,
        limit,
        metadata: {
          mainContentFocus: "IMAGE",
        },
      },
    },
  });
};

export const getLastCommentsOfPosts = async (profileId) => {
  const dataObject = [];
  const resp = await getPublication(profileId, 5);
  const publicationItems = resp.data.publications.items;
  for (let i = 0; i < publicationItems.length; i++) {
    const item = publicationItems[i];
    const comments = await getCommentFeed(item.id, 3);
    const commentsArray = [];
    comments.data.publications.items.map(async (comment) => {
      //   console.log(comment.id);
      const commentData = {
        imageUrl: convertIntoIpfsUrl(comment.metadata.media[0].original.url),
        profileHandle: comment.profile.handle,
        name: comment.profile.name,
        createdAt: moment(comment.createdAt).format("h:mm a"),
      };
      commentsArray.push(commentData);
    });

    dataObject.push({
      pubId: item.id,
      createdAt: moment(item.createdAt).format("Do MMMM YYYY"),
      comments: commentsArray,
      timeDifference: moment(item.createdAt).fromNow(),
    });
    // console.log({ comments, pubId: item.id });
  }
  console.log({ dataObject });
  return dataObject;
};

export const setDispatcher = async (profileId) => {
  return apolloClient.mutate({
    mutation: gql(SET_DISPATCHER),
    variables: {
      request: {
        profileId,
      },
    },
  });
};

export async function txIndexed(txHash) {
  console.log({ txHash });
  const resp = await apolloClient.query({
    query: gql(TRANSACTION_INDEXED),
    variables: {
      request: {
        txHash,
      },
    },
  });
  console.log({ resp });
}

export async function commentViaDispatcher(
  profileId,
  publicationId,
  contentURI,
  isInTime = true
) {
  const resp = await apolloClient.mutate({
    mutation: gql(CREATE_COMMENT_VIA_DISPATCHER),
    variables: {
      request: {
        profileId,
        publicationId,
        contentURI,
        collectModule: isInTime
          ? {
              timedFeeCollectModule: {
                amount: {
                  currency: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
                  value: "0.01",
                },
                recipient: "0xcb85EE8a3166Fcd77cC5A0ee9d6730012AE1F38c",
                referralFee: 0,
                followerOnly: false,
              },
            }
          : {
              revertCollectModule: true,
            },
      },
    },
  });
  console.log({ resp });
}

export const refreshAuthentication = async () => {
  const res = await apolloClient.mutate({
    mutation: gql(REFRESH_AUTHENTICATION),
    variables: {
      refreshToken: window.localStorage.getItem("refreshToken"),
    },
  });
  console.log({ res });
  const { accessToken, refreshToken } = res.data?.refresh;
  window.localStorage.setItem("accessToken", accessToken);
  window.localStorage.setItem("refreshToken", refreshToken);
};

export const verifyAuthentication = async () => {
  const res = await apolloClient.mutate({
    mutation: gql(VERIFY_AUTHENTICATION),
    variables: {
      refreshToken: window.localStorage.getItem("accessToken"),
    },
  });
  console.log({ res });
  return res?.data?.verify;
};

export const collectPost = async () => {
  return await apolloClient.mutate({
    mutation: gql(CREATE_COLLECT),
    variables: {
      request: {
        publicationId: "0x5670-0x02",
      },
    },
  });
};
