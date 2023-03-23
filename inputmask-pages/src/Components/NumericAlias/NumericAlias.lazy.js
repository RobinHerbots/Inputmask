import { lazy, Suspense } from "react";

const LazyNumericAlias = lazy(() => import("./NumericAlias")),
  NumericAlias = (props) => (
    <Suspense fallback={null}>
      <LazyNumericAlias {...props} />
    </Suspense>
  );

export default NumericAlias;
