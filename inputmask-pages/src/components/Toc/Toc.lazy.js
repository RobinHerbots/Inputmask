import { lazy, Suspense } from "react";

const LazyToc = lazy(() => import("./Toc"));

const Toc = (props) => (
  <Suspense fallback={null}>
    <LazyToc {...props} />
  </Suspense>
);

export default Toc;
