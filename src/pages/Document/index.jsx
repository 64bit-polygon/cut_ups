import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useRecoilValue } from "recoil";
import { userSelector } from "../../state/selectors";
import { useNavigate, useParams } from "react-router-dom";
import { getDocument } from "../../utils/api.js"
import { showNewDocFlowSelector } from "../../state/selectors";
import { useRecoilState } from "recoil";
import { HowTo } from "./HowTo";
import cn from "classnames";
import { Toolbar } from "./Toolbar";
import { DocumentTitle } from "./DocumentTitle";
import { DocumentEditor } from "./DocumentEditor";
import { MetaTools } from "./MetaTools";
import { Toast } from "../../components/Toast"

const SAVING_TEXT = "saving"

const Document = () => {
  const [isNewDocFlowVisible, setNewDocFlowVisibility] = useRecoilState(showNewDocFlowSelector);
  const [editorContent, setEditorContent] = useState('<span class="source1" style="color: rgb(255, 0, 0);">my content</span><span class="source2">my content</span>');
  const [docTitle, setDocTitle] = useState();
  const [show404, setShow404] = useState();
  const [showHowTo, setShowHowTo] = useState();
  const [areSourcesVisible, setSourcesVisibility] = useState();
  const [hasMultipleSources, setHasMultipleSources] = useState(true);
  const { docId } = useParams();
  const user = useRecoilValue(userSelector);
  const navigate = useNavigate();
  const [isToastVisible, setToastVisibility] = useState();
  const [toastText, setToastText] = useState(SAVING_TEXT);

  useEffect(() => {
    if (user === undefined) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  useEffect(() => {
    if (docId && user?.userId) {
      const getDoc = async () => {
        try {
          const docInfo = await getDocument(docId, user.userId);
          const { content, title } = docInfo.data;
          setEditorContent(content);
          setDocTitle(title);
          setNewDocFlowVisibility(false);
        } catch (error) {
          console.log(error)
        }
      };
      
      getDoc();
    }
  }, [docId, user]);

  const toolbarId = "quillToolbar";

  return (
    <div className={styles.page}>
      <Toolbar id={toolbarId} />
      <div className={styles.metaTools}>
        <MetaTools
          showHowTo={() => setShowHowTo(true)}
          areSourcesVisible={areSourcesVisible}
          setSourcesVisibility={setSourcesVisibility}
          hasMultipleSources={hasMultipleSources}
        />
      </div>
      <div className={styles.mainColumnWrap}>
        <div className={styles.mainColumn}>
          <header className={styles.header}>
            <DocumentTitle value={docTitle} setTitle={setDocTitle} />
          </header>
          <DocumentEditor value={editorContent} setContent={setEditorContent} toolbarId={toolbarId} />
        </div>
      </div>
      <HowTo isVisible={showHowTo} setVisibility={setShowHowTo} />
      <Toast isVisible={isToastVisible} showDots={toastText === SAVING_TEXT}>{toastText}</Toast>
    </div>
  );
};

export default Document;