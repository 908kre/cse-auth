import React from "react";
import { storiesOf } from "@storybook/react";
import RoleUserTable from '../components/RoleUser/RoleUserTable';
import { text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Map, Set, List } from "immutable";
import { Role } from "../../core/role"
import { RoleUsers } from "../models";
import { RoleUser } from "@csea/core/roleUser"
import Mock from "../components/Mock";

// import { Group } from "@fpalm-auth/core/group";

storiesOf("RoleUserTable", module).add("default", () => {
    const users = Map({
        u0: { ...RoleUser(), id: "u0", roleId:"r01", companyCode:"AXA", userCode:"000000" },
        u1: { ...RoleUser(), id: "u1", roleId:"r02", companyCode:"AXA", userCode:"858757" },
        u2: { ...RoleUser(), id: "u2", roleId:"r02", companyCode:"AXA", userCode:"665555" },
      });

  return (
    <div style={{ height: "200px" }}>
      <RoleUserTable
      roleUsers={users}
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
