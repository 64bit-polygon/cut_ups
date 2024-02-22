import { selector } from "recoil";
import {
  sourcesAtom,
  newDocSource1,
  newDocSource2,
  newDocMeta,
  userAtom,
  showAboutAtom,
  showAuthAtom,
  showNewDocFlowAtom,
  documentsAtom
} from "./atoms";

const sortSources = sources => sources.toSorted(
  (sourceA, sourceB) => {
    const compareA = sourceA.order ?? 0;
    const compareB = sourceB.order ?? 0;
    return compareA - compareB;
  });

export const sourcesSelector = selector({
  key: "sourcesSelector",
  set: ({ set }, sources) => {
    set(sourcesAtom, sortSources(sources));
  },
  get: ({ get }) => {
    return get(sourcesAtom);
  }
});

export const newDocSource1Selector = selector({
  key: "newDocSource1Selector",
  set: ({ set }, data) => {
    set(newDocSource1, data);
  },
  get: ({ get }) => {
    return get(newDocSource1);
  }
});

export const newDocSource2Selector = selector({
  key: "newDocSource2Selector",
  set: ({ set }, data) => {
    set(newDocSource2, data);
  },
  get: ({ get }) => {
    return get(newDocSource2);
  }
});

export const newDocMetaSelector = selector({
  key: "newDocMetaSelector",
  set: ({ set }, data) => {
    set(newDocMeta, data);
  },
  get: ({ get }) => {
    return get(newDocMeta);
  }
});

export const userSelector = selector({
  key: "userSelector",
  set: ({ set }, data) => {
    if (!data) {
      set(userAtom, undefined);
      return;
    }
    const { email, uid } = data;
    set(userAtom, { email, userId: uid });
  },
  get: ({ get }) => {
    return get(userAtom);
  }
});

export const showAboutSelector = selector({
  key: "showAboutSelector",
  set: ({ set }, data) => {
    set(showAboutAtom, data);
  },
  get: ({ get }) => {
    return get(showAboutAtom);
  }
});

export const showAuthSelector = selector({
  key: "showAuthSelector",
  set: ({ set }, data) => {
    set(showAuthAtom, data);
  },
  get: ({ get }) => {
    return get(showAuthAtom);
  }
});

export const showNewDocFlowSelector = selector({
  key: "showNewDocFlowSelector",
  set: ({ set }, data) => {
    set(showNewDocFlowAtom, data);
  },
  get: ({ get }) => {
    return get(showNewDocFlowAtom);
  }
});

export const documentsSelector = selector({
  key: "documentsSelector",
  set: ({ set }, data) => {
    set(documentsAtom, data);
  },
  get: ({ get }) => {
    return get(documentsAtom);
  }
});
