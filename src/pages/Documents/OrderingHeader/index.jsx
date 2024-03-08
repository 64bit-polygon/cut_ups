import React from "react";
import styles from "./styles.module.scss";
import { SortOrderBtn } from "../SortOrderBtn";
import { BY_DATE, BY_TITLE } from "../DocumentsTable";

export const OrderingHeader = ({ setType, setDirection, defaultDirection }) => (
  <div className={styles.headers}>
    <div className={styles.titleHeader}>
      <SortOrderBtn
        setDirection={setDirection}
        setType={() => setType(BY_TITLE)}
        defaultDirection={defaultDirection}
      >
        Title
      </SortOrderBtn>
    </div>
    <div className={styles.dateHeader}>
      <SortOrderBtn
        setDirection={setDirection}
        setType={() => setType(BY_DATE)}
        defaultDirection={defaultDirection}
      >
        Updated
      </SortOrderBtn>
    </div>
    <div className={styles.removeHeader}>Remove</div>
  </div>
);
