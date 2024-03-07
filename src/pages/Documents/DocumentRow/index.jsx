import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import { RouterLink } from "../../../components/RouterLink";
import moment from "moment";
import { useRecoilState, useRecoilValue } from "recoil";
import { documentsSelector, userSelector } from "../../../state/selectors";
import { deleteDocument } from "../../../utils/api.js"

const isToday = date => moment().isSame(date, "day");

const isYesterday = date => {
  const yesterday = moment().subtract(1, "day");
  return yesterday.isSame(date, "day");
}

const getDayOfWeek = (date, isLong) => {
  const startOfLastWeek = moment().subtract(1, "week");
  if (date.isBefore(startOfLastWeek)) return;
  return date.format(isLong ? "dddd" : "ddd");
}

const getDayStr = (date, isLong) => {
  const dayOfWeek = getDayOfWeek(date, isLong);

  switch (true) {
    case isToday(date):
      return "Today";
    case (isLong && isYesterday(date)):
      return "Yesterday";
    case !!dayOfWeek:
      return dayOfWeek;
    default:
      return date.format("M/D/YY");
  }
}

const getDateStr = (timeStamp, isLong = true) => {
  const date = moment(timeStamp);
  return `${getDayStr(date, isLong)}, ${date.format("h:mm a")}`;
}

export const DocumentRow = ({
  title,
  docId,
  timeStamp,
  isConfirmDeleteVisibile,
  setDeleteConfirmOnId,
  isDeleteDisabled,
  setIsDeleteDisabled
}) => {
  const [documents, setDocuments] = useRecoilState(documentsSelector);
  const user = useRecoilValue(userSelector);
  const [isDeleted, setIsDeleted] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isProcessing, setIsProcessing] = useState();

  useEffect(() => {
    if (!errorMessage) return;
    setTimeout(() => {
      setIsProcessing();
      setDeleteConfirmOnId();
      setIsDeleteDisabled();
    }, 700);
    setTimeout(() => setErrorMessage(), 4000);
  }, [errorMessage]);

  const handleDeleteBtnClick = async () => {
    setIsDeleteDisabled(true);
    setIsProcessing(true);

    try {
      const response = await deleteDocument(docId, user.userId);
      setIsDeleted(true);
      setTimeout(() => {
        setIsDeleteDisabled();
        setDocuments(response.data.remainingDocuments)
      }, 500);
    } catch(error) {
      setErrorMessage("Could not delete document");
    }
  }

  const handleXBtnClick = () => {
    if (isDeleteDisabled) return;
    setDeleteConfirmOnId(docId);
  }

  const isLinkDisabled = isProcessing || isDeleted || !!errorMessage;

  return (
    <div className={cn(styles.documentRow, {[styles.deleted]: isDeleted})}>
      <div className={styles.docInfo}>
        <div className={cn(styles.col, styles.col1)}>
          <RouterLink to={`/documents/${docId}`} className={styles.titleLink} isDisabled={isLinkDisabled}>
            <span className={styles.interactiveText}>
              {title}
            </span>
          </RouterLink>
        </div>
        <div className={cn(styles.col, styles.col2)}>
          <div className={styles.longDate}>{getDateStr(timeStamp)}</div>
          <div className={styles.shortDate}>{getDateStr(timeStamp, false)}</div>
        </div>
        <div className={cn(styles.col, styles.col3)}>
          <button
            type="button"
            className={cn("invertingImgBtn hideText", styles.removeBtn)}
            onClick={handleXBtnClick}
            disabled={isDeleteDisabled}
          >
            delete this document
          </button>
        </div>
      </div>
      <div className={styles.contentMask}>
        <div className={cn(styles.docInfo, styles.confirmDeleteInfo, {[styles.visible]: isConfirmDeleteVisibile})}>
          <div className={cn(styles.col, styles.col2)}>
            <button
              type="button"
              className={cn(styles.deleteFlowBtn, styles.interactiveText, {[styles.disabled]: isDeleteDisabled})}
              onClick={handleDeleteBtnClick}
            >
              Confirm delete
            </button>
          </div>
          <div className={cn(styles.col, styles.col3)}>
            <button
              type="button"
              className={cn(styles.deleteFlowBtn, styles.interactiveText)}
              onClick={() => setDeleteConfirmOnId()}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className={cn(styles.processing, {[styles.visible]: isProcessing})} />
        <div className={cn(styles.errorMessage, {[styles.visible]: !!errorMessage})}>
          {errorMessage}
        </div>
      </div>
    </div>
  )
};