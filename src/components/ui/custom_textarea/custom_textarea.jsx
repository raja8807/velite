import React from "react";
import styles from "./custom_textarea.module.scss";
import ControlLabel from "../contol_label/control_label";

const CustomTextArea = ({
  placeHolder,
  value,
  variant = 1,
  type = "text",
  required,
  onChange = () => {},
  error,
  label,
  rows = 3,
  ...props
}) => {
  return (
    <>
      {label && <ControlLabel label={label} />}
      <textarea
        className={`${styles.CustomInput} ${styles[`v${variant}`]} ${
          error ? styles.error : ""
        }`}
        onChange={(e) => {
          onChange(e, e.target.value);
        }}
        value={value}
        placeholder={placeHolder}
        type={type}
        required={required}
        rows={rows}
        {...props}
      />
    </>
  );
};

export default CustomTextArea;
