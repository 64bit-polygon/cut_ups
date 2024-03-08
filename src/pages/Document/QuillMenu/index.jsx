import React, { useState, useRef, useCallback } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import useMutation from "../../../utils/useMutation";
import { Icon } from "../../../components/Icon";
import { QuillBtn } from "../QuillBtn";

export const QuillMenu = ({defaultIconName, buttons, name}) => {
  const [selectedIconName, setSelectedIconName] = useState(defaultIconName);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const menuRef = useRef();

  const onMenuChange = useCallback(
    (menuItems) => {
      const selectedBtn = menuItems.find(
        menuItem => menuItem.target.classList.contains("ql-active")
      );
      const newSelectedIcon = selectedBtn?.target?.dataset?.iconname;
      setSelectedIconName(newSelectedIcon ?? defaultIconName);
    },
    [selectedIconName]
  );

  useMutation(menuRef.current, onMenuChange);

  const showMenu = () => setIsMenuVisible(true);
  const hideMenu = () => setIsMenuVisible(false);

  const menuClasses = cn(
    styles.menu,
    styles[`buttonCnt${buttons.length}`],
    {[styles.visible]: isMenuVisible}
  );

  return (
    <div
      className={menuClasses}
      onMouseEnter={showMenu}
      onMouseLeave={hideMenu}
    >
      <div className={styles.menuHeader}>
        <div className={cn("hideText", styles.menuLabel)}>{name}</div>
        <Icon name={selectedIconName} className={styles.menuIcon} />
      </div>
      <div ref={menuRef} className={styles.menuContent}>
        {buttons.map((btn, index) => (
          <div className={styles.menuItem} key={name + btn.value}>
            <QuillBtn
              iconName={btn.iconName}
              value={btn.value}
              quillClasses={btn.quillClasses}
              index={index}
              groupLength={buttons.length}
            >
              {btn.value}
            </QuillBtn>
          </div>
        ))}
      </div>
    </div>
  )
};
