import React from "react";
import styles from "./styles.module.scss";

export const DocumentTitle = ({ value, setTitle }) => (
  <input className={styles.title} value={value} onChange={ev => setTitle(ev.target.value)} />
);

DocumentTitle.defaultProps = {
  value: ""
}
