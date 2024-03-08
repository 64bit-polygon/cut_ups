import React, { useState } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { FontMenu } from "../FontMenu";
import { FontSizeMenu } from "../FontSizeMenu";
import { AlignmentMenu } from "../AlignmentMenu";
import { QuillBtn } from "../QuillBtn";
import { QuillColorMenu } from "../QuillColorMenu";

export const Toolbar = ({ id }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  return (
    <div
      className={styles.toolbar}
      onMouseEnter={() => setIsMenuVisible(true)}
      onMouseLeave={() => setIsMenuVisible(false)}
    >
      <div className={cn(styles.showMenu, {[styles.visible]: !isMenuVisible})} />
      <menu
        className={cn(styles.options, {[styles.visible]: isMenuVisible})}
        id={id}
      >
        <li className={styles.option}>
          <FontMenu />
        </li>
        <li className={styles.option}>
          <FontSizeMenu />
        </li>
        <li className={styles.option}>
          <QuillBtn iconName="bold" quillClasses="ql-bold" />
        </li>
        <li className={styles.option}>
          <QuillBtn iconName="italic" quillClasses="ql-italic" />
        </li>
        <li className={styles.option}>
          <QuillBtn iconName="underline" quillClasses="ql-underline" />
        </li>
        <li className={styles.option}>
          <AlignmentMenu />
        </li>
        <li className={styles.option}>
          <QuillColorMenu name="text color" />
        </li>
        <li className={styles.option}>
          <QuillColorMenu name="background color" isBackground={true} />
        </li>
      </menu>
    </div>
  )
};
