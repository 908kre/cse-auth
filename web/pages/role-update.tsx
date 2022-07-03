import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "@csea/api";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import Form  from "@csea/web/components/form";
import GroupForm  from "@csea/web/components/group-form";
import GroupTable  from "@csea/web/components/group-table";
import UserTable  from "@csea/web/components/user-table";
import { DeleteBtn } from "@csea/web/components/buttons";
import useToast from "@csea/web/hooks/toast"
import { ConfirmModal } from "@csea/web/components/confirm-modal";
import { Row } from "react-data-grid";

const toast = useToast();
export const RoleUpdatePage = (props:{
  api: Api
}) => {
  const { api } = props
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  let { id, roleid, userid, groupid, post } = useParams();

  const { data: role } = useSWR(`/role/${id}`, () => api.role.find({ id: roleid ?? "", systemId: id ?? "" }));

  const { data: users } = useSWR("/role/user", () => api.roleUser.filter({roleId: roleid ?? ""}));
  const { data: groups } = useSWR("/role/group", () => api.roleGroup.filter({roleId: roleid ?? ""}));
  const [isActive, setIsActive] = React.useState(false);
  const [isUserActive, setIsUserActive] = React.useState(false);
  const [isGroupActive, setIsGroupActive] = React.useState(false);

  const loading = role === undefined || users === undefined || groups === undefined
  const err = role instanceof Error || users instanceof Error || groups instanceof Error

  if (loading || err) {
    return <Loading />;
  }

  const deleteRole = async (req: { id: string }) => {
    const { id } = req;
    const err = await props.api.role.delete({ id });
    if (err instanceof Error) {
      return toast.error(err.message);
    }
    mutate("/role");
    toast.info('成功しました')
    navigate(`/role`);
  };

  const deleteUser = async (req: { roleId: string, userId: string }) => {
    const { roleId, userId } = req;
    const err = await props.api.roleUser.delete({ roleId, userId });
    if (err instanceof Error) {
      return toast.error(err.message);
    }
    mutate("/role/user");
    navigate(`/system/${id}/role/${roleid}`);
    toast.info('成功しました')
  };

  const deleteGroup = async (req: { roleId: string, groupId: string, post: string }) => {
    console.log(req)
    const err = await props.api.roleGroup.delete(req);
    if (err instanceof Error) {
      return toast.error(err.message);
    }
    mutate("/role/group");
    navigate(`/system/${id}/role/${roleid}`);
    toast.info('成功しました')
  };

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
          <label className="label">ロールコード</label>
        </div>
        <div className='field-body'>
          <div className="field">
            <div className="control">
              <div className='m-2'> {role.name} </div>
            </div>
          </div>
        </div>
        <div className="control">
          <DeleteBtn onClick={async () => {
            setIsActive(true);
          }}/>
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
          setIsUserActive(true);
          navigate(`/system/${id}/role/${roleid}/${value}`);
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
          setIsGroupActive(true);
          navigate(`/system/${id}/role/${roleid}/${groupId}/${post}`);
        }}
      /> 
      <ConfirmModal
        title="警告"
        message={`本当にロール：${role.name}を削除しますか？`}
        isActive={isActive}
        onClose={() => setIsActive(false)}
        onSubmit={() => deleteRole({ id: role.id })}
      />
      <ConfirmModal
        title="警告"
        message={`本当にユーザーを削除しますか？`}
        isActive={isUserActive}
        onClose={() => setIsUserActive(false)}
        onSubmit={() => deleteUser({ roleId: role.id, userId: userid ?? "" })}
      />
      <ConfirmModal
        title="警告"
        message={`本当にグループを削除しますか？`}
        isActive={isGroupActive}
        onClose={() => setIsGroupActive(false)}
        onSubmit={() => deleteGroup({ roleId: role.id, groupId: groupid ?? "", post: post ?? "" })}
      />
    </div>
  );
};
