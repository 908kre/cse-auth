import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "@csea/api";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import { RoleForm } from "@csea/web/components/role-form";
import UserForm  from "@csea/web/components/user-form";
import UserTable  from "@csea/web/components/user-table";

const api = Api();
export const RoleUpdatePage = () => {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  let { id, roleid } = useParams();

  console.log(roleid)
  const { data: role } = useSWR(`/role/${id}`, () => api.role.find({ id: roleid ?? "", systemId: id ?? "" }));

  const { data: users } = useSWR("/user", () => api.roleUser.filter({}));
  if (role === undefined || role instanceof Error || users === undefined || users instanceof Error) {
    return <Loading />;
  }

  return (
    <div>
      <RoleForm
        role={role}
        systemId={id ?? ""}
        onSubmit={async (data) => {
          const err = await api.role.create(data);
          navigate(`/system/update/${id}`);
          mutate("/role")
        }}
        onDelete={async (data) => {
          await api.role.delete(data);
          navigate(`/system/update/${id}`);
          mutate("/role")
        }}
      />
      <label className="label is-medium">
        ユーザー
      </label>
      <div className="p-1" style={{ borderTop: '0.5px solid #d3d3d3', width: "100%" }}/>
      <UserForm onSubmit={
        ({userId}) => console.log(userId)
      }/>
      <UserTable
        rows={users}
        onCreate={() => {
        }}
      /> 
    </div>
  );
};
