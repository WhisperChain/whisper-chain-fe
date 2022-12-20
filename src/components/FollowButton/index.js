import React from "react";
import { useSigner } from "wagmi";
import LoaderSvgIcon from "../../assets/loaderSvgIcon";
import PlusIcon from "../../assets/PlusIcon";
import { getApprovedModuleAllowance, refreshAuthentication, requestFollow } from "../../utils/lensFunction";
import SignTypedData from "../ConnectButton/SignTypedData";
import styles from "./followbutton.module.css";

const FollowButton = (
  imgData,
) => {
  const { data: signer } = useSigner();
  const followRequestId = React.useRef({});
  const [followed, setFollowed] = React.useState(false);
  const [followLoadingState, setFollowLoadingState] = React.useState(false);
  const [typedData, setTypedData] = React.useState({});

  const onSignTypedDataSuccess = () => {
    setFollowed(true);
    setFollowLoadingState(false);
  }

  const onFollowClickHandler = async () => {
    setFollowLoadingState(true);
    await refreshAuthentication();
    if (imgData?.data?.followModule) {
      await getApprovedModuleAllowance(
        imgData?.data?.followModule,
        signer
      );
    }
    const res = await requestFollow(
      imgData?.data?.profileId,
      imgData?.data?.followModule ?? null
    );
    followRequestId.current = res.data?.createFollowTypedData?.id;
    setTypedData(res.data?.createFollowTypedData?.typedData);
  }

  return (<>
    {imgData?.data?.isFollowedByMe || followed ? (
      <div className={styles.followBtn}>
        Following
      </div>
    ) : (
      followLoadingState ? (
        <div className="flex justify-center items-center w-[100px] z-20">
          <LoaderSvgIcon color="#FFFFFF" />
        </div>
      ) : (
        <button
          className="flex justify-center items-center gap-[6px] z-20"
          onClick={onFollowClickHandler}
        >
          <PlusIcon />
          <div className={styles.followBtn}>
            Follow
          </div>
        </button>
      )
    )}
    {
      Object.keys(typedData)?.length > 0 ? (
        <SignTypedData
          typedData={typedData}
          id={followRequestId.current}
          onSuccess={onSignTypedDataSuccess}
          pollIndexing={true}
        />
      ) : null
    }
  </>)
}

export default FollowButton;