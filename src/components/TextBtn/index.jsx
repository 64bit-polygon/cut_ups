import React from "react";
import cn from "classnames";
import styles from "./styles.module.scss";

export const TextBtn = ({
  onClick,
  children,
  small,
  bordered
}) => {
  const btnClasses = cn(
    "invertText",
    styles.textBtn,
    {
      [styles.small]: small,
      [styles.bordered]: bordered
    }
  );

  return (
    <button className={btnClasses} onClick={onClick} type="button">
      { children }
    </button>
  )
}

TextBtn.defaultProps = {
  onClick: () => {},
  bordered: true,
  small: false
};
