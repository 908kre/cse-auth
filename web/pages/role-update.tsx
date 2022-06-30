import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Api from "@csea/api";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import { RoleForm } from "@csea/web/components/role-form";
import Form  from "@csea/web/components/form";
import GroupForm  from "@csea/web/components/group-form";
import GroupTable  from "@csea/web/components/group-table";
import UserTable  from "@csea/web/components/user-table";
import useToast from "@csea/web/hooks/toast"
import { Row } from "react-data-grid";

const api = Api();
const toast = useToast();
export const RoleUpdatePage = () => {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  let { id, roleid } = useParams();

  console.log(roleid)
  const { data: role } = useSWR(`/role/${id}`, () => api.role.find({ id: roleid ?? "", systemId: id ?? "" }));

  const { data: users } = useSWR("/role/user", () => api.roleUser.filter({roleId: roleid ?? ""}));
  const { data: groups } = useSWR("/role/group", () => api.roleGroup.filter({roleId: roleid ?? ""}));
  const loading = role === undefined || users === undefined || groups === undefined
  const err = role instanceof Error || users instanceof Error || groups instanceof Error

  if (loading || err) {
    return <Loading />;
  }

  return (
    <div>
      <label className="label is-medium">
        ロール
      </label>
      <div className="p-1" style={{ borderTop: '0.5px solid #d3d3d3', width: "100%" }}/>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">システムID</label>
        </div>
        <div className='field-body'>
          <div className="field">
            <div className='m-2'> {role.systemId} </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">ロールID</label>
        </div>
        <div className='field-body'>
          <div className="field">
            <div className="control">
              <div className='m-2'> {role.id} </div>
            </div>
          </div>
        </div>
      </div>
      <label className="label is-medium">
        ユーザー
      </label>
      <div className="p-1" style={{ borderTop: '0.5px solid #d3d3d3', width: "100%" }}/>
      <Form 
        placeholder={"ユーザーID"}
        onSubmit={async ({value}) => {
          const err = await api.roleUser.create({ userId:value, roleId:role.id ?? ""})
          if(err instanceof Error) {return toast.error(err.message)}
          mutate("/role/user")
          toast.info('成功しました')
      }}/>
      <UserTable
        rows={users}
        onDelete={async (value) => {
          const err = await api.roleUser.delete({userId:value, roleId:role.id ?? ""})
          if(err instanceof Error) {return toast.error(err.message)}
          mutate("/role/user")
          toast.info('成功しました')
      }}
      /> 
      <label className="label is-medium">
        グループ
      </label>
      <div className="p-1" style={{ borderTop: '0.5px solid #d3d3d3', width: "100%" }}/>
      <GroupForm 
        onSubmit={async ({groupId, post}) => {
          const err = await api.roleGroup.create({ groupId:groupId, post: post, roleId:role.id ?? ""})
          if(err instanceof Error) {return toast.error(err.message)}
          mutate("/role/group")
          toast.info('成功しました')
      }}/>
      <GroupTable
        rows={groups}
        onDelete={async (groupId, post) => {
          const err = await api.roleGroup.delete({ groupId:groupId, post: post, roleId:role.id ?? ""})
          if(err instanceof Error) {return toast.error(err.message)}
          mutate("/role/group")
          toast.info('成功しました')
        }}
      /> 
    </div>
  );
};
