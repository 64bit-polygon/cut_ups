import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import "./index.scss";
import { sourcesSelector, userSelector } from "./state/selectors";
import { getSources as getDbSources } from "./utils/api.js";
import { SiteWrap } from "./components/SiteWrap";
import { Router } from "./components/Router";
import firebaseConfig from "./firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

function App() {
  const [sources, setSources] = useRecoilState(sourcesSelector);
  const setUser = useSetRecoilState(userSelector);

  useEffect(() => {
    if (sources) return;

    const getSources = async () => {
      const response = await getDbSources();
      setSources(response.data.sources);
    };

    getSources();
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

export default App;
