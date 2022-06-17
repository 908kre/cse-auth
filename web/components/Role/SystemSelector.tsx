import React, { FormEvent } from "react";
import { System, Systems } from "../../models";


const SystemSelector = (props: {
  systems: Systems;
  onChange: (value: string) => void
  //onChange: (value: string) => void;
}) => {
  const { onChange } = props;
  const systemIds = props.systems.map((x)=> x.id)
  const systems = props.systems.filter((x) => systemIds.has(x.id)).toList();
  
  return (
    <div className="select is-fullwidth">
      
      

      <select
        //value={x.id}
        onChange={(e) => onChange(e.target.value)}
      >
        {systems.toList().map((x) => (
        <option value={x.id}>{x.name}</option>
        
        ))}
        </select>
         
    </div>
  );
};
export default SystemSelector;