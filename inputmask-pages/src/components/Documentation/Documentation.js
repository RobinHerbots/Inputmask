import documentationMD from "../../assets/Documentation.md";
import { MarkDownPage } from "../MarkDownPage/MarkDownPage";

import styles from "./Documentation.module.scss";

export const Documentation = () => {
  return (
    <MarkDownPage
      className={styles.Documentation}
      md={documentationMD}
      data-testid="Documentation"></MarkDownPage>
  );
};
