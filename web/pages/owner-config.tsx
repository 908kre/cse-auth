import React, { useState } from "react";
import { useNavigate, createSearchParams, useParams } from "react-router-dom";
import Api from "@csea/api";
import { Owner } from "@csea/core/user";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import { SystemForm } from "@csea/web/components/system-form";
import useToast from "@csea/web/hooks/toast"
import Form from "../components/form";
import DataGrid from "react-data-grid";
import { DeleteBtn } from "../components/buttons";
import { useForm } from "react-hook-form";

const api = Api();
const toast = useToast();
export const OwnerConfigPage = () => {
//   const {
//         handleSubmit,
//         formState: { errors },
//       } = useForm<Payload>({
//         defaultValues: {
//           id: props.system?.id,
//           name: props.system?.name,
//         },
//       });
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  //let { id } = useParams();
  const { data: owners } = useSWR("/owner", () => api.user.filter({}));
  if (owners === undefined || owners instanceof Error) {
    console.log("user " + owners)
    return <Loading />;
  }
  const clickHandle = async ({value}) => {
    console.log("QQQ")
    const err = await api.user.setAdmin({ id: value })
    console.log(err)
    if(err instanceof Error) {return toast.error(err.message)}
      mutate("/owner")
      toast.info('成功しました')
  }
  const endStyle: React.CSSProperties = { display: "flex", justifyContent: "flex-end", flexWrap: "nowrap" };
  const columns= [
    { key: "userId", name: "ID", width: "90%"},
    { key: "action", name: "操作",
      formatter(column) {
        return (
          <div className="buttons" style={endStyle}>
            <DeleteBtn onClick={() => clickHandle(column.row.userId)} />
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
          onSubmit={clickHandle()}
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
    




 {/* <UserTable
  rows={users}
  onDelete={async (value) => {
    const err = await api.roleUser.delete({userId:value, roleId:role.id ?? ""})
    if(err instanceof Error) {return toast.error(err.message)}
    mutate("/role/user")
    toast.info('成功しました')
}}
/> 
  
</div>
  );
}; */}
