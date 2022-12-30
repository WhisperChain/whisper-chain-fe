import React, { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { Constants } from "../../utils/Constants";
import {
  getAuthentication,
  getChallengeText,
  getProfile,
  refreshAuthentication,
  setDispatcher,
} from "../../utils/lensFunction";
import { loginApi } from "../../utils/Utils";
import toast from "react-hot-toast";
import ToastIcon from "../../assets/ToastIcon";

function SignAuthentication({ onSignInComplete, setOpenDispatcherModal }) {
  const { address } = useAccount();
  const typedDataRef = React.useRef({});
  const [typedData, setTypedData] = useState(typedDataRef.current);
  const enableDispatcherTxnId = React.useRef();
  const { signMessageAsync } = useSignMessage();
  const dispatcher = React.useRef(null);
  const isModalOpen = React.useRef(false);

  const notify = (notifyText) =>
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md bg-white shadow-lg rounded-[16px] pointer-events-auto flex justify-center items-center ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 pt-0.5">
              <ToastIcon />
            </div>
            <p className="ml-[10px] text-[14px] text-[#000000] opacity-80">
              {notifyText}
            </p>
          </div>
        </div>
      </div>
    ));

  const [signParam, setSignParam] = React.useState({
    wallet_address: address,
  });

  const callLoginApi = async () => {
    await loginApi(signParam);
  };

  const getChallenge = async () => {
    const resp = await getChallengeText(address);
    const challangeMessage = resp.data.challenge.text;
    signParam.challenge_message = challangeMessage;
    setSignParam(signParam);
    return challangeMessage;
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

      signParam.platform_profile_image_url = profile.picture?.original?.url;
      signParam.platform_user_id = profile.id;
      signParam.platform_display_name = profile.name ? profile.name : "";
      signParam.platform_username = profile.handle;
      setSignParam(signParam);

      dispatcher.current = profile.dispatcher;
      window.localStorage.setItem("profileId", profile.id);
      window.localStorage.setItem("profile", JSON.stringify(profile));
      onSignInComplete?.();
      callLoginApi();

      let isEnableDispatcher;
      if (typeof window !== "undefined") {
        isEnableDispatcher = JSON.parse(window.localStorage.getItem("profile"))
          ?.dispatcher?.address;
      }
      setOpenDispatcherModal(true);
      if (isEnableDispatcher !== undefined) {
        notify("You’re on the Lens Testnet");
      }
    } catch (error) {
      console.log({ error });
      onSignInComplete?.();
    }
  };

  async function signMsg() {
    if (address) {
      try {
        const challenge = await getChallenge();
        const signature = await signMessageAsync({
          message: challenge,
        });
        signParam.signed_challenge_message = signature;
        setSignParam(signParam);
        console.log(
          "signParam.signed_challenge_message",
          signParam.signed_challenge_message
        );
        authenticate(signature);
        isModalOpen.current = false;
      } catch (error) {
        onSignInComplete?.();
        if (error) notify("user rejected signing");
      }
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
      <div>Signing...</div>
      {/* <div>
      {window.localStorage.getItem("profileId") ? (
        <Image
          src={window.localStorage.getItem("profileImageUrl") || "https://cdn.stamp.fyi/avatar/eth:0x3a72452af2ddc056330bbcb43898134c9adb51cf?s=250"}
          alt="profile"
          className="rounded-[18px]"
          width={36}
          height={36}
        />
      ) : null}
     Enable Dispatcher Flow
    {JSON.parse(window.localStorage.getItem("profile"))?.dispatcher
      ?.address ? null : (
      <div>
        <button style={{ color: "white" }} onClick={enableDispatcher}>
          Enable Dispatcher
        </button>
        {Object.keys(typedData)?.length > 0 ? (
          <SignTypedData
            typedData={typedDataRef.current}
            id={enableDispatcherTxnId.current}
            onSuccess= {async ()=>{
              const profileRes = await getProfile(address);
              const profile = profileRes.data.profiles.items[0];
              window.localStorage.setItem("profile", JSON.stringify(profile));}}
          />
        ) : null}
      </div>
    )}
    </div> */}
    </>
  );
}

export default SignAuthentication;
