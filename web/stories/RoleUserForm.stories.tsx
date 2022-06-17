import React from "react";
import { storiesOf } from "@storybook/react";
import Component from "../components/RoleUser/RoleUserForm";
import { Map, Set, List } from "immutable";
import { Role } from "@csea/core/role";
import { action } from "@storybook/addon-actions";
import { text, boolean } from "@storybook/addon-knobs";
import RoleUser from "@csea/core/roleUser";
import RoleGroup from "@csea/core/roleGroup";
import { System } from "@csea/core/system";

storiesOf("RoleUserForm", module).add("default", () => {


  return (
    <Component
      userCode={text("code", "sys01")}
      onSave={action("onSave")}
      onCodeInput={action("onCodeInput")}
      isValidCode={boolean("isVlidCode", true)}
      />
  );
});
