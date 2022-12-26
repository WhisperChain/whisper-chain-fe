import React from "react";
import Logo from "../../assets/Logo";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { getProfileImage, resetLocalStorage } from "../../utils/Utils";
import Modal from "react-modal";
import SignOutLogo from "../../assets/SignOutLogo";
import Router from "next/router";
import styles from "./Header.module.css";
import CustomConnectButton from "../ConnectButton";
import CheckedCircle from "../../assets/CheckedCircle";
import ProfileCreatedSucces from "../SignInModal/ProfileCreatedSucces";
import CreateAccLogo from "../../assets/createAccLogo";
import {
  createProfile,
  getProfile,
  refetchActiveQueries,
  txIndexed,
} from "../../utils/lensFunction";
import { useAccount } from "wagmi";

Modal.setAppElement("#header");

const customStyles = {
  content: {
    display: "flex",
    background: "#FFFFFF",
    height: "54px",
    width: "240px",
    marginLeft: "auto",
    marginBottom: "auto",
    backdropFilter: "blur(60px)",
    borderRadius: "8px",
    padding: "0px",
    top: "88px",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    boxShadow:
      "0px 8px 8px -8px rgba(0, 0, 0, 0.2), 0px 16px 24px rgba(0, 0, 0, 0.16)",
    cursor: "pointer",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.4)",
  },
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

const Header = () => {
  const { address } = useAccount();
  const dispatcher = React.useRef(null);

  const [openSignInModal, setOpenSignInModal] = React.useState(false);
  const [openSignOutModal, setOpenSignOutModal] = React.useState(false);

  const signInModalCloseHandler = React.useCallback(() => {
    setOpenSignInModal(false);
  });

  const signInModalOpenHandler = React.useCallback(() => {
    setOpenSignInModal(true);
  });

  const logoutModalCloseHandler = React.useCallback(() => {
    setOpenSignOutModal(false);
  });

  const logoutModalOpenHandler = React.useCallback(() => {
    setOpenSignOutModal(true);
  });

  const [userNameTaken, setUserNameTaken] = React.useState(false);
  const [userNameEmpty, setUserNameEmpty] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [userNameText, setUserNameText] = React.useState("");

  const [createProfileModal, setCreateProfileModal] = React.useState(false);

  const createProfileModalCloseHandler = React.useCallback(() => {
    setCreateProfileModal(false);
  });

  const [successModal, setSuccessModal] = React.useState(false);

  const successModalCloseHandler = React.useCallback(() => {
    setSuccessModal(false);
  });

  const successModalOpenHandler = React.useCallback(() => {
    setSuccessModal(true);
  });

  const onInputChangeHandler = (e) => {
    setUserNameText(e.target.value);
    setUserNameEmpty(false);
    setUserNameTaken(false);
    if (!e.target.value.replace(/\s/g, "").length) {
      setErrorText("Username can not be empty");
      setUserNameEmpty(true);
    } else {
      setUserNameEmpty(false);
    }
  };

  let timeout = 0;

  const hasTxIndexed = async (txHash) => {
    const indexedRes = await txIndexed(txHash);

    return indexedRes.data?.hasTxHashBeenIndexed.indexed;
  };

  const pollIndexing = async (resTxHash) => {
    if (!resTxHash) return;

    setTimeout(async () => {
      // let isIndexedFlag = hasTxIndexed(resTxHash);
      const indexedRes = await txIndexed(resTxHash);

      const isIndexedFlag = indexedRes.data?.hasTxHashBeenIndexed.indexed;

      if (isIndexedFlag) {
        // debugger;
        setTimeout(async () => {
          await refetchActiveQueries();
          const profileRes = await getProfile(address);
          // debugger;
          const profile = profileRes.data.profiles.items[0];
          if (profile) {
            console.log("profile-----" + profile);
            dispatcher.current = profile.dispatcher;
            window.localStorage.setItem("profileId", profile.id);
            window.localStorage.setItem("profile", JSON.stringify(profile));
          }

          successModalOpenHandler();

          setTimeout(() => {
            successModalCloseHandler(true);
          }, 3000);
        }, 1000);
      }
    }, 5000);

    setTimeout(async () => {
      const profileRes = await getProfile(address);
      console.log({ profileRes });
    }, 1000);
  };

  const handleCreateAcc = async () => {
    const res = await createProfile(userNameText);
    if (res) {
      if (res.data.createProfile?.reason === "HANDLE_TAKEN") {
        setUserNameTaken(true);
      }

      await pollIndexing(res.data.createProfile.txHash);
    }
  };

  return (
    <>
      <div
        className="px-[50px] flex-row flex justify-between items-center w-full z-[10000] relative pt-[40px]"
        id="header"
      >
        <Logo />
        <div className="flex ml-auto gap-[16px]">
          <ConnectButton.Custom>
            {({ account, chain, authenticationStatus, mounted }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");
              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={signInModalOpenHandler}
                          className={` w-[92px] h-[36px] bg-[#FFFFFF] rounded-[40px] not-italic font-bold text-[#6F1AFF] ${styles.HeaderSignInbtn}`}
                        >
                          Sign In
                        </button>
                      );
                    }

                    return window?.localStorage.getItem("profileId") ? (
                      <>
                        <div
                          className="flex justify-center items-center gap-[8px] z-[111] cursor-pointer"
                          onClick={logoutModalOpenHandler}
                        >
                          <div
                            className={`box-border flex justify-center items-center  py-[4px] px-[16px] w-auto h-[36px] bg-[#FFFFFF] rounded-[40px] not-italic font-bold text-[#6F1AFF] ${styles.HeaderSignInbtn}`}
                          >
                            {
                              JSON.parse(window.localStorage.getItem("profile"))
                                ?.handle
                            }
                          </div>
                          <Image
                            src={
                              getProfileImage() ??
                              "https://cdn.stamp.fyi/avatar/eth:0x3a72452af2ddc056330bbcb43898134c9adb51cf?s=250"
                            }
                            alt="profile"
                            className="rounded-[18px]"
                            width={36}
                            height={36}
                          />
                        </div>
                        <Modal
                          onRequestClose={logoutModalCloseHandler}
                          isOpen={openSignOutModal}
                          style={customStyles}
                          ariaHideApp={false}
                        >
                          <div
                            className="flex flex-row items-center py-[15px] pl-[20px] color-red"
                            onClick={() => {
                              Router.reload();
                              logoutModalCloseHandler();
                              resetLocalStorage();
                            }}
                          >
                            <SignOutLogo />
                            <div className={`pl-[10px] ${styles.LogOutText}`}>
                              Logout
                            </div>
                          </div>
                        </Modal>
                      </>
                    ) : (
                      <></>
                    );
                    // <CreateAccount
                    //   onRequestClose={logoutModalCloseHandler}
                    //   isOpen={open}
                    // />
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>

      {/* Sign in modal */}
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
          <CustomConnectButton
            onSignInComplete={signInModalCloseHandler}
            setCreateProfileModal={setCreateProfileModal}
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
              <CustomConnectButton
                onSignInComplete={signInModalCloseHandler}
                setCreateProfileModal={setCreateProfileModal}
                btnText={"Create an account"}
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Create account on lens modal */}
      <Modal
        onRequestClose={createProfileModalCloseHandler}
        isOpen={createProfileModal}
        style={customModalStyles}
        shouldCloseOnOverlayClick={false}
        shouldCloseOnEsc={false}
      >
        <div className="flex justify-center items-center p-[30px]">
          <div>
            <h1 className="text-[16px] font-bold leading-[22px] text-[#000000] pb-[20px]">
              Create your lenster account
            </h1>
            <input
              type="text"
              placeholder="Enter your desired username"
              className={`p-[10px] ${styles.createInput}`}
              onChange={(e) => onInputChangeHandler(e)}
              value={userNameText}
            />
            {userNameTaken && (
              <p className={`p-[10px] ${styles.errorMessage}`}>
                This username is already taken. Please try <br /> again with a
                different one.
              </p>
            )}
            {userNameEmpty && (
              <p className={`p-[5px] text-[#cf3838] ${styles.emptyText}`}>
                {errorText}
              </p>
            )}
            <div>
              <a
                onClick={handleCreateAcc}
                className={`mt-[15px] flex justify-center p-[10px] text-white cursor-pointer ${
                  styles.createAccBtn
                } 
                ${
                  userNameEmpty || userNameTaken
                    ? "opacity-50 cursor-not-allowed	pointer-events-none"
                    : ""
                }
              `}
              >
                <span>
                  <CreateAccLogo />
                </span>
                <span className="ml-[10px]">Create account</span>
              </a>
            </div>
          </div>
        </div>
      </Modal>
      <ProfileCreatedSucces
        onRequestClose={successModalCloseHandler}
        isOpen={successModal}
      />

      {/* Enable dispatcher modal */}
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
    </>
  );
};

export default Header;
