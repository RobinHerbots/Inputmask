import { useNavigate } from "react-router-dom";

import RouteNames from "../../RouteNames";

import styles from "./Navigation.module.scss";

export const Navigation = () => {
  const navigate = useNavigate();
  return (
    <nav className={styles.Navigation} data-testid="Navigation">
      <ul>
        <li>
          <a href="" onClick={() => navigate(RouteNames.Documentation)}>
            Open <strong>Documentation</strong>
          </a>
        </li>
        <ul>
          <li>
            <a
              href=""
              onClick={() => navigate(RouteNames.Documentation_Extensions)}>
              <strong>Extensions</strong>
            </a>
          </li>
          <li>
            <a
              href=""
              onClick={() => navigate(RouteNames.Documentation_Datetime)}>
              <strong>Datetime</strong>
            </a>
          </li>
          <li>
            <a
              href=""
              onClick={() => navigate(RouteNames.Documentation_Numeric)}>
              <strong>Numeric</strong>
            </a>
          </li>
        </ul>
        <hr />
      </ul>
      <ul>
        <li>
          <a href="" onClick={() => navigate(RouteNames.Demo)}>
            Open <strong>Demo</strong>
          </a>
        </li>
        <li>
          <a href="" onClick={() => navigate(RouteNames.Changelog)}>
            Open <strong>Changelog</strong>
          </a>
        </li>
      </ul>
    </nav>
  );
};
