import { lazy, Suspense } from "react";

const LazyNavigation = lazy(() => import("./Navigation")),
  Navigation = (props) => (
    <Suspense fallback={null}>
      <LazyNavigation {...props} />
    </Suspense>
  );

export default Navigation;
