import { DemoMask } from "../DemoMask/DemoMask";

import styles from "./Demo.module.scss";

export const Demo = () => {
  return (
    <div className={styles.Demo} data-testid="Demo">
      <DemoMask
        label="Date:"
        maskOptions={{ alias: "datetime", inputFormat: "dd/mm/yyyy" }}
      />
      <DemoMask
        label="Date:"
        maskOptions={{ alias: "datetime", inputFormat: "mm/dd/yyyy" }}
      />
      <DemoMask
        label="Date:"
        maskOptions={{
          alias: "datetime",
          inputFormat: "dd mmm yyyy",
          inputmode: "text"
        }}
      />
      <DemoMask
        label="Date:"
        maskOptions={{
          alias: "datetime",
          inputFormat: "dd mmmm yyyy",
          inputmode: "text"
        }}
      />
      <DemoMask
        label="Currency:"
        maskOptions={{
          alias: "numeric",
          groupSeparator: ",",
          digits: 2,
          digitsOptional: false,
          prefix: "$",
          placeholer: "0"
        }}
      />
      <DemoMask
        label="License plate:"
        maskOptions={{ mask: "[9-]AAA-999" }}
        comment="[9-]AAA-999"
      />
      <DemoMask
        label="Decimal:"
        maskOptions={{ alias: "decimal", groupSeparator: "," }}
        comment="Group separator: , RadixPoint: ."
      />
      <DemoMask
        label="IP address:"
        maskOptions={{ alias: "ip", greedy: true }}
        comment="greedy: true"
      />
      <DemoMask label="Email address:" maskOptions={{ alias: "email" }} />
    </div>
  );
};
