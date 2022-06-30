import React, { useState } from "react";
import { useNavigate, createSearchParams, useParams } from "react-router-dom";
import { Api } from "@csea/api";
import { Owner } from "@csea/core/user";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import { SystemForm } from "@csea/web/components/system-form";
import useToast from "@csea/web/hooks/toast"
import Form from "../components/form";
import DataGrid from "react-data-grid";
import { DeleteBtn } from "../components/buttons";
import { useForm } from "react-hook-form";

const toast = useToast();
export const OwnerConfigPage = (props: {
  api: Api
}) => {
  const { api } = props
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  const { data: owners } = useSWR("/owner", () => api.user.filter({}));
  if (owners === undefined || owners instanceof Error) {
    return <Loading />;
  }

  const endStyle: React.CSSProperties = { display: "flex", justifyContent: "flex-end", flexWrap: "nowrap" };
  const columns= [
    { key: "id", name: "ID", width: "90%"},
    { key: "action", name: "操作",
      formatter(column) {
        return (
          <div className="buttons" style={endStyle}>
            <DeleteBtn onClick={async() => {
              const err = await api.user.setAdmin({ id: column.row.id })
              if(err instanceof Error) {return toast.error(err.message)}
              mutate("/owner")
              toast.info('成功しました')
            }} />
          </div>
        )
      },
    }
  ];

  return (
    <div>
      <label className="label is-medium">
        オーナー
      </label>
      <div className="p-1" style={{ borderTop: '0.5px solid #d3d3d3', width: "100%" }}/>
      <Form
        placeholder={"ユーザーID"}
        onSubmit={async ({value}) => {
          const err = await api.user.setAdmin({ id: value })
          if(err instanceof Error) {return toast.error(err.message)}
          mutate("/owner")
          toast.info('成功しました')
        }}
      />
      <DataGrid
        columns={columns}
        rows={owners}
        defaultColumnOptions={{
          resizable: true,
        }}
      />
    </div>
  )
}

