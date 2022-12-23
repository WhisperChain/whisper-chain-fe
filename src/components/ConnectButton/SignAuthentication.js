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
import CreateAccount from "../SignInModal/CreateAccount";


function SignAuthentication({ onSignInComplete, createAccount }) {
  const { address } = useAccount();
  const typedDataRef = React.useRef({});
  const [typedData, setTypedData] = useState(typedDataRef.current);
  const enableDispatcherTxnId = React.useRef();
  const { signMessageAsync } = useSignMessage();
  const dispatcher = React.useRef(null);
  const isModalOpen = React.useRef(false);

  const [profileNotCreated, setProfileNotCreated] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

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
      // console.log("profile-----"+profile.id);
      if(profile){
      dispatcher.current = profile.dispatcher;
      window.localStorage.setItem("profileId", profile.id);
      window.localStorage.setItem("profile", JSON.stringify(profile));
      onSignInComplete?.();
      }
      else{
        setProfileNotCreated(true);
        handleOpen();
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
      {createAccount ? 
      "" :
      <div>Signing...</div>
      }
      {profileNotCreated && 
        <CreateAccount
            onRequestClose={handleClose}
            isOpen={open} 
        />
      }
    </>
    // <div>
    //   {window.localStorage.getItem("profileId") ? (
    //     <Image
    //       src={window.localStorage.getItem("profileImageUrl") || "https://cdn.stamp.fyi/avatar/eth:0x3a72452af2ddc056330bbcb43898134c9adb51cf?s=250"}
    //       alt="profile"
    //       className="rounded-[18px]"
    //       width={36}
    //       height={36}
    //     />
    //   ) : null}
    //  Enable Dispatcher Flow
    // {JSON.parse(window.localStorage.getItem("profile"))?.dispatcher
    //   ?.address ? null : (
    //   <div>
    //     <button style={{ color: "white" }} onClick={enableDispatcher}>
    //       Enable Dispatcher
    //     </button>
    //     {Object.keys(typedData)?.length > 0 ? (
    //       <SignTypedData
    //         typedData={typedDataRef.current}
    //         id={enableDispatcherTxnId.current}
    //         onSuccess= {async ()=>{
    //           const profileRes = await getProfile(address);
    //           const profile = profileRes.data.profiles.items[0];
    //           window.localStorage.setItem("profile", JSON.stringify(profile));}}
    //       />
    //     ) : null}
    //   </div>
    // )}
    // </div>
  );
}

export default SignAuthentication;
