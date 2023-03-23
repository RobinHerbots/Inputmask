import { Suspense, StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./index.scss";
import App from "./App";
import { MarkDownPageContextProvider } from "./Components/MarkDownPage/MarkDownPageContext";
import { ViewPortProvider } from "./Components/ViewPort/ViewPortContext";
import { ErrorBoundary } from "./ErrorBoundary";
import reportWebVitals from "./reportWebVitals";
import { RoutingProvider } from "./RoutingProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ErrorBoundary>
      <ViewPortProvider>
        <RoutingProvider>
          <MarkDownPageContextProvider>
            <Suspense fallback="loading...">
              <App />
            </Suspense>
          </MarkDownPageContextProvider>
        </RoutingProvider>
      </ViewPortProvider>
    </ErrorBoundary>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
