import Home from "../../Tabs/Home";
import Chain from "../../Tabs/Chain";
import Generate from "../../Tabs/Generate";
import HomeLogo from "../../assets/tabLogos/HomeLogo";
import ChainLogo from "../../assets/tabLogos/ChainLogo";
import GenerateLogo from "../../assets/tabLogos/GenerateLogo";

export const TabItems = [
  {
    id: "Home",
    tabName: "Home",
    Component: Home,
    Image: HomeLogo,
  },
  {
    id: "Chain",
    tabName: "Chain",
    Component: Chain,
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
