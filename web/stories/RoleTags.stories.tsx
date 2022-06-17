import React from "react";
import { storiesOf } from "@storybook/react";
import Component from "../components/System/RoleTags";
// import { text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Map, Set, List } from "immutable";
//import RoleUser from "@csea/core/roleUser";
import Role from "../../core/role"
import System from "../../core/system"
storiesOf("System/RoleTags", module).add("default", () => {
  const roles = Map({
    u0: { ...Role(), id: "r0", name:"Owner", code:"Owner", systemId:"sys01", charge:"sys01" },
    u1: { ...Role(), id: "r1", name:"RW", code:"RW", systemId:"sys02", charge:"sys02" },
    u2: { ...Role(), id: "r2", name:"R", code:"R", systemId:"sys02", charge:"sys02" },
  });
//   const systems = List([
//     { ...System(), id:"sys01", name:"sys01", code:"sys01" },
//     { ...System(), id:"sys02", name:"sys02", code:"sys03" },
//     { ...System(), id:"sys03", name:"sys03", code:"sys03" },
//   ]);

  return (
    <Component
      systemId={"sys01"}
      roles={roles}
    //   systems={systems}
    style={{
        display: "flex",
        flexWrap: "wrap",
      }}
      
    />
  );
});
