import stylesApp from "../../App.module.scss";
import { Toc } from "../Toc/Toc";

import styles from "./Extensions.module.scss";

export const ExtensionsToc = () => {
  return (
    <Toc
      contentSelector={`.${styles.Extensions}`}
      data-testid="ExtensionsToc"
      scrollContainer={`.${stylesApp.article}`}></Toc>
  );
};
