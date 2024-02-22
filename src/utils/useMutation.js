import { useState, useEffect } from "react";

export default function (targetEl, cb) {
  const [observer, setObserver] = useState();

  useEffect(() => {
    const obs = new MutationObserver(cb);
    setObserver(obs);
  }, [cb, setObserver]);

  useEffect(() => {
    if (!observer) return;
    try {
      observer.observe(targetEl, { attributes: true, subtree: true });
    } catch (e) {
      console.error(e);
    }
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer, targetEl]);
}

