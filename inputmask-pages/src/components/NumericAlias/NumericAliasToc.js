import stylesApp from "../../App.module.scss";
import { Toc } from "../Toc/Toc";

import styles from "./NumericAlias.module.scss";

export const NumericAliasToc = () => {
  return (
    <Toc
      contentSelector={`.${styles.Numeric}`}
      data-testid="NumericAliasToc"
      scrollContainer={`.${stylesApp.article}`}></Toc>
  );
};
