import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "@csea/api";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import { SystemForm } from "@csea/web/components/system-form";
import RoleTable  from "@csea/web/components/role-table";
import Form  from "@csea/web/components/form";
import useToast from "@csea/web/hooks/toast"

const api = Api();
const toast = useToast();
export const SystemUpdatePage = () => {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  let { id } = useParams();
  const { data: system } = useSWR(`/system/${id}`, () =>
    api.system.find({ id: id ?? "" })
  );
  const { data: roles } = useSWR("/system/role", () => api.role.filter({systemId: id}));
  const { data: roleUsers } = useSWR("/system/role-user", () => api.roleUser.filter({}));

  if (system === undefined || system instanceof Error || roles === undefined || roles instanceof Error || 
      roleUsers === undefined || roleUsers instanceof Error) {
    return <Loading />;
  }

  return (
    <div>
      <SystemForm
        system={system}
        onSubmit={async (data) => {
          const err = await api.system.update(data);
          if(err instanceof Error) {return toast.error(err.message)}
          mutate("/system");
          toast.info('成功しました')
          navigate(`/system`);
        }}
        onDelete={async (data) => {
          const err = await api.system.delete(data);
          if(err instanceof Error) {return toast.error(err.message)}
          mutate("/system");
          toast.info('成功しました')
          navigate(`/system`);
        }}
      />
      <label className="label is-medium">
        ロール
      </label>
      <div className="p-1" style={{ borderTop: '0.5px solid #d3d3d3', width: "100%" }}/>
      <Form 
        placeholder={"ロールID"}
        onSubmit={ async ({value}) => {
          const err = await api.role.create({id: value, systemId: system.id})
          if(err instanceof Error) {return toast.error(err.message)}
          toast.info('成功しました')
          mutate("/role");
        }}
      />
      <RoleTable
        rows={roles}
        roleUsers={roleUsers}
        onEdit={({id, systemId}) => {
          navigate(`/system/${system.id}/role/${id}`);
        }}
      /> </div>
  );
};
