import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { EmailPassword } from "../EmailPassword";
import { LoadingBtn } from "../LoadingBtn";
import {
  SIGN_UP,
  LOG_IN
} from "../../constants";
import { ToggleAuthType } from "../ToggleAuthType";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import {
  getEmailErrors,
  getPasswordErrors
} from "../../utils/validateAuth";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { showAuthSelector } from "../../state/selectors";

export const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState();
  const [isVisible, setAuthVisibility] = useRecoilState(showAuthSelector);
  const [authType, setAuthType] = useState(LOG_IN);
  const navigate = useNavigate();

  useEffect(() => {
    if (emailError) {
      validateEmail()
    }
  }, [emailError, email]);

  useEffect(() => {
    if (email) {
      validateEmail()
    }
  }, [authType]);

  useEffect(() => {
    if (passwordError) {
      validatePassword()
    }
  }, [passwordError, password]);

  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => {
        setEmailError();
        setPasswordError();
        setEmail("");
        setPassword("");
        setIsLoading(false);
      }, 500);
    }
  }, [isVisible]);

  const showApiError = error => {
    setTimeout(() => setIsLoading(false), 2000);
    setTimeout(() => setApiError(error), 2000);
    setTimeout(() => setApiError(), 8000);
  }

  const validateEmail = async () => {
    const errors = await getEmailErrors(email, authType);
    setEmailError(errors);
    return !!errors;
  };

  const validatePassword = () => {
    const errors = getPasswordErrors(password);
    setPasswordError(errors);
    return !!errors;
  }

  const createUser = async () => {
    const auth = getAuth();
    try {
      const creds = createUserWithEmailAndPassword(auth, email, password);
      return creds;
    } catch (error) {
      showApiError("Error creating your profile");
    }
  }

  const logInUser = async () => {
    const auth = getAuth();
    try {
      const creds = await signInWithEmailAndPassword(auth, email, password);
      return creds;
    } catch (error) {
      showApiError("Could not sign in");
    }
  }

  const handleClick = async () => {
    const hasEmailErrors = await validateEmail();
    const hasPasswordErrors = validatePassword();
    if (hasEmailErrors || hasPasswordErrors) return;

    setIsLoading(true);

    const creds = authType === SIGN_UP ? await createUser() : await logInUser();
    const userId = creds?.user?.uid;

    if (!userId) return;
    
    navigate("/documents");
  }

  const isCtaActive = email && password && !emailError && !passwordError;

  return (
    <form className={styles.form}>
      <ToggleAuthType authType={authType} setAuthType={setAuthType} />
      <EmailPassword
        email={email}
        setEmail={setEmail}
        emailError={emailError}
        onEmailBlur={validateEmail}
        password={password}
        setPassword={setPassword}
        passwordError={passwordError}
        onPasswordBlur={validatePassword}
        name="authForm"
      />
      <LoadingBtn
        type="button"
        classNames={styles.submit}
        onClick={handleClick}
        isLoading={isLoading}
        isDisabled={!isCtaActive}
        error={apiError}
      >
        {authType === SIGN_UP ? "Sign up" : "Login"}
      </LoadingBtn>
    </form>
  )
};
