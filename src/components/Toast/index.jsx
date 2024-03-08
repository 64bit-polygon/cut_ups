import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

export const Toast = ({
  children,
  showDots,
  isVisible
}) => (
  <div className={cn(styles.toast, {[styles.visible]: isVisible})}>
    <div className={styles.innerWrap}>
      <span className={cn(styles.text, {[styles.hasDots]: showDots})}>
        {children}
        {showDots && <span className={styles.dots} />}
      </span>
    </div>
  </div>
);
