import { useRouter } from "next/router";
import ChainLogo from "../../assets/tabLogos/ChainLogo";
import GenerateLogo from "../../assets/tabLogos/GenerateLogo";

export const TabItems = [
  {
    id: "Chains",
    tabName: "Chains",
    route: "/",
    Image: ChainLogo,
  },
  {
    id: "Generate",
    tabName: "Generate",
    route: "/generate/",
    Image: GenerateLogo,
  },
];
export const DEFAULT_TAB = TabItems[0];
