import Inputmask from "inputmask";
import { useRef, useEffect, useState } from "react";

import styles from "./DemoMask.module.scss";

export const DemoMask = (props) => {
  const { label, comment, maskOptions } = props,
    inputRef = useRef(),
    [Complete, setComplete] = useState(),
    [Incomplete, setIncomplete] = useState(),
    [Cleared, setCleared] = useState(),
    [KeyValidation, setKeyValidation] = useState();

  useEffect(() => {
    Inputmask({
      ...maskOptions,
      oncomplete: () => {
        setComplete("fired");
        setIncomplete("");
      },
      onincomplete: () => {
        setIncomplete("fired");
        setComplete("");
      },
      oncleared: () => {
        setCleared("fired");
        setComplete("");
        setIncomplete("");
      },
      onKeyValidation: (key, result, opts) => {
        setKeyValidation(result ? "fired" : "");
      }
    }).mask(inputRef.current);
  }, [maskOptions]);

  return (
    <div className={styles.DemoMask} data-testid="DemoMask">
      <div className="demoField">
        <div>
          <span>{label}</span>
          <input ref={inputRef} />
        </div>
        <span className="comment">{comment}</span>
      </div>
      <div className="eventIndicator">
        <span className={Complete}>Complete</span>
        <span className={Incomplete}>Incomplete</span>
        <span className={Cleared}>Cleared</span>
        <span className={KeyValidation}>Valid</span>
      </div>
    </div>
  );
};
