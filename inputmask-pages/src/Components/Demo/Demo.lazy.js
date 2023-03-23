import { lazy, Suspense } from "react";

const LazyDemo = lazy(() => import("./Demo")),
  Demo = (props) => (
    <Suspense fallback={null}>
      <LazyDemo {...props} />
    </Suspense>
  );

export default Demo;
