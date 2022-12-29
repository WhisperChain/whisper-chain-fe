import { useRouter } from "next/router";
import React from "react";
import ChainPage from "../../src/components/ChainPage";

const chain = () => {
  const router = useRouter();
  return (
    <div>
      <ChainPage />
    </div>
  );
};

export default chain;
