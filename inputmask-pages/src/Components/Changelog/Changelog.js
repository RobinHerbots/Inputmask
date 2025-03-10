import changelogMD from "../../assets/Changelog.md";
import { MarkDownPage } from "../MarkDownPage/MarkDownPage";

import styles from "./Changelog.module.scss";

export const Changelog = () => {
  return (
    <MarkDownPage
      className={styles.Changelog}
      md={changelogMD}
      data-testid="Changelog"></MarkDownPage>
  );
};
