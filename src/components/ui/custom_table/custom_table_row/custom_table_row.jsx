import React from "react";
import styles from "./custom_table_row.module.scss";
import { Row } from "react-bootstrap";

const CustomTableRow = ({ children, onClick }) => {
  return (
    <div
      className={styles.CustomTable}
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
    >
      <Row>{children}</Row>
    </div>
  );
};

export default CustomTableRow;
