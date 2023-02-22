import { Link } from "react-router-dom";

import RouteNames from "../../RouteNames";

import styles from "./Navigation.module.scss";

export const Navigation = () => {
  return (
    <nav className={styles.Navigation} data-testid="Navigation">
      <ul>
        <li>
          <Link to={RouteNames.Documentation}>
            Open <strong>Documentation</strong>
          </Link>
        </li>
        <ul>
          <li>
            <Link to={RouteNames.Documentation_Extensions}>
              <strong>Extensions</strong>
            </Link>
          </li>
          <li>
            <Link to={RouteNames.Documentation_Datetime}>
              <strong>Datetime</strong>
            </Link>
          </li>
          <li>
            <Link to={RouteNames.Documentation_Numeric}>
              <strong>Numeric</strong>
            </Link>
          </li>
        </ul>
        <hr />
      </ul>
      <ul>
        <li>
          <Link to={RouteNames.Demo}>
            Open <strong>Demo</strong>
          </Link>
        </li>
        <li>
          <Link to={RouteNames.Changelog}>
            Open <strong>Changelog</strong>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
