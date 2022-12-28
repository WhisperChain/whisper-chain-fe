import React, { useEffect, useState } from "react";
import styles from "./SignInModal.module.css";
import Modal from "react-modal";
import CustomConnectButton from "../ConnectButton";
import CheckedCircle from "../../assets/CheckedCircle";
import SignTypedData from "../ConnectButton/SignTypedData";
import {
  getProfile,
  setDispatcher,
  refreshAuthentication,
} from "../../utils/lensFunction";
import { useAccount } from "wagmi";
import toast, { Toaster } from 'react-hot-toast';

const SignInModal = ({ onRequestClose, isOpen, onSignInComplete }) => {
  const [openDispatcherModal, setOpenDispatcherModal] = React.useState(false);
  const [openToast, setOpenToast] = React.useState(false);
  // const signInModalCloseHandler = React.useCallback(() => {
  //   setOpenSignInModal(false);
  //   setOpenDispatcherModal(true);
  // });

  // const signInModalOpenHandler = React.useCallback(() => {
  //   setOpenSignInModal(true);
  // });
  const { address } = useAccount();

  const notify = () => toast('Here is your toast.');

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

  const customStyles = {
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

  let isEnableDispatcher;
  if (typeof window !== "undefined") {
    isEnableDispatcher = JSON.parse(window.localStorage.getItem("profile"))
      ?.dispatcher?.address;
  }

  const typedDataRef = React.useRef({});
  const [typedData, setTypedData] = useState(typedDataRef.current);

  const enableDispatcherTxnId = React.useRef();

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

  return (
    <>
      <Modal
        onRequestClose={onRequestClose}
        isOpen={isOpen}
        style={customStyles}
      >
        <div
          className={`flex flex-col justify-start items-start bg-[#FFFFFF] rounded-[16px] backdrop-blur-3xl gap-[16px] p-[40px] ${styles.ModalContainer}`}
        >
          <CustomConnectButton
            onSignInComplete={onSignInComplete}
            setOpenDispatcherModal={setOpenDispatcherModal}
          />
          <div
            className={`flex justify-start flex-col gap-[12px] not-italic text-[12px] font-medium ${styles.LensInfo}`}
          >
            <div className="flex gap-[8px] justify-start items-center">
              <CheckedCircle />
              Play with Lens frens
            </div>
            <div className="flex gap-[8px] justify-start items-center">
              <CheckedCircle />
              Post your whispers
            </div>
            <div className="flex gap-[8px] justify-start items-center">
              <CheckedCircle />
              Like and collect other whispers
            </div>
            <div className="flex justify-start items-center text-[13px] leading-[160%] font-medium text-[#00000099]">
              New to Lens?
              <span
                className="underline text-[#00501E]"
                onClick={() => {
                  window.open("https://claim.lens.xyz/", "_blank");
                }}
              >
                Create an account
              </span>
            </div>
          </div>
          {/* <button className={`flex justify-center box-border items-center w-[234px] h-[40px] backdrop-blur rounded-[4px] ${styles.TwitterContainer}`}>Sign in with Twitter</button>
        <button className={`flex justify-center box-border items-center w-[234px] h-[40px] backdrop-blur rounded-[4px] ${styles.FarcasterContainer}`}>Sign in with farcaster</button> */}
        </div>
      </Modal>

      {isEnableDispatcher ? null : (
        <Modal
          onRequestClose={onRequestClose}
          isOpen={openDispatcherModal}
          style={customModalStyles}
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
          {Object.keys(typedData)?.length > 0 ? (
            <SignTypedData
              typedData={typedDataRef.current}
              id={enableDispatcherTxnId.current}
              onSuccess={async () => {
                const profileRes = await getProfile(address);
                const profile = profileRes.data.profiles.items[0];
                window.localStorage.setItem("profile", JSON.stringify(profile));
                setOpenDispatcherModal(false);
              }}
            />
          ) : null}
        </Modal>
      )}
      <div>
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </>
  );
};

export default SignInModal;
