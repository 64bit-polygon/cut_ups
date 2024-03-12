import React, { useRef, useEffect } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

export const DungeonCurtain = ({
  children,
  index,
  curtainCount,
  isScrollable,
  showUp,
  showDown,
  handlePrevious,
  handleNext,
  isCurrentCurtain
}) => {
  const hasIndexLabel = index && curtainCount;
  const btnRef = useRef();

  useEffect(() => {
    if (!btnRef.current || !isCurrentCurtain) return;
    const forceRepaint = btnRef.current;
    
  }, [btnRef, isCurrentCurtain]);

  return (
    <div className={cn(styles.dungeonCurtain, styles[`num${index}`])}>
    {showUp && (
      <button
        type="button"
        onClick={handlePrevious}
        className={cn(styles.navBtn, styles.previous, "invertingImgBtn hideText")}
      >
        prev
      </button>
    )}
      <div className={styles.content}>
        {children}
      </div>
    {showDown && (
      <button
        type="button"
        onClick={handleNext}
        className={cn(styles.navBtn, styles.next, "invertingImgBtn hideText")}
        ref={btnRef}
      >
        next
      </button>
    )}
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
  curtainCount: 3,
  handlePrevious: () => {},
  handleNext: () => {}
}
