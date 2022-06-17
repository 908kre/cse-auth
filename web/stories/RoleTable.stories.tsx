import React from "react";
import { storiesOf } from "@storybook/react";
import RoleTable from '../components/Role/RoleTable';
import { text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Map, Set, List } from "immutable";
import { Role } from "../../core/role"
import { Systems } from "../models";
import { System} from "../../core/system";
import Mock from "../components/Mock";

// import { Group } from "@fpalm-auth/core/group";

storiesOf("RoleTable", module).add("default", () => {
  const roles = Map({
    g0: { ...Role(), id: "r0", name: "オーナー", code: "Owner", systemId:"sys01", charge:"sys01" },
    g1: { ...Role(), id: "r1", name: "読み書き", code: "RW", systemId:"sys02", charge:"" },
  });
  const systems = Map({
    d0: { ...System(), id: "sys01", name: "propla", code: "sys01" },
    d1: { ...System(), id: "sys02", name: "Excel", code: "sys02" },
  });

  return (
    <div style={{ height: "200px" }}>
      <RoleTable
      systems={systems}
      roles={roles}
      SystemTags={()=>(
        <Mock name="SystemTag--------------" />
      )}
      UserTags={()=>(
        <Mock name="UserTag--------------" />
      )}
      GroupTags={()=>(
        <Mock name="GroupTag--------------" />
      )}

        onDeleteClick={action("onDelete")}
        onEditClick={action("onEdit")}
        onCreateClick={action("onCreateClick")}
        isCreateable={boolean("isCreateable", true)}
        isDeleteable={boolean("isDeleteable", true)}
        isUpdateable={boolean("isUpdateable", true)}
      />
    </div>
  );
});
