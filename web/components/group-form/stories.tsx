import React from "react";
import Component from ".";
import { nanoid } from "nanoid";
import { action } from "@storybook/addon-actions";

export default {
  title: "GroupForm",
  component: Component,
};

export const Primary = () => (
  <Component
    onSubmit={action("submit")}
  />
);
