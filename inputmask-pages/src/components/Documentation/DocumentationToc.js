import stylesApp from "../../App.module.scss";
import { Toc } from "../Toc/Toc";

import styles from "./Documentation.module.scss";

export const DocumentationToc = () => {
  return (
    <Toc
      contentSelector={`.${styles.Documentation}`}
      data-testid="DocumentationToc"
      scrollContainer={`.${stylesApp.article}`}></Toc>
  );
};
