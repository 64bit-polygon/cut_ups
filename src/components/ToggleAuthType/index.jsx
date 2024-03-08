import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import {
  SIGN_UP,
  LOG_IN,
  FORGOT_PASS
} from "../../constants";

export const ToggleAuthType = ({
  authType,
  setAuthType,
  showForgot
}) => {
  const signUpBtnClasses = cn(
    styles.toggleBtn,
    "invertText",
    {[styles.selected]: authType === SIGN_UP}
  );

  const logInBtnClasses = cn(
    styles.toggleBtn,
    "invertText",
    {[styles.selected]: authType === LOG_IN}
  );

  const forgotBtnClasses = cn(
    styles.toggleBtn,
    "invertText",
    {[styles.selected]: authType === FORGOT_PASS}
  );

  return (
    <div className={styles.authType}>
      <button
        className={signUpBtnClasses}
        type="button"
        onClick={() => setAuthType(SIGN_UP)}
      >
        Sign up
      </button>
      <button
        className={logInBtnClasses}
        type="button"
        onClick={() => setAuthType(LOG_IN)}
      >
        Log in
      </button>
    {showForgot && (
      <button
        className={forgotBtnClasses}
        type="button"
        onClick={() => setAuthType(FORGOT_PASS)}
      >
        Forgot Password
      </button>
    )}
    </div>
  )
};
