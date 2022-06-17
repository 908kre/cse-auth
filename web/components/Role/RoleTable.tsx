import React, { useState } from "react";
//import styled from "styled-components";
//import { Group, Groups } from "@fpalm-auth/web/models";
//import { useTranslation } from "react-i18next";
//import Divider from "fpalm-web-components/components/Divider";
import TableHeader from "../TableHeader";
import CreateBtn from "../CreateBtn";
import UpdateBtn from "../UpdateBtn";
import DeleteBtn from "../DeleteBtn";
import { Systems, Roles } from "../../models";


const endStyle:React.CSSProperties = { display: "flex", justifyContent: "flex-end", flexWrap: "nowrap" };

const Table = (props: {
  systems: Systems;
  roles: Roles;
  SystemTags: React.ComponentType<{ roleId:string}>;
  UserTags: React.ComponentType<{ roleId: string }>;
  GroupTags: React.ComponentType<{ roleId: string }>;

  onCreateClick?: () => void;
  onEditClick: (roleId: string) => void;
  onDeleteClick: (roleId: string) => void;
  isCreateable?: boolean;
  isUpdateable?: boolean;
  isDeleteable?: boolean;
}) => {
  const {
    systems,
    roles,
    SystemTags,
    UserTags,
    GroupTags,
    onCreateClick,
    onEditClick,
    onDeleteClick,
    isCreateable,
    isUpdateable,
    isDeleteable,
  } = props;
  const [sort, setSort] = useState<[string, boolean]>(["name", false]);
  const [sortColumn, asc] = sort;
  let rows =roles.toList()
  .sortBy((x) => x[sortColumn]);
  if (asc) {
    rows = rows.reverse();
  }
  // let system = props.systems.filter((x)=> x.id === props.roles.map((y) => (y.systemId))
  const system = props.systems.toList()

  const columns = ["システム", "名前", "ユーザー", "グループ","action"];
  const sortColumns = ["システム"];
  const renders = {
    action: (
      <div style={endStyle}>
        {onCreateClick && isCreateable && <CreateBtn onClick={() => onCreateClick()} />}
      </div>
    ),
  };


  return (
    <table className="table is-fullwidth">
      <TableHeader
        columns={columns}
        sortColumns={sortColumns}
        renders={renders}
        sort={sort}
        onChange={setSort}
      />
      <tbody>
        {rows.map((x) => (
          <tr key={x.id}>
            <td> 
              <SystemTags roleId={x.systemId} />

              {/* <a
                onClick={() => isUpdateable && onEditClick(x.id)}
              > 
                {x.name} 
              </a>  */}
            </td>
            {/* <td>
              <div
                style={{
                  overflowY: "auto",
                  height: 135
                }}
              >
                <UserTags groupId={x.id}  />
              </div>
            </td> */}
            <td> 
            <div
              style={{
              overflowY: "auto",
              height: 135
            }}
              > 
              {x.name} 
              </div>

            </td>

            <td>
              <div
                style={{
                  overflowY: "auto",
                  height: 135
                }}
              >
                <UserTags roleId={x.id} />
              </div>
            </td>

            <td>
              <div
                style={{
                  overflowY: "auto",
                  height: 135
                }}
              >
                <GroupTags roleId={x.id} />
              </div>
            </td>

            <td>
              <div className="buttons" style={endStyle}>
                {isUpdateable && (
                  <UpdateBtn onClick={() => onEditClick(x.id)} />
                )}

                {isDeleteable && (
                  <DeleteBtn onClick={() => onDeleteClick(x.id)} />
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;
