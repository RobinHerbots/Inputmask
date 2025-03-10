import stylesApp from "../../App.module.scss";
import { Toc } from "../Toc/Toc";

import styles from "./DatetimeAlias.module.scss";

export const DatetimeAliasToc = () => {
  return (
    <Toc
      contentSelector={`.${styles.DatetimeAlias}`}
      data-testid="DatetimeAliasToc"
      scrollContainer={`.${stylesApp.article}`}></Toc>
  );
};
