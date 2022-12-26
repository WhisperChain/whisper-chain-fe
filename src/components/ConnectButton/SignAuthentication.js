import React, { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { Constants } from "../../utils/Constants";
import Modal from "react-modal";
import CheckedCircle from "../../assets/CheckedCircle";
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
  const [typedData, setTypedData] = useState(typedDataRef.current);
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

 
  
  const [openSignInModal, setOpenSignInModal] = React.useState(false);

  const signInModalCloseHandler = React.useCallback(() => {
    setOpenSignInModal(false);
  });

  // const signInModalOpenHandler = React.useCallback(() => {
  //   setOpenSignInModal(true);
  // });


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
    </>
  );
}

export default SignAuthentication;
