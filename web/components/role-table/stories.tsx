import React from "react";
import RoleTable from ".";
import { Role } from "@csea/core/role";
import { nanoid } from "nanoid";
import { range } from "lodash";
import { action } from "@storybook/addon-actions";

export default {
  title: "RoleTable",
  component: RoleTable,
};

export const Primary = () => (
  <RoleTable
    rows={range(100).map((i) =>
      Role({
        id: "id:" + nanoid(),
        systemId: "systemId:" + nanoid(),
      })
    )}
    onEdit={action("onEdit")}
    onCreate={action("onCreate")}
  />
);
