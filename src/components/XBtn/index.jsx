import React from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

export const XBtn = ({ onClick, isVisible }) => (
  <button
    className={cn("invertingImgBtn hideText", styles.xBtn, {[styles.visible]: isVisible})}
    onClick={onClick}
    type="button"
  >
    close
  </button>
);
