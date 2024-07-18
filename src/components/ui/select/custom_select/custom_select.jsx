import React from "react";
import styles from "./custom_select.module.scss";
import ControlLabel from "../../contol_label/control_label";

const CustomSelect = ({
  variant = 1,
  label,
  options = [],
  value,
  onChange = () => {},
  required,
  placeholder,
}) => {
  return (
    <div className={`${styles.CustomSelect} ${styles[`v${variant}`]}`}>
      {label && <ControlLabel label={label} />}

      <select
        onChange={(e) => {
          onChange(e, e.target.value);
        }}
        required
        value={value}
        defaultValue={value}
        placeholder={placeholder}
      >
        {/* {!required && <option value="">{placeholder}</option>} */}
        <option value="" disabled selected>
          {placeholder}
        </option>

        {options.map((o, i) => {
          return (
            <option key={`op_${i}`} value={o}>
              {o}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CustomSelect;
