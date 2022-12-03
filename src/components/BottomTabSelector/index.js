import { useBottomTab } from "../../context/BottomTabContext";
import { TabItems } from "../Main/TabItems";
import styles from "./BottomTabSelector.module.css";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  flex-direction: row;
  width: fit-content;
  align-self: center;
  padding: 8px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  border-radius: 100px;
  gap: 4px;
`;

export default function BottomTabSelector() {
  const { currentTab, onTabChange } = useBottomTab();
  console.log("Selecrted t: ", currentTab);
  return (
    <Container className={styles.container}>
      {TabItems.map((tab) => {
        const isSelected = tab.id === currentTab.id;
        return (
          <div
            onClick={() => onTabChange(tab)}
            id={tab.id}
            className={`${styles.tabContainer} ${
              isSelected ? styles.selectedTab : {}
            }`}
          >
            <div>{tab.tabName}</div>
          </div>
        );
      })}
    </Container>
  );
}
