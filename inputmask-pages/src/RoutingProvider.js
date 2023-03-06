import { createContext } from "react";
import { Route, Navigate, HashRouter } from "react-router-dom";

import { Changelog } from "./Components/Changelog/Changelog";
import { ChangelogToc } from "./Components/Changelog/ChangelogToc";
import { DatetimeAlias } from "./Components/DatetimeAlias/DatetimeAlias";
import { DatetimeAliasToc } from "./Components/DatetimeAlias/DatetimeAliasToc";
import { Demo } from "./Components/Demo/Demo";
import { Documentation } from "./Components/Documentation/Documentation";
import { DocumentationToc } from "./Components/Documentation/DocumentationToc";
import { Extensions } from "./Components/Extensions/Extensions";
import { ExtensionsToc } from "./Components/Extensions/ExtensionsToc";
import { Introduction } from "./Components/Introduction/Introduction";
import { NumericAlias } from "./Components/NumericAlias/NumericAlias";
import { NumericAliasToc } from "./Components/NumericAlias/NumericAliasToc";
import { HashFragments } from "./Shared/HashFragments";
import RouteNames from "./Shared/RouteNames";

export const RoutingContext = createContext({});

// eslint-disable-next-line one-var
export const RoutingProvider = ({ children }) => {
  const routes = [
      <Route
        key={RouteNames.Home}
        path={RouteNames.Home}
        element={<Introduction />}
      />,
      <Route
        key={RouteNames.Documentation}
        path={RouteNames.Documentation}
        element={
          <HashFragments>
            <Documentation />
          </HashFragments>
        }
      />,
      <Route
        key={RouteNames.Documentation_Extensions}
        path={RouteNames.Documentation_Extensions}
        element={
          <HashFragments>
            <Extensions />
          </HashFragments>
        }
      />,
      <Route
        key={RouteNames.Documentation_Datetime}
        path={RouteNames.Documentation_Datetime}
        element={
          <HashFragments>
            <DatetimeAlias />
          </HashFragments>
        }
      />,
      <Route
        key={RouteNames.Documentation_Numeric}
        path={RouteNames.Documentation_Numeric}
        element={
          <HashFragments>
            <NumericAlias />
          </HashFragments>
        }
      />,
      <Route key={RouteNames.Demo} path={RouteNames.Demo} element={<Demo />} />,
      <Route
        key={RouteNames.Changelog}
        path={RouteNames.Changelog}
        element={
          <HashFragments>
            <Changelog />
          </HashFragments>
        }
      />,
      <Route
        key="fallback"
        path="*"
        element={<Navigate to={RouteNames.Home} />}
      />
    ],
    asideRoutes = [
      <Route
        key={RouteNames.Documentation}
        path={RouteNames.Documentation}
        element={<DocumentationToc />}
      />,
      <Route
        key={RouteNames.Documentation_Extensions}
        path={RouteNames.Documentation_Extensions}
        element={<ExtensionsToc />}
      />,
      <Route
        key={RouteNames.Documentation_Datetime}
        path={RouteNames.Documentation_Datetime}
        element={<DatetimeAliasToc />}
      />,
      <Route
        key={RouteNames.Documentation_Numeric}
        path={RouteNames.Documentation_Numeric}
        element={<NumericAliasToc />}
      />,
      <Route
        key={RouteNames.Changelog}
        path={RouteNames.Changelog}
        element={<ChangelogToc />}
      />,
      <Route key="fallback" path="*" element={<></>} />
    ];

  return (
    <HashRouter>
      <RoutingContext.Provider
        value={{
          routes,
          asideRoutes
        }}>
        {children}
      </RoutingContext.Provider>
    </HashRouter>
  );
};
