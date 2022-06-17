import React from "react";
import SaveBtn from "../SaveBtn";
import PostSelector from "../Role/PostSelector";
import { RoleGroups } from "../../models";
import RoleGroup from "@csea/core/roleGroup"
// Copied GroupForm.tsx
// styled削除、systemに変更



export default function RoleForm(props: {
    id: string
    roleCode:string
    onChange: ()=>void
    onSave: () => void;
    onCodeInput: (value: string) => void;
    isValidCode: boolean;
}) {
  const {
    onChange,
    roleCode,
    onSave,
    onCodeInput,
    isValidCode,

  } = props;
  return (
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
      グループ
      </label>
      <div style={{
        borderTop: '0.5px solid #d3d3d3',
        width: '100%',
        padding: '0.5em'
      }}/>



<div className="field is-horizontal">
        <div className="field-label is-normal">
          <label 
            className="label"
            style={{paddingTop: '0.2em'}}
            >
              {("会社コード")}
            </label>
        </div>
        <div className="field-body">
          <div className="field">
            <input
              className="input"
              placeholder="AXA0000"
              value={roleCode}
              onChange={(e) => onCodeInput(e.target.value)}
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
              {("役職")}
            </label>
        </div>
        <div className="field-body">
          <div className="field">
            <PostSelector onChange={props.onChange}/>

          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label"></div>
        <div className="field-body">
          {
            <div className="control">
              <SaveBtn onClick={() => onSave()} disabled={!isValidCode} />
            </div>
          }
        </div>
      </div>

    </div>
  );
}
