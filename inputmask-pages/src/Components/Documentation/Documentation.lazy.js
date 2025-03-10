import { lazy, Suspense } from "react";

const LazyDocumentation = lazy(() => import("./Documentation")),
  Documentation = (props) => (
    <Suspense fallback={null}>
      <LazyDocumentation {...props} />
    </Suspense>
  );

export default Documentation;
