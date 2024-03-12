import React, {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import cn from "classnames";
import { useRecoilState } from "recoil";
import styles from "./styles.module.scss";
import { showNewDocFlowSelector } from "../../state/selectors";
import { DungeonCurtain } from "../../components/DungeonCurtain";
import { XBtn } from "../../components/XBtn";
import { NewDocForm } from "./NewDocForm";
import { SourceInterface } from "./SourceInterface";

export const DEFAULT_SOURCE = {
  userText: "",
  id: "",
  selectionType: ""
};

const CURTAIN_CNT = 3;

const IS_TOUCH = !!("ontouchstart" in window || navigator.maxTouchPoints);

const NewDocFlow = () => {
  const [isVisible, setVisibility] = useRecoilState(showNewDocFlowSelector);
  const [source1, setSource1] = useState({...DEFAULT_SOURCE});
  const [source2, setSource2] = useState({...DEFAULT_SOURCE});
  const [title, setTitle] = useState("");
  const [listenerAdded, setIsListenerAdded] = useState();
  const [showCurtain1, setShowCurtain1] = useState(false);
  const [showCurtain2, setShowCurtain2] = useState(false);
  const [showCurtain3, setShowCurtain3] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(null);
  const [scrollMax, setScrollMax] = useState(null);
  const [curtain1Nudge, setCurtain1Nudge] = useState(0);
  const [curtain2Nudge, setCurtain2Nudge] = useState(0);
  const [currentCurtain, setCurrentCurtain] = useState(null);
  const documentRef = useRef(document);

  const onScroll = useCallback(() => {
    const { scrollHeight, scrollTop, clientHeight } = document.scrollingElement;
    setScrollAmount(scrollTop);
    setScrollMax(scrollHeight - clientHeight);
  }, [])

  useEffect(() => {
    if (IS_TOUCH) return;

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
    if (!isVisible || IS_TOUCH) return;

    const percentScrolled = scrollAmount / scrollMax * 100;
    switch (true) {
      case percentScrolled <= 15 && showCurtain1:
        setCurtain1Nudge(-0.5 * scrollAmount);
        break;
      case percentScrolled > 15 && showCurtain1:
        setShowCurtain1(false);
        break;
      case percentScrolled <= 15 && !showCurtain1:
        setShowCurtain1(true);
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
  },
  [
    showCurtain1,
    showCurtain2,
    showCurtain3,
    scrollAmount,
    scrollMax,
    isVisible
  ]);

  useEffect(() => {
    if (isVisible) {
      setShowCurtain3(true);
      setTimeout(() => setShowCurtain2(true), 75);
      setTimeout(() => setShowCurtain1(true), 150); 
    }

    if (isVisible === false) {
      setShowCurtain1(false);
      setShowCurtain2(false);
      setShowCurtain3(false);
      setTimeout(() => {
        setCurtain1Nudge(0);
        setCurtain2Nudge(0);
        setScrollAmount(0);
      }, 700);
    }
  }, [isVisible]);

  useEffect(() => {
    switch (true) {
      case showCurtain1 && showCurtain2 && showCurtain3:
        setCurrentCurtain("1");
        break;
      case !showCurtain1 && showCurtain2 && showCurtain3:
        setCurrentCurtain("2");
        break;
      case !showCurtain1 && !showCurtain2 && showCurtain3:
        setCurrentCurtain("3");
        break;
      default:
        setCurrentCurtain();
    }
  }, [showCurtain1, showCurtain2, showCurtain3]);

  const handleClose = () => setVisibility(false);
  
  return (
    <div className={cn(styles.newDocFlow, {[styles.visible]: isVisible})}>
      <XBtn onClick={handleClose} isVisible={isVisible} />
      <div className={cn(styles.documentExtender, {[styles.long]: isVisible && !IS_TOUCH})} />
      <div
        className={cn(styles.curtainWrap, styles.num1, {[styles.down]: showCurtain1})}
        style={{top: curtain1Nudge}}
      >
        <DungeonCurtain
          index="1"
          count={CURTAIN_CNT}
          isScrollable={!IS_TOUCH}
          showDown={IS_TOUCH}
          handleNext={() => setShowCurtain1(false)}
          isCurrentCurtain={currentCurtain === "1"}
        >
          <SourceInterface
            source={source1}
            setSource={setSource1}
            name="source1"
            label="first"
            isCurrent={currentCurtain === "1"}
          />
        </DungeonCurtain>
      </div>
      <div
        className={cn(styles.curtainWrap, styles.num2, {[styles.down]: showCurtain2})}
        style={{top: curtain2Nudge}}
      >
        <DungeonCurtain
          index="2"
          count={CURTAIN_CNT}
          isScrollable={!IS_TOUCH}
          showUp={IS_TOUCH}
          showDown={IS_TOUCH}
          handlePrevious={() => setShowCurtain1(true)}
          handleNext={() => setShowCurtain2(false)}
          isCurrentCurtain={currentCurtain === "2"}
        >
          <SourceInterface
            source={source2}
            setSource={setSource2}
            name="source2"
            label="second"
            isCurrent={currentCurtain === "2"}
          />
        </DungeonCurtain>
      </div>
      <div className={cn(styles.curtainWrap, styles.num3, {[styles.down]: showCurtain3})}>
        <DungeonCurtain
          index="3"
          count={CURTAIN_CNT}
          isScrollable={false}
          showUp={IS_TOUCH}
          handlePrevious={() => setShowCurtain2(true)}
        >
          <NewDocForm
            isVisible={isVisible}
            source1={source1}
            setSource1={setSource1}
            source2={source2}
            setSource2={setSource2}
            title={title}
            setTitle={setTitle}
          />
        </DungeonCurtain>
      </div>
    </div>
  );
};

export default NewDocFlow;
