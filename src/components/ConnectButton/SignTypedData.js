import React, { useEffect } from "react";
import { useSignTypedData } from "wagmi";
import { getProfile, txIndexed } from "../../utils/lensFunction";
import { broadcastData } from "../../utils/Utils";

function SignTypedData({ id, typedData, onSuccess, pollIndexing = false }) {
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

  let timeout = 0;

  const hasTxIndexed = async (res) => {
    const indexedRes = await txIndexed(res?.txHash);

    return indexedRes.data?.hasTxHashBeenIndexed.indexed;
  };

  const _BroadcastData = async () => {
    const res = await broadcastData(id, data);

    if (pollIndexing) {
      timeout = setInterval(() => {
        const isIndexed = hasTxIndexed(res);
        if (!!isIndexed) {
          clearInterval(timeout);
        }
      }, 5000);
    }

    onSuccess?.();
  };

  return;
}

export default SignTypedData;
