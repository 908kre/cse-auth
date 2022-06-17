import React from "react";
// import styled from "styled-components";
import { Map, Set } from "immutable";
// import { Users, Locations, GroupLocations, Role } from "@fpalm-auth/web/models";
// import { Trans, useTranslation } from "react-i18next";
// import NameRoleTag from "@fpalm-auth/web/components/NameRoleTag";
// import RoleTag from "@fpalm-auth/web/components/RoleTag";
import SaveBtn from "../SaveBtn";
import SystemRoleTable from "./SystemRoleTable";
import { Roles } from "../../models";
// Copied GroupForm.tsx
// styled削除、systemに変更



export default function SystemForm(props: {
    systemId: string;
    code: string;
    name: string;
    roleIds: Set<string>;
    roles: Roles;

    onSave: () => void;

    onCodeInput: (value: string) => void;
    onNameInput: (value: string) => void;
    // onUserClick: (userId: string) => void;
    // onLocationClick: (locationId: string) => void;
    // onRoleClick: (locations: string) => void;
    onCreateClick: () => void;
    onEditClick:(roleId: string) => void;
    onDeleteClick:(roleId: string) => void;
    isValidCode: boolean;
    isValidName: boolean;
    isEditable?: boolean;
}) {
  const {
    systemId,
    code,
    name,
    onSave,
    onCodeInput,
    onNameInput,
    // onUserClick,
    // onLocationClick,
    onCreateClick,
    onEditClick,
    onDeleteClick,
    roles,
    // onRoleClick,
    isValidCode,
    isValidName,
    isEditable,
  } = props;
  // const { t } = useTranslation();
  // const locationIds = Set(roles.keys());
  // const notExistLocations = roles.keySeq().filter((x) => !locations.has(x)).toList()
  const roleIds = props.roles
  .filter((x)=> x.systemId === props.systemId)
  .map((x) => x.id)
  .toSet();
  const roleId = props.roles
  .filter((x)=> x.systemId === props.systemId)
  .map((x) => {
    roles.get(x.id)
  })

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
        {/* <Trans i18nKey="system" /> */}
      システム
      </label>
      {/* <Divider /> */}
      <div style={{
        borderTop: '0.5px solid #d3d3d3',
        width: '100%',
        padding: '0.5em'
      }}/>
      <div className="field is-horizontal">
        <div className={`field-label ${!props.code ? "is-normal" : ""}`}>
          <label 
            className="label"
            style={{paddingTop: '0.5em'}}
            >
          {("システムコード")}
          </label>
        </div>
        <div className="field-body">
          <div className="field">
          {props.code ? (
              <span>{code}</span>
            ) : (
              <>
                <input
                  className="input"
                  type="text"
                  value={code}
                  onChange={(e) => onCodeInput(e.target.value)}
                />
                {!isValidCode && (
                  <div className="help is-danger">{("invalidCode")}</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label 
            className="label"
            style={{paddingTop: '0.5em'}}
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
          <SystemRoleTable 
            systemId={props.systemId} 
            roles={props.roles}
            onCreateClick={props.onCreateClick}
            onEditClick={props.onEditClick}
            onDeleteClick={props.onDeleteClick}
            
            />
         </>
       ): undefined}
      {/* {isEditable ? (
        
        roles.toList().map((x) =>{
          const role = roles.get(x.id);
          
          return (
            <SystemRoleTable 
            systemId={props.systemId}
            onDeleteClick={role.id}
            onEditClick = {role.id}/>
            )}
          )
        })
      )} */}
        
       
        {/* <SystemRoleTable 
          systemId={props.systemId}
          onDeleteClick={props.roles}/> */}
        


    {/* // </Container> */}
    </div>
  );
}
