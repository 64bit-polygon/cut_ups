import React, { useEffect } from "react";
import "./index.scss";
import { SiteWrap } from "./components/SiteWrap";
import { useRecoilState } from "recoil";
import {
  sourcesSelector,
  userSelector
} from "./state/selectors";
import { Router } from "./components/Router";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { getSources as getDbSources } from "./utils/api.js"

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

function App() {
  const [sources, setSources] = useRecoilState(sourcesSelector);
  const [user, setUser] = useRecoilState(userSelector);

  useEffect(() => {
    if (!sources) {
      const getSources = async () => {
        const response = await getDbSources();
        setSources(response.data.sources);
      };

      getSources();
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(curUser => {
      setUser(curUser ?? undefined);
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <SiteWrap>
      <Router />
    </SiteWrap>
  );
}

export default App
