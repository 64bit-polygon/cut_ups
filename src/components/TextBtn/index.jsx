import React from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

export const TextBtn = ({ onClick, children, small, bordered }) => {
  const btnClasses = cn(
    "invertText",
    styles.textBtn,
    {
      [styles.small]: small,
      [styles.bordered]: bordered
    }
  )
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