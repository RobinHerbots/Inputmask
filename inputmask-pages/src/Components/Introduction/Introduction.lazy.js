import { lazy, Suspense } from "react";

const LazyIntroduction = lazy(() => import("./Introduction")),
  Introduction = (props) => (
    <Suspense fallback={null}>
      <LazyIntroduction {...props} />
    </Suspense>
  );

export default Introduction;
