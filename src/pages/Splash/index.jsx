import React from "react";
import cn from "classnames";
import { useSetRecoilState } from "recoil";
import styles from "./styles.module.scss";
import { showNewDocFlowSelector } from "../../state/selectors";
import { AnimatedDocs } from "./AnimatedDocs";

const Splash = () => {
  const setNewDocFlowVisibility = useSetRecoilState(showNewDocFlowSelector);

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