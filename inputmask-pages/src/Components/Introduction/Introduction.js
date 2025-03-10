import browserstackLogo from "../../assets/browserstack-logo-600x315.png";
import introductionMD from "../../assets/Introduction.md";
import jetbrainsLogo from "../../assets/jb_beam.svg";
import { MarkDownPage } from "../MarkDownPage/MarkDownPage";

export const Introduction = () => {
  return (
    <MarkDownPage md={introductionMD} data-testid="Introduction">
      <a href="https://www.jetbrains.com/?from=inputmask">
        <img src={jetbrainsLogo} alt="Jetbrains" width="65" />
      </a>
      <a href="https://www.browserstack.com">
        <img src={browserstackLogo} alt="Browserstack" width="150" />
      </a>
    </MarkDownPage>
  );
};
