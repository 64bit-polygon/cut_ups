import React from "react";
import styles from "./styles.module.scss";
import { Icon } from "../Icon";
import cn from "classnames";

export const IconBtn = ({iconName, onClick, value, classNames, children}) => (
  <button type="button" className={cn(classNames, styles.button)} onClick={onClick} value={value}>
    <Icon name={iconName} className={styles.icon} />
    <span className="hideText">{children}</span>
  </button>
);

IconBtn.defaultProps = {
  onClick: () => {}
}
