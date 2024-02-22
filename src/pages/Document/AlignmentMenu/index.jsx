import React from "react";
import { QuillMenu } from "../QuillMenu";

const quillClasses = "ql-align";

const fontButtons = [
  {
    iconName: "alignLeft",
    value: "",
    quillClasses
  },
  {
    iconName: "alignCenter",
    value: "center",
    quillClasses
  },
  {
    iconName: "alignJustify",
    value: "justify",
    quillClasses
  },
  {
    iconName: "alignRight",
    value: "right",
    quillClasses
  }
]

export const AlignmentMenu = () => <QuillMenu defaultIconName="alignment" buttons={fontButtons} name="alignment" />
