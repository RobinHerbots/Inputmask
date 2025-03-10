import React, { lazy, Suspense } from 'react';

const LazyChangelog = lazy(() => import('./Changelog'));

const Changelog = props => (
  <Suspense fallback={null}>
    <LazyChangelog {...props} />
  </Suspense>
);

export default Changelog;
