import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import { OrderingHeader } from "../OrderingHeader";
import { DocumentRow } from "../DocumentRow";

export const BY_DATE = "date";
export const BY_TITLE = "title";
export const ASC = "ascending";
export const DESC = "descending";

const byDate = (docA, docB, sortDirection) => {
  const timeA = docA.dateUpdated._seconds;
  const timeB = docB.dateUpdated._seconds;

  const direction = sortDirection === DESC ? -1 : 1;
  return timeA > timeB ? direction : (direction * -1);
}

const sortByDate = (documents, sortDirection) =>
  documents.sort((docA, docB) => byDate(docA, docB, sortDirection));

const sortByTitle = (documents, sortDirection) => {
  return documents.sort((docA, docB) => {
    const titleA = docA.title;
    const titleB = docB.title;
  
    const direction = sortDirection === DESC ? -1 : 1;
    if (titleA > titleB) return direction;
    if (titleA < titleB) return direction * -1;
    if (titleA === titleB) return byDate(docA, docB, DESC);
  });
}

const Footer = () => (
  <div className={styles.footer}>
    <svg viewBox="0 0 400 12" preserveAspectRatio="none" className={cn(styles.svg, styles.dark)}>
      <polygon points="400,0 400,12 0,12" fill="#000" />
    </svg>
    <svg viewBox="0 0 400 12" preserveAspectRatio="none" className={cn(styles.svg)}>
      <polygon points="400,0 400,12 0,12" fill="#fff" />
    </svg>
  </div>
);

export const DocumentsTable = ({ documents }) => {
  const [sortType, setSortType] = useState(BY_DATE);
  const [sortDirection, setSortDirection] = useState(DESC);
  const [sortedDocs, setSortedDocs] = useState();
  const [docIdConfirmDelete, setDeleteConfirmOnId] = useState();
  const [isDeleteDisabled, setIsDeleteDisabled] = useState();
  const [isLoaded, setIsLoaded] = useState(null);

  useEffect(() => {
    if (!documents) return;

    if (sortType === BY_DATE) {
      setSortedDocs(sortByDate([...documents], sortDirection));
    }

    if (sortType === BY_TITLE) {
      setSortedDocs(sortByTitle([...documents], sortDirection));
    }
  }, [documents, sortType, sortDirection]);

  useEffect(() => {
    if ((isLoaded === null && sortedDocs)) {
      setIsLoaded(true);
    }
  }, [sortedDocs])

  const docsCnt = sortedDocs?.length;
  
  return (
    <div className={styles.table}>
      <div className={styles.headers}>
      {sortedDocs && (
        <OrderingHeader
          setType={setSortType}
          setDirection={setSortDirection}
          defaultDirection={DESC}
        />
      )}
      </div>
      <div className={cn(styles.loaderWrap, {[styles.hidden]: documents !== null})}>
        <div className={styles.loader} />
      </div>
      <div className={styles.mask}>
        <div style={{transitionDuration: 150 * (docsCnt ? docsCnt : 1) + "ms"}} className={cn(styles.innerWrap, {[styles.loaded]: isLoaded})}>
          <div className={cn(styles.noDocsMessages, {[styles.visible]: docsCnt === 0})}>You have no documents</div>
          <div className={styles.rows}>
          {sortedDocs?.map(document => {
            return (
              <DocumentRow
                title={document.title}
                docId={document.docId}
                timeStamp={document.dateUpdated._seconds * 1000}
                key={document.docId}
                isConfirmDeleteVisibile={docIdConfirmDelete === document.docId}
                setDeleteConfirmOnId={setDeleteConfirmOnId}
                isDeleteDisabled={isDeleteDisabled}
                setIsDeleteDisabled={setIsDeleteDisabled}
              />
            )
          })}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
