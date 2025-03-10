import { Link } from "react-router-dom";

import constants from "../../Shared/constants.module.scss";
import RouteNames from "../../Shared/RouteNames";
import { useViewPort } from "../ViewPort/ViewPort";

import styles from "./Navigation.module.scss";

export const Navigation = () => {
  const { width } = useViewPort();
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
          <li>
            <Link to={RouteNames.Documentation_Colormask}>
              <strong>Colormask</strong>
            </Link>
          </li>
        </ul>
        {width > constants.ScreenThreshold && <hr />}
      </ul>
      <ul>
        <li>
          <Link to={RouteNames.Demo}>
            Open <strong>Demo</strong>
          </Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to={RouteNames.Changelog}>
            Open <strong>Changelog</strong>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
