import React from "react";
import Modal from "react-modal";
import CreateAccLogo from "../../assets/createAccLogo";
import { createProfile } from "../../utils/lensFunction";
import ProfileCreatedSucces from "./ProfileCreatedSucces";
import styles from "./SignInModal.module.css";

const CreateAccount = ({ onRequestClose, isOpen }) => {
    const [userNameTaken, setUserNameTaken] = React.useState(false);
    const [userNameEmpty, setUserNameEmpty] = React.useState(false);
    const [userNameText, setUserNameText] = React.useState('');

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

    const handleCreateAcc = async() => {
        const res = await createProfile(userNameText);
        if(res.data.createProfile?.reason === "HANDLE_TAKEN")
        {
        setUserNameTaken(true);
        }
        else{
        onRequestClose(false);   
        handleOpen();
        setTimeout(() => {
            handleClose(true);
          }, 3000);
        }
    }

    

    return (
        <div>
            <Modal onRequestClose={onRequestClose} isOpen={isOpen} style={customStyles}>
                <div className="flex justify-center items-center p-[30px]">
                    <div>
                        <h1 className="text-[16px] font-bold leading-[22px] text-[#000000] pb-[20px]">Create your lenster account</h1>
                        <input
                            type="text"
                            placeholder="Enter your desired username"
                            className={`p-[10px] ${styles.createInput}`}
                            onChange={(e) => {
                                setUserNameText(e.target.value)
                                setUserNameEmpty(false)
                                if (!e.target.value.replace(/\s/g, '').length) {
                                    setUserNameEmpty(true)
                                }
                                else {
                                    setUserNameEmpty(false)
                                }
                            }}
                        />
                        {userNameTaken &&
                            <p className={`p-[10px] ${styles.errorMessage}`}>This username is already taken.
                                Please try <br /> again with a different one.
                            </p>
                        }
                        {userNameEmpty &&
                            <p className={`p-[5px] text-[#cf3838] ${styles.emptyText}`}>Username can not be empty
                            </p>
                        }
                        <div>
                            <a
                                onClick={() => {
                                    handleCreateAcc();
                                }} 
                                className={`mt-[15px] flex justify-center p-[10px] text-white ${styles.createAccBtn}`}>
                                <span><CreateAccLogo /></span>
                                <span className="ml-[10px]">Create account</span>
                            </a>
                        </div>
                    </div>
                </div>
            </Modal>
            <ProfileCreatedSucces
                onRequestClose={handleClose}
                isOpen={open} />
        </div>
    );
};

export default CreateAccount;
