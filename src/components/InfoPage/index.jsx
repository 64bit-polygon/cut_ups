import React, { useRef } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import { TextBtn } from "../TextBtn";
import { XBtn } from "../XBtn";

export const InfoPage = ({ isVisible, heading, closePage, closeBtnText, children }) => {
  const pageRef = useRef();
  const handleAnimationEnd = ev => {
    if (ev.animationName.includes("hide")) {
      pageRef.current.scrollTop = 0;
    }
  }
  const pageClasses = cn(
    styles.infoPage,
    {
      [styles.visible]: isVisible,
      [styles.hidden]: isVisible === false
    }
  )
  
  return (
    <>
      <XBtn onClick={closePage} isVisible={isVisible} />
      <aside ref={pageRef} onAnimationEnd={handleAnimationEnd} className={pageClasses}>
        <div className={styles.infoPageInnerWrap}>
          <header className={styles.header}>{heading}</header>
          <article className={styles.content}>
            {children}
          </article>
          <footer className={styles.footer}>
            <TextBtn onClick={closePage}>{closeBtnText ?? "close"}</TextBtn>
          </footer>
        </div>
      </aside>
    </>
  );
};

export default InfoPage;