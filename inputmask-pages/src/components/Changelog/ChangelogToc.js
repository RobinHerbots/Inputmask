import stylesApp from "../../App.module.scss";
import { Toc } from "../Toc/Toc";

import styles from "./Changelog.module.scss";

export const ChangelogToc = () => {
  return (
    <Toc
      contentSelector={`.${styles.Changelog}`}
      data-testid="ChangelogToc"
      scrollContainer={`.${stylesApp.article}`}></Toc>
  );
};
