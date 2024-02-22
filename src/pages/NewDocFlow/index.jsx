import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";
import { DungeonCurtain } from "../../components/DungeonCurtain";
import { XBtn } from "../../components/XBtn";
import { NewDocForm } from "./NewDocForm";
import {
  newDocSource1Selector,
  newDocSource2Selector,
  showNewDocFlowSelector
} from "../../state/selectors";
import { SourceInterface } from "./SourceInterface";
import { useRecoilState } from "recoil";

const curtainCnt = 3;

const NewDocFlow = () => {
  const [isVisible, setVisibility] = useRecoilState(showNewDocFlowSelector);
  const [listenerAdded, setIsListenerAdded] = useState();
  const [showCurtain1, setShowFirst] = useState(false);
  const [showCurtain2, setShowCurtain2] = useState(false);
  const [showCurtain3, setShowCurtain3] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(null);
  const [scrollMax, setScrollMax] = useState(null);
  const [curtain1Nudge, setCurtain1Nudge] = useState(0);
  const [curtain2Nudge, setCurtain2Nudge] = useState(0);
  const documentRef = useRef(document);

  const onScroll = useCallback(() => {
    const { scrollHeight, scrollTop, clientHeight } = document.scrollingElement;
    setScrollAmount(scrollTop);
    setScrollMax(scrollHeight - clientHeight);
  }, [])

  useEffect(() => {
    if ( isVisible && !listenerAdded ) {
      documentRef.current.addEventListener("scroll", onScroll);
      setIsListenerAdded(true);
      documentRef.current.body.setAttribute("data-scrolling","false");
    }

    if ( !isVisible && listenerAdded ) {
      documentRef.current.removeEventListener("scroll", onScroll);
      setIsListenerAdded(false);
      documentRef.current.body.setAttribute("data-scrolling","true");
    }
  }, [isVisible, listenerAdded]);

  useEffect(() => {
    if (!isVisible) return;
    const percentScrolled = scrollAmount / scrollMax * 100;
    switch (true) {
      case percentScrolled <= 15 && showCurtain1:
        setCurtain1Nudge(-0.5 * scrollAmount);
        break;
      case percentScrolled > 15 && showCurtain1:
        setShowFirst(false);
        break;
      case percentScrolled <= 15 && !showCurtain1:
        setShowFirst(true);
        setTimeout(() => setCurtain1Nudge(0), 750);
        break;
      case (percentScrolled > 70) && (percentScrolled <= 85) && showCurtain2:
        setCurtain2Nudge(-0.5 * (scrollAmount - scrollMax * 0.7));
        break;
      case percentScrolled > 85 && showCurtain2:
        setShowCurtain2(false);
        setTimeout(() => setCurtain2Nudge(0), 750);
        break;
      case percentScrolled <= 85 && !showCurtain2:
        setShowCurtain2(true);
        setTimeout(() => setCurtain2Nudge(0), 750);
        break;
    }
  }, [showCurtain1, showCurtain2, showCurtain3, scrollAmount, scrollMax, isVisible]);

  useEffect(() => {
    if (isVisible) {
      setShowCurtain3(true);
      setTimeout(() => setShowCurtain2(true), 75);
      setTimeout(() => setShowFirst(true), 150); 
    }

    if (isVisible === false) {
      setShowFirst(false);
      setShowCurtain2(false);
      setShowCurtain3(false);
      setTimeout(() => {
        setCurtain1Nudge(0);
        setCurtain2Nudge(0);
        setScrollAmount(0);
      }, 700);
    }
  }, [isVisible]);

  const handleClose = () => setVisibility(false);

  return (
    <div className={cn(styles.newDocFlow, {[styles.visible]: isVisible})}>
      <XBtn onClick={handleClose} isVisible={isVisible} />
      <div className={cn(styles.documentExtender, {[styles.long]: isVisible})} />
      <div
        className={cn(styles.curtainWrap, styles.num1, {[styles.down]: showCurtain1})}
        style={{top: curtain1Nudge}}
      >
        <DungeonCurtain index="1" count={curtainCnt}>
          <SourceInterface selector={newDocSource1Selector} name="source1" label="first" />
        </DungeonCurtain>
      </div>
      <div
        className={cn(styles.curtainWrap, styles.num2, {[styles.down]: showCurtain2})}
        style={{top: curtain2Nudge}}
      >
        <DungeonCurtain index="2" count={curtainCnt}>
          <SourceInterface selector={newDocSource2Selector} name="source2" label="second" />
        </DungeonCurtain>
      </div>
      <div className={cn(styles.curtainWrap, styles.num3, {[styles.down]: showCurtain3})}>
        <DungeonCurtain index="3" count={curtainCnt} isScrollable={false}>
          <NewDocForm isVisible={isVisible} />
        </DungeonCurtain>
      </div>
    </div>
  );
};

export default NewDocFlow;
