import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

export const XBtn = ({ onClick, isVisible }) => {
  const classes = cn(
    "invertingImgBtn hideText",
    styles.xBtn,
    {[styles.visible]: isVisible}
  )
  return (
    <button
      className={classes}
      onClick={onClick}
      type="button"
    >
    close
  </button>
  )
};
