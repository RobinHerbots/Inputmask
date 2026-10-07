import { lazy, Suspense } from "react";

const LazyChangelog = lazy(() => import("./Changelog")),
  Changelog = (props) => (
    <Suspense fallback={null}>
      <LazyChangelog {...props} />
    </Suspense>
  );

export default Changelog;
