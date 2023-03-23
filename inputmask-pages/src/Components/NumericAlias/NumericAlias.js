import documentationMD from "../../assets/NumericExtension.md";
import { MarkDownPage } from "../MarkDownPage/MarkDownPage";

import styles from "./NumericAlias.module.scss";

export const NumericAlias = () => {
  return (
    <MarkDownPage
      className={styles.Numeric}
      md={documentationMD}
      data-testid="NumericAlias"></MarkDownPage>
  );
};
