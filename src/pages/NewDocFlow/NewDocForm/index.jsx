import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import {
  newDocMetaSelector,
  userSelector,
  newDocSource1Selector,
  newDocSource2Selector,
  documentsSelector
} from "../../../state/selectors";
import {
  useRecoilState,
  useRecoilValue
} from "recoil";
import { TextInput } from "../../../components/TextInput";
import { EmailPassword } from "../../../components/EmailPassword";
import { ToggleAuthType } from "../../../components/ToggleAuthType";
import { SIGN_UP } from "../../../constants";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import cn from "classnames";
import {
  getEmailErrors,
  getPasswordErrors
} from "../../../utils/validateAuth";
import { makeNewDoc } from "../../../utils/api.js";
import { LoadingBtn } from "../../../components/LoadingBtn";
import { useNavigate } from "react-router-dom";

const signUpBtnText = "Sign up & make doc";

export const NewDocForm = ({isVisible}) => {
  const [newDocMeta, setNewDocMeta] = useRecoilState(newDocMetaSelector);
  const [documents, setDocuments] = useRecoilState(documentsSelector);
  const user = useRecoilValue(userSelector);
  const source1 = useRecoilValue(newDocSource1Selector);
  const source2 = useRecoilValue(newDocSource2Selector);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authType, setAuthType] = useState(SIGN_UP);
  const [btnText, setBtnText] = useState(signUpBtnText);
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [isLoading, setIsLoading] = useState();
  const [apiError, setApiError] = useState();
  const [showAuthForm, setShowAuthForm] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setShowAuthForm(isVisible && !user);
  }, [isVisible, user]);
 
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

  useEffect(() => {
    if (user) {
      setBtnText("Click to make doc");
      return;
    }
    
    const newBtnText = authType === SIGN_UP ? signUpBtnText : "Log in & make doc";
    setBtnText(newBtnText);
  }, [authType, user]);

  const showApiError = error => {
    setTimeout(() => setIsLoading(false), 2000);
    setTimeout(() => setApiError(error), 2000);
    setTimeout(() => setApiError(), 8000);
  }

  const validateEmail = async () => {
    const errors = await getEmailErrors(email);
    setEmailError(errors);
    return !!errors;
  };

  const validatePassword = () => {
    const errors = getPasswordErrors(password);
    setPasswordError(errors);
    return !!errors;
  }

  const handleTitleChange = title => setNewDocMeta({...newDocMeta, title});

  const createDoc = async (userId) => {
    setIsLoading(true);
    try {
      const doc = await makeNewDoc({
        userId,
        title: newDocMeta.title,
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
      showApiError("Could not sign in");
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
          value={newDocMeta.title}
          labelId="titleInput"
          onChange={ev => handleTitleChange(ev.target.value)}
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
