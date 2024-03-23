import React from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import { PublishedSources } from "../PublishedSources";

export const TEXT_INPUT = "text";
export const USER_SELECTION = "userSelection";

export const SourceInterface = ({
  source,
  setSource,
  name,
  label,
  isCurrent,
  isTouch
}) => {
  const updateSelection = (key, value) => setSource({...source, [key]: value});
  const isUntouched = !source.selectionType;

  const textInputBtnClasses = cn(
    styles.sourceBtn,
    styles.textInputBtn,
    {[styles.visible]: source.selectionType === USER_SELECTION},
    {[styles.notVisible]: source.selectionType === TEXT_INPUT}
  );

  const publishedSrcsBtnClasses = cn(
    styles.sourceBtn,
    styles.publishedSrcsBtn,
    {[styles.visible]: source.selectionType === TEXT_INPUT},
    {[styles.notVisible]: source.selectionType === USER_SELECTION}
  );

  const textInputSrcClasses = cn(
    styles.sourceWrap,
    styles.textInputSrcWrap,
    {
      [styles.untouched]: isUntouched
    }
  );

  const publishedSrcsClasses = cn(
    styles.sourceWrap,
    styles.publishedSrcsWrap,
    {
      [styles.focused]: source.selectionType === USER_SELECTION,
      [styles.untouched]: isUntouched
    }
  );

  const labelClasses = cn(
    styles.label,
    {
      [styles.hidden]: !isUntouched,
      [styles.current]: isCurrent && isTouch,
    }
  )

  return (
    <div className={cn(styles.sounceInterface, {[styles.touched]: !isUntouched})}>
      <div className={labelClasses}>
        <div className={styles.labelLine}>Select {label}</div>
        <div className={styles.labelLine}>source</div>
      </div>
      <button
        className={textInputBtnClasses}
        type="button"
        onClick={() => updateSelection("selectionType", TEXT_INPUT)}
      >
        <span className={styles.sourceBtnText}>
        View text input
        </span>
      </button>
      <button
        className={publishedSrcsBtnClasses}
        type="button"
        onClick={() => updateSelection("selectionType", USER_SELECTION)}
      >
        <span className={styles.sourceBtnText}>
          View published srcs
        </span>
      </button>

      <div
        className={textInputSrcClasses}
        onClick={() => updateSelection("selectionType", TEXT_INPUT)}
      >
        <textarea
          name={`${name}-${label}`}
          value={source.userText}
          className={styles.textarea}
          placeholder="input / paste text"
          onChange={ev => updateSelection("userText", ev.target.value)}
        />
      </div>
      
      <div
        className={publishedSrcsClasses}
        onClick={() => updateSelection("selectionType", USER_SELECTION)}
      >
        <div className={styles.scrollWrap}>
          <PublishedSources
            name={name}
            onChange={id => updateSelection("id", id)}
            value={source.id} />
        </div>
      </div>
    </div>
  );
};

