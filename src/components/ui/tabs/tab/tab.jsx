import React from "react";
import styles from "./tab.module.scss";

const Tab = ({
  tab,
  isActive,
  setCurrentTab,
  onTabChange,
  index,
  goBottom,
}) => {
  return (
    <div
      className={`${styles.tab} ${isActive ? styles.active : ""} ${
        goBottom ? styles.bottom : ""
      }`}
      onClick={() => {
        onTabChange(tab, index);
        setCurrentTab(tab);
      }}
    >
      <p>
        {tab.icon && <small>{tab.icon}</small>}
        {tab.title}
      </p>
    </div>
  );
};

export default Tab;
