import Inputmask from "inputmask";
import { useRef, useEffect } from "react";

import styles from "./DemoMask.module.scss";

export const DemoMask = (props) => {
  const { label, comment, maskOptions } = props,
    inputRef = useRef(),
    complete = useRef(),
    incomplete = useRef(),
    cleared = useRef(),
    keyValidation = useRef();

  useEffect(() => {
    Inputmask({
      ...maskOptions,
      oncomplete: () => {
        complete.current = ".active";
      },
      onincomplete: () => {
        incomplete.current = ".active";
      },
      oncleared: () => {
        cleared.current = ".active";
      },
      onKeyValidation: () => {
        keyValidation.current = ".active";
      }
    }).mask(inputRef.current);
  }, [maskOptions]);

  return (
    <div className={styles.DemoMask} data-testid="DemoMask">
      <span>{label}</span>
      <input ref={inputRef} />
      <span className="comment">{comment}</span>
      <div className="eventIndicator">
        <span className={complete.current}>Complete</span>
        <span className={incomplete.current}>Incomplete</span>
        <span className={cleared.current}>Cleared</span>
        <span className={keyValidation.current}>Valid</span>
      </div>
    </div>
  );
};
