import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import Api from "@csea/api";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import { SystemForm } from "@csea/web/components/system-form";

const api = Api();
export const SystemsCreatePage = () => {
  const navigate = useNavigate();
  return (
    <SystemForm
      onSubmit={async (data) => {
        const err = await api.system.create(data);
        navigate(`/system/update/${data.id}`);
      }}
    />
  );
};
