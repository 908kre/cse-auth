import React from "react";
import { storiesOf } from "@storybook/react";
import Component from "../components/Role/UserTags";
import { Role, RoleUsers } from "../models";
// import { text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Map, Set, List } from "immutable";
import RoleUser from "@csea/core/roleUser";

storiesOf("Role/UserTags", module).add("default", () => {
  const users = Map({
    u0: { ...RoleUser(), id: "u0", roleId:"r01", companyCode:"AXA", userCode:"000000"},
    u1: { ...RoleUser(), id: "u1", roleId:"r02", companyCode:"AXA", userCode:"435632"},
    u2: { ...RoleUser(), id: "u2", roleId:"r02", companyCode:"AXA", userCode:"555555"},
  });
/*  const users = Map({
    u0: { ...RoleUser(), id: "u0", roleId:"r01", companyCode:"AXA", userCode:"000000"},
    u1: { ...RoleUser(), id: "u1", roleId:"r02", companyCode:"AXA", divisionCode:"1123", post:8888, categoryFlg:true },
    u2: { ...RoleUser(), id: "u2", roleId:"r02", companyCode:"AXA", divisionCode:"1124", post:9999, categoryFlg:true },
  }); */
  // roleId: string;
  // roleUsers: RoleUsers;
  // //claims?: Claims;
  // style?:React.CSSProperties,


  return (
    <Component
      roleId={"r01"}
      roleUsers={users}

      //onClick={action("onClick")}
    />
  );
});
