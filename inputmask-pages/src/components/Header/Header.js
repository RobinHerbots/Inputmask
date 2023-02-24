import { Link } from "react-router-dom";

import constants from "../../Shared/constants.module.scss";
import RouteNames from "../../Shared/RouteNames";
import { useViewPort } from "../ViewPort/ViewPort";

import styles from "./Header.module.scss";

export const Header = () => {
  const { width } = useViewPort();

  return (
    <div className={styles.Header} data-testid="Header">
      {width <= constants.ScreenThreshold && (
        <>
          <h3>
            <Link to={RouteNames.Home}>Inputmask</Link>
          </h3>
          <nav className={styles.navContainer}>
            <ul>
              <li>
                <a
                  href="https://github.com/RobinHerbots/inputmask"
                  target="_blank"
                  rel="noreferrer">
                  View On <strong>GitHub</strong>
                </a>
              </li>
            </ul>
          </nav>
        </>
      )}
      {width > constants.ScreenThreshold && (
        <>
          <h1>
            <Link to={RouteNames.Home}>Inputmask</Link>
          </h1>
          <nav className={styles.navContainer}>
            <ul>
              <li>
                <a href="https://github.com/RobinHerbots/inputmask/zipball/5.x">
                  Download <strong>ZIP File</strong>
                </a>
              </li>
              <li>
                <a href="https://github.com/RobinHerbots/inputmask/tarball/5.x">
                  Download <strong>TAR Ball</strong>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/RobinHerbots/inputmask"
                  target="_blank"
                  rel="noreferrer">
                  View On <strong>GitHub</strong>
                </a>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};
