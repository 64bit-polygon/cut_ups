import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { NewDocBtn } from "../../components/NewDocBtn";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { showNewDocFlowSelector, sourcesSelector, userSelector } from "../../state/selectors";

const NewDoc = () => {
  const [hasOpened, setHasOpened] = useState(false);
  const setShowNewDocFlow = useSetRecoilState(showNewDocFlowSelector);
  const sources = useRecoilValue(sourcesSelector);
  const user = useRecoilValue(userSelector);

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