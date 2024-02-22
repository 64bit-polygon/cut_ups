import React from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

export const DungeonCurtain = ({ children, index, curtainCount, isScrollable }) => {
  const hasIndexLabel = index && curtainCount;
  return (
    <div className={cn(styles.dungeonCurtain, styles[`num${index}`])}>
      <div className={styles.content}>
        {children}
      </div>
    {isScrollable && (
      <div className={styles.scrollLabel}>Scroll to reveal</div>
    )}
    {hasIndexLabel && (
      <div className={styles.indexLabel}>{`${index} of ${curtainCount}`}</div>
    )}
    </div>
  );
};

DungeonCurtain.defaultProps = {
  isScrollable: true,
  curtainCount: 3
}
