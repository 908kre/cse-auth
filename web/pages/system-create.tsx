import React, { useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import Api from "@csea/api";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import { SystemForm } from "@csea/web/components/system-form";
import useToast from "@csea/web/hooks/toast"

const api = Api();
const toast = useToast();
export const SystemCreatePage = () => {
  const navigate = useNavigate();
  return (
    <SystemForm
      onSubmit={async (data) => {
        const err = await api.system.create(data);
        if(err instanceof Error) {
          return toast.error(err.message)
        }
        toast.info('成功しました')
        navigate(`/system/update/${data.id}`);
      }}
    />
  );
};
