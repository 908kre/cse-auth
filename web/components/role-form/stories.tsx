import React from "react";
import RoleForm from ".";
import { Role } from "@csea/core/role";
import { nanoid } from "nanoid";
import { action } from "@storybook/addon-actions";

export default {
  title: "RoleForm",
  component: RoleForm,
};

export const Primary = () => (
  <RoleForm
    systemId={ "systemId:" + nanoid()}
    role={Role({ id: nanoid(), name: "test", charge: "test" })}
    onSubmit={action("submit")}
    onDelete={action("delete")}
  />
);
