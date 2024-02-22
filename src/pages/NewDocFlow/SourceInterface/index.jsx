import React from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import { useRecoilState } from "recoil";
import {
  TEXT_INPUT,
  USER_SELECTION
} from "../../../state/atoms";
import { PublishedSources } from "../PublishedSources";

export const SourceInterface = ({ selector, name, label }) => {
  const [sourceInfo, setSourceInfo] = useRecoilState(selector);
  const updateSelection = (key, value) => setSourceInfo({...sourceInfo, [key]: value});
  const isUntouched = !sourceInfo.selectionType;

  const textInputBtnClasses = cn(
    styles.sourceBtn,
    styles.textInputBtn,
    {[styles.visible]: sourceInfo.selectionType === USER_SELECTION},
    {[styles.notVisible]: sourceInfo.selectionType === TEXT_INPUT}
  );

  const publishedSrcsBtnClasses = cn(
    styles.sourceBtn,
    styles.publishedSrcsBtn,
    {[styles.visible]: sourceInfo.selectionType === TEXT_INPUT},
    {[styles.notVisible]: sourceInfo.selectionType === USER_SELECTION}
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
      [styles.focused]: sourceInfo.selectionType === USER_SELECTION,
      [styles.untouched]: isUntouched
    }
  );

  return (
    <div className={cn(styles.sounceInterface, {[styles.touched]: !isUntouched})}>
      <header className={cn(styles.label, {[styles.hidden]: !isUntouched})}>
        <div className={styles.labelLine}>Select {label}</div>
        <div className={styles.labelLine}>source</div>
      </header>
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
          value={sourceInfo.userText}
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
            value={sourceInfo.id} />
        </div>
      </div>
    </div>
  );
};

