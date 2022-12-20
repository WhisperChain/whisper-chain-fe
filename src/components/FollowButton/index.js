import React from "react";
import { useSigner } from "wagmi";
import LoaderSvgIcon from "../../assets/loaderSvgIcon";
import PlusIcon from "../../assets/PlusIcon";
import { Constants } from "../../utils/Constants";
import {
  getApprovedModuleAllowance,
  refreshAuthentication,
  requestFollow,
} from "../../utils/lensFunction";
import SignTypedData from "../ConnectButton/SignTypedData";
import SignInModal from "../SignInModal";
import styles from "./followbutton.module.css";

const FollowButton = (imgData) => {
  const { data: signer } = useSigner();
  const followRequestId = React.useRef({});
  const [followed, setFollowed] = React.useState(false);
  const [followLoadingState, setFollowLoadingState] = React.useState(false);
  const [typedData, setTypedData] = React.useState({});
  const [isOpen, setIsOpen] = React.useState(false);

  const onSignTypedDataSuccess = () => {
    setFollowed(true);
    setFollowLoadingState(false);
  };

  const onFollowClickHandler = async () => {
    if (
      window.localStorage.getItem(Constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY)
    ) {
      setFollowLoadingState(true);
      await refreshAuthentication();
      if (imgData?.data?.followModule) {
        await getApprovedModuleAllowance(imgData?.data?.followModule, signer);
      }
      const res = await requestFollow(
        imgData?.data?.profileId,
        imgData?.data?.followModule ?? null
      );
      followRequestId.current = res.data?.createFollowTypedData?.id;
      setTypedData(res.data?.createFollowTypedData?.typedData);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      {imgData?.data?.isFollowedByMe || followed ? (
        <div className={styles.followBtn}>Following</div>
      ) : followLoadingState ? (
        <div className="flex justify-center items-center w-[100px] z-20">
          <LoaderSvgIcon color="#FFFFFF" />
        </div>
      ) : (
        <button
          className="flex justify-center items-center gap-[6px] z-20"
          onClick={onFollowClickHandler}
        >
          <PlusIcon />
          <div className={styles.followBtn}>Follow</div>
        </button>
      )}

      <SignInModal
        onRequestClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
        onSignInComplete={onFollowClickHandler}
      />
      {Object.keys(typedData)?.length > 0 ? (
        <SignTypedData
          typedData={typedData}
          id={followRequestId.current}
          onSuccess={onSignTypedDataSuccess}
          pollIndexing={true}
        />
      ) : null}
    </>
  );
};

export default FollowButton;
