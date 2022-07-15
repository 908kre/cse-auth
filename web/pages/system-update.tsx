import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "@csea/api";
import useSWR, { useSWRConfig } from "swr";
import { Loading } from "@csea/web/components/loading";
import { SystemForm } from "@csea/web/components/system-form";
import RoleTable from "@csea/web/components/role-table";
import Form from "@csea/web/components/form";
import useToast from "@csea/web/hooks/toast";
import { ConfirmModal } from "@csea/web/components/confirm-modal";
import { Claims } from "@csea/core/auth";

const toast = useToast();
export const SystemUpdatePage = (props: { api: Api, claims?: Claims }) => {
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  const [isActive, setIsActive] = React.useState(false);
  let { id } = useParams();
  const { data: system } = useSWR(`/system/${id}`, () =>
    props.api.system.find({ id: id ?? "" })
  );
  const { data: roles } = useSWR("/system/role", () =>
    props.api.role.filter({ systemId: id })
  );
  const { data: roleUsers } = useSWR("/system/role-user", () =>
    props.api.roleUser.filter({})
  );
  const { data: roleGroups } = useSWR("/system/role-group", () =>
    props.api.roleGroup.filter({})
  );

  if (
    system === undefined ||
    system instanceof Error ||
    roles === undefined ||
    roles instanceof Error ||
    roleUsers === undefined ||
    roleUsers instanceof Error ||
    roleGroups === undefined ||
    roleGroups instanceof Error
  ) {
    return <Loading />;
  }
  const deleteSystem = async (req: { id: string }) => {
    const { id } = req;
    const err = await props.api.system.delete({ id });
    if (err instanceof Error) {
      return toast.error(err.message);
    }
    mutate("/system");
    toast.info("成功しました");
    navigate(`/system`);
  };

  return (
    <div>
      <SystemForm
        system={system}
        onSubmit={async (data) => {
          const err = await props.api.system.update(data);
          if (err instanceof Error) {
            return toast.error(err.message);
          }
          mutate("/system");
          toast.info("成功しました");
          navigate(`/system`);
        }}
        onDelete={() => {
          setIsActive(true);
        }}
      />
      <label className="label is-medium">ロール</label>
      <div
        className="p-1"
        style={{ borderTop: "0.5px solid #d3d3d3", width: "100%" }}
      />
      <Form
        placeholder={"ロールID"}
        onSubmit={async ({ value }) => {
          const err = await props.api.role.create({
            name: value,
            systemId: system.id,
          });
          if (err instanceof Error) {
            return toast.error(err.message);
          }
          mutate("/system/role");
          toast.info("成功しました");
        }}
      />
      <RoleTable
        rows={roles}
        roleUsers={roleUsers}
        roleGroups={roleGroups}
        onEdit={({ id, systemId }) => {
          navigate(`/system/${system.id}/role/${id}`);
        }}
      />
      <ConfirmModal
        title="警告"
        message={`本当に${system.id}システム権限を削除しますか？`}
        isActive={isActive}
        onClose={() => setIsActive(false)}
        onSubmit={() => deleteSystem({ id: system.id })}
      />
    </div>
  );
};
