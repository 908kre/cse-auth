import React from "react";
import Form from ".";
import { nanoid } from "nanoid";
import { action } from "@storybook/addon-actions";

export default {
  title: "Form",
  component: Form,
};

export const Primary = () => (
  <Form
    onSubmit={action("submit")}
  />
);
