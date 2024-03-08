import React, { useState } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { ASC, DESC } from "../DocumentsTable";

export const SortOrderBtn = ({
  setType,
  setDirection,
  defaultDirection,
  children
}) => {
  const [sortDirection, setSortDirection] = useState(defaultDirection);
  
  const isAsc = sortDirection === ASC;

  const classNames = cn(
    styles.sortBtn,
    {
      [styles.descend]: isAsc,
      [styles.ascend]: sortDirection === DESC
    }
  );

  const handleClick = () => {
    setType();
    const direction = isAsc ? DESC : ASC;
    setSortDirection(direction);
    setDirection(direction);
  }

  return (
    <button
      className={classNames}
      onClick={handleClick}
      type="button"
    >
      <span className={styles.text}>{children}</span>
      <span className="hideText">
        click to change to{isAsc ? " descending" : " ascending"}
      </span>
    </button>
  )
};
