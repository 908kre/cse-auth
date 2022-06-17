import React from "react";
import { storiesOf } from "@storybook/react";
import Component from "../components/RoleGroup/RoleGroupForm";
import { Map, Set, List } from "immutable";
import { Role } from "@csea/core/role";
import { action } from "@storybook/addon-actions";
import { text, boolean } from "@storybook/addon-knobs";
import RoleUser from "@csea/core/roleUser";
import RoleGroup from "@csea/core/roleGroup";
import { System } from "@csea/core/system";

import SystemSelector from "../components/Role/SystemSelector"
storiesOf("RoleGroupForm", module).add("default", () => {
    const users = Map({
        u0: { ...RoleUser(), id: "u0", roleId:"r01", companyCode:"AXA", userCode:"000000" },
        u1: { ...RoleUser(), id: "u1", roleId:"r02", companyCode:"AXA", userCode:"858757" },
        u2: { ...RoleUser(), id: "u2", roleId:"r02", companyCode:"AXA", userCode:"665555" },
      });
    const groups = Map({
        u0: { ...RoleGroup(), id: "u0", roleId:"r01", companyCode:"AXA", divisionCode:"1125", post:3333, },
        u1: { ...RoleGroup(), id: "u1", roleId:"r02", companyCode:"AXA", divisionCode:"1123", post:8888, },
        u2: { ...RoleGroup(), id: "u2", roleId:"r02", companyCode:"AXA", divisionCode:"1124", post:9999, },
      });

    const systems = Map({
        g0: { ...System(), id: "g0", name: "propla", code: "qqq" },
        g1: { ...System(), id: "g1", name: "Excel", code: "rrr" },
        g2: { ...System(), id: "g2", name: "E22xcel", code: "rrr" },

      });

  return (
    <Component
      roleCode={text("code", "sys01")}
      onChange={action("onChange")}
      onSave={action("onSave")}
      onCodeInput={action("onCodeInput")}
      isValidCode={boolean("isVlidCode", true)}
      />
  );
});
