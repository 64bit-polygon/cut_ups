import { atom } from "recoil";

export const sourcesAtom = atom({
  key: "sourcesAtom",
  default: null
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
