import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import Api from "@csea/api";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import { SystemTable } from "@csea/web/components/system-table";

const api = Api();
export const SystemsPage = () => {
  const navigate = useNavigate();
  const { data: systems } = useSWR("/system", () => api.system.filter({}));
  if (systems === undefined || systems instanceof Error) {
    return <Loading />;
  }
  return (
    <SystemTable
      rows={systems}
      onCreate={() => {
        navigate("/system/create");
      }}
      onEdit={({ id }) => {
        navigate(`/system/update/${id}`);
      }}
    />
  );
};
