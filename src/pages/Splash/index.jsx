import React from "react";
import styles from "./styles.module.scss";
import { AnimatedDocs } from "./AnimatedDocs";
import cn from "classnames";
import { useRecoilState } from "recoil";
import { showNewDocFlowSelector } from "../../state/selectors";

const Splash = () => {
  const [isNewDocFlowVisible, setNewDocFlowVisibility] = useRecoilState(showNewDocFlowSelector);

  return (
    <div className={styles.splash}>
      <div className={styles.animatedDocsWrap}>
        <figure className={styles.animatedDocs}>
          <AnimatedDocs />
        </figure>
        <button
          className={cn("invertingImgBtn hideText", styles.next)}
          type="button"
          onClick={() => setNewDocFlowVisibility(true)}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default Splash;