import React, { useState } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { AnimatedDocsCaptions } from "../AnimatedDocsCaptions";

export const AnimatedDocs = () => {
  const [isSvgLoaded, setIsSvgLoaded] = useState(false);

  const handleLoad = () => setIsSvgLoaded(true);

  return (
    <div className={styles.animatedDocs}>
      <div className={cn(styles.canvas, {[styles.visible]: isSvgLoaded})}>
        <embed
          onLoad={handleLoad}
          type="image/svg+xml"
          src="/images/animatedDocs.svg"
        />
      </div>
      <AnimatedDocsCaptions />
    </div>
  );
};
