import { lazy, Suspense } from "react";

const LazyIntroduction = lazy(() => import("./Introduction"));

const Introduction = (props) => (
  <Suspense fallback={null}>
    <LazyIntroduction {...props} />
  </Suspense>
);

export default Introduction;
