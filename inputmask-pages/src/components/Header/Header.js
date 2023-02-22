import { Link } from "react-router-dom";

import RouteNames from "../../RouteNames";

import styles from "./Header.module.scss";
// import githubLogo from "../../assets/github-mark-white.svg";

export const Header = () => {
  return (
    <div className={styles.Header} data-testid="Header">
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
      {/* <nav className={styles.navContainer}>
      <a
        href="https://github.com/RobinHerbots/Inputmask"
        target="_blank"
        rel="noreferrer"
      >
        <img src={githubLogo}></img>
      </a>
    </nav> */}
    </div>
  );
};
