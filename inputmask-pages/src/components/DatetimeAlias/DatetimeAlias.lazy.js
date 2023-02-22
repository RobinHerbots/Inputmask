import { lazy, Suspense } from "react";

const LazyDatetimeAlias = lazy(() => import("./DatetimeAlias")),
  DatetimeAlias = (props) => (
    <Suspense fallback={null}>
      <LazyDatetimeAlias {...props} />
    </Suspense>
  );

export default DatetimeAlias;
