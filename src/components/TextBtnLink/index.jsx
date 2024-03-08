import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const TextBtnLink = ({
  to,
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
    <Link className={btnClasses} to={to}>
      { children }
    </Link>
  )
}

TextBtnLink.defaultProps = {
  bordered: true,
  small: false
};