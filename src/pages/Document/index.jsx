import React, { useEffect, useState, useCallback } from "react";
import styles from "./styles.module.scss";
import { useRecoilValue } from "recoil";
import { userSelector } from "../../state/selectors";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getDocument, updateDocument, deleteDocument } from "../../utils/api.js"
import { showNewDocFlowSelector, documentsSelector } from "../../state/selectors";
import { useSetRecoilState, useRecoilState } from "recoil";
import { HowTo } from "./HowTo";
import { Toolbar } from "./Toolbar";
import { DocumentTitle } from "./DocumentTitle";
import { DocumentEditor } from "./DocumentEditor";
import { MetaTools } from "./MetaTools";
import { Toast } from "../../components/Toast";
import { ConfirmDelete } from "./ConfirmDelete";
import HtmlToRtfBrowser from "html-to-rtf-browser";
import { saveAs } from "file-saver";

var htmlToRtf = new HtmlToRtfBrowser();

const SAVING_TEXT = "saving";
const ERROR_TEXT = "could not save : /";

const Document = () => {
  const [isNewDocFlowVisibile, setNewDocFlowVisibility] = useRecoilState(showNewDocFlowSelector);
  const setDocuments = useSetRecoilState(documentsSelector);
  const [editorContent, setEditorContent] = useState(null);
  const [docTitle, setDocTitle] = useState(null);
  const [loadingErrorCode, setLoadingErrorCode] = useState();
  const [showHowTo, setShowHowTo] = useState();
  const [areSourcesVisible, setSourcesVisibility] = useState();
  const { docId } = useParams();
  const user = useRecoilValue(userSelector);
  const navigate = useNavigate();
  const [isToastVisible, setToastVisibility] = useState();
  const [toastText, setToastText] = useState();
  const [isLoaded, setIsLoaded] = useState();
  const [isDeleteScreenVisible, setIsDeleteScreenVisible] = useState();
  const [isDeleting, setIsDeleting] = useState();
  const location = useLocation();

  useEffect(() => {
    if(isNewDocFlowVisibile === false) {
      setTimeout(() => window.scrollTo(0, 0), 350);
    }
  }, [isNewDocFlowVisibile]);

  const handleToastClose = message => {
    setToastText(message);
    setTimeout(() => setToastVisibility(false), 2000);
  }

  const save = async () => {
    if (loadingErrorCode) return;
    setToastText(SAVING_TEXT);
    setToastVisibility(true);

    try {
      const docInfo = await updateDocument({userId: user.userId, docId, title: docTitle, content: editorContent});
      const message = docInfo.isErrored ? ERROR_TEXT : "saved"
      handleToastClose(message);
    } catch (error) {
      console.log("error", error);
      handleToastClose(ERROR_TEXT);
    }
  }

  const handleSave = useCallback((ev) => {
    if (ev.metaKey && ev.key === "s") {
      ev.preventDefault();
      save();
    }
  }, [user, editorContent, docTitle]);

  useEffect(() => {
    document.removeEventListener("keydown", handleSave);
    document.addEventListener("keydown", handleSave);

    return () => {
      document.removeEventListener("keydown", handleSave);
    }
  }, [editorContent, docTitle]);

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
          if (docInfo.code === 404) throw new Error("404");
          const { content, title } = docInfo.data;
          setEditorContent(content);
          setDocTitle(title);
          setNewDocFlowVisibility(false);
          setIsLoaded(true);
        } catch (error) {
          const is404 = error.message === "404";
          setLoadingErrorCode(is404 ? 404 : 500);
          setDocTitle(is404 ? "404 Error" : "Server Error");
          setIsLoaded(true);
        }
      };
      
      getDoc();
    }
  }, [docId, user]);

  useEffect(() => {
    if (isDeleting) {
      const deleteDoc = async () => {
        try {
          const docInfo = await deleteDocument(docId, user.userId);
          if (!docInfo.data.didDelete) throw new Error("could not delete document");
          const docs = docInfo.data.remainingDocs;
          setDocuments(docs);
          navigate("/documents");
        } catch (error) {
          setIsDeleting(false);
          setToastVisibility(true);
          setToastText("could not delete document");
          setTimeout(() => setToastVisibility(false), 5000);
        }
      };
      
      deleteDoc();
    }
  }, [isDeleting]);

  useEffect(() => {
    if (!isDeleteScreenVisible) {
      setIsDeleting(false);
    }
  }, [isDeleteScreenVisible]);

  const convertClassesToInlineStyles = str => {
    const factor = 2.75;
    const classMap = {
      ".ql-align-center": "text-align: center;",
      ".ql-align-justify": "text-align: justify;",
      ".ql-align-right": "text-align: right;",
      ".ql-font-simplonMono": "font-family: 'Courier New';",
      ".ql-font-neutral": "font-family: 'Arial';",
      ".ql-font-romain": "font-family: 'Times New Roman';",
      ".ql-size-tiny": `font-size: ${9 * factor}px;`,
      ".ql-size-small": `font-size: ${12 * factor}px;`,
      ".ql-size-normal": `font-size: ${18 * factor}px;`,
      ".ql-size-big": `font-size: ${24 * factor}px;`,
      ".ql-size-large": `font-size: ${36 * factor}px;`,
      ".ql-size-huge": `font-size: ${45 * factor}px;`
    }
    str = str.replaceAll("<strong", "<b");
    str = str.replaceAll("</strong", "</b");
    str = str.replaceAll("<em", "<i");
    str = str.replaceAll("</em", "</i");

    const html = document.createElement("div");
    html.innerHTML = str;

    Object.keys(classMap).forEach(styleClass => {
      const elems = html.querySelectorAll(styleClass);
      const rule = classMap[styleClass];
      elems.forEach(elem => {
        const styles = (elem.getAttribute("style") || "") + rule;
        elem.setAttribute("style", styles);
      });
    })

    return html.innerHTML;
  }

  const replaceEscapedChars = str => str.replaceAll("\\'2722", "\'22");

  const download = async () => {
    const htmlWithInlineStyles = convertClassesToInlineStyles(editorContent);
    const rtf = htmlToRtf.convertHtmlToRtf(htmlWithInlineStyles);
    const standardizedRtf = replaceEscapedChars(rtf);
    const blob = new Blob([standardizedRtf], { type: "text/rtf" });
    const fileName = `${docTitle ? docTitle : "untitled"}.rtf`;
    saveAs(blob, fileName);
  }

  const toolbarId = "quillToolbar";

  const fileBtns = [
    {
      iconName: "save",
      onClick: () => save(),
      label: "save"
    },
    {
      iconName: "download",
      onClick: () => download(),
      label: "download document"
    },
    {
      iconName: "document",
      isLink: true,
      to: "/new-document",
      label: "create new document",
      opensInNewTab: true
    },
    {
      iconName: "trash",
      onClick: () => setIsDeleteScreenVisible(true),
      label: "delete document"
    }
  ]

  return (
    <div className={styles.page}>
      <Toolbar id={toolbarId} />
      <div className={styles.metaTools}>
        <MetaTools
          showHowTo={() => setShowHowTo(true)}
          areSourcesVisible={areSourcesVisible}
          setSourcesVisibility={setSourcesVisibility}
          fileBtns={fileBtns}
        />
      </div>
      <div className={styles.mainColumnWrap}>
        <div className={styles.mainColumn}>
          <header className={styles.header}>
            <DocumentTitle
              value={docTitle}
              isLoaded={isLoaded}
              setTitle={setDocTitle}
              disabled={!!loadingErrorCode}
            />
          </header>
          <DocumentEditor
            value={editorContent}
            isLoaded={isLoaded}
            setContent={setEditorContent}
            toolbarId={toolbarId}
            loadingErrorCode={loadingErrorCode}
            showSplitSources={areSourcesVisible}
            hasInitFadeIn={location.state?.fadeIn}
          />
        </div>
      </div>
      <HowTo isVisible={showHowTo} setVisibility={setShowHowTo} />
      <ConfirmDelete
        isVisible={isDeleteScreenVisible}
        setVisibility={setIsDeleteScreenVisible}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
      <Toast isVisible={isToastVisible} showDots={toastText === SAVING_TEXT}>{toastText}</Toast>
    </div>
  );
};

export default Document;