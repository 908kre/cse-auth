import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Api } from "@csea/api";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import { SystemTable } from "@csea/web/components/system-table";

export const SystemsPage = (props: {
  api: Api
}) => {
  const navigate = useNavigate();
  const { data: systems } = useSWR("/system", () => props.api.system.filter({}));
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
