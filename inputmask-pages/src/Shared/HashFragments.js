import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import styles from "../App.module.scss";

export const HashFragments = (props) => {
  const location = useLocation(),
    scrollToHashElement = () => {
      let { hash } = window.location;
      if (hash !== "") {
        setTimeout(() => {
          hash = hash.match(/#[^#]*$/)[0];
          const id = hash.replace("#", ""),
            element = document.getElementById(id);
          if (element) {
            element.scrollIntoView();
          } else {
            [
              ...document.getElementsByClassName(`${styles.scrollable}`)
            ].forEach((element) => {
              element.scrollTo(0, 0);
            });
          }
        }, 100);
      }
    };

  useEffect(() => {
    scrollToHashElement();
  }, [location]);

  return <>{props.children}</>;
};
