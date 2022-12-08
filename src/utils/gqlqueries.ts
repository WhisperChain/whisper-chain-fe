export const GET_CHALLENGE = `query($request: ChallengeRequest!) {
    challenge(request: $request) {
          text
      }
    }
  `;

export const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
  `;

export const GET_PROFILE = `
  query Profiles($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        id
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
      }
    }
  }`;

export const GET_PUBLICATIONS = `query Publications($request: PublicationsQueryRequest!) {
    publications(request: $request) {
      items {
        __typename
        ... on Post {
          ...PostFields,
          hasCollectedByMe,
        }
        ... on Comment {
          ...CommentFields
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }

  fragment MediaFields on Media {
    url
    mimeType
  }

  fragment ProfileFields on Profile {
    id
    name
    bio
    attributes {
       displayType
       traitType
       key
       value
    }
    handle
    ownedBy
    picture {
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
  }

  fragment PublicationStatsFields on PublicationStats {
    totalAmountOfMirrors
    totalAmountOfCollects
    totalAmountOfComments
    totalUpvotes
    totalDownvotes
  }

  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    tags
    media {
      original {
        ...MediaFields
      }
    }
    attributes {
      displayType
      traitType
      value
    }
  }

  fragment Erc20Fields on Erc20 {
    name
    symbol
    decimals
    address
  }

  fragment PostFields on Post {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ...ReferenceModuleFields
    }
    appId
    hidden
    reaction(request: null)
    mirrors(by: null)
    hasCollectedByMe
  }

  fragment CommentBaseFields on Comment {
    id
    profile {
      ...ProfileFields
    }
    stats {
      ...PublicationStatsFields
    }
    metadata {
      ...MetadataOutputFields
    }
    createdAt
    collectModule {
      ...CollectModuleFields
    }
    referenceModule {
      ...ReferenceModuleFields
    }
    appId
    hidden
    reaction(request: null)
    mirrors(by: null)
    hasCollectedByMe
  }

  fragment CommentFields on Comment {
    ...CommentBaseFields
    mainPost {
      ... on Post {
        ...PostFields
      }
     }
  }

  fragment CollectModuleFields on CollectModule {
    __typename
    ... on FreeCollectModuleSettings {
      type
      followerOnly
      contractAddress
    }
    ... on FeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
    }
    ... on LimitedTimedFeeCollectModuleSettings {
      type
      collectLimit
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
    ... on RevertCollectModuleSettings {
      type
    }
    ... on TimedFeeCollectModuleSettings {
      type
      amount {
        asset {
          ...Erc20Fields
        }
        value
      }
      recipient
      referralFee
      endTimestamp
    }
    ... on UnknownCollectModuleSettings {
      type
      contractAddress
      collectModuleReturnData
    }
  }

  fragment ReferenceModuleFields on ReferenceModule {
    ... on FollowOnlyReferenceModuleSettings {
      type
      contractAddress
    }
    ... on UnknownReferenceModuleSettings {
      type
      contractAddress
      referenceModuleReturnData
    }
    ... on DegreesOfSeparationReferenceModuleSettings {
      type
      contractAddress
      commentsRestricted
      mirrorsRestricted
      degreesOfSeparation
    }
  }`;

export const SET_DISPATCHER = `mutation CreateSetDispatcherTypedData($request: SetDispatcherRequest!) {
    createSetDispatcherTypedData(request:$request) {
      id
      expiresAt
      typedData {
        types {
          SetDispatcherWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          dispatcher
        }
      }
    }
  }`;

export const TRANSACTION_INDEXED = `query TxIndexed($request: HasTxHashBeenIndexedRequest!) {
    hasTxHashBeenIndexed(request: $request){
      ... on TransactionIndexedResult {
        indexed
        metadataStatus {
          status
          reason
        }
      }
      ... on TransactionError {
        reason
      }
      __typename
    }
  }`;

export const CREATE_COMMENT_VIA_DISPATCHER = `mutation CreateCommentViaDispatcher($request: CreatePublicCommentRequest!) {
    createCommentViaDispatcher(request: $request) {
      ... on RelayerResult {
        txHash
        txId
      }
      ... on RelayError {
        reason
      }
    }
  }`;

export const REFRESH_AUTHENTICATION = `
mutation Refresh($refreshToken: Jwt!) {
  refresh(request: {
    refreshToken: $refreshToken
  }) {
    accessToken
    refreshToken
  }
}
`;

export const VERIFY_AUTHENTICATION = `
query Query($accessToken: Jwt!) {
    verify(request: {
      accessToken: $accessToken
    })
  }
`;

export const CREATE_COLLECT = `mutation CreateCollectTypedData($request: CreateCollectRequest!) {
    createCollectTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          CollectWithSig {
            name
            type
          }
        }
        domain {
          name
          chainId
          version
          verifyingContract
        }
        value {
          nonce
          deadline
          profileId
          pubId
          data
        }
      }
    }
  }`;
