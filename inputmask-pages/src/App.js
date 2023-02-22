import { Route, Routes, Navigate, HashRouter } from "react-router-dom";

import styles from "./App.module.scss";
import { Changelog } from "./components/Changelog/Changelog";
import { ChangelogToc } from "./components/Changelog/ChangelogToc";
import { DatetimeAlias } from "./components/DatetimeAlias/DatetimeAlias";
import { DatetimeAliasToc } from "./components/DatetimeAlias/DatetimeAliasToc";
import { Demo } from "./components/Demo/Demo";
import { Documentation } from "./components/Documentation/Documentation";
import { DocumentationToc } from "./components/Documentation/DocumentationToc";
import { Extensions } from "./components/Extensions/Extensions";
import { ExtensionsToc } from "./components/Extensions/ExtensionsToc";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Introduction } from "./components/Introduction/Introduction";
import { MarkDownPageContextProvider } from "./components/MarkDownPage/MarkDownPageContext";
import { Navigation } from "./components/Navigation/Navigation";
import { NumericAlias } from "./components/NumericAlias/NumericAlias";
import { NumericAliasToc } from "./components/NumericAlias/NumericAliasToc";
import { ErrorBoundary } from "./ErrorBoundary";
import RouteNames from "./RouteNames";

function App(props) {
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
    <ErrorBoundary>
      <MarkDownPageContextProvider>
        <HashRouter>
          <div id="app" data-testid="app-container">
            <Header />
            <div className={styles.content}>
              <Navigation />
              <article className={`${styles.article} ${styles.scrollable}`}>
                <Routes>{routes}</Routes>
              </article>
              <aside className={`${styles.asideright} ${styles.scrollable}`}>
                <Routes>{asideRoutes}</Routes>
              </aside>
            </div>
            <Footer />
          </div>
        </HashRouter>
      </MarkDownPageContextProvider>
    </ErrorBoundary>
  );
}

export default App;
