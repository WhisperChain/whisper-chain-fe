import { useRouter } from "next/router";
import React from "react";
import GeneratePage from "../../src/components/GeneratePage";

const generate = () => {
  const router = useRouter();
  const chainId = router?.query?.chainId;
  console.log("chainId", chainId);
  return (
    <div>
      <GeneratePage chainId={chainId} />
    </div>
  );
};

export default generate;
