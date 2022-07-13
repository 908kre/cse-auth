import React from "react";
import { System } from "@csea/core/system";

const SystemSelector = (props: {
  value?: string;
  systems: System[];
  onChange: (value: string) => void;
}) => {
  const { onChange, value } = props;
  return (
    <div className="select is-fullwidth">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {props.systems.map(x => <option key={x.id} value={x.id}> {x.name} </option>)}
      </select>
    </div>
  );
};
export default SystemSelector;
