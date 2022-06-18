import React from "react";
import SystemTable from ".";
import { System } from "@csea/core/system";
import { nanoid } from "nanoid";
import { range } from "lodash";

export default {
  title: "SystemTable",
  component: SystemTable,
};

export const Primary = () => (
  <SystemTable
    rows={range(100).map((i) =>
      System({
        id: "id:" + nanoid(),
        name: "name:" + nanoid(),
      })
    )}
  />
);
