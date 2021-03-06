import React, { useState } from "react";
import { useNavigate, createSearchParams, useParams } from "react-router-dom";
import { Api } from "@csea/api";
import { Owner } from "@csea/core/user";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import { SystemForm } from "@csea/web/components/system-form";
import { MaintainerForm } from "@csea/web/components/maintainer-form";
import { MaintainerTable } from "@csea/web/components/maintainer-table";
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
  const { data: systems } = useSWR("/sytem", () => api.system.filter({}));
  const { data: maintainers } = useSWR("/maintainer", () => api.maintainer.filter({}));
  if (
     owners === undefined || owners instanceof Error
  || systems === undefined || systems instanceof Error
  || maintainers === undefined || maintainers instanceof Error
  ) {
    return <Loading />;
  }

  const endStyle: React.CSSProperties = { display: "flex", justifyContent: "flex-end", flexWrap: "nowrap" };
  const columns= [
    { key: "id", name: "ID", width: "80%"},
    { key: "action", name: "操作",
      formatter(column) {
        return (
          <div className="buttons" style={endStyle}>
            <DeleteBtn onClick={async() => {
              const err = await api.user.setAdmin({ id: column.row.id})
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
      <label className="label is-medium">
        メンテナー
      </label>
      <div className="p-1" style={{ borderTop: '0.5px solid #d3d3d3', width: "100%" }}/>
      <MaintainerForm
        systems={systems}
        onSubmit={async ({id, systemId}) => {
          const err = await api.maintainer.create({ id, systemId })
          if(err instanceof Error) {return toast.error(err.message)}
          mutate("/maintainer")
          toast.info('成功しました')
        }}
      />
      <MaintainerTable 
        rows={maintainers}
        onDelete={async (id, systemId) => {
          const err = await props.api.maintainer.delete({ id, systemId });
          if (err instanceof Error) {
            return toast.error(err.message);
          }
          mutate("/maintainer");
          toast.info('成功しました')
        }}
      />
    </div>
  )
}

