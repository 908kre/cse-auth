import React from "react";
import GroupTable from ".";
import { RoleGroup } from "@csea/core/roleGroup";
import { nanoid } from "nanoid";
import { range } from "lodash";
import { action } from "@storybook/addon-actions";

export default {
  title: "GroupTable",
  component: GroupTable,
};

export const Primary = () => (
  <GroupTable
    rows={range(100).map((i) =>
      RoleGroup({
        groupId: "userId:" + nanoid(),
        post: "post:" + nanoid(),
        roleId: "roleId:" + nanoid(),
      })
    )}
  />
);
