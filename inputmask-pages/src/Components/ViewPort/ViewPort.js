import { useContext } from "react";

import { ViewPortContext } from "./ViewPortContext";

export const useViewPort = () => {
  const { width, height } = { ...useContext(ViewPortContext) };

  return { width, height };
};
