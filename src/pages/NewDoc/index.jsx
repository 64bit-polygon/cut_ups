import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styles from "./styles.module.scss";
import {
  showNewDocFlowSelector,
  sourcesSelector,
  userSelector
} from "../../state/selectors";
import { NewDocBtn } from "../../components/NewDocBtn";

const NewDoc = () => {
  const setShowNewDocFlow = useSetRecoilState(showNewDocFlowSelector);
  const sources = useRecoilValue(sourcesSelector);
  const user = useRecoilValue(userSelector);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if ( sources !== null && user !== null && !hasOpened ) {
      setHasOpened(true);
      setShowNewDocFlow(true);
    }
  }, [sources, user, hasOpened]);

  return (
    <div className={styles.page}>
      <NewDocBtn />
    </div>
  )
};

export default NewDoc;