import React from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import { Link } from "react-router-dom";

export const TextBtnLink = ({ to, children, small, bordered }) => {
  const btnClasses = cn(
    "invertText",
    styles.textBtn,
    {
      [styles.small]: small,
      [styles.bordered]: bordered
    }
  )
  return (
    <Link className={btnClasses} to={to}>
      { children }
    </Link>
  )
}

TextBtnLink.defaultProps = {
  bordered: true,
  small: false
};