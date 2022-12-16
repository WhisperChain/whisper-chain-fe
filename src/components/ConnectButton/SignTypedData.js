import React, { useEffect } from "react";
import { useSignTypedData } from "wagmi";
import { getProfile, txIndexed } from "../../utils/lensFunction";
import { broadcastData } from "../../utils/Utils";

function SignTypedData({ id, typedData, onSuccess }) {
  delete typedData.domain.__typename;
  delete typedData.types.__typename;
  delete typedData.value.__typename;

  const { data, signTypedData } = useSignTypedData({
    domain: typedData.domain,
    types: typedData.types,
    value: typedData.value,
  });

  useEffect(() => {
    signTypedData();
  }, [typedData]);

  useEffect(() => {
    if (data) {
      if (id) {
        _BroadcastData();
      }
    }
  }, [data]);

  const _BroadcastData = async () => {
    const res = await broadcastData(id, data);
    console.log({ res });
    // let timeout = setTimeout(() => {
    //   hasTxIndexed();
    // }, 5000);
    // const hasTxIndexed = async () => {
    //   const indexedRes = await txIndexed(res?.txHash);

    //   if (indexedRes.data?.hasTxHashBeenIndexed.indexed) {
    //     onSuccess?.();
    //     clearTimeout(timeout);
    //   } else {
    //     timeout = setTimeout(hasTxIndexed, 5000);
    //   }
    // };
    onSuccess?.();
  };

  return;
}

export default SignTypedData;
