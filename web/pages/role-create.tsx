import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "@csea/api";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import { RoleForm } from "@csea/web/components/role-form";

const api = Api();
export const RoleCreatePage = () => {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  let { id } = useParams();
  return (
    <RoleForm
      systemId={id ?? ""}
      onSubmit={async (data) => {
        const err = await api.role.create(data);
        navigate(`/system/${id}/role/${data.id}`);
        mutate("/role")
      }}
    />
  );
};
