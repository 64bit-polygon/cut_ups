import React from "react";
import { QuillMenu } from "../QuillMenu";

const TINY  = "tiny";
const SMALL = "small";
const NORMAL = "normal";
const BIG = "big";
const LARGE = "large";
const HUGE = "huge";

export const fontSizeWhitelist = [
  TINY,
  SMALL,
  NORMAL,
  BIG,
  LARGE,
  HUGE
];

const quillClasses = "ql-size";

const fontSizeButtons = [
  {
    iconName: "9pt",
    value: TINY,
    quillClasses
  },
  {
    iconName: "12pt",
    value: SMALL,
    quillClasses
  },
  {
    iconName: "18pt",
    value: NORMAL,
    quillClasses
  },
  {
    iconName: "24pt",
    value: BIG,
    quillClasses
  },
  {
    iconName: "36pt",
    value: LARGE,
    quillClasses
  },
  {
    iconName: "45pt",
    value: HUGE,
    quillClasses
  }
]

export const FontSizeMenu = () => (
  <QuillMenu
    defaultIconName="18pt"
    buttons={fontSizeButtons}
    name="fontSizes"
  />
);
