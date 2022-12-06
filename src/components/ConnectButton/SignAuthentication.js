import React, { useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import {
  getAuthentication,
  getChallengeText,
  getProfile,
} from "../../utils/lensFunction";

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
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("refreshToken", refreshToken);
      const profileRes = await getProfile(address);
      console.log(profileRes.data.profiles.items);
      window.localStorage.setItem(
        "profileId",
        profileRes.data.profiles.items[0].id
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
    if (!window.localStorage.getItem("refreshToken") && !isModalOpen.current) {
      isModalOpen.current = true;
      signMsg();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {window.localStorage.getItem("profileId") ? (
        <img
          src={`https://cdn.stamp.fyi/avatar/eth:${address}?s=250`}
          alt="profile"
          style={{ width: 36, height: 36, borderRadius: 18 }}
        />
      ) : null}
    </div>
  );
}

export default SignAuthentication;
