import React from "react";
import { storiesOf } from "@storybook/react";
import SystemTable from '../components/System/SystemTable';
import { text, boolean } from "@storybook/addon-knobs";
// import { Role } from "@fpalm-auth/web/models";
import { action } from "@storybook/addon-actions";
import { Map, Set, List } from "immutable";
import { System } from "../../core/system";
import { Role } from "../models";
import Mock from "../components/Mock";

// import { Group } from "@fpalm-auth/core/group";

storiesOf("SystemTable", module).add("default", () => {
  const systems = Map({
    g0: { ...System(), id: "g0", name: "1", code: "qqq" },
    g1: { ...System(), id: "g1", name: "0", code: "rrr" },
  });

  return (
    <div style={{ height: "200px" }}>
      <SystemTable
      systems={systems}
      RoleTags={()=>(
        <Mock name="sssssss--------------" />
        
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
