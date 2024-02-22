import React from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

export const Toast = ({children, showDots, isVisible}) => (
  <div className={cn(styles.toast, {[styles.visible]: isVisible})}>
    <div className={styles.innerWrap}>
      <span className={cn(styles.text, {[styles.hasDots]: showDots})}>
        {children}
        {showDots && <span className={styles.dots} />}
      </span>
    </div>
  </div>
);
