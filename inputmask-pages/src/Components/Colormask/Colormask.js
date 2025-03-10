import documentationMD from "../../assets/Colormask.md";
import { MarkDownPage } from "../MarkDownPage/MarkDownPage";

import styles from "./Colormask.module.scss";

export const Colormask = () => {
  return (
    <MarkDownPage
      className={styles.Colormask}
      md={documentationMD}
      data-testid="Colormask"></MarkDownPage>
  );
};
