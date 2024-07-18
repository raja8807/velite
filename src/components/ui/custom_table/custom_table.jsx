import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./custom_table.module.scss";
import CustomTableHead from "./custom_table_head/custom_table_head";

const CustomTable = ({ children, head, title, count }) => {
  return (
    <>
      <div className={styles.CustomTable}>
        <h5>
          {title} <span>({count})</span>
        </h5>

        <CustomTableHead>
          {head.map(({ title }) => {
            return <Col key={title}>{title}</Col>;
          })}
        </CustomTableHead>
        {children}
      </div>
    </>
  );
};

export default CustomTable;
