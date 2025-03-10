import stylesApp from "../../App.module.scss";
import { Toc } from "../Toc/Toc";

import styles from "./Colormask.module.scss";

export const ColormaskToc = () => {
  return (
    <Toc
      contentSelector={`.${styles.Colormask}`}
      data-testid="ColormaskToc"
      scrollContainer={`.${stylesApp.article}`}></Toc>
  );
};
