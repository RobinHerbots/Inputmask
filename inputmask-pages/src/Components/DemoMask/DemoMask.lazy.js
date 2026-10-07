import { lazy, Suspense } from "react";

const LazyDemoMask = lazy(() => import("./DemoMask")),
  DemoMask = (props) => (
    <Suspense fallback={null}>
      <LazyDemoMask {...props} />
    </Suspense>
  );

export default DemoMask;
