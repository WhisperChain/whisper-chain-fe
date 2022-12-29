import { useRouter } from "next/router";
import React from "react";
import ChainPage from "../../src/components/ChainPage";

const chain = () => {
  const router = useRouter();
  const chainId = router?.query?.chainId;
  return (
    <div>
      <ChainPage chainId={chainId} />
    </div>
  );
};

export default chain;
