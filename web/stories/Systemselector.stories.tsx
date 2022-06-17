import React from "react";
import { storiesOf } from "@storybook/react";
import Component from "../components/Role/SystemSelector";
import { Map, Set, List } from "immutable";
import { action } from "@storybook/addon-actions";

// export default {
//   title: "SystemSelector",
//   component: SystemSelector,
// };
// export const Pimary = (args) => <SystemSelector {...args} />;

import { System } from "@csea/core/system";
import { boolean } from "@storybook/addon-knobs";

storiesOf("SystemSelector", module).add("default", () => {
    const systems = Map({
        g0: { ...System(), id: "g0", name: "propla", code: "qqq" },
        g1: { ...System(), id: "g1", name: "Excel", code: "rrr" },
        g2: { ...System(), id: "g2", name: "E22xcel", code: "rrr" },

      });
    
  return (
    <Component
    systems={systems}
    onChange={action("e")}
      />
  );
});