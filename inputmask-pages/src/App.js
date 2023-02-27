import { useContext } from "react";
import { Routes, HashRouter } from "react-router-dom";

import styles from "./App.module.scss";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Navigation } from "./components/Navigation/Navigation";
import { useViewPort } from "./components/ViewPort/ViewPort";
import { RoutingContext } from "./RoutingProvider";
import constants from "./Shared/constants.module.scss";

function App() {
  const { routes, asideRoutes } = useContext(RoutingContext),
    { width } = useViewPort();

  return (
    <HashRouter>
      <div id="app" data-testid="app-container">
        <Header />
        <div className={styles.content}>
          <Navigation />
          <article className={`${styles.article} ${styles.scrollable}`}>
            <Routes>{routes}</Routes>
          </article>
          {width > constants.AsideThreshold && (
            <aside className={`${styles.asideright} ${styles.scrollable}`}>
              <Routes>{asideRoutes}</Routes>
            </aside>
          )}
        </div>
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
