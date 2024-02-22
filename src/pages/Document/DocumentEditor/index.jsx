import React from "react";
import styles from "./styles.module.scss";
import ReactQuill, { Quill } from "react-quill";
import "./quill.scss";
import { fontWhitelist } from "../FontMenu";
import { fontSizeWhitelist } from "../FontSizeMenu";

const Inline = Quill.import('blots/inline')

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

export const DocumentEditor = ({ value, setContent, toolbarId }) => {
  const quillModules = {
    toolbar: {
      container: `#${toolbarId}`
    }
  };

  return (
    <div className={styles.document}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setContent}
        modules={quillModules}
        formats={quillFormats}
      />
    </div>
  );
};
