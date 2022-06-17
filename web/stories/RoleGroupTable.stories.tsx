import React from "react";
import { storiesOf } from "@storybook/react";
import RoleGroupTable from '../components/RoleGroup/RoleGroupTable'
import { text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Map, Set, List } from "immutable";
import { Role } from "../../core/role"
import { RoleGroups } from "../models";
import { RoleGroup } from "@csea/core/roleGroup"
import Mock from "../components/Mock";

// import { Group } from "@fpalm-auth/core/group";

storiesOf("RoleGroupTable", module).add("default", () => {
    const groups = Map({
        u0: { ...RoleGroup(), id: "u0", roleId:"r01", companyCode:"AXA", divisionCode:"1125", post:3333, },
        u1: { ...RoleGroup(), id: "u1", roleId:"r02", companyCode:"AXA", divisionCode:"1123", post:8888, },
        u2: { ...RoleGroup(), id: "u2", roleId:"r02", companyCode:"AXA", divisionCode:"1124", post:9999, },
      });

  return (
    <div style={{ height: "200px" }}>
      <RoleGroupTable
      roleGroups={groups}
      roleId={"r01"}
        onDeleteClick={action("onDelete")}
        onCreateClick={action("onCreateClick")}
        // isCreateable={boolean("isCreateable", true)}
        // isDeleteable={boolean("isDeleteable", true)}
        // isUpdateable={boolean("isUpdateable", true)}
      />
    </div>
  );
});
