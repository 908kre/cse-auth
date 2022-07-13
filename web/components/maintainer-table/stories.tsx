import React from "react";
import Component from ".";
import { Maintainer } from "@csea/core/maintainer";
import { nanoid } from "nanoid";
import { range } from "lodash";
import { action } from "@storybook/addon-actions";

export default {
  title: "MaintainerTable",
  component: Component,
};

export const Primary = () => (
  <Component
    rows={range(10).map((i) =>
      Maintainer({
        id: "userId:" + nanoid(),
        systemId: "systemId:" + nanoid(),
      })
    )}
    onDelete={action("onDelete")}
  />
);
