import React from "react";
import Modal from "react-modal";
import CheckIcon from "../../assets/CheckIcon";
import CreateAccLogo from "../../assets/createAccLogo";
import styles from "./SignInModal.module.css";

const ProfileCreatedSucces = ({ onRequestClose, isOpen }) => {

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

    return (
        <Modal onRequestClose={onRequestClose} isOpen={isOpen} style={customStyles}>
            <div className="flex flex-col justify-center items-center w-[314px] h-[190px]">
                <CheckIcon />
                <p className="font-bold text-[16px] mt-[20px] text-black">Profile created successfully</p>
            </div>
        </Modal>
    );
};

export default ProfileCreatedSucces;
