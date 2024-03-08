import React, { useState, useRef, useCallback } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { isColorBrighterThan } from "../../../utils/colors.js"
import useMutation from "../../../utils/useMutation";
import { Icon } from "../../../components/Icon";
import { QuillColors } from "../QuillColors";

const DEFAULT_COLOR = "#000000";
const GRAY = "#dddddd";
const WHITE = "#ffffff";

export const QuillColorMenu = ({isBackground, name}) => {
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [isMenuVisible, setIsMenuVisible] = useState();
  const menuRef = useRef();

  const onMenuChange = useCallback(
    (menuItems) => {
      const selectedBtn = menuItems.find(
        menuItem => menuItem.target.classList.contains("ql-active")
      );
      const newColor = selectedBtn?.target?.value;
      setColor(newColor ?? DEFAULT_COLOR);
    },
    [setColor]
  );

  useMutation(menuRef.current, onMenuChange);

  const showMenu = () => setIsMenuVisible(true);
  const hideMenu = () => setIsMenuVisible(false);

  const iconName = isBackground ? "backgroundColor" : "textColor";
  const quillClasses = isBackground ? "ql-background" : "ql-color";
  let fillStyle;
  let backgroundStyle;

  if (isBackground) {
    backgroundStyle = { backgroundColor: color };
    fillStyle = { fill: isColorBrighterThan(color, 86) ? GRAY : WHITE }
  } else {
    backgroundStyle = {
      backgroundColor: isColorBrighterThan(color, 86) ? GRAY : WHITE
    };
    fillStyle = { fill: color };
  }

  const paletteClasses = cn(
    styles.colorsWrap,
    {
      [styles.visible]: isMenuVisible,
      [styles.alignTop]: isBackground
    }
  );

  return (
    <div
      className={cn(styles.menu, {[styles.expanded]: isMenuVisible})}
      onMouseEnter={showMenu}
      onMouseLeave={hideMenu}
    >
      <div className={styles.menuHeader} style={backgroundStyle}>
        <div className={cn("hideText", styles.menuLabel)}>
          {name}
        </div>
        <Icon name={iconName} className={styles.menuIcon} style={fillStyle} />
      </div>
      <div className={paletteClasses}>
        <div ref={menuRef}>
          <QuillColors quillClasses={quillClasses} />
        </div>
      </div>
    </div>
  )
};
