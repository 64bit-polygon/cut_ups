import React from "react";
import cn from "classnames";
import { useSetRecoilState } from "recoil";
import styles from "./styles.module.scss";
import { showAboutSelector } from "../../state/selectors";

export const LogoBtn = () => {
  const setAuthVisibility = useSetRecoilState(showAboutSelector);

  return (
    <button
      className={cn("invertingImgBtn clear hideText", styles.logoBtn)}
      type="button"
      onClick={() => setAuthVisibility(true)}
    >
      about
    </button>
  )
};
