import React, { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import Image from "next/image";
import { Constants } from "../../utils/Constants";
import {
  getAuthentication,
  getChallengeText,
  getProfile,
  refreshAuthentication,
  setDispatcher,
} from "../../utils/lensFunction";
import { getProfileImage } from "../../utils/Utils";
import SignTypedData from "./SignTypedData";

function SignAuthentication() {
  const { address } = useAccount();
  const typedDataRef = React.useRef({});
  const [typedData, setTypedData] = useState(typedDataRef.current);
  const enableDispatcherTxnId = React.useRef();
  const { signMessageAsync } = useSignMessage();
  const dispatcher = React.useRef(null);
  const isModalOpen = React.useRef(false);

  const getChallenge = async () => {
    const resp = await getChallengeText(address);
    return resp.data.challenge.text;
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
      dispatcher.current = profile.dispatcher;
      window.localStorage.setItem("profileId", profile.id);
      window.localStorage.setItem("profile", JSON.stringify(profile));
    } catch (error) {
      console.log({ error });
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
    <div>
      {window.localStorage.getItem("profileId") ? (
        <Image
          src={getProfileImage()}
          alt="profile"
          className="rounded-[18px]"
          width={36}
          height={36}
        />
      ) : null}
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
            />
          ) : null}
        </div>
      )}
    </div>
  );
}

export default SignAuthentication;
