import React from "react";
import styles from "./styles.module.scss";
import {
  userSelector,
  showAuthSelector
} from "../../state/selectors";
import { TextBtn } from "../TextBtn";
import { TextBtnLink } from "../TextBtnLink";
import {
  useRecoilState,
  useRecoilValue
} from "recoil";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

export const NavControls = () => {
  const user = useRecoilValue(userSelector);
  const [isAuthVisible, setAuthVisibility] = useRecoilState(showAuthSelector);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.log("error signing out:", error);
    }
  }

  if (user === null) return null;

  const showMyDocsBtn = !!user && location.pathname !== "/documents";
  const showLogoutBtn = !!user;
  const showLoginBtn = !showLogoutBtn;
  
  return (
    <div className={styles.controls}>
    {showMyDocsBtn && (
      <div className={styles.slashDivider}>
        <TextBtnLink to="/documents" small={true} bordered={false}>my docs</TextBtnLink>
      </div>
    )}
    {showLogoutBtn && (
      <div>
        <TextBtn onClick={handleLogOut} small={true} bordered={false}>logout</TextBtn>
      </div>
    )}
    {showLoginBtn && (
      <div>
        <TextBtn onClick={() => setAuthVisibility(true)} small={true} bordered={false}>login or sign up</TextBtn>
      </div>
    )}
    </div>
  );
};
