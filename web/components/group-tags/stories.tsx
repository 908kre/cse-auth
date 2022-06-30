import React from "react";
import Component from ".";
import { nanoid } from "nanoid";
import { action } from "@storybook/addon-actions";
import { range } from "lodash";
import { RoleGroup } from "@csea/core/roleGroup";

export default {
  title: "GroupTag",
  component: Component,
};

export const Primary = () => (
  <Component
    roleGroups={range(5).map((i) => 
      RoleGroup({
        groupId: "groupId" + nanoid(),
        post: "post" + nanoid()
      })
    )}
  />
);
