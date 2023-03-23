import { useContext } from "react";
import { Routes } from "react-router-dom";

import styles from "./App.module.scss";
import { Footer } from "./Components/Footer/Footer";
import { Header } from "./Components/Header/Header";
import { Navigation } from "./Components/Navigation/Navigation";
import { useViewPort } from "./Components/ViewPort/ViewPort";
import { RoutingContext } from "./RoutingProvider";
import constants from "./Shared/constants.module.scss";

function App() {
  const { routes, asideRoutes } = useContext(RoutingContext),
    { width } = useViewPort();

  return (
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
  );
}

export default App;
