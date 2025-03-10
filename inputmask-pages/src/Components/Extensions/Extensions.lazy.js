import { lazy, Suspense } from "react";

const LazyExtensions = lazy(() => import("./Extensions")),
  Extensions = (props) => (
    <Suspense fallback={null}>
      <LazyExtensions {...props} />
    </Suspense>
  );

export default Extensions;
