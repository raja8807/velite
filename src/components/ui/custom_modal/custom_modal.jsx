import React from "react";
import { Modal } from "react-bootstrap";
import styles from "./custom_modal.module.scss";

const CustomModal = ({
  children,
  show,
  setShow = () => {},
  title,
  hasClose = true,
  onHide = () => {},
}) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        setShow(false);
      }}
      centered
      className={styles.CustomModal}
    >
      <Modal.Header closeButton={hasClose} className={styles.head}>
        <p> {title}</p>
      </Modal.Header>
      <Modal.Body className={styles.Body}>{children}</Modal.Body>
    </Modal>
  );
};

export default CustomModal;
