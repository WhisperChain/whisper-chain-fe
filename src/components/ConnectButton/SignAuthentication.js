import React, { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { Constants } from "../../utils/Constants";
import {
  getAuthentication,
  getChallengeText,
  getProfile,
  refreshAuthentication,
  setDispatcher,
  txIndexed,
} from "../../utils/lensFunction";

function SignAuthentication({
  onSignInComplete,
  setCreateProfileModal,
  createAccount,
}) {
  const { address } = useAccount();
  const typedDataRef = React.useRef({});
  // const [typedData, setTypedData] = useState(typedDataRef.current);
  // const enableDispatcherTxnId = React.useRef();
  const { signMessageAsync } = useSignMessage();
  const dispatcher = React.useRef(null);
  const isModalOpen = React.useRef(false);
  const enableDispatcherTxnId = React.useRef();
  const getChallenge = async () => {
    const resp = await getChallengeText(address);
    return resp.data.challenge.text;
  };

  const customModalStyles = {
    content: {
      background: "#FFFFFF",
      height: "fit-content",
      width: "fit-content",
      margin: "auto",
      backdropFilter: "blur(60px)",
      borderRadius: "16px",
      padding: "0px",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.6)",
    },
  };

  const authenticate = async (signature) => {
    try {
      const res = await getAuthentication(address, signature);
      const { accessToken, refreshToken } = res.data.authenticate;
      window.localStorage.setItem(
        Constants.LOCAL_STORAGE_ACCESS_TOKEN_KEY,
        accessToken
      );
      window.localStorage.setItem(
        Constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY,
        refreshToken
      );
      const profileRes = await getProfile(address);
      const profile = profileRes.data.profiles.items[0];

      onSignInComplete?.();

      if (profile) {
        dispatcher.current = profile.dispatcher;
        window.localStorage.setItem("profileId", profile.id);
        window.localStorage.setItem("profile", JSON.stringify(profile));
        // remove later
        setCreateProfileModal(true);
      } else {
        setCreateProfileModal(true);
      }
    } catch (error) {
      console.log({ error });
      onSignInComplete?.();
    }
  };

  async function signMsg() {
    if (address) {
      const challenge = await getChallenge();
      const signature = await signMessageAsync({
        message: challenge,
      });
      authenticate(signature);
      isModalOpen.current = false;
    } else {
      alert("Connect Wallet to sign In");
      isModalOpen.current = false;
    }
  }

 
  const enableDispatcher = async () => {
    refreshAuthentication();
    const res = await setDispatcher(window.localStorage.getItem("profileId"));
    enableDispatcherTxnId.current = res.data?.createSetDispatcherTypedData?.id;
    const dispatcherTypedData =
      res.data?.createSetDispatcherTypedData?.typedData;
    delete dispatcherTypedData.domain.__typename;
    delete dispatcherTypedData.types.__typename;
    delete dispatcherTypedData.value.__typename;

    typedDataRef.current = dispatcherTypedData;
    setTypedData(typedDataRef.current);
  };


  useEffect(() => {
    if (
      !window.localStorage.getItem(Constants.LOCAL_STORAGE_REFRESH_TOKEN_KEY) &&
      !isModalOpen.current
    ) {
      isModalOpen.current = true;
      signMsg();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!createAccount && <div>Signing...</div>}
      {/* Enable dispatcher modal */}

      {JSON.parse(window.localStorage.getItem("profile"))?.dispatcher
        ?.address ? null : (
        <div>
          <Modal
            onRequestClose={signInModalCloseHandler}
            isOpen={openSignInModal}
            style={customModalStyles}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
          >
            <div
              className={`flex flex-col justify-start items-start bg-[#FFFFFF] rounded-[16px] backdrop-blur-3xl gap-[16px] p-[40px] ${styles.ModalContainer}`}
            >
              <div>
                <div
                  className={`flex justify-center box-border items-center w-[234px] h-[40px] bg-[#ABFE2C] text-[#00501E] backdrop-blur rounded-[4px] gap-[8px] cursor-pointer border-[1px] border-solid border-black/20`}
                  onClick={enableDispatcher}
                >
                  Enable Dispatcher
                </div>
              </div>
              <div
                className={`flex justify-start flex-col gap-[12px] not-italic text-[12px] font-medium ${styles.LensInfo}`}
              >
                <div className="flex gap-[8px] justify-start items-center">
                  <CheckedCircle />
                  Automatically sign transactions
                </div>
                <div className="flex gap-[8px] justify-start items-center">
                  <CheckedCircle />
                  Completely secure
                </div>
              </div>
            </div>
          </Modal>
          {Object.keys(typedData)?.length > 0 ? (
            <SignTypedData
              typedData={typedDataRef.current}
              id={enableDispatcherTxnId.current}
              onSuccess={async () => {
                const profileRes = await getProfile(address);
                const profile = profileRes.data.profiles.items[0];
                window.localStorage.setItem("profile", JSON.stringify(profile));
              }}
            />
          ) : null}
        </div>
      )}
    </>
  );
}

export default SignAuthentication;
