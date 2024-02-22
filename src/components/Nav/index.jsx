import React from "react";
import styles from "./styles.module.scss";
import { LogoBtn } from "../LogoBtn";
import { NavControls } from "../NavControls";
import { useLocation } from "react-router-dom";

export const Nav = () => {
  const location = useLocation();
  const showAuthControls = location.pathname !== "/login";

  return (
    <nav className={styles.nav}>
      <div className={styles.logoBtn}>
        <LogoBtn />
      </div>
    {showAuthControls && (
      <div className={styles.navControls}>
        <NavControls />
      </div>
    )}
    </nav>
  )
};
