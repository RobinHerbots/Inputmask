import { lazy, Suspense } from "react";

const LazyMarkDownPage = lazy(() => import("./MarkDownPage"));

const MarkDownPage = (props) => (
  <Suspense fallback={null}>
    <LazyMarkDownPage {...props} />
  </Suspense>
);

export default MarkDownPage;
