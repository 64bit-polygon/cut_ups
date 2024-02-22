import React from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import { useRecoilState } from "recoil";
import { showAboutSelector } from "../../state/selectors";

export const LogoBtn = () => {
  const [isAuthVisible, setAuthVisibility] = useRecoilState(showAboutSelector);

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
