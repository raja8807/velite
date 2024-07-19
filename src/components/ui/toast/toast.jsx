import React from "react";
import { Toast } from "react-bootstrap";
import styles from "./toast.module.scss";

const CustomToast = ({ message, setShow }) => {
  return (
    <div>
      <div className={styles.toast}>
        <Toast
          show={!!message}
          autohide
          onClose={() => {
            setShow(false);
          }}
          delay={3000}
        >
          <Toast.Body className={styles.body}>
            {message}
          </Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default CustomToast;
