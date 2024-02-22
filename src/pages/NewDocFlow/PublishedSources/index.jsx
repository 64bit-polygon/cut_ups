import React from "react";
import styles from "./styles.module.scss";
import { useRecoilValue } from "recoil";
import { sourcesSelector } from "../../../state/selectors";

export const PublishedSources = ({ onChange, name, value }) => {
  const sources = useRecoilValue(sourcesSelector);

  if (!sources) return null;

  return (
    <fieldset className={styles.sources}>
      {sources.map(source => (
        <label key={`${name}-${source.id}`} className={styles.source}>
          <input
            className={styles.input}
            type="radio"
            name={name}
            value={source.id}
            id={`${name}-${source.id}`}
            checked={value === source.id}
            onChange={() => onChange(source.id)}
          />
          <span htmlFor={source.id} className={styles.label}>{source.title}</span>
        </label>
      ))}
    </fieldset>
  );
};

