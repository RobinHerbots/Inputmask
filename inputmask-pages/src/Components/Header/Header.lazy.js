import { lazy, Suspense } from "react";

const LazyHeader = lazy(() => import("./Header")),
  Header = (props) => (
    <Suspense fallback={null}>
      <LazyHeader {...props} />
    </Suspense>
  );

export default Header;
