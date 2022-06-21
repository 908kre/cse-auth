import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "@csea/api";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import { SystemForm } from "@csea/web/components/system-form";
import RoleTable  from "@csea/web/components/role-table";

const api = Api();
export const SystemsUpdatePage = () => {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  let { id } = useParams();
  const { data: system } = useSWR(`/system/${id}`, () =>
    api.system.find({ id: id ?? "" })
  );
  const { data: roles } = useSWR("/role", () => api.role.filter({systemId: id}));
  if (system === undefined || system instanceof Error || roles === undefined || roles instanceof Error) {
    return <Loading />;
  }

  return (
    <div>
      <SystemForm
        system={system}
        onSubmit={async (data) => {
          await api.system.update(data);
          mutate("/system");
          navigate(`/system`);
        }}
        onDelete={async (data) => {
          await api.system.delete(data);
          mutate("/system");
          navigate(`/system`);
        }}
      />
      <label className="label is-medium">
        ロール
      </label>
      <div className="p-1" style={{ borderTop: '0.5px solid #d3d3d3', width: "100%" }}/>
      <RoleTable
        rows={roles}
        onCreate={() => {
          navigate(`/system/${system.id}/role/create`);
        }}
        onEdit={({id, systemId}) => {
          navigate(`/system/${system.id}/role/${id}`);
        }}
      /> </div>
  );
};
