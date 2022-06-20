import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "@csea/api";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import { SystemForm } from "@csea/web/components/system-form";

const api = Api();
export const SystemsUpdatePage = () => {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  let { id } = useParams();
  const { data: system } = useSWR(`/system/${id}`, () =>
    api.system.find({ id: id ?? "" })
  );
  if (system === undefined || system instanceof Error) {
    return <Loading />;
  }

  return (
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
  );
};
