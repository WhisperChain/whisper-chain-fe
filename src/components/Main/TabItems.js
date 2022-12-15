import Home from "../../Tabs/Home";
import Generate from "../../Tabs/GenerateImage";
import ChainLogo from "../../assets/tabLogos/ChainLogo";
import GenerateLogo from "../../assets/tabLogos/GenerateLogo";

export const TabItems = [
  {
    id: "Chains",
    tabName: "Chains",
    Component: Home,
    Image: ChainLogo,
  },
  {
    id: "Generate",
    tabName: "Generate",
    Component: Generate,
    Image: GenerateLogo,
  },
];

export const DEFAULT_TAB = TabItems[0];
