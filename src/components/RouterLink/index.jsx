import React from "react";
import { Link } from "react-router-dom";

export const RouterLink = ({to, className, children, isDisabled}) => {
  if (isDisabled) {
    return (
      <span className={className}>
        {children}
      </span>
    )
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
};
