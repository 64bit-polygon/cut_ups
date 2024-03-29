import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./styles.module.scss";
import { Icon } from "../Icon";

export const IconLink = ({
  iconName,
  to,
  classNames,
  children,
  opensInNewTab
}) => (
  <Link
    className={cn(classNames, styles.link)}
    to={to}
    target={opensInNewTab ? "_blank" : null}
    rel={opensInNewTab ? "noopener noreferrer" : null}
  >
    <Icon name={iconName} className={styles.icon} />
    <span className="hideText">{children}</span>
  </Link>
);
