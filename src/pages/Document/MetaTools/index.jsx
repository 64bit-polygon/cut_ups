import React from "react";
import styles from "./styles.module.scss";
import { IconBtn } from "../../../components/IconBtn";
import { FileMenu } from "../FileMenu";

export const MetaTools = ({
  showHowTo,
  areSourcesVisible,
  setSourcesVisibility,
  hasMultipleSources
}) => (
  <menu className={styles.tools}>
    <li>
      <IconBtn iconName="question" onClick={showHowTo}>Info</IconBtn>
    </li>
  {hasMultipleSources && (
    <li>
      <IconBtn
        iconName={areSourcesVisible ? "sourcesHide" : "sourcesShow"}
        onClick={() => setSourcesVisibility(!areSourcesVisible)}
      >
        {areSourcesVisible ? "hide sources" : "show sources"}
      </IconBtn>
    </li>
  )}
    <li>
      <IconBtn iconName="folder" onClick={showHowTo}>Info</IconBtn>
    </li>
  </menu>
);
