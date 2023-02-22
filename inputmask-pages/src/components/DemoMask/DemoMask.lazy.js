import React, { lazy, Suspense } from 'react';

const LazyDemoMask = lazy(() => import('./DemoMask'));

const DemoMask = props => (
  <Suspense fallback={null}>
    <LazyDemoMask {...props} />
  </Suspense>
);

export default DemoMask;
