import React from "react";
import styles from "./control_label.module.scss";

const ControlLabel = ({ label, required }) => {
  return (
    <span className={styles.ControlLabel}>
      {label}
      {required && "*"}
    </span>
  );
};

export default ControlLabel;
