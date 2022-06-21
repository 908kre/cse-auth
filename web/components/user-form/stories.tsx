import React from "react";
import UserForm from ".";
import { nanoid } from "nanoid";
import { action } from "@storybook/addon-actions";

export default {
  title: "UserForm",
  component: UserForm,
};

export const Primary = () => (
  <UserForm
    onSubmit={action("submit")}
  />
);
