import React from "react";
import styles from "./styles.module.scss";
import { TextInput } from "../TextInput";

export const EmailPassword = ({
  email,
  setEmail,
  emailError,
  onEmailBlur,
  password,
  setPassword,
  passwordError,
  onPasswordBlur,
  name
}) => (
  <>
    <div className={styles.inputWrap}>
      <TextInput
        label="Email"
        value={email}
        labelId={`${name}-emailInput`}
        onChange={ev => setEmail(ev.target.value)}
        errored={!!emailError}
        onBlur={onEmailBlur}
        errorMessage={emailError}
      />
    </div>
    <div className={styles.inputWrap}>
      <TextInput
        label="Password"
        value={password}
        labelId={`${name}-passwordInput`}
        onChange={ev => setPassword(ev.target.value)}
        isSecret={true}
        errored={!!passwordError}
        onBlur={onPasswordBlur}
        errorMessage={passwordError}
      />
    </div>
  </>
);
