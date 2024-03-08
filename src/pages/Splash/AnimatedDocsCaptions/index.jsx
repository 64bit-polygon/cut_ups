import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

const caption2MarkTime = 3200;
const caption3MarkTime = 13700;
const caption4MarkTime = 18500;
const caption5MarkTime = 22000;

const captions = [
  {
    duration: caption2MarkTime,
    text: "make a cut up from two sources"
  },
  {
    duration: caption3MarkTime - caption2MarkTime,
    text: "or start with a blank doc"
  },
  {
    duration: caption4MarkTime - caption3MarkTime,
    text: "manipulate the text"
  },
  {
    duration: caption5MarkTime - caption4MarkTime,
    text: "save to the cloud or download"
  },
  {
    duration: null,
    text: "click the arrow to continue"
  }
];

const lastIndex = captions.length - 1;

export const AnimatedDocsCaptions = () => {
  const [captionIndex, setCaptionIndex] = useState(null);
  const [isSkippedAhead, setIsSkippedAhead] = useState(false);

  useEffect(() => {
    let timer;

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        clearTimeout(timer);
        setCaptionIndex(lastIndex);
        setIsSkippedAhead(true);
      }
    }
    
    if (captionIndex === null) {
      setCaptionIndex(0);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    } else if (captionIndex < lastIndex) {
      timer = setTimeout(() => {
        setCaptionIndex(captionIndex + 1);
      }, captions[captionIndex].duration);
    } else if (captionIndex === lastIndex) {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }

    return () => {
      clearTimeout(timer);
    }
  }, [captionIndex]);

  const figcaptionClasses = cn(
    styles.figcaption,
    {[styles.noTransition]: isSkippedAhead}
  );

  return (
      <figcaption className={figcaptionClasses}>
      {captions.map((caption, index) => 
        <div 
          className={cn(styles.caption, {[styles.visible]: index === captionIndex})}
          key={caption.text}
        >
          {caption.text}
        </div>
      )}
      </figcaption>
  );
};
