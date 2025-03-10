import { createContext, useState, useEffect } from "react";

import { throttle } from "../../Shared/Throttle";

export const ViewPortContext = createContext({});

// eslint-disable-next-line one-var
export const ViewPortProvider = ({ children }) => {
  // This is the exact same logic that we previously had in our hook

  const [width, setWidth] = useState(window.innerWidth),
    [height, setHeight] = useState(window.innerHeight),
    handleWindowResize = throttle(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  return (
    <ViewPortContext.Provider
      value={{
        width,
        setWidth,
        height,
        setHeight
      }}>
      {children}
    </ViewPortContext.Provider>
  );
};
