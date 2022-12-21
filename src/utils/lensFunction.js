import {
  ApolloClient,
  ApolloLink,
  gql,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  APPROVED_MODULE_ALLOWANCE,
  AUTHENTICATION,
  BROADCAST,
  CREATE_COLLECT,
  CREATE_COMMENT_VIA_DISPATCHER,
  GENERATE_MODULE_CURRENCY_APPROVAL,
  GET_CHALLENGE,
  GET_PROFILE,
  GET_PUBLICATIONS,
  REFRESH_AUTHENTICATION,
  REQUEST_FOLLOW_QUERY,
  SET_DISPATCHER,
  TRANSACTION_INDEXED,
  VERIFY_AUTHENTICATION,
} from "./gqlqueries";
import { Constants } from "./Constants";

const API_URL = "https://api-mumbai.lens.dev";
const httpLink = new HttpLink({ uri: API_URL });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(Constants.LOCAL_STORAGE_ACCESS_TOKEN_KEY);

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
  return await apolloClient.query({
    query: gql(TRANSACTION_INDEXED),
    variables: {
      request: {
        txHash,
      },
    },
  });
}

export async function commentViaDispatcher(
  profileId,
  publicationId,
  contentURI,
  address
) {
  return await apolloClient.mutate({
    mutation: gql(CREATE_COMMENT_VIA_DISPATCHER),
    variables: {
      request: {
        profileId,
        publicationId,
        contentURI,
        collectModule: {
          feeCollectModule: {
            amount: {
              currency: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
              value: "0.01",
            },
            recipient: address,
            referralFee: 0,
            followerOnly: false,
          },
        },
      },
    },
  });

  // txIndexed(resp?.data?.createPostViaDispatcher?.txHash);
}

export const refreshAuthentication = async () => {
  const res = await apolloClient.mutate({
    mutation: gql(REFRESH_AUTHENTICATION),
    variables: {
      refreshToken: window.localStorage.getItem(
        Constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY
      ),
    },
  });
  const { accessToken, refreshToken } = res.data?.refresh;
  window.localStorage.setItem(
    Constants.LOCAL_STORAGE_ACCESS_TOKEN_KEY,
    accessToken
  );
  window.localStorage.setItem(
    Constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY,
    refreshToken
  );
};

export const verifyAuthentication = async () => {
  const res = await apolloClient.query({
    query: gql(VERIFY_AUTHENTICATION),
    variables: {
      accessToken: window.localStorage.getItem(
        Constants.LOCAL_STORAGE_ACCESS_TOKEN_KEY
      ),
    },
  });
  return res?.data?.verify;
};

export const collectPost = async (publicationId) => {
  const res = await apolloClient.mutate({
    mutation: gql(CREATE_COLLECT),
    variables: {
      request: {
        publicationId,
      },
    },
  });
  return res;
};

export const broadcastRequest = async (request) => {
  const result = await apolloClient.mutate({
    mutation: gql(BROADCAST),
    variables: {
      request,
    },
  });

  return result?.data?.broadcast;
};

export const requestFollow = async (profileId, followModule) => {
  let module = null;
  if (followModule) {
    module = {
      feeFollowModule: {
        amount: {
          currency: followModule?.amount?.asset?.address,
          value: followModule?.amount?.value,
        },
      },
    };
  }
  return apolloClient.mutate({
    mutation: gql(REQUEST_FOLLOW_QUERY),
    variables: {
      request: {
        follow: [
          {
            profile: profileId,
            followModule: module,
          },
        ],
      },
    },
  });
};

export const getApprovedModuleAllowance = async (module, signer) => {
  let requestVariable;
  if (module?.type?.includes("Follow")) {
    requestVariable = module?.type
      ? {
          currencies: [module.amount.asset.address],
          followModules: [module.type],
        }
      : {
          currencies: ["0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"],
          followModules: ["FeeFollowModule"],
        };
  } else {
    requestVariable = module?.type
      ? {
          currencies: [module.amount.asset.address],
          collectModules: [module.type],
        }
      : {
          currencies: ["0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889"],
          collectModules: ["FeeCollectModule"],
        };
  }
  const res = await apolloClient.query({
    query: gql(APPROVED_MODULE_ALLOWANCE),
    variables: {
      request: requestVariable,
    },
  });
  const collectModules = res?.data?.approvedModuleAllowanceAmount;
  let allowanceValue = 0;
  collectModules?.map((module) => {
    parseInt(module.allowance, 16);
    allowanceValue = parseInt(module.allowance, 16) / Math.pow(10, 18);
  });
  if (allowanceValue < 5) {
    return await collectPostTx({
      currency:
        module?.amount?.asset?.address ??
        "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
      value: "100",
      moduleType: module?.type ?? "FeeCollectModule",
      isCollect: !module?.type?.includes("Follow"),
      signer,
    });
  } else {
    return;
  }
};

export const generateModuleCurrencyApproval = async ({
  currency,
  value,
  moduleType,
  isCollect = true,
}) => {
  const requestModule = isCollect
    ? {
        collectModule: moduleType || "FeeCollectModule",
      }
    : {
        followModule: moduleType || "FeeFollowModule",
      };
  const res = await apolloClient.query({
    query: gql(GENERATE_MODULE_CURRENCY_APPROVAL),
    variables: {
      request: {
        currency: currency || "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889",
        value: value || "10",
        ...requestModule,
      },
    },
  });
  return res;
};

export const collectPostTx = async ({
  currency,
  value,
  moduleType,
  isCollect = true,
  signer,
}) => {
  refreshAuthentication();
  const resp = await generateModuleCurrencyApproval({
    currency,
    value,
    moduleType,
    isCollect,
  });
  const generateModuleCurrencyApprovalData =
    resp.data.generateModuleCurrencyApprovalData;
  const tx1 = await signer.sendTransaction({
    to: generateModuleCurrencyApprovalData.to,
    from: generateModuleCurrencyApprovalData.from,
    data: generateModuleCurrencyApprovalData.data,
  });
  return tx1;
};
