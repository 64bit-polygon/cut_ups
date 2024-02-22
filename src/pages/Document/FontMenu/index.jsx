import React from "react";
import { QuillMenu } from "../QuillMenu";

const SANS_SERIF_FONT = "neutral";
const SERIF_FONT = "romain";
const MONO_FONT = "simplonMono";

export const fontWhitelist = [SANS_SERIF_FONT, SERIF_FONT, MONO_FONT];
const quillClasses = "ql-font";

const fontButtons = [
  {
    iconName: "fontSerif",
    value: SERIF_FONT,
    quillClasses
  },
  {
    iconName: "fontSansSerif",
    value: SANS_SERIF_FONT,
    quillClasses
  },
  {
    iconName: "fontMono",
    value: MONO_FONT,
    quillClasses
  }
]

export const FontMenu = () => <QuillMenu defaultIconName="fontSerif" buttons={fontButtons} name="fonts" />
