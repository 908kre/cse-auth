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
  if (roles === undefined || roleUsers === undefined || roles instanceof Error || roleUsers instanceof Error) {
    return <Loading />;
  }
  return (
    <RoleTable
      rows={roles}
      roleUsers={roleUsers}
      onCreate={() => {
        navigate("/system/create");
      }}
      onEdit={({ id, systemId }) => {
        navigate(`/system/${systemId}/role/${id}`);
      }}
    />
  );
};
