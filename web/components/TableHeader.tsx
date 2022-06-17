import React, { useState } from "react";
// import { useTranslation } from "react-i18next";

export default function TableHeader(props: {
  columns: string[];
  sortColumns?: string[];
  renders?: { [key: string]: React.ReactNode };
  sort?: [string, boolean];
  onChange?: (column: [string, boolean]) => void;
}) {
  // const { t } = useTranslation();
  const { columns, sortColumns, onChange, sort } = props;
  const renders = props.renders || {};
  const [sortColumn, asc] = sort || ["", false];
  const handleSort = (value: string) => {
    onChange && onChange([value, !asc]);
  };
  const mark = asc ? "🔽" : "🔼";
  return (
    <thead>
      <tr>
        {columns.map((x, i) => {
          const isSortable = sortColumns?.includes(x);
          return (
            <th
              style={{
                cursor: isSortable ? "pointer" : "",
                whiteSpace: "nowrap",
              }}
              key={i}
              onClick={isSortable ? () => handleSort(x) : undefined}
            >
              {/* {x in renders ? renders[x] : t(x)} */}
              {x in renders ? renders[x] : (x)}
              {isSortable && sortColumn === x && mark}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
