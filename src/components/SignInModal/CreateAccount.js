import React from "react";
import Modal from "react-modal";
import CreateAccLogo from "../../assets/createAccLogo";
import { useAccount } from "wagmi";
import { createProfile, txIndexed } from "../../utils/lensFunction";
import ProfileCreatedSucces from "./ProfileCreatedSucces";
import styles from "./SignInModal.module.css";
import { getProfile } from "../../utils/lensFunction";

const CreateAccount = ({ onRequestClose, isOpen }) => {
  const [userNameTaken, setUserNameTaken] = React.useState(false);
  const [userNameEmpty, setUserNameEmpty] = React.useState(false);
  const [errorText, setErrorText] = React.useState("");
  const [userNameText, setUserNameText] = React.useState("");
  const dispatcher = React.useRef(null);
  const { address } = useAccount();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
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

  let timeout = 0;

  const hasTxIndexed = async (txHash) => {
    const indexedRes = await txIndexed(txHash);

    return indexedRes.data?.hasTxHashBeenIndexed.indexed;
  };

  const pollIndexing = async (res) => {
    let isIndexed = false;

    // poll indexing
    timeout = setInterval(() => {
      isIndexed = hasTxIndexed(res);
      if (!!isIndexed) {
        clearInterval(timeout);
        onRequestClose(false);
        (async function () {
          const profileRes = await getProfile(address);
          const profile = profileRes.data.profiles.items[0];
          // console.log("profile-----" + profile);
          dispatcher.current = profile.dispatcher;
          window.localStorage.setItem("profileId", profile.id);
          window.localStorage.setItem("profile", JSON.stringify(profile));
        })();

        handleOpen();

        setTimeout(() => {
          handleClose(true);
        }, 3000);
      }
    }, 500);
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
    <div>
      <Modal
        onRequestClose={onRequestClose}
        isOpen={isOpen}
        style={customStyles}
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
              onChange={(e) => {
                setUserNameText(e.target.value);
                setUserNameEmpty(false);
                setUserNameTaken(false);
                if (!e.target.value.replace(/\s/g, "").length) {
                  setErrorText("Username can not be empty");
                  setUserNameEmpty(true);
                } else {
                  setUserNameEmpty(false);
                }
              }}
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
                onClick={() => {
                  handleCreateAcc();
                }}
                className={`mt-[15px] flex justify-center p-[10px] text-white cursor-pointer ${styles.createAccBtn}`}
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
      <ProfileCreatedSucces onRequestClose={handleClose} isOpen={open} />
    </div>
  );
};

export default CreateAccount;
