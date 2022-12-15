import React, { useEffect } from "react";
import { useSignTypedData, useAccount } from "wagmi";
import { getProfile, txIndexed } from "../../utils/lensFunction";
import { broadcastData } from "../../utils/Utils";

function SignTypedData({ id, typedData }) {
  delete typedData.domain.__typename;
  delete typedData.types.__typename;
  delete typedData.value.__typename;
  const { data, signTypedData } = useSignTypedData({
    domain: typedData.domain,
    types: typedData.types,
    value: typedData.value,
  });
  const { address } = useAccount();
  useEffect(() => {
    signTypedData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedData]);

  useEffect(() => {
    if (data) {
      if (id) {
        broadcastDataAndGetProfile();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const broadcastDataAndGetProfile = async () => {
    const res = await broadcastData(id, data);
    // let timeout = setTimeout(() => {
    //   hasTxIndexed();
    // }, 5000);
    // const hasTxIndexed = async () => {
    //   const indexedRes = await txIndexed(res?.txHash);

    //   if (indexedRes.data?.hasTxHashBeenIndexed.indexed) {
    //     const profileRes = await getProfile(address);
    //     const profile = profileRes.data.profiles.items[0];
    //     window.localStorage.setItem("profile", JSON.stringify(profile));
    //     clearTimeout(timeout);
    //   } else {
    //     timeout = setTimeout(hasTxIndexed, 5000);
    //   }
    // };
    const profileRes = await getProfile(address);
    const profile = profileRes.data.profiles.items[0];
    window.localStorage.setItem("profile", JSON.stringify(profile));
  };

  return;
}

export default SignTypedData;
