import React from "react";
import RoleTable from ".";
import { Role } from "@csea/core/role";
import { RoleUser } from "@csea/core/roleUser";
import { RoleGroup } from "@csea/core/roleGroup";
import { nanoid } from "nanoid";
import { range } from "lodash";
import { action } from "@storybook/addon-actions";

export default {
  title: "RoleTable",
  component: RoleTable,
};

export const Primary = () => (
  <RoleTable
    rows={range(100).map((i) =>
      Role({
        id: "id:" + nanoid(),
        systemId: "systemId:" + nanoid(),
      })
    )}
    onEdit={action("onEdit")}
    onCreate={action("onCreate")}
  />
);

export const Info = () => (
  <RoleTable
    rows={[
      Role({id: "role-0",systemId: "systemId:" + nanoid()}),
      Role({id: "role-1",systemId: "systemId:" + nanoid()})
    ]}
    roleUsers={[
      RoleUser({ roleId: "role-0", userId: "AAA110800"}),
      RoleUser({ roleId: "role-0", userId: "AAA111633"}),
      RoleUser({ roleId: "role-1", userId: "AAA111633"}),
    ]}
    roleGroups={[
      RoleGroup({ roleId: "role-0", groupId: "1490", post: "000"}),
      RoleGroup({ roleId: "role-0", groupId: "1480", post: "000"}),
      RoleGroup({ roleId: "role-1", groupId: "1490", post: "001"}),
    ]}
    onEdit={action("onEdit")}
    onCreate={action("onCreate")}
  />
);
