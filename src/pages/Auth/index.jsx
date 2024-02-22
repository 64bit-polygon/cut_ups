import React from "react";
import styles from "./styles.module.scss";
import { DungeonCurtain } from "../../components/DungeonCurtain";
import { XBtn } from "../../components/XBtn";
import { AuthForm } from "../../components/AuthForm";
import cn from "classnames";
import { useRecoilState } from "recoil";
import { showAuthSelector } from "../../state/selectors";

const Auth = () => {
  const [isAuthVisible, setAuthVisibility] = useRecoilState(showAuthSelector);
 
  return (
    <div className={styles.page}>
      <XBtn onClick={() => setAuthVisibility(false)} isVisible={isAuthVisible} />
      <div className={cn(styles.curtainWrap, {[styles.down]: isAuthVisible})}>
        <DungeonCurtain isScrollable={false}>
          <AuthForm />
        </DungeonCurtain>
      </div>
    </div>
  );
};

export default Auth;