import Home from "../../Tabs/Home";
import Chain from "../../Tabs/Chain";
import Generate from "../../Tabs/Generate";

export const TabItems = [
  {
    id: "Home",
    tabName: "Home",
    Component: Home,
  },
  {
    id: "Generate",
    tabName: "Generate",
    Component: Generate,
  },
  {
    id: "Chain",
    tabName: "Chain",
    Component: Chain,
  },
];

export const DEFAULT_TAB = TabItems[0];
