import { datetime } from "inputmask/extensions/date";
import { definitions } from "inputmask/extensions/definitions";
import { email } from "inputmask/extensions/email";
import { ip } from "inputmask/extensions/ip";
import { numeric, decimal } from "inputmask/extensions/numeric";

import { DemoMask } from "../DemoMask/DemoMask";

import styles from "./Demo.module.scss";

export const Demo = () => {
  return (
    <div className={styles.Demo} data-testid="Demo">
      <DemoMask
        label="Date:"
        maskOptions={datetime({ inputFormat: "dd/MM/yyyy" })}
      />
      <DemoMask
        label="Date:"
        maskOptions={datetime({ inputFormat: "MM/dd/yyyy" })}
      />
      <DemoMask
        label="Date:"
        maskOptions={datetime({
          inputFormat: "dd MMM yyyy",
          inputmode: "text"
        })}
      />
      <DemoMask
        label="Date:"
        maskOptions={datetime({
          inputFormat: "dd MMMM yyyy",
          inputmode: "text"
        })}
      />
      <DemoMask
        label="Currency:"
        maskOptions={numeric({
          groupSeparator: ",",
          digits: 2,
          digitsOptional: false,
          prefix: "$",
          placeholer: "0"
        })}
      />
      <DemoMask
        label="License plate:"
        maskOptions={{ mask: "[9-]AAA-999", definitions: new definitions() }}
        comment="[9-]AAA-999"
      />
      <DemoMask
        label="Decimal:"
        maskOptions={decimal({ groupSeparator: "," })}
        comment="Group separator: , RadixPoint: ."
      />
      <DemoMask
        label="IP address:"
        maskOptions={ip({ greedy: true })}
        comment="greedy: true"
      />
      <DemoMask label="Email address:" maskOptions={email()} />
    </div>
  );
};
