import { useRouter } from "next/router";
import React from "react";
import GeneratePage from "../../src/components/GeneratePage";

const generate = () => {
  const router = useRouter();
  return (
    <div>
      <GeneratePage />
    </div>
  );
};

export default generate;
