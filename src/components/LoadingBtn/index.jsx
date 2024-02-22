import React from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import { ErrorMessage } from "../ErrorMessage";

export const LoadingBtn = ({
  isLoading,
  isDisabled,
  onClick,
  children,
  classNames,
  error,
  isCreate
}) => {
  const btnClasses = cn(
    styles.loadingBtn,
    "invertText",
    classNames,
    {
      [styles.disabled]: isDisabled,
      [styles.loading]: isLoading,
      [styles.document]: isCreate
    }
  );

  return (
    <div className={cn(styles.btnWrap, {[styles.loading]: isLoading})}>
      <button
        className={btnClasses}
        disabled={isDisabled || isLoading}
        onClick={onClick}
        type="button"
      >
        <span className={cn(styles.btnContent, {[styles.hidden]: isLoading})}>{children}</span>
      </button>
    {error && (
      <div className={styles.errorWrap}>
        <ErrorMessage>{error}</ErrorMessage>
      </div>
    )}
    </div>
  );
};
