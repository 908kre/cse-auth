import React from "react";
import SystemForm from ".";
import { System } from "@csea/core/system";
import { nanoid } from "nanoid";
import { range } from "lodash";
import { action } from "@storybook/addon-actions";

export default {
  title: "SystemForm",
  component: SystemForm,
};

export const Primary = () => (
  <SystemForm
    system={System({ id: nanoid(), name: "test" })}
    onSubmit={action("submit")}
  />
);
