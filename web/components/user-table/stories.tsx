import React from "react";
import UserTable from ".";
import { RoleUser } from "@csea/core/roleUser";
import { nanoid } from "nanoid";
import { range } from "lodash";
import { action } from "@storybook/addon-actions";

export default {
  title: "UserTable",
  component: UserTable,
};

export const Primary = () => (
  <UserTable
    rows={range(100).map((i) =>
      RoleUser({
        userId: "userId:" + nanoid(),
        roleId: "roleId:" + nanoid(),
      })
    )}
    onDelete={action("onDelete")}
  />
);
