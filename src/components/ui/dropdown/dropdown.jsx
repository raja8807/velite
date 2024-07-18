import Dropdown from "react-bootstrap/Dropdown";
import styles from "./dropdown.module.scss";
import { Trash } from "react-bootstrap-icons";

function CustomDropDown({ button, options }) {
  return (
    <Dropdown className={styles.CustomDropDown}>
      <Dropdown.Toggle id="dropdown-basic">{button}</Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map((o, i) => {
          return (
            <div
              key={`dd0_${i}`}
              onClick={() => {
                if (o.onclick) {
                  o.onclick();
                }
              }}
              className={`${styles.option} ${
                o.variant ? styles[`v_${o.variant}`] : ""
              }`}
            >
              <div>
                {o.icon && o.icon}
                {o.title}
              </div>
            </div>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default CustomDropDown;
