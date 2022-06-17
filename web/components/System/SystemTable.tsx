import React, { useState } from "react";
//import styled from "styled-components";
// import { System, Systems } from "@csea/web/models";
import { System, Systems } from '../../models'
// import { useTranslation } from "react-i18next";
// import Divider from "fpalm-web-components/components/Divider";
import TableHeader from "../TableHeader";
import CreateBtn from "../CreateBtn";
import UpdateBtn from "../UpdateBtn";
import DeleteBtn from "../DeleteBtn";
// Copied GroupTable.tsx


const endStyle:React.CSSProperties = {
    display: "flex", 
    justifyContent: "flex-end", 
    flexWrap: "nowrap" 
};

const Table = (props: {
    systems: Systems;
    RoleTags: React.ComponentType<{ systemId: string }>;
    onCreateClick?: () => void;
    onEditClick: (systemId: string) => void;
    onDeleteClick: (systemId: string) => void;
    isCreateable?: boolean;
    isUpdateable?: boolean;
    isDeleteable?: boolean;
}) => {
  const {
    systems,
    RoleTags,
    onCreateClick,
    onEditClick,
    onDeleteClick,
    isCreateable,
    isUpdateable,
    isDeleteable,
  } = props;
  // sort　ひつようなら
//   const [sort, setSort] = useState<[string, boolean]>(["name", false]);
//   const [sortColumn, asc] = sort;
//   let rows = groups.toList().sortBy((x) => x[sortColumn]);
//   if (asc) {
//     rows = rows.reverse();
//   }
  const [sort, setSort] = useState<[string, boolean]>(["name", false]);
  const [sortColumn, asc] = sort;
  let rows = systems.toList().sortBy((x) => x[sortColumn]);
  if (asc) {
    rows = rows.reverse();
  }
  const columns = ["コード", "名前 ", "ロール", "action"];
  const sortColumns = ["コード"];
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
            {/*<td> 
               <a
                onClick={() => isUpdateable && onEditClick(x.id)}
              > 
                {x.name} 
              </a>  */}
              <td>{x.code}</td>
              <td>{x.name}</td>
              <td>
                <div
                style={{
                  overflowY: "auto",
                  height: 135
                }}
                >
                <RoleTags systemId={x.id}  />
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
