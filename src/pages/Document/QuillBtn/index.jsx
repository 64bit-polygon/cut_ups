import React from "react";
import styles from "./styles.module.scss";
import { Icon } from "../../../components/Icon";
import cn from "classnames";

export const QuillBtn = ({iconName, value, quillClasses, children, onClick, index, groupLength}) => {
  const isGroup = groupLength !== 1;
  const isFirst = isGroup && (index === 0);
  const isLast = isGroup && (index === groupLength - 1);
  const isMiddle = isGroup && !isFirst && !isLast;
  const positionClasses = cn(
    {
      [styles.first]: isFirst,
      [styles.middle]: isMiddle,
      [styles.last]: isLast
    }
  )
  
  return (
    <div className={cn(styles.btnWrap, positionClasses)}>
      <button
        type="button"
        className={cn(quillClasses, styles.button)} value={value} id={`quillBtn_${iconName}`}
        onClick={onClick}
        data-iconname={iconName}
      />
      <label className={cn("hideText", styles.label, positionClasses)} htmlFor={`quillBtn_${iconName}`}>{children}</label>
      <Icon name={iconName} className={cn(styles.icon, "quillBtnIcon")} />
    </div>
  )
};

QuillBtn.defaultProps = {
  index: 0,
  groupLength: 1,
  onClick: () => {}
}
