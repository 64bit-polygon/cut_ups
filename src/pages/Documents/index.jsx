import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import { useRecoilValue, useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { getDocuments } from "../../utils/api.js"
import { userSelector, showAuthSelector, documentsSelector } from "../../state/selectors";
import { DocumentsTable } from "./DocumentsTable";
import { NewDocBtn } from "./NewDocBtn";

const Documents = () => {
  const [documents, setDocuments] = useRecoilState(documentsSelector);
  const [isAuthVisible, setAuthVisibility] = useRecoilState(showAuthSelector);
  const user = useRecoilValue(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  useEffect(() => {
    if (user?.userId) {
      setAuthVisibility(false);
      const getDocs = async () => {
        try {
          const docsInfo = await getDocuments(user.userId);
          setDocuments(docsInfo.data);
        } catch (error) {
          console.log(error)
        }
      };
      
      getDocs();
    }
  }, [user]);

  return (
    <div className={styles.documents}>
      <h1 className={styles.heading}>Documents</h1>
      <div className={styles.documentsTable}>
        <DocumentsTable documents={documents} />
      </div>
      <div className={cn(styles.newDocBtn, {[styles.loaded]: !!documents})}>
        <NewDocBtn />
      </div>
    </div>
  );
};

export default Documents;