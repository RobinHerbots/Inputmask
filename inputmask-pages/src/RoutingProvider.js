import { createContext } from "react";
import { Route, Navigate } from "react-router-dom";

import { Changelog } from "./components/Changelog/Changelog";
import { ChangelogToc } from "./components/Changelog/ChangelogToc";
import { DatetimeAlias } from "./components/DatetimeAlias/DatetimeAlias";
import { DatetimeAliasToc } from "./components/DatetimeAlias/DatetimeAliasToc";
import { Demo } from "./components/Demo/Demo";
import { Documentation } from "./components/Documentation/Documentation";
import { DocumentationToc } from "./components/Documentation/DocumentationToc";
import { Extensions } from "./components/Extensions/Extensions";
import { ExtensionsToc } from "./components/Extensions/ExtensionsToc";
import { Introduction } from "./components/Introduction/Introduction";
import { NumericAlias } from "./components/NumericAlias/NumericAlias";
import { NumericAliasToc } from "./components/NumericAlias/NumericAliasToc";
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
        element={<Documentation />}
      />,
      <Route
        key={RouteNames.Documentation_Extensions}
        path={RouteNames.Documentation_Extensions}
        element={<Extensions />}
      />,
      <Route
        key={RouteNames.Documentation_Datetime}
        path={RouteNames.Documentation_Datetime}
        element={<DatetimeAlias />}
      />,
      <Route
        key={RouteNames.Documentation_Numeric}
        path={RouteNames.Documentation_Numeric}
        element={<NumericAlias />}
      />,
      <Route key={RouteNames.Demo} path={RouteNames.Demo} element={<Demo />} />,
      <Route
        key={RouteNames.Changelog}
        path={RouteNames.Changelog}
        element={<Changelog />}
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
    <RoutingContext.Provider
      value={{
        routes,
        asideRoutes
      }}>
      {children}
    </RoutingContext.Provider>
  );
};
