import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import ReactQuill, { Quill } from "react-quill";
import "./quill.scss";
import { fontWhitelist } from "../FontMenu";
import { fontSizeWhitelist } from "../FontSizeMenu";
import { Link } from "react-router-dom";
import cn from "classnames";

const Error = errorCode => {
  const is404 = errorCode === 404;
  return (
    <div className={styles.error}>
      <div className={styles.errorMessage}>
      {is404
        ? "We couldn't find your document, double check the url to ensure it's correct."
        : "There was an error getting your document, try refreshing the page."
      }
      </div>
      <Link to="/documents" className={styles.errorLink}>my docs</Link>
    </div>
  )
};

const Inline = Quill.import("blots/inline");

class Source1 extends Inline {
  static blotName = "source1";
  static className = "source1";

  static formats() {
    return true;
  }
}
Quill.register(Source1);

class Source2 extends Inline {
  static blotName = "source2";
  static className = "source2";

  static formats() {
    return true;
  }
}
Quill.register(Source2);

const fontSizeStyle = Quill.import("attributors/class/size");
fontSizeStyle.whitelist = fontSizeWhitelist;
Quill.register(fontSizeStyle, true);

const font = Quill.import("attributors/class/font");
font.whitelist = fontWhitelist;
Quill.register(font, true);

const quillFormats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "align",
  "background",
  "source1",
  "source2"
];

export const DocumentEditor = ({
  value,
  setContent,
  isLoaded,
  toolbarId,
  loadingErrorCode,
  showSplitSources,
  hasInitFadeIn
}) => {
  const [ fadeIn, setFadeIn ] = useState();
  const textEditorRef = useRef();

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 1000);
  }, []);

  const quillModules = {
    toolbar: {
      container: `#${toolbarId}`
    }
  };

  const handleChange = ev => {
    setContent(ev)
  }

  const handleClick = ev => {
    if (!ev.target.classList.contains("documentEditor")) return;
    textEditorRef.current.focus();
  }

  return (
    <div
      className={cn(styles.document, "documentEditor", {[styles.showSources]: showSplitSources})}
      onClick={handleClick}
    >
      <div className={cn(styles.loader, {[styles.hidden]: isLoaded})} />
      { loadingErrorCode &&  <Error errorCode={loadingErrorCode} />}
      <div className={cn(styles.content, {[styles.initFadeIn]: hasInitFadeIn, [styles.fadeIn]: fadeIn})}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleChange}
          modules={quillModules}
          formats={quillFormats}
          readOnly={!!loadingErrorCode}
          ref={textEditorRef}
        />
      </div>
    </div>
  );
};
