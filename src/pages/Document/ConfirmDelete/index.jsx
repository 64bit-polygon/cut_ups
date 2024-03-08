import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { TextBtn } from "../../../components/TextBtn";
import { InfoPage, ORIENTATION_LEFT } from "../../../components/InfoPage";

export const ConfirmDelete = ({
  isVisible,
  setVisibility,
  isDeleting,
  setIsDeleting
}) => (
  <InfoPage
    isVisible={isVisible}
    orientation={ORIENTATION_LEFT}
    closePage={() => setVisibility(false)}
    showCloseTextBtn={false}
  >
    <div className={styles.page}>
      <div className={cn(styles.content, {[styles.hidden]: isDeleting})}>
        <header className={styles.header}>Delete document?</header>
        <p>This will delete this document. It's permanent.</p>
        <div className={styles.btns}>
          <div className={styles.firstBtnWrap}>
            <TextBtn onClick={() => setVisibility(false)}>cancel</TextBtn>
          </div>
          <div>
            <TextBtn onClick={() => setIsDeleting(true)}>delete</TextBtn>
          </div>
        </div>
      </div>
      <div className={cn(styles.loader, {[styles.visible]: isDeleting})} />
    </div>
  </InfoPage>
);
