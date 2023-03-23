import documentationMD from "../../assets/DatetimeExtension.md";
import { MarkDownPage } from "../MarkDownPage/MarkDownPage";

import styles from "./DatetimeAlias.module.scss";

export const DatetimeAlias = () => {
  return (
    <MarkDownPage
      className={styles.DatetimeAlias}
      md={documentationMD}
      data-testid="DatetileAlias"></MarkDownPage>
  );
};
