import React, { useState } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { ErrorMessage } from "../ErrorMessage";

export const TextInput = ({
  onChange,
  value,
  label,
  labelId,
  isSecret,
  errored,
  disabled,
  onFocus,
  onBlur,
  errorMessage
}) => {
  const [showText, setShowText] = useState(() => !isSecret);

  const toggleShowText = () => setShowText(!showText);
  const inputWrapClasses = cn(
    styles.inputWrap,
    {
      [styles.errored]: errored,
      [styles.disabled]: disabled
    }
  );

  const secretBtnClasses = cn(
    "hideText invertingImgBtn",
    styles.passwordToggle,
    {[styles.hidePassword]: showText}
  )

  return (
    <div className={inputWrapClasses}>
      <input
        type={showText ? "text" : "password"}
        className={cn(styles.input, {[styles.errored]: errored})}
        value={value}
        onChange={onChange}
        id={labelId}
        placeholder=" "
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <label className={styles.label} htmlFor={labelId}>
        <span className={styles.labelText}>{label}</span>
      </label>
    {errorMessage && (
      <div className={styles.errorMessage}>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </div>
    )}
    {isSecret && (
      <button
        className={secretBtnClasses}
        onClick={toggleShowText}
        type="button"
      >
        {showText ? "hide" : "show"} password
      </button>
    )}
    </div>
  )
};

TextInput.defaultProps = {
  onFocus: () => {},
  onBlur: () => {},
  onChange: () => {}
};
