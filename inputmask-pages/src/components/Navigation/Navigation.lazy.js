import React, { lazy, Suspense } from 'react';

const LazyNavigation = lazy(() => import('./Navigation'));

const Navigation = props => (
  <Suspense fallback={null}>
    <LazyNavigation {...props} />
  </Suspense>
);

export default Navigation;
