import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Icon } from "../../../components/Icon";
import { IconBtn } from "../../../components/IconBtn";
import { IconLink } from "../../../components/IconLink";
import cn from "classnames";

export const FileMenu = ({ btns }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const showMenu = () => setIsMenuVisible(true);
  const hideMenu = () => setIsMenuVisible(false);

  return (
    <div className={styles.menu} onMouseEnter={showMenu} onMouseLeave={hideMenu}>
      <div className={styles.menuHeader}>
        <div className={cn("hideText", styles.menuLabel)}>file menu</div>
        <Icon name="folder" className={styles.menuIcon} />
      </div>
      <div className={cn(styles.menuContent, {[styles.visible]: isMenuVisible})}>
      {btns.map(btn => (
        <div className={styles.menuItem} key={btn.iconName}>
      { btn.isLink
        ? (
          <IconLink iconName={btn.iconName} to={btn.to} opensInNewTab={btn.opensInNewTab}>
            {btn.label}
          </IconLink>
        )
        : (
          <IconBtn iconName={btn.iconName} onClick={btn.onClick}>
            {btn.label}
          </IconBtn>
        )
      }
        </div>
      ))}
      </div>
    </div>
  )
};
