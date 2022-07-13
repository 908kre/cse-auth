import React from "react";
import Component from ".";
import { nanoid } from "nanoid";
import { range } from "lodash";
import { System } from "@csea/core/system";
import { action } from "@storybook/addon-actions";

export default {
  title: "MaintainerForm",
  component: Component,
};

export const Primary = () => (
  <Component
    systems={range(5).map((i) =>
      System({
        id: "id:" + nanoid(),
        name: "name:" + nanoid(),
      })
    )}
    onSubmit={action("submit")}
  />
);

