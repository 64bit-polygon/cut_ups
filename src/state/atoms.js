import { atom } from "recoil";

export const TEXT_INPUT = "text";
export const USER_SELECTION = "userSelection";

const defaultSource = {
  userText: "",
  id: "",
  selectionType: ""
};

export const sourcesAtom = atom({
  key: "sourcesAtom",
  default: null
});

export const newDocSource1 = atom({
  key: "newDocSource1Atom",
  default: { ...defaultSource }
});

export const newDocSource2 = atom({
  key: "newDocSource2Atom",
  default: { ...defaultSource }
});

export const newDocMeta = atom({
  key: "newDocMetaAtom",
  default: {
    title: ""
  }
});

export const userAtom = atom({
  key: "userAtom",
  default: null
});

export const showAboutAtom = atom({
  key: "showAboutAtom",
  default: undefined
});

export const showAuthAtom = atom({
  key: "showAuthAtom",
  default: false
});

export const showNewDocFlowAtom = atom({
  key: "showNewDocFlowAtom",
  default: null
});

export const documentsAtom = atom({
  key: "documentsAtom",
  default: null
});
