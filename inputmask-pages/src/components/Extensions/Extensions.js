import documentationMD from "../../assets/OtherExtensions.md";
import { MarkDownPage } from "../MarkDownPage/MarkDownPage";

import styles from "./Extensions.module.scss";

export const Extensions = () => {
  return (
    <MarkDownPage
      className={styles.Extensions}
      md={documentationMD}
      data-testid="Extensions"></MarkDownPage>
  );
};
