import React, { useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import Image from "next/image";
import { Constants } from "../../utils/Constants";
import {
  getAuthentication,
  getChallengeText,
  getProfile,
} from "../../utils/lensFunction";
import { convertIntoIpfsUrl } from "../../utils/Utils";

function SignAuthentication() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
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
      window.localStorage.setItem("profileId", profile.id);
      window.localStorage.setItem(
        "profileImageUrl",
        profile.picture
          ? convertIntoIpfsUrl(profile.picture?.original?.url)
          : `https://cdn.stamp.fyi/avatar/eth:${profile.ownedBy}?s=250`
      );
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
          src={window.localStorage.getItem("profileImageUrl") || "https://cdn.stamp.fyi/avatar/eth:0x3a72452af2ddc056330bbcb43898134c9adb51cf?s=250"}
          alt="profile"
          className="rounded-[18px]"
          width={36}
          height={36}
        />
      ) : null}
    </div>
  );
}

export default SignAuthentication;
