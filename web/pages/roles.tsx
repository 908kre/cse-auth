import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import Api from "@csea/api";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import { RoleTable } from "@csea/web/components/role-table";

const api = Api();
export const RolesPage = () => {
  const navigate = useNavigate();
  const { data: roles } = useSWR("/role", () => api.role.filter({}));
  const { data: roleUsers } = useSWR("/role-user", () => api.roleUser.filter({}));
  const { data: roleGroups } = useSWR("/role-group", () => api.roleGroup.filter({}));
  const loading = (roles === undefined || roleUsers === undefined || roleGroups === undefined)
  const err = (roles instanceof Error || roleUsers instanceof Error || roleGroups instanceof Error)
  if (loading || err ) {
    return <Loading />;
  }
  return (
    <RoleTable
      rows={roles}
      roleUsers={roleUsers}
      roleGroups={roleGroups}
      onCreate={() => {
        navigate("/system/create");
      }}
      onEdit={({ id, systemId }) => {
        navigate(`/system/${systemId}/role/${id}`);
      }}
    />
  );
};
