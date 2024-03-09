import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { AuthForm } from "../../components/AuthForm";
import { LOG_IN } from "../../constants";
import { useSetRecoilState } from "recoil";
import { showAuthSelector } from "../../state/selectors";

const Login = () => {
  const setAuthState = useSetRecoilState(showAuthSelector);
  useEffect(() => {
    setAuthState({type: LOG_IN, isVisible: true});
  }, []);
  
  return (
    <div className={styles.page}>
      <AuthForm defaultAuthType={LOG_IN} defaultIsVisibile={true} />
    </div>
  );
};

export default Login;