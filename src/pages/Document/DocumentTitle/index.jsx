import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

export const DocumentTitle = ({
  value,
  isLoaded,
  setTitle,
  disabled
}) => (
  <div className={cn(styles.titleWrap, {[styles.loaded]: isLoaded})}>
    <input
      className={styles.title}
      value={value === null ? "" : value}
      onChange={ev => setTitle(ev.target.value)}
      disabled={disabled}
    />
  </div>
);
