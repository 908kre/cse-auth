// import React, { FormEvent } from "react";
// import { Post } from "../../models";

// // const Component = styled.div`
// //   width: 100%;
// // `;

// // const PlaceHolder = styled.option`
// //   display: none;
// // `;

// export default function PostSelector(props: {
//   post: string;
//   onSelect: (value: string) => void;
// }) {
//   const { post, onSelect } = props;
//   const handleChange = (e: FormEvent<HTMLSelectElement>) => {
//     e.preventDefault();
//     const value = parseInt(e.currentTarget.value);
//     onSelect(value as Post);
//   };

//   return (
//     <div style={{
//         width: '100%'
//     }}>
//       <div className="select">
//         <select value={post} onChange={handleChange}>
//           <option value={Role.Guest}>Guest</option>
//           <option value={Role.Owner}>Owner</option>
//         </select>
//       </div>
//     </div>

//   );
// }

import React, { FormEvent } from "react";
import { System, Systems } from "../../models";
//import { Role } from "@fpalm-auth/web/models";

// const Component = styled.div`
//   width: 100%;
// `;

// const PlaceHolder = styled.option`
//   display: none;
// `;

/* 
export default function SystemSelector(props: {
  systems: Systems
  
  //system: System
  onSelect: (value: string) => void;
}) {
  const { onSelect } = props;
  const systemIds = props.systems.map((x)=> x.id)
  const systems = props.systems.filter((x) => systemIds.has(x.id)).toList();
  const handleChange = (e: FormEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value
    onSelect(value as string);
  };

  return (
    <div style={{
        width: '100%'
    }}>
      <div className="select">
        {systems.toList().map((x) => (
        <div 
          className="p-1"
          key={x.id}
        >
        <select 
          value={x.id} 
          onChange={handleChange}
        >
          <option value={x.id}>{x.name}</option>
          
        </select>
      </div>
      ))}
      </div>
      
    </div>
  );
}
*/


const RoleSelector = (props: {
  onChange: (value: string) => void
  //onChange: (value: string) => void;
}) => {
  const { onChange } = props;
  
  return (
    <div className="select is-fullwidth">
      
      

      <select
        //value={x.id}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="テスト1">テスト1</option>
        <option value="テスト2">テスト2</option>
        <option value="テスト3">テスト3</option>
        <option value="テスト4">テスト4</option>
        <option value="テスト5">テスト5</option>
        </select>
         
    </div>
  );
};
export default RoleSelector;