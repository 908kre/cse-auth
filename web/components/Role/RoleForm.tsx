import React from "react";
import SaveBtn from "../SaveBtn";
import RoleUserTable from "../RoleUser/RoleUserTable";
import RoleGroupTable from "../RoleGroup/RoleGroupTable";
import { RoleUsers, RoleGroups,  Systems } from "../../models"
import SystemSelector from "./SystemSelector";
// Copied GroupForm.tsx
// styled削除、systemに変更



export default function RoleForm(props: {
    systemName?: string
    systems: Systems
    roleCode: string;
    name: string;
    roleId: string;
    roleUsers: RoleUsers;
    roleGroups: RoleGroups;

    onChange: (value: string) => void;
    onSystemInput:(value: string) => void;
    onSave: () => void;
    onCodeInput: (value: string) => void;
    onNameInput: (value: string) => void;
    onDeleteClick: (roleId: string) => void;
    onEditClick: (roleId: string) => void;
    onCreateClick?: () => void;
    isValidSystem: boolean;
    isValidCode: boolean;
    isValidName: boolean;
    isEditable?: boolean;
}) {
  const {
    systems,
    systemName,
    roleCode,
    name,
    roleId,
    roleUsers,
    onChange,
    onSave,
    onCodeInput,
    onNameInput,
    onDeleteClick,
    onEditClick,
    onCreateClick,
    isValidSystem,
    isValidCode,
    isValidName,
    isEditable,
  } = props;
  // const { t } = useTranslation();
  // const locationIds = Set(roles.keys());
  // const notExistLocations = roles.keySeq().filter((x) => !locations.has(x)).toList()
  return (
    // <Container>

    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: '0.25em'
      }}
    >
      <label 
        className="label is-medium"
        style={{paddingTop: '0.5em'}}
        >
      ロール
      </label>
      <div style={{
        borderTop: '0.5px solid #d3d3d3',
        width: '100%',
        padding: '0.5em'
      }}/>


      <div className="field is-horizontal">
        <div className={`field-label ${!props.systemName ? "is-normal" : isEditable}`}>
          <label 
            className="label"
            style={{paddingTop: '0.2em'}}
            >
            {("システム")}
          </label>
        </div>
        <div className="field-body">
          <div className="field">
          {props.systemName ? (
              <span style={{paddingLeft: '0.3em'}}>
                {systemName}
              </span>
            ) : 
            (
              <>
              <SystemSelector 
              systems={props.systems} 
              onChange={props.onChange} />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label 
            className="label"
            style={{paddingTop: '0.2em'}}
            >
              {("ロールコード")}
            </label>
        </div>
        <div className="field-body">
          <div className="field">
            <input
              className="input"
              value={roleCode}
              onChange={(e) => onNameInput(e.target.value)}
            />
            {!isValidCode && (
              <div className="help is-danger">{("inputNotice")}</div>
            )}
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label 
            className="label"
            style={{paddingTop: '0.2em'}}
            >
              {("名前")}
            </label>
        </div>
        <div className="field-body">
          <div className="field">
            <input
              className="input"
              value={name}
              onChange={(e) => onNameInput(e.target.value)}
            />
            {!isValidName && (
              <div className="help is-danger">{("inputNotice")}</div>
            )}
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label"></div>
        <div className="field-body">
          {
            <div className="control">
              <SaveBtn onClick={() => onSave()} disabled={!isValidName} />
            </div>
          }
        </div>
      </div>
       {/* 編集中ならロール表示 */}
      {isEditable ? (
        <>
        <RoleUserTable 
            roleId={props.roleId}
            roleUsers={props.roleUsers} 
            onDeleteClick={props.onDeleteClick}
            onCreateClick={props.onCreateClick}
            />
        <RoleGroupTable 
            roleId={props.roleId}
            roleGroups={props.roleGroups} 
            onDeleteClick={props.onDeleteClick}
            onCreateClick={props.onCreateClick}
            />
        </>
      ) : undefined}
    </div>
  );
}
