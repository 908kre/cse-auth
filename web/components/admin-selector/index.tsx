import React from "react";
import { Admin } from "@csea/core/auth";

const RoleSelector = (props: {
  value?: Admin;
  onChange: (value: Admin) => void;
}) => {
  const { onChange, value } = props;
  return (
    <div className="select is-fullwidth">
      <select
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) as Admin)}
      >
        <option value={Admin.Maintainer}>Maintainer</option>
        <option value={Admin.Owner}>Owner</option>
      </select>
    </div>
  );
};
export default RoleSelector;
