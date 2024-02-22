import React from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import { useRecoilState } from "recoil";
import { showNewDocFlowSelector } from "../../../state/selectors";

export const NewDocBtn = () => {
  const [isNewDocFlowVisible, setNewDocFlowVisibility] = useRecoilState(showNewDocFlowSelector);

  return (
    <button
      className={styles.newDocBtn}
      onClick={() => setNewDocFlowVisibility(true)}
      type="button"
    >
      <span className={cn(styles.text, "hideText")}>create a new document</span>
    </button>
  )
};