import React from "react";
import { storiesOf } from "@storybook/react";
import Component from "../components/System/SystemForm";
import { Map, Set, List } from "immutable";
import { Role } from "@csea/core/role";
import { action } from "@storybook/addon-actions";
import { text, boolean } from "@storybook/addon-knobs";

storiesOf("SystemForm", module).add("default", () => {
    const roles = Map({
        u0: { ...Role(), id: "r0", name:"Owner", code:"Owner", systemId:"sys01", charge:"sys01" },
        u1: { ...Role(), id: "r1", name:"RW", code:"RW", systemId:"sys02", charge:"sys02" },
        u2: { ...Role(), id: "r2", name:"R", code:"R", systemId:"sys02", charge:"sys02" },
      });
    
  return (
    <Component
      systemId="sys01"
      code=""
      name={text("name", "System Name")}
      roleIds={Set(["u0"])}
      roles={roles}
      onSave={action("onSave")}
      onCodeInput={action("onCodeClick")}
      onNameInput={action("onNameInput")}
      onCreateClick={action("onCreateClick")}
      onEditClick={action("onEditClick")}
      onDeleteClick={action("onDeleteClick")}
      isValidName={boolean("isValidName", true)}
      isValidCode={boolean("isVlidCode", true)}
      isEditable={boolean("isEditable", true)}
      />
  );
});
