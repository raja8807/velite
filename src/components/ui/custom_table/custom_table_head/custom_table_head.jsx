import React from "react";
import styles from "./custom_table_head.module.scss";
import { Row } from "react-bootstrap";

const CustomTableHead = ({ children }) => {
  return (
    <div className={styles.CustomTableHead}>
      <Row>{children}</Row>
    </div>
  );
};

export default CustomTableHead;
