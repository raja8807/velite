import React from "react";
import styles from "./main_frame.module.scss";
import CustomContainer from "../custom_container/custom_container";

const MainFrame = ({ children, head, caption }) => {
  return (
    <main className={styles.MainFrame}>
      {(head || caption) && (
        <div className={styles.head}>
          {head && <h3>{head}</h3>}
          {caption && <p>{caption}</p>}
        </div>
      )}
      {/* <CustomContainer></CustomContainer>
       */}
      {children}
    </main>
  );
};

export default MainFrame;
