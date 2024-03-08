import React, { useRef } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { TextBtn } from "../TextBtn";
import { XBtn } from "../XBtn";

export const ORIENTATION_LEFT = "left";

export const InfoPage = ({
  isVisible,
  heading,
  closePage,
  closeBtnText,
  children,
  showCloseTextBtn,
  orientation
}) => {
  const pageRef = useRef();

  const handleAnimationEnd = ev => {
    if (ev.animationName.includes("hide")) {
      pageRef.current.scrollTop = 0;
    }
  }

  const pageClasses = cn(
    styles.infoPage,
    styles[orientation],
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
        {heading && (
          <header className={styles.header}>{heading}</header>
        )}
          <article className={styles.content}>
            {children}
          </article>
        {showCloseTextBtn && (
          <footer className={styles.footer}>
            <TextBtn onClick={closePage}>{closeBtnText ?? "close"}</TextBtn>
          </footer>
        )}
        </div>
      </aside>
    </>
  );
};

InfoPage.defaultProps = {
  showCloseTextBtn: true
}

export default InfoPage;