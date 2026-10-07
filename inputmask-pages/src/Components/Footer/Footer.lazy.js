import { lazy, Suspense } from "react";

const LazyFooter = lazy(() => import("./Footer")),
  Footer = (props) => (
    <Suspense fallback={null}>
      <LazyFooter {...props} />
    </Suspense>
  );

export default Footer;
