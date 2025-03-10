import { lazy, Suspense } from "react";

const LazyColormask = lazy(() => import("./Colormask")),
  Colormask = (props) => (
    <Suspense fallback={null}>
      <LazyColormask {...props} />
    </Suspense>
  );

export default Colormask;
