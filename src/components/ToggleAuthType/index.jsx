import React from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import {
  SIGN_UP,
  LOG_IN,
  FORGOT_PASS
} from "../../constants";

export const ToggleAuthType = ({authType, setAuthType, showForgot}) => (
  <div className={styles.authType}>
    <button
      className={cn(styles.toggleBtn, "invertText", {[styles.selected]: authType === SIGN_UP})}
      type="button"
      onClick={() => setAuthType(SIGN_UP)}
    >
      Sign up
    </button>
    <button
      className={cn(styles.toggleBtn, "invertText", {[styles.selected]: authType === LOG_IN})}
      type="button"
      onClick={() => setAuthType(LOG_IN)}
    >
      Log in
    </button>
  {showForgot && (
    <button
      className={cn(styles.toggleBtn, "invertText", {[styles.selected]: authType === FORGOT_PASS})}
      type="button"
      onClick={() => setAuthType(FORGOT_PASS)}
    >
      Forgot Password
    </button>
  )}
  </div>
);
