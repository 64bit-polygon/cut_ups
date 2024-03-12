import React, { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { userSelector, documentsSelector } from "../../../state/selectors";
import { getEmailErrors, getPasswordErrors } from "../../../utils/validateAuth";
import { makeNewDoc } from "../../../utils/api.js";
import { TextInput } from "../../../components/TextInput";
import { EmailPassword } from "../../../components/EmailPassword";
import { ToggleAuthType } from "../../../components/ToggleAuthType";
import { LoadingBtn } from "../../../components/LoadingBtn";
import { SIGN_UP } from "../../../constants";
import { DEFAULT_SOURCE } from "../index.jsx";

const SIGN_UP_BTN_TEXT = "Sign up & make doc";

export const NewDocForm = ({
  isVisible,
  setSource1,
  source1,
  setSource2,
  source2,
  title,
  setTitle
}) => {
  const setDocuments = useSetRecoilState(documentsSelector);
  const user = useRecoilValue(userSelector);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authType, setAuthType] = useState(SIGN_UP);
  const [btnText, setBtnText] = useState(SIGN_UP_BTN_TEXT);
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [isLoading, setIsLoading] = useState();
  const [apiError, setApiError] = useState();
  const [showAuthForm, setShowAuthForm] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isVisible || password) return;

    setShowAuthForm(isVisible && !user);
  }, [isVisible, user]);
 
  useEffect(() => {
    if (!emailError) return;

    validateEmail()
  }, [emailError, email]);

  useEffect(() => {
    if (!email) return;

    validateEmail();
  }, [authType]);

  useEffect(() => {
    if (!passwordError) return;

    validatePassword();
  }, [passwordError, password]);

  useEffect(() => {
    if (isVisible) return;

    setTimeout(() => {
      setEmailError();
      setPasswordError();
      setEmail("");
      setPassword("");
      setIsLoading(false);
      setSource1(DEFAULT_SOURCE);
      setSource2(DEFAULT_SOURCE);
      setTitle("");
      setAuthType(SIGN_UP);
    }, 500);
  }, [isVisible]);

  useEffect(() => {
    if (user) {
      setBtnText("Click to make doc");
      return;
    }
    
    const newBtnText = authType === SIGN_UP ? SIGN_UP_BTN_TEXT : "Log in & make doc";
    setBtnText(newBtnText);
  }, [authType, user]);

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

  const createDoc = async userId => {
    setIsLoading(true);

    try {
      const doc = await makeNewDoc({
        userId,
        title,
        source1,
        source2
      });
      setDocuments(doc.data.documents);
      navigate(`/documents/${doc.data.docId}`, {state: { fadeIn: true }});
    } catch(error) {
      showApiError("Could not create doc");
    }
  }

  const createUser = async () => {
    const auth = getAuth();

    try {
      const creds = await createUserWithEmailAndPassword(auth, email, password);
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
      showApiError("Invalid user name or password");
    }
  }

  const handleClick = async () => {
    if (user) {
      createDoc(user.userId);
      return;
    }

    const hasEmailErrors = await validateEmail();
    const hasPasswordErrors = validatePassword();
    
    if (hasEmailErrors || hasPasswordErrors) return;

    const creds = authType === SIGN_UP ? await createUser() : await logInUser();
    const userId = creds?.user?.uid;
    if (userId) {
      createDoc(userId);
    }
  }

  const isCtaActive = !!user || (email && password && !emailError && !passwordError);

  return (
    <form className={styles.form}>
    {showAuthForm && (
      <ToggleAuthType authType={authType} setAuthType={setAuthType} />
    )}
      <div className={styles.inputWrap}>
        <TextInput
          label="Title"
          value={title}
          labelId="titleInput"
          onChange={ev => setTitle(ev.target.value)}
        />
      </div>
    {showAuthForm && (
      <EmailPassword
        email={email}
        setEmail={setEmail}
        emailError={emailError}
        onEmailBlur={validateEmail}
        password={password}
        setPassword={setPassword}
        passwordError={passwordError}
        onPasswordBlur={validatePassword}
        name="newDocForm"
      />
    )}
      <LoadingBtn
        type="button"
        classNames={cn(styles.submit, styles.create)}
        onClick={handleClick}
        isLoading={isLoading}
        isDisabled={!isCtaActive}
        error={apiError}
        isCreate={true}
      >
        {btnText}
      </LoadingBtn>
    </form>
  )
};
