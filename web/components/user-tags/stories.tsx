import React from "react";
import Component from ".";
import { nanoid } from "nanoid";
import { action } from "@storybook/addon-actions";
import { range } from "lodash";
import { RoleUser } from "@csea/core/roleUser";

export default {
  title: "UserTag",
  component: Component,
};

export const Primary = () => (
  <Component
    roleUsers={range(5).map((i) => 
      RoleUser({
        roleId: nanoid(),
        userId: "userId" + nanoid()
      })
    )}
  />
);
