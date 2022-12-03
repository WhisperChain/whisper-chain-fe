import Home from "../../pages/Home";
import Chain from "../../pages/Chain";
import Generate from "../../pages/Generate";

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

export const DEFAULT_TAB = TabItems[2];
