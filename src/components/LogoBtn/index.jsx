import React from "react";
import cn from "classnames";
import { useSetRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import styles from "./styles.module.scss";
import { showAboutSelector } from "../../state/selectors";

export const LogoBtn = () => {
  const setAuthVisibility = useSetRecoilState(showAboutSelector);
  const location = useLocation();

  const regex = /\/documents\/.+/;
  const isOnDocumentPage = regex.test(location.pathname);

  return (
    <button
      className={cn("invertingImgBtn clear hideText", styles.logoBtn)}
      type="button"
      onClick={() => setAuthVisibility(true)}
    >
      about
      {isOnDocumentPage && <span className={styles.border} />}
    </button>
  )
};
